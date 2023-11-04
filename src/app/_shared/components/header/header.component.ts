import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../../../environments/app/environment';

import { PageInfoService } from '../../services/page-info.service';
import { LeftMenuService } from '../../services/left-menu.service';
import { GlobalService } from '../../services/global.service';
import { RightPanelService } from '../../services/right-panel.service';
import { StatsServerService } from '../../services/stats-server.service';
import { BusyService } from '../../services/busy.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { DialogService } from '../../services/dialog.service';

// Manually Injected
import { BerkasService } from '../../services/berkas.service';
import { FansubService } from '../../services/fansub.service';
import { NewsService } from '../../services/news.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  myPoints = 0;

  subsGlobalRoom = null;
  subsDialog = null;
  subsDelete = null;

  deleteHandle: any = {};

  constructor(
    private snackBar: MatSnackBar,
    private lms: LeftMenuService,
    private rps: RightPanelService,
    private router: Router,
    private pi: PageInfoService,
    private gs: GlobalService,
    private ss: StatsServerService,
    private bs: BusyService,
    private ls: LocalStorageService,
    private ds: DialogService,
    private berkas: BerkasService,
    private fansub: FansubService,
    private news: NewsService,
    private user: UserService
  ) {
    if (this.gs.isBrowser) {
      this.deleteHandle['berkas'] = this.berkas;
      this.deleteHandle['fansub'] = this.fansub;
      this.deleteHandle['news'] = this.news;
      this.deleteHandle['user'] = this.user;
    }
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get ROUTER(): Router {
    return this.router;
  }

  get PI(): PageInfoService {
    return this.pi;
  }

  get SS(): StatsServerService {
    return this.ss;
  }

  get canDelete(): boolean {
    return (
      this.router.url.startsWith('/berkas/') ||
      this.router.url.startsWith('/fansub/') ||
      this.router.url.startsWith('/news/') ||
      this.router.url.startsWith('/user/')
    );
  }

  get canReport(): boolean {
    return (
      this.router.url.startsWith('/berkas/') ||
      this.router.url.startsWith('/fansub/') ||
      this.router.url.startsWith('/user/')
    );
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      const osTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.gs.isDarkMode = osTheme || this.ls.getItem(this.gs.localStorageKeys.DarkMode) === 'true';
      this.toggleDarkTheme(true);
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        this.gs.isDarkMode = event.matches;
        this.toggleDarkTheme(true);
      });
      this.subsGlobalRoom = this.ss.globalRoom.subscribe({
        next: global => {
          this.myPoints = global?.member_list[this.ss.mySocket.id]?.profile_?.points || 0;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subsGlobalRoom?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsDelete?.unsubscribe();
  }

  get discordUrl(): string {
    return environment.discord.join_url;
  }

  toggleSideNav(): void {
    this.lms.onSideNavToggleView();
  }

  toggleWeather(): void {
    this.gs.weatherToggle();
    this.snackBar.open(`Berhasil ${this.gs.weatherRunning ? 'Menyalakan' : 'Mematikan'} Efek Musiman`, 'Ok');
  }

  reloadPage(): void {
    this.bs.busy();
    window.location.reload();
  }

  openSearch(): void {
    this.rps.toggleSidePanel('SearchAllComponent');
  }

  openLiveChat(): void {
    this.rps.toggleSidePanel('LiveChatComponent');
  }

  openAdminNavigation(): void {
    this.rps.toggleSidePanel('AdminNavigationComponent');
  }

  toggleDarkTheme(firstRun = false): void {
    this.gs.toggleDarkTheme(firstRun);
    this.ls.setItem(this.gs.localStorageKeys.DarkMode, JSON.stringify(this.gs.isDarkMode));
    this.pi.updateStatusBarTheme(this.gs.isDarkMode);
    this.snackBar.open(`Menggunakan Mode ${this.gs.isDarkMode ? 'Gelap' : 'Terang'}`, 'Ok');
  }

  async toggleDelete(): Promise<void> {
    const urlPath = this.router.url.split('?')[0];
    const trackType = urlPath.split('/')[1];
    const idSlugUsername = urlPath.split('/')[2];
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      'Konfirmasi Hapus',
      `Yakin Akan Menghapus ${trackType[0].toUpperCase()}${trackType.slice(1)} -- '${idSlugUsername}' ?`,
      true
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsDelete = this.deleteHandle[trackType].delete(idSlugUsername).subscribe({
            next: res => {
              this.gs.log(`[${trackType.toUpperCase()}_CLICK_DELETE_SUCCESS]`, res);
              this.bs.idle();
              this.router.navigateByUrl(`/${trackType}`);
            },
            error: err => {
              this.gs.log(`[${trackType.toUpperCase()}_CLICK_DELETE_ERROR]`, err, 'error');
              this.bs.idle();
            }
          });
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  toggleReport(): void {
    this.router.navigate(['/create/ticket'], {
      queryParams: {
        url: this.router.url.split('?')[0]
      }
    });
  }

}
