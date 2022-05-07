import { Controller, Get, HttpCode, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { KanjivgService } from '../../repository/kanjivg.service';

@Controller('/nihongo-kanjivg')
export class NihongoKanjivgController {

  constructor(
    private kanjivgRepo: KanjivgService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [kanjivgs, count] = await this.kanjivgRepo.findAndCount({
        where: [
          { kanji: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) },
          { level: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            id: 'ASC'
          })
        },
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      return {
        info: `😅 200 - KanjiVg API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: kanjivgs
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - KanjiVg API :: Gagal Mendapatkan All KanjiVgs 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @HttpCode(200)
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const kanjivg = await this.kanjivgRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ]
      });
      return {
        info: `😅 200 - KanjiVg API :: Detail ${req.params['id']} 🤣`,
        result: kanjivg
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - KanjiVg API :: Gagal Mencari KanjiVg ${req.params['id']} 😪`,
        result: {
          message: 'KanjiVg Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
