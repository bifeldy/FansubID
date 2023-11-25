// 3rd Party Library
import { parse } from 'rss-to-json';

import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { DiscordService } from '../services/discord.service';
import { SocketIoService } from '../services/socket-io.service';

import { FansubService } from '../repository/fansub.service';
import { FansubMemberService } from '../repository/fansub-member.service';
import { RssFeedService } from '../repository/rss-feed.service';

@Controller('/fansub')
export class FansubController {

  constructor(
    private ds: DiscordService,
    private fansubRepo: FansubService,
    private fansubMemberRepo: FansubMemberService,
    private rssFeedRepo: RssFeedService,
    private sis: SocketIoService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagFansub)
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [fansubs, count] = await this.fansubRepo.findAndCount({
        where: [
          { slug: ILike(`%${searchQuery}%`) },
          { name: ILike(`%${searchQuery}%`) }
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
        (f as any).urls = JSON.parse(f.urls);
        (f as any).tags = JSON.parse(f.tags);
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
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'name' in req.body && 'born' in req.body && 'slug' in req.body &&
        ('urls' in req.body && Array.isArray(req.body.urls) && req.body.urls.length > 0)
      ) {
        const user: UserModel = res.locals['user'];
        const slug = req.body.slug.replace(/[^0-9a-zA-Z-]/g, '').toLowerCase();
        if (CONSTANTS.blacklistedWords.includes(slug)) {
          throw new HttpException({
            info: '🙄 400 - Fansub API :: Gagal Menambah Fansub Baru 😪',
            result: {
              message: `Singkatan '${slug}' Tidak Dapat Digunakan`
            }
          }, HttpStatus.BAD_REQUEST);
        }
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
          const filteredUrls = [];
          for (const u of req.body.urls) {
            if ('url' in u && 'name' in u && u.url && u.name) {
              filteredUrls.push({
                url: u.url,
                name: u.name
              });
            }
          }
          fansub.urls = JSON.stringify(filteredUrls);
          if ('rss_feed' in req.body && (user.role === RoleModel.ADMIN || user.role === RoleModel.MODERATOR || user.role === RoleModel.FANSUBBER)) {
            const rssFeed: string = req.body.rss_feed;
            if (rssFeed.match(CONSTANTS.regexUrl)) {
              try {
                const uri = new URL(`${environment.baseUrl}/api/crawl`);
                uri.searchParams.append('url', rssFeed);
                const feed = await parse(uri.toString(), null);
                if (feed.items.length >= 0) {
                  fansub.rss_feed = rssFeed;
                }
              } catch (e) {
                //
              }
            }
          }
          if ('image' in req.body) {
            fansub.image_url = req.body.image;
          }
          if ('cover' in req.body) {
            fansub.cover_url = req.body.cover;
          }
          if ('tags' in req.body && Array.isArray(req.body.tags) && req.body.tags.length > 0) {
            const filteredTagsUnique = [...new Set<string>(req.body.tags)];
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
      }
      throw new Error('Data Tidak Lengkap!');
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
  @ApiTags(CONSTANTS.apiTagFansub)
  @ApiParam({ name: 'slug', type: 'string' })
  async getBySlug(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const fansub = await this.fansubRepo.findOneOrFail({
        where: [
          { slug: ILike(req.params['slug']) }
        ],
        relations: ['user_']
      });
      (fansub as any).urls = JSON.parse(fansub.urls);
      (fansub as any).tags = JSON.parse(fansub.tags);
      if ('user_' in fansub && fansub.user_) {
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
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
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
            {
              slug: ILike(req.params['slug']),
              editable: true
            }
          ],
          relations: ['user_']
        });
        if (user.role !== RoleModel.ADMIN && user.role !== RoleModel.MODERATOR && fansub.user_.id !== user.id) {
          try {
            const member = await this.fansubMemberRepo.findOneOrFail({
              where: [
                {
                  fansub_ : {
                    id: Equal(fansub.id)
                  },
                  user_ : {
                    id: Equal(user.id)
                  }
                }
              ],
              relations: ['fansub_', 'user_']
            });
            user = member.user_;
          } catch (e) {
            throw new HttpException({
              info: `🙄 403 - Fansub API :: Gagal Mengubah Fansub ${req.params['slug']} 😪`,
              result: {
                message: `Harus Menjadi Anggota Untuk Mengubah Data!`
              }
            }, HttpStatus.FORBIDDEN);
          }
        }
        if ('slug' in req.body) {
          const newSlug = req.body.slug.replace(/[^0-9a-zA-Z-]/g, '').toLowerCase();
          if (CONSTANTS.blacklistedWords.includes(newSlug)) {
            throw new HttpException({
              info: `🙄 400 - Fansub API :: Gagal Mengubah Fansub ${req.params['slug']} 😪`,
              result: {
                message: `Singkatan '${newSlug}' Tidak Dapat Digunakan`
              }
            }, HttpStatus.BAD_REQUEST);
          }
          const selectedFansub = await this.fansubRepo.find({
            where: [
              { slug: ILike(newSlug) }
            ]
          });
          if (selectedFansub.length === 0 && !fansub.dns_id) {
            fansub.slug = newSlug;
          } else {
            throw new HttpException({
              info: `🙄 400 - Fansub API :: Gagal Mengubah Fansub ${req.params['slug']} 😪`,
              result: {
                message: `'${newSlug}' Sudah Terpakai / Terikat Domain`
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
        if ('cover' in req.body) {
          fansub.cover_url = req.body.cover;
        }
        if ('rss_feed' in req.body && (user.role === RoleModel.ADMIN || user.role === RoleModel.MODERATOR || user.role === RoleModel.FANSUBBER)) {
          const rssFeed: string = req.body.rss_feed;
          if (rssFeed.match(CONSTANTS.regexUrl)) {
            try {
              const uri = new URL(`${environment.baseUrl}/api/crawl`);
              uri.searchParams.append('url', rssFeed);
              const feed = await parse(uri.toString(), null);
              if (feed.items.length >= 0) {
                fansub.rss_feed = rssFeed;
              }
            } catch (e) {
              //
            }
          }
        }
        if ('tags' in req.body && Array.isArray(req.body.tags) && req.body.tags.length > 0) {
          const filteredTagsUnique = [...new Set<string>(req.body.tags)];
          fansub.tags = JSON.stringify(filteredTagsUnique);
        }
        if ('urls' in req.body && Array.isArray(req.body.urls) && req.body.urls.length > 0) {
          const filteredUrls = [];
          for (const u of req.body.urls) {
            if ('url' in u && 'name' in u && u.url && u.name) {
              filteredUrls.push({
                url: u.url,
                name: u.name
              });
            }
          }
          fansub.urls = JSON.stringify(filteredUrls);
        }
        fansub.user_ = user;
        const resFansubSave = await this.fansubRepo.save(fansub);
        if ('user_' in resFansubSave && resFansubSave.user_) {
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
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async deleteBySlug(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      let user: UserModel = res.locals['user'];
      const fansub = await this.fansubRepo.findOneOrFail({
        where: [
          {
            slug: ILike(req.params['slug']),
            editable: true
          }
        ],
        relations: ['user_']
      });
      if (user.role !== RoleModel.ADMIN && user.role !== RoleModel.MODERATOR && fansub.user_.id !== user.id) {
        try {
          const member = await this.fansubMemberRepo.findOneOrFail({
            where: [
              {
                fansub_ : {
                  id: Equal(fansub.id)
                },
                user_ : {
                  id: Equal(user.id)
                }
              }
            ],
            relations: ['fansub_', 'user_']
          });
          user = member.user_;
        } catch (e) {
          throw new HttpException({
            info: `🙄 403 - Fansub API :: Gagal Mengubah Fansub ${req.params['slug']} 😪`,
            result: {
              message: `Harus Menjadi Anggota Untuk Menghapus Data!`
            }
          }, HttpStatus.FORBIDDEN);
        }
      }
      fansub.slug = `${fansub.slug}~${Date.now()}`;
      fansub.editable = false;
      const updatedFansub = await this.fansubRepo.save(fansub);
      const deletedFansub = await this.fansubRepo.remove(updatedFansub);
      if ('user_' in deletedFansub && deletedFansub.user_) {
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

  // GET `/api/fansub/:slug/member`
  @Get('/:slug/member')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagFansub)
  @ApiParam({ name: 'slug', type: 'string' })
  async getFansubMembers(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const [members, count] = await this.fansubMemberRepo.findAndCount({
        where: [
          {
            fansub_: {
              slug: ILike(req.params['slug'])
            }
          }
        ],
        order: {
          keterangan: 'ASC',
          created_at: 'DESC'
        },
        relations: ['fansub_', 'user_', 'approved_by_']
      });
      for (const member of members) {
        if ('fansub_' in member && member.fansub_) {
          delete member.fansub_.description;
          delete member.fansub_.urls;
          delete member.fansub_.tags;
          delete member.fansub_.created_at;
          delete member.fansub_.updated_at;
        }
        if ('user_' in member && member.user_) {
          delete member.user_.created_at;
          delete member.user_.updated_at;
        }
        if ('approved_by_' in member && member.approved_by_) {
          delete member.approved_by_.created_at;
          delete member.approved_by_.updated_at;
        }
      }
      return {
        info: `😅 200 - Fansub API :: ${req.params['slug']} Members 🤣`,
        count,
        pages: 1,
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
  @ApiTags(CONSTANTS.apiTagFansub)
  @ApiParam({ name: 'slug', type: 'string' })
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  async getFansubFeedBySlug(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const fansub = await this.fansubRepo.findOneOrFail({
        where: [
          { slug: ILike(req.params['slug']) }
        ],
        order: {
          updated_at: 'DESC'
        }
      });
      const [rssFeeds, count] = await this.rssFeedRepo.findAndCount({
        where: [
          {
            title: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            fansub_: {
              id: Equal(fansub.id)
            }
          },
          {
            link: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            fansub_: {
              id: Equal(fansub.id)
            }
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            link: 'ASC'
          })
        },
        relations: ['fansub_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 5
      });
      for (const r of rssFeeds) {
        if ('fansub_' in r && r.fansub_) {
          delete r.fansub_.description;
          delete r.fansub_.urls;
          delete r.fansub_.tags;
          delete r.fansub_.created_at;
          delete r.fansub_.updated_at;
        }
      }
      return {
        info: `😅 200 - Fansub API :: RSS Feed 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 5)),
        results: rssFeeds
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
