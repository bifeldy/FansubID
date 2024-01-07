import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BytesPipe } from './bytes.pipe';
import { DateAgoPipe } from './date-ago.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { SafeInnerHtmlPipe } from './safe-inner-html.pipe';

@NgModule({
  declarations: [
    BytesPipe,
    DateAgoPipe,
    SafeUrlPipe,
    SafeInnerHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BytesPipe,
    DateAgoPipe,
    SafeUrlPipe,
    SafeInnerHtmlPipe
  ]
})
export class CustomPipeModule { }
