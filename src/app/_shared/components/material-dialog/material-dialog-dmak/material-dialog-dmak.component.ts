import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalService } from '../../../../_shared/services/global.service';

import { DialogDmakData } from '../../../models/Dialog';

declare const Dmak: any;

@Component({
  selector: 'app-material-dialog-dmak',
  templateUrl: './material-dialog-dmak.component.html',
  styleUrls: ['./material-dialog-dmak.component.css']
})
export class MaterialDialogDmakComponent implements OnInit, AfterViewInit {

  @ViewChild('dmakElement') dmakElement: ElementRef;

  dmak = null;
  dmakUrl = 'https://kanjivg.tagaini.net/kanjivg/kanji/';

  charToDraw = 'NO DATA';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogDmakData,
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    this.gs.log('[DIALOG_DATA]', this.data);
    if ('hiragana_katakana_kanji' in this.data && this.data.hiragana_katakana_kanji) {
      this.charToDraw = this.data.hiragana_katakana_kanji;
    }
  }

  ngAfterViewInit(): void {
    this.dmak = new Dmak(this.charToDraw, {
      element: 'dmakElement',
      uri: this.dmakUrl,
      stroke: {
        order: {
          visible: true
        }
      }
    });
  }

  back(): void {
    this.dmak.eraseLastStrokes(1);
  }

  pause(): void {
    this.dmak.pause();
  }

  play(): void {
    this.dmak.render();
  }

  next(): void {
    this.dmak.renderNextStrokes(1);
  }

}
