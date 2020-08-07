import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  //   canActivate: [AuthGuardService],
  //   data: {
  //     title: 'Admin Panel Management',
  //     description: 'Halaman Khusus Untuk Administrasi',
  //     keywords: 'Admin Fansub Database',
  //     roles: [Role.Admin]
  //   }
  // },
  {
    path: 'login',
    loadChildren: () => import('./_pages/login/login.module').then(m => m.LoginModule),
    data: {
      title: 'Masuk',
      description: 'Halaman Login',
      keywords: 'Login',
      roles: []
    }
  },
  {
    path: 'register',
    loadChildren: () => import('./_pages/register/register.module').then(m => m.RegisterModule),
    data: {
      title: 'Pendaftaran',
      description: 'Halaman Pembuatan Akun Baru',
      keywords: 'Register',
      roles: []
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./_pages/home/home.module').then(m => m.HomeModule),
    data: {
      title: 'Beranda',
      description: 'Halaman Beranda',
      keywords: 'Beranda',
      roles: []
    }
  },
  {
    path: 'anime',
    loadChildren: () => import('./_pages/anime/anime.module').then(m => m.AnimeModule),
    data: {
      title: 'List Anime & Garapan Musiman',
      description: 'Daftar Isi Anime Musiman Yang Baru Saja Rilis Subtitle Indonesianya',
      keywords: 'Anime Subtitle Indonesia',
      roles: []
    }
  },
  {
    path: 'fansub',
    loadChildren: () => import('./_pages/fansub/fansub.module').then(m => m.FansubModule),
    data: {
      title: 'Katalog Informasi Seluruh Fansub Indonesia',
      description: 'Daftar Isi Seluruh Fansub Indonesia',
      keywords: 'Fansub Indonesia',
      roles: []
    }
  },
  {
    path: 'about',
    loadChildren: () => import('./_pages/about/about.module').then(m => m.AboutModule),
    data: {
      title: 'About',
      description: 'Halaman Mengenai Website',
      keywords: 'About',
      roles: []
    }
  },
  {
    path: 'error',
    loadChildren: () => import('./_pages/not-found/not-found.module').then(m => m.NotFoundModule),
    data: {
      title: 'Error - 404',
      description: 'Whoops! Halaman Tidak Ditemukan',
      keywords: '404 - Not Found',
      roles: []
    }
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
