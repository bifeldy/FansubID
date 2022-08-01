import { Injectable } from '@nestjs/common';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { ServerInfoModel } from '../../models/socket-io.model';

import { GlobalService } from './global.service';

@Injectable()
export class ConfigService {

  bypassApiKeyRateLimit = [
    environment.domain,
    environment.ip,
    '127.0.0.1',
    '::1',
    'localhost'
  ];

  CRON = {
    [CONSTANTS.cronFansubRssFeed]: false
  };

  github = null;

  mailSMTP = {
    mailgun: true,
    ymail: false,
    gmail: false
  };

  settings: ServerInfoModel = {
    isMaintenance: false,
    winboxOpenLink: true,
    discordNotification: true,
    openForRegister: true
  }

  constructor(
    private gs: GlobalService
  ) {
    //
  }

  mailSet(provider: string): void {
    for (const key in this.mailSMTP) {
      this.mailSMTP[key] = false;
    }
    if (this.mailSMTP.hasOwnProperty(provider)) {
      this.mailSMTP[provider] = true;
    }
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
