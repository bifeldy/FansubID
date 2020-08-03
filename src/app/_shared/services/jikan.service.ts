import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class JikanService {

  jikanV3 = 'http://api.jikan.moe/v3';
  jikanV4 = 'http://api.jikan.moe/v4-alpha';

  constructor(
    private api: ApiService
  ) {
  }

  getAnime(animeId: number): any {
    return this.api.getData(`${this.jikanV4}/anime/${animeId}`);
  }

  getSeason(): any {
    return this.api.getData(`${this.jikanV4}/seasons`);
  }

  getSeasonalAnime(year: number, season: string): any {
    return this.api.getData(`${this.jikanV3}/season/${year}/${season}`);
  }

}
