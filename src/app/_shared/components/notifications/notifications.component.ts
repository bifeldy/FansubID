import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications = [
    {
      title: '// TODO: Pemberitahuan!',
      content: 'Website masih dalam tahap pengembangan sehingga belum semua fitur tersedia. Jika Ingin Request Fitur Dapat Menghubungi \'<a href="https://discordapp.com/users/306076547616473089" target="_blank" class="text-decoration-none">Bifeldy#4945</a>\'. Terima kasih. ^_^'
    }
  ];

  constructor(
    public router: Router,
    public gs: GlobalService
  ) {
  }

  ngOnInit(): void {
  }

  removeNotif(i: number): void {
    setTimeout(() => {
      this.notifications = this.notifications.slice(0, i).concat(
        this.notifications.slice(i + 1, this.notifications.length)
      );
    }, 500);
  }

}
