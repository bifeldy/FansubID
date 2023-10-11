// 3rd Party Library
import ClusterMessages from 'cluster-messages';

// NodeJS Library
import cluster from 'node:cluster';

import { Injectable } from '@nestjs/common';

import { GlobalService } from './global.service';
import { TaskCronJobService } from './task-cron-job.service';

@Injectable()
export class ClusterMasterSlaveService {

  messages: ClusterMessages = new ClusterMessages();

  constructor(
    private gs: GlobalService,
    private tcjs: TaskCronJobService
  ) {
    //
  }

  //
  // Wajib Kirim Object (Callback) Yang Tidak Ada Reference Lain
  // Harus Plain Yang Bisa Di Stringify Jadi Teks String Biasa
  //

  masterMessages(): void {
    if (cluster.isMaster) {

      this.messages.on('CRON_GET', (data, callback) => {
        this.gs.log(`[MASTER_CRON_GET]`, data);
        try {
          const jobs = this.tcjs.getAll();
          this.gs.log(`[MASTER_CRON_GET_JOBS]`, jobs);
          callback({ error: null, data: jobs });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CRON_PUT', (data, callback) => {
        this.gs.log(`[MASTER_CRON_PUT]`, data);
        try {
          const job = this.tcjs.getByIdKey(data);
          this.gs.log(`[MASTER_CRON_PUT_JOB]`, job);
          callback({ error: null, data: job });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

    }
  }

}
