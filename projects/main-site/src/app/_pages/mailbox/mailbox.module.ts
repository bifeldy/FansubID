import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';

import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { MailboxDetailComponent } from './mailbox-detail/mailbox-detail.component';
import { MailboxListComponent } from './mailbox-list/mailbox-list.component';

import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { MaterialTableModule } from '../../_shared/components/material-table/material-table.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MailboxListComponent
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
    MailboxDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    NotificationsModule,
    MaterialTableModule,
    CustomPipeModule
  ]
})
export class MailboxModule { }
