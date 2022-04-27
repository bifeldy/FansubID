import { ServerInfoModel } from '../models/socket-io.model';

import { log } from './helpers/logger';

let settings: ServerInfoModel = {
  consoleLog: false,
  isMaintenance: false,
  winboxOpenLink: true,
  discordNotification: true,
  openForRegister: true
};

export function serverGet(): ServerInfoModel {
  return settings;
}

export function serverSet(data): void {
  for (const key in data) {
    if (settings.hasOwnProperty(key)) {
      log(`[SERVER_SET_${key.toUpperCase()}] 👀`, data[key]);
      settings[key] = data[key];
    }
  }
}

export function serverGetConsoleLog(): boolean {
  return settings.consoleLog;
}

export function serverGetMaintenance(): boolean {
  return settings.isMaintenance;
}

export function serverGetWinboxOpenLink(): boolean {
  return settings.winboxOpenLink;
}

export function serverGetDiscordNotification(): boolean {
  return settings.discordNotification;
}

export function serverGetOpenForRegister(): any {
  return settings.openForRegister;
}
