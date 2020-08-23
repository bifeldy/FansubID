import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(
    private api: ApiService
  ) {
  }

  searchAnime(q: string, type = ''): any {
    return this.api.getData(`/anime/?q=${q}&type=${type}`);
  }

  getAnime(animeId: number): any {
    return this.api.getData(`/anime/${animeId}`);
  }

  addNewAnime(encryptedAnimeData): any {
    return this.api.postData(`/anime`, encryptedAnimeData);
  }

  getSeasonalAnime(year: number, season: string): any {
    return this.api.getData(`/anime/seasonal?year=${year}&season=${season}`);
  }

  getBerkasAnime(id = [], q = null, page = 1, row = 10): any {
    return this.api.getData(`/anime/berkas?id=${id}&q=${q}&page=${page}&row=${row}`);
  }

  getFansubAnime(id = []): any {
    return this.api.getData(`/anime/fansub?id=${id}`);
  }

}
