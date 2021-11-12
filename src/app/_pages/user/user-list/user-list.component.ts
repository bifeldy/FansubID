import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { AuthService } from '../../../_shared/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  timedOut = null;

  constructor(
    private router: Router,
    public as: AuthService,
    public gs: GlobalService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.timedOut = setTimeout(() => {
        this.router.navigateByUrl(`/user/${this.as.currentUserValue.username}`);
      }, 1234);
    }
  }

  ngOnDestroy(): void {
    if (this.timedOut) {
      clearTimeout(this.timedOut);
      this.timedOut = null;
    }
  }

}
