// NodeJS Library
import { readdirSync } from 'node:fs';

import { Controller, Get, HttpCode, Redirect, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { environment } from '../environments/api/environment';

import { FilterApiKeyAccess } from './decorators/filter-api-key-access.decorator';

import { GlobalService } from './services/global.service';

@ApiExcludeController()
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

  @Get('/discord-verifikasi')
  @HttpCode(301)
  @Redirect()
  @FilterApiKeyAccess()
  async discordVerify(): Promise<any> {
    return {
      url: `
        https://discord.com/api/oauth2/authorize
          ?redirect_uri=${encodeURIComponent(`${environment.baseUrl}/verify?app=discord`)}
          &client_id=${environment.discord.client_id}
          &response_type=code
          &scope=${encodeURIComponent('identify email guilds.join')}
      `.replace(/\s+/g, '').trim(),
      statusCode: 301
    };
  }

  @Get('/google-verifikasi')
  @HttpCode(301)
  @Redirect()
  @FilterApiKeyAccess()
  async googleVerify(): Promise<any> {
    return {
      url: `
        ${environment.gCloudPlatform.app.auth_uri}
          ?redirect_uri=${encodeURIComponent(`${environment.baseUrl}/verify?app=google`)}
          &client_id=${environment.gCloudPlatform.app.client_id}
          &prompt=consent&response_type=code
          &scope=${encodeURIComponent(environment.gCloudPlatform.app.scopes.join(' '))}
          &access_type=offline
          &service=lso
          &o2v=2
          &flowName=GeneralOAuthFlow
      `.replace(/\s+/g, '').trim(),
      statusCode: 301
    };
  }

  @Get('/img-seasonal-backdrop')
  @HttpCode(200)
  @FilterApiKeyAccess()
  async resetPassword(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    const currDate = new Date();
    const season = this.gs.seasonal.find(sB => sB.id === Math.ceil((currDate.getMonth() + 1) / 3)).name;
    const files = readdirSync(`${environment.viewFolder}/assets/img/backdrop/`, { withFileTypes: true });
    const fIdx = files.findIndex(f => f.name.includes(`${season}`));
    res.download(`${environment.viewFolder}/assets/img/backdrop/${files[fIdx].name}`, files[fIdx].name, async (e) => {
      if (e) {
        this.gs.log('[RES_DOWNLOAD_IMAGE_BACKDROP-ERROR] 🔻', e, 'error');
      }
    });
  }

}
