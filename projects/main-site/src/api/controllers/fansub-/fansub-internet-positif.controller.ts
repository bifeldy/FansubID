// 3rd Party Library
import { URL } from 'node:url';

import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { In, IsNull, Not } from 'typeorm';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { FansubService } from '../../repository/fansub.service';
import { IpoChanService } from '../../services/ipo-chan.service';

@ApiExcludeController()
@Controller('/fansub-internet-positif')
export class FansubInternetPositifController {

  constructor(
    private fansubRepo: FansubService,
    private ipochan: IpoChanService
  ) {
    //
  }

  // PATCH `/api/fansub-internet-positif?id=`
  @Patch('/')
  @HttpCode(202)
  @FilterApiKeyAccess()
  async fansubInternetPositif(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try{
      const fansubId = req.query['id'] ? (req.query['id'] as string).split(',').map(Number) : req.body.id;
      if (Array.isArray(fansubId) && fansubId.length > 0 && fansubId.length <= 100) {
        const domains: any = {};
        const results: any = {};
        for (const i of fansubId) {
          results[i] = false;
        }
        const fansubs = await this.fansubRepo.find({
          where: [
            {
              id: In(fansubId),
              rss_feed: Not(IsNull())
            }
          ]
        });
        if (fansubs.length > 0) {
          const fdom: string[] = [];
          for (const fansub of fansubs) {
            const domain = new URL(fansub.rss_feed).host;
            domains[domain] = fansub.id;
            fdom.push(domain);
          }
          if (fdom.length > 0) {
            const values = await this.ipochan.checkDomain(fdom);
            for (const val of values) {
              results[domains[val.Domain]] = val.Status === 'Ada';
            }
          }
        }
        return {
          info: `😅 202 - Fansub API :: Internet Positif 🤣`,
          count: 1,
          pages: 1,
          results
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Fansub Internet Positif API :: Gagal Mengecek Domain ${req.query['id'] || req.body.id} 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}