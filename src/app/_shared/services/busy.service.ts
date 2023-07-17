import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  private cancelPendingRequests$ = new Subject<void>();

  busyRequestCount = 0;

  timedOut = null;

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
      if (this.busyRequestCount <= 0) {
        this.spinnerService.show();
      }
      this.busyRequestCount++;
      this.gs.log('[BUSY_STATE_COUNTER_BUSY]', this.busyRequestCount);
      if (this.timedOut) {
        clearTimeout(this.timedOut);
      }
      this.timedOut = setTimeout(() => {
        this.clear();
        this.timedOut = null;
      }, 60 * 1000);
    }
  }

  idle(): void {
    if (this.gs.isBrowser) {
      this.busyRequestCount--;
      if (this.busyRequestCount <= 0) {
        this.busyRequestCount = 0;
        this.spinnerService.hide();
      }
      this.gs.log('[BUSY_STATE_COUNTER_IDLE]', this.busyRequestCount);
    }
  }

  clear(): void {
    if (this.gs.isBrowser) {
      while (this.busyRequestCount > 0) {
        this.idle();
        this.cancelPendingRequests$.next();
      }
    }
  }

}
