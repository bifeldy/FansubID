import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { RoomModel, ServerInfoModel, StatsServerModel } from '../../models/socket-io.model';
import { UserModel } from '../../models/req-res.model';

@Injectable()
export class ConfigService {

  domainIpBypass = [
    environment.domain,
    environment.domain_alt,
    environment.ip,
    '127.0.0.1',
    '::1',
    'localhost'
  ];

  private github = null;

  private statsServer: StatsServerModel = {
    cpus: 0,
    mem_ram: 0,
    disk_io: 0,
    net_tx: 0,
    net_rx: 0,
    billing: 0
  };

  private settings: ServerInfoModel = {
    isMaintenance: false,
    winboxOpenLink: false,
    discordNotification: true,
    openForRegister: true
  }

  private room_socket: RoomModel = {};

  constructor(
    //
  ) {
    //
  }

  //
  // Shared
  //
  // Akses Dari Cluster Worker Via
  // ClusterMasterSlaveService
  //

  githubGet(): any {
    return this.github;
  }

  githubSet(data): any {
    this.github = data;
  }

  statsServerGet(): StatsServerModel {
    return this.statsServer;
  }

  statsServerSet(data: StatsServerModel): void {
    for (const key in data) {
      if (this.statsServer.hasOwnProperty(key)) {
        this.statsServer[key] = data[key];
      }
    }
  }

  serverGet(): ServerInfoModel {
    return this.settings;
  }

  serverSet(data: ServerInfoModel): void {
    for (const key in data) {
      if (this.settings.hasOwnProperty(key)) {
        this.settings[key] = data[key];
      }
    }
  }

  serverGetMaintenance(): boolean {
    return this.serverGet().isMaintenance;
  }

  serverGetOpenForRegister(): boolean {
    return this.serverGet().openForRegister;
  }

  roomSocketGetAll(): RoomModel {
    return this.room_socket;
  }

  roomSocketGetRoom(roomId: string): any {
    return this.room_socket[roomId];
  }

  roomSocketGetUser(roomId: string, socketId: string): UserModel {
    if (!this.room_socket[roomId]) {
      this.room_socket[roomId] = {};
    }
    return this.room_socket[roomId][socketId];
  }

  roomSocketRemoveUser(roomId: string, socketId: string): void {
    if (!this.room_socket[roomId]) {
      this.room_socket[roomId] = {};
    }
    delete this.room_socket[roomId][socketId];
  }

  roomSocketAddOrUpdateUser(roomId: string, socketId: string, user: UserModel): void {
    if (!this.room_socket[roomId]) {
      this.room_socket[roomId] = {};
    }
    this.room_socket[roomId][socketId] = user;
  }

}
