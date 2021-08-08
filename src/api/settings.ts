import { ServerInfo } from '../app/_shared/models/ServerInfo';

let settings: ServerInfo = {
  isMaintenance: false,
  winboxOpenLink: false
};

// tslint:disable-next-line: typedef
export function serverGet() {
  return settings;
}

export function serverSet(server): void {
  settings = server;
}

// tslint:disable-next-line: typedef
export function serverGetMaintenance() {
  return settings.isMaintenance;
}

export function serverSetMaintenance(isMaintenance: boolean): void {
  settings.isMaintenance = isMaintenance;
}

// tslint:disable-next-line: typedef
export function serverGetWinboxOpenLink() {
  return settings.winboxOpenLink;
}

export function serverSetWinboxOpenLink(winboxOpenLink: boolean): void {
  settings.winboxOpenLink = winboxOpenLink;
}
