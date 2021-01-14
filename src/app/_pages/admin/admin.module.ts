import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';
import { MaterialTableModule } from '../../_shared/components/material-table/material-table.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';

import { AuthGuard } from '../../_shared/helpers/auth-guard';
import { Role } from '../../_shared/models/Role';

import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminListUserComponent } from './admin-list-user/admin-list-user.component';
import { AdminListProjectTypeComponent } from './admin-list-project-type/admin-list-project-type.component';
import { AdminListFansubLeaderComponent } from './admin-list-fansub-leader/admin-list-fansub-leader.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMenuComponent
  },
  {
    path: 'user',
    component: AdminListUserComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Admin - List All Users',
      description: 'Atur Seluruh Member',
      keywords: 'BAN & UN-BAN User',
      roles: [Role.ADMIN, Role.MODERATOR]
    }
  },
  {
    path: 'project-type',
    component: AdminListProjectTypeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Admin - List All Project Type',
      description: 'Atur Kategori Garapan',
      keywords: 'Jenis Proyek Berkas',
      roles: [Role.ADMIN, Role.MODERATOR]
    }
  },
  {
    path: 'fansub-leader',
    component: AdminListFansubLeaderComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Admin - List All Fansub Leader',
      description: 'Atur Keanggotaan Fansub',
      keywords: 'Keanggotaan Fansub',
      roles: [Role.ADMIN, Role.MODERATOR]
    }
  }
];

@NgModule({
  declarations: [
    AdminMenuComponent,
    AdminListUserComponent,
    AdminListProjectTypeComponent,
    AdminListFansubLeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
