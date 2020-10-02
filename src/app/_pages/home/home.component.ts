import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

import { GlobalService } from '../../_shared/services/global.service';
// import { BerkasService } from '../../_shared/services/berkas.service';
// import { FabService } from '../../_shared/services/fab.service';
// import { BusyService } from '../../_shared/services/busy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private gs: GlobalService,
    // private router: Router,
    // private bs: BusyService,
    // private berkas: BerkasService,
    // private fs: FabService
  ) {
    this.gs.bannerImg = '/assets/img/home-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
  }

}
