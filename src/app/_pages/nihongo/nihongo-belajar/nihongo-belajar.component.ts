import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { UserModel } from '../../../../models/req-res.model';

import { AuthService } from '../../../_shared/services/auth.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { NihongoService } from '../../../_shared/services/nihongo.service';

@Component({
  selector: 'app-belajar',
  templateUrl: './nihongo-belajar.component.html',
  styleUrls: ['./nihongo-belajar.component.css']
})
export class NihongoBelajarComponent implements OnInit, OnDestroy {

  currentUser: UserModel = null;

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
  subsHirakata = null;
  subsAllNihongo = null;

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
    { category: 'number', meaning: 300, kana: '三百', romaji: 'San Byaku' },
    { category: 'number', meaning: 600, kana: '六百', romaji: 'Roppyaku' },
    { category: 'number', meaning: 800, kana: '八百', romaji: 'Happyaku' },
    { category: 'number', meaning: 1000, kana: '千', romaji: 'Sen' },
    { category: 'number', meaning: 3000, kana: '三千', romaji: 'San Zen' },
    { category: 'number', meaning: 8000, kana: '八千', romaji: 'Hassen' },
    { category: 'number', meaning: 10000, kana: '一万', romaji: 'Ichi-Man' },
    { category: 'number', meaning: 100000, kana: '十万', romaji:  'Jyuu-Man' },
    { category: 'number', meaning: 1000000, kana: '百万', romaji:  'Hyaku-Man' },
  ];

  constructor(
    private router: Router,
    private toast: ToastrService,
    private as: AuthService,
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
      if (!this.gs.isDarkMode) {
        this.gs.toggleDarkTheme();
      }
    }
  }

  ngOnDestroy(): void {
    this.subsUser?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsHirakata?.unsubscribe();
    this.subsAllNihongo?.unsubscribe();
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
    if (!this.gs.includesOneOf(this.modeTampilan, ['hiragana', 'katakana', 'angka'])) {
      this.daftarNihongo = [];
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
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[BELAJAR_DMAK_DIALOG_CLOSED]', re);
        this.subsDialog.unsubscribe();
      }
    });
  }

  getHirakata(): void {
    this.bs.busy();
    this.subsHirakata = this.nihon.getHirakata().subscribe({
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
        console.clear()
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BELAJAR_HIRAKATA_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  getAngka(): void {
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
    this.bs.busy();
    this.subsAllNihongo = this.nihon.getAllNihongo(this.modeTampilan, this.q, this.page, this.row).subscribe({
      next: res => {
        this.gs.log('[BELAJAR_KANA_LIST_SUCCESS]', res);
        this.count = res.count;
        this.daftarNihongo = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BELAJAR_KANA_LIST_ERROR]', err);
        this.bs.idle();
      },
    });
  }

  addOrEditDataset(dataset): void {
    this.gs.log('[BELAJAR_DATASET_ADD_OR_EDIT_CLICK]', dataset);
    if (this.currentUser) {
      if (this.currentUser.verified) {
        this.subsDialog = this.ds.openBelajarDialog({
          data: {
            title: (dataset ? `Edit Data` : `Tambah Dataset`),
            modeTampilan: this.modeTampilan,
            dataset,
            confirmText: 'Simpan',
            cancelText: 'Tutup'
          },
          disableClose: true
        }).afterClosed().subscribe({
          next: re => {
            this.gs.log('[BELAJAR_DATASET_DIALOG_CLOSED]', re);
            this.getData();
            this.subsDialog.unsubscribe();
          }
        });
      } else {
        this.toast.warning('Khusus Pengguna Terverifikasi', 'Whoops!');
      }
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: '/nihongo/belajar'
        }
      });
    }

  }

}
