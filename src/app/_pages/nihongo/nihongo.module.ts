import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NihongoListComponent } from './nihongo-list/nihongo-list.component';
import { HirakataComponent } from './hirakata/hirakata.component';
import { HiraganaComponent } from './hiragana/hiragana.component';
import { KatakanaComponent } from './katakana/katakana.component';
import { AngkaComponent } from './angka/angka.component';

import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { BannerDiscordModule } from '../../_shared/components/banner-discord/banner-discord.module';
import { StatsServerModule } from '../../_shared/components/stats-server/stats-server.module';
import { BannerNihongoModule } from '../../_shared/components/banner-nihongo/banner-nihongo.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NihongoListComponent
  },
  {
    path: 'hirakata',
    component: HirakataComponent,
    data: {
      title: 'Huruf Hiragana & Katakana',
      description: 'Mengenal Huruf Hiragana & Katakana',
      keywords: 'Hiragana, Katakana'
    }
  },
  {
    path: 'hiragana',
    component: HiraganaComponent,
    data: {
      title: 'Tes Huruf Hiragana',
      description: 'Uji Kemampuan Huruf Hiragana',
      keywords: 'Hiragana'
    }
  },
  {
    path: 'katakana',
    component: KatakanaComponent,
    data: {
      title: 'Tes Huruf Katakana',
      description: 'Uji Kemampuan Huruf Katakana',
      keywords: 'Katakana'
    }
  },
  {
    path: 'angka',
    component: AngkaComponent,
    data: {
      title: 'Tes Angka',
      description: 'Uji Kemampuan Angka',
      keywords: 'Angka'
    }
  },
  {
    path: 'kanji',
    loadChildren: () => import('./kanji/kanji.module').then(m => m.KanjiModule),
    data: {
      title: 'Huruf Kanji',
      description: 'Mengenal Huruf Kanji Sesuai Rank JLPT & Sekolah',
      keywords: 'Kanji'
    }
  }
];

@NgModule({
  declarations: [
    NihongoListComponent,
    HirakataComponent,
    HiraganaComponent,
    KatakanaComponent,
    AngkaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NotificationsModule,
    BannerDiscordModule,
    BannerNihongoModule,
    MaterialTabModule,
    SharedMaterialModule,
    StatsServerModule
  ]
})
export class NihongoModule { }
