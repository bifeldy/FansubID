import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Equal, ILike } from 'typeorm';

import { environment } from '../../environments/api/environment';

import { CryptoService } from '../services/crypto.service';
import { GlobalService } from '../services/global.service';
import { AuthService } from '../services/auth.service';

import { ApiKeyService } from '../repository/api-key.service';
import { UserService } from '../repository/user.service';

@Injectable()
export class LoginMiddleware implements NestMiddleware {

  constructor(
    private aks: ApiKeyService,
    private as: AuthService,
    private cs: CryptoService,
    private gs: GlobalService,
    private userRepo: UserService
  ) {
    //
  }

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    try {
      if ('userNameOrEmail' in req.body && 'password' in req.body) {
        const reqBodyPassword = this.cs.hashPassword(req.body.password);
        const selectedUser = await this.userRepo.findOneOrFail({
          where: [
            { username: ILike(req.body.userNameOrEmail), password: Equal(reqBodyPassword) },
            { email: ILike(req.body.userNameOrEmail), password: Equal(reqBodyPassword) }
          ]
        });
        const { password, session_token, session_origin, ...noPwdSes } = selectedUser;
        const rememberMe = ('rememberMe' in req.body && (req.body.rememberMe === true));
        const clientOriginIpCc = this.aks.getOriginIpCc(req, true);
        selectedUser.session_origin = clientOriginIpCc.origin_ip;
        selectedUser.session_token = this.cs.credentialEncode({ user: noPwdSes }, rememberMe);
        const resUserSave = await this.userRepo.save(selectedUser);
        const banned = await this.as.isAccountBanned(resUserSave.id);
        if (banned) {
          throw new HttpException({
            info: '🙄 403 - Banned :: Akun Dikunci 😪',
            result: {
              message: `Akun Tidak Dapat Digunakan :: ${banned.reason}`
            }
          }, HttpStatus.FORBIDDEN);
        }
        res.locals['user'] = resUserSave;
        res.cookie(environment.tokenName, resUserSave.session_token, {
          httpOnly: true,
          secure: environment.production,
          sameSite: 'strict',
          expires: new Date(this.cs.jwtView(resUserSave.session_token).exp * 1000),
          domain: environment.domain
        });
        return next();
      }
      throw new Error('Username, Email, atau Password tidak tepat!');
    } catch (error) {
      this.gs.log('[LOGIN_MIDDLEWARE-ERROR] 🎃', error, 'error');
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Authentication API :: Login Gagal! 😪',
        result: {
          message: 'Username, Email, atau Password tidak tepat!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
