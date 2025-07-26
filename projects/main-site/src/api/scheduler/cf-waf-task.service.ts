// NodeJS Library
import cluster from 'node:cluster';

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

import { CONSTANTS } from '../../constants';

import { GlobalService } from '../services/global.service';
import { CloudflareService } from '../services/cloudflare.service';
import { FailToBanService } from '../repository/fail-to-ban.service';

@Injectable()
export class CfWafService {

  constructor(
    private sr: SchedulerRegistry,
    private gs: GlobalService,
    private cfs: CloudflareService,
    private ftb: FailToBanService
  ) {
    //
  }

  @Cron(
    CronExpression.EVERY_MINUTE,
    {
      name: CONSTANTS.cronCloudflareBan
    }
  )
  async unBanIp(): Promise<void> {
    if (cluster.isMaster) {
      const job = this.sr.getCronJob(CONSTANTS.cronCloudflareBan);
      job.stop();
      const startTime = new Date();
      this.gs.log('[CRON_TASK_CLOUDFLARE_BAN-START] 🐾', `${startTime}`);
      try {
        const failToBan = await this.ftb.find({
          order: {
            ip_domain: 'ASC'
          }
        });
        for (const _ftb of failToBan) {
          try {
            if (_ftb.rule_id) {
              const diffDateMs = startTime.getTime() - new Date(_ftb.updated_at).getTime();
              if (diffDateMs >= CONSTANTS.failToBanBlockDuration) {
                const resBan = await this.cfs.deleteFailToBan(_ftb.rule_id);
                if (resBan && resBan.status >= 200 && resBan.status < 400) {
                  await this.ftb.remove(_ftb);
                }
              }
            } else {
              await this.ftb.remove(_ftb);
            }
          } catch (e) {
            this.gs.log('[CRON_TASK_CLOUDFLARE_BAN-ERROR_DELETE] 🐾', e, 'error');
          }
        }
      } catch (error) {
        this.gs.log('[CRON_TASK_CLOUDFLARE_BAN-ERROR] 🐾', error, 'error');
      }
      const endTime = new Date();
      const elapsedTime = endTime.getTime() - startTime.getTime();
      this.gs.log('[CRON_TASK_CLOUDFLARE_BAN-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
      job.start();
    } else {
      this.sr.getCronJob(CONSTANTS.cronCloudflareBan).stop();
    }
  }

}
