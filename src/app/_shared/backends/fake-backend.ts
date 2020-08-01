import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(() => {
      switch (true) {
        default:
          return next.handle(request);
      }
    })).pipe(materialize()).pipe(delay(500)).pipe(dematerialize());
  }
}

export let FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
