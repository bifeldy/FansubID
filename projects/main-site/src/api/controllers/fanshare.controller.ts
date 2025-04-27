import { Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { Request, Response } from 'express';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';

@Controller('/fanshare')
export class FanshareController {

  constructor() {
    //
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      throw new Error('Belum Di Implementasi!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 404 - Fanshare API :: Gagal Menarik Data 😪',
        result: {
          message: 'DDL Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Post('/')
  @HttpCode(201)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async uploadLampiran(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const file = req.body;
    console.log('uploadLampiran');
    console.log(file);
    try {
      if (file) {
        return {
          info: `😅 201 - Fanshare API :: Upload Publik Berhasil 🤣`,
          result: req.body
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Fanshare API :: Gagal Mengunggah Lampiran 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
