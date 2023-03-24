// 3rd Party Library
import { AbortController } from 'abort-controller';

// NodeJS Library
import { createReadStream, readdirSync } from 'node:fs';

import { Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AnyFilesInterceptor, } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { In } from 'typeorm';

import { CONSTANTS } from '../../../constants';

import { environment } from '../../../environments/api/environment';

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
      const userTarget = [];
      let stringRecipient = req.body.To;
      if (req.body.Cc) {
        stringRecipient += `, ${req.body.Cc}`;
      }
      if (req.body.Bcc) {
        stringRecipient += `, ${req.body.Bcc}`;
      }
      for (const recipient of stringRecipient.split(', ')) {
        if (recipient.includes(`@${environment.mailGun.domain}`)) {
          let email = recipient;
          if (recipient.includes('<') && recipient.includes('>')) {
            email = recipient.split('<')[1].split('>')[0];
          }
          userTarget.push(email.split('@')[0]);
        }
      }
      const usersCount = await this.userRepo.count({
        where: [
          {
            username: In(userTarget),
            verified: true
          }
        ]
      });
      if (usersCount === 0) {
        throw new HttpException({
          info: `🙄 404 - Mail Webhook API :: Gagal Menyimpan Email 😪`,
          result: {
            message: 'Pengguna Tidak Terdaftar!'
          }
        }, HttpStatus.NOT_FOUND);
      }
      const mailbox = this.mailboxRepo.new();
      mailbox.mail = req.body['Message-Id'];
      mailbox.from = req.body.From;
      mailbox.to = req.body.To;
      mailbox.cc = req.body.Cc;
      mailbox.bcc = req.body.Bcc;
      mailbox.subject = req.body.Subject;
      mailbox.html = req.body['body-html'];
      mailbox.text = req.body['body-plain'];
      mailbox.date = new Date(req.body.Date);
      if (req.files?.length > 0) {
        const abortController = new AbortController();
        let attachments = [];
        for (const file of req.files as any) {
          const attachment = this.attachmentRepo.new();
          attachment.name = file.filename;
          attachment.ext = file.originalname.split('.').pop().toLowerCase();
          attachment.size = file.size;
          attachment.mime = file.mimetype;
          const resAttachmentSave = await this.attachmentRepo.save(attachment);
          const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
          const fIdx = files.findIndex(f => f.name.includes(resAttachmentSave.name));
          if (fIdx >= 0) {
            attachments.push(resAttachmentSave);
            // Upload Attachment -- Jpg, Png, etc
            if (environment.production) {
              this.gdrive.gDrive(true).then(async (gdrive) => {
                const dfile = await gdrive.files.create({
                  requestBody: {
                    name: `${resAttachmentSave.name}.${resAttachmentSave.ext}`,
                    parents: [environment.gdriveFolderId],
                    mimeType: resAttachmentSave.mime
                  },
                  media: {
                    mimeType: resAttachmentSave.mime,
                    body: createReadStream(`${environment.uploadFolder}/${files[fIdx].name}`)
                  },
                  fields: 'id'
                }, { signal: abortController.signal });
                resAttachmentSave.mime = dfile.data.mimeType;
                resAttachmentSave.google_drive = dfile.data.id;
                await this.attachmentRepo.save(resAttachmentSave);
                this.gs.deleteAttachment(files[fIdx].name);
              }).catch(e => this.gs.log('[GDRIVE-ERROR] 💽', e, 'error'));
            }
          } else {
            abortController.abort();
            await this.attachmentRepo.remove(resAttachmentSave);
            for (const a of attachments) {
              if (a.google_drive) {
                this.gdrive.gDrive(true).then(async (gdrive) => {
                  await gdrive.files.delete({ fileId: a.google_drive }, { signal: null });
                }).catch(e => this.gs.log('[GDRIVE-ERROR] 💽', e, 'error'));
              }
              await this.attachmentRepo.remove(a);
            }
            attachments = [];
            throw new HttpException({
              info: `🙄 404 - Mail Webhook API :: Gagal Mencari Lampiran 😪`,
              result: {
                message: 'Lampiran Tidak Ditemukan!'
              }
            }, HttpStatus.NOT_FOUND);
          }
        }
        mailbox.attachment_ = attachments;
      }
      const mailboxSave = await this.mailboxRepo.save(mailbox);
      return {
        info: '😍 201 - Mail Webhook API :: Receive New Email 🥰',
        header: req.headers,
        body: req.body,
        result: mailboxSave
      };
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
