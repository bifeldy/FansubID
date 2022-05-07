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
    const key = req.query['key'] || '';
    const origin = this.aks.getOriginIp(req);
    this.gs.log('[API_KEY_MIDDLEWARE-ORIGIN_KEY] 🌸', `${key} @ ${origin}`);
    const isAllowed = await this.aks.checkKey(origin, key as any);
    if (isAllowed) {
      return next();
    }
    throw new HttpException({
      info: '🙄 401 - API Key :: Kunci Tidak Dapat Digunakan 😪',
      result: {
        message: `💩 Api Key Salah / Tidak Terdaftar! 🤬`
      }
    }, HttpStatus.UNAUTHORIZED);
  }

}
