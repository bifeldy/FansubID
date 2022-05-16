import { CACHE_MANAGER, Controller, HttpCode, HttpException, Inject, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FindManyOptions, In } from 'typeorm';
import { Cache } from 'cache-manager';

import { environment } from '../../../environments/api/environment';

import { JsonCache } from '../../../models/req-res.model';

import { Berkas } from '../../entities/Berkas';

import { BerkasService } from '../../repository/berkas.service';

import { ConfigService } from '../../services/config.service';

@Controller('/anime-fansub')
export class AnimeFansubController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private cfg: ConfigService,
    private berkasRepo: BerkasService
  ) {
    //
  }

  // PATCH `/api/anime-fansubs?id=`
  @Patch('/')
  @HttpCode(202)
  async fansubAnime(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const responseBody = {
      info: `😅 202 - Anime API :: Fansub 🤣`,
      count: 0,
      pages: 1,
      results: []
    };
    const cacheData: JsonCache = await this.cm.get(req.originalUrl);
    if (cacheData) {
      return cacheData.body;
    } else if (this.cfg.isUpdatingAnimeFansub) {
      return responseBody;
    } else {
      this.cfg.isUpdatingAnimeFansub = true;
      try {
        const queryPage = parseInt(req.query['page'] as string);
        const queryRow = parseInt(req.query['row'] as string);
        const animeId = req.query['id'] ? (req.query['id'] as string).split(',').map(Number) : req.body.id;
        if (Array.isArray(animeId) && animeId.length > 0) {
          const findOpt: FindManyOptions<Berkas> = {
            where: [
              {
                anime_: {
                  id: In(animeId)
                }
              }
            ],
            relations: ['fansub_', 'anime_']
          };
          if (animeId.length === 1) {
            findOpt.skip = queryPage > 0 ? (queryPage * queryRow - queryRow) : 0;
            findOpt.take = (queryRow > 0 && queryRow <= 500) ? queryRow : 10;
          }
          const files = await this.berkasRepo.find(findOpt);
          const results: any = {};
          for (const i of animeId) {
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
                results[f.anime_.id].push(fansub);
              }
            }
          }
          for (const [key, value] of Object.entries(results)) {
            results[key] = (value as any)
              .filter((a, b, c) => c.findIndex(d => (d.id === a.id)) === b)
              .sort((a, b) => (a.name > b.name) ? 1 : -1);
          }
          let count = 0;
          for (const i of animeId) {
            count += results[i].length;
          }
          responseBody.count = count;
          responseBody.pages = (animeId.length > 1 ? 1 : Math.ceil(count / (queryRow ? queryRow : 10)));
          responseBody.results = results;
          this.cm.set(req.originalUrl, { status: 200, body: responseBody }, { ttl: environment.internalApiCacheTime });
        }
      } catch (error) {
        if (error instanceof HttpException) throw error;
      }
      this.cfg.isUpdatingAnimeFansub = false;
      return responseBody;
    }
  }

}
