// 3rd Party Library
import { xml2json, json2xml } from 'xml-js';

// NodeJS Library
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { GlobalService } from '../services/global.service';

import { NewsService } from '../repository/news.service';
import { FansubService } from '../repository/fansub.service';
import { BerkasService } from '../repository/berkas.service';

@Injectable()
export class SitemapService {

  untrackedUrlsListNews = [];
  untrackedUrlsListFansub = [];
  untrackedUrlsListBerkas = [];

  xmlOpt = {
    compact: true,
    spaces: 2
  };

  constructor(
    private sr: SchedulerRegistry,
    private gs: GlobalService,
    private newsRepo: NewsService,
    private fansubRepo: FansubService,
    private berkasRepo: BerkasService
  ) {
    //
  }

  async getNewsUrl(): Promise<void> {
    const news = await this.newsRepo.find({
      order: {
        created_at: 'DESC'
      }
    });
    for (const n of news) {
      this.untrackedUrlsListNews.push({
        url: `${environment.baseUrl}/news/${n.id}`,
        lastmod: n.updated_at
      });
    }
  }

  async getFansubUrl(): Promise<void> {
    const fansub = await this.fansubRepo.find({
      order: {
        created_at: 'DESC'
      }
    });
    for (const f of fansub) {
      this.untrackedUrlsListFansub.push({
        url: `${environment.baseUrl}/fansub/${f.slug}`,
        lastmod: f.updated_at
      });
    }
  }

  async getBerkasUrl(): Promise<void> {
    const berkas = await this.berkasRepo.find({
      where: [
        {
          private: false,
          user_: {
            private: false
          }
        }
      ],
      order: {
        created_at: 'DESC'
      },
      relations: ['user_'],
      take: 500
    });
    for (const b of berkas) {
      this.untrackedUrlsListBerkas.push({
        url: `${environment.baseUrl}/berkas/${b.id}`,
        lastmod: b.updated_at
      });
    }
  }

  @Cron(
    CronExpression.EVERY_HOUR,
    {
      name: CONSTANTS.cronSitemap
    }
  )
  async generateSitemap(): Promise<void> {
    const job = this.sr.getCronJob(CONSTANTS.cronSitemap);
    job.stop();
    const startTime = new Date();
    this.gs.log('[CRON_TASK_SITEMAP-START] 🐾', `${startTime}`);
    try {
      await this.getNewsUrl();
      await this.getFansubUrl();
      await this.getBerkasUrl();
      const untrackedUrlsList = [...this.untrackedUrlsListNews, ...this.untrackedUrlsListFansub, ...this.untrackedUrlsListBerkas];
      const contentString = readFileSync(`${environment.viewFolder}/sitemap.template.xml`, 'utf8');
      const objString = xml2json(contentString, this.xmlOpt);
      const existingSitemapList = JSON.parse(objString);
      for (const u of untrackedUrlsList) {
        const sm = {
          loc: {
            _text: u.url
          },
          lastmod: {
            _text: new Date(u.lastmod).toISOString()
          }
        };
        const idx = existingSitemapList.urlset.url.findIndex(url => url.loc._text == u.url); 
        if (idx < 0) {
          existingSitemapList.urlset.url.push(sm);
        } else {
          existingSitemapList.urlset.url[idx] = sm;
        }
      }
      const xmlString = json2xml(existingSitemapList, this.xmlOpt);
      if (existsSync(`${environment.viewFolder}/sitemap.xml`)) {
        unlinkSync(`${environment.viewFolder}/sitemap.xml`);
      }
      writeFileSync(`${environment.viewFolder}/sitemap.xml`, xmlString, 'utf8');
    } catch (error) {
      this.gs.log('[CRON_TASK_SITEMAP-ERROR] 🐾', error, 'error');
    }
    const endTime = new Date();
    const elapsedTime = endTime.getTime() - startTime.getTime();
    this.gs.log('[CRON_TASK_SITEMAP-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
    job.start();
  }

}
