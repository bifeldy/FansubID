import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { SharedMaterialModule } from './_shared/helpers/shared-material.module';
import { MyHammerConfig } from './_shared/helpers/my-hammer.config';

import { LeftMenuService } from './_shared/services/left-menu.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './_shared/components/header/header.component';
import { LeftMenuComponent } from './_shared/components/left-menu/left-menu.component';
import { FooterComponent } from './_shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftMenuComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    HammerModule
  ],
  providers: [
    LeftMenuService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
