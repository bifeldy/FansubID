import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationStart } from '@angular/router';

import { onMainContentChange } from './_shared/animations/anim-side-menu';

import { environment } from '../environments/client/environment';

import { LeftMenuService } from './_shared/services/left-menu.service';
import { RightPanelService } from './_shared/services/right-panel.service';
import { PageInfoService } from './_shared/services/page-info.service';
import { AuthService } from './_shared/services/auth.service';
import { FabService } from './_shared/services/fab.service';
import { BusyService } from './_shared/services/busy.service';
import { GlobalService } from './_shared/services/global.service';
import { StatsServerService } from './_shared/services/stats-server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('leftSideNav', { static: true }) leftSideNav: ElementRef;
  @ViewChild('rightSidePanel', { static: true }) rightSidePanel: ElementRef;
  @ViewChild('siteContent', { static: true }) siteContent;

  selectedBackgroundImage = '';

  subsRouter = null;
  subsRouterChild = null;
  subsVerify = null;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private bs: BusyService,
    private pi: PageInfoService,
    private as: AuthService,
    private fs: FabService,
    public gs: GlobalService,
    public lms: LeftMenuService,
    public rps: RightPanelService,
    public ss: StatsServerService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnDestroy(): void {
    if (this.subsRouter) {
      this.subsRouter.unsubscribe();
    }
    if (this.subsRouterChild) {
      this.subsRouterChild.unsubscribe();
    }
    if (this.subsVerify) {
      this.subsVerify.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.lms.sideNav = this.leftSideNav;
    this.rps.sidePanel = this.rightSidePanel;
  }

  ngOnInit(): void {
    this.gs.log(`[APP_BUILD_STATUS] 💘 ${environment.siteName} :: ${environment.production ? 'Production' : 'Development'} With Logging Enabled 📌`);
    this.pi.updatePageMetaData(
      '「💤 Hikki」',
      '「✨ Di Kamar Saja!」',
      '「💤 Hikki」, 「🌞 Hikikomori」',
      '/favicon.ico'
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
            this.bs.busy();
          }
        }
        else if (e1 instanceof NavigationEnd) {
          if (e1.url) {
            const str = e1.url.split('/')[1];
            if (str) {
              const stringBadge = `badge${str[0].toUpperCase()}${str.slice(1)}`;
              let arrBadge = this.ss[stringBadge];
              if (arrBadge) {
                arrBadge = [];
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
          }
          let activatedRouteChild = this.route.firstChild;
          for (const aRC of activatedRouteChild.children) {
            activatedRouteChild = aRC;
          }
          this.subsRouterChild = activatedRouteChild.data.subscribe({
            next: e2 => {
              this.updateBackgroundImage();
              this.pi.updatePageMetaData(
                e2.title,
                e2.description,
                e2.keywords,
                this.selectedBackgroundImage ? this.selectedBackgroundImage : '/favicon.ico'
              );
              if (this.gs.isBrowser) {
                this.bs.idle();
                this.fs.removeFab();
                this.checkStorage();
                this.siteContent.elementRef.nativeElement.scrollTop = 0;
              }
            }
          });
        }
      }
    });
  }

  updateBackgroundImage(): void {
    switch (this.router.url.substr(1).split('/').length) {
      case 1:
        if (this.router.url.startsWith('/verify') || this.router.url.startsWith('/about')) {
          this.selectedBackgroundImage = `/assets/img/bg-aboutverify.svg`;
        } else {
          this.selectedBackgroundImage = `/assets/img/router/bg-${this.router.url.substr(1).split('/')[0].split('?')[0]}.png`;
        }
        break;
      default:
        this.selectedBackgroundImage = ``;
    }
  }

  checkStorage(): void {
    const token = localStorage.getItem(environment.tokenName);
    if (token) {
      this.bs.busy();
      this.subsVerify = this.as.verify(token).subscribe({
        next: success => {
          this.gs.log('[VERIFY_SUCCESS]', success);
          this.bs.idle();
        },
        error: error => {
          this.gs.log('[VERIFY_ERROR]', error);
          this.bs.idle();
          this.as.removeUser();
        }
      });
    }
  }

}
