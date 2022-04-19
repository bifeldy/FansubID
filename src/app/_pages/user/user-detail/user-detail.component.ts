import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Role } from '../../../_shared/models/Role';

import { GlobalService } from '../../../_shared/services/global.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { FabService } from '../../../_shared/services/fab.service';
import { UserService } from '../../../_shared/services/user.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { WinboxService } from '../../../_shared/services/winbox.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  username = '';
  userData = null;

  userBanned = null;

  berkasData = [];

  panelData = [];

  tabData: any = [
    {
      name: 'Berkas',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Proyek', 'Image', 'Nama Berkas', 'Tanggal', 'Kunjungan', 'Pemilik'],
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public gs: GlobalService,
    private bs: BusyService,
    private fs: FabService,
    private pi: PageInfoService,
    private us: UserService,
    private wb: WinboxService,
    public ss: StatsServerService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    this.subsUser?.unsubscribe();
    this.subsBerkas?.unsubscribe();
    this.subsBanned?.unsubscribe();
    this.subsParam?.unsubscribe();
  }

  get ADMIN(): string {
    return Role.ADMIN;
  }

  get MODERATOR(): string {
    return Role.MODERATOR;
  }

  get FANSUBBER(): string {
    return Role.FANSUBBER;
  }

  get accountAge(): number {
    return Math.abs(new Date(
      new Date().getTime() - new Date(this.userData.created_at).getTime()
    ).getUTCFullYear() - 1970);
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe({
      next: p => {
        this.username = p.username;
        this.bs.busy();
        this.subsUser = this.us.getUserData(this.username).subscribe({
          next: res => {
            this.gs.log('[USER_DETAIL_SUCCESS]', res);
            this.userData = res.result;
            this.pi.updatePageMetaData(
              `${this.userData.kartu_tanda_penduduk_.nama}`,
              `${this.userData.profile_.description}`,
              `${this.userData.username}`,
              this.userData.image_url
            );
            this.bs.idle();
            if (this.gs.isBrowser) {
              this.panelData = [];
              this.panelData.push({ title: 'Tentang Saya', icon: 'info', text: this.userData.profile_.description });
              this.fs.initializeFab('edit', null, 'Ubah Profil', `/user/${this.username}/edit`, false);
              this.checkBanned();
              this.getUserBerkas();
            }
          },
          error: err => {
            this.gs.log('[USER_DETAIL_ERROR]', err);
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
    this.subsBanned = this.us.checkBanned(this.userData.id).subscribe({
      next: res => {
        this.gs.log('[USER_CHECK_BANNED_SUCCESS]', res);
        if (Object.keys(res.results[this.userData.id]).length > 0) {
          this.userBanned = res.results[this.userData.id];
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_CHECK_BANNED_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  getUserBerkas(): void {
    this.bs.busy();
    this.subsBerkas = this.us.getUserBerkas(
      this.username, this.q, this.page, this.row, this.sort, this.order
    ).subscribe({
      next: res => {
        this.gs.log('[USER_BERKAS_LIST_SUCCESS]', res);
        this.count = res.count;
        this.berkasData = [];
        for (const r of res.results) {
          this.berkasData.push({
            id: r.id,
            foto: r.user_.image_url,
            Proyek: r.project_type_.name,
            Image: r.image_url,
            Tanggal: r.created_at,
            Kunjungan: r.view_count,
            Pemilik: r.user_.username,
            'Nama Berkas': r.name
          });
        }
        this.tabData[0].data.row = this.berkasData;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_BERKAS_LIST_ERROR]', err);
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

  openDiscordProfile(): void {
    this.wb.winboxOpenUri(`https://discordapp.com/users/${this.userData.discord}`);
  }

}
