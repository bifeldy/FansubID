import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { CONSTANTS } from '../../../constants';

import { RoleModel } from '../../../models/req-res.model';

import { AuthService } from '../services/auth.service';
import { BusyService } from '../services/busy.service';
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

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
    const requiredRoles: RoleModel[] = route.data[CONSTANTS.decoratorRoles];
    if (!requiredRoles) {
      return true;
    }
    if (this.gs.isBrowser) {
      const user = this.as.currentUserSubject.value;
      if (user) {
        const isAllowed = requiredRoles.includes(user.role);
        if (isAllowed) {
          return true;
        }
        this.bs.clear();
        this.toast.error(`Membutuhkan Role :: ${requiredRoles.join(' / ')}`, 'Whoops, Akses Ditolak!');
        this.router.navigateByUrl(this.gs.previousUrl || '/');
        return false;
      }
      this.bs.clear();
      this.toast.error(`Harap Login Terlebih Dahulu~`, 'Whoops, Akses Ditolak!');
    }
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: state.url
      }
    });
    return false;
  }

}
