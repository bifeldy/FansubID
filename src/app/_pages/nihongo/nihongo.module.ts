import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { MaterialFileInputModule } from 'ngx-material-file-input';

import { CONSTANTS } from '../../../constants';

import { RoleModel } from '../../../models/req-res.model';

import { RolesGuard } from '../../_shared/guards/roles.guard';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';

import { NihongoListComponent } from './nihongo-list/nihongo-list.component';
import { NihongoBelajarComponent } from './nihongo-belajar/nihongo-belajar.component';
import { NihongoJlptSchoolComponent } from './nihongo-jlpt-school/nihongo-jlpt-school.component';
import { NihongoTesComponent } from './nihongo-tes/nihongo-tes.component';

import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';
import { BannerDiscordModule } from '../../_shared/components/banner-discord/banner-discord.module';
import { StatsServerModule } from '../../_shared/components/stats-server/stats-server.module';
import { BannerNihongoModule } from '../../_shared/components/banner-nihongo/banner-nihongo.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { RightPanelModule } from '../../_shared/components/right-panel/right-panel.module';
import { QuizModule } from '../../_shared/components/quiz/quiz.module';
import { MaterialTableModule } from '../../_shared/components/material-table/material-table.module';
import { LeaderboardModule } from '../../_shared/components/leaderboard/leaderboard.module';
import { NoDataModule } from '../../_shared/components/no-data/no-data.module';
import { BannerDonasiModule } from '../../_shared/components/banner-donasi/banner-donasi.module';

import { CustomDirectivesModule } from '../../_shared/directives/custom-directive.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NihongoListComponent
  },
  {
    path: 'belajar',
    component: NihongoBelajarComponent,
    data: {
      title: 'Huruf, Angka, Warna, Buah & Sayur, Dan Lingkungan Sekitar',
      description: 'Mengenal Sambil Belajar Berbagai Macam',
      keywords: 'Sesuatu Yang Sering Kita Temukan',
      question: null,
      options: null
    }
  },
  {
    path: 'kanji',
    component: NihongoJlptSchoolComponent,
    data: {
      title: 'Huruf Kanji',
      description: 'Mengenal Huruf Kanji Sesuai Rank JLPT & Sekolah',
      keywords: 'Kanji',
      question: null,
      options: null
    }
  },
  {
    path: 'hiragana',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf Hiragana',
      description: 'Uji Kemampuan Huruf Hiragana',
      keywords: 'Hiragana',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'hiragana',
      options: 'romaji'
    }
  },
  {
    path: 'katakana',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf Katakana',
      description: 'Uji Kemampuan Huruf Katakana',
      keywords: 'Katakana',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'katakana',
      options: 'romaji'
    }
  },
  // {
  //   path: 'angka',
  //   component: NihongoTesComponent,
  //   canActivate: [RolesGuard],
  //   data: {
  //     title: 'Tes Angka',
  //     description: 'Uji Kemampuan Angka',
  //     keywords: 'Angka',
  //     [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
  //     question: 'kanji',
  //     options: 'number'
  //   }
  // },
  {
    path: 'jlpt-n5',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf N5',
      description: 'Uji Kemampuan Huruf N5',
      keywords: 'N5',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'jlpt-n4',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf N4',
      description: 'Uji Kemampuan Huruf N4',
      keywords: 'N4',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'jlpt-n3',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf N3',
      description: 'Uji Kemampuan Huruf N3',
      keywords: 'N3',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'jlpt-n2',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf N2',
      description: 'Uji Kemampuan Huruf N2',
      keywords: 'N2',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'jlpt-n1',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf N1',
      description: 'Uji Kemampuan Huruf N1',
      keywords: 'N1',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-1',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf Kelas 1',
      description: 'Uji Kemampuan Huruf Kelas 1',
      keywords: 'Kelas 1',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-2',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf Kelas 2',
      description: 'Uji Kemampuan Huruf Kelas 2',
      keywords: 'Kelas 2',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-3',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf Kelas 3',
      description: 'Uji Kemampuan Huruf Kelas 3',
      keywords: 'Kelas 3',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-4',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf Kelas 4',
      description: 'Uji Kemampuan Huruf Kelas 4',
      keywords: 'Kelas 4',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-5',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf Kelas 5',
      description: 'Uji Kemampuan Huruf Kelas 5',
      keywords: 'Kelas 5',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-6',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf Kelas 6',
      description: 'Uji Kemampuan Huruf Kelas 6',
      keywords: 'Kelas 6',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-lanjutan-1',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf Lanjutan 1',
      description: 'Uji Kemampuan Huruf Lanjutan 1',
      keywords: 'Lanjutan 1',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-lanjutan-2',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf Lanjutan 2',
      description: 'Uji Kemampuan Huruf Lanjutan 2',
      keywords: 'Lanjutan 2',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'semua-kanji',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Huruf Semua Kanji',
      description: 'Uji Kemampuan Huruf Semua Kanji',
      keywords: 'Semua Kanji',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: ':category',
    component: NihongoTesComponent,
    canActivate: [RolesGuard],
    data: {
      title: 'Tes Kategori Lainnya',
      description: 'Uji Kemampuan Kategori Lainnya',
      keywords: 'Kategori Lainnya',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
      question: 'image_url',
      options: 'kana'
    }
  },
  // {
  //   path: ':category',
  //   component: NihongoPracticeComponent,
  //   data: {
  //     title: 'Latihan Nama-Nama Warna, Buah & Sayur, Dan Lingkungan Sekitar',
  //     description: 'Tebak Gambar Nama-Nama Warna, Buah & Sayur, Dan Lingkungan Sekitar',
  //     keywords: 'Objek Di Sekitar Kita',
  //     [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
  //     question: null,
  //     options: null
  //   }
  // }
];

@NgModule({
  declarations: [
    NihongoListComponent,
    NihongoBelajarComponent,
    NihongoJlptSchoolComponent,
    NihongoTesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NotificationsModule,
    BannerDonasiModule,
    BannerDiscordModule,
    BannerNihongoModule,
    MaterialTabModule,
    SharedMaterialModule,
    MaterialFileInputModule,
    AngularEditorModule,
    StatsServerModule,
    RightPanelModule,
    QuizModule,
    MaterialTableModule,
    CustomDirectivesModule,
    LeaderboardModule,
    NoDataModule
  ]
})
export class NihongoModule { }
