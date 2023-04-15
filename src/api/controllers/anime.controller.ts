// 3rd Party Library
import translate from '@iamtraction/google-translate';

// NodeJS Library
import { URL } from 'node:url';

import { CACHE_MANAGER, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';
import { Equal } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';

import { RoleModel } from '../../models/req-res.model';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../services/global.service';

import { AnimeService } from '../repository/anime.service';

@Controller('/anime')
export class AnimeController {

  header = { ...environment.nodeJsXhrHeader, 'X-MAL-CLIENT-ID': environment.malClientId };

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
  @ApiTags(CONSTANTS.apiTagAnime)
  @ApiQuery({ name: 'q', required: true, type: 'string' })
  async searchAnime(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      if (searchQuery.length < 3) {
        throw new HttpException({
          info: '🙄 400 - Anime API :: Gagal Mencari Anime 😪',
          result: {
            message: 'Minimal 3 Huruf Untuk Pencarian!'
          }
        }, HttpStatus.BAD_REQUEST);
      }
      const url = new URL(`${environment.externalApiAnime}/anime?nsfw=true&fields=media_type,num_episodes`);
      url.searchParams.append('q', searchQuery as string);
      const res_raw = await this.api.getData(url, this.header);
      const data = [];
      if (res_raw.ok) {
        const res_json: any = await res_raw.json();
        this.gs.log(`[apiAnime] 🔥 ${res_raw.status}`, res_json);
        const data1 = res_json.data;
        for (let i = 0; i < data1.length; i++) {
          data1[i].node.image_url = data1[i].node.main_picture?.medium || data1[i].node.main_picture?.large;
          data.push(data1[i].node);
        }
        const responseBody = {
          info: `😅 ${res_raw.status} - Anime API :: Search ${searchQuery} 🤣`,
          results: data
        };
        if (data.length > 0) {
          this.cm.set(req.originalUrl, { status: res_raw.status, body: responseBody }, { ttl: environment.externalApiCacheTime });
        }
        return responseBody;
      }
      throw new Error('Gagal Tarik Data Anime');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Anime API :: Gagal Menarik Data 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/')
  @HttpCode(202)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
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
        }
        return {
          info: `😍 202 - Anime API :: Data Anime Multi Duplikat 🥰`,
          result: animes
        };
      }
      throw new Error('Data Tidak Lengkap!');
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
  @ApiTags(CONSTANTS.apiTagAnime)
  @ApiParam({ name: 'malSlug', type: 'number' })
  async getDetailAnime(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const malId = req.params['malSlug'].split('-')[0];
    try {
      const url = new URL(`${environment.externalApiAnime}/anime/${malId}?nsfw=true&sort=anime_score&limit=2&offset=1&fields=alternative_titles,synopsis,mean,media_type,genres,start_date,end_date,num_episodes,rank,popularity,status`);
      const res_raw = await this.api.getData(url, this.header);
      if (res_raw.ok) {
        const res_json: any = await res_raw.json();
        this.gs.log(`[apiAnime] 🔥 ${res_raw.status}`, res_json);
        let httpStatusCode = res_raw.status;
        const animeDetail = res_json;
        animeDetail.image_url = animeDetail.main_picture?.medium || animeDetail.main_picture?.large;
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
      }
      throw new Error('Gagal Tarik Data Anime');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Anime API :: Gagal Menarik Data 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
