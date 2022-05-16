import { Injectable } from '@angular/core';

import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

import { GlobalService } from './global.service';
import { DdlLampiranService } from './ddl-lampiran.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadManagerService {

  private attachmentsDownload = {};

  constructor(
    private gs: GlobalService,
    private toast: ToastrService,
    private dls: DdlLampiranService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAttachmentDownloadFile(attachment): any {
    if (!this.attachmentsDownload[attachment.id]) {
      this.attachmentsDownload[attachment.id] = {};
      this.attachmentsDownload[attachment.id].name = attachment.name;
      this.attachmentsDownload[attachment.id].size = attachment.size;
      this.attachmentsDownload[attachment.id].ext = attachment.ext;
      this.attachmentsDownload[attachment.id].download_count = attachment.download_count;
      this.attachmentsDownload[attachment.id].loaded = 0;
      this.attachmentsDownload[attachment.id].total = 0;
      this.attachmentsDownload[attachment.id].percentage = 0;
      this.attachmentsDownload[attachment.id].mode = 'indeterminate';
      this.attachmentsDownload[attachment.id].isDownloading = false;
      this.attachmentsDownload[attachment.id].isCompleted = false;
      this.attachmentsDownload[attachment.id].data = null;
      this.attachmentsDownload[attachment.id].handler = null;
      this.attachmentsDownload[attachment.id].speed = 0;
      this.attachmentsDownload[attachment.id].previousLoaded = 0;
      this.attachmentsDownload[attachment.id].toast = null;
    }
    return this.attachmentsDownload[attachment.id];
  }

  startDownload(attachmentId): void {
    const attachment = this.attachmentsDownload[attachmentId];
    attachment.toast = this.toast.warning(
      `${attachment.percentage}% @ ${attachment.speed} KB/s`,
      `Mengunduh ...`,
      {
        closeButton: false,
        timeOut: 0,
        disableTimeOut: 'extendedTimeOut',
        tapToDismiss: false
      }
    );
    if (!attachment.isCompleted) {
      attachment.isDownloading = true;
      attachment.handler = this.dls.downloadLampiran(attachmentId).subscribe({
        next: event => {
          this.gs.log('[DOWNLOAD_EVENTS]', event);
          if ((event as any).loaded) {
            const e = (event as any);
            this.gs.log('[DOWNLOAD_PROGRESS]', e);
            attachment.mode = 'determinate';
            attachment.loaded = e.loaded;
            if ((event as any).total) {
              attachment.total = e.total;
              attachment.percentage = Math.round(attachment.loaded / attachment.total * 100);
              if (attachment.percentage < 100) {
                attachment.speed = (attachment.loaded - attachment.previousLoaded) / 1000;
                attachment.previousLoaded = attachment.loaded;
                if (attachment.speed <= 0) {
                  attachment.speed = 0;
                }
              }
            } else {
              attachment.percentage = '?';
              attachment.speed = '?';
            }
            attachment.toast.toastRef.componentInstance.message = `${attachment.percentage}% @ ${attachment.speed} KB/s`;
          }
          if ((event as any).body) {
            const e = (event as any);
            this.gs.log('[DOWNLOAD_COMPLETED]', e);
            attachment.mode = 'determinate';
            attachment.isDownloading = false;
            attachment.isCompleted = true;
            attachment.data = e.body;
            this.toast.remove(attachment.toast.toastId);
            this.saveFileAs(attachmentId);
          }
        }
      });
    } else {
      this.saveFileAs(attachmentId);
    }
  }

  cancelDownload(attachmentId): void {
    const attachment = this.attachmentsDownload[attachmentId];
    attachment.mode = 'indeterminate';
    attachment.percentage = 0;
    attachment.speed = 0;
    attachment.isDownloading = false;
    attachment.isCompleted = false;
    if (attachment.handler) {
      attachment.handler.unsubscribe();
    }
    if (attachment.toast) {
      this.toast.remove(attachment.toast.toastId);
    }
  }

  saveFileAs(attachmentId): void {
    this.gs.log('[SAVE_FILE]', attachmentId);
    const attachment = this.attachmentsDownload[attachmentId];
    saveAs(attachment.data, `${attachment.name}.${attachment.ext}`);
  }
}
