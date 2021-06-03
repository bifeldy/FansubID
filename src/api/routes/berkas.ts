import createError from 'http-errors';
import find from 'find';
import fs from 'fs';

import { Router, Response, NextFunction } from 'express';
import { getRepository, ILike, Equal, In } from 'typeorm';
import { drive_v3 } from 'googleapis';

import { UserRequest } from '../models/UserRequest';

import { environment } from '../../environments/server/environment';

import { ProjectType } from '../entities/ProjectType';
import { User } from '../entities/User';
import { Fansub } from '../entities/Fansub';
import { Berkas } from '../entities/Berkas';
import { Anime } from '../entities/Anime';
import { Dorama } from '../entities/Dorama';
import { Attachment } from '../entities/Attachment';
import { TempAttachment } from '../entities/TempAttachment';

import { Role } from '../../app/_shared/models/Role';

import { gDrive } from '../helpers/gDrive';

// Middleware
import auth from '../middlewares/auth';

// Helper
import mkvExtract from '../helpers/mkvExtract';

import { MessageEmbed } from 'discord.js';

const router = Router();

// GET `/api/berkas`
router.get('/', auth.isLogin, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fileRepo = getRepository(Berkas);
    const [files, count] = await fileRepo.findAndCount({
      where: [
        {
          ...((req.user?.verified) ? {
            // Verified User Can See Private Berkas
          } : {
            private: false
          }),
          name: ILike(`%${req.query.q ? req.query.q : ''}%`)
        }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          created_at: 'DESC',
          name: 'ASC'
        })
      },
      relations: ['project_type_', 'fansub_', 'user_', 'dorama_', 'anime_'],
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: (req.query.row > 0 && req.query.row <= 500) ? req.query.row : 10
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
    return res.status(200).json({
      info: `😅 200 - Berkas API :: List All 🤣`,
      count,
      pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
      results: files
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Berkas API :: Gagal Mendapatkan All Berkas 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/berkas`
router.post('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (
      'name' in req.body && 'description' in req.body && 'projectType_id' in req.body &&
      ('anime_id' in req.body || 'dorama_id' in req.body) &&
      'download_url' in req.body && Array.isArray(req.body.download_url) && req.body.download_url.length > 0 &&
      'fansub_id' in req.body && Array.isArray(req.body.fansub_id) && req.body.fansub_id.length > 0
    ) {
      const fileRepo = getRepository(Berkas);
      const file = new Berkas();
      const filteredUrls = [];
      for (const u of req.body.download_url) {
        if ('url' in u && 'name' in u && u.url && u.name) {
          filteredUrls.push(u);
        }
      }
      file.name = req.body.name;
      file.download_url = JSON.stringify(filteredUrls);
      file.description = req.body.description;
      if ('private' in req.body) {
        file.private = (JSON.parse(req.body.private) === true);
      }
      if (req.body.image) {
        file.image_url = req.body.image;
      } else {
        file.image_url = '/favicon.ico';
      }
      if (req.body.anime_id) {
        const animeRepo = getRepository(Anime);
        const anime = await animeRepo.findOneOrFail({
          where: [
            { id: Equal(req.body.anime_id) }
          ]
        });
        file.anime_ = anime;
        file.dorama_ = null;
      }
      if (req.body.dorama_id) {
        const doramaRepo = getRepository(Dorama);
        const dorama = await doramaRepo.findOneOrFail({
          where: [
            { id: Equal(req.body.dorama_id) }
          ]
        });
        file.anime_ = null;
        file.dorama_ = dorama;
      }
      const fansubRepo = getRepository(Fansub);
      const fansub = await fansubRepo.find({
        where: [
          { id: In(req.body.fansub_id) }
        ]
      });
      file.fansub_ = fansub;
      const projectRepo = getRepository(ProjectType);
      const project = await projectRepo.findOneOrFail({
        where: [
          { id: Equal(req.body.projectType_id) }
        ]
      });
      file.project_type_ = project;
      const userRepo = getRepository(User);
      const user = await userRepo.findOneOrFail({
        where: [
          { id: Equal(req.user.id) }
        ]
      });
      file.user_ = user;
      if (req.body.attachment_id) {
        const tempAttachmentRepo = getRepository(TempAttachment);
        const tempAttachment = await tempAttachmentRepo.findOneOrFail({
          relations: ['user_'],
          where: [
            { id: Equal(req.body.attachment_id) }
          ]
        });
        const attachmentRepo = getRepository(Attachment);
        const attachment = new Attachment();
        attachment.name = tempAttachment.name;
        attachment.size = tempAttachment.size;
        attachment.ext = tempAttachment.ext;
        attachment.user_ = tempAttachment.user_;
        const resAttachmentSave = await attachmentRepo.save(attachment);
        file.attachment_ = resAttachmentSave;
        await tempAttachmentRepo.remove(tempAttachment);
        find.file(/$/, `${environment.uploadFolder}`, async (files) => {
          const fIdx = files.findIndex(f => f.toString().toLowerCase().includes(attachment.name.toString().toLowerCase()));
          let mimeType = 'video/';
          if (fIdx >= 0) {
            if (attachment.ext.toString().toLowerCase() === 'mkv') {
              mkvExtract(attachment.name.toString().toLowerCase(), files[fIdx], async (error, extractedFiles) => {
                if (error) {
                  console.error(error);
                } else {
                  for (const f of extractedFiles) {
                    fs.writeFile(`${environment.uploadFolder}/${f.name}`, f.data, async (err) => {
                      if (err) {
                        console.error(err);
                      } else {
                        try {
                          const mkvAttachment = new Attachment();
                          mkvAttachment.name = f.name;
                          mkvAttachment.size = f.size;
                          const strSplit = f.name.split('.');
                          mkvAttachment.ext = strSplit[strSplit.length - 1];
                          mkvAttachment.user_ = attachment.user_;
                          mkvAttachment.parent_attachment_ = resAttachmentSave;
                          await attachmentRepo.save(mkvAttachment);
                        } catch (e) {
                          console.error(e);
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
            gDrive(async (d: drive_v3.Drive) => {
              const dFile = await d.files.create({
                requestBody: {
                  name: `${attachment.name.toString().toLowerCase()}.${attachment.ext.toString().toLowerCase()}`,
                  parents: [
                    environment.gdriveFolderId // Hikki ひきこもり - Folder
                  ],
                  mimeType
                },
                media: {
                  mimeType,
                  body: fs.createReadStream(files[fIdx])
                },
                fields: 'id'
              });
              resAttachmentSave.google_drive = dFile.data.id;
              await attachmentRepo.save(resAttachmentSave);
              fs.unlink(files[fIdx], (er) => {
                if (er) {
                  console.error(er);
                }
              });
            });
          } else {
            return next(createError(404));
          }
        });
      }
      const resFileSave = await fileRepo.save(file);
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
      req.bot.send(
        new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(resFileSave.name)
        .setURL(`${environment.baseUrl}/berkas/${resFileSave.id}`)
        .setAuthor('Hikki - Penambahan Berkas Baru', `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
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
        .setFooter(
          resFileSave.user_.username,
          resFileSave.user_.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resFileSave.user_.image_url
        )
      ).catch(console.log);
      if (!resFileSave.private) {
        req.io.volatile.emit('new-berkas', resFileSave);
      }
      return res.status(200).json({
        info: `😅 200 - Berkas API :: Tambah Baru 🤣`,
        result: resFileSave
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: '🙄 400 - Berkas API :: Gagal Menambah Berkas Baru 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// GET `/api/berkas/:id`
router.get('/:id', auth.isLogin, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fileRepo = getRepository(Berkas);
    const file = await fileRepo.findOneOrFail({
      where: [
        { id: Equal(req.params.id) }
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
    if (req.user) {
      file.download_url = JSON.parse(file.download_url);
      if (!req.user.verified) {
        if (file.attachment_) {
          (file as any).attachment_ = 'Harap Verifikasi Akun!';
        }
      } else {
        if ('attachment_' in file && file.attachment_) {
          const attachmentRepo = getRepository(Attachment);
          const subtitles = await attachmentRepo.find({
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
          const fonts = await attachmentRepo.find({
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
    return res.status(200).json({
      info: `😅 200 - Berkas API :: Detail ${req.params.id} 🤣`,
      result: file
    });
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

// PUT `/api/berkas/:id`
router.put('/:id', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (
      'name' in req.body || 'description' in req.body || 'private' in req.body || 'image' in req.body ||
      'anime_id' in req.body || 'dorama_id' in req.body || 'projectType_id' in req.body ||
      ('download_url' in req.body && Array.isArray(req.body.download_url) && req.body.download_url.length > 0) ||
      ('fansub_id' in req.body && Array.isArray(req.body.fansub_id) && req.body.fansub_id.length > 0)
    ) {
      try {
        const fileRepo = getRepository(Berkas);
        const file = await fileRepo.findOneOrFail({
          where: [
            { id: Equal(req.params.id) }
          ],
          relations: ['user_', 'attachment_', 'anime_', 'dorama_', 'project_type_', 'fansub_']
        });
        if (req.user.id === file.user_.id) {
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
            file.private = (JSON.parse(req.body.private) === true);
          }
          if (req.body.anime_id) {
            const animeRepo = getRepository(Anime);
            const anime = await animeRepo.findOneOrFail({
              where: [
                { id: Equal(req.body.anime_id) }
              ]
            });
            file.anime_ = anime;
            file.dorama_ = null;
          }
          if (req.body.dorama_id) {
            const doramaRepo = getRepository(Dorama);
            const dorama = await doramaRepo.findOneOrFail({
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
            const fansubRepo = getRepository(Fansub);
            const fansub = await fansubRepo.find({
              where: [
                { id: In(req.body.fansub_id) }
              ]
            });
            file.fansub_ = fansub;
          }
          if (req.body.projectType_id) {
            const projectRepo = getRepository(ProjectType);
            const project = await projectRepo.findOneOrFail({
              where: [
                { id: Equal(req.body.projectType_id) }
              ]
            });
            file.project_type_ = project;
          }
          const resFileSave = await fileRepo.save(file);
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
          req.bot.send(
            new MessageEmbed()
            .setColor('#ff4081')
            .setTitle(resFileSave.name)
            .setURL(`${environment.baseUrl}/berkas/${resFileSave.id}`)
            .setAuthor('Hikki - Pembaharuan Data Berkas', `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
            .setDescription(resFileSave.description.replace(/<[^>]*>/g, ' ').trim())
            // tslint:disable-next-line: max-line-length
            .addField(resFileSave.anime_ ? 'Anime' : 'Dorama', resFileSave.anime_ ? resFileSave.anime_.name : resFileSave.dorama_.name, false)
            .addField('Fansub', fansubEmbedData.join(', '), false)
            .addFields(
              { name: 'Jenis', value: resFileSave.project_type_.name.split('_')[1], inline: true },
              { name: 'Ddl/Stream', value: (resFileSave.attachment_ ? 'Ya' : 'Tidak'), inline: true },
              { name: 'Tersembunyi', value: (resFileSave.private ? 'Ya' : 'Tidak'), inline: true }
            )
            .setImage(resFileSave.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resFileSave.image_url)
            .setTimestamp(resFileSave.updated_at)
            .setFooter(
              resFileSave.user_.username,
              resFileSave.user_.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resFileSave.user_.image_url
            )
          ).catch(console.log);
          return res.status(200).json({
            info: `😅 200 - Berkas API :: Ubah ${req.params.id} 🤣`,
            result: resFileSave
          });
        } else {
          return res.status(401).json({
            info: '🙄 401 - Berkas API :: Authorisasi Kepemilikan Gagal 😪',
            result: {
              message: 'Berkas Milik Orang Lain!'
            }
          });
        }
      } catch (err) {
        console.error(err);
        return next(createError(404));
      }
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: `🙄 400 - Berkas API :: Gagal Mengubah Berkas ${req.params.id} 😪`,
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// DELETE `/api/berkas/:id`
router.delete('/:id', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const berkasRepo = getRepository(Berkas);
      const berkas =  await berkasRepo.findOneOrFail({
        where: [
          { id: Equal(req.params.id) }
        ]
      });
      const deletedBerkas = await berkasRepo.remove(berkas);
      if ('user_' in deletedBerkas && deletedBerkas.user_) {
        delete deletedBerkas.user_.role;
        delete deletedBerkas.user_.password;
        delete deletedBerkas.user_.session_token;
        delete deletedBerkas.user_.created_at;
        delete deletedBerkas.user_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Berkas API :: Berhasil Menghapus Berkas ${req.params.id} 🤣`,
        result: deletedBerkas
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Berkas API :: Authorisasi Pengguna Gagal 😪',
        result: {
          message: 'Khusus Admin / Moderator!'
        }
      });
    }
  } catch (error) {
    console.error(error);
    return next(createError(404));
  }
});

export default router;
