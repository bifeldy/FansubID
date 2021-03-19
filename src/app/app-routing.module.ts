import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_shared/helpers/auth-guard';
import { Role } from './_shared/models/Role';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'admin-mod',
    loadChildren: () => import('./_pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: {
      title: 'Admin & Moderator Panel Management',
      description: 'Halaman Khusus Untuk Administrasi & Moderasi',
      keywords: 'Admin Moderator Fansub Database',
      roles: [Role.ADMIN, Role.MODERATOR]
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./_pages/login/login.module').then(m => m.LoginModule),
    data: {
      title: 'Masuk',
      description: 'Halaman Login',
      keywords: 'Login'
    }
  },
  {
    path: 'register',
    loadChildren: () => import('./_pages/register/register.module').then(m => m.RegisterModule),
    data: {
      title: 'Pendaftaran',
      description: 'Halaman Pembuatan Akun Baru',
      keywords: 'Register'
    }
  },
  {
    path: 'verify',
    loadChildren: () => import('./_pages/verify/verify.module').then(m => m.VerifyModule),
    data: {
      title: 'Verifikasi',
      description: 'Halaman Verifikasi Akun',
      keywords: 'Verify'
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./_pages/home/home.module').then(m => m.HomeModule),
    data: {
      title: 'Beranda',
      description: 'Halaman Beranda',
      keywords: 'Beranda'
    }
  },
  {
    path: 'news',
    loadChildren: () => import('./_pages/news/news.module').then(m => m.NewsModule),
    data: {
      title: 'Berita & Informasi',
      description: 'Papan Pengumuman',
      keywords: 'News'
    }
  },
  {
    path: 'nihongo',
    loadChildren: () => import('./_pages/nihongo/nihongo.module').then(m => m.NihongoModule),
    data: {
      title: 'Belajar Bahasa Jepang',
      description: 'Jejepangan Lebih Seru Dengan Bahasa Aslinya',
      keywords: 'Bahasa Jepang'
    }
  },
  {
    path: 'berkas',
    loadChildren: () => import('./_pages/berkas/berkas.module').then(m => m.BerkasModule),
    data: {
      title: 'Semua Berkas',
      description: 'Kelola Arsip Berkas',
      keywords: 'Berkas File'
    }
  },
  {
    path: 'anime',
    loadChildren: () => import('./_pages/anime/anime.module').then(m => m.AnimeModule),
    data: {
      title: 'List Anime & Garapan Musiman',
      description: 'Daftar Isi Anime Musiman Yang Baru Saja Rilis Subtitle Indonesianya',
      keywords: 'Anime Subtitle Indonesia'
    }
  },
  {
    path: 'dorama',
    loadChildren: () => import('./_pages/dorama/dorama.module').then(m => m.DoramaModule),
    data: {
      title: 'List Dorama & Garapan Musiman',
      description: 'Daftar Isi Dorama Musiman Yang Baru Saja Rilis Subtitle Indonesianya',
      keywords: 'Dorama Subtitle Indonesia'
    }
  },
  {
    path: 'fansub',
    loadChildren: () => import('./_pages/fansub/fansub.module').then(m => m.FansubModule),
    data: {
      title: 'Katalog Informasi Seluruh Fansub Indonesia',
      description: 'Daftar Isi Seluruh Fansub Indonesia',
      keywords: 'Fansub Indonesia'
    }
  },
  {
    path: 'about',
    loadChildren: () => import('./_pages/about/about.module').then(m => m.AboutModule),
    data: {
      title: 'About',
      description: 'Halaman Mengenai Website',
      keywords: 'About'
    }
  },
  {
    path: 'user',
    loadChildren: () => import('./_pages/user/user.module').then(m => m.UserModule),
    data: {
      title: 'User Profile',
      description: 'Halaman Informasi Pengguna',
      keywords: 'User'
    }
  },
  // {
  //   path: 'documentation',
  //   loadChildren: () => import('./_pages/documentation/documentation.module').then(m => m.DocumentationModule),
  //   canActivate: [AuthGuard],
  //   data: {
  //     title: 'API Documentation',
  //     description: 'Request & Response',
  //     keywords: 'API',
  //     roles: [Role.ADMIN, Role.MODERATOR, Role.FANSUBBER, Role.USER]
  //   }
  // },
  {
    path: 'error',
    loadChildren: () => import('./_pages/not-found/not-found.module').then(m => m.NotFoundModule),
    data: {
      title: 'Error - 404',
      description: 'Whoops! Halaman Tidak Ditemukan',
      keywords: '404 - Not Found'
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
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
