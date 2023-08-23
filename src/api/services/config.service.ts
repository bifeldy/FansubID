import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { ServerInfoModel, StatsServerModel } from '../../models/socket-io.model';

import { GlobalService } from './global.service';

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

  github = null;

  statsServer: StatsServerModel = {
    mainSite: {
      cpus: 0,
      mem_ram: 0,
      disk_io: 0,
      net_tx: 0,
      net_rx: 0
    },
    billing: {
      ongoing: 0
    }
  };

  settings: ServerInfoModel = {
    isMaintenance: false,
    winboxOpenLink: false,
    discordNotification: true,
    openForRegister: true
  }

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  serverGet(): ServerInfoModel {
    return this.settings;
  }

  serverSet(data): void {
    for (const key in data) {
      if (this.settings.hasOwnProperty(key)) {
        this.gs?.log(`[CONFIG_SERVICE-SERVER_SET_${key.toUpperCase()}] 👀`, data[key]);
        this.settings[key] = data[key];
      }
    }
  }

  serverGetMaintenance(): boolean {
    return this.serverGet().isMaintenance;
  }

  serverGetWinboxOpenLink(): boolean {
    return this.serverGet().winboxOpenLink;
  }

  serverGetDiscordNotification(): boolean {
    return this.serverGet().discordNotification;
  }

  serverGetOpenForRegister(): boolean {
    return this.serverGet().openForRegister;
  }

}
