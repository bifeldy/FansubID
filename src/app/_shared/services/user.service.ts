import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  checkBanned(userId): Observable<any> {
    return this.api.getData(`/banned?id=${userId}`);
  }

  getAllUser(q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/user?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  getUserData(username): Observable<any> {
    return this.api.getData(`/user/${username}`);
  }

  updateUser(username, userData): Observable<any> {
    return this.api.putData(`/user/${username}`, userData).pipe(map(respUpdateUser => {
      this.as.jwtToken = respUpdateUser.result.jwtToken;
      return respUpdateUser;
    }));
  }

  getUserBerkas(username, q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.patchData(`/user/${username}/berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  cekNik(userData): Observable<any> {
    return this.api.postData('/cek-nik', userData);
  }

  verifyKTP(userData): Observable<any> {
    return this.api.putData('/verify', userData).pipe(map(respVerifyKTP => {
      this.as.jwtToken = respVerifyKTP.result.jwtToken;
      return respVerifyKTP;
    }));
  }

  sosmedLogin(data): Observable<any> {
    return this.api.patchData('/verify', data);
  }

}
