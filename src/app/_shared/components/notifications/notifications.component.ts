import { Component, OnInit } from '@angular/core';

import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(
    public router: Router,
    public notif: NotificationsService
  ) { }

  ngOnInit(): void {
  }

}
