import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VjsPlayerComponent } from './vjs-player.component';

@NgModule({
  declarations: [VjsPlayerComponent],
  imports: [
    CommonModule
  ],
  exports: [VjsPlayerComponent]
})
export class VjsPlayerModule { }
