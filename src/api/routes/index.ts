import createError from 'http-errors';
import request from 'postman-request';
import multer from 'multer';
import interceptor from 'express-interceptor';
import rateLimit from 'express-rate-limit';

import { Router, Response, NextFunction } from 'express';
import { getRepository, Equal, ILike, In, Not } from 'typeorm';

import { environment } from '../../environments/api/environment';

import { Role } from '../../app/_shared/models/Role';
import { UserRequest } from '../models/UserRequest';

import { ApiKey } from '../entities/ApiKey';
import { User } from '../entities/User';
import { SocialMedia } from '../entities/SocialMedia';
import { KartuTandaPenduduk } from '../entities/KartuTandaPenduduk';

import { isAuthorized, registerModule, loginModule, logoutModule, activationModule, reSendActivation } from '../middlewares/auth';

import { CredentialEncode, JwtView, JwtEncrypt } from '../helpers/crypto';
import { log, reqHeaderBodyCleanUp } from '../helpers/logger';

import { mailSend, composeRegisterMail } from '../programs/bifeldyApp';

import { serverGetMaintenance } from '../settings';

// Child router file
import animeRouter from './anime';
import doramaRouter from './dorama';
import projectRouter from './project';
import fansubRouter from './fansub';
import berkasRouter from './berkas';
import userRouter from './user';
import attachmentRouter from './attachment';
import newsRouter from './news';
import bannedRouter from './banned';
import notificationRouter from './notification';
import likedislikeRouter from './likedislike';
import corsRouter from './cors';
import commentRouter from './comment';
import torrentRouter from './torrent';

// Child router folder
import nihongoRouter from './nihongo';

import { SosMed } from '../../app/_shared/models/SosMed';

import { MessageEmbed } from 'discord.js';

// Express rest api endpoints ~ 1 req/4s
const apiLimiter = rateLimit({
  windowMs: 60000, // 60 Seconds / 1 Minute
  max: 15, // 15 Request
  handler: (req: UserRequest, res: Response, next: NextFunction) => {
    return res.status(429).json({
      info: '😡 429 - API SPAM :: Kebanjiran Permintaan 😤',
      result: {
        message: '💩 Sabar Wheiy, Jangan Nge-SPAM! 🤬',
      }
    });
  }
});

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

function checkServerSetting(req: UserRequest, res: Response, next: NextFunction) {
  switch (req.method) {
    case 'POST':
    case 'PUT':
    case 'DELETE':
      if (serverGetMaintenance()) {
        return res.status(400).json({
          info: '🤧 400 - Settings API :: Server Maintenance 😷',
          result: {
            message: 'Server Sedang Dalam Tahap Perawatan!'
          }
        });
      }
    case 'GET':
    case 'PATCH':
    default:
      return next();
  }
}

const router = Router();

const imgBB = 'https://api.imgbb.com/1/upload';

// Logging Request Body
router.use(reqHeaderBodyCleanUp);

// GET `/api`
router.get('/', (req: UserRequest, res: Response, next: NextFunction) => {
  return res.redirect('/documentation');
});

// GET `/api/aktivasi`
router.get('/aktivasi', activationModule, (req: UserRequest, res: Response, next: NextFunction) => {
  req.botSendNews({
    embeds: [
      new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(req.user.kartu_tanda_penduduk_.nama)
        .setURL(`${environment.baseUrl}/user/${req.user.username}`)
        .setAuthor('Hikki - Pendaftaran Pengguna Baru', `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
        .setDescription(req.user.profile_.description.replace(/<[^>]*>/g, ' ').trim())
        .setThumbnail(req.user.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : req.user.image_url)
        .setTimestamp(req.user.updated_at)
        .setFooter(
          req.user.username,
          req.user.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : req.user.image_url
        )
    ]
  });
  return res.redirect('/login');
});

// Intercept Status Response
router.use(interceptor((req: UserRequest, res: Response) => {
  return {
    isInterceptable: () => {
      log('[INTERCEPT-STATUS] 💠', res.statusCode);
      switch (res.statusCode) {
        case 401:
          res.cookie(environment.tokenName, 'TOKEN_EXPIRED', {
            httpOnly: true,
            secure: environment.production,
            sameSite: 'strict',
            maxAge: 0,
            domain: environment.domain
          });
          return true;
        default:
          return false;
      }
    },
    intercept: (body: any, send: any) => {
      log('[INTERCEPT-BODY] 💠', body);
      return send(body);
    }
  };
}));

// Check Api Key
router.use(async (req: UserRequest, res: Response, next: NextFunction) => {
  const k = req.query.key || '';
  let o = req.headers.origin || req.headers.referer || req.header('x-real-ip') || req.socket.remoteAddress || '';
  if (o.startsWith('http://')) {
    o = o.slice(7, o.length);
  } else if (o.startsWith('https://')) {
    o = o.slice(8, o.length);
  }
  if (o.startsWith('www.')) {
    o = o.slice(4, o.length);
  }
  o = o.split('/')[0];
  o = o.split(':')[0];
  try {
    const apiKeyRepo = getRepository(ApiKey);
    const apiKey = await apiKeyRepo.findOneOrFail({
      where: [
        { api_key: ILike(k) }
      ]
    });
    if (o.includes(apiKey.ip_domain)) {
      if (o == environment.domain || o == environment.ip || o == '127.0.0.1' || o == '::1') {
        return next();
      } else {
        return apiLimiter(req, res, next);
      }
    } else {
      throw new Error('Api Key Salah / Tidak Terdaftar!');
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      info: '🙄 401 - API Key :: Kunci Tidak Dapat Digunakan 😪',
      result: {
        message: 'Api Key Salah / Tidak Terdaftar!'
      }
    });
  }
});

router.use(checkServerSetting);

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
router.use('/banned', bannedRouter);
router.use('/notification', notificationRouter);
router.use('/likedislike', likedislikeRouter);
router.use('/cors', corsRouter);
router.use('/comment', commentRouter);
router.use('/torrent', torrentRouter);

// POST `/api/register`
router.post('/register', registerModule, async (req: UserRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).json({
      info: `😫 403 - Register API :: Tidak Ada Layanan 💩`,
      result: {
        message: `Pendaftaran Sedang Ditutup!`
      }
    });
  }
  mailSend(composeRegisterMail(req.user));
  return res.status(200).json({
    info: '😚 200 - Register API :: Berhasil Registrasi Yeay 🤩',
    result: {
      id: req.user.id,
      title: 'Aktivasi Akun',
      message: `
        Silahkan Periksa Email Untuk Menyelesaikan Pendaftaran. <br />
        Petunjuk Sudah Dikirimkan Ke '<span class="text-danger">${req.user.email}</span>'. <br />
        .: ${req.user.id} :.
      `
    }
  });
});

// POST `/api/aktivasi`
router.post('/aktivasi', reSendActivation, async (req: UserRequest, res: Response, next: NextFunction) => {
  mailSend(composeRegisterMail(req.user));
  return res.status(200).json({
    info: '😚 200 - Register API :: Berhasil Kirim Ulang Aktivasi 🤩',
    result: {
      id: req.user.id,
      title: 'Pengiriman Ulang Aktivasi',
      message: `
        Silahkan Periksa Kembali Email Anda. <br />
        '<span class="text-danger">${req.user.email}</span>' <br />
        .: ${req.user.id} :.
      `
    }
  });
});

// POST `/api/login`
router.post('/login', loginModule, (req: UserRequest, res: Response, next: NextFunction) => {
  return res.status(200).json({
    info: '😚 200 - Login API :: Berhasil Login Yeay 🤩',
    result: {
      jwtToken: req.user.session_token
    }
  });
});

// DELETE `/api/logout`
router.delete('/logout', isAuthorized, logoutModule, (req: UserRequest, res: Response, next: NextFunction) => {
  return res.status(200).json({
    info: '😍 200 - Logout API :: Berhasil Keluar UwUu 🥰',
    result: {
      message: `Sampai Jumpa ${req.user.username}! (｡>﹏<｡)`
    }
  });
});

// // TODO :: POST `/api/reset-password`
// router.post('/reset-password', resetPasswordModule, (req: UserRequest, res: Response, next: NextFunction) => {
//   return res.status(200).json({
//     info: '😚 200 - Reset Password API :: Berhasil Reset Password Yeay 🤩',
//     result: {
//       jwtToken: req.user.session_token
//     }
//   });
// });

// PATCH `/api/verify` -- Verify Login Session
router.patch('/verify', isAuthorized, (req: UserRequest, res: Response, next: NextFunction) => {
  let token = req.cookies[environment.tokenName] || req.headers.authorization || req.headers['x-access-token'] || req.body.token || req.query.token || '';
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  res.cookie(environment.tokenName, token, {
    httpOnly: true,
    secure: environment.production,
    sameSite: 'strict',
    expires: new Date(JwtView(token).exp * 1000),
    domain: environment.domain
  });
  return res.status(200).json({
    info: '😍 200 - Verifikasi API :: Token Selesai Di Verifikasi UwUu 🥰',
    result: req.user,
    jwtToken: token
  });
});

// POST `/api/promote`
router.post('/promote', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if ('role' in req.body && ('id' in req.body || 'username' in req.body || 'email' in req.body)) {
      if (req.user.role === Role.ADMIN || req.user.role === Role.MODERATOR) {
        let excludedRole = [];
        if (req.user.role === Role.ADMIN) {
          excludedRole = [Role.ADMIN];
        } else {
          excludedRole = [Role.ADMIN, Role.MODERATOR];
        }
        if (req.user.role != Role.ADMIN && excludedRole.includes(req.body.role)) {
          return res.status(400).json({
            info: '🙄 400 - Promote API :: Authorisasi Pengguna Gagal 😪',
            result: {
              message: 'Membutuhkan Role Yang Lebih Tinggi'
            }
          });
        }
        const userRepo = getRepository(User);
        const user = await userRepo.findOneOrFail({
          where: [
            {
              id: Equal(req.body.id),
              role: Not(In(excludedRole))
            },
            {
              username: ILike(req.body.username),
              role: Not(In(excludedRole))
            },
            {
              email: ILike(req.body.email),
              role: Not(In(excludedRole))
            }
          ],
          relations: ['kartu_tanda_penduduk_', 'profile_']
        });
        if (user.verified) {
          user.role = req.body.role;
          const resUserSave = await userRepo.save(user);
          req.botSendNews({
            embeds: [
              new MessageEmbed()
                .setColor('#69f0ae')
                .setTitle(resUserSave.kartu_tanda_penduduk_.nama)
                .setURL(`${environment.baseUrl}/user/${resUserSave.username}`)
                .setAuthor(`Hikki - Promosi Menjadi ${resUserSave.role}`, `${environment.baseUrl}/assets/img/favicon.png`, environment.baseUrl)
                .setDescription(resUserSave.profile_.description.replace(/<[^>]*>/g, ' ').trim())
                .setThumbnail(resUserSave.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : resUserSave.image_url)
                .setTimestamp(resUserSave.updated_at)
                .setFooter(
                  `Diangkat promosi oleh :: ${req.user.username}`,
                  req.user.image_url === '/favicon.ico' ? `${environment.baseUrl}/assets/img/favicon.png` : req.user.image_url
                )
            ]
          });
          delete resUserSave.password;
          delete resUserSave.session_token;
          delete resUserSave.kartu_tanda_penduduk_;
          delete resUserSave.profile_;
          return res.status(200).json({
            info: `😅 200 - Promote API :: Berhasil Mempromosikan User 🤣`,
            result: resUserSave
          });
        } else {
          return res.status(400).json({
            info: `🙄 400 - Promote API :: Gagal Mempromosikan User 😪`,
            result: {
              message: 'Akun Pengguna Belum Diverifikasi!'
            }
          });
        }
      } else {
        return res.status(401).json({
          info: '🙄 401 - Promote API :: Authorisasi Pengguna Gagal 😪',
          result: {
            message: 'Khusus Admin / Moderator!'
          }
        });
      }
    } else {
      throw new Error('Data Tidak Lengkap');
    }
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      info: `🙄 400 - Promote API :: Gagal Mempromosikan User 😪`,
      result: {
        message: 'Data Tidak Lengkap'
      }
    });
  }
});

// POST `/api/image`
router.post('/image', isAuthorized, upload.single('file'), async (req: UserRequest, res: Response, next: NextFunction) => {
  return request({
    method: 'POST',
    uri: imgBB,
    formData: {
      key: environment.imgbbKey,
      name: new Date().getTime(),
      image: req.file.buffer.toString('base64')
    },
      headers: environment.nodeJsXhrHeader
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
router.post('/cek-nik', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    if ('nik' in req.body && 'nama' in req.body && 'g-recaptcha-response' in req.body) {
      const userIp = req.header('x-real-ip') || req.socket.remoteAddress || '';
      return request(`
        ${environment.recaptchaApiUrl}?secret=${environment.reCaptchaSecretKey}&response=${req.body['g-recaptcha-response']}&remoteip=${userIp}
      `.trim(), (e1, r1, b1) => {
        if (!e1) {
          b1 = JSON.parse(b1);
          if (b1 && b1.success) {
            return request({
              method: 'POST',
              uri: environment.apiPemerintahKTPUrl,
              body: JSON.stringify({
                nik: req.body.nik,
                nama: req.body.nama,
                ck_kpu: environment.apiPemerintahKTPSecretKey
              }),
              headers: environment.nodeJsXhrHeader
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

// PUT `/api/verify-ktp` -- Verify Account By KTP
router.put('/verify-ktp', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
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
        user.session_token = CredentialEncode({ user: resUserSave }, false);
        resUserSave = await userRepo.save(user);
        res.cookie(environment.tokenName, resUserSave.session_token, {
          httpOnly: true,
          secure: environment.production,
          sameSite: 'strict',
          expires: new Date(JwtView(req.user.session_token).exp * 1000),
          domain: environment.domain
        });
        return res.status(200).json({
          info: `😍 200 - Verifikasi API :: Verifikasi Berhasil 🥰`,
          result: {
            jwtToken: resUserSave.session_token
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

// PUT `/api/verify-sosmed` -- Verify Account By Social Media :: DISCORD, DISQUS, GOOGLE, FACEBOOK, Etc
router.put('/verify-sosmed', isAuthorized, async (req: UserRequest, res: Response, next: NextFunction) => {
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
          },
          headers: environment.nodeJsXhrHeader
        }, async (er, rs, bd) => {
          if (!er) {
            const discordAuth = JSON.parse(bd);
            return request({
              method: 'GET',
              uri: `${environment.discordApiUrl}/users/@me`,
              headers: {
                Authorization: `${discordAuth.token_type} ${discordAuth.access_token}`,
                ...environment.nodeJsXhrHeader
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
                      title: 'Kirim Token Ke Hikki Discord BOT Dalam 3 Menit! #🚮-bot-spam',
                      message: '~verify DISCORD ' + JwtEncrypt({ discord: discordProfile, user: resUserSave }) + ' DELETE_CHAT'
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
                    message: 'Error koneksi ke api discord resmi!'
                  }
                });
              }
            });
          } else {
            return res.status(rs.statusCode).json({
              info: `🙄 ${rs.statusCode} - Discord API :: Gagal Masuk 😪`,
              result: {
                message: 'Kode token salah / tidak valid!'
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
router.use((req: UserRequest, res: Response, next: NextFunction) => {
  return next(createError(404));
});

// Error handler
router.use((err: any, req: UserRequest, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = err;
  return res.status(err.status || 500).json({
    info: `😫 ${err.status || 500} - Error API :: Whoops Terjadi Kesalahan 💩`,
    result: err
  });
});

export default router;
