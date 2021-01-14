import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';

@Component({
  selector: 'app-admin-list-project-type',
  templateUrl: './admin-list-project-type.component.html',
  styleUrls: ['./admin-list-project-type.component.css']
})
export class AdminListProjectTypeComponent implements OnInit {

  constructor(
    public gs: GlobalService,
    public adm: AdminService
  ) {
  }

  ngOnInit(): void {
  }

}
