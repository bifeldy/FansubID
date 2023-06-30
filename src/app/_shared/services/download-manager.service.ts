import { Injectable } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { concat, Observable } from 'rxjs';

import { saveAs } from 'file-saver';

import { AttachmentModel } from '../../../models/req-res.model';

import { GlobalService } from './global.service';
import { DdlLampiranService } from './ddl-lampiran.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadManagerService {

  private attachmentsDownload = {};

  constructor(
    private gs: GlobalService,
    private toast: ToastService,
    private dls: DdlLampiranService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  getAttachmentDownloadFile(attachment: AttachmentModel): any {
    if (!this.attachmentsDownload[attachment.id]) {
      this.attachmentsDownload[attachment.id] = {};
      this.attachmentsDownload[attachment.id].name = attachment.name;
      this.attachmentsDownload[attachment.id].size = attachment.size;
      this.attachmentsDownload[attachment.id].ext = attachment.ext;
      this.attachmentsDownload[attachment.id].download_count = attachment.download_count;
      this.attachmentsDownload[attachment.id].google_drive = attachment.google_drive;
      this.attachmentsDownload[attachment.id].discord = attachment.discord;
      this.attachmentsDownload[attachment.id].mode = 'indeterminate';
      this.attachmentsDownload[attachment.id].isDownloading = false;
      this.attachmentsDownload[attachment.id].isCompleted = false;
      this.attachmentsDownload[attachment.id].data = null;
      this.attachmentsDownload[attachment.id].handler = null;
      this.attachmentsDownload[attachment.id].toast = null;
      this.attachmentsDownload[attachment.id].totals = 0;
      this.attachmentsDownload[attachment.id].percentage = 0;
      this.attachmentsDownload[attachment.id].speed = 0;
      this.attachmentsDownload[attachment.id].loaded = 0;
    }
    return this.attachmentsDownload[attachment.id];
  }

  stopFail(attachment): void {
    attachment.isDownloading = false;
    attachment.isCompleted = false;
    if (attachment.toast) {
      this.toast.remove(attachment.toast.toastId);
    }
  }

  onProgress(attachment, evt): void {
    if (evt.loaded) {
      this.gs.log('[DOWNLOAD_PROGRESS]', evt);
      attachment.mode = 'determinate';
      const selisih = evt.loaded - attachment.loaded;
      attachment.totals += selisih;
      attachment.speed = selisih / 1000;
      attachment.percentage = Math.round(attachment.totals / attachment.size * 100);
      attachment.loaded = evt.loaded;
      attachment.toast.toastRef.componentInstance.message = `${attachment.percentage}% @ ${attachment.speed} KB/s`;
    }
  }

  startDownload(attachmentId, directDownload = true): void {
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
      if (attachment.discord) {
        this.dls.getListDdl(attachmentId).subscribe({
          next: async res => {
            this.gs.log('[DOWNLOAD_LIST_DDL]', res);
            const sortedResults = res.results.sort((a, b) => a.chunk_idx - b.chunk_idx);
            // TODO :: Create Browser Extension
            // r.id -> Send To Server (Download Proxy, Bypass CORS)
            // r.url -> Direct Download, Need Bypass CORS Discord
            const handlers: Observable<any>[] = [];
            for (const sr of sortedResults) {
              let handler = null;
              if (directDownload) {
                handler = this.dls.downloadDdlDirect(sr.url);
              } else {
                handler = this.dls.downloadDdlProxy(sr.id);
              }
              handlers.push(handler);
            }
            const chunks: Uint8Array[] = [];
            attachment.handler = concat(...handlers).subscribe({
              next: async evt => {
                if (evt.type === HttpEventType.DownloadProgress) {
                  this.onProgress(attachment, evt);
                }
                if (evt.type === HttpEventType.Response) {
                  attachment.loaded = 0;
                  const partBlob: Blob = evt.body;
                  const partBuff: ArrayBuffer = await partBlob.arrayBuffer();
                  const chunk = new Uint8Array(partBuff);
                  this.gs.log('[DOWNLOAD_CHUNK_APPEND]', partBuff.byteLength);
                  chunks.push(chunk);
                }
                if (evt.type === HttpEventType.Response && chunks.length === sortedResults.length) {
                  this.gs.log('[DOWNLOAD_CHUNK_COMPLETED]', chunks);
                  const fullBlob = new Blob(chunks);
                  attachment.mode = 'determinate';
                  attachment.isDownloading = false;
                  attachment.isCompleted = true;
                  attachment.data = fullBlob;
                  this.toast.remove(attachment.toast.toastId);
                  this.saveFileAs(attachmentId);
                }
              },
              error: err => {
                this.gs.log('[DOWNLOAD_CHUNK_ERROR]', err, 'error');
                this.stopFail(attachment);
              }
            });
          },
          error: err => {
            this.gs.log('[DOWNLOAD_ERROR]', err, 'error');
            this.stopFail(attachment);
          }
        });
      } else {
        attachment.handler = this.dls.downloadLampiran(attachmentId).subscribe({
          next: evt => {
            if (evt.type === HttpEventType.DownloadProgress) {
              this.onProgress(attachment, evt);
            }
            if (evt.type === HttpEventType.Response) {
              this.gs.log('[DOWNLOAD_COMPLETED]', evt);
              attachment.mode = 'determinate';
              attachment.isDownloading = false;
              attachment.isCompleted = true;
              attachment.data = evt.body;
              this.toast.remove(attachment.toast.toastId);
              this.saveFileAs(attachmentId);
            }
          },
          error: err => {
            this.gs.log('[DOWNLOAD_ERROR]', err, 'error');
            this.stopFail(attachment);
          }
        });
      }
    } else {
      this.saveFileAs(attachmentId);
    }
  }

  cancelDownload(attachmentId): void {
    const attachment = this.attachmentsDownload[attachmentId];
    attachment.mode = 'indeterminate';
    attachment.percentage = 0;
    attachment.speed = 0;
    attachment.totals = 0;
    attachment.loaded = 0;
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
