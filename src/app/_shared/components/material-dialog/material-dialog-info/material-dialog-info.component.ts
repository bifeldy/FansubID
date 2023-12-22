import { Component, OnInit, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogInfoDataModel } from '../../../../../models/dialog';

import { GlobalService } from '../../../../_shared/services/global.service';

@Component({
  selector: 'app-material-dialog-info',
  templateUrl: './material-dialog-info.component.html',
  styleUrls: ['./material-dialog-info.component.css']
})
export class MaterialDialogInfoComponent implements OnInit, AfterViewInit {

  buttonDisabled = false;

  @ViewChild('htmlElementContentDialog') el: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogInfoDataModel,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get DATA(): DialogInfoDataModel {
    return this.data;
  }

  ngOnInit(): void {
    this.gs.log('[DIALOG_DATA_IN]', this.data);
  }

  ngAfterViewInit(): void {
    const isScrollable = this.checkOverflow();
    if (isScrollable) {
      this.buttonDisabled = true;
    }
  }

  onScroll(ev: any): void {
    this.gs.log('[MOUSE_SCROLL]', ev);
    this.buttonDisabled = !(ev.target.offsetHeight + ev.target.scrollTop >= ev.target.scrollHeight - 1);
  }

  // https://stackoverflow.com/questions/143815/determine-if-an-html-elements-content-overflows
  checkOverflow(): boolean {
    const e = this.el.nativeElement;
    const curOverflow = e.style.overflow;
    if (!curOverflow || curOverflow === 'visible' ) {
      e.style.overflow = 'hidden';
    }
    const isOverflowing = e.clientWidth < e.scrollWidth || e.clientHeight < e.scrollHeight;
    e.style.overflow = curOverflow;
    return isOverflowing;
  }

}
