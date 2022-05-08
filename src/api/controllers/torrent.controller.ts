// 3rd Party Library
import webtorrentHealth from 'webtorrent-health';

import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { environment } from '../../environments/api/environment';

import { GlobalService } from '../services/global.service';

@Controller('/torrent')
export class TorrentController {

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  async addNew(@Req() req: Request, @Res(/* { passthrough: true } */) res: Response): Promise<any> {
    try {
      if ('magnetHash' in req.body) {
        return webtorrentHealth(req.body.magnetHash, {
          trackers: environment.trackerAnnounce,
          timeout: req.body.trackTimeout || 1234
        }, (err, data) => {
          if (err) {
            const body: any = {
              info: `🙄 400 - Torrent Tracker API :: Gagal Mendapatkan Torrent 😪`,
              result: {
                message: err.message
              }
            };
            res.status(400);
            if (req.query['xml'] === 'true') {
              res.set('Content-Type', 'application/xml');
              return res.send(this.gs.OBJ2XML(body));
            }
            return res.json(body);
          }
          return res.status(201).json({
            info: `😅 200 - Torrent Tracker API :: Berhasil Mendapatkan ${req.body.magnetHash} 🤣`,
            result: data
          });
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
      res.status(400);
      if (req.query['xml'] === 'true') {
        res.set('Content-Type', 'application/xml');
        return res.send(this.gs.OBJ2XML(body));
      }
      return res.json(body);
    }
  }

}
