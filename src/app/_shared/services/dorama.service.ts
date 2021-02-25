import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  searchDorama(q: string, type = ''): Observable<any> {
    return this.api.getData(`/dorama?q=${q}&type=${type}`);
  }

  getDorama(doramaId: string): Observable<any> {
    return this.api.getData(`/dorama/${doramaId}`);
  }

  addNewDorama(doramaData): Observable<any> {
    return this.api.postData(`/dorama`, doramaData);
  }

  getSeasonalDorama(year: number, season: string): Observable<any> {
    return this.api.getData(`/dorama/seasonal?year=${year}&season=${season}`);
  }

  getBerkasDorama(id = [], q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/dorama/berkas?id=${id}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getFansubDorama(id = []): Observable<any> {
    return this.api.getData(`/dorama/fansub?id=${id}`);
  }

}
