import { HttpException, HttpStatus, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { ApiKeyService } from '../repository/api-key.service';
import { GlobalService } from '../services/global.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {

  constructor(
    private aks: ApiKeyService,
    private gs: GlobalService
  ) {
    //
  }

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    const key = (req.query['key'] || '').toString();
    const clientOriginIpCc = this.aks.getOriginIpCc(req);
    this.gs.log('[API_KEY_MIDDLEWARE-ORIGIN_KEY] 🌸', `${key} @ ${clientOriginIpCc.origin_ip}`);
    if (!req.originalUrl.includes('/api') || req.originalUrl.includes('/api/aktivasi')) {
      return next();
    }
    if (await this.aks.checkKey(clientOriginIpCc.origin_ip, key)) {
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
