import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { StatsServerService } from '../services/stats-server.service';

import { environment } from '../../../environments/client/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  currentUser = null;

  constructor(
    private gs: GlobalService,
    private as: AuthService,
    private ss: StatsServerService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.gs.isBrowser && request.url.startsWith(environment.apiUrl)) {
      this.as.currentUser.subscribe(user => this.currentUser = user);
      const userToken = localStorage.getItem(environment.tokenName);
      if (this.currentUser && userToken) {
        this.gs.log('[INTERCEPT_REQUEST] Authorization');
        request = request.clone({
          headers: request.headers.append('Authorization', `Bearer ${userToken}`)
        });
      }
      if (this.ss.mySocket && this.ss.mySocket.id) {
        this.gs.log('[INTERCEPT_REQUEST] Socket');
        request = request.clone({
          headers: request.headers.append('Socket', this.ss.mySocket.id)
        });
      }
    }
    return next.handle(request);
  }

}
