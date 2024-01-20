import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

import { environment } from '../../../../environments/app/environment';

import { GlobalService } from '../../../_shared/services/global.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { UserService } from '../../../_shared/services/user.service';
import { ApiKeyService } from '../../../_shared/services/api-key.service';
import { DialogService } from '../../../_shared/services/dialog.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { WinboxService } from '../../../_shared/services/winbox.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  feedKomentarData = [];
  feedLikeDislikeData = [];
  feedVisitData = [];

  subsFeedKomentar = null;
  subsFeedLikeDislike = null;
  subsFeedVisit = null;
  subsGetApiKey = null;
  subsDialog = null;
  subsCreateApiKey = null;
  subsEditApiKey = null;
  subsRevokeApiKey = null;
  subsGroupGet = null;
  subsUpdateSubDomain = null;
  subsGetSubDomain = null;

  apiKey = [];
  groupFansub = [];

  totalKomentar = 0;
  totalLikeDislike = 0;
  totalKunjungan = 0;

  constructor(
    private clipboard: Clipboard,
    private router: Router,
    private snackBar: MatSnackBar,
    private as: AuthService,
    private ds: DialogService,
    private gs: GlobalService,
    private fs: FabService,
    private bs: BusyService,
    private us: UserService,
    private fansub: FansubService,
    private aks: ApiKeyService,
    private wb: WinboxService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get AS(): AuthService {
    return this.as;
  }

  get ENV(): any {
    return environment;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getUserFeedComment();
      this.getUserFeedLikeDislike();
      this.getUserFeedVisit();
      this.getUserApiKey();
      this.getUserGroup();
      this.fs.initializeFab(
        'arrow_forward',
        null,
        'Menuju Halaman Profile',
        `/user/${this.as.currentUserSubject?.value?.username}`,
        false
      );
    }
  }

  ngOnDestroy(): void {
    this.subsFeedKomentar?.unsubscribe();
    this.subsFeedLikeDislike?.unsubscribe();
    this.subsFeedVisit?.unsubscribe();
    this.subsGetApiKey?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsCreateApiKey?.unsubscribe();
    this.subsEditApiKey?.unsubscribe();
    this.subsRevokeApiKey?.unsubscribe();
    this.subsGroupGet?.unsubscribe();
    this.subsUpdateSubDomain?.unsubscribe();
    this.subsGetSubDomain?.unsubscribe();
  }

  getUserFeedComment(): void {
    this.bs.busy();
    this.subsFeedKomentar = this.us.getUserFeedComment(this.as.currentUserSubject?.value?.username, '', 1, 5).subscribe({
      next: res => {
        this.gs.log('[USER_FEED_COMMENT_SUCCESS]', res);
        this.totalKomentar = res.count;
        this.feedKomentarData = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_FEED_COMMENT_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getUserFeedLikeDislike(): void {
    this.bs.busy();
    this.subsFeedLikeDislike = this.us.getUserFeedLikeDislike(this.as.currentUserSubject?.value?.username, '', 1, 5).subscribe({
      next: res => {
        this.gs.log('[USER_FEED_LIKEDISLIKE_SUCCESS]', res);
        this.totalLikeDislike = res.count;
        this.feedLikeDislikeData = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_FEED_LIKEDISLIKE_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getUserFeedVisit(): void {
    this.bs.busy();
    this.subsFeedVisit = this.us.getUserFeedVisit(this.as.currentUserSubject?.value?.username, '', 1, 5).subscribe({
      next: res => {
        this.gs.log('[USER_FEED_VISIT_SUCCESS]', res);
        this.totalKunjungan = res.count;
        this.feedVisitData = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_FEED_VISIT_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getUserApiKey(): void {
    this.bs.busy();
    this.subsGetApiKey = this.aks.getUserApiKey(this.as.currentUserSubject?.value?.username).subscribe({
      next: res => {
        this.gs.log('[USER_FEED_VISIT_SUCCESS]', res);
        this.apiKey = res.results[this.as.currentUserSubject?.value?.username];
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_FEED_VISIT_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  copyApiKey(ak: any): void {
    if (this.clipboard.copy(ak.api_key)) {
      this.snackBar.open(`API Key :: Telah Di Salin Pada Clipboard`, 'OK');
    }
  }

  generateNewApiKey(): void {
    this.subsDialog = this.ds.openInputDialog({
      data: {
        title: 'Tambah API Key Baru',
        input: {
          name: {
            inputLabel: 'Nama / Deskripsi',
            inputPlaceholder: `${this.as.currentUserSubject?.value?.username}_${Date.now()}`,
            inputValue: null,
            inputRequired: true
          },
          ip_domain: {
            inputLabel: 'Origin Tanpa http://',
            inputPlaceholder: 'example.com; 1.1.1.1; *',
            inputValue: null,
            inputRequired: true
          }
        },
        confirmText: 'OK',
        cancelText: 'Batal',
        infoText: 'Gunakan * Saja Untuk Perbolehkan Semua Dan Titik Koma ; Untuk Lebih Dari Satu'
      }
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INPUT_DIALOG_CLOSED]', re);
        if (re) {
          this.bs.busy();
          this.subsCreateApiKey = this.aks.createApiKey({
            name: re.name,
            ip_domain: re.ip_domain
          }).subscribe({
            next: res => {
              this.gs.log('[USER_CREATE_APIKEY_SUCCESS]', res);
              this.bs.idle();
              this.getUserApiKey();
            },
            error: err => {
              this.gs.log('[USER_CREATE_APIKEY_ERROR]', err, 'error');
              this.bs.idle();
              this.getUserApiKey();
            }
          });
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  editApiKey(ak: any): void {
    this.subsDialog = this.ds.openInputDialog({
      data: {
        title: 'Ubah API Key',
        input: {
          name: {
            inputLabel: 'Nama / Deskripsi',
            inputPlaceholder: ak.name,
            inputValue: ak.name,
            inputRequired: true
          },
          ip_domain: {
            inputLabel: 'Origin Tanpa http://',
            inputPlaceholder: ak.ip_domain,
            inputValue: ak.ip_domain,
            inputRequired: true
          }
        },
        confirmText: 'OK',
        cancelText: 'Batal',
        infoText: 'Gunakan * Saja Untuk Perbolehkan Semua Dan Titik Koma ; Untuk Lebih Dari Satu'
      }
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INPUT_DIALOG_CLOSED]', re);
        if (re) {
          this.bs.busy();
          this.subsEditApiKey = this.aks.editApiKey(ak.id, {
            name: re.name,
            ip_domain: re.ip_domain
          }).subscribe({
            next: res => {
              this.gs.log('[USER_EDIT_APIKEY_SUCCESS]', res);
              this.bs.idle();
              this.getUserApiKey();
            },
            error: err => {
              this.gs.log('[USER_EDIT_APIKEY_ERROR]', err, 'error');
              this.bs.idle();
              this.getUserApiKey();
            }
          });
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  async revokeApiKey(ak: any): Promise<void> {
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `Hapus API Key -- '${ak.api_key}'`,
      `Apakah Yakin Akan Menghapus ${ak.ip_domain} ?`,
      false
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsRevokeApiKey = this.aks.revokeApiKey(ak.id).subscribe({
            next: res => {
              this.gs.log('[USER_REVOKE_APIKEY_SUCCESS]', res);
              this.bs.idle();
              this.getUserApiKey();
            },
            error: err => {
              this.gs.log('[USER_REVOKE_APIKEY_ERROR]', err, 'error');
              this.bs.idle();
              this.getUserApiKey();
            }
          });
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

  getUserGroup(): void {
    this.bs.busy();
    this.subsGroupGet = this.us.getUserGroup(this.as.currentUserSubject?.value?.username).subscribe({
      next: res => {
        this.gs.log('[USER_GROUP_LIST_SUCCESS]', res);
        this.groupFansub = res.results.filter(gf => gf.fansub_.dns_id);
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_GROUP_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  editSubDomain(f: any): void {
    this.bs.busy();
    this.subsGetSubDomain = this.fansub.getSubDomain(f.slug).subscribe({
      next: res => {
        this.gs.log('[USER_FANSUB_SUBDOMAIN_SUCCESS]', res);
        this.bs.idle();
        const subDomain = res.result;
        this.subsDialog = this.ds.openInputDialog({
          data: {
            title: `Ubah CNAME / A Record IP v4 v6 :: '${f.slug}'`,
            input: {
              server_target: {
                inputLabel: 'Server Target Domain IP Publik',
                inputPlaceholder: `127.0.0.1 | ghs.google.com | blablabla.id.repl.co`,
                inputValue: subDomain.dns_id.content,
                inputRequired: true
              },
              verification_name: {
                inputLabel: 'Tambahan Khusus Blogger / Replit',
                inputPlaceholder: `blablabla-name | slug-fs`,
                inputValue: subDomain.dns_id_alt?.name,
                inputRequired: false
              },
              verification_target: {
                inputLabel: 'Tambahan Khusus Blogger / Replit',
                inputPlaceholder: `blablabla-target.dv.googlehosted.com | replit-verify=blablabla`,
                inputValue: subDomain.dns_id_alt?.content,
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
              this.subsUpdateSubDomain = this.fansub.updateSubDomain(f.slug, {
                server_target: re.server_target,
                verification_name: re.verification_name,
                verification_target: re.verification_target
              }).subscribe({
                next: r => {
                  this.gs.log('[FANSUB_UPDATE_SUBDOMAIN_SUCCESS]', r);
                  this.bs.idle();
                  this.getUserGroup();
                },
                error: e => {
                  this.gs.log('[FANSUB_UPDATE_SUBDOMAIN_ERROR]', e, 'error');
                  this.bs.idle();
                  this.getUserGroup();
                }
              });
            }
            this.subsDialog.unsubscribe();
          }
        });
      },
      error: err => {
        this.gs.log('[USER_FANSUB_SUBDOMAIN_ERROR]', err, 'error');
        this.bs.idle();
        this.subsDialog = this.ds.openInfoDialog({
          data: {
            title: `Sepertinya Sub-Domain '${f.slug}' Belum Di Klaim`,
            htmlMessage: 'Silahkan ambil sub-domain pada halaman fansub, ingin ke sana sekarang?',
            confirmText: 'Ya',
            cancelText: 'Tidak'
          },
          disableClose: false
        }).afterClosed().subscribe({
          next: re => {
            this.gs.log('[INFO_DIALOG_CLOSED]', re);
            if (re === true) {
              this.router.navigateByUrl(`/fansub/${f.slug}`);
            } else {
              this.getUserGroup();
            }
            this.subsDialog.unsubscribe();
          }
        });
      }
    });
  }

  openComment(k): void {
    this.router.navigate([k.path], {
      queryParams: {
        comment: k.id
      }
    });
  }

  openApiDocs(): void {
    this.wb.winboxOpenUri(`${environment.baseUrl}/api`, '_self', true);
  }

  async revokeDns(f: any): Promise<void> {
    this.subsDialog = (await this.ds.openKonfirmasiDialog(
      `Hapus Sub-Domain -- '${f.slug}'`,
      'Apakah Yakin Ingin Menghapus / Nonaktifkan Sub-Domain ?',
      false
    )).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.bs.busy();
          this.subsRevokeApiKey = this.fansub.revokeDomain(f.slug).subscribe({
            next: res => {
              this.gs.log('[USER_REVOKE_DNS_SUCCESS]', res);
              this.bs.idle();
            },
            error: err => {
              this.gs.log('[USER_REVOKE_DNS_ERROR]', err, 'error');
              this.bs.idle();
            }
          });
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

}
