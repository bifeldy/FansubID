import createError from 'http-errors';
import multer from 'multer';
import fs from 'fs';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Like, Equal } from 'typeorm';

import { UserRequest } from '../models/UserRequest';

import { environment } from '../../environments/environment';
import { universalAtob } from '../helpers/base64';

import { ProjectType } from '../entities/ProjectType';
import { User } from '../entities/User';
import { Fansub } from '../entities/Fansub';
import { Berkas } from '../entities/Berkas';
import { Anime } from '../entities/Anime';

// Middleware
import auth from '../middlewares/auth';

// tslint:disable-next-line: typedef
function fileImageFilter(req, file, cb) {
  const typeArray = file.mimetype.split('/');
  const fileType = typeArray[0];
  const fileExt = typeArray[1];
  if (fileType === 'image' && file) {
    if (fileExt === 'gif' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb(null, false);
  }
}

const upload = multer({
  dest: environment.uploadFolder + '/img/profile/',
  fileFilter: fileImageFilter,
  limits: {
    fileSize: 256000
  }
});

const router = Router();

// GET `/api/user/:username`
router.get('/:username', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const userRepo = getRepository(User);
    const selectedUser = await userRepo.findOneOrFail({
      where: [
        { username: Equal(req.params.username)}
      ],
      relations: ['kartu_tanda_penduduk_', 'profile_']
    });
    delete selectedUser.password;
    delete selectedUser.session_token;
    delete selectedUser.kartu_tanda_penduduk_.id;
    delete selectedUser.kartu_tanda_penduduk_.agama;
    delete selectedUser.kartu_tanda_penduduk_.alamat;
    delete selectedUser.kartu_tanda_penduduk_.golongan_darah;
    delete selectedUser.kartu_tanda_penduduk_.kecamatan;
    delete selectedUser.kartu_tanda_penduduk_.kelurahan_desa;
    delete selectedUser.kartu_tanda_penduduk_.kewarganegaraan;
    delete selectedUser.kartu_tanda_penduduk_.nik;
    delete selectedUser.kartu_tanda_penduduk_.pekerjaan;
    delete selectedUser.kartu_tanda_penduduk_.rt;
    delete selectedUser.kartu_tanda_penduduk_.rw;
    delete selectedUser.kartu_tanda_penduduk_.status_perkawinan;
    delete selectedUser.kartu_tanda_penduduk_.created_at;
    // delete selectedUser.kartu_tanda_penduduk_.updated_at;
    delete selectedUser.profile_.id;
    delete selectedUser.profile_.created_at;
    // delete selectedUser.profile_.updated_at;
    res.status(200).json({
      info: `😅 200 - Profile API :: Detail ${req.params.username} 🤣`,
      result: selectedUser
    });
  } catch (error) {
    return next(createError(404));
  }
});

// PUT `/api/user/:username`
// router.put('/:username', auth.isAuthorized, upload.fields([
//   { name: 'image', maxCount: 1 }, { name: 'cover', maxCount: 1 }
// ]), async (req: UserRequest, res: Response, next: NextFunction) => {
//   try {
//     const userRepo = getRepository(User);
//     const selectedUser = await userRepo.findOneOrFail({
//       where: [
//         { username: Equal(req.params.username)}
//       ],
//       relations: ['profile_']
//     });
//     console.log(req.files);
//     return next(createError(404));
//     // TODO ::
//     if (req.user.id === selectedUser.id) {
//       if (req.files) {
//         selectedUser.image_url = req.files[0];
//       }
//     } else {
//       res.status(401).json({
//         info: '🙄 401 - Authorisasi Kepemilikan Gagal! 😪',
//         result: {
//           message: 'Profil Milik Orang Lain!'
//         }
//       });
//     }
//   } catch (error) {
//     return next(createError(404));
//   }
// });

// GET `/api/user/:username/berkas`
router.get('/:username/berkas', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const userRepo = getRepository(User);
    const selectedUser = await userRepo.findOneOrFail({
      where: [
        { username: Equal(req.params.username)}
      ]
    });
    const fileRepo = getRepository(Berkas);
    const [files, count] = await fileRepo.findAndCount({
      where: [
        {
          name: Like(`%${req.query.q ? req.query.q : ''}%`),
          user_: {
            id: Equal(selectedUser.id)
          }
        }
      ],
      order: {
        created_at: 'DESC',
        name: 'ASC'
      },
      relations: ['project_type_', 'fansub_', 'user_', 'anime_'],
      skip: req.query.page > 0 ? (req.query.page * req.query.row - req.query.row) : 0,
      take: req.query.row > 0 ? req.query.row : 10
    });
    for (const f of files) {
      const date = new Date(f.created_at);
      f.created_at = (
        ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + '@' + ' ' +
        ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) as any
      );
      delete f.private;
      delete f.download_url;
      delete f.description;
      // delete f.updated_at;
      delete f.project_type_.created_at;
      // delete f.project_type_.updated_at;
      delete f.fansub_.description;
      delete f.fansub_.urls;
      delete f.fansub_.tags;
      delete f.fansub_.created_at;
      // delete f.fansub_.updated_at;
      delete f.anime_.created_at;
      // delete f.anime_.updated_at;
      delete f.user_.role;
      delete f.user_.password;
      delete f.user_.session_token;
      delete f.user_.created_at;
      // delete f.user_.updated_at;
    }
    res.status(200).json({
      info: `😅 200 - Profile API :: Berkas ${req.params.username} 🤣`,
      count,
      results: files
    });
  } catch (error) {
    return next(createError(404));
  }
});

export default router;
