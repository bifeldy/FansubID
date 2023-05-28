// 3rd Party Library
import { xml2json, json2xml } from 'xml-js';

// NodeJS Library
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs';

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

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

  urlsListToRemoveBerkas = [];

  xmlOpt = {
    compact: true,
    spaces: 2
  };

  constructor(
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
        created_at: 'ASC'
      }
    });
    for (const n of news) {
      this.untrackedUrlsListNews.push(`${environment.baseUrl}/news/${n.id}`);
    }
  }

  async getFansubUrl(): Promise<void> {
    const fansub = await this.fansubRepo.find({
      order: {
        created_at: 'ASC'
      }
    });
    for (const f of fansub) {
      this.untrackedUrlsListFansub.push(`${environment.baseUrl}/fansub/${f.slug}`);
    }
  }

  async getBerkasUrl(): Promise<void> {
    const berkas = await this.berkasRepo.find({
      order: {
        created_at: 'ASC'
      }
    });
    for (const b of berkas) {
      if (b.private) {
        this.urlsListToRemoveBerkas.push(`${environment.baseUrl}/berkas/${b.id}`);
      } else {
        this.untrackedUrlsListBerkas.push(`${environment.baseUrl}/berkas/${b.id}`);
      }
    }
  }

  @Cron(
    CronExpression.EVERY_HOUR,
    {
      name: CONSTANTS.cronSitemap
    }
  )
  async generateSitemap(): Promise<void> {
    const startTime = new Date();
    this.gs.log('[CRON_TASK_SITEMAP-START] 🐾', `${startTime}`);
    try {
      await this.getNewsUrl();
      await this.getFansubUrl();
      await this.getBerkasUrl();
      const untrackedUrlsList = [...this.untrackedUrlsListNews, ...this.untrackedUrlsListFansub, ...this.untrackedUrlsListBerkas];
      const fileExist = existsSync(`${environment.viewFolder}/sitemap.xml`);
      const filePath = fileExist ? '/sitemap.xml' : '/sitemap.template.xml';
      const contentString = readFileSync(`${environment.viewFolder}/${filePath}`, 'utf8');
      const objString = xml2json(contentString, this.xmlOpt);
      const existingSitemapList = JSON.parse(objString);
      for (const u of untrackedUrlsList) {
        if (!existingSitemapList.urlset.url.find((e) => e.loc._text === u)) {
          existingSitemapList.urlset.url.push({
            loc: {
              _text: u
            },
            lastmod: {
              _text: new Date().toISOString()
            }
          });
        }
      }
      for (const u of this.urlsListToRemoveBerkas) {
        const index = existingSitemapList.urlset.url.findIndex((e) => e.loc._text === u);
        if (index >= 0) {
          existingSitemapList.urlset.url.splice(index, 1);
        }
      }
      const xmlString = json2xml(existingSitemapList, this.xmlOpt);
      if (fileExist) {
        unlinkSync(`${environment.viewFolder}/sitemap.xml`);
      }
      writeFileSync(`${environment.viewFolder}/sitemap.xml`, xmlString, 'utf8');
    } catch (error) {
      this.gs.log('[CRON_TASK_SITEMAP-ERROR] 🐾', error, 'error');
    }
    const endTime = new Date();
    const elapsedTime = endTime.getTime() - startTime.getTime();
    this.gs.log('[CRON_TASK_SITEMAP-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
  }

}
