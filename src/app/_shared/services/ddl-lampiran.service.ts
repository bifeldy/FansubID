import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DdlLampiranService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  downloadLampiran(attachmentId): Observable<any> {
    return this.api.getData(`/attachment/${attachmentId}?ngsw-bypass=true`, {
      responseType: 'blob',
      observe: 'events',
      reportProgress: true,
      headers: {
        'ngsw-bypass': 'true'
      }
    });
  }

}
