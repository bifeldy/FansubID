import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RightPanelComponent } from './right-panel.component';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

@NgModule({
  declarations: [RightPanelComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule
  ],
  exports: [RightPanelComponent]
})
export class RightPanelModule { }
