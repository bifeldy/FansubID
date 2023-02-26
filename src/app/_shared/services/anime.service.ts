import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AnimeModel, BerkasModel, FansubModel, JsonResponse } from '../../../models/req-res.model';

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

  searchAnime(q: string): Observable<JsonResponse<any>> {
    return this.api.getData(`/anime?q=${q}`);
  }

  getAnime(animeId: string): Observable<JsonResponse<any>> {
    return this.api.getData(`/anime/${animeId}`);
  }

  addNewAnime(animeData): Observable<JsonResponse<AnimeModel>> {
    return this.api.patchData(`/anime`, animeData);
  }

  getSeasonalAnime(year: number, season: string): Observable<JsonResponse<any>> {
    return this.api.getData(`/anime-seasonal?year=${year}&season=${season}`);
  }

  getBerkasAnime(animeId = [], q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<BerkasModel>> {
    return this.api.patchData(`/anime-berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`, { id: animeId });
  }

  getFansubAnime(animeId = [], page = 1, row = 10): Observable<JsonResponse<FansubModel>> {
    return this.api.patchData(`/anime-fansub?page=${page}&row=${row}`, { id: animeId });
  }

}
