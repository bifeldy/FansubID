import { Controller, HttpCode, Get, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ILike } from 'typeorm';

import { CONSTANTS } from '../../../constants';

import { FansubService } from '../../repository/fansub.service';
import { RssFeedService } from '../../repository/rss-feed.service';

@Controller('/fansub-rss-feed')
export class FansubRssFeedController {

  constructor(
    private fansubRepo: FansubService,
    private rssFeedRepo: RssFeedService
  ) {
    //
  }

  // GET `/api/fansub-rss-feed`
  @Get('/')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagRss)
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'summary', required: false, type: 'boolean' })
  async getFansubFeed(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      let rslt = [];
      let cnt = 0;
      let pg = 0;
      if (req.query['summary'] === 'true') {
        const rfs = await this.rssFeedRepo.query(`
          SELECT
            rf.title rf_title,
            rf.link rf_link,
            rf.created_at rf_created_at,
            rf.fansub_id rf_fansub_id,
            f.id f_id,
            f.name f_name,
            f.description f_description,
            f.slug f_slug,
            f.born f_born,
            f.active f_active,
            f.urls f_urls,
            f.rss_feed f_rss_feed,
            f.tags f_tags,
            f.image_url f_image_url,
            f.view_count f_view_count,
            f.like_count f_like_count,
            f.dns_id f_dns_id,
            f.dns_id_alt f_dns_id_alt,
            f.editable f_editable,
            f.created_at f_created_at,
            f.updated_at f_updated_at,
            f.deleted_at f_deleted_at,
            f.user_id f_user_id
          FROM (
            SELECT *, ROW_NUMBER() OVER (
              PARTITION BY fansub_id ORDER BY created_at DESC
            ) AS r
            FROM rss_feed
          ) rf
          LEFT JOIN fansub f ON f.id = rf.fansub_id
          WHERE rf.r = 1
          ORDER BY rf.created_at DESC
        `);
        rslt = rfs.map(rf => {
          const f = this.fansubRepo.new();
          f.id = rf.f_id;
          f.name = rf.f_name;
          f.description = rf.f_description;
          f.slug = rf.f_slug;
          f.born = rf.f_born;
          f.active = rf.f_active;
          f.urls = rf.f_urls;
          f.rss_feed = rf.f_rss_feed;
          f.tags = rf.f_tags;
          f.image_url = rf.f_image_url;
          f.view_count = rf.f_view_count;
          f.like_count = rf.f_like_count;
          f.dns_id = rf.f_dns_id;
          f.dns_id_alt = rf.f_dns_id_alt;
          f.editable = rf.f_editable;
          f.created_at = rf.f_created_at;
          f.updated_at = rf.f_updated_at;
          f.deleted_at = rf.f_deleted_at;
          const r = this.rssFeedRepo.new();
          r.title = rf.rf_title;
          r.link = rf.rf_link;
          r.created_at = rf.rf_created_at;
          r.fansub_ = f;
          return r;
        });
        cnt = rslt.length;
        pg = 1;
      } else {
        const [rfs, count] = await this.rssFeedRepo.findAndCount({
          where: [
            { title: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) },
            { link: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) },
            {
              fansub_: {
                name: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`)
              }
            },
            {
              fansub_: {
                slug: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`)
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
          take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
        });
        rslt = rfs;
        cnt = count;
        pg = Math.ceil(count / (queryRow ? queryRow : 10));
      }
      for (const r of rslt) {
        if ('fansub_' in r && r.fansub_) {
          delete r.fansub_.description;
          delete r.fansub_.urls;
          delete r.fansub_.tags;
          delete r.fansub_.created_at;
          delete r.fansub_.updated_at;
        }
      }
      return {
        info: `😅 200 - RSS Feed API :: All Fansubs 🤣`,
        count: cnt,
        pages: pg,
        results: rslt
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - RSS Feed API :: Gagal Menarik Data 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
