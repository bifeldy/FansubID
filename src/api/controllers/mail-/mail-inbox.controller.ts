import { Controller, HttpCode, HttpException, HttpStatus, Get, Req, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ILike } from 'typeorm';
import { Request, Response } from 'express';

import { CONSTANTS } from '../../../constants';

import { environment } from '../../../environments/api/environment';

import { RoleModel, UserModel } from '../../../models/req-res.model';

import { Roles } from '../../decorators/roles.decorator';
import { VerifiedOnly } from '../../decorators/verified-only.decorator';

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
  @ApiTags(CONSTANTS.apiTagMail)
  @ApiQuery({ name: 'q', required: false, type: 'string' })
  @ApiQuery({ name: 'row', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async mailInbox(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      const user: UserModel = res.locals['user'];
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [mailboxs, count] = await this.mailboxRepo.findAndCount({
        where: [
          {
            subject: ILike(`%${searchQuery}%`),
            to: ILike(`%${user.username}@${environment.mailTrap.domain}%`)
          },
          {
            subject: ILike(`%${searchQuery}%`),
            cc: ILike(`%${user.username}@${environment.mailTrap.domain}%`)
          },
          {
            subject: ILike(`%${searchQuery}%`),
            bcc: ILike(`%${user.username}@${environment.mailTrap.domain}%`),
          }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            date: 'DESC'
          })
        },
        relations: ['attachment_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const m of mailboxs) {
        if (user.role !== RoleModel.ADMIN && user.role !== RoleModel.MODERATOR) {
          if (m.bcc?.includes(`${user.username}@${environment.mailTrap.domain}`)) {
            m.bcc = `${user.username}@${environment.mailTrap.domain}`;
          } else {
            m.bcc = null;
          }
        }
        if ('attachment_' in m && m.attachment_) {
          (m as any).attachment_count = m.attachment_.length;
        } else {
          (m as any).attachment_count = 0;
        }
        delete m.html;
        delete m.text;
        delete m.attachment_;
      }
      return {
        info: '😍 200 - Mail Inbox API :: Inbox Email 🥰',
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: mailboxs
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Mail Inbox API :: Gagal Mendapatkan Inbox Email 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
