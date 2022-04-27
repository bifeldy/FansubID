import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Warna } from '../../../_shared/models/Warna';

import { GlobalService } from '../../../_shared/services/global.service';
import { FabService } from '../../../_shared/services/fab.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';

@Component({
  selector: 'app-fansub-detail',
  templateUrl: './fansub-detail.component.html',
  styleUrls: ['./fansub-detail.component.css']
})
export class FansubDetailComponent implements OnInit, OnDestroy {

  fansubSlug = '';
  fansubData = null;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  animeFansub = [];
  doramaFansub = [];
  berkasFansub = [];

  animePageFinished = false;
  doramaPageFinished = false;

  animePage = 1;
  doramaPage = 1;

  chipData = [];

  panelData = [];

  tabData: any = [
    {
      name: 'Anime',
      icon: 'live_tv',
      type: 'list',
      data: []
    },
    {
      name: 'Dorama',
      icon: 'movie',
      type: 'grid',
      data: []
    },
    {
      name: 'Berkas Terkait',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Tanggal', 'Image', 'Nama Berkas', 'Pemilik'],
        row: []
      }
    }
  ];

  subsActRoute = null;
  subsFansub = null;
  subsBerkas = null;
  subsAnime = null;
  subsDorama = null;
  subsParam = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bs: BusyService,
    private gs: GlobalService,
    private fs: FabService,
    private pi: PageInfoService,
    private fansub: FansubService,
    private ss: StatsServerService
  ) {
    this.gs.bannerImg = '/assets/img/fansub-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get SS(): StatsServerService {
    return this.ss;
  }

  ngOnDestroy(): void {
    this.subsActRoute?.unsubscribe();
    this.subsFansub?.unsubscribe();
    this.subsBerkas?.unsubscribe();
    this.subsAnime?.unsubscribe();
    this.subsDorama?.unsubscribe();
    this.subsParam?.unsubscribe();
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe({
      next: p => {
        this.fansubSlug = p['fansubSlug'];
        this.bs.busy();
        this.subsFansub = this.fansub.getFansub(this.fansubSlug).subscribe({
          next: res => {
            this.gs.log('[FANSUB_DETAIL_SUCCESS]', res);
            this.fansubData = res.result;
            this.pi.updatePageMetaData(
              `${this.fansubData.name}`,
              `${this.fansubData.description}`,
              `${Array.isArray(this.fansubData.tags) ? this.fansubData.tags.join(', ') : this.fansubData.name}`,
              this.fansubData.image_url
            );
            this.bs.idle();
            if (this.gs.isBrowser) {
              if (Array.isArray(this.fansubData.tags)) {
                for (let i = 0; i < this.fansubData.tags.length; i++) {
                  this.chipData.push({ id_tag: i, name: this.fansubData.tags[i], color: Warna.BIRU, selected: true });
                }
              }
              this.panelData = [];
              this.panelData.push({ title: 'Informasi', icon: 'notification_important', text: this.fansubData.description });
              const webUrl = this.getUrlByName('web');
              if (webUrl) {
                this.fs.initializeFab('web', null, 'Buka Halaman Website Fansub', this.getUrlByName('web'), true);
              }
              this.getAnimeFansub();
              this.getDoramaFansub();
              this.getBerkasFansub();
            }
          },
          error: err => {
            this.gs.log('[FANSUB_DETAIL_ERROR]', err);
            this.bs.idle();
            this.router.navigate(['/error'], {
              queryParams: {
                returnUrl: '/fansub'
              }
            });
          }
        });
      }
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
    this.subsBerkas = this.fansub.getBerkasFansub(
      [this.fansubData.id], this.q, this.page, this.row, this.sort, this.order
    ).subscribe({
      next: res => {
        this.gs.log('[BERKAS_ANIME_SUCCESS]', res);
        this.count = res.count;
        this.berkasFansub = [];
        for (const r of res.results[this.fansubData.id]) {
          this.berkasFansub.push({
            id: r.id,
            private: r.private,
            foto: r.user_.image_url,
            Pemilik: r.user_.username,
            Image: r.image_url,
            Tanggal: r.created_at,
            'Nama Berkas': r.name
          });
        }
        this.tabData[2].data.row = this.berkasFansub;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BERKAS_FANSUB_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  getAnimeFansub(): void {
    this.bs.busy();
    this.subsAnime = this.fansub.getAnimeFansub([this.fansubData.id], this.animePage).subscribe({
      next: res => {
        this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
        for (const r of res.results[this.fansubData.id]) {
          this.animeFansub.push({
            id: r.id,
            image: r.image_url,
            title: r.name
          });
        }
        this.tabData[0].data = this.animeFansub;
        if (res.results[this.fansubData.id].length <= 0) {
          this.animePageFinished = true;
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_ANIME_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  getDoramaFansub(): void {
    this.bs.busy();
    this.subsDorama = this.fansub.getDoramaFansub([this.fansubData.id], this.doramaPage).subscribe({
      next: res => {
        this.gs.log('[FANSUB_DORAMA_SUCCESS]', res);
        for (const r of res.results[this.fansubData.id]) {
          this.doramaFansub.push({
            id: r.id,
            image: r.image_url,
            title: r.name,
            slug: r.slug
          });
        }
        this.tabData[1].data = this.doramaFansub;
        if (res.results[this.fansubData.id].length <= 0) {
          this.doramaPageFinished = true;
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_DORAMA_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  editFansubData(): void {
    this.router.navigateByUrl(`/fansub/${this.fansubSlug}/edit`);
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[BERKAS_FANSUB_ENTER_FILTER]', data);
    this.q = data;
    this.getBerkasFansub();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[BERKAS_FANSUB_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
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
    const judulAnime = data.title.replace(/[^a-zA-Z0-9]/g, '-');
    this.router.navigateByUrl(`/anime/${data.id}-${judulAnime}`);
  }

  openDorama(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_DORAMA]', data);
    this.router.navigateByUrl(`/dorama/${data.slug}`);
  }

  openTag(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_TAG]', data);
  }

  onAnimeLoadNextPage(): void {
    if (!this.animePageFinished) {
      this.animePage++;
      this.getAnimeFansub();
    }
  }

  onDoramaLoadNextPage(): void {
    if (!this.doramaPageFinished) {
      this.doramaPage++;
      this.getDoramaFansub();
    }
  }

}
