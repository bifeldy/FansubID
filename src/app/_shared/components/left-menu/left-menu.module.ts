import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LeftMenuComponent } from './left-menu.component';

import { SharedMaterialModule } from '../../modules/shared-material.module';

@NgModule({
  declarations: [LeftMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    FormsModule
  ],
  exports: [LeftMenuComponent]
})
export class LeftMenuModule { }
