import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../services/global.service';
import { BusyService } from '../services/busy.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  currentUser = null;

  constructor(
    private gs: GlobalService,
    private as: AuthService,
    private busyService: BusyService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.as.currentUser.subscribe(user => this.currentUser = user);
    const userToken = localStorage.getItem(environment.tokenName);
    this.busyService.busy();
    if (this.currentUser && userToken && request.url.startsWith(environment.apiUrl)) {
      this.gs.log('[INTERCEPT_REQUEST]', userToken.slice(0, 5) + '*****' + userToken.slice(userToken.length - 5, userToken.length));
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`
        }
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    } else {
      if (request.headers.get('Content-Type') === 'multipart/form-data') {
        request = request.clone({
          headers: request.headers.delete('Content-Type', 'multipart/form-data')
        });
      }
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return next.handle(request).pipe(
      finalize(() => {
        this.busyService.idle();
      })
    );
  }
}
