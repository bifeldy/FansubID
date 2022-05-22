import { Injectable } from '@angular/core';

import { environment } from '../../../environments/app/environment';

import { UserModel } from '../../../models/req-res.model';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  currentUser: UserModel = null;

  notifications = [
    {
      notifCreator: null,
      notifData: {
        id: `${environment.siteName.toUpperCase()}_UNDER_DEVELOPMENT`,
        type: 'info',
        title: 'Pemberitahuan!',
        content: `
          Website masih dalam tahap pengembangan. Jika ingin request fitur baru ataupun melaporkan
          <i>Bug</i> dapat menulis pesan di kanal Discord '<a href="https://discord.gg/xGWdExk"
          target="_blank" class="text-decoration-none">#dev-prog</a>'. Terima kasih. ^_^
        `,
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
      this.dissmissTimeout[notifId] = setTimeout(() => this.removeNotif(notifId), 10000);
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

  removeNotif(id): void {
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
