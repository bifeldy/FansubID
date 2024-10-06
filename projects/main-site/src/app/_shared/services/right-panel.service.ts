import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from './global.service';
import { StatsServerService } from './stats-server.service';

import { SearchAllComponent } from '../components/right-panel/search-all/search-all.component';
import { AdminNavigationComponent } from '../components/right-panel/admin-navigation/admin-navigation.component';
import { LiveChatComponent } from '../components/right-panel/live-chat/live-chat.component';

@Injectable({
  providedIn: 'root'
})
export class RightPanelService {

  sidePanel = null;

  componentView = null;

  constructor(
    private router: Router,
    private gs: GlobalService,
    private ss: StatsServerService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  toggleSidePanel(view): void {
    if (this.componentView) {
      this.closeSidePanel();
    } else {
      const urlPath = this.router.url.split('?')[0];
      if (urlPath.includes('/search') && view == 'SearchAllComponent') {
        return;
      }
      this.openSidePanel(view);
    }
  }

  closeSidePanel(): void {
    this.sidePanel.close();
  }

  onClose(): void {
    this.componentView = null;
  }

  openSidePanel(view): void {
    if (typeof view !== 'string') {
      this.componentView = view;
    } else if (view === 'SearchAllComponent') {
      this.componentView = SearchAllComponent;
    } else if (view === 'AdminNavigationComponent') {
      this.componentView = AdminNavigationComponent;
    } else if (view === 'LiveChatComponent') {
      if (!this.ss.mySocket.id) {
        return;
      }
      this.componentView = LiveChatComponent;
    }
    this.sidePanel.open();
  }

}
