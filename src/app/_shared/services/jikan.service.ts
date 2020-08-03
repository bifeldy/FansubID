import { Injectable } from '@angular/core';

import { GlobalService } from './global.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class JikanService {

  jikanApiUrl = 'http://api.jikan.moe/v3';

  constructor(
    private gs: GlobalService,
    private api: ApiService
  ) {
  }

  getAnime(animeId: number): any {
    this.gs.log('[JIKAN_GET_ANIME_DETAIL]', animeId);
    return this.api.getData(`${this.jikanApiUrl}/anime/${animeId}`);
  }

  getSeasonalAnime(year: number, season: string): any {
    this.gs.log('[JIKAN_GET_ANIME_SEASONAL]', `${year}/${season}`);
    return this.api.getData(`${this.jikanApiUrl}/season/${year}/${season}`);
  }

}
