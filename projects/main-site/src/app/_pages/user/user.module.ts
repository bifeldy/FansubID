import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { MaterialFileInputModule } from 'ngx-custom-material-file-input';

import { CONSTANTS } from '../../../constants';

import { RoleModel } from '../../../models/req-res.model';

import { RolesGuard } from '../../_shared/guards/roles.guard';

import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';

import { MaterialExpansionPanelModule } from '../../_shared/components/material-expansion-panel/material-expansion-panel.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { ReportModule } from '../../_shared/components/report/report.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { NoDataModule } from '../../_shared/components/no-data/no-data.module';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserListComponent,
    canActivate: [RolesGuard],
    data: {
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER]
    }
  },
  {
    path: ':username',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: UserDetailComponent
      },
      {
        path: 'edit',
        component: UserEditComponent,
        canActivate: [RolesGuard],
        data: {
          title: 'User - Ubah Profil',
          description: 'Halaman Pembaharuan Profil Pengguna',
          keywords: 'Ubah Profil',
          [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER]
        }
      }
    ]
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
    ReportModule,
    NotificationsModule,
    CustomPipeModule,
    NoDataModule
  ]
})
export class UserModule { }
