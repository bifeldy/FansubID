import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BytesPipe } from './bytes.pipe';
import { DateAgoPipe } from './date-ago.pipe';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    BytesPipe,
    DateAgoPipe,
    SafeUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BytesPipe,
    DateAgoPipe,
    SafeUrlPipe
  ]
})
export class CustomPipeModule { }
