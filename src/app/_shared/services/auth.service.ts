import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { JsonResponse, UserModel } from '../../../models/req-res.model';

import { GlobalService } from './global.service';
import { ApiService } from './api.service';
import { BusyService } from './busy.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  currentUserSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  currentUser: Observable<UserModel> = this.currentUserSubject.asObservable();

  token = null;

  constructor(
    private router: Router,
    private gs: GlobalService,
    private bs: BusyService,
    private ls: LocalStorageService,
    private api: ApiService
  ) {
    if (this.gs.isBrowser) {
      this.token = this.ls.getItem(this.gs.localStorageKeys.token);
      this.ls.removeItem(this.gs.localStorageKeys.token);
    }
  }

  verify(token: any): Observable<JsonResponse<UserModel>> {
    this.gs.log('[AUTH_VERIFY]', token);
    return this.api.patchData(`/verify`, { token }).pipe(
      tap(respVerify => {
        this.currentUserSubject.next(respVerify.result);
        this.token = respVerify.token;
      })
    );
  }

  resendActivation(id: any): Observable<JsonResponse> {
    this.gs.log('[AUTH_ACTIVATION]', id);
    return this.api.postData(`/aktivasi`, { id });
  }

  login(loginData: any): Observable<JsonResponse> {
    this.gs.log('[AUTH_LOGIN]', loginData);
    return this.api.postData(`/login`, loginData).pipe(
      tap(respLogin => {
        this.token = respLogin.result.token;
      })
    );
  }

  register(registerData: any): Observable<JsonResponse> {
    this.gs.log('[AUTH_REGISTER]', registerData);
    return this.api.postData(`/register`, registerData);
  }

  removeUser(): void {
    this.currentUserSubject.next(null);
    this.token = null;
  }

  logout(): void {
    this.gs.log('[AUTH_LOGOUT]', this.token);
    this.bs.busy();
    this.api.deleteData(`/logout`).subscribe({
      next: (res: any) => {
        this.gs.log('[LOGOUT_SUCCESS]', res);
        this.bs.idle();
        this.removeUser();
        this.ls.clear();
        this.router.navigateByUrl('/');
      },
      error: err => {
        this.gs.log('[LOGOUT_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

}
