import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../_shared/services/global.service';
import { BerkasService } from '../../_shared/services/berkas.service';
import { FabService } from '../../_shared/services/fab.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  berkasData = [];

  tabData: any = [
    {
      name: 'Berkas Terkini',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Jenis', 'Image', 'Nama Berkas', 'Upload', 'View', 'Pemilik'],
        row: []
      }
    }
  ];

  count = 0;
  page = 1;
  row = 10;
  q = '';

  constructor(
    private router: Router,
    private gs: GlobalService,
    private bs: BerkasService,
    private fs: FabService
  ) {
    this.gs.bannerImg = '/assets/img/home-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    this.getBerkas();
  }

  getBerkas(): void {
    this.bs.getAllBerkas(this.q, this.page, this.row).subscribe(
      res => {
        this.gs.log('[BERKAS_LIST_SUCCESS]', res);
        this.count = res.count;
        this.berkasData = [];
        for (const r of res.results) {
          this.berkasData.push({
            id: r.id,
            Jenis: r.project_type_.name,
            Image: r.image_url,
            Upload: r.created_at,
            View: `${r.view_count}x`,
            Pemilik: r.user_.username,
            'Nama Berkas': r.name
          });
        }
        this.tabData[0].data.row = this.berkasData;
        this.fs.initializeFab('add', null, 'Tambah Berkas Baru', `/berkas/create`, false);
      },
      err => {
        this.gs.log('[BERKAS_LIST_ERROR]', err);
      }
    );
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

}
