// NodeJS Library
import cluster from 'node:cluster';
import { existsSync, writeFileSync, createReadStream, readdirSync } from 'node:fs';

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Equal, In, IsNull } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { AttachmentModel } from '../../models/req-res.model';

import { AttachmentService } from '../repository/attachment.service';
import { BerkasService } from '../repository/berkas.service';

import { GlobalService } from '../services/global.service';
import { DiscordService } from '../services/discord.service';
import { GdriveService } from '../services/gdrive.service';
import { MkvExtractService } from '../services/mkv-extract.service';

@Injectable()
export class UploadService {

  constructor(
    private sr: SchedulerRegistry,
    private attachmentRepo: AttachmentService,
    private berkasRepo: BerkasService,
    private gs: GlobalService,
    private ds: DiscordService,
    private gdrive: GdriveService,
    private mkv: MkvExtractService
  ) {
    //
  }

  async uploadSubtitleAndFont(mkvAttachment: AttachmentModel) {
    const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
    const fIdx = files.findIndex(f => f.name === mkvAttachment.name || f.name === `${mkvAttachment.name}.${mkvAttachment.ext}`);
    if (fIdx >= 0) {
      try {
        const gdrive = await this.gdrive.gDrive(true);
        const dfile = await gdrive.files.create({
          requestBody: {
            name: `${mkvAttachment.name}.${mkvAttachment.ext}`,
            parents: [environment.gCloudPlatform.gDrive.folder_id],
            mimeType: mkvAttachment.mime
          },
          media: {
            mimeType: mkvAttachment.mime,
            body: createReadStream(`${environment.uploadFolder}/${mkvAttachment.name}.${mkvAttachment.ext}`)
          },
          fields: 'id'
        }, { signal: null });
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
        this.gs.deleteAttachment(`${mkvAttachment.name}.${mkvAttachment.ext}`);
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

  async extractAndUploadVideoAndZip(attachment: AttachmentModel) {
    const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
    const fIdx = files.findIndex(f => f.name === attachment.name || f.name === `${attachment.name}.${attachment.ext}`);
    if (fIdx >= 0) {
      if (attachment.ext === 'mkv') {
        try {
          const extractedFiles = await this.mkv.mkvExtract(attachment.name, `${environment.uploadFolder}/${files[fIdx].name}`);
          for (const ef of extractedFiles) {
            const fileNameExt = ef.name.split('.');
            const fileExt = fileNameExt.pop().toLowerCase();
            const fileName = fileNameExt.join('.').toLowerCase();
            try {
              const mkvAttachment = this.attachmentRepo.new();
              mkvAttachment.name = fileName;
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
      if (environment.production) {
        try {
          const chunkParent = await this.ds.sendAttachment(attachment);
          attachment.discord = chunkParent;
          attachment.pending = false;
          await this.attachmentRepo.save(attachment);
          this.gs.deleteAttachment(files[fIdx].name);
        } catch (e) {
          this.gs.log('[DISCORD-ERROR] 💽', e, 'error');
          attachment.pending = false;
          await this.attachmentRepo.save(attachment);
        }
      } else {
        attachment.pending = false;
        await this.attachmentRepo.save(attachment);
      }
    } else {
      try {
        attachment.pending = false;
        const resSaveAttachment = await this.attachmentRepo.save(attachment);
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
        this.gs.log('[FILE_VIDEO_ZIP-UPLOAD_ERROR] 🎼', e, 'error');
      }
    }
  }

  @Cron(
    CronExpression.EVERY_5_MINUTES,
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
          if (a.google_drive || a.discord) {
            a.pending = false;
            await this.attachmentRepo.save(a);
          } else if (isVideo) {
            await this.extractAndUploadVideoAndZip(a);
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
    }
  }

}
