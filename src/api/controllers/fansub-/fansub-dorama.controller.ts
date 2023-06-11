import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { BerkasService } from '../../repository/berkas.service';
import { DoramaService } from '../../repository/dorama.service';
import { FansubService } from '../../repository/fansub.service';

@ApiExcludeController()
@Controller('/fansub-dorama')
export class FansubDoramaController {

  constructor(
    private doramaRepo: DoramaService,
    private berkasRepo: BerkasService,
    private fansubRepo: FansubService
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
          .orderBy('fansub_.id', 'ASC')
          .select(['dorama_', 'fansub_'])
          .groupBy('dorama_.id')
          .addGroupBy('fansub_.id');
        const filesRaw = await fileRepoQuery.getRawMany();
        const files = [];
        for (const fr of filesRaw) {
          const berkas = this.berkasRepo.new();
          berkas.dorama_ = this.doramaRepo.new();
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
          if ('dorama_' in f && f.dorama_) {
            delete f.dorama_.created_at;
            delete f.dorama_.updated_at;
          }
          if ('fansub_' in f && f.fansub_) {
            for (const fansub of f.fansub_) {
              if (fansubId.includes(fansub.id)) {
                results[fansub.id].push(f.dorama_);
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
