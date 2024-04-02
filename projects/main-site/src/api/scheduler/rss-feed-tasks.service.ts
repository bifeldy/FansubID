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
              let totalNew = 0;
              let retry = 0;
              while (true) {
                let noNew = null;
                try {
                  const url = new URL(fs.rss_feed);
                  const params = {
                    'start-index': halaman.toString(),
                    paged: halaman.toString(),
                    page: halaman.toString(),
                    alt: 'rss',
                    'max-results': '10',
                    row: '10'
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
                  let inserted = 0;
                  for (let i = 0; i < feed.items.length; i++) {
                    try {
                      const f = this.rssFeedRepo.new();
                      f.fansub_ = fs;
                      f.title = feed.items[i].title;
                      f.created_at = new Date(feed.items[i].created || feed.items[i].published);
                      const link = feed.items[i].link;
                      let url: string = null;
                      if (typeof link === 'string') {
                        url = new URL(link).pathname;
                      } else {
                        let idx = link.findIndex(l => l.rel === 'alternate' && l.type === 'text/html');
                        if (idx < 0) {
                          continue;
                        }
                        url = new URL(link[idx].href).pathname;
                      }
                      f.link = url;
                      await this.rssFeedRepo.insert(f);
                      inserted++;
                    } catch (err) {
                      if (inserted === 0 && i >= feed.items.length - 1) {
                        retry = 2;
                        // Bypass Max Retry
                        throw new Error(`${url.origin} :: Tidak Ada RSS Feed Terbaru Dari ${i + 1} Data!`);
                      } else {
                        this.gs.log(`[CRON_TASK_FANSUB_RSS_FEED-ERROR_INSERT] 🐾 ${url.origin} ::`, err, 'error');
                      }
                    }
                  }
                  totalNew += inserted;
                  if (fs.rss_feed.includes('/feeds/posts/default')) {
                    halaman += feed.items.length;
                    // Default Blogger Feed Per Page => 25 Items, But Forced To 10 Items
                    // So The Total Of Items Will Be 30 After Page 3 Loaded
                    // Blogger Paging Is Not A Page But Skip Offset Of Items
                    if (totalNew === 0 && halaman > 30) {
                      noNew = `${url.origin} :: Tidak Ada RSS Feed Terbaru Setelah Mengecek ${halaman / 10} Halaman!`;
                    }
                  } else {
                    halaman += 1;
                    // Default Universal Feed (Wordpress, etc) Per Page => 10 Items
                    // So The Total Of Items Will Be 30 After Page 3 Loaded
                    if (totalNew === 0 && halaman > 3) {
                      noNew = `${url.origin} :: Tidak Ada RSS Feed Terbaru Setelah Mengecek ${halaman} Halaman!`;
                    }
                  }
                } catch (er) {
                  retry++;
                  // Max Retry 1
                  if (retry > 1) {
                    throw er;
                  }
                  continue;
                }
                if (noNew) {
                  throw new Error(noNew);
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
