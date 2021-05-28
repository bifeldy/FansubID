import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../../environments/client/environment';

import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { StatsServerService } from '../../../services/stats-server.service';

import User from '../../../models/User';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit, AfterViewInit, OnDestroy {

  localStorageLiveChatKeyName = `${environment.siteName}_LiveChatResults`;

  currentUser: User = null;

  @Input() chatOnly = false;
  @Input() forcedCurrentRoom = null;

  @ViewChild('liveChatScroll') private liveChatScroll: ElementRef;

  liveChatResult = {
    messageToSend: '',
    isGlobalRoom: false
  };

  globalRoom = null;
  currentRoom = null;
  messageHistory = [];

  subsUser = null;
  subsCurrentRoom = null;
  subsGlobalRoom = null;

  constructor(
    public as: AuthService,
    public gs: GlobalService,
    public ss: StatsServerService,
    private ls: LocalStorageService,
    private router: Router
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({ next: user => this.currentUser = user });
      this.liveChatResult = this.ls.getItem(this.localStorageLiveChatKeyName, true) || this.liveChatResult;
      if (this.forcedCurrentRoom) {
        this.liveChatResult.isGlobalRoom = !this.forcedCurrentRoom;
        this.liveChatResult.messageToSend = '';
      }
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
    }
  }

  get roomCurrentOrGlobal(): any {
    if (this.liveChatResult.isGlobalRoom) {
      return this.globalRoom;
    } else {
      return this.currentRoom;
    }
  }

  get chatCurrentOrGlobal(): any {
    if (this.liveChatResult.isGlobalRoom) {
      this.messageHistory = this.ss.globalChatRoom;
    } else {
      this.messageHistory = this.ss.currentChatRoom;
    }
    this.scrollMessage();
    return this.messageHistory;
  }

  ngAfterViewInit(): void {
    if (this.gs.isBrowser) {
      this.scrollMessage();
      if (this.currentUser) {
        this.ss.messageChatCount = 0;
      }
    }
  }

  ngOnDestroy(): void {
    this.ls.setItem(this.localStorageLiveChatKeyName, this.liveChatResult);
    this.subsUser?.unsubscribe();
    this.subsCurrentRoom?.unsubscribe();
    this.subsGlobalRoom?.unsubscribe();
  }

  scrollMessage(): void {
    if (this.liveChatScroll) {
      this.liveChatScroll.nativeElement.scrollTop = this.liveChatScroll.nativeElement.scrollHeight || 0;
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
    this.liveChatResult.isGlobalRoom = data;
    this.scrollMessage();
  }

  login(): void {
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: this.router.url
      }
    });
  }

}
