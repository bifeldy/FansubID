import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  searchAnime(q: string, type = ''): any {
    return this.api.getData(`/anime?q=${q}&type=${type}`);
  }

  getAnime(animeId: number): any {
    return this.api.getData(`/anime/${animeId}`);
  }

  addNewAnime(animeData): any {
    return this.api.postData(`/anime`, animeData);
  }

  getSeasonalAnime(year: number, season: string): any {
    return this.api.getData(`/anime/seasonal?year=${year}&season=${season}`);
  }

  getBerkasAnime(id = [], q = '', page = 1, row = 10, sort = '', order = ''): any {
    return this.api.getData(`/anime/berkas?id=${id}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getFansubAnime(id = []): any {
    return this.api.getData(`/anime/fansub?id=${id}`);
  }

}
