import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {

  public sideNav = null;
  sideNavExpanded = false;

  linkText = false;
  sideMoveTimeout = null;

  public opened = true;

  constructor(
    @Inject(PLATFORM_ID) platformId: string
  ) {
    if (isPlatformBrowser(platformId)) {
      this.opened = (window.innerWidth >= 992) ? true : false;
    }
  }

  changeSideNavState(): void {
    clearTimeout(this.sideMoveTimeout);
    this.sideMoveTimeout = setTimeout(() => {
      this.linkText = this.sideNavExpanded;
    }, 200);
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
