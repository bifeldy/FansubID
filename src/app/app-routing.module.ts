import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CONSTANTS } from '../constants';

import { RoleModel } from '../models/req-res.model';

import { RolesGuard } from './_shared/guards/roles.guard';
import { VerifiedGuard } from './_shared/guards/verified.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'admin-mod',
    loadChildren: () => import('./_pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [VerifiedGuard, RolesGuard],
    data: {
      title: 'Admin & Moderator Panel Management',
      description: 'Halaman Khusus Untuk Administrasi & Moderasi',
      keywords: 'Admin Moderator Fansub Database',
      [CONSTANTS.decoratorVerifiedOnly]: true,
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR]
    }
  },
  {
    path: 'create',
    loadChildren: () => import('./_pages/create/create.module').then(m => m.CreateModule),
    data: {
      title: 'Membuat Konten Baru',
      description: 'Membuat Konten Baru',
      keywords: 'Add New Content'
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
    path: 'reset-password',
    loadChildren: () => import('./_pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    data: {
      title: 'Reset Akun',
      description: 'Halaman Atur Ulang Kata Sandi',
      keywords: 'Reset Password'
    }
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./_pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
    data: {
      title: 'Privacy Policy',
      description: 'Halaman Kebijakan Privasi',
      keywords: 'privacy-policy'
    }
  },
  {
    path: 'verify',
    loadChildren: () => import('./_pages/verify/verify.module').then(m => m.VerifyModule),
    canActivate: [RolesGuard],
    data: {
      title: 'Verifikasi',
      description: 'Halaman Verifikasi Akun',
      keywords: 'Verify',
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER]
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./_pages/home/home.module').then(m => m.HomeModule),
    data: {
      title: 'Database Fansub Indonesia',
      description: 'Database Fansub Indonesia',
      keywords: 'Fansub DB'
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
    path: 'ticket',
    loadChildren: () => import('./_pages/ticket/ticket.module').then(m => m.TicketModule)
  },
  {
    path: 'mailbox',
    loadChildren: () => import('./_pages/mailbox/mailbox.module').then(m => m.MailboxModule),
    canActivate: [RolesGuard, VerifiedGuard],
    data: {
      title: 'Surat Elektronik',
      description: 'E-Mail & DM\'s',
      keywords: 'Surel Email DM',
      [CONSTANTS.decoratorVerifiedOnly]: true,
      [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER]
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
    path: 'user',
    loadChildren: () => import('./_pages/user/user.module').then(m => m.UserModule),
    data: {
      title: 'User Profile',
      description: 'Halaman Informasi Pengguna',
      keywords: 'User'
    }
  },
  {
    path: 'rss-feed',
    loadChildren: () => import('./_pages/rss-feed/rss-feed.module').then(m => m.RssFeedModule),
    data: {
      title: 'Loper Koran RSS Feed',
      description: 'Halaman Rangkuman Berita Acara Fansub Indonesia',
      keywords: 'RSS Feed'
    }
  },
  {
    path: 'torrent',
    loadChildren: () => import('./_pages/torrent/torrent.module').then(m => m.TorrentModule),
    data: {
      title: 'Web-SocketRTC Torrent',
      description: 'Halaman Peer-to-Peer Berbagi Berkas',
      keywords: 'Web Torrent'
    }
  },
  {
    path: 'docs',
    loadChildren: () => import('./_pages/docs/docs.module').then(m => m.DocsModule),
    data: {
      title: 'Developers Documentation',
      description: 'For Developers Only',
      keywords: 'Domain & API Keys'
    }
  },
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
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'corrected'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
