import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { MaterialTableComponent } from './material-table.component';

@NgModule({
  declarations: [MaterialTableComponent],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [MaterialTableComponent]
})
export class MaterialTableModule { }
