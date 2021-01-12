import { Router, Response } from 'express';

import { getRepository, Equal, In } from 'typeorm';

import createError from 'http-errors';
import request from 'request';
import multer from 'multer';

import { UserRequest } from '../models/UserRequest';

import { environment } from '../../environments/server/environment';

import { User } from '../entities/User';
import { SocialMedia } from '../entities/SocialMedia';
import { KartuTandaPenduduk } from '../entities/KartuTandaPenduduk';

// Middleware
import auth from '../middlewares/auth';

// Helper
import jwt from '../helpers/jwt';
import logger from '../helpers/logger';

// Child router
import animeRouter from './anime';
import doramaRouter from './dorama';
import projectRouter from './project';
import fansubRouter from './fansub';
import berkasRouter from './berkas';
import userRouter from './user';
import attachmentRouter from './attachment';
import newsRouter from './news';
import nihongoRouter from './nihongo';

import { SosMed } from '../../app/_shared/models/SosMed';

import { MessageEmbed } from 'discord.js';

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

// Logging Request Body
router.use(logger.reqBodyCleanUp);

// Child route url
router.use('/anime', animeRouter);
router.use('/dorama', doramaRouter);
router.use('/project', projectRouter);
router.use('/fansub', fansubRouter);
router.use('/berkas', berkasRouter);
router.use('/user', userRouter);
router.use('/attachment', attachmentRouter);
router.use('/news', newsRouter);
router.use('/nihongo', nihongoRouter);

// GET `/api`
router.get('/', (req: UserRequest, res: Response) => {
  return res.redirect('/');
});

// POST `/api/register`
router.post('/register', auth.registerModule, async (req: UserRequest, res: Response, next) => {
  await req.bot.send(
    new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(req.user.kartu_tanda_penduduk_.nama)
    .setURL(`${environment.baseUrl}/user/${req.user.username}`)
    .setAuthor('Hikki - Pendaftaran Pengguna Baru', `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
    .setDescription(req.user.profile_.description.replace(/<[^>]*>/g, '').trim())
    .setThumbnail(req.user.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : req.user.image_url)
    .setTimestamp(req.user.updated_at)
    .setFooter(
      req.user.username,
      req.user.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : req.user.image_url
    )
  );
  return res.status(200).json({
    info: '😚 200 - Register API :: Berhasil Registrasi Yeay 🤩',
    result: {
      token: req.user.session_token
    }
  });
});

// POST `/api/login`
router.post('/login', auth.loginModule, (req: UserRequest, res: Response, next) => {
  return res.status(200).json({
    info: '😚 200 - Login API :: Berhasil Login Yeay 🤩',
    result: {
      token: req.user.session_token
    }
  });
});

// DEL `/api/logout`
router.delete('/logout', auth.isAuthorized, auth.logoutModule, (req: UserRequest, res: Response, next) => {
  return res.status(200).json({
    info: '😍 200 - Logout API :: Berhasil Keluar UwUu 🥰',
    result: req.user
  });
});

// POST `/api/verify` -- Verify Login Session
router.post('/verify', auth.isAuthorized, (req: UserRequest, res: Response, next) => {
  return res.status(200).json({
    info: '😍 200 - Verifikasi API :: Token Selesai Di Verifikasi UwUu 🥰',
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
    if (!error) {
      const data = JSON.parse(body).data;
      return res.status(result.statusCode).json({
        info: `😅 ${result.statusCode} - ImgBB API :: Upload Image 🤣`,
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
    } else {
      return res.status(result.statusCode).json({
        info: `🙄 ${result.statusCode} - ImgBB API :: Upload Image Gagal 😪`,
        result: {
          message: 'Data Tidak Lengkap / ImgBB Down!'
        }
      });
    }
  });
});

// POST `/api/cek-nik`
router.post('/cek-nik', auth.isAuthorized, async (req: UserRequest, res: Response, next) => {
  try {
    if ('nik' in req.body && 'nama' in req.body && 'g-recaptcha-response' in req.body) {
      return request(`
        ${environment.recaptchaApiUrl}?secret=${environment.reCaptchaSecretKey}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}
      `.trim(), (e1, r1, b1) => {
        if (!e1) {
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
              if (!e2) {
                const resKPU = JSON.parse(b2);
                if ('data' in resKPU && resKPU.data) {
                  delete resKPU.data.tps;
                }
                return res.status(r2.statusCode).json({
                  info: `😍 ${r2.statusCode} - KTP API :: Data Kartu Tanda Penduduk 🥰`,
                  result: resKPU
                });
              } else {
                return res.status(r2.statusCode).json({
                  info: `🙄 ${r2.statusCode} - KTP API :: API Pemerintah Error 😪`,
                  result: {
                    message: 'Kayaknya Sudah Di Fix Deh Kebocoran Datanya?'
                  }
                });
              }
            });
          } else {
            return res.status(r1.statusCode).json({
              info: `🙄 ${r1.statusCode} - Google API :: Captcha Bermasalah 😪`,
              result: {
                message: 'Captcha Salah / Expired!'
              }
            });
          }
        } else {
          return res.status(r1.statusCode).json({
            info: `🙄 ${r1.statusCode} - Google API :: Captcha Bermasalah 😪`,
            result: {
              message: 'Data Tidak Lengkap / Google API Down!'
            }
          });
        }
      });
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: '🙄 400 - KTP API :: Cek NIK Gagal 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// PUT `/api/verify` -- Verify Account By KTP
router.put('/verify', auth.isAuthorized, async (req: UserRequest, res: Response, next) => {
  try {
    if (req.user.verified) {
      return res.status(200).json({
        info: `😅 200 - Verifikasi API :: User Telah Diverifikasi 🤣`,
        result: {
          message: 'User Telah Diverifikasi!'
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
        return res.status(400).json({
          info: '🙄 400 - Verifikasi API :: Verifikasi Gagal 😪',
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
        return res.status(200).json({
          info: `😍 200 - Verifikasi API :: Verifikasi Berhasil 🥰`,
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
    return res.status(400).json({
      info: '🙄 400 - Verifikasi API :: Verifikasi Gagal! 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// PATCH `/api/verify` -- Verify Account By Social Media :: DISCORD, DISQUS, GOOGLE, FACEBOOK, Etc
router.patch('/verify', auth.isAuthorized, async (req: UserRequest, res: Response, next) => {
  try {
    if (req.user.verified) {
      return res.status(200).json({
        info: `😅 200 - Verifikasi API :: User Telah Diverifikasi 🤣`,
        result: {
          title: 'Akun Telah Diverifikasi!',
          message: 'Whoops! Yeay~'
        }
      });
    } else if ('app' in req.body && 'code' in req.body) {
      const sosmedRepo = getRepository(SocialMedia);
      const userRepo = getRepository(User);
      const user = await userRepo.findOneOrFail({
        where: [
          { id: Equal(req.user.id) }
        ]
      });
      if (req.body.app === SosMed.DISCORD) {
        return request({
          method: 'POST',
          uri: `${environment.discordApiUrl}/oauth2/token`,
          formData: {
            client_id: environment.discordClientId,
            client_secret: environment.discordClientSecret,
            grant_type: 'authorization_code',
            code: req.body.code,
            redirect_uri: `${environment.baseUrl}/verify?app=discord`,
            scope: 'identify email guilds.join'
          }
        }, async (er, rs, bd) => {
          if (!er) {
            const discordAuth = JSON.parse(bd);
            return request({
              method: 'GET',
              uri: `${environment.discordApiUrl}/users/@me`,
              headers: {
                Authorization: `${discordAuth.token_type} ${discordAuth.access_token}`
              }
            }, async (e, r, b) => {
              if (!e) {
                try {
                  const discordProfile = JSON.parse(b);
                  const sosmeds = await sosmedRepo.find({
                    where: [
                      {
                        type: SosMed.DISCORD,
                        user_: {
                          id: Equal(req.user.id)
                        }
                      }
                    ],
                    relations: ['user_']
                  });
                  if (sosmeds.length > 0) {
                    await sosmedRepo.update({
                      type: sosmeds[0].type,
                      user_: {
                        id: req.user.id
                      }
                    }, {
                      id: discordProfile.id,
                      refresh_token: discordAuth.refresh_token
                    });
                  } else {
                    const sosmed = new SocialMedia();
                    sosmed.id = discordProfile.id;
                    sosmed.refresh_token = discordAuth.refresh_token;
                    sosmed.type = SosMed.DISCORD;
                    sosmed.user_ = user;
                    await sosmedRepo.insert(sosmed);
                  }
                  user.discord = discordProfile.id;
                  const resUserSave = await userRepo.save(user);
                  delete resUserSave.password;
                  delete resUserSave.session_token;
                  delete resUserSave.kartu_tanda_penduduk_;
                  delete resUserSave.profile_;
                  return res.status(r.statusCode).json({
                    info: `😅 ${r.statusCode} - Discord API :: Masuk & Verify 🤣`,
                    result: {
                      title: 'Kirim Token Ke Hikki Discord BOT Dalam 1 Menit! #🚮-bot-spam',
                      message: '~verify DISCORD ' + jwt.JwtEncrypt({ discord: discordProfile, user: resUserSave }) + ' DELETE_CHAT'
                    }
                  });
                } catch (err) {
                  console.error(err);
                  return res.status(r.statusCode).json({
                    info: `🙄 ${r.statusCode} - Discord API :: Gagal Masuk 😪`,
                    result: {
                      title: 'Kode oAuth Salah / Expired / Akun Telah Digunakan!',
                      message: 'Silahkan ulangi langkah sebelumnya atau coba dengan akun yang lain.'
                    }
                  });
                }
              } else {
                return res.status(r.statusCode).json({
                  info: `🙄 ${r.statusCode} - Discord API :: Gagal Verify 😪`,
                  result: {
                    message: 'Data Tidak Lengkap / Discord API Down!'
                  }
                });
              }
            });
          } else {
            return res.status(rs.statusCode).json({
              info: `🙄 ${rs.statusCode} - Discord API :: Gagal Masuk 😪`,
              result: {
                message: 'Data Tidak Lengkap / Discord API Down!'
              }
            });
          }
        });
      // } else if (req.body.app === SosMed.DISQUS) {
      //   // TODO :: If Other SosMed
      // } else if (req.body.app === SosMed.GOOGLE) {
      //   // TODO :: If Other SosMed
      // } else if (req.body.app === SosMed.FACEBOOK) {
      //   // TODO :: If Other SosMed
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: '🙄 400 - Social Media :: Verifikasi Gagal! 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
});

// Catch 404 and forward to error handler
router.use((req: UserRequest, res: Response, next) => {
  return next(createError(404));
});

// Error handler
router.use((err: any, req: UserRequest, res: Response, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  return res.status(err.status || 500).json({
    info: `😫 ${err.status || 500} - Error API :: Whoops Terjadi Kesalahan 💩`,
    result: err
  });
});

export default router;
