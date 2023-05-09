// 3rd Party Library
import webtorrentHealth from 'webtorrent-health';

import { Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { environment } from '../../environments/api/environment';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';

import { GlobalService } from '../services/global.service';

@ApiExcludeController()
@Controller('/torrent')
export class TorrentController {

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  @FilterApiKeyAccess()
  async addNew(@Req() req: Request, @Res(/* { passthrough: true } */) res: Response): Promise<any> {
    try {
      if ('magnetHash' in req.body) {
        webtorrentHealth(req.body.magnetHash, {
          trackers: environment.torrent.trackerAnnounce,
          timeout: req.body.trackTimeout || 1234
        }, (err, data) => {
          if (err) {
            const body: any = {
              info: `🙄 400 - Torrent Tracker API :: Gagal Mendapatkan Torrent 😪`,
              result: {
                message: err.message
              }
            };
            res.status(HttpStatus.BAD_REQUEST);
            if (res.locals['xml']) {
              res.set('Content-Type', 'application/xml');
              res.send(this.gs.OBJ2XML(body));
            } else {
              res.json(body);
            }
          } else {
            res.status(HttpStatus.CREATED).json({
              info: `😅 200 - Torrent Tracker API :: Berhasil Mendapatkan ${req.body.magnetHash} 🤣`,
              result: data
            });
          }
        });
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      const body: any = {
        info: '🙄 400 - Torrent Tracker API :: Gagal Mendapatkan Torrent 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      };
      res.status(HttpStatus.BAD_REQUEST);
      if (res.locals['xml']) {
        res.set('Content-Type', 'application/xml');
        res.send(this.gs.OBJ2XML(body));
      } else {
        res.json(body);
      }
    }
  }

}
