import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/app/environment';

import { PageInfoService } from '../../services/page-info.service';
import { LeftMenuService } from '../../services/left-menu.service';
import { GlobalService } from '../../services/global.service';
import { RightPanelService } from '../../services/right-panel.service';
import { StatsServerService } from '../../services/stats-server.service';
import { BusyService } from '../../services/busy.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  localStorageDarkModeKeyName = `${environment.siteName}_DarkMode`;

  myPoints = 0;

  subsGlobalRoom = null;

  constructor(
    private lms: LeftMenuService,
    private rps: RightPanelService,
    public router: Router,
    public pi: PageInfoService,
    public gs: GlobalService,
    public ss: StatsServerService,
    private bs: BusyService,
    private ls: LocalStorageService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      const osTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.gs.isDarkMode = osTheme || this.ls.getItem(this.localStorageDarkModeKeyName) === 'true';
      this.toggleDarkTheme(true);
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        this.gs.isDarkMode = event.matches;
        this.toggleDarkTheme(true);
      });
      this.subsGlobalRoom = this.ss.globalRoom.subscribe({
        next: global => {
          this.myPoints = global?.member_list[this.ss.mySocket.id]?.points || 0;
        }
      });
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

  toggleDarkTheme(firstRun = false): void {
    this.gs.toggleDarkTheme(firstRun);
    this.ls.setItem(this.localStorageDarkModeKeyName, JSON.stringify(this.gs.isDarkMode));
    this.pi.updateStatusBarTheme(this.gs.isDarkMode);
  }

}
