// 3rd Party Library
import { parse } from 'rss-to-json';

// NodeJS Library
import { readFileSync, writeFile, rename, unlink } from 'node:fs';

import { Controller, HttpCode, Get, Req, Res, Inject, CACHE_MANAGER, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsNull, Not } from 'typeorm';
import { Cache } from 'cache-manager';

import { environment } from '../../../environments/api/environment';

import { JsonCache } from '../../../models/req-res.model';

import { FansubService } from '../../repository/fansub.service';

import { ConfigService } from '../../services/config.service';
import { GlobalService } from '../../services/global.service';

@Controller('/fansub-rss-feed')
export class FansubRssFeedController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private cfg: ConfigService,
    private fansubRepo: FansubService,
    private gs: GlobalService
  ) {
    //
  }

  // GET `/api/fansub-rss-feed`
  @Get('/')
  @HttpCode(200)
  async getFansubFeed(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    let reqUrl = req.originalUrl.split('?')[0];
    if (reqUrl.startsWith('/api')) {
      reqUrl = reqUrl.substring(4);
    }
    if (reqUrl.startsWith('/')) {
      reqUrl = reqUrl.substring(1);
    }
    const responseBody = {
      info: `😅 200 - Fansub API :: RSS Feed All Active Fansubs 🤣`,
      count: 0,
      pages: 1,
      results: []
    };
    const cacheData: JsonCache = await this.cm.get(`/api/${reqUrl}`);
    if (cacheData) {
      return cacheData.body;
    } else if (this.cfg.isUpdatingFansubFeedRss) {
      try {
        const jsonFile = readFileSync(`${environment.jsonCacheFolder}/${reqUrl}.old.json`, 'utf8');
        const jsonData = JSON.parse(jsonFile);
        responseBody.count = jsonData.count;
        responseBody.results = jsonData.results;
      } catch (e) {
        this.gs.log('[NODE_FS_READ_FILE_SYNC-ERROR] 📖', e, 'error');
      }
      return responseBody;
    } else {
      this.cfg.isUpdatingFansubFeedRss = true;
      try {
        const rssFeed = [];
        const fansubs = await this.fansubRepo.find({
          where: [
            {
              rss_feed: Not(IsNull()),
              active: true
            }
          ],
          order: {
            updated_at: 'DESC'
          }
        });
        const rgx = new RegExp(this.gs.urlRegex);
        for (const fs of fansubs) {
          if (fs.rss_feed.match(rgx)) {
            try {
              let rssUrl = fs.rss_feed;
              if (!rssUrl.includes('?')) {
                rssUrl += '?';
              }
              if (rssUrl[rssUrl.length - 1] !== '?') {
                rssUrl += '&';
              }
              if (!rssUrl.includes('alt=rss')) {
                rssUrl += 'alt=rss';
              }
              const feed = await parse(rssUrl, null);
              let i = 0;
              while (i < rssFeed.length) {
                const dateFeedNew = feed.items[0].created || feed.items[0].published;
                const dateFeedOld = rssFeed[i].item.created || rssFeed[i].item.published;
                if (dateFeedNew > dateFeedOld) {
                  break;
                }
                i++;
              }
              rssFeed.splice(i, 0, {
                slug: fs.slug,
                title: feed.title,
                // description: feed.description,
                link: feed.link,
                // image: feed.image,
                // category: feed.category,
                item: {
                  title: feed.items[0].title,
                  // description: feed.items[0].description,
                  link: feed.items[0].link,
                  published: feed.items[0].published,
                  created: feed.items[0].created,
                  author: feed.items[0].author,
                  // category: feed.items[0].category,
                  // enclosures: feed.items[0].enclosures,
                  // media: feed.items[0].media
                }
              });
            } catch (e) {
              this.gs.log('[FANSUB_RSS_FEED] 🐾', e, 'error');
            }
          }
        }
        responseBody.count = rssFeed.length;
        responseBody.results = rssFeed;
        this.cm.set(`/api/${reqUrl}`, { status: 200, body: responseBody }, { ttl: environment.externalApiCacheTime });
        writeFile(`${environment.jsonCacheFolder}/${reqUrl}.new.json`, JSON.stringify(responseBody), 'utf8', (e1) => {
          if (e1) {
            this.gs.log('[NODE_FS_WRITE_FILE-ERROR] 📝', e1, 'error');
          } else {
            unlink(`${environment.jsonCacheFolder}/${reqUrl}.old.json`, (e2) => {
              if (e2) {
                this.gs.log('[NODE_FS_UNLINK-ERROR] 🔗', e2, 'error');
              }
              rename(`${environment.jsonCacheFolder}/${reqUrl}.new.json`, `${environment.jsonCacheFolder}/${reqUrl}.old.json`, (e3) => {
                if (e3) {
                  this.gs.log('[NODE_FS_RENAME-ERROR] 📛', e3, 'error');
                }
              });
            });
          }
        });
      } catch (error) {
        if (error instanceof HttpException) throw error;
      }
      this.cfg.isUpdatingFansubFeedRss = false;
      return responseBody;
    }
  }

}
