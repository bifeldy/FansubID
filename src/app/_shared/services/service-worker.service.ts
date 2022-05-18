import { Injectable } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

import { GlobalService } from './global.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {

  isUpdateAvailable = false;

  swuVerUpd = null;
  swuUnRecv = null;

  dialogRef = null;
  subsDialog = null;

  constructor(
    private su: SwUpdate,
    private sp: SwPush,
    private gs: GlobalService,
    private ds: DialogService
  ) {
    if (this.gs.isBrowser) {
      this.initialize();
    }
  }

  get swEnabled(): boolean {
    return this.su.isEnabled && this.sp.isEnabled;
  }

  async checkForUpdate(): Promise<boolean> {
    if (!this.isUpdateAvailable) {
      this.isUpdateAvailable = true;
      try {
        this.isUpdateAvailable = await this.su.checkForUpdate();
      } catch (e) {
        this.gs.log('[SERVICE_WORKER_CHECK_FOR_UPDATE_ERROR]', e);
      }
    }
    this.gs.log('[SERVICE_WORKER_UPDATE_AVAILABLE]', this.isUpdateAvailable);
    return this.isUpdateAvailable;
  }

  async activateUpdate(): Promise<boolean> {
    let au = false;
    if (this.isUpdateAvailable) {
      try {
        au = await this.su.activateUpdate();
        this.isUpdateAvailable = false;
        this.dialogRef?.close(null);
        this.subsDialog?.unsubscribe();
        this.dialogRef = this.ds.openInfoDialog({
          data: {
            title: `Pembaharuan ${au ? 'Berhasil' : 'Gagal'}`,
            htmlMessage: `Ingin Refresh Halaman (?)`,
            confirmText: 'Ya',
            cancelText: 'Tidak'
          },
          disableClose: true
        });
        this.subsDialog = this.dialogRef?.afterClosed().subscribe({
          next: re => {
            this.gs.log('[INFO_DIALOG_CLOSED]', re);
            this.dialogRef = null;
            this.subsDialog.unsubscribe();
            if (re === true) {
              window.location.reload();
            }
          }
        });
      } catch (e) {
        this.gs.log('[SERVICE_WORKER_ACTIVATE_UPDATE_ERROR]', e);
      }
    }
    this.gs.log('[SERVICE_WORKER_UPDATE_FINISH]', au);
    return au;
  }

  async initialize() {
    this.swuVerUpd = this.su.versionUpdates.subscribe({
      next: async (event) => {
        this.gs.log(`[SERVICE_WORKER_${event.type}]`, event);
        if (event.type === 'VERSION_DETECTED') {
          this.dialogRef?.close(null);
          this.subsDialog?.unsubscribe();
        }
        if (event.type === 'VERSION_READY') {
          this.dialogRef = this.ds.openInfoDialog({
            data: {
              title: 'Ada Pembaharuan Tersedia',
              htmlMessage: `
                <div>Versi Sekarang :: ${event.currentVersion.hash}</div>
                <div>Versi Tersedia :: ${event.latestVersion.hash}</div>
              `,
              confirmText: 'OK'
            },
            disableClose: true
          });
        }
        if (event.type === 'VERSION_INSTALLATION_FAILED') {
          this.dialogRef = this.ds.openInfoDialog({
            data: {
              title: 'Pembaharuan Gagal',
              htmlMessage: `
                <div>Versi :: ${event.version.hash}</div>
                <div>Error :: ${event.error}</div>
              `,
              confirmText: 'Ulangi',
              cancelText: 'Lewati'
            },
            disableClose: true
          });
        }
        this.subsDialog = this.dialogRef?.afterClosed().subscribe({
          next: re => {
            this.gs.log('[INFO_DIALOG_CLOSED]', re);
            if (re === true) {
              this.activateUpdate();
            }
            this.dialogRef = null;
            this.subsDialog.unsubscribe();
          }
        });
      }
    });
    this.swuUnRecv = this.su.unrecoverable.subscribe({
      next: (event) => {
        this.gs.log(`[SERVICE_WORKER_${event.type}]`, event.reason);
        this.dialogRef?.close(null);
        this.subsDialog?.unsubscribe();
        this.dialogRef = this.ds.openInfoDialog({
          data: {
            title: 'Service Worker Bermasalah',
            htmlMessage: `Kesalahan :: ${event.reason}`,
            confirmText: 'Refresh Halaman'
          },
          disableClose: true
        });
        this.subsDialog = this.dialogRef?.afterClosed().subscribe({
          next: re => {
            this.gs.log('[INFO_DIALOG_CLOSED]', re);
            this.dialogRef = null;
            this.subsDialog.unsubscribe();
            window.location.reload();
          }
        });
      }
    });
  }

}
