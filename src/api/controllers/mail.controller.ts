// 3rd Party Library
import { Mail } from 'mailtrap';

import { Controller, HttpCode, HttpException, HttpStatus, Get, Req, Res, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiBody, ApiExcludeEndpoint, ApiParam, ApiTags } from '@nestjs/swagger';
import { Equal, ILike } from 'typeorm';
import { Request, Response } from 'express';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified.decorator';

import { MailboxService } from '../repository/mailbox.service';

import { GlobalService } from '../services/global.service';
import { MailService } from '../services/mail.service';
import { CONSTANTS } from '../../constants';

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
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async mailInbox(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [mailboxs, count] = await this.mailboxRepo.findAndCount({
        where: [
          { from: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) },
          { to: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) },
          { subject: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) },
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

  // Special API Limit => 1 / 4
  @Throttle(25, 3600)
  @Post('/')
  @HttpCode(201)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  @ApiTags(CONSTANTS.apiTagMail)
  @ApiBody({
    schema: {
      properties: {
        to: {
          type: 'array',
          items: { type: 'string' }
        },
        cc: {
          type: 'array',
          items: { type: 'string' }
        },
        bcc: {
          type: 'array',
          items: { type: 'string' }
        },
        subject: { type: 'string' },
        message: { type: 'string' }
      },
      required: ['to', 'subject', 'message']
    }
  })
  async sendNewMail(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (
        'to' in req.body && Array.isArray(req.body.to) && req.body.to.length > 0 &&
        'subject' in req.body &&
        'message' in req.body
      ) {
        const user: UserModel = res.locals['user'];
        const mailbox = this.mailboxRepo.new();
        mailbox.from = `${user.kartu_tanda_penduduk_.nama} <${user.username}@${environment.mailTrap.domain}>`;
        mailbox.to = [...new Set<string>(req.body.to)].join(', ');
        if (!mailbox.to.match(CONSTANTS.regexEmailMulti)) {
          throw new Error('Alamat Tidak Valid!');
        }
        mailbox.subject = req.body.subject;
        mailbox.html = req.body.message;
        mailbox.text = this.gs.htmlToText(req.body.message);
        const mailBody: Mail = {
          from: {
            name: user.kartu_tanda_penduduk_.nama,
            email: `${user.username}@${environment.mailTrap.domain}`
          },
          to: [...new Set<string>(req.body.to)].map(to => {
            if (!to.match(CONSTANTS.regexEmail)) {
              throw new Error('Alamat Tidak Valid!');
            }
            return { email: to };
          }),
          category: 'User Mail',
          subject: mailbox.subject,
          html: mailbox.html,
          text: mailbox.text
        };
        if ('cc' in req.body && req.body.cc && Array.isArray(req.body.cc) && req.body.cc.length > 0) {
          const ccs = [...new Set<string>(req.body.cc)];
          mailbox.cc = ccs.join(', ');
          mailBody.cc = ccs.map(cc => {
            if (!cc.match(CONSTANTS.regexEmail)) {
              throw new Error('Alamat Tidak Valid!');
            }
            return { email: cc };
          });
        }
        if ('bcc' in req.body && req.body.bcc && Array.isArray(req.body.bcc) && req.body.bcc.length > 0) {
          const bccs = [...new Set<string>(req.body.bcc)];
          mailbox.bcc = bccs.join(', ');
          mailBody.bcc = bccs.map(bcc => {
            if (!bcc.match(CONSTANTS.regexEmail)) {
              throw new Error('Alamat Tidak Valid!');
            }
            return { email: bcc };
          });
        }
        const mailSend = await this.ms.mailTrapSend(mailBody);
        if (mailSend) {
          mailbox.mail = mailSend.message_ids[0];
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
  @ApiTags(CONSTANTS.apiTagMail)
  @ApiParam({ name: 'id', type: 'string' })
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
        !mailbox.from.includes(`${user.username}@${environment.mailTrap.domain}`) &&
        !mailbox.to.includes(`${user.username}@${environment.mailTrap.domain}`) &&
        !mailbox.cc?.includes(`${user.username}@${environment.mailTrap.domain}`) &&
        !mailbox.bcc?.includes(`${user.username}@${environment.mailTrap.domain}`) &&
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
