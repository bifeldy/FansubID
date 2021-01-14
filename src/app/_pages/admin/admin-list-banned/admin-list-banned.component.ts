import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';

@Component({
  selector: 'app-admin-list-banned',
  templateUrl: './admin-list-banned.component.html',
  styleUrls: ['./admin-list-banned.component.css']
})
export class AdminListBannedComponent implements OnInit {

  constructor(
    public gs: GlobalService,
    public adm: AdminService
  ) {
  }

  ngOnInit(): void {
  }

}
