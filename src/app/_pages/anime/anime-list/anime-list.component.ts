import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import { Moment } from 'moment';

import { moment, MY_FORMATS } from '../../../_shared/helpers/moment';

import { GlobalService } from '../../../_shared/services/global.service';
import { AnimeService } from '../../../_shared/services/anime.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class AnimeListComponent implements OnInit, OnDestroy {

  fg: UntypedFormGroup;

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

  subsQueryParam = null;
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
    this.subsQueryParam?.unsubscribe();
    this.subsSeasonalAnime?.unsubscribe();
    this.subsFansubAnime?.unsubscribe();
  }

  ngOnInit(): void {
    this.fg = new UntypedFormGroup({
      currentDate: new UntypedFormControl({ value: moment(), disabled: true }, Validators.required),
    });
    this.currentMonth = new Date(this.fg.value.currentDate.format()).getMonth() + 1;
    this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
    this.minDate = new Date('1917-01-01');
    this.maxDate = new Date(this.currentYear + 1, 11, 31);
    if (this.gs.isBrowser) {
      this.watchUrlRoute();
    }
  }

  watchUrlRoute(): void {
    this.subsQueryParam = this.activatedRoute.queryParams.subscribe({
      next: qp => {
        this.bs.busy();
        this.currentYear = qp['year'] ? (
          Number.isNaN(parseInt(qp['year'], 10)) ? this.currentYear : parseInt(qp['year'], 10)
        ) : new Date().getFullYear();
        this.fg.controls['currentDate'].patchValue(moment(new Date(`${this.currentYear}-${this.currentMonth}-01`)));
        this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
        this.selectedSeasonName = qp['season'] ? (
          this.gs.seasonalWeather.map(s => s.name)
            .indexOf(qp['season']) >= 0 ? qp['season'] : this.findSeasonNameByMonthNumber(this.currentMonth)
        ) : this.findSeasonNameByMonthNumber(this.currentMonth);
        this.gs.bannerImg = this.gs.seasonalWeather.find(sB => sB.name === this.selectedSeasonName).img;
        this.bs.idle();
        this.getSeasonalAnime(qp['year'] && qp['season']);
      }
    });
  }

  findSeasonNameByMonthNumber(monthNumber: number): string {
    return this.gs.seasonalWeather.find(sB => sB.id === Math.ceil(monthNumber / 3)).name;
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>): void {
    const ctrlValue = this.fg.value.currentDate;
    ctrlValue.year(normalizedYear.year());
    this.fg.controls['currentDate'].setValue(ctrlValue);
    this.currentMonth = new Date(this.fg.value.currentDate.format()).getMonth() + 1;
    this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
    datepicker.close();
    this.changeSeasonalAnime();
  }

  getSeasonalAnime(showFab = false): void {
    this.bs.busy();
    this.subsSeasonalAnime = this.anime.getSeasonalAnime(this.currentYear, this.selectedSeasonName).subscribe({
      next: res => {
        this.gs.log('[ANIME_SEASONAL_SUCCESS]', res);
        this.seasonalAnime = res.results.sort((a, b) => (b.mean || 0) - (a.mean || 0));
        if (showFab) {
          this.fs.initializeFab('settings_backup_restore', null, 'Kembali Ke Musim Sekarang', '/anime', false);
        }
        this.bs.idle();
        this.getFansubAnime();
      },
      error: err => {
        this.gs.log('[ANIME_SEASONAL_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getFansubAnime(): void {
    this.bs.busy();
    const seasonalAnimeListId = [];
    for (const sA of this.seasonalAnime) {
      seasonalAnimeListId.push(sA.id);
    }
    this.subsFansubAnime = this.anime.getFansubAnime(seasonalAnimeListId).subscribe({
      next: res => {
        this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
        let seasonalAnimeWithFansub = [];
        for (const sA of this.seasonalAnime) {
          sA.namaFansubs = res.results[sA.id];
          for (const f of sA.namaFansubs) {
            f.selected = true;
            f.type = 'chip';
          }
          seasonalAnimeWithFansub.push({
            id: sA.id,
            Jenis: `${sA.media_type?.toUpperCase()} • ${sA.mean || 0}`,
            Poster: sA.image_url,
            'Judul Anime': sA.title,
            'Nama Fansub': sA.namaFansubs,
          });
        }
        seasonalAnimeWithFansub = seasonalAnimeWithFansub.sort((a, b) => b['Nama Fansub'].length - a['Nama Fansub'].length);
        this.tabData[0].data.row = seasonalAnimeWithFansub;
        this.seasonalAnimeCard = this.seasonalAnime;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_ANIME_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
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
    this.gs.log('[ANIME_SEASONAL_CLICK_ANIME]', data);
    let judulAnime = null;
    try {
      judulAnime = data.title.replace(/[^a-zA-Z0-9]/g, '-');
    } catch (e) {
      judulAnime = data['Judul Anime'].replace(/[^a-zA-Z0-9]/g, '-');
    }
    this.router.navigateByUrl(`/anime/${data.id}-${judulAnime}`);
  }

  openFansub(data): void {
    this.gs.log('[ANIME_SEASONAL_CLICK_FANSUB]', data);
    this.router.navigateByUrl(`/fansub/${data.slug}`);
  }

}
