import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';

import { MailboxComposeComponent } from './mailbox-compose/mailbox-compose.component';
import { MailboxDetailComponent } from './mailbox-detail/mailbox-detail.component';
import { MailboxListComponent } from './mailbox-list/mailbox-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MailboxListComponent
  },
  {
    path: 'compose',
    component: MailboxComposeComponent,
    data: {
      title: 'Surel - Buat Baru',
      description: 'Halaman Kirim Surel Baru',
      keywords: 'Buat Surel Baru'
    }
  },
  {
    path: ':mailId',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MailboxDetailComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    MailboxListComponent,
    MailboxComposeComponent,
    MailboxDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule
  ]
})
export class MailboxModule { }
