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

  fansubId = 0;
  fansubData = null;

  count = 0;
  page = 1;
  row = 10;
  q = '';
  berkasFansub = [];

  chipData = [];

  panelData = [];

  tabData: any = [
    {
      name: 'Proyek',
      icon: 'live_tv',
      type: 'list',
      data: [
        { title: '// TODO: Judul Panjang Garapan Anime 01', description: '// TODO: Berkas Terkini :: 01/24 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 02', description: '// TODO: Berkas Terkini :: 03/24 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 03', description: '// TODO: Berkas Terkini :: 06/12 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 04', description: '// TODO: Berkas Terkini :: 12/12 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 05', description: '// TODO: Berkas Terkini :: 00/24 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 06', description: '// TODO: Berkas Terkini :: 01/24 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 07', description: '// TODO: Berkas Terkini :: 03/24 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 08', description: '// TODO: Berkas Terkini :: 06/24 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 09', description: '// TODO: Berkas Terkini :: 12/24 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 10', description: '// TODO: Berkas Terkini :: 24/24 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 11', description: '// TODO: Berkas Terkini :: 01/64 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 12', description: '// TODO: Berkas Terkini :: 02/64 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 13', description: '// TODO: Berkas Terkini :: 04/64 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 14', description: '// TODO: Berkas Terkini :: 08/64 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 15', description: '// TODO: Berkas Terkini :: 16/64 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 16', description: '// TODO: Berkas Terkini :: 32/64 Episodes' },
        { title: '// TODO: Judul Panjang Garapan Anime 17', description: '// TODO: Berkas Terkini :: 64/64 Episodes' }
      ]
    },
    {
      name: 'Berkas Terkait',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Upload', 'Nama File', 'Pemilik'],
        row: []
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
      this.fansubId = params.fansubId;
      this.fansub.getFansub(this.fansubId).subscribe(
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
          this.getBerkasFansub();
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

  getBerkasFansub(): void {
    this.fansub.getBerkasFansub({
      data: window.btoa(JSON.stringify({
        fansubId: [this.fansubId]
      }))
    }, this.q, this.page, this.row).subscribe(
      res => {
        this.gs.log('[BERKAS_ANIME_SUCCESS]', res);
        this.count = res.count;
        this.berkasFansub = [];
        for (const r of res.results[this.fansubId]) {
          this.berkasFansub.push({
            id: r.id,
            Pemilik: r.user_.username,
            Upload: r.created_at,
            'Nama File': r.name
          });
        }
        this.tabData[1].data.row = this.berkasFansub;
      },
      err => {
        this.gs.log('[BERKAS_FANSUB_ERROR]', err);
      }
    );
  }

  editFansubData(): void {
    this.router.navigateByUrl(`/fansub/${this.fansubId}/edit`);
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[BERKAS_FANSUB_ENTER_FILTER]', data);
    this.q = data;
    this.getBerkasFansub();
  }

  onPaginatorClicked(data): void {
    this.gs.log('[FANSUB_DETAIL_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getBerkasFansub();
  }

  openFile(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_FILE]', data);
    this.router.navigateByUrl(`/berkas/${data.id}`);
  }

  openAnime(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_ANIME]', data);
  }

  openTag(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_TAG]', data);
  }

}
