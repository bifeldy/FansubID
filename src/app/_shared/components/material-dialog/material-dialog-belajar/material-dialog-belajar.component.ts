import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GlobalService } from '../../../../_shared/services/global.service';

import { DialogInfoData } from '../../../models/Dialog';

@Component({
  selector: 'app-material-dialog-belajar',
  templateUrl: './material-dialog-belajar.component.html',
  styleUrls: ['./material-dialog-belajar.component.css']
})
export class MaterialDialogBelajarComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MaterialDialogBelajarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInfoData,
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    this.gs.log('[DIALOG_DATA_IN]', this.data);
  }

  saveData(): void {
    // TODO :: POST PUT API BELAJAR
    this.gs.log('[DIALOG_DATA_OUT]', this.data);
    this.dialogRef.close(this.data);
  }

}
