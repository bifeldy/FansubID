import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BerkasService {

  constructor(
    private api: ApiService
  ) {
  }

  getAllBerkas(q = '', page = 1, row = 10): any {
    return this.api.getData(`/berkas?q=${q}&page=${page}&row=${row}`);
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

  uploadLampiran(lampiran): any {
    return this.api.uploadFile(`/attachment`, lampiran);
  }

}
