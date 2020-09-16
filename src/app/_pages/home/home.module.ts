import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';

import { HomeComponent } from './home.component';
import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialTabModule,
    NotificationsModule,
    SharedMaterialModule
  ]
})
export class HomeModule { }
