import { ServerInfo } from "../app/_shared/models/ServerInfo";

let settings: ServerInfo = {
  isMaintenance: false
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
