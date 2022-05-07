import { INestApplication, Injectable } from '@nestjs/common';

import { ServerInfoModel } from '../../models/socket-io.model';

@Injectable()
export class ConfigService {

  appInstance: INestApplication = null;

  // Prevent Circular Dependency Injection
  gs = null;

  github = null;

  mailSMTP = {
    mailgun: true,
    ymail: false,
    gmail: false
  };

  settings: ServerInfoModel = {
    consoleLog: false,
    isMaintenance: false,
    winboxOpenLink: true,
    discordNotification: true,
    openForRegister: true
  }

  constructor(
    //
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

  serverGetConsoleLog(): boolean {
    return this.serverGet().consoleLog;
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
