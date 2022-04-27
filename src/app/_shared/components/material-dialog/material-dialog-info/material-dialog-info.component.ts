import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogInfoDataModel } from '../../../models/Dialog';

import { GlobalService } from '../../../../_shared/services/global.service';

@Component({
  selector: 'app-material-dialog-info',
  templateUrl: './material-dialog-info.component.html',
  styleUrls: ['./material-dialog-info.component.css']
})
export class MaterialDialogInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogInfoDataModel,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get DATA(): DialogInfoDataModel {
    return this.data;
  }

  ngOnInit(): void {
    this.gs.log('[DIALOG_DATA_IN]', this.data);
  }

}
