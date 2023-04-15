import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { BerkasService } from '../../repository/berkas.service';

@ApiExcludeController()
@Controller('/fansub-anime')
export class FansubAnimeController {

  constructor(
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
