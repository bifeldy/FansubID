import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { EdictModel, HirakataModel, JsonResponse, KanjiModel, NihongoCategoryModel, NihongoModel } from '../../../models/req-res.model';

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

  getAllNihongo(category = '', q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<NihongoModel>> {
    return this.api.getData(`/nihongo?category=${category}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAllKategori(): Observable<JsonResponse<NihongoCategoryModel>> {
    return this.api.patchData(`/nihongo`);
  }

  createNihongo(nihongoData): Observable<JsonResponse<NihongoModel>> {
    return this.api.postData(`/nihongo`, nihongoData);
  }

  updateNihongo(nihongoId, nihongoData): Observable<JsonResponse<NihongoModel>> {
    return this.api.putData(`/nihongo/${nihongoId}`, nihongoData);
  }

  getHirakata(): Observable<JsonResponse<HirakataModel>> {
    return this.api.getData(`/nihongo-hirakata-all`);
  }

  getAllKanji(jlpt = '', school = '', q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<KanjiModel>> {
    return this.api.getData(`/nihongo-kanji?jlpt=${jlpt}&school=${school}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAllEdict(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<EdictModel>> {
    return this.api.getData(`/nihongo-edict?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

}
