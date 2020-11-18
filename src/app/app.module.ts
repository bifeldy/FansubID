import { BrowserModule, HammerModule, Title, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { DISQUS_SHORTNAME } from 'ngx-disqus';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

import { AppRoutingModule } from './app-routing.module';

import { MyHammerConfig } from './_shared/helpers/my-hammer.config';

import { FakeBackendProvider } from './_shared/backends/fake-backend';
import { HttpRequestInterceptor } from './_shared/interceptors/http-request.interceptor';
import { HttpErrorInterceptor } from './_shared/interceptors/http-error.interceptor';
import { BrowserStateInterceptor } from './_shared/interceptors/browser-state.interceptor';

import { LeftMenuService } from './_shared/services/left-menu.service';

import { AppComponent } from './app.component';

import { SharedMaterialModule } from './_shared/helpers/shared-material.module';
import { HeaderModule } from './_shared/components/header/header.module';
import { LeftMenuModule } from './_shared/components/left-menu/left-menu.module';
import { FooterModule } from './_shared/components/footer/footer.module';
import { MaterialFabModule } from './_shared/components/material-fab/material-fab.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    LeftMenuModule,
    FooterModule,
    BrowserTransferStateModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedMaterialModule,
    FlexLayoutModule,
    HammerModule,
    MaterialFabModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    NgProgressModule,
    NgProgressHttpModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BrowserStateInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },
    { provide: DISQUS_SHORTNAME, useValue: 'bifeldy' },
    FakeBackendProvider, Title, CookieService, NgxSpinnerService, LeftMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
