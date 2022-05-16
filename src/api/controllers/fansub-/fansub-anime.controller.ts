import { CACHE_MANAGER, Controller, HttpCode, HttpException, Inject, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';

import { environment } from '../../../environments/api/environment';

import { JsonCache } from '../../../models/req-res.model';

import { BerkasService } from '../../repository/berkas.service';

import { ConfigService } from '../../services/config.service';

@Controller('/fansub-anime')
export class FansubAnimeController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private berkasRepo: BerkasService,
    private cfg: ConfigService
  ) {
    //
  }

  // PATCH `/api/fansub/anime?id=`
  @Patch('/')
  @HttpCode(202)
  async checkSlug(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const responseBody = {
      info: `😅 202 - Fansub API :: Anime 🤣`,
      count: 0,
      pages: 1,
      results: []
    };
    const cacheData: JsonCache = await this.cm.get(req.originalUrl);
    if (cacheData) {
      return cacheData.body;
    } else if (this.cfg.isUpdatingFansubAnime) {
      return responseBody;
    } else {
      this.cfg.isUpdatingFansubAnime = true;
      try {
        const queryPage = parseInt(req.query['page'] as string);
        const queryRow = parseInt(req.query['row'] as string);
        const fansubId = req.query['id'] ? (req.query['id'] as string).split(',').map(Number) : req.body.id;
        if (Array.isArray(fansubId) && fansubId.length > 0) {
          let fileRepoQuery = this.berkasRepo.instance()
            .createQueryBuilder('berkas')
            .leftJoinAndSelect('berkas.anime_', 'anime_')
            .leftJoinAndSelect('berkas.fansub_', 'fansub_')
            .where('fansub_.id IN (:...id)', { id: fansubId })
            .andWhere('berkas.anime_ IS NOT NULL');
          if (fansubId.length === 1) {
            fileRepoQuery = fileRepoQuery
              .skip(queryPage > 0 ? (queryPage * queryRow - queryRow) : 0)
              .take((queryRow > 0 && queryRow <= 500) ? queryRow : 10);
          }
          const [files, count] = await fileRepoQuery.getManyAndCount();
          const results: any = {};
          for (const i of fansubId) {
            results[i] = [];
          }
          for (const f of files) {
            if ('anime_' in f && f.anime_) {
              delete f.anime_.created_at;
              delete f.anime_.updated_at;
            }
            if ('fansub_' in f && f.fansub_) {
              for (const fansub of f.fansub_) {
                if (fansubId.includes(fansub.id)) {
                  results[fansub.id].push(f.anime_);
                }
              }
            }
          }
          for (const [key, value] of Object.entries(results)) {
            results[key] = (value as any)
              .filter((a, b, c) => c.findIndex(d => (d.id === a.id)) === b)
              .sort((a, b) => (a.name > b.name) ? 1 : -1);
          }
          if (fansubId.length > 1) {
            for (const i of fansubId) {
              results[i] = results[i].length;
            }
          }
          responseBody.count = count;
          responseBody.pages = (fansubId.length > 1 ? 1 : Math.ceil(count / (queryRow ? queryRow : 10)));
          responseBody.results = results;
          this.cm.set(req.originalUrl, { status: 200, body: responseBody }, { ttl: environment.internalApiCacheTime });
        }
      } catch (error) {
        if (error instanceof HttpException) throw error;
      }
      this.cfg.isUpdatingFansubAnime = false;
      return responseBody;
    }
  }

}
