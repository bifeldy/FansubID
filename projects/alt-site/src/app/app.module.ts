import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Canceler, RequestConfig, Uploader, UploadxModule } from 'ngx-uploadx';
import CryptoJS from 'crypto-js';

import { CONSTANTS } from '../../../main-site/src/constants';

import { CustomPipeModule } from '../../../main-site/src/app/_shared/pipes/custom-pipe.module';

import { SharedMaterialModule } from '../../../main-site/src/app/_shared/modules/shared-material.module';

import { environment } from '../environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CustomPipeModule,
    SharedMaterialModule,
    UploadxModule.withConfig({
      autoUpload: false,
      concurrency: 1,
      endpoint: `${environment.apiUrl}/fanshare`,
      headers: {
        'ngsw-bypass': 'true'
      },
      retryConfig: {
        maxAttempts: 4
      },
      chunkSize: CONSTANTS.fileSizeAttachmentChunkLimit,
      prerequest: injectDigestHeader
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//

const hasher = {
  lookup: {} as Record<string, { key: string; md5: string }>,
  isSupported: window.crypto && !!window.crypto.subtle,
  readBlob(body: Blob, canceler?: Canceler): Promise<CryptoJS.lib.WordArray> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (canceler) {
        canceler.onCancel = () => {
          reader.abort();
          reject('aborted');
        };
      }
      reader.onload = (fileEvent) => {
        let binary = CryptoJS.lib.WordArray.create(fileEvent.target.result as any);
        const md5 = CryptoJS.MD5(binary)
        resolve(md5);
      }
      reader.onerror = reject;
      reader.readAsArrayBuffer(body);
    });
  },
  async digestBase64(body: Blob, canceler?: Canceler): Promise<string> {
    return this.readBlob(body, canceler).then(md5 => md5.toString(CryptoJS.enc.Base64));
  }
};

async function injectDigestHeader(this: Uploader, req: RequestConfig): Promise<RequestConfig> {
  if (hasher.isSupported && req.body instanceof Blob) {
    if (this.chunkSize) {
      const { body, start } = this.getChunk((this.offset || 0) + this.chunkSize);
      hasher.digestBase64(body, req.canceler).then(digest => {
        const key = `${body.size}-${start}`;
        hasher.lookup[req.url] = { key, md5: digest };
      });
    }
    const key = `${req.body.size}-${this.offset}`;
    const md5 =
      hasher.lookup[req.url]?.key === key
        ? hasher.lookup[req.url].md5
        : await hasher.digestBase64(req.body, req.canceler);
    Object.assign(req.headers, { 'content-md5': md5 });
  }

  return req;
}