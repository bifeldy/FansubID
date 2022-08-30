import { Controller, HttpCode, HttpException, HttpStatus, Get, Req, Res } from '@nestjs/common';
import { Equal, ILike } from 'typeorm';
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
      for (const m of mailboxs) {
        delete m.html;
        delete m.text;
        if ('attachment_' in m && m.attachment_) {
          for (const a of m.attachment_) {
            delete a.created_at;
            delete a.updated_at;
          }
        }
      }
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

  @Get('/:id')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const mailbox = await this.mailboxRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ],
        relations: ['attachment_'],
      });
      if (
        !mailbox.from.includes(`${user.username}@${environment.domain}`) &&
        !mailbox.to.includes(`${user.username}@${environment.domain}`) &&
        !mailbox.cc.includes(`${user.username}@${environment.domain}`) &&
        !mailbox.bcc.includes(`${user.username}@${environment.domain}`)
      ) {
        throw new HttpException({
          info: `🙄 400 - Mail Inbox API :: Gagal Mendapatkan Email 😪`,
          result: {
            message: 'Email Milik Orang Lain!'
          }
        }, HttpStatus.FORBIDDEN);
      }
      if ('attachment_' in mailbox && mailbox.attachment_) {
        for (const a of mailbox.attachment_) {
          delete a.created_at;
          delete a.updated_at;
        }
      }
      return {
        info: `😅 200 - Mail Inbox API :: Detail ${req.params['id']} 🤣`,
        result: mailbox
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Mail Inbox API :: Gagal Mencari Email ${req.params['id']} 😪`,
        result: {
          message: 'Email Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
