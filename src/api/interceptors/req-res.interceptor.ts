import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request, Response } from 'express';

import { ConfigService } from '../services/config.service';
import { GlobalService } from '../services/global.service';

@Injectable()
export class ReqResInterceptor implements NestInterceptor {

  constructor(
    private cfg: ConfigService,
    private gs: GlobalService
  ) {
    //
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    for (const propName in req.body) {
      if (req.body[propName] === '' || req.body[propName] === undefined || req.body[propName] === null) {
        delete req.body[propName];
      }
    }

    this.gs.log(`[REQ_RES_INTERCEPTOR-REQUEST_HEADER_${req.method}] 🏹`, req.headers);
    this.gs.log(`[REQ_RES_INTERCEPTOR-REQUEST_BODY_${req.method}] 🏹`, req.body);

    switch (req.method) {
      case 'POST':
      // @ts-ignore error TS7029: Fallthrough case in switch.
      case 'PUT':
        if (this.cfg.serverGetMaintenance()) {
          throw new HttpException({
            info: '🤧 503 - Settings API :: Server Maintenance 😷',
            result: {
              message: 'Server Sedang Dalam Tahap Perawatan!'
            }
          }, HttpStatus.SERVICE_UNAVAILABLE);
        }
      case 'GET':
      case 'HEAD':
      case 'PATCH':
      case 'DELETE':
      default:
        break;
    }

    return next.handle().pipe(
      map(body => {
        this.gs.log(`[REQ_RES_INTERCEPTOR-RESPONSE_HEADER_${res.statusCode}] 🏹`, res.getHeaders());
        if (res.locals['xml']) {
          this.gs.log('[REQ_RES_INTERCEPTOR-RESPONSE_BODY_JSON_2_XML] 🏹', req.body);
          res.set('Content-Type', 'application/xml');
          body = this.gs.OBJ2XML(body);
        }
        this.gs.log(`[REQ_RES_INTERCEPTOR-RESPONSE_BODY_${res.statusCode}] 🏹`, body);
        return body;
      })
    );
  }

}
