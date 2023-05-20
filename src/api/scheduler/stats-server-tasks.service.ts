// 3rd Party Library
import { WebSocket } from 'ws';

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { GlobalService } from '../services/global.service';
import { SocketIoService } from '../services/socket-io.service';

@Injectable()
export class StatsServerService {

  statsServer = {
    cpus: 0,
    mem_ram: 0,
    disk_io: 0,
    net_tx: 0,
    net_rx: 0
  };

  wssUrl = `
    ${environment.idCloudHost.url}
      ?subscribe=true
      &apikey=${environment.idCloudHost.apiKey}
      &query=${encodeURIComponent(`
          (
            (host =~ "${environment.idCloudHost.uuid}") and
            (
              service =~ "libvirt.guest_time_per_vcpu_delta" or
              service =~ "libvirt.used_memory_kb" or
              service =~ "libvirt.block_wr_bytes_delta" or
              service =~ "libvirt.net_tx_bytes_delta" or
              service =~ "libvirt.net_rx_bytes_delta"
            )
          )
        `.replace(/\s\s+/g, ' ').trim())}
  `.replace(/\s\s+/g, '').trim();

  ws: WebSocket;

  constructor(
    private gs: GlobalService,
    private sis: SocketIoService
  ) {
    this.ws = new WebSocket(this.wssUrl);
    this.connect();
  }

  onOpen(): void {
    this.gs.log('[ID_CLOUD_HOST_SERVICE-ON_OPEN] ⛈', this.wssUrl);
  }

  onError(err): void {
    this.gs.log('[ID_CLOUD_HOST_SERVICE-ON_ERROR] ⛈', err, 'error');
  }

  onClose(code, data): void {
	const reason = data.toString();
    this.gs.log('[ID_CLOUD_HOST_SERVICE-ON_CLOSE] ⛈', { code, reason });
  }

  onMessage(data, isBinary): void {
    const message = isBinary ? data : data.toString();
    this.gs.log('[ID_CLOUD_HOST_SERVICE-ON_MESSAGE] ⛈', message);
    const json = JSON.parse(message);
    if (json.service === 'libvirt.used_memory_kb') {
      this.statsServer.mem_ram = json.metric * 1000;
    }
    if (json.service === 'libvirt.block_wr_bytes_delta') {
      this.statsServer.disk_io = json.metric;
    }
    if (json.service === 'libvirt.guest_time_per_vcpu_delta') {
      this.statsServer.cpus = json.metric * 100;
    }
    if (json.service === 'libvirt.net_tx_bytes_delta') {
      this.statsServer.net_tx = json.metric;
    }
    if (json.service === 'libvirt.net_rx_bytes_delta') {
      this.statsServer.net_rx = json.metric;
    }
  }

  connect(): void { 
    this.ws.on('open', this.onOpen.bind(this));
    this.ws.on('error', this.onError.bind(this));
    this.ws.on('close', this.onClose.bind(this));
    this.ws.on('message', this.onMessage.bind(this));
  }

  @Cron(
    CronExpression.EVERY_30_SECONDS,
    {
      name: CONSTANTS.cronStatsServer
    }
  )
  async statistics(): Promise<void> {
    const startTime = new Date();
    this.gs.log('[CRON_TASK_STATIS_SERVER-START] 🐾', `${startTime}`);
    this.sis.emitToRoomOrId(CONSTANTS.socketRoomNameGlobalPublic, 'stats-server', this.statsServer);
    const endTime = new Date();
    const elapsedTime = endTime.getTime() - startTime.getTime();
    this.gs.log('[CRON_TASK_STATIS_SERVER-END] 🐾', `${endTime} @ ${elapsedTime} ms`);
  }

}
