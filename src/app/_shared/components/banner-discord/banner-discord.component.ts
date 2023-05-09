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
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get GS(): GlobalService {
    return this.gs;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

  get discordUrl(): string {
    return environment.discord.join_url;
  }

  get discordGuildId(): string {
    return environment.discord.guild_id;
  }

}
