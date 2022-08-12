import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  private cancelPendingRequests$ = new Subject<void>()

  busyRequestCount = 0;

  constructor(
    private spinnerService: NgxSpinnerService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get onCancelPendingRequests(): Observable<void> {
    return this.cancelPendingRequests$.asObservable()
  }

  busy(): void {
    if (this.gs.isBrowser) {
      this.busyRequestCount++;
      this.spinnerService.show();
      this.gs.log('[BUSY_STATE_COUNTER]', this.busyRequestCount);
    }
  }

  idle(): void {
    if (this.gs.isBrowser) {
      this.busyRequestCount--;
      if (this.busyRequestCount <= 0) {
        this.busyRequestCount = 0;
        this.spinnerService.hide();
      }
      this.gs.log('[BUSY_STATE_COUNTER]', this.busyRequestCount);
    }
  }

  clear(): void {
    if (this.gs.isBrowser) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
      this.gs.log('[BUSY_STATE_COUNTER]', this.busyRequestCount);
      this.cancelPendingRequests$.next();
    }
  }

}
