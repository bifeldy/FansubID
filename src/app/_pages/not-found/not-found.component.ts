import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalService } from '../../_shared/services/global.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  returnUrl = '/';

  timedOut = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
      if (this.returnUrl) {
        this.timedOut = setTimeout(() => {
          this.router.navigateByUrl(this.returnUrl);
        }, 5000);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.timedOut) {
      clearTimeout(this.timedOut);
    }
  }

}
