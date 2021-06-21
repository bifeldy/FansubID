import { Component, OnInit } from '@angular/core';

import { ServerInfo } from '../../../_shared/models/ServerInfo';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  settings: ServerInfo = null;

  constructor(
    public gs: GlobalService,
    public adm: AdminService,
    private ss: StatsServerService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getServerSettings();
    }
  }

  getServerSettings():void {
    this.ss.socketEmit('server-get', {}, (response: any) => {
      this.gs.log(`[SOCKET_SERVER-GET]`, response);
      this.settings = response;
    });
  }

  toggleSetting(key: string, checked: boolean): void {
    this.ss.socketEmit('server-set', {
      [key]: checked
    }, (response: any) => {
      this.gs.log(`[SOCKET_SERVER-SET]`, response);
      this.settings = response;
    });
  }

}
