import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { RoleModel } from '../../../models/req-res.model';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { VjsPlayerModule } from '../../_shared/components/vjs-player/vjs-player.module';
import { DiscussionModule } from '../../_shared/components/discussion/discussion.module';
import { ReportModule } from '../../_shared/components/report/report.module';
import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { RolesGuard } from '../../_shared/guards/roles.guard';

import { BerkasDetailComponent } from './berkas-detail/berkas-detail.component';
import { BerkasEditComponent } from './berkas-edit/berkas-edit.component';
import { BerkasListComponent } from './berkas-list/berkas-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BerkasListComponent
  },
  {
    path: ':berkasId',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BerkasDetailComponent,
      },
      {
        path: 'edit',
        component: BerkasEditComponent,
        canActivate: [RolesGuard],
        data: {
          title: 'Berkas - Ubah Data',
          description: 'Halaman Pembaharuan Data Fansub',
          keywords: 'Ubah Berkas',
          roles: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER]
        }
      }
    ]
  }
];

@NgModule({
  declarations: [
    BerkasDetailComponent,
    BerkasEditComponent,
    BerkasListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    MaterialTabModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    NotificationsModule,
    AngularEditorModule,
    VjsPlayerModule,
    DiscussionModule,
    ReportModule,
    CustomPipeModule
  ]
})
export class BerkasModule { }
