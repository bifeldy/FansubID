import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { environment } from '../../environments/api/environment';

import { UserModel } from '../../models/req-res.model';

import { ApiKeyService } from '../repository/api-key.service';

import { AuthService } from '../services/auth.service';
import { CryptoService } from '../services/crypto.service';
import { GlobalService } from '../services/global.service';

@Injectable()
export class BannedMiddleware implements NestMiddleware {

  constructor(
    private aks: ApiKeyService,
    private as: AuthService,
    private cs: CryptoService,
    private gs: GlobalService
  ) {
    //
  }

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    let user: UserModel = res.locals['user'];
    const key = res.locals['key'];
    const token = (req.cookies[environment.tokenName] || req.headers.authorization || req.headers['x-access-token'] || req.body.token || req.query['token'] || '').toString();
    let suspicious = false;
    try {
      if (!key) {
        const decoded = this.cs.credentialDecode(token);
        user = await this.as.getUserRequestJwt(decoded.user.id, token);
        if (user) {
          const clientOriginIpCc = this.aks.getOriginIpCc(req, true);
          if (user.session_origin !== clientOriginIpCc.origin_ip) {
            res.cookie(environment.tokenName, 'TOKEN_EXPIRED', {
              httpOnly: true,
              secure: environment.production,
              sameSite: 'strict',
              maxAge: 0,
              domain: environment.domain
            });
            suspicious = true;
          }
        }
      }
      if (!suspicious) {
        this.gs.log('[BANNED_MIDDLEWARE-USER] 🧨', user);
        if (!user) {
          throw new Error('User Not Login!');
        }
        const banned = await this.as.isAccountBanned(user.id);
        if (banned) {
          throw new HttpException({
            info: '🙄 403 - Banned :: Akun Dikunci 😪',
            result: {
              message: `Akun Tidak Dapat Digunakan :: ${banned.reason}`
            }
          }, HttpStatus.FORBIDDEN);
        }
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      res.locals['error'] = error;
    }
    if (suspicious) {
      if (req.headers.accept.includes('application/json')) {
        throw new HttpException({
          info: '💩 401 - Rate Limit :: Sesi Mencurigakan 🤬',
          result: {
            message: 'Silahkan Login Ulang!'
          }
        }, HttpStatus.UNAUTHORIZED);
      } else {
        res.redirect(301, `${environment.baseUrl}/?ngsw-bypass=true`);
      }
    } else {
      res.locals['user'] = user;
      res.locals['token'] = token;
      next();
    }
  }

}
