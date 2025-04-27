import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UploadxModule } from 'ngx-uploadx';

// import { CONSTANTS } from '../../../main-site/src/constants';

// import { environment } from '../../../main-site/src/environments/app/environment';

import { CustomPipeModule } from '../../../main-site/src/app/_shared/pipes/custom-pipe.module';

import { SharedMaterialModule } from '../../../main-site/src/app/_shared/modules/shared-material.module';

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
    ReactiveFormsModule,
    CustomPipeModule,
    SharedMaterialModule,
    UploadxModule.withConfig({
      autoUpload: false,
      concurrency: 2,
      // endpoint: `${environment.apiUrl}/fanshare/u0`,
      endpoint: `http://localhost:4200/api/fanshare`,
      headers: {
        'ngsw-bypass': 'true'
      },
      retryConfig: {
        maxAttempts: 4
      },
      // chunkSize: CONSTANTS.fileSizeAttachmentChunkLimit
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
