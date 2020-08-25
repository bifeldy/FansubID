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
    public router: Router,
    public gs: GlobalService,
    public notif: NotificationsService
  ) {
  }

  ngOnInit(): void {
  }

  removeNotif(i: number): void {
    this.notif.removeNotif(i);
  }

}
