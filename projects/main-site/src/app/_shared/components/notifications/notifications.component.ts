import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../services/global.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(
    private router: Router,
    private gs: GlobalService,
    private notif: NotificationsService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get ROUTER(): Router {
    return this.router;
  }

  get NOTIF(): NotificationsService {
    return this.notif;
  }

  removeNotif(id): void {
    this.notif.removeNotif(id);
  }

}
