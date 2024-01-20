// 3rd Party Library
import webtorrentHealth from 'webtorrent-health';

import { Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';

import { environment } from '../../environments/api/environment';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';

@ApiExcludeController()
@Controller('/torrent')
export class TorrentController {

  constructor() { }

  @Post('/')
  @HttpCode(201)
  @FilterApiKeyAccess()
  async addNew(@Req() req: Request, @Res(/* { passthrough: true } */) res: Response): Promise<any> {
    try {
      if ('magnetHash' in req.body) {
        webtorrentHealth(req.body.magnetHash, {
          trackers: req.body.trackList || environment.torrent.trackerAnnounce,
          timeout: req.body.trackTimeout || 1234
        }, (err, data) => {
          if (err) {
            return res.status(HttpStatus.BAD_REQUEST).json(classToPlain({
              info: `🙄 400 - Torrent Tracker API :: Gagal Mendapatkan Torrent 😪`,
              result: {
                message: err.message
              }
            }));
          } else {
            return res.status(HttpStatus.CREATED).json(classToPlain({
              info: `😅 200 - Torrent Tracker API :: Berhasil Mendapatkan ${req.body.magnetHash} 🤣`,
              result: data
            }));
          }
        });
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(classToPlain({
        info: '🙄 400 - Torrent Tracker API :: Gagal Mendapatkan Torrent 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }));
    }
  }

}
