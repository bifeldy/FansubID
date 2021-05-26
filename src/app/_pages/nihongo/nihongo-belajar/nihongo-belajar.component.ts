import { Component, OnInit } from '@angular/core';

import * as wanakana from 'wanakana';

import { GlobalService } from '../../../_shared/services/global.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { QuizService } from '../../../_shared/services/quiz.service';

@Component({
  selector: 'app-belajar',
  templateUrl: './nihongo-belajar.component.html',
  styleUrls: ['./nihongo-belajar.component.css']
})
export class NihongoBelajarComponent implements OnInit {

  modeTampilan = 'hiragana';

  constructor(
    private gs: GlobalService,
    private ds: DialogService,
    public quiz: QuizService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
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
          this.modeTampilan === 'hiragana' ?　kana.hiragana :　wanakana.toKatakana(kana.hiragana)
        )
      },
      disableClose: false
    });
  }

}
