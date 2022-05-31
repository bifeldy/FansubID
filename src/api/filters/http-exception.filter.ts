import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

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

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getResponse<Request>();
    const res = ctx.getResponse<Response>();

    const statusCode = exception.getStatus();
    let body: any = exception.getResponse();

    if (statusCode === HttpStatus.UNAUTHORIZED) {
      const socketId = req.header('X-Socket-Id') || '';
      if (socketId) {
        this.sis.disconnectRoom(this.sis.getClientSocket(socketId));
      }
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