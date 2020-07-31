import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeListComponent
  },
  {
    path: ':id',
    component: AnimeDetailComponent
  }
];

@NgModule({
  declarations: [
    AnimeListComponent,
    AnimeDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AnimeModule { }
