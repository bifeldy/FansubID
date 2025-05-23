// NodeJS Library
import { readdirSync } from 'node:fs';

import { Controller, Get, HttpCode, HttpException, HttpStatus, Patch, Post, Req, Res } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ApiExcludeEndpoint, ApiParam, ApiTags } from '@nestjs/swagger';
import { DiskFile } from '@uploadx/core';

import { Request, Response } from 'express';
import { Equal, ILike, IsNull, MoreThanOrEqual } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { AttachmentService } from '../repository/attachment.service';
import { TempAttachmentService } from '../repository/temp-attachment.service';
import { DdlFileService } from '../repository/ddl-file.service';

import { GoogleCloudService } from '../services/google-cloud.service';
import { GlobalService } from '../services/global.service';
import { AmazonWebService } from '../services/amazon-web.service';
import { UserPremiumService } from '../repository/user-premium.service';

@Controller('/attachment')
export class AttachmentController {

  constructor(
    private sr: SchedulerRegistry,
    private attachmentRepo: AttachmentService,
    private gs: GlobalService,
    private gcs: GoogleCloudService,
    private aws: AmazonWebService,
    private ddlFileRepo: DdlFileService,
    private tempAttachmentRepo: TempAttachmentService,
    private userPremiumRepo: UserPremiumService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async searchLampiranPending(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const sqlWhere: any = {
        name: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`)
      };
      if (req.query['failed'] === 'true') {
        sqlWhere.discord = IsNull();
        sqlWhere.google_drive = IsNull();
        sqlWhere.aws_s3 = IsNull();
      }
      const [attachments, count] = await this.attachmentRepo.findAndCount({
        where: [sqlWhere],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            name: 'ASC'
          })
        },
        relations: ['user_', 'parent_attachment_', 'parent_attachment_.user_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const a of attachments) {
        if ('user_' in a && a.user_) {
          delete a.user_.created_at;
          delete a.user_.updated_at;
        }
        if ('parent_attachment_' in a && a.parent_attachment_) {
          delete a.parent_attachment_.created_at;
          delete a.parent_attachment_.updated_at;
        }
      }
      return {
        info: `😅 200 - Attachment API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: attachments
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Attachment API :: Gagal Mendapatkan All Lampiran 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/')
  @HttpCode(201)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async uploadLampiran(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const file = req.body as DiskFile;
    try {
      if (file) {
        const user: UserModel = res.locals['user'];
        const oldDuplicateTempAttachment = await this.tempAttachmentRepo.find({
          where: [
            { name: Equal(file.id) }
          ]
        });
        if (oldDuplicateTempAttachment.length > 0) {
          for (const ota of oldDuplicateTempAttachment) {
            try {
              this.sr.deleteTimeout(`${CONSTANTS.timeoutDeleteTempAttachmentKey}@${ota.id}`);
            } catch (e) {
              this.gs.log('[TEMP_ATTACHMENT_DUPLICATED-ERROR] 🚮', e, 'error');
            }
          }
          await this.tempAttachmentRepo.remove(oldDuplicateTempAttachment);
        }
        const tempAttachment = this.tempAttachmentRepo.new();
        tempAttachment.name = file.id;
        tempAttachment.orig = file.originalName;
        tempAttachment.ext = file.originalName.includes('.') && !file.originalName.endsWith('.') ? file.originalName.split('.').pop().toLowerCase() : null;
        tempAttachment.size = file.size;
        tempAttachment.mime = file.metadata.mimeType;
        tempAttachment.user_ = user;
        const resAttachmentSave = await this.tempAttachmentRepo.save(tempAttachment);
        if ('user_' in resAttachmentSave && resAttachmentSave.user_) {
          delete resAttachmentSave.user_.created_at;
          delete resAttachmentSave.user_.updated_at;
        }
        this.sr.addTimeout(
          `${CONSTANTS.timeoutDeleteTempAttachmentKey}@${resAttachmentSave.id}`,
          setTimeout(async () => {
            try {
              const attachmentToBeDeleted = await this.tempAttachmentRepo.findOneOrFail({
                where: [
                  { id: Equal(resAttachmentSave.id) }
                ]
              });
              this.gs.deleteAttachment(attachmentToBeDeleted.name);
              await this.tempAttachmentRepo.remove(attachmentToBeDeleted);
            } catch (e) {
              this.gs.log('[TEMP_ATTACHMENT_DELETE-ERROR] 🚮', e, 'error');
            }
          }, CONSTANTS.timeoutDeleteTempAttachmentTime)
        );
        return {
          info: `😅 201 - Temp Attachment API :: Harap Lengkapi Data Berkas Dalam ${CONSTANTS.timeoutDeleteTempAttachmentTime / 60 / 1000} Menit 🤣`,
          result: resAttachmentSave
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      this.gs.deleteAttachment(file.id);
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Attachment API :: Gagal Mengunggah Lampiran 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/:id')
  @HttpCode(206)
  @ApiTags(CONSTANTS.apiTagAttachment)
  @ApiParam({ name: 'id', type: 'string' })
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async getById(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const attachment =  await this.attachmentRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ]
      });
      if (attachment.discord) {
        const [ddlFiles, count] = await this.ddlFileRepo.findAndCount({
          where: [
            {
              msg_parent: Equal(attachment.discord)
            },
            {
              msg_id: Equal(attachment.discord),
              msg_parent: IsNull()
            }
          ],
          order: {
            chunk_idx: 'ASC'
          },
          relations: ['user_']
        });
        for (const ddlFile of ddlFiles) {
          delete ddlFile.url;
          if ('user_' in ddlFile && ddlFile.user_) {
            delete ddlFile.user_.email;
            delete ddlFile.user_.password;
            delete ddlFile.user_.session_token;
            delete ddlFile.user_.session_origin;
            delete ddlFile.user_.created_at;
            delete ddlFile.user_.updated_at;
          }
        }
        res.status(HttpStatus.OK).json(classToPlain({
          info: `😅 200 - Attachment API :: DDL List 🤣`,
          results: ddlFiles,
          count,
          pages: 1
        }));
      } else if (attachment.google_drive) {
        const gdrive = await this.gcs.gDrive();
        const dfile = await gdrive.files.get(
          {
            fileId: attachment.google_drive,
            alt: 'media'
          },
          {
            responseType: 'stream',
            headers: {
              Range: req.headers.range || 'bytes=0-',
              ...environment.nodeJsXhrHeader
            },
            signal: res.locals['abort-controller'].signal
          }
        );
        const dfile_header = dfile.headers;
        dfile_header['content-type'] = attachment.mime;
        res.writeHead(dfile.status, dfile_header);
        dfile.data.on('error', e => {
          this.gs.log('[DRIVE-ERROR] 💦', e, 'error');
        }).on('end', async () => {
          attachment.download_count++;
          await this.attachmentRepo.save(attachment);
        }).pipe(res);
      } else if (attachment.aws_s3) {
        attachment.download_count++;
        const resSaveAttachment = await this.attachmentRepo.save(attachment);
        let expiredSeconds = CONSTANTS.timeDdlS3;
        try {
          const primeCount = await this.userPremiumRepo.count({
            where: [
              {
                expired_at: MoreThanOrEqual(new Date()),
                user_: {
                  id: Equal(user.id)
                }
              }
            ],
            relations: ['user_']
          });
          if (primeCount > 0) {
            // Active Premium Users Get 4x
            expiredSeconds = 4 * expiredSeconds;
          }
        } catch (e) {
          this.gs.log('[DDL-ERROR] 💽', e, 'error');
        }
        const ddl =  await this.aws.getDdl(
          resSaveAttachment.aws_s3,
          user,
          expiredSeconds,
          resSaveAttachment.orig || `${resSaveAttachment.name}${resSaveAttachment.ext ? `.${resSaveAttachment.ext}` : ''}`,
          resSaveAttachment.mime
        );
        res.redirect(301, ddl.toString());
      } else {
        const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
        const fIdx = files.findIndex(f => f.name === attachment.name || f.name === `${attachment.name}${attachment.ext ? `.${attachment.ext}` : ''}`);
        if (fIdx < 0) {
          throw new Error('Lampiran Tidak Ditemukan!');
        }
        res.setHeader('content-type', attachment.mime);
        res.download(
          `${environment.uploadFolder}/${files[fIdx].name}`,
          attachment.orig || `${attachment.name}${attachment.ext ? `.${attachment.ext}` : ''}`,
          async (e) => {
            if (e) {
              this.gs.log('[RES_DOWNLOAD_ATTACHMENT-ERROR] 🔻', e, 'error');
            } else {
              attachment.download_count++;
              await this.attachmentRepo.save(attachment);
            }
          }
        );
      }
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json(classToPlain({
        info: `🙄 404 - Attachment API :: Gagal Mencari Lampiran ${req.params['id']} 😪`,
        result: {
          message: 'Lampiran Tidak Ditemukan!'
        }
      }));
    }
  }

  @Patch('/')
  @HttpCode(202)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async reUploadAttachment(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('id' in req.body) {
        const attachment = await this.attachmentRepo.findOneOrFail({
          where: [
            {
              id: Equal(req.body.id),
              discord: IsNull(),
              google_drive: IsNull(),
              pending: false
            }
          ],
          relations: ['user_']
        });
        attachment.pending = true;
        const resAttachmentSave = await this.attachmentRepo.save(attachment);
        if ('user_' in resAttachmentSave && resAttachmentSave.user_) {
          delete resAttachmentSave.user_.created_at;
          delete resAttachmentSave.user_.updated_at;
        }
        return {
          info: `😅 201 - Attachment API :: ReUpload ${req.body.id} 🤣`,
          result: resAttachmentSave
        };
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Attachment API :: Gagal Reupload Lampiran 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
