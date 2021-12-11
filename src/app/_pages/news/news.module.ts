import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AuthGuard } from '../../_shared/helpers/auth-guard';
import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';

import { Role } from '../../_shared/models/Role';

import { MaterialChipModule } from '../../_shared/components/material-chip/material-chip.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { StatsServerModule } from '../../_shared/components/stats-server/stats-server.module';
import { BannerDiscordModule } from '../../_shared/components/banner-discord/banner-discord.module';
import { DiscussionModule } from '../../_shared/components/discussion/discussion.module';

import { NewsCreateComponent } from './news-create/news-create.component';
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
    path: 'create',
    component: NewsCreateComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Berkas - Buat Baru',
      description: 'Halaman Unggah Berkas Baru',
      keywords: 'Tambah Berkas Baru',
      roles: [Role.ADMIN, Role.MODERATOR]
    }
  },
  {
    path: ':newsId/edit',
    component: NewsEditComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Berkas - Ubah Data',
      description: 'Halaman Pembaharuan Data Fansub',
      keywords: 'Ubah Berkas',
      roles: [Role.ADMIN, Role.MODERATOR]
    }
  },
  {
    path: ':newsId',
    component: NewsDetailComponent
  }
];

@NgModule({
  declarations: [
    NewsCreateComponent,
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
    DiscussionModule
  ]
})
export class NewsModule { }
