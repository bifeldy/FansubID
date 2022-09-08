import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { FindManyOptions, In } from 'typeorm';

import { Berkas } from '../../entities/Berkas';

import { BerkasService } from '../../repository/berkas.service';

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
  async fansubDorama(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
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
