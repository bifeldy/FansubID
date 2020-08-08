import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Warna } from '../../../_shared/models/Warna';

import { GlobalService } from '../../../_shared/services/global.service';
import { FabService } from '../../../_shared/services/fab.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';

@Component({
  selector: 'app-fansub-detail',
  templateUrl: './fansub-detail.component.html',
  styleUrls: ['./fansub-detail.component.css']
})
export class FansubDetailComponent implements OnInit {

  fansubData = null;

  chipData = [];
  panelData = [];

  tabData = [
    {
      name: 'Proyek',
      icon: 'live_tv',
      type: 'list',
      data: [
        { title: 'Anime 01 Long Title', description: '1/24 Episodes' },
        { title: 'Anime 02 Long Title', description: '3/24 Episodes' },
        { title: 'Anime 03 Long Title', description: '6/12 Episodes' },
        { title: 'Anime 04 Long Title', description: '12/12 Episodes' },
        { title: 'Anime 05 Long Title', description: '0/24 Episodes' },
        { title: 'Anime 06 Long Title', description: '1/24 Episodes' },
        { title: 'Anime 07 Long Title', description: '3/24 Episodes' },
        { title: 'Anime 08 Long Title', description: '6/24 Episodes' },
        { title: 'Anime 09 Long Title', description: '12/24 Episodes' },
        { title: 'Anime 10 Long Title', description: '24/24 Episodes' },
        { title: 'Anime 11 Long Title', description: '1/64 Episodes' },
        { title: 'Anime 12 Long Title', description: '2/64 Episodes' },
        { title: 'Anime 13 Long Title', description: '4/64 Episodes' },
        { title: 'Anime 14 Long Title', description: '8/64 Episodes' },
        { title: 'Anime 15 Long Title', description: '16/64 Episodes' },
        { title: 'Anime 16 Long Title', description: '32/64 Episodes' },
        { title: 'Anime 17 Long Title', description: '64/64 Episodes' }
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
    private router: Router,
    private gs: GlobalService,
    private fs: FabService,
    private pi: PageInfoService,
    private fansub: FansubService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.fansub.getFansub(params.fansubId).subscribe(
        res => {
          this.gs.log('[FANSUB_DETAIL_SUCCESS]', res);
          this.fansubData = res.result;
          if (Array.isArray(this.fansubData.tags)) {
            for (let i = 0; i < this.fansubData.tags.length; i++) {
              this.chipData.push({ id_tag: i, name: this.fansubData.tags[i], color:  Warna.BIRU, selected: true });
            }
          }
          this.pi.updatePageMetaData(
            `${this.fansubData.name}`,
            `${this.fansubData.description}`,
            `${this.fansubData.tags.join(', ')}`,
            this.getUrlByName('web')
          );
          this.panelData.push({ title: 'Informasi', icon: 'notification_important', text: this.fansubData.description });
          this.fs.initializeFab('web', null, 'Buka Halaman Website Fansub', this.getUrlByName('web'), true);
        },
        err => {
          this.gs.log('[FANSUB_DETAIL_ERROR]', err);
          this.router.navigate(['/error'], {
            queryParams: {
              returnUrl: '/fansub'
            }
          });
        }
      );
    });
  }

  getUrlByName(name): string {
    const fansubDataUrl = this.fansubData.urls.find(u => u.name === name);
    if (fansubDataUrl) {
      return fansubDataUrl.url;
    } else {
      return null;
    }
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

  editFansubData(): void {
    this.gs.log('[FANSUB_DETAIL_CLICK_EDIT]', this.fansubData.id);
  }

}
