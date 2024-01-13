// 3rd Party Library
import parsePrometheusTextFormat from 'parse-prometheus-text-format';

// NodeJS Library
import cluster from 'node:cluster';
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../services/global.service';
import { DiscordService } from '../services/discord.service';
import { ConfigService } from '../services/config.service';

@Injectable()
export class TrackerStatisticsService {

  constructor(
    private sr: SchedulerRegistry,
    private gs: GlobalService,
    private cfg: ConfigService,
    private api: ApiService,
    private ds: DiscordService
  ) {
    //
  }

  updateVisitor(discordBotStatus: string): void {
    this.ds.bot?.user?.setPresence({
      status: 'idle',
      activities: [
        {
          name: `:: ${discordBotStatus}`,
          type: 'WATCHING',
          url: environment.baseUrl
        }
      ]
    });
  }

  @Cron(
    CronExpression.EVERY_5_MINUTES,
    {
      name: CONSTANTS.cronTrackerStatistics
    }
  )
  async statistics(): Promise<void> {
    if (cluster.isMaster) {
      const job = this.sr.getCronJob(CONSTANTS.cronTrackerStatistics);
      job.stop();
      const startTime = new Date();
      this.gs.log('[CRON_TASK_TRACKER_STATISTICS-START] 🐾', `${startTime}`);
      try {
        let torrentTrackerHttp = 0;
        const url1 = new URL(`http://tracker.fansub.id/stats-http`);
        const res_raw1 = await this.api.getData(url1, {
          ...environment.nodeJsXhrHeader
        });
        if (res_raw1.ok) {
          const http: any[] = parsePrometheusTextFormat(await res_raw1.text());
          const aquatic_peers = http.find(x => x.name === 'aquatic_peers');
          if (aquatic_peers) {
            const metrics: any[] = aquatic_peers.metrics;
            for (const m of metrics) {
              torrentTrackerHttp += Number(m.value);
            }
          }
        }
        let torrentTrackerWs = 0;
        const url2 = new URL(`http://tracker.fansub.id/stats-ws`);
        const res_raw2 = await this.api.getData(url2, {
          ...environment.nodeJsXhrHeader
        });
        if (res_raw2.ok) {
          const ws: any[] = parsePrometheusTextFormat(await res_raw2.text());
          const aquatic_peers = ws.find(x => x.name === 'aquatic_peers');
          if (aquatic_peers) {
            const metrics: any[] = aquatic_peers.metrics;
            for (const m of metrics) {
              torrentTrackerWs += Number(m.value);
            }
          }
        }
        const peers = torrentTrackerHttp + torrentTrackerWs;
        this.cfg.statsServerSet({ peers });
        this.updateVisitor(`🔗 ${peers} Peers`);
      } catch (error) {
        this.gs.log('[CRON_TASK_TRACKER_STATISTICS-ERROR] 🐾', error, 'error');
      }
      const endTime = new Date();
      const elapsedTime = endTime.getTime() - startTime.getTime();
      this.gs.log('[CRON_TASK_TRACKER_STATISTICS-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
      job.start();
    } else {
      this.sr.getCronJob(CONSTANTS.cronTrackerStatistics).stop();
    }
  }

}
