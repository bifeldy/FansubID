import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from '../../_shared/helpers/shared-material.module';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
