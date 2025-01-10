import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationStart } from '@angular/router';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

import { onMainContentChange } from './_shared/animations/anim-side-menu';

import { environment } from '../environments/app/environment';

import { LeftMenuService } from './_shared/services/left-menu.service';
import { RightPanelService } from './_shared/services/right-panel.service';
import { PageInfoService } from './_shared/services/page-info.service';
import { AuthService } from './_shared/services/auth.service';
import { FabService } from './_shared/services/fab.service';
import { BusyService } from './_shared/services/busy.service';
import { GlobalService } from './_shared/services/global.service';
import { StatsServerService } from './_shared/services/stats-server.service';
import { WinboxService } from './_shared/services/winbox.service';
import { LocalStorageService } from './_shared/services/local-storage.service';
import { DialogService } from './_shared/services/dialog.service';
import { ServiceWorkerService } from './_shared/services/service-worker.service';
import { ViewerService } from './_shared/services/viewer.service.';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostListener('window:contextmenu', ['$event']) windowRightClick;
  @HostListener('window:click', ['$event']) windowLeftClick;
  @HostListener('window:dblclick', ['$event']) windowDoubleClick;
  @HostListener('window:beforeunload', ['$event']) windowBeforeUnloaded;

  get sideNavType(): MatDrawerMode {
    return this.gs.isDesktop ? 'side' : 'over';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.gs.onResize(event);
  }

  @ViewChild('leftSideNav', { static: true }) leftSideNav: MatSidenav;
  @ViewChild('rightSidePanel', { static: true }) rightSidePanel: MatSidenav;
  @ViewChild('siteContent', { static: true }) siteContent;

  subsRouter = null;
  subsRouterChild = null;
  subsUrl = null;
  subsVerify = null;
  subsDialog = null;

  timedOut = null;

  constructor(
    private snackBar: MatSnackBar,
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bs: BusyService,
    private pi: PageInfoService,
    private as: AuthService,
    private fs: FabService,
    private ls: LocalStorageService,
    private gs: GlobalService,
    private lms: LeftMenuService,
    private rps: RightPanelService,
    private ss: StatsServerService,
    private wb: WinboxService,
    private ds: DialogService,
    private sw: ServiceWorkerService,
    private viewer: ViewerService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get ROUTER(): Router {
    return this.router;
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get LMS(): LeftMenuService {
    return this.lms;
  }

  get RPS(): RightPanelService {
    return this.rps;
  }

  ngOnDestroy(): void {
    this.subsRouter?.unsubscribe();
    this.subsRouterChild?.unsubscribe();
    this.subsUrl?.unsubscribe();
    this.subsVerify?.unsubscribe();
    this.subsDialog?.unsubscribe();
    if (this.timedOut) {
      clearTimeout(this.timedOut);
      this.timedOut = null;
    }
  }

  ngAfterViewInit(): void {
    this.lms.sideNav = this.leftSideNav;
    this.rps.sidePanel = this.rightSidePanel;
    if (this.gs.isBrowser) {
      const appLoading = this.renderer.selectRootElement('#app-loading');
      if (appLoading) {
        appLoading.style.visibility = 'hidden';
        appLoading.style.opacity = 0;
      }
    }
  }

  ngOnInit(): void {
    this.gs.log(`[APP_BUILD_STATUS] 💘 ${environment.siteName} :: ${environment.production ? 'Production' : 'Development'} With Logging Enabled 📌`);
    this.gs.log(`[SERVICE_WORKER_STATUS] 💘 isEnabled :: ${this.sw.swEnabled} 📌`);
    this.pi.updatePageMetaData(
      `「💤 ${environment.siteName}」`,
      `「✨ ${environment.siteDescription}」`,
      `「💤 ${environment.siteName} ✨🌞」`,
      `${environment.baseUrl}/assets/img/favicon.png`
    );
    this.subsRouter = this.router.events.subscribe({
      next: e1 => {
        if (e1 instanceof RouteConfigLoadStart) {
          if (this.gs.isBrowser) {
            this.bs.busy();
          }
        }
        else if (e1 instanceof RouteConfigLoadEnd) {
          if (this.gs.isBrowser) {
            this.bs.idle();
          }
        }
        else if (e1 instanceof NavigationStart) {
          if (this.gs.isBrowser) {
            if (e1.url) {
              const str = e1.url.split('/')[1];
              if (str) {
                const stringBadge = `badge${str[0].toUpperCase()}${str.slice(1)}`;
                if (this.ss[stringBadge]) {
                  this.ss[stringBadge] = [];
                  const mainMenu = this.lms.mainMenus.find(m => m.link === e1.url);
                  const contentMenu = this.lms.contentMenus.find(m => m.link === e1.url);
                  const miscMenu = this.lms.miscMenus.find(m => m.link === e1.url);
                  if (mainMenu) {
                    mainMenu.badge = null;
                  }
                  if (contentMenu) {
                    contentMenu.badge = null;
                  }
                  if (miscMenu) {
                    miscMenu.badge = null;
                  }
                }
              }
              this.gs.previousUrl = this.router.url.split('?')[0];
            }
          }
        }
        else if (e1 instanceof NavigationEnd) {
          const e2 = this.activatedRoute.snapshot.data;
          this.updateBackgroundImage();
          this.gs.setCustomBackgroundImage();
          this.gs.routerData = e2;
          this.pi.updatePageMetaData(
            e2['title'],
            e2['description'],
            e2['keywords'],
            (this.gs.bgImgUrl || `${environment.baseUrl}/assets/img/favicon.png`)
          );
          this.fs.removeFab();
          if (this.gs.isBrowser) {
            if (this.siteContent) {
              this.siteContent.elementRef.nativeElement.scrollTop = 0;
            }
            const nextUrl = e1.url.split('?')[0];
            if (this.gs.previousUrl !== nextUrl) {
              this.ss.currentChatRoom = [];
            }
            this.ss.socketLeaveAndJoinNewRoom(this.gs.previousUrl, nextUrl);
          }
        }
      }
    });
    if (this.gs.isBrowser) {
      this.checkStorage();
      this.windowRightClick = this.onWindowRightClick;
      this.windowLeftClick = this.onWindowLeftClick;
      this.windowDoubleClick = this.onWindowDoubleClick;
      this.windowBeforeUnloaded = this.onWindowBeforeUnloaded;
      this.timedOut = setTimeout(async () => {
        const aturanTatib = this.ls.getItem(this.gs.localStorageKeys.AturanTatib) === 'true';
        if (!aturanTatib) {
          const defaultData = {
            id: 'ATURAN-TATA-TERTIB',
            data: {
              title: 'Aturan Dan Tata Tertib Komunitas',
              htmlMessage: 'Gagal Memuat Aturan Dan Tata Tertib Komunitas',
              confirmText: 'Ok, Saya Mengerti!',
              cancelText: null
            },
            disableClose: false,
            maxWidth: this.ds.maxWidth
          };
          this.subsDialog = (await this.ds.fetchInformationRegisterMode(defaultData)).afterClosed().subscribe({
            next: re => {
              this.gs.log('[ATURAN_TATA_TERTIB_DIALOG_CLOSED]', re);
              if (typeof re === 'boolean') {
                this.ls.setItem(this.gs.localStorageKeys.AturanTatib, JSON.stringify(re));
              }
              this.subsDialog.unsubscribe();
            }
          });
        }
        this.injectServerTimeClock();
        if (this.gs.weatherEffect) {
          this.snackBar.open('Gunakan Menu Di Kanan Atas (Gambar Bunga) Untuk Mematikan Animasi Efek Musiman!', 'OK');
        }
      }, 1234);

    }
  }

  updateBackgroundImage(): void {
    const urlPath = this.router.url.split('?')[0].substring(1).split('/')[0];
    this.gs.bgImgUrlPath = urlPath ? `/assets/img/router/${urlPath}.png` : '';
  }

  checkStorage(): void {
    this.bs.busy();
    this.subsVerify = this.as.verify(this.as.token).subscribe({
      next: success => {
        this.gs.log('[VERIFY_SUCCESS]', success);
        this.ss.socketLeaveAndJoinNewRoom(this.gs.previousUrl, this.router.url.split('?')[0]);
        this.bs.idle();
      },
      error: error => {
        this.gs.log('[VERIFY_ERROR]', error, 'error');
        this.bs.idle();
        this.as.removeUser();
      }
    });
  }

  resetLoading(): void {
    this.bs.clear();
  }

  onWindowRightClick(ev): any {
    this.gs.log('[MOUSE_RIGHT_CLICK]', ev);
    // TODO :: Add Share Button & Disable Right Click
    // ev.preventDefault();
  }

  onWindowLeftClick(ev): boolean {
    this.gs.log('[MOUSE_LEFT_CLICK]', ev);
    const e = ev || this.gs.window.event;
    let el = e.target || e.srcElement;
    if (el) {
      let maxLoop = 5;
      const linkTag = ['A', 'a'];
      while(![...linkTag].includes(el.tagName) && maxLoop > 0) {
        el = el.parentElement || el.parentNode;
        maxLoop--;
        if (!el) {
          return true;
        }
      }
      if (linkTag.includes(el.tagName)) {
        const externalUri: string = el.getAttribute('href');
        if (externalUri) {
          if (
            this.gs.isDesktop &&
            this.gs.includesOneOf(externalUri, ['http', 'ftp', 'mailto']) &&
            !externalUri.includes(environment.baseUrl)
          ) {
            e.preventDefault();
            e.stopPropagation();
            this.winboxOpenUri(externalUri);
            return false;
          }
        }
      }
    }
    return true;
  }

  onWindowDoubleClick(ev): any {
    this.gs.log('[MOUSE_DOUBLE_CLICK]', ev);
    const e = ev || this.gs.window.event;
    const el = e.target || e.srcElement;
    if (el.tagName === 'IMG' || el.tagName === 'img') {
      if (this.gs.isDesktop) {
        this.viewer.viewImage(el);
      }
    }
  }

  onWindowBeforeUnloaded(ev): any {
    if (this.as.token) {
      this.gs.log('[BROWSER_EXIT_CLOSE_SAVE_JWT]', this.as.token);
      this.ls.setItem(this.gs.localStorageKeys.Token, this.as.token);
    }
  }

  winboxOpenUri(uri: string): void {
    this.wb.winboxOpenUri(uri);
  }

  injectServerTimeClock(): void {
    if (this.gs.isDesktop) {
      const backdrop = this.gs.document.getElementsByClassName('mat-drawer-backdrop');
      if (backdrop.length > 0) {
        const drawerBackdrop = backdrop[0];
        drawerBackdrop.innerHTML = `
          <div class="row align-items-center h-100">
            <div class="col-9 mx-auto text-light text-center">
              <h1>~ Kalender (｡>﹏<｡) Server ~</h1>
              <h1 id="serverDate"></h1>
              <h1 id="serverTime"></h1>
            </div>
          </div>
        `;
        const script = this.gs.document.createElement('script');
        script.type = 'text/javascript';
        script.textContent = `
          function runCalendar() {
            const calendar = new Date();
            const serverTime = document.getElementById('serverTime');
            serverTime.innerHTML = calendar.toLocaleTimeString('ja-JP', {
              timeZone: 'Asia/Tokyo',
              timeZoneName: 'longGeneric'
            });
            const serverDate = document.getElementById('serverDate');
            serverDate.innerHTML = calendar.toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'Asia/Tokyo'
            });
            setTimeout(runCalendar, 1000);
          }
          runCalendar();
        `;
        this.gs.document.head.appendChild(script);
      }
    }
  }

}
