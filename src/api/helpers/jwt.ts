import { Request, Response, NextFunction } from 'express';
import { environment } from '../../environments/environment';

const JWT = require('jsonwebtoken');

const jwtAlgorithm = 'HS512';
const jwtIssuer = 'Bifeldy';
const jwtAudience = environment.siteName;
const jwtSecretKey = `Bifeldy-${jwtAudience}`;
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
    let token = req.headers.authorization || req.headers['x-access-token'] || req.body.token || '';
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    const decoded = JWT.verify(token, jwtSecretKey);
    return { ...decoded, token };
  }
  catch (err) {
    res.status(401).json({
      info: '🤧 401 - Whoops, Akses Ditolak! 😷',
      result: err
    });
  }
}

export default { JwtEncode, JwtDecode };
