import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedMaterialModule } from '../../modules/shared-material.module';

import { LeaderboardComponent } from './leaderboard.component';

@NgModule({
  declarations: [LeaderboardComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule
  ],
  exports: [LeaderboardComponent]
})
export class LeaderboardModule { }
