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

  getUserData(userAddress): any {
    return this.api.getData(`/user/${userAddress}`);
  }

  cekNik(data): any {
    return this.api.postData('/kpu/cek-nik', data);
  }

  cekAccount(data): any {
    return this.api.postData('/check-account', data);
  }

  registerAccount(data): any {
    return this.api.postData('/register', data);
  }
}
