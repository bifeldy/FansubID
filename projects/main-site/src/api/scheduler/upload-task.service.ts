// NodeJS Library
import cluster from 'node:cluster';
import { existsSync, writeFileSync, createReadStream, readdirSync } from 'node:fs';

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Equal, In, IsNull, MoreThanOrEqual } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { AttachmentModel, RoleModel } from '../../models/req-res.model';

import { AttachmentService } from '../repository/attachment.service';
import { BerkasService } from '../repository/berkas.service';
import { UserPremiumService } from '../repository/user-premium.service';

import { GlobalService } from '../services/global.service';
import { DiscordService } from '../services/discord.service';
import { GoogleCloudService } from '../services/google-cloud.service';
import { AmazonWebService } from '../services/amazon-web.service';
import { MkvExtractService } from '../services/mkv-extract.service';

@Injectable()
export class UploadService {

  constructor(
    private sr: SchedulerRegistry,
    private attachmentRepo: AttachmentService,
    private berkasRepo: BerkasService,
    private userPremiumRepo: UserPremiumService,
    private gs: GlobalService,
    private ds: DiscordService,
    private gcs: GoogleCloudService,
    private aws: AmazonWebService,
    private mkv: MkvExtractService
  ) {
    //
  }

  async uploadSubtitleAndFont(mkvAttachment: AttachmentModel): Promise<void> {
    const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
    const fIdx = files.findIndex(f => f.name === mkvAttachment.name || f.name === `${mkvAttachment.name}${mkvAttachment.ext ? `.${mkvAttachment.ext}` : ''}`);
    if (fIdx >= 0) {
      try {
        const gdrive = await this.gcs.gDrive(true);
        const dfile = await gdrive.files.create({
          requestBody: {
            name: mkvAttachment.orig || `${mkvAttachment.name}${mkvAttachment.ext ? `.${mkvAttachment.ext}` : ''}`,
            parents: [environment.gCloudPlatform.gDrive.folder_id],
            mimeType: mkvAttachment.mime
          },
          media: {
            mimeType: mkvAttachment.mime,
            body: createReadStream(`${environment.uploadFolder}/${files[fIdx].name}`)
          },
          fields: 'id'
        }, {
          params: {
            uploadType: 'resumable'
          },
          signal: null
        });
        const otherAttachment2 = await this.attachmentRepo.find({
          where: [
            {
              name: Equal(mkvAttachment.name),
              ext: Equal(mkvAttachment.ext),
              google_drive: IsNull()
            }
          ]
        });
        for (const oa of otherAttachment2) {
          oa.google_drive = dfile.data.id;
          oa.pending = false;
        }
        await this.attachmentRepo.save(otherAttachment2);
        this.gs.deleteAttachment(`${mkvAttachment.name}${mkvAttachment.ext ? `.${mkvAttachment.ext}` : ''}`);
      } catch (e3) {
        this.gs.log('[GDRIVE-ERROR] 💽', e3, 'error');
        mkvAttachment.pending = false;
        await this.attachmentRepo.save(mkvAttachment);
      }
    } else {
      try {
        mkvAttachment.pending = false;
        const resSaveMkvAttachment = await this.attachmentRepo.save(mkvAttachment);
        await this.attachmentRepo.remove(resSaveMkvAttachment as any);
      } catch (e) {
        this.gs.log('[FILE_SUBTITLE_FONT-UPLOAD_ERROR] 🎼', e, 'error');
      }
    }
  }

  async uploadVideoAndArchive(attachment: AttachmentModel, fileName: string): Promise<void> {
    if (environment.production) {
      try {
        const primeCount = await this.userPremiumRepo.count({
          where: [
            {
              expired_at: MoreThanOrEqual(new Date()),
              user_: {
                id: Equal(attachment.user_.id)
              }
            }
          ],
          relations: ['user_']
        });
        const paksaAutoDdl = (attachment.size <= CONSTANTS.fileSizeAttachmentAutoDdl && attachment.user_.role !== RoleModel.USER);
        if ((primeCount > 0 || paksaAutoDdl) && attachment.user_.id !== 2 /* TODO :: Hard-coded Bot 'Backup' Account */) {
          const upload = await this.aws.uploadDdl(attachment.user_.id, fileName);
          attachment.aws_s3 = `https://${upload.Location}`;
          attachment.pending = false;
          await this.attachmentRepo.save(attachment);
          this.gs.deleteAttachment(fileName);
        } else {
          const chunkParent = await this.ds.sendAttachment(attachment);
          attachment.discord = chunkParent;
          attachment.pending = false;
          await this.attachmentRepo.save(attachment);
          this.gs.deleteAttachment(fileName);
        }
      } catch (e) {
        this.gs.log('[DDL-ERROR] 💽', e, 'error');
        attachment.pending = false;
        await this.attachmentRepo.save(attachment);
      }
    } else {
      attachment.pending = false;
      await this.attachmentRepo.save(attachment);
    }
  }

  async extractAndUploadVideoAndArchive(attachment: AttachmentModel, fileName: string): Promise<void> {
    if (attachment.ext === 'mkv') {
      try {
        const extractedFiles = await this.mkv.mkvExtract(attachment.name, `${environment.uploadFolder}/${fileName}`);
        for (const ef of extractedFiles) {
          const fileNameExt = ef.name.split('.');
          const fileExt = fileNameExt.length > 1 ? fileNameExt.pop().toLowerCase() : null;
          const fileName = fileNameExt.length > 1 ? fileNameExt.join('.').toLowerCase() : fileNameExt[0];
          try {
            const mkvAttachment = this.attachmentRepo.new();
            mkvAttachment.name = fileName;
            mkvAttachment.orig = ef.name;
            mkvAttachment.ext = fileExt;
            mkvAttachment.size = ef.size;
            mkvAttachment.pending = environment.production;
            mkvAttachment.user_ = attachment.user_;
            mkvAttachment.parent_attachment_ = attachment;
            if (CONSTANTS.extSubs.includes(fileExt)) {
              mkvAttachment.mime = 'text/plain';
            } else if (CONSTANTS.extFonts.includes(fileExt)) {
              mkvAttachment.mime = `font/${fileExt}`;
            } else {
              mkvAttachment.mime = 'application/octet-stream';
            }
            let mkvAttachmentDuplicate = null;
            const otherAttachment1 = await this.attachmentRepo.find({
              where: [
                {
                  name: Equal(fileName),
                  ext: Equal(fileExt)
                }
              ]
            });
            if (otherAttachment1.length > 0) {
              for (const oa of otherAttachment1) {
                mkvAttachmentDuplicate = oa;
                if (oa.google_drive) {
                  break;
                }
              }
            }
            const fileExist = existsSync(`${environment.uploadFolder}/${fileName}.${fileExt}`);
            if (mkvAttachmentDuplicate) {
              mkvAttachment.name = mkvAttachmentDuplicate.name;
              mkvAttachment.orig = mkvAttachmentDuplicate.orig;
              mkvAttachment.ext = mkvAttachmentDuplicate.ext;
              mkvAttachment.size = mkvAttachmentDuplicate.size;
              mkvAttachment.mime = mkvAttachmentDuplicate.mime;
              mkvAttachment.pending = false;
              if (mkvAttachmentDuplicate.google_drive) {
                mkvAttachment.google_drive = mkvAttachmentDuplicate.google_drive;
                this.gs.deleteAttachment(`${fileName}.${fileExt}`);
              } else {
                // Local File Missing
                if (!fileExist) {
                  writeFileSync(`${environment.uploadFolder}/${fileName}.${fileExt}`, ef.data);
                }
              }
            } else {
              // First Time Upload
              if (!fileExist) {
                writeFileSync(`${environment.uploadFolder}/${fileName}.${fileExt}`, ef.data);
              }
            }
            const resMkvAttachmentSave = await this.attachmentRepo.save(mkvAttachment);
            // Upload Video Attachment -- Subtitles, Fonts, etc
            if (resMkvAttachmentSave.pending) {
              await this.uploadSubtitleAndFont(resMkvAttachmentSave);
            }
          } catch (e2) {
            this.gs.log('[FILE_SUBTITLE_FONT-EXTRACT_ERROR] 🎼', e2, 'error');
          }
        }
      } catch (e1) {
        this.gs.log('[MKV_EXTRACT-ERROR] 📂', e1, 'error');
      }
    }
    await this.uploadVideoAndArchive(attachment, fileName);
  }

  @Cron(
    CronExpression.EVERY_10_MINUTES,
    {
      name: CONSTANTS.cronUpload
    }
  )
  async uploadVideo(): Promise<void> {
    if (cluster.isMaster) {
      const job = this.sr.getCronJob(CONSTANTS.cronUpload);
      job.stop();
      const startTime = new Date();
      this.gs.log('[CRON_TASK_UPLOAD-START] 🐾', `${startTime}`);
      try {
        const attachments = await this.attachmentRepo.find({
          where: [
            {
              ext: In([...CONSTANTS.extAttachment, ...CONSTANTS.extFonts, ...CONSTANTS.extSubs]),
              pending: true
            }
          ],
          relations: ['user_']
        });
        for (const a of attachments) {
          const isVideo = CONSTANTS.extAttachment.includes(a.ext);
          const isFontSubs = [...CONSTANTS.extFonts, ...CONSTANTS.extSubs].includes(a.ext);
          if (a.google_drive || a.discord || a.aws_s3) {
            a.pending = false;
            await this.attachmentRepo.save(a);
          } else if (isVideo) {
            const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
            const fIdx = files.findIndex(f => f.name === a.name || f.name === `${a.name}${a.ext ? `.${a.ext}` : ''}`);
            if (fIdx >= 0) {
              a.try_count++;
              const resSaveAttachment = await this.attachmentRepo.save(a);
              if (resSaveAttachment.try_count > 1) {
                await this.uploadVideoAndArchive(resSaveAttachment, files[fIdx].name);
              } else {
                await this.extractAndUploadVideoAndArchive(resSaveAttachment, files[fIdx].name);
              }
            } else {
              try {
                a.pending = false;
                const resSaveAttachment = await this.attachmentRepo.save(a);
                const berkas = await this.berkasRepo.findOneOrFail({
                  where: [
                    {
                      attachment_: {
                        id: Equal(resSaveAttachment.id)
                      }
                    }
                  ],
                  relations: ['attachment_']
                });
                await this.attachmentRepo.remove(resSaveAttachment as any);
                const download_url: any[] = JSON.parse(berkas.download_url);
                if (download_url.length <= 0) {
                  await this.berkasRepo.remove(berkas);
                }
              } catch (e) {
                this.gs.log('[FILE_VIDEO_ARCHIVE-UPLOAD_ERROR] 🎼', e, 'error');
              }
            }
          } else if (isFontSubs) {
            await this.uploadSubtitleAndFont(a);
          } else {
            try {
              await this.attachmentRepo.remove(a);
            } catch (e) {
              this.gs.log('[FILE_ATTACHMENT-ERROR] 🎼', e, 'error');
            }
          }
        }
      } catch (error) {
        this.gs.log('[CRON_TASK_UPLOAD-ERROR] 🐾', error, 'error');
      }
      const endTime = new Date();
      const elapsedTime = endTime.getTime() - startTime.getTime();
      this.gs.log('[CRON_TASK_UPLOAD-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
      job.start();
    } else {
      this.sr.getCronJob(CONSTANTS.cronUpload).stop();
    }
  }

}
