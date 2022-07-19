import { Controller, Delete, Get, HttpCode, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { Roles } from '../../decorators/roles.decorator';
import { VerifiedOnly } from '../../decorators/verified.decorator';

import { RoleModel } from '../../../models/req-res.model';

// import { FansubMemberService } from '../../repository/fansub-member.service';

@Controller('fansub-member')
export class FansubMemberController {

  constructor(
    // private fansubMemberRepo: FansubMemberService
  ) {
    //
  }

  // GET `/api/fansub-member`
  @Get('/')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async getAll(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    // TODO :: Implement
  }

  // POST `/api/fansub-member`
  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async requestJoinFansubMember(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    // TODO :: Implement
  }

  // PUT `/api/fansub-member/:id`
  @Put('/:id')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async approveJoinFansubMember(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    // TODO :: Implement
  }

  // DELETE `/api/fansub-member/:id`
  @Delete('/:id')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async leaveFansubMember(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    // TODO :: Implement
  }

}
