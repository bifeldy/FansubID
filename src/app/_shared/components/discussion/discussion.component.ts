import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit, OnDestroy {

  urlPath = null;

  constructor(
    private router: Router,
    public gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.urlPath = this.router.url;
    }
  }

  ngOnDestroy(): void {
    this.urlPath = null;
  }

}
