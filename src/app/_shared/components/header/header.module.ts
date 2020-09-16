import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';

import { SharedMaterialModule } from '../../helpers/shared-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
