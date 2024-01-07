import { Component, OnDestroy, OnInit } from '@angular/core';

import { environment } from '../../../../environments/app/environment';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';

@Component({
  selector: 'app-admin-list-cors',
  templateUrl: './admin-list-cors.component.html',
  styleUrls: ['./admin-list-cors.component.css']
})
export class AdminListCorsComponent implements OnInit, OnDestroy {

  subsCorsGet = null;
  subsCorsDelete = null;
  subsDialog = null;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  corsData = {
    column: ['Id', 'Nama Api', 'IP Domain', 'Api Key', 'Pemilik', 'Aksi'],
    row: []
  };

  constructor(
    private bs: BusyService,
    private ds: DialogService,
    private gs: GlobalService,
    private adm: AdminService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getCors();
    }
  }

  ngOnDestroy(): void {
    this.subsCorsGet?.unsubscribe();
    this.subsCorsDelete?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  getCors(): void {
    this.bs.busy();
    if (this.subsCorsGet) {
      this.subsCorsGet.unsubscribe();
      this.bs.idle();
    }
    this.subsCorsGet = this.adm.getAllCors(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[CORS_LIST_SUCCESS]', res);
        this.count = res.count;
        const corsDataRow = [];
        for (const r of res.results) {
          corsDataRow.push({
            Id: r.id,
            'Nama Api': r.name,
            'IP Domain': r.ip_domain,
            'Api Key': r.api_key,
            foto: (r.user_?.image_url || `${environment.baseUrl}/assets/img/favicon.png`),
            Pemilik: (r.user_?.username || 'SYSTEM'),
            Aksi: [
              { type: 'button', icon: 'layers_clear', name: 'Revoke', row: r }
            ]
          });
        }
        this.corsData.row = corsDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[CORS_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  action(data): void {
    this.gs.log('[CORS_LIST_CLICK_AKSI]', data);
    if (data.name === 'Revoke') {
      this.revokeCors(data.row);
    }
    // TODO :: Other Action
  }

  async revokeCors(data): Promise<void> {
    this.gs.log('[CORS_LIST_CLICK_REVOKE]', data);
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `Revoke Kunci -- '${data.id}' :: '${data.ip_domain}'`,
      'Apakah Yakin Untuk Menonaktifkan Kunci Ini ?'
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsCorsDelete = this.adm.revokeCors(data.id).subscribe({
            next: res => {
              this.gs.log('[CORS_LIST_CLICK_REVOKE_SUCCESS]', res);
              this.bs.idle();
              this.getCors();
            },
            error: err => {
              this.gs.log('[CORS_LIST_CLICK_REVOKE_ERROR]', err, 'error');
              this.bs.idle();
              this.getCors();
            }
          });
        } else if (re === false) {
          this.getCors();
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  onPaginatorClicked(data): void {
    this.gs.log('[CORS_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getCors();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[CORS_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getCors();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[CORS_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getCors();
  }

  openCors(data): void {
    this.gs.log('[CORS_LIST_CLICK_CORS]', data);
  }

}
