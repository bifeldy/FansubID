import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ILike } from 'typeorm';

import { CONSTANTS } from '../../../constants';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { FansubService } from '../../repository/fansub.service';

@ApiExcludeController()
@Controller('/fansub-slug')
export class FansubSlugController {

  constructor(
    private fansubRepo: FansubService
  ) {
    //
  }

  // PATCH `/api/fansub-slug`
  @Patch('/')
  @HttpCode(202)
  @FilterApiKeyAccess()
  async checkSlug(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('slug' in req.body && req.body.slug) {
        const slug = req.body.slug.replace(/[^0-9a-zA-Z-]/g, '').toLowerCase();
        if (CONSTANTS.blacklistedWords.includes(slug)) {
          return {
            info: '😅 202 - Fansub API :: Cek Fansub Slug Gagal 🥰',
            result: {
              message: `'${slug}' Tidak Dapat Digunakan`
            }
          };
        }
        const selectedFansub = await this.fansubRepo.find({
          where: [
            { slug: ILike(slug) }
          ]
        });
        if (selectedFansub.length === 0) {
          return {
            info: `😅 202 - Fansub API :: Cek Slug Berhasil 🤣`,
            result: {
              message: `'${slug}' Dapat Digunakan`
            }
          };
        } else {
          return {
            info: '😅 202 - Fansub API :: Cek Fansub Slug Gagal 🥰',
            result: {
              message: `'${slug}' Sudah Terpakai`
            }
          };
        }
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Fansub API :: Gagal Mengecek Fansub Slug 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
