import { Injectable } from '@angular/core';

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

  searchDorama(q: string, type = ''): any {
    return this.api.getData(`/dorama?q=${q}&type=${type}`);
  }

  getDorama(doramaId: string): any {
    return this.api.getData(`/dorama/${doramaId}`);
  }

  addNewDorama(doramaData): any {
    return this.api.postData(`/dorama`, doramaData);
  }

  getSeasonalDorama(year: number, season: string): any {
    return this.api.getData(`/dorama/seasonal?year=${year}&season=${season}`);
  }

  getBerkasDorama(id = [], q = '', page = 1, row = 10, sort = '', order = ''): any {
    return this.api.getData(`/dorama/berkas?id=${id}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getFansubDorama(id = []): any {
    return this.api.getData(`/dorama/fansub?id=${id}`);
  }

}
