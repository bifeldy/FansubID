import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { onMainContentChange } from './_shared/animations/anim-side-menu';

import { environment } from '../environments/environment';

import { LeftMenuService } from './_shared/services/left-menu.service';
import { PageInfoService } from './_shared/services/page-info.service';
import { AuthService } from './_shared/services/auth.service';
import { FabService } from './_shared/services/fab.service';

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
    private pi: PageInfoService,
    private lms: LeftMenuService,
    private as: AuthService,
    private fs: FabService
  ) {
  }

  ngOnInit(): void {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .pipe(map(() => this.route))
    .pipe(map((route) => {
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    }))
    .pipe(filter((route) => route.outlet === 'primary'))
    .pipe(mergeMap((route) => route.data))
    .subscribe((event) => {
      this.pi.updatePageMetaData(event.title, event.description, event.keywords);
      this.pi.updatePageData(event.title, event.description, event.keywords);
      this.updateBackgroundImage();
      this.leftSideNavContent.nativeElement.scrollTop = 0;
      this.fs.removeFab();
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
