import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AttachmentModel, JsonResponse } from '../../../models/req-res.model';

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

  getAttachmentNotUploaded(q = '', page = 1, row = 10, sort = '', order = '', failedOnly: boolean): Observable<JsonResponse<AttachmentModel>> {
    return this.api.getData(`/attachment?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}${failedOnly ? '&failed=true' : ''}`);
  }

  reUpload(attachmentData): Observable<JsonResponse<AttachmentModel>> {
    return this.api.patchData(`/attachment`, attachmentData);
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
    return this.api.getData(`/attachment/${attachmentId}`);
  }

  downloadDdlProxy(ddlId): Observable<any> {
    return this.api.getData(`/ddl-part/${ddlId}`, {
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
      reportProgress: true,
      headers: {
        'ngsw-bypass': 'true'
      }
    });
  }

  generateLink(attachmentId): Observable<any> {
    return this.api.getData(`/ddl-generate/${attachmentId}`);
  }

}
