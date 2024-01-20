// 3rd Party Library
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, Page } from 'puppeteer';

import { CACHE_MANAGER, Controller, Get, HttpCode, HttpStatus, Inject, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';
import { classToPlain } from 'class-transformer';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';

@ApiExcludeController()
@Controller('/crawl')
export class CrawlController {

  prohibitedHeaders = [
    'accept-charset', 'accept-encoding', 'access-control-request-headers', 'access-control-request-method',
    'connection', 'content-length', 'cookie', 'date', 'dnt', 'expect', 'feature-policy', 'host',
    'keep-alive', 'origin', 'proxy-*', 'sec-*', 'referer', 'te', 'trailer', 'transfer-encoding', 'upgrade', 'via'
  ];

  requestHeadersToRemove = [
    'host', 'user-agent', 'accept', 'accept-encoding', 'content-length', 'x-real-ip', 'cf-connecting-ip',
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
    @Inject(CACHE_MANAGER) private cm: Cache
  ) {
    puppeteer.use(StealthPlugin());
    this.initialize();
  }

  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch(this.options);
  }

  @Get('/')
  @HttpCode(200)
  @FilterApiKeyAccess()
  async crawl(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    let url: any = req.query['url'];
    let page: Page = null;
    let responseBody: string | string[] = null;
    let responseData: Buffer = null;
    let responseHeaders: Record<string, string> = {};
    let tryCount = 0;
    try {
      if (!url) {
        throw new Error('Data Tidak Lengkap!');
      }
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
      }
      if (url.startsWith('http://')) {
        url = 'https://' + url.slice(7, url.length);
      }
      let uri = url;
      if (environment.production) {
        uri = new URL(`https://crawl.${environment.domain}`);
        uri.searchParams.append('url', url);
      }
      page = await this.browser.newPage();
      const requestHeaders = { ...req.headers };
      for (const header of [...this.requestHeadersToRemove, ...this.prohibitedHeaders]) {
        delete requestHeaders[header];
      }
      await page.setExtraHTTPHeaders(requestHeaders as any);
      let response = await page.goto(uri.toString(), {
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
        res.set(header, responseHeaders[header].replace(/(\r\n|\n|\r)/gm, ', '));
      }
      const cookies = await page.cookies();
      if (cookies) {
        for (const cookie of cookies) {
          const { name, value, secure, expires, domain, ...options } = cookie;
          res.cookie(cookie.name, cookie.value, options as any);
        }
      }
      await page.close();
      this.cm.set(req.originalUrl, { status: response.status(), body: responseData }, { ttl: CONSTANTS.externalApiCacheTime });
      return res.send(responseData);
    } catch (error) {
      if (page) {
        await page.close();
      }
      return res.status(HttpStatus.BAD_REQUEST).json(classToPlain({
        info: '🙄 400 - Crawl API :: UR[I/L] Tidak Valid 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }));
    }
  }

}
