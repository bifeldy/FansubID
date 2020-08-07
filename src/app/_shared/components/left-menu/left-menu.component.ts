import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { onSideNavChange, animateText } from '../../animations/anim-side-menu';

import { Menu } from '../../models/Menu';

import { LeftMenuService } from '../../services/left-menu.service';
import { AuthService } from '../../services/auth.service';

import User from '../../models/User';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit {

  currentUser: User = null;

  public mainMenus: Menu[] = [
    {
      name: 'Beranda',
      link: '/home',
      icon: 'dashboard'
    },
    {
      name: 'Katalog Fansub',
      link: '/fansub',
      icon: 'closed_caption'
    },
    {
      name: 'Anime List',
      link: '/anime',
      icon: 'live_tv'
    },
    {
      name: 'Film & Drama',
      link: '/drama',
      icon: 'movie_filter'
    }
  ];

  public miscMenus: Menu[] = [
    {
      name: 'About',
      link: '/about',
      icon: 'info'
    }
  ];

  constructor(
    private router: Router,
    private lms: LeftMenuService,
    private as: AuthService
  ) {
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
    this.as.logout();
  }

}
