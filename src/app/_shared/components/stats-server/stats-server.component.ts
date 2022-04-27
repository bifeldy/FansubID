import { Component, OnDestroy, OnInit } from '@angular/core';

import { ServerInfoModel } from '../../../../models/socket-io.model';

import { GlobalService } from '../../services/global.service';
import { StatsServerService } from '../../services/stats-server.service';

@Component({
  selector: 'app-stats-server',
  templateUrl: './stats-server.component.html',
  styleUrls: ['./stats-server.component.css']
})
export class StatsServerComponent implements OnInit, OnDestroy {

  currentServer: ServerInfoModel = null;

  subsServer = null;

  constructor(
    private gs: GlobalService,
    private ss: StatsServerService
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
      this.subsServer = this.ss.currentServer.subscribe({ next: server => this.currentServer = server });
    }
  }

  ngOnDestroy(): void {
    this.subsServer?.unsubscribe();
  }

}
