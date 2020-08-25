import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notifications = [
    {
      title: '// TODO: Pemberitahuan!',
      content: 'Website masih dalam tahap pengembangan sehingga belum semua fitur tersedia. Jika Ingin Request Fitur Dapat Menghubungi \'<a href="https://discordapp.com/users/306076547616473089" target="_blank" class="text-decoration-none">Bifeldy#4945</a>\'. Terima kasih. ^_^'
    }
  ];

  constructor() {
  }

  removeNotif(i: number): void {
    setTimeout(() => {
      this.notifications = this.notifications.slice(0, i).concat(
        this.notifications.slice(i + 1, this.notifications.length)
      );
    }, 500);
  }

}
