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

  cekNik(data): any {
    return this.api.postData('/cek-nik', data);
  }

  registerAccount(data): any {
    return this.api.postData('/register', data);
  }
}
