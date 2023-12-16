// 3rd Party Library
import { FormData } from 'node-fetch';
import { URL } from 'node:url';

import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { In, IsNull, Not } from 'typeorm';

import { environment } from '../../../environments/api/environment';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { ApiService } from '../../services/api.service';
import { FansubService } from '../../repository/fansub.service';
import { GlobalService } from '../../services/global.service';

@ApiExcludeController()
@Controller('/fansub-internet-positif')
export class FansubInternetPositifController {

  constructor(
    private api: ApiService,
    private fansubRepo: FansubService,
    private gs: GlobalService
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
            const url = new URL(environment.externalApiInternetPositif);
            const form = new FormData();
            form.append('name', fdom.join('\n'));
            const res_raw = await this.api.postData(url, form, environment.nodeJsXhrHeader);
            if (res_raw.ok) {
              const res_json: any = await res_raw.json();
              this.gs.log(`[apiInternetPositif] 🛡 ${res_raw.status}`, res_json);
              for (const val of res_json.values) {
                results[domains[val.Domain]] = val.Status === 'Ada';
              }
            } else {
              throw new HttpException({
                info: `🙄 ${res_raw.status || 400} - Internet Positif API :: Cek Domain Gagal 😪`,
                result: {
                  message: 'Data Tidak Lengkap / Internet Positif API Down!'
                }
              }, res_raw.status || HttpStatus.BAD_REQUEST);
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
        info: `🙄 400 - Fansub API :: Gagal Mengecek Domain ${req.query['id']} 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}