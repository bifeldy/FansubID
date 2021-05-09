import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { environment } from '../../../../../environments/client/environment';

import { GlobalService } from '../../../services/global.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { StatsServerService } from '../../../services/stats-server.service';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.css']
})
export class LiveChatComponent implements OnInit, AfterViewInit, OnDestroy {

  localStorageLiveChatKeyName = `${environment.siteName}_LiveChatResults`;

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

  subsCurrentRoom = null;
  subsGlobalRoom = null;

  constructor(
    private gs: GlobalService,
    public ss: StatsServerService,
    private ls: LocalStorageService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
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
    }
  }

  ngOnDestroy(): void {
    this.ls.setItem(this.localStorageLiveChatKeyName, this.liveChatResult);
    if (this.subsCurrentRoom) {
      this.subsCurrentRoom.unsubscribe();
    }
    if (this.subsGlobalRoom) {
      this.subsGlobalRoom.unsubscribe();
    }
  }

  scrollMessage(): void {
    if (this.liveChatScroll) {
      this.liveChatScroll.nativeElement.scrollTop = this.liveChatScroll.nativeElement.scrollHeight || 0;
    }
  }

  sendMessage(): void {
    this.ss.socketEmit('send-chat', {
      roomId: this.roomCurrentOrGlobal.room_id,
      message: this.liveChatResult.messageToSend
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

}
