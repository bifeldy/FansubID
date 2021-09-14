import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { GlobalService } from './global.service';

import { MaterialDialogInfoComponent } from '../components/material-dialog/material-dialog-info/material-dialog-info.component';
import { MaterialDialogDmakComponent } from '../components/material-dialog/material-dialog-dmak/material-dialog-dmak.component';
import { MaterialDialogEdictComponent } from '../components/material-dialog/material-dialog-edict/material-dialog-edict.component';
import { MaterialDialogBelajarComponent } from '../components/material-dialog/material-dialog-belajar/material-dialog-belajar.component';
import { MaterialDialogBanComponent } from '../components/material-dialog/material-dialog-ban/material-dialog-ban.component';

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

  openBanDialog(dataInfo: MatDialogConfig): MatDialogRef<MaterialDialogBanComponent> {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }
    return this.dialog.open(MaterialDialogBanComponent, dataInfo);
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

  openEdictDialog(dataInfo: MatDialogConfig): MatDialogRef<MaterialDialogEdictComponent> {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }
    return this.dialog.open(MaterialDialogEdictComponent, dataInfo);
  }

  openBelajarDialog(dataInfo: MatDialogConfig): MatDialogRef<MaterialDialogBelajarComponent> {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }
    return this.dialog.open(MaterialDialogBelajarComponent, dataInfo);
  }

}
