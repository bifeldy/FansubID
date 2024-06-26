import io, { Socket } from 'socket.io-client';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { CONSTANTS } from '../../../constants';

import { environment } from '../../../environments/app/environment';

import { RoomInfoModel, ServerInfoModel, StatsServerModel } from '../../../models/socket-io.model';

import { GlobalService } from './global.service';
import { NotificationsService } from './notifications.service';
import { LeftMenuService } from './left-menu.service';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';
import { ServiceWorkerService } from './service-worker.service';
import { ToastService } from './toast.service';
import { BusyService } from './busy.service';

@Injectable({
  providedIn: 'root'
})
export class StatsServerService {

  mySocket: typeof Socket = null;

  latency = 0;
  maxReConnDisc = 0;

  statsServer: StatsServerModel = {
    cpus: 0,
    mem_ram: 0,
    disk_io: 0,
    net_tx: 0,
    net_rx: 0,
    billing: 0,
    storage: 0,
    nodes: 0,
    peers: 0
  };

  messageChatUnreadCount = 0;

  badgeNews = [];
  badgeBerkas = [];
  badgeFansub = [];

  github = null;

  currentServerSubject: BehaviorSubject<ServerInfoModel> = new BehaviorSubject<ServerInfoModel>(null);
  currentServer: Observable<ServerInfoModel> = this.currentServerSubject.asObservable();
  currentServerValue: ServerInfoModel = null;

  currentRoomSubject: BehaviorSubject<RoomInfoModel> = new BehaviorSubject<RoomInfoModel>(null);
  currentRoom: Observable<RoomInfoModel> = this.currentRoomSubject.asObservable();
  currentChatRoom = [];

  globalRoomSubject: BehaviorSubject<RoomInfoModel> = new BehaviorSubject<RoomInfoModel>(null);
  globalRoom: Observable<RoomInfoModel> = this.globalRoomSubject.asObservable();
  globalChatRoom = [];

  fansubRoomSubject: BehaviorSubject<RoomInfoModel> = new BehaviorSubject<RoomInfoModel>(null);
  fansubRoom: Observable<RoomInfoModel> = this.fansubRoomSubject.asObservable();
  fansubChatRoom = [];

  serverLog = '// Tidak Ada Catatan Log~';

  quizRoom = {};

  subsServer = null;
  subsDialog = null;

  timedOut = null;

  constructor(
    private as: AuthService,
    private router: Router,
    private gs: GlobalService,
    private bs: BusyService,
    private notif: NotificationsService,
    private lms: LeftMenuService,
    private toast: ToastService,
    private ds: DialogService,
    private sw: ServiceWorkerService
  ) {
    if (this.gs.isBrowser) {
      this.mySocket = io('//', {
        query: {
          'ngsw-bypass': true,
          token: this.as.token
        },
        transports: ['websocket', 'polling'],
        transportOptions: {
          polling: {
            extraHeaders: {
              'x-access-token': this.as.token
            }
          }
        }
      });
      this.socketListen();
      this.checkServerMaintenance();
    }
  }

  get currentRoomValue(): RoomInfoModel {
    return this.currentRoomSubject?.value || null;
  }

  get globalRoomValue(): RoomInfoModel {
    return this.globalRoomSubject?.value || null;
  }

  checkServerMaintenance(): void {
    this.subsServer = this.currentServer.subscribe({
      next: async server => {
        if (
          server && server.isMaintenance &&
          (this.currentServerValue?.isMaintenance !== server.isMaintenance)
        ) {
          this.subsDialog = (await this.ds.openMaintenanceDialog()).afterClosed().subscribe({
            next: re => {
              this.gs.log('[INFO_DIALOG_CLOSED]', re);
              this.subsDialog.unsubscribe();
            }
          });
        }
        this.currentServerValue = server;
      }
    });
  }

  pingPong(): void {
    this.socketEmitVolatile('ping-pong', {}, (response: any) => {
      this.gs.log('[SOCKET_PING_PONG]', response);
      if ('github' in response && response.github) {
        this.github = response.github;
      }
      if ('visitor' in response && response.visitor) {
        this.statsServer.nodes = response.visitor;
      }
      if ('server' in response && response.server) {
        this.currentServerSubject.next(response.server);
      }
    });
    this.socketEmitVolatile('stats-server', {}, (response: any) => {
      this.gs.log('[SOCKET_STATS_SERVER]', response);
      this.statsServer = response;
    });
  }

  socketListen(): void {
    this.mySocket.on('connect', () => {
      this.gs.log('[SOCKET_CONNECTED]', this.mySocket.id);
      this.pingPong();
      this.notif.removeNotif(`${environment.siteName.toUpperCase()}_SOCKET_DISCONNECTED`);
      this.timedOut = setTimeout(() => {
        this.socketLeaveAndJoinNewRoom(null, this.router.url.split('?')[0]);
      }, 1234);
    });
    this.mySocket.on('connect_error', () => {
      this.gs.log('[SOCKET_CONNECT_ERROR]', this.mySocket.io.opts, 'error');
      this.mySocket.io.opts.transports = ['polling', 'websocket'];
    });
    this.mySocket.on('disconnect', reason => {
      this.gs.log('[SOCKET_DISCONNECTED]', reason);
      this.notif.addNotif(
        null,
        `${environment.siteName.toUpperCase()}_SOCKET_DISCONNECTED`,
        'warning',
        'Sambungan Terputus',
        'Tidak dapat terhubung dengan <i>Server</i> melalui <i>WebSocket</i> !!',
        false
      );
      this.maxReConnDisc++;
      if (this.maxReConnDisc > 10) {
        this.bs.busy();
        this.gs.window.location.reload();
      }
    });
    this.mySocket.on('ping', () => {
      this.gs.log('[SOCKET_PING]', Date.now());
    });
    this.mySocket.on('server-config', (data) => {
      this.currentServerSubject.next(data);
    });
    this.mySocket.on('pong', (data) => {
      this.latency = data;
      this.gs.log('[SOCKET_PONG]', `${Date.now()} => ${data} ms`);
      this.pingPong();
      this.sw.checkForUpdate();
    });
    this.mySocket.on('visitor', vstr => {
      this.gs.log('[SOCKET_VISITOR]', vstr);
      this.statsServer.nodes = vstr;
    });
    this.mySocket.on('console-log', log => {
      this.gs.log('[SOCKET_CONSOLE_LOG]', log);
      this.serverLog = `${log}\r\n${this.serverLog}`;
    });
    this.mySocket.on('force-redirect', data => {
      this.gs.log('[SOCKET_REDIRECT]', data.message);
      this.toast.info(data.message, data.title, null, true);
      this.router.navigateByUrl(data.url);
    });
    this.mySocket.on('force-logout', reason => {
      this.gs.log('[SOCKET_EXIT]', reason);
      this.toast.info(reason, 'Keluar Paksa!', null, true);
      this.as.logout();
    });
    this.mySocket.on('new-notification', (notifObj: any) => {
      this.gs.log('[SOCKET_NOTIFICATION]', notifObj);
      this.notif.addNotif(
        notifObj.notifCreator,
        notifObj.notifData.id,
        notifObj.notifData.type,
        notifObj.notifData.title,
        notifObj.notifData.content,
        notifObj.notifData.dismissible,
        notifObj.notifData.timeout
      );
    });
    this.mySocket.on('new-information', async (notifObj: any) => {
      this.gs.log('[SOCKET_INFORMATION]', notifObj);
      this.subsDialog = this.ds.openInfoDialog({
        data: {
          title: notifObj.infoData.title,
          htmlMessage: notifObj.infoData.content,
          confirmText: notifObj.infoData.confirm,
          cancelText: notifObj.infoData.cancel
        },
        disableClose: notifObj.infoData.close
      }).afterClosed().subscribe({
        next: re => {
          this.gs.log('[INFO_DIALOG_CLOSED]', re);
          this.subsDialog.unsubscribe();
        }
      });
    });
    this.mySocket.on('new-berkas', (berkasObj: any) => {
      this.gs.log('[SOCKET_BERKAS]', berkasObj);
      this.badgeBerkas.push(berkasObj);
      const berkas = this.lms.contentMenus.find(m => m.link === '/berkas');
      if (berkas) {
        if (this.badgeBerkas.length > 0) {
          berkas.badge = this.badgeBerkas.length;
        } else {
          berkas.badge = null;
        }
      }
    });
    this.mySocket.on('new-fansub', (fansubObj: any) => {
      this.gs.log('[SOCKET_FANSUB]', fansubObj);
      this.badgeFansub.push(fansubObj);
      const fansub = this.lms.contentMenus.find(m => m.link === '/fansub');
      if (fansub) {
        if (this.badgeFansub.length > 0) {
          fansub.badge = this.badgeFansub.length;
        } else {
          fansub.badge = null;
        }
      }
    });
    this.mySocket.on('new-news', (newsObj: any) => {
      this.gs.log('[SOCKET_NEWS]', newsObj);
      this.badgeNews.push(newsObj);
      const news = this.lms.mainMenus.find(m => m.link === '/news');
      if (news) {
        if (this.badgeNews.length > 0) {
          news.badge = this.badgeNews.length;
        } else {
          news.badge = null;
        }
      }
    });
    this.mySocket.on('receive-chat', msg => {
      this.gs.log('[SOCKET_RECEIVE-CHAT]', msg);
      if (msg.room_id === CONSTANTS.socketRoomNameGlobalPublic) {
        this.globalChatRoom.push(msg);
      } else if (msg.room_id === CONSTANTS.socketRoomNameGlobalFansub) {
        this.fansubChatRoom.push(msg);
      } else {
        if (msg.room_id !== CONSTANTS.socketRoomNameServerLogs) {
          this.currentChatRoom.push(msg);
        }
      }
      this.messageChatUnreadCount++;
    });
    this.mySocket.on('room-info', roomInfo => {
      this.gs.log('[SOCKET_ROOM-INFO]', roomInfo);
      this.gs.cleanObject(roomInfo?.member_list);
      if (roomInfo.room_id === CONSTANTS.socketRoomNameGlobalPublic) {
        this.globalRoomSubject.next(roomInfo);
      } else if (roomInfo.room_id === CONSTANTS.socketRoomNameGlobalFansub) {
        this.fansubRoomSubject.next(roomInfo);
      } else {
        if (roomInfo.room_id !== CONSTANTS.socketRoomNameServerLogs) {
          this.currentRoomSubject.next(roomInfo);
        }
      }
    });
    this.mySocket.on('multiple-connection', (multipleConnection, callback) => {
      this.gs.log('[SOCKET_MULTIPLE-CONNECTION]', multipleConnection);
      this.toast.warning('Sesi lain telah aktif!', 'Koneksi Duplikat', null, true);
      this.mySocket.io.reconnection(false);
      this.bs.clear();
      if (callback) {
        callback();
      }
    });
    this.mySocket.on('quiz-question', quizQuestion => {
      this.gs.log('[SOCKET_QUIZ]', quizQuestion);
      if (this.gs.routerData.question && this.gs.routerData.options) {
        const { room_id, ...quiz } = quizQuestion;
        this.quizRoom[room_id] = quiz;
        this.quizRoom[room_id].options = this.gs.shuffle(this.quizRoom[room_id].options);
      }
    });
  }

  socketEmit(eventName: string, eventData: any = {}, callback = null): void {
    if (this.as.token) {
      eventData.token = this.as.token;
    }
    if (callback) {
      this.mySocket?.emit(eventName, eventData, callback);
    } else {
      this.mySocket?.emit(eventName, eventData);
    }
  }

  socketEmitVolatile(eventName: string, eventData: any = {}, callback = null): void {
    this.socketEmit(eventName, eventData, callback);
    // if (this.as.token) {
    //   eventData.token = this.as.token;
    // }
    // if (callback) {
    //   this.mySocket?.volatile.emit(eventName, eventData, callback);
    // } else {
    //   this.mySocket?.volatile.emit(eventName, eventData);
    // }
  }

  socketLeaveAndJoinNewRoom(previousUrl: string, currentNewUrl: string): void {
    this.gs.log(`[SOCKET_LEAVE-JOIN-ROOM] ${previousUrl} => ${currentNewUrl}`);
    this.socketEmit('leave-join-room', {
      oldRoom: previousUrl, newRoom: currentNewUrl
    });
  }

}
