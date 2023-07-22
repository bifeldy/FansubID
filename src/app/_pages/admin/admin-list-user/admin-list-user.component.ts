import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/app/environment';

import { RoleModel } from '../../../../models/req-res.model';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { UserService } from '../../../_shared/services/user.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';

@Component({
  selector: 'app-admin-list-user',
  templateUrl: './admin-list-user.component.html',
  styleUrls: ['./admin-list-user.component.css']
})
export class AdminListUserComponent implements OnInit, OnDestroy {

  subsUserGet = null;
  subsUserDelete = null;
  subsPromote = null;
  subsDialog = null;
  subsBannedGet = null;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  userData = {
    column: ['Id', 'Role', 'Image', 'Username', 'Nama Lengkap', 'Email', 'Aksi'],
    row: []
  };

  constructor(
    private router: Router,
    private bs: BusyService,
    private ds: DialogService,
    private as: AuthService,
    private gs: GlobalService,
    private ss: StatsServerService,
    private adm: AdminService,
    private user: UserService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getUser();
    }
  }

  ngOnDestroy(): void {
    this.subsUserGet?.unsubscribe();
    this.subsUserDelete?.unsubscribe();
    this.subsPromote?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsBannedGet?.unsubscribe();
  }

  getUser(): void {
    this.bs.busy();
    if (this.subsUserGet) {
      this.subsUserGet.unsubscribe();
      this.bs.idle();
    }
    this.subsUserGet = this.user.getAllUser(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[USER_LIST_SUCCESS]', res);
        this.count = res.count;
        this.bs.busy();
        this.subsBannedGet = this.adm.getBanned({
          username: res.results.map(r => r.username)
        }).subscribe({
          next: result => {
            this.gs.log('[BANNED_LIST_SUCCESS]', res);
            const userDataRow = [];
            let excludedRole = [];
            if (this.as.currentUserSubject?.value?.role === RoleModel.ADMIN) {
              excludedRole = [RoleModel.ADMIN];
            } else {
              excludedRole = [RoleModel.ADMIN, RoleModel.MODERATOR];
            }
            for (const r of res.results) {
              userDataRow.push({
                Id: r.id,
                Role: r.role,
                Image: r.image_url,
                Username: r.username,
                Email: r._email,
                'Nama Lengkap': r.kartu_tanda_penduduk_.nama,
                banned: (Object.keys(result.results[r.username]).length > 0),
                Aksi: [
                  { type: 'button', icon: 'mail_outline', name: 'MAIL', row: r },
                  ...((
                    (Object.keys(result.results[r.username]).length > 0) ||
                    (r.username === this.as.currentUserSubject?.value?.username) ||
                    this.gs.includesOneOf(r.role, excludedRole)
                  ) ? [] : [
                    { type: 'button', icon: 'lock', name: 'BAN', row: r },
                    { type: 'button', icon: 'handyman', name: RoleModel.ADMIN, row: r },
                    { type: 'button', icon: 'security', name: RoleModel.MODERATOR, row: r },
                    { type: 'button', icon: 'rate_review', name: RoleModel.FANSUBBER, row: r },
                    { type: 'button', icon: 'person', name: RoleModel.USER, row: r }
                  ])
                ]
              });
            }
            this.userData.row = userDataRow;
            this.bs.idle();
          },
          error: err => {
            this.gs.log('[BANNED_LIST_ERROR]', err, 'error');
            this.bs.idle();
          }
        });
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  action(data): void {
    this.gs.log('[USER_LIST_CLICK_AKSI]', data);
    if (data.name === 'BAN') {
      this.ban(data.row);
    } else if (data.name === 'MAIL') {
      this.router.navigate(['/create/mailbox'], {
        queryParams: {
          to: `${data.row.username}@${environment.domain}`,
          cc: data.row._email
        }
      });
    } else {
      this.proDemote(data.row, data.name);
    }
  }

  ban(data): void {
    this.gs.log('[USER_LIST_CLICK_BAN]', data);
    this.subsDialog = this.ds.openInputDialog({
      data: {
        title: `BAN Akun -- '${data.username}'`,
        input: {
          reason: {
            inputLabel: 'Alasan',
            inputPlaceholder: `Manually Banned By ${this.as.currentUserSubject?.value?.role}`,
            inputValue: null,
            inputRequired: true
          }
        },
        confirmText: 'Ya, BAN Akun',
        cancelText: 'Tidak, Batal'
      },
      disableClose: false
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INPUT_DIALOG_CLOSED]', re);
        if (re) {
          this.bs.busy();
          this.subsUserDelete = this.adm.ban({
            id: data.id,
            email: data.email,
            username: data.username,
            reason: re.reason
          }).subscribe({
            next: res => {
              this.gs.log('[USER_LIST_CLICK_BAN_SUCCESS]', res);
              this.bs.idle();
              this.getUser();
              this.ss.socketEmitVolatile('force-logout', {
                username: data.username,
                reason: re.reason
              });
            },
            error: err => {
              this.gs.log('[USER_LIST_CLICK_BAN_ERROR]', err, 'error');
              this.bs.idle();
              this.getUser();
            }
          });
        } else {
          this.getUser();
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  async proDemote(data, role: RoleModel): Promise<void> {
    this.gs.log('[USER_LIST_CLICK_PROMOTE]', data);
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `Pro/Demosikan Akun -- '${data.username}'`,
      `Apakah Yakin Ingin Menjadikannya Sebagai ${role} ?`
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsPromote = this.adm.proDemote({
            id: data.id,
            role
          }).subscribe({
            next: res => {
              this.gs.log('[USER_LIST_CLICK_PROMOTE_SUCCESS]', res);
              this.bs.idle();
              this.getUser();
            },
            error: err => {
              this.gs.log('[USER_LIST_CLICK_PROMOTE_ERROR]', err, 'error');
              this.bs.idle();
              this.getUser();
            }
          });
        } else if (re === false) {
          this.getUser();
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  onPaginatorClicked(data): void {
    this.gs.log('[USER_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getUser();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[USER_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getUser();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[USER_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getUser();
  }

  openUser(data): void {
    this.gs.log('[USER_LIST_CLICK_USER]', data);
    this.router.navigateByUrl(`/user/${data.Username}`);
  }

}
