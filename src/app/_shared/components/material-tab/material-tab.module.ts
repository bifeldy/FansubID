import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../../helpers/shared-material.module';
import { MaterialTableModule } from '../material-table/material-table.module';

import { MaterialTabComponent } from './material-tab.component';

@NgModule({
  declarations: [MaterialTabComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    MaterialTableModule
  ],
  exports: [MaterialTabComponent]
})
export class MaterialTabModule { }
