import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommentComponent } from './comment/comment.component';
import { DiscussionComponent } from './discussion.component';
import { HighlightComponent } from './highlight/highlight.component';

import { CustomPipeModule } from '../../pipes/custom-pipe.module';

import { SharedMaterialModule } from '../../modules/shared-material.module';

import { NoDataModule } from '../no-data/no-data.module';

import { CustomDirectivesModule } from '../../directives/custom-directive.module';

@NgModule({
  declarations: [
    CommentComponent,
    DiscussionComponent,
    HighlightComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    CustomPipeModule,
    CustomDirectivesModule,
    NoDataModule
  ],
  exports: [DiscussionComponent]
})
export class DiscussionModule { }
