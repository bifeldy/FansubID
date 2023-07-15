import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialFileInputModule } from 'ngx-material-file-input';
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

import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NewsListComponent } from './news-list/news-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NewsListComponent
  },
  {
    path: ':newsId',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: NewsDetailComponent
      },
      {
        path: 'edit',
        component: NewsEditComponent,
        canActivate: [VerifiedGuard, RolesGuard],
        data: {
          title: 'Berita - Ubah Data',
          description: 'Halaman Pembaharuan Data Berita',
          keywords: 'Ubah Berita',
          [CONSTANTS.decoratorVerifiedOnly]: true,
          [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR]
        }
      }
    ]
  }
];

@NgModule({
  declarations: [
    NewsListComponent,
    NewsDetailComponent,
    NewsEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
export class NewsModule { }
