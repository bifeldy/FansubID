// NodeJS Library
import { createReadStream, readdirSync } from 'node:fs';

import { Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AnyFilesInterceptor, } from '@nestjs/platform-express';
import { SchedulerRegistry } from '@nestjs/schedule';
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
import { MailService } from '../../services/mail.service';

@ApiExcludeController()
@Controller('/mail-webhook')
export class MailWebhookController {

  constructor(
    private sr: SchedulerRegistry,
    private gdrive: GdriveService,
    private gs: GlobalService,
    private attachmentRepo: AttachmentService,
    private mailboxRepo: MailboxService,
    private userRepo: UserService,
    private ms: MailService
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
        let addressTo: string[] = [];
        if (req.body.To) {
          addressTo = req.body.To.split(',').map(v => {
            let email = v.trim();
            if (email.includes('<') && email.includes('>')) {
              email = email.split('<')[1].split('>')[0];
            }
            return email;
          });
        }
        let addressCc: string[] = [];
        if (req.body.Cc) {
          addressCc = req.body.To.split(',').map(v => {
            let email = v.trim();
            if (email.includes('<') && email.includes('>')) {
              email = email.split('<')[1].split('>')[0];
            }
            return email;
          });
        }
        let addressBcc: string[] = [];
        if (req.body.Bcc) {
          addressBcc = req.body.To.split(',').map(v => {
            let email = v.trim();
            if (email.includes('<') && email.includes('>')) {
              email = email.split('<')[1].split('>')[0];
            }
            return email;
          });
        }
        const userTarget = [];
        for (const address of [...addressTo, ...addressCc, ...addressBcc]) {
          if (address.includes(`@${environment.mailTrap.domain}`)) {
            userTarget.push(address.split('@')[0]);
          }
        }
        const users = await this.userRepo.find({
          where: [
            { username: In(userTarget) }
          ]
        });
        if (users.length === 0) {
          throw new HttpException({
            info: `🙄 404 - Mail Webhook API :: Gagal Menyimpan Email 😪`,
            result: {
              message: 'Tidak Ada Pengguna Yang Terdaftar!'
            }
          }, HttpStatus.NOT_FOUND);
        }
        let mailboxSave = null;
        while (!mailboxSave) {
          try {
            const mailboxs = await this.mailboxRepo.find({
              where: [
                { mail: ILike(`%${req.body['Message-Id']}%`) }
              ]
            });
            if (mailboxs.length === 0) {
              let mailbox = this.mailboxRepo.new();
              mailbox.mail = req.body['Message-Id'];
              mailbox.from = req.body.From;
              if (addressTo.length > 0) {
                mailbox.to = addressTo.join(', ');
              }
              if (addressCc.length > 0) {
                mailbox.cc = addressCc.join(', ');
              }
              if (addressBcc.length > 0) {
                mailbox.bcc = addressBcc.join(', ');
              }
              mailbox.subject = req.body.Subject;
              mailbox.html = req.body['body-html'];
              mailbox.text = req.body['body-plain'];
              mailbox.date = new Date(req.body.Date);
              mailboxSave = await this.mailboxRepo.insert(mailbox);
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
            } else {
              mailboxSave = mailboxs[0];
              if (addressBcc.length > 0) {
                if (!this.ms.webhook[mailboxSave.mail]) {
                  this.ms.webhook[mailboxSave.mail] = {};
                }
                if (!this.ms.webhook[mailboxSave.mail].bcc) {
                  this.ms.webhook[mailboxSave.mail].bcc = '';
                }
                if (mailboxSave.bcc) {
                  this.ms.webhook[mailboxSave.mail].bcc += mailboxSave.bcc + ', ';
                }
                this.ms.webhook[mailboxSave.mail].bcc += addressBcc.join(', ');
                if (this.ms.webhook[mailboxSave.mail].timeout) {
                  this.sr.deleteTimeout(mailboxSave.mail);
                }
                this.ms.webhook[mailboxSave.mail].timeout = true;
                this.sr.addTimeout(
                  mailboxSave.mail,
                  setTimeout(async () => {
                    try {
                      await this.mailboxRepo.update({
                        mail: ILike(`%${req.body['Message-Id']}%`)
                      }, {
                        bcc: this.ms.webhook[mailboxSave.mail].bcc
                      });
                      delete this.ms.webhook[mailboxSave.mail];
                    } catch (err) {
                      this.gs.log('[MAIL_WEBHOOK_TIMEOUT-ERROR] 📧', err, 'error');
                    }
                  }, CONSTANTS.timeoutMailWebhookTime)
                );
              }
              if (req.files?.length > 0) {
                for (const file of req.files as any) {
                  const fileExt = file.originalname.split('.').pop().toLowerCase();
                  const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
                  const fIdx = files.findIndex(f => f.name === file.filename || f.name === `${file.filename}.${fileExt}`);
                  if (fIdx >= 0) {
                    this.gs.deleteAttachment(files[fIdx].name);
                  }
                }
              }
            }
          } catch(e) {
            this.gs.log('[MAIL_WEBHOOK_INSERT-ERROR] 📧', e, 'error');
          }
        }
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
