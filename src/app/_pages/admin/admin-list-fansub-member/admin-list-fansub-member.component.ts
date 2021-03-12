import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';

@Component({
  selector: 'app-admin-list-fansub-member',
  templateUrl: './admin-list-fansub-member.component.html',
  styleUrls: ['./admin-list-fansub-member.component.css']
})
export class AdminListFansubMemberComponent implements OnInit {

  constructor(
    public gs: GlobalService,
    public adm: AdminService
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
