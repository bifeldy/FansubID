import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { MaterialDialogInfoComponent } from './material-dialog-info/material-dialog-info.component';
import { MaterialDialogDmakComponent } from './material-dialog-dmak/material-dialog-dmak.component';
import { MaterialDialogEdictComponent } from './material-dialog-edict/material-dialog-edict.component';

@NgModule({
  declarations: [
    MaterialDialogInfoComponent,
    MaterialDialogDmakComponent,
    MaterialDialogEdictComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [
    MaterialDialogInfoComponent,
    MaterialDialogDmakComponent,
    MaterialDialogEdictComponent
  ]
})
export class MaterialDialogModule { }
