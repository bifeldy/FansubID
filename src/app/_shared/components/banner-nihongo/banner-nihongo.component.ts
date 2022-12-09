import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-banner-nihongo',
  templateUrl: './banner-nihongo.component.html',
  styleUrls: ['./banner-nihongo.component.css']
})
export class BannerNihongoComponent implements OnInit {

  nihongoMenu = [
    {
      url: 'belajar',
      title: 'Pengenalan Aksara Jepang',
      image_url: '/assets/img/nihongo/hirakata.png'
    },
    {
      url: 'kanji',
      title: 'Pengayaan Kanji (* JP-EN)',
      image_url: '/assets/img/nihongo/jlpt.png'
    }
  ];

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

}
