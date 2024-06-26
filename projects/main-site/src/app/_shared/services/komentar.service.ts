import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JsonResponse, KomentarModel } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class KomentarService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAllComment(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<KomentarModel>> {
    return this.api.getData(`/comment?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getComment(path = '', q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<KomentarModel>> {
    return this.api.getData(`/comment?path=${path}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getReply(parentId: number, q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<KomentarModel>> {
    return this.api.getData(`/comment/${parentId}?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  sendComment(commentData): Observable<JsonResponse<KomentarModel>> {
    return this.api.postData(`/comment`, commentData);
  }

  getHighlight(commentData): Observable<JsonResponse<KomentarModel>> {
    return this.api.patchData(`/comment`, commentData);
  }

  deleteComment(commentId): Observable<JsonResponse<KomentarModel>> {
    return this.api.deleteData(`/comment/${commentId}`);
  }

}
