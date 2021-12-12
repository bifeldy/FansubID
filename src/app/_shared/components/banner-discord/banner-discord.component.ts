import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/app/environment';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-banner-discord',
  templateUrl: './banner-discord.component.html',
  styleUrls: ['./banner-discord.component.css']
})
export class BannerDiscordComponent implements OnInit {

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

  get discordUrl(): string{
    return environment.discordUrl;
  }

  get discordGuildId(): string{
    return environment.discordGuildId;
  }

}
