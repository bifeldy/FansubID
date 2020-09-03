import createError from 'http-errors';
import multer from 'multer';
import fs from 'fs';
import find from 'find';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Equal } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { environment } from '../../environments/environment';

import { User } from '../entities/User';
import { Attachment } from '../entities/Attachment';
import { TempAttachment } from '../entities/TempAttachment';

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
    fileSize: 992 * 1000 * 1000
  }
});

const router = Router();

// GET `/api/attachment?id=`
router.get('/', auth.isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  const lampiranId = req.query.id || '';
  if (lampiranId) {
    if (req.user.verified) {
      const attachmentRepo = getRepository(Attachment);
      const attachment =  await attachmentRepo.findOneOrFail({
        where: [
          { id: Equal(lampiranId) }
        ]
      });
      return find.file(/$/, `${environment.uploadFolder}`, async (files) => {
        const fIdx = files.findIndex(f => f.toString().toLowerCase().includes(attachment.name.toString().toLowerCase()));
        if (fIdx >= 0) {
          res.download(files[fIdx], `${attachment.name}.${attachment.ext}`, async (err) => {
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
    } else {
      res.status(400).json({
        info: '🙄 400 - Download DDL Gagal! 😪',
        result: {
          message: 'Khusus Pengguna Terverifikasi!'
        }
      });
    }
  } else {
    res.status(400).json({
      info: '🙄 400 - Download DDL Gagal! 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// POST `/api/attachment`
router.post('/', auth.isAuthorized, upload.single('lampiran'), async (req: UserRequest, res: Response, next: NextFunction) => {
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
          fs.unlink(`${environment.uploadFolder}/${attachmentToBeDeleted.name}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
          await tempAttachmentRepo.remove(attachmentToBeDeleted);
        } catch (error) {
          console.error(error);
        }
      }, 3 * 60 * 1000);
      res.status(200).json({
        info: `😅 200 - Attachment API :: Harap Lengkapi Data Berkas Dalam 3 Menit 🤣`,
        result: resAttachmentSave
      });
    } else {
      fs.unlink(`${environment.uploadFolder}/${req.file.filename}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
      res.status(400).json({
        info: '🙄 400 - Gagal Mengunggah Lampiran! 😪',
        result: {
          message: 'Khusus Pengguna Terverifikasi!'
        }
      });
    }
  } else {
    res.status(400).json({
      info: '🙄 400 - Gagal Mengunggah Lampiran! 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

export default router;
