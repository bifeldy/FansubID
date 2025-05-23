import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../environments/app/environment';

import { RoleModel, FansubMemberModel } from '../../../../models/req-res.model';
import { WARNA } from '../../../../models/warna';

import { GlobalService } from '../../../_shared/services/global.service';
import { FabService } from '../../../_shared/services/fab.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { StatsServerService } from '../../../_shared/services/stats-server.service';
import { WinboxService } from '../../../_shared/services/winbox.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { ToastService } from '../../../_shared/services/toast.service';
import { BerkasService } from '../../../_shared/services/berkas.service';
import { NotificationsService } from '../../../_shared/services/notifications.service';

@Component({
  selector: 'app-fansub-detail',
  templateUrl: './fansub-detail.component.html',
  styleUrls: ['./fansub-detail.component.css']
})
export class FansubDetailComponent implements OnInit, OnDestroy {

  fansubSlug = '';
  fansubData = null;
  rssFeedData = [];

  approvedMembers: FansubMemberModel[] = [];
  pendingMembers: FansubMemberModel[] = [];
  joinedAsMember = null;
  showPendingMember = false;

  count = 0;
  page = 1;
  row = 10;

  q = '';
  sort = '';
  order = '';

  animeFansub = [];
  doramaFansub = [];
  berkasFansub = [];

  allBerkasFansubId = [];

  animePageFinished = false;
  doramaPageFinished = false;

  animePage = 1;
  doramaPage = 1;

  chipData = [];

  panelData = [];

  tabData: any = [
    {
      name: 'Anime',
      icon: 'live_tv',
      type: 'list',
      data: []
    },
    {
      name: 'Dorama',
      icon: 'movie',
      type: 'grid',
      data: []
    },
    {
      name: 'Berkas Terkait',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Proyek', /* 'Image', */ 'Nama Berkas', 'Tanggal', 'Pemilik'],
        row: []
      }
    }
  ];

  subsActRoute = null;
  subsFansub = null;
  subsBerkas = null;
  subsAnime = null;
  subsDorama = null;
  subsParam = null;
  subsRssFeed = null;
  subsFansubMemberGet = null;
  subsFansubMemberJoin = null;
  subsFansubMemberApproveReject = null;
  subsFansubMemberLeave = null;
  subsDialog = null;
  subsClaimSubDomain = null;
  subsTrusted = null;
  subsInternetPositif = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bs: BusyService,
    private as: AuthService,
    private ds: DialogService,
    private gs: GlobalService,
    private fs: FabService,
    private pi: PageInfoService,
    private fansub: FansubService,
    private ss: StatsServerService,
    private toast: ToastService,
    private wb: WinboxService,
    private berkas: BerkasService,
    private notif: NotificationsService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get SS(): StatsServerService {
    return this.ss;
  }

  get ENV(): any {
    return environment;
  }

  ngOnDestroy(): void {
    this.subsActRoute?.unsubscribe();
    this.subsFansub?.unsubscribe();
    this.subsBerkas?.unsubscribe();
    this.subsAnime?.unsubscribe();
    this.subsDorama?.unsubscribe();
    this.subsParam?.unsubscribe();
    this.subsRssFeed?.unsubscribe();
    this.subsFansubMemberGet?.unsubscribe();
    this.subsFansubMemberJoin?.unsubscribe();
    this.subsFansubMemberApproveReject?.unsubscribe();
    this.subsFansubMemberLeave?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsClaimSubDomain?.unsubscribe();
    this.subsTrusted?.unsubscribe();
    this.subsInternetPositif?.unsubscribe();
    if (this.fansubData) {
      this.notif.removeNotif(`${environment.siteName.toUpperCase()}_FANSUB#${this.fansubData.id}`);
    }
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe({
      next: p => {
        this.fansubSlug = p['fansubSlug'];
        this.getFansubDetail();
      }
    });
  }

  getFansubDetail(): void {
    this.bs.busy();
    this.subsFansub = this.fansub.getFansub(this.fansubSlug).subscribe({
      next: res => {
        this.gs.log('[FANSUB_DETAIL_SUCCESS]', res);
        this.fansubData = res.result;
        this.pi.updatePageMetaData(
          this.fansubData.name,
          this.fansubData.description,
          Array.isArray(this.fansubData.tags) ? this.fansubData.tags.join(', ') : this.fansubData.name,
          this.fansubData.image_url,
          this.fansubData.user_.username
        );
        this.bs.idle();
        if (this.gs.isBrowser) {
          if (Array.isArray(this.fansubData.tags)) {
            for (let i = 0; i < this.fansubData.tags.length; i++) {
              this.chipData.push({ id_tag: i, name: this.fansubData.tags[i], color: WARNA.BIRU, selected: true });
            }
          }
          this.panelData = [];
          this.panelData.push({ title: 'Informasi', icon: 'notification_important', text: this.fansubData.description });
          if (this.fansubData.urls['web']) {
            this.fs.initializeFab('web', null, 'Buka Halaman Website Fansub', this.fansubData.urls['web'], true);
          }
          this.getAnimeFansub();
          this.getDoramaFansub();
          this.getBerkasFansub();
          this.getRssFeed();
          this.getFansubMember();
          this.checkInternetPositif();
        }
      },
      error: err => {
        this.gs.log('[FANSUB_DETAIL_ERROR]', err, 'error');
        this.bs.idle();
        this.router.navigate(['/error'], {
          queryParams: {
            ...this.activatedRoute.snapshot.queryParams,
            returnUrl: '/fansub'
          }
        });
      }
    });
  }

  checkInternetPositif(): void {
    this.bs.busy();
    this.subsInternetPositif = this.fansub.checkInternetPositif([this.fansubData.id]).subscribe({
      next: res => {
        this.gs.log('[FANSUB_KOMINFO_SUCCESS]', res);
        if (res.results[this.fansubData.id]) {
          this.notif.addNotif(
            null,
            `${environment.siteName.toUpperCase()}_FANSUB#${this.fansubData.id}`,
            'secondary',
            'Internet Positif',
            'Halaman website Fansub ini ada di dalam daftar situs yang diblokir oleh Kominfo ~',
            false
          );
        }
      },
      error: err => {
        this.gs.log('[FANSUB_KOMINFO_ERROR]', err, 'error');
        this.bs.idle();
      },
      complete: () => {
        this.bs.idle();
      }
    });
  }

  getRssFeed(): void {
    this.bs.busy();
    this.subsRssFeed = this.fansub.getRssFeedFansub(this.fansubSlug).subscribe({
      next: res => {
        this.gs.log('[RSS_FEED_LIST_SUCCESS]', res);
        this.rssFeedData = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[RSS_FEED_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  showAllRssFeed(): void {
    this.router.navigate(['/rss-feed'], {
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        q: this.fansubSlug
      }
    });
  }

  openRssFeed(fansub_: any, link: string): void {
    const domain: string = fansub_.urls['web'];
    if (domain) {
      const url = new URL(domain);
      let uri = `${url.protocol}//${url.host}`;
      if (!link.startsWith('/')) {
        uri += '/';
      }
      uri += link;
      this.wb.winboxOpenUri(uri);
    }
  }

  getBerkasFansub(): void {
    this.bs.busy();
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
      this.bs.idle();
    }
    this.subsBerkas = this.fansub.getBerkasFansub([this.fansubData.id], this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[BERKAS_ANIME_SUCCESS]', res);
        this.count = res.count;
        this.allBerkasFansubId = [];
        this.berkasFansub = [];
        for (const r of res.results[this.fansubData.id]) {
          this.allBerkasFansubId.push(r.id);
          this.berkasFansub.push({
            id: r.id,
            private: r.private,
            foto: r.user_.image_url,
            Pemilik: r.user_.username,
            Proyek: r.project_type_.name,
            // Image: r.image_url,
            Tanggal: r.created_at,
            'Nama Berkas': r.name,
            DARK: r.r18
          });
        }
        this.tabData[2].data.row = this.berkasFansub;
        if (this.allBerkasFansubId.length > 0) {
          this.checkTrusted();
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BERKAS_FANSUB_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  checkTrusted():void {
    this.bs.busy();
    if (this.subsTrusted) {
      this.subsTrusted.unsubscribe();
      this.bs.idle();
    }
    this.subsTrusted = this.berkas.checkTrusted(this.allBerkasFansubId).subscribe({
      next: res => {
        this.gs.log('[ANIME_BERKAS_TRUSTED_SUCCESS]', res);
        for (const b of this.berkasFansub) {
          b.trusted = res.results[b.id];
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[ANIME_BERKAS_TRUSTED_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getAnimeFansub(): void {
    this.bs.busy();
    this.subsAnime = this.fansub.getAnimeFansub([this.fansubData.id], this.animePage).subscribe({
      next: res => {
        this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
        for (const r of res.results[this.fansubData.id]) {
          this.animeFansub.push({
            id: r.id,
            image: r.image_url,
            title: r.name
          });
        }
        this.tabData[0].data = this.animeFansub;
        if (res.results[this.fansubData.id].length <= 0) {
          this.animePageFinished = true;
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_ANIME_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getDoramaFansub(): void {
    this.bs.busy();
    this.subsDorama = this.fansub.getDoramaFansub([this.fansubData.id], this.doramaPage).subscribe({
      next: res => {
        this.gs.log('[FANSUB_DORAMA_SUCCESS]', res);
        for (const r of res.results[this.fansubData.id]) {
          this.doramaFansub.push({
            id: r.id,
            image: r.image_url,
            title: r.name,
            slug: r.slug
          });
        }
        this.tabData[1].data = this.doramaFansub;
        if (res.results[this.fansubData.id].length <= 0) {
          this.doramaPageFinished = true;
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_DORAMA_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  editFansubData(): void {
    this.router.navigateByUrl(`/fansub/${this.fansubSlug}/edit`);
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[BERKAS_FANSUB_ENTER_FILTER]', data);
    this.q = data;
    this.getBerkasFansub();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[BERKAS_FANSUB_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getBerkasFansub();
  }

  onPaginatorClicked(data): void {
    this.gs.log('[FANSUB_DETAIL_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getBerkasFansub();
  }

  openFile(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_FILE]', data);
    this.router.navigateByUrl(`/berkas/${data.id}`);
  }

  openAnime(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_ANIME]', data);
    const judulAnime = data.title.replace(/[^a-zA-Z0-9]/g, '-');
    this.router.navigateByUrl(`/anime/${data.id}-${judulAnime}`);
  }

  openDorama(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_DORAMA]', data);
    this.router.navigateByUrl(`/dorama/${data.slug}`);
  }

  openTag(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_TAG]', data);
  }

  onAnimeLoadNextPage(): void {
    if (!this.animePageFinished) {
      this.animePage++;
      this.getAnimeFansub();
    }
  }

  onDoramaLoadNextPage(): void {
    if (!this.doramaPageFinished) {
      this.doramaPage++;
      this.getDoramaFansub();
    }
  }

  togglePendingMembers(): void {
    this.showPendingMember = !this.showPendingMember;
    this.getFansubMember();
  }

  getFansubMember(): void {
    this.bs.busy();
    this.subsFansubMemberGet = this.fansub.getFansubMember(this.fansubSlug).subscribe({
      next: res => {
        this.gs.log('[FANSUB_DETAIL_MEMBER_LIST_SUCCESS]', res);
        this.approvedMembers = [];
        this.pendingMembers = [];
        for (const m of res.results.filter(fm => fm.user_)) {
          if (m.approved) {
            this.approvedMembers.push(m);
          } else {
            this.pendingMembers.push(m);
          }
        }
        if (this.as.currentUserSubject?.value) {
          const index = this.approvedMembers.findIndex(m => m.user_.id === this.as.currentUserSubject?.value?.id);
          this.joinedAsMember = index >= 0 ? this.approvedMembers[index] : null;
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_DETAIL_MEMBER_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  joinLeaveMember(): void {
    this.bs.busy();
    if (this.joinedAsMember) {
      this.subsFansubMemberLeave = this.fansub.leaveFansubMember(this.joinedAsMember.id).subscribe({
        next: res => {
          this.gs.log('[FANSUB_DETAIL_MEMBER_LEAVE_SUCCESS]', res);
          this.getFansubMember();
          this.bs.idle();
        },
        error: err => {
          this.gs.log('[FANSUB_DETAIL_MEMBER_LEAVE_ERROR]', err, 'error');
          this.getFansubMember();
          this.bs.idle();
        }
      });
    } else {
      this.subsFansubMemberJoin = this.fansub.requestJoinFansubMember({
        slug: this.fansubSlug
      }).subscribe({
        next: res => {
          this.gs.log('[FANSUB_DETAIL_MEMBER_JOIN_SUCCESS]', res);
          this.bs.idle();
          this.subsDialog = this.ds.openInfoDialog({
            data: {
              title: 'Permintaan Gabung Berhasil',
              htmlMessage: 'Silahkan Menghubungi Anggota Yang Sudah Tergabung / Admin / Moderator Fansub Untuk Menerima Permintaan Gabung.',
              confirmText: 'Tutup'
            }
          }).afterClosed().subscribe({
            next: r => {
              this.gs.log('[INFO_DIALOG_CLOSED]', r);
              this.getFansubMember();
              this.subsDialog.unsubscribe();
            }
          });
        },
        error: err => {
          this.gs.log('[FANSUB_DETAIL_MEMBER_JOIN_ERROR]', err, 'error');
          this.getFansubMember();
          this.bs.idle();
        }
      });
    }
  }

  approveOrRejectFansubMember(data: FansubMemberModel, ac: boolean): void {
    this.subsDialog = this.ds.openInputDialog({
      data: {
        title: `Keterangan ${ac ? 'Approve' : 'Reject'} '${data.user_.username}' :: '${data.fansub_.slug}'`,
        input: {
          keterangan: {
            inputLabel: 'Keterangan',
            inputPlaceholder: `Pemilik, Translator, Timer, QA / QC, TypeSetter, dll.`,
            inputValue: null,
            inputRequired: true
          }
        },
        confirmText: 'OK',
        cancelText: 'Batal',
        infoText: 'Max. 10 Huruf'
      }
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INPUT_DIALOG_CLOSED]', re);
        if (re) {
          this.bs.busy();
          this.subsFansubMemberApproveReject = this.fansub.approveRejectFansubMember(data.id, {
            approved: ac,
            keterangan: re.keterangan?.substring(0, 10)
          }).subscribe({
            next: res => {
              this.gs.log('[FANSUB_DETAIL_MEMBER_APPROVE_REJECT_SUCCESS]', res);
              this.getFansubMember();
              this.bs.idle();
            },
            error: err => {
              this.gs.log('[FANSUB_DETAIL_MEMBER_APPROVE_REJECT_ERROR]', err, 'error');
              this.getFansubMember();
              this.bs.idle();
            }
          });
        } else if (re === false) {
          this.getFansubMember();
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  approveMember(member: FansubMemberModel): void {
    this.approveOrRejectFansubMember(member, true);
  }

  rejectMember(member): void {
    this.approveOrRejectFansubMember(member, false);
  }

  getSubDomain(): void {
    if (this.as.currentUserSubject?.value) {
      if (this.joinedAsMember || this.as.currentUserSubject?.value?.role === RoleModel.ADMIN || this.as.currentUserSubject?.value?.role === RoleModel.MODERATOR) {
        this.subsDialog = this.ds.openInputDialog({
          data: {
            title: `Buat CNAME / A Record IP v4 v6 :: '${this.fansubSlug}'`,
            input: {
              server_target: {
                inputLabel: 'Server Target Domain IP Publik',
                inputPlaceholder: `127.0.0.1 | ghs.google.com | blablabla.id.repl.co`,
                inputValue: null,
                inputRequired: true
              },
              verification_name: {
                inputLabel: 'Tambahan Khusus Blogger / Replit',
                inputPlaceholder: `blablabla-name | slug-fs`,
                inputValue: null,
                inputRequired: false
              },
              verification_target: {
                inputLabel: 'Tambahan Khusus Blogger / Replit',
                inputPlaceholder: `blablabla-target.dv.googlehosted.com | replit-verify=blablabla`,
                inputValue: null,
                inputRequired: false
              }
            },
            confirmText: 'OK',
            cancelText: 'Batal',
            infoText: 'Abaikan 2 Input Terakhir Jika Bukan Blogger / Replit'
          }
        }).afterClosed().subscribe({
          next: re => {
            this.gs.log('[INPUT_DIALOG_CLOSED]', re);
            if (re) {
              this.bs.busy();
              this.subsClaimSubDomain = this.fansub.claimSubDomain({
                slug: this.fansubSlug,
                server_target: re.server_target,
                verification_name: re.verification_name,
                verification_target: re.verification_target
              }).subscribe({
                next: res => {
                  this.gs.log('[FANSUB_CLAIM_SUBDOMAIN_SUCCESS]', res);
                  this.bs.idle();
                  this.subsDialog = this.ds.openInfoDialog({
                    data: {
                      title: 'Klaim Berhasil',
                      htmlMessage: `
                        Domain '${this.fansubSlug}.${this.ENV.domain}' Selesai Didaftarkan.
                        Silahkan Tunggu Hingga Propagasi Dns Selesai.
                        Untuk Mengubah, Silahkan Menuju <a href="${environment.baseUrl}/user" target="_self" class="text-decoration-none">Halaman User</a>
                        Apabila Ada Pertanyaan Dapat Langsung Menghubungi Admin / Moderator.
                        Terima Kasih.
                      `,
                      confirmText: 'Tutup'
                    }
                  }).afterClosed().subscribe({
                    next: r => {
                      this.gs.log('[INFO_DIALOG_CLOSED]', r);
                      this.getFansubDetail();
                      this.subsDialog.unsubscribe();
                    }
                  });
                },
                error: err => {
                  this.gs.log('[FANSUB_CLAIM_SUBDOMAIN_ERROR]', err, 'error');
                  this.bs.idle();
                  this.getFansubDetail();
                }
              });
            }
            this.subsDialog.unsubscribe();
          }
        });
      } else {
        this.toast.warning('Harus Menjadi Anggota Untuk Klaim Sub-Domain!', 'Whoops!', null, true);
      }
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          ...this.activatedRoute.snapshot.queryParams,
          returnUrl: this.router.url.split('?')[0]
        }
      });
    }
  }

}
