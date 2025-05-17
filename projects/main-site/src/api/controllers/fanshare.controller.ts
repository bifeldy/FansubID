import { Controller, Get, HttpCode, HttpException, HttpStatus, Put, Req, Res } from '@nestjs/common';
import { ILike, IsNull, MoreThanOrEqual } from 'typeorm';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { Request, Response } from 'express';
import { S3File } from '@uploadx/s3';

import { environment } from '../../environments/api/environment';

import { UserModel } from '../../models/req-res.model';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';

import { AttachmentFanshareService } from '../repository/attachment-fanshare.service';

@Controller('/fanshare')
export class FanshareController {

  constructor(
    private attachmentFanshareRepo: AttachmentFanshareService
  ) {
    //
  }

  @Get('/')
  @HttpCode(200)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async getById(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const searchQuery = req.query['q'] || '';
    try {
      const queryPage = parseInt(req.query['page'] as string);
      const queryRow = parseInt(req.query['row'] as string);
      const [attachmentFanshares, count] = await this.attachmentFanshareRepo.findAndCount({
        where: [
          { orig: ILike(`%${searchQuery}%`), expired_at: MoreThanOrEqual(new Date()), user_: IsNull() },
          { mime: ILike(`%${searchQuery}%`), expired_at: MoreThanOrEqual(new Date()), user_: IsNull() },
          { orig: ILike(`%${searchQuery}%`), expired_at: IsNull(), user_: IsNull() },
          { mime: ILike(`%${searchQuery}%`), expired_at: IsNull(), user_: IsNull() }
        ],
        order: {
          ...((req.query['sort'] && req.query['order']) ? {
            [req.query['sort'] as string]: (req.query['order'] as string).toUpperCase()
          } : {
            created_at: 'DESC',
            orig: 'ASC'
          })
        },
        relations: ['user_'],
        skip: queryPage > 0 ? (queryPage * queryRow - queryRow) : 0,
        take: (queryRow > 0 && queryRow <= 500) ? queryRow : 10
      });
      for (const af of attachmentFanshares) {
        const fileName = af.name.split('u0/').pop();
        (af as any).uri = `https://cdn.${environment.domain_alt}/u0/${encodeURIComponent(fileName)}`;
        if ('user_' in af && af.user_) {
          delete af.user_.created_at;
          delete af.user_.updated_at;
        }
      }
      return {
        info: `😅 200 - Fanshare API :: List All 🤣`,
        count,
        pages: Math.ceil(count / (queryRow ? queryRow : 10)),
        results: attachmentFanshares
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Fanshare API :: Gagal Menarik Data 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/')
  @HttpCode(201)
  @ApiExcludeEndpoint()
  @FilterApiKeyAccess()
  async uploadLampiran(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    const file = req.body as S3File;
    try {
      if (file) {
        const user: UserModel = res.locals['user'];
        const attachmentFanshare = this.attachmentFanshareRepo.new();
        attachmentFanshare.id = file.id;
        attachmentFanshare.name = file.name;
        attachmentFanshare.orig = file.originalName;
        attachmentFanshare.size = file.size;
        attachmentFanshare.mime = file.contentType;
        attachmentFanshare.status = file.status
        attachmentFanshare.created_at = new Date(file.createdAt);
        attachmentFanshare.expired_at = new Date(file.expiredAt);
        attachmentFanshare.user_ = user;
        const resSaveAttachmentFanshare = await this.attachmentFanshareRepo.save(attachmentFanshare);
        if ('user_' in resSaveAttachmentFanshare && resSaveAttachmentFanshare.user_) {
          delete resSaveAttachmentFanshare.user_.created_at;
          delete resSaveAttachmentFanshare.user_.updated_at;
        }
        return {
          info: `😅 201 - Fanshare API :: Upload Publik Berhasil 🤣`,
          result: {
            ...resSaveAttachmentFanshare,
            uri: `https://cdn.${environment.domain_alt}/${resSaveAttachmentFanshare.name}`
          }
        };
      }
      throw new Error('Data Tidak Lengkap!');
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Fanshare API :: Gagal Mengunggah Lampiran 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
