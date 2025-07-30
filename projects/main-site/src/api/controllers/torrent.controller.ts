// 3rd Party Library
import bittorrentTrackerClient from 'bittorrent-tracker/client';
import wrtc from '@roamhq/wrtc';

import { Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';

import { environment } from '../../environments/api/environment';

import { FilterApiKeyAccess } from '../decorators/filter-api-key-access.decorator';

import { GlobalService } from '../services/global.service';

@ApiExcludeController()
@Controller('/torrent')
export class TorrentController {

  constructor(
    private sr: SchedulerRegistry,
    private gs: GlobalService
  ) {
    //
  }

  scrapeTorrent(announce: string, infoHash: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const dt = new Date().getTime();
      this.sr.addTimeout(
        `${dt}_${infoHash}_${announce}`,
        setTimeout(() => {
          try {
            reject('Request Timeout!');
          } catch (e) {
            this.gs.log('[TORRENT_SCRAPE-TIMEOUT] 👣', e, 'error');
          }
        }, 2345)
      );
      bittorrentTrackerClient.scrape(
        {
          announce,
          infoHash,
          wrtc
        },
        (err, result) => {
          console.log('[TORRENT_SCRAPE-announce] 👣', announce);
          console.log('[TORRENT_SCRAPE-infoHash] 👣', infoHash);
          console.log('[TORRENT_SCRAPE-err] 👣', err);
          console.log('[TORRENT_SCRAPE-result] 👣', result);
          try {
            this.sr.deleteTimeout(`${dt}_${infoHash}_${announce}`);
            const data = {
              announce,
              seeds: 0,
              peers: 0,
              downloads: 0
            };
            if (!err) {
              // data.announce = result.announce;
              data.seeds = result.complete;
              data.peers = result.incomplete;
              data.downloads = result.downloaded;
              resolve(data);
            } else {
              reject(err.message);
            }
          } catch (e) {
            this.gs.log('[TORRENT_SCRAPE-ERROR] 👣', e, 'error');
          }
        }
      );
    });
  }

  @Post('/')
  @HttpCode(201)
  @FilterApiKeyAccess()
  async addNew(@Req() req: Request, @Res(/* { passthrough: true } */) res: Response): Promise<any> {
    try {
      if ('magnetHash' in req.body) {
        const torrentTracker = {
          infoHash: req.body.magnetHash,
          seeds: 0,
          peers: 0,
          downloads: 0,
          trackers: []
        };
        const trackers = req.body.trackList || environment.torrent.trackerAnnounce;
        const promises: Promise<any>[] = [];
        for (const tracker of trackers) {
          promises.push(this.scrapeTorrent(tracker,torrentTracker.infoHash));
        }
        const resPromise = await Promise.allSettled(promises);
        for (const [idx, rp] of resPromise.entries()) {
          if (rp.status === 'fulfilled') {
            torrentTracker.seeds += rp.value.seeds;
            torrentTracker.peers += rp.value.peers;
            torrentTracker.downloads += rp.value.downloads;
          } else {
            torrentTracker.trackers.push({
              announce: trackers[idx],
              error: rp.reason
            });
          }
        }
        res.status(HttpStatus.CREATED).json(classToPlain({
          info: `😅 200 - Torrent Tracker API :: ${req.body.magnetHash} 🤣`,
          result: torrentTracker
        }));
      } else {
        throw new Error('Data Tidak Lengkap!');
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(classToPlain({
        info: '🙄 400 - Torrent Tracker API :: Gagal Mendapatkan Torrent 😪',
        result: {
          message: 'Data Tidak Lengkap!'
        }
      }));
    }
  }

}
