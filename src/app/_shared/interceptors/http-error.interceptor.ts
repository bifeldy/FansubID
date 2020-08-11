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
      this.toast.warning(e.error.result.message || 'Error', e.error.info || 'Whoops!');
      if (e.status === 401) {
        this.as.logout();
        this.router.navigate(['/login'], { queryParams: { err: true } });
        window.location.reload();
      }
      return throwError(e);
    }));
  }
}
