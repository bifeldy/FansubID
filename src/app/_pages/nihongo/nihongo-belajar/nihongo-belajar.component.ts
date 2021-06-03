import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { NihongoService } from '../../../_shared/services/nihongo.service';

@Component({
  selector: 'app-belajar',
  templateUrl: './nihongo-belajar.component.html',
  styleUrls: ['./nihongo-belajar.component.css']
})
export class NihongoBelajarComponent implements OnInit {

  modeTampilan = 'hiragana';

  daftarHuruf = null;

  constructor(
    private gs: GlobalService,
    private bs: BusyService,
    private ds: DialogService,
    private nihon: NihongoService,
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getHirakata();
    }
  }

  changeModeTampilan(data): void {
    this.gs.log('[HIRAKATA_CHANGE_KANA]', data);
    this.modeTampilan = data;
  }

  openDmak(kana): void {
    this.gs.log('[HIRAKATA_OPEN_DMAK]', kana);
    this.ds.openDmakDialog({
      data: {
        romaji: kana.path,
        hiragana_katakana_kanji: (
          this.modeTampilan === 'hiragana' ?　kana.hiragana :　kana.katakana
        )
      },
      disableClose: false
    });
  }

  getHirakata(): void {
    this.bs.busy();
    this.nihon.getHirakata().subscribe({
      next: res => {
        this.gs.log('[HIRAKATA_SUCCESS]', res);
        const huruf = {};
        for (const r of res.results) {
          if (!huruf[r.category]) {
            huruf[r.category] = {};
          }
          if (!huruf[r.category][r.segment]) {
            huruf[r.category][r.segment] = [];
          }
          huruf[r.category][r.segment].push({
            romaji: r.romaji,
            hiragana: r.hiragana,
            katakana: r.katakana,
          });
        }
        this.daftarHuruf = huruf;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[NEWS_DETAIL_ERROR]', err);
        this.bs.idle();
      }
    });
  }

}
