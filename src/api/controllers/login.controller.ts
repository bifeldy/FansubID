import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { CONSTANTS } from '../../constants';

import { JsonResponse, UserModel } from '../../models/req-res.model';

@Controller('/login')
export class LoginController {

  constructor(
    //
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  @ApiTags(CONSTANTS.apiTagAuthSes)
  @ApiBody({
    schema: {
      properties: {
        userNameOrEmail: { type: 'string' },
        password: { type: 'string' },
        rememberMe: { type: 'boolean' }
      },
      required: ['userNameOrEmail', 'password']
    }
  })
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response): JsonResponse {
    const user: UserModel = res.locals['user'];
    return {
      info: '😚 201 - Login API :: Berhasil Masuk Yeay 🤩',
      result: {
        token: user.session_token
      }
    };
  }

}
