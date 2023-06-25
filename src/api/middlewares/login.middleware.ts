import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Equal, ILike } from 'typeorm';

import { environment } from '../../environments/api/environment';

import { SosMedModel } from '../../models/req-res.model';

import { ApiService } from '../services/api.service';
import { CryptoService } from '../services/crypto.service';
import { GlobalService } from '../services/global.service';
import { AuthService } from '../services/auth.service';

import { ApiKeyService } from '../repository/api-key.service';
import { UserService } from '../repository/user.service';
import { SocialMediaService } from '../repository/social-media.service';

@Injectable()
export class LoginMiddleware implements NestMiddleware {

  constructor(
    private api: ApiService,
    private aks: ApiKeyService,
    private as: AuthService,
    private cs: CryptoService,
    private gs: GlobalService,
    private userRepo: UserService,
    private sosmedRepo: SocialMediaService
  ) {
    //
  }

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    try {
      if ('userNameOrEmail' in req.body && 'password' in req.body) {
        const reqBodyPassword = this.cs.hashPassword(req.body.password);
        let selectedUser = await this.userRepo.findOneOrFail({
          where: [
            { username: ILike(req.body.userNameOrEmail), password: Equal(reqBodyPassword) },
            { email: ILike(req.body.userNameOrEmail), password: Equal(reqBodyPassword) }
          ]
        });
        const banned = await this.as.isAccountBanned(selectedUser.id);
        if (banned) {
          throw new HttpException({
            info: '🙄 403 - Banned :: Akun Dikunci 😪',
            result: {
              message: `Akun Tidak Dapat Digunakan :: ${banned.reason}`
            }
          }, HttpStatus.FORBIDDEN);
        }
        if (selectedUser.verified) {
          const sosmeds = await this.sosmedRepo.find({
            where: [
              {
                user_: {
                  id: Equal(selectedUser.id)
                }
              }
            ],
            relations: ['user_']
          });
          let sosmedAllOk = sosmeds.length <= 0;
          for (const s of sosmeds) {
            let sosmedSelectedOk = false;
            const form = new URLSearchParams();
            form.append('grant_type', 'refresh_token');
            form.append('refresh_token', s.refresh_token);
            if (s.type === SosMedModel.DISCORD) {
              const url = new URL(`${environment.discord.api_uri}/oauth2/token`);
              form.append('client_id', environment.discord.client_id);
              form.append('client_secret', environment.discord.client_secret);
              const res_raw = await this.api.postData(url, form, environment.nodeJsXhrHeader);
              if (res_raw.ok) {
                const res_json: any = await res_raw.json();
                // Discord OAuth2 Revoke The Old One And Get New `refresh_token`
                s.refresh_token = res_json.refresh_token;
                await this.sosmedRepo.save(s);
                sosmedSelectedOk = true;
              }
            } else if (s.type === SosMedModel.GOOGLE) {
              const url = new URL(environment.gCloudPlatform.token_uri);
              form.append('client_id', environment.gCloudPlatform.app.client_id);
              form.append('client_secret', environment.gCloudPlatform.app.client_secret);
              const res_raw = await this.api.postData(url, form, environment.nodeJsXhrHeader);
              if (res_raw.ok) {
                // Google OAuth2 `refresh_token` Will Never Expire Until Manually Revoked
                sosmedSelectedOk = true;
              }
            }
            // TODO :: Other Social Media Platform
            if (!sosmedSelectedOk) {
              await this.sosmedRepo.remove(s);
            }
            sosmedAllOk = sosmedAllOk || sosmedSelectedOk;
          }
          if (!sosmedAllOk) {
            selectedUser.verified = false;
            selectedUser = await this.userRepo.save(selectedUser);
          }
        }
        const { password, session_token, session_origin, ...noPwdSes } = selectedUser;
        const rememberMe = ('rememberMe' in req.body && (req.body.rememberMe === true));
        const clientOriginIpCc = this.aks.getOriginIpCc(req, true);
        selectedUser.session_origin = clientOriginIpCc.origin_ip;
        selectedUser.session_token = this.cs.credentialEncode({ user: noPwdSes }, rememberMe);
        const resUserSave = await this.userRepo.save(selectedUser);
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
