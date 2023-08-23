// NodeJS Library
import { URL } from 'node:url';

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../services/global.service';
import { ConfigService } from '../services/config.service';

@Injectable()
export class VpsBillingService {

  header = { ...environment.nodeJsXhrHeader, apikey: environment.idCloudHost.apiKey };

  constructor(
    private cfg: ConfigService,
    private gs: GlobalService,
    private api: ApiService
  ) {
    //
  }

  @Cron(
    CronExpression.EVERY_10_MINUTES,
    {
      name: CONSTANTS.cronVpsBilling
    }
  )
  async updateBilling(): Promise<void> {
    const startTime = new Date();
    this.gs.log('[CRON_VPS_BILLING-START] 🐾', `${startTime}`);
    try {
      const url = new URL(`${environment.idCloudHost.apiUrl}/payment/billing_account/list`)
      const res_raw = await this.api.getData(url, this.header);
      const res_json: any = await res_raw.json();
      const json = res_json[0];
      this.cfg.statsServer.billing.ongoing = json.precalc_ongoing || json.running_totals?.ongoing;
    } catch (error) {
      this.gs.log('[CRON_VPS_BILLING-ERROR] 🐾', error, 'error');
    }
    const endTime = new Date();
    const elapsedTime = endTime.getTime() - startTime.getTime();
    this.gs.log('[CRON_VPS_BILLING-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
  }

}
