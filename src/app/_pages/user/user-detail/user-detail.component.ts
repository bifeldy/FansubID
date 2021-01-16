import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { FabService } from '../../../_shared/services/fab.service';
import { UserService } from '../../../_shared/services/user.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  username = null;
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
        column: ['Jenis', 'Image', 'Nama Berkas', 'Tanggal', 'Kunjungan', 'Pemilik'],
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

  subsParam = null;
  subsUser = null;
  subsBerkas = null;
  subsBanned = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public gs: GlobalService,
    private bs: BusyService,
    private fs: FabService,
    private pi: PageInfoService,
    private us: UserService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnDestroy(): void {
    if (this.subsParam) {
      this.subsParam.unsubscribe();
    }
    if (this.subsUser) {
      this.subsUser.unsubscribe();
    }
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
    }
    if (this.subsBanned) {
      this.subsBanned.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
      this.bs.busy();
      this.subsUser = this.us.getUserData(this.username).subscribe(
        res => {
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
        err => {
          this.gs.log('[USER_DETAIL_ERROR]', err);
          this.bs.idle();
          this.router.navigate(['/error'], {
            queryParams: {
              returnUrl: '/'
            }
          });
        }
      );
    });
  }

  checkBanned(): void {
    this.bs.busy();
    this.subsBanned = this.us.checkBanned(this.userData.id).subscribe(
      res => {
        this.gs.log('[USER_CHECK_BANNED_SUCCESS]', res);
        if (Object.keys(res.results[this.userData.id]).length > 0) {
          this.userBanned = res.results[this.userData.id];
        }
        this.bs.idle();
      },
      err => {
        this.gs.log('[USER_CHECK_BANNED_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  getUserBerkas(): void {
    this.bs.busy();
    this.subsBerkas = this.us.getUserBerkas(
      this.username, this.q, this.page, this.row, this.sort, this.order
    ).subscribe(
      res => {
        this.gs.log('[USER_BERKAS_LIST_SUCCESS]', res);
        this.count = res.count;
        this.berkasData = [];
        for (const r of res.results) {
          this.berkasData.push({
            id: r.id,
            foto: r.user_.image_url,
            Jenis: r.project_type_.name,
            Image: r.image_url,
            Tanggal: r.created_at,
            Kunjungan: `${r.view_count}x Views`,
            Pemilik: r.user_.username,
            'Nama Berkas': r.name
          });
        }
        this.tabData[0].data.row = this.berkasData;
        this.bs.idle();
      },
      err => {
        this.gs.log('[USER_BERKAS_LIST_ERROR]', err);
        this.bs.idle();
      }
    );
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
    window.open(`https://discordapp.com/users/${this.userData.discord}`, '_blank');
  }

}
