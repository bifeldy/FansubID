import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { BerkasService } from '../../../_shared/services/berkas.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-berkas-list',
  templateUrl: './berkas-list.component.html',
  styleUrls: ['./berkas-list.component.css']
})
export class BerkasListComponent implements OnInit, OnDestroy {

  berkasData = [];

  tabData: any = [
    {
      name: 'Berkas Terkini',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Proyek', 'Image', 'Nama Berkas', 'Tanggal', 'Pemilik'],
        row: []
      }
    }
  ];

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  subsBerkas = null;

  constructor(
    private router: Router,
    public gs: GlobalService,
    private bs: BusyService,
    private berkas: BerkasService,
    private fs: FabService
  ) {
    this.gs.bannerImg = '/assets/img/shipping.gif';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getBerkas();
    }
  }

  getBerkas(): void {
    this.bs.busy();
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
      this.bs.idle();
    }
    this.subsBerkas = this.berkas.getAllBerkas(
      this.q, this.page, this.row, this.sort, this.order
    ).subscribe({
      next: res => {
        this.gs.log('[BERKAS_LIST_SUCCESS]', res);
        this.count = res.count;
        this.berkasData = [];
        for (const r of res.results) {
          this.berkasData.push({
            id: r.id,
            foto: r.user_.image_url,
            Proyek: r.project_type_.name,
            Image: r.image_url,
            Tanggal: r.created_at,
            Pemilik: r.user_.username,
            'Nama Berkas': r.name
          });
        }
        this.tabData[0].data.row = this.berkasData;
        this.fs.initializeFab('add', null, 'Tambah Berkas Baru', `/berkas/create`, false);
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BERKAS_LIST_ERROR]', err);
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
