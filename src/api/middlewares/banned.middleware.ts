import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { environment } from '../../environments/api/environment';

import { UserModel } from '../../models/req-res.model';

import { AuthService } from '../services/auth.service';
import { CryptoService } from '../services/crypto.service';
import { GlobalService } from '../services/global.service';

@Injectable()
export class BannedMiddleware implements NestMiddleware {

  constructor(
    private as: AuthService,
    private cs: CryptoService,
    private gs: GlobalService
  ) {
    //
  }

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    try {
      const decoded = this.cs.credentialDecode(req);
      const user: UserModel = await this.as.getUserRequest(decoded.user.id, decoded.token);
      this.gs.log('[BANNED_MIDDLEWARE-USER] 🧨', user);
      if (!user) {
        throw new Error('User Not Login!');
      }
      const banned = await this.as.isAccountBanned(user.id);
      if (banned) {
        throw new HttpException({
          info: '🙄 403 - Banned :: Akun Dikunci 😪',
          result: {
            message: `💩 Akun Tidak Dapat Digunakan :: ${banned.reason} 🤬`
          }
        }, HttpStatus.FORBIDDEN);
      }
      res.locals['user'] = user;
      res.locals['token'] = decoded.token;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      res.locals['user'] = null;
      res.locals['token'] = req.cookies[environment.tokenName] || req.headers.authorization || req.headers['x-access-token'] || req.body.token || req.query['token'] || '';
      res.locals['error'] = error;
    }
    return next();
  }

}
