import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RssFeedListComponent } from './rss-feed-list.component';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';

import { BannerDiscordModule } from '../../_shared/components/banner-discord/banner-discord.module';
import { DiscussionModule } from '../../_shared/components/discussion/discussion.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { StatsServerModule } from '../../_shared/components/stats-server/stats-server.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RssFeedListComponent
  }
];

@NgModule({
  declarations: [
    RssFeedListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    MaterialTabModule,
    NotificationsModule,
    BannerDiscordModule,
    StatsServerModule,
    DiscussionModule
  ]
})
export class RssFeedModule { }
