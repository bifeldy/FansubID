import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { JsonResponse, InformationModel } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAllInfo(q: string, page: number, row: number, sort: string, order: string): Observable<JsonResponse<InformationModel>> {
    return this.api.getData(`/information?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getInfo(infoId): Observable<JsonResponse<InformationModel>> {
    return this.api.getData(`/information/${infoId}`);
  }

  createUpdateInfo(infoData): Observable<JsonResponse<InformationModel>> {
    return this.api.postData(`/information`, infoData);
  }

  deleteInfo(infoId): Observable<JsonResponse<InformationModel>> {
    return this.api.deleteData(`/information/${infoId}`);
  }

}
