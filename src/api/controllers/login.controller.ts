import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { UserModel } from '../../models/req-res.model';

@ApiExcludeController()
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
        token: user.session_token
      }
    };
  }

}
