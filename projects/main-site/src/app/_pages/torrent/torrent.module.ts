import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TorrentComponent } from './torrent.component';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';

import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { MaterialChipModule } from '../../_shared/components/material-chip/material-chip.module';

import { CustomDirectivesModule } from '../../_shared/directives/custom-directive.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TorrentComponent
  }
];

@NgModule({
  declarations: [
    TorrentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    CustomDirectivesModule,
    NotificationsModule,
    SharedMaterialModule,
    MaterialChipModule,
    CustomPipeModule
  ]
})
export class TorrentModule { }
