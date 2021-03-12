import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../../services/admin.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent implements OnInit {

  constructor(
    public gs: GlobalService,
    public adm: AdminService
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

}
