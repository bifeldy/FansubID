import { Injectable } from '@angular/core';

import User from '../models/User';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  currentUser: User = null;

  notifications = [
    {
      id: 0,
      type: 'info',
      title: 'Pemberitahuan!',
      content: 'Website masih dalam tahap pengembangan sehingga belum semua fitur tersedia. Jika Ingin Request Fitur Dapat Menghubungi \'<a href="https://discordapp.com/users/306076547616473089" target="_blank" class="text-decoration-none">Bifeldy#4945</a>\'. Terima kasih. ^_^'
    }
  ];

  constructor(
    public as: AuthService
  ) {
    this.as.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser && !this.currentUser.verified) {
        const verifyNotifIdx = this.notifications.findIndex(n => n.id === -1);
        if (verifyNotifIdx < 0) {
          this.notifications.splice(0, 0, {
            id: -1,
            type: 'warning',
            title: 'Verifikasi!',
            content: 'Fitur lampiran berkas DDL tidak dapat digunakan, silahkan <a href="/verify" class="text-decoration-none"> verifikasi akun </a> terlebih dahulu. Terima kasih. ^_^'
          });
        }
      } else {
        this.removeNotif(-1);
      }
    });
  }

  addNotif(notifId, notifType, notifTitle, notifContent): void {
    this.notifications.push({
      id: notifId,
      type: notifType,
      title: notifTitle,
      content: notifContent
    });
  }

  removeNotif(id: number): void {
    setTimeout(() => {
      const verifyNotifIdx = this.notifications.findIndex(n => n.id === id);
      if (verifyNotifIdx >= 0) {
        this.notifications = this.notifications.slice(0, verifyNotifIdx).concat(
          this.notifications.slice(verifyNotifIdx + 1, this.notifications.length)
        );
      }
    }, 500);
  }

}
