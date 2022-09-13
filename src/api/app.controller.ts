// NodeJS Library
import { readdirSync } from 'node:fs';

import { Controller, Get, HttpCode, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { environment } from '../environments/api/environment';

import { GlobalService } from './services/global.service';

@Controller('/')
export class AppController {

  constructor(
    private gs: GlobalService
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
      url: '/docs',
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

  @Get('/img-seasonal-backdrop')
  async resetPassword(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    try {
      const currDate = new Date();
      const season = this.gs.seasonal.find(sB => sB.id === Math.ceil((currDate.getMonth() + 1) / 3)).name;
      const files = readdirSync(`${environment.viewFolder}/assets/img/`, { withFileTypes: true });
      const fIdx = files.findIndex(f => f.name.includes(`backdrop-${season}`.toLowerCase()));
      if (fIdx >= 0) {
        return res.download(`${environment.viewFolder}/assets/img/${files[fIdx].name}`, files[fIdx].name, async (e) => {
          if (e) {
            this.gs.log('[RES_DOWNLOAD_IMAGE_BACKDROP-ERROR] 🔻', e, 'error');
          }
        });
      }
      throw new Error('Lampiran Tidak Ditemukan!');
    } catch (error) {
      return res.download(`${environment.viewFolder}/assets/img/backdrop-null.png`, 'backdrop-null.png', async (e) => {
        if (e) {
          this.gs.log('[RES_DOWNLOAD_IMAGE_BACKDROP-ERROR] 🔻', e, 'error');
        }
      });
    }
  }

  // @Post('/reset-password')
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
