import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Warna } from '../../../_shared/models/Warna';

import { GlobalService } from '../../../_shared/services/global.service';
import { FabService } from '../../../_shared/services/fab.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { BusyService } from '../../../_shared/services/busy.service';

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

  animeFansub = [];
  berkasFansub = [];

  chipData = [];

  panelData = [];

  tabData: any = [
    {
      name: 'Proyek',
      icon: 'live_tv',
      type: 'list',
      data: []
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
    private bs: BusyService,
    private gs: GlobalService,
    private fs: FabService,
    private pi: PageInfoService,
    private fansub: FansubService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.fansubId = params.fansubId;
      this.bs.busy();
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
          this.panelData = [];
          this.panelData.push({ title: 'Informasi', icon: 'notification_important', text: this.fansubData.description });
          this.fs.initializeFab('web', null, 'Buka Halaman Website Fansub', this.getUrlByName('web'), true);
          this.bs.idle();
          this.getAnimeFansub();
          this.getBerkasFansub();
        },
        err => {
          this.gs.log('[FANSUB_DETAIL_ERROR]', err);
          this.bs.idle();
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
    this.bs.busy();
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
        this.bs.idle();
      },
      err => {
        this.gs.log('[BERKAS_FANSUB_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  getAnimeFansub(): void {
    this.bs.busy();
    this.fansub.getAnimeFansub({
      data: window.btoa(JSON.stringify({
        fansubId: [this.fansubId]
      }))
    }).subscribe(
      res => {
        this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
        this.animeFansub = [];
        for (const r of res.results[this.fansubId]) {
          this.animeFansub.push({
            id: r.id,
            image: r.image_url,
            title: r.name
          });
        }
        this.tabData[0].data = this.animeFansub;
        this.bs.idle();
      },
      err => {
        this.gs.log('[FANSUB_ANIME_ERROR]', err);
        this.bs.idle();
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
    this.router.navigateByUrl(`/anime/${data.id}`);
  }

  openTag(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_TAG]', data);
  }

}
