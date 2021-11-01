import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Warna } from '../../../_shared/models/Warna';
import { Seasons } from '../../../_shared/models/Seasons';

import { DoramaService } from '../../../_shared/services/dorama.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-dorama-detail',
  templateUrl: './dorama-detail.component.html',
  styleUrls: ['./dorama-detail.component.css']
})
export class DoramaDetailComponent implements OnInit, OnDestroy {

  seasonalBanner = [
    { id: 1, name: Seasons.WINTER, img: '/assets/img/season/winter.png' },
    { id: 2, name: Seasons.SPRING, img: '/assets/img/season/spring.png' },
    { id: 3, name: Seasons.SUMMER, img: '/assets/img/season/summer.png' },
    { id: 4, name: Seasons.FALL, img: '/assets/img/season/fall.png' }
  ];

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
        column: ['Tanggal', 'Nama Berkas', 'Pemilik'],
        row: []
      }
    }
  ];

  subsDorama = null;
  subsBerkas = null;
  subsFansub = null;
  subsParam = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public gs: GlobalService,
    private bs: BusyService,
    private pi: PageInfoService,
    private dorama: DoramaService,
    private fs: FabService
  ) {
    this.gs.bannerImg = '/assets/img/season/winter.png';
    this.gs.bgRepeat = true;
    this.gs.sizeContain = true;
  }

  ngOnDestroy(): void {
    this.subsDorama?.unsubscribe();
    this.subsBerkas?.unsubscribe();
    this.subsFansub?.unsubscribe();
    this.subsParam?.unsubscribe();
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe({
      next: p => {
        const paramDoramaId = p.doramaId;
        this.doramaId = paramDoramaId.split('-')[0];
        this.bs.busy();
        this.subsDorama = this.dorama.getDorama(paramDoramaId).subscribe({
          next: res => {
            this.gs.log('[DORAMA_DETAIL_SUCCESS]', res);
            this.doramaData = res.result;
            this.doramaData.image_url = this.doramaData.poster;
            this.pi.updatePageMetaData(
              `${this.doramaData.title}`,
              `${this.doramaData.synopsis}`,
              `${this.doramaData?.others?.tags || this.doramaData?.title}`,
              this.doramaData.image_url
            );
            this.bs.idle();
            if (this.gs.isBrowser) {
              if ('others' in this.doramaData) {
                const genres = this.doramaData.others.genres.split(', ');
                for (const g of genres) {
                  this.chipData.push({
                    mdl_id: 8,
                    name: g,
                    url: '',
                    selected: true,
                    color: Warna.PINK
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
                '/assets/img/mdl-logo.png', 'Buka Di MyDramaList',
                `https://mydramalist.com/${this.router.url.split('/')[this.router.url.split('/').length - 1]}`,
                true
              );
              this.getFansubDorama();
              this.getBerkasDorama();
            }
          },
          error: err => {
            this.gs.log('[DORAMA_DETAIL_ERROR]', err);
            this.bs.idle();
            this.router.navigate(['/error'], {
              queryParams: {
                returnUrl: '/dorama'
              }
            });
          }
        });
      }
    });
  }

  openRank(): void {
    // window.open(`https://myanimelist.net/topanime.php?limit=${this.animeData.rank - 1}`, '_blank');
  }

  get yearDorama(): Date {
    try {
      if ('release_date' in this.doramaData.details) {
        return new Date(this.doramaData.details.release_date);
      } else {
        return new Date(this.doramaData.details.aired.split(' - ')[0]);
      }
    } catch (e) {
      return null;
    }
  }

  get seasonDorama(): string {
    try {
      return this.seasonalBanner.find(sB => sB.id === Math.ceil((this.yearDorama.getMonth() + 1) / 3)).name;
    } catch (e) {
      return '';
    }
  }

  openSeasonalDorama(): void {
    this.router.navigate(['/dorama'], {
      queryParams: {
        season: this.seasonDorama,
        year: this.yearDorama.getFullYear()
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
    this.subsBerkas = this.dorama.getBerkasDorama(
      [this.doramaId], this.q, this.page, this.row, this.sort, this.order
    ).subscribe({
      next: res => {
        this.gs.log('[BERKAS_DORAMA_SUCCESS]', res);
        this.count = res.count;
        this.berkasDorama = [];
        for (const r of res.results[this.doramaId]) {
          this.berkasDorama.push({
            id: r.id,
            private: r.private,
            foto: r.user_.image_url,
            Pemilik: r.user_.username,
            Tanggal: r.created_at,
            'Nama Berkas': r.name
          });
        }
        this.tabData[1].data.row = this.berkasDorama;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BERKAS_DORAMA_ERROR]', err);
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
        this.gs.log('[FANSUB_DORAMA_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  openGenre(data): void {
    this.gs.log('[DORAMA_DETAIL_CLICK_GENRE]', data);
    // window.open(data.url, '_blank');
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
