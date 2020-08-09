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

  getAllBerkas(q = null, page = 1, row = 10): any {
    return this.api.getData(`/berkas?q=${q}&page=${page}&row=${row}`);
  }

  getBerkas(fansubId: number): any {
    return this.api.getData(`/berkas/${fansubId}`);
  }
}
