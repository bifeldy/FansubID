import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CONSTANTS } from '../../../constants';

import { RolesGuard } from '../../_shared/guards/roles.guard';
import { VerifiedGuard } from '../../_shared/guards/verified.guard';

import { RoleModel } from '../../../models/req-res.model';

import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TicketListComponent,
    canActivate: [VerifiedGuard, RolesGuard],
    data: {
      title: 'Ticket Ajuan Permohonan',
      description: 'Progress Laporan',
      keywords: 'Ticket',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER]
    }
  },
  {
    path: ':ticketId',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TicketDetailComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    TicketListComponent,
    TicketDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TicketModule { }
