import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BerkasModel, DoramaModel, FansubModel, JsonResponse, JsonResponseArray } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class DoramaService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  searchDorama(q: string, type = ''): Observable<JsonResponseArray<any>> {
    return this.api.getData(`/dorama?q=${q}&type=${type}`);
  }

  getDorama(doramaId: string): Observable<JsonResponse<any>> {
    return this.api.getData(`/dorama/${doramaId}`);
  }

  addNewDorama(doramaData): Observable<JsonResponse<DoramaModel>> {
    return this.api.postData(`/dorama`, doramaData);
  }

  getSeasonalDorama(year: number, season: string): Observable<JsonResponseArray<any>> {
    return this.api.getData(`/dorama-seasonal?year=${year}&season=${season}`);
  }

  getBerkasDorama(doramaId = [], q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray<BerkasModel>> {
    return this.api.patchData(`/dorama-berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`, { id: doramaId });
  }

  getFansubDorama(doramaId = [], page = 1, row = 10): Observable<JsonResponseArray<FansubModel>> {
    return this.api.patchData(`/dorama-fansub?page=${page}&row=${row}`, { id: doramaId });
  }

}
