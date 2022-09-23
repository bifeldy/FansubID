import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../../modules/shared-material.module';

import { MaterialTableModule } from '../material-table/material-table.module';
import { DiscussionModule } from '../discussion/discussion.module';
import { NoDataModule } from '../no-data/no-data.module';

import { MaterialTabComponent } from './material-tab.component';

@NgModule({
  declarations: [MaterialTabComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    MaterialTableModule,
    DiscussionModule,
    NoDataModule
  ],
  exports: [MaterialTabComponent]
})
export class MaterialTabModule { }
