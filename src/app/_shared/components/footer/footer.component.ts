import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';
import { StatsServerService } from '../../services/stats-server.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    public gs: GlobalService,
    public ss: StatsServerService
  ) {
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

}
