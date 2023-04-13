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
    return this.api.getData(`/attachment/${attachmentId}`, {
      responseType: 'blob',
      observe: 'events',
      reportProgress: true,
      headers: {
        'ngsw-bypass': 'true'
      }
    });
  }

  getListDdl(attachmentId): Observable<any> {
    return this.api.getData(`/attachment/${attachmentId}?ngsw-bypass=true`);
  }

  downloadDdlProxy(ddlId): Observable<any> {
    return this.api.patchData(`/ddl-file/${ddlId}`, {}, false, {
      responseType: 'blob',
      observe: 'events',
      reportProgress: true,
      headers: {
        'ngsw-bypass': 'true'
      }
    });
  }

  downloadDdlDirect(url): Observable<any> {
    return this.api.getData(url, {
      responseType: 'blob',
      observe: 'events',
      reportProgress: true
    });
  }

}
