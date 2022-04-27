import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-admin-list-fansub-member',
  templateUrl: './admin-list-fansub-member.component.html',
  styleUrls: ['./admin-list-fansub-member.component.css']
})
export class AdminListFansubMemberComponent implements OnInit {

  constructor(
    private gs: GlobalService,
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
