import { Controller, HttpCode, HttpException, HttpStatus, Patch, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { RoleModel, UserModel } from '../../../models/req-res.model';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { BerkasService } from '../../repository/berkas.service';
import { GlobalService } from '../../services/global.service';

@ApiExcludeController()
@Controller('/fansub-berkas')
export class FansubBerkasController {

  constructor(
    private berkasRepo: BerkasService,
    private gs: GlobalService
  ) {
    //
  }

  // PATCH `/api/fansub-berkas?id=`
  @Patch('/')
  @HttpCode(202)
  @FilterApiKeyAccess()
  async berkasFansub(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const fansubId = req.query['id'] ? (req.query['id'] as string).split(',').map(Number) : req.body.id;
      if (Array.isArray(fansubId) && fansubId.length > 0) {
        let fileRepoQuery = this.berkasRepo.instance()
          .createQueryBuilder('berkas')
          .leftJoinAndSelect('berkas.project_type_', 'project_type_')
          .leftJoinAndSelect('berkas.anime_', 'anime_')
          .leftJoinAndSelect('berkas.dorama_', 'dorama_')
          .leftJoinAndSelect('berkas.user_', 'user_')
          .leftJoinAndSelect('berkas.fansub_', 'fansub_')
          .where('berkas.name ILIKE :query', { query: `%${req.query['q'] ? req.query['q'] : ''}%` })
          .andWhere('fansub_.id IN (:...id)', { id: fansubId })
          .andWhere('user_.private = :isPrivate', { isPrivate: true })
          .andWhere('berkas.private = :isPrivate', { isPrivate: false })
          .orWhere('berkas.name ILIKE :query', { query: `%${req.query['q'] ? req.query['q'] : ''}%` })
          .andWhere('fansub_.id IN (:...id)', { id: fansubId })
          .andWhere('user_.private = :isPrivate', { isPrivate: false });
        if (user?.verified) {
          // Verified User Can See Private Berkas From Public Profile
        } else {
          fileRepoQuery = fileRepoQuery.andWhere('berkas.private = :isPrivate', { isPrivate: false });
        }
        if (user) {
          fileRepoQuery = fileRepoQuery
            .orWhere('berkas.name ILIKE :query', { query: `%${req.query['q'] ? req.query['q'] : ''}%` })
            .andWhere('fansub_.id IN (:...id)', { id: fansubId })
          if (user.role === RoleModel.ADMIN || user.role === RoleModel.MODERATOR || user.role === RoleModel.FANSUBBER || this.gs.isFreeTime()) {
            // Admin, Moderator, & Fansubber Can See Private Berkas From All Private Profile
          } else {
            // Current User Can See Private Berkas From Their Private Profile
            fileRepoQuery = fileRepoQuery.andWhere('user_.id = :userId', { userId: user.id });
          }
        }
        if (req.query['sort'] && req.query['order']) {
          fileRepoQuery = fileRepoQuery.orderBy(`berkas.${req.query['sort']}`, (req.query['order'] as (any)).toUpperCase());
        } else {
          fileRepoQuery = fileRepoQuery
            .orderBy('berkas.created_at', 'DESC')
            .addOrderBy('berkas.name', 'ASC');
        }
        const [files, count] = await fileRepoQuery
          .skip(queryPage > 0 ? (queryPage * queryRow - queryRow) : 0)
          .take((queryRow > 0 && queryRow <= 500) ? queryRow : 10)
          .getManyAndCount();
        const results: any = {};
        for (const i of fansubId) {
          results[i] = [];
        }
        for (const f of files) {
          delete f.download_url;
          delete f.description;
          if ('project_type_' in f && f.project_type_) {
            delete f.project_type_.created_at;
            delete f.project_type_.updated_at;
          }
          if ('anime_' in f && f.anime_) {
            delete f.anime_.created_at;
            delete f.anime_.updated_at;
          }
          if ('dorama_' in f && f.dorama_) {
            delete f.dorama_.created_at;
            delete f.dorama_.updated_at;
          }
          if ('user_' in f && f.user_) {
            delete f.user_.created_at;
            delete f.user_.updated_at;
          }
          if ('fansub_' in f && f.fansub_) {
            for (const fansub of f.fansub_) {
              delete fansub.description;
              delete fansub.urls;
              delete fansub.tags;
              delete fansub.created_at;
              delete fansub.updated_at;
              if (fansubId.includes(fansub.id)) {
                results[fansub.id].push(f);
              }
            }
          }
        }
        return {
          info: `😅 202 - Fansub API :: Berkas 🤣`,
          count,
          pages: Math.ceil(count / (queryRow ? queryRow : 10)),
          results
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Fansub API :: Gagal Mencari Berkas ${req.query['id']} 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
