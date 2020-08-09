import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FansubService {

  constructor(
    private api: ApiService
  ) {
  }

  getAllFansub(): any {
    return this.api.getData(`/fansub`);
  }

  getFansub(fansubId: number): any {
    return this.api.getData(`/fansub/${fansubId}`);
  }

  getBerkasFansub(fansubId = [], q = null, page = 1, row = 10): any {
    return this.api.postData(`/fansub/berkas?q=${q}&page=${page}&row=${row}`, { fansubId });
  }

  getAnimeFansub(fansubId = []): any {
    return this.api.postData(`/fansub/anime`, { fansubId });
  }
  
}
