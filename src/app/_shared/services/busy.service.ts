import { Injectable } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  private busyRequestCount = 0;

  constructor(
    private spinnerService: NgxSpinnerService
  ) {
  }

  public busy(): void {
    this.busyRequestCount++;
    this.spinnerService.show();
  }

  public idle(): void {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
