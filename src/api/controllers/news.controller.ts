import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified.decorator';

import { NewsService } from '../repository/news.service';

import { DiscordService } from '../services/discord.service';
import { SocketIoService } from '../services/socket-io.service';

@Controller('/news')
export class NewsController {

  constructor(
    private ds: DiscordService,
    private newsRepo: NewsService,
    private sis: SocketIoService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagNews)
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [news, count] = await this.newsRepo.findAndCount({
        where: [
          { title: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            title: 'ASC'
          })
        },
        relations: ['user_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const n of news) {
        delete n.content;
        (n as any).tags = JSON.parse(n.tags);
        if ('user_' in n && n.user_) {
          delete n.user_.created_at;
          delete n.user_.updated_at;
        }
      }
      return {
        info: `😅 200 - News API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: news
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - News API :: Gagal Mendapatkan All News 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('title' in req.body && 'content' in req.body) {
        const user: UserModel = res.locals['user'];
        const news = this.newsRepo.new();
        news.title = req.body.title;
        news.content = req.body.content;
        if ('image' in req.body) {
          news.image_url = req.body.image;
        }
        if ('tags' in req.body && Array.isArray(req.body.tags) && req.body.tags.length > 0) {
          const filteredTagsUnique = [...new Set<string>(req.body.tags)];
          news.tags = JSON.stringify(filteredTagsUnique);
        }
        news.user_ = user;
        const resNewsSave = await this.newsRepo.save(news);
        if ('user_' in resNewsSave && resNewsSave.user_) {
          delete resNewsSave.user_.created_at;
          delete resNewsSave.user_.updated_at;
        }
        this.ds.sendNews(
          this.ds.createEmbedMessage(
            '#0099ff',
            resNewsSave.title,
            `${environment.baseUrl}/news/${resNewsSave.id}`,
            {
              name: `${environment.siteName} - Penambahan Berita Baru`,
              iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
              url: environment.baseUrl
            },
            resNewsSave.content,
            resNewsSave.image_url,
            resNewsSave.updated_at,
            {
              text: resNewsSave.user_.username,
              iconURL: resNewsSave.user_.image_url
            }
          )
        );
        this.sis.emitToBroadcast('new-news', resNewsSave);
        return {
          info: `😅 201 - News API :: Tambah Baru 🤣`,
          result: resNewsSave
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - News API :: Gagal Menambah News Baru 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagNews)
  @ApiParam({ name: 'id', type: 'number' })
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const news = await this.newsRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ],
        relations: ['user_'],
      });
      (news as any).tags = JSON.parse(news.tags);
      if ('user_' in news && news.user_) {
        delete news.user_.created_at;
        delete news.user_.updated_at;
      }
      return {
        info: `😅 200 - News API :: Detail ${req.params['id']} 🤣`,
        result: news
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - News API :: Gagal Mencari News ${req.params['id']} 😪`,
        result: {
          message: 'News Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put('/:id')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'title' in req.body || 'content' in req.body || 'image' in req.body ||
        ('tags' in req.body && Array.isArray(req.body.tags) && req.body.tags.length > 0)
      ) {
        const user: UserModel = res.locals['user'];
        const news = await this.newsRepo.findOneOrFail({
          where: [
            { id: Equal(parseInt(req.params['id'])) }
          ],
          relations: ['user_']
        });
        if (user.id === news.user_.id) {
          if ('title' in req.body) {
            news.title = req.body.title;
          }
          if ('content' in req.body) {
            news.content = req.body.content;
          }
          if ('image' in req.body) {
            news.image_url = req.body.image;
          }
          if ('tags' in req.body && Array.isArray(req.body.tags) && req.body.tags.length > 0) {
            const filteredTagsUnique = [...new Set<string>(req.body.tags)];
            news.tags = JSON.stringify(filteredTagsUnique);
          }
          const resNewsSave = await this.newsRepo.save(news);
          if ('user_' in resNewsSave && resNewsSave.user_) {
            delete resNewsSave.user_.created_at;
            delete resNewsSave.user_.updated_at;
          }
          this.ds.sendNews(
            this.ds.createEmbedMessage(
              '#ff4081',
              resNewsSave.title,
              `${environment.baseUrl}/news/${resNewsSave.id}`,
              {
                name: `${environment.siteName} - Pembaharuan Data Berita`,
                iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
                url: environment.baseUrl
              },
              resNewsSave.content,
              resNewsSave.image_url,
              resNewsSave.updated_at,
              {
                text: resNewsSave.user_.username,
                iconURL: resNewsSave.user_.image_url
              }
            )
          );
          return {
            info: `😅 201 - News API :: Ubah ${req.params['id']} 🤣`,
            result: resNewsSave
          };
        } else {
          throw new HttpException({
            info: '🙄 403 - News API :: Authorisasi Kepemilikan Gagal 😪',
            result: {
              message: 'Berita Milik Orang Lain!'
            }
          }, HttpStatus.FORBIDDEN);
        }
      } else {
        throw new HttpException({
          info: `🙄 400 - News API :: Gagal Mengubah News ${req.params['id']} 😪`,
          result: {
            message: 'Data Tidak Lengkap!'
          }
        }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - News API :: Gagal Mencari News ${req.params['id']} 😪`,
        result: {
          message: 'News Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const news =  await this.newsRepo.findOneOrFail({
        where: [
          { id: Equal(parseInt(req.params['id'])) }
        ]
      });
      const deletedNews = await this.newsRepo.remove(news);
      if ('user_' in deletedNews && deletedNews.user_) {
        delete deletedNews.user_.created_at;
        delete deletedNews.user_.updated_at;
      }
      return {
        info: `😅 202 - News API :: Berhasil Menghapus News ${req.params['id']} 🤣`,
        result: deletedNews
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - News API :: Gagal Mencari News ${req.params['id']} 😪`,
        result: {
          message: 'News Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
