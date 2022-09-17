// 3rd Party Library
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, Page } from 'puppeteer';

import { Controller, Get, HttpCode, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { GlobalService } from '../services/global.service';

@Controller('/crawl')
export class CrawlController {

  prohibitedHeaders = [
    'accept-charset', 'accept-encoding', 'access-control-request-headers', 'access-control-request-method',
    'connection', 'content-length', 'cookie', 'date', 'dnt', 'expect', 'feature-policy', 'host',
    'keep-alive', 'origin', 'proxy-*', 'sec-*', 'referer', 'te', 'trailer', 'transfer-encoding', 'upgrade', 'via'
  ];

  requestHeadersToRemove = [
    'host', 'user-agent', 'accept', 'accept-encoding', 'content-length',
    'forwarded', 'x-forwarded-proto', 'x-forwarded-for', 'x-cloud-trace-context'
  ];

  responseHeadersToRemove = [
    'accept-ranges', 'content-length', 'keep-alive', 'connection',
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
    let page: Page = null;
    let responseBody: string | string[] = null;
    let responseData: Buffer = null;
    let responseHeaders: Record<string, string> = {};
    let tryCount = 0;
    try {
      if (url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'http://' + url;
        }
        page = await this.browser.newPage();
        const requestHeaders = { ...req.headers };
        for (const header of [...this.requestHeadersToRemove, ...this.prohibitedHeaders]) {
          delete requestHeaders[header];
        }
        await page.setExtraHTTPHeaders(requestHeaders as any);
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
        for (const header of [...this.responseHeadersToRemove, ...this.prohibitedHeaders]) {
          delete responseHeaders[header];
        }
        for (const header in responseHeaders) {
          res.set(header, responseHeaders[header]);
        }
        const cookies = await page.cookies();
        if (cookies) {
          for (const cookie of cookies) {
            const { name, value, secure, expires, domain, ...options } = cookie;
            res.cookie(cookie.name, cookie.value, options as any);
          }
        }
        await page.close();
        res.send(responseData);
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      if (page) {
        await page.close();
      }
      const body = {
        info: '🙄 400 - Crawl API :: URL Tidak Valid 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      };
      res.status(HttpStatus.BAD_REQUEST);
      if (res.locals['xml']) {
        res.set('Content-Type', 'application/xml');
        res.send(this.gs.OBJ2XML(body));
      } else {
        res.json(body);
      }
    }
  }

}
