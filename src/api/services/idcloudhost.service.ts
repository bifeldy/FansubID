// 3rd Party Library
import { WebSocket } from 'ws';

import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

import { CONSTANTS } from '../../constants';

import { environment } from '../../environments/api/environment';

import { GlobalService } from './global.service';
import { ConfigService } from '../services/config.service';

@Injectable()
export class IdCloudHostService {

  wsMainSite: WebSocket;

  constructor(
    private sr: SchedulerRegistry,
    private gs: GlobalService,
    private cfg: ConfigService
  ) {
    if (environment.production) {
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

  onClose(code, data, statsName): void {
    const reason = data.toString();
    this.gs.log(`[ID_CLOUD_HOST_SERVICE-ON_CLOSE-${statsName}] ⛈`, { code, reason });
    this.sr.addTimeout(
      `${CONSTANTS.timeoutReconnectSocketKey}-${statsName}`,
      setTimeout(() => {
        this[statsName]();
      }, CONSTANTS.timeoutReconnectSocketTime)
    );
  }

  onMessage(data, isBinary, statsName): void {
    const message = isBinary ? data : data.toString();
    this.gs.log(`[ID_CLOUD_HOST_SERVICE-ON_MESSAGE-${statsName}] ⛈`, message);
    const json = JSON.parse(message);
    if (json.service === 'libvirt.used_memory_kb') {
      this.cfg.statsServer[statsName].mem_ram = json.metric * 1000;
    } else if (json.service === 'libvirt.block_wr_bytes_delta') {
      this.cfg.statsServer[statsName].disk_io = json.metric;
    } else if (json.service === 'libvirt.guest_time_per_vcpu_delta') {
      this.cfg.statsServer[statsName].cpus = json.metric * 100;
    } else if (json.service === 'libvirt.net_tx_bytes_delta') {
      this.cfg.statsServer[statsName].net_tx = json.metric;
    } else if (json.service === 'libvirt.net_rx_bytes_delta') {
      this.cfg.statsServer[statsName].net_rx = json.metric;
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
      this.onClose(code, data, 'mainSite');
    });

    this.wsMainSite.on('message', (data, isBinary) => {
      this.onMessage(data, isBinary, 'mainSite');
    });
  }

  connect(): void {
    this.mainSite();
  }

}
