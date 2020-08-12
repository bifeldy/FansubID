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

  getBerkasFansub(encryptedFansubIdArray, q = null, page = 1, row = 10): any {
    return this.api.postData(`/fansub/berkas?q=${q}&page=${page}&row=${row}`, encryptedFansubIdArray);
  }

  getAnimeFansub(encryptedFansubIdArray): any {
    return this.api.postData(`/fansub/anime`, encryptedFansubIdArray);
  }

}
