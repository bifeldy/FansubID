import { Controller, Delete, HttpCode, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CONSTANTS } from '../../constants';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';

@Controller('/logout')
export class LogoutController {

  constructor(
    //
  ) {
    //
  }

  @Delete('/')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @ApiTags(CONSTANTS.apiTagAuthSes)
  logout(@Res({ passthrough: true }) res: Response): any {
    const user: UserModel = res.locals['user'];
    return {
      info: '😍 202 - Logout API :: Berhasil Keluar UwUu 🥰',
      result: {
        message: `Sampai Jumpa ${user.username}! (｡>﹏<｡)`
      }
    };
  }

}
