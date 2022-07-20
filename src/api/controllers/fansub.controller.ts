// 3rd Party Library
import { parse } from 'rss-to-json';

import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ILike, IsNull, Not } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified.decorator';

import { DiscordService } from '../services/discord.service';
import { SocketIoService } from '../services/socket-io.service';

import { FansubService } from '../repository/fansub.service';
import { FansubMemberService } from '../repository/fansub-member.service';
import { GlobalService } from '../services/global.service';

@Controller('/fansub')
export class FansubController {

  constructor(
    private ds: DiscordService,
    private fansubRepo: FansubService,
    private fansubMemberRepo: FansubMemberService,
    private gs: GlobalService,
    private sis: SocketIoService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [fansubs, count] = await this.fansubRepo.findAndCount({
        where: [
          { slug: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) },
          { name: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            name: 'ASC',
            active: 'DESC'
          })
        },
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const f of fansubs) {
        delete f.description;
        f.urls = JSON.parse(f.urls);
        f.tags = JSON.parse(f.tags);
      }
      return {
        info: `😅 200 - Fansub API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: fansubs
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Fansub API :: Gagal Mendapatkan All Fansub 😪`,
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
      if (
        'name' in req.body && 'born' in req.body && 'slug' in req.body &&
        ('urls' in req.body && Array.isArray(req.body.urls) && req.body.urls.length > 0)
      ) {
        let user: UserModel = res.locals['user'];
        const slug = req.body.slug.replace(/[^a-zA-Z-]/g, '');
        const selectedFansub = await this.fansubRepo.find({
          where: [
            { slug: ILike(slug) }
          ]
        });
        if (selectedFansub.length === 0) {
          const fansub = this.fansubRepo.new();
          fansub.user_ = user;
          fansub.name = req.body.name;
          fansub.born = new Date(req.body.born);
          fansub.slug = slug;
          const rssFeed: string = req.body.rss_feed;
          if (rssFeed.match(CONSTANTS.regexUrl)) {
            fansub.rss_feed = rssFeed;
          }
          const filteredUrls = [];
          for (const u of req.body.urls) {
            if ('url' in u && 'name' in u && u.url && u.name) {
              filteredUrls.push(u);
            }
          }
          fansub.urls = JSON.stringify(filteredUrls);
          if ('image' in req.body) {
            fansub.image_url = req.body.image;
          }
          if ('tags' in req.body && Array.isArray(req.body.tags) && req.body.tags.length > 0) {
            const filteredTagsUnique = [...new Set(req.body.tags)];
            fansub.tags = JSON.stringify(filteredTagsUnique);
          }
          if ('description' in req.body) {
            fansub.description = req.body.description;
          }
          if ('active' in req.body) {
            fansub.active = req.body.active;
          }
          const resFansubSave = await this.fansubRepo.save(fansub);
          if ('user_' in resFansubSave && resFansubSave.user_) {
            delete resFansubSave.user_.role;
            delete resFansubSave.user_.password;
            delete resFansubSave.user_.session_token;
            delete resFansubSave.user_.created_at;
            delete resFansubSave.user_.updated_at;
          }
          this.ds.sendNews(
            this.ds.createEmbedMessage(
              '#0099ff',
              resFansubSave.name,
              `${environment.baseUrl}/fansub/${resFansubSave.slug}`,
              {
                name: `${environment.siteName} - Penambahan Fansub Baru`,
                iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
                url: environment.baseUrl
              },
              resFansubSave.description,
              resFansubSave.image_url,
              resFansubSave.updated_at,
              {
                text: resFansubSave.user_.username,
                iconURL: resFansubSave.user_.image_url
              }
            )
          );
          this.sis.emitToBroadcast('new-fansub', resFansubSave);
          return {
            info: `😅 201 - Fansub API :: Tambah Baru 🤣`,
            result: resFansubSave
          };
        } else {
          throw new HttpException({
            info: '🙄 400 - Fansub API :: Gagal Menambah Fansub Baru 😪',
            result: {
              message: `'${slug}' Sudah Terpakai`
            }
          }, HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Fansub API :: Gagal Menambah Fansub Baru 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:slug')
  @HttpCode(200)
  async getBySlug(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const fansub = await this.fansubRepo.findOneOrFail({
        where: [
          { slug: ILike(req.params['slug']) }
        ],
        relations: ['user_']
      });
      fansub.urls = JSON.parse(fansub.urls);
      fansub.tags = JSON.parse(fansub.tags);
      if ('user_' in fansub && fansub.user_) {
        delete fansub.user_.role;
        delete fansub.user_.password;
        delete fansub.user_.session_token;
        delete fansub.user_.created_at;
        delete fansub.user_.updated_at;
      }
      return {
        info: `😅 200 - Fansub API :: Detail ${req.params['slug']} 🤣`,
        result: fansub
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Fansub API :: Gagal Mencari Fansub ${req.params['slug']} 😪`,
        result: {
          message: 'Fansub Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put('/:slug')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async updateBySlug(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'name' in req.body || 'born' in req.body || 'description' in req.body ||
        'slug' in req.body || 'active' in req.body || 'image' in req.body ||
        ('tags' in req.body && Array.isArray(req.body.tags) && req.body.tags.length > 0) ||
        ('urls' in req.body && Array.isArray(req.body.urls) && req.body.urls.length > 0)
      ) {
        let user: UserModel = res.locals['user'];
        const fansub = await this.fansubRepo.findOneOrFail({
          where: [
            { slug: ILike(req.params['slug']) }
          ],
          relations: ['user_']
        });
        if ('slug' in req.body) {
          const newSlug = req.body.slug.replace(/[^a-zA-Z-]/g, '');
          const selectedFansub = await this.fansubRepo.find({
            where: [
              { slug: ILike(newSlug) }
            ]
          });
          if (selectedFansub.length === 0) {
            fansub.slug = newSlug;
          } else {
            throw new HttpException({
              info: `😅 400 - Fansub API :: Gagal Mengubah Fansub ${req.params['slug']} 🥰`,
              result: {
                message: `'${newSlug}' Sudah Terpakai`
              }
            }, HttpStatus.BAD_REQUEST);
          }
        }
        if ('name' in req.body) {
          fansub.name = req.body.name;
        }
        if ('born' in req.body) {
          fansub.born = req.body.born;
        }
        if ('description' in req.body) {
          fansub.description = req.body.description;
        }
        if ('active' in req.body) {
          fansub.active = req.body.active;
        }
        if ('image' in req.body) {
          fansub.image_url = req.body.image;
        }
        if ('rss_feed' in req.body) {
          const rssFeed: string = req.body.rss_feed;
          if (rssFeed.match(CONSTANTS.regexUrl)) {
            fansub.rss_feed = rssFeed;
          }
        }
        if ('tags' in req.body) {
          const filteredTagsUnique = [...new Set(req.body.tags)];
          fansub.tags = JSON.stringify(filteredTagsUnique);
        }
        if ('urls' in req.body) {
          const filteredUrls = [];
          for (const u of req.body.urls) {
            if ('url' in u && 'name' in u && u.url && u.name) {
              filteredUrls.push(u);
            }
          }
          fansub.urls = JSON.stringify(filteredUrls);
        }
        fansub.user_ = user;
        const resFansubSave = await this.fansubRepo.save(fansub);
        if ('user_' in resFansubSave && resFansubSave.user_) {
          delete resFansubSave.user_.role;
          delete resFansubSave.user_.password;
          delete resFansubSave.user_.session_token;
          delete resFansubSave.user_.created_at;
          delete resFansubSave.user_.updated_at;
        }
        this.ds.sendNews(
          this.ds.createEmbedMessage(
            '#ff4081',
            resFansubSave.name,
            `${environment.baseUrl}/fansub/${resFansubSave.slug}`,
            {
              name: `${environment.siteName} - Pembaharuan Data Fansub`,
              iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
              url: environment.baseUrl
            },
            resFansubSave.description,
            resFansubSave.image_url,
            resFansubSave.updated_at,
            {
              text: resFansubSave.user_.username,
              iconURL: resFansubSave.user_.image_url
            }
          )
        );
        return {
          info: `😅 201 - Fansub API :: Ubah ${req.params['slug']} 🤣`,
          result: resFansubSave
        };
      } else {
        throw new HttpException({
          info: `🙄 400 - Fansub API :: Gagal Mengubah Fansub ${req.params['slug']} 😪`,
          result: {
            message: 'Data Tidak Lengkap!'
          }
        }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Fansub API :: Gagal Mencari Fansub ${req.params['slug']} 😪`,
        result: {
          message: 'Fansub Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:slug')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async deleteBySlug(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const fansub =  await this.fansubRepo.findOneOrFail({
        where: [
          { slug: ILike(req.params['slug']) }
        ]
      });
      const deletedFansub = await this.fansubRepo.remove(fansub);
      if ('user_' in deletedFansub && deletedFansub.user_) {
        delete deletedFansub.user_.role;
        delete deletedFansub.user_.password;
        delete deletedFansub.user_.session_token;
        delete deletedFansub.user_.created_at;
        delete deletedFansub.user_.updated_at;
      }
      return {
        info: `😅 202 - Fansub API :: Berhasil Menghapus Fansub ${req.params['slug']} 🤣`,
        result: deletedFansub
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Fansub API :: Gagal Mencari Fansub ${req.params['slug']} 😪`,
        result: {
          message: 'Fansub Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  // GET `/api/fansub/:slug/members`
  @Get('/:slug/members')
  @HttpCode(200)
  async getFansubMembers(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [members, count] = await this.fansubMemberRepo.findAndCount({
        where: [
          {
            fansub_: {
              slug: ILike(req.params['slug'])
            },
            user_: {
              username: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`)
            }
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC'
          })
        },
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10,
        relations: ['fansub_', 'user_', 'approved_by_']
      });
      for (const member of members) {
        if ('fansub_' in member && member.fansub_) {
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

  // GET `/api/fansub/:slug/rss`
  @Get('/:slug/rss')
  @HttpCode(200)
  async getFansubFeedBySlug(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const rssFeed: any = {};
      const fansub = await this.fansubRepo.findOneOrFail({
        where: [
          {
            slug: ILike(req.params['slug']),
            rss_feed: Not(IsNull())
          }
        ],
        order: {
          updated_at: 'DESC'
        }
      });
      const rgx = new RegExp(CONSTANTS.regexUrl);
      if (fansub.rss_feed.match(rgx)) {
        try {
          let rssUrl = fansub.rss_feed;
          if (!rssUrl.includes('?')) {
            rssUrl += '?';
          }
          if (rssUrl[rssUrl.length - 1] !== '?') {
            rssUrl += '&';
          }
          if (!rssUrl.includes('alt=rss')) {
            rssUrl += 'alt=rss';
          }
          const feed = await parse(rssUrl, null);
          rssFeed.slug = fansub.slug;
          rssFeed.title = feed.title;
          // rssFeed.description: feed.description;
          rssFeed.link = feed.link;
          // rssFeed.image: feed.image;
          // rssFeed.category: feed.category;
          rssFeed.items = [];
          for (const f of feed.items) {
            rssFeed.items.push({
              title: f.title,
              // description: f.description,
              link: f.link,
              published: f.published,
              created: f.created,
              author: f.author,
              // category: f.category,
              // enclosures: f.enclosures,
              // media: f.media
            });
          }
        } catch (e) {
          this.gs.log('[FANSUB_RSS_FEED] 🐾', e, 'error');
        }
      }
      return {
        info: `😅 200 - Fansub API :: RSS Feed 🤣`,
        count: rssFeed.items.length,
        pages: 1,
        result: rssFeed
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Fansub API :: Gagal Menarik Data 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
