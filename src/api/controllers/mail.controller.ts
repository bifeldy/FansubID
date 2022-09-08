import { Controller, HttpCode, HttpException, HttpStatus, Get, Req, Res, Post } from '@nestjs/common';
import { Equal, ILike } from 'typeorm';
import { Request, Response } from 'express';

import { environment } from '../../environments/api/environment';

import { MailModel, RoleModel, UserModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified.decorator';

import { MailboxService } from '../repository/mailbox.service';

import { GlobalService } from '../services/global.service';
import { MailService } from '../services/mail.service';

@Controller('/mail')
export class MailController {

  constructor(
    private gs: GlobalService,
    private ms: MailService,
    private mailboxRepo: MailboxService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  async mailInbox(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [mailboxs, count] = await this.mailboxRepo.findAndCount({
        where: [
          { subject: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) }
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
        info: '😍 200 - Mail API :: All Email 🥰',
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: mailboxs
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Mail API :: Gagal Mendapatkan All Email 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  async sendNewMail(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'to' in req.body &&
        'subject' in req.body &&
        'message' in req.body
      ) {
        const user: UserModel = res.locals['user'];
        const mailbox = this.mailboxRepo.new();
        mailbox.from = `${user.username}@${environment.mailGun.domain}`;
        mailbox.to = req.body.to;
        mailbox.subject = req.body.subject;
        mailbox.html = req.body.message;
        mailbox.text = this.gs.htmlToText(req.body.message);
        const mailBody: MailModel = {
          from: mailbox.from,
          to: mailbox.to,
          subject: mailbox.subject,
          html: mailbox.html,
          text: mailbox.text
        };
        if (req.body.cc) {
          mailbox.cc = req.body.cc;
          mailBody.cc = req.body.cc;
        }
        if (req.body.bcc) {
          mailbox.bcc = req.body.bcc;
          mailBody.bcc = req.body.bcc;
        }
        const mailSend = await this.ms.mailGunSend(mailBody);
        if (mailSend) {
          mailbox.mail = mailSend.id;
          mailbox.date = new Date();
          const mailboxSave = await this.mailboxRepo.save(mailbox);
          return {
            info: '🙂 201 - Mail API :: Email Terkirim! 🥰',
            result: mailboxSave
          };
        }
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Mail API :: Gagal Mengirim Email 😪`,
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
        !mailbox.from.includes(`${user.username}@${environment.mailGun.domain}`) &&
        !mailbox.to.includes(`${user.username}@${environment.mailGun.domain}`) &&
        !mailbox.cc.includes(`${user.username}@${environment.mailGun.domain}`) &&
        !mailbox.bcc.includes(`${user.username}@${environment.mailGun.domain}`) &&
        user.role !== RoleModel.ADMIN && user.role !== RoleModel.MODERATOR
      ) {
        throw new HttpException({
          info: `🙄 400 - Mail API :: Gagal Mendapatkan Email 😪`,
          result: {
            message: 'Email Milik Orang Lain!'
          }
        }, HttpStatus.FORBIDDEN);
      }
      if ('attachment_' in mailbox && mailbox.attachment_) {
        for (const a of mailbox.attachment_) {
          delete a.google_drive
          delete a.created_at;
          delete a.updated_at;
        }
      }
      return {
        info: `😅 200 - Mail API :: Detail ${req.params['id']} 🤣`,
        result: mailbox
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Mail API :: Gagal Mencari Email ${req.params['id']} 😪`,
        result: {
          message: 'Email Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
