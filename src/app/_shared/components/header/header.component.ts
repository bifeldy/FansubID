import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { PageInfoService } from '../../services/page-info.service';
import { LeftMenuService } from '../../services/left-menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  discordUrl = 'https://discord.gg/xGWdExk';

  constructor(
    private lms: LeftMenuService,
    public pi: PageInfoService
  ) { }

  ngOnInit(): void {
  }

  toggleSideNav(): void {
    this.lms.onSideNavToggle();
  }

  openDiscord(): void {
    window.open(this.discordUrl, '_blank');
  }

}
