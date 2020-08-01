import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { MaterialExpansionPanelModule } from '../../_shared/components/material-expansion-panel/material-expansion-panel.module';

import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeListComponent
  },
  {
    path: ':animeId',
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
    RouterModule.forChild(routes),
    SharedMaterialModule,
    MaterialTabModule,
    MaterialExpansionPanelModule
  ]
})
export class AnimeModule { }
