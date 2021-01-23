import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../../_shared/services/global.service';
import { BusyService } from '../../../../_shared/services/busy.service';
import { NihongoService } from '../../../../_shared/services/nihongo.service';

@Component({
  selector: 'app-kanji-list',
  templateUrl: './kanji-list.component.html',
  styleUrls: ['./kanji-list.component.css']
})
export class KanjiListComponent implements OnInit {

  pageSizeOptions = [50, 125, 250, 500];

  jlpt = '';
  school = '';

  count = 0;
  page = 1;
  row = 50;

  q = '';
  sort = '';
  order = '';

  kanjiData = [];

  constructor(
    private gs: GlobalService,
    private bs: BusyService,
    private nihon: NihongoService
  ) {
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getKanji();
    }
  }

  changeJlpt(data): void {
    this.gs.log('[JLPT_CHANGE]', data);
    this.jlpt = data;
    this.getKanji();
  }

  changeSchool(data): void {
    this.gs.log('[SCHOOL_CHANGE]', data);
    this.school = data;
    this.getKanji();
  }

  applyFilter(event): void {
    this.gs.log('[SEARCH_VALUE_CHANGED]', event);
    this.q = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.getKanji();
  }

  paginatorChanged(data): void {
    this.gs.log('[PAGINATOR_VALUE_CHANGED]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getKanji();
  }

  getKanji(): void {
    this.bs.busy();
    this.nihon.getAllKanji(
      this.jlpt, this.school, this.q, this.page, this.row, 'context', 'asc'
    ).subscribe(
      res => {
        this.gs.log('[KANJI_LIST_SUCCESS]', res);
        this.count = res.count;
        this.kanjiData = res.results;
        this.bs.idle();
      },
      err => {
        this.gs.log('[KANJI_LIST_ERROR]', err);
        this.bs.idle();
      }
    );
  }

}
