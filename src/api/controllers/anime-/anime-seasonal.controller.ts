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
    try {
      const url = new URL(`${environment.externalApiAnime}/seasons/${year}/${season}`);
      const res_raw = await this.api.getData(url, environment.nodeJsXhrHeader);
      if (res_raw.ok) {
        const res_json: any = await res_raw.json();
        this.gs.log(`[apiAnime] 🔥 ${res_raw.status}`, res_json);
        let data = res_json.data;
        for (let i = 0; i < data.length; i++) {
          data[i].image_url = data[i].images.jpg?.image_url || data[i].images.webp?.image_url;
        }
        const responseBody = {
          info: `😅 ${res_raw.status} - Anime API :: Seasonal ${season} ${year} 🤣`,
          results: data
        };
        if (data.length > 0) {
          this.cm.set(req.originalUrl, { status: res_raw.status, body: responseBody }, { ttl: environment.externalApiCacheTime });
        }
        return responseBody;
      } else {
        throw new Error('Gagal Tarik Data Anime');
      }
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
