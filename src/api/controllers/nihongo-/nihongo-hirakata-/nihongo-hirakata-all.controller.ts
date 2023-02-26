import { Controller, Get, HttpCode, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { HirakataService } from '../../../repository/hirakata.service';

@ApiExcludeController()
@Controller('/nihongo-hirakata-all')
export class NihongoHirakataAllController {

  constructor(
    private hirakataRepo: HirakataService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const [hirakatas, count] = await this.hirakataRepo.findAndCount({
        order: {
          segment: 'ASC',
          category: 'ASC',
          romaji: 'ASC'
        }
      });
      return {
        info: `😅 200 - Hirakata API :: List All 🤣`,
        count,
        pages: 1,
        results: hirakatas
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Hirakata API :: Gagal Mendapatkan All Hirakata 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
