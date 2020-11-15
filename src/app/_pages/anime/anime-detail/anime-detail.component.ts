import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Warna } from '../../../_shared/models/Warna';

import { AnimeService } from '../../../_shared/services/anime.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit, OnDestroy {

  animeId = 0;
  animeData = null;

  count = 0;
  page = 1;
  row = 10;
  q = '';

  fansubAnime = [];
  berkasAnime = [];

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
        column: ['Upload', 'Nama File', 'Pemilik'],
        row: []
      }
    }
  ];

  subsParam = null;
  subsAnime = null;
  subsBerkas = null;
  subsFansub = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public gs: GlobalService,
    private bs: BusyService,
    private pi: PageInfoService,
    private anime: AnimeService,
    private fs: FabService
  ) {
    this.gs.bannerImg = '/assets/img/season/winter.png';
    this.gs.bgRepeat = true;
    this.gs.sizeContain = true;
  }

  ngOnDestroy(): void {
    if (this.subsParam) {
      this.subsParam.unsubscribe();
    }
    if (this.subsAnime) {
      this.subsAnime.unsubscribe();
    }
    if (this.subsBerkas) {
      this.subsAnime.unsubscribe();
    }
    if (this.subsFansub) {
      this.subsAnime.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe(params => {
      this.animeId = params.animeId;
      this.bs.busy();
      this.subsAnime = this.anime.getAnime(this.animeId).subscribe(
        res => {
          this.gs.log('[ANIME_DETAIL_SUCCESS]', res);
          this.animeData = res.result;
          this.pi.updatePageMetaData(
            `${this.animeData.title}`,
            `${this.animeData.synopsis}`,
            `${Array.isArray(this.animeData.title_synonyms) ? this.animeData.title_synonyms.join(', ') : this.animeData.title}`,
            this.animeData.image_url
          );
          this.bs.idle();
          if (this.gs.isBrowser) {
            this.chipData = this.animeData.genres;
            this.chipData.map(g => (g.selected = true, g.color = Warna.PINK));
            this.panelData = [];
            this.panelData.push({
              title: 'Ringkasan Cerita',
              icon: 'history_edu',
              text: this.animeData.synopsis,
              tooltip: `Alih Bahasa Oleh 'Google Translate' 😘`
            });
            this.fs.initializeFab(null, '/assets/img/mal-logo.png', 'Buka Di MyAnimeList', this.animeData.url, true);
            this.getFansubAnime();
            this.getBerkasAnime();
          }
        },
        err => {
          this.gs.log('[ANIME_DETAIL_ERROR]', err);
          this.bs.idle();
          this.router.navigate(['/error'], {
            queryParams: {
              returnUrl: '/anime'
            }
          });
        }
      );
    });
  }

  openRank(): void {
    window.open(`https://myanimelist.net/topanime.php?limit=${this.animeData.rank - 1}`, '_blank');
  }

  openSeasonalAnime(): void {
    const seasonYear = this.animeData.premiered ? this.animeData.premiered.toLowerCase().split(' ') : '';
    this.router.navigate(['/anime'], {
      queryParams: {
        season: seasonYear[0] ? seasonYear[0] : '',
        year: seasonYear[1] ? seasonYear[1] : ''
      }
    });
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[BERKAS_ANIME_ENTER_FILTER]', data);
    this.q = data;
    this.getBerkasAnime();
  }

  getBerkasAnime(): void {
    this.bs.busy();
    this.subsBerkas = this.anime.getBerkasAnime([this.animeId], this.q, this.page, this.row).subscribe(
      res => {
        this.gs.log('[BERKAS_ANIME_SUCCESS]', res);
        this.count = res.count;
        this.berkasAnime = [];
        for (const r of res.results[this.animeId]) {
          this.berkasAnime.push({
            id: r.id,
            foto: r.user_.image_url,
            Pemilik: r.user_.username,
            Upload: r.created_at,
            'Nama File': r.name
          });
        }
        this.tabData[1].data.row = this.berkasAnime;
        this.bs.idle();
      },
      err => {
        this.gs.log('[BERKAS_ANIME_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  getFansubAnime(): void {
    this.bs.busy();
    this.subsFansub = this.anime.getFansubAnime([this.animeId]).subscribe(
      res => {
        this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
        this.fansubAnime = [];
        for (const r of res.results[this.animeId]) {
          this.fansubAnime.push({
            id: r.id,
            image: r.image_url,
            title: r.name,
            description: `${r.slug} :: ${r.active ? 'Aktif' : 'Non-Aktif'}`
          });
        }
        this.tabData[0].data = this.fansubAnime;
        this.bs.idle();
      },
      err => {
        this.gs.log('[FANSUB_ANIME_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  openGenre(data): void {
    this.gs.log('[ANIME_DETAIL_CLICK_GENRE]', data.mal_id);
    window.open(data.url, '_blank');
  }

  openFansub(data): void {
    this.gs.log('[ANIME_DETAIL_CLICK_FANSUB]', data);
    this.router.navigateByUrl(`/fansub/${data.id}`);
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

}
