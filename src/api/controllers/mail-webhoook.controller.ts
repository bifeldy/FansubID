import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/mail-webhook')
export class MailWebhookController {

  constructor(
    //
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  verify(@Req() req: Request, @Res({ passthrough: true }) res: Response): any {
    return {
      info: '😍 201 - Mail Webhook API :: Receive New Email 🥰',
      header: req.headers,
      body: req.body
    };
  }

}
