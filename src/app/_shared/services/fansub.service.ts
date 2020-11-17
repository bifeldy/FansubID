import { Injectable } from '@angular/core';

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

  getAllFansub(): any {
    return this.api.getData(`/fansub`);
  }

  createFansub(fansubData): any {
    return this.api.postData(`/fansub`, fansubData);
  }

  updateFansub(fansubId, fansubData): any {
    return this.api.putData(`/fansub/${fansubId}`, fansubData);
  }

  getFansub(fansubId: number): any {
    return this.api.getData(`/fansub/${fansubId}`);
  }

  getBerkasFansub(id = [], q = '', page = 1, row = 10, sort = '', order = ''): any {
    return this.api.getData(`/fansub/berkas?id=${id}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAnimeFansub(id = []): any {
    return this.api.getData(`/fansub/anime?id=${id}`);
  }

}
