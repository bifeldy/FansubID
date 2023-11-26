import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { JsonResponse, UserModel } from '../../../models/req-res.model';

import { GlobalService } from './global.service';
import { ApiService } from './api.service';
import { BusyService } from './busy.service';
import { LocalStorageService } from './local-storage.service';
import { CryptoService } from './crypto.service';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  currentUserSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);
  currentUser: Observable<UserModel> = this.currentUserSubject?.asObservable();

  token = null;

  timeoutNotif = null;
  timeoutToast = null;

  logoutTimerText = '';
  intervalLogout = null;

  constructor(
    private router: Router,
    private gs: GlobalService,
    private bs: BusyService,
    private ls: LocalStorageService,
    private api: ApiService,
    private cs: CryptoService,
    private toast: ToastService
  ) {
    if (this.gs.isBrowser) {
      this.token = this.ls.getItem(this.gs.localStorageKeys.Token);
      this.ls.removeItem(this.gs.localStorageKeys.Token);
    }
  }

  verify(token: any): Observable<JsonResponse<UserModel>> {
    this.gs.log('[AUTH_VERIFY]', token);
    return this.api.patchData(`/verify`, { token }).pipe(
      tap(respVerify => {
        this.currentUserSubject?.next(respVerify.result);
        this.token = respVerify.token;
        if (this.token) {
          const expires = new Date(this.cs.jwtView(this.token).exp * 1000);
          const expireTime = expires.getTime();
          const notifTime = expireTime - 5 * 60 * 1000;
          this.cleanUpTimeoutInterval();
          this.timeoutNotif = setTimeout(() => {
            this.timeoutToast = this.toast.warning(
              `Sesi Akun Akan Habis!`,
              `Silahkan Logout & Login Ulang ...`,
              {
                closeButton: false,
                timeOut: expireTime - Date.now(),
                disableTimeOut: 'extendedTimeOut',
                tapToDismiss: false,
                progressAnimation: 'decreasing'
              },
              true
            );
          }, notifTime - Date.now());
          this.intervalLogout = setInterval(() => {
            const distance = expireTime - Date.now();
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this.logoutTimerText = `(${days}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')})`;
            if (distance < 0) {
              clearInterval(this.intervalLogout);
              this.intervalLogout = null;
              this.logoutTimerText = '';
            }
          }, 1000);
        }
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
    this.currentUserSubject?.next(null);
    this.token = null;
    this.cleanUpTimeoutInterval();
  }

  logout(url = '/', extras = null): void {
    this.gs.log('[AUTH_LOGOUT]', this.token);
    this.bs.busy();
    this.api.deleteData(`/logout`).subscribe({
      next: (res: any) => {
        this.gs.log('[LOGOUT_SUCCESS]', res);
        this.bs.idle();
        this.removeUser();
        this.ls.clear();
        this.router.navigate([url], extras);
      },
      error: err => {
        this.gs.log('[LOGOUT_ERROR]', err, 'error');
        this.cleanUpTimeoutInterval();
        this.bs.idle();
      }
    });
  }

  cleanUpTimeoutInterval(): void {
    if (this.timeoutNotif) {
      clearTimeout(this.timeoutNotif);
      this.timeoutNotif = null;
    }
    if (this.timeoutToast) {
      this.toast.remove(this.timeoutToast.toastId);
      this.timeoutToast = null;
    }
    if (this.intervalLogout) {
      clearInterval(this.intervalLogout);
      this.intervalLogout = null;
      this.logoutTimerText = '';
    }
  }

}
