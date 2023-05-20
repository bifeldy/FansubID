import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsServerComponent } from './stats-server.component';

import { CustomPipeModule } from '../../pipes/custom-pipe.module';

@NgModule({
  declarations: [StatsServerComponent],
  imports: [
    CommonModule,
    CustomPipeModule
  ],
  exports: [StatsServerComponent]
})
export class StatsServerModule { }
