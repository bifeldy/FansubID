import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from '../../../../../models/req-res.model';

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

  currentUser: UserModel = null;

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

  firstTimeOpen = true;

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

  get SS(): StatsServerService {
    return this.ss;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({ next: user => this.currentUser = user });
      this.liveChatResult = this.ls.getItem(this.gs.localStorageKeys.LiveChatResults, true) || this.liveChatResult;
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
    if (this.ss.messageChatUnreadCount > 0) {
      this.scrollMessage();
    }
    return this.messageHistory;
  }

  ngAfterViewInit(): void {
    if (this.gs.isBrowser) {
      this.scrollMessage();
    }
  }

  ngOnDestroy(): void {
    this.ls.setItem(this.gs.localStorageKeys.LiveChatResults, this.liveChatResult);
    this.subsUser?.unsubscribe();
    this.subsCurrentRoom?.unsubscribe();
    this.subsGlobalRoom?.unsubscribe();
  }

  innerHtml(text: string): string {
    return this.gs.linkify(this.gs.htmlToText(text));
  }

  scrollToBottom(): void {
    setTimeout(() => {
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

  openUserProfile(username): void {
    this.router.navigateByUrl(`/user/${username}`);
  }

}
