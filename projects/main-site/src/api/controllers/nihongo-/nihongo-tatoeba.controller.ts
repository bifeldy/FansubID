import { Controller, Get, HttpCode, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { CONSTANTS } from '../../../constants';

import { TatoebaService } from '../../repository/tatoeba.service';

@Controller('/nihongo-tatoeba')
export class NihongoTatoebaController {

  constructor(
    private tatoebaRepo: TatoebaService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagNihongo)
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [tatoebas, count] = await this.tatoebaRepo.findAndCount({
        where: [
          { phrase: ILike(`%${searchQuery}%`) },
          { kanji: ILike(`%${searchQuery}%`) },
          { translate: ILike(`%${searchQuery}%`) }
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
        info: `😅 200 - Tatoeba API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: tatoebas
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Tatoeba API :: Gagal Mendapatkan All Tatoebas 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagNihongo)
  @ApiParam({ name: 'id', type: 'number' })
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const tatoeba = await this.tatoebaRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ]
      });
      return {
        info: `😅 200 - Tatoeba API :: Detail ${req.params['id']} 🤣`,
        result: tatoeba
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Tatoeba API :: Gagal Mencari Tatoeba ${req.params['id']} 😪`,
        result: {
          message: 'Tatoeba Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
