import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { UserModel } from '../../models/req-res.model';

@Controller('/login')
export class LoginController {

  constructor(
    //
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response): any {
    const user: UserModel = res.locals['user'];
    return {
      info: '😚 201 - Login API :: Berhasil Masuk Yeay 🤩',
      result: {
        jwtToken: user.session_token
      }
    };
  }

}