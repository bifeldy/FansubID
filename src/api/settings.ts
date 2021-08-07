import { ServerInfo } from '../app/_shared/models/ServerInfo';

let settings: ServerInfo = {
  isMaintenance: false,
  winboxOpenLink: true
};

export function serverGet() {
  return settings;
}

export function serverSet(server) {
  settings = server;
}

export function serverGetMaintenance() {
  return settings.isMaintenance;
}

export function serverSetMaintenance(isMaintenance: boolean) {
  settings.isMaintenance = isMaintenance;
}

export function serverGetWinboxOpenLink() {
  return settings.winboxOpenLink;
}

export function serverSetWinboxOpenLink(winboxOpenLink: boolean) {
  settings.winboxOpenLink = winboxOpenLink;
}
