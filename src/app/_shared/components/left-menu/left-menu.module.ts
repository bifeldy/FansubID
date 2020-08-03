import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftMenuComponent } from './left-menu.component';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

@NgModule({
  declarations: [LeftMenuComponent],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [LeftMenuComponent]
})
export class LeftMenuModule { }
