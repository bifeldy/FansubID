import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
