import { Component, OnInit } from '@angular/core';

import { GlobalService } from 'src/app/_shared/services/global.service';
import { Router } from '@angular/router';
import { FabService } from 'src/app/_shared/services/fab.service';

@Component({
  selector: 'app-fansub-list',
  templateUrl: './fansub-list.component.html',
  styleUrls: ['./fansub-list.component.css']
})
export class FansubListComponent implements OnInit {

  fansubData = [
    {
      id: 1,
      Logo: 'https://db.silveryasha.web.id/upload/fansub/logo/bac9f307efff2768dac6d978e1bc69ab.jpg',
      Status: 'Tidak Aktif',
      'Nama Fansub': 'Nama Fansub 01 Yang Panjang',
      'Total Proyek': '123 Garapan',
      'Tautan Komunitas': [
        { type: 'button', icon: 'web', url: 'http://www.google.com', name: 'Google' },
        { type: 'button', icon: 'facebook', url: 'http://www.facebook.com', name: 'Facebook' },
        { type: 'button', image: '/assets/img/discord-blue.png', url: 'http://www.discord.com', name: 'Discord' }
      ]
    },
    {
      id: 2,
      Logo: 'https://db.silveryasha.web.id/upload/fansub/logo/bac9f307efff2768dac6d978e1bc69ab.jpg',
      Status: 'Tidak Aktif',
      'Nama Fansub': 'Nama Fansub 02 Yang Panjang',
      'Total Proyek': '234 Garapan',
      'Tautan Komunitas': [
        { type: 'button', icon: 'web', url: 'http://www.google.com', name: 'Google' },
        { type: 'button', icon: 'facebook', url: 'http://www.facebook.com', name: 'Facebook' }
      ]
    },
    {
      id: 3,
      Logo: 'https://db.silveryasha.web.id/upload/fansub/logo/bac9f307efff2768dac6d978e1bc69ab.jpg',
      Status: 'Tidak Aktif',
      'Nama Fansub': 'Nama Fansub 03 Yang Panjang',
      'Total Proyek': '345 Garapan',
      'Tautan Komunitas': [
        { type: 'button', icon: 'web', url: 'http://www.google.com', name: 'Google' },
        { type: 'button', icon: 'facebook', url: 'http://www.facebook.com', name: 'Facebook' }
      ]
    }
  ];

  tabData: any = [
    {
      name: 'Katalog Fansub',
      icon: 'closed_caption',
      type: 'table',
      data: {
        column: ['Status', 'Logo', 'Nama Fansub', 'Total Proyek', 'Tautan Komunitas'],
        row: []
      }
    }
  ];

  constructor(
    private router: Router,
    private gs: GlobalService,
    private fs: FabService
  ) { }

  ngOnInit(): void {
    this.tabData[0].data.row = this.fansubData;
    this.fs.initializeFab('add', null, 'Tambahkan Fansub Baru', '/fansub/add', false);
  }
  openFansub(data): void {
    this.router.navigateByUrl(`/fansub/${data.id}`);
  }

}
