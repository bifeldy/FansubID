import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbModule } from 'xng-breadcrumb';

import { FooterComponent } from './footer.component';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    BreadcrumbModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
