import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { StatsServerModule } from '../../_shared/components/stats-server/stats-server.module';
import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';
import { BannerDiscordModule } from '../../_shared/components/banner-discord/banner-discord.module';
import { BannerNihongoModule } from '../../_shared/components/banner-nihongo/banner-nihongo.module';
import { NoDataModule } from '../../_shared/components/no-data/no-data.module';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BannerDiscordModule,
    BannerNihongoModule,
    StatsServerModule,
    NotificationsModule,
    SharedMaterialModule,
    CustomPipeModule,
    NoDataModule
  ]
})
export class HomeModule { }
