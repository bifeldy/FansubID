import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';

import { SharedMaterialModule } from './_shared/shared-material.module';

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
    SharedMaterialModule,
    FlexLayoutModule
  ],
  providers: [
    LeftMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
