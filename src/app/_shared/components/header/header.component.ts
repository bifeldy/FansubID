import { Component, OnInit } from '@angular/core';

import { PageInfoService } from '../../services/page-info.service';
import { LeftMenuService } from '../../services/left-menu.service';
import { Router } from '@angular/router';

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
    public pi: PageInfoService
  ) {
  }

  ngOnInit(): void {
  }

  toggleSideNav(): void {
    this.lms.onSideNavToggle();
  }

  openDiscord(): void {
    window.open(this.discordUrl, '_blank');
  }

  openSearch(): void {
    this.router.navigateByUrl('/search');
  }

}
