import { ServerInfo } from '../app/_shared/models/ServerInfo';

let settings: ServerInfo = {
  isMaintenance: false,
  winboxOpenLink: false
};

// eslint-disable-next-line 
export function serverGet() {
  return settings;
}

export function serverSet(server): void {
  settings = server;
}

// eslint-disable-next-line 
export function serverGetMaintenance() {
  return settings.isMaintenance;
}

export function serverSetMaintenance(isMaintenance: boolean): void {
  settings.isMaintenance = isMaintenance;
}

// eslint-disable-next-line
export function serverGetWinboxOpenLink() {
  return settings.winboxOpenLink;
}

export function serverSetWinboxOpenLink(winboxOpenLink: boolean): void {
  settings.winboxOpenLink = winboxOpenLink;
}
