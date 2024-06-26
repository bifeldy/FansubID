import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import { DialogDmakDataModel } from '../../../../../models/dialog';

import { GlobalService } from '../../../../_shared/services/global.service';

declare const Dmak: any;

@Component({
  selector: 'app-material-dialog-dmak',
  templateUrl: './material-dialog-dmak.component.html',
  styleUrls: ['./material-dialog-dmak.component.css']
})
export class MaterialDialogDmakComponent implements OnInit, AfterViewInit {

  // References:
  // https://github.com/mbilbille/dmak
  // https://github.com/KanjiVG/kanjivg

  @ViewChild('dmakElement') dmakElement: ElementRef;

  dmak = null;
  dmakUrl = '/assets/kanji/';

  charToDraw = 'NO DATA';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogDmakDataModel,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get DATA(): DialogDmakDataModel {
    return this.data;
  }

  ngOnInit(): void {
    this.gs.log('[DIALOG_DATA_IN]', this.data);
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
        },
        attr: {
          active: '#f44336',
          stroke: '#28a745'
        }
      }
    });
  }

  play(): void {
    this.dmak.render();
  }

  pause(): void {
    this.dmak.pause();
  }

  next(): void {
    this.pause();
    this.dmak.renderNextStrokes(1);
  }

  back(): void {
    this.pause();
    this.dmak.eraseLastStrokes(1);
  }

  reset(): void {
    this.pause();
    this.dmak.erase();
  }

}
