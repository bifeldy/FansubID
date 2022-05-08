import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from '../../../../models/req-res.model';

import { onSideNavChange, animateText } from '../../animations/anim-side-menu';

import { LeftMenuService } from '../../services/left-menu.service';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { DialogService } from '../../services/dialog.service';

import { Menu } from '../../models/Menu';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit, OnDestroy {

  currentUser: UserModel = null;

  subsUser = null;
  subsDialog = null;

  constructor(
    private router: Router,
    private lms: LeftMenuService,
    private as: AuthService,
    private gs: GlobalService,
    private ds: DialogService,
    private ls: LocalStorageService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get mainMenus(): Menu[] {
    return this.lms.mainMenus;
  }

  get contentMenus(): Menu[] {
    return this.lms.contentMenus;
  }

  get miscMenus(): Menu[] {
    return this.lms.miscMenus;
  }

  ngOnDestroy(): void {
    this.subsUser?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({ next: user => this.currentUser = user });
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
    this.as.logout();
  }

  openDocumentation(): void {
    this.onMouseHoverOut();
    this.router.navigateByUrl('/documentation');
  }

  openWebTorrent(): void {
    this.onMouseHoverOut();
    if (!this.gs.isDesktop) {
      this.subsDialog = this.ds.openInfoDialog({
        data: {
          title: `.: Web-Torrent :.`,
          htmlMessage: 'Fitur ini tergolong cukup berat karena dikhususkan untuk pengguna desktop, akan ada kemungkinan juga tampilan menjadi berantakan, yakin ingin melanjutkan ?',
          confirmText: 'Ya, Lanjutkan',
          cancelText: 'Tidak, Batal'
        },
        disableClose: false
      }).afterClosed().subscribe({
        next: re => {
          this.gs.log('[INFO_DIALOG_CLOSED]', re);
          if (re === true) {
            this.router.navigateByUrl('/torrent');
          }
          this.subsDialog.unsubscribe();
        }
      });
    } else {
      this.router.navigateByUrl('/torrent');
    }
  }

  toggleDebugLog($event): void {
    this.gs.forceEnableDebugLog = $event.checked;
    this.ls.setItem(this.gs.localStorageKeys.DebugLogs, JSON.stringify($event.checked));
  }

}
