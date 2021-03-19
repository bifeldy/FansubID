import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AuthGuard } from '../../_shared/helpers/auth-guard';
import { Role } from '../../_shared/models/Role';

import { NihongoListComponent } from './nihongo-list/nihongo-list.component';
import { HirakataComponent } from './hirakata/hirakata.component';
import { HiraganaComponent } from './hiragana/hiragana.component';
import { KatakanaComponent } from './katakana/katakana.component';
import { AngkaComponent } from './angka/angka.component';
import { KanjiComponent } from './kanji/kanji.component';
import { NihongoBookDetailComponent } from './nihongo-book-detail/nihongo-book-detail.component';
import { NihongoBookCreateComponent } from './nihongo-book-create/nihongo-book-create.component';
import { NihongoChapterCreateComponent } from './nihongo-chapter-create/nihongo-chapter-create.component';
import { NihongoChapterDetailComponent } from './nihongo-chapter-detail/nihongo-chapter-detail.component';

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
    component: KanjiComponent,
    data: {
      title: 'Huruf Kanji',
      description: 'Mengenal Huruf Kanji Sesuai Rank JLPT & Sekolah',
      keywords: 'Kanji'
    }
  },
  {
    path: 'create',
    component: NihongoBookCreateComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Buku Pendukung - Buat Baru',
      description: 'Halaman Menambahkan Pendukung Belajar',
      keywords: 'Create Book',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER]
    }
  },
  // {
  //   path: ':bookId/edit',
  //   component: NihongoBookEditComponent,
    // canActivate: [AuthGuard],
  //   data: {
  //     title: 'Buku Pendukung - Ubah Buku',
  //     description: 'Ubah Buku Pendukung Belajar',
  //     keywords: 'Book',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER]
  //   }
  // },
  {
    path: ':bookId/create',
    component: NihongoChapterCreateComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Bagian Buku - Buat Baru',
      description: 'Halaman Menambahkan Bagian Dalam Buku',
      keywords: 'Create Chapter',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER]
    }
  },
  // {
  //   path: ':bookId/:chapterId/edit',
  //   component: NihongoChapterEditComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Bagian Buku - Ubah Bab',
  //     description: 'Tambah Bab Bagian Dalam Buku',
  //     keywords: 'Chapter',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER]
  //   }
  // },
  {
    path: ':bookId/:chapterId',
    component: NihongoChapterDetailComponent
  },
  {
    path: ':bookId',
    component: NihongoBookDetailComponent
  },
];

@NgModule({
  declarations: [
    NihongoListComponent,
    HirakataComponent,
    HiraganaComponent,
    KatakanaComponent,
    AngkaComponent,
    KanjiComponent,
    NihongoBookDetailComponent,
    NihongoBookCreateComponent,
    NihongoChapterCreateComponent,
    NihongoChapterDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NotificationsModule,
    BannerDiscordModule,
    BannerNihongoModule,
    MaterialTabModule,
    SharedMaterialModule,
    MaterialFileInputModule,
    AngularEditorModule,
    StatsServerModule
  ]
})
export class NihongoModule { }
