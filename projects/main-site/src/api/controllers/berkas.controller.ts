// NodeJS Library
import { readdirSync } from 'node:fs';

import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { ApiBody, ApiExcludeEndpoint, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Request, Response } from 'express';
import { Equal, ILike, In } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { BerkasModel, RoleModel, UserModel } from '../../models/req-res.model';

import { environment } from '../../environments/api/environment';

import { AnimeService } from '../repository/anime.service';
import { AttachmentService } from '../repository/attachment.service';
import { BerkasService } from '../repository/berkas.service';
import { DoramaService } from '../repository/dorama.service';
import { FansubService } from '../repository/fansub.service';
import { ProjectTypeService } from '../repository/project-type.service';
import { TempAttachmentService } from '../repository/temp-attachment.service';

import { DiscordService } from '../services/discord.service';
import { GlobalService } from '../services/global.service';
import { SocketIoService } from '../services/socket-io.service';

@Controller('/berkas')
export class BerkasController {

  constructor(
    private sr: SchedulerRegistry,
    private animeRepo: AnimeService,
    private attachmentRepo: AttachmentService,
    private berkasRepo: BerkasService,
    private doramaRepo: DoramaService,
    private ds: DiscordService,
    private fansubRepo: FansubService,
    private gs: GlobalService,
    private projectTypeRepo: ProjectTypeService,
    private sis: SocketIoService,
    private tempAttachmentRepo: TempAttachmentService
  ) {
    //
  }

  async handleAttachment(berkas: BerkasModel, req: Request, res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      if ('attachment_id' in req.body) {
        if ('attachment_' in berkas && berkas.attachment_) {
          throw new HttpException({
            info: `🙄 403 - Berkas API :: Tidak Dapat Mengganti Lampiran 😪`,
            result: {
              message: 'Berkas Sudah memiliki Lampiran!'
            }
          }, HttpStatus.FORBIDDEN);
        }
        this.sr.deleteTimeout(`${CONSTANTS.timeoutDeleteTempAttachmentKey}@${req.body.attachment_id}`);
        const tempAttachment = await this.tempAttachmentRepo.findOneOrFail({
          where: [
            {
              id: Equal(req.body.attachment_id),
              user_: {
                id: Equal(user.id)
              }
            }
          ],
          relations: ['user_']
        });
        await this.tempAttachmentRepo.remove(tempAttachment);
        const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
        const fIdx = files.findIndex(f => f.name === tempAttachment.name || f.name === `${tempAttachment.name}${tempAttachment.ext ? `.${tempAttachment.ext}` : ''}`);
        if (fIdx >= 0) {
          const attachment = this.attachmentRepo.new();
          attachment.name = tempAttachment.name;
          attachment.orig = tempAttachment.orig;
          attachment.size = tempAttachment.size;
          attachment.ext = tempAttachment.ext;
          attachment.mime = tempAttachment.mime;
          attachment.user_ = user;
          berkas.attachment_ = await this.attachmentRepo.save(attachment);
        } else {
          throw new Error('Lampiran Tidak Ditemukan / Dalam Proses Penggabungan!');
        }
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 406 - Berkas API :: Gagal Mencari Lampiran 😪`,
        result: {
          message: 'Lampiran Tidak Ditemukan / Dalam Proses Penggabungan!'
        }
      }, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get('/')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagBerkas)
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  async searchBerkas(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const sqlWhere: any = [
        {
          private: false,
          name: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
          r18: false,
          user_: {
            private: true
          }
        },
        {
          ...((user?.verified) ? {
            // Verified User Can See Private Berkas From Public Profile
          } : {
            private: false
          }),
          name: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
          r18: false,
          user_: {
            private: false
          }
        }
      ];
      const userFilesCriteria: any = {};
      if (user) {
        userFilesCriteria.name = ILike(`%${req.query['q'] ? req.query['q'] : ''}%`);
        userFilesCriteria.r18 = false;
        if (user.role === RoleModel.ADMIN || user.role === RoleModel.MODERATOR || user.role === RoleModel.FANSUBBER || this.gs.isFreeTime()) {
          // Admin, Moderator, & Fansubber Can See Private Berkas From All Private Profile
        } else {
          // Current User Can See Private Berkas From Their Private Profile
          userFilesCriteria.user_ = {
            id: Equal(user.id)
          };
        }
        sqlWhere.push(userFilesCriteria);
      }
      if (req.query['r18'] === 'true') {
        for (const sw of sqlWhere) {
          delete sw.r18;
        }
      }
      const [files, count] = await this.berkasRepo.findAndCount({
        where: sqlWhere,
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            name: 'ASC'
          })
        },
        relations: ['project_type_', 'fansub_', 'user_', 'dorama_', 'anime_'],
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
        if ('dorama_' in f && f.dorama_) {
          delete f.dorama_.created_at;
          delete f.dorama_.updated_at;
        }
        if ('user_' in f && f.user_) {
          delete f.user_.created_at;
          delete f.user_.updated_at;
        }
      }
      return {
        info: `😅 200 - Berkas API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: files
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Berkas API :: Gagal Mendapatkan All Berkas 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @ApiTags(CONSTANTS.apiTagBerkas)
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        projectType_id: { type: 'integer' },
        fansub_id: {
          type: 'array',
          items: { type: 'integer' }
        },
        anime_id: { type: 'integer' },
        dorama_id: { type: 'integer' },
        sn_code: { type: 'string' },
        download_url: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              url: { type: 'string' }
            },
            required: ['name', 'url']
          }
        },
        attachment_id: { type: 'string' },
        description: { type: 'string' },
        private: { type: 'boolean' },
        r18: { type: 'boolean' },
        image: { type: 'string' }
      },
      required: ['name', 'projectType_id', 'fansub_id']
    }
  })
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'name' in req.body && 'projectType_id' in req.body &&
        ('anime_id' in req.body || 'dorama_id' in req.body || 'sn_code' in req.body) &&
        ('fansub_id' in req.body && Array.isArray(req.body.fansub_id) && req.body.fansub_id.length > 0)
      ) {
        const user: UserModel = res.locals['user'];
        const berkas = this.berkasRepo.new();
        const filteredUrls = [];
        if ('download_url' in req.body && Array.isArray(req.body.download_url) && req.body.download_url.length > 0) {
          for (const u of req.body.download_url) {
            if ('url' in u && 'name' in u && u.url && u.name) {
              filteredUrls.push({
                url: u.url,
                name: u.name
              });
            }
          }
        }
        if (user.verified) {
          if (filteredUrls.length <= 0 && !req.body.attachment_id) {
            throw new HttpException({
              info: `🙄 400 - Berkas API :: Gagal Menambahkan Berkas 😪`,
              result: {
                message: 'Wajib Mengisi Min 1 URL Eksternal / Upload 1 DDL Stream!'
              }
            }, HttpStatus.BAD_REQUEST);
          }
        } else {
          if ('attachment_id' in req.body) {
            throw new HttpException({
              info: '🙄 403 - Berkas API :: Whoops, Akses Ditolak 😪',
              result: {
                message: 'Silahkan Verifikasi Untuk Bisa Upload Lampiran!'
              }
            }, HttpStatus.FORBIDDEN);
          }
          if (filteredUrls.length <= 0) {
            throw new HttpException({
              info: `🙄 400 - Berkas API :: Gagal Menambahkan Berkas 😪`,
              result: {
                message: 'Wajib Mengisi Min 1 URL Eksternal!'
              }
            }, HttpStatus.BAD_REQUEST);
          }
        }
        berkas.download_url = JSON.stringify(filteredUrls);
        berkas.name = req.body.name;
        if ('description' in req.body) {
          berkas.description = req.body.description;
        }
        if ('private' in req.body) {
          berkas.private = (req.body.private === true);
        }
        if ('r18' in req.body) {
          berkas.r18 = (req.body.r18 === true);
        }
        if ('image' in req.body) {
          berkas.image_url = req.body.image;
        }
        if ('sn_code' in req.body) {
          const sn = req.body.sn_code.toUpperCase().replace(/[^A-Z0-9\-]/g, '');
          if (!sn) {
            throw new HttpException({
              info: `🙄 400 - Berkas API :: Gagal Menambahkan Berkas 😪`,
              result: {
                message: 'Kode Serial Hanya Huruf Besar, Strip, Dan Angka!'
              }
            }, HttpStatus.BAD_REQUEST);
          }
          berkas.anime_ = null;
          berkas.dorama_ = null;
          berkas.sn_code = sn;
        }
        if ('anime_id' in req.body) {
          const anime = await this.animeRepo.findOneOrFail({
            where: [
              { id: Equal(req.body.anime_id) }
            ]
          });
          berkas.anime_ = anime;
          berkas.dorama_ = null;
          berkas.sn_code = null;
        }
        if ('dorama_id' in req.body) {
          const dorama = await this.doramaRepo.findOneOrFail({
            where: [
              { id: Equal(req.body.dorama_id) }
            ]
          });
          berkas.anime_ = null;
          berkas.dorama_ = dorama;
          berkas.sn_code = null;
        }
        const fansub = await this.fansubRepo.find({
          where: [
            { id: In(req.body.fansub_id) }
          ]
        });
        berkas.fansub_ = fansub;
        const project = await this.projectTypeRepo.findOneOrFail({
          where: [
            { id: Equal(req.body.projectType_id) }
          ]
        });
        berkas.project_type_ = project;
        berkas.user_ = user;
        await this.handleAttachment(berkas, req, res);
        const resFileSave = await this.berkasRepo.save(berkas);
        (resFileSave as any).download_url = JSON.parse(resFileSave.download_url);
        const fansubEmbedData = [];
        if ('fansub_' in resFileSave && resFileSave.fansub_) {
          for (const f of resFileSave.fansub_) {
            (f as any).tags = JSON.parse(f.tags);
            (f as any).urls = JSON.parse(f.urls);
            delete f.created_at;
            delete f.updated_at;
            fansubEmbedData.push(f.name);
          }
        }
        if ('attachment_' in resFileSave && resFileSave.attachment_) {
          delete resFileSave.attachment_.user_;
          delete resFileSave.attachment_.created_at;
          delete resFileSave.attachment_.updated_at;
        }
        if ('anime_' in resFileSave && resFileSave.anime_) {
          delete resFileSave.anime_.created_at;
          delete resFileSave.anime_.updated_at;
        }
        if ('project_type_' in resFileSave && resFileSave.project_type_) {
          delete resFileSave.project_type_.created_at;
          delete resFileSave.project_type_.updated_at;
        }
        if ('user_' in resFileSave && resFileSave.user_) {
          delete resFileSave.user_.created_at;
          delete resFileSave.user_.updated_at;
        }
        this.ds.sendNews({
          embeds: [
            this.ds.createEmbedMessageEmptyRawTemplate()
              .setColor('#0099ff')
              .setTitle(resFileSave.name)
              .setURL(`${environment.baseUrl}/berkas/${resFileSave.id}`)
              .setAuthor({
                name: `${environment.siteName} - Penambahan Berkas Baru`,
                iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
                url: environment.baseUrl
              })
              .setDescription(this.gs.htmlToText(resFileSave.description))
              .addField(
                (resFileSave.anime_ ? 'Anime' : (resFileSave.dorama_ ? 'Dorama' : 'Film Lainnya')),
                (resFileSave.anime_ ? resFileSave.anime_.name : (resFileSave.dorama_ ? resFileSave.dorama_.name : resFileSave.sn_code)),
                false
              )
              .addFields(
                { name: 'Jenis', value: resFileSave.project_type_.name.split('_')[1], inline: true },
                { name: 'Ddl', value: (resFileSave.attachment_ ? `Ya (${this.gs.formatBytes(resFileSave.attachment_.size)})` : 'Tidak'), inline: true }
              )
              .addField('Fansub', fansubEmbedData.join(', '), false)
              .addFields(
                { name: 'Terbatas', value: (resFileSave.private ? 'Ya' : 'Tidak'), inline: true },
                { name: 'R-18+', value: (resFileSave.r18 ? 'Ya' : 'Tidak'), inline: true }
              )
              .setImage(resFileSave.image_url.startsWith('/') ? environment.baseUrl + resFileSave.image_url : resFileSave.image_url)
              .setTimestamp(resFileSave.updated_at)
              .setFooter({
                text: resFileSave.user_.username,
                iconURL: resFileSave.user_.image_url.startsWith('/') ? environment.baseUrl + resFileSave.user_.image_url : resFileSave.user_.image_url
              })
          ]
        });
        if (!resFileSave.private) {
          this.sis.emitToBroadcast('new-berkas', resFileSave);
        }
        return {
          info: `😅 201 - Berkas API :: Tambah Baru 🤣`,
          result: resFileSave
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Berkas API :: Gagal Menambah Berkas Baru 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagBerkas)
  @ApiParam({ name: 'id', type: 'string' })
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const file = await this.berkasRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ],
        relations: ['project_type_', 'fansub_', 'user_', 'anime_', 'dorama_', 'attachment_'],
      });
      if ('project_type_' in file && file.project_type_) {
        delete file.project_type_.created_at;
        delete file.project_type_.updated_at;
      }
      if ('fansub_' in file && file.fansub_) {
        for (const f of file.fansub_) {
          delete f.description;
          delete f.urls;
          delete f.tags;
          delete f.created_at;
          delete f.updated_at;
        }
      }
      if ('anime_' in file && file.anime_) {
        delete file.anime_.created_at;
        delete file.anime_.updated_at;
      }
      if ('dorama_' in file && file.dorama_) {
        delete file.dorama_.created_at;
        delete file.dorama_.updated_at;
      }
      if ('user_' in file && file.user_) {
        delete file.user_.created_at;
        delete file.user_.updated_at;
      }
      if (user) {
        (file as any).download_url = JSON.parse(file.download_url);
        if (!user.verified) {
          if (file.attachment_) {
            (file as any).attachment_ = 'Harap Verifikasi Akun!';
          }
        } else {
          if ('attachment_' in file && file.attachment_) {
            delete file.attachment_.created_at;
            delete file.attachment_.updated_at;
            const subtitles = await this.attachmentRepo.find({
              where: [
                {
                  ext: In(CONSTANTS.extSubs),
                  parent_attachment_: {
                    id: Equal(file.attachment_.id)
                  }
                }
              ],
              relations: ['parent_attachment_']
            });
            for (const s of subtitles) {
              delete s.created_at;
              delete s.updated_at;
              delete s.parent_attachment_;
            }
            (file as any).attachment_.subtitles_ = subtitles;
            const fonts = await this.attachmentRepo.find({
              where: [
                {
                  ext: In(CONSTANTS.extFonts),
                  parent_attachment_: {
                    id: Equal(file.attachment_.id)
                  }
                }
              ],
              relations: ['parent_attachment_']
            });
            for (const f of fonts) {
              delete f.created_at;
              delete f.updated_at;
              delete f.parent_attachment_;
            }
            (file as any).attachment_.fonts_ = fonts;
          }
        }
      } else {
        file.download_url = null;
        file.attachment_ = null;
      }
      return {
        info: `😅 200 - Berkas API :: Detail ${req.params['id']} 🤣`,
        result: file
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Berkas API :: Gagal Mencari Berkas ${req.params['id']} 😪`,
        result: {
          message: 'Berkas Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Put('/:id')
  @HttpCode(201)
  @ApiTags(CONSTANTS.apiTagBerkas)
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        projectType_id: { type: 'integer' },
        fansub_id: {
          type: 'array',
          items: { type: 'integer' }
        },
        anime_id: { type: 'integer' },
        dorama_id: { type: 'integer' },
        sn_code: { type: 'string' },
        download_url: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              url: { type: 'string' }
            },
            required: ['name', 'url']
          }
        },
        attachment_id: { type: 'string' },
        description: { type: 'string' },
        private: { type: 'boolean' },
        r18: { type: 'boolean' },
        image: { type: 'string' }
      },
      required: []
    }
  })
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'name' in req.body || 'description' in req.body || 'private' in req.body || 'image' in req.body || 'attachment_id' in req.body ||
        ('anime_id' in req.body || 'dorama_id' in req.body || 'sn_code' in req.body) || 'projectType_id' in req.body || 'r18' in req.body ||
        ('download_url' in req.body && Array.isArray(req.body.download_url) && req.body.download_url.length > 0) ||
        ('fansub_id' in req.body && Array.isArray(req.body.fansub_id) && req.body.fansub_id.length > 0)
      ) {
        const user: UserModel = res.locals['user'];
        const file = await this.berkasRepo.findOneOrFail({
          where: [
            { id: Equal(req.params['id']) }
          ],
          relations: ['user_', 'attachment_', 'anime_', 'dorama_', 'project_type_', 'fansub_']
        });
        if (user.id === file.user_.id) {
          let filteredUrls: any[] = JSON.parse(file.download_url);
          if ('download_url' in req.body && Array.isArray(req.body.download_url) && req.body.download_url.length > 0) {
            filteredUrls = [];
            for (const u of req.body.download_url) {
              if ('url' in u && 'name' in u && u.url && u.name) {
                filteredUrls.push({
                  url: u.url,
                  name: u.name
                });
              }
            }
            file.download_url = JSON.stringify(filteredUrls);
          }
          if (user.verified) {
            if (filteredUrls.length <= 0 && !req.body.attachment_id && !file.attachment_?.id) {
              throw new HttpException({
                info: `🙄 400 - Berkas API :: Gagal Mengubah Berkas ${req.params['id']} 😪`,
                result: {
                  message: 'Wajib Mengisi Min 1 URL Eksternal / Upload 1 DDL Stream!'
                }
              }, HttpStatus.BAD_REQUEST);
            }
          } else {
            if (filteredUrls.length <= 0) {
              throw new HttpException({
                info: `🙄 400 - Berkas API :: Gagal Mengubah Berkas ${req.params['id']} 😪`,
                result: {
                  message: 'Wajib Mengisi Min 1 URL Eksternal!'
                }
              }, HttpStatus.BAD_REQUEST);
            }
          }
          if ('name' in req.body) {
            file.name = req.body.name;
          }
          if ('description' in req.body) {
            file.description = req.body.description;
          }
          if ('image' in req.body) {
            file.image_url = req.body.image;
          }
          if ('private' in req.body) {
            file.private = (req.body.private === true);
          }
          if ('r18' in req.body) {
            file.r18 = (req.body.r18 === true);
          }
          if ('sn_code' in req.body) {
            const sn = req.body.sn_code.toUpperCase().replace(/[^A-Z0-9\-]/g,'');
            if (!sn) {
              throw new HttpException({
                info: `🙄 400 - Berkas API :: Gagal Mengubah Berkas ${req.params['id']} 😪`,
                result: {
                  message: 'Kode Serial Hanya Huruf Besar, Strip, Dan Angka!'
                }
              }, HttpStatus.BAD_REQUEST);
            }
            file.anime_ = null;
            file.dorama_ = null;
            file.sn_code = sn;
          }
          if ('anime_id' in req.body) {
            const anime = await this.animeRepo.findOneOrFail({
              where: [
                { id: Equal(req.body.anime_id) }
              ]
            });
            file.anime_ = anime;
            file.dorama_ = null;
            file.sn_code = null;
          }
          if ('dorama_id' in req.body) {
            const dorama = await this.doramaRepo.findOneOrFail({
              where: [
                { id: Equal(req.body.dorama_id) }
              ]
            });
            file.anime_ = null;
            file.dorama_ = dorama;
            file.sn_code = null;
          }
          if ('fansub_id' in req.body && Array.isArray(req.body.fansub_id) && req.body.fansub_id.length > 0) {
            const fansub = await this.fansubRepo.find({
              where: [
                { id: In(req.body.fansub_id) }
              ]
            });
            file.fansub_ = fansub;
          }
          if ('projectType_id' in req.body) {
            const project = await this.projectTypeRepo.findOneOrFail({
              where: [
                { id: Equal(req.body.projectType_id) }
              ]
            });
            file.project_type_ = project;
          }
          await this.handleAttachment(file, req, res);
          const resFileSave = await this.berkasRepo.save(file);
          (resFileSave as any).download_url = JSON.parse(resFileSave.download_url);
          const fansubEmbedData = [];
          if ('fansub_' in resFileSave && resFileSave.fansub_) {
            for (const f of resFileSave.fansub_) {
              (f as any).tags = JSON.parse(f.tags);
              (f as any).urls = JSON.parse(f.urls);
              delete f.created_at;
              delete f.updated_at;
              fansubEmbedData.push(f.name);
            }
          }
          if ('attachment_' in resFileSave && resFileSave.attachment_) {
            delete resFileSave.attachment_.user_;
            delete resFileSave.attachment_.created_at;
            delete resFileSave.attachment_.updated_at;
          }
          if ('anime_' in resFileSave && resFileSave.anime_) {
            delete resFileSave.anime_.created_at;
            delete resFileSave.anime_.updated_at;
          }
          if ('dorama_' in resFileSave && resFileSave.dorama_) {
            delete resFileSave.dorama_.created_at;
            delete resFileSave.dorama_.updated_at;
          }
          if ('project_type_' in resFileSave && resFileSave.project_type_) {
            delete resFileSave.project_type_.created_at;
            delete resFileSave.project_type_.updated_at;
          }
          if ('user_' in resFileSave && resFileSave.user_) {
            delete resFileSave.user_.created_at;
            delete resFileSave.user_.updated_at;
          }
          this.ds.sendNews({
            embeds: [
              this.ds.createEmbedMessageEmptyRawTemplate()
                .setColor('#ff4081')
                .setTitle(resFileSave.name)
                .setURL(`${environment.baseUrl}/berkas/${resFileSave.id}`)
                .setAuthor({
                  name: `${environment.siteName} - Pembaharuan Data Berkas`,
                  iconURL: `${environment.baseUrl}/assets/img/favicon.png`,
                  url: environment.baseUrl
                })
                .setDescription(this.gs.htmlToText(resFileSave.description))
                .addField(
                  (resFileSave.anime_ ? 'Anime' : (resFileSave.dorama_ ? 'Dorama' : 'Film Lainnya')),
                  (resFileSave.anime_ ? resFileSave.anime_.name : (resFileSave.dorama_ ? resFileSave.dorama_.name : resFileSave.sn_code)),
                  false
                )
                .addFields(
                  { name: 'Jenis', value: resFileSave.project_type_.name.split('_')[1], inline: true },
                  { name: 'Ddl', value: (resFileSave.attachment_ ? `Ya (${this.gs.formatBytes(resFileSave.attachment_.size)})` : 'Tidak'), inline: true }
                )
                .addField('Fansub', fansubEmbedData.join(', '), false)
                .addFields(
                  { name: 'Terbatas', value: (resFileSave.private ? 'Ya' : 'Tidak'), inline: true },
                  { name: 'R-18+', value: (resFileSave.r18 ? 'Ya' : 'Tidak'), inline: true }
                )
                .setImage(resFileSave.image_url.startsWith('/') ? environment.baseUrl + resFileSave.image_url : resFileSave.image_url)
                .setTimestamp(resFileSave.updated_at)
                .setFooter({
                  text: resFileSave.user_.username,
                  iconURL: resFileSave.user_.image_url.startsWith('/') ? environment.baseUrl + resFileSave.user_.image_url : resFileSave.user_.image_url
                })
            ]
          });
          return {
            info: `😅 200 - Berkas API :: Ubah ${req.params['id']} 🤣`,
            result: resFileSave
          };
        } else {
          throw new HttpException({
            info: '🙄 403 - Berkas API :: Authorisasi Kepemilikan Gagal 😪',
            result: {
              message: 'Berkas Milik Orang Lain!'
            }
          }, HttpStatus.FORBIDDEN);
        }
      } else {
        throw new HttpException({
          info: `🙄 400 - Berkas API :: Gagal Mengubah Berkas ${req.params['id']} 😪`,
          result: {
            message: 'Data Tidak Lengkap!'
          }
        }, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Berkas API :: Gagal Mencari Berkas ${req.params['id']} 😪`,
        result: {
          message: 'Berkas Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const berkas =  await this.berkasRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ],
        relations: ['user_']
      });
      if (user.id === berkas.user_.id || user.role === RoleModel.ADMIN || user.role === RoleModel.MODERATOR) {
        const deletedBerkas = await this.berkasRepo.remove(berkas);
        if ('user_' in deletedBerkas && deletedBerkas.user_) {
          delete deletedBerkas.user_.created_at;
          delete deletedBerkas.user_.updated_at;
        }
        return {
          info: `😅 202 - Berkas API :: Berhasil Menghapus Berkas ${req.params['id']} 🤣`,
          result: deletedBerkas
        };
      } else {
        throw new HttpException({
          info: '🙄 403 - Berkas API :: Authorisasi Kepemilikan Gagal 😪',
          result: {
            message: 'Berkas Milik Orang Lain!'
          }
        }, HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Berkas API :: Gagal Mencari Berkas ${req.params['id']} 😪`,
        result: {
          message: 'Berkas Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
