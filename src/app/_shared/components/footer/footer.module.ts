import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer.component';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
