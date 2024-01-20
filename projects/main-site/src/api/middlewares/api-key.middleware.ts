import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Equal } from 'typeorm';

import { environment } from '../../environments/api/environment';

import { UserModel } from '../../models/req-res.model';

import { ApiKeyService } from '../repository/api-key.service';
import { UserService } from '../repository/user.service';

import { GlobalService } from '../services/global.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {

  constructor(
    private aks: ApiKeyService,
    private gs: GlobalService,
    private userRepo: UserService
  ) {
    //
  }

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    const key = (req.cookies[environment.apiKeyName] || req.headers['x-api-key'] || req.body.key || req.query['key'] || '').toString();
    const clientOriginIpCc = this.aks.getOriginIpCc(req);
    this.gs.log('[API_KEY_MIDDLEWARE-ORIGIN_KEY] 🌸', `${key} @ ${clientOriginIpCc.origin_ip}`);
    if (!req.originalUrl.includes('/api')) {
      res.locals['user'] = null;
      next();
    } else {
      res.locals['key'] = key;
      const check = await this.aks.checkKey(clientOriginIpCc.origin_ip, key);
      if (check.allowed) {
        let user: UserModel = check.user;
        if (user) {
          try {
            user = await this.userRepo.findOneOrFail({
              where: [
                { id: Equal(user.id) }
              ],
              relations: ['kartu_tanda_penduduk_', 'profile_']
            });
          } catch (error) {
            user = null;
          }
        }
        res.locals['user'] = user;
        next();
      } else {
        throw new HttpException({
          info: '🙄 401 - API Key :: Kunci Tidak Dapat Digunakan 😪',
          result: {
            key,
            origin: clientOriginIpCc.origin_ip,
            country: clientOriginIpCc.country_code,
            message: `Api Key Salah / Tidak Terdaftar!`
          }
        }, HttpStatus.UNAUTHORIZED);
      }
    }
  }

}
