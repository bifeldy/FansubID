// 3rd Party Library
import { parse } from 'rss-to-json';

// NodeJS Library
import { writeFile, rename, unlink } from 'node:fs';

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IsNull, Not } from 'typeorm';
import { Cache } from 'cache-manager';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { FansubModel } from '../../models/req-res.model';

import { FansubService } from '../repository/fansub.service';

import { ConfigService } from './config.service';
import { GlobalService } from './global.service';

@Injectable()
export class TasksService {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private fansubRepo: FansubService,
    private cfg: ConfigService,
    private gs: GlobalService
  ) {
    //
  }

  getFeedByUrl(rssUrl: string): Promise<{ title: any; description: any; link: any; image: any; category: any; items: any[]; }> {
    if (!rssUrl.includes('alt=rss')) {
      if (!rssUrl.includes('?')) {
        rssUrl += '?';
      } else if (rssUrl[rssUrl.length - 1] !== '?') {
        rssUrl += '&';
      }
      rssUrl += 'alt=rss';
    }
    this.gs.log('[CRON_TASK_FANSUB_RSS_FEED-PARSING] 🐾', rssUrl);
    return parse(rssUrl, null);
  }

  sortWhileAdding(fansub: FansubModel, rssFeed: any[], feed: { title: any; description: any; link: any; image: any; category: any; items: any[]; }, countData: number = null): void {
    if (!countData) {
      countData = feed.items.length;
    }
    for (let i = 0; i < countData; i++) {
      let j = 0;
      while (j < rssFeed.length) {
        const dateFeedNew = feed.items[i].created || feed.items[i].published;
        const dateFeedOld = rssFeed[j].item.created || rssFeed[j].item.published;
        if (dateFeedNew > dateFeedOld) {
          break;
        }
        j++;
      }
      rssFeed.splice(j, 0, {
        slug: fansub.slug,
        title: feed.title,
        // description: feed.description,
        link: feed.link,
        // image: feed.image,
        // category: feed.category,
        item: {
          title: feed.items[i].title,
          // description: feed.items[i].description,
          link: feed.items[i].link,
          published: feed.items[i].published,
          created: feed.items[i].created,
          author: feed.items[i].author,
          // category: feed.items[i].category,
          // enclosures: feed.items[i].enclosures,
          // media: feed.items[i].media
        }
      });
    }
  }

  saveFeedToFileAndCache(reqUrl: string, resBody: any) {
    this.cm.del(`/api/${reqUrl}`);
    this.cm.set(`/api/${reqUrl}`, { status: 200, body: resBody }, { ttl: environment.externalApiCacheTime });
    writeFile(`${environment.jsonCacheFolder}/${reqUrl}.new.json`, JSON.stringify(resBody), 'utf8', (e1) => {
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
  }

  /** */

  @Cron(
    CronExpression.EVERY_30_MINUTES,
    {
      name: CONSTANTS.cronFansubRssFeed
    }
  )
  async fansubRssFeed(): Promise<void> {
    if (!this.cfg.isUpdatingFansubFeedRss) {
      const startTime = new Date();
      this.gs.log('[CRON_TASK_FANSUB_RSS_FEED-START] 🐾', `${startTime}`);
      const reqUrl = 'fansub-rss-feed';
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
        const rgx = new RegExp(CONSTANTS.regexUrl);
        for (const fs of fansubs) {
          if (fs.rss_feed.match(rgx)) {
            try {
              const feed = await this.getFeedByUrl(fs.rss_feed);
              this.sortWhileAdding(fs, rssFeed, feed, 1);
            } catch (e) {
              this.gs.log('[CRON_TASK_FANSUB_RSS_FEED-ERROR_PARSE] 🐾', e, 'error');
            }
          }
        }
        this.saveFeedToFileAndCache(reqUrl, {
          info: `😅 200 - Fansub API :: RSS Feed All Active Fansubs 🤣`,
          count: rssFeed.length,
          pages: 1,
          results: rssFeed
        });
      } catch (error) {
        this.gs.log('[CRON_TASK_FANSUB_RSS_FEED-ERROR] 🐾', error, 'error');
      }
      this.cfg.isUpdatingFansubFeedRss = false;
      const endTime = new Date();
      const elapsedTime = endTime.getTime() - startTime.getTime();
      this.gs.log('[CRON_TASK_FANSUB_RSS_FEED-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
    }
  }

  @Cron(
    CronExpression.EVERY_30_MINUTES,
    {
      name: CONSTANTS.cronFansubRssFeedAll
    }
  )
  async fansubRssFeedAll(): Promise<void> {
    if (!this.cfg.isUpdatingFansubFeedRssAll) {
      const startTime = new Date();
      this.gs.log('[CRON_TASK_FANSUB_RSS_FEED_ALL-START] 🐾', `${startTime}`);
      const reqUrl = 'fansub-rss-feed-all';
      this.cfg.isUpdatingFansubFeedRssAll = true;
      try {
        const rssFeed = [];
        const fansubs = await this.fansubRepo.find({
          where: [
            { rss_feed: Not(IsNull()) }
          ],
          order: {
            updated_at: 'DESC'
          }
        });
        const rgx = new RegExp(CONSTANTS.regexUrl);
        for (const fs of fansubs) {
          if (fs.rss_feed.match(rgx)) {
            try {
              const feed = await this.getFeedByUrl(fs.rss_feed);
              this.sortWhileAdding(fs, rssFeed, feed, 1);
            } catch (e) {
              this.gs.log('[CRON_TASK_FANSUB_RSS_FEED_ALL-ERROR_PARSE] 🐾', e, 'error');
            }
          }
        }
        this.saveFeedToFileAndCache(reqUrl, {
          info: `😅 200 - Fansub API :: RSS Feed All Full Fansubs 🤣`,
          count: rssFeed.length,
          pages: 1,
          results: rssFeed
        });
      } catch (error) {
        this.gs.log('[CRON_TASK_FANSUB_RSS_FEED_ALL-ERROR] 🐾', error, 'error');
      }
      this.cfg.isUpdatingFansubFeedRssAll = false;
      const endTime = new Date();
      const elapsedTime = endTime.getTime() - startTime.getTime();
      this.gs.log('[CRON_TASK_FANSUB_RSS_FEED_ALL-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
    }
  }

}