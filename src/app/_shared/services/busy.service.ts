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
    }
  }

  public idle(): void {
    if (this.gs.isBrowser) {
      this.busyRequestCount--;
      if (this.busyRequestCount <= 0) {
        this.busyRequestCount = 0;
        this.spinnerService.hide();
      }
    }
  }

}
