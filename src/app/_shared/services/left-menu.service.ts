import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { GlobalService } from './global.service';

import { Menu } from '../../../models/menu';

@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {

  sideNav: MatSidenav = null;
  sideNavExpanded = false;

  linkText = false;

  opened = true;

  mainMenus: Menu[] = [
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
    {
      name: 'Nihongo 日本語',
      link: '/nihongo',
      icon: 'translate',
      badge: null
    },
    {
      name: 'E-Mail@FanSub.ID',
      link: '/mailbox',
      icon: 'mail_outline',
      badge: null
    }
  ];

  contentMenus: Menu[] = [
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

  miscMenus: Menu[] = [
    {
      name: 'RSS Feed',
      link: '/rss-feed',
      icon: 'rss_feed',
      badge: null
    },
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

  forceCloseSideNav() {
    if (!this.gs.isDesktop && this.sideNav.opened) {
      this.sideNav.close();
    }
    this.onMouseHoverOut();
  }

  onSideNavToggleView(): void {
    if (this.sideNav.opened) {
      this.sideNav.close();
      if (!this.gs.isDesktop) {
        this.onMouseHoverOut();
      }
    } else {
      this.sideNav.open();
      if (!this.gs.isDesktop) {
        this.onMouseHoverIn();
      }
    }
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
