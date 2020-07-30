import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  //   canActivate: [AuthGuardService],
  //   data: {
  //     title: 'Admin Panel',
  //     description: 'Halaman Khusus Untuk Administrasi',
  //     keywords: 'Blockchain E-Voting',
  //     roles: [Role.Admin]
  //   }
  // },
  {
    path: 'home',
    loadChildren: () => import('./_pages/home/home.module').then(m => m.HomeModule),
    data: {
      title: 'Home Page',
      description: 'Halaman Beranda',
      keywords: 'Beranda',
      roles: []
    }
  },
  {
    path: 'anime',
    loadChildren: () => import('./_pages/anime/anime.module').then(m => m.AnimeModule),
    data: {
      title: 'Anime Page',
      description: 'Halaman Anime',
      keywords: 'Anime',
      roles: []
    }
  },
  {
    path: 'fansub',
    loadChildren: () => import('./_pages/fansub/fansub.module').then(m => m.FansubModule),
    data: {
      title: 'Fansub Page',
      description: 'Halaman Fansub',
      keywords: 'Fansub',
      roles: []
    }
  },
  {
    path: 'about',
    loadChildren: () => import('./_pages/about/about.module').then(m => m.AboutModule),
    data: {
      title: 'About Page',
      description: 'Halaman Mengenai Website',
      keywords: 'About',
      roles: []
    }
  },
  {
    path: '**',
    redirectTo: 'home'
    // loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
