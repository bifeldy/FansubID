import { CACHE_MANAGER, Controller, HttpCode, HttpException, Inject, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FindManyOptions, In } from 'typeorm';
import { Cache } from 'cache-manager';

import { environment } from '../../../environments/api/environment';

import { JsonCache } from '../../../models/req-res.model';

import { Berkas } from '../../entities/Berkas';

import { BerkasService } from '../../repository/berkas.service';

import { ConfigService } from '../../services/config.service';

@Controller('/dorama-fansub')
export class DoramaFansubController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private cfg: ConfigService,
    private berkasRepo: BerkasService
  ) {
    //
  }

  // PATCH `/api/dorama-fansubs?id=`
  @Patch('/')
  @HttpCode(202)
  async fansubDorama(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const responseBody = {
      info: `😅 202 - Dorama API :: Fansub 🤣`,
      count: 0,
      pages: 1,
      results: []
    };
    const cacheData: JsonCache = await this.cm.get(req.originalUrl);
    if (cacheData) {
      return cacheData.body;
    } else 
    if (this.cfg.isUpdatingDoramaFansub) {
      return responseBody;
    } else {
      this.cfg.isUpdatingDoramaFansub = true;
      try {
        const queryPage = parseInt(req.query['page'] as string);
        const queryRow = parseInt(req.query['row'] as string);
        const doramaId = req.query['id'] ? (req.query['id'] as string).split(',') : req.body.id;
        if (Array.isArray(doramaId) && doramaId.length > 0) {
          const findOpt: FindManyOptions<Berkas> = {
            where: [
              {
                dorama_: {
                  id: In(doramaId)
                }
              }
            ],
            relations: ['fansub_', 'dorama_']
          };
          if (doramaId.length === 1) {
            findOpt.skip = queryPage > 0 ? (queryPage * queryRow - queryRow) : 0;
            findOpt.take = (queryRow > 0 && queryRow <= 500) ? queryRow : 10;
          }
          const files = await this.berkasRepo.find(findOpt);
          const results: any = {};
          for (const i of doramaId) {
            results[i] = [];
          }
          for (const f of files) {
            if ('fansub_' in f && f.fansub_) {
              for (const fansub of f.fansub_) {
                delete fansub.description;
                delete fansub.urls;
                delete fansub.tags;
                delete fansub.created_at;
                delete fansub.updated_at;
                results[f.dorama_.id].push(fansub);
              }
            }
          }
          for (const [key, value] of Object.entries(results)) {
            results[key] = (value as any)
              .filter((a, b, c) => c.findIndex(d => (d.id === a.id)) === b)
              .sort((a, b) => (a.name > b.name) ? 1 : -1);
          }
          let count = 0;
          for (const i of doramaId) {
            count += results[i].length;
          }
          responseBody.count = count;
          responseBody.pages = (doramaId.length > 1 ? 1 : Math.ceil(count / (queryRow ? queryRow : 10)));
          responseBody.results = results;
          this.cm.set(req.originalUrl, { status: 200, body: responseBody }, { ttl: environment.internalApiCacheTime });
        }
      } catch (error) {
        if (error instanceof HttpException) throw error;
      }
      this.cfg.isUpdatingDoramaFansub = false;
      return responseBody;
    }
  }

}
