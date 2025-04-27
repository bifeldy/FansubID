import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { UploadState, Uploader, UploadxService } from 'ngx-uploadx';

import { CONSTANTS } from '../../../main-site/src/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  uploads$: Observable<Uploader[]>;

  submitted = false;

  attachmentSelected: UploadState = null;
  attachmentErrorText = null;
  attachmentLimitExceeded = null;

  subsUpload = null;

  constructor(
    private uploadService: UploadxService
  ) {
    //
  }

  ngOnInit(): void {
    this.uploads$ = this.uploadService.connect();
    this.subsUpload = this.uploadService.events.subscribe({
      next: state => {
        console.log('[UPLOAD_EVENTS]', state);
        if (state.status === 'uploading' || state.status === 'complete') {
          this.attachmentSelected = state;
        }
        if (state.status === 'complete') {
          console.log('[UPLOAD_COMPLETED]', state.response);
        } else if (state.status === 'error') {
          console.log('[UPLOAD_ERROR]', state.response, 'error');
          this.failOrCancelUpload(state.response);
        }
      },
      error: err => {
        console.log('[UPLOAD_ERROR]', err, 'error');
        this.failOrCancelUpload(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.uploadService.disconnect();
    this.subsUpload?.unsubscribe();
  }

  async uploadAttachment(event): Promise<void> {
    const file = event.target.files[0];
    this.attachmentLimitExceeded = null;
    this.attachmentErrorText = null;
    console.log('[ATTACHMENT_SELECTED]', file);
    this.uploadService.disconnect();
    try {
      if (!file) {
        this.failOrCancelUpload({
          info: 'Silahkan Pilih File Terlebih Dahulu ~'
        });
      } else if (file.size <= CONSTANTS.fileSizeAttachmentTotalLimit) {
        if (!file.name.includes('.') || file.name.endsWith('.')) {
          this.attachmentErrorText = 'Ekstensi Nama Lampiran Tidak Valid!';
        } else {
          if (!this.uploadService.queue.find(x => x.name === file.name)) {
            this.uploadService.handleFiles(file);
          }
        }
      } else {
        this.attachmentLimitExceeded = CONSTANTS.fileSizeAttachmentTotalLimit;
      }
    } catch (error) {
      console.log(error);
    }
  }

  submitAttachment(item: Uploader): void {
    const uploader = this.uploadService.state().find(x => x.uploadId === item.uploadId);
    if (uploader) {
      this.attachmentSelected = uploader;
      item.status = 'queue';
    }
  }

  failOrCancelUpload(err = null): void {
    this.attachmentSelected = null;
    this.attachmentErrorText = err?.result?.message || err?.info || err?.error?.message || 'Terjadi Kesalahan, Harap Reload Halaman!';
    this.uploadService.disconnect();
  }

}
