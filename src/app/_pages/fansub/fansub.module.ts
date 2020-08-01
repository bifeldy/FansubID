import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';

import { FansubListComponent } from './fansub-list/fansub-list.component';
import { FansubDetailComponent } from './fansub-detail/fansub-detail.component';

const routes: Routes = [
  {
    path: '',
    component: FansubListComponent
  },
  {
    path: ':id',
    component: FansubDetailComponent
  }
];

@NgModule({
  declarations: [
    FansubListComponent,
    FansubDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    MaterialTabModule
  ]
})
export class FansubModule { }
