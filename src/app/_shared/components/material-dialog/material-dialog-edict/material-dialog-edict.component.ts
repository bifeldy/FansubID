import { Component, OnInit, OnDestroy, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { toRomaji } from 'wanakana';

import { KanjiModel } from '../../../../../models/req-res.model';

import { GlobalService } from '../../../../_shared/services/global.service';
import { NihongoService } from '../../../../_shared/services/nihongo.service';
// import { RightPanelService } from '../../../../_shared/services/right-panel.service';

declare const Dmak: any;

@Component({
  selector: 'app-material-dialog-edict',
  templateUrl: './material-dialog-edict.component.html',
  styleUrls: ['./material-dialog-edict.component.css']
})
export class MaterialDialogEdictComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('dmakElement') dmakElement: ElementRef;

  dmak = null;
  dmakUrl = '/assets/kanji/';

  charToDraw = 'NO DATA';

  edict = [];

  page = 1;
  pageFinished = false;

  subsEdict = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: KanjiModel,
    private nihon: NihongoService,
    // private rps: RightPanelService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get DATA(): KanjiModel {
    return this.data;
  }

  getRomaji(kana: string): string {
    return toRomaji(kana);
  }

  ngOnInit(): void {
    this.gs.log('[DIALOG_DATA_IN]', this.data);
    if ('character' in this.data && this.data.character) {
      this.charToDraw = this.data.character;
    }
    this.loadEdict();
  }

  ngOnDestroy(): void {
    this.subsEdict?.unsubscribe();
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

  loadEdict(): void {
    this.subsEdict = this.nihon.getAllEdict(this.charToDraw, this.page).subscribe({
      next: res => {
        this.gs.log('[EDICT_LIST_SUCCESS]', res);
        this.edict = [...this.edict, ...res.results];
        if (res.results.length <= 0) {
          this.pageFinished = true;
        }
      },
      error: err => {
        this.gs.log('[EDICT_LIST_ERROR]', err, 'error');
      }
    });
  }

  loadNextPage(): void {
    if (!this.pageFinished) {
      this.page++;
      this.loadEdict();
    }
  }

  openVocab(data): void {
    this.gs.log('[EDICT_LIST_CLICK_VOCAB]', data);
    // this.rps.openSidePanel();
  }

}
