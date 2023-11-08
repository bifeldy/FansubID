import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { In } from 'typeorm';

import { CONSTANTS } from '../../../constants';

import { BerkasService } from '../../repository/berkas.service';

@Controller('/berkas-trusted')
export class BerkasTrustedController {

  constructor(
    private berkasRepo: BerkasService
  ) {
    //
  }

  // PATCH `/api/berkas-trusted?id=`
  @Patch('/')
  @HttpCode(202)
  @ApiTags(CONSTANTS.apiTagBerkas)
  @ApiBody({
    schema: {
      properties: {
        id: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    }
  })
  async berkasTrusted(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try{
      const berkasId = req.query['id'] ? (req.query['id'] as string).split(',').map(b => b.trim()) : req.body.id;
      if (Array.isArray(berkasId) && berkasId.length > 0) {
        const results: any = {};
        for (const i of berkasId) {
          results[i] = false;
        }
        const files = await this.berkasRepo.find({
          where: [
            { id: In(berkasId) }
          ]
        });
        if (files.length > 0) {
          let prm = '$1';
          const bid: string[] = [];
          for (let i = 0; i < files.length; i++) {
            if (i > 0) {
              prm += `, $${i+1}`;
            }
            bid.push(files[i].id);
          }
          const berkas = await this.berkasRepo.query(`
            SELECT b.id bid, f.id fid, fm.user_id fm_uid
            FROM berkas b
              LEFT JOIN berkas_fansub__fansub bff ON bff."berkasId" = b.id
              LEFT JOIN fansub f ON f.id = bff."fansubId"
              LEFT JOIN fansub_member fm ON (fm.fansub_id = f.id AND fm.user_id = b.user_id)
            WHERE
              b.id IN (${prm})
              AND fm.user_id IS NOT NULL
              AND fm.approved = true
          `, bid);
          for (const b of berkas) {
            results[b.bid] = true;
          }
        }
        return {
          info: `😅 202 - Berkas API :: Trusted 🤣`,
          count: 1,
          pages: 1,
          results
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Berkas API :: Gagal Mencari Berkas ${req.query['id']} 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}