import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

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
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const statusCode = exception.getStatus();
    let body: any = exception.getResponse();

    this.gs.log(`[HTTP_EXCEPTION-RESPONSE_HEADER_${statusCode}] 🏹`, res.getHeaders());
    if (req.query['xml'] === 'true') {
      this.gs.log('[HTTP_EXCEPTION-RESPONSE_BODY_JSON_2_XML] 🏹', body);
      res.set('Content-Type', 'application/xml');
      body = this.gs.OBJ2XML(body);
    }
    this.gs.log(`[HTTP_EXCEPTION-RESPONSE_BODY_${statusCode}] 🏹`, body);
    res.status(statusCode).send(body);
  }

}