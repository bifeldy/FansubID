import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BannerNihongoComponent } from './banner-nihongo.component';

import { SharedMaterialModule } from '../../modules/shared-material.module';

@NgModule({
  declarations: [BannerNihongoComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule
  ],
  exports: [BannerNihongoComponent]
})
export class BannerNihongoModule { }
