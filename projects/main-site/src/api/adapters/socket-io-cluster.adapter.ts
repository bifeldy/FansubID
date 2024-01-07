// 3rd Party Library
import { setupWorker } from '@socket.io/sticky';
import { createAdapter } from '@socket.io/cluster-adapter';

import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { Equal, ILike } from 'typeorm';

import { ApiKeyService } from '../repository/api-key.service';
import { ConfigService } from '../services/config.service';
import { GlobalService } from '../services/global.service';

export class SocketIoClusterAdapter extends IoAdapter {

  private aks: ApiKeyService;
  private cfg: ConfigService;
  private gs: GlobalService;

  constructor(
    private app: INestApplication
  ) {
    super(app.getHttpServer());
    this.aks = this.app.get(ApiKeyService);
    this.cfg = this.app.get(ConfigService);
    this.gs = this.app.get(GlobalService);
  }

  override createIOServer(port: number, options?: ServerOptions): Server {
    options.allowEIO3 = true;
    options.cors = this.aks.getCorsOptions();
    options.allowRequest = async (req, callback) => {
      const clientOriginIpCc = this.aks.getOriginIpCc(req);
      const urlQuery = new URLSearchParams(req.url.substring(req.url.indexOf('?')));
      const key = urlQuery.get('key') || '';
      this.gs.log('[SOCKET_IO_ADAPTER-UPGRADE_ORIGIN_KEY] 📏',`${key} @ ${clientOriginIpCc.origin_ip}`);
      if (this.cfg.domainIpBypass.includes(clientOriginIpCc.origin_ip)) {
        return callback(null, true);
      }
      try {
        const cors = await this.aks.count({
          where: [
            {
              ip_domain: ILike(`%${clientOriginIpCc.origin_ip}%`),
              api_key: Equal(key)
            }
          ]
        });
        if (cors > 0) {
          return callback(null, true);
        }
        return callback(null, false);
      } catch (error) {
        this.gs.log('[SOCKET_IO_ADAPTER-UPGRADE_ERROR] 📏', error, 'error');
        return callback(error, false);
      }
    };
    const io = super.createIOServer(port, options);
    io.adapter(createAdapter());
    setupWorker(io);
    return io;
  }

}