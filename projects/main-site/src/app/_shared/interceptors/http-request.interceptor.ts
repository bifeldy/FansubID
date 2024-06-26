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
    const urlTarget = request.url;
    const intercept = urlTarget.startsWith(environment.baseUrl) || urlTarget.startsWith(environment.apiUrl);
    if (this.gs.isBrowser && intercept) {
      request = request.clone({
        withCredentials: !this.gs.isDevMode
      });
      if (this.as.token) {
        const tokenLength = this.as.token.length;
        const shortToken = this.as.token.slice(0, 5) + '.....' + this.as.token.slice(tokenLength - 5, tokenLength);
        this.gs.log('[INTERCEPT_JWT]', shortToken);
        request = request.clone({
          headers: request.headers.append('Authorization', `Bearer ${this.as.token}`)
        });
      }
      if (this.ss.mySocket?.id) {
        this.gs.log('[INTERCEPT_SOCKET]', this.ss.mySocket.id);
        request = request.clone({
          headers: request.headers.append('x-socket-id', this.ss.mySocket.id)
        });
      }
    }
    return next.handle(request);
  }

}
