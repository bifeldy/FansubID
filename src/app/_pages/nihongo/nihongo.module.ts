import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AuthGuard } from '../../_shared/helpers/auth-guard';
import { Role } from '../../_shared/models/Role';

import { NihongoListComponent } from './nihongo-list/nihongo-list.component';
import { NihongoBelajarComponent } from './nihongo-belajar/nihongo-belajar.component';
import { NihongoJlptSchoolComponent } from './nihongo-jlpt-school/nihongo-jlpt-school.component';
import { NihongoTesComponent } from './nihongo-tes/nihongo-tes.component';
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
import { RightPanelModule } from '../../_shared/components/right-panel/right-panel.module';
import { QuizModule } from '../../_shared/components/quiz/quiz.module';
import { MaterialTableModule } from '../../_shared/components/material-table/material-table.module';

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
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf Hiragana',
      description: 'Uji Kemampuan Huruf Hiragana',
      keywords: 'Hiragana',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'hiragana',
      options: 'romaji'
    }
  },
  {
    path: 'katakana',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf Katakana',
      description: 'Uji Kemampuan Huruf Katakana',
      keywords: 'Katakana',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'katakana',
      options: 'romaji'
    }
  },
  // {
  //   path: 'angka',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Angka',
  //     description: 'Uji Kemampuan Angka',
  //     keywords: 'Angka',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: 'kanji',
  //     options: 'number'
  //   }
  // },
  // {
  //   path: 'warna',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Warna',
  //     description: 'Uji Kemampuan Warna',
  //     keywords: 'Warna',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'binatang',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Binatang',
  //     description: 'Uji Kemampuan Binatang',
  //     keywords: 'Binatang',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'buah',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Buah',
  //     description: 'Uji Kemampuan Buah',
  //     keywords: 'Buah',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'sayur',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Sayur',
  //     description: 'Uji Kemampuan Sayur',
  //     keywords: 'Sayur',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'daging',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Daging',
  //     description: 'Uji Kemampuan Daging',
  //     keywords: 'Daging',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'minuman',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Minuman',
  //     description: 'Uji Kemampuan Minuman',
  //     keywords: 'Minuman',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'pakaian',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Pakaian',
  //     description: 'Uji Kemampuan Pakaian',
  //     keywords: 'Pakaian',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'cuaca',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Cuaca',
  //     description: 'Uji Kemampuan Cuaca',
  //     keywords: 'Cuaca',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'transportasi',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Transportasi',
  //     description: 'Uji Kemampuan Transportasi',
  //     keywords: 'Transportasi',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'tempat',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Tempat',
  //     description: 'Uji Kemampuan Tempat',
  //     keywords: 'Tempat',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'pekerjaan',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Pekerjaan',
  //     description: 'Uji Kemampuan Pekerjaan',
  //     keywords: 'Pekerjaan',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'olah-raga',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Olahraga',
  //     description: 'Uji Kemampuan Olahraga',
  //     keywords: 'Olahraga',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'perkakas',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Perkakas',
  //     description: 'Uji Kemampuan Perkakas',
  //     keywords: 'Perkakas',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'mebel',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Mebel',
  //     description: 'Uji Kemampuan Mebel',
  //     keywords: 'Mebel',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'dapur',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Dapur',
  //     description: 'Uji Kemampuan Dapur',
  //     keywords: 'Dapur',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  // {
  //   path: 'negara',
  //   component: NihongoTesComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Tes Negara',
  //     description: 'Uji Kemampuan Negara',
  //     keywords: 'Negara',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: ,
  //     options: 
  //   }
  // },
  {
    path: 'jlpt-n5',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf N5',
      description: 'Uji Kemampuan Huruf N5',
      keywords: 'N5',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'jlpt-n4',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf N4',
      description: 'Uji Kemampuan Huruf N4',
      keywords: 'N4',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'jlpt-n3',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf N3',
      description: 'Uji Kemampuan Huruf N3',
      keywords: 'N3',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'jlpt-n2',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf N2',
      description: 'Uji Kemampuan Huruf N2',
      keywords: 'N2',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'jlpt-n1',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf N1',
      description: 'Uji Kemampuan Huruf N1',
      keywords: 'N1',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-1',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf Kelas 1',
      description: 'Uji Kemampuan Huruf Kelas 1',
      keywords: 'Kelas 1',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-2',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf Kelas 2',
      description: 'Uji Kemampuan Huruf Kelas 2',
      keywords: 'Kelas 2',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-3',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf Kelas 3',
      description: 'Uji Kemampuan Huruf Kelas 3',
      keywords: 'Kelas 3',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-4',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf Kelas 4',
      description: 'Uji Kemampuan Huruf Kelas 4',
      keywords: 'Kelas 4',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-5',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf Kelas 5',
      description: 'Uji Kemampuan Huruf Kelas 5',
      keywords: 'Kelas 5',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-6',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf Kelas 6',
      description: 'Uji Kemampuan Huruf Kelas 6',
      keywords: 'Kelas 6',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-lanjutan-1',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf Lanjutan 1',
      description: 'Uji Kemampuan Huruf Lanjutan 1',
      keywords: 'Lanjutan 1',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'kelas-lanjutan-2',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf Lanjutan 2',
      description: 'Uji Kemampuan Huruf Lanjutan 2',
      keywords: 'Lanjutan 2',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  {
    path: 'semua-kanji',
    component: NihongoTesComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Tes Huruf Semua Kanji',
      description: 'Uji Kemampuan Huruf Semua Kanji',
      keywords: 'Semua Kanji',
      roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
      question: 'character',
      options: 'translate'
    }
  },
  // {
  //   path: 'create',
  //   component: NihongoBookCreateComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Buku Pendukung - Buat Baru',
  //     description: 'Halaman Menambahkan Pendukung Belajar',
  //     keywords: 'Create Book',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: null,
  //     options: null
  //   }
  // },
  // {
  //   path: ':bookId/edit',
  //   component: NihongoBookEditComponent,
    // canActivate: [AuthGuard],
  //   data: {
  //     title: 'Buku Pendukung - Ubah Buku',
  //     description: 'Ubah Buku Pendukung Belajar',
  //     keywords: 'Book',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: null,
  //     options: null
  //   }
  // },
  // {
  //   path: ':bookId/create',
  //   component: NihongoChapterCreateComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Bagian Buku - Buat Baru',
  //     description: 'Halaman Menambahkan Bagian Dalam Buku',
  //     keywords: 'Create Chapter',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: null,
  //     options: null
  //   }
  // },
  // {
  //   path: ':bookId/:chapterId/edit',
  //   component: NihongoChapterEditComponent,
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'Bagian Buku - Ubah Bab',
  //     description: 'Tambah Bab Bagian Dalam Buku',
  //     keywords: 'Chapter',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER],
  //     question: null,
  //     options: null
  //   }
  // },
  // {
  //   path: ':bookId/:chapterId',
  //   component: NihongoChapterDetailComponent,
  //   data: {
  //     question: null,
  //     options: null
  //   }
  // },
  // {
  //   path: ':bookId',
  //   component: NihongoBookDetailComponent,
  //   data: {
  //     question: null,
  //     options: null
  //   }
  // },
];

@NgModule({
  declarations: [
    NihongoListComponent,
    NihongoBelajarComponent,
    NihongoJlptSchoolComponent,
    NihongoTesComponent,
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
    StatsServerModule,
    RightPanelModule,
    QuizModule,
    MaterialTableModule
  ]
})
export class NihongoModule { }
