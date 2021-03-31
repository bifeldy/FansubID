import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { VjsPlayerModule } from '../../_shared/components/vjs-player/vjs-player.module';
import { DiscussionModule } from '../../_shared/components/discussion/discussion.module';
import { ReportModule } from '../../_shared/components/report/report.module';

import { AuthGuard } from '../../_shared/helpers/auth-guard';
import { Role } from '../../_shared/models/Role';

import { BytesPipe } from '../../_shared/pipes/bytes.pipe';

import { BerkasCreateComponent } from './berkas-create/berkas-create.component';
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
    path: 'create',
    component: BerkasCreateComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Berkas - Buat Baru',
      description: 'Halaman Unggah Berkas Baru',
      keywords: 'Tambah Berkas Baru',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER]
    }
  },
  {
    path: ':berkasId/edit',
    component: BerkasEditComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Berkas - Ubah Data',
      description: 'Halaman Pembaharuan Data Fansub',
      keywords: 'Ubah Berkas',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER]
    }
  },
  {
    path: ':berkasId',
    component: BerkasDetailComponent
  }
];

@NgModule({
  declarations: [
    BerkasCreateComponent,
    BerkasDetailComponent,
    BerkasEditComponent,
    BerkasListComponent,
    BytesPipe
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
    ReportModule
  ]
})
export class BerkasModule { }
