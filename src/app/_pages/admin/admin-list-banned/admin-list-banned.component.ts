import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/app/environment';

import { RoleModel } from '../../../../models/req-res.model';

import { AdminService } from '../../../_shared/services/admin.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { GlobalService } from '../../../_shared/services/global.service';

@Component({
  selector: 'app-admin-list-banned',
  templateUrl: './admin-list-banned.component.html',
  styleUrls: ['./admin-list-banned.component.css']
})
export class AdminListBannedComponent implements OnInit, OnDestroy {

  subsBannedGet = null;
  subsBannedDelete = null;
  subsDialog = null;

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
    private router: Router,
    private adm: AdminService,
    private bs: BusyService,
    private ds: DialogService,
    private gs: GlobalService,
    private as: AuthService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getBan();
    }
  }

  ngOnDestroy(): void {
    this.subsBannedGet?.unsubscribe();
    this.subsBannedDelete?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  getBan(): void {
    this.bs.busy();
    if (this.subsBannedGet) {
      this.subsBannedGet.unsubscribe();
      this.bs.idle();
    }
    this.subsBannedGet = this.adm.getAllBanned(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[BANNED_LIST_SUCCESS]', res);
        this.count = res.count;
        const bannedDataRow = [];
        let excludedRole = [];
        if (this.as.currentUserSubject?.value?.role === RoleModel.ADMIN) {
          excludedRole = [RoleModel.ADMIN];
        } else {
          excludedRole = [RoleModel.ADMIN, RoleModel.MODERATOR];
        }
        for (const r of res.results) {
          bannedDataRow.push({
            Id: r.id,
            foto_korban: r.user_.image_url,
            foto_pelaku: (r.banned_by_?.image_url || `${environment.baseUrl}/assets/img/favicon.png`),
            Korban: r.user_.username,
            Pelaku: (r.banned_by_?.username || 'AUTO_BANNED'),
            Alasan: r.reason,
            Aksi: [
              ...(this.gs.includesOneOf(r.user_.role, excludedRole) ? [] : [
                { type: 'button', icon: 'lock_open', name: 'UnBAN', row: r }
              ])
            ]
          });
        }
        this.bannedData.row = bannedDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BANNED_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  action(data): void {
    this.gs.log('[BANNED_LIST_CLICK_AKSI]', data);
    if (data.name === 'UnBAN') {
      this.unBan(data.row);
    }
    // TODO :: Other Action
  }

  async unBan(data): Promise<void> {
    this.gs.log('[BANNED_LIST_CLICK_UNBAN]', data);
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `UnBAN Akun -- '${data.user_.username}'`,
      'Apakah Yakin Dan Akun Telah Direview Sebelum UnBAN ?'
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsBannedDelete = this.adm.unBan(data.id).subscribe({
            next: res => {
              this.gs.log('[BANNED_LIST_CLICK_UNBAN_SUCCESS]', res);
              this.bs.idle();
              this.getBan();
            },
            error: err => {
              this.gs.log('[BANNED_LIST_CLICK_UNBAN_ERROR]', err, 'error');
              this.bs.idle();
              this.getBan();
            }
          });
        } else if (re === false) {
          this.getBan();
        }
        this.subsDialog.unsubscribe();
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

  openBan(data): void {
    this.gs.log('[BANNED_LIST_CLICK_BANNED]', data);
    this.router.navigateByUrl(`/user/${data.Korban}`);
  }

}
