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

  getAllNihongo(category = '', q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/nihongo?category=${category}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createNihongo(nihongoData): Observable<any> {
    return this.api.postData(`/nihongo`, nihongoData);
  }

  updateNihongo(nihongoId, nihongoData): Observable<any> {
    return this.api.putData(`/nihongo/${nihongoId}`, nihongoData);
  }

  getHirakata(): Observable<any> {
    return this.api.patchData(`/nihongo/hirakata/list-all`);
  }

  getAllKanji(jlpt = '', school = '', q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/nihongo/kanji?jlpt=${jlpt}&school=${school}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAllEdict(q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/nihongo/edict?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAllBook(q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/nihongo/books?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createBook(bookData): Observable<any> {
    return this.api.postData(`/nihongo/books`, bookData);
  }

  getBookDetailAndChapterList(bookId): Observable<any> {
    return this.api.getData(`/nihongo/books/${bookId}`);
  }

  updateBook(bookId, bookData): Observable<any> {
    return this.api.putData(`/nihongo/books/${bookId}`, bookData);
  }

  createChapter(bookId, chapterData): Observable<any> {
    return this.api.postData(`/nihongo/books/${bookId}`, chapterData);
  }

  getChapterDetail(bookId, chapterId): Observable<any> {
    return this.api.getData(`/nihongo/books/${bookId}/${chapterId}`);
  }

  updateChapter(bookId, chapterId, chapterData): Observable<any> {
    return this.api.putData(`/nihongo/books/${bookId}/${chapterId}`, chapterData);
  }
}
