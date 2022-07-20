// NodeJS Library
import { readFileSync } from 'node:fs';

import { Controller, HttpCode, Get, Req, Res, Inject, CACHE_MANAGER, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';

import { environment } from '../../../environments/api/environment';

import { JsonCache } from '../../../models/req-res.model';

import { GlobalService } from '../../services/global.service';

@Controller('/fansub-rss-feed-all')
export class FansubRssFeedAllController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private gs: GlobalService
  ) {
    //
  }

  // GET `/api/fansub-rss-feed-all`
  @Get('/')
  @HttpCode(200)
  async getFansubFeed(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      let reqUrl = req.originalUrl.split('?')[0];
      if (reqUrl.startsWith('/api')) {
        reqUrl = reqUrl.substring(4);
      }
      if (reqUrl.startsWith('/')) {
        reqUrl = reqUrl.substring(1);
      }
      const responseBody = {
        info: `😅 200 - Fansub API :: RSS Feed All Full Fansubs 🤣`,
        count: 0,
        pages: 1,
        results: []
      };
      const cacheData: JsonCache = await this.cm.get(`/api/${reqUrl}`);
      if (cacheData) {
        return cacheData.body;
      }
      try {
        const jsonFile = readFileSync(`${environment.jsonCacheFolder}/${reqUrl}.old.json`, 'utf8');
        const jsonData = JSON.parse(jsonFile);
        responseBody.count = jsonData.count;
        responseBody.results = jsonData.results;
      } catch (e) {
        this.gs.log('[NODE_FS_READ_FILE_SYNC-ERROR] 📖', e, 'error');
      }
      return responseBody;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Fansub API :: Gagal Menarik Data 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
