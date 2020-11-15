import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  discordGuildId = '342220398022098944';
  discordInviteCode = 'xGWdExk';

  gridListBreakpoint = 1;

  constructor(
    public gs: GlobalService
  ) {
  }

  ngOnInit(): void {
    this.gridListBreakpoint = (window.innerWidth >= 1200) ? 3 : (window.innerWidth >= 992) ? 2 : 1;
    if (this.gs.isBrowser) {
      //
    }
  }

  onResize(event): void {
    this.gs.log('[ReSize]', event);
    this.gridListBreakpoint = (window.innerWidth >= 1200) ? 3 : (window.innerWidth >= 992) ? 2 : 1;
  }

}
