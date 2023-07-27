import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JsonResponse, BerkasModel } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class BerkasService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAllBerkas(q = '', page = 1, row = 10, sort = '', order = '', r18: boolean): Observable<JsonResponse<BerkasModel>> {
    return this.api.getData(`/berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}${r18 ? '&r18=true' : ''}`);
  }

  getBerkas(berkasId: string): Observable<JsonResponse<BerkasModel>> {
    return this.api.getData(`/berkas/${berkasId}`);
  }

  createBerkas(berkasData): Observable<JsonResponse<BerkasModel>> {
    return this.api.postData(`/berkas`, berkasData);
  }

  updateBerkas(berkasId, berkasData): Observable<JsonResponse<BerkasModel>> {
    return this.api.putData(`/berkas/${berkasId}`, berkasData);
  }

  checkTrusted(berkasId = []): Observable<JsonResponse<BerkasModel>> {
    return this.api.patchData(`/berkas-trusted`, { id: berkasId });
  }

}
