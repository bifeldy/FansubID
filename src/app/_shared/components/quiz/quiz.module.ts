import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { QuizComponent } from './quiz.component';

import { SharedMaterialModule } from '../../helpers/shared-material.module';
import { RightPanelModule } from '../right-panel/right-panel.module';

@NgModule({
  declarations: [QuizComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    RightPanelModule
  ],
  exports: [QuizComponent]
})
export class QuizModule { }
