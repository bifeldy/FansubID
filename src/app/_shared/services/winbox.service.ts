import { Injectable } from '@angular/core';

declare var WinBox: any;

import { ServerInfo } from '../models/ServerInfo';

import { GlobalService } from './global.service';
import { DialogService } from './dialog.service';
import { StatsServerService } from './stats-server.service';

@Injectable({
  providedIn: 'root'
})
export class WinboxService {

  currentServer: ServerInfo = null;

  openedWindow = {};

  subsDialog = null;
  subsServer = null;

  constructor(
    private gs: GlobalService,
    private ds: DialogService,
    public ss: StatsServerService
  ) {
    if (this.gs.isBrowser) {
      this.subsServer = this.ss.currentServer.subscribe({ next: server => this.currentServer = server });
    }
  }

  confirmationOpenUrl(uriUrl, windowTarget): void {
    this.subsDialog = this.ds.openInfoDialog({
      data: {
        title: 'Ingin Buka Di Tab Baru?',
        htmlMessage: uriUrl,
        confirmText: 'Ya',
        cancelText: 'Tidak'
      },
      disableClose: false
    }).afterClosed().subscribe({
      next: re => {
        console.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          window.open(uriUrl, windowTarget);
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  winboxOpenUri(uriUrl: string, windowTarget = '_blank'): void {
    if (uriUrl.startsWith('http://')) {
      uriUrl = 'https://' + uriUrl.slice(7, uriUrl.length);
    } else if (uriUrl.startsWith('ftp://') || uriUrl.startsWith('mailto:')) {
      window.open(uriUrl, windowTarget);
      return;
    }
    if (windowTarget == '_self' || this.currentServer?.winboxOpenLink === false) {
      this.confirmationOpenUrl(uriUrl, windowTarget);
    } else {
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
          this.confirmationOpenUrl(uriUrl, windowTarget);
        }
      });
    }
  }

}
