import { Injectable } from '@angular/core';

import WinBox from 'winbox/src/js/winbox';
import { environment } from '../../../environments/client/environment';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class WinboxService {

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  winboxOpenUri(uriUrl: string, windowTarget = '_blank'): void {
    if (
      uriUrl.toLowerCase().startsWith(environment.apiUrl) ||
      uriUrl.toLowerCase().startsWith('/') ||
      uriUrl.toLowerCase().includes('myanimelist.net') ||
      uriUrl.toLowerCase().includes('mydramalist.com') ||
      uriUrl.toLowerCase().includes('discord.gg') ||
      uriUrl.toLowerCase().includes('discord.com') ||
      uriUrl.toLowerCase().includes('facebook.com')
    ) {
      window.open(uriUrl, windowTarget);
    } else {
      new WinBox({
        id: new Date().getTime(),
        title: uriUrl,
        url: uriUrl,
        background: '#7b1fa2',
        x: 'center',
        y: 'center',
        max: false,
        top: 56,
        right: 0,
        bottom: 32,
        left: 64
      });
    }
  }

}
