import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisqusModule } from 'ngx-disqus';

import { DiscussionComponent } from './discussion.component';

@NgModule({
  declarations: [DiscussionComponent],
  imports: [
    CommonModule,
    DisqusModule
  ],
  exports: [DiscussionComponent]
})
export class DiscussionModule { }
