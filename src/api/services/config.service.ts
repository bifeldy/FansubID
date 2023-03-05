import { Injectable } from '@nestjs/common';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { ServerInfoModel } from '../../models/socket-io.model';

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

  CRON = {
    [CONSTANTS.cronFansubRssFeed]: false,
    [CONSTANTS.cronTrackerStatistics]: false
  };

  github = null;

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
