import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { onMainContentChange } from './_shared/animations/anim-side-menu';

import { environment } from '../environments/environment';

import { LeftMenuService } from './_shared/services/left-menu.service';
import { PageInfoService } from './_shared/services/page-info.service';
import { AuthService } from './_shared/services/auth.service';
import { FabService } from './_shared/services/fab.service';
import { BusyService } from './_shared/services/busy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ]
})
export class AppComponent implements OnInit {

  @ViewChild('leftSideNavContent') leftSideNavContent;

  selectedBackgroundImage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bs: BusyService,
    private pi: PageInfoService,
    private lms: LeftMenuService,
    private as: AuthService,
    private fs: FabService
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(e1 => {
      if (e1 instanceof RouteConfigLoadStart) {
        this.bs.busy();
      }
      else if (e1 instanceof RouteConfigLoadEnd) {
        this.bs.idle();
      }
      else if (e1 instanceof NavigationEnd) {
        this.route.firstChild.data.subscribe(e2 => {
          this.pi.updatePageMetaData(e2.title, e2.description, e2.keywords);
          this.pi.updatePageData(e2.title, e2.description, e2.keywords);
          this.updateBackgroundImage();
          this.leftSideNavContent.nativeElement.scrollTop = 0;
          this.fs.removeFab();
        });
      }
    });
    const token = localStorage.getItem(environment.tokenName);
    if (token) {
      this.as.verify(token).subscribe(success => {}, error => this.as.logout());
    }
  }

  updateBackgroundImage(): void {
    switch (this.router.url.substr(1).split('/').length) {
      case 1:
        this.selectedBackgroundImage = `/assets/img/router/bg-${this.router.url.substr(1).split('/')[0].split('?')[0]}.png`;
        break;
      default:
        this.selectedBackgroundImage = ``;
    }
  }

  closeSideNav(): void {
    this.lms.onMouseHoverOut();
  }

}
