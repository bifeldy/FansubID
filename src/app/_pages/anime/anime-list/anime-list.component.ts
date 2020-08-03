import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';

import { Warna } from '../../../_shared/models/Warna';

import { GlobalService } from '../../../_shared/services/global.service';
import { JikanService } from '../../../_shared/services/jikan.service';
import { FabService } from 'src/app/_shared/services/fab.service';

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
export class AnimeListComponent implements OnInit {

  seasonalBanner = [
    { id: 1, name: 'winter', img: '/assets/img/season/winter.png' },
    { id: 2, name: 'spring', img: '/assets/img/season/spring.png' },
    { id: 3, name: 'summer', img: '/assets/img/season/summer.png' },
    { id: 4, name: 'fall', img: '/assets/img/season/fall.png' },
  ];

  currentDate = null;
  currentMonth = null;
  currentYear = null;

  selectedSeasonName = null;
  selectedSeasonBannerImg = null;

  minDate: Date;
  maxDate: Date;

  seasonalAnimeData = [];

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gs: GlobalService,
    private fs: FabService,
    private jikan: JikanService
  ) { }

  ngOnInit(): void {
    this.currentDate = new FormControl(moment());
    this.currentMonth = new Date(this.currentDate.value.format()).getMonth() + 1;
    this.currentYear = new Date(this.currentDate.value.format()).getFullYear();
    this.minDate = new Date(this.currentYear - 103, 0, 1);
    this.maxDate = new Date(this.currentYear + 1, 11, 31);
    this.watchUrlRoute();
  }

  watchUrlRoute(): void {
    this.activatedRoute.queryParams.subscribe(p => {
      this.currentYear = p.year ? parseInt(p.year, 10) : new Date().getFullYear();
      this.currentDate = new FormControl(moment(new Date(`${this.currentYear}-${this.currentMonth}-01`)));
      this.selectedSeasonName = p.season ? p.season : this.findSeasonNameByMonthNumber(this.currentMonth);
      this.selectedSeasonBannerImg = this.seasonalBanner.find(sB => sB.name === this.selectedSeasonName).img;
      this.getSeasonalAnime(p.year && p.season);
    });
  }

  findSeasonNameByMonthNumber(monthNumber: number): string {
    return this.seasonalBanner.find(sB => sB.id === Math.ceil(monthNumber / 3)).name;
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>): void {
    const ctrlValue = this.currentDate.value;
    ctrlValue.year(normalizedYear.year());
    this.currentDate.setValue(ctrlValue);
    this.currentMonth = new Date(this.currentDate.value.format()).getMonth() + 1;
    this.currentYear = new Date(this.currentDate.value.format()).getFullYear();
    datepicker.close();
    this.changeSeasonalAnime();
  }

  getSeasonalAnime(showFab = false): void {
    this.jikan.getSeasonalAnime(this.currentYear, this.selectedSeasonName).subscribe(
      res => {
        this.seasonalAnimeData = res.anime.filter(a =>
          a.continuing === false && a.type === 'TV' && a.r18 === false && a.kids === false
        ).sort((a, b) => b.score - a.score);
        this.tabData[0].data.row = [];
        res.anime.forEach(sad => {
          this.tabData[0].data.row.push({
            mal_id: sad.mal_id,
            Jenis: sad.type,
            Poster: sad.image_url,
            'Judul Anime': sad.title,
            'Nama Fansub': [
              { type: 'chip', selected: true, id: 1, name: 'Fansub 1', url: '/', color: Warna.BIRU },
              { type: 'chip', selected: true, id: 2, name: 'Fansub 2', url: '/', color: Warna.UNGU },
              { type: 'chip', selected: true, id: 3, name: 'Fansub 3', url: '/', color: Warna.HITAM },
              // { type: 'chip', selected: true, id: 4, name: 'Fansub 4', url: '/', color: Warna.ABU },
              // { type: 'chip', selected: true, id: 5, name: 'Fansub 5', url: '/', color: Warna.MERAH },
              // { type: 'chip', selected: true, id: 6, name: 'Fansub 6', url: '/', color: Warna.PINK },
              // { type: 'chip', selected: true, id: 7, name: 'Fansub 7', url: '/', color: Warna.OREN },
              // { type: 'chip', selected: true, id: 8, name: 'Fansub 8', url: '/', color: Warna.KUNING },
              // { type: 'chip', selected: true, id: 9, name: 'Fansub 9', url: '/', color: Warna.HIJAU }
            ]
          });
        });
        if (showFab) {
          this.fs.initializeFab('settings_backup_restore', null, 'Kembali Ke Musim Sekarang', '/anime', false);
        }
      },
      err => {
        this.gs.log(err);
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
    this.router.navigateByUrl(`/anime/${data.mal_id}`);
  }

  openFansub(data): void {
    this.gs.log(data);
  }

}
