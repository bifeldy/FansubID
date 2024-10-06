import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

import { CONSTANTS } from '../../../constants';

import { AuthService } from '../services/auth.service';
import { BusyService } from '../services/busy.service';
import { GlobalService } from '../services/global.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class VerifiedGuard implements CanActivate {

  constructor(
    private router: Router,
    private as: AuthService,
    private toast: ToastService,
    private gs: GlobalService,
    private bs: BusyService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const verifiedOnly = route.data[CONSTANTS.decoratorVerifiedOnly];
    if (!verifiedOnly) {
      return true;
    }
    if (this.gs.isBrowser) {
      const user = this.as.currentUserSubject?.value;
      if (user) {
        if (user.verified) {
          return true;
        }
        this.bs.clear();
        this.toast.error('Khusus Pengguna Terverifikasi', 'Whoops, Akses Ditolak!', null, true);
        this.router.navigateByUrl('/verify');
        return false;
      }
      this.bs.clear();
      this.toast.error(`Harap Login Terlebih Dahulu~`, 'Whoops, Akses Ditolak!', null, true);
    }
    this.router.navigate(['/login'], {
      queryParams: {
        ...route.queryParams,
        returnUrl: state.url
      }
    });
    return false;
  }

}
