import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';
import { AuthGuard } from '../../_shared/helpers/auth-guard';
import { Role } from '../../_shared/models/Role';

import { MaterialTableModule } from '../../_shared/components/material-table/material-table.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';

import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminListDdlComponent } from './admin-list-ddl/admin-list-ddl.component';
import { AdminListUserComponent } from './admin-list-user/admin-list-user.component';
import { AdminListProjectTypeComponent } from './admin-list-project-type/admin-list-project-type.component';
import { AdminPushNotificationComponent } from './admin-push-notification/admin-push-notification.component';
import { AdminListFansubMemberComponent } from './admin-list-fansub-member/admin-list-fansub-member.component';
import { AdminListBannedComponent } from './admin-list-banned/admin-list-banned.component';
import { AdminListCorsComponent } from './admin-list-cors/admin-list-cors.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminMenuComponent
  },
  {
    path: 'banned-list',
    component: AdminListBannedComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Admin - List All Banned User',
      description: 'Kelola Banned User',
      keywords: 'Kelola Banned User',
      roles: [Role.ADMIN, Role.MODERATOR]
    }
  },
  {
    path: 'cors-list',
    component: AdminListCorsComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'CORS - List All Api Key',
      description: 'Kelola Api Key',
      keywords: 'Kelola Api Key',
      roles: [Role.ADMIN, Role.MODERATOR]
    }
  },
  {
    path: 'ddl-list',
    component: AdminListDdlComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Admin - List All Berkas DDL',
      description: 'Kelola Berkas DDL',
      keywords: 'Kelola Berkas DDL',
      roles: [Role.ADMIN]
    }
  },
  {
    path: 'user-list',
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
    path: 'fansub-member',
    component: AdminListFansubMemberComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Admin - List All Fansub Member',
      description: 'Atur Keanggotaan Fansub',
      keywords: 'Keanggotaan Fansub',
      roles: [Role.ADMIN, Role.MODERATOR]
    }
  },
  {
    path: 'push-notification',
    component: AdminPushNotificationComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Admin - Push Notification',
      description: 'Buat Pengumuman Dadakan',
      keywords: 'Push Notification',
      roles: [Role.ADMIN, Role.MODERATOR]
    }
  }
];

@NgModule({
  declarations: [
    AdminMenuComponent,
    AdminListDdlComponent,
    AdminListUserComponent,
    AdminListProjectTypeComponent,
    AdminPushNotificationComponent,
    AdminListFansubMemberComponent,
    AdminListBannedComponent,
    AdminListCorsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    MaterialTableModule,
    NotificationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MaterialFileInputModule
  ]
})
export class AdminModule { }
