import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { environment } from '../../../environments/api/environment';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { GlobalService } from '../../services/global.service';

import { BerkasService } from '../../repository/berkas.service';

@ApiExcludeController()
@Controller('/fansub-anime')
export class FansubAnimeController {

  constructor(
    private gs: GlobalService,
    private berkasRepo: BerkasService
  ) {
    //
  }

  // PATCH `/api/fansub-anime?id=`
  @Patch('/')
  @HttpCode(202)
  @FilterApiKeyAccess()
  async animeFansub(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
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
          .andWhere('berkas.anime_ IS NOT NULL')
          .orderBy('anime_.name', 'ASC')
          .addOrderBy('fansub_.id', 'ASC')
          .select(['anime_', 'fansub_'])
          .groupBy('anime_.id')
          .addGroupBy('fansub_.id');
        const files = await fileRepoQuery.getRawMany();
        const results: any = {};
        for (const i of fansubId) {
          results[i] = [];
        }
        for (const f of files) {
          if (f.anime__image_url?.startsWith('http') && this.gs.includesOneOf(f.anime__image_url, environment.ipoChanProxyUrl)) {
            f.anime__image_url = `https://crawl.${environment.domain}/?url=${encodeURIComponent(f.anime__image_url)}`;
          }
          results[f.fansub__id].push({
            id: f.anime__id,
            name: f.anime__name,
            type: f.anime__type,
            image_url: f.anime__image_url
          });
        }
        let count = 0;
        for (const i of fansubId) {
          count += results[i].length;
          if (fansubId.length === 1) {
            const start = (queryPage ? (queryPage - 1) * (queryRow ? queryRow : 10) : 0);
            const end = (queryPage ? (queryPage - 1) * (queryRow ? queryRow : 10) : 0) + (queryRow ? queryRow : 10);
            results[i] = results[i].slice(start, end);
          } else {
            results[i] = results[i].length;
          }
        }
        return {
          info: `😅 202 - Fansub API :: Anime 🤣`,
          count,
          pages: (fansubId.length > 1 ? 1 : Math.ceil(count / (queryRow ? queryRow : 10))),
          results
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Fansub API :: Gagal Mencari Anime ${req.query['id']} 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
