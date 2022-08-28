import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DiscussionComponent } from './discussion.component';

import { CustomPipeModule } from '../../pipes/custom-pipe.module';

import { SharedMaterialModule } from '../../modules/shared-material.module';

import { CustomDirectivesModule } from '../../directives/custom-directive.module';

@NgModule({
  declarations: [
    DiscussionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    CustomPipeModule,
    CustomDirectivesModule
  ],
  exports: [DiscussionComponent]
})
export class DiscussionModule { }
