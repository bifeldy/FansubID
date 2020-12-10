import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HiraganaListComponent } from './hiragana-list/hiragana-list.component';
import { HiraganaDetailComponent } from './hiragana-detail/hiragana-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HiraganaListComponent
  },
  {
    path: ':hiraganaId',
    component: HiraganaDetailComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class HiraganaModule { }
