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

@Controller('/dorama-seasonal')
export class DoramaSeasonalController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private api: ApiService,
    private gs: GlobalService
  ) {
    //
  }

  // GET `/api/dorama-seasonal`
  @Get('/')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagDorama)
  @ApiQuery({ name: 'year', required: false, type: 'number' })
  @ApiQuery({ name: 'season', required: false, type: 'string' })
  async seasonalDorama(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const currDate = new Date();
    const year = req.query['year'] || currDate.getFullYear();
    const season = req.query['season'] || this.gs.seasonal.find(sB => sB.id === Math.ceil((currDate.getMonth() + 1) / 3)).name;
    const quarter = this.gs.seasonal.find(sB => sB.name === season).id || Math.ceil((currDate.getMonth() + 1) / 3);
    try {
      const url = new URL(`${environment.externalApiDorama}/seasonal/${year}/${quarter}`);
      const res_raw = await this.api.getData(url, environment.nodeJsXhrHeader);
      if (res_raw.ok) {
        const res_json: any = await res_raw.json();
        this.gs.log(`[apiDorama] 🔥 ${res_raw.status}`, res_json);
        const responseBody = {
          info: `😅 ${res_raw.status} - Dorama API :: Seasonal ${season} ${year} 🤣`,
          results: res_json
        };
        if (res_json.length > 0) {
          this.cm.set(req.originalUrl, { status: res_raw.status, body: responseBody }, { ttl: CONSTANTS.externalApiCacheTime });
        }
        return responseBody;
      }
      throw new Error('Gagal Tarik Data Dorama!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Dorama API :: Gagal Menarik Data 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
