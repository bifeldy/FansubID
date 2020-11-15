import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private as: AuthService,
    private toast: ToastrService,
    private gs: GlobalService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.as.currentUserValue;
    if (currentUser) {
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        if (this.gs.isBrowser) {
          this.toast.error(`Membutuhkan Role :: ${route.data.roles.join(' / ')}`, 'Whoops, Akses Ditolak!');
        }
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    if (this.gs.isBrowser) {
      this.toast.error(`Harap Login Terlebih Dahulu~`, 'Whoops, Akses Ditolak!');
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
