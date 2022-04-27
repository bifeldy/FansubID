import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogInputDataModel } from '../../../models/Dialog';

import { GlobalService } from '../../../../_shared/services/global.service';

@Component({
  selector: 'app-material-dialog-input',
  templateUrl: './material-dialog-input.component.html',
  styleUrls: ['./material-dialog-input.component.css']
})
export class MaterialDialogInputComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogInputDataModel,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get DATA(): DialogInputDataModel {
    return this.data;
  }

  ngOnInit(): void {
    this.gs.log('[DIALOG_DATA_IN]', this.data);
  }

}
