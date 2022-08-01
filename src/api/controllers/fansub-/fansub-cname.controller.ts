import { CACHE_MANAGER, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';
import { ILike } from 'typeorm';

import { environment } from '../../../environments/api/environment';

import { RoleModel, UserModel } from '../../../models/req-res.model';

import { Roles } from '../../decorators/roles.decorator';
import { VerifiedOnly } from '../../decorators/verified.decorator';

import { FansubService } from '../../repository/fansub.service';

import { CloudflareService } from '../../services/cloudflare.service';
import { FansubMemberService } from '../../repository/fansub-member.service';

@Controller('/fansub-cname')
export class FansubCnameController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private cfs: CloudflareService,
    private fansubRepo: FansubService,
    private fansubMemberRepo: FansubMemberService
  ) {
    //
  }

  // GET `/api/fansub-cname`
  @Get('/')
  @HttpCode(200)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryName = `${req.query['q'] ? req.query['q'] : ''}`;
      const queryPage = parseInt(req.query['page'] as string) || 1;
      const queryRow = parseInt(req.query['row'] as string) || 10;
      const querySort = `${req.query['sort'] ? req.query['sort'] : ''}`;
      const queryOrder = `${req.query['order'] ? req.query['order'] : ''}`;
      const cnames = await this.cfs.getCnames(queryName, queryPage, queryRow, querySort, queryOrder);
      if (cnames) {
        const cns = [];
        for (const c of cnames.results) {
          try {
            const fansubSlug = c.name.split(`.${environment.domain}`)[0];
            let fansub = await this.fansubRepo.findOneOrFail({
              where: [
                { slug: ILike(fansubSlug) }
              ]
            });
            let isFansubCnameChanged = false;
            if (fansub.cname_id !== c.id) {
              fansub.cname_id = c.id;
              isFansubCnameChanged = true;
            }
            let isFansubUrlChanged = false;
            const fansubUrls = JSON.parse(fansub.urls);
            if (fansubUrls && Array.isArray(fansubUrls)) {
              const idx = fansubUrls.findIndex(u => u.name === 'web');
              if (idx >= 0) {
                if (fansubUrls[idx].url !== c.name) {
                  fansubUrls[idx].url = c.name;
                  isFansubUrlChanged = true;
                }
              } else {
                fansubUrls.push({ name: 'web', url: c.name });
                isFansubUrlChanged = true;
              }
            }
            if (isFansubCnameChanged || isFansubUrlChanged) {
              if (isFansubUrlChanged) {
                fansub.urls = JSON.stringify(fansubUrls);
              }
              fansub = await this.fansubRepo.save(fansub);
            }
            delete fansub.urls;
            delete fansub.tags;
            delete fansub.view_count;
            delete fansub.like_count;
            delete fansub.description;
            delete fansub.rss_feed;
            delete fansub.created_at;
            delete fansub.updated_at;
            delete fansub.user_;
            c.fansub_ = fansub;
          } catch (e) {
            c.fansub_ = null;
          }
          cns.push({
            id: c.id,
            name: c.name,
            content: c.content,
            proxied: c.proxied,
            ttl: c.ttl,
            type: c.type,
            created_at: c.created_on,
            updated_at: c.modified_on,
            fansub_: c.fansub_
          });
        }
        const responseBody = {
          info: `😅 ${cnames.status} - Cloudflare API :: List All CNAME 🤣`,
          count: cnames.count,
          pages: cnames.pages,
          results: cns
        };
        if (cns.length >= 0) {
          this.cm.set(req.originalUrl, { status: cnames.status, body: responseBody }, { ttl: environment.externalApiCacheTime });
        }
        return responseBody;
      }
      throw new Error('Gagal Tarik Data DNS Zone');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Cloudflare API :: Gagal Menarik Data 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER)
  @VerifiedOnly()
  async createNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('slug' in req.body && 'server_target' in req.body) {
        let user: UserModel = res.locals['user'];
        let fansub = await this.fansubRepo.findOneOrFail({
          where: [
            { slug: ILike(req.body.slug) }
          ]
        });
        if (user.role !== RoleModel.ADMIN && user.role !== RoleModel.MODERATOR) {
          try {
            const member = await this.fansubMemberRepo.findOneOrFail({
              where: [
                {
                  fansub_ : {
                    id: fansub.id
                  },
                  user_ : {
                    id: user.id
                  }
                }
              ],
              relations: ['fansub_', 'user_']
            });
            user = member.user_;
          } catch (e) {
            throw new HttpException({
              info: `😅 403 - Cloudflare API :: Pendaftaran SubDomain Ditolak 🤣`,
              result: {
                message: `Anda Harus Menjadi Anggota Untuk Klaim SubDomain!`
              }
            }, HttpStatus.FORBIDDEN);
          }
        }
        const cname = await this.cfs.createCname(fansub.slug, req.body.server_target);
        if (cname.status >= 200 && cname.status < 300) {
          fansub.cname_id = cname.result.id;
          const fansubUrls = JSON.parse(fansub.urls);
          if (fansubUrls && Array.isArray(fansubUrls)) {
            const idx = fansubUrls.findIndex(u => u.name === 'web');
            if (idx >= 0) {
              fansubUrls[idx].url = cname.result.name;
            } else {
              fansubUrls.push({ name: 'web', url: cname.result.name });
            }
          }
          fansub.urls = JSON.stringify(fansubUrls);
          fansub.user_ = user;
          fansub = await this.fansubRepo.save(fansub);
          delete fansub.urls;
          delete fansub.tags;
          delete fansub.view_count;
          delete fansub.like_count;
          delete fansub.description;
          delete fansub.rss_feed;
          delete fansub.created_at;
          delete fansub.updated_at;
          delete fansub.user_;
          return {
            info: `😅 ${cname.status} - Cloudflare API :: Pendaftaran SubDomain Berhasil 🥰`,
            result: {
              id: cname.result.id,
              name: cname.result.name,
              content: cname.result.content,
              proxied: cname.result.proxied,
              ttl: cname.result.ttl,
              type: cname.result.type,
              created_at: cname.result.created_on,
              updated_at: cname.result.modified_on,
              fansub_: fansub
            }
          };
        } else {
          throw new HttpException({
            info: `🙄 ${cname.status} - Cloudflare API :: Gagal Menggunakan SubDomain 😪`,
            result: cname.result
          }, cname.status);
        }
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Cloudflare API :: Gagal Mencari Fansub 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
