import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsServerComponent } from './stats-server.component';

import { CustomPipeModule } from '../../pipes/custom-pipe.module';

import { SharedMaterialModule } from '../../modules/shared-material.module';

@NgModule({
  declarations: [StatsServerComponent],
  imports: [
    CommonModule,
    CustomPipeModule,
    SharedMaterialModule
  ],
  exports: [StatsServerComponent]
})
export class StatsServerModule { }
