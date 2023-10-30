import { Injectable } from '@angular/core';

import { environment } from '../../../environments/app/environment';

import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications = [];

  dissmissTimeout = {};
  timedOut = null;

  constructor(
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      this.notifications.push({
        notifCreator: null,
        notifData: {
          id: `${environment.siteName.toUpperCase()}_UNDER_DEVELOPMENT`,
          type: 'info',
          title: 'Pemberitahuan!',
          content: `
            Jika ingin request fitur baru ataupun melaporkan <i>Bug</i> dapat menulis pesan di kanal
            '<a href="https://discord.gg/xGWdExk" target="_blank" class="text-decoration-none">#dev-prog</a>'.
            Termasuk juga melihat dan mencari semua log aktivitas secara transparan (terbuka) ada di kanal
            '<a href="https://discord.gg/xGWdExk" target="_blank" class="text-decoration-none">#aktivitas</a>'.
            Terima kasih. ^_^
          `,
          dismissible: true
        }
      });
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
    this.timedOut = setTimeout(() => {
      const verifyNotifIdx = this.notifications.findIndex(n => n.notifData.id === id);
      if (verifyNotifIdx >= 0) {
        this.notifications = this.notifications.slice(0, verifyNotifIdx).concat(
          this.notifications.slice(verifyNotifIdx + 1, this.notifications.length)
        );
      }
    }, 500);
  }

}
