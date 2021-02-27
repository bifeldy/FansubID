import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService,
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
    return this.api.putData(`/user/${username}`, userData);
  }

  getUserBerkas(username, q = '', page = 1, row = 10, sort = '', order = ''): Observable<any> {
    return this.api.getData(`/user/${username}/berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
  }

  cekNik(userData): Observable<any> {
    return this.api.postData('/cek-nik', userData);
  }

  verifikasi(userData): Observable<any> {
    return this.api.putData('/verify', userData);
  }

  sosmedLogin(data): Observable<any> {
    return this.api.patchData('/verify', data);
  }

}
