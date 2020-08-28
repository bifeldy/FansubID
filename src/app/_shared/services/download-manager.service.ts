import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { GlobalService } from './global.service';

import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DownloadManagerService {

  public attachmentsDownload = {};

  constructor(
    private gs: GlobalService,
    private api: ApiService
  ) {
  }

  getAttachmentDownloadFile(attachment): any {
    if (!this.attachmentsDownload[attachment.id]) {
      this.attachmentsDownload[attachment.id] = {};
      this.attachmentsDownload[attachment.id].name = attachment.name;
      this.attachmentsDownload[attachment.id].size = attachment.size;
      this.attachmentsDownload[attachment.id].ext = attachment.ext;
      this.attachmentsDownload[attachment.id].download_count = attachment.download_count;
      this.attachmentsDownload[attachment.id].percentage = 0;
      this.attachmentsDownload[attachment.id].mode = 'indeterminate';
      this.attachmentsDownload[attachment.id].isDownloading = false;
      this.attachmentsDownload[attachment.id].isCompleted = false;
      this.attachmentsDownload[attachment.id].data = null;
    }
    return this.attachmentsDownload[attachment.id];
  }

  startDownload(attachmentId): void {
    if (!this.attachmentsDownload[attachmentId].isCompleted) {
      this.attachmentsDownload[attachmentId].isDownloading = false;
      this.api.downloadFile(`/attachment?id=${attachmentId}`).subscribe(
        event => {
          this.gs.log('[DOWNLOAD_EVENTS]', event);
          if ((event as any).loaded && (event as any).total) {
            const e = (event as any);
            this.gs.log('[DOWNLOAD_PROGRESS]', e);
            this.attachmentsDownload[attachmentId].mode = 'determinate';
            this.attachmentsDownload[attachmentId].percentage = Math.round(e.loaded / e.total * 100);
          }
          if ((event as any).body) {
            const e = (event as any);
            this.gs.log('[DOWNLOAD_COMPLETED]', e);
            this.attachmentsDownload[attachmentId].mode = 'determinate';
            this.attachmentsDownload[attachmentId].isDownloading = false;
            this.attachmentsDownload[attachmentId].isCompleted = true;
            this.attachmentsDownload[attachmentId].data = e.body;
            this.saveFileAs(attachmentId);
          }
        }
      );
    } else {
      this.saveFileAs(attachmentId);
    }
  }

  saveFileAs(attachmentId): void {
    this.gs.log('[SAVE_FILE]', attachmentId);
    const attachment = this.attachmentsDownload[attachmentId];
    saveAs(attachment.data, `${attachment.name}.${attachment.ext}`);
  }
}
