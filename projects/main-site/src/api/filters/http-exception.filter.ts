import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { environment } from '../../environments/api/environment';

import { SocketIoService } from '../services/socket-io.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  constructor(
    private sis: SocketIoService
  ) {
    //
  }

  async catch(exception: HttpException, host: ArgumentsHost): Promise<any> {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const statusCode = exception.getStatus();
    const body: any = exception.getResponse();

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

    res.status(statusCode).send(body);
  }

}