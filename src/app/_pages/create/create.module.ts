import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';

import { BerkasCreateComponent } from '../create/berkas-create/berkas-create.component';
import { FansubCreateComponent } from '../create/fansub-create/fansub-create.component';
import { MailboxCreateComponent } from '../create/mailbox-create/mailbox-create.component';
import { NewsCreateComponent } from '../create/news-create/news-create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'berkas',
    component: BerkasCreateComponent,
    data: {
      title: 'Berkas - Buat Baru',
      description: 'Halaman Unggah Berkas Baru',
      keywords: 'Tambah Berkas Baru'
    }
  },
  {
    path: 'fansub',
    component: FansubCreateComponent,
    data: {
      title: 'Fansub - Buat Baru',
      description: 'Halaman Menambahkan Fansub Baru',
      keywords: 'Create Fansub'
    }
  },
  {
    path: 'mailbox',
    component: MailboxCreateComponent,
    data: {
      title: 'Surel - Buat Baru',
      description: 'Halaman Kirim Surel Baru',
      keywords: 'Buat Surel Baru'
    }
  },
  {
    path: 'news',
    component: NewsCreateComponent,
    data: {
      title: 'Berita - Buat Baru',
      description: 'Halaman Unggah Berita Baru',
      keywords: 'Tambah Berita Baru'
    }
  }
];

@NgModule({
  declarations: [
    BerkasCreateComponent,
    FansubCreateComponent,
    MailboxCreateComponent,
    NewsCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    NotificationsModule,
    AngularEditorModule
  ]
})
export class CreateModule { }
