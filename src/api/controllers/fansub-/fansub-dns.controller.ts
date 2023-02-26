import { CACHE_MANAGER, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';
import { ILike } from 'typeorm';

import { environment } from '../../../environments/api/environment';

import { CONSTANTS } from '../../../constants';

import { RoleModel, UserModel } from '../../../models/req-res.model';

import { Roles } from '../../decorators/roles.decorator';
import { VerifiedOnly } from '../../decorators/verified.decorator';

import { FansubService } from '../../repository/fansub.service';
import { FansubMemberService } from '../../repository/fansub-member.service';

import { CloudflareService } from '../../services/cloudflare.service';
import { GlobalService } from '../../services/global.service';

@ApiExcludeController()
@Controller('/fansub-dns')
export class FansubDnsController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private gs: GlobalService,
    private cfs: CloudflareService,
    private fansubRepo: FansubService,
    private fansubMemberRepo: FansubMemberService
  ) {
    //
  }

  // GET `/api/fansub-dns`
  @Get('/')
  @HttpCode(200)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryName = `${req.query['q'] ? req.query['q'] : ''}`;
      const queryPage = parseInt(req.query['page'] as string) || 1;
      const queryRow = parseInt(req.query['row'] as string) || 10;
      const querySort = `${req.query['sort'] ? req.query['sort'] : 'name'}`;
      const queryOrder = `${req.query['order'] ? req.query['order'] : 'asc'}`;
      const dnss = await this.cfs.getDnss(queryName, queryPage, queryRow, querySort, queryOrder);
      if (dnss) {
        const records = [];
        for (const rec of dnss.results) {
          const fansubSlug = rec.name.split(`.${environment.cloudflare.domain}`)[0].toLowerCase();
          if (CONSTANTS.blacklistedWords.includes(fansubSlug)) {
            continue;
          }
          try {
            let fansub = await this.fansubRepo.findOneOrFail({
              where: [
                { slug: ILike(fansubSlug) }
              ]
            });
            let isFansubDnsChanged = false;
            if (fansub.dns_id !== rec.id) {
              fansub.dns_id = rec.id;
              isFansubDnsChanged = true;
            }
            let isFansubUrlChanged = false;
            const fansubUrls = JSON.parse(fansub.urls);
            if (fansubUrls && Array.isArray(fansubUrls)) {
              const idx = fansubUrls.findIndex(u => u.name === 'web');
              if (idx >= 0) {
                if (fansubUrls[idx].url !== rec.name) {
                  fansubUrls[idx].url = `https://${rec.name}`;
                  isFansubUrlChanged = true;
                }
              } else {
                fansubUrls.push({ name: 'web', url: `https://${rec.name}` });
                isFansubUrlChanged = true;
              }
            }
            if (isFansubDnsChanged || isFansubUrlChanged) {
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
            rec.fansub_ = fansub;
          } catch (e) {
            rec.fansub_ = null;
          }
          records.push({
            id: rec.id,
            name: rec.name,
            content: rec.type === 'A' ? '***.***.***.***' : rec.content,
            proxied: rec.proxied,
            ttl: rec.ttl,
            type: rec.type,
            created_at: rec.created_on,
            updated_at: rec.modified_on,
            fansub_: rec.fansub_
          });
        }
        const responseBody = {
          info: `😅 ${dnss.status} - Cloudflare API :: List All DNS 🤣`,
          count: dnss.count,
          pages: dnss.pages,
          results: records
        };
        if (records.length >= 0) {
          this.cm.set(req.originalUrl, { status: dnss.status, body: responseBody }, { ttl: environment.externalApiCacheTime });
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
        let serverTarget: string = this.gs.cleanUpUrlStringRecord(req.body.server_target);
        let recordType = 'CNAME';
        if (serverTarget.match(CONSTANTS.regexIpAddress)) {
          recordType = 'A';
        }
        const dns = await this.cfs.createDns(fansub.slug, serverTarget, recordType);
        if (dns.status >= 200 && dns.status < 400) {
          let verification_name: string = this.gs.cleanUpUrlStringRecord(req.body.verification_name);
          let verification_target: string = this.gs.cleanUpUrlStringRecord(req.body.verification_target);
          if (verification_target && verification_target && serverTarget === 'ghs.google.com') {
            await this.cfs.createDns(verification_name, verification_target, 'CNAME');
          }
          fansub.dns_id = dns.result.id;
          const fansubUrls = JSON.parse(fansub.urls);
          if (fansubUrls && Array.isArray(fansubUrls)) {
            const idx = fansubUrls.findIndex(u => u.name === 'web');
            if (idx >= 0) {
              fansubUrls[idx].url = `https://${dns.result.name}`;
            } else {
              fansubUrls.push({ name: 'web', url: `https://${dns.result.name}` });
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
            info: `😅 ${dns.status} - Cloudflare API :: Pendaftaran SubDomain Berhasil 🥰`,
            result: {
              id: dns.result.id,
              name: dns.result.name,
              content: dns.result.content,
              proxied: dns.result.proxied,
              ttl: dns.result.ttl,
              type: dns.result.type,
              created_at: dns.result.created_on,
              updated_at: dns.result.modified_on,
              fansub_: fansub
            }
          };
        }
        throw new HttpException({
          info: `🙄 ${dns.status} - Cloudflare API :: Gagal Menggunakan SubDomain 😪`,
          result: dns.result
        }, dns.status);
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
