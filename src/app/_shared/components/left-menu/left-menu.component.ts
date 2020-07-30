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

  public sideNavState = false;
  public linkText = false;

  sideMoveTimeout = 0;

  public userMenus: Menu[] = [
    {
      name: 'Beranda',
      link: '/home',
      icon: 'home'
    }
  ];

  public mainMenus: Menu[] = [
    {
      name: 'Anime List',
      link: '/anime',
      icon: 'tv'
    },
    {
      name: 'Fansub List',
      link: '/fansub',
      icon: 'subtitles'
    }
  ];

  public miscMenus: Menu[] = [
    {
      name: 'Tentang Kami',
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

  changeSideNavState(): void {
    clearTimeout(this.sideMoveTimeout);
    this.sideMoveTimeout = setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.lms.sideNavState$.next(this.sideNavState);
  }

  onSideNavToggle(): void {
    this.sideNavState = !this.sideNavState;
    this.changeSideNavState();
  }

  onMouseHoverIn(): void {
    if (this.sideNavState === false) {
      this.sideNavState = true;
      this.changeSideNavState();
    }
  }

  onMouseHoverOut(): void {
    if (this.sideNavState === true) {
      this.sideNavState = false;
      this.changeSideNavState();
    }
  }

}
