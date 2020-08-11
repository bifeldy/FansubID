import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BerkasCreateComponent } from './berkas-create/berkas-create.component';
import { BerkasDetailComponent } from './berkas-detail/berkas-detail.component';
import { BerkasEditComponent } from './berkas-edit/berkas-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: BerkasCreateComponent,
    // canActivate: [AuthGuard],
    data: {
      title: 'Berkas - Buat Baru',
      description: 'Halaman Unggah Berkas Baru',
      keywords: 'Tambah Berkas Baru',
      // roles: [Role.ADMIN, Role.FANSUBBER, Role.MODERATOR, Role.USER]
    }
  },
  {
    path: ':berkasId/edit',
    component: BerkasEditComponent,
    // canActivate: [AuthGuard],
    data: {
      title: 'Berkas - Ubah Data',
      description: 'Halaman Pembaharuan Data Fansub',
      keywords: 'Ubah Berkas',
      // roles: [Role.ADMIN, Role.FANSUBBER, Role.MODERATOR, Role.USER]
    }
  },
  {
    path: ':berkasId',
    component: BerkasDetailComponent
  }
];

@NgModule({
  declarations: [
    BerkasCreateComponent,
    BerkasDetailComponent,
    BerkasEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BerkasModule { }
