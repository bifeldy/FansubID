import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalService } from '../../_shared/services/global.service';
import { ServerResponseService } from '../../_shared/services/server-response.service';

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
    private activatedRoute: ActivatedRoute,
    private gs: GlobalService,
    private ssr: ServerResponseService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
    this.ssr.setNotFound();
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
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
      this.timedOut = null;
    }
  }

}
