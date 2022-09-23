import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { ChartsModule } from 'ng2-charts';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { CONSTANTS } from '../../../constants';

import { RoleModel } from '../../../models/req-res.model';

import { RolesGuard } from '../../_shared/guards/roles.guard';
import { VerifiedGuard } from '../../_shared/guards/verified.guard';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';
import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { MaterialChipModule } from '../../_shared/components/material-chip/material-chip.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { MaterialExpansionPanelModule } from '../../_shared/components/material-expansion-panel/material-expansion-panel.module';
import { ReportModule } from '../../_shared/components/report/report.module';
import { NoDataModule } from '../../_shared/components/no-data/no-data.module';

import { FansubListComponent } from './fansub-list/fansub-list.component';
import { FansubDetailComponent } from './fansub-detail/fansub-detail.component';
import { FansubEditComponent } from './fansub-edit/fansub-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FansubListComponent
  },
  {
    path: ':fansubSlug',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: FansubDetailComponent
      },
      {
        path: 'edit',
        component: FansubEditComponent,
        canActivate: [RolesGuard, VerifiedGuard],
        data: {
          title: 'Fansub - Ubah Data',
          description: 'Halaman Pembaharuan Data Fansub',
          keywords: 'Ubah Fansub',
          [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
          [CONSTANTS.decoratorVerifiedOnly]: true
        }
      }
    ]
  }
];

@NgModule({
  declarations: [
    FansubListComponent,
    FansubDetailComponent,
    FansubEditComponent
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
    MaterialFileInputModule,
    AngularEditorModule,
    ReportModule,
    CustomPipeModule,
    NoDataModule
  ]
})
export class FansubModule { }
