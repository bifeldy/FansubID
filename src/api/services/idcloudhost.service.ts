// 3rd Party Library
import { WebSocket } from 'ws';

// NodeJS Library
import cluster from 'node:cluster';

import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { GlobalService } from './global.service';
import { ConfigService } from './config.service';

@Injectable()
export class IdCloudHostService {

  wsMainSite: WebSocket;

  constructor(
    private sr: SchedulerRegistry,
    private gs: GlobalService,
    private cfg: ConfigService
  ) {
    if (environment.production && cluster.isMaster) {
      this.connect();
    }
  }

  getStatsUrl(loc: string, vmUuid: string): string {
    return `
      ${environment.idCloudHost.wsUrl}/${loc}/metrics-ws/index
        ?subscribe=true
        &apikey=${environment.idCloudHost.apiKey}
        &query=${encodeURIComponent(`
            (
              (host =~ "${vmUuid}") and
              (
                service =~ "libvirt.guest_time_per_vcpu_delta" or
                service =~ "libvirt.used_memory_kb" or
                service =~ "libvirt.block_wr_bytes_delta" or
                service =~ "libvirt.net_tx_bytes_delta" or
                service =~ "libvirt.net_rx_bytes_delta"
              )
            )
          `.replace(/\s\s+/g, ' ').trim())
        }
    `.replace(/\s\s+/g, '').trim();
  }

  onClose(code, data): void {
    const reason = data.toString();
    this.gs.log(`[ID_CLOUD_HOST_SERVICE-ON_CLOSE] ⛈`, { code, reason });
    this.sr.addTimeout(
      CONSTANTS.timeoutReconnectSocketKey,
      setTimeout(() => {
        this.mainSite();
      }, CONSTANTS.timeoutReconnectSocketTime)
    );
  }

  async onMessage(data, isBinary): Promise<void> {
    const message = isBinary ? data : data.toString();
    this.gs.log('[ID_CLOUD_HOST_SERVICE-ON_MESSAGE] ⛈', message);
    const json = JSON.parse(message);
    if (json.service === 'libvirt.used_memory_kb') {
      this.cfg.statsServerSet({
        mem_ram: json.metric * 1000
      });
    } else if (json.service === 'libvirt.block_wr_bytes_delta') {
      this.cfg.statsServerSet({
        disk_io: json.metric
      });
    } else if (json.service === 'libvirt.guest_time_per_vcpu_delta') {
      this.cfg.statsServerSet({
        cpus: json.metric * 100
      });
    } else if (json.service === 'libvirt.net_tx_bytes_delta') {
      this.cfg.statsServerSet({
        net_tx: json.metric
      });
    } else if (json.service === 'libvirt.net_rx_bytes_delta') {
      this.cfg.statsServerSet({
        net_rx: json.metric
      });
    }
  }

  mainSite(): void {
    const urlMainSite = this.getStatsUrl('jkt01', environment.idCloudHost.mainSite);
    this.wsMainSite = new WebSocket(urlMainSite);

    this.wsMainSite.on('open', () => {
      this.gs.log('[ID_CLOUD_HOST_SERVICE-ON_OPEN-mainSite] ⛈', urlMainSite);
    });

    this.wsMainSite.on('error', (err) => {
      this.gs.log('[ID_CLOUD_HOST_SERVICE-ON_ERROR-mainSite] ⛈', err, 'error');
      this.wsMainSite.close();
    });

    this.wsMainSite.on('close', (code, data) => {
      this.onClose(code, data);
    });

    this.wsMainSite.on('message', (data, isBinary) => {
      this.onMessage(data, isBinary);
    });
  }

  connect(): void {
    this.mainSite();
  }

}
