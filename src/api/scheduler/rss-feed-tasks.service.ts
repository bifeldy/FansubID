// 3rd Party Library
import { parse } from 'rss-to-json';

// NodeJS Library
import cluster from 'node:cluster';
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { IsNull, Not } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { FansubService } from '../repository/fansub.service';
import { RssFeedService } from '../repository/rss-feed.service';

import { GlobalService } from '../services/global.service';

@Injectable()
export class RssFeedTasksService {

  constructor(
    private sr: SchedulerRegistry,
    private fansubRepo: FansubService,
    private rssFeedRepo: RssFeedService,
    private gs: GlobalService
  ) {
    //
  }

  @Cron(
    CronExpression.EVERY_HOUR,
    {
      name: CONSTANTS.cronFansubRssFeed
    }
  )
  async fansubRssFeedAll(): Promise<void> {
    if (cluster.isMaster) {
      const job = this.sr.getCronJob(CONSTANTS.cronFansubRssFeed);
      job.stop();
      const startTime = new Date();
      this.gs.log('[CRON_TASK_FANSUB_RSS_FEED-START] 🐾', `${startTime}`);
      try {
        const fansubs = await this.fansubRepo.find({
          where: [
            { rss_feed: Not(IsNull()) }
          ],
          order: {
            updated_at: 'DESC'
          }
        });
        for (const fs of fansubs) {
          const rgx = new RegExp(CONSTANTS.regexUrl);
          if (fs.rss_feed.match(rgx)) {
            try {
              let halaman = 1;
              while (true) {
                const url = new URL(fs.rss_feed);
                const params = {
                  'start-index': halaman.toString(),
                  paged: halaman.toString(),
                  page: halaman.toString(),
                  alt: 'rss'
                };
                for (const [key, value] of Object.entries(params)) {
                  if (!url.searchParams.has(key)) {
                    url.searchParams.append(key, value);
                  }
                }
                const ru = url.toString();
                const uri = new URL(`${environment.baseUrl}/api/crawl`);
                uri.searchParams.append('url', ru);
                const feed = await parse(uri.toString(), null);
                if (feed.items.length <= 0) {
                  break;
                }
                for (const fi of feed.items) {
                  const f = this.rssFeedRepo.new();
                  f.fansub_ = fs;
                  f.title = fi.title;
                  f.created_at = new Date(fi.created || fi.published);
                  if (typeof fi.link === 'string') {
                    f.link = fi.link;
                  } else {
                    let idx = fi.link.findIndex(l => l.rel === 'alternate' && l.type === 'text/html');
                    if (idx < 0) {
                      continue;
                    }
                    f.link = fi.link[idx].href;
                  }
                  await this.rssFeedRepo.insert(f);
                }
                if (fs.rss_feed.includes('/feeds/posts/default')) {
                  halaman += feed.items.length;
                } else {
                  halaman += 1;
                }
              }
            } catch (e) {
              this.gs.log('[CRON_TASK_FANSUB_RSS_FEED-ERROR_PARSE] 🐾', e, 'error');
            }
          }
        }
      } catch (error) {
        this.gs.log('[CRON_TASK_FANSUB_RSS_FEED-ERROR] 🐾', error, 'error');
      }
      const endTime = new Date();
      const elapsedTime = endTime.getTime() - startTime.getTime();
      this.gs.log('[CRON_TASK_FANSUB_RSS_FEED-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
      job.start();
    } else {
      this.sr.getCronJob(CONSTANTS.cronFansubRssFeed).stop();
    }
  }

}
