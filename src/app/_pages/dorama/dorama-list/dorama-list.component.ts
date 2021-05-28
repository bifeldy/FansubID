import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import { Moment } from 'moment';

import { Seasons } from '../../../_shared/models/Seasons';

import { moment, MY_FORMATS } from '../../../_shared/helpers/moment';

import { GlobalService } from '../../../_shared/services/global.service';
import { DoramaService } from '../../../_shared/services/dorama.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-dorama-list',
  templateUrl: './dorama-list.component.html',
  styleUrls: ['./dorama-list.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class DoramaListComponent implements OnInit, OnDestroy {

  fg: FormGroup;

  seasonalBanner = [
    { id: 1, name: Seasons.WINTER, img: '/assets/img/season/winter.png' },
    { id: 2, name: Seasons.SPRING, img: '/assets/img/season/spring.png' },
    { id: 3, name: Seasons.SUMMER, img: '/assets/img/season/summer.png' },
    { id: 4, name: Seasons.FALL, img: '/assets/img/season/fall.png' }
  ];

  currentMonth = null;
  currentYear = null;

  selectedCountryName = '';
  selectedSeasonName = null;

  doramaCountry = [];

  minDate: Date;
  maxDate: Date;

  seasonalDorama = [];
  seasonalDoramaCard = [];
  seasonalDoramaWithFansub = [];

  tabData = [
    {
      name: 'Info Garapan',
      icon: 'closed_caption',
      type: 'table',
      data: {
        column: ['Jenis', 'Poster', 'Judul Dorama', 'Nama Fansub'],
        row: []
      }
    }
  ];

  subsParam = null;
  subsSeasonalDorama = null;
  subsFansubDorama = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bs: BusyService,
    public gs: GlobalService,
    private fs: FabService,
    private dorama: DoramaService
  ) {
    this.gs.bannerImg = '/assets/img/season/winter.png';
    this.gs.bgRepeat = true;
    this.gs.sizeContain = true;
  }

  ngOnDestroy(): void {
    this.subsParam?.unsubscribe();
    this.subsSeasonalDorama?.unsubscribe();
    this.subsFansubDorama?.unsubscribe();
  }

  ngOnInit(): void {
    this.fg = new FormGroup({
      currentDate: new FormControl({ value: moment(), disabled: true }, Validators.required),
    });
    this.currentMonth = new Date(this.fg.value.currentDate.format()).getMonth() + 1;
    this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
    this.minDate = new Date('2011-01-01');
    this.maxDate = new Date(this.currentYear + 1, 11, 31);
    if (this.gs.isBrowser) {
      this.watchUrlRoute();
    }
  }

  watchUrlRoute(): void {
    this.subsParam = this.activatedRoute.queryParams.subscribe({
      next: p => {
        this.bs.busy();
        this.currentYear = p.year ? (
          Number.isNaN(parseInt(p.year, 10)) ? this.currentYear : parseInt(p.year, 10)
        ) : new Date().getFullYear();
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
        this.bs.idle();
        this.getSeasonalDorama(p.year && p.season);
      }
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
    this.changeSeasonalDorama();
  }

  getSeasonalDorama(showFab = false): void {
    this.bs.busy();
    this.subsSeasonalDorama = this.dorama.getSeasonalDorama(this.currentYear, this.selectedSeasonName).subscribe({
      next: res => {
        this.gs.log('[DORAMA_SEASONAL_SUCCESS]', res);
        this.seasonalDorama = res.results.sort((a, b) => b.rating - a.rating);
        this.doramaCountry = [];
        for (const sD of this.seasonalDorama) {
          sD.mdl_id = sD.id;
          sD.image_url = sD.cover;
          this.doramaCountry.push(sD.country);
        }
        this.doramaCountry = [...new Set(this.doramaCountry)].sort();
        if (showFab) {
          this.fs.initializeFab('settings_backup_restore', null, 'Kembali Ke Musim Sekarang', '/dorama', false);
        }
        this.bs.idle();
        this.getFansubDorama();
      },
      error: err => {
        this.gs.log('[DORAMA_SEASONAL_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  getFansubDorama(): void {
    this.bs.busy();
    this.tabData[0].data.row = [];
    const seasonalDoramaListId = [];
    for (const sD of this.seasonalDorama) {
      seasonalDoramaListId.push(sD.mdl_id);
    }
    this.subsFansubDorama = this.dorama.getFansubDorama(seasonalDoramaListId).subscribe({
      next: res => {
        this.gs.log('[FANSUB_DORAMA_SUCCESS]', res);
        this.seasonalDoramaWithFansub = [];
        for (const sD of this.seasonalDorama) {
          sD.namaFansubs = res.results[sD.mdl_id];
          for (const f of sD.namaFansubs) {
            f.selected = true;
            f.type = 'chip';
          }
          this.seasonalDoramaWithFansub.push({
            url: sD.url,
            country: sD.country,
            Jenis: sD.type,
            Poster: sD.image_url,
            'Judul Dorama': sD.title,
            'Nama Fansub': sD.namaFansubs,
          });
        }
        this.seasonalDoramaWithFansub = this.seasonalDoramaWithFansub.sort((a, b) => b['Nama Fansub'].length - a['Nama Fansub'].length);
        this.bs.idle();
        this.changeCountryDorama();
      },
      error: err => {
        this.gs.log('[FANSUB_DORAMA_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  changeSeasonalDorama(): void {
    this.router.navigate(['/dorama'], {
      queryParams: {
        season: this.selectedSeasonName,
        year: this.currentYear
      }
    });
  }

  changeCountryDorama(): void {
    this.tabData[0].data.row = this.seasonalDoramaWithFansub.filter(x => x.country.includes(this.selectedCountryName));
    this.seasonalDoramaCard = this.seasonalDorama.filter(x => x.country.includes(this.selectedCountryName));
  }

  openDoramaPage(data): void {
    this.gs.log('[DORAMA_SEASONAL_CLICK_DORAMA]', data);
    this.router.navigateByUrl(`/dorama/${data.url.replace(/[^a-zA-Z0-9\-]/g, '')}`);
  }

  openFansub(data): void {
    this.gs.log('[DORAMA_SEASONAL_CLICK_FANSUB]', data);
    this.router.navigateByUrl(`/fansub/${data.slug}`);
  }

}
