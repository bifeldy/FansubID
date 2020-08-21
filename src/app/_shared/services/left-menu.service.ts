import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {

  sideNavExpanded = false;

  linkText = false;
  sideMoveTimeout = null;

  constructor() {
  }

  changeSideNavState(): void {
    clearTimeout(this.sideMoveTimeout);
    this.sideMoveTimeout = setTimeout(() => {
      this.linkText = this.sideNavExpanded;
    }, 200);
  }

  onSideNavToggle(): void {
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
