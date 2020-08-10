import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { MaterialChipModule } from 'src/app/_shared/components/material-chip/material-chip.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { MaterialExpansionPanelModule } from '../../_shared/components/material-expansion-panel/material-expansion-panel.module';

import { FansubListComponent } from './fansub-list/fansub-list.component';
import { FansubDetailComponent } from './fansub-detail/fansub-detail.component';
import { FansubCreateComponent } from './fansub-create/fansub-create.component';

const routes: Routes = [
  {
    path: '',
    component: FansubListComponent
  },
  {
    path: 'create',
    component: FansubCreateComponent,
    data: {
      title: 'Fansub - Buat Baru',
      description: 'Halaman Menambahkan Fansub Baru',
      keywords: 'Create Fansub',
      roles: []
    }
  },
  {
    path: ':fansubId',
    component: FansubDetailComponent
  }
];

@NgModule({
  declarations: [
    FansubListComponent,
    FansubDetailComponent,
    FansubCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    MaterialTabModule,
    MaterialExpansionPanelModule,
    MaterialChipModule,
    ChartsModule,
    NotificationsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FansubModule { }
