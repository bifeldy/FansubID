import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAllNews(q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/news?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createNews(newsData): Observable<any> {
    return this.api.postData(`/news`, newsData);
  }

  updateNews(newsId, newsData): Observable<any> {
    return this.api.putData(`/news/${newsId}`, newsData);
  }

  getNews(newsId: number): Observable<any> {
    return this.api.getData(`/news/${newsId}`);
  }

}
