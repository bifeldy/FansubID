// NodeJS Library
import cluster from 'node:cluster';

import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request, Response } from 'express';

import { ClusterMasterSlaveService } from '../services/cluster-master-slave.service';
import { ConfigService } from '../services/config.service';
import { GlobalService } from '../services/global.service';

@Injectable()
export class ReqResInterceptor implements NestInterceptor {

  constructor(
    private cms: ClusterMasterSlaveService,
    private cfg: ConfigService,
    private gs: GlobalService
  ) {
    //
  }

  async cfgServerGetMaintenance(): Promise<boolean> {
    if (cluster.isMaster) {
      return this.cfg.serverGetMaintenance();
    } else {
      return await this.cms.sendMessageToMaster('CFG_SERVER_GET_MAINTENANCE', null);
    }
  }

  /** */

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

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
        if (await this.cfgServerGetMaintenance()) {
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
