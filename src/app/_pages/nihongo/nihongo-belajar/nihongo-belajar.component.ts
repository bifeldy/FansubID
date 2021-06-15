import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { AuthService } from '../../../_shared/services/auth.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { NihongoService } from '../../../_shared/services/nihongo.service';

import User from '../../../_shared/models/User';

@Component({
  selector: 'app-belajar',
  templateUrl: './nihongo-belajar.component.html',
  styleUrls: ['./nihongo-belajar.component.css']
})
export class NihongoBelajarComponent implements OnInit, OnDestroy {

  currentUser: User = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageSizeOptions = [50, 75, 100, 125, 150];

  kategori = [
    { id: 'hiragana', name: 'Huruf Hiragana' },
    { id: 'katakana', name: 'Huruf Katakana' },
    { id: 'angka', name: 'Angka' },
    { id: 'warna', name: 'Warna' },
    { id: 'binatang', name: 'Binatang' },
    { id: 'buah', name: 'Buah' },
    { id: 'sayur', name: 'Sayur' },
    { id: 'daging', name: 'Daging' },
    { id: 'minuman', name: 'Minuman' },
    { id: 'pakaian', name: 'Pakaian' },
    { id: 'cuaca', name: 'Cuaca' },
    { id: 'transportasi', name: 'Transportasi' },
    { id: 'tempat', name: 'Tempat' },
    { id: 'pekerjaan', name: 'Pekerjaan' },
    { id: 'olahraga', name: 'Olah Raga' },
    { id: 'perkakas', name: 'Perkakas' },
    { id: 'mebel', name: 'Mebel' },
    { id: 'dapur', name: 'Dapur' },
    { id: 'negara', name: 'Negara' }
  ];

  modeTampilan = 'hiragana';

  daftarHuruf = null;
  daftarNihongo = [];

  daftarAngka = {
    column: ['Angka', 'Kana', 'Romaji'],
    row: []
  };

  count = 0;
  page = 1;
  row = 50;

  q = '';

  subsUser = null;
  subsDialog = null;

  dummyDataset = [
    { category: 'number', meaning: 0, kana: '零／ゼロ', romaji: 'Rei/Zero' },
    { category: 'number', meaning: 1, kana: '一', romaji: 'Ichi' },
    { category: 'number', meaning: 2, kana: '二', romaji: 'Ni' },
    { category: 'number', meaning: 3, kana: '三', romaji: 'San' },
    { category: 'number', meaning: 4, kana: '四', romaji: 'Yon/Shi' },
    { category: 'number', meaning: 5, kana: '五', romaji: 'Go' },
    { category: 'number', meaning: 6, kana: '六', romaji: 'Roku' },
    { category: 'number', meaning: 7, kana: '七', romaji: 'Nana' },
    { category: 'number', meaning: 8, kana: '八', romaji: 'Hachi' },
    { category: 'number', meaning: 9, kana: '九', romaji: 'Kyuu/Ku' },
    { category: 'number', meaning: 10, kana: '十', romaji: 'Jyuu' },
    { category: 'number', meaning: 11, kana: '十一', romaji: 'Jyuu Ichi' },
    { category: 'number', meaning: 12, kana: '十二', romaji: 'Jyuu Ni' },
    { category: 'number', meaning: 20, kana: '二十', romaji: 'Ni Jyuu' },
    { category: 'number', meaning: 21, kana: '二十一', romaji: 'Ni Jyuu Ichi' },
    { category: 'number', meaning: 30, kana: '三十', romaji: 'San Jyuu' },
    { category: 'number', meaning: 100, kana: '百', romaji: 'Hyaku' },
    { category: 'number', meaning: 101, kana: '百一', romaji: 'Hyaku Ichi' },
    { category: 'number', meaning: 102, kana: '百二', romaji: 'Hyaku Ni' },
    { category: 'number', meaning: 110, kana: '百十', romaji: 'Hyaku Jyuu' },
    { category: 'number', meaning: 111, kana: '百十一', romaji: 'Hyaku Jyuu Ichi' },
    { category: 'number', meaning: 120, kana: '百二十', romaji: 'Hyaku Ni Jyuu' },
    { category: 'number', meaning: 601, kana: '六百一', romaji: 'Roppyaku Ichi' },
    { category: 'number', meaning: 610, kana: '六百十', romaji: 'Roppyaku Jyuu' },
    { category: 'number', meaning: 620, kana: '六百二十', romaji: 'Roppyaku Ni Jyuu' },
    { category: 'number', meaning: 621, kana: '六百二十一', romaji: 'Roppyaku Ni Jyuu Ichi' },
    { category: 'number', meaning: 801, kana: '八百一', romaji: 'Happyaku Ichi' },
    { category: 'number', meaning: 810, kana: '八百十', romaji: 'Happyaku Jyuu' },
    { category: 'number', meaning: 820, kana: '八百二十', romaji: 'Happyaku Ni Jyuu' },
    { category: 'number', meaning: 821, kana: '八百二十一', romaji: 'Happyaku Ni Jyuu Ichi' },
    { category: 'number', meaning: 1000, kana: '千', romaji: 'Sen' },
    { category: 'number', meaning: 1001, kana: '千一', romaji: 'Sen Ichi' },
    { category: 'number', meaning: 1010, kana: '千十', romaji: 'Sen Jyuu' },
    { category: 'number', meaning: 1011, kana: '千十一', romaji: 'Sen Jyuu Ichi' },
    { category: 'number', meaning: 1020, kana: '千二十', romaji: 'Sen Ni Jyuu' },
    { category: 'number', meaning: 10000, kana: '一万', romaji: 'Ichi-Man' },
    { category: 'number', meaning: 10001, kana: '一万一', romaji: 'Ichi-Man Ichi' },
    { category: 'number', meaning: 10010, kana: '一万十', romaji: 'Ichi-Man Jyuu' },
    { category: 'number', meaning: 10011, kana: '一万十一', romaji: 'Ichi-Man Jyuu Ichi' },
    { category: 'number', meaning: 20000, kana: '二万', romaji: 'Ni-Man' },
    { category: 'number', meaning: 25341, kana: '二万五千三百四十一', romaji: 'Ni-Man Go-Sen San-Hyaku Yon Jyuu Ichi' },
    { category: 'number', meaning: 60000, kana: '六万', romaji:  'Roku-Man' },
    { category: 'number', meaning: 80000, kana: '百万', romaji:  'Hyaku-Man' },
  ];

  constructor(
    public as: AuthService,
    private gs: GlobalService,
    private bs: BusyService,
    private ds: DialogService,
    private nihon: NihongoService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({
        next: user => {
          this.currentUser = user;
        }
      });
      this.getHirakata();
      this.getAngka();
    }
  }

  ngOnDestroy(): void {
    this.subsUser?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  changeModeTampilan(data): void {
    this.gs.log('[BELAJAR_CHANGE_KANA]', data);
    this.modeTampilan = data;
    this.count = 0;
    this.page = 1;
    this.row = 50;
    this.q = '';
    this.resetPaginator();
  }

  applyFilter(event): void {
    this.gs.log('[BELAJAR_SEARCH_VALUE_CHANGED]', event);
    this.q = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.resetPaginator();
  }

  paginatorChanged(data): void {
    this.gs.log('[BELAJAR_PAGINATOR_VALUE_CHANGED]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    if (this.modeTampilan != 'hiragana' && this.modeTampilan != 'katakana' && this.modeTampilan != 'angka') {
      this.getData();
    }
  }

  resetPaginator(): void {
    this.paginator?._changePageSize(this.pageSizeOptions[0]);
    this.paginator?.firstPage();
  }

  openDmak(kana): void {
    this.gs.log('[BELAJAR_OPEN_DMAK]', kana);
    this.subsDialog = this.ds.openDmakDialog({
      data: {
        romaji: kana.romaji,
        hiragana_katakana_kanji: (
          this.modeTampilan === 'hiragana' ?　kana.hiragana :　kana.katakana
        )
      },
      disableClose: false
    });
  }

  getHirakata(): void {
    this.bs.busy();
    this.nihon.getHirakata().subscribe({
      next: res => {
        this.gs.log('[BELAJAR_HIRAKATA_SUCCESS]', res);
        const huruf = {};
        for (const r of res.results) {
          if (!huruf[r.category]) {
            huruf[r.category] = {};
          }
          if (!huruf[r.category][r.segment]) {
            huruf[r.category][r.segment] = [];
          }
          huruf[r.category][r.segment].push({
            romaji: r.romaji,
            hiragana: r.hiragana,
            katakana: r.katakana,
          });
        }
        this.daftarHuruf = huruf;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BELAJAR_HIRAKATA_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  getAngka(): void {
    // TODO :: GET API BELAJAR
    const dataAngka = [];
    for (const d of this.dummyDataset) {
      dataAngka.push({
        Angka: d.meaning,
        Kana: d.kana,
        Romaji: d.romaji
      });
    }
    this.daftarAngka.row = dataAngka;
  }

  getData(): void {
    // TODO :: GET API BELAJAR
    const dataNihongo = [];
    for (const d of this.dummyDataset) {
      dataNihongo.push({
        meaning: d.meaning,
        kana: d.kana,
        romaji: d.romaji,
        image_url: '/favicon.ico'
      });
    }
    this.daftarNihongo = dataNihongo;
  }

  addOrEditDataset(dataset): void {
    this.gs.log('[BELAJAR_DATASET_ADD_OR_EDIT_CLICK]', dataset);
    if (this.currentUser && this.currentUser.verified) {
      this.subsDialog = this.ds.openBelajarDialog({
        data: {
          title: (dataset ? `Edit Data ${dataset.kana}` : `Tambah Dataset '${this.modeTampilan}'`),
          dataset,
          confirmText: 'Simpan',
          cancelText: 'Tutup'
        },
        disableClose: true
      }).afterClosed().subscribe({
        next: re => {
          console.log('[BELAJAR_DIALOG_CLOSED]', re);
          this.getData();
          this.subsDialog.unsubscribe();
        }
      });
    }
  }

}
