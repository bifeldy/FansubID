import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

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
  daftarAngka = [];
  daftarNihongo = [];

  count = 0;
  page = 1;
  row = 50;

  q = '';

  subsDialog = null;

  constructor(
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
    }
  }

  ngOnDestroy(): void {
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
    this.gs.log('[SEARCH_VALUE_CHANGED]', event);
    this.q = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.resetPaginator();
  }

  paginatorChanged(data): void {
    this.gs.log('[PAGINATOR_VALUE_CHANGED]', data);
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
        this.gs.log('[HIRAKATA_SUCCESS]', res);
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
        this.gs.log('[HIRAKATA_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  getAngka(): void {
    console.log('getAngka');
  }

  getData(): void {
    console.log('getData');
  }

  addOrEditDataset(): void {
    this.subsDialog = this.ds.openInfoDialog({
      data: {
        title: `Dataset`,
        confirmText: 'Simpan',
        cancelText: 'Tutup'
      },
      disableClose: true
    }).afterClosed().subscribe({
      next: re => {
        console.log(re);
        if (re === true) {
          // this.bs.busy();
          // this.subsBannedDelete = this.adm.unBan(data.id).subscribe({
          //   next: res => {
          //     this.gs.log('[BANNED_LIST_CLICK_UNBAN_SUCCESS]', res);
          //     this.bs.idle();
          //     this.getData();
          //   },
          //   error: err => {
          //     this.gs.log('[BANNED_LIST_CLICK_UNBAN_ERROR]', err);
          //     this.bs.idle();
          //     this.getData();
          //   }
          // });
        } else if (re === false) {
          this.getData();
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

}
