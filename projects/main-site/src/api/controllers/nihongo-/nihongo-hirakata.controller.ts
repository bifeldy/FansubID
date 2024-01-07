import { Controller, Get, HttpCode, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ILike } from 'typeorm';

import { CONSTANTS } from '../../../constants';

import { HirakataService } from '../../repository/hirakata.service';

@Controller('/nihongo-hirakata')
export class NihongoHirakataController {

  constructor(
    private hirakataRepo: HirakataService
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
      const [hirakatas, count] = await this.hirakataRepo.findAndCount({
        where: [
          { romaji: ILike(`%${searchQuery}%`) },
          { katakana: ILike(`%${searchQuery}%`) },
          { hiragana: ILike(`%${searchQuery}%`) }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            segment: 'ASC',
            category: 'ASC',
            romaji: 'ASC'
          })
        },
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      return {
        info: `😅 200 - Hirakata API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: hirakatas
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Hirakata API :: Gagal Mendapatkan All Hirakatas 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:romaji')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagNihongo)
  @ApiParam({ name: 'romaji', type: 'string' })
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const hirakata = await this.hirakataRepo.findOneOrFail({
        where: [
          { romaji: ILike(req.params['romaji']) }
        ]
      });
      return {
        info: `😅 200 - Hirakata API :: Detail ${req.params['romaji']} 🤣`,
        result: hirakata
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Hirakata API :: Gagal Mencari Hirakata ${req.params['romaji']} 😪`,
        result: {
          message: 'Hirakata Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
