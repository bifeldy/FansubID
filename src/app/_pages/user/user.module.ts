import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../_shared/helpers/auth-guard';
import { Role } from '../../_shared/models/Role';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { MaterialExpansionPanelModule } from '../../_shared/components/material-expansion-panel/material-expansion-panel.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: ':username/edit',
    component: UserEditComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'User - Ubah Profil',
      description: 'Halaman Pembaharuan Profil Pengguna',
      keywords: 'Ubah Profil',
      roles: [Role.ADMIN, Role.FANSUBBER, Role.MODERATOR, Role.USER]
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
    MaterialExpansionPanelModule,
    MaterialTabModule
  ]
})
export class UserModule { }
