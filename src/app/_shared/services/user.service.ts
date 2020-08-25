import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService
  ) {
  }

  getAllUser(): any {
    return this.api.getData('/user');
  }

  getUserData(username): any {
    return this.api.getData(`/user/${username}`);
  }

  updateUser(username, encryptedUserData): any {
    return this.api.putData(`/user/${username}`, encryptedUserData, true);
  }

  getUserBerkas(username, q = null, page = 1, row = 10): any {
    return this.api.getData(`/user/${username}/berkas?q=${q}&page=${page}&row=${row}`);
  }

  cekNik(encryptedUserData): any {
    return this.api.postData('/cek-nik', encryptedUserData);
  }

  verifikasi(encryptedUserData): any {
    return this.api.putData('/verify', encryptedUserData);
  }

}
