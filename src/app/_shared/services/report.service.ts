import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { JsonResponse, LikeDislikeModel } from '../../../models/req-res.model';

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

  getAllReport(): Observable<JsonResponse<LikeDislikeModel>> {
    return this.api.getData(`/likedislike`);
  }

  getReport(type: string, idSludUsername: string): Observable<JsonResponse> {
    return this.api.getData(`/likedislike/${type}/${idSludUsername}`);
  }

  setReport(type: string, idSludUsername: string, reportData): Observable<JsonResponse<LikeDislikeModel>> {
    return this.api.postData(`/likedislike/${type}/${idSludUsername}`, reportData);
  }

  deleteReport(reportId): Observable<JsonResponse<LikeDislikeModel>> {
    return this.api.deleteData(`/likedislike/${reportId}`);
  }

}
