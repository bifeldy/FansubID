import { BrowserModule, HammerModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';

import { DISQUS_SHORTNAME } from 'ngx-disqus';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

import { AppRoutingModule } from './app-routing.module';

import { MyHammerConfig } from './_shared/helpers/my-hammer.config';
import { MyTooltipConfig } from './_shared/helpers/my-tooltip.config';

import { HttpRequestInterceptor } from './_shared/interceptors/http-request.interceptor';
import { HttpErrorInterceptor } from './_shared/interceptors/http-error.interceptor';

import { LeftMenuService } from './_shared/services/left-menu.service';

import { AppComponent } from './app.component';

import { SharedMaterialModule } from './_shared/helpers/shared-material.module';
import { HeaderModule } from './_shared/components/header/header.module';
import { LeftMenuModule } from './_shared/components/left-menu/left-menu.module';
import { RightPanelModule } from './_shared/components/right-panel/right-panel.module';
import { FooterModule } from './_shared/components/footer/footer.module';
import { MaterialFabModule } from './_shared/components/material-fab/material-fab.module';
import { MaterialDialogModule } from './_shared/components/material-dialog/material-dialog.module';

import { environment } from '../environments/client/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    LeftMenuModule,
    RightPanelModule,
    FooterModule,
    TransferHttpCacheModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedMaterialModule,
    MaterialDialogModule,
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
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: MyTooltipConfig },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },
    { provide: DISQUS_SHORTNAME, useValue: `${environment.siteName}-${environment.author}`.toLowerCase() },
    Title, CookieService, NgxSpinnerService, LeftMenuService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
