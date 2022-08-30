import { Controller, HttpCode, HttpException, HttpStatus, Get, Req, Res } from '@nestjs/common';
import { ILike } from 'typeorm';
import { Request, Response } from 'express';

import { environment } from '../../../environments/api/environment';

import { RoleModel, UserModel } from '../../../models/req-res.model';

import { Roles } from '../../decorators/roles.decorator';
import { VerifiedOnly } from '../../decorators/verified.decorator';

import { MailboxService } from '../../repository/mailbox.service';

@Controller('/mail-inbox')
export class MailInboxController {

  constructor(
    private mailboxRepo: MailboxService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async mailInbox(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [mailboxs, count] = await this.mailboxRepo.findAndCount({
        where: [
          {
            subject: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            to: ILike(`%${user.username}@${environment.domain}%`)
          },
          {
            subject: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            cc: ILike(`%${user.username}@${environment.domain}%`)
          },
          {
            subject: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            bcc: ILike(`%${user.username}@${environment.domain}%`),
          }
        ],
        order: {
          date: 'DESC'
        },
        relations: ['attachment_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      return {
        info: '😍 200 - Mail Inbox API :: All Email 🥰',
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: mailboxs
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Mail Inbox API :: Gagal Mendapatkan All Email 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
