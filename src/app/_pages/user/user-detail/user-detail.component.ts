import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../../../environments/app/environment';

import { RoleModel } from '../../../../models/req-res.model';

import { GlobalService } from '../../../_shared/services/global.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { FabService } from '../../../_shared/services/fab.service';
import { UserService } from '../../../_shared/services/user.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';
import { BerkasService } from '../../../_shared/services/berkas.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  username = '';
  userData = null;

  userBanned = null;

  groupFansub = [];
  berkasUser = [];

  allBerkasUserId = [];

  panelData = [];

  tabData: any = [
    {
      name: 'Berkas',
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
  row = 10;

  q = '';
  sort = '';
  order = '';

  subsUser = null;
  subsBerkas = null;
  subsBanned = null;
  subsParam = null;
  subsGroupGet = null;
  subsTrusted = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gs: GlobalService,
    private bs: BusyService,
    private fs: FabService,
    private pi: PageInfoService,
    private us: UserService,
    private ss: StatsServerService,
    private berkas: BerkasService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get SS(): StatsServerService {
    return this.ss;
  }

  ngOnDestroy(): void {
    this.subsUser?.unsubscribe();
    this.subsBerkas?.unsubscribe();
    this.subsBanned?.unsubscribe();
    this.subsParam?.unsubscribe();
    this.subsGroupGet?.unsubscribe();
    this.subsTrusted?.unsubscribe();
  }

  get ADMIN(): string {
    return RoleModel.ADMIN;
  }

  get MODERATOR(): string {
    return RoleModel.MODERATOR;
  }

  get FANSUBBER(): string {
    return RoleModel.FANSUBBER;
  }

  get accountAge(): number {
    return Math.abs(new Date(
      new Date().getTime() - new Date(this.userData.created_at).getTime()
    ).getUTCFullYear() - 1970);
  }

  get ENV(): any {
    return environment;
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe({
      next: p => {
        this.username = p['username'];
        this.bs.busy();
        this.subsUser = this.us.getUserData(this.username).subscribe({
          next: res => {
            this.gs.log('[USER_DETAIL_SUCCESS]', res);
            this.userData = res.result;
            this.pi.updatePageMetaData(
              `${this.userData.kartu_tanda_penduduk_.nama}`,
              `${this.userData.profile_.description}`,
              `${this.userData.username}`,
              this.userData.image_url,
              this.userData.username
            );
            this.bs.idle();
            if (this.gs.isBrowser) {
              this.panelData = [];
              this.panelData.push({ title: 'Tentang Saya', icon: 'info', text: this.userData.profile_.description });
              this.fs.initializeFab('edit', null, 'Ubah Profil', `/user/${this.username}/edit`, false);
              this.checkBanned();
              this.getUserGroup();
              this.getUserBerkas();
            }
          },
          error: err => {
            this.gs.log('[USER_DETAIL_ERROR]', err, 'error');
            this.bs.idle();
            this.router.navigate(['/error'], {
              queryParams: {
                returnUrl: '/'
              }
            });
          }
        });
      }
    });
  }

  checkBanned(): void {
    this.bs.busy();
    this.subsBanned = this.us.checkBanned(this.userData.username).subscribe({
      next: res => {
        this.gs.log('[USER_CHECK_BANNED_SUCCESS]', res);
        if (Object.keys(res.results[this.userData.username]).length > 0) {
          this.userBanned = res.results[this.userData.username];
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_CHECK_BANNED_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getUserBerkas(): void {
    this.bs.busy();
    this.subsBerkas = this.us.getUserBerkas(this.username, this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[USER_BERKAS_LIST_SUCCESS]', res);
        this.count = res.count;
        this.berkasUser = [];
        for (const r of res.results) {
          this.allBerkasUserId.push(r.id);
          this.berkasUser.push({
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
        this.tabData[0].data.row = this.berkasUser;
        if (this.allBerkasUserId.length > 0) {
          this.checkTrusted();
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_BERKAS_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  checkTrusted():void {
    this.bs.busy();
    this.subsTrusted = this.berkas.checkTrusted(this.allBerkasUserId).subscribe({
      next: res => {
        this.gs.log('[USER_BERKAS_TRUSTED_SUCCESS]', res);
        for (const b of this.berkasUser) {
          b.trusted = res.results[b.id];
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_BERKAS_TRUSTED_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  openBerkas(data): void {
    this.gs.log('[USER_BERKAS_LIST_CLICK_BERKAS]', data);
    this.router.navigateByUrl(`/berkas/${data.id}`);
  }

  onPaginatorClicked(data): void {
    this.gs.log('[USER_BERKAS_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getUserBerkas();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[USER_BERKAS_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getUserBerkas();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[USER_BERKAS_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getUserBerkas();
  }

  getUserGroup(): void {
    this.bs.busy();
    this.subsGroupGet = this.us.getUserGroup(this.username).subscribe({
      next: res => {
        this.gs.log('[USER_DETAIL_GROUP_LIST_SUCCESS]', res);
        this.groupFansub = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_DETAIL_GROUP_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

}
