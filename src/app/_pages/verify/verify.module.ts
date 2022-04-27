import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { RoleModel } from '../../../models/req-res.model';

import { AuthGuard } from '../../_shared/helpers/auth-guard';

import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';

import { VerifyComponent } from './verify.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VerifyComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [RoleModel.ADMIN, RoleModel.FANSUBBER, RoleModel.MODERATOR, RoleModel.USER]
    }
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
