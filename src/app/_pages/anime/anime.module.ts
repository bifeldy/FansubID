import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';
import { MaterialTabModule } from '../../_shared/components/material-tab/material-tab.module';
import { MaterialChipModule } from '../../_shared/components/material-chip/material-chip.module';
import { MaterialExpansionPanelModule } from '../../_shared/components/material-expansion-panel/material-expansion-panel.module';
import { CardAnimeDoramaModule } from '../../_shared/components/card-anime-dorama/card-anime-dorama.module';
import { NotificationsModule } from '../../_shared/components/notifications/notifications.module';

import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeDetailComponent } from './anime-detail/anime-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
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
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    MaterialTabModule,
    MaterialExpansionPanelModule,
    MaterialChipModule,
    CardAnimeDoramaModule,
    NotificationsModule
  ]
})
export class AnimeModule { }
