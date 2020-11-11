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

  news = [
    {
      id: 2,
      title: 'Fitur Baru Anime & Fansub Database',
      image_url: '/assets/img/fansub-banner.png',
      created_at: '14 Juni 2016',
      user_: {
        email: 'bifeldy@gmail.com',
        id: 1,
        image_url: 'https://i.ibb.co/dDHWy2g/1598472779359.gif',
        username: 'bifeldy',
        verified: true
      },
    },
    {
      id: 1,
      title: 'Uji Coba Rilis & Peluncuran Website',
      image_url: '/assets/img/home-banner.png',
      created_at: '14 Juni 2013',
      user_: {
        email: 'bifeldy@gmail.com',
        id: 1,
        image_url: 'https://i.ibb.co/dDHWy2g/1598472779359.gif',
        username: 'bifeldy',
        verified: true
      },
    },
  ];

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
