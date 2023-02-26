// NodeJS Library
import { URL } from 'node:url';

import { CACHE_MANAGER, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Req, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';

import { CONSTANTS } from '../../../constants';

import { environment } from '../../../environments/api/environment';

import { ApiService } from '../../services/api.service';
import { GlobalService } from '../../services/global.service';

@Controller('/anime-seasonal')
export class AnimeSeasonalController {

  header = { ...environment.nodeJsXhrHeader, 'X-MAL-CLIENT-ID': environment.malClientId };

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
  @ApiTags(CONSTANTS.apiTagAnime)
  @ApiQuery({ name: 'year', required: false, type: 'number' })
  @ApiQuery({ name: 'season', required: false, type: 'string' })
  async seasonalAnime(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const currDate = new Date();
    const year = req.query['year'] || currDate.getFullYear();
    const season = req.query['season'] || this.gs.seasonal.find(sB => sB.id === Math.ceil((currDate.getMonth() + 1) / 3)).name;
    const data = [];
    let status = 200;
    try {
      const url1 = new URL(`${environment.externalApiAnime}/anime/season/${year}/${season}?nsfw=true&limit=500&fields=rank,mean,media_type,num_episodes`);
      const res_raw1 = await this.api.getData(url1, this.header);
      if (res_raw1.ok) {
        const res_json1: any = await res_raw1.json();
        this.gs.log(`[apiAnime] 🔥 ${res_raw1.status}`, res_json1);
        let data1 = res_json1.data;
        for (let i = 0; i < data1.length; i++) {
          data1[i].node.image_url = data1[i].node.main_picture?.medium || data1[i].node.main_picture?.large;
          data.push(data1[i].node);
        }
        status = res_raw1.status;
        let next = res_json1.paging?.next;
        while (next) {
          const res_rawn = await this.api.getData(next, this.header);
          if (res_rawn.ok) {
            const res_jsonn: any = await res_rawn.json();
            this.gs.log(`[apiAnime] 🔥 ${res_rawn.status}`, res_jsonn);
            const datan = res_jsonn.data;
            for (let i = 0; i < datan.length; i++) {
              datan[i].node.image_url = datan[i].node.main_picture?.medium || datan[i].node.main_picture?.large;
              data.push(datan[i].node);
            }
            status = res_rawn.status;
            next = res_jsonn.paging?.next;
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
