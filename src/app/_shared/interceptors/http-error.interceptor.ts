import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { GlobalService } from '../services/global.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private gs: GlobalService,
    private router: Router,
    private as: AuthService,
    private toast: ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(e => {
      this.gs.log(`[INTERCEPT_ERROR-${e.status}]`, e.statusText);
      let errorMessage = null;
      if (e) {
        if (e.error) {
          if (e.error.result) {
            if (e.error.result.message) {
              errorMessage = e.error.result.message;
            } else {
              errorMessage = e.error.result;
            }
          } else {
            errorMessage = e.error;
          }
        } else {
          errorMessage = e;
        }
      } else {
        errorMessage = 'Terjadi Kesalahan';
      }
      let errorTitle = null;
      if (e) {
        if (e.error) {
          if (e.error.info) {
            errorTitle = e.error.info;
          } else {
            errorTitle = e.error;
          }
        } else {
          errorTitle = e;
        }
      } else {
        errorMessage = 'Whoops! Error~';
      }
      this.toast.warning(errorMessage, errorTitle);
      if (e.status === 401) {
        this.as.logout();
        this.router.navigate(['/login'], { queryParams: { err: true } });
        window.location.reload();
      }
      return throwError(e);
    }));
  }
}
