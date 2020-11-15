import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { GlobalService } from '../services/global.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  currentUser = null;

  constructor(
    private gs: GlobalService,
    private as: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.gs.isBrowser) {
      this.as.currentUser.subscribe(user => this.currentUser = user);
      const userToken = localStorage.getItem(environment.tokenName);
      if (this.currentUser && userToken && request.url.startsWith(environment.apiUrl)) {
        this.gs.log('[INTERCEPT_REQUEST]', userToken.slice(0, 5) + '..........' + userToken.slice(userToken.length - 5, userToken.length));
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${userToken}`
          }
        });
      }
    }
    return next.handle(request);
  }

}
