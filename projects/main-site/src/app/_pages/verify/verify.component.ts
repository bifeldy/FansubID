import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/app/environment';

import { SosMedModel } from '../../../models/req-res.model';

import { AuthService } from '../../_shared/services/auth.service';
import { GlobalService } from '../../_shared/services/global.service';
import { UserService } from '../../_shared/services/user.service';
import { BusyService } from '../../_shared/services/busy.service';
import { DialogService } from '../../_shared/services/dialog.service';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit, OnDestroy {

  returnUrl = '/';
  verifyImg = '/assets/img/verify.png';

  subsSosmed = null;
  subsDialog = null;

  constructor(
    private router: Router,
    private us: UserService,
    private bs: BusyService,
    private ds: DialogService,
    private gs: GlobalService,
    private activatedRoute: ActivatedRoute,
    private as: AuthService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get ENV(): any {
    return environment;
  }

  ngOnDestroy(): void {
    this.subsSosmed?.unsubscribe();
    this.subsDialog?.unsubscribe();
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    if (this.returnUrl.includes('/login')) {
      this.returnUrl = '/';
    }
    if (this.gs.isBrowser) {
      const app = this.activatedRoute.snapshot.queryParamMap.get('app' || '');
      const code = this.activatedRoute.snapshot.queryParamMap.get('code') || '';
      if (this.as.currentUserSubject?.value?.verified) {
        this.router.navigateByUrl(this.returnUrl);
      }
      if (app && code) {
        const sosmed = SosMedModel[app.toUpperCase()];
        this.sosmedVerify(sosmed, code);
      }
    }
  }

  sosmedVerify(sosmedApp: SosMedModel, oAuthCode: string): void {
    this.bs.busy();
    this.subsSosmed = this.us.sosmedLogin({
      app: sosmedApp,
      code: oAuthCode
    }).subscribe({
      next: res => {
        this.gs.log('[SOSMED]', res);
        this.bs.idle();
        this.sosmedVerifyResult(res);
      },
      error: err => {
        this.gs.log('[SOSMED]', err, 'error');
        this.bs.idle();
        this.sosmedVerifyResult(err);
      }
    });
  }

  sosmedVerifyResult(res: any): void {
    this.subsDialog = this.ds.openInfoDialog({
      data: {
        title: res.result?.title || 'Whoops, Terjadi Kesalahan!',
        htmlMessage: res.result.message,
        confirmText: 'Selesai',
        cancelText: 'Ulangi'
      }
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);
        if (re === true) {
          this.as.logout('/login', {
            queryParams: {
              returnUrl: this.returnUrl
            }
          });
        }
        this.subsDialog.unsubscribe();
      }
    });
  }

}
