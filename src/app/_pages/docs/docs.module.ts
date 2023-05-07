import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NgxTypedJsModule } from 'ngx-typed-js';

import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { BannerDiscordModule } from '../../_shared/components/banner-discord/banner-discord.module';
import { StatsServerModule } from '../../_shared/components/stats-server/stats-server.module';
import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';

import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { DocsComponent } from './docs.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DocsComponent
  }
];

@NgModule({
  declarations: [DocsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BannerDiscordModule,
    StatsServerModule,
    NotificationsModule,
    SharedMaterialModule,
    NgxTypedJsModule,
    CustomPipeModule
  ]
})
export class DocsModule { }
