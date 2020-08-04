import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

import User from '../models/User';

import { environment } from '../../../environments/environment';

import { GlobalService } from './global.service';
import { CryptoService } from './crypto.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private gs: GlobalService,
    private crypt: CryptoService,
    private cs: CookieService
  ) {
    let token = null;
    let userSession = null;
    try {
      token = localStorage.getItem(environment.tokenName);
      const userEncrypted = localStorage.getItem(environment.sessionName);
      const userDecrypted = this.crypt.decrypt(userEncrypted, token);
      userSession = JSON.parse(userDecrypted);
    } catch (e) {
      localStorage.removeItem(environment.sessionName);
    }
    this.currentUserSubject = new BehaviorSubject<User>(userSession);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  verify(token: string): any {
    this.gs.log('[AUTH_VERIFY]', token);
    return this.http.post<any>(`${environment.apiUrl}/verify`, { token }).pipe(map(respVerify => {
      this.currentUserSubject.next(respVerify.result);
      const userSession = JSON.stringify(respVerify.result);
      const userEncrypted = this.crypt.encrypt(userSession, token);
      localStorage.setItem(environment.sessionName, userEncrypted);
      return respVerify.result;
    }));
  }

  login(loginData: any): any {
    this.gs.log('[AUTH_LOGIN]', loginData);
    return this.http.post<any>(`${environment.apiUrl}/login`, loginData);
  }

  logout(): any {
    this.currentUserSubject.next(null);
    localStorage.clear();
  }

  register(registerData: any): any {
    this.gs.log('[AUTH_REGISTER]', registerData);
    return this.http.post<any>(`${environment.apiUrl}/register`, registerData).pipe(map(respRegister => {
      localStorage.setItem(environment.tokenName, respRegister.result.token);
    }));
  }

}
