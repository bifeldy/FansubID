import { Injectable } from '@angular/core';

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

  getAllNews(q = '', page = 1, row = 10): any {
    return this.api.getData(`/news?q=${q}&page=${page}&row=${row}`);
  }

  createNews(newsData): any {
    return this.api.postData(`/news`, newsData);
  }

  updateNews(newsId, newsData): any {
    return this.api.putData(`/news/${newsId}`, newsData);
  }

  getNews(newsId: number): any {
    return this.api.getData(`/news/${newsId}`);
  }

}
