import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

import { GlobalService } from '../services/global.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const statusCode = exception.getStatus();
    let body: any = exception.getResponse();

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