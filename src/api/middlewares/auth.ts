import createError from 'http-errors';

import { getRepository } from 'typeorm';
import { User } from '../entities/User';

// Helper
import jwt from '../helpers/jwt';

// tslint:disable-next-line: typedef
async function loginModule(req, res, next) {
  try {
    if ('userNameOrEmail' in req.body && 'password' in req.body) {
      const userRepo = getRepository(User);
      const selectedUser = await userRepo.findOneOrFail({
        where: [
          { username: req.body.userNameOrEmail, password: req.body.password },
          { email: req.body.userNameOrEmail, password: req.body.password }
        ]
      });
      const { password, session_token, ...noPwdSsToken } = selectedUser;
      selectedUser.session_token = jwt.JwtEncode(noPwdSsToken, ('rememberMe' in req.body && JSON.parse(req.body.rememberMe) === true));
      await userRepo.save(selectedUser);
      res.status(200).json({
        info: '😚 Berhasil Login. Yeay! 🤩',
        result: {
          token: selectedUser.session_token
        }
      });
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
async function isAuthorized(req, res, next) {
  const decoded = jwt.JwtDecode(req, res, next);
  if (decoded && 'token' in decoded && 'username' in decoded.user) {
    const userRepo = getRepository(User);
    const selectedUser = await userRepo.find({
      where: [
        { username: decoded.user.username, session_token: decoded.token }
      ],
      relations: ['kartu_tanda_penduduk_'],
    });
    if (selectedUser.length === 1) {
      delete selectedUser[0].password;
      delete selectedUser[0].session_token;
      delete selectedUser[0].kartu_tanda_penduduk_.id;
      delete selectedUser[0].kartu_tanda_penduduk_.created_at;
      delete selectedUser[0].kartu_tanda_penduduk_.updated_at;
      req.user = selectedUser[0]; // Add `user` accessible to `req` for next middleware
      return next();
    } else {
      return next(createError(401));
    }
  }
}

const auth = { loginModule, isAuthorized };
export default auth;
