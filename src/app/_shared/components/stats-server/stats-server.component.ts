import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';
import { StatsServerService } from '../../services/stats-server.service';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-stats-server',
  templateUrl: './stats-server.component.html',
  styleUrls: ['./stats-server.component.css']
})
export class StatsServerComponent implements OnInit {

  constructor(
    public gs: GlobalService,
    public gh: GithubService,
    public ss: StatsServerService
  ) {
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

}
