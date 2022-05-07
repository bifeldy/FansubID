import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { GlobalService } from '../../../_shared/services/global.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { NihongoService } from '../../../_shared/services/nihongo.service';
import { DialogService } from '../../../_shared/services/dialog.service';

@Component({
  selector: 'app-kanji',
  templateUrl: './nihongo-jlpt-school.component.html',
  styleUrls: ['./nihongo-jlpt-school.component.css']
})
export class NihongoJlptSchoolComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageSizeOptions = [50, 75, 100, 125, 150];

  jlpt = '';
  school = '';

  count = 0;
  page = 1;
  row = 50;

  q = '';
  sort = '';
  order = '';

  kanjiData = [];

  subsKanji = null;
  subsDialog = null;

  constructor(
    private gs: GlobalService,
    private bs: BusyService,
    private nihon: NihongoService,
    private ds: DialogService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getKanji();
    }
  }

  ngOnDestroy(): void {
    this.subsKanji?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  changeJlpt(data): void {
    this.gs.log('[JLPT_CHANGED]', data);
    this.jlpt = data;
    this.resetPaginator();
  }

  changeSchool(data): void {
    this.gs.log('[SCHOOL_CHANGED]', data);
    this.school = data;
    this.resetPaginator();
  }

  applyFilter(event): void {
    this.gs.log('[SEARCH_VALUE_CHANGED]', event);
    this.q = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.resetPaginator();
  }

  paginatorChanged(data): void {
    this.gs.log('[PAGINATOR_VALUE_CHANGED]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getKanji();
  }

  resetPaginator(): void {
    this.paginator._changePageSize(this.pageSizeOptions[0]);
    this.paginator.firstPage();
  }

  getKanji(): void {
    this.bs.busy();
    if (this.subsKanji) {
      this.subsKanji.unsubscribe();
      this.bs.idle();
    }
    this.subsKanji = this.nihon.getAllKanji(this.jlpt, this.school, this.q, this.page, this.row, 'context', 'asc').subscribe({
      next: res => {
        this.gs.log('[KANJI_LIST_SUCCESS]', res);
        this.count = res.count;
        this.kanjiData = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[KANJI_LIST_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  openEdict(kana): void {
    this.gs.log('[HIRAKATA_OPEN_EDICT]', kana);
    this.subsDialog = this.ds.openEdictDialog({
      data: {
        character: kana.character,
        context: kana.context,
        freq: kana.freq,
        gakken: kana.gakken,
        harlpern_kkld: kana.harlpern_kkld,
        harlpern_njecd: kana.harlpern_njecd,
        jlpt: kana.jlpt,
        maniette: kana.maniette,
        nelson_c: kana.nelson_c,
        nelson_n: kana.nelson_n,
        remember: kana.remember,
        school: kana.school,
        skip: kana.skip,
        stroke: kana.stroke,
        translate: kana.translate,
        v_kunyomi: kana.v_kunyomi,
        v_onyomi: kana.v_onyomi
      },
      disableClose: false
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[EDICT_DIALOG_CLOSED]', re);
        this.subsDialog.unsubscribe();
      }
    });
  }

}
