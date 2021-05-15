import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from './global.service';
import { WinboxService } from './winbox.service';

@Injectable({
  providedIn: 'root'
})
export class FabService {

  isHidden = true;
  newTab = true;

  targetUrl = null;

  backgroundImage = null;
  backgroundIcon = null;
  tooltipText = null;

  constructor(
    private router: Router,
    private gs: GlobalService,
    private wb: WinboxService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  toggleFab(): void {
    this.isHidden = !this.isHidden;
  }

  showFab(): void {
    this.isHidden = false;
  }

  hideFab(): void {
    this.isHidden = true;
  }

  removeFab(): void {
    this.isHidden = true;
    this.tooltipText = null;
    this.backgroundIcon = null;
    this.backgroundImage = null;
  }

  initializeFab(icon = null, image = null, text = null, url = null, tab = true): void {
    this.backgroundIcon = icon;
    this.backgroundImage = image;
    this.tooltipText = text;
    this.targetUrl = url;
    this.newTab = tab;
    this.isHidden = false;
  }

  setTooltipText(text: string): void {
    this.tooltipText = text;
  }

  setNewTab(tab: boolean): void {
    this.newTab = tab;
  }

  setTargetUrl(url: boolean): void {
    this.targetUrl = url;
  }

  setBackgroundImage(urlImage: string): void {
    this.backgroundImage = urlImage;
  }

  setBackgroundIcon(iconName: string): void {
    this.backgroundIcon = iconName;
  }

  buttonClicked(): void {
    if (this.newTab) {
      this.wb.winboxOpenUri(this.targetUrl);
    }
    else {
      this.router.navigateByUrl(this.targetUrl);
    }
  }

}
