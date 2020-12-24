import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NihongoListComponent } from './nihongo-list/nihongo-list.component';
import { HirakataComponent } from './hirakata/hirakata.component';

import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { BannerModule } from '../../_shared/components/banner/banner.module';
import { StatsServerModule } from '../../_shared/components/stats-server/stats-server.module';
import { BannerNihongoModule } from '../../_shared/components/banner-nihongo/banner-nihongo.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';

const routes: Routes = [
  {
    path: '',
    component: NihongoListComponent
  },
  {
    path: 'hirakata',
    component: HirakataComponent,
    data: {
      title: 'Huruf Hiragana',
      description: 'Mengenal Huruf Hiragana & Katakana',
      keywords: 'Hiragana, Katakana'
    }
  },
  {
    path: 'kanji',
    loadChildren: () => import('./kanji/kanji.module').then(m => m.KanjiModule),
    data: {
      title: 'Huruf Kanji',
      description: 'Mengenal Huruf Kanji',
      keywords: 'Kanji'
    }
  }
];

@NgModule({
  declarations: [
    NihongoListComponent,
    HirakataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NotificationsModule,
    BannerModule,
    BannerNihongoModule,
    MaterialTabModule,
    StatsServerModule
  ]
})
export class NihongoModule { }
