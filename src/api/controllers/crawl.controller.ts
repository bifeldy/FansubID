// 3rd Party Library
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser } from 'puppeteer';

import { Controller, Get, HttpCode, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { GlobalService } from '../services/global.service';

@Controller('/crawl')
export class CrawlController {

  headersToRemove = [
    'host', 'user-agent', 'accept', 'accept-encoding', 'content-length',
    'forwarded', 'x-forwarded-proto', 'x-forwarded-for', 'x-cloud-trace-context'
  ];

  responseHeadersToRemove = [
    'Accept-Ranges', 'Content-Length', 'Keep-Alive', 'Connection',
    'content-encoding', 'set-cookie'
  ];

  options = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };

  browser: Browser = null;

  constructor(
    private gs: GlobalService
  ) {
    puppeteer.use(StealthPlugin());
    this.initialize();
  }

  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch(this.options);
  }

  @Get('/')
  @HttpCode(200)
  async crawl(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    let url: any = req.query['url'];
    if (url) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
      }
      let responseBody: string | string[];
      let responseData: Buffer;
      let responseHeaders: Record<string, string>;
      const page = await this.browser.newPage();
      const client = await page.target().createCDPSession();
      await client.send(
        'Network.setRequestInterception',
        {
          patterns: [
            {
              urlPattern: '*',
              resourceType: 'Document',
              interceptionStage: 'HeadersReceived'
            }
          ]
        }
      );
      client.on('Network.requestIntercepted', async e => {
        const obj = {
          interceptionId: e.interceptionId
        };
        if (e.isDownload) {
          await client.send(
            'Network.getResponseBodyForInterception',
            {
              interceptionId: e.interceptionId
            }
          ).then((result) => {
            if (result.base64Encoded) {
              responseData = Buffer.from(result.body, 'base64');
            }
          });
          obj['errorReason'] = 'BlockedByClient';
          responseHeaders = e.responseHeaders;
        }
        await client.send('Network.continueInterceptedRequest', obj);
        if (e.isDownload) {
          await page.close();
        }
      });
      const headers = { ...req.headers };
      for (const header of this.headersToRemove) {
        delete headers[header];
      }
      await page.setExtraHTTPHeaders(headers as any);
      try {
        let tryCount = 0;
        let response = await page.goto(url, {
          timeout: 30000,
          waitUntil: 'domcontentloaded'
        });
        responseBody = await response.text();
        responseData = await response.buffer();
        while (responseBody.includes('cf-browser-verification') && tryCount <= 10) {
          const newResponse = await page.waitForNavigation({
            timeout: 30000,
            waitUntil: 'domcontentloaded'
          });
          if (newResponse) {
            response = newResponse;
          }
          responseBody = await response.text();
          responseData = await response.buffer();
          tryCount++;
        }
        responseHeaders = response.headers();
        const cookies = await page.cookies();
        if (cookies) {
          for (const cookie of cookies) {
            const { name, value, secure, expires, domain, ...options } = cookie;
            res.cookie(cookie.name, cookie.value, options as any);
          }
        }
      } catch (error) {
        if (!error.toString().includes('ERR_BLOCKED_BY_CLIENT')) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR);
          if (res.locals['xml']) {
            res.set('Content-Type', 'application/xml');
            return res.send(this.gs.OBJ2XML(error));
          }
          return res.json(error);
        }
      }
      await page.close();
      for (const header of this.responseHeadersToRemove) {
        delete responseHeaders[header];
      }
      for (const header in Object.keys(responseHeaders)) {
        res.set(header, responseHeaders[header]);
      }
      return res.send(responseData);
    } else {
      const body = {
        info: '🙄 400 - Crawl API :: URL Tidak Valid 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      };
      res.status(HttpStatus.BAD_REQUEST);
      if (res.locals['xml']) {
        res.set('Content-Type', 'application/xml');
        return res.send(this.gs.OBJ2XML(body));
      }
      return res.json(body);
    }
  }

}
