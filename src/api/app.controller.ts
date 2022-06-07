import { Controller, Get, HttpCode, Redirect } from '@nestjs/common';

import { environment } from '../environments/api/environment';

@Controller('/')
export class AppController {

  constructor(
    //
  ) {
    //
  }

  // GET @HttpCode(200)
  // GET => REDIRECT @HttpCode(301)
  // POST & PUT @HttpCode(201)
  // PATCH & DELETE @HttpCode(202)

  @Get('/')
  @HttpCode(301)
  @Redirect()
  async index(): Promise<any> {
    return {
      url: '/dokumentasi',
      statusCode: 301
    };
  }

  @Get('/discord-verifikasi')
  @HttpCode(301)
  @Redirect()
  async discordVerify(): Promise<any> {
    return {
      url: `
        https://discord.com/api/oauth2/authorize
          ?redirect_uri=${encodeURIComponent(environment.baseUrl)}%2Fverify%3Fapp%3Ddiscord
          &client_id=${environment.discordClientId}
          &response_type=code
          &scope=identify%20email
      `.replace(/\s+/g, '').trim(),
      statusCode: 301
    };
  }

  // @Post('/reset')
  // async resetPassword(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
  //   const user: UserModel = res.locals['user'];
  //   return {
  //     info: '😚 200 - Reset API :: Berhasil Reset Password Yeay 🤩',
  //     result: {
  //       token: user.session_token
  //     }
  //   };
  // }

}
