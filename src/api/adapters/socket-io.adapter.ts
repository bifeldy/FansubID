import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

import { Server, ServerOptions } from 'socket.io';

import { ApiKeyService } from '../repository/api-key.service';
import { GlobalService } from '../services/global.service';

export class SocketIoAdapter extends IoAdapter {

  private aks: ApiKeyService;
  private gs: GlobalService;

  constructor(
    private app: INestApplication
  ) {
    super(app.getHttpServer());
    this.aks = this.app.get(ApiKeyService);
    this.gs = this.app.get(GlobalService);
  }

  override createIOServer(port: number, options?: ServerOptions): Server {
    options.allowEIO3 = true;
    options.cors = this.aks.getCorsOptions();
    options.allowRequest = (request, allowFunction) => {
      this.gs.log('[SOCKET_IO_ADAPTER-REQUEST] 📏', request.headers);
      return allowFunction(null, true);
    };
    const server = super.createIOServer(port, options);
    return server;
  }

}