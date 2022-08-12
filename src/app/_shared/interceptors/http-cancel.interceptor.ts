import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable, takeUntil } from 'rxjs';

import { GlobalService } from '../services/global.service';
import { BusyService } from '../services/busy.service';

@Injectable()
export class HttpCancelInterceptor implements HttpInterceptor {

  constructor(
    private gs: GlobalService,
    private bs: BusyService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      takeUntil(this.bs.onCancelPendingRequests)
    );
  }

}
