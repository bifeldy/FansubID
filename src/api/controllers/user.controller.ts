import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Put, Req, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified.decorator';

import { BerkasService } from '../repository/berkas.service';
import { FansubMemberService } from '../repository/fansub-member.service';
import { KartuTandaPendudukService } from '../repository/kartu-tanda-penduduk.service';
import { KomentarService } from '../repository/komentar.service';
import { LikedislikeService } from '../repository/likedislike.service';
import { ProfileService } from '../repository/profile.service';
import { TrackService } from '../repository/track.service';
import { UserService } from '../repository/user.service';

import { CryptoService } from '../services/crypto.service';
import { DiscordService } from '../services/discord.service';

@Controller('/user')
export class UserController {

  constructor(
    private berkasRepo: BerkasService,
    private cs: CryptoService,
    private ds: DiscordService,
    private fansubMemberRepo: FansubMemberService,
    private ktpRepo: KartuTandaPendudukService,
    private komentarRepo: KomentarService,
    private likeDislikeRepo: LikedislikeService,
    private profileRepo: ProfileService,
    private trackRepo: TrackService,
    private userRepo: UserService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagUser)
  @ApiQuery({ name: 'q', required: true, type: 'string' })
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      const adminMod: UserModel = res.locals['user'];
      let maxPage = 0;
      let maxRow = 10;
      let allowSearch0q = false;
      if (adminMod) {
        if (adminMod.role === RoleModel.ADMIN || adminMod.role === RoleModel.MODERATOR) {
          maxPage = parseInt(req.query['page'] as string) || 0;
          maxRow = parseInt(req.query['row'] as string) || 10;
          allowSearch0q = true;
        }
      }
      if ((!searchQuery || searchQuery.length < 3) && !allowSearch0q) {
        throw new HttpException({
          info: '🙄 400 - Dorama API :: Gagal Mencari User 😪',
          result: {
            message: 'Minimal 3 Huruf Untuk Pencarian!'
          }
        }, HttpStatus.BAD_REQUEST);
      }
      const [user, count] = await this.userRepo.findAndCount({
        where: [
          { username: ILike(`%${searchQuery}%`) },
          { email: ILike(`%${searchQuery}%`) },
          {
            kartu_tanda_penduduk_: {
              nama: ILike(`%${searchQuery}%`)
            }
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            id: 'DESC'
          })
        },
        relations: ['kartu_tanda_penduduk_', 'profile_'],
        skip: maxPage > 0 ? (maxPage * maxRow - maxRow) : 0,
        take: (maxRow > 0 && maxRow <= 500) ? maxRow : 10
      });
      for (const u of user) {
        if (adminMod) {
          if (adminMod.role === RoleModel.ADMIN || adminMod.role === RoleModel.MODERATOR) {
            (u as any)._email = u.email;
            (u as any)._session_origin = u.session_origin;
          }
        }
        if ('kartu_tanda_penduduk_' in u && u.kartu_tanda_penduduk_) {
          delete u.kartu_tanda_penduduk_.created_at;
          delete u.kartu_tanda_penduduk_.updated_at;
        }
        if ('profile_' in u && u.profile_) {
          delete u.profile_.created_at;
          delete u.profile_.updated_at;
        }
      }
      return {
        info: `😅 200 - User API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (maxRow ? maxRow : 10)),
        results: user
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - User API :: Gagal Mendapatkan All User 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:username')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagUser)
  @ApiParam({ name: 'username', type: 'string' })
  async getByUsername(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const selectedUser = await this.userRepo.findOneOrFail({
        where: [
          { username: ILike(req.params['username']) }
        ],
        relations: ['kartu_tanda_penduduk_', 'profile_']
      });
      delete selectedUser.email;
      if ('kartu_tanda_penduduk_' in selectedUser && selectedUser.kartu_tanda_penduduk_) {
        delete selectedUser.kartu_tanda_penduduk_.created_at;
        delete selectedUser.kartu_tanda_penduduk_.updated_at;
      }
      if ('profile_' in selectedUser && selectedUser.profile_) {
        delete selectedUser.profile_.id;
        delete selectedUser.profile_.created_at;
        delete selectedUser.profile_.updated_at;
      }
      return {
        info: `😅 200 - User API :: Detail ${req.params['username']} 🤣`,
        result: selectedUser
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - User API :: Gagal Mencari User ${req.params['username']} 😪`,
        result: {
          message: 'User Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put('/:username')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async updateByUsername(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('description' in req.body || 'new_password' in req.body || 'image_photo' in req.body || 'image_cover' in req.body) {
        const user: UserModel = res.locals['user'];
        const old_password = this.cs.hashPassword(req.body.old_password);
        const selectedUser = await this.userRepo.findOneOrFail({
          where: [
            { username: ILike(req.params['username']), password: Equal(old_password) }
          ],
          relations: ['kartu_tanda_penduduk_', 'profile_']
        });
        if (user.id === selectedUser.id) {
          if ('image_photo' in req.body) {
            selectedUser.image_url = req.body.image_photo;
          }
          if ('new_password' in req.body) {
            selectedUser.password = this.cs.hashPassword(req.body.new_password);
          }
          const selectedProfile = await this.profileRepo.findOneOrFail({
            where: [
              { id: selectedUser.profile_.id }
            ]
          });
          if ('image_cover' in req.body) {
            selectedProfile.cover_url = req.body.image_cover;
          }
          if ('description' in req.body) {
            selectedProfile.description = req.body.description;
          }
          const resProfileSave = await this.profileRepo.save(selectedProfile);
          selectedUser.profile_ = resProfileSave;
          let resUserSave = await this.userRepo.save(selectedUser);
          this.ds.sendNews(
            this.ds.createEmbedMessage(
              '#ff4081',
              resUserSave.kartu_tanda_penduduk_.nama,
              `${environment.baseUrl}/user/${resUserSave.username}`,
              {
                name: `${environment.siteName} - Pembaharuan Data Pengguna`,
                iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
                url: environment.baseUrl
              },
              resUserSave.profile_.description,
              resUserSave.image_url,
              resUserSave.updated_at,
              {
                text: resUserSave.username,
                iconURL: resUserSave.image_url
              }
            )
          );
          (resUserSave as any)._email = resUserSave.email;
          (resUserSave as any)._session_origin = resUserSave.session_origin;
          if ('kartu_tanda_penduduk_' in resUserSave && resUserSave.kartu_tanda_penduduk_) {
            delete resUserSave.kartu_tanda_penduduk_;
          }
          if ('profile_' in resUserSave && resUserSave.profile_) {
            delete resUserSave.profile_;
          }
          const { password, session_token, session_origin, ...noPwdSes } = resUserSave;
          selectedUser.session_token = this.cs.credentialEncode({ user: noPwdSes });
          resUserSave = await this.userRepo.save(selectedUser);
          res.cookie(environment.tokenName, resUserSave.session_token, {
            httpOnly: true,
            secure: environment.production,
            sameSite: 'strict',
            expires: new Date(this.cs.jwtView(resUserSave.session_token).exp * 1000),
            domain: environment.domain
          });
          return {
            info: `😅 201 - User API :: Ubah ${req.params['username']} 🤣`,
            result: {
              token: resUserSave.session_token
            }
          };
        } else {
          throw new HttpException({
            info: '🙄 401 - User API :: Authorisasi Kepemilikan Gagal 😪',
            result: {
              message: 'Profil Milik Orang Lain!'
            }
          }, HttpStatus.FORBIDDEN);
        }
      } else {
        throw new HttpException({
          info: `🙄 400 - User API :: Gagal Mengubah Profile ${req.params['username']} 😪`,
          result: {
            message: 'Data Tidak Lengkap!'
          }
        }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - User API :: Gagal Mencari User ${req.params['username']} 😪`,
        result: {
          message: 'User Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:username')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user =  await this.userRepo.findOneOrFail({
        where: [
          { username: ILike(req.params['username']) }
        ],
        relations: ['profile_']
      });
      const ktp = await this.ktpRepo.findOneOrFail({
        where: [
          { id: Equal(user.id) }
        ]
      });
      const profile = await this.profileRepo.findOneOrFail({
        where: [
          { id: Equal(user.profile_.id) }
        ]
      });
      const deletedUser = await this.userRepo.remove(user);
      const deletedKtp = await this.ktpRepo.remove(ktp);
      const deletedProfile = await this.profileRepo.remove(profile);
      return {
        info: `😅 202 - User API :: Berhasil Menghapus User ${req.params['username']} 🤣`,
        result: {
          user: deletedUser,
          ktp: deletedKtp,
          profile: deletedProfile
        }
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - User API :: Gagal Mencari User ${req.params['username']} 😪`,
        result: {
          message: 'User Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:username/feed-berkas')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagUser)
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiParam({ name: 'username', type: 'string' })
  async getFeedBerkasByUsername(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const selectedUser = await this.userRepo.findOneOrFail({
        where: [
          { username: ILike(req.params['username']) }
        ]
      });
      const [files, count] = await this.berkasRepo.findAndCount({
        where: [
          {
            name: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            user_: {
              id: Equal(selectedUser.id)
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
          delete f.user_.created_at;
          delete f.user_.updated_at;
        }
      }
      return {
        info: `😅 200 - User API :: Berkas ${req.params['username']} 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: files
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - User API :: Gagal Mencari User ${req.params['username']} 😪`,
        result: {
          message: 'Berkas User Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:username/feed-comment')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @ApiTags(CONSTANTS.apiTagUser)
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiParam({ name: 'username', type: 'string' })
  async getFeedCommentByUsername(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const selectedUser = await this.userRepo.findOneOrFail({
        where: [
          { username: ILike(req.params['username']) }
        ]
      });
      const [komens, count] = await this.komentarRepo.findAndCount({
        where: [
          {
            comment: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            user_: {
              id: Equal(selectedUser.id)
            }
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            comment: 'ASC'
          })
        },
        relations: ['user_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const k of komens) {
        if ('user_' in k && k.user_) {
          delete k.user_.created_at;
          delete k.user_.updated_at;
        }
      }
      return {
        info: `😅 200 - User API :: Feed Komentar ${req.params['username']} 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: komens
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - User API :: Gagal Mencari User ${req.params['username']} 😪`,
        result: {
          message: 'Komentar User Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:username/feed-likedislike')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @ApiTags(CONSTANTS.apiTagUser)
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiParam({ name: 'username', type: 'string' })
  async getFeedLikeDislikeByUsername(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const selectedUser = await this.userRepo.findOneOrFail({
        where: [
          { username: ILike(req.params['username']) }
        ]
      });
      const [likedislikes, count] = await this.likeDislikeRepo.findAndCount({
        where: [
          {
            news_: {
              title: ILike(`%${searchQuery}%`)
            },
            report_by_: {
              id: Equal(selectedUser.id)
            }
          },
          {
            berkas_: {
              name: ILike(`%${searchQuery}%`)
            },
            report_by_: {
              id: Equal(selectedUser.id)
            }
          },
          {
            fansub_: {
              name: ILike(`%${searchQuery}%`)
            },
            report_by_: {
              id: Equal(selectedUser.id)
            }
          },
          {
            user_: {
              kartu_tanda_penduduk_: {
                nama: ILike(`%${searchQuery}%`)
              }
            },
            report_by_: {
              id: Equal(selectedUser.id)
            }
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            berkas_: 'ASC',
            fansub_: 'ASC',
            user_: 'ASC'
          })
        },
        relations: ['news_', 'berkas_', 'fansub_', 'user_', 'report_by_', 'user_.kartu_tanda_penduduk_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const ldl of likedislikes) {
        if ('news_' in ldl && ldl.news_) {
          delete ldl.news_.content;
          delete ldl.news_.tags;
          delete ldl.news_.created_at;
          delete ldl.news_.updated_at;
        }
        if ('berkas_' in ldl && ldl.berkas_) {
          delete ldl.berkas_.download_url;
          delete ldl.berkas_.description;
          delete ldl.berkas_.created_at;
          delete ldl.berkas_.updated_at;
        }
        if ('fansub_' in ldl && ldl.fansub_) {
          delete ldl.fansub_.description;
          delete ldl.fansub_.urls;
          delete ldl.fansub_.tags;
          delete ldl.fansub_.created_at;
          delete ldl.fansub_.updated_at;
        }
        if ('user_' in ldl && ldl.user_) {
          delete ldl.user_.created_at;
          delete ldl.user_.updated_at;
          if ('kartu_tanda_penduduk_' in ldl.user_ && ldl.user_.kartu_tanda_penduduk_) {
            delete ldl.user_.kartu_tanda_penduduk_.created_at;
            delete ldl.user_.kartu_tanda_penduduk_.updated_at;
          }
        }
        if ('report_by_' in ldl && ldl.report_by_) {
          delete ldl.report_by_.created_at;
          delete ldl.report_by_.updated_at;
        }
      }
      return {
        info: `😅 200 - User API :: Feed Like Dislike ${req.params['username']} 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: likedislikes
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - User API :: Gagal Mencari User ${req.params['username']} 😪`,
        result: {
          message: 'Like Dislike User Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:username/feed-visit')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @ApiTags(CONSTANTS.apiTagUser)
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiParam({ name: 'username', type: 'string' })
  async getFeedVisitByUsername(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const user: UserModel = res.locals['user'];
      const selectedUser = await this.userRepo.findOneOrFail({
        where: [
          { username: ILike(req.params['username']) }
        ]
      });
      const [tracks, count] = await this.trackRepo.findAndCount({
        where: [
          {
            news_: {
              title: ILike(`%${searchQuery}%`)
            },
            track_by_: {
              id: Equal(selectedUser.id)
            }
          },
          {
            berkas_: {
              name: ILike(`%${searchQuery}%`)
            },
            track_by_: {
              id: Equal(selectedUser.id)
            }
          },
          {
            fansub_: {
              name: ILike(`%${searchQuery}%`)
            },
            track_by_: {
              id: Equal(selectedUser.id)
            }
          },
          {
            user_: {
              kartu_tanda_penduduk_: {
                nama: ILike(`%${searchQuery}%`)
              }
            },
            track_by_: {
              id: Equal(selectedUser.id)
            }
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            berkas_: 'ASC',
            fansub_: 'ASC',
            user_: 'ASC'
          })
        },
        relations: ['news_', 'berkas_', 'fansub_', 'user_', 'track_by_', 'user_.kartu_tanda_penduduk_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const t of tracks) {
        if (user.username !== selectedUser.username && user.role !== RoleModel.ADMIN && user.role !== RoleModel.MODERATOR) {
          delete t.ip;
        }
        if ('news_' in t && t.news_) {
          delete t.news_.content;
          delete t.news_.tags;
          delete t.news_.created_at;
          delete t.news_.updated_at;
        }
        if ('berkas_' in t && t.berkas_) {
          delete t.berkas_.download_url;
          delete t.berkas_.description;
          delete t.berkas_.created_at;
          delete t.berkas_.updated_at;
        }
        if ('fansub_' in t && t.fansub_) {
          delete t.fansub_.description;
          delete t.fansub_.urls;
          delete t.fansub_.tags;
          delete t.fansub_.created_at;
          delete t.fansub_.updated_at;
        }
        if ('user_' in t && t.user_) {
          delete t.user_.created_at;
          delete t.user_.updated_at;
          if ('kartu_tanda_penduduk_' in t.user_ && t.user_.kartu_tanda_penduduk_) {
            delete t.user_.kartu_tanda_penduduk_.created_at;
            delete t.user_.kartu_tanda_penduduk_.updated_at;
          }
        }
        if ('track_by_' in t && t.track_by_) {
          delete t.track_by_.created_at;
          delete t.track_by_.updated_at;
        }
      }
      return {
        info: `😅 200 - User API :: Feed Kunjungan ${req.params['username']} 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: tracks
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - User API :: Gagal Mencari User ${req.params['username']} 😪`,
        result: {
          message: 'Jejak User Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  // GET `/api/user/:username/group`
  @Get('/:username/group')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagUser)
  @ApiParam({ name: 'username', type: 'string' })
  async getFansubMembers(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const [groups, count] = await this.fansubMemberRepo.findAndCount({
        where: [
          {
            approved: true,
            user_: {
              username: ILike(req.params['username'])
            }
          }
        ],
        order: {
          keterangan: 'ASC',
          created_at: 'DESC'
        },
        relations: ['fansub_', 'user_', 'approved_by_']
      });
      for (const group of groups) {
        if ('fansub_' in group && group.fansub_) {
          delete group.fansub_.urls;
          delete group.fansub_.tags;
          delete group.fansub_.view_count;
          delete group.fansub_.like_count;
          delete group.fansub_.description;
          delete group.fansub_.rss_feed;
          delete group.fansub_.created_at;
          delete group.fansub_.updated_at;
          delete group.fansub_.user_;
        }
        if ('user_' in group && group.user_) {
          delete group.user_.created_at;
          delete group.user_.updated_at;
        }
        if ('approved_by_' in group && group.approved_by_) {
          delete group.approved_by_.created_at;
          delete group.approved_by_.updated_at;
        }
      }
      return {
        info: `😅 200 - User API :: ${req.params['username']} Groups 🤣`,
        count,
        pages: 1,
        results: groups
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - User API :: Gagal Mendapatkan All Groups 😪`,
        result: {
          message: 'Grup Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
