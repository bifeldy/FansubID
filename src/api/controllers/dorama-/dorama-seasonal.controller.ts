// NodeJS Library
import { URL } from 'node:url';

import { CACHE_MANAGER, Controller, Get, HttpCode, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';

import { environment } from '../../../environments/api/environment';

import { JsonCache } from '../../../models/req-res.model';

import { ApiService } from '../../services/api.service';
import { GlobalService } from '../../services/global.service';

@Controller('/dorama-seasonal')
export class DoramaSeasonalController {

  seasonal = [
    { id: 1, name: 'winter' }, { id: 2, name: 'spring' },
    { id: 3, name: 'summer' }, { id: 4, name: 'fall' }
  ];

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
  async seasonalDorama(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const currDate = new Date();
    const year = req.query['year'] || currDate.getFullYear();
    const season = req.query['season'] || this.seasonal.find(sB => sB.id === Math.ceil((currDate.getMonth() + 1) / 3)).name;
    const quarter = this.seasonal.find(sB => sB.name === season).id || Math.ceil((currDate.getMonth() + 1) / 3);
    const cacheData: JsonCache = await this.cm.get(req.originalUrl);
    if (cacheData) {
      return cacheData.body;
    } else {
      try {
        const url = new URL(`${environment.externalApiDorama}/seasonal/${year}/${quarter}`);
        const res_raw = await this.api.get(url, environment.nodeJsXhrHeader);
        if (res_raw.ok) {
          const res_json: any = await res_raw.json();
          this.gs.log(`[apiDorama] 🔥 ${res_raw.status}`, res_json);
          const responseBody = {
            info: `😅 ${res_raw.status} - Dorama API :: Seasonal ${season} ${year} 🤣`,
            results: res_json
          };
          if (res_json.length > 0) {
            this.cm.set(req.originalUrl, { status: res_raw.status, body: responseBody }, { ttl: environment.externalApiCacheTime });
          }
          return responseBody;
        } else {
          throw new Error('Gagal Tarik Data Dorama');
        }
      } catch (error) {
        return {
          info: `😅 200 - Dorama API :: Seasonal ${season} ${year} 🤣`,
          results: []
        };
      }
    }
  }

}
