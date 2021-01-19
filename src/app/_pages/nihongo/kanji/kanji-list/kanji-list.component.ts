import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../../_shared/services/global.service';

@Component({
  selector: 'app-kanji-list',
  templateUrl: './kanji-list.component.html',
  styleUrls: ['./kanji-list.component.css']
})
export class KanjiListComponent implements OnInit {

  jlptRank = '';
  schoolRank = '';

  searchQuery = null;

  constructor(
    private gs: GlobalService
  ) { }

  ngOnInit(): void {
  }

  applyFilter(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  paginatorChanged(event: Event): void {
    this.gs.log('[PAGINATOR_VALUE_CHANGED]', event);
  }

}
