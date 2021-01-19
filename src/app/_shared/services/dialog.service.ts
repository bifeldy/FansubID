import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { GlobalService } from './global.service';

import { MaterialDialogInfoComponent } from '../components/material-dialog/material-dialog-info/material-dialog-info.component';
import { MaterialDialogDmakComponent } from '../components/material-dialog/material-dialog-dmak/material-dialog-dmak.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog,
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  openInfoDialog(dataInfo: MatDialogConfig): MatDialogRef<MaterialDialogInfoComponent> {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }
    return this.dialog.open(MaterialDialogInfoComponent, dataInfo);
  }

  openDmakDialog(dataInfo: MatDialogConfig): MatDialogRef<MaterialDialogDmakComponent> {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }
    return this.dialog.open(MaterialDialogDmakComponent, dataInfo);
  }

}
