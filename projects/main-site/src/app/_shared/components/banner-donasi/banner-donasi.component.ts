import { Component, OnDestroy, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-banner-donasi',
  templateUrl: './banner-donasi.component.html',
  styleUrls: ['./banner-donasi.component.css']
})
export class BannerDonasiComponent implements OnInit, OnDestroy {

  subsDialog = null;

  constructor(
    private gs: GlobalService,
    private ds: DialogService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnDestroy(): void {
    this.subsDialog?.unsubscribe();
  }

  async showDonateBox(): Promise<void> {
    this.subsDialog = (await this.ds.openDonation()).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        this.subsDialog.unsubscribe();
      }
    });
  }

}
