// 3rd Party Library
import { parse } from 'rss-to-json';

import { Controller, HttpCode, Get, Req, Res, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsNull, Not } from 'typeorm';
import { Cache } from 'cache-manager';

import { environment } from '../../../environments/api/environment';

import { JsonCache } from '../../../models/req-res.model';

import { FansubService } from '../../repository/fansub.service';

import { GlobalService } from '../../services/global.service';

@Controller('/fansub-rss-feed')
export class FansubRssFeedController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private fansubRepo: FansubService,
    private gs: GlobalService
  ) {
    //
  }

  // GET `/api/fansub-feed/`
  @Get('/')
  @HttpCode(200)
  async getFansubFeed(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const cacheData: JsonCache = await this.cm.get(req.originalUrl);
      if (cacheData) {
        return cacheData.body;
      } else {
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
        const responseBody = {
          info: `😅 200 - Fansub API :: RSS Feed All Fansubs 🤣`,
          count: rssFeed.length,
          pages: 1,
          results: rssFeed
        };
        this.cm.set(req.originalUrl, { status: 200, body: responseBody }, { ttl: environment.externalApiCacheTime / 2 });
        return responseBody;
      }
    } catch (error) {
      return {
        info: `😅 200 - Fansub API :: RSS Feed All Fansubs 🤣`,
        count: 0,
        pages: 1,
        result: []
      };
    }
  }

}
