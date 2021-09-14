import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalService } from '../../../../_shared/services/global.service';

import { DialogBanData } from '../../../models/Dialog';

@Component({
  selector: 'app-material-dialog-ban',
  templateUrl: './material-dialog-ban.component.html',
  styleUrls: ['./material-dialog-ban.component.css']
})
export class MaterialDialogBanComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogBanData,
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    this.gs.log('[DIALOG_DATA_IN]', this.data);
  }

}
