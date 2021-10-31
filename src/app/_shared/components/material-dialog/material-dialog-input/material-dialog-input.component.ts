import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalService } from '../../../../_shared/services/global.service';

import { DialogInputData } from '../../../models/Dialog';

@Component({
  selector: 'app-material-dialog-input',
  templateUrl: './material-dialog-input.component.html',
  styleUrls: ['./material-dialog-input.component.css']
})
export class MaterialDialogInputComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogInputData,
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
