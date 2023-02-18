// NodeJS Library
import { URL } from 'node:url';

import { CACHE_MANAGER, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';

import { environment } from '../../../environments/api/environment';

import { ApiService } from '../../services/api.service';
import { GlobalService } from '../../services/global.service';

@Controller('/anime-seasonal')
export class AnimeSeasonalController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private api: ApiService,
    private gs: GlobalService
  ) {
    //
  }

  // GET `/api/anime-seasonal`
  @Get('/')
  @HttpCode(200)
  async seasonalAnime(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const currDate = new Date();
    const year = req.query['year'] || currDate.getFullYear();
    const season = req.query['season'] || this.gs.seasonal.find(sB => sB.id === Math.ceil((currDate.getMonth() + 1) / 3)).name;
    const data = [];
    let status = 200;
    try {
      let page = 1;
      const url1 = new URL(`${environment.externalApiAnime}/seasons/${year}/${season}?page=${page}`);
      const res_raw1 = await this.api.getData(url1, environment.nodeJsXhrHeader);
      if (res_raw1.ok) {
        const res_json1: any = await res_raw1.json();
        this.gs.log(`[apiAnime-1] 🔥 ${res_raw1.status}`, res_json1);
        const pagen = res_json1.pagination?.last_visible_page || 1;
        let data1 = res_json1.data;
        for (let i = 0; i < data1.length; i++) {
          data1[i].image_url = data1[i].images.jpg?.image_url || data1[i].images.webp?.image_url;
        }
        data.push(...data1);
        status = res_raw1.status;
        while (page < pagen) {
          page++;
          const urln = new URL(`${environment.externalApiAnime}/seasons/${year}/${season}?page=${page}`);
          const res_rawn = await this.api.getData(urln, environment.nodeJsXhrHeader);
          if (res_rawn.ok) {
            const res_jsonn: any = await res_rawn.json();
            this.gs.log(`[apiAnime-${page}] 🔥 ${res_rawn.status}`, res_jsonn);
            const datan = res_jsonn.data;
            for (let i = 0; i < datan.length; i++) {
              datan[i].image_url = datan[i].images.jpg?.image_url || datan[i].images.webp?.image_url;
            }
            data.push(...datan);
            status = res_rawn.status;
          } else {
            throw new Error('Gagal Tarik Data Anime');
          }
        }
      }
      else {
        throw new Error('Gagal Tarik Data Anime');
      }
      const responseBody = {
        info: `😅 ${status} - Anime API :: Seasonal ${season} ${year} 🤣`,
        results: data
      };
      if (data.length > 0) {
        this.cm.set(req.originalUrl, { status, body: responseBody }, { ttl: environment.externalApiCacheTime });
      }
      return responseBody;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Anime API :: Gagal Menarik Data 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
