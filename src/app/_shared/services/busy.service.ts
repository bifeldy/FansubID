import { Injectable } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyRequestCount = 0;

  constructor(
    private spinnerService: NgxSpinnerService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  public busy(): void {
    if (this.gs.isBrowser) {
      this.busyRequestCount++;
      this.spinnerService.show();
      this.gs.log('[BUSY_STATE_COUNTER]', this.busyRequestCount);
    }
  }

  public idle(): void {
    if (this.gs.isBrowser) {
      this.busyRequestCount--;
      if (this.busyRequestCount <= 0) {
        this.busyRequestCount = 0;
        this.spinnerService.hide();
      }
      this.gs.log('[BUSY_STATE_COUNTER]', this.busyRequestCount);
    }
  }

  public clear(): void {
    if (this.gs.isBrowser) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
      this.gs.log('[BUSY_STATE_COUNTER]', this.busyRequestCount);
    }
  }

}
