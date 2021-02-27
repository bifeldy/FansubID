import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {

  q = '';

  beritaResults = [1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9, 10];
  kanjiResults = [1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9, 10];
  animeResults = [1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9, 10];
  dramaResults = [1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9, 10];
  fansubResults = [1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9, 10];
  berkasResults = [1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9, 10];
  penggunaResults = [1, 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9, 10];

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
  }

  applyFilter(event): void {
    this.gs.log('[SEARCH_VALUE_CHANGED]', event);
    this.q = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

}
