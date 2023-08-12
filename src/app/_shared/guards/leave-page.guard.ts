import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { GlobalService } from '../services/global.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LeavePageGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor(
    private gs: GlobalService,
    private router: Router
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    if (this.router.getCurrentNavigation()?.extras?.state?.['bypassCanDeactivate']) {
      return true;
    }
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
