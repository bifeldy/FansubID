import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-fansub-detail',
  templateUrl: './fansub-detail.component.html',
  styleUrls: ['./fansub-detail.component.css']
})
export class FansubDetailComponent implements OnInit {

  banner = 'https://db.silveryasha.web.id/upload/fansub/logo/bac9f307efff2768dac6d978e1bc69ab.jpg';

  url = 'https://moesubs.com';
  title = 'Moesubs';
  description = 'Paman Sedang Istirahat!';

  tags = [
    { id_tag: 1, name: 'Aktif', color: 'primary' },
    { id_tag: 2, name: 'Non-Aktif', color: 'accent' },
    { id_tag: 3, name: 'Sering Delay', color: 'warn' }
  ];

  tabData = [
    {
      name: 'Proyek Anime',
      icon: 'live_tv',
      type: 'grid',
      data: [
        { title: 'Anime 01 Long Title', },
        { title: 'Anime 02 Long Title', },
        { title: 'Anime 03 Long Title', },
        { title: 'Anime 04 Long Title', },
        { title: 'Anime 05 Long Title', },
        { title: 'Anime 06 Long Title', },
        { title: 'Anime 07 Long Title', },
        { title: 'Anime 08 Long Title', },
        { title: 'Anime 09 Long Title', },
        { title: 'Anime 10 Long Title', },
        { title: 'Anime 11 Long Title', },
        { title: 'Anime 12 Long Title', },
        { title: 'Anime 13 Long Title', },
        { title: 'Anime 14 Long Title', },
        { title: 'Anime 15 Long Title', },
        { title: 'Anime 16 Long Title', },
        { title: 'Anime 17 Long Title', },
        { title: 'Anime 18 Long Title', },
        { title: 'Anime 19 Long Title', },
        { title: 'Anime 20 Long Title', }
      ]
    },
    {
      name: 'Berkas Terkait',
      icon: 'file_copy',
      type: 'table',
      data: [
        { title: 'Berkas_01.mkv', description: 'Berkas Description 01 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_02.mkv', description: 'Berkas Description 02 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_03.mkv', description: 'Berkas Description 03 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_04.mkv', description: 'Berkas Description 04 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_05.mkv', description: 'Berkas Description 05 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_06.mkv', description: 'Berkas Description 06 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_07.mkv', description: 'Berkas Description 07 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_08.mkv', description: 'Berkas Description 08 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_09.mkv', description: 'Berkas Description 09 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' },
        { title: 'Berkas_10.mkv', description: 'Berkas Description 10 With Very Long Text ...', author: 'Bifeldy', createdAt: '12:34:56 AM JST+9' }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  openWeb(linkAddress: string): void {
    window.open(linkAddress, '_blank');
  }

}
