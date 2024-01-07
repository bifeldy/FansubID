import { Controller, Get, HttpCode, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ILike, Raw } from 'typeorm';

import { CONSTANTS } from '../../../constants';

import { KanjiService } from '../../repository/kanji.service';

@Controller('/nihongo-kanji')
export class NihongoKanjiController {

  constructor(
    private kanjiRepo: KanjiService
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
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [kanjis, count] = await this.kanjiRepo.findAndCount({
        where: [
          {
            character: Raw(column => `
                (character ILIKE :query OR v_onyomi ILIKE :query OR v_kunyomi ILIKE :query OR translate ILIKE :query)
                AND jlpt::varchar(255) ILIKE :jlpt AND school::varchar(255) ILIKE :school
              `, {
                query: `%${req.query['q'] ? req.query['q'] : ''}%`,
                jlpt: `%${req.query['jlpt'] ? req.query['jlpt'] : ''}%`,
                school: `%${req.query['school'] ? req.query['school'] : ''}%`
              }
            )
          },
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            character: 'ASC'
          })
        },
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      return {
        info: `😅 200 - Kanji API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: kanjis
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Kanji API :: Gagal Mendapatkan All Kanjis 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:character')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagNihongo)
  @ApiParam({ name: 'character', type: 'string' })
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const kanji = await this.kanjiRepo.findOneOrFail({
        where: [
          { character: ILike(req.params['character']) }
        ]
      });
      return {
        info: `😅 200 - Kanji API :: Detail ${req.params['character']} 🤣`,
        result: kanji
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Kanji API :: Gagal Mencari Kanji ${req.params['character']} 😪`,
        result: {
          message: 'Kanji Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
