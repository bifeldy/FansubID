// NodeJS Library
import { readdirSync } from 'node:fs';

import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ApiExcludeEndpoint, ApiParam, ApiTags } from '@nestjs/swagger';
import { DiskFile } from '@uploadx/core';

import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';
import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified.decorator';

import { AttachmentService } from '../repository/attachment.service';
import { TempAttachmentService } from '../repository/temp-attachment.service';
import { DdlFileService } from '../repository/ddl-file';

import { GdriveService } from '../services/gdrive.service';
import { GlobalService } from '../services/global.service';

@Controller('/attachment')
export class AttachmentController {

  constructor(
    private sr: SchedulerRegistry,
    private attachmentRepo: AttachmentService,
    private gdrive: GdriveService,
    private gs: GlobalService,
    private ddlFileRepo: DdlFileService,
    private tempAttachmentRepo: TempAttachmentService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async searchLampiran(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [attachments, count] = await this.attachmentRepo.findAndCount({
        where: [
          { name: ILike(`%${req.query['q'] ? req.query['q'] : ''}%`) }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            name: 'ASC'
          })
        },
        relations: ['user_', 'parent_attachment_'],
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
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async uploadLampiran(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const file = req.body as DiskFile;
    try {
      if (file) {
        const user: UserModel = res.locals['user'];
        const tempAttachment = this.tempAttachmentRepo.new();
        tempAttachment.name = file.id;
        tempAttachment.ext = file.originalName.split('.').pop().toLowerCase();
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
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  @ApiTags(CONSTANTS.apiTagAttachment)
  @ApiParam({ name: 'id', type: 'string' })
  async getById(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    try {
      const attachment =  await this.attachmentRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ]
      });
      if (attachment.discord) {
        const [ddlFiles, count] = await this.ddlFileRepo.findAndCount({
          where: [
            { msg_id: Equal(attachment.discord) }
          ],
          order: {
            chunk_idx: 'ASC'
          },
          relations: ['user_']
        });
        for (const ddlFile of ddlFiles) {
          if ('user_' in ddlFile && ddlFile.user_) {
            delete ddlFile.user_.created_at;
            delete ddlFile.user_.updated_at;
          }
        }
        const body: any = {
          info: `😅 200 - Attachment API :: DDL List 🤣`,
          results: ddlFiles,
          count,
          pages: 1
        };
        res.status(HttpStatus.OK);
        if (res.locals['xml']) {
          res.set('Content-Type', 'application/xml');
          res.send(this.gs.OBJ2XML(body));
        } else {
          res.json(body);
        }
      } else if (attachment.google_drive) {
        const gdrive = await this.gdrive.gDrive();
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
      } else {
        const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
        const fIdx = files.findIndex(f => f.name.includes(attachment.name));
        if (fIdx >= 0) {
          res.setHeader('content-type', attachment.mime);
          return res.download(
            `${environment.uploadFolder}/${files[fIdx].name}`,
            `${attachment.name}.${attachment.ext}`,
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
        throw new Error('Lampiran Tidak Ditemukan!');
      }
    } catch (error) {
      const body: any = {
        info: `🙄 404 - Attachment API :: Gagal Mencari Lampiran ${req.params['id']} 😪`,
        result: {
          message: 'Lampiran Tidak Ditemukan!'
        }
      };
      res.status(HttpStatus.NOT_FOUND);
      if (res.locals['xml']) {
        res.set('Content-Type', 'application/xml');
        res.send(this.gs.OBJ2XML(body));
      } else {
        res.json(body);
      }
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  @VerifiedOnly()
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const attachment =  await this.attachmentRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ]
      });
      this.gs.deleteAttachment(attachment.name);
      const deletedAttachment = await this.attachmentRepo.remove(attachment);
      if ('user_' in deletedAttachment && deletedAttachment.user_) {
        delete deletedAttachment.user_.created_at;
        delete deletedAttachment.user_.updated_at;
      }
      return {
        info: `😅 202 - Attachment API :: Berhasil Menghapus Lampiran ${req.params['id']} 🤣`,
        result: deletedAttachment
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Attachment API :: Gagal Mencari Lampiran ${req.params['id']} 😪`,
        result: {
          message: 'Lampiran Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
