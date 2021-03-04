import { Request, Response, NextFunction } from 'express';

import { environment } from '../../environments/server/environment';

import CryptoJS from 'crypto-js';
import JWT from 'jsonwebtoken';

const jwtAlgorithm = 'HS512';
const jwtIssuer = 'Bifeldy';
const jwtAudience = environment.siteName;
const jwtSecretKey = CryptoJS.SHA512(environment.jwtSecretKey).toString();
const jwtExpiredIn = 24 * 60 * 60;

function JwtEncode(user: any, rememberMe = false): any {
  return JWT.sign({ user }, jwtSecretKey, {
    algorithm: jwtAlgorithm,
    issuer: jwtIssuer,
    audience: jwtAudience,
    expiresIn: rememberMe === true ? (7 * 24 * 60 * 60) : jwtExpiredIn,
  });
}

function JwtDecode(req: Request, res: Response, next: NextFunction): any {
  try {
    // tslint:disable-next-line: max-line-length
    let token = req.cookies[environment.tokenName] || req.headers.authorization || req.headers['x-access-token'] || req.body.token || req.query.token || '';
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    const decoded: {} = JWT.verify(token, jwtSecretKey);
    return { ...decoded, token };
  } catch (err) {
    console.error(err);
    res.cookie(environment.tokenName, 'TOKEN_EXPIRED', { maxAge: 0 });
    return res.status(401).json({
      info: '🤧 401 - Authentication API :: Whoops, Akses Ditolak 😷',
      result: err
    });
  }
}

function JwtEncrypt(data): any {
  return JWT.sign(data, jwtSecretKey, {
    algorithm: jwtAlgorithm,
    issuer: jwtIssuer,
    audience: jwtAudience,
    expiresIn: 1 * 60,
  });
}

function JwtDecrypt(token: string): any {
  return JWT.verify(token, jwtSecretKey);
}

function JwtView(token: string): any {
  return JWT.decode(token);
}

export default { JwtEncode, JwtDecode, JwtEncrypt, JwtDecrypt, JwtView };
