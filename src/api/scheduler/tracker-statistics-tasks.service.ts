// NodeJS Library
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { GlobalService } from '../services/global.service';
import { SocketIoService } from '../services/socket-io.service';
import { DiscordService } from '../services/discord.service';

@Injectable()
export class TrackerStatisticsService {

  torrentTracker = null;

  constructor(
    private cfg: ConfigService,
    private gs: GlobalService,
    private sis: SocketIoService,
    private api: ApiService,
    private ds: DiscordService
  ) {
    //
  }

  updateVisitor(): void {
    if (this.ds && this.sis) {
      this.ds.bot?.user?.setPresence({
        status: 'idle',
        activities: [
          {
            name: `:: ${this.sis.getAllClientsSocket()?.size || 0} 🏃‍♂️ ︱ ${this.torrentTracker?.peersAll || 0} 🕸`,
            type: 'WATCHING',
            url: environment.baseUrl
          }
        ]
      });
    }
  }

  @Cron(
    CronExpression.EVERY_10_SECONDS,
    {
      name: CONSTANTS.cronTrackerStatistics
    }
  )
  async statistics(): Promise<void> {
    if (!this.cfg.CRON[CONSTANTS.cronTrackerStatistics]) {
      const startTime = new Date();
      this.gs.log('[CRON_TASK_TRACKER_STATISTICS-START] 🐾', `${startTime}`);
      this.cfg.CRON[CONSTANTS.cronTrackerStatistics] = true;
      try {
        const url = new URL(`http://tracker.${environment.domain}/stats.json`);
        const res_raw = await this.api.getData(url, {
          ...environment.nodeJsXhrHeader
        });
        this.torrentTracker = await res_raw.json();
      } catch (error) {
        this.gs.log('[CRON_TASK_TRACKER_STATISTICS-ERROR] 🐾', error, 'error');
      }
      this.updateVisitor();
      this.cfg.CRON[CONSTANTS.cronTrackerStatistics] = false;
      const endTime = new Date();
      const elapsedTime = endTime.getTime() - startTime.getTime();
      this.gs.log('[CRON_TASK_TRACKER_STATISTICS-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
    }
  }

}
