import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

import { ServerStateInterceptor } from './_shared/interceptors/server-state.interceptor';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    FlexLayoutServerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ServerStateInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
