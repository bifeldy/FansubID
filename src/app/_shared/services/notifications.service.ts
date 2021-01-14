import { Injectable } from '@angular/core';

import User from '../models/User';

import { AuthService } from './auth.service';
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
        content: 'Website masih dalam tahap pengembangan sehingga belum semua fitur tersedia. Jika Ingin Request Fitur Dapat Menghubungi \'<a href="https://discordapp.com/users/306076547616473089" target="_blank" class="text-decoration-none">Bifeldy#4945</a>\'. Terima kasih. ^_^',
        dismissible: true
      }
    }
  ];

  dissmissTimeout = {};

  constructor(
    private as: AuthService,
    private gs: GlobalService
  ) {
    if (this.gs.isBrowser) {
      this.as.currentUser.subscribe(user => {
        this.currentUser = user;
        if (this.currentUser && !this.currentUser.verified) {
          const verifyNotifIdx = this.notifications.findIndex(n => n.notifData.id === -1);
          if (verifyNotifIdx < 0) {
            this.notifications.splice(0, 0, {
              notifCreator: null,
              notifData: {
                id: -1,
                type: 'warning',
                title: 'Verifikasi!',
                content: 'Fitur lampiran berkas DDL tidak dapat digunakan, silahkan <a href="/verify-discord" class="text-decoration-none"> verifikasi akun </a> terlebih dahulu. Terima kasih. ^_^',
                dismissible: false
              }
            });
          }
          const pemerintahNotifIdx = this.notifications.findIndex(n => n.notifData.id === -2);
          if (pemerintahNotifIdx < 0) {
            this.notifications.splice(0, 0, {
              notifCreator: null,
              notifData: {
                id: -2,
                type: 'danger',
                title: 'Verifikasi!',
                content: 'Fitur verifikasi KTP tidak dapat digunakan saat ini karena pemerintah telah fixing kebocoran data. Silahkan gunakan metode verifikasi lain seperti Discord. Terima kasih. ^_^',
                dismissible: false
              }
            });
          }
        } else {
          this.removeNotif(-1);
          this.removeNotif(-2);
        }
      });
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
