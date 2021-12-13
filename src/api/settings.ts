import { ServerInfo } from '../app/_shared/models/ServerInfo';

import { log } from './helpers/logger';

let settings: ServerInfo = {
  isMaintenance: false,
  winboxOpenLink: true,
  discordNotification: true
};

export function serverGet(): ServerInfo {
  return settings;
}

export function serverSet(server): void {
  log('[SERVER_SET] 👀', server);
  settings = server;
}

export function serverGetMaintenance(): boolean {
  return settings.isMaintenance;
}

export function serverSetMaintenance(isMaintenance: boolean): void {
  log('[SERVER_SET_MAINTENANCE] 👀', isMaintenance);
  settings.isMaintenance = isMaintenance;
}

export function serverGetWinboxOpenLink(): boolean {
  return settings.winboxOpenLink;
}

export function serverSetWinboxOpenLink(winboxOpenLink: boolean): void {
  log('[SERVER_SET_WINBOX] 👀', winboxOpenLink);
  settings.winboxOpenLink = winboxOpenLink;
}

export function serverGetDiscordNotification(): boolean {
  return settings.discordNotification;
}

export function serverSetDiscordNotification(discordNotification: boolean): void {
  log('[SERVER_SET_DISCORD] 👀', discordNotification);
  settings.discordNotification = discordNotification;
}
