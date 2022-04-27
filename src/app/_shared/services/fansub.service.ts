import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JsonResponse, FansubModel, JsonResponseArray } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class FansubService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  searchFansub(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray<FansubModel>> {
    return this.api.getData(`/fansub?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createFansub(fansubData): Observable<JsonResponse<FansubModel>> {
    return this.api.postData(`/fansub`, fansubData);
  }

  updateFansub(fansubSlug, fansubData): Observable<JsonResponse<FansubModel>> {
    return this.api.putData(`/fansub/${fansubSlug}`, fansubData);
  }

  getFansub(fansubSlug: string): Observable<JsonResponse<FansubModel>> {
    return this.api.getData(`/fansub/${fansubSlug}`);
  }

  getAllFansub(): Observable<JsonResponseArray<FansubModel>> {
    return this.api.patchData(`/fansub/list-all`);
  }

  cekSlug(fansubData): Observable<JsonResponse> {
    return this.api.postData(`/fansub/cek-slug`, fansubData);
  }

  getBerkasFansub(fansubId = [], q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray> {
    return this.api.patchData(`/fansub/berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`, { id: fansubId });
  }

  getAnimeFansub(fansubId = [], page = 1, row = 10): Observable<JsonResponseArray> {
    return this.api.patchData(`/fansub/anime?page=${page}&row=${row}`, { id: fansubId });
  }

  getDoramaFansub(fansubId = [], page = 1, row = 10): Observable<JsonResponseArray> {
    return this.api.patchData(`/fansub/dorama?page=${page}&row=${row}`, { id: fansubId });
  }

}
