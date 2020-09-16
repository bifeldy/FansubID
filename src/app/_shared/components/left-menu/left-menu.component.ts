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

  public mainMenus: Menu[] = [
    {
      name: 'Beranda',
      link: '/home',
      icon: 'dashboard'
    },
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
      name: 'Semua Berkas',
      link: '/berkas',
      icon: 'file_copy'
    },
    // {
    //   name: 'Film & Drama',
    //   link: '/drama',
    //   icon: 'movie_filter'
    // },
    // {
    //   name: 'Komik & Novel',
    //   link: '/book',
    //   icon: 'book'
    // },
    // {
    //   name: 'Gim & Piranti',
    //   link: '/software',
    //   icon: 'videogame_asset'
    // }
  ];

  public miscMenus: Menu[] = [
    {
      name: 'About Us',
      link: '/about',
      icon: 'info'
    }
  ];

  subsLogout = null;

  constructor(
    private router: Router,
    private lms: LeftMenuService,
    private as: AuthService,
    private gs: GlobalService,
    private bs: BusyService
  ) {
  }

  ngOnDestroy(): void {
    if (this.subsLogout) {
      this.subsLogout.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.as.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  get sideNavExpanded(): any {
    return this.lms.sideNavExpanded;
  }

  get linkText(): any {
    return this.lms.linkText;
  }

  changeSideNavState(): void {
    this.lms.changeSideNavState();
  }

  onSideNavToggle(): void {
    this.lms.changeSideNavState();
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
