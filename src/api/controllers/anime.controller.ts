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

import { RoleModel } from '../../models/req-res.model';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../services/global.service';

import { AnimeService } from '../repository/anime.service';

@Controller('/anime')
export class AnimeController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private api: ApiService,
    private gs: GlobalService,
    private animeRepo: AnimeService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  async searchAnime(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    const searchType = req.query['type'] || '';
    try {
      const url = new URL(`${environment.externalApiAnime}/anime`);
      url.searchParams.append('q', searchQuery as string);
      url.searchParams.append('type', searchType as string);
      const res_raw = await this.api.get(url, environment.nodeJsXhrHeader);
      if (res_raw.ok) {
        const res_json: any = await res_raw.json();
        this.gs.log(`[apiAnime] 🔥 ${res_raw.status}`, res_json);
        let data = res_json.data;
        for (let i = 0; i < data.length; i++) {
          data[i].image_url = data[i].images.jpg?.image_url || data[i].images.webp?.image_url;
        }
        const responseBody = {
          info: `😅 ${res_raw.status} - Anime API :: Search ${searchQuery} 🤣`,
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
      return {
        info: `😅 200 - Anime API :: Search ${searchQuery} 🤣`,
        results: []
      };
    }
  }

  @Patch('/')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async updateAnime(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('id' in req.body && 'name' in req.body && 'image_url' in req.body) {
        const animes = await this.animeRepo.find({
          where: [
            { id: Equal(req.body.id) }
          ]
        });
        if (animes.length === 0) {
          const anime = this.animeRepo.new();
          anime.id = req.body.id;
          anime.name = req.body.name;
          anime.image_url = req.body.image_url;
          anime.type = req.body.type;
          const resultSaveAnime = await this.animeRepo.save(anime);
          return {
            info: `😅 202 - Anime API :: Tambah Baru 🤣`,
            result: resultSaveAnime
          };
        } else if (animes.length === 1) {
          const anime = animes[0];
          if ('id' in req.body) {
            anime.id = req.body.id;
          }
          if ('name' in req.body) {
            anime.name = req.body.name;
          }
          if ('image_url' in req.body) {
            anime.image_url = req.body.image_url;
          }
          if ('type' in req.body) {
            anime.type = req.body.type;
          }
          const resultSaveAnime = await this.animeRepo.save(anime);
          return {
            info: `😅 202 - Anime API :: Data Anime Diperbaharui 🤣`,
            result: resultSaveAnime
          };
        } else {
          return {
            info: `😍 202 - Anime API :: Data Anime Multi Duplikat 🥰`,
            result: animes
          };
        }
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Anime API :: Gagal Menambah Anime 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:malSlug')
  @HttpCode(200)
  async getDetailAnime(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const malId = req.params['malSlug'].split('-')[0];
    try {
      const url = new URL(`${environment.externalApiAnime}/anime/${malId}`);
      const res_raw = await this.api.get(url, environment.nodeJsXhrHeader);
      if (res_raw.ok) {
        const res_json: any = await res_raw.json();
        this.gs.log(`[apiAnime] 🔥 ${res_raw.status}`, res_json);
        let httpStatusCode = res_raw.status;
        const animeDetail = res_json.data;
        animeDetail.image_url = animeDetail.images.jpg?.image_url || animeDetail.images.webp?.image_url;
        try {
          if ('synopsis' in animeDetail && animeDetail.synopsis) {
            const translatedAnimeSynopsis = await translate(animeDetail.synopsis, { to: 'id' });
            animeDetail.synopsis = translatedAnimeSynopsis.text;
          }
        } catch (err) {
          httpStatusCode = 202;
          animeDetail.message = 'Penerjemah / Alih Bahasa Gagal!';
        }
        const responseBody = {
          info: `😅 ${httpStatusCode} - Anime API :: Detail ${malId} 🤣`,
          result: animeDetail
        };
        if (animeDetail) {
          this.cm.set(req.originalUrl, { status: httpStatusCode, body: responseBody }, { ttl: environment.externalApiCacheTime });
        }
        return responseBody;
      } else {
        throw new Error('Gagal Tarik Data Anime');
      }
    } catch (error) {
      return {
        info: `😅 200 - Anime API :: Detail ${malId} 🤣`,
        result: null
      };
    }
  }

}
