import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsServerComponent } from './stats-server.component';

@NgModule({
  declarations: [StatsServerComponent],
  imports: [
    CommonModule
  ],
  exports: [StatsServerComponent]
})
export class StatsServerModule { }
