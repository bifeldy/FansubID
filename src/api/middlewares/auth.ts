
import request from 'postman-request';

import { getRepository, Equal, ILike } from 'typeorm';
import { Response, NextFunction } from 'express';

import { environment } from '../../environments/server/environment';

import { UserRequest } from '../models/UserRequest';

import { User } from '../entities/User';
import { KartuTandaPenduduk } from '../entities/KartuTandaPenduduk';
import { Profile } from '../entities/Profile';
import { Banned } from '../entities/Banned';

import { JwtView, JwtEncode, JwtDecode, hashPassword } from '../helpers/crypto';

import { disconnectRoom } from '../programs/socketWeb';

export async function registerModule(req: UserRequest, res: Response, next: NextFunction) {
  try {
    if (
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
        b1 = JSON.parse(b1);
        if (b1 && b1.success) {
          const userRepo = getRepository(User);
          const selectedUser = await userRepo.find({
            where: [
              { username: ILike(req.body.username) },
              { email: ILike(req.body.email) }
            ]
          });
          if (selectedUser.length === 0) {
            const result: any = {};
            req.body.username = req.body.username.replace(/\s/g, '').replace(/[^a-z0-9]/g, '');
            if (req.body.username.length < 8) {
              result.username = 'Nama Pengguna Minimal 8 Huruf';
            }
            if (!req.body.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
              result.email = 'Email Tidak Valid';
            }
            if (Object.keys(result).length > 0) {
              return res.status(400).json({
                info: '🙄 400 - Authentication API :: Pendaftaran Gagal 😪',
                result
              });
            }
            const ktpRepo = getRepository(KartuTandaPenduduk);
            const newUserKtp = new KartuTandaPenduduk();
            newUserKtp.nama = req.body.name;
            const resKtpSave = await ktpRepo.save(newUserKtp);
            const profileRepo = getRepository(Profile);
            const newUserProfile = new Profile();
            newUserProfile.description = '// No Description';
            newUserProfile.cover_url = '/favicon.ico';
            const resProfileSave = await profileRepo.save(newUserProfile);
            const newUser = new User();
            newUser.username = req.body.username;
            newUser.email = req.body.email;
            newUser.image_url = '/favicon.ico';
            newUser.password = hashPassword(req.body.password);
            newUser.kartu_tanda_penduduk_ = resKtpSave;
            newUser.profile_ = resProfileSave;
            let resUserSave = await userRepo.save(newUser);
            const { password, session_token, ...noPwdSsToken } = resUserSave;
            newUser.session_token = JwtEncode(noPwdSsToken, false);
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
          } else {
            const result: any = {};
            for (const sU of selectedUser) {
              if (sU.username === req.body.username) {
                result.username = `${sU.username} Sudah Terpakai`;
              }
              if (sU.email === req.body.email) {
                result.email = `${sU.email} Sudah Terpakai`;
              }
            }
            return res.status(400).json({
              info: '🙄 400 - Authentication API :: Pendaftaran Gagal 😪',
              result
            });
          }
        } else {
          return res.status(r1.statusCode).json({
            info: `🙄 ${r1.statusCode} - Google API :: Wrong Captcha 😪`,
            result: {
              message: 'Captcha Salah / Expired!'
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
      selectedUser.session_token = JwtEncode(noPwdSsToken, rememberMe);
      const resUserSave = await userRepo.save(selectedUser);
      req.user = (resUserSave as any);
      res.cookie(environment.tokenName, req.user.session_token, {
        httpOnly: true,
        secure: environment.production,
        sameSite: 'strict',
        expires: new Date(JwtView(req.user.session_token).exp * 1000),
        domain: environment.domain
      });
      checkBan(req, res, next);
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
  const decoded = JwtDecode(req, res, next);
  if (decoded && 'token' in decoded && 'id' in decoded.user) {
    const userRepo = getRepository(User);
    const selectedUser = await userRepo.find({
      where: [
        { id: Equal(decoded.user.id), session_token: Equal(decoded.token) }
      ],
      relations: ['kartu_tanda_penduduk_', 'profile_'],
    });
    if (selectedUser.length === 1) {
      const usr = selectedUser[0];
      delete usr.password;
      delete usr.session_token;
      delete usr.kartu_tanda_penduduk_.id;
      delete usr.kartu_tanda_penduduk_.created_at;
      delete usr.kartu_tanda_penduduk_.updated_at;
      delete usr.profile_.id;
      delete usr.profile_.created_at;
      delete usr.profile_.updated_at;
      req.user = (usr as any);
      checkBan(req, res, next);
    } else {
      return res.status(401).json({
        info: '🙄 401 - Authentication API :: Authorisasi Sesi Gagal 😪',
        result: {
          message: 'Akses Token Ditolak!'
        }
      });
    }
  }
}

export async function isLogin(req: UserRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies[environment.tokenName] || req.headers.authorization || req.headers['x-access-token'] || req.body.token || req.query.token || '';
    if (token) {
      isAuthorized(req, res, next);
    } else {
      throw new Error('User Is Not Login');
    }
  } catch (err) {
    req.user = null;
    return next();
  }
}

export async function logoutModule(req: UserRequest, res: Response, next: NextFunction) {
  const decoded = JwtDecode(req, res, next);
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
