// NodeJS Library
import { writeFile, createReadStream, unlink, readdirSync } from 'node:fs';

import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Equal, ILike, In } from 'typeorm';

import { Roles } from '../decorators/roles.decorator';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { environment } from '../../environments/api/environment';

import { AnimeService } from '../repository/anime.service';
import { AttachmentService } from '../repository/attachment.service';
import { BerkasService } from '../repository/berkas.service';
import { DoramaService } from '../repository/dorama.service';
import { FansubService } from '../repository/fansub.service';
import { ProjectTypeService } from '../repository/project-type.service';
import { TempAttachmentService } from '../repository/temp-attachment.service';

import { DiscordService } from '../services/discord.service';
import { GdriveService } from '../services/gdrive.service';
import { GlobalService } from '../services/global.service';
import { MkvExtractService } from '../services/mkv-extract.service';
import { SocketIoService } from '../services/socket-io.service';

@Controller('/berkas')
export class BerkasController {

  constructor(
    private animeRepo: AnimeService,
    private attachmentRepo: AttachmentService,
    private berkasRepo: BerkasService,
    private doramaRepo: DoramaService,
    private ds: DiscordService,
    private fansubRepo: FansubService,
    private gdrive: GdriveService,
    private gs: GlobalService,
    private mkv: MkvExtractService,
    private projectTypeRepo: ProjectTypeService,
    private sis: SocketIoService,
    private tempAttachmentRepo: TempAttachmentService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  async searchBerkas(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [files, count] = await this.berkasRepo.findAndCount({
        where: [
          {
            ...((user?.verified) ? {
              // Verified User Can See Private Berkas
            } : {
              private: false
            }),
            name: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`)
          }
        ],
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
          delete f.user_.role;
          delete f.user_.password;
          delete f.user_.session_token;
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
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'name' in req.body && 'description' in req.body && 'projectType_id' in req.body &&
        ('anime_id' in req.body || 'dorama_id' in req.body) &&
        'download_url' in req.body && Array.isArray(req.body.download_url) && req.body.download_url.length > 0 &&
        'fansub_id' in req.body && Array.isArray(req.body.fansub_id) && req.body.fansub_id.length > 0
      ) {
        const user: UserModel = res.locals['user'];
        const berkas = this.berkasRepo.new();
        const filteredUrls = [];
        for (const u of req.body.download_url) {
          if ('url' in u && 'name' in u && u.url && u.name) {
            filteredUrls.push(u);
          }
        }
        berkas.name = req.body.name;
        berkas.download_url = JSON.stringify(filteredUrls);
        berkas.description = req.body.description;
        if ('private' in req.body) {
          berkas.private = (req.body.private === true);
        }
        if (req.body.image) {
          berkas.image_url = req.body.image;
        }
        if (req.body.anime_id) {
          const anime = await this.animeRepo.findOneOrFail({
            where: [
              { id: Equal(req.body.anime_id) }
            ]
          });
          berkas.anime_ = anime;
          berkas.dorama_ = null;
        }
        if (req.body.dorama_id) {
          const dorama = await this.doramaRepo.findOneOrFail({
            where: [
              { id: Equal(req.body.dorama_id) }
            ]
          });
          berkas.anime_ = null;
          berkas.dorama_ = dorama;
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
        if (req.body.attachment_id) {
          const tempAttachment = await this.tempAttachmentRepo.findOneOrFail({
            relations: ['user_'],
            where: [
              { id: Equal(req.body.attachment_id) }
            ]
          });
          const attachment = this.attachmentRepo.new();
          attachment.name = tempAttachment.name;
          attachment.size = tempAttachment.size;
          attachment.ext = tempAttachment.ext;
          attachment.user_ = tempAttachment.user_;
          const resAttachmentSave = await this.attachmentRepo.save(attachment);
          berkas.attachment_ = resAttachmentSave;
          await this.tempAttachmentRepo.remove(tempAttachment);
          const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
          const fIdx = files.findIndex(f => f.name.toString().toLowerCase().includes(attachment.name.toString().toLowerCase()));
          let mimeType = 'video/';
          if (fIdx >= 0) {
            if (attachment.ext.toString().toLowerCase() === 'mkv') {
              this.mkv.mkvExtract(attachment.name.toString().toLowerCase(), `${environment.uploadFolder}/${files[fIdx].name}`, async (e1, extractedFiles) => {
                if (e1) {
                  this.gs.log('[MKV_EXTRACT-ERROR] 📂', e1, 'error');
                } else {
                  for (const f of extractedFiles) {
                    writeFile(`${environment.uploadFolder}/${f.name}`, f.data, async (e2) => {
                      if (e2) {
                        this.gs.log('[NODE_FS_WRITE_FILE-ERROR] 📁', e2, 'error');
                      } else {
                        try {
                          const mkvAttachment = this.attachmentRepo.new();
                          mkvAttachment.name = f.name;
                          mkvAttachment.size = f.size;
                          const strSplit = f.name.split('.');
                          mkvAttachment.ext = strSplit[strSplit.length - 1];
                          mkvAttachment.user_ = attachment.user_;
                          mkvAttachment.parent_attachment_ = resAttachmentSave;
                          await this.attachmentRepo.save(mkvAttachment);
                        } catch (e3) {
                          this.gs.log('[FILE_NOTE-ERROR] 🎼', e3, 'error');
                        }
                      }
                    });
                  }
                }
              });
              mimeType += 'x-matroska';
            } else {
              mimeType += attachment.ext.toString().toLowerCase();
            }
            this.gdrive.gDrive(true).then(async (gdrive) => {
              const dfile = await gdrive.files.create({
                requestBody: {
                  name: `${attachment.name.toString().toLowerCase()}.${attachment.ext.toString().toLowerCase()}`,
                  parents: [environment.gdriveFolderId],  // Hikki ひきこもり - Folder
                  mimeType
                },
                media: {
                  mimeType,
                  body: createReadStream(`${environment.uploadFolder}/${files[fIdx].name}`)
                },
                fields: 'id'
              });
              resAttachmentSave.google_drive = dfile.data.id;
              await this.attachmentRepo.save(resAttachmentSave);
              unlink(`${environment.uploadFolder}/${files[fIdx].name}`, (e) => {
                if (e) {
                  this.gs.log('[NODE_FS_UNLINK-ERROR] 🔗', e, 'error');
                }
              });
              // await gdrive.permissions.create({
              //   transferOwnership: true,
              //   fileId: dfile.data.id,
              //   requestBody: {
              //     type: 'user',
              //     role: 'owner',
              //     emailAddress: environment.gCloudPlatform.clientEmail
              //   }
              // });
            }).catch(e => this.gs.log('[GDRIVE-ERROR] 💽', e, 'error'));
          } else {
            await this.attachmentRepo.remove(attachment);
            throw new HttpException({
              info: `🙄 404 - Berkas API :: Gagal Mencari Lampiran 😪`,
              result: {
                message: 'Lampiran Tidak Ditemukan!'
              }
            }, HttpStatus.NOT_FOUND);
          }
        }
        const resFileSave = await this.berkasRepo.save(berkas);
        resFileSave.download_url = JSON.parse(resFileSave.download_url);
        const fansubEmbedData = [];
        if ('fansub_' in resFileSave && resFileSave.fansub_) {
          for (const f of resFileSave.fansub_) {
            f.tags = JSON.parse(f.tags);
            f.urls = JSON.parse(f.urls);
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
          delete resFileSave.user_.role;
          delete resFileSave.user_.password;
          delete resFileSave.user_.session_token;
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
              .setDescription(resFileSave.description.replace(/<[^>]*>/g, ' ').trim())
              .addField(resFileSave.anime_ ? 'Anime' : 'Dorama', resFileSave.anime_ ? resFileSave.anime_.name : resFileSave.dorama_.name, false)
              .addField('Fansub', fansubEmbedData.join(', '), false)
              .addFields(
                { name: 'Jenis', value: resFileSave.project_type_.name.split('_')[1], inline: true },
                { name: 'Ddl/Stream', value: (resFileSave.attachment_ ? 'Ya' : 'Tidak'), inline: true },
                { name: 'Tersembunyi', value: (resFileSave.private ? 'Ya' : 'Tidak'), inline: true }
              )
              .setImage(resFileSave.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resFileSave.image_url)
              .setTimestamp(resFileSave.updated_at)
              .setFooter({
                text: resFileSave.user_.username,
                iconURL: resFileSave.user_.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resFileSave.user_.image_url
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
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
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
        delete file.user_.role;
        delete file.user_.password;
        delete file.user_.session_token;
        delete file.user_.created_at;
        delete file.user_.updated_at;
      }
      if (user) {
        file.download_url = JSON.parse(file.download_url);
        if (!user.verified) {
          if (file.attachment_) {
            (file as any).attachment_ = 'Harap Verifikasi Akun!';
          }
        } else {
          if ('attachment_' in file && file.attachment_) {
            const subtitles = await this.attachmentRepo.find({
              where: [
                {
                  ext: ILike('ass'),
                  parent_attachment_: {
                    id: Equal(file.attachment_.id)
                  }
                },
                {
                  ext: ILike('srt'),
                  parent_attachment_: {
                    id: Equal(file.attachment_.id)
                  }
                }
              ],
              relations: ['parent_attachment_']
            });
            for (const s of subtitles) {
              delete s.created_at;
              delete s.download_count;
              delete s.parent_attachment_;
              delete s.updated_at;
              delete s.user_;
            }
            (file as any).attachment_.subtitles_ = subtitles;
            const fonts = await this.attachmentRepo.find({
              where: [
                {
                  ext: ILike('ttf'),
                  parent_attachment_: {
                    id: Equal(file.attachment_.id)
                  }
                },
                {
                  ext: ILike('otf'),
                  parent_attachment_: {
                    id: Equal(file.attachment_.id)
                  }
                }
              ],
              relations: ['parent_attachment_']
            });
            for (const f of fonts) {
              delete f.created_at;
              delete f.download_count;
              delete f.parent_attachment_;
              delete f.updated_at;
              delete f.user_;
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
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async updateById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'name' in req.body || 'description' in req.body || 'private' in req.body || 'image' in req.body ||
        'anime_id' in req.body || 'dorama_id' in req.body || 'projectType_id' in req.body ||
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
          if (req.body.name) {
            file.name = req.body.name;
          }
          if (req.body.description) {
            file.description = req.body.description;
          }
          if (req.body.image) {
            file.image_url = req.body.image;
          }
          if ('private' in req.body) {
            file.private = (req.body.private === true);
          }
          if (req.body.anime_id) {
            const anime = await this.animeRepo.findOneOrFail({
              where: [
                { id: Equal(req.body.anime_id) }
              ]
            });
            file.anime_ = anime;
            file.dorama_ = null;
          }
          if (req.body.dorama_id) {
            const dorama = await this.doramaRepo.findOneOrFail({
              where: [
                { id: Equal(req.body.dorama_id) }
              ]
            });
            file.anime_ = null;
            file.dorama_ = dorama;
          }
          if (req.body.download_url) {
            const filteredUrls = [];
            for (const u of req.body.download_url) {
              if ('url' in u && 'name' in u && u.url && u.name) {
                filteredUrls.push(u);
              }
            }
            file.download_url = JSON.stringify(filteredUrls);
          }
          if (req.body.fansub_id) {
            const fansub = await this.fansubRepo.find({
              where: [
                { id: In(req.body.fansub_id) }
              ]
            });
            file.fansub_ = fansub;
          }
          if (req.body.projectType_id) {
            const project = await this.projectTypeRepo.findOneOrFail({
              where: [
                { id: Equal(req.body.projectType_id) }
              ]
            });
            file.project_type_ = project;
          }
          const resFileSave = await this.berkasRepo.save(file);
          resFileSave.download_url = JSON.parse(resFileSave.download_url);
          const fansubEmbedData = [];
          if ('fansub_' in resFileSave && resFileSave.fansub_) {
            for (const f of resFileSave.fansub_) {
              f.tags = JSON.parse(f.tags);
              f.urls = JSON.parse(f.urls);
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
            delete resFileSave.user_.role;
            delete resFileSave.user_.password;
            delete resFileSave.user_.session_token;
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
                .setDescription(resFileSave.description.replace(/<[^>]*>/g, ' ').trim())
                .addField(resFileSave.anime_ ? 'Anime' : 'Dorama', resFileSave.anime_ ? resFileSave.anime_.name : resFileSave.dorama_.name, false)
                .addField('Fansub', fansubEmbedData.join(', '), false)
                .addFields(
                  { name: 'Jenis', value: resFileSave.project_type_.name.split('_')[1], inline: true },
                  { name: 'Ddl/Stream', value: (resFileSave.attachment_ ? 'Ya' : 'Tidak'), inline: true },
                  { name: 'Tersembunyi', value: (resFileSave.private ? 'Ya' : 'Tidak'), inline: true }
                )
                .setImage(resFileSave.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resFileSave.image_url)
                .setTimestamp(resFileSave.updated_at)
                .setFooter({
                  text: resFileSave.user_.username,
                  iconURL: resFileSave.user_.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resFileSave.user_.image_url
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
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const berkas =  await this.berkasRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ]
      });
      const deletedBerkas = await this.berkasRepo.remove(berkas);
      if ('user_' in deletedBerkas && deletedBerkas.user_) {
        delete deletedBerkas.user_.role;
        delete deletedBerkas.user_.password;
        delete deletedBerkas.user_.session_token;
        delete deletedBerkas.user_.created_at;
        delete deletedBerkas.user_.updated_at;
      }
      return {
        info: `😅 200 - Berkas API :: Berhasil Menghapus Berkas ${req.params['id']} 🤣`,
        result: deletedBerkas
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

}
