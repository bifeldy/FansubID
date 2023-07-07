import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CONSTANTS } from '../../../../../constants';

import { RoleModel } from '../../../../../models/req-res.model';

import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { StatsServerService } from '../../../services/stats-server.service';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() chatOnly = false;

  @ViewChild('liveChatScroll') private liveChatScroll: ElementRef;

  liveChatResult = {
    messageToSend: '',
    roomId: ''
  };

  globalRoom = null;
  fansubRoom = null;
  currentRoom = null;
  messageHistory = [];

  subsCurrentRoom = null;
  subsGlobalRoom = null;
  subsFansubRoom = null;

  firstTimeOpen = true;
  timedOut = null;

  constructor(
    private as: AuthService,
    private gs: GlobalService,
    private ss: StatsServerService,
    private ls: LocalStorageService,
    private router: Router
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get AS(): AuthService {
    return this.as;
  }

  get ROUTER(): Router {
    return this.router;
  }

  get SS(): StatsServerService {
    return this.ss;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.liveChatResult = this.ls.getItem(this.gs.localStorageKeys.LiveChatResults, true) || this.liveChatResult;
      this.liveChatResult.roomId = this.router.url.split('?')[0];
      this.subsCurrentRoom = this.ss.currentRoom.subscribe({
        next: current => {
          this.currentRoom = current;
        }
      });
      this.subsGlobalRoom = this.ss.globalRoom.subscribe({
        next: global => {
          this.globalRoom = global;
        }
      });
      this.subsFansubRoom = this.ss.fansubRoom.subscribe({
        next: fansub => {
          this.fansubRoom = fansub;
        }
      });
    }
  }

  get CONSTANTS(): any {
    return CONSTANTS;
  }

  get isAdminModFansubber(): boolean {
    if (this.as.currentUserSubject?.value) {
      if (
        this.as.currentUserSubject?.value?.role === RoleModel.ADMIN ||
        this.as.currentUserSubject?.value?.role === RoleModel.MODERATOR ||
        this.as.currentUserSubject?.value?.role === RoleModel.FANSUBBER
      ) {
        return true;
      }
    }
    return false;
  }

  get roomCurrentOrGlobal(): any {
    if (this.liveChatResult.roomId === CONSTANTS.socketRoomNameGlobalPublic) {
      return this.globalRoom;
    } else if (this.liveChatResult.roomId === CONSTANTS.socketRoomNameGlobalFansub) {
      return this.fansubRoom;
    } else {
      return this.currentRoom;
    }
  }

  get chatCurrentOrGlobal(): any {
    if (this.liveChatResult.roomId === CONSTANTS.socketRoomNameGlobalPublic) {
      this.messageHistory = this.ss.globalChatRoom;
    } else if (this.liveChatResult.roomId === CONSTANTS.socketRoomNameGlobalFansub) {
      this.messageHistory = this.ss.fansubChatRoom;
    } else {
      this.messageHistory = this.ss.currentChatRoom;
    }
    if (this.ss.messageChatUnreadCount > 0) {
      this.scrollMessage();
    }
    return this.messageHistory;
  }

  get canChat(): boolean {
    if (this.as.currentUserSubject?.value) {
      if (this.liveChatResult.roomId !== CONSTANTS.socketRoomNameGlobalFansub) {
        return true;
      }
      return this.isAdminModFansubber;
    }
    return false;
  }

  ngAfterViewInit(): void {
    if (this.gs.isBrowser) {
      this.scrollMessage();
    }
  }

  ngOnDestroy(): void {
    this.ls.setItem(this.gs.localStorageKeys.LiveChatResults, this.liveChatResult);
    this.subsCurrentRoom?.unsubscribe();
    this.subsGlobalRoom?.unsubscribe();
    if (this.timedOut) {
      clearTimeout(this.timedOut);
      this.timedOut = null;
    }
  }

  innerHtml(text: string): string {
    return this.gs.linkify(this.gs.htmlToText(text));
  }

  scrollToBottom(): void {
    this.timedOut = setTimeout(() => {
      this.ss.messageChatUnreadCount = 0;
      this.liveChatScroll.nativeElement.scrollTop = this.liveChatScroll.nativeElement.scrollHeight;
    }, 0);
  }

  scrollMessage(): void {
    if (this.liveChatScroll) {
      if (this.firstTimeOpen) {
        this.firstTimeOpen = false;
        this.scrollToBottom();
      } else if (this.liveChatScroll.nativeElement.scrollTop + this.liveChatScroll.nativeElement.clientHeight === this.liveChatScroll.nativeElement.scrollHeight) {
        this.scrollToBottom();
      }
    }
  }

  sendMessage(): void {
    this.ss.socketEmit('send-chat', {
      roomId: this.roomCurrentOrGlobal.room_id,
      message: this.gs.htmlToText(this.liveChatResult.messageToSend)
    });
    this.liveChatResult.messageToSend = null;
  }

  applyFilter(event): void {
    this.gs.log('[MESSAGE_VALUE_CHANGED]', event);
    this.liveChatResult.messageToSend = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.liveChatResult.messageToSend) {
      this.sendMessage();
    }
  }

  changeRoom(data): void {
    this.gs.log('[MESSAGE_ROOM_CHANGED]', data);
    this.liveChatResult.roomId = data;
    this.scrollMessage();
  }

  login(): void {
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: this.router.url.split('?')[0]
      }
    });
  }

  openUserProfile(username): void {
    this.router.navigateByUrl(`/user/${username}`);
  }

}
