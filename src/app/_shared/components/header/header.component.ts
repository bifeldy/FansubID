import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/client/environment';

import { PageInfoService } from '../../services/page-info.service';
import { LeftMenuService } from '../../services/left-menu.service';
import { GlobalService } from '../../services/global.service';
import { RightPanelService } from '../../services/right-panel.service';
import { StatsServerService } from '../../services/stats-server.service';
import { BusyService } from '../../services/busy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private lms: LeftMenuService,
    private rps: RightPanelService,
    public router: Router,
    public pi: PageInfoService,
    public gs: GlobalService,
    public ss: StatsServerService,
    private bs: BusyService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

  get discordUrl(): string {
    return environment.discordUrl;
  }

  toggleSideNav(): void {
    this.lms.onSideNavToggleView();
  }

  reloadPage(): void {
    this.bs.busy();
    window.location.reload();
  }

  openSearch(): void {
    this.rps.toggleSidePanel('SearchAllComponent');
  }

  openLiveChat(): void {
    this.rps.toggleSidePanel('LiveChatComponent');
  }

  openAdminNavigation(): void {
    this.rps.toggleSidePanel('AdminNavigationComponent');
  }

}
