import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BerkasModel, DoramaModel, FansubModel, JsonResponse } from '../../../models/req-res.model';

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

  searchDorama(q: string, type = ''): Observable<JsonResponse<any>> {
    return this.api.getData(`/dorama?q=${q}&type=${type}`);
  }

  getDorama(doramaId: string): Observable<JsonResponse<any>> {
    return this.api.getData(`/dorama/${doramaId}`);
  }

  addNewDorama(doramaData): Observable<JsonResponse<DoramaModel>> {
    return this.api.patchData(`/dorama`, doramaData);
  }

  getSeasonalDorama(year: number, season: string): Observable<JsonResponse<any>> {
    return this.api.getData(`/dorama-seasonal?year=${year}&season=${season}`);
  }

  getBerkasDorama(doramaId = [], q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<BerkasModel>> {
    return this.api.patchData(`/dorama-berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`, { id: doramaId });
  }

  getFansubDorama(doramaId = [], page = 1, row = 10): Observable<JsonResponse<FansubModel>> {
    return this.api.patchData(`/dorama-fansub?page=${page}&row=${row}`, { id: doramaId });
  }

}
