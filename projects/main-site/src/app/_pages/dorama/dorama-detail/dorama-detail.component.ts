import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WARNA } from '../../../../models/warna';

import { DoramaService } from '../../../_shared/services/dorama.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { BerkasService } from '../../../_shared/services/berkas.service';

@Component({
  selector: 'app-dorama-detail',
  templateUrl: './dorama-detail.component.html',
  styleUrls: ['./dorama-detail.component.css']
})
export class DoramaDetailComponent implements OnInit, OnDestroy {

  doramaId = '';
  doramaData = null;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  fansubDorama = [];
  berkasDorama = [];

  allBerkasDoramaId = [];

  fansubPageFinished = false;

  fansubPage = 1;

  chipData = [];

  panelData = [];

  tabData: any = [
    {
      name: 'Daftar Fansub',
      icon: 'closed_caption',
      type: 'grid',
      data: []
    },
    {
      name: 'Berkas Terkait',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Proyek', /* 'Image', */ 'Nama Berkas', 'Tanggal', 'Pemilik'],
        row: []
      }
    }
  ];

  subsDorama = null;
  subsBerkas = null;
  subsFansub = null;
  subsParam = null;
  subsTrusted = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gs: GlobalService,
    private bs: BusyService,
    private pi: PageInfoService,
    private dorama: DoramaService,
    private fs: FabService,
    private berkas: BerkasService
  ) {
    this.gs.bannerImg = null;
    this.gs.bgRepeat = true;
    this.gs.sizeContain = true;
  }

  ngOnDestroy(): void {
    this.subsDorama?.unsubscribe();
    this.subsBerkas?.unsubscribe();
    this.subsFansub?.unsubscribe();
    this.subsParam?.unsubscribe();
    this.subsTrusted?.unsubscribe();
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe({
      next: p => {
        const paramDoramaId = p['doramaId'];
        this.doramaId = paramDoramaId.split('-')[0];
        this.bs.busy();
        this.subsDorama = this.dorama.getDorama(paramDoramaId).subscribe({
          next: res => {
            this.gs.log('[DORAMA_DETAIL_SUCCESS]', res);
            this.doramaData = res.result;
            this.doramaData.image_url = this.doramaData.poster;
            this.pi.updatePageMetaData(
              this.doramaData.title,
              this.doramaData.synopsis,
              this.doramaData?.others?.tags ? this.doramaData?.others?.tags.join(', ') : this.doramaData.title,
              this.doramaData.image_url
            );
            this.bs.idle();
            if (this.gs.isBrowser) {
              if ('others' in this.doramaData) {
                const genres = this.doramaData.others.genres;
                for (const g of genres) {
                  this.chipData.push({
                    name: g,
                    selected: true,
                    color: WARNA.PINK
                  });
                }
              }
              this.panelData = [];
              this.panelData.push({
                title: 'Ringkasan Cerita',
                icon: 'history_edu',
                text: this.doramaData.synopsis,
                tooltip: `Alih Bahasa Oleh 'Google Translate' 😘`
              });
              this.fs.initializeFab(
                null,
                '/assets/img/logo/mdl.png', 'Buka Di MyDramaList',
                `https://mydramalist.com/${this.router.url.split('?')[0].split('/')[this.router.url.split('?')[0].split('/').length - 1]}`,
                true
              );
              this.getFansubDorama();
              this.getBerkasDorama();
            }
          },
          error: err => {
            this.gs.log('[DORAMA_DETAIL_ERROR]', err, 'error');
            this.bs.idle();
            this.router.navigate(['/error'], {
              queryParams: {
                ...this.activatedRoute.snapshot.queryParams,
                returnUrl: '/dorama'
              }
            });
          }
        });
      }
    });
  }

  openRank(): void {
    // this.gs.window.open(`https://myanimelist.net/topanime.php?limit=${this.animeData.rank - 1}`, '_blank');
  }

  get yearDorama(): Date {
    if ('release_date' in this.doramaData?.details) {
      return new Date(this.doramaData?.details?.release_date) || null;
    }
    return new Date(this.doramaData?.details?.aired?.split(' - ')[0]) || null;
  }

  get seasonDorama(): string {
    return this.gs.seasonalWeather.find(sB => sB.id === Math.ceil((this.yearDorama?.getMonth() + 1) / 3))?.name || null;
  }

  openSeasonalDorama(): void {
    this.router.navigate(['/dorama'], {
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        season: this.seasonDorama,
        year: this.yearDorama?.getFullYear()
      }
    });
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[BERKAS_DORAMA_ENTER_FILTER]', data);
    this.q = data;
    this.getBerkasDorama();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[BERKAS_DORAMA_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getBerkasDorama();
  }

  getBerkasDorama(): void {
    this.bs.busy();
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
      this.bs.idle();
    }
    this.subsBerkas = this.dorama.getBerkasDorama([this.doramaId], this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[DORAMA_BERKAS_LIST_SUCCESS]', res);
        this.count = res.count;
        this.allBerkasDoramaId = [];
        this.berkasDorama = [];
        for (const r of res.results[this.doramaId]) {
          this.allBerkasDoramaId.push(r.id);
          this.berkasDorama.push({
            id: r.id,
            private: r.private,
            foto: r.user_.image_url,
            Pemilik: r.user_.username,
            Proyek: r.project_type_.name,
            // Image: r.image_url,
            Tanggal: r.created_at,
            'Nama Berkas': r.name,
            DARK: r.r18
          });
        }
        this.tabData[1].data.row = this.berkasDorama;
        if (this.allBerkasDoramaId.length > 0) {
          this.checkTrusted();
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[DORAMA_BERKAS_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  checkTrusted():void {
    this.bs.busy();
    if (this.subsTrusted) {
      this.subsTrusted.unsubscribe();
      this.bs.idle();
    }
    this.subsTrusted = this.berkas.checkTrusted(this.allBerkasDoramaId).subscribe({
      next: res => {
        this.gs.log('[DORAMA_BERKAS_TRUSTED_SUCCESS]', res);
        for (const b of this.berkasDorama) {
          b.trusted = res.results[b.id];
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[DORAMA_BERKAS_TRUSTED_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getFansubDorama(): void {
    this.bs.busy();
    this.subsFansub = this.dorama.getFansubDorama([this.doramaId], this.fansubPage).subscribe({
      next: res => {
        this.gs.log('[FANSUB_DORAMA_SUCCESS]', res);
        for (const r of res.results[this.doramaId]) {
          this.fansubDorama.push({
            id: r.id,
            image: r.image_url,
            title: r.name,
            slug: r.slug,
            description: `${r.slug} :: ${r.active ? 'Aktif' : 'Non-Aktif'}`
          });
        }
        this.tabData[0].data = this.fansubDorama;
        if (res.results[this.doramaId].length <= 0) {
          this.fansubPageFinished = true;
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_DORAMA_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  openGenre(data): void {
    this.gs.log('[DORAMA_DETAIL_CLICK_GENRE]', data);
    // this.gs.window.open(data.url, '_blank');
  }

  openFansub(data): void {
    this.gs.log('[DORAMA_DETAIL_CLICK_FANSUB]', data);
    this.router.navigateByUrl(`/fansub/${data.slug}`);
  }

  onPaginatorClicked(data): void {
    this.gs.log('[DORAMA_DETAIL_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getBerkasDorama();
  }

  openFile(data): void {
    this.gs.log('[DORAMA_DETAIL_CLICK_BERKAS]', data);
    this.router.navigateByUrl(`/berkas/${data.id}`);
  }

  onFansubLoadNextPage(): void {
    if (!this.fansubPageFinished) {
      this.fansubPage++;
      this.getFansubDorama();
    }
  }

}
