import { Component, OnDestroy, OnInit } from '@angular/core';

import { ServerInfo } from '../../models/ServerInfo';

import { GlobalService } from '../../services/global.service';
import { StatsServerService } from '../../services/stats-server.service';

@Component({
  selector: 'app-stats-server',
  templateUrl: './stats-server.component.html',
  styleUrls: ['./stats-server.component.css']
})
export class StatsServerComponent implements OnInit, OnDestroy {

  currentServer: ServerInfo = null;

  subsServer = null;

  constructor(
    public gs: GlobalService,
    public ss: StatsServerService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsServer = this.ss.currentServer.subscribe({ next: server => this.currentServer = server });
    }
  }

  ngOnDestroy(): void {
    this.subsServer?.unsubscribe();
  }

}
