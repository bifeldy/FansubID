import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialTableComponent } from './material-table.component';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { MaterialChipModule } from '../material-chip/material-chip.module';

import { CustomPipeModule } from '../../pipes/custom-pipe.module';

@NgModule({
  declarations: [
    MaterialTableComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    MaterialChipModule,
    FormsModule,
    CustomPipeModule
  ],
  exports: [MaterialTableComponent]
})
export class MaterialTableModule { }
