import { Injectable } from '@angular/core';

import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';

import { GlobalService } from './global.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private gs: GlobalService,
    private toast: ToastrService,
    private notif: NotificationsService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  remove(toastId): boolean {
    return this.toast.remove(toastId);
  }

  success(message?: string, title?: string, override?: Partial<IndividualConfig>, force = false): ActiveToast<any> {
    if (force) {
      this.notif.addNotif(null, Date.now(), 'success', title, message);
    }
    if (this.gs.isDesktop || force) {
      return this.toast.success(message, title, override);
    }
    return null;
  }

  warning(message?: string, title?: string, override?: Partial<IndividualConfig>, force = false): ActiveToast<any> {
    if (force) {
      this.notif.addNotif(null, Date.now(), 'warning', title, message);
    }
    if (this.gs.isDesktop || force) {
      return this.toast.warning(message, title, override);
    }
    return null;
  }

  info(message?: string, title?: string, override?: Partial<IndividualConfig>, force = false): ActiveToast<any> {
    if (force) {
      this.notif.addNotif(null, Date.now(), 'info', title, message);
    }
    if (this.gs.isDesktop || force) {
      return this.toast.info(message, title, override);
    }
    return null;
  }

  error(message?: string, title?: string, override?: Partial<IndividualConfig>, force = false): ActiveToast<any> {
    if (force) {
      this.notif.addNotif(null, Date.now(), 'danger', title, message);
    }
    if (this.gs.isDesktop || force) {
      return this.toast.error(message, title, override);
    }
    return null;
  }

}
