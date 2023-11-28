import { Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { GlobalService } from '../services/global.service';

@Injectable()
export class UrlPathMiddleware implements NestMiddleware {

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  async use(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Next() next: NextFunction): Promise<void> {
    const urlPath = req.originalUrl.split('?');
    if (urlPath.length === 1) {
      req.originalUrl = urlPath[0];
    } else {
      let urlQuery = urlPath[1].split('&').sort();
      req.originalUrl = urlPath[0] + '?' + urlQuery.join('&');
    }
    this.gs.log(`[URL_PATH_MIDDLEWARE] ⚡`, req.originalUrl);
    return next();
  }

}
