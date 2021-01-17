import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';

@Component({
  selector: 'app-admin-list-cors',
  templateUrl: './admin-list-cors.component.html',
  styleUrls: ['./admin-list-cors.component.css']
})
export class AdminListCorsComponent implements OnInit {

  constructor(
    public gs: GlobalService,
    public adm: AdminService
  ) {
  }

  ngOnInit(): void {
  }

}
