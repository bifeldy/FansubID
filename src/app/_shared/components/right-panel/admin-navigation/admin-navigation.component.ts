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
    private gs: GlobalService,
    private adm: AdminService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get ADM(): AdminService {
    return this.adm;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      //
    }
  }

}
