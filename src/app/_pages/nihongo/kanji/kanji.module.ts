import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { KanjiListComponent } from './kanji-list/kanji-list.component';
import { KanjiDetailComponent } from './kanji-detail/kanji-detail.component';

import { NotificationsModule } from '../../../_shared/components/notifications/notifications.module';
import { SharedMaterialModule } from '../../../_shared/helpers/shared-material.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: KanjiListComponent
  },
  {
    path: ':kanjiId',
    component: KanjiDetailComponent
  }
];

@NgModule({
  declarations: [
    KanjiListComponent,
    KanjiDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NotificationsModule,
    SharedMaterialModule
  ]
})
export class KanjiModule { }
