import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { ChartsModule } from 'ng2-charts';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { RoleModel } from '../../../models/req-res.model';

import { AuthGuard } from '../../_shared/guards/auth.guard';
import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';
import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { MaterialChipModule } from '../../_shared/components/material-chip/material-chip.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { MaterialExpansionPanelModule } from '../../_shared/components/material-expansion-panel/material-expansion-panel.module';
import { ReportModule } from '../../_shared/components/report/report.module';

import { FansubListComponent } from './fansub-list/fansub-list.component';
import { FansubDetailComponent } from './fansub-detail/fansub-detail.component';
import { FansubCreateComponent } from './fansub-create/fansub-create.component';
import { FansubEditComponent } from './fansub-edit/fansub-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FansubListComponent
  },
  {
    path: 'create',
    component: FansubCreateComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Fansub - Buat Baru',
      description: 'Halaman Menambahkan Fansub Baru',
      keywords: 'Create Fansub',
      roles: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER]
    }
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
        canActivate: [AuthGuard],
        data: {
          title: 'Fansub - Ubah Data',
          description: 'Halaman Pembaharuan Data Fansub',
          keywords: 'Ubah Fansub',
          roles: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER]
        }
      }
    ]
  }
];

@NgModule({
  declarations: [
    FansubListComponent,
    FansubDetailComponent,
    FansubCreateComponent,
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
    CustomPipeModule
  ]
})
export class FansubModule { }
