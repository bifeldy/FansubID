import cryptojs from 'crypto-js';
import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

import { environment } from '../../environments/server/environment';

const jwtAlgorithm = 'HS512';
const jwtIssuer = 'Bifeldy';
const jwtAudience = environment.siteName;
const jwtSecretKey = cryptojs.SHA512(environment.jwtSecretKey).toString();
const jwtExpiredIn = 24 * 60 * 60;

export function JwtEncode(user: any, rememberMe = false): any {
  return jwt.sign({ user }, jwtSecretKey, {
    algorithm: jwtAlgorithm,
    issuer: jwtIssuer,
    audience: jwtAudience,
    expiresIn: rememberMe === true ? (7 * 24 * 60 * 60) : jwtExpiredIn,
  });
}

export function JwtDecode(req: Request, res: Response, next: NextFunction): any {
  try {
    let token = req.cookies[environment.tokenName] || req.headers.authorization || req.headers['x-access-token'] || req.body.token || req.query.token || '';
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    if (!token) {
      return res.status(400).json({
        info: '🤧 400 - JWT API :: JWT Token Tidak Ada 😷',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      });
    } else {
      const decoded: {} = jwt.verify(token, jwtSecretKey);
      return { ...decoded, token };
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      info: '🤧 401 - JWT API :: Whoops, Akses Ditolak 😷',
      result: err
    });
  }
}

export function JwtEncrypt(data): any {
  return jwt.sign(data, jwtSecretKey, {
    algorithm: jwtAlgorithm,
    issuer: jwtIssuer,
    audience: jwtAudience,
    expiresIn: 1 * 60,
  });
}

export function JwtDecrypt(token: string): any {
  return jwt.verify(token, jwtSecretKey);
}

export function JwtView(token: string): any {
  return jwt.decode(token);
}