import { Component, OnInit } from '@angular/core';

import { environment } from '../../../../environments/client/environment';

import { GlobalService } from '../../services/global.service';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    public gs: GlobalService,
    public gh: GithubService
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

}
