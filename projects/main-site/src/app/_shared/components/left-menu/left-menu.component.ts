import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { onSideNavChange, animateText } from '../../animations/anim-side-menu';

import { LeftMenuService } from '../../services/left-menu.service';
import { AuthService } from '../../services/auth.service';
import { GlobalService } from '../../services/global.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { DialogService } from '../../services/dialog.service';

import { Menu } from '../../../../models/menu';
import { RoleModel } from '../../../../models/req-res.model';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit, OnDestroy {

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

  get AS(): AuthService {
    return this.as;
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

  get additionalMenus(): Menu[] {
    return this.lms.additionalMenus;
  }

  get miscMenus(): Menu[] {
    return this.lms.miscMenus;
  }

  get otherMenus(): Menu[] {
    return this.lms.otherMenus;
  }

  get TRUSTED(): boolean {
    if (this.as.currentUserSubject?.value) {
      return (
        this.as.currentUserSubject.value.role === RoleModel.ADMIN || 
        this.as.currentUserSubject.value.role === RoleModel.MODERATOR || 
        this.as.currentUserSubject.value.role === RoleModel.FANSUBBER
      );
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subsDialog?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

  get sideNavExpanded(): boolean {
    return this.lms.sideNavExpanded;
  }

  get linkText(): boolean {
    return this.lms.linkText;
  }

  onMouseHoverIn(): void {
    if (this.gs.isDesktop) {
      this.lms.onMouseHoverIn();
    }
  }

  onMouseHoverOut(): void {
    if (this.gs.isDesktop) {
      this.lms.onMouseHoverOut();
    }
  }

  forceCloseSideNav(): void {
    this.lms.forceCloseSideNav();
  }

  logout(): void {
    this.as.logout();
  }

  openDocumentation(): void {
    this.forceCloseSideNav();
    this.router.navigateByUrl('/docs');
  }

  openWebTorrent(): void {
    this.forceCloseSideNav();
    if (!this.gs.isDesktop) {
      this.subsDialog = this.ds.openInfoDialog({
        data: {
          title: '.: Web-Torrent :.',
          htmlMessage: 'Fitur Ini Tergolong Cukup Berat Karena Dikhususkan Untuk Pengguna Desktop, Akan Ada Kemungkinan Juga Tampilan Menjadi Berantakan, Yakin Ingin Melanjutkan ?',
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
