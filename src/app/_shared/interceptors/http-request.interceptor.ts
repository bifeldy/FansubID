import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { GlobalService } from '../services/global.service';
import { StatsServerService } from '../services/stats-server.service';

import { environment } from '../../../environments/client/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private gs: GlobalService,
    private ss: StatsServerService,
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.gs.isBrowser && request.url.startsWith(environment.apiUrl)) {
      request = request.clone({ withCredentials: true });
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
