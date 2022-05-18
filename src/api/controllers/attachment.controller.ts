// 3rd Party Library
import { AbortController } from 'abort-controller';

// NodeJS Library
import { unlink, readdirSync } from 'node:fs';

import { Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { Equal, ILike } from 'typeorm';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified.decorator';

import { AttachmentService } from '../repository/attachment.service';
import { TempAttachmentService } from '../repository/temp-attachment.service';

import { GdriveService } from '../services/gdrive.service';
import { GlobalService } from '../services/global.service';

@Controller('/attachment')
export class AttachmentController {

  constructor(
    private attachmentRepo: AttachmentService,
    private gdrive: GdriveService,
    private gs: GlobalService,
    private tempAttachmentRepo: TempAttachmentService
  ) {
    //
  }

  deleteAttachment(fileName: string) {
    unlink(`${environment.uploadFolder}/${fileName}`, (err) => {
      if (err) {
        this.gs.log('[NODE_FS_UNLINK-ERROR] 🔗', err, 'error');
      }
    });
  }

  @Get('/')
  @HttpCode(200)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
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
          delete a.user_.role;
          delete a.user_.password;
          delete a.user_.session_token;
          delete a.user_.created_at;
          delete a.user_.updated_at;
        }
        if ('parent_attachment_' in a && a.parent_attachment_) {
          delete a.parent_attachment_.created_at;
          delete a.parent_attachment_.updated_at;
        }
      }
      return {
        info: `😅 200 - Temp Attachment API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: attachments
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Temp Attachment API :: Gagal Mendapatkan All Lampiran 😪',
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
  @UseInterceptors(
    FileInterceptor(
      'file',
      {
        dest: environment.uploadFolder,
        fileFilter: (req, file, cb) => {
          if (file) {
            const typeArray = file.mimetype.split('/');
            const fileType = typeArray[0];
            const fileExt = typeArray[1];
            if ((fileType === 'video' || fileType === 'application') && file) {
              if (fileExt === 'mp4' || fileExt === 'x-matroska' || fileExt === 'pdf') {
                return cb(null, true);
              }
            }
          }
          return cb(null, false);
        },
        limits: {
          fileSize: 256 * 1000 * 1000
        }
      }
    )
  )
  async uploadLampiran(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if (req.file) {
        const user: UserModel = res.locals['user'];
        const tempAttachment = this.tempAttachmentRepo.new();
        tempAttachment.name = req.file.filename;
        const fileOriginalNameSplit = req.file.originalname.split('.');
        tempAttachment.ext = fileOriginalNameSplit[fileOriginalNameSplit.length - 1];
        tempAttachment.size = req.file.size;
        tempAttachment.user_ = user;
        const resAttachmentSave = await this.tempAttachmentRepo.save(tempAttachment);
        if ('user_' in resAttachmentSave && resAttachmentSave.user_) {
          delete resAttachmentSave.user_.role;
          delete resAttachmentSave.user_.password;
          delete resAttachmentSave.user_.session_token;
          delete resAttachmentSave.user_.created_at;
          delete resAttachmentSave.user_.updated_at;
        }
        setTimeout(async () => {
          try {
            const attachmentToBeDeleted = await this.tempAttachmentRepo.findOneOrFail({
              where: [
                { id: Equal(resAttachmentSave.id), name: ILike(resAttachmentSave.name) }
              ]
            });
            this.deleteAttachment(attachmentToBeDeleted.name);
            await this.tempAttachmentRepo.remove(attachmentToBeDeleted);
          } catch (e) {
            this.gs.log('[TEMP_ATTACHMENT_DELETE-ERROR] 🚮', e, 'error');
          }
        }, 3 * 60 * 1000);
        return {
          info: `😅 201 - Temp Attachment API :: Harap Lengkapi Data Berkas Dalam 3 Menit 🤣`,
          result: resAttachmentSave
        };
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      this.deleteAttachment(req.file.filename);
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Temp Attachment API :: Gagal Mengunggah Lampiran 😪',
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
  async getById(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    try {
      const attachment =  await this.attachmentRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ]
      });
      if (attachment.google_drive) {
        const abortController = new AbortController();
        const gdrive = await this.gdrive.gDrive();
        const dfile = await gdrive.files.get(
          {
            fileId: attachment.google_drive,
            alt: 'media'
          },
          {
            responseType: 'stream',
            headers: {
              Range: req.headers.range,
              ...environment.nodeJsXhrHeader
            },
            signal: abortController.signal
          }
        );
        req.on('close', () => {
          this.gs.log('[REQ-COMPLETED] 💦', res.writableEnded);
          if (!dfile.data.readableEnded) {
            abortController.abort();
          }
        });
        res.writeHead(dfile.status, dfile.headers);
        res.on('pipe', src => {
          this.gs.log('[RES-PIPE_FLOW] 💦', src.readableFlowing);
        }).on('unpipe', src => {
          this.gs.log('[RES-UNPIPE_FLOW] 💦', src.readableFlowing);
        });
        dfile.data.on('data', chunk => {
          this.gs.log('[DRIVE-DATA_FLOW] 💦', chunk.length);
        }).on('error', e => {
          this.gs.log('[DRIVE-ERROR] 💦', e, 'error');
        }).on('end', async () => {
          attachment.download_count++;
          await this.attachmentRepo.save(attachment);
        }).pipe(res);
      } else {
        const files = readdirSync(`${environment.uploadFolder}`, { withFileTypes: true });
        const fIdx = files.findIndex(f => f.name.toString().toLowerCase().includes(attachment.name.toString().toLowerCase()));
        if (fIdx >= 0) {
          return res.download(`${environment.uploadFolder}/${files[fIdx].name}`, `${attachment.name}.${attachment.ext}`, async (e) => {
            if (e) {
              this.gs.log('[RES_DOWNLOAD-ERROR] 🔻', e, 'error');
            } else {
              attachment.download_count++;
              await this.attachmentRepo.save(attachment);
            }
          });
        } else {
          throw new Error('Lampiran Tidak Ditemukan!');
        }
      }
    } catch (error) {
      const body: any = {
        info: `🙄 404 - Temp Attachment API :: Gagal Mencari Lampiran ${req.params['id']} 😪`,
        result: {
          message: 'Lampiran Tidak Ditemukan!'
        }
      };
      res.status(404);
      if (res.locals['xml']) {
        res.set('Content-Type', 'application/xml');
        return res.send(this.gs.OBJ2XML(body));
      }
      return res.json(body);
    }
  }

  @Delete('/:id')
  @HttpCode(202)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR)
  async deleteById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      const attachment =  await this.attachmentRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ]
      });
      this.deleteAttachment(attachment.name);
      const deletedAttachment = await this.attachmentRepo.remove(attachment);
      if ('user_' in deletedAttachment && deletedAttachment.user_) {
        delete deletedAttachment.user_.role;
        delete deletedAttachment.user_.password;
        delete deletedAttachment.user_.session_token;
        delete deletedAttachment.user_.created_at;
        delete deletedAttachment.user_.updated_at;
      }
      return {
        info: `😅 202 - Temp Attachment API :: Berhasil Menghapus Lampiran ${req.params['id']} 🤣`,
        result: deletedAttachment
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: `🙄 404 - Temp Attachment API :: Gagal Mencari Lampiran ${req.params['id']} 😪`,
        result: {
          message: 'Lampiran Tidak Ditemukan!'
        }
      }, HttpStatus.NOT_FOUND);
    }
  }

}
