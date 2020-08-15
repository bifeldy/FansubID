import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../_shared/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private router: Router,
    public as: AuthService
  ) {
    if (this.as.currentUserValue) {
      this.router.navigateByUrl(`/user/${this.as.currentUserValue.username}`);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

}