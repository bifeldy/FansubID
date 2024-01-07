import { Injectable } from '@angular/core';

import { WinBoxConstructor } from 'winbox';

import { ServerInfoModel } from '../../../models/socket-io.model';

import { GlobalService } from './global.service';
import { DialogService } from './dialog.service';
import { StatsServerService } from './stats-server.service';

declare const WinBox: WinBoxConstructor;

@Injectable({
  providedIn: 'root'
})
export class WinboxService {

  currentServer: ServerInfoModel = null;

  openedWindow = {};

  subsDialog = null;
  subsServer = null;

  constructor(
    private gs: GlobalService,
    private ds: DialogService,
    private ss: StatsServerService
  ) {
    if (this.gs.isBrowser) {
      this.subsServer = this.ss.currentServer.subscribe({ next: server => this.currentServer = server });
    }
  }

  async confirmationOpenUrl(uriUrl, windowTarget): Promise<void> {
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `Ingin Buka Di Tab ${windowTarget === '_self' ? 'Ini' : 'Baru'} ?`,
      uriUrl,
      false
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.gs.window.open(uriUrl, windowTarget);
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  winboxOpenUri(uriUrl: string, windowTarget = '_blank', force = false): void {
    if (uriUrl.startsWith('http://')) {
      uriUrl = 'https://' + uriUrl.slice(7, uriUrl.length);
    }
    if (uriUrl.startsWith('/api/')) {
      this.confirmationOpenUrl(uriUrl, '_self');
    } else if (
      (this.currentServer?.winboxOpenLink &&
      !this.gs.includesOneOf(uriUrl, ['ftp://', 'mailto:'])) ||
      force
    ) {
      const currentDateTime = Date.now();
      this.openedWindow[currentDateTime] = new WinBox(uriUrl, {
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
        onclose: (force): any => {
          this.confirmationOpenUrl(uriUrl, windowTarget);
          return false;
        }
      });
    } else {
      this.confirmationOpenUrl(uriUrl, windowTarget);
    }
  }

}
