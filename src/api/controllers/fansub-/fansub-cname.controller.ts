import { CACHE_MANAGER, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cache } from 'cache-manager';
import { ILike } from 'typeorm';

import { environment } from '../../../environments/api/environment';

import { FansubService } from '../../repository/fansub.service';

import { CloudflareService } from '../../services/cloudflare.service';

@Controller('/fansub-cname')
export class FansubCnameController {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private cfs: CloudflareService,
    private fansubRepo: FansubService
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

}
