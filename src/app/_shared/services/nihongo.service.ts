import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class NihongoService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAllKanji(jlpt = '', school = '', q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/nihongo/kanji?jlpt=${jlpt}&school=${school}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAllEdict(q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/nihongo/edict?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAllBook(q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/nihongo?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createBook(bookData): Observable<any> {
    return this.api.postData(`/nihongo`, bookData);
  }

  getBookDetailAndChapterList(bookId): Observable<any> {
    return this.api.getData(`/nihongo/${bookId}`);
  }

  updateBook(bookId, bookData): Observable<any> {
    return this.api.putData(`/nihongo/${bookId}`, bookData);
  }

  createChapter(bookId, chapterData): Observable<any> {
    return this.api.postData(`/nihongo/${bookId}`, chapterData);
  }

  getChapterDetail(bookId, chapterId): Observable<any> {
    return this.api.getData(`/nihongo/${bookId}/${chapterId}`);
  }

  updateChapter(bookId, chapterId, chapterData): Observable<any> {
    return this.api.putData(`/nihongo/${bookId}/${chapterId}`, chapterData);
  }
}
