// NodeJS Library
import { createReadStream, readdirSync } from 'node:fs';

import { Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AnyFilesInterceptor, } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { ILike, In } from 'typeorm';

import { CONSTANTS } from '../../../constants';

import { environment } from '../../../environments/api/environment';

import { FilterApiKeyAccess } from '../../decorators/filter-api-key-access.decorator';

import { AttachmentService } from '../../repository/attachment.service';
import { MailboxService } from '../../repository/mailbox.service';
import { UserService } from '../../repository/user.service';

import { GdriveService } from '../../services/gdrive.service';
import { GlobalService } from '../../services/global.service';

@ApiExcludeController()
@Controller('/mail-webhook')
export class MailWebhookController {

  constructor(
    private gdrive: GdriveService,
    private gs: GlobalService,
    private attachmentRepo: AttachmentService,
    private mailboxRepo: MailboxService,
    private userRepo: UserService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  @FilterApiKeyAccess()
  @UseInterceptors(
    AnyFilesInterceptor(
      {
        dest: environment.uploadFolder,
        limits: {
          fileSize: CONSTANTS.fileSizeAttachmentChunkCloudflareLimit
        }
      }
    )
  )
  async mailHook(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('From' in req.body) {
        let stringRecipient = '';
        if (req.body.To) {
          if (stringRecipient !== '') {
            stringRecipient += ', ';
          }
          stringRecipient += req.body.To.split(',').map(v => v.trim()).join(', ');
        }
        if (req.body.Cc) {
          if (stringRecipient !== '') {
            stringRecipient += ', ';
          }
          stringRecipient += req.body.Cc.split(',').map(v => v.trim()).join(', ');
        }
        if (req.body.Bcc) {
          if (stringRecipient !== '') {
            stringRecipient += ', ';
          }
          stringRecipient += req.body.Bcc.split(',').map(v => v.trim()).join(', ');
        }
        const userTarget = [];
        for (const recipient of stringRecipient.split(', ')) {
          if (recipient.includes(`@${environment.mailTrap.domain}`)) {
            let email = recipient;
            if (recipient.includes('<') && recipient.includes('>')) {
              email = recipient.split('<')[1].split('>')[0];
            }
            userTarget.push(email.split('@')[0]);
          }
        }
        const userTargetSorted = userTarget.sort();
        const users = await this.userRepo.find({
          where: [
            { username: In(userTargetSorted) }
          ]
        });
        if (users.length === 0) {
          throw new HttpException({
            info: `🙄 404 - Mail Webhook API :: Gagal Menyimpan Email 😪`,
            result: {
              message: 'Pengguna Tidak Terdaftar!'
            }
          }, HttpStatus.NOT_FOUND);
        }
        const mailboxs = await this.mailboxRepo.find({
          where: [
            { mail: ILike(`%${req.body['Message-Id']}%`) },
            {
              from: ILike(req.body.From),
              subject: ILike(req.body.Subject),
              html: ILike(req.body['body-html']),
              text: ILike(req.body['body-plain']),
              date: new Date(req.body.Date)
            }
          ]
        });
        let mailbox = null;
        if (mailboxs.length <= 0) {
          mailbox = this.mailboxRepo.new();
        } else if (mailboxs.length === 1) {
          mailbox = mailboxs[0];
        } else {
          throw new Error('Data Duplikat');
        }
        mailbox.mail = req.body['Message-Id'];
        mailbox.from = req.body.From;
        mailbox.to = req.body.To;
        mailbox.cc = req.body.Cc;
        mailbox.bcc = req.body.Bcc;
        mailbox.subject = req.body.Subject;
        mailbox.html = req.body['body-html'];
        mailbox.text = req.body['body-plain'];
        mailbox.date = new Date(req.body.Date);
        let mailboxSave = await this.mailboxRepo.save(mailbox);
        if (req.files?.length > 0) {
          let attachments = [];
          for (const file of req.files as any) {
            const fileExt = file.originalname.split('.').pop().toLowerCase();
            const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
            const fIdx = files.findIndex(f => f.name === file.filename || f.name === `${file.filename}.${fileExt}`);
            if (fIdx >= 0) {
              const attachment = this.attachmentRepo.new();
              attachment.pending = true;
              attachment.name = file.filename;
              attachment.ext = fileExt;
              attachment.size = file.size;
              attachment.mime = file.mimetype;
              const resAttachmentSave = await this.attachmentRepo.save(attachment);
              attachments.push(resAttachmentSave);
              // Upload Attachment -- Jpg, Png, etc
              if (environment.production) {
                this.gdrive.gDrive(true).then(async (gdrive) => {
                  const dfile = await gdrive.files.create({
                    requestBody: {
                      name: `${resAttachmentSave.name}.${resAttachmentSave.ext}`,
                      parents: [environment.gCloudPlatform.gDrive.folder_id],
                      mimeType: resAttachmentSave.mime
                    },
                    media: {
                      mimeType: resAttachmentSave.mime,
                      body: createReadStream(`${environment.uploadFolder}/${files[fIdx].name}`)
                    },
                    fields: 'id'
                  }, { signal: null });
                  resAttachmentSave.google_drive = dfile.data.id;
                  resAttachmentSave.pending = false;
                  await this.attachmentRepo.save(resAttachmentSave);
                  this.gs.deleteAttachment(files[fIdx].name);
                }).catch(async (e) => {
                  this.gs.log('[GDRIVE-ERROR] 💽', e, 'error');
                  resAttachmentSave.pending = false;
                  await this.attachmentRepo.save(resAttachmentSave);
                });
              }
            }
          }
          mailboxSave.attachment_ = attachments;
        }
        mailboxSave = await this.mailboxRepo.save(mailboxSave);
        return {
          info: '😍 201 - Mail Webhook API :: Receive New Email 🥰',
          header: req.headers,
          body: req.body,
          result: mailboxSave
        };
      }
      throw 'Data Tidak Lengkap!';
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 400 - Mail Webhook API :: Gagal Mencatat Email 😪`,
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
