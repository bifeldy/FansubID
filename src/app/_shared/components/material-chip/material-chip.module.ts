import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { MaterialChipComponent } from './material-chip.component';

@NgModule({
  declarations: [MaterialChipComponent],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [MaterialChipComponent]
})
export class MaterialChipModule { }
