import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { PageInfoService } from '../../services/page-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() sidenav: MatSidenav;

  discordUrl = 'https://discord.gg/xGWdExk';

  constructor(
    public pi: PageInfoService
  ) { }

  ngOnInit(): void {
  }

  openDiscord(): void {
    window.open(this.discordUrl, '_blank');
  }

}
