import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Equal, ILike, In, Not } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { DiscordService } from '../services/discord.service';

import { BannedService } from '../repository/banned.service';
import { UserService } from '../repository/user.service';

@Controller('/banned')
export class BannedController {

  constructor(
    private bannedRepo: BannedService,
    private ds: DiscordService,
    private userRepo: UserService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagBanned)
  @ApiQuery({ name: 'username', type: 'string' })
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const queryUserName = req.query['username'];
      if (queryUserName) {
        const username = (queryUserName as string).split(',');
        if (Array.isArray(username) && username.length > 0) {
          if (username.length > 1) {
            if (!user) {
              throw new HttpException({
                info: '🙄 401 - Banned API :: Authorisasi Pengguna Gagal 😪',
                result: {
                  message: 'Harap Login Terlebih Dahulu!'
                }
              }, HttpStatus.UNAUTHORIZED);
            }
            if (user.role !== RoleModel.ADMIN && user.role !== RoleModel.MODERATOR) {
              throw new HttpException({
                info: '🙄 403 - Banned API :: Authorisasi Pengguna Gagal 😪',
                result: {
                  message: 'Khusus Admin / Moderator!'
                }
              }, HttpStatus.FORBIDDEN);
            }
          }
          const [banneds, count] = await this.bannedRepo.findAndCount({
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
          for (const i of username) {
            results[i] = {};
          }
          for (const b of banneds) {
            if ('user_' in b && b.user_) {
              delete b.user_.created_at;
              delete b.user_.updated_at;
              results[b.user_.username] = b;
            }
          }
          return {
            info: `😅 200 - Banned API :: User 🤣`,
            count,
            pages: 1,
            results
          };
        }
        throw new Error('Data Tidak Lengkap!');
      } else {
        if (!user) {
          throw new HttpException({
            info: '🙄 401 - Banned API :: Authorisasi Pengguna Gagal 😪',
            result: {
              message: 'Harap Login Terlebih Dahulu!'
            }
          }, HttpStatus.UNAUTHORIZED);
        } else if (user.role === RoleModel.ADMIN || user.role === RoleModel.MODERATOR) {
          const [banneds, count] = await this.bannedRepo.findAndCount({
            where: [
              { reason: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) }
            ],
            order: {
              ...((req.query['sort'] && req.query['order']) ? {
                [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
              } : {
                created_at: 'DESC',
                reason: 'ASC'
              })
            },
            relations: ['user_', 'banned_by_'],
            skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
            take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
          });
          for (const b of banneds) {
            if ('user_' in b && b.user_) {
              delete b.user_.created_at;
              delete b.user_.updated_at;
            }
            if ('banned_by_' in b && b.banned_by_) {
              delete b.banned_by_.created_at;
              delete b.banned_by_.updated_at;
            }
          }
          return {
            info: `😅 200 - Banned API :: List All 🤣`,
            count,
            pages: Math.ceil(count / (queryRow ? queryRow : 10)),
            results: banneds
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
        info: `🙄 400 - Banned API :: Gagal Mencari Banned ${req.query['id']} 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const adminMod: UserModel = res.locals['user'];
      if ('reason' in req.body && ('id' in req.body || 'username' in req.body || 'email' in req.body)) {
        let excludedRole = [adminMod.role];
        if (adminMod.role === RoleModel.ADMIN) {
          excludedRole = [RoleModel.ADMIN];
        } else {
          excludedRole = [RoleModel.ADMIN, RoleModel.MODERATOR];
        }
        const user =  await this.userRepo.findOneOrFail({
          where: [
            {
              id: Equal(req.body.id),
              role: Not(In(excludedRole))
            },
            {
              username: ILike(req.body.username),
              role: Not(In(excludedRole))
            },
            {
              email: ILike(req.body.email),
              role: Not(In(excludedRole))
            }
          ]
        });
        const banned = this.bannedRepo.new();
        banned.reason = req.body.reason;
        banned.user_ = user;
        banned.banned_by_ = adminMod;
        const bannedUser = await this.bannedRepo.save(banned);
        if ('user_' in bannedUser && bannedUser.user_) {
          delete bannedUser.user_.created_at;
          delete bannedUser.user_.updated_at;
        }
        if ('banned_by_' in bannedUser && bannedUser.banned_by_) {
          delete bannedUser.banned_by_.created_at;
          delete bannedUser.banned_by_.updated_at;
        }
        this.ds.sendNews({
          embeds: [
            this.ds.createEmbedMessageEmptyRawTemplate()
              .setColor('#c5e510')
              .setTitle(banned.user_.username)
              .setURL(`${environment.baseUrl}/user/${banned.user_.username}`)
              .setAuthor({
                name: `${environment.siteName} - Akun BANNED`,
                iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
                url: environment.baseUrl
              })
              .addField('Alasan', banned.reason, false)
              .setThumbnail(banned.user_.image_url.startsWith('/') ? environment.baseUrl + banned.user_.image_url : banned.user_.image_url)
              .setTimestamp(banned.updated_at)
              .setFooter({
                text: (banned.banned_by_ ? banned.banned_by_.username : 'AUTO_BANNED'),
                iconURL: (banned.banned_by_ ? (banned.banned_by_.image_url.startsWith('/') ? environment.baseUrl + banned.banned_by_.image_url : banned.banned_by_.image_url) : `${environment.baseUrl}/assets/img/favicon.png`)
              })
          ]
        });
        return {
          info: `😅 201 - Banned API :: Berhasil BAN User 🤣`,
          results: bannedUser
        };
      } else {
        throw new HttpException({
          info: `🙄 400 - Banned API :: Gagal BAN User 😪`,
          result: {
            message: 'Data Tidak Lengkap'
          }
        }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Banned API :: Gagal Mencari User ${req.body.id || req.body.username || req.body.email} 😪`,
        result: {
          message: 'User Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const adminMod: UserModel = res.locals['user'];
      let excludedRole = [adminMod.role];
      if (adminMod.role === RoleModel.MODERATOR) {
        excludedRole = [RoleModel.ADMIN, RoleModel.MODERATOR];
      }
      const banned = await this.bannedRepo.findOneOrFail({
        where: [
          {
            id: req.params['id'],
            user_: {
              role: Not(In(excludedRole))
            }
          }
        ],
        relations: ['user_', 'banned_by_']
      });
      const unBannedUser = await this.bannedRepo.remove(banned);
      if ('user_' in unBannedUser && unBannedUser.user_) {
        delete unBannedUser.user_.created_at;
        delete unBannedUser.user_.updated_at;
      }
      if ('banned_by_' in unBannedUser && unBannedUser.banned_by_) {
        delete unBannedUser.banned_by_.created_at;
        delete unBannedUser.banned_by_.updated_at;
      }
      return {
        info: `😅 202 - Banned API :: Berhasil UnBAN User ${req.params['id']} 🤣`,
        result: unBannedUser
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Banned API :: Gagal Mencari User ${req.params['id']} 😪`,
        result: {
          message: 'User Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
