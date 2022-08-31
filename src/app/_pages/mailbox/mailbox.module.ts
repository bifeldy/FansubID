import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';

import { MailboxListComponent } from './mailbox-list/mailbox-list.component';
import { MailboxComposeComponent } from './mailbox-compose/mailbox-compose.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MailboxListComponent
  }
];

@NgModule({
  declarations: [
    MailboxListComponent,
    MailboxComposeComponent
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
