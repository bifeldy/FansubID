import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ILike, In } from 'typeorm';

import { UserModel } from '../../../models/req-res.model';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { BerkasService } from '../../repository/berkas.service';

@ApiExcludeController()
@Controller('/dorama-berkas')
export class DoramaBerkasController {

  constructor(
    private berkasRepo: BerkasService
  ) {
    //
  }

  // PATCH `/api/dorama-berkas?id=`
  @Patch('/')
  @HttpCode(202)
  @FilterApiKeyAccess()
  async berkasDorama(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const doramaId = req.query['id'] ? (req.query['id'] as string).split(',') : req.body.id;
      if (Array.isArray(doramaId) && doramaId.length > 0) {
        const [files, count] = await this.berkasRepo.findAndCount({
          where: [
            {
              ...((user?.verified) ? {
                // Verified User Can See Private Berkas
              } : {
                private: false
              }),
              name: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
              dorama_: {
                id: In(doramaId)
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
          relations: ['project_type_', 'fansub_', 'user_', 'dorama_'],
          skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
          take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
        });
        const results: any = {};
        for (const i of doramaId) {
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
          if ('dorama_' in f && f.dorama_) {
            delete f.dorama_.created_at;
            delete f.dorama_.updated_at;
          }
          if ('user_' in f && f.user_) {
            delete f.user_.created_at;
            delete f.user_.updated_at;
          }
          results[f.dorama_.id].push(f);
        }
        return {
          info: `😅 202 - Dorama API :: Berkas 🤣`,
          count,
          pages: Math.ceil(count / (queryRow ? queryRow : 10)),
          results
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Dorama API :: Gagal Mencari Berkas ${req.query['id']} 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
