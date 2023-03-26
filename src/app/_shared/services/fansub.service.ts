import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JsonResponse, FansubModel, FansubMemberModel } from '../../../models/req-res.model';

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

  searchFansub(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<FansubModel>> {
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

  getAllFansub(): Observable<JsonResponse<FansubModel>> {
    return this.api.getData(`/fansub-all`);
  }

  cekSlug(fansubData): Observable<JsonResponse> {
    return this.api.patchData(`/fansub-slug`, fansubData);
  }

  getBerkasFansub(fansubId = [], q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse> {
    return this.api.patchData(`/fansub-berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`, { id: fansubId });
  }

  getAnimeFansub(fansubId = [], page = 1, row = 10): Observable<JsonResponse> {
    return this.api.patchData(`/fansub-anime?page=${page}&row=${row}`, { id: fansubId });
  }

  getDoramaFansub(fansubId = [], page = 1, row = 10): Observable<JsonResponse> {
    return this.api.patchData(`/fansub-dorama?page=${page}&row=${row}`, { id: fansubId });
  }

  getRssFeedFansubAllActiveOnly(): Observable<JsonResponse> {
    return this.api.getData('/fansub-rss-feed-active');
  }

  getRssFeedFansubAll(): Observable<JsonResponse> {
    return this.api.getData('/fansub-rss-feed-all');
  }

  getRssFeedFansub(fansubSlug: string): Observable<JsonResponse> {
    return this.api.getData(`/fansub/${fansubSlug}/rss`);
  }

  getFansubMember(fansubSlug: string): Observable<JsonResponse<FansubMemberModel>> {
    return this.api.getData(`/fansub/${fansubSlug}/member`);
  }

  getAllFansubMember(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<FansubMemberModel>> {
    return this.api.getData(`/fansub-member?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  requestJoinFansubMember(fansubMemberData): Observable<JsonResponse<FansubMemberModel>> {
    return this.api.postData(`/fansub-member`, fansubMemberData);
  }

  approveRejectFansubMember(fansubMemberId: string, fansubMemberData): Observable<JsonResponse<FansubMemberModel>> {
    return this.api.putData(`/fansub-member/${fansubMemberId}`, fansubMemberData);
  }

  leaveFansubMember(fansubMemberId: string): Observable<JsonResponse<FansubMemberModel>> {
    return this.api.deleteData(`/fansub-member/${fansubMemberId}`);
  }

  getAllSubDomain(q = '', page = 1, row = 12, sort = '', order = ''): Observable<JsonResponse<any>> {
    return this.api.getData(`/fansub-dns?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  claimSubDomain(dnsData): Observable<JsonResponse<any>> {
    return this.api.postData(`/fansub-dns`, dnsData);
  }

  getSubDomain(fansubSlug: string): Observable<JsonResponse<any>> {
    return this.api.getData(`/fansub-dns/${fansubSlug}?ngsw-bypass=true`);
  }

  updateSubDomain(fansubSlug: string, dnsData): Observable<JsonResponse<any>> {
    return this.api.putData(`/fansub-dns/${fansubSlug}`, dnsData);
  }

}
