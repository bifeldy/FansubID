import { Injectable } from '@angular/core';

import { GlobalService } from './global.service';

import { Menu } from '../models/Menu';

@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {

  public sideNav = null;
  public sideNavExpanded = false;

  linkText = false;

  public opened = true;

  public mainMenus: Menu[] = [
    {
      name: 'Beranda',
      link: '/home',
      icon: 'dashboard',
      badge: null
    },
    {
      name: 'Berita & Informasi',
      link: '/news',
      icon: 'receipt_long',
      badge: null
    },
    // {
    //   name: 'Nihongo 日本語',
    //   link: '/nihongo',
    //   icon: 'translate',
    //   badge: null
    // },
    // {
    //   name: 'RSS Feed',
    //   link: '/rss',
    //   icon: 'rss_feed',
    //   badge: null
    // }
  ];

  public contentMenus: Menu[] = [
    {
      name: 'Anime Musiman',
      link: '/anime',
      icon: 'live_tv',
      badge: null
    },
    {
      name: 'Film Drama',
      link: '/dorama',
      icon: 'movie',
      badge: null
    },
    {
      name: 'Katalog Fansub',
      link: '/fansub',
      icon: 'closed_caption',
      badge: null
    },
    {
      name: 'Berbagi Garapan',
      link: '/berkas',
      icon: 'file_copy',
      badge: null
    }
  ];

  public miscMenus: Menu[] = [
    {
      name: 'Admin & Mod Panel',
      link: '/admin-mod',
      icon: 'admin_panel_settings',
      badge: null
    },
    {
      name: 'About',
      link: '/about',
      icon: 'info',
      badge: null
    }
  ];

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      this.opened = (window.innerWidth >= 992) ? true : false;
    }
  }

  changeSideNavState(): void {
    this.linkText = this.sideNavExpanded;
  }

  onSideNavToggleView(): void {
    this.sideNav.toggle();
  }

  onSideNavToggleExpanded(): void {
    this.sideNavExpanded = !this.sideNavExpanded;
    this.changeSideNavState();
  }

  onMouseHoverIn(): void {
    if (this.sideNavExpanded === false) {
      this.sideNavExpanded = true;
      this.changeSideNavState();
    }
  }

  onMouseHoverOut(): void {
    if (this.sideNavExpanded === true) {
      this.sideNavExpanded = false;
      this.changeSideNavState();
    }
  }

}
