import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { onSideNavChange, animateText } from '../../animations/anim-side-menu';

import { Menu } from '../../models/Menu';

import { LeftMenuService } from '../../services/left-menu.service';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';
import { BusyService } from '../../services/busy.service';

import User from '../../models/User';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit, OnDestroy {

  currentUser: User = null;

  mainMenus: Menu[] = [
    {
      name: 'Beranda',
      link: '/home',
      icon: 'dashboard'
    },
    {
      name: 'Berita & Informasi',
      link: '/news',
      icon: 'receipt_long'
    },
    // {
    //   name: 'RSS Feed',
    //   link: '/rss',
    //   icon: 'rss_feed'
    // }
  ];

  animeMenus: Menu[] = [
    {
      name: 'Anime Musiman',
      link: '/anime',
      icon: 'live_tv'
    },
    {
      name: 'Katalog Fansub',
      link: '/fansub',
      icon: 'closed_caption'
    },
    {
      name: 'Berbagi Garapan',
      link: '/berkas',
      icon: 'file_copy'
    }
  ];

  miscMenus: Menu[] = [
    {
      name: 'About',
      link: '/about',
      icon: 'info'
    }
  ];

  subsUser = null;
  subsLogout = null;

  constructor(
    private router: Router,
    private lms: LeftMenuService,
    private as: AuthService,
    public gs: GlobalService,
    private bs: BusyService
  ) {
  }

  ngOnDestroy(): void {
    if (this.subsUser) {
      this.subsUser.unsubscribe();
    }
    if (this.subsLogout) {
      this.subsLogout.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    }
  }

  get sideNavExpanded(): any {
    return this.lms.sideNavExpanded;
  }

  get linkText(): any {
    return this.lms.linkText;
  }

  onMouseHoverIn(): void {
    this.lms.onMouseHoverIn();
  }

  onMouseHoverOut(): void {
    this.lms.onMouseHoverOut();
  }

  logout(): void {
    this.bs.busy();
    this.subsLogout = this.as.logout().subscribe(
      (res: any) => {
        this.gs.log('[LOGOUT_SUCCESS]', res);
        this.as.removeUser();
        this.bs.idle();
        this.router.navigateByUrl('/');
      },
      err => {
        this.gs.log('[LOGOUT_ERROR]', err);
        this.as.removeUser();
        this.bs.idle();
        this.router.navigateByUrl('/');
      }
    );
  }

}
