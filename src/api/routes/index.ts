import { Router, Response } from 'express';

import { getRepository, Equal, In } from 'typeorm';

import createError from 'http-errors';
import request from 'request';
import multer from 'multer';

import { UserRequest } from '../models/UserRequest';

import { environment } from '../../environments/environment';

import { User } from '../entities/User';
import { KartuTandaPenduduk } from '../entities/KartuTandaPenduduk';

// Middleware
import auth from '../middlewares/auth';

// Helper
import jwt from '../helpers/jwt';

// Child router
import seasonalRouter from './anime';
import projectRouter from './project';
import fansubRouter from './fansub';
import berkasRouter from './berkas';
import userRouter from './user';
import attachmentRouter from './attachment';
import newsRouter from './news';

// tslint:disable-next-line: typedef
function fileGambarFilter(req, file, cb) {
  const typeArray = file.mimetype.split('/');
  const fileType = typeArray[0];
  const fileExt = typeArray[1];
  if (fileType === 'image' && file) {
    if (fileExt === 'jpeg' || fileExt === 'jpg' || fileExt === 'gif' || fileExt === 'png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else {
    cb(null, false);
  }
}

const upload = multer({
  fileFilter: fileGambarFilter,
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 256 * 1000
  },
});

const router = Router();

const imgBB = 'https://api.imgbb.com/1/upload';

// Child route url
router.use('/anime', seasonalRouter);
router.use('/project', projectRouter);
router.use('/fansub', fansubRouter);
router.use('/berkas', berkasRouter);
router.use('/user', userRouter);
router.use('/attachment', attachmentRouter);
router.use('/news', newsRouter);

// GET `/api`
router.get('/', (req, res) => {
  res.redirect('/');
});

// POST `/api/register`
router.post('/register', auth.registerModule, (req: any, res: Response, next) => {
  res.status(200).json({
    info: '😚 200 - Berhasil Registrasi. Yeay! 🤩',
    result: {
      token: req.user.session_token
    }
  });
});

// POST `/api/login`
router.post('/login', auth.loginModule, (req: any, res: Response, next) => {
  res.status(200).json({
    info: '😚 200 - Berhasil Login. Yeay! 🤩',
    result: {
      token: req.user.session_token
    }
  });
});

// DEL `/api/logout`
router.delete('/logout', auth.isAuthorized, auth.logoutModule, (req: any, res: Response, next) => {
  res.status(200).json({
    info: '😍 200 - Berhasil Keluar~ 🥰',
    result: req.user
  });
});

// POST `/api/verify`
router.post('/verify', auth.isAuthorized, (req: any, res: Response, next) => {
  res.status(200).json({
    info: '😍 200 - Token Selesai Di Verifikasi! UwUu~ 🥰',
    result: req.user
  });
});

// POST `/api/image`
router.post('/image', auth.isAuthorized, upload.single('file'), async (req: UserRequest, res: Response, next) => {
  return request({
    method: 'POST',
    uri: imgBB,
    formData: {
      key: environment.imgbbKey,
      name: new Date().getTime(),
      image: req.file.buffer.toString('base64')
    }
  }, async (error, result, body) => {
    const data = JSON.parse(body).data;
    res.status(result.statusCode).json({
      info: `😅 ${result.statusCode} - ImgBB :: Upload Image 🤣`,
      result: {
        id: data.id,
        title: data.title,
        url: data.image.url,
        mime: data.image.mime,
        extension: data.image.extension,
        size: data.size,
        time: data.time,
        expiration: data.expiration,
      },
      imageUrl: data.image.url
    });
  });
});

// POST `/api/kpu/cek-nik`
router.post('/cek-nik', auth.isAuthorized, async (req: UserRequest, res, next) => {
  try {
    if ('nik' in req.body && 'nama' in req.body && 'g-recaptcha-response' in req.body) {
      return request(`
        ${environment.recaptchaApiUrl}?secret=${environment.reCaptchaSecretKey}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}
      `.trim(), (e1, r1, b1) => {
        b1 = JSON.parse(b1);
        if (b1 && b1.success) {
          return request({
            method: 'POST',
            uri: environment.apiKpuAndroid,
            body: JSON.stringify({
              nik: req.body.nik,
              nama: req.body.nama,
              ck_kpu: environment.kpuAndroidSecretKey
            })
          }, (e2, r2, b2) => {
            if (b2) {
              const resKPU = JSON.parse(b2);
              if ('data' in resKPU && resKPU.data) {
                delete resKPU.data.tps;
              }
              return res.status(r2.statusCode).json({
                info: `😍 ${r2.statusCode} - Data Kartu Tanda Penduduk~ 🥰`,
                result: resKPU
              });
            } else {
              res.status(500).json({
                info: '🙄 500 - API Pemerintah Error! 😪',
                result: {
                  message: 'Kayaknya Sudah Di Fix Deh Kebocoran Datanya'
                }
              });
            }
          });
        } else {
          return res.status(r1.statusCode).json({
            info: `🙄 ${r1.statusCode} - Wrong Captcha! 😪`,
            result: {
              message: 'Captcha Salah / Expired'
            }
          });
        }
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      info: '🙄 400 - Cek NIK Gagal! 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// PUT `/api/kpu/verify`
router.put('/verify', auth.isAuthorized, async (req: UserRequest, res, next) => {
  try {
    if (req.user.verified) {
      res.status(200).json({
        info: `😅 200 - User Telah Diverifikasi 🤣`,
        result: {
          message: 'User Telah Diverifikasi'
        }
      });
    } else if (
      'nik' in req.body && 'nama' in req.body && 'tempat_lahir' in req.body &&
      'jenis_kelamin' in req.body && 'kecamatan' in req.body && 'kelurahan_desa' in req.body
    ) {
      const ktpRepo = getRepository(KartuTandaPenduduk);
      const ktps = await ktpRepo.find({
        where: [
          { nik: In([req.body.nik]) }
        ]
      });
      if (ktps.length > 0) {
        res.status(400).json({
          info: '🙄 400 - Verifikasi Gagal! 😪',
          result: {
            message: 'NIK Telah Digunakan!'
          }
        });
      } else {
        const userRepo = getRepository(User);
        const user = await userRepo.findOneOrFail({
          where: [
            { id: Equal(req.user.id) }
          ],
          relations: ['kartu_tanda_penduduk_']
        });
        const ktp = await ktpRepo.findOneOrFail({
          where: [
            { id: Equal(user.kartu_tanda_penduduk_.id) }
          ]
        });
        ktp.nik = req.body.nik;
        ktp.nama = req.body.nama;
        ktp.tempat_lahir = req.body.tempat_lahir;
        ktp.jenis_kelamin = req.body.jenis_kelamin;
        ktp.kecamatan = req.body.kecamatan;
        ktp.kelurahan_desa = req.body.kelurahan_desa;
        const resKtpSave = await ktpRepo.save(ktp);
        user.kartu_tanda_penduduk_ = resKtpSave;
        user.verified = true;
        let resUserSave = await userRepo.save(user);
        delete resUserSave.password;
        delete resUserSave.session_token;
        if ('kartu_tanda_penduduk_' in resUserSave) {
          delete resUserSave.kartu_tanda_penduduk_;
        }
        if ('profile_' in resUserSave) {
          delete resUserSave.profile_;
        }
        user.session_token = jwt.JwtEncode(resUserSave, false);
        resUserSave = await userRepo.save(user);
        res.status(200).json({
          info: `😍 200 - Verifikasi Berhasil 🥰`,
          result: {
            token: resUserSave.session_token
          }
        });
      }
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      info: '🙄 400 - Verifikasi Gagal! 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// Catch 404 and forward to error handler
router.use((req, res, next) => {
  next(createError(404));
});

// Error handler
router.use((err: any, req, res: Response, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500).json({
    info: `😫 ${err.status || 500} - Whoops, Terjadi Kesalahan! 💩`,
    result: err
  });
});

export default router;
