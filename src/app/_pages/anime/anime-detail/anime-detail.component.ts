import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WARNA } from '../../../../models/warna';

import { AnimeService } from '../../../_shared/services/anime.service';
import { BerkasService } from '../../../_shared/services/berkas.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { FabService } from '../../../_shared/services/fab.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { WinboxService } from '../../../_shared/services/winbox.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit, OnDestroy {

  malDomain = 'https://myanimelist.net';

  animeId = '';
  animeData = null;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  fansubAnime = [];
  berkasAnime = [];

  allBerkasAnimeId = [];

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

  subsAnime = null;
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
    private anime: AnimeService,
    private fs: FabService,
    private wb: WinboxService,
    private berkas: BerkasService
  ) {
    this.gs.bannerImg = null;
    this.gs.bgRepeat = true;
    this.gs.sizeContain = true;
  }

  get SEASON(): string {
    return this.findSeasonNameByMonthNumber(new Date(this.animeData.start_date).getMonth() + 1);
  }

  get YEAR(): number {
    return new Date(this.animeData.start_date).getFullYear();
  }

  ngOnDestroy(): void {
    this.subsAnime?.unsubscribe();
    this.subsBerkas?.unsubscribe();
    this.subsFansub?.unsubscribe();
    this.subsParam?.unsubscribe();
    this.subsTrusted?.unsubscribe();
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe({
      next: p => {
        const paramAnimeId = p['animeId'];
        this.animeId = paramAnimeId.split('-')[0];
        this.bs.busy();
        this.subsAnime = this.anime.getAnime(paramAnimeId).subscribe({
          next: res => {
            this.gs.log('[ANIME_DETAIL_SUCCESS]', res);
            this.animeData = res.result;
            this.pi.updatePageMetaData(
              `${this.animeData.title}`,
              `${this.animeData.synopsis}`,
              `${this.animeData.alternative_titles?.synonyms?.join(', ')}`,
              this.animeData.image_url
            );
            this.bs.idle();
            if (this.gs.isBrowser) {
              const genres = this.animeData.genres;
              for (const g of genres) {
                this.chipData.push({
                  id: g.id,
                  name: g.name,
                  selected: true,
                  color: WARNA.PINK
                });
              }
              this.panelData = [];
              this.panelData.push({
                title: 'Ringkasan Cerita',
                icon: 'history_edu',
                text: this.animeData.synopsis,
                tooltip: `Alih Bahasa Oleh 'Google Translate' 😘`
              });
              this.fs.initializeFab(null, '/assets/img/logo/mal.png', 'Buka Di MyAnimeList', `${this.malDomain}/anime/${this.animeId}`, true);
              this.getFansubAnime();
              this.getBerkasAnime();
            }
          },
          error: err => {
            this.gs.log('[ANIME_DETAIL_ERROR]', err, 'error');
            this.bs.idle();
            this.router.navigate(['/error'], {
              queryParams: {
                returnUrl: '/anime'
              }
            });
          }
        });
      }
    });
  }

  openRank(): void {
    this.wb.winboxOpenUri(`${this.malDomain}/topanime.php?limit=${this.animeData.rank - 1}`);
  }

  findSeasonNameByMonthNumber(monthNumber: number): string {
    return this.gs.seasonalWeather.find(sB => sB.id === Math.ceil(monthNumber / 3)).name;
  }

  openSeasonalAnime(): void {
    this.router.navigate(['/anime'], {
      queryParams: {
        season: this.SEASON,
        year: this.YEAR
      }
    });
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[BERKAS_ANIME_ENTER_FILTER]', data);
    this.q = data;
    this.getBerkasAnime();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[BERKAS_ANIME_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getBerkasAnime();
  }

  getBerkasAnime(): void {
    this.bs.busy();
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
      this.bs.idle();
    }
    this.subsBerkas = this.anime.getBerkasAnime([this.animeId], this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[ANIME_BERKAS_LIST_SUCCESS]', res);
        this.count = res.count;
        this.berkasAnime = [];
        for (const r of res.results[this.animeId]) {
          this.allBerkasAnimeId.push(r.id);
          this.berkasAnime.push({
            id: r.id,
            private: r.private,
            foto: r.user_.image_url,
            Pemilik: r.user_.username,
            Proyek: r.project_type_.name,
            // Image: r.image_url,
            Tanggal: r.created_at,
            'Nama Berkas': r.name
          });
        }
        this.tabData[1].data.row = this.berkasAnime;
        if (this.allBerkasAnimeId.length > 0) {
          this.checkTrusted();
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[ANIME_BERKAS_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  checkTrusted():void {
    this.bs.busy();
    this.subsTrusted = this.berkas.checkTrusted(this.allBerkasAnimeId).subscribe({
      next: res => {
        this.gs.log('[ANIME_BERKAS_TRUSTED_SUCCESS]', res);
        for (const b of this.berkasAnime) {
          b.trusted = res.results[b.id];
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[ANIME_BERKAS_TRUSTED_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getFansubAnime(): void {
    this.bs.busy();
    this.subsFansub = this.anime.getFansubAnime([this.animeId], this.fansubPage).subscribe({
      next: res => {
        this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
        for (const r of res.results[this.animeId]) {
          this.fansubAnime.push({
            id: r.id,
            image: r.image_url,
            title: r.name,
            slug: r.slug,
            description: `${r.slug} :: ${r.active ? 'Aktif' : 'Non-Aktif'}`
          });
        }
        this.tabData[0].data = this.fansubAnime;
        if (res.results[this.animeId].length <= 0) {
          this.fansubPageFinished = true;
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_ANIME_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  openGenre(data): void {
    this.gs.log('[ANIME_DETAIL_CLICK_GENRE]', data);
    this.wb.winboxOpenUri(`${this.malDomain}/anime/genre/${data.id}`);
  }

  openFansub(data): void {
    this.gs.log('[ANIME_DETAIL_CLICK_FANSUB]', data);
    this.router.navigateByUrl(`/fansub/${data.slug}`);
  }

  onPaginatorClicked(data): void {
    this.gs.log('[ANIME_DETAIL_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getBerkasAnime();
  }

  openFile(data): void {
    this.gs.log('[ANIME_DETAIL_CLICK_BERKAS]', data);
    this.router.navigateByUrl(`/berkas/${data.id}`);
  }

  onFansubLoadNextPage(): void {
    if (!this.fansubPageFinished) {
      this.fansubPage++;
      this.getFansubAnime();
    }
  }

}
