import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BytesPipe } from './bytes.pipe';
import { DateAgoPipe } from './date-ago.pipe';

@NgModule({
  declarations: [
    BytesPipe,
    DateAgoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BytesPipe,
    DateAgoPipe
  ]
})
export class CustomPipeModule { }
