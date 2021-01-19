import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { MaterialDialogInfoComponent } from './material-dialog-info/material-dialog-info.component';
import { MaterialDialogDmakComponent } from './material-dialog-dmak/material-dialog-dmak.component';

@NgModule({
  declarations: [
    MaterialDialogInfoComponent,
    MaterialDialogDmakComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [
    MaterialDialogInfoComponent,
    MaterialDialogDmakComponent
  ]
})
export class MaterialDialogModule { }
