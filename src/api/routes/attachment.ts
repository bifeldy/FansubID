import createError from 'http-errors';
import multer from 'multer';
import fs from 'fs';
import find from 'find';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Equal, Like } from 'typeorm';
import { drive_v3 } from 'googleapis';

import { UserRequest } from '../models/UserRequest';
import { Role } from '../../app/_shared/models/Role';

import { environment } from '../../environments/server/environment';

import { User } from '../entities/User';
import { Attachment } from '../entities/Attachment';
import { TempAttachment } from '../entities/TempAttachment';

import { gDrive } from '../helpers/gDrive';

// Middleware
import auth from '../middlewares/auth';

// tslint:disable-next-line: typedef
function fileLampiranFilter(req, file, cb) {
  const typeArray = file.mimetype.split('/');
  const fileType = typeArray[0];
  const fileExt = typeArray[1];
  if (fileType === 'video' && file) {
    if (fileExt === 'mp4' || fileExt === 'x-matroska') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb(null, false);
  }
}

const upload = multer({
  dest: environment.uploadFolder,
  fileFilter: fileLampiranFilter,
  limits: {
    fileSize: 256 * 1000 * 1000
  }
});

const router = Router();

// tslint:disable-next-line: typedef
function deleteAttachment(fileName) {
  fs.unlink(`${environment.uploadFolder}/${fileName}`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

// GET `/api/attachment?id=`
router.get('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const lampiranId = req.query.id || '';
    const attachmentRepo = getRepository(Attachment);
    if (lampiranId) {
      if (req.user.verified) {
        const attachment =  await attachmentRepo.findOneOrFail({
          where: [
            { id: Equal(lampiranId) }
          ]
        });
        if (attachment.google_drive) {
          return gDrive(async (d: drive_v3.Drive) => {
            d.files.get(
              { fileId: attachment.google_drive, alt: 'media' },
              { responseType: 'stream', headers: { range: req.headers.range } },
              (e, r: any) => {
                if (e) {
                  console.error(e);
                } else {
                  res.writeHead(r.status, r.headers);
                  r.data.on('error', err => {
                    console.error(err);
                  }).on('end', async () => {
                    attachment.download_count++;
                    await attachmentRepo.save(attachment);
                  }).pipe(res);
                }
              }
            );
          });
        } else {
          return find.file(/$/, `${environment.uploadFolder}`, async (files) => {
            const fIdx = files.findIndex(f => f.toString().toLowerCase().includes(attachment.name.toString().toLowerCase()));
            if (fIdx >= 0) {
              return res.download(files[fIdx], `${attachment.name}.${attachment.ext}`, async (err) => {
                if (err) {
                  console.error(err);
                } else {
                  attachment.download_count++;
                  await attachmentRepo.save(attachment);
                }
              });
            } else {
              return next(createError(404));
            }
          });
        }
      } else {
        return res.status(400).json({
          info: '🙄 400 - Attachment API :: Download DDL Gagal 😪',
          result: {
            message: 'Khusus Pengguna Terverifikasi!'
          }
        });
      }
    } else {
      if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
        const [attachments, count] = await attachmentRepo.findAndCount({
          where: [
            { name: Like(`%${req.query.q ? req.query.q : ''}%`) }
          ],
          order: {
            ...((req.query.sort && req.query.order) ? {
              [req.query.sort]: req.query.order.toUpperCase()
            } : {
              created_at: 'DESC',
              name: 'ASC'
            })
          },
          relations: ['user_', 'rootAttachment_'],
          skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
          take: (req.query.row > 0 && req.query.row <= 100) ? req.query.row : 10
        });
        for (const a of attachments) {
          if ('user_' in a && a.user_) {
            delete a.user_.role;
            delete a.user_.password;
            delete a.user_.session_token;
            delete a.user_.created_at;
            delete a.user_.updated_at;
          }
          if ('rootAttachment_' in a && a.rootAttachment_) {
            delete a.rootAttachment_.created_at;
            delete a.rootAttachment_.updated_at;
          }
        }
        return res.status(200).json({
          info: `😅 200 - Attachment API :: List All 🤣`,
          count,
          pages: Math.ceil(count / (req.query.row ? req.query.row : 10)),
          results: attachments
        });
      } else {
        return res.status(401).json({
          info: '🙄 401 - Attachment API :: Authorisasi Pengguna Gagal 😪',
          result: {
            message: 'Khusus Admin / Moderator!'
          }
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: '🙄 400 - Attachment API :: Download DDL Gagal 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/attachment`
router.post('/', auth.isAuthorized, upload.single('file'), async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.file) {
      if (req.user.verified) {
        const tempAttachmentRepo = getRepository(TempAttachment);
        const tempAttachment = new TempAttachment();
        tempAttachment.name = req.file.filename;
        const fileOriginalNameSplit = req.file.originalname.split('.');
        tempAttachment.ext = fileOriginalNameSplit[fileOriginalNameSplit.length - 1];
        tempAttachment.size = req.file.size;
        const userRepo = getRepository(User);
        const user = await userRepo.findOneOrFail({
          where: [
            { id: Equal(req.user.id) }
          ]
        });
        tempAttachment.user_ = user;
        const resAttachmentSave = await tempAttachmentRepo.save(tempAttachment);
        if ('user_' in resAttachmentSave && resAttachmentSave.user_) {
          delete resAttachmentSave.user_.role;
          delete resAttachmentSave.user_.password;
          delete resAttachmentSave.user_.session_token;
          delete resAttachmentSave.user_.created_at;
          delete resAttachmentSave.user_.updated_at;
        }
        setTimeout(async () => {
          try {
            const attachmentToBeDeleted = await tempAttachmentRepo.findOneOrFail({
              where: [
                { id: Equal(resAttachmentSave.id), name: Equal(resAttachmentSave.name) }
              ]
            });
            deleteAttachment(attachmentToBeDeleted.name);
            await tempAttachmentRepo.remove(attachmentToBeDeleted);
          } catch (err) {
            console.error(err);
          }
        }, 3 * 60 * 1000);
        return res.status(200).json({
          info: `😅 200 - Attachment API :: Harap Lengkapi Data Berkas Dalam 3 Menit 🤣`,
          result: resAttachmentSave
        });
      } else {
        deleteAttachment(req.file.filename);
        return res.status(400).json({
          info: '🙄 400 - Attachment API :: Gagal Mengunggah Lampiran 😪',
          result: {
            message: 'Khusus Pengguna Terverifikasi!'
          }
        });
      }
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    deleteAttachment(req.file.filename);
    return res.status(400).json({
      info: '🙄 400 - Attachment API :: Gagal Mengunggah Lampiran 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// DELETE `/api/attachment/:id`
router.delete('/:id', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
      const attachmentRepo = getRepository(Attachment);
      const attachment =  await attachmentRepo.findOneOrFail({
        where: [
          { id: Equal(req.params.id) }
        ]
      });
      deleteAttachment(attachment.name);
      const deletedAttachment = await attachmentRepo.remove(attachment);
      if ('user_' in deletedAttachment && deletedAttachment.user_) {
        delete deletedAttachment.user_.role;
        delete deletedAttachment.user_.password;
        delete deletedAttachment.user_.session_token;
        delete deletedAttachment.user_.created_at;
        delete deletedAttachment.user_.updated_at;
      }
      return res.status(200).json({
        info: `😅 200 - Attachment API :: Berhasil Menghapus DDL ${req.params.id} 🤣`,
        results: deletedAttachment
      });
    } else {
      return res.status(401).json({
        info: '🙄 401 - Attachment API :: Authorisasi Pengguna Gagal 😪',
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
