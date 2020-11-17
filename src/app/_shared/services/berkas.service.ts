import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class BerkasService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAllBerkas(q = '', page = 1, row = 10, sort = '', order = ''): any {
    return this.api.getData(`/berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getBerkas(berkasId: number): any {
    return this.api.getData(`/berkas/${berkasId}`);
  }

  createBerkas(berkasData): any {
    return this.api.postData(`/berkas`, berkasData);
  }

  updateBerkas(berkasId, berkasData): any {
    return this.api.putData(`/berkas/${berkasId}`, berkasData);
  }

  uploadLampiran(attachment): any {
    return this.api.postData(`/attachment`, attachment, true, {
      observe: 'events',
      reportProgress: true
    });
  }

}
