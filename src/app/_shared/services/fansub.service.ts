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

  createFansub(formData): any {
    return this.api.postData(`/fansub`, formData, true);
  }

  updateFansub(fansubId, encryptedFansubData): any {
    return this.api.putData(`/fansub/${fansubId}`, encryptedFansubData, true);
  }

  getFansub(fansubId: number): any {
    return this.api.getData(`/fansub/${fansubId}`);
  }

  getBerkasFansub(id = [], q = null, page = 1, row = 10): any {
    return this.api.getData(`/fansub/berkas?id=${id}&q=${q}&page=${page}&row=${row}`);
  }

  getAnimeFansub(id = []): any {
    return this.api.getData(`/fansub/anime?id=${id}`);
  }

}
