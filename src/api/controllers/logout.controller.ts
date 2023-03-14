import { Controller, Delete, HttpCode, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';

@ApiExcludeController()
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
