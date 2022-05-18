import { Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { GlobalService } from '../services/global.service';

@Injectable()
export class UrlXmlMiddleware implements NestMiddleware {

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
      if (req.query['xml'] === 'true') {
        res.locals['xml'] = true;
        delete req.query['xml'];
        urlQuery = urlQuery.filter(x => !x.includes('xml=true'));
      }
      req.originalUrl = urlPath[0] + '?' + urlQuery.join('&');
    }
    this.gs.log(`[XML_MIDDLEWARE-${req.query['xml']}] ⚡`, req.originalUrl);
    return next();
  }

}
