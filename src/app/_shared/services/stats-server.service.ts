import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';

import { environment } from '../../../environments/environment';

import { GlobalService } from './global.service';
import { ApiService } from './api.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class StatsServerService {

  mySocket = null;

  public portalVer = '0000000';
  public visitor = 0;
  public latency = 0;

  intervalPingPong = null;

  constructor(
    private gs: GlobalService,
    private api: ApiService,
    private notif: NotificationsService
  ) {
    if (this.gs.isBrowser) {
      this.api.getData('https://api.github.com/repos/Bifeldy/Hikki/commits').subscribe(
        res => {
          this.gs.log('[GITHUB_API]', res);
          this.portalVer = res[0].sha;
        },
        err => {
          this.gs.log('[GITHUB_API]', err);
        }
      );
      this.mySocket = io(environment.socketUrl);
      this.socketStart();
    }
  }

  socketStart(): void {
    this.mySocket.on('disconnect', reason => {
      this.gs.log(`[SOCKET_DISCONNECTED] ${reason.replace(/\b[a-zA-Z]/g, str => str.toUpperCase())}`);
      if (reason === 'io server disconnect') {
        this.mySocket.connect();
      }
    });
    this.mySocket.on('reconnect', attemptNumber => {
      this.gs.log(`[SOCKET_RECONNECTED] Reconnected After ${attemptNumber} Attempts`);
    });
    this.mySocket.on('reconnect_attempt', attemptNumber => {
      this.gs.log(`[SOCKET_RECONNECTING] Reconnecting.. ${attemptNumber} Attempts`);
    });
    this.mySocket.on('reconnect_failed', attemptNumber => {
      this.gs.log(`[SOCKET_RECONNEC-FAILED] Reconnect Failed ${attemptNumber} Attempts`);
    });
    this.mySocket.on('error', error => {
      this.gs.log(`[SOCKET_ERROR]`, error);
    });
    this.mySocket.on('visitors', visitors => {
      this.visitor = visitors;
      this.gs.log(`[SOCKET_VISITOR] Total Visitors :: ${this.visitor}`);
    });
    this.mySocket.on('notification', notifObj => {
      const { notifId, notifType, notifTitle, notifContent, dismissible } = notifObj;
      this.notif.addNotif(notifId, notifType, notifTitle, notifContent, dismissible);
      this.gs.log(`[SOCKET_NOTIFICATION]`, notifObj);
    });
    this.intervalPingPong = setInterval(() => {
      const start = Date.now();
      this.mySocket.volatile.emit('ping-pong', () => {
        this.latency = Date.now() - start;
        this.gs.log(`[SOCKET_PING-PONG] Latency :: ${this.latency} ms`);
      });
    }, 5 * 1000);
  }

}
