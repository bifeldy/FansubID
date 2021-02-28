import { Injectable } from '@angular/core';

import User from '../models/User';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  currentUser: User = null;

  notifications = [
    {
      notifCreator: null,
      notifData: {
        id: 0,
        type: 'info',
        title: 'Pemberitahuan!',
        content: 'Website masih dalam tahap pengembangan sehingga belum semua fitur tersedia. Jika Ingin Request Fitur Dapat Menghubungi \'<a href="https://discordapp.com/users/306076547616473089" target="_blank" class="text-decoration-none">Bifeldy#0001</a>\'. Terima kasih. ^_^',
        dismissible: true
      }
    }
  ];

  dissmissTimeout = {};

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  addNotif(notifCreator, notifId, notifType, notifTitle, notifContent, dismissible = true): void {
    if (dismissible) {
      this.dissmissTimeout[notifId] = setTimeout(() => this.removeNotif(notifId), 5000);
    }
    this.notifications.splice(0, 0, {
      notifCreator,
      notifData: {
        id: notifId,
        type: notifType,
        title: notifTitle,
        content: notifContent,
        dismissible
      }
    });
  }

  removeNotif(id: number): void {
    if (this.dissmissTimeout[id]) {
      clearTimeout(this.dissmissTimeout[id]);
      this.dissmissTimeout[id] = null;
      delete this.dissmissTimeout[id];
    }
    setTimeout(() => {
      const verifyNotifIdx = this.notifications.findIndex(n => n.notifData.id === id);
      if (verifyNotifIdx >= 0) {
        this.notifications = this.notifications.slice(0, verifyNotifIdx).concat(
          this.notifications.slice(verifyNotifIdx + 1, this.notifications.length)
        );
      }
    }, 500);
  }

}
