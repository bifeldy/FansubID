import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild('liveChatScroll') private liveChatScroll: ElementRef;

  liveChatResult = {
    messageToSend: '',
    isGlobalRoom: false
  };

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
    }
  }

  get roomCurrentOrGlobal(): any {
    if (this.liveChatResult.isGlobalRoom) {
      return this.ss.globalRoom;
    } else {
      return this.ss.currentRoom;
    }
  }

  get chatCurrentOrGlobal(): any {
    if (this.liveChatResult.isGlobalRoom) {
      return this.ss.globalChatRoom;
    } else {
      return this.ss.currentChatRoom;
    }
  }

  ngAfterViewInit(): void {
    if (this.gs.isBrowser) {
      this.scrollMessage();
    }
  }

  ngOnDestroy(): void {
    this.ls.setItem(this.localStorageLiveChatKeyName, this.liveChatResult);
  }

  scrollMessage(): void {
    this.liveChatScroll.nativeElement.scrollTop = this.liveChatScroll.nativeElement.scrollHeight;
  }

  sendMessage(): void {
    this.ss.socketEmit('send-chat', {
      roomId: this.roomCurrentOrGlobal.room_id,
      message: this.liveChatResult.messageToSend
    });
    this.liveChatResult.messageToSend = null;
    this.scrollMessage();
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
  }

}
