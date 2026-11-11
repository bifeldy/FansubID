// 3rd Party Library
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, Page } from 'puppeteer';

import { CACHE_MANAGER, Controller, Get, HttpCode, HttpStatus, Inject, OnModuleDestroy, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';
import { classToPlain } from 'class-transformer';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';

@ApiExcludeController()
@Controller('/crawl')
export class CrawlController implements OnModuleDestroy {

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
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  };

  browser: Browser = null;
  browserLaunchPromise: Promise<Browser> = null;
  idleTimer: NodeJS.Timeout = null;
  activePages = 0;
  readonly IDLE_CLOSE_MS = 2 * 60 * 1000;

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache
  ) {
    puppeteer.use(StealthPlugin());
  }

  async initialize(): Promise<Browser> {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    if (this.browser && this.browser.isConnected()) {
      return this.browser;
    }
    if (!this.browserLaunchPromise) {
      this.browserLaunchPromise = puppeteer.launch(this.options).then(b => {
        this.browser = b;
        this.browserLaunchPromise = null;
        b.on('disconnected', () => {
          this.browser = null;
        });
        return b;
      }).catch(err => {
        this.browserLaunchPromise = null;
        throw err;
      });
    }
    return this.browserLaunchPromise;
  }

  scheduleIdleClose(): void {
    if (this.activePages > 0) {
      return;
    }
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
    this.idleTimer = setTimeout(async () => {
      if (this.activePages === 0 && this.browser) {
        const b = this.browser;
        this.browser = null;
        await b.close().catch(() => {});
      }
    }, this.IDLE_CLOSE_MS);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
    if (this.browser) {
      const b = this.browser;
      this.browser = null;
      await b.close().catch(() => {});
    }
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
      const browser = await this.initialize();
      page = await browser.newPage();
      this.activePages++;
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
      if (responseData && responseData.byteLength <= 1024 * 1024) {
        this.cm.set(req.originalUrl, { status: response.status(), body: responseData }, { ttl: CONSTANTS.externalApiCacheTime });
      }
      res.send(responseData);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(classToPlain({
        info: '🙄 400 - Crawl API :: UR[I/L] Tidak Valid 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }));
    } finally {
      if (page) {
        this.activePages = Math.max(0, this.activePages - 1);
        await page.close().catch(() => {});
      }
      this.scheduleIdleClose();
    }
  }

}
