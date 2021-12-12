import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/client/environment';

import { serverGet } from '../../../../src/api/settings';

import { RoomInfoResponse } from '../models/RoomInfo';
import { ServerInfo } from '../models/ServerInfo';

import { GlobalService } from './global.service';
import { NotificationsService } from './notifications.service';
import { LeftMenuService } from './left-menu.service';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class StatsServerService {

  mySocket: Socket = null;

  public visitor = 0;
  public latency = 0;

  public messageChatCount = 0;

  intervalPingPong = null;

  public badgeNews = [];
  public badgeBerkas = [];
  public badgeFansub = [];

  public github = null;

  private currentServerSubject: BehaviorSubject<ServerInfo> = new BehaviorSubject<ServerInfo>(serverGet());
  public currentServer: Observable<ServerInfo> = this.currentServerSubject.asObservable();
  public currentServerValue: ServerInfo = serverGet();

  private currentRoomSubject: BehaviorSubject<RoomInfoResponse> = new BehaviorSubject<RoomInfoResponse>(null);
  public currentRoom: Observable<RoomInfoResponse> = this.currentRoomSubject.asObservable();
  public currentChatRoom = [];

  private globalRoomSubject: BehaviorSubject<RoomInfoResponse> = new BehaviorSubject<RoomInfoResponse>(null);
  public globalRoom: Observable<RoomInfoResponse> = this.globalRoomSubject.asObservable();
  public globalChatRoom = [];

  public quizRoom = {};

  subsServer = null;
  subsDialog = null;

  constructor(
    private as: AuthService,
    private gs: GlobalService,
    private notif: NotificationsService,
    private lms: LeftMenuService,
    private toast: ToastrService,
    private ds: DialogService
  ) {
    if (this.gs.isBrowser) {
      this.mySocket = io(environment.baseUrl, {
        reconnection: false,
        extraHeaders: {
          token: this.as.jwtToken
        }
      });
      this.socketListen();
      this.checkServerMaintenance();
    }
  }

  public get currentRoomValue(): any {
    return this.currentRoomSubject?.value || null;
  }

  public get globalRoomValue(): any {
    return this.globalRoomSubject?.value || null;
  }

  checkServerMaintenance(): void {
    this.subsServer = this.currentServer.subscribe({
      next: server => {
        if (
          server && server.isMaintenance &&
          (this.currentServerValue?.isMaintenance !== server.isMaintenance)
        ) {
          this.subsDialog = this.ds.openMaintenanceDialog().afterClosed().subscribe({
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
    const start = Date.now();
    this.socketEmitVolatile('ping-pong', {}, (response: any) => {
      this.latency = Date.now() - start;
      this.gs.log('[SOCKET_PING-PONG]', this.latency);
      if ('github' in response && response.github) {
        this.github = response.github;
      }
      if ('server' in response && response.server) {
        this.currentServerSubject.next(response.server);
      }
    });
  }

  socketListen(): void {
    this.mySocket.on('connect', () => {
      this.gs.log('[SOCKET_CONNECTED]', this.mySocket.id);
      this.pingPong();
      this.intervalPingPong = setInterval(() => {
        this.pingPong();
      }, 10000);
    });
    this.mySocket.on('disconnect', reason => {
      this.gs.log('[SOCKET_DISCONNECTED]', reason);
      this.notif.addNotif(
        null,
        'HIKKI_SOCKET_DISCONNECTED',
        'warning',
        'Sambungan Terputus',
        'Tidak dapat terhubung dengan <i>Server</i> melalui <i>WebSocket</i>, silahkan <i>Refresh</i> halaman!',
        false
      );
      if (this.intervalPingPong) {
        clearInterval(this.intervalPingPong);
      }
    });
    this.mySocket.on('visitors', visitors => {
      this.gs.log('[SOCKET_VISITOR]', this.visitor);
      this.visitor = visitors;
    });
    this.mySocket.on('receive-logout', reason => {
      this.gs.log('[SOCKET_EXIT]', reason);
      this.toast.info(reason, 'Keluar Paksa!');
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
        notifObj.notifData.dismissible
      );
    });
    this.mySocket.on('new-berkas', (berkasObj: any) => {
      this.gs.log('[SOCKET_BERKAS]', berkasObj);
      this.badgeBerkas.push(berkasObj);
      const berkas = this.lms.mainMenus.find(m => m.link === '/berkas');
      if (this.badgeBerkas.length > 0) {
        berkas.badge = this.badgeBerkas.length;
      } else {
        berkas.badge = null;
      }
    });
    this.mySocket.on('new-fansub', (fansubObj: any) => {
      this.gs.log('[SOCKET_FANSUB]', fansubObj);
      this.badgeFansub.push(fansubObj);
      const fansub = this.lms.mainMenus.find(m => m.link === '/fansub');
      if (this.badgeFansub.length > 0) {
        fansub.badge = this.badgeFansub.length;
      } else {
        fansub.badge = null;
      }
    });
    this.mySocket.on('new-news', (newsObj: any) => {
      this.gs.log('[SOCKET_NEWS]', newsObj);
      this.badgeNews.push(newsObj);
      const news = this.lms.mainMenus.find(m => m.link === '/news');
      if (this.badgeNews.length > 0) {
        news.badge = this.badgeNews.length;
      } else {
        news.badge = null;
      }
    });
    this.mySocket.on('receive-chat', msg => {
      this.gs.log('[SOCKET_RECEIVE-CHAT]', msg);
      if (msg.room_id === 'GLOBAL_PUBLIK') {
        this.globalChatRoom.push(msg);
      } else {
        this.currentChatRoom.push(msg);
      }
      this.messageChatCount++;
    });
    this.mySocket.on('room-info', roomInfo => {
      this.gs.log('[SOCKET_ROOM-INFO]', roomInfo);
      this.gs.cleanObject(roomInfo?.member_list);
      if (roomInfo.room_id === 'GLOBAL_PUBLIK') {
        this.globalRoomSubject.next(roomInfo);
      } else {
        this.currentRoomSubject.next(roomInfo);
      }
    });
    this.mySocket.on('multiple-connection', multipleConnection => {
      this.gs.log('[SOCKET_MULTIPLE-CONNECTION]', multipleConnection);
      this.toast.warning('Sesi lain telah aktif!', 'Koneksi Duplikat');
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
    if (this.as.jwtToken) {
      eventData.jwtToken = this.as.jwtToken;
    }
    if (callback) {
      this.mySocket.emit(eventName, eventData, callback);
    } else {
      this.mySocket.emit(eventName, eventData);
    }
  }

  socketEmitVolatile(eventName: string, eventData: any = {}, callback = null): void {
    if (this.as.jwtToken) {
      eventData.jwtToken = this.as.jwtToken;
    }
    if (callback) {
      this.mySocket.volatile.emit(eventName, eventData, callback);
    } else {
      this.mySocket.volatile.emit(eventName, eventData);
    }
  }

  socketLeaveAndJoinNewRoom(previousUrl: string, currentNewUrl: string): void {
    this.gs.log(`[SOCKET_LEAVE-JOIN-ROOM] ${previousUrl} => ${currentNewUrl}`);
    this.socketEmit('leave-join-room', {
      oldRoom: previousUrl, newRoom: currentNewUrl
    });
  }

}
