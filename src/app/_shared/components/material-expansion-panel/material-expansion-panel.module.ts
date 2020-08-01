import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { MaterialExpansionPanelComponent } from './material-expansion-panel.component';

@NgModule({
  declarations: [MaterialExpansionPanelComponent],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [MaterialExpansionPanelComponent]
})
export class MaterialExpansionPanelModule { }
