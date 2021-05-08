import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/client/environment';

import { PageInfoService } from '../../services/page-info.service';
import { LeftMenuService } from '../../services/left-menu.service';
import { GlobalService } from '../../services/global.service';
import { RightPanelService } from '../../services/right-panel.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private lms: LeftMenuService,
    private rps: RightPanelService,
    private as: AuthService,
    public router: Router,
    public pi: PageInfoService,
    public gs: GlobalService
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

  openSearch(): void {
    this.rps.toggleSidePanel('SearchAllComponent');
  }

  openLiveChat(): void {
    if (this.as.currentUserValue) {
      this.rps.toggleSidePanel('LiveChatComponent');
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: this.router.url
        }
      });
    }
  }

  openAdminNavigation(): void {
    this.rps.toggleSidePanel('AdminNavigationComponent');
  }

}
