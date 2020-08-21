import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
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
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((res) => {
        if (res instanceof HttpResponse && this.gs.isBrowser) {
          if ((res as any).status === 200) {
            let successTitle = null;
            if (res) {
              if ((res as any).body) {
                if ((res as any).body.info) {
                  successTitle = (res as any).body.info;
                }
              }
            }
            let successMessage = null;
            if (res) {
              if ((res as any).body) {
                if ((res as any).body.result) {
                  if ((res as any).body.result.message) {
                    successMessage = (res as any).body.result.message;
                  }
                }
              }
            }
            this.toast.success(successMessage, successTitle);
          }
        }
      }),
      catchError(e => {
        this.gs.log(`[INTERCEPT_ERROR-${e.status}]`, e.statusText);
        let errorMessage = null;
        if (e) {
          if (e.error) {
            if (e.error.result) {
              if (e.error.result.message) {
                errorMessage = e.error.result.message;
              }
            }
          }
        }
        if (!errorMessage) {
          errorMessage = 'Terjadi Kesalahan Pada Jaringan~';
        }
        let errorTitle = null;
        if (e) {
          if (e.error) {
            if (e.error.info) {
              errorTitle = e.error.info;
            }
          }
        }
        if (!errorTitle) {
          errorTitle = 'Whoops, Error!';
        }
        this.toast.error(errorMessage, errorTitle);
        if (e.status === 401) {
          this.as.removeUser();
          this.router.navigate(['/login'], { queryParams: { err: true } });
        }
        return throwError(e);
      }
    ));
  }

}
