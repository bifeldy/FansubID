import { Injectable } from '@angular/core';

declare var WinBox: any;

import { GlobalService } from './global.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class WinboxService {

  openedWindow = {};

  subsDialog = null;

  constructor(
    private gs: GlobalService,
    private ds: DialogService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  winboxOpenUri(uriUrl: string, windowTarget = '_blank'): void {
    const currentDateTime = new Date().getTime();
    this.openedWindow[currentDateTime] = new WinBox({
      id: currentDateTime,
      title: uriUrl,
      url: uriUrl,
      class: 'no-full no-shadow no-max',
      background: '#7b1fa2',
      x: 'center',
      y: 'center',
      top: 56,
      right: 0,
      bottom: 32,
      left: 64,
      onclose: (force) => {
        this.subsDialog = this.ds.openInfoDialog({
          data: {
            title: 'Ingin Membuka Di Tab Baru?',
            htmlMessage: uriUrl,
            confirmText: 'Ya',
            cancelText: 'Tidak'
          },
          disableClose: false
        }).afterClosed().subscribe({
          next: re => {
            if (re === true) {
              window.open(uriUrl, windowTarget);
            }
            this.subsDialog.unsubscribe();
          }
        });
      }
    });
  }

}
