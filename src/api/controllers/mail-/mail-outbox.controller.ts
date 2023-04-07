import { Controller, HttpCode, HttpException, HttpStatus, Get, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { ILike } from 'typeorm';
import { Request, Response } from 'express';

import { environment } from '../../../environments/api/environment';

import { RoleModel, UserModel } from '../../../models/req-res.model';

import { Roles } from '../../decorators/roles.decorator';
import { VerifiedOnly } from '../../decorators/verified.decorator';

import { MailboxService } from '../../repository/mailbox.service';

@ApiExcludeController()
@Controller('/mail-outbox')
export class MailOutboxController {

  constructor(
    private mailboxRepo: MailboxService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async mailOutbox(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [mailboxs, count] = await this.mailboxRepo.findAndCount({
        where: [
          {
            subject: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`),
            from: ILike(`%${user.username}@${environment.mailTrap.domain}%`)
          }
        ],
        order: {
          date: 'DESC'
        },
        relations: ['attachment_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const m of mailboxs) {
        delete m.html;
        delete m.text;
        (m as any).attachment_count = m.attachment_.length;
        delete m.attachment_;
      }
      return {
        info: '😍 200 - Mail Outbox API :: Outbox Email 🥰',
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: mailboxs
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Mail Outbox API :: Gagal Mendapatkan Outbox Email 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
