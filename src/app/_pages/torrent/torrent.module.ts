import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TorrentComponent } from './torrent.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TorrentComponent
  }
];

@NgModule({
  declarations: [
    TorrentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TorrentModule { }
