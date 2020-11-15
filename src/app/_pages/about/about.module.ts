import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';

import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    NotificationsModule
  ]
})
export class AboutModule { }
