import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Warna } from '../../../_shared/models/Warna';

import { GlobalService } from 'src/app/_shared/services/global.service';
import { FabService } from 'src/app/_shared/services/fab.service';

@Component({
  selector: 'app-fansub-detail',
  templateUrl: './fansub-detail.component.html',
  styleUrls: ['./fansub-detail.component.css']
})
export class FansubDetailComponent implements OnInit {

  fansubId = 0;

  fansubData = {
    id: 0,
    banner: 'https://db.silveryasha.web.id/upload/fansub/logo/bac9f307efff2768dac6d978e1bc69ab.jpg',
    title: 'Moesubs',
    description: 'Paman Sedang Istirahat!',
    url: 'https://moesubs.com',
  };

  chipData: any = [
    { id_tag: 1, name: 'Aktif', color: 'primary' },
    { id_tag: 2, name: 'Non-Aktif', color: 'accent' },
    { id_tag: 3, name: 'Sering Delay', color: 'warn' }
  ];

  panelData = [];

  tabData = [
    {
      name: 'Proyek',
      icon: 'live_tv',
      type: 'list',
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
        column: ['Upload', 'Nama File', 'Pemilik'],
        row: [
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 01 [BD][1080p].mkv', Pemilik: 'Bifeldy', Upload: '12:34:56' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 02 [BD][1080p].mkv', Pemilik: 'Bifeldy', Upload: '12:34:56' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 03 [BD][1080p].mkv', Pemilik: 'Bifeldy', Upload: '12:34:56' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 04 [BD][1080p].mkv', Pemilik: 'Bifeldy', Upload: '12:34:56' },
          { 'Nama File': '[FanSub] Berkas Dengan Judul Anime - 05 [BD][1080p].mkv', Pemilik: 'Bifeldy', Upload: '12:34:56' }
        ]
      }
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private gs: GlobalService,
    private fs: FabService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.fansubId = params.fansubId;
      this.chipData.map(g => (g.selected = true, g.color = Warna.BIRU));
      this.panelData.push({ title: 'Informasi', icon: 'notification_important', text: this.fansubData.description });
      this.fs.initializeFab('web', null, 'Buka Halaman Website Fansub', this.fansubData.url, true);
    });
  }

  openTag(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_TAG]', data);
  }

  openAnime(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_ANIME]', data);
  }

  openFile(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_FILE]', data);
  }

}
