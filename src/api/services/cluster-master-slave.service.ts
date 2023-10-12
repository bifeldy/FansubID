// 3rd Party Library
import ClusterMessages from 'cluster-messages';

// NodeJS Library
import cluster from 'node:cluster';

import { Injectable } from '@nestjs/common';

import { GlobalService } from './global.service';
import { TaskCronJobService } from './task-cron-job.service';
import { ConfigService } from './config.service';

@Injectable()
export class ClusterMasterSlaveService {

  messages: ClusterMessages = new ClusterMessages();

  constructor(
    private gs: GlobalService,
    private tcjs: TaskCronJobService,
    private cfg: ConfigService
  ) {
    //
  }

  //
  // Wajib Kirim Object (Callback) Yang Tidak Ada Reference Lain
  // Harus Plain Yang Bisa Di Stringify Jadi Teks String Biasa
  //

  sendMessageToMaster(command: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (cluster.isWorker) {
        this.gs.log('[SLAVE_SEND_MESSAGE_DATA]', data);
        this.messages.send(command, data, response => {
          if (response.error) {
            reject(response.error);
          } else {
            resolve(response.data);
          }
        });
      } else {
        reject('Only Slave Worker Can Do This!');
      }
    });
  }

  masterHandleMessages(): void {
    if (cluster.isMaster) {

      this.messages.on('CRON_GET', (data, callback) => {
        this.gs.log(`[MASTER_CRON_GET]`, data);
        try {
          const jobs = this.tcjs.getAll();
          this.gs.log('[MASTER_CRON_GET_JOBS]', jobs);
          callback({ error: null, data: jobs });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CRON_PUT', (data, callback) => {
        this.gs.log(`[MASTER_CRON_PUT]`, data);
        try {
          const job = this.tcjs.getByIdKey(data);
          this.gs.log('[MASTER_CRON_PUT_JOB]', job);
          callback({ error: null, data: job });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_GITHUB_GET', (data, callback) => {
        this.gs.log(`[MASTER_CFG_GITHUB_GET]`, data);
        try {
          const github = this.cfg.githubGet();
          this.gs.log('[MASTER_CFG_GITHUB_GET]', github);
          callback({ error: null, data: github });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_STATS_SET', (data, callback) => {
        this.gs.log(`[MASTER_CFG_STATS_SET]`, data);
        try {
          this.cfg.statsServerSet(data);
          callback({ error: null, data: null });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_STATS_GET', (data, callback) => {
        this.gs.log(`[MASTER_CFG_STATS_GET]`, data);
        try {
          const stats = this.cfg.statsServerGet();
          this.gs.log('[MASTER_CFG_STATS_GET]', stats);
          callback({ error: null, data: stats });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_SERVER_SET', (data, callback) => {
        this.gs.log(`[MASTER_CFG_SERVER_SET]`, data);
        try {
          this.cfg.serverSet(data);
          callback({ error: null, data: null });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_SERVER_GET', (data, callback) => {
        this.gs.log(`[MASTER_CFG_SERVER_GET]`, data);
        try {
          const config = this.cfg.serverGet();
          this.gs.log('[MASTER_CFG_SERVER_GET_CONFIG]', config);
          callback({ error: null, data: config });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_SERVER_GET_MAINTENANCE', (data, callback) => {
        this.gs.log(`[MASTER_CFG_SERVER_GET_MAINTENANCE]`, data);
        try {
          const isMaintenance = this.cfg.serverGetMaintenance();
          this.gs.log('[MASTER_CFG_SERVER_GET_MAINTENANCE]', isMaintenance);
          callback({ error: null, data: isMaintenance });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_SERVER_GET_OPEN_FOR_REGISTER', (data, callback) => {
        this.gs.log(`[MASTER_CFG_SERVER_GET_OPEN_FOR_REGISTER]`, data);
        try {
          const isoOpenForRegister = this.cfg.serverGetOpenForRegister();
          this.gs.log('[MASTER_CFG_SERVER_GET_OPEN_FOR_REGISTER]', isoOpenForRegister);
          callback({ error: null, data: isoOpenForRegister });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

    }
  }

}
