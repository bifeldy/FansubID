import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { KanjiListComponent } from './kanji-list/kanji-list.component';
import { KanjiDetailComponent } from './kanji-detail/kanji-detail.component';

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
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class KanjiModule { }
