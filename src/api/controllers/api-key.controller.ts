import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Equal, ILike, In, IsNull, Not } from 'typeorm';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified.decorator';

import { ApiKeyService } from '../repository/api-key.service';

import { CryptoService } from '../services/crypto.service';

@Controller('/api-key')
export class ApiKeyController {

  constructor(
    private apiKeyRepo: ApiKeyService,
    private cs: CryptoService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const queryId = req.query['id'];
      if (queryId) {
        const userId = (queryId as string).split(',').map(Number);
        if (Array.isArray(userId) && userId.length > 0) {
          if (
            ((userId.length > 1) || (userId.length === 1 && userId[0] !== user.id)) &&
            user.role !== RoleModel.ADMIN && user.role !== RoleModel.MODERATOR
          ) {
            throw new HttpException({
              info: '🙄 403 - Banned API :: Authorisasi Pengguna Gagal 😪',
              result: {
                message: 'Khusus Admin / Moderator!'
              }
            }, HttpStatus.FORBIDDEN);
          }
          const [corss, count] = await this.apiKeyRepo.findAndCount({
            where: [
              {
                user_: {
                  id: In(userId)
                }
              }
            ],
            relations: ['user_']
          });
          const results: any = {};
          for (const i of userId) {
            results[i] = {};
          }
          for (const c of corss) {
            if ('user_' in c && c.user_) {
              delete c.user_.email;
              delete c.user_.password;
              delete c.user_.session_token;
              delete c.user_.created_at;
              delete c.user_.updated_at;
              results[c.user_.id] = c;
            }
          }
          return {
            info: `😅 200 - Cors API :: User 🤣`,
            count,
            pages: 1,
            results
          };
        }
        throw new Error('Data Tidak Lengkap!');
      } else {
        if (user.role === RoleModel.ADMIN || user.role === RoleModel.MODERATOR) {
          const [corss, count] = await this.apiKeyRepo.findAndCount({
            where: [
              { name: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) },
              { ip_domain: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) },
              { api_key: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) }
            ],
            order: {
              ...((req.query['sort'] && req.query['order']) ? {
                [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
              } : {
                created_at: 'DESC',
                id: 'ASC'
              })
            },
            relations: ['user_'],
            skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
            take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
          });
          for (const c of corss) {
            if ('user_' in c && c.user_) {
              delete c.user_.email;
              delete c.user_.password;
              delete c.user_.session_token;
              delete c.user_.created_at;
              delete c.user_.updated_at;
            }
          }
          return {
            info: `😅 200 - Cors API :: List All 🤣`,
            count,
            pages: Math.ceil(count / (queryRow ? queryRow : 10)),
            results: corss
          };
        } else {
          throw new HttpException({
            info: '🙄 403 - Banned API :: Authorisasi Pengguna Gagal 😪',
            result: {
              message: 'Khusus Admin / Moderator!'
            }
          }, HttpStatus.FORBIDDEN);
        }
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Cors API :: Gagal Mendapatkan All Cors 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('name' in req.body && 'ip_domain' in req.body) {
        const user: UserModel = res.locals['user'];
        const corss = await this.apiKeyRepo.find({
          where: [
            {
              user_: {
                id: Equal(user.id)
              }
            }
          ],
          relations: ['user_']
        });
        if (
          corss.length >= 1 &&
          user.role !== RoleModel.ADMIN &&
          user.role !== RoleModel.MODERATOR &&
          user.role !== RoleModel.FANSUBBER
        ) {
          throw new HttpException({
            info: '🙄 403 - Cors API :: Gagal Menambah Cors Baru 😪',
            result: {
              message: 'Tiap Pengguna Hanya Bisa Memiliki 1 Api Key!'
            }
          }, HttpStatus.FORBIDDEN);
        } else {
          const cors = this.apiKeyRepo.new();
          cors.name = req.body.name;
          cors.ip_domain = req.body.ip_domain;
          cors.api_key = this.cs.universalBtoa(new Date().getTime().toString());
          cors.user_ = user;
          const resCorsSave = await this.apiKeyRepo.save(cors);
          if ('user_' in resCorsSave && resCorsSave.user_) {
            delete resCorsSave.user_.email;
            delete resCorsSave.user_.password;
            delete resCorsSave.user_.session_token;
            delete resCorsSave.user_.created_at;
            delete resCorsSave.user_.updated_at;
          }
          return {
            info: `😅 201 - Cors API :: Tambah Baru 🤣`,
            result: resCorsSave
          };
        }
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Cors API :: Gagal Menambah Cors Baru 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/:id')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('name' in req.body || 'ip_domain' in req.body) {
        const user: UserModel = res.locals['user'];
        const cors = await this.apiKeyRepo.findOneOrFail({
          where: [
            { id: Equal(parseInt(req.params['id'])) }
          ],
          relations: ['user_']
        });
        if (user.id === cors.user_.id) {
          if ('name' in req.body) {
            cors.name = req.body.name;
          }
          if ('ip_domain' in req.body) {
            cors.ip_domain = req.body.ip_domain;
          }
          const resCorsSave = await this.apiKeyRepo.save(cors);
          if ('user_' in resCorsSave && resCorsSave.user_) {
            delete resCorsSave.user_.email;
            delete resCorsSave.user_.password;
            delete resCorsSave.user_.session_token;
            delete resCorsSave.user_.created_at;
            delete resCorsSave.user_.updated_at;
          }
          return {
            info: `😅 201 - Cors API :: Ubah ${req.params['id']} 🤣`,
            result: resCorsSave
          };
        } else {
          throw new HttpException({
            info: '🙄 403 - Cors API :: Authorisasi Kepemilikan Gagal 😪',
            result: {
              message: 'Cors Milik Orang Lain!'
            }
          }, HttpStatus.FORBIDDEN);
        }
      } else {
        throw new HttpException({
          info: `🙄 400 - Cors API :: Gagal Mengubah Cors ${req.params['id']} 😪`,
          result: {
            message: 'Data Tidak Lengkap!'
          }
        }, HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Cors API :: Gagal Mencari Cors ${req.params['id']} 😪`,
        result: {
          message: 'Cors Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const cors = await this.apiKeyRepo.findOneOrFail({
        where: [
          {
            id: Equal(parseInt(req.params['id'])),
            user_: Not(IsNull())
          }
        ],
        relations: ['user_']
      });
      const revokedUser = await this.apiKeyRepo.remove(cors);
      if ('user_' in revokedUser && revokedUser.user_) {
        delete revokedUser.user_.email;
        delete revokedUser.user_.password;
        delete revokedUser.user_.session_token;
        delete revokedUser.user_.created_at;
        delete revokedUser.user_.updated_at;
      }
      return {
        info: `😅 202 - Cors API :: Berhasil Revoke ${req.params['id']} 🤣`,
        result: revokedUser
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Cors API :: Gagal Mencari Cors ${req.params['id']} 😪`,
        result: {
          message: 'Cors Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
