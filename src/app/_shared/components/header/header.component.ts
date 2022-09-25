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

  myPoints = 0;

  constructor(
    private lms: LeftMenuService,
    private rps: RightPanelService,
    private router: Router,
    private pi: PageInfoService,
    private gs: GlobalService,
    private ss: StatsServerService,
    private bs: BusyService,
    private ls: LocalStorageService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get ROUTER(): Router {
    return this.router;
  }

  get PI(): PageInfoService {
    return this.pi;
  }

  get SS(): StatsServerService {
    return this.ss;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      const osTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.gs.isDarkMode = osTheme || this.ls.getItem(this.gs.localStorageKeys.DarkMode) === 'true';
      this.toggleDarkTheme(true);
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        this.gs.isDarkMode = event.matches;
        this.toggleDarkTheme(true);
      });
    }
  }

  get discordUrl(): string {
    return environment.discordUrl;
  }

  toggleSideNav(): void {
    this.lms.onSideNavToggleView();
  }

  toggleWeather(): void {
    this.gs.weatherToggle();
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
    this.ls.setItem(this.gs.localStorageKeys.DarkMode, JSON.stringify(this.gs.isDarkMode));
    this.pi.updateStatusBarTheme(this.gs.isDarkMode);
  }

}
