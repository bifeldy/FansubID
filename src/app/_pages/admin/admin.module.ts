import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { MaterialFileInputModule } from 'ngx-custom-material-file-input';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';

import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { MaterialTableModule } from '../../_shared/components/material-table/material-table.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';

import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminListDdlComponent } from './admin-list-ddl/admin-list-ddl.component';
import { AdminListUserComponent } from './admin-list-user/admin-list-user.component';
import { AdminListProjectTypeComponent } from './admin-list-project-type/admin-list-project-type.component';
import { AdminListPushNotificationComponent } from './admin-list-push-notification/admin-list-push-notification.component';
import { AdminListFansubMemberComponent } from './admin-list-fansub-member/admin-list-fansub-member.component';
import { AdminListBannedComponent } from './admin-list-banned/admin-list-banned.component';
import { AdminListCorsComponent } from './admin-list-cors/admin-list-cors.component';
import { AdminListInformationDialogComponent } from './admin-list-information-dialog/admin-list-information-dialog.component';
import { AdminListEmailComponent } from './admin-list-email/admin-list-email.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminMenuComponent
  },
  {
    path: 'banned-list',
    component: AdminListBannedComponent,
    data: {
      title: 'Admin - List All Banned User',
      description: 'Kelola Banned User',
      keywords: 'Kelola Banned User'
    }
  },
  {
    path: 'cors-list',
    component: AdminListCorsComponent,
    data: {
      title: 'CORS - List All Api Key',
      description: 'Kelola Api Key',
      keywords: 'Kelola Api Key'
    }
  },
  {
    path: 'ddl-list',
    component: AdminListDdlComponent,
    data: {
      title: 'Admin - List All Berkas DDL',
      description: 'Kelola Berkas DDL',
      keywords: 'Kelola Berkas DDL'
    }
  },
  {
    path: 'user-list',
    component: AdminListUserComponent,
    data: {
      title: 'Admin - List All Users',
      description: 'Atur Seluruh Member',
      keywords: 'BAN & UN-BAN User'
    }
  },
  {
    path: 'project-type',
    component: AdminListProjectTypeComponent,
    data: {
      title: 'Admin - List All Project Type',
      description: 'Atur Kategori Garapan',
      keywords: 'Jenis Proyek Berkas'
    }
  },
  {
    path: 'fansub-member',
    component: AdminListFansubMemberComponent,
    data: {
      title: 'Admin - List All Fansub Member',
      description: 'Atur Keanggotaan Fansub',
      keywords: 'Keanggotaan Fansub'
    }
  },
  {
    path: 'push-notification',
    component: AdminListPushNotificationComponent,
    data: {
      title: 'Admin - Push Notification',
      description: 'Buat Pengumuman Dadakan',
      keywords: 'Push Notification'
    }
  },
  {
    path: 'information',
    component: AdminListInformationDialogComponent,
    data: {
      title: 'Admin - List All Information',
      description: 'Atur Informasi Dialog',
      keywords: 'Informations'
    }
  },
  {
    path: 'email',
    component: AdminListEmailComponent,
    data: {
      title: 'Admin - List All Email',
      description: 'Email Inbox & Outbox',
      keywords: 'Surat Elektronik'
    }
  }
];

@NgModule({
  declarations: [
    AdminMenuComponent,
    AdminListDdlComponent,
    AdminListUserComponent,
    AdminListProjectTypeComponent,
    AdminListPushNotificationComponent,
    AdminListFansubMemberComponent,
    AdminListBannedComponent,
    AdminListCorsComponent,
    AdminListInformationDialogComponent,
    AdminListEmailComponent
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
    MaterialFileInputModule,
    AngularEditorModule,
    CustomPipeModule
  ]
})
export class AdminModule { }
