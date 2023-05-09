import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/app/environment';

import { GlobalService } from '../../services/global.service';
import { StatsServerService } from '../../services/stats-server.service';
import { WinboxService } from '../../services/winbox.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private gs: GlobalService,
    private ss: StatsServerService,
    private wb: WinboxService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get SS(): StatsServerService {
    return this.ss;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

  get discordUrl(): string {
    return environment.discord.join_url;
  }

  get author(): string {
    return environment.author;
  }

  get siteName(): string {
    return environment.siteName;
  }

  openGithub(): void {
    this.wb.winboxOpenUri(`https://github.com/${this.author}/${this.siteName}`);
  }

}
