import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { BerkasService } from '../../repository/berkas.service';

@ApiExcludeController()
@Controller('/fansub-dorama')
export class FansubDoramaController {

  constructor(
    private berkasRepo: BerkasService
  ) {
    //
  }

  // PATCH `/api/fansub-dorama?id=`
  @Patch('/')
  @HttpCode(202)
  @FilterApiKeyAccess()
  async doramaFansub(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const fansubId = req.query['id'] ? (req.query['id'] as string).split(',').map(Number) : req.body.id;
      if (Array.isArray(fansubId) && fansubId.length > 0) {
        let fileRepoQuery = this.berkasRepo.instance()
          .createQueryBuilder('berkas')
          .leftJoinAndSelect('berkas.dorama_', 'dorama_')
          .leftJoinAndSelect('berkas.fansub_', 'fansub_')
          .where('fansub_.id IN (:...id)', { id: fansubId })
          .andWhere('berkas.dorama_ IS NOT NULL')
          .orderBy('dorama_.name', 'ASC')
          .addOrderBy('fansub_.id', 'ASC')
          .select(['dorama_', 'fansub_'])
          .groupBy('dorama_.id')
          .addGroupBy('fansub_.id');
        const files = await fileRepoQuery.getRawMany();
        const results: any = {};
        for (const i of fansubId) {
          results[i] = [];
        }
        for (const f of files) {
          results[f.fansub__id].push({
            id: f.dorama__id,
            slug: f.dorama__slug,
            name: f.dorama__name,
            type: f.dorama__type,
            image_url: f.dorama__image_url
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
          info: `😅 202 - Fansub API :: Dorama 🤣`,
          count,
          pages: (fansubId.length > 1 ? 1 : Math.ceil(count / (queryRow ? queryRow : 10))),
          results
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Fansub API :: Gagal Mencari Dorama 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
