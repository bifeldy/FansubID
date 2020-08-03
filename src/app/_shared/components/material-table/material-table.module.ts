import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { MaterialTableComponent } from './material-table.component';
import { MaterialChipModule } from '../material-chip/material-chip.module';

@NgModule({
  declarations: [MaterialTableComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    MaterialChipModule
  ],
  exports: [MaterialTableComponent]
})
export class MaterialTableModule { }
