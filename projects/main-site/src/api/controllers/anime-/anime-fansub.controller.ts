import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { environment } from '../../../environments/api/environment';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { GlobalService } from '../../services/global.service';

import { BerkasService } from '../../repository/berkas.service';

@ApiExcludeController()
@Controller('/anime-fansub')
export class AnimeFansubController {

  constructor(
    private gs: GlobalService,
    private berkasRepo: BerkasService
  ) {
    //
  }

  // PATCH `/api/anime-fansubs?id=`
  @Patch('/')
  @HttpCode(202)
  @FilterApiKeyAccess()
  async fansubAnime(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const animeId = req.query['id'] ? (req.query['id'] as string).split(',').map(Number) : req.body.id;
      if (Array.isArray(animeId) && animeId.length > 0) {
        let fileRepoQuery = this.berkasRepo.instance()
          .createQueryBuilder('berkas')
          .leftJoinAndSelect('berkas.anime_', 'anime_')
          .leftJoinAndSelect('berkas.fansub_', 'fansub_')
          .where('anime_.id IN (:...id)', { id: animeId })
          .orderBy('fansub_.name', 'ASC')
          .addOrderBy('anime_.id', 'ASC')
          .select(['anime_', 'fansub_'])
          .groupBy('anime_.id')
          .addGroupBy('fansub_.id');
        const files = await fileRepoQuery.getRawMany();
        const results: any = {};
        for (const i of animeId) {
          results[i] = [];
        }
        for (const f of files) {
          if (f.fansub__image_url?.startsWith('http') && this.gs.includesOneOf(f.fansub__image_url, environment.ipoChanProxyUrl)) {
            f.fansub__image_url = `https://crawl.${environment.domain}/?url=${encodeURIComponent(f.fansub__image_url)}`;
          }
          if (f.fansub__cover_url?.startsWith('http') && this.gs.includesOneOf(f.fansub__cover_url, environment.ipoChanProxyUrl)) {
            f.fansub__cover_url = `https://crawl.${environment.domain}/?url=${encodeURIComponent(f.fansub__cover_url)}`;
          }
          results[f.anime__id].push({
            id: f.fansub__id,
            name: f.fansub__name,
            slug: f.fansub__slug,
            active: f.fansub__active,
            image_url: f.fansub__image_url,
            cover_url: f.fansub__cover_url
          });
        }
        let count = 0;
        for (const i of animeId) {
          count += results[i].length;
          if (animeId.length === 1) {
            const start = (queryPage ? (queryPage - 1) * (queryRow ? queryRow : 10) : 0);
            const end = (queryPage ? (queryPage - 1) * (queryRow ? queryRow : 10) : 0) + (queryRow ? queryRow : 10);
            results[i] = results[i].slice(start, end);
          }
        }
        return {
          info: `😅 202 - Anime API :: Fansub 🤣`,
          count,
          pages: (animeId.length > 1 ? 1 : Math.ceil(count / (queryRow ? queryRow : 10))),
          results
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Anime API :: Gagal Mencari Fansub ${req.query['id'] || req.body.id} 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
