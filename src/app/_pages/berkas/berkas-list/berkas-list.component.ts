import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { BerkasService } from '../../../_shared/services/berkas.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { AuthService } from '../../../_shared/services/auth.service';

@Component({
  selector: 'app-berkas-list',
  templateUrl: './berkas-list.component.html',
  styleUrls: ['./berkas-list.component.css']
})
export class BerkasListComponent implements OnInit, OnDestroy {

  allBerkasId = [];
  berkasData = [];

  tabData: any = [
    {
      name: 'Berkas Terkini',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Proyek', /* 'Image', */ 'Nama Berkas', 'Tanggal', 'Kunjungan', 'Pemilik'],
        row: []
      }
    }
  ];

  count = 0;
  page = 1;
  row = 50;

  tablePageSizeOptions = [50, 75, 100, 125, 150];

  q = '';
  sort = '';
  order = '';

  subsBerkas = null;
  subsTrusted = null;

  r18 = false;

  constructor(
    private router: Router,
    private gs: GlobalService,
    private bs: BusyService,
    private berkas: BerkasService,
    private fs: FabService,
    private as: AuthService
  ) {
    this.gs.bannerImg = '/assets/img/banner/berkas.jpg';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get AS(): AuthService {
    return this.as;
  }

  ngOnDestroy(): void {
    this.subsBerkas?.unsubscribe();
    this.subsTrusted?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      if (!this.gs.isDesktop) {
        this.tablePageSizeOptions = [10, 25, 50, 75, 100];
      }
      this.row = this.tablePageSizeOptions[0];
      this.getBerkas();
    }
  }

  getBerkas(): void {
    this.bs.busy();
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
      this.bs.idle();
    }
    this.subsBerkas = this.berkas.getAllBerkas(this.q, this.page, this.row, this.sort, this.order, this.r18).subscribe({
      next: res => {
        this.gs.log('[BERKAS_LIST_SUCCESS]', res);
        this.count = res.count;
        this.berkasData = [];
        for (const r of res.results) {
          this.allBerkasId.push(r.id);
          this.berkasData.push({
            id: r.id,
            private: r.private,
            foto: r.user_.image_url,
            Proyek: r.project_type_.name,
            // Image: r.image_url,
            Tanggal: r.created_at,
            Kunjungan: r.view_count,
            Pemilik: r.user_.username,
            'Nama Berkas': r.name
          });
        }
        this.tabData[0].data.row = this.berkasData;
        if (this.allBerkasId.length > 0) {
          this.checkTrusted();
        }
        this.fs.initializeFab('add', null, 'Tambah Berkas Baru', `/create/berkas`, false);
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BERKAS_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  checkTrusted():void {
    this.bs.busy();
    this.subsTrusted = this.berkas.checkTrusted(this.allBerkasId).subscribe({
      next: res => {
        this.gs.log('[BERKAS_TRUSTED_SUCCESS]', res);
        for (const b of this.berkasData) {
          b.trusted = res.results[b.id];
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BERKAS_TRUSTED_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  openBerkas(data): void {
    this.gs.log('[BERKAS_LIST_CLICK_BERKAS]', data);
    this.router.navigateByUrl(`/berkas/${data.id}`);
  }

  onPaginatorClicked(data): void {
    this.gs.log('[BERKAS_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getBerkas();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[BERKAS_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getBerkas();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[BERKAS_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getBerkas();
  }

}
