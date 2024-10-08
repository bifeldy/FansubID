import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { MaterialFileInputModule } from 'ngx-custom-material-file-input';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { CONSTANTS } from '../../../constants';

import { RoleModel } from '../../../models/req-res.model';

import { RolesGuard } from '../../_shared/guards/roles.guard';
import { VerifiedGuard } from '../../_shared/guards/verified.guard';
import { LeavePageGuard } from '../../_shared/guards/leave-page.guard';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';
import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';

import { BerkasCreateComponent } from '../create/berkas-create/berkas-create.component';
import { FansubCreateComponent } from '../create/fansub-create/fansub-create.component';
import { MailboxCreateComponent } from '../create/mailbox-create/mailbox-create.component';
import { NewsCreateComponent } from '../create/news-create/news-create.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'berkas',
    component: BerkasCreateComponent,
    canActivate: [RolesGuard],
    canDeactivate: [LeavePageGuard],
    data: {
      title: 'Berkas - Buat Baru',
      description: 'Halaman Unggah Berkas Baru',
      keywords: 'Tambah Berkas Baru',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER]
    }
  },
  {
    path: 'fansub',
    component: FansubCreateComponent,
    canActivate: [VerifiedGuard, RolesGuard],
    canDeactivate: [LeavePageGuard],
    data: {
      title: 'Fansub - Buat Baru',
      description: 'Halaman Menambahkan Fansub Baru',
      keywords: 'Create Fansub',
      [CONSTANTS.decoratorVerifiedOnly]: true,
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER]
    }
  },
  {
    path: 'mailbox',
    component: MailboxCreateComponent,
    canActivate: [VerifiedGuard, RolesGuard],
    canDeactivate: [LeavePageGuard],
    data: {
      title: 'Surel - Buat Baru',
      description: 'Halaman Kirim Surel Baru',
      keywords: 'Buat Surel Baru',
      [CONSTANTS.decoratorVerifiedOnly]: true,
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER]
    }
  },
  {
    path: 'news',
    component: NewsCreateComponent,
    canActivate: [VerifiedGuard, RolesGuard],
    canDeactivate: [LeavePageGuard],
    data: {
      title: 'Berita - Buat Baru',
      description: 'Halaman Unggah Berita Baru',
      keywords: 'Tambah Berita Baru',
      [CONSTANTS.decoratorVerifiedOnly]: true,
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR]
    }
  },
  {
    path: 'ticket',
    component: TicketCreateComponent,
    canDeactivate: [LeavePageGuard],
    data: {
      title: 'Ticket - Permintaan Baru',
      description: 'Halaman Permohonan Baru',
      keywords: 'Ajukan Permintaan Permohonan'
    }
  }
];

@NgModule({
  declarations: [
    BerkasCreateComponent,
    FansubCreateComponent,
    MailboxCreateComponent,
    NewsCreateComponent,
    TicketCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    NotificationsModule,
    AngularEditorModule,
    CustomPipeModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class CreateModule { }
