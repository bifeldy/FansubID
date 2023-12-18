// NodeJS Library
import cluster from 'node:cluster';
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { AttachmentService } from '../repository/attachment.service';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../services/global.service';
import { ConfigService } from '../services/config.service';

@Injectable()
export class VpsBillingService {

  header = { ...environment.nodeJsXhrHeader, apikey: environment.idCloudHost.apiKey };

  constructor(
    private sr: SchedulerRegistry,
    private cfg: ConfigService,
    private gs: GlobalService,
    private api: ApiService,
    private attachmentRepo: AttachmentService
  ) {
    //
  }

  @Cron(
    '0 */20 * * * *',
    {
      name: CONSTANTS.cronVpsBilling
    }
  )
  async updateBilling(): Promise<void> {
    if (cluster.isMaster) {
      const job = this.sr.getCronJob(CONSTANTS.cronVpsBilling);
      job.stop();
      const startTime = new Date();
      this.gs.log('[CRON_TASK_VPS_BILLING-START] 🐾', `${startTime}`);
      try {
        const attachmentSize = await this.attachmentRepo.query('SELECT SUM(size) sz FROM attachment');
        if (attachmentSize.length === 1) {
          this.cfg.statsServerSet({
            storage: Number(attachmentSize[0].sz) || 0
          });
        }
        const url = new URL(`${environment.idCloudHost.apiUrl}/payment/billing_account/list`)
        const res_raw = await this.api.getData(url, this.header);
        const res_json: any = await res_raw.json();
        const json = res_json[0];
        this.cfg.statsServerSet({
          billing: json.precalc_ongoing || json.running_totals?.ongoing
        });
      } catch (error) {
        this.gs.log('[CRON_TASK_VPS_BILLING-ERROR] 🐾', error, 'error');
      }
      const endTime = new Date();
      const elapsedTime = endTime.getTime() - startTime.getTime();
      this.gs.log('[CRON_TASK_VPS_BILLING-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
      job.start();
    } else {
      this.sr.getCronJob(CONSTANTS.cronVpsBilling).stop();
    }
  }

}
