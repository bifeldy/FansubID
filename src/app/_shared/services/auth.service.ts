import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/User';

import { GlobalService } from './global.service';
import { ApiService } from './api.service';
import { BusyService } from './busy.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  public jwtToken = null;

  constructor(
    private router: Router,
    public gs: GlobalService,
    private bs: BusyService,
    private ls: LocalStorageService,
    private api: ApiService
  ) {
    if (this.gs.isBrowser) {
      this.currentUserSubject = new BehaviorSubject<User>(null);
      this.currentUser = this.currentUserSubject.asObservable();
      this.jwtToken = this.ls.getItem(this.gs.localStorageTokenKeyName);
      this.ls.removeItem(this.gs.localStorageTokenKeyName);
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject?.value || null;
  }

  verify(token: any): Observable<any> {
    this.gs.log('[AUTH_VERIFY]', token);
    return this.api.patchData(`/verify`, { token }).pipe(map(respVerify => {
      this.currentUserSubject.next(respVerify.result);
      this.jwtToken = respVerify.jwtToken;
      return respVerify;
    }));
  }

  login(loginData: any): Observable<any> {
    this.gs.log('[AUTH_LOGIN]', loginData);
    return this.api.postData(`/login`, loginData).pipe(map(respLogin => {
      this.jwtToken = respLogin.result.jwtToken;
      return respLogin;
    }));
  }

  register(registerData: any): Observable<any> {
    this.gs.log('[AUTH_REGISTER]', registerData);
    return this.api.postData(`/register`, registerData).pipe(map(respRegister => {
      return respRegister;
    }));
  }

  removeUser(): void {
    this.currentUserSubject.next(null);
    this.jwtToken = null;
  }

  logout(): void {
    this.gs.log('[AUTH_LOGOUT]', this.jwtToken);
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
        this.gs.log('[LOGOUT_ERROR]', err);
        this.bs.idle();
      }
    });
  }

}
