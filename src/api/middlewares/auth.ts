
import { getRepository } from 'typeorm';

import { Response, NextFunction } from 'express';

import { UserRequest } from '../models/UserRequest';

import { User } from '../entities/User';
import { KartuTandaPenduduk } from '../entities/KartuTandaPenduduk';

import * as CryptoJS from 'crypto-js';

// Helper
import jwt from '../helpers/jwt';

// tslint:disable-next-line: typedef
async function registerModule(req: UserRequest, res: Response, next: NextFunction) {
  try {
    if (
      'username' in req.body &&
      'name' in req.body &&
      'email' in req.body &&
      'password' in req.body &&
      'agree' in req.body && (JSON.parse(req.body.agree) === true)
    ) {
      const userRepo = getRepository(User);
      const selectedUser = await userRepo.find({
        where: [
          { username: req.body.username },
          { email: req.body.email }
        ]
      });
      if (selectedUser.length === 0) {
        const ktpRepo = getRepository(KartuTandaPenduduk);
        const newUserKtp = new KartuTandaPenduduk();
        newUserKtp.nama = req.body.name;
        const resKtpSave = await ktpRepo.save(newUserKtp);
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = CryptoJS.SHA512(req.body.password).toString();
        newUser.kartu_tanda_penduduk_ = resKtpSave;
        let resUserSave = await userRepo.save(newUser);
        const { password, session_token, ...noPwdSsToken } = resUserSave;
        newUser.session_token = jwt.JwtEncode(noPwdSsToken, false);
        resUserSave = await userRepo.save(newUser);
        req.user = (resUserSave as any);
        return next();
      } else {
        const result: any = {};
        selectedUser.forEach(sU => {
          if (sU.username === req.body.username) {
            result.username = `${sU.username} Sudah Terpakai`;
          }
          if (sU.email === req.body.email) {
            result.email = `${sU.email} Sudah Terpakai`;
          }
        });
        res.status(400).json({
          info: '🙄 400 - Pendaftaran Gagal! 😪',
          result
        });
      }
    } else {
      throw new Error('Data Tidak Lengkap!');
    }
  } catch (error) {
    res.status(400).json({
      info: '🙄 400 - Pendaftaran Gagal! 😪',
      result: {
        message: 'Data Tidak Lengkap!'
      }
    });
  }
}

// tslint:disable-next-line: typedef
async function loginModule(req: UserRequest, res: Response, next: NextFunction) {
  try {
    if ('userNameOrEmail' in req.body && 'password' in req.body) {
      const reqBodyPassword = CryptoJS.SHA512(req.body.password).toString();
      const userRepo = getRepository(User);
      const selectedUser = await userRepo.findOneOrFail({
        where: [
          { username: req.body.userNameOrEmail, password: reqBodyPassword },
          { email: req.body.userNameOrEmail, password: reqBodyPassword }
        ]
      });
      const { password, session_token, ...noPwdSsToken } = selectedUser;
      selectedUser.session_token = jwt.JwtEncode(noPwdSsToken, ('rememberMe' in req.body && JSON.parse(req.body.rememberMe) === true));
      const resUserSave = await userRepo.save(selectedUser);
      req.user = (resUserSave as any);
      return next();
    } else {
      throw new Error('Username, Email, atau Password tidak tepat!');
    }
  } catch (error) {
    res.status(400).json({
      info: '🙄 400 - Login Gagal! 😪',
      result: {
        message: 'Username, Email, atau Password tidak tepat!'
      }
    });
  }
}

// tslint:disable-next-line: typedef
async function isAuthorized(req: UserRequest, res: Response, next: NextFunction) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded && 'token' in decoded && 'id' in decoded.user) {
    const userRepo = getRepository(User);
    const selectedUser = await userRepo.find({
      where: [
        { id: decoded.user.id, session_token: decoded.token }
      ],
      relations: ['kartu_tanda_penduduk_'],
    });
    if (selectedUser.length === 1) {
      delete selectedUser[0].password;
      delete selectedUser[0].session_token;
      delete selectedUser[0].kartu_tanda_penduduk_.id;
      delete selectedUser[0].kartu_tanda_penduduk_.created_at;
      delete selectedUser[0].kartu_tanda_penduduk_.updated_at;
      req.user = (selectedUser[0] as any);
      return next();
    } else {
      res.status(401).json({
        info: '🙄 401 - Authorisasi Sesi Gagal! 😪',
        result: {
          message: 'Akses Token Ditolak!'
        }
      });
    }
  }
}

// tslint:disable-next-line: typedef
async function logoutModule(req: UserRequest, res: Response, next: NextFunction) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded && 'token' in decoded && 'id' in decoded.user) {
    try {
      const userRepo = getRepository(User);
      const selectedUser = await userRepo.findOneOrFail({
        where: [
          { id: decoded.user.id, session_token: decoded.token }
        ]
      });
      selectedUser.session_token = null;
      const resUserSave = await userRepo.save(selectedUser);
      const { password, session_token, ...noPwdSsToken } = resUserSave;
      req.user = (noPwdSsToken as any);
      return next();
    } catch (error) {
      res.status(400).json({
        info: '🙄 400 - Logout Gagal! 😪',
        result: {
          message: 'Sesi Anda Tidak Dapat Dicocokkan!'
        }
      });
    }
  }
}

const auth = { loginModule, isAuthorized, logoutModule, registerModule };
export default auth;
