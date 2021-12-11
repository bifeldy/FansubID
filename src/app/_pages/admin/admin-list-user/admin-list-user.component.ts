import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { AdminService } from '../../../_shared/services/admin.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { UserService } from '../../../_shared/services/user.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';

import { User } from '../../../_shared/models/User';
import { Role } from '../../../_shared/models/Role';

@Component({
  selector: 'app-admin-list-user',
  templateUrl: './admin-list-user.component.html',
  styleUrls: ['./admin-list-user.component.css']
})
export class AdminListUserComponent implements OnInit, OnDestroy {

  currentUser: User = null;

  subsUserGet = null;
  subsUserDelete = null;
  subsPromote = null;
  subsDialog = null;
  subsBannedGet = null;
  subsUser = null;

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
    public as: AuthService,
    public gs: GlobalService,
    public ss: StatsServerService,
    public adm: AdminService,
    public user: UserService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({ next: user => this.currentUser = user });
      this.getUser();
    }
  }

  ngOnDestroy(): void {
    this.subsUserGet?.unsubscribe();
    this.subsUserDelete?.unsubscribe();
    this.subsPromote?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsBannedGet?.unsubscribe();
    this.subsUser?.unsubscribe();
  }

  getUser(): void {
    this.bs.busy();
    if (this.subsUserGet) {
      this.subsUserGet.unsubscribe();
      this.bs.idle();
    }
    this.subsUserGet = this.user.getAllUser(
      this.q, this.page, this.row, this.sort, this.order
    ).subscribe({
      next: res => {
        this.gs.log('[USER_LIST_SUCCESS]', res);
        this.count = res.count;
        this.bs.busy();
        this.subsBannedGet = this.user.checkBanned(
          res.results.map(r => r.id)
        ).subscribe({
          next: result => {
            this.gs.log('[BANNED_LIST_SUCCESS]', res);
            const userDataRow = [];
            let excludedRole = [];
            if (this.currentUser.role === Role.ADMIN) {
              excludedRole = [Role.ADMIN];
            }
            if (this.currentUser.role === Role.MODERATOR) {
              excludedRole = [Role.ADMIN, Role.MODERATOR];
            }
            for (const r of res.results) {
              userDataRow.push({
                Id: r.id,
                Role: r.role,
                Image: r.image_url,
                Username: r.username,
                Email: r.email,
                'Nama Lengkap': r.kartu_tanda_penduduk_.nama,
                banned: (Object.keys(result.results[r.id]).length > 0),
                Aksi: (
                  (Object.keys(result.results[r.id]).length > 0) ||
                  (r.id == this.currentUser.id) ||
                  (r.role.includesOneOf(excludedRole))
                ) ? [] : [
                  { type: 'button', icon: 'lock', name: 'BAN', id: r.id, username: r.username, email: r.email },
                  { type: 'button', icon: 'handyman', name: 'ADMIN', id: r.id, username: r.username, email: r.email },
                  { type: 'button', icon: 'security', name: 'MODERATOR', id: r.id, username: r.username, email: r.email },
                  { type: 'button', icon: 'rate_review', name: 'FANSUBBER', id: r.id, username: r.username, email: r.email },
                  { type: 'button', icon: 'person', name: 'USER', id: r.id, username: r.username, email: r.email }
                ]
              });
            }
            this.userData.row = userDataRow;
            this.bs.idle();
          },
          error: err => {
            this.gs.log('[BANNED_LIST_ERROR]', err);
            this.bs.idle();
          }
        });
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_LIST_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  action(data): void {
    this.gs.log('[USER_LIST_CLICK_AKSI]', data);
    if (data.name === 'BAN') {
      this.ban(data);
    } else {
      this.promote(data);
    }
  }

  ban(data): void {
    this.gs.log('[USER_LIST_CLICK_BAN]', data);
    this.subsDialog = this.ds.openInputDialog({
      data: {
        title: `BAN Akun -- '${data.username}' :: '${data.email}'`,
        input: {
          reason: {
            inputLabel: 'Alasan',
            inputText: `Manually Banned By ${this.currentUser.role}`,
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
            reason: re.reason.inputText
          }).subscribe({
            next: res => {
              this.gs.log('[USER_LIST_CLICK_BAN_SUCCESS]', res);
              this.bs.idle();
              this.getUser();
              this.ss.socketEmitVolatile('send-logout', {
                username: data.username,
                reason: re.reason.inputText
              });
            },
            error: err => {
              this.gs.log('[USER_LIST_CLICK_BAN_ERROR]', err);
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

  promote(data): void {
    this.gs.log('[USER_LIST_CLICK_PROMOTE]', data);
    this.subsDialog = this.ds.openInfoDialog({
      data: {
        title: `Promosikan Akun -- '${data.username}' :: '${data.email}'`,
        htmlMessage: 'Apakah Yakin Dan Akun Telah Direview Sebelum Dipromosikan ?',
        confirmText: `Ya, Jadikan ${data.name}`,
        cancelText: 'Tidak, Batal'
      },
      disableClose: false
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsPromote = this.adm.promote({
            id: data.id,
            role: data.name
          }).subscribe({
            next: res => {
              this.gs.log('[USER_LIST_CLICK_PROMOTE_SUCCESS]', res);
              this.bs.idle();
              this.getUser();
            },
            error: err => {
              this.gs.log('[USER_LIST_CLICK_PROMOTE_ERROR]', err);
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
