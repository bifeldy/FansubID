import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { GlobalService } from '../services/global.service';
import { StatsServerService } from '../services/stats-server.service';
import { AuthService } from '../services/auth.service';

import { environment } from '../../../environments/app/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private gs: GlobalService,
    private ss: StatsServerService,
    private as: AuthService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.gs.isBrowser && request.url.startsWith(environment.apiUrl)) {
      request = request.clone({
        withCredentials: !this.gs.isDevMode
      });
      if (this.as.jwtToken) {
        const tokenLength = this.as.jwtToken.length;
        const shortToken = this.as.jwtToken.slice(0, 5) + '.....' + this.as.jwtToken.slice(tokenLength - 5, tokenLength);
        this.gs.log('[INTERCEPT_JWT]', shortToken);
        request = request.clone({
          headers: request.headers.append('Authorization', `Bearer ${this.as.jwtToken}`)
        });
      }
      if (this.ss.mySocket?.id) {
        this.gs.log('[INTERCEPT_SOCKET]', this.ss.mySocket.id);
        request = request.clone({
          headers: request.headers.append('x-socket-io-id', this.ss.mySocket.id)
        });
      }
    }
    return next.handle(request);
  }

}
