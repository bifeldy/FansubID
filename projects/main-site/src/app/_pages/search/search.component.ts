import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../_shared/services/global.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private gs: GlobalService
  ) {
    this.gs.bannerImg = '/assets/img/banner/search.jpg';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    //
  }

}
