import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ILike, In } from 'typeorm';

import { UserModel } from '../../../models/req-res.model';

import { BerkasService } from '../../repository/berkas.service';

@Controller('/anime-berkas')
export class AnimeBerkasController {

  constructor(
    private berkasRepo: BerkasService
  ) {
    //
  }

  // PATCH `/api/anime-berkas?id=`
  @Patch('/')
  @HttpCode(202)
  async berkasAnime(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const animeId = req.query['id'] ? (req.query['id'] as string).split(',').map(Number) : req.body.id;
      if (Array.isArray(animeId) && animeId.length > 0) {
        const [files, count] = await this.berkasRepo.findAndCount({
          where: [
            {
              ...((user?.verified) ? {
                // Verified User Can See Private Berkas
              } : {
                private: false
              }),
              name: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
              anime_: {
                id: In(animeId)
              }
            }
          ],
          order: {
            ...((req.query['sort'] && req.query['order']) ? {
              [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
            } : {
              created_at: 'DESC',
              name: 'ASC'
            })
          },
          relations: ['project_type_', 'fansub_', 'user_', 'anime_'],
          skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
          take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
        });
        const results: any = {};
        for (const i of animeId) {
          results[i] = [];
        }
        for (const f of files) {
          delete f.download_url;
          delete f.description;
          if ('project_type_' in f && f.project_type_) {
            delete f.project_type_.created_at;
            delete f.project_type_.updated_at;
          }
          if ('fansub_' in f && f.fansub_) {
            for (const fansub of f.fansub_) {
              delete fansub.description;
              delete fansub.urls;
              delete fansub.tags;
              delete fansub.created_at;
              delete fansub.updated_at;
            }
          }
          if ('anime_' in f && f.anime_) {
            delete f.anime_.created_at;
            delete f.anime_.updated_at;
          }
          if ('user_' in f && f.user_) {
            delete f.user_.email;
            delete f.user_.password;
            delete f.user_.session_token;
            delete f.user_.created_at;
            delete f.user_.updated_at;
          }
          results[f.anime_.id].push(f);
        }
        return {
          info: `😅 202 - Anime API :: Berkas 🤣`,
          count,
          pages: Math.ceil(count / (queryRow ? queryRow : 10)),
          results
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Anime API :: Gagal Mencari Berkas ${req.query['id']} 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
