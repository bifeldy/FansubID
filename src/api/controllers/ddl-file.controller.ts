import { Controller, Get, HttpCode, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

import { Request, Response } from 'express';
import { Equal } from 'typeorm';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { RoleModel } from '../../models/req-res.model';

import { Roles } from '../decorators/roles.decorator';
import { VerifiedOnly } from '../decorators/verified.decorator';

import { AttachmentService } from '../repository/attachment.service';
import { DdlFileService } from '../repository/ddl-file';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../services/global.service';

@Controller('/ddl-part')
export class DdlPartController {

  constructor(
    private api: ApiService,
    private attachmentRepo: AttachmentService,
    private gs: GlobalService,
    private ddlFileRepo: DdlFileService
  ) {
    //
  }

  @Get('/:id')
  @HttpCode(206)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  @ApiTags(CONSTANTS.apiTagDdlFile)
  @ApiParam({ name: 'id', type: 'string' })
  async downloadChunk(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    try {
      const ddlFile = await this.ddlFileRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ]
      });
      const res_raw = await this.api.getData(
        new URL(ddlFile.url),
        {
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
            WHERE ddl_file.msg_id = $1
          )
          WHERE discord = $2
        `, [ddlFile.msg_id, ddlFile.msg_id]);
      }).pipe(res);
    } catch (error) {
      const body: any = {
        info: `🙄 404 - DDL File API :: Gagal Mencari Lampiran ${req.params['id']} 😪`,
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

}

@Controller('/ddl-seek')
export class DdlSeekController {

  constructor(
    private api: ApiService,
    private attachmentRepo: AttachmentService,
    private gs: GlobalService,
    private ddlFileRepo: DdlFileService
  ) {
    //
  }

  @Get('/:id')
  @HttpCode(206)
  @Roles(RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER)
  @VerifiedOnly()
  @ApiTags(CONSTANTS.apiTagDdlFile)
  @ApiParam({ name: 'id', type: 'string' })
  @ApiHeader({ name: 'Range', required: true })
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
      const chunkIdx = Math.floor((parseInt(headerRangeStartEnd[0], 10) || 0) / CONSTANTS.fileSizeAttachmentChunkDiscordLimit);
      const ddlFile = await this.ddlFileRepo.findOneOrFail({
        where: [
          {
            msg_id: Equal(attachment.discord),
            chunk_idx: Equal(chunkIdx)
          }
        ]
      });
      const skippedChunkSize = ddlFile.chunk_idx * CONSTANTS.fileSizeAttachmentChunkDiscordLimit;
      headerRangeFull = 'bytes=';
      let headerRangeStart = '0';
      if (headerRangeStartEnd.length > 0 && headerRangeStartEnd[0]) {
        headerRangeStart = `${parseInt(headerRangeStartEnd[0], 10) - (skippedChunkSize)}`;
      }
      headerRangeFull += headerRangeStart;
      let headerRangeEnd = '';
      if (headerRangeStartEnd.length > 1 && headerRangeStartEnd[1]) {
        headerRangeEnd = `${parseInt(headerRangeStartEnd[1], 10) - (skippedChunkSize)}`;
      }
      headerRangeFull += `-${headerRangeEnd}`;
      const res_raw = await this.api.getData(
        new URL(ddlFile.url),
        {
          Range: headerRangeFull,
          ...environment.nodeJsXhrHeader
        },
        res.locals['abort-controller'].signal
      );
      const res_raw_headers = res_raw.headers;
      const res_raw_header_range_start = `${skippedChunkSize + parseInt(headerRangeStart, 10)}`;
      const res_raw_headers_content_length_minus_1 = `${parseInt(res_raw_header_range_start, 10) + parseInt(res_raw_headers.get('Content-Length'), 10) - 1}`;
      res_raw_headers.delete('Content-Range');
      res_raw_headers.set('Content-Range', `bytes ${res_raw_header_range_start}-${res_raw_headers_content_length_minus_1}/${attachment.size}`);
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
            WHERE msg_id = $1
          )
          WHERE discord = $2
        `, [ddlFile.msg_id, ddlFile.msg_id]);
      }).pipe(res);
    } catch (error) {
      const body: any = {
        info: `🙄 404 - DDL File API :: Gagal Mencari Lampiran ${req.params['id']} 😪`,
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

}
