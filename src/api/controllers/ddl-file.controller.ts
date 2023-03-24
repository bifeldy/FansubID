import { Controller, Get, HttpCode, HttpStatus, Req, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

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

@Controller('/ddl-file')
export class DdlFileController {

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
  async getById(@Req() req: Request, @Res( /* { passthrough: true } */ ) res: Response): Promise<any> {
    try {
      const ddlFile = await this.ddlFileRepo.findOneOrFail({
        where: [
          { id: Equal(req.params['id']) }
        ]
      });
      const url = new URL(ddlFile.url);
      const res_raw = await this.api.getData(
        url,
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
          SET attachment.download_count = (
            SELECT SUM(ddl_file.download_count)
            FROM ddl_file
            WHERE ddl_file.msg_id = $1
          )
          WHERE attachment.discord = $2
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
