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
        console.log('AAAAAAAAAA');
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'http://' + url;
        }
        console.log('BBBBBBBBBB');
        page = await this.browser.newPage();
        console.log('CCCCCCCCCC');
        const requestHeaders = { ...req.headers };
        for (const header of [...this.requestHeadersToRemove, ...this.prohibitedHeaders]) {
          console.log(header, requestHeaders[header]);
          delete requestHeaders[header];
        }
        console.log('CCCCCCCCCC');
        const httpExtraHeaders = {};
        for (const header in requestHeaders) {
          console.log(header, requestHeaders[header]);
          httpExtraHeaders[header] = requestHeaders[header];
        }
        console.log('CCCCCCCCCC');
        console.log('DDDDDDDDDD');
        await page.setExtraHTTPHeaders(httpExtraHeaders);
        console.log('DDDDDDDDDD');
        let response = await page.goto(url, {
          timeout: 30000,
          waitUntil: 'domcontentloaded'
        });
        console.log('EEEEEEEEEE');
        responseBody = await response.text();
        console.log('FFFFFFFFFF');
        responseData = await response.buffer();
        console.log('GGGGGGGGGG');
        while (responseBody.includes('cf-browser-verification') && tryCount <= 10) {
          const newResponse = await page.waitForNavigation({
            timeout: 30000,
            waitUntil: 'domcontentloaded'
          });
          if (newResponse) {
            response = newResponse;
          }
          console.log('HHHHHHHHHH');
          responseBody = await response.text();
          console.log('IIIIIIIIII');
          responseData = await response.buffer();
          console.log('JJJJJJJJJJ');
          tryCount++;
        }
        console.log('KKKKKKKKKK');
        responseHeaders = response.headers();
        for (const header of [...this.responseHeadersToRemove, ...this.prohibitedHeaders]) {
          console.log(header, responseHeaders[header]);
          delete responseHeaders[header];
        }
        console.log('KKKKKKKKKK');
        for (const header in responseHeaders) {
          console.log(header, responseHeaders[header]);
          res.set(header, responseHeaders[header]);
        }
        console.log('KKKKKKKKKK');
        console.log('LLLLLLLLLL');
        const cookies = await page.cookies();
        if (cookies) {
          for (const cookie of cookies) {
            console.log(cookie);
            const { name, value, secure, expires, domain, ...options } = cookie;
            res.cookie(cookie.name, cookie.value, options as any);
          }
        }
        console.log('LLLLLLLLLL');
        console.log('MMMMMMMMMM');
        await page.close();
        console.log('NNNNNNNNNN');
        console.log('OOOOOOOOOO');
        res.send(responseData);
        console.log('PPPPPPPPPP');
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      console.log('QQQQQQQQQQ');
      console.error(error);
      console.log('RRRRRRRRRR');
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
