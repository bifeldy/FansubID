import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../services/auth.service';
import { BusyService } from '../services/busy.service';
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private as: AuthService,
    private toast: ToastrService,
    private gs: GlobalService,
    private bs: BusyService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.gs.isBrowser) {
      const currentUser = this.as.currentUserValue;
      if (currentUser) {
        if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {
          this.toast.error(`Membutuhkan Role :: ${route.data['roles'].join(' / ')}`, 'Whoops, Akses Ditolak!');
          this.bs.idle();
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      }
      this.toast.error(`Harap Login Terlebih Dahulu~`, 'Whoops, Akses Ditolak!');
      this.bs.idle();
    }
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: state.url
      }
    });
    return false;
  }

}
