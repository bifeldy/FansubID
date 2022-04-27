import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-admin-list-ddl',
  templateUrl: './admin-list-ddl.component.html',
  styleUrls: ['./admin-list-ddl.component.css']
})
export class AdminListDdlComponent implements OnInit {

  constructor(
    private gs: GlobalService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

}
