import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clipboard } from '@angular/cdk/clipboard';

import { Observable } from 'rxjs';
import { timeout, retry } from 'rxjs/operators';
import { UploadState, Uploader, UploadxService } from 'ngx-uploadx';

import { environment } from '../environment';

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
  attachmentInfoErrorText = null;
  attachmentLimitExceeded = null;

  subsUpload = null;

  uploadx: HTMLInputElement = null;

  attachmentData = [];
  subsAttachment = null;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  constructor(
    private clipboard: Clipboard,
    private http: HttpClient,
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
          this.clipboard.copy(state.response.result.uri)
          this.attachmentLimitExceeded = null;
          this.attachmentInfoErrorText = state.response.result.uri;
          this.attachmentSelected = null;
          this.uploadService.disconnect();
          if (this.uploadx) {
            this.uploadx.value = null;
          }
          this.getAttachment();
        } else if (state.status === 'error') {
          this.failOrCancelUpload(state.response);
        }
      },
      error: err => {
        console.error('[UPLOAD_ERROR]', err);
        this.failOrCancelUpload(err);
      }
    });
    this.getAttachment();
  }

  ngOnDestroy(): void {
    this.uploadService.disconnect();
    this.subsUpload?.unsubscribe();
    this.subsAttachment?.unsubscribe();
  }

  async uploadAttachment(event): Promise<void> {
    this.uploadx = event.target;
    const file = this.uploadx.files[0];
    this.attachmentLimitExceeded = null;
    this.attachmentInfoErrorText = null;
    console.log('[ATTACHMENT_SELECTED]', file);
    this.uploadService.disconnect();
    try {
      if (!file) {
        this.failOrCancelUpload({
          info: 'Silahkan Pilih File Terlebih Dahulu ~'
        });
      } else if (file.size <= CONSTANTS.fileSizeAttachmentAutoDdl) {
        if (!file.name.includes('.') || file.name.endsWith('.')) {
          this.attachmentInfoErrorText = 'Ekstensi Nama Lampiran Tidak Valid!';
        } else {
          if (!this.uploadService.queue.find(x => x.name === file.name)) {
            this.uploadService.handleFiles(file);
          }
        }
      } else {
        this.attachmentLimitExceeded = CONSTANTS.fileSizeAttachmentAutoDdl;
      }
    } catch (error) {
      console.error('[UPLOAD_ERROR]', error);
      this.failOrCancelUpload(error);
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
    this.uploadService.disconnect();
    if (this.uploadx) {
      this.uploadx.value = null;
    }
    this.attachmentInfoErrorText = err?.message || err?.result?.message || err?.info || err?.error?.message || 'Terjadi Kesalahan, Harap Reload Halaman!';
  }

  // -- --

  private prepareOptions(options: any): void {
    if (!(options.headers instanceof HttpHeaders)) {
      options.headers = new HttpHeaders(options.headers);
    }
  }

  private getData(path: string, options = {}, timedOut = 20 * 1000, retryCount = 3): Observable<any> {
    this.prepareOptions(options);
    return this.http.get(path, options).pipe(
      timeout(timedOut),
      retry(retryCount)
    );
  }

  getAttachment(): void {
    if (this.subsAttachment) {
      this.subsAttachment.unsubscribe();
    }
    this.subsAttachment = this.getData(`${environment.apiUrl}/fanshare?q=${this.q}&page=${this.page}&row=${this.row}&sort=${this.sort}&order=${this.order}`).subscribe({
      next: res => {
        console.log('[BERKAS_LIST_SUCCESS]', res);
        this.count = res.count;
        this.attachmentData = res.results;
      },
      error: err => {
        console.error('[BERKAS_LIST_ERROR]', err);
      }
    });
  }

}
