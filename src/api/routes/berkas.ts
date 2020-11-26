import createError from 'http-errors';
import find from 'find';
import fs from 'fs';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Like, Equal, In } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { environment } from '../../environments/environment';

import { ProjectType } from '../entities/ProjectType';
import { User } from '../entities/User';
import { Fansub } from '../entities/Fansub';
import { Berkas } from '../entities/Berkas';
import { Anime } from '../entities/Anime';
import { Attachment } from '../entities/Attachment';
import { TempAttachment } from '../entities/TempAttachment';

import { Role } from '../../app/_shared/models/Role';

// Middleware
import auth from '../middlewares/auth';

// Helper
import mkvExtract from '../helpers/mkvExtract';

const router = Router();

// GET `/api/berkas`
router.get('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const fileRepo = getRepository(Berkas);
    const [files, count] = await fileRepo.findAndCount({
      where: [
        { private: false, name: Like(`%${req.query.q ? req.query.q : ''}%`) }
      ],
      order: {
        ...((req.query.sort && req.query.order) ? {
          [req.query.sort]: req.query.order.toUpperCase()
        } : {
          created_at: 'DESC',
          name: 'ASC',
        })
      },
      relations: ['project_type_', 'fansub_', 'user_', 'anime_'],
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: req.query.row > 0 ? req.query.row : 10
    });
    for (const f of files) {
      delete f.private;
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
      if (req.body.private) {
        file.private = req.body.private;
      }
      if (req.body.image) {
        file.image_url = req.body.image;
      } else {
        file.image_url = '/favicon.ico';
      }
      const animeRepo = getRepository(Anime);
      const anime = await animeRepo.findOneOrFail({
        where: [
          { id: Equal(req.body.anime_id) }
        ]
      });
      file.anime_ = anime;
      const fansubRepo = getRepository(Fansub);
      const fansub = await fansubRepo.find({
        where: [
          { id: In([req.body.fansub_id]) }
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
          if (fIdx >= 0) {
            if (attachment.ext === 'mkv') {
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
                          mkvAttachment.rootAttachment_ = resAttachmentSave;
                          await attachmentRepo.save(mkvAttachment);
                        } catch (e) {
                          console.error(e);
                        }
                      }
                    });
                  }
                  //
                  // TODO :: Upload File-MKV To Google Drive
                  // https://github.com/googleapis/google-api-nodejs-client/issues/1633
                  //
                }
              });
            } else {
              //
              // TODO :: Upload File-MP4 To Google Drive
              // https://github.com/googleapis/google-api-nodejs-client/issues/1633
              //
            }
          } else {
            return next(createError(404));
          }
        });
      }
      const resFileSave = await fileRepo.save(file);
      resFileSave.download_url = JSON.parse(resFileSave.download_url);
      if ('fansub_' in resFileSave && resFileSave.fansub_) {
        for (const f of resFileSave.fansub_) {
          f.tags = JSON.parse(f.tags);
          f.urls = JSON.parse(f.urls);
          delete f.created_at;
          delete f.updated_at;
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
      relations: ['project_type_', 'fansub_', 'user_', 'anime_', 'attachment_'],
    });
    file.view_count++;
    const resFileSave = await fileRepo.save(file);
    if ('project_type_' in resFileSave && resFileSave.project_type_) {
      delete resFileSave.project_type_.created_at;
      delete resFileSave.project_type_.updated_at;
    }
    if ('fansub_' in resFileSave && resFileSave.fansub_) {
      for (const f of resFileSave.fansub_) {
        delete f.description;
        delete f.urls;
        delete f.tags;
        delete f.created_at;
        delete f.updated_at;
      }
    }
    if ('anime_' in resFileSave && resFileSave.anime_) {
      delete resFileSave.anime_.created_at;
      delete resFileSave.anime_.updated_at;
    }
    if ('user_' in resFileSave && resFileSave.user_) {
      delete resFileSave.user_.role;
      delete resFileSave.user_.password;
      delete resFileSave.user_.session_token;
      delete resFileSave.user_.created_at;
      delete resFileSave.user_.updated_at;
    }
    if (req.user) {
      resFileSave.download_url = JSON.parse(resFileSave.download_url);
      if (!req.user.verified) {
        delete resFileSave.attachment_;
      } else {
        if ('attachment_' in resFileSave && resFileSave.attachment_) {
          const attachmentRepo = getRepository(Attachment);
          const subtitles = await attachmentRepo.find({
            where: [
              { ext: Equal('ass'), rootAttachment_: Equal(resFileSave.attachment_.id) },
              { ext: Equal('srt'), rootAttachment_: Equal(resFileSave.attachment_.id) }
            ],
            relations: ['rootAttachment_']
          });
          for (const s of subtitles) {
            delete s.created_at;
            delete s.download_count;
            delete s.rootAttachment_;
            delete s.updated_at;
            delete s.user_;
          }
          (resFileSave as any).attachment_.subtitles_ = subtitles;
          const fonts = await attachmentRepo.find({
            where: [
              { ext: Equal('ttf'), rootAttachment_: Equal(resFileSave.attachment_.id) }
            ],
            relations: ['rootAttachment_']
          });
          for (const f of fonts) {
            delete f.created_at;
            delete f.download_count;
            delete f.rootAttachment_;
            delete f.updated_at;
            delete f.user_;
          }
          (resFileSave as any).attachment_.fonts_ = fonts;
        }
      }
    } else {
      delete resFileSave.download_url;
      delete resFileSave.attachment_;
    }
    return res.status(200).json({
      info: `😅 200 - Berkas API :: Detail ${req.params.id} 🤣`,
      result: resFileSave
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
      'anime_id' in req.body || 'projectType_id' in req.body ||
      ('download_url' in req.body && Array.isArray(req.body.download_url) && req.body.download_url.length > 0) ||
      ('fansub_id' in req.body && Array.isArray(req.body.fansub_id) && req.body.fansub_id.length > 0)
    ) {
      try {
        const fileRepo = getRepository(Berkas);
        const file = await fileRepo.findOneOrFail({
          where: [
            { id: Equal(req.params.id) }
          ],
          relations: ['user_', 'attachment_', 'anime_', 'project_type_', 'fansub_']
        });
        if (req.user.id === file.user_.id || req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
          if (req.body.name) {
            file.name = req.body.name;
          }
          if (req.body.description) {
            file.description = req.body.description;
          }
          if (req.body.image) {
            file.image_url = req.body.image;
          }
          if (req.body.private) {
            file.private = req.body.private;
          }
          if (req.body.anime_id) {
            const animeRepo = getRepository(Anime);
            const anime = await animeRepo.findOneOrFail({
              where: [
                { id: Equal(req.body.anime_id) }
              ]
            });
            file.anime_ = anime;
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
          if ('fansub_' in resFileSave && resFileSave.fansub_) {
            for (const f of resFileSave.fansub_) {
              f.tags = JSON.parse(f.tags);
              f.urls = JSON.parse(f.urls);
              delete f.created_at;
              delete f.updated_at;
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

export default router;
