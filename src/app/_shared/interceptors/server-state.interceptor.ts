import { Injectable, NgZone } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import memoryCache from 'memory-cache';

import { GlobalService } from '../services/global.service';

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {

  constructor(
    private transferState: TransferState,
    private ngZone: NgZone,
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    this.gs.log(`[SERVER_STATE_REQUEST]`, req);
    const cachedData = memoryCache.get(req.url);
    if (cachedData) {
      this.gs.log(`[SERVER_STATE_LOAD]`, cachedData);
      this.transferState.set(makeStateKey(req.url), cachedData);
      return of(new HttpResponse({ body: cachedData, status: 200 }));
    }
    return next.handle(req).pipe(tap(event => {
      this.gs.log(`[SERVER_STATE_PASS]`, event);
      if (event instanceof HttpResponse) {
        this.transferState.set(makeStateKey(req.url), event.body);
        this.ngZone.runOutsideAngular(() => {
          memoryCache.put(req.url, event.body, 1000 * 60 * 5, (key, value) => {
            this.gs.log(`[SERVER_STATE_CLEAR] ${key}`, value);
          });
        });
      }}
    ));
  }

}
