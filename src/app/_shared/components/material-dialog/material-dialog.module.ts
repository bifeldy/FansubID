import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { SharedMaterialModule } from '../../modules/shared-material.module';

import { MaterialDialogInfoComponent } from './material-dialog-info/material-dialog-info.component';
import { MaterialDialogDmakComponent } from './material-dialog-dmak/material-dialog-dmak.component';
import { MaterialDialogEdictComponent } from './material-dialog-edict/material-dialog-edict.component';
import { MaterialDialogBelajarComponent } from './material-dialog-belajar/material-dialog-belajar.component';
import { MaterialDialogInputComponent } from './material-dialog-input/material-dialog-input.component';

@NgModule({
  declarations: [
    MaterialDialogInfoComponent,
    MaterialDialogDmakComponent,
    MaterialDialogEdictComponent,
    MaterialDialogBelajarComponent,
    MaterialDialogInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule
  ],
  exports: [
    MaterialDialogInfoComponent,
    MaterialDialogDmakComponent,
    MaterialDialogEdictComponent,
    MaterialDialogBelajarComponent,
    MaterialDialogInputComponent
  ]
})
export class MaterialDialogModule { }
