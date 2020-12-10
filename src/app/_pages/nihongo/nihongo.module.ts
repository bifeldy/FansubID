import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NihongoListComponent } from './nihongo-list/nihongo-list.component';

import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { BannerModule } from '../../_shared/components/banner/banner.module';
import { StatsServerModule } from '../../_shared/components/stats-server/stats-server.module';

const routes: Routes = [
  {
    path: '',
    component: NihongoListComponent
  },
  {
    path: 'hiragana',
    loadChildren: () => import('./hiragana/hiragana.module').then(m => m.HiraganaModule),
    data: {
      title: 'Huruf Hiragana',
      description: 'Belajar Dan Mengenal Huruf Hiragana',
      keywords: 'Hiragana'
    }
  },
  {
    path: 'katakana',
    loadChildren: () => import('./katakana/katakana.module').then(m => m.KatakanaModule),
    data: {
      title: 'Huruf Katakana',
      description: 'Belajar Dan Mengenal Huruf Katakana',
      keywords: 'Katakana'
    }
  },
  {
    path: 'kanji',
    loadChildren: () => import('./kanji/kanji.module').then(m => m.KanjiModule),
    data: {
      title: 'Huruf Kanji',
      description: 'Belajar Dan Mengenal Huruf Kanji',
      keywords: 'Kanji'
    }
  }
];

@NgModule({
  declarations: [
    NihongoListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NotificationsModule,
    BannerModule,
    StatsServerModule,
  ]
})
export class NihongoModule { }
