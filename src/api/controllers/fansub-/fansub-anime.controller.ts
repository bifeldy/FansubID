import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { AnimeService } from '../../repository/anime.service';
import { BerkasService } from '../../repository/berkas.service';
import { FansubService } from '../../repository/fansub.service';

@ApiExcludeController()
@Controller('/fansub-anime')
export class FansubAnimeController {

  constructor(
    private animeRepo: AnimeService,
    private berkasRepo: BerkasService,
    private fansubRepo: FansubService
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
          .orderBy('fansub_.id', 'ASC')
          .select(['anime_', 'fansub_'])
          .groupBy('anime_.id')
          .addGroupBy('fansub_.id');
        const filesRaw = await fileRepoQuery.getRawMany();
        const files = [];
        for (const fr of filesRaw) {
          const berkas = this.berkasRepo.new();
          berkas.anime_ = this.animeRepo.new();
          berkas.fansub_ = [];
          for (const [key, value] of Object.entries(fr)) {
            const k = key.split('__');
            if (Array.isArray(berkas[`${k[0]}_`])) {
              const fansub_ = this.fansubRepo.new();
              fansub_[k[1]] = value;
              berkas[`${k[0]}_`].push(fansub_);
            } else {
              berkas[`${k[0]}_`][k[1]] = value;
            }
          }
          files.push(berkas);
        }
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
