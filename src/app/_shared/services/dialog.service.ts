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

  openMaintenanceDialog(): MatDialogRef<MaterialDialogInfoComponent> {
    return this.openInfoDialog({
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
      maxWidth: (this.gs.gridListBreakpoint == 3) ? '40vw' : ((this.gs.gridListBreakpoint == 2) ? '60vw' : '80vw')
    });
  }

  openAturanTatibDialog(confirmText = 'OK', cancelText = null): MatDialogRef<MaterialDialogInfoComponent> {
    return this.openInfoDialog({
      data: {
        title: `Aturan Dan Tata Tertib Komunitas`,
        htmlMessage: `
          <div class="row align-items-center">
            <div class="col-12 text-center">
              <img class="w-50" src="/assets/img/dialog.png">
            </div>
            <div class="col-12 my-3">
              <h3 class="text-success mb-0">KEWAJIBAN</h3>
              <ol class="list-group list-group-numbered">
                <li>Dilarang berkata yang senonoh, jika terpaksa setidaknya mohon diplesetkan.</li>
                <li>Jangan menyinggung hal-hal berbau <b>SARA</b>, <b>RASIS</b>, dan hal-hal serupa lainnya.</li>
                <li>Jagalah ketertiban dan kerukunan antar pengguna.</li>
                <li>Dilarang melakukan <i>SPAM</i> / menyampah.</li>
                <li>Unggah berkas yang berbau <b>NSFW</b> harap mengaktifkan fitur <i>private</i>.</li>
              </ol>
              <br />
              <h3 class="text-success mb-0">NORMA UMUM</h3>
              <ul class="list-group list-group-numbered">
                <li>Kami beranggapan bahwa anda sudah cukup umur (13+).</li>
                <li>Silahkan beradaptasi secara mandiri.</li>
                <li>Untuk pembuatan entri data baru silahkan menyesuaikan.</li>
                <li>Mohon Kerjasamanya.</li>
                <li>Terima kasih dan semoga harimu menyenangkan!</li>
              </ul>
              <br />
              <h3 class="text-success mb-0">AKIBAT</h3>
              <ul class="list-group list-group-numbered">
                <li>Mengingkari kewajiban = <i>Manual BAN</i> dengan peringatan berupa teguran.</li>
                <li>Mendapat banyak <i>Report</i> = <i>Auto BAN</i>.</li>
              </ul>
            </div>
          </div>
        `,
        confirmText,
        cancelText
      },
      disableClose: false,
      maxWidth: (this.gs.gridListBreakpoint == 3) ? '40vw' : ((this.gs.gridListBreakpoint == 2) ? '60vw' : '80vw')
    });
  }

}
