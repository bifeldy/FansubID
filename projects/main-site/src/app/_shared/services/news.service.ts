import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JsonResponse, NewsModel } from '../../../models/req-res.model';

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

  delete(newsId: any): Observable<JsonResponse<NewsModel>> {
    return this.api.deleteData(`/news/${newsId}`);
  }

  getAllNews(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<NewsModel>> {
    return this.api.getData(`/news?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createNews(newsData): Observable<JsonResponse<NewsModel>> {
    return this.api.postData(`/news`, newsData);
  }

  updateNews(newsId, newsData): Observable<JsonResponse<NewsModel>> {
    return this.api.putData(`/news/${newsId}`, newsData);
  }

  getNews(newsId: number): Observable<JsonResponse<NewsModel>> {
    return this.api.getData(`/news/${newsId}`);
  }

}
