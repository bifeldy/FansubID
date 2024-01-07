import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialFabComponent } from './material-fab.component';

import { SharedMaterialModule } from '../../modules/shared-material.module';

@NgModule({
  declarations: [MaterialFabComponent],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [MaterialFabComponent]
})
export class MaterialFabModule { }
