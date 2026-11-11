import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Patch, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Equal, ILike, IsNull } from 'typeorm';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';

import { KomentarService } from '../repository/komentar.service';

@ApiExcludeController()
@Controller('/comment')
export class CommentController {

  constructor(
    private komentarRepo: KomentarService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPath = req.query['path'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [komens, count] = await this.komentarRepo.findAndCount({
        where: [
          {
            ...((queryPath) ? {
              path: Equal(queryPath as string)
            } : {
              // All Path
            }),
            parent_komentar_: IsNull(),
            comment: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`)
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            id: 'DESC'
          })
        },
        withDeleted: queryPath ? true : false,
        relations: ['parent_komentar_', 'user_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      const komenIds = komens.map(k => k.id);
      const replyCountMap = new Map<number, number>();
      if (komenIds.length > 0) {
        const counts = await this.komentarRepo.instance()
          .createQueryBuilder('k')
          .withDeleted()
          .select('k.parent_komentar_', 'parentId')
          .addSelect('COUNT(k.id)', 'cnt')
          .where('k.parent_komentar_ IN (:...ids)', { ids: komenIds })
          .groupBy('k.parent_komentar_')
          .getRawMany();
        for (const row of counts) {
          replyCountMap.set(Number(row.parentId), Number(row.cnt));
        }
      }
      for (const k of komens) {
        if (k.deleted_at) {
          k.comment = '<span class="gradient-text">Komentar Telah Di Hapus ...</span>';
        }
        if ('user_' in k && k.user_) {
          delete k.user_.created_at;
          delete k.user_.updated_at;
        }
        (k as any).reply_count = replyCountMap.get(k.id) || 0;
      }
      return {
        info: `😅 200 - Komentar API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: komens
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Komentar API :: Gagal Mendapatkan All Komentar 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('path' in req.body && 'comment' in req.body) {
        const user: UserModel = res.locals['user'];
        const komen = this.komentarRepo.new();
        komen.path = req.body.path.split('?')[0];
        komen.comment = req.body.comment;
        if ('parent' in req.body) {
          const comment =  await this.komentarRepo.findOneOrFail({
            where: [
              { id: Equal(req.body.parent) }
            ]
          });
          komen.parent_komentar_ = comment;
        }
        komen.user_ = user;
        const resKomenSave = await this.komentarRepo.save(komen);
        if ('user_' in resKomenSave && resKomenSave.user_) {
          delete resKomenSave.user_.created_at;
          delete resKomenSave.user_.updated_at;
        }
        return {
          info: `😅 201 - Komentar API :: Tambah Baru 🤣`,
          result: resKomenSave
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Komentar API :: Gagal Menambah Komentar Baru 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @HttpCode(200)
  async getReplyByParentId(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [komens, count] = await this.komentarRepo.findAndCount({
        where: [
          {
            parent_komentar_: {
              id: Equal(parseInt(req.params['id']))
            },
            comment: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`)
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            id: 'DESC'
          })
        },
        withDeleted: true,
        relations: ['parent_komentar_', 'user_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      const komenIds = komens.map(k => k.id);
      const replyCountMap = new Map<number, number>();
      if (komenIds.length > 0) {
        const counts = await this.komentarRepo.instance()
          .createQueryBuilder('k')
          .withDeleted()
          .select('k.parent_komentar_', 'parentId')
          .addSelect('COUNT(k.id)', 'cnt')
          .where('k.parent_komentar_ IN (:...ids)', { ids: komenIds })
          .groupBy('k.parent_komentar_')
          .getRawMany();
        for (const row of counts) {
          replyCountMap.set(Number(row.parentId), Number(row.cnt));
        }
      }
      for (const k of komens) {
        if (k.deleted_at) {
          k.comment = '<span class="gradient-text">Komentar Telah Di Hapus ...</span>';
        }
        if ('user_' in k && k.user_) {
          delete k.user_.created_at;
          delete k.user_.updated_at;
        }
        (k as any).reply_count = replyCountMap.get(k.id) || 0;
      }
      return {
        info: `😅 200 - Komentar API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: komens
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Komentar API :: Gagal Mendapatkan All Komentar 😪`,
        result: {
          message: 'Komentar Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Patch('/')
  @HttpCode(202)
  async getHighlight(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('id' in req.body && 'path' in req.body) {
        const komen = await this.komentarRepo.findOneOrFail({
          where: [
            {
              id: Equal(req.body.id),
              path: ILike(req.body.path.split('?')[0])
            }
          ],
          withDeleted: true,
          relations: ['parent_komentar_', 'user_']
        });
        if (komen.deleted_at) {
          komen.comment = '<span class="gradient-text">Komentar Telah Di Hapus ...</span>';
        }
        if ('user_' in komen && komen.user_) {
          delete komen.user_.created_at;
          delete komen.user_.updated_at;
        }
        (komen as any).reply_count = await this.komentarRepo.count({
          where: [
            {
              parent_komentar_: {
                id: Equal(komen.id)
              }
            }
          ],
          withDeleted: true,
          relations: ['parent_komentar_']
        });
        return {
          info: `😅 200 - Komentar API :: Detail ${req.body.id} 🤣`,
          result: komen
        };
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Komentar API :: Gagal Mendapatkan Komentar ${req.body.id} 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const komen =  await this.komentarRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ],
        relations: ['user_']
      });
      if (komen.user_.id === user.id || user.role === RoleModel.ADMIN || user.role === RoleModel.MODERATOR) {
        const deletedKomen = await this.komentarRepo.remove(komen);
        if ('user_' in deletedKomen && deletedKomen.user_) {
          delete deletedKomen.user_.created_at;
          delete deletedKomen.user_.updated_at;
        }
        return {
          info: `😅 202 - Komentar API :: Berhasil Menghapus Komentar ${req.params['id']} 🤣`,
          result: deletedKomen
        };
      }
      throw new HttpException({
        info: '🙄 403 - Komentar API :: Authorisasi Kepemilikan Gagal 😪',
        result: {
          message: 'Komentar Milik Orang Lain!'
        }
      }, HttpStatus.FORBIDDEN);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Komentar API :: Gagal Mencari Komentar ${req.params['id']} 😪`,
        result: {
          message: 'Komentar Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
