import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CustomPipeModule } from '../../_shared/pipes/custom-pipe.module';

import { PrivacyPolicyComponent } from './privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CustomPipeModule
  ]
})
export class PrivacyPolicyModule { }
