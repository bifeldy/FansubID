// 3rd Party Library
import webtorrentHealth from 'webtorrent-health';

import { Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { environment } from '../../environments/api/environment';

@Controller('/torrent')
export class TorrentController {

  constructor(
    //
  ) {
    //
  }

  @Post('/')
  @HttpCode(201)
  async addNew(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<any> {
    try {
      if ('magnetHash' in req.body) {
        return webtorrentHealth(req.body.magnetHash, {
          trackers: environment.trackerAnnounce,
          timeout: req.body.trackTimeout || 1234
        }, (err, data) => {
          if (err) {
            throw new HttpException({
              info: `🙄 400 - Torrent Tracker API :: Gagal Mendapatkan Torrent 😪`,
              result: {
                message: err.message
              }
            }, HttpStatus.BAD_REQUEST);
          }
          return {
            info: `😅 201 - Torrent Tracker API :: Berhasil Mendapatkan ${req.body.magnetHash} 🤣`,
            result: data
          };
        });
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException({
        info: '🙄 400 - Torrent Tracker API :: Gagal Mendapatkan Torrent 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
