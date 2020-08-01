import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { onMainContentChange } from './_shared/animations/animations';

import { environment } from '../environments/environment';

import { LeftMenuService } from './_shared/services/left-menu.service';
import { PageInfoService } from './_shared/services/page-info.service';
import { AuthService } from './_shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ]
})
export class AppComponent implements OnInit {

  selectedBackgroundImage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pi: PageInfoService,
    private lms: LeftMenuService,
    private as: AuthService
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
      document.querySelector('mat-sidenav-content').scroll({top: 0, left: 10, behavior: 'smooth'});
    });
    const token = localStorage.getItem(environment.tokenName);
    if (token) {
      this.as.verify(token).subscribe(success => {}, error => this.as.logout());
    }
  }

  updateBackgroundImage(): void {
    switch (this.router.url.substr(1).split('/').length) {
      case 1:
        this.selectedBackgroundImage = `/assets/img/router/bg-${this.router.url.substr(1).split('/')[0]}.png`;
        break;
      default:
        this.selectedBackgroundImage = ``;
    }
  }

  closeSideNav(): void {
    this.lms.onMouseHoverOut();
  }

}
