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

      this.messages.on('CRON_GET', (_, callback) => {
        this.gs.log(`[MASTER_CRON_GET]`, _);
        try {
          const jobs = this.tcjs.getAll();
          this.gs.log('[MASTER_CRON_GET]', jobs);
          callback({ error: null, data: jobs });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CRON_PUT', (text, callback) => {
        this.gs.log(`[MASTER_CRON_PUT]`, text);
        try {
          const job = this.tcjs.getByIdKey(text);
          this.gs.log('[MASTER_CRON_PUT]', job);
          callback({ error: null, data: job });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_GITHUB_SET', (obj, callback) => {
        this.gs.log(`[MASTER_CFG_GITHUB_SET]`, obj);
        try {
          this.cfg.githubSet(obj);
          callback({ error: null, data: null });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_GITHUB_GET', (_, callback) => {
        this.gs.log(`[MASTER_CFG_GITHUB_GET]`, _);
        try {
          const github = this.cfg.githubGet();
          this.gs.log('[MASTER_CFG_GITHUB_GET]', github);
          callback({ error: null, data: github });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_STATS_SET', (text, callback) => {
        this.gs.log(`[MASTER_CFG_STATS_SET]`, text);
        try {
          this.cfg.serverSet(text);
          callback({ error: null, data: null });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_STATS_GET', (_, callback) => {
        this.gs.log(`[MASTER_CFG_STATS_GET]`, _);
        try {
          const stats = this.cfg.statsServerGet();
          this.gs.log('[MASTER_CFG_STATS_GET]', stats);
          callback({ error: null, data: stats });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_SERVER_SET', (text, callback) => {
        this.gs.log(`[MASTER_CFG_SERVER_SET]`, text);
        try {
          this.cfg.serverSet(text);
          callback({ error: null, data: null });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_SERVER_GET', (_, callback) => {
        this.gs.log(`[MASTER_CFG_SERVER_GET]`, _);
        try {
          const config = this.cfg.serverGet();
          this.gs.log('[MASTER_CFG_SERVER_GET]', config);
          callback({ error: null, data: config });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_SERVER_GET_MAINTENANCE', (_, callback) => {
        this.gs.log(`[MASTER_CFG_SERVER_GET_MAINTENANCE]`, _);
        try {
          const isMaintenance = this.cfg.serverGetMaintenance();
          this.gs.log('[MASTER_CFG_SERVER_GET_MAINTENANCE]', isMaintenance);
          callback({ error: null, data: isMaintenance });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_SERVER_GET_OPEN_FOR_REGISTER', (_, callback) => {
        this.gs.log(`[MASTER_CFG_SERVER_GET_OPEN_FOR_REGISTER]`, _);
        try {
          const isoOpenForRegister = this.cfg.serverGetOpenForRegister();
          this.gs.log('[MASTER_CFG_SERVER_GET_OPEN_FOR_REGISTER]', isoOpenForRegister);
          callback({ error: null, data: isoOpenForRegister });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_ROOM_SOCKET_GET_ALL', (_, callback) => {
        this.gs.log(`[MASTER_CFG_ROOM_SOCKET_GET_ALL]`, _);
        try {
          const rooms = this.cfg.roomSocketGetAll();
          this.gs.log('[MASTER_CFG_ROOM_SOCKET_GET_ALL]', rooms);
          callback({ error: null, data: rooms });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_ROOM_SOCKET_GET_ROOM', (text, callback) => {
        this.gs.log(`[MASTER_CFG_ROOM_SOCKET_GET_ROOM]`, text);
        try {
          const room = this.cfg.roomSocketGetRoom(text);
          this.gs.log('[MASTER_CFG_ROOM_SOCKET_GET_ROOM]', room);
          callback({ error: null, data: room });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_ROOM_SOCKET_GET_USER', (obj, callback) => {
        this.gs.log(`[MASTER_CFG_ROOM_SOCKET_GET_USER]`, obj);
        try {
          const user = this.cfg.roomSocketGetUser(obj.roomId, obj.socketId);
          this.gs.log('[MASTER_CFG_ROOM_SOCKET_GET_USER]', user);
          callback({ error: null, data: user });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_ROOM_SOCKET_REMOVE_USER', (obj, callback) => {
        this.gs.log(`[MASTER_CFG_ROOM_SOCKET_REMOVE_USER]`, obj);
        try {
          this.cfg.roomSocketRemoveUser(obj.roomId, obj.socketId);
          callback({ error: null, data: null });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_ROOM_SOCKET_ADD_OR_UPDATE_USER', (obj, callback) => {
        this.gs.log(`[MASTER_CFG_ROOM_SOCKET_ADD_OR_UPDATE_USER]`, obj);
        try {
          this.cfg.roomSocketAddOrUpdateUser(obj.roomId, obj.socketId, obj.user);
          callback({ error: null, data: null });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_ROOM_SHOW_QUESTION', (text, callback) => {
        this.gs.log(`[MASTER_CFG_ROOM_SHOW_QUESTION]`, text);
        try {
          const question = this.cfg.quizRoomShowQuestion(text);
          this.gs.log('[MASTER_CFG_ROOM_SHOW_QUESTION]', question);
          callback({ error: null, data: question });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

      this.messages.on('CFG_ROOM_CREATE_QUESTION', (obj, callback) => {
        this.gs.log(`[MASTER_CFG_ROOM_CREATE_QUESTION]`, obj);
        try {
          const question = this.cfg.quizRoomCreateQuestion(obj.roomId, obj.question);
          this.gs.log('[MASTER_CFG_ROOM_SHOW_QUESTION]', question);
          callback({ error: null, data: question });
        } catch (e) {
          callback({ error: e, data: null });
        }
      });

    }
  }

}
