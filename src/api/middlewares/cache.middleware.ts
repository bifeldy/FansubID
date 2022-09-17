import { CACHE_MANAGER, Inject, Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Cache } from 'cache-manager';

import { JsonCache } from '../../models/req-res.model';

import { GlobalService } from '../services/global.service';

@Injectable()
export class CacheMiddleware implements NestMiddleware {

  constructor(
    @Inject(CACHE_MANAGER) private cm: Cache,
    private gs: GlobalService
  ) {
    //
  }

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    const cacheData: JsonCache = await this.cm.get(req.originalUrl);
    if (cacheData) {
      this.gs.log(`[CACHE_MIDDLEWARE-${req.originalUrl}] ✨`, cacheData);
      let body = cacheData.body;
      if (res.locals['xml']) {
        res.set('Content-Type', 'application/xml');
        body = this.gs.OBJ2XML(cacheData.body);
      }
      res.status(cacheData.status).send(body);
    } else {
      return next();
    }
  }

}
