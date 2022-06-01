import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { LeaderboardComponent } from './leaderboard.component';

@NgModule({
  declarations: [LeaderboardComponent],
  imports: [
    CommonModule,
    SharedMaterialModule
  ],
  exports: [LeaderboardComponent]
})
export class LeaderboardModule { }
