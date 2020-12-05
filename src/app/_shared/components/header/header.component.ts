import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PageInfoService } from '../../services/page-info.service';
import { LeftMenuService } from '../../services/left-menu.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  discordUrl = 'https://discord.gg/xGWdExk';

  constructor(
    private lms: LeftMenuService,
    private router: Router,
    public pi: PageInfoService,
    public gs: GlobalService
  ) {
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

  toggleSideNav(): void {
    this.lms.onSideNavToggleView();
  }

  openSearch(): void {
    this.router.navigateByUrl('/search');
  }

}
