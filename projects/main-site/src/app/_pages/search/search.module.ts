import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search.component';

import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { RightPanelModule } from '../../_shared/components/right-panel/right-panel.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchComponent
  }
];

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NotificationsModule,
    RightPanelModule
  ]
})
export class SearchModule { }
