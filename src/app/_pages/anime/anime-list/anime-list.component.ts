import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

import { Seasons } from '../../../_shared/models/Seasons';

import { GlobalService } from '../../../_shared/services/global.service';
import { AnimeService } from '../../../_shared/services/anime.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AnimeListComponent implements OnInit, OnDestroy {

  fg: FormGroup;

  seasonalBanner = [
    { id: 1, name: Seasons.WINTER, img: '/assets/img/season/winter.png' },
    { id: 2, name: Seasons.SPRING, img: '/assets/img/season/spring.png' },
    { id: 3, name: Seasons.SUMMER, img: '/assets/img/season/summer.png' },
    { id: 4, name: Seasons.FALL, img: '/assets/img/season/fall.png' }
  ];

  currentMonth = null;
  currentYear = null;

  selectedSeasonName = null;

  minDate: Date;
  maxDate: Date;

  seasonalAnimeCard = [];
  seasonalAnime = [];

  tabData = [
    {
      name: 'Info Garapan',
      icon: 'closed_caption',
      type: 'table',
      data: {
        column: ['Jenis', 'Poster', 'Judul Anime', 'Nama Fansub'],
        row: []
      }
    }
  ];

  subsParam = null;
  subsSeasonalAnime = null;
  subsFansubAnime = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bs: BusyService,
    private gs: GlobalService,
    private fs: FabService,
    private anime: AnimeService
  ) {
    this.gs.bannerImg = '/assets/img/season/winter.png';
    this.gs.bgRepeat = true;
    this.gs.sizeContain = true;
  }

  ngOnDestroy(): void {
    if (this.subsParam) {
      this.subsParam.unsubscribe();
    }
    if (this.subsSeasonalAnime) {
      this.subsSeasonalAnime.unsubscribe();
    }
    if (this.subsFansubAnime) {
      this.subsFansubAnime.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.fg = new FormGroup({
      currentDate: new FormControl({ value: moment(), disabled: true }, Validators.required),
    });
    this.currentMonth = new Date(this.fg.value.currentDate.format()).getMonth() + 1;
    this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
    this.minDate = new Date('1917-01-01');
    this.maxDate = new Date(this.currentYear + 1, 11, 31);
    this.watchUrlRoute();
  }

  watchUrlRoute(): void {
    this.subsParam = this.activatedRoute.queryParams.subscribe(p => {
      this.currentYear = p.year ? (
        Number.isNaN(parseInt(p.year, 10)) ? this.currentYear : parseInt(p.year, 10)
      ) : this.currentYear;
      this.fg.controls.currentDate.patchValue(moment(new Date(`${this.currentYear}-${this.currentMonth}-01`)));
      this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
      this.selectedSeasonName = p.season ? (
        [
          Seasons.WINTER,
          Seasons.SPRING,
          Seasons.SUMMER,
          Seasons.FALL
        ].indexOf(p.season) >= 0 ? p.season : this.findSeasonNameByMonthNumber(this.currentMonth)
      ) : this.findSeasonNameByMonthNumber(this.currentMonth);
      this.gs.bannerImg = this.seasonalBanner.find(sB => sB.name === this.selectedSeasonName).img;
      this.getSeasonalAnime(p.year && p.season);
    });
  }

  findSeasonNameByMonthNumber(monthNumber: number): string {
    return this.seasonalBanner.find(sB => sB.id === Math.ceil(monthNumber / 3)).name;
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>): void {
    const ctrlValue = this.fg.value.currentDate;
    ctrlValue.year(normalizedYear.year());
    this.fg.controls.currentDate.setValue(ctrlValue);
    this.currentMonth = new Date(this.fg.value.currentDate.format()).getMonth() + 1;
    this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
    datepicker.close();
    this.changeSeasonalAnime();
  }

  getSeasonalAnime(showFab = false): void {
    this.bs.busy();
    this.subsSeasonalAnime = this.anime.getSeasonalAnime(this.currentYear, this.selectedSeasonName).subscribe(
      res => {
        this.gs.log('[ANIME_SEASONAL_SUCCESS]', res);
        this.seasonalAnime = res.results.filter(a => a.continuing === false && a.kids === false).sort((a, b) => b.score - a.score);
        if (showFab) {
          this.fs.initializeFab('settings_backup_restore', null, 'Kembali Ke Musim Sekarang', '/anime', false);
        }
        this.bs.idle();
        this.getFansubAnime();
      },
      err => {
        this.gs.log('[ANIME_SEASONAL_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  getFansubAnime(): void {
    this.bs.busy();
    this.tabData[0].data.row = [];
    const seasonalAnimeListId = [];
    for (const sA of this.seasonalAnime) {
      seasonalAnimeListId.push(sA.mal_id);
    }
    this.subsFansubAnime = this.anime.getFansubAnime(seasonalAnimeListId).subscribe(
      res => {
        this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
        let seasonalAnimeWithFansub = [];
        for (const sA of this.seasonalAnime) {
          sA.namaFansubs = res.results[sA.mal_id];
          for (const f of sA.namaFansubs) {
            f.selected = true;
            f.type = 'chip';
            f.name = f.slug;
            delete f.slug;
          }
          seasonalAnimeWithFansub.push({
            mal_id: sA.mal_id,
            Jenis: sA.type,
            Poster: sA.image_url,
            'Judul Anime': sA.title,
            'Nama Fansub': sA.namaFansubs,
          });
        }
        seasonalAnimeWithFansub = seasonalAnimeWithFansub.sort((a, b) => b['Nama Fansub'].length - a['Nama Fansub'].length);
        this.tabData[0].data.row = seasonalAnimeWithFansub;
        this.seasonalAnimeCard = this.seasonalAnime.filter(a =>
          a.continuing === false && a.type === 'TV' && a.r18 === false && a.kids === false
        ).sort((a, b) => b.score - a.score);
        this.bs.idle();
      },
      err => {
        this.gs.log('[FANSUB_ANIME_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  changeSeasonalAnime(): void {
    this.router.navigate(['/anime'], {
      queryParams: {
        season: this.selectedSeasonName,
        year: this.currentYear
      }
    });
  }

  openAnimePage(data): void {
    this.gs.log('[ANIME_SEASONAL_CLICK_ANIME]', data.mal_id);
    this.router.navigateByUrl(`/anime/${data.mal_id}`);
  }

  openFansub(data): void {
    this.gs.log('[ANIME_SEASONAL_CLICK_FANSUB]', data);
    this.router.navigateByUrl(`/fansub/${data.id}`);
  }

}
