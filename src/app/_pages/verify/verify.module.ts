import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { SharedMaterialModule } from '../../_shared/modules/shared-material.module';

import { VerifyComponent } from './verify.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VerifyComponent
  }
];

@NgModule({
  declarations: [VerifyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ]
})
export class VerifyModule { }
