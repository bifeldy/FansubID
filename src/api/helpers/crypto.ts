import { SHA512 } from 'crypto-js';
import { sign, verify, decode } from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

import { environment } from '../../environments/api/environment';

export function hashPassword(password: string): string {
  return SHA512(password).toString();
}

const jwtAlgorithm = 'HS512';
const jwtIssuer = 'Bifeldy';
const jwtAudience = environment.siteName;
const jwtSecretKey = hashPassword(environment.jwtSecretKey);
const jwtExpiredIn = 24 * 60 * 60;

export function CredentialEncode(data: any, rememberMe = false): any {
  return sign(data, jwtSecretKey, {
    algorithm: jwtAlgorithm,
    issuer: jwtIssuer,
    audience: jwtAudience,
    expiresIn: rememberMe === true ? (7 * 24 * 60 * 60) : jwtExpiredIn,
  });
}

export function CredentialDecode(req: Request, res: Response, next: NextFunction): any {
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
      const decoded: {} = verify(token, jwtSecretKey);
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

export function JwtEncrypt(data, expTimeSecond = 3 * 60): any {
  return sign(data, jwtSecretKey, {
    algorithm: jwtAlgorithm,
    issuer: jwtIssuer,
    audience: jwtAudience,
    expiresIn: expTimeSecond,
  });
}

export function JwtDecrypt(token: string): any {
  return verify(token, jwtSecretKey);
}

export function JwtView(token: string): any {
  return decode(token);
}
