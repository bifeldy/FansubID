import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class NihongoService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAllKanji(jlpt = '', school = '', q = '', page = 1, row = 10, sort = '', order = ''): any {
    return this.api.getData(`/nihongo/kanji?jlpt=${jlpt}&school=${school}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getAllEdict(q = '', page = 1, row = 10, sort = '', order = ''): any {
    return this.api.getData(`/nihongo/edict?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }
}
