import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../../../environments/app/environment';

import { GlobalService } from '../../../_shared/services/global.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { UserService } from '../../../_shared/services/user.service';
import { ApiKeyService } from '../../../_shared/services/api-key.service';
import { DialogService } from '../../../_shared/services/dialog.service';

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
  subsRevokeApiKey = null;

  apiKey = [];

  constructor(
    private snackBar: MatSnackBar,
    private as: AuthService,
    private ds: DialogService,
    private gs: GlobalService,
    private fs: FabService,
    private bs: BusyService,
    private us: UserService,
    private aks: ApiKeyService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get AS(): any {
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
    this.subsRevokeApiKey?.unsubscribe();
  }

  getUserFeedComment(): void {
    this.bs.busy();
    this.subsFeedKomentar = this.us.getUserFeedComment(this.as.currentUserSubject?.value?.username, '', 1, 5).subscribe({
      next: res => {
        this.gs.log('[USER_FEED_COMMENT_SUCCESS]', res);
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
    navigator?.clipboard?.writeText(ak.api_key).then(() => {
      this.snackBar.open(`API Key :: ${ak.api_key} :: Telah Di Salin Pada Clipboard`, 'Ok');
    });
  }

  generateNewApiKey(): void {
    const userInput = {
      name: {
        inputLabel: 'Nama',
        inputText: `${this.as.currentUserSubject?.value?.username}_${new Date().getTime()}`,
        inputRequired: true
      },
      ip_domain: {
        inputLabel: 'Origin',
        inputText: '*; example.com; 1.1.1.1',
        inputRequired: true
      }
    };
    this.subsDialog = this.ds.openInputDialog({
      data: {
        title: `Tambah API Key Baru`,
        input: userInput,
        confirmText: 'OK',
        cancelText: 'Batal',
        infoText: 'Origin Domain Huruf Kecil Tanpa http:// Gunakan Titik Koma ; Untuk Lebih Dari 1'
      },
      disableClose: true
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

  revokeApiKey(ak: any): void {
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

}
