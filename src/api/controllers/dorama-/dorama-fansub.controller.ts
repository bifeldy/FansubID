import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { BerkasService } from '../../repository/berkas.service';

@ApiExcludeController()
@Controller('/dorama-fansub')
export class DoramaFansubController {

  constructor(
    private berkasRepo: BerkasService
  ) {
    //
  }

  // PATCH `/api/dorama-fansubs?id=`
  @Patch('/')
  @HttpCode(202)
  @FilterApiKeyAccess()
  async fansubDorama(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const doramaId = req.query['id'] ? (req.query['id'] as string).split(',') : req.body.id;
      if (Array.isArray(doramaId) && doramaId.length > 0) {
        let fileRepoQuery = this.berkasRepo.instance()
          .createQueryBuilder('berkas')
          .leftJoinAndSelect('berkas.dorama_', 'dorama_')
          .leftJoinAndSelect('berkas.fansub_', 'fansub_')
          .where('dorama_.id IN (:...id)', { id: doramaId })
          .orderBy('fansub_.name', 'ASC')
          .addOrderBy('dorama_.id', 'ASC')
          .select(['dorama_', 'fansub_'])
          .groupBy('dorama_.id')
          .addGroupBy('fansub_.id');
        const files = await fileRepoQuery.getRawMany();
        const results: any = {};
        for (const i of doramaId) {
          results[i] = [];
        }
        for (const f of files) {
          results[f.dorama__id].push({
            id: f.fansub__id,
            name: f.fansub__name,
            slug: f.fansub__slug,
            active: f.fansub__active,
            image_url: f.fansub__image_url,
            cover_url: f.fansub__cover_url
          });
        }
        let count = 0;
        for (const i of doramaId) {
          count += results[i].length;
          if (doramaId.length === 1) {
            const start = (queryPage ? (queryPage - 1) * (queryRow ? queryRow : 10) : 0);
            const end = (queryPage ? (queryPage - 1) * (queryRow ? queryRow : 10) : 0) + (queryRow ? queryRow : 10);
            results[i] = results[i].slice(start, end);
          }
        }
        return {
          info: `😅 202 - Dorama API :: Fansub 🤣`,
          count,
          pages: (doramaId.length > 1 ? 1 : Math.ceil(count / (queryRow ? queryRow : 10))),
          results
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Dorama API :: Gagal Mencari Fansub ${req.query['id']} 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
