import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { environment } from '../../environments/api/environment';

import { UserModel } from '../../models/req-res.model';

import { ApiKeyService } from '../repository/api-key.service';
import { ConfigService } from '../services/config.service';
import { GlobalService } from '../services/global.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {

  constructor(
    private aks: ApiKeyService,
    private cfg: ConfigService,
    private gs: GlobalService
  ) {
    //
  }

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    const key = (req.cookies[environment.apiKeyName] || req.header['x-api-key'] || req.query['key'] || '').toString();
    const clientOriginIpCc = this.aks.getOriginIpCc(req);
    this.gs.log('[API_KEY_MIDDLEWARE-ORIGIN_KEY] 🌸', `${key} @ ${clientOriginIpCc.origin_ip}`);
    if (!req.originalUrl.includes('/api') || req.originalUrl.includes('/api/aktivasi')) {
      return next();
    }
    if (await this.aks.checkKey(clientOriginIpCc.origin_ip, key)) {
      const user: UserModel = res.locals['user'];
      if (user) {
        if (![user.session_origin, ...this.cfg.domainIpBypass].includes(clientOriginIpCc.origin_ip)) {
          throw new HttpException({
            info: '🙄 401 - API Key :: Sesi Sudah Habis 😪',
            result: {
              message: `🎉 Silahkan Login Ulang ✨`
            }
          }, HttpStatus.UNAUTHORIZED);
        }
      }
      return next();
    }
    throw new HttpException({
      info: '🙄 401 - API Key :: Kunci Tidak Dapat Digunakan 😪',
      result: {
        key,
        origin: clientOriginIpCc.origin_ip,
        country: clientOriginIpCc.country_code,
        message: `💩 Api Key Salah / Tidak Terdaftar! 🤬`
      }
    }, HttpStatus.UNAUTHORIZED);
  }

}
