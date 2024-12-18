import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { NihongoCategoryModel, RoleModel } from '../../../../models/req-res.model';

import { AuthService } from '../../../_shared/services/auth.service';
import { GlobalService } from '../../../_shared/services/global.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { NihongoService } from '../../../_shared/services/nihongo.service';
import { ToastService } from '../../../_shared/services/toast.service';

@Component({
  selector: 'app-belajar',
  templateUrl: './nihongo-belajar.component.html',
  styleUrls: ['./nihongo-belajar.component.css']
})
export class NihongoBelajarComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageSizeOptions = [50, 75, 100, 125, 150];

  kategori: NihongoCategoryModel[] = [
    { id: 'hiragana', name: 'Hiragana' },
    { id: 'katakana', name: 'Katakana' },
    { id: 'angka', name: 'Angka' }
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

  subsDialog = null;
  subsHirakata = null;
  subsAllNihongo = null;
  subsAllKategori = null;

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
    { category: 'number', meaning: 123, kana: '百二十三', romaji: 'Hyaku Ni Jyuu San' },
    { category: 'number', meaning: 300, kana: '三百', romaji: 'San Byaku' },
    { category: 'number', meaning: 600, kana: '六百', romaji: 'Roppyaku' },
    { category: 'number', meaning: 800, kana: '八百', romaji: 'Happyaku' },
    { category: 'number', meaning: 1000, kana: '千', romaji: 'Sen' },
    { category: 'number', meaning: 3000, kana: '三千', romaji: 'San Zen' },
    { category: 'number', meaning: 8000, kana: '八千', romaji: 'Hassen' },
    { category: 'number', meaning: 10000, kana: '一万', romaji: 'Ichi-Man' },
    { category: 'number', meaning: 100000, kana: '十万', romaji:  'Jyuu-Man' },
    { category: 'number', meaning: 1000000, kana: '百万', romaji:  'Hyaku-Man' }
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastService,
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
      this.getHirakata();
      this.getAngka();
      this.getKategori();
      if (!this.gs.isDarkMode) {
        this.gs.toggleDarkTheme();
      }
    }
  }

  ngOnDestroy(): void {
    this.subsDialog?.unsubscribe();
    this.subsHirakata?.unsubscribe();
    this.subsAllNihongo?.unsubscribe();
    this.subsAllKategori?.unsubscribe();
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
    this.q = (event.target as HTMLInputElement).value?.trim().toLowerCase();
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
          this.modeTampilan === 'hiragana' ? kana.hiragana : kana.katakana
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
            katakana: r.katakana
          });
        }
        this.daftarHuruf = huruf;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BELAJAR_HIRAKATA_ERROR]', err, 'error');
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

  getKategori(): void {
    this.bs.busy();
    this.subsAllKategori = this.nihon.getAllKategori().subscribe({
      next: res => {
        this.gs.log('[BELAJAR_KANA_KATEGORI_SUCCESS]', res);
        this.kategori = [...this.kategori, ...res.results];
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BELAJAR_KANA_KATEGORI_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
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
        this.gs.log('[BELAJAR_KANA_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  editDataset(dataset): void {
    this.gs.log('[BELAJAR_DATASET_ADD_OR_EDIT_CLICK]', dataset);
    if (
        (!dataset && this.as.currentUserSubject?.value?.verified) ||
        (dataset && (
            this.as.currentUserSubject?.value?.role === RoleModel.ADMIN ||
            this.as.currentUserSubject?.value?.role === RoleModel.MODERATOR
        ))
    ) {
      this.subsDialog = this.ds.openBelajarDialog({
        data: {
          title: (dataset ? `Edit Data` : `Tambah Dataset`),
          modeTampilan: this.modeTampilan,
          dataset,
          confirmText: 'Simpan',
          cancelText: 'Tutup'
        }
      }).afterClosed().subscribe({
        next: re => {
          this.gs.log('[BELAJAR_DATASET_DIALOG_CLOSED]', re);
          this.getData();
          this.subsDialog.unsubscribe();
        }
      });
    }
  }

  addDataset(): void {
    if (this.as.currentUserSubject?.value) {
      if (this.as.currentUserSubject?.value?.verified) {
        this.editDataset(null);
      } else {
        this.toast.warning('Khusus Pengguna Terverifikasi', 'Whoops!', null, true);
        this.router.navigate(['/verify'], {
          queryParams: {
            ...this.activatedRoute.snapshot.queryParams,
            returnUrl: this.router.url.split('?')[0]
          }
        });
      }
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          ...this.activatedRoute.snapshot.queryParams,
          returnUrl: '/nihongo/belajar'
        }
      });
    }
  }

}
