import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(
    public gs: GlobalService,
    public adm: AdminService
  ) { }

  ngOnInit(): void {
  }

}
