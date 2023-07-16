import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BannedModel, BerkasModel, JsonResponse, KomentarModel, LikeDislikeModel, FansubMemberModel, UserModel } from '../../../models/req-res.model';
import { TrackModel } from '../../../models/socket-io.model';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
    private as: AuthService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  checkBanned(username): Observable<JsonResponse<BannedModel>> {
    return this.api.getData(`/banned?username=${username}`);
  }

  getAllUser(q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<UserModel>> {
    return this.api.getData(`/user?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getUserData(username): Observable<JsonResponse<UserModel>> {
    return this.api.getData(`/user/${username}`);
  }

  updateUser(username, userData): Observable<JsonResponse<UserModel>> {
    return this.api.putData(`/user/${username}`, userData).pipe(
      tap(respUpdateUser => {
        this.as.token = respUpdateUser.result.token;
      })
    );
  }

  getUserBerkas(username, q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<BerkasModel>> {
    return this.api.getData(`/user/${username}/feed-berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getUserFeedComment(username, q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<KomentarModel>> {
    return this.api.getData(`/user/${username}/feed-comment?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getUserFeedLikeDislike(username, q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<LikeDislikeModel>> {
    return this.api.getData(`/user/${username}/feed-likedislike?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getUserFeedVisit(username, q = '', page = 1, row = 10, sort = '', order = ''): Observable<JsonResponse<TrackModel>> {
    return this.api.getData(`/user/${username}/feed-visit?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  sosmedLogin(data): Observable<JsonResponse> {
    return this.api.postData('/verify-sosmed', data);
  }

  getUserGroup(username: string): Observable<JsonResponse<FansubMemberModel>> {
    return this.api.getData(`/user/${username}/group`);
  }

  findLostAccount(data): Observable<JsonResponse> {
    return this.api.postData('/lost-account-find', data);
  }

  resetLostAccount(data): Observable<JsonResponse> {
    return this.api.postData('/lost-account-reset', data);
  }

}
