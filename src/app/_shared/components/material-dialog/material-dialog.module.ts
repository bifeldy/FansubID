import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { MaterialDialogInfoComponent } from './material-dialog-info/material-dialog-info.component';

@NgModule({
  declarations: [
    MaterialDialogInfoComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [
    MaterialDialogInfoComponent
  ]
})
export class MaterialDialogModule { }
