import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { AuthGuard } from '../../_shared/helpers/auth-guard';
import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';

import { MaterialExpansionPanelModule } from '../../_shared/components/material-expansion-panel/material-expansion-panel.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { ReportModule } from '../../_shared/components/report/report.module';

import { Role } from '../../_shared/models/Role';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'User Profile',
      description: 'Halaman Informasi Pengguna',
      keywords: 'User',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER]
    }
  },
  {
    path: ':username/edit',
    component: UserEditComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'User - Ubah Profil',
      description: 'Halaman Pembaharuan Profil Pengguna',
      keywords: 'Ubah Profil',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER]
    }
  },
  {
    path: ':username',
    component: UserDetailComponent
  }
];

@NgModule({
  declarations: [
    UserDetailComponent,
    UserListComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    MaterialExpansionPanelModule,
    MaterialTabModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    AngularEditorModule,
    ReportModule
  ]
})
export class UserModule { }
