import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }
