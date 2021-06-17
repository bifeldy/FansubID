import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getAllComment(q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/comment?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getComment(path = '', q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/comment?path=${path}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getReply(parentId: number, q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/comment/${parentId}?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  sendComment(commentData): Observable<any> {
    return this.api.postData(`/comment`, commentData);
  }

}
