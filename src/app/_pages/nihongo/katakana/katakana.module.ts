import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { KatakanaListComponent } from './katakana-list/katakana-list.component';
import { KatakanaDetailComponent } from './katakana-detail/katakana-detail.component';

const routes: Routes = [
  {
    path: '',
    component: KatakanaListComponent
  },
  {
    path: ':katakanaId',
    component: KatakanaDetailComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class KatakanaModule { }
