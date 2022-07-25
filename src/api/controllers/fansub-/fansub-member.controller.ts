import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { Roles } from '../../decorators/roles.decorator';
import { VerifiedOnly } from '../../decorators/verified.decorator';

import { RoleModel, UserModel } from '../../../models/req-res.model';

import { FansubService } from '../../repository/fansub.service';
import { FansubMemberService } from '../../repository/fansub-member.service';

@Controller('fansub-member')
export class FansubMemberController {

  constructor(
    private fansubRepo: FansubService,
    private fansubMemberRepo: FansubMemberService
  ) {
    //
  }

  // GET `/api/fansub-member`
  @Get('/')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [members, count] = await this.fansubMemberRepo.findAndCount({
        where: [
          {
            fansub_: {
              slug: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`)
            }
          },
          {
            user_: {
              username: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`)
            }
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            fansub_: 'DESC',
            created_at: 'DESC'
          })
        },
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10,
        relations: ['fansub_', 'user_', 'approved_by_']
      });
      for (const member of members) {
        if ('fansub_' in member && member.fansub_) {
          delete member.fansub_.urls;
          delete member.fansub_.tags;
          delete member.fansub_.view_count;
          delete member.fansub_.like_count;
          delete member.fansub_.description;
          delete member.fansub_.rss_feed;
          delete member.fansub_.created_at;
          delete member.fansub_.updated_at;
          delete member.fansub_.user_;
        }
        if ('user_' in member && member.user_) {
          delete member.user_.role;
          delete member.user_.password;
          delete member.user_.session_token;
          delete member.user_.created_at;
          delete member.user_.updated_at;
        }
        if ('approved_by_' in member && member.approved_by_) {
          delete member.approved_by_.role;
          delete member.approved_by_.password;
          delete member.approved_by_.session_token;
          delete member.approved_by_.created_at;
          delete member.approved_by_.updated_at;
        }
      }
      return {
        info: `😅 200 - Fansub API :: All Members 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: members
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Fansub API :: Gagal Mendapatkan All Members 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  // POST `/api/fansub-member`
  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async requestJoinFansubMember(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('slug' in req.body) {
        let user: UserModel = res.locals['user'];
        const fansub = await this.fansubRepo.findOneOrFail({
          where: [
            { slug: ILike(req.body.slug) }
          ]
        });
        const members = await this.fansubMemberRepo.find({
          where: [
            {
              fansub_: {
                slug: ILike(req.body.slug)
              },
              user_: {
                id: Equal(user.id)
              }
            }
          ],
          relations: ['fansub_', 'user_']
        });
        if (members.length === 0) {
          const member = this.fansubMemberRepo.new();
          member.user_ = user;
          member.fansub_ = fansub;
          const resMemberSave = await this.fansubMemberRepo.save(member);
          if ('fansub_' in resMemberSave && resMemberSave.fansub_) {
            delete resMemberSave.fansub_.urls;
            delete resMemberSave.fansub_.tags;
            delete resMemberSave.fansub_.view_count;
            delete resMemberSave.fansub_.like_count;
            delete resMemberSave.fansub_.description;
            delete resMemberSave.fansub_.rss_feed;
            delete resMemberSave.fansub_.created_at;
            delete resMemberSave.fansub_.updated_at;
            delete resMemberSave.fansub_.user_;
          }
          if ('user_' in resMemberSave && resMemberSave.user_) {
            delete resMemberSave.user_.role;
            delete resMemberSave.user_.password;
            delete resMemberSave.user_.session_token;
            delete resMemberSave.user_.created_at;
            delete resMemberSave.user_.updated_at;
          }
          if ('approved_by_' in resMemberSave && resMemberSave.approved_by_) {
            delete resMemberSave.approved_by_.role;
            delete resMemberSave.approved_by_.password;
            delete resMemberSave.approved_by_.session_token;
            delete resMemberSave.approved_by_.created_at;
            delete resMemberSave.approved_by_.updated_at;
          }
          return {
            info: `😅 201 - Fansub API :: Permintaan Bergabung Berhasil 🤣`,
            result: resMemberSave
          };
        } else {
          let message = null;
          if (members[0].approved) {
            message = 'Anda Sudah Menjadi Anggota!';
          } else {
            message = 'Anda Sudah Membuat Permintaan Untuk Bergabung!';
          }
          throw new HttpException({
            info: `😅 406 - Fansub API :: Permintaan Bergabung Gagal 🤣`,
            result: {
              message
            }
          }, HttpStatus.NOT_ACCEPTABLE);
        }
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Fansub API :: Gagal Bergabung Keanggotaan 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  // PUT `/api/fansub-member/:id`
  @Put('/:id')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async approveJoinOrRejectFansubMember(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('approved' in req.body) {
        let otherMember: UserModel = res.locals['user'];
        const member = await this.fansubMemberRepo.findOneOrFail({
          where: [
            { id: Equal(req.params['id']) }
          ],
          relations: ['fansub_', 'user_', 'approved_by_']
        });
        const approvedMember = await this.fansubMemberRepo.find({
          where: [
            {
              fansub_: {
                slug: ILike(member.fansub_.slug)
              },
              user_: {
                id: Equal(otherMember.id)
              }
            }
          ],
          relations: ['fansub_', 'user_', 'approved_by_']
        });
        if (approvedMember.length === 1 || otherMember.role === RoleModel.ADMIN || otherMember.role === RoleModel.MODERATOR) {
          let approver = null;
          if (approvedMember.length === 1) {
            approver = approvedMember[0];
          } else {
            approver = otherMember;
          }
          if (member.approved) {
            throw new HttpException({
              info: `🙄 406 - Fansub API :: Gagal Menyetujui Keanggotaan 😪`,
              result: {
                message: 'Pengguna Sudah Terdaftar Sebagai Anggota!'
              }
            }, HttpStatus.NOT_ACCEPTABLE);
          }
          let resMember = null;
          let resInfo = null;
          if (req.body.approved) {
            if (req.body.keterangan) {
              member.keterangan = req.body.keterangan.substring(0, 10);
            }
            member.approved = true;
            member.approved_by_ = approver.user_;
            resMember = await this.fansubMemberRepo.save(member);
            resInfo = `😅 201 - Fansub API :: Berhasil Menyetujui Keanggotaan 🤣`;
          } else {
            resMember = await this.fansubMemberRepo.remove(member);
            resInfo = `😅 201 - Fansub API :: Berhasil Menolak Keanggotaan 🤣`;
          }
          if ('fansub_' in resMember && resMember.fansub_) {
            delete resMember.fansub_.urls;
            delete resMember.fansub_.tags;
            delete resMember.fansub_.view_count;
            delete resMember.fansub_.like_count;
            delete resMember.fansub_.description;
            delete resMember.fansub_.rss_feed;
            delete resMember.fansub_.created_at;
            delete resMember.fansub_.updated_at;
            delete resMember.fansub_.user_;
          }
          if ('user_' in resMember && resMember.user_) {
            delete resMember.user_.role;
            delete resMember.user_.password;
            delete resMember.user_.session_token;
            delete resMember.user_.created_at;
            delete resMember.user_.updated_at;
          }
          if ('approved_by_' in resMember && resMember.approved_by_) {
            delete resMember.approved_by_.role;
            delete resMember.approved_by_.password;
            delete resMember.approved_by_.session_token;
            delete resMember.approved_by_.created_at;
            delete resMember.approved_by_.updated_at;
          }
          return {
            info: resInfo,
            result: resMember
          };
        } else {
          throw new HttpException({
            info: '🙄 403 - Fansub API :: Gagal Menyetujui Keanggotaan 😪',
            result: {
              message: 'Hanya Bisa Dilakukan Oleh Sesama Member!'
            }
          }, HttpStatus.FORBIDDEN);
        }
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Fansub API :: Gagal Mencari Keanggotaan ${req.params['id']} 😪`,
        result: {
          message: 'Member Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  // DELETE `/api/fansub-member/:id`
  @Delete('/:id')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async leaveFansubMember(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      let user: UserModel = res.locals['user'];
      const member = await this.fansubMemberRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ],
        relations: ['fansub_', 'user_', 'approved_by_']
      });
      if (user.id === member.user_.id || user.role === RoleModel.ADMIN || user.role === RoleModel.MODERATOR) {
        const resMemberLeave = await this.fansubMemberRepo.remove(member);
        if ('fansub_' in resMemberLeave && resMemberLeave.fansub_) {
          delete resMemberLeave.fansub_.urls;
          delete resMemberLeave.fansub_.tags;
          delete resMemberLeave.fansub_.view_count;
          delete resMemberLeave.fansub_.like_count;
          delete resMemberLeave.fansub_.description;
          delete resMemberLeave.fansub_.rss_feed;
          delete resMemberLeave.fansub_.created_at;
          delete resMemberLeave.fansub_.updated_at;
          delete resMemberLeave.fansub_.user_;
        }
        if ('user_' in resMemberLeave && resMemberLeave.user_) {
          delete resMemberLeave.user_.role;
          delete resMemberLeave.user_.password;
          delete resMemberLeave.user_.session_token;
          delete resMemberLeave.user_.created_at;
          delete resMemberLeave.user_.updated_at;
        }
        if ('approved_by_' in resMemberLeave && resMemberLeave.approved_by_) {
          delete resMemberLeave.approved_by_.role;
          delete resMemberLeave.approved_by_.password;
          delete resMemberLeave.approved_by_.session_token;
          delete resMemberLeave.approved_by_.created_at;
          delete resMemberLeave.approved_by_.updated_at;
        }
        return {
          info: `😅 202 - Fansub API :: Berhasil Mengeluarkan Keanggotaan 🤣`,
          result: resMemberLeave
        };
      } else {
        throw new HttpException({
          info: '🙄 403 - Fansub API :: Authorisasi Kepemilikan Gagal 😪',
          result: {
            message: 'Hanya Bisa Mengeluarkan Diri Sendiri!'
          }
        }, HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Fansub API :: Gagal Mencari Keanggotaan ${req.params['id']} 😪`,
        result: {
          message: 'Member Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
