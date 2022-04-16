import request from 'postman-request';

import { getRepository, Equal, ILike } from 'typeorm';
import { Response, NextFunction } from 'express';

import { environment } from '../../environments/api/environment';

import { UserRequest } from '../models/UserRequest';

import { User } from '../entities/User';
import { KartuTandaPenduduk } from '../entities/KartuTandaPenduduk';
import { Profile } from '../entities/Profile';
import { Banned } from '../entities/Banned';
import { Registration } from '../entities/Registration';

import { JwtView, CredentialEncode, CredentialDecode, hashPassword, JwtEncrypt, JwtDecrypt } from '../helpers/crypto';

import { disconnectRoom } from '../programs/socketWeb';
import { serverGetOpenForRegister } from '../settings';

export async function registerModule(req: UserRequest, res: Response, next: NextFunction) {
  try {
    if (!serverGetOpenForRegister()) {
      req.user = null;
      return next();
    } else if (
      'username' in req.body &&
      'name' in req.body &&
      'email' in req.body &&
      'password' in req.body &&
      'agree' in req.body && (JSON.parse(req.body.agree) === true) &&
      'g-recaptcha-response' in req.body
    ) {
      const userIp = req.header('x-real-ip') || req.socket.remoteAddress || '';
      return request(`
        ${environment.recaptchaApiUrl}?secret=${environment.reCaptchaSecretKey}&response=${req.body['g-recaptcha-response']}&remoteip=${userIp}
      `.trim(), async (e1, r1, b1) => {
        try {
          if (!e1) {
            b1 = JSON.parse(b1);
            if (b1 && b1.success) {
              const registrationRepo = getRepository(Registration);
              const selectedRegistration = await registrationRepo.find({
                where: [
                  { username: ILike(req.body.username) },
                  { email: ILike(req.body.email) }
                ]
              });
              const userRepo = getRepository(User);
              const selectedUser = await userRepo.find({
                where: [
                  { username: ILike(req.body.username) },
                  { email: ILike(req.body.email) }
                ]
              });
              const userNotAvailable = [...selectedRegistration, ...selectedUser];
              if (userNotAvailable.length === 0) {
                const result: any = {};
                req.body.username = req.body.username.replace(/\s/g, '').replace(/[^a-z0-9]/g, '');
                if (req.body.username.length < 8) {
                  result.username = 'Nama Pengguna Minimal 8 Huruf';
                }
                if (!req.body.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
                  result.email = 'Email Tidak Valid';
                }
                if (Object.keys(result).length > 0) {
                  result.message = 'Akun Tidak Dapat Digunakan!';
                  return res.status(400).json({
                    info: '🙄 400 - Authentication API :: Pendaftaran Gagal 😪',
                    result
                  });
                }
                const pengguna = new Registration();
                pengguna.username = req.body.username;
                pengguna.email = req.body.email;
                pengguna.password = hashPassword(req.body.password);
                pengguna.nama = req.body.name;
                let penggunaSave = await registrationRepo.save(pengguna);
                const { password, activation_token, ...noPwdAcToken } = penggunaSave;
                pengguna.activation_token = JwtEncrypt({ user: noPwdAcToken }, 5 * 60);
                penggunaSave = await registrationRepo.save(pengguna);
                req.user = (penggunaSave as any);
                setTimeout(async () => {
                  try {
                    const registrationToBeDeleted = await registrationRepo.findOneOrFail({
                      where: [
                        { id: Equal(penggunaSave.id), activation_token: Equal(penggunaSave.activation_token) }
                      ]
                    });
                    await registrationRepo.remove(registrationToBeDeleted);
                  } catch (err) {
                    console.error(err);
                  }
                }, 3 * 60 * 1000);
                return next();
              } else {
                const result: any = {};
                for (const user of userNotAvailable) {
                  if (user.username === req.body.username) {
                    result.username = `${user.username} Sudah Terpakai`;
                  }
                  if (user.email === req.body.email) {
                    result.email = `${user.email} Sudah Terpakai`;
                  }
                }
                return res.status(400).json({
                  info: '🙄 400 - Authentication API :: Pendaftaran Gagal 😪',
                  result
                });
              }
            } else {
              return res.status(r1.statusCode).json({
                info: `🙄 ${r1.statusCode} - Google API :: Captcha Bermasalah 😪`,
                result: {
                  message: 'Captcha Salah / Expired!'
                }
              });
            }
          } else {
            throw e1;
          }
        } catch (e) {
          console.error(e);
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
      info: '🙄 400 - Authentication API :: Pendaftaran Gagal 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
}

export async function activationModule(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const token = req.query.token || '';
    const decoded = JwtDecrypt(token);
    const registrationRepo = getRepository(Registration);
    const selectedRegistration = await registrationRepo.findOneOrFail({
      where: [
        { id: Equal(decoded.user.id) }
      ]
    });
    const ktpRepo = getRepository(KartuTandaPenduduk);
    const newUserKtp = new KartuTandaPenduduk();
    newUserKtp.nama = selectedRegistration.nama;
    const resKtpSave = await ktpRepo.save(newUserKtp);
    const profileRepo = getRepository(Profile);
    const newUserProfile = new Profile();
    newUserProfile.description = '// No Description';
    newUserProfile.cover_url = '/favicon.ico';
    const resProfileSave = await profileRepo.save(newUserProfile);
    const newUser = new User();
    newUser.username = selectedRegistration.username;
    newUser.email = selectedRegistration.email;
    newUser.image_url = '/favicon.ico';
    newUser.password = selectedRegistration.password;
    newUser.kartu_tanda_penduduk_ = resKtpSave;
    newUser.profile_ = resProfileSave;
    const userRepo = getRepository(User);
    let resUserSave = await userRepo.save(newUser);
    const { password, session_token, ...noPwdSsToken } = resUserSave;
    newUser.session_token = CredentialEncode({ user: noPwdSsToken }, false);
    resUserSave = await userRepo.save(newUser);
    req.user = (resUserSave as any);
    res.cookie(environment.tokenName, req.user.session_token, {
      httpOnly: true,
      secure: environment.production,
      sameSite: 'strict',
      expires: new Date(JwtView(req.user.session_token).exp * 1000),
      domain: environment.domain
    });
    return next();
  } catch (err) {
    console.error(err);
    return res.redirect('/register');
  }
}

export async function reSendActivation(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const registrationRepo = getRepository(Registration);
    const selectedRegistration = await registrationRepo.findOneOrFail({
      where: [
        { id: Equal(req.body.id) }
      ]
    });
    req.user = (selectedRegistration as any);
    return next();
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      info: '🤔 404 - Authentication API :: Pengguna Tidak Ditemukan 😷',
      result: {
        message: 'Silahkan Coba Daftar Kembali!'
      }
    });
  }
};

export async function checkBan(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const bannedRepo = getRepository(Banned);
    const banned = await bannedRepo.findOneOrFail({
      where: [
        {
          user_: {
            id: Equal(req.user.id)
          }
        }
      ],
      relations: ['user_']
    });
    return res.status(401).json({
      info: `🙄 401 - Banned API :: ${banned.user_.username} Telah Di BAN 😪`,
      result: {
        message: `Akun Tidak Dapat Digunakan :: ${banned.reason}`
      }
    });
  } catch (error) {
    return next();
  }
}

export async function loginModule(req: UserRequest, res: Response, next: NextFunction) {
  try {
    if ('userNameOrEmail' in req.body && 'password' in req.body) {
      const reqBodyPassword = hashPassword(req.body.password);
      const userRepo = getRepository(User);
      const selectedUser = await userRepo.findOneOrFail({
        where: [
          { username: ILike(req.body.userNameOrEmail), password: ILike(reqBodyPassword) },
          { email: ILike(req.body.userNameOrEmail), password: ILike(reqBodyPassword) }
        ]
      });
      const { password, session_token, ...noPwdSsToken } = selectedUser;
      const rememberMe = ('rememberMe' in req.body && JSON.parse(req.body.rememberMe) === true);
      selectedUser.session_token = CredentialEncode({ user: noPwdSsToken }, rememberMe);
      const resUserSave = await userRepo.save(selectedUser);
      req.user = (resUserSave as any);
      res.cookie(environment.tokenName, req.user.session_token, {
        httpOnly: true,
        secure: environment.production,
        sameSite: 'strict',
        expires: new Date(JwtView(req.user.session_token).exp * 1000),
        domain: environment.domain
      });
      return checkBan(req, res, next);
    } else {
      throw new Error('Username, Email, atau Password tidak tepat!');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      info: '🙄 400 - Authentication API :: Login Gagal! 😪',
      result: {
        message: 'Username, Email, atau Password tidak tepat!'
      }
    });
  }
}

export async function isAuthorized(req: UserRequest, res: Response, next: NextFunction) {
  const decoded = CredentialDecode(req, res, next);
  try {
    const userRepo = getRepository(User);
    const selectedUser = await userRepo.findOneOrFail({
      where: [
        { id: Equal(decoded.user.id), session_token: Equal(decoded.token) }
      ],
      relations: ['kartu_tanda_penduduk_', 'profile_'],
    });
    delete selectedUser.password;
    delete selectedUser.session_token;
    delete selectedUser.kartu_tanda_penduduk_.id;
    delete selectedUser.kartu_tanda_penduduk_.created_at;
    delete selectedUser.kartu_tanda_penduduk_.updated_at;
    delete selectedUser.profile_.id;
    delete selectedUser.profile_.created_at;
    delete selectedUser.profile_.updated_at;
    req.user = (selectedUser as any);
    return checkBan(req, res, next);
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      info: '🙄 401 - Authentication API :: Authorisasi Sesi Gagal 😪',
      result: {
        message: 'Akses Token Ditolak!'
      }
    });
  }
}

export async function isLogin(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies[environment.tokenName] || req.headers.authorization || req.headers['x-access-token'] || req.body.token || req.query.token || '';
    if (token) {
      return isAuthorized(req, res, next);
    } else {
      throw new Error('User Is Not Login');
    }
  } catch (err) {
    req.user = null;
    return next();
  }
}

export async function logoutModule(req: UserRequest, res: Response, next: NextFunction) {
  const decoded = CredentialDecode(req, res, next);
  if (decoded && 'token' in decoded && 'id' in decoded.user) {
    try {
      const userRepo = getRepository(User);
      const selectedUser = await userRepo.findOneOrFail({
        where: [
          { id: Equal(decoded.user.id), session_token: Equal(decoded.token) }
        ]
      });
      selectedUser.session_token = null;
      const resUserSave = await userRepo.save(selectedUser);
      const { password, session_token, ...noPwdSsToken } = resUserSave;
      req.user = (noPwdSsToken as any);
      const socketId = req.headers.socket || '';
      if (socketId) {
        disconnectRoom(req.io, req.io.sockets.sockets.get(socketId as string));
      }
      res.cookie(environment.tokenName, 'TOKEN_EXPIRED', {
        httpOnly: true,
        secure: environment.production,
        sameSite: 'strict',
        maxAge: 0,
        domain: environment.domain
      });
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        info: '🙄 401 - Authentication API :: Logout Gagal 😪',
        result: {
          message: 'Sesi Anda Tidak Dapat Dicocokkan!'
        }
      });
    }
  }
}
