import { Injectable } from '@angular/core';

import { GlobalService } from './global.service';
import { DdlLampiranService } from './ddl-lampiran.service';

@Injectable({
  providedIn: 'root'
})
export class VjsService {

  constructor(
    private gs: GlobalService,
    private dls: DdlLampiranService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  async loadSubtitle(subtitleUrls, callback) {
    const urls: any = [];
    if (subtitleUrls.length > 0) {
      for (const s of subtitleUrls) {
        this.gs.log('[DOWNLOAD_SUBTITLE]', s.id);
        const handler = this.dls.downloadLampiran(s.id).subscribe({
          next: event => {
            if ((event as any).body) {
              const e = (event as any);
              urls.push(URL.createObjectURL(new Blob([e.body])));
              handler.unsubscribe();
              if (urls.length === subtitleUrls.length) {
                callback(urls);
              }
            }
          }
        });
      }
    } else {
      callback(urls);
    }
  }

  async loadFonts(fontUrls, callback) {
    const urls: any = [];
    if (fontUrls.length > 0) {
      for (const f of fontUrls) {
        this.gs.log('[DOWNLOAD_SUBTITLE]', f.id);
        const handler = this.dls.downloadLampiran(f.id).subscribe({
          next: event => {
            if ((event as any).body) {
              const e = (event as any);
              urls.push(URL.createObjectURL(new Blob([e.body])));
              handler.unsubscribe();
              if (urls.length === fontUrls.length) {
                callback(urls);
              }
            }
          }
        });
      }
    } else {
      callback(urls);
    }
  }

}
