import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable, lastValueFrom } from 'rxjs';

import { JsonResponse, InformationModel } from '../../../models/req-res.model';

import { MaterialDialogInfoComponent } from '../components/material-dialog/material-dialog-info/material-dialog-info.component';
import { MaterialDialogDmakComponent } from '../components/material-dialog/material-dialog-dmak/material-dialog-dmak.component';
import { MaterialDialogEdictComponent } from '../components/material-dialog/material-dialog-edict/material-dialog-edict.component';
import { MaterialDialogBelajarComponent } from '../components/material-dialog/material-dialog-belajar/material-dialog-belajar.component';
import { MaterialDialogInputComponent } from '../components/material-dialog/material-dialog-input/material-dialog-input.component';

import { GlobalService } from './global.service';
import { InformationService } from './information.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  maxWidth = '80vw';

  constructor(
    private dialog: MatDialog,
    private gs: GlobalService,
    private info: InformationService
  ) {
    if (this.gs.isBrowser) {
      this.maxWidth = (this.gs.gridListBreakpoint === 4) ? '45vw' : ((this.gs.gridListBreakpoint === 3) ? '50vw' : ((this.gs.gridListBreakpoint === 2) ? '60vw' : '80vw'));
    }
  }

  openInputDialog(dataInfo: MatDialogConfig): MatDialogRef<MaterialDialogInputComponent> {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }
    return this.dialog.open(MaterialDialogInputComponent, dataInfo);
  }

  openInfoDialog(dataInfo: MatDialogConfig): MatDialogRef<MaterialDialogInfoComponent> {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }
    if (!('maxWidth' in dataInfo)) {
      dataInfo.maxWidth = this.maxWidth;
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

  /** */

  async leavePageDialog(): Promise<Observable<any>> {
    return (await this.openKonfirmasiDialog(
      'Batal & Keluar',
      'Apakah Yakin Meninggalkan Halaman Ini ?'
    )).afterClosed()
  }

  async openKonfirmasiDialog(title: string, htmlMessage: string, disableClose = true): Promise<MatDialogRef<MaterialDialogInfoComponent, any>> {
    const defaultData = {
      data: {
        title,
        htmlMessage,
        confirmText: 'Ya',
        cancelText: 'Tidak'
      },
      disableClose,
      maxWidth: this.maxWidth
    };
    return this.openInfoDialog(defaultData);
  }

  async fetchInformationRegisterMode(defaultData: any, registerMode = false): Promise<MatDialogRef<MaterialDialogInfoComponent, any>> {
    try {
      const res: JsonResponse<InformationModel> = await lastValueFrom(this.info.getInfo(defaultData.id));
      defaultData.data.title = res.result.title;
      defaultData.data.htmlMessage = res.result.content;
      defaultData.disableClose = res.result.close;
      if (registerMode) {
        defaultData.data.confirmText = res.result.confirm;
        defaultData.data.cancelText = res.result.cancel;
        defaultData.disableClose = true;
      }
    } catch (e) {
      this.gs.log('[DIALOG_SERVICE-FETCH_DIALOG_ERROR]', e.error, 'error');
    }
    return this.openInfoDialog(defaultData);
  }

  async fetchInformation(defaultData: any): Promise<void> {
    try {
      const res: JsonResponse<InformationModel> = await lastValueFrom(this.info.getInfo(defaultData.id));
      defaultData.data.title = res.result.title;
      defaultData.data.htmlMessage = res.result.content;
      defaultData.data.confirmText = res.result.confirm;
      defaultData.data.cancelText = res.result.cancel;
      defaultData.disableClose = res.result.close;
    } catch (e) {
      this.gs.log('[DIALOG_SERVICE-FETCH_DIALOG_ERROR]', e.error, 'error');
    }
  }

  async openMaintenanceDialog(): Promise<MatDialogRef<MaterialDialogInfoComponent, any>> {
    const defaultData = {
      id: 'MAINTENANCE',
      data: {
        title: `Informasi Perbaikan Web & Server`,
        htmlMessage: 'Gagal Memuat Perbaikan Web & Server',
        confirmText: 'Ok, Saya Mengerti!',
        cancelText: null
      },
      disableClose: false,
      maxWidth: this.maxWidth
    };
    await this.fetchInformation(defaultData);
    return this.openInfoDialog(defaultData);
  }

  async openCorsExtension(): Promise<MatDialogRef<MaterialDialogInfoComponent, any>> {
    const defaultData = {
      id: 'CORS-EXTENSION',
      data: {
        title: 'Ekstensi CORS Unblock',
        htmlMessage: 'Gagal Memuat Metode Verifikasi',
        confirmText: 'Ya',
        cancelText: 'Tidak'
      },
      disableClose: false,
      maxWidth: this.maxWidth
    };
    await this.fetchInformation(defaultData);
    return this.openInfoDialog(defaultData);
  }

  async openDonation(): Promise<MatDialogRef<MaterialDialogInfoComponent, any>> {
    const defaultData = {
      id: 'DONASI',
      data: {
        title: 'Donasi Perawatan Server',
        htmlMessage: 'Gagal Memuat Rincian Donasi',
        confirmText: 'Tutup',
        cancelText: null
      },
      disableClose: false,
      maxWidth: this.maxWidth
    };
    await this.fetchInformation(defaultData);
    return this.openInfoDialog(defaultData);
  }

}
