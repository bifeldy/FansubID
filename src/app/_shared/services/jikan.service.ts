import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class JikanService {

  constructor(
    private api: ApiService
  ) {
  }

  getSeasonalAnime(year: number, season: string): any {
    return this.api.getData(`/anime?year=${year}&season=${season}`);
  }

  getAnime(animeId: number): any {
    return this.api.getData(`/anime/${animeId}`);
  }

  getSeason(): any {
    return this.api.getData(`/seasons`);
  }

}
