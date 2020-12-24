import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-banner-discord',
  templateUrl: './banner-discord.component.html',
  styleUrls: ['./banner-discord.component.css']
})
export class BannerDiscordComponent implements OnInit {

  discordGuildId = '342220398022098944';
  discordInviteCode = 'xGWdExk';

  constructor(
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

}
