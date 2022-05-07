import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { EdictModel, HirakataModel, JsonResponse, JsonResponseArray, JsonResponseMulti, KanjiModel, LessonModel, NihongoModel } from '../../../models/req-res.model';

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

  getAllNihongo(category = '', q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray<NihongoModel>> {
    return this.api.getData(`/nihongo?category=${category}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createNihongo(nihongoData): Observable<JsonResponse<NihongoModel>> {
    return this.api.postData(`/nihongo`, nihongoData);
  }

  updateNihongo(nihongoId, nihongoData): Observable<JsonResponse<NihongoModel>> {
    return this.api.putData(`/nihongo/${nihongoId}`, nihongoData);
  }

  getHirakata(): Observable<JsonResponseArray<HirakataModel>> {
    return this.api.getData(`/nihongo-hirakata-all`);
  }

  getAllKanji(jlpt = '', school = '', q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray<KanjiModel>> {
    return this.api.getData(`/nihongo-kanji?jlpt=${jlpt}&school=${school}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAllEdict(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray<EdictModel>> {
    return this.api.getData(`/nihongo-edict?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAllBook(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray<LessonModel>> {
    return this.api.getData(`/nihongo-lesson?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createBook(bookData): Observable<JsonResponse<LessonModel>> {
    return this.api.postData(`/nihongo-lesson`, bookData);
  }

  getBookDetailAndChapterList(bookId): Observable<JsonResponseMulti<LessonModel>> {
    return this.api.getData(`/nihongo-lesson/${bookId}`);
  }

  updateBook(bookId, bookData): Observable<JsonResponse<LessonModel>> {
    return this.api.putData(`/nihongo-lesson/${bookId}`, bookData);
  }

  createChapter(bookId, chapterData): Observable<JsonResponse<LessonModel>> {
    return this.api.postData(`/nihongo-lesson/${bookId}`, chapterData);
  }

  getChapterDetail(bookId, chapterId): Observable<JsonResponse<LessonModel>> {
    return this.api.getData(`/nihongo-lesson/${bookId}/${chapterId}`);
  }

  updateChapter(bookId, chapterId, chapterData): Observable<JsonResponse<LessonModel>> {
    return this.api.putData(`/nihongo-lesson/${bookId}/${chapterId}`, chapterData);
  }
}
