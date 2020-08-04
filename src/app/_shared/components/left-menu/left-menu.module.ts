import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeftMenuComponent } from './left-menu.component';

import { SharedMaterialModule } from '../../helpers/shared-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LeftMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule
  ],
  exports: [LeftMenuComponent]
})
export class LeftMenuModule { }
