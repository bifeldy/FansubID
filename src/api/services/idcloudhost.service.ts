// 3rd Party Library
import { WebSocket } from 'ws';

import { Injectable } from '@nestjs/common';

import { environment } from '../../environments/api/environment';

import { GlobalService } from './global.service';
import { ConfigService } from '../services/config.service';

@Injectable()
export class IdCloudHostService {

  wssStatsUrl = `
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
    private cfg: ConfigService
  ) {
    this.connect();
  }

  onOpen(): void {
    this.gs.log('[ID_CLOUD_HOST_SERVICE-ON_OPEN] ⛈', this.wssStatsUrl);
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
      this.cfg.statsServer.mem_ram = json.metric * 1000;
    } else if (json.service === 'libvirt.block_wr_bytes_delta') {
      this.cfg.statsServer.disk_io = json.metric;
    } else if (json.service === 'libvirt.guest_time_per_vcpu_delta') {
      this.cfg.statsServer.cpus = json.metric * 100;
    } else if (json.service === 'libvirt.net_tx_bytes_delta') {
      this.cfg.statsServer.net_tx = json.metric;
    } else if (json.service === 'libvirt.net_rx_bytes_delta') {
      this.cfg.statsServer.net_rx = json.metric;
    }
  }

  connect(): void {
    this.ws = new WebSocket(this.wssStatsUrl);
    this.ws.on('open', this.onOpen.bind(this));
    this.ws.on('error', this.onError.bind(this));
    this.ws.on('close', this.onClose.bind(this));
    this.ws.on('message', this.onMessage.bind(this));
  }

  send(data: any) {
    this.ws.send(data);
  }

}
