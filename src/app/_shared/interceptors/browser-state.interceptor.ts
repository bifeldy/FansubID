import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';

import { GlobalService } from '../services/global.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrowserStateInterceptor implements HttpInterceptor {

  constructor(
    private transferState: TransferState,
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.gs.log(`[BROWSER_STATE_REQUEST]`, req);
    if (req.method === 'GET') {
      const storedResponse = this.transferState.get(makeStateKey(req.url), null);
      if (storedResponse) {
        this.gs.log(`[BROWSER_STATE_LOAD]`, storedResponse);
        return of(new HttpResponse({ body: storedResponse, status: 200 }));
      }
    }
    return next.handle(req).pipe(tap(event => {
      this.gs.log(`[BROWSER_STATE_PASS]`, event);
    }));
  }

}
