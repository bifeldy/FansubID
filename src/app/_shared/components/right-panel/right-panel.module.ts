import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { RightPanelComponent } from './right-panel.component';
import { SearchAllComponent } from './search-all/search-all.component';

@NgModule({
  declarations: [
    RightPanelComponent,
    SearchAllComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedMaterialModule
  ],
  exports: [
    RightPanelComponent,
    SearchAllComponent
  ]
})
export class RightPanelModule { }
