import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { environment } from '../../environments/api/environment';

import { GlobalService } from '../services/global.service';
import { SocketIoService } from '../services/socket-io.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  constructor(
    private gs: GlobalService,
    private sis: SocketIoService
  ) {
    //
  }

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const statusCode = exception.getStatus();
    let body: any = exception.getResponse();

    if (statusCode === HttpStatus.UNAUTHORIZED) {
      const socketId = (req.headers['x-socket-id'] || '').toString();
      if (socketId) {
        const socket = await this.sis.getClientSocket(socketId);
        if (socket) {
          await this.sis.disconnectRoom(socket);
        }
      }
      res.cookie(environment.tokenName, 'TOKEN_EXPIRED', {
        httpOnly: true,
        secure: environment.production,
        sameSite: 'strict',
        maxAge: 0,
        domain: environment.domain
      });
    }

    this.gs.log(`[HTTP_EXCEPTION-RESPONSE_HEADER_${statusCode}] 🏹`, res.getHeaders());
    if (res.locals['xml']) {
      this.gs.log('[HTTP_EXCEPTION-RESPONSE_BODY_JSON_2_XML] 🏹', body);
      res.set('Content-Type', 'application/xml');
      body = this.gs.OBJ2XML(body);
    }
    this.gs.log(`[HTTP_EXCEPTION-RESPONSE_BODY_${statusCode}] 🏹`, body);
    res.status(statusCode).send(body);
  }

}