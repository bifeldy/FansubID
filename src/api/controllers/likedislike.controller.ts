import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { LikeAndDislikeModel, RoleModel, UserModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';

import { BerkasService } from '../repository/berkas.service';
import { FansubService } from '../repository/fansub.service';
import { LikedislikeService } from '../repository/likedislike.service';
import { NewsService } from '../repository/news.service';
import { ProfileService } from '../repository/profile.service';
import { UserService } from '../repository/user.service';

@Controller('/likedislike')
export class LikedislikeController {

  constructor(
    private berkasRepo: BerkasService,
    private fansubRepo: FansubService,
    private likedislikeRepo: LikedislikeService,
    private newsRepo: NewsService,
    private profileRepo: ProfileService,
    private userRepo: UserService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [likedislike, count] = await this.likedislikeRepo.findAndCount({
        where: [
          {
            ...((req.query['type'] && req.query['id']) ? {
              [`${req.query['type']}_`]: {
                id: Equal(req.query['id'])
              }
            } : {
              //
            })
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC'
          })
        },
        relations: ['news_', 'berkas_', 'fansub_', 'user_', 'report_by_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const l of likedislike) {
        if ('news_' in l && l.news_) {
          delete l.news_.content;
          delete l.news_.tags;
          delete l.news_.created_at;
          delete l.news_.updated_at;
        }
        if ('berkas_' in l && l.berkas_) {
          delete l.berkas_.description;
          delete l.berkas_.download_url;
          delete l.berkas_.created_at;
          delete l.berkas_.updated_at;
        }
        if ('fansub_' in l && l.fansub_) {
          delete l.fansub_.description;
          delete l.fansub_.urls;
          delete l.fansub_.tags;
          delete l.fansub_.created_at;
          delete l.fansub_.updated_at;
        }
        if ('user_' in l && l.user_) {
          delete l.user_.role;
          delete l.user_.password;
          delete l.user_.session_token;
          delete l.user_.created_at;
          delete l.user_.updated_at;
        }
        if ('report_by_' in l && l.report_by_) {
          delete l.report_by_.role;
          delete l.report_by_.password;
          delete l.report_by_.session_token;
          delete l.report_by_.created_at;
          delete l.report_by_.updated_at;
        }
      }
      return {
        info: `😅 200 - Like Dislike API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: likedislike
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Like Dislike API :: Gagal Mendapatkan All Like Dislike 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const likedislike = await this.likedislikeRepo.findOneOrFail({
        where: [
          { id: req.params['id'] }
        ],
        relations: ['berkas_', 'fansub_', 'user_', 'report_by_']
      });
      const deletedLikedislike = await this.likedislikeRepo.remove(likedislike);
      if ('berkas_' in deletedLikedislike && deletedLikedislike.berkas_) {
        delete deletedLikedislike.berkas_.description;
        delete deletedLikedislike.berkas_.download_url;
        delete deletedLikedislike.berkas_.created_at;
        delete deletedLikedislike.berkas_.updated_at;
      }
      if ('fansub_' in deletedLikedislike && deletedLikedislike.fansub_) {
        delete deletedLikedislike.fansub_.description;
        delete deletedLikedislike.fansub_.urls;
        delete deletedLikedislike.fansub_.tags;
        delete deletedLikedislike.fansub_.created_at;
        delete deletedLikedislike.fansub_.updated_at;
      }
      if ('user_' in deletedLikedislike && deletedLikedislike.user_) {
        delete deletedLikedislike.user_.role;
        delete deletedLikedislike.user_.password;
        delete deletedLikedislike.user_.session_token;
        delete deletedLikedislike.user_.created_at;
        delete deletedLikedislike.user_.updated_at;
      }
      if ('report_by_' in deletedLikedislike && deletedLikedislike.report_by_) {
        delete deletedLikedislike.report_by_.role;
        delete deletedLikedislike.report_by_.password;
        delete deletedLikedislike.report_by_.session_token;
        delete deletedLikedislike.report_by_.created_at;
        delete deletedLikedislike.report_by_.updated_at;
      }
      return {
        info: `😅 202 - Like Dislike API :: Berhasil Menghapus Like Dislike ${req.params['id']} 🤣`,
        result: deletedLikedislike
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Like Dislike API :: Gagal Mencari Like Dislike ${req.params['id']} 😪`,
        result: {
          message: 'Like Dislike Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Post('/:type/:idSlugUsername')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      let selectedRepo = null;
      let selected = null;
      if (req.params['type'] === 'berkas') {
        selectedRepo = this.berkasRepo;
        selected = await this.berkasRepo.findOneOrFail({
          where: [
            { id: Equal(req.params['idSlugUsername']) }
          ]
        });
      } else if (req.params['type'] === 'news') {
        selectedRepo = this.newsRepo;
        selected = await this.newsRepo.findOneOrFail({
          where: [
            { id: Equal(parseInt(req.params['idSlugUsername'])) }
          ]
        });
      } else if (req.params['type'] === 'fansub') {
        selectedRepo = this.fansubRepo;
        selected = await this.fansubRepo.findOneOrFail({
          where: [
            { slug: ILike(req.params['idSlugUsername']) }
          ]
        });
      } else if (req.params['type'] === 'user') {
        selectedRepo = this.userRepo;
        selected = await this.userRepo.findOneOrFail({
          where: [
            { username: ILike(req.params['idSlugUsername']) }
          ],
          relations: ['profile_']
        });
      } else {
        // Other Url Target In Hikki API -- e.g '/news/:newsId'
      }
      const likedislike = await this.likedislikeRepo.find({
        where: [
          {
            [`${req.params['type']}_`]: {
              id: Equal(selected.id)
            },
            report_by_: {
              id: Equal(user.id)
            }
          }
        ],
        relations: ['news_', 'berkas_', 'fansub_', 'user_', 'report_by_']
      });
      let result = null;
      if (likedislike.length <= 0) {
        const ldl = this.likedislikeRepo.new();
        ldl[`${req.params['type']}_`] = selected;
        ldl.type = req.body.likedislike;
        ldl.report_by_ = user;
        const resLdlSave = await this.likedislikeRepo.save(ldl);
        if ('news_' in resLdlSave && resLdlSave.news_) {
          delete resLdlSave.news_.content;
          delete resLdlSave.news_.tags;
          delete resLdlSave.news_.created_at;
          delete resLdlSave.news_.updated_at;
        }
        if ('berkas_' in resLdlSave && resLdlSave.berkas_) {
          delete resLdlSave.berkas_.description;
          delete resLdlSave.berkas_.download_url;
          delete resLdlSave.berkas_.created_at;
          delete resLdlSave.berkas_.updated_at;
        }
        if ('fansub_' in resLdlSave && resLdlSave.fansub_) {
          delete resLdlSave.fansub_.description;
          delete resLdlSave.fansub_.urls;
          delete resLdlSave.fansub_.tags;
          delete resLdlSave.fansub_.created_at;
          delete resLdlSave.fansub_.updated_at;
        }
        if ('user_' in resLdlSave && resLdlSave.user_) {
          delete resLdlSave.user_.role;
          delete resLdlSave.user_.password;
          delete resLdlSave.user_.session_token;
          delete resLdlSave.user_.created_at;
          delete resLdlSave.user_.updated_at;
        }
        if ('report_by_' in resLdlSave && resLdlSave.report_by_) {
          delete resLdlSave.report_by_.role;
          delete resLdlSave.report_by_.password;
          delete resLdlSave.report_by_.session_token;
          delete resLdlSave.report_by_.created_at;
          delete resLdlSave.report_by_.updated_at;
        }
        result = resLdlSave;
      } else if (likedislike.length === 1) {
        let auditedLikedislike = null;
        if (!req.body.likedislike) {
          auditedLikedislike = await this.likedislikeRepo.remove(likedislike[0]);
        } else {
          likedislike[0].type = req.body.likedislike;
          auditedLikedislike = await this.likedislikeRepo.save(likedislike[0]);
        }
        if ('news_' in auditedLikedislike && auditedLikedislike.news_) {
          delete auditedLikedislike.news_.content;
          delete auditedLikedislike.news_.tags;
          delete auditedLikedislike.news_.created_at;
          delete auditedLikedislike.news_.updated_at;
        }
        if ('berkas_' in auditedLikedislike && auditedLikedislike.berkas_) {
          delete auditedLikedislike.berkas_.description;
          delete auditedLikedislike.berkas_.download_url;
          delete auditedLikedislike.berkas_.created_at;
          delete auditedLikedislike.berkas_.updated_at;
        }
        if ('fansub_' in auditedLikedislike && auditedLikedislike.fansub_) {
          delete auditedLikedislike.fansub_.description;
          delete auditedLikedislike.fansub_.urls;
          delete auditedLikedislike.fansub_.tags;
          delete auditedLikedislike.fansub_.created_at;
          delete auditedLikedislike.fansub_.updated_at;
        }
        if ('user_' in auditedLikedislike && auditedLikedislike.user_) {
          delete auditedLikedislike.user_.role;
          delete auditedLikedislike.user_.password;
          delete auditedLikedislike.user_.session_token;
          delete auditedLikedislike.user_.created_at;
          delete auditedLikedislike.user_.updated_at;
        }
        if ('report_by_' in auditedLikedislike && auditedLikedislike.report_by_) {
          delete auditedLikedislike.report_by_.role;
          delete auditedLikedislike.report_by_.password;
          delete auditedLikedislike.report_by_.session_token;
          delete auditedLikedislike.report_by_.created_at;
          delete auditedLikedislike.report_by_.updated_at;
        }
        result = auditedLikedislike;
      } else {
        throw new Error('Data Duplikat');
      }
      if (req.params['type'] === 'berkas' || req.params['type'] === 'fansub' || req.params['type'] === 'user') {
        if (req.params['type'] === 'user') {
          selectedRepo = this.profileRepo;
          selected = await this.profileRepo.findOneOrFail({
            where: [
              { id: Equal(selected.profile_.id) }
            ]
          });
        }
        const updatedLikeCount = await this.likedislikeRepo.count({
          where: [
            {
              [`${req.params['type']}_`]: {
                id: Equal(selected.id)
              },
              type: Equal(LikeAndDislikeModel.LIKE),
            }
          ],
        });
        selected.like_count = updatedLikeCount;
        await selectedRepo.save(selected);
      }
      return {
        info: `😅 201 - Like Dislike API :: Berhasil Tambah / Update Report 🤣`,
        result
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Like Dislike API :: Gagal Mencari Like Dislike ${req.params['id']} 😪`,
        result: {
          message: 'Like Dislike Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:type/:idSlugUsername')
  @HttpCode(200)
  async getByIdSlugUsername(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      let selected = null;
      if (req.params['type'] === 'berkas') {
        selected = await this.berkasRepo.findOneOrFail({
          where: [
            { id: Equal(req.params['idSlugUsername']) }
          ]
        });
      } else if (req.params['type'] === 'news') {
        selected = await this.newsRepo.findOneOrFail({
          where: [
            { id: Equal(parseInt(req.params['idSlugUsername'])) }
          ]
        });
      } else if (req.params['type'] === 'fansub') {
        selected = await this.fansubRepo.findOneOrFail({
          where: [
            { slug: ILike(req.params['idSlugUsername']) }
          ]
        });
      } else if (req.params['type'] === 'user') {
        selected = await this.userRepo.findOneOrFail({
          where: [
            { username: ILike(req.params['idSlugUsername']) }
          ]
        });
      } else {
        // Other Url Target In Hikki API -- e.g '/news/:newsId'
      }
      if (req.params['type'] === 'berkas' || req.params['type'] === 'fansub' || req.params['type'] === 'user') {
        const likedislike = await this.likedislikeRepo.query(`
          SELECT
            type, COUNT(*) AS count
          FROM
            public.like_dislike
          WHERE
            ${req.params['type']}_id = $1
          GROUP BY type
          ORDER BY type ASC
        `, [selected.id]);
        if (user) {
          const myReport = await this.likedislikeRepo.find({
            where: [
              {
                [`${req.params['type']}_`]: {
                  id: Equal(selected.id)
                },
                report_by_: {
                  id: Equal(user.id)
                }
              }
            ],
            relations: ['news_', 'berkas_', 'fansub_', 'user_', 'report_by_']
          });
          if (myReport.length <= 0) {
            return {
              info: `😅 200 - Like Dislike API :: Statistik Report 🤣`,
              result: {
                statistics: likedislike,
                myReport: null
              }
            };
          } else if (myReport.length === 1) {
            if ('news_' in myReport[0] && myReport[0].news_) {
              delete myReport[0].news_.content;
              delete myReport[0].news_.tags;
              delete myReport[0].news_.created_at;
              delete myReport[0].news_.updated_at;
            }
            if ('berkas_' in myReport[0] && myReport[0].berkas_) {
              delete myReport[0].berkas_.description;
              delete myReport[0].berkas_.download_url;
              delete myReport[0].berkas_.created_at;
              delete myReport[0].berkas_.updated_at;
            }
            if ('fansub_' in myReport[0] && myReport[0].fansub_) {
              delete myReport[0].fansub_.description;
              delete myReport[0].fansub_.urls;
              delete myReport[0].fansub_.tags;
              delete myReport[0].fansub_.created_at;
              delete myReport[0].fansub_.updated_at;
            }
            if ('user_' in myReport[0] && myReport[0].user_) {
              delete myReport[0].user_.role;
              delete myReport[0].user_.password;
              delete myReport[0].user_.session_token;
              delete myReport[0].user_.created_at;
              delete myReport[0].user_.updated_at;
            }
            if ('report_by_' in myReport[0] && myReport[0].report_by_) {
              delete myReport[0].report_by_.role;
              delete myReport[0].report_by_.password;
              delete myReport[0].report_by_.session_token;
              delete myReport[0].report_by_.created_at;
              delete myReport[0].report_by_.updated_at;
            }
            return {
              info: `😅 200 - Like Dislike API :: Statistik Report 🤣`,
              result: {
                statistics: likedislike,
                myReport: myReport[0]
              }
            };
          } else {
            throw new Error('Data Duplikat');
          }
        } else {
          return {
            info: `😅 200 - Like Dislike API :: Statistik Report 🤣`,
            result: {
              statistics: likedislike,
              myReport: null
            }
          };
        }
      } else {
        throw new Error('Data Tidak Lengkap');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Like Dislike API :: Gagal Mencari Like Dislike ${req.params['type']} - ${req.params['idSlugUsername']} 😪`,
        result: {
          message: 'Like Dislike Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
