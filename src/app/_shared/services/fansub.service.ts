import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JsonResponse, FansubModel, JsonResponseArray, UserFansubGroupMemberModel } from '../../../models/req-res.model';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class FansubService {

  constructor(
    private api: ApiService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  searchFansub(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray<FansubModel>> {
    return this.api.getData(`/fansub?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  createFansub(fansubData): Observable<JsonResponse<FansubModel>> {
    return this.api.postData(`/fansub`, fansubData);
  }

  updateFansub(fansubSlug, fansubData): Observable<JsonResponse<FansubModel>> {
    return this.api.putData(`/fansub/${fansubSlug}`, fansubData);
  }

  getFansub(fansubSlug: string): Observable<JsonResponse<FansubModel>> {
    return this.api.getData(`/fansub/${fansubSlug}`);
  }

  getAllFansub(): Observable<JsonResponseArray<FansubModel>> {
    return this.api.getData(`/fansub-all`);
  }

  cekSlug(fansubData): Observable<JsonResponse> {
    return this.api.patchData(`/fansub-slug`, fansubData);
  }

  getBerkasFansub(fansubId = [], q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray> {
    return this.api.patchData(`/fansub-berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`, { id: fansubId });
  }

  getAnimeFansub(fansubId = [], page = 1, row = 10): Observable<JsonResponseArray> {
    return this.api.patchData(`/fansub-anime?page=${page}&row=${row}`, { id: fansubId });
  }

  getDoramaFansub(fansubId = [], page = 1, row = 10): Observable<JsonResponseArray> {
    return this.api.patchData(`/fansub-dorama?page=${page}&row=${row}`, { id: fansubId });
  }

  getRssFeedFansubAllActiveOnly(): Observable<JsonResponseArray> {
    return this.api.getData('/fansub-rss-feed-active');
  }

  getRssFeedFansubAll(): Observable<JsonResponseArray> {
    return this.api.getData('/fansub-rss-feed-all');
  }

  getRssFeedFansub(fansubSlug: string): Observable<JsonResponse> {
    return this.api.getData(`/fansub/${fansubSlug}/rss`);
  }

  getFansubMember(fansubSlug: string): Observable<JsonResponseArray<UserFansubGroupMemberModel>> {
    return this.api.getData(`/fansub/${fansubSlug}/member`);
  }

  getAllFansubMember(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponseArray<UserFansubGroupMemberModel>> {
    return this.api.getData(`/fansub-member?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  requestJoinFansubMember(fansubMemberData): Observable<JsonResponse<UserFansubGroupMemberModel>> {
    return this.api.postData(`/fansub-member`, fansubMemberData);
  }

  approveRejectFansubMember(fansubMemberId: string, fansubMemberData): Observable<JsonResponse<UserFansubGroupMemberModel>> {
    return this.api.putData(`/fansub-member/${fansubMemberId}`, fansubMemberData);
  }

  leaveFansubMember(fansubMemberId: string): Observable<JsonResponse<UserFansubGroupMemberModel>> {
    return this.api.deleteData(`/fansub-member/${fansubMemberId}`);
  }

}
