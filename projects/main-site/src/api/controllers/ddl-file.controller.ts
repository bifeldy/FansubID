import { Controller, Get, HttpCode, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

import { Request, Response } from 'express';
import { Equal, IsNull, MoreThanOrEqual, Not } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel, UserModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified-only.decorator';

import { AttachmentService } from '../repository/attachment.service';
import { DdlFileService } from '../repository/ddl-file';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../services/global.service';
import { DiscordService } from '../services/discord.service';
import { UserPremiumService } from '../repository/user-premium.service';
import { AmazonWebService } from '../services/amazon-web.service';

@Controller('/ddl-generate')
export class DdlGenerateController {

  constructor(
    private aws: AmazonWebService,
    private attachmentRepo: AttachmentService,
    private gs: GlobalService,
    private userPremiumRepo: UserPremiumService
  ) {
    //
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiTags(CONSTANTS.apiTagDdlFile)
  @ApiParam({ name: 'id', type: 'string' })
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async generateDdl(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    try {
      const user: UserModel = res.locals['user'];
      const attachment =  await this.attachmentRepo.findOneOrFail({
        where: [
          {
            id: Equal(req.params['id']),
            aws_s3: Not(IsNull())
          }
        ]
      });
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
          // Active Premium Users Get 2 Hours
          expiredSeconds = 2 * 60 * 60;
        }
      } catch (e) {
        this.gs.log('[DDL-ERROR] 💽', e, 'error');
      }
      const ddl =  await this.aws.getDdl(
        resSaveAttachment.aws_s3,
        user, expiredSeconds,
        resSaveAttachment.orig,
        resSaveAttachment.mime
      );
      res.status(HttpStatus.OK).json(classToPlain({
        info: `😅 200 - DDL File API :: Generate URL 🤣`,
        result: resSaveAttachment,
        ddl: ddl.toString(),
        expired: new Date(Number(ddl.searchParams.get('Expires')) * 1000)
      }));
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json(classToPlain({
        info: `🙄 404 - DDL File API :: Gagal Mencari Lampiran ${req.params['id']} 😪`,
        result: {
          message: 'Lampiran Tidak Ditemukan!'
        }
      }));
    }
  }

}

@Controller('/ddl-part')
export class DdlPartController {

  constructor(
    private api: ApiService,
    private attachmentRepo: AttachmentService,
    private gs: GlobalService,
    private ddlFileRepo: DdlFileService,
    private ds: DiscordService
  ) {
    //
  }

  @Get('/:id')
  @HttpCode(206)
  @ApiTags(CONSTANTS.apiTagDdlFile)
  @ApiParam({ name: 'id', type: 'string' })
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async downloadChunk(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    try {
      let ddlFile = await this.ddlFileRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ]
      });
      const msg = await this.ds.getMessageAttachment(ddlFile.msg_id);
      const att = msg.attachments.get(ddlFile.id);
      let newUrl = att.url;
      if (newUrl.endsWith('/?')) {
        newUrl = newUrl.substring(0, newUrl.length - 2);
      }
      if (newUrl.endsWith('&') || newUrl.endsWith('/') || newUrl.endsWith('?')) {
        newUrl = newUrl.substring(0, newUrl.length - 1);
      }
      if (ddlFile.url !== newUrl) {
        ddlFile.url = newUrl;
        ddlFile = await this.ddlFileRepo.save(ddlFile);
      }
      const res_raw = await this.api.getData(
        new URL(ddlFile.url),
        {
          // Authorization: `Bot ${environment.discord.loginToken}`,
          Range: req.headers.range || 'bytes=0-',
          ...environment.nodeJsXhrHeader
        },
        res.locals['abort-controller'].signal
      );
      res.writeHead(res_raw.status, res_raw.headers.raw());
      res_raw.body.on('error', e => {
        this.gs.log('[DISCORD-ERROR] 💦', e, 'error');
      }).on('end', async () => {
        ddlFile.download_count++;
        await this.ddlFileRepo.save(ddlFile);
        await this.attachmentRepo.query(`
          UPDATE attachment
          SET download_count = (
            SELECT SUM(ddl_file.download_count)
            FROM ddl_file
            WHERE ddl_file.msg_parent = $1
          )
          WHERE discord = $2
        `, [ddlFile.msg_parent, ddlFile.msg_parent]);
      }).pipe(res);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json(classToPlain({
        info: `🙄 404 - DDL File API :: Gagal Mencari Lampiran ${req.params['id']} 😪`,
        result: {
          message: 'Lampiran Tidak Ditemukan!'
        }
      }));
    }
  }

}

@Controller('/ddl-seek')
export class DdlSeekController {

  constructor(
    private api: ApiService,
    private attachmentRepo: AttachmentService,
    private gs: GlobalService,
    private ddlFileRepo: DdlFileService,
    private ds: DiscordService
  ) {
    //
  }

  @Get('/:id')
  @HttpCode(206)
  @ApiTags(CONSTANTS.apiTagDdlFile)
  @ApiParam({ name: 'id', type: 'string' })
  @ApiHeader({ name: 'range', required: true })
  @VerifiedOnly()
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  async streamFull(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    try {
      let headerRangeFull = req.headers.range || 'bytes=0-';
      if (headerRangeFull.startsWith('bytes=')) {
        headerRangeFull = headerRangeFull.slice(6);
      }
      const headerRangeStartEnd = headerRangeFull.split('-');
      const attachment = await this.attachmentRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ]
      });
      const ddlFiles = await this.ddlFileRepo.find({
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
        }
      });
      const target = parseInt(headerRangeStartEnd[0], 10) || 0;
      let chunkIdx = 0;
      let chunkSize = 0;
      let skippedChunkSize = 0;
      for (const df of ddlFiles) {
        if (df.chunk_idx !== chunkIdx) {
          throw new Error('Urutan Data Hilang / Rusak!');
        }
        if (target < chunkSize + df.size) {
          skippedChunkSize = Math.abs(target - chunkSize);
          break;
        }
        chunkSize += df.size;
        chunkIdx++;
      }
      let ddlFile = ddlFiles[chunkIdx];
      let hdrRngPrxy = `bytes=${skippedChunkSize}-`;
      if (headerRangeStartEnd.length > 1 && headerRangeStartEnd[1]) {
        hdrRngPrxy += `${parseInt(headerRangeStartEnd[1], 10) - target + skippedChunkSize}`;
      }
      const msg = await this.ds.getMessageAttachment(ddlFile.msg_id);
      const att = msg.attachments.get(ddlFile.id);
      let newUrl = att.url;
      if (newUrl.endsWith('/?')) {
        newUrl = newUrl.substring(0, newUrl.length - 2);
      }
      if (newUrl.endsWith('&') || newUrl.endsWith('/') || newUrl.endsWith('?')) {
        newUrl = newUrl.substring(0, newUrl.length - 1);
      }
      if (ddlFile.url !== newUrl) {
        ddlFile.url = newUrl;
        ddlFile = await this.ddlFileRepo.save(ddlFile);
      }
      const res_raw = await this.api.getData(
        new URL(ddlFile.url),
        {
          // Authorization: `Bot ${environment.discord.loginToken}`,
          Range: hdrRngPrxy,
          ...environment.nodeJsXhrHeader
        },
        res.locals['abort-controller'].signal
      );
      const res_raw_headers = res_raw.headers;
      const res_raw_headers_content_length_minus_1 = `${target + parseInt(res_raw_headers.get('Content-Length'), 10) - 1}`;
      res_raw_headers.delete('Content-Range');
      res_raw_headers.set('Content-Range', `bytes ${target}-${res_raw_headers_content_length_minus_1}/${attachment.size}`);
      res_raw_headers.delete('Content-Disposition');
      res_raw_headers.set('Content-Disposition', `attachment; filename="${attachment.name}.${attachment.ext}"`);
      res_raw_headers.delete('Content-Type');
      res_raw_headers.set('Content-Type', attachment.mime);
      res.writeHead(res_raw.status, res_raw_headers.raw());
      res_raw.body.on('error', e => {
        this.gs.log('[DISCORD-ERROR] 💦', e, 'error');
      }).on('end', async () => {
        ddlFile.download_count++;
        await this.ddlFileRepo.save(ddlFile);
        await this.attachmentRepo.query(`
          UPDATE attachment
          SET download_count = (
            SELECT SUM(download_count)
            FROM ddl_file
            WHERE msg_parent = $1
          )
          WHERE discord = $2
        `, [ddlFile.msg_parent, ddlFile.msg_parent]);
      }).pipe(res);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json(classToPlain({
        info: `🙄 404 - DDL File API :: Gagal Mencari Lampiran ${req.params['id']} 😪`,
        result: {
          message: 'Lampiran Tidak Ditemukan!'
        }
      }));
    }
  }

}
