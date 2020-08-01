import { Component, OnInit } from '@angular/core';

import { onSideNavChange, animateText } from '../../animations/animations';

import { LeftMenuService } from '../../services/left-menu.service';

import { Menu } from '../../models/Menu';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit {

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
    private lms: LeftMenuService
  ) {
  }

  ngOnInit(): void {
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
  }

}
