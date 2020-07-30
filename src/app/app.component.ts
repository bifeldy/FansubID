import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { onMainContentChange } from './_shared/animations/animations';

import { LeftMenuService } from './_shared/services/left-menu.service';
import { PageInfoService } from './_shared/services/page-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ]
})
export class AppComponent implements OnInit {

  public onSideNavChange: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pi: PageInfoService,
    private lms: LeftMenuService
  ) {
    this.lms.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
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
    });
  }

}
