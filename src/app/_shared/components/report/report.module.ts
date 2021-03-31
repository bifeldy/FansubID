import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { SharedMaterialModule } from '../../helpers/shared-material.module';

import { ReportComponent } from './report.component';

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ChartsModule,
    SharedMaterialModule
  ],
  exports: [ReportComponent]
})
export class ReportModule { }
