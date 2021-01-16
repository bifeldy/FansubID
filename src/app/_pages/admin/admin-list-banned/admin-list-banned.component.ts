import { Component, OnInit, OnDestroy } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';

@Component({
  selector: 'app-admin-list-banned',
  templateUrl: './admin-list-banned.component.html',
  styleUrls: ['./admin-list-banned.component.css']
})
export class AdminListBannedComponent implements OnInit, OnDestroy {

  subsBannedGet = null;
  subsBannedDelete = null;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  bannedData = {
    column: ['Id', 'Korban', 'Alasan', 'Pelaku', 'Aksi'],
    row: []
  };

  constructor(
    private bs: BusyService,
    private ds: DialogService,
    public gs: GlobalService,
    public adm: AdminService
  ) {
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getBan();
    }
  }

  ngOnDestroy(): void {
    if (this.subsBannedGet) {
      this.subsBannedGet.unsubscribe();
    }
    if (this.subsBannedDelete) {
      this.subsBannedDelete.unsubscribe();
    }
  }

  getBan(): void {
    this.bs.busy();
    this.subsBannedGet = this.adm.getAllBanned(
      this.q, this.page, this.row, this.sort, this.order
    ).subscribe(
      res => {
        this.gs.log('[BANNED_LIST_SUCCESS]', res);
        this.count = res.count;
        const bannedDataRow = [];
        for (const r of res.results) {
          bannedDataRow.push({
            Id: r.id,
            foto_korban: r.user_.image_url,
            foto_pelaku: (r.banned_by_ ? r.banned_by_.image_url : '/favicon.ico'),
            Korban: r.user_.username,
            Pelaku: (r.banned_by_ ? r.banned_by_.username : 'AUTO_BANNED'),
            Alasan: r.reason,
            Aksi: [{
              type: 'button',
              icon: 'lock_open',
              name: 'UnBAN',
              id: r.id,
              username: r.user_.username,
              email: r.user_.email
            }]
          });
        }
        this.bannedData.row = bannedDataRow;
        this.bs.idle();
      },
      err => {
        this.gs.log('[BANNED_LIST_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  unBan(data): void {
    this.gs.log('[BANNED_LIST_CLICK_UNBAN]', data);
    this.ds.openInfoDialog({
      data: {
        title: `UnBAN Akun -- '${data.username}' :: '${data.email}'`,
        htmlMessage: 'Apakah Yakin Dan Akun Telah Direview Sebelum UnBAN ?',
        confirmText: 'Ya, Un-BAN Akun',
        cancelText: 'Tidak, Batal'
      },
      disableClose: false
    }).afterClosed().subscribe(re => {
      if (re === true) {
        this.bs.busy();
        this.subsBannedDelete = this.adm.unBan(data.id).subscribe(
          res => {
            this.gs.log('[BANNED_LIST_CLICK_UNBAN_SUCCESS]', res);
            this.bs.idle();
            this.getBan();
          },
          err => {
            this.gs.log('[BANNED_LIST_CLICK_UNBAN_ERROR]', err);
            this.bs.idle();
            this.getBan();
          }
        );
      } else if (re === false) {
        this.getBan();
      }
    });
  }

  onPaginatorClicked(data): void {
    this.gs.log('[BANNED_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getBan();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[BANNED_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getBan();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[BANNED_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getBan();
  }

}
