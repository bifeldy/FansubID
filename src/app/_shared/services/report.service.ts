import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAllReport(): Observable<any> {
    return this.api.getData(`/likedislike`);
  }

  getReport(type: string, idSludUsername: string): Observable<any> {
    return this.api.getData(`/likedislike/${type}/${idSludUsername}`);
  }

  setReport(type: string, idSludUsername: string, reportData): Observable<any> {
    return this.api.postData(`/likedislike/${type}/${idSludUsername}`, reportData);
  }

  deleteReport(reportId): Observable<any> {
    return this.api.deleteData(`/likedislike/${reportId}`);
  }

}
