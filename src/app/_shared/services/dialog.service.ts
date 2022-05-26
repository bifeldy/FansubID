import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

import { MaterialDialogInfoComponent } from '../components/material-dialog/material-dialog-info/material-dialog-info.component';
import { MaterialDialogDmakComponent } from '../components/material-dialog/material-dialog-dmak/material-dialog-dmak.component';
import { MaterialDialogEdictComponent } from '../components/material-dialog/material-dialog-edict/material-dialog-edict.component';
import { MaterialDialogBelajarComponent } from '../components/material-dialog/material-dialog-belajar/material-dialog-belajar.component';
import { MaterialDialogInputComponent } from '../components/material-dialog/material-dialog-input/material-dialog-input.component';

import { JsonResponse, InformationModel } from '../../../models/req-res.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  maxWidth = '80vw';

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      this.maxWidth = (this.gs.gridListBreakpoint == 4) ? '45vw' : ((this.gs.gridListBreakpoint == 3) ? '50vw' : ((this.gs.gridListBreakpoint == 2) ? '60vw' : '80vw'));
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

  async openMaintenanceDialog(): Promise<MatDialogRef<MaterialDialogInfoComponent, any>> {
    const defaultData = {
      id: 'MAINTENANCE',
      data: {
        title: `Informasi Perbaikan Web & Server`,
        htmlMessage: `
          <div class="row align-items-center">
            <div class="col-12 text-center">
              <img class="w-50" src="/assets/img/dialog.png">
            </div>
            <div class="col-12 my-3 text-center">
              Saat Ini Sedang Dalam Tahap Perbaikan. <br />
              Sehingga Semua Pengguna Berada Dalam Mode Menjelajah Saja. <br />
              Tidak Dapat Menambah Atau Mengubah Data Yang Sudah Ada. <br />
              Silahkan Tunggu Hingga Perbaikan Selesai, Terima Kasih.
            </div>
          </div>
        `,
        confirmText: 'Ok, Saya Mengerti!',
        cancelText: null
      },
      disableClose: true,
      maxWidth: this.maxWidth
    };
    try {
      const res: JsonResponse<InformationModel> = await lastValueFrom(this.api.getData(`/information/${defaultData.id}`));
      defaultData.data.title = res.result.title;
      defaultData.data.htmlMessage = res.result.content;
      defaultData.data.confirmText = res.result.confirm;
      defaultData.data.cancelText = res.result.cancel;
      defaultData.disableClose = res.result.close;
    } catch (e) {
      this.gs.log('[DIALOG_SERVICE-MAINTENANCE_DIALOG_ERROR]', e.error);
    }
    return this.openInfoDialog(defaultData);
  }

  async openAturanTatibDialog(registerMode = false): Promise<MatDialogRef<MaterialDialogInfoComponent, any>> {
    const defaultData = {
      id: 'ATURAN-TATA-TERTIB',
      data: {
        title: 'Aturan Dan Tata Tertib Komunitas',
        htmlMessage: 'Gagal Memuat Aturan Dan Tata Tertib Komunitas',
        confirmText: 'Ok, Saya Mengerti!',
        cancelText: null
      },
      disableClose: false,
      maxWidth: this.maxWidth
    };
    try {
      const res: JsonResponse<InformationModel> = await lastValueFrom(this.api.getData(`/information/${defaultData.id}`));
      defaultData.data.title = res.result.title;
      defaultData.data.htmlMessage = res.result.content;
      if (registerMode) {
        defaultData.data.confirmText = res.result.confirm;
        defaultData.data.cancelText = res.result.cancel;
        defaultData.disableClose = res.result.close;
      }
    } catch (e) {
      this.gs.log('[DIALOG_SERVICE-ATURAN_TATA_TERTIB_DIALOG_ERROR]', e.error);
    }
    return this.openInfoDialog(defaultData);
  }

}
