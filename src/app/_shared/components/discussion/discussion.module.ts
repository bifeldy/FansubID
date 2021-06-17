import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DisqusModule } from 'ngx-disqus';

import { DiscussionComponent } from './discussion.component';

import { CustomPipeModule } from '../../pipes/custom-pipe.module';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

@NgModule({
  declarations: [
    DiscussionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DisqusModule,
    SharedMaterialModule,
    CustomPipeModule
  ],
  exports: [DiscussionComponent]
})
export class DiscussionModule { }
