import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialFileInputModule } from 'ngx-custom-material-file-input';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { CONSTANTS } from '../../../constants';

import { RoleModel } from '../../../models/req-res.model';

import { RolesGuard } from '../../_shared/guards/roles.guard';
import { VerifiedGuard } from '../../_shared/guards/verified.guard';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';

import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { MaterialChipModule } from '../../_shared/components/material-chip/material-chip.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { StatsServerModule } from '../../_shared/components/stats-server/stats-server.module';
import { BannerDiscordModule } from '../../_shared/components/banner-discord/banner-discord.module';
import { DiscussionModule } from '../../_shared/components/discussion/discussion.module';
import { BannerDonasiModule } from '../../_shared/components/banner-donasi/banner-donasi.module';

import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TicketListComponent,
    canActivate: [VerifiedGuard, RolesGuard],
    data: {
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
    RouterModule.forChild(routes),
    BannerDonasiModule,
    SharedMaterialModule,
    MaterialTabModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    NotificationsModule,
    AngularEditorModule,
    BannerDiscordModule,
    StatsServerModule,
    MaterialChipModule,
    DiscussionModule,
    CustomPipeModule
  ]
})
export class TicketModule { }
