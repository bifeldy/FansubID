import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/_shared/services/global.service';

@Component({
  selector: 'app-fansub-detail',
  templateUrl: './fansub-detail.component.html',
  styleUrls: ['./fansub-detail.component.css']
})
export class FansubDetailComponent implements OnInit {

  fansubId = 0;

  panelData = [];

  tabData = [
    {
      name: 'Proyek Anime',
      icon: 'live_tv',
      type: 'grid',
      data: [
        { title: 'Anime 01 Long Title' },
        { title: 'Anime 02 Long Title' },
        { title: 'Anime 03 Long Title' },
        { title: 'Anime 04 Long Title' },
        { title: 'Anime 05 Long Title' },
        { title: 'Anime 06 Long Title' },
        { title: 'Anime 07 Long Title' },
        { title: 'Anime 08 Long Title' },
        { title: 'Anime 09 Long Title' },
        { title: 'Anime 10 Long Title' },
      ]
    },
    {
      name: 'Berkas Terkait',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Tanggal Upload', 'Nama File', 'Pemilik'],
        row: [
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 01 [BD][1080p].mkv', Pemilik: 'Bifeldy', 'Tanggal Upload': '12:34:56 AM JST+9' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 02 [BD][1080p].mkv', Pemilik: 'Bifeldy', 'Tanggal Upload': '12:34:56 AM JST+9' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 03 [BD][1080p].mkv', Pemilik: 'Bifeldy', 'Tanggal Upload': '12:34:56 AM JST+9' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 04 [BD][1080p].mkv', Pemilik: 'Bifeldy', 'Tanggal Upload': '12:34:56 AM JST+9' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 05 [BD][1080p].mkv', Pemilik: 'Bifeldy', 'Tanggal Upload': '12:34:56 AM JST+9' }
        ]
      }
    }
  ];

  /** TODO: */

  banner = 'https://db.silveryasha.web.id/upload/fansub/logo/bac9f307efff2768dac6d978e1bc69ab.jpg';

  url = 'https://moesubs.com';
  title = 'Moesubs';
  description = 'Paman Sedang Istirahat!';

  tags = [
    { id_tag: 1, name: 'Aktif', color: 'primary' },
    { id_tag: 2, name: 'Non-Aktif', color: 'accent' },
    { id_tag: 3, name: 'Sering Delay', color: 'warn' }
  ];

  /** TODO: */

  constructor(
    private activatedRoute: ActivatedRoute,
    private gs: GlobalService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.fansubId = params.fansubId;
      this.gs.log('[FANSUB_DETAIL_PAGE]', this.fansubId);
      this.panelData.push({ title: 'Informasi', icon: 'notification_important', text: this.description });
    });
  }

  openWeb(linkAddress: string): void {
    window.open(linkAddress, '_blank');
  }

}
