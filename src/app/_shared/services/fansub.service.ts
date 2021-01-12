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

  cekSlug(fansubData): any {
    return this.api.postData(`/fansub/cek-slug`, fansubData);
  }

  updateFansub(fansubSlug, fansubData): any {
    return this.api.putData(`/fansub/${fansubSlug}`, fansubData);
  }

  getFansub(fansubSlug: number): any {
    return this.api.getData(`/fansub/${fansubSlug}`);
  }

  getBerkasFansub(fansubId = [], q = '', page = 1, row = 10, sort = '', order = ''): any {
    return this.api.getData(`/fansub/berkas?id=${fansubId}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAnimeFansub(fansubId = []): any {
    return this.api.getData(`/fansub/anime?id=${fansubId}`);
  }

  getDoramaFansub(fansubId = []): any {
    return this.api.getData(`/fansub/dorama?id=${fansubId}`);
  }

}
