import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Equal, ILike, In, Raw } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { ApiKeyService } from '../repository/api-key.service';

@Controller('/api-key')
export class ApiKeyController {

  constructor(
    private apiKeyRepo: ApiKeyService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagApiKey)
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'username', type: 'string' })
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const queryUserName = req.query['username'];
      if (queryUserName) {
        const username = (queryUserName as string).split(',');
        if (Array.isArray(username) && username.length === 1) {
          const [corss, count] = await this.apiKeyRepo.findAndCount({
            where: [
              {
                user_: {
                  username: In(username)
                }
              }
            ],
            relations: ['user_']
          });
          const results: any = {};
          for (const u of username) {
            results[u] = [];
          }
          for (const c of corss) {
            if ('user_' in c && c.user_) {
              delete c.user_.created_at;
              delete c.user_.updated_at;
              results[c.user_.username].push(c);
            }
          }
          return {
            info: `😅 200 - ApiKey API :: User 🤣`,
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
              { name: ILike(`%${searchQuery}%`) },
              { ip_domain: ILike(`%${searchQuery}%`) },
              {
                api_key: Raw(tblCol => {
                  let caseSens = tblCol.split('.').map(tc => {
                    if (tc.startsWith('"') && tc.endsWith('"')) {
                      return tc;
                    }
                    return `"${tc}"`;
                  }).join('.');
                  return `${caseSens}::TEXT ILIKE :ak`;
                }, {
                  ak: `%${searchQuery}%`
                })
              }
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
              delete c.user_.created_at;
              delete c.user_.updated_at;
            }
          }
          return {
            info: `😅 200 - ApiKey API :: List All 🤣`,
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
        info: `🙄 400 - ApiKey API :: Gagal Mendapatkan All Cors 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @ApiTags(CONSTANTS.apiTagApiKey)
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        ip_domain: { type: 'string' }
      },
      required: ['name', 'ip_domain']
    }
  })
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER)
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
          user.role !== RoleModel.MODERATOR
        ) {
          throw new HttpException({
            info: '🙄 403 - ApiKey API :: Gagal Menambah Cors Baru 😪',
            result: {
              message: 'Fansubber Hanya Bisa Memiliki 1 Api Key!'
            }
          }, HttpStatus.FORBIDDEN);
        } else {
          const cors = this.apiKeyRepo.new();
          cors.name = req.body.name;
          cors.ip_domain = req.body.ip_domain;
          cors.user_ = user;
          const resCorsSave = await this.apiKeyRepo.save(cors);
          if ('user_' in resCorsSave && resCorsSave.user_) {
            delete resCorsSave.user_.created_at;
            delete resCorsSave.user_.updated_at;
          }
          return {
            info: `😅 201 - ApiKey API :: Tambah Baru 🤣`,
            result: resCorsSave
          };
        }
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - ApiKey API :: Gagal Menambah Cors Baru 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/:id')
  @HttpCode(201)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER)
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
        if (user.id === cors.user_.id || user.role === RoleModel.ADMIN || user.role === RoleModel.MODERATOR) {
          if ('name' in req.body) {
            cors.name = req.body.name;
          }
          if ('ip_domain' in req.body) {
            cors.ip_domain = req.body.ip_domain;
          }
          const resCorsSave = await this.apiKeyRepo.save(cors);
          if ('user_' in resCorsSave && resCorsSave.user_) {
            delete resCorsSave.user_.created_at;
            delete resCorsSave.user_.updated_at;
          }
          return {
            info: `😅 201 - ApiKey API :: Ubah ${req.params['id']} 🤣`,
            result: resCorsSave
          };
        } else {
          throw new HttpException({
            info: '🙄 403 - ApiKey API :: Authorisasi Kepemilikan Gagal 😪',
            result: {
              message: 'ApiKey Milik Orang Lain!'
            }
          }, HttpStatus.FORBIDDEN);
        }
      } else {
        throw new HttpException({
          info: `🙄 400 - ApiKey API :: Gagal Mengubah Cors ${req.params['id']} 😪`,
          result: {
            message: 'Data Tidak Lengkap!'
          }
        }, HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - ApiKey API :: Gagal Mencari Cors ${req.params['id']} 😪`,
        result: {
          message: 'ApiKey Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const cors = await this.apiKeyRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ],
        relations: ['user_']
      });
      if (cors.user_.id === user.id || user.role === RoleModel.ADMIN || user.role === RoleModel.MODERATOR) {
        const revokedApiKey = await this.apiKeyRepo.remove(cors);
        if ('user_' in revokedApiKey && revokedApiKey.user_) {
          delete revokedApiKey.user_.created_at;
          delete revokedApiKey.user_.updated_at;
        }
        return {
          info: `😅 202 - ApiKey API :: Berhasil Revoke ${req.params['id']} 🤣`,
          result: revokedApiKey
        };
      }
      throw new HttpException({
        info: '🙄 403 - ApiKey API :: Authorisasi Kepemilikan Gagal 😪',
        result: {
          message: 'ApiKey Milik Orang Lain!'
        }
      }, HttpStatus.FORBIDDEN);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - ApiKey API :: Gagal Mencari Cors ${req.params['id']} 😪`,
        result: {
          message: 'ApiKey Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
