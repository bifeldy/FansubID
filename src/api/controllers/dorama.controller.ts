// 3rd Party Library
import translate from '@iamtraction/google-translate';

// NodeJS Library
import { URL } from 'node:url';

import { CACHE_MANAGER, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';
import { Equal } from 'typeorm';

import { environment } from '../../environments/api/environment';

import { Roles } from '../decorators/roles.decorator';

import { JsonCache, RoleModel } from '../../models/req-res.model';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../services/global.service';

import { DoramaService } from '../repository/dorama.service';

@Controller('/dorama')
export class DoramaController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private api: ApiService,
    private gs: GlobalService,
    private doramaRepo: DoramaService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  async searchDorama(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    const searchType = req.query['type'] || '';
    const cacheData: JsonCache = await this.cm.get(req.originalUrl);
    if (cacheData) {
      return cacheData.body;
    } else {
      try {
        const url = new URL(`${environment.externalApiDorama}/search/q/${searchQuery}`);
        const res_raw = await this.api.get(url, environment.nodeJsXhrHeader);
        if (res_raw.ok) {
          const res_json: any = await res_raw.json();
          this.gs.log(`[apiDorama] 🔥 ${res_raw.status}`, res_json);
          let data = res_json.results.filter(x => x.type.toLowerCase().includes(searchType));
          const responseBody = {
            info: `😅 ${res_raw.status} - Dorama API :: Search ${searchQuery} 🤣`,
            results: data
          };
          if (data.length > 0) {
            this.cm.set(req.originalUrl, { status: res_raw.status, body: responseBody }, { ttl: environment.externalApiCacheTime });
          }
          return responseBody;
        } else {
          throw new Error('Gagal Tarik Data Dorama');
        }
      } catch (error) {
        return {
          info: `😅 200 - Dorama API :: Search ${searchQuery} 🤣`,
          results: []
        };
      }
    }
  }

  @Patch('/')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async updateDorama(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('id' in req.body && 'name' in req.body && 'image_url' in req.body) {
        const doramas = await this.doramaRepo.find({
          where: [
            { id: Equal(req.body.id) }
          ]
        });
        if (doramas.length === 0) {
          const dorama = this.doramaRepo.new();
          dorama.id = req.body.id;
          dorama.slug = req.body.slug;
          dorama.name = req.body.name;
          dorama.image_url = req.body.image_url;
          dorama.type = req.body.type;
          const resultSaveDorama = await this.doramaRepo.save(dorama);
          return {
            info: `😅 202 - Dorama API :: Tambah Baru 🤣`,
            result: resultSaveDorama
          };
        } else if (doramas.length === 1) {
          const dorama = doramas[0];
          if (req.body.id) {
            dorama.id = req.body.id;
          }
          if (req.body.slug) {
            dorama.slug = req.body.slug;
          }
          if (req.body.name) {
            dorama.name = req.body.name;
          }
          if (req.body.image_url) {
            dorama.image_url = req.body.image_url;
          }
          if (req.body.type) {
            dorama.type = req.body.type;
          }
          const resultSaveDorama = await this.doramaRepo.save(dorama);
          return {
            info: `😅 202 - Dorama API :: Data Dorama Diperbaharui 🤣`,
            result: resultSaveDorama
          };
        } else {
          return {
            info: `😍 202 - Dorama API :: Data Dorama Multi Duplikat 🥰`,
            result: doramas
          };
        }
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Dorama API :: Gagal Menambah Dorama 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:mdlSlug')
  @HttpCode(200)
  async getDetailDorama(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const mdlId = req.params['mdlSlug'].split('-')[0];
    const cacheData: JsonCache = await this.cm.get(req.originalUrl);
    if (cacheData) {
      return cacheData.body;
    } else {
      try {
        const url = new URL(`${environment.externalApiDorama}/id/${req.params['mdlSlug']}`);
        const res_raw = await this.api.get(url, environment.nodeJsXhrHeader);
        if (res_raw.ok) {
          const res_json: any = await res_raw.json();
          this.gs.log(`[apiDorama] 🔥 ${res_raw.status}`, res_json);
          let httpStatusCode = res_raw.status;
          const dramaDetail = res_json.data;
          try {
            if ('synopsis' in dramaDetail && dramaDetail.synopsis) {
              const translatedDoramaSynopsis = await translate(dramaDetail.synopsis, { to: 'id' });
              dramaDetail.synopsis = translatedDoramaSynopsis.text;
            }
          } catch (err) {
            httpStatusCode = 202;
            dramaDetail.message = 'Penerjemah / Alih Bahasa Gagal!';
          }
          const responseBody = {
            info: `😅 ${httpStatusCode} - Dorama API :: Detail ${mdlId} 🤣`,
            result: dramaDetail
          };
          if (dramaDetail) {
            this.cm.set(req.originalUrl, { status: httpStatusCode, body: responseBody }, { ttl: environment.externalApiCacheTime });
          }
          return responseBody;
        } else {
          throw new Error('Gagal Tarik Data Dorama');
        }
      } catch (error) {
        return {
          info: `😅 200 - Dorama API :: Detail ${mdlId} 🤣`,
          result: null
        };
      }
    }
  }

}