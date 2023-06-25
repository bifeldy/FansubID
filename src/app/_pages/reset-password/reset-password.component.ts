import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/app/environment';

import { CONSTANTS } from '../../../constants';

import { AuthService } from '../../_shared/services/auth.service';
import { BusyService } from '../../_shared/services/busy.service';
import { DialogService } from '../../_shared/services/dialog.service';
import { GlobalService } from '../../_shared/services/global.service';
import { UserService } from '../../_shared/services/user.service';
import { CryptoService } from '../../_shared/services/crypto.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('stepper', { static: true }) stepper: MatStepper;

  stepperOrientation: Observable<StepperOrientation>;

  fg1: FormGroup;
  fg2: FormGroup;

  captchaRef = null;
  submitted = false;

  returnUrl = '/';
  resetInfo = '';

  subsFindLostAccount = null;
  subsResetLostAccount = null;
  subsVerify = null;
  subsDialog = null;
  subsUser = null;
  timedOut = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private router: Router,
    private us: UserService,
    private bs: BusyService,
    private ds: DialogService,
    private gs: GlobalService,
    private as: AuthService,
    private cs: CryptoService
  ) {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 767px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get ENV(): any {
    return environment;
  }

  ngOnDestroy(): void {
    this.subsFindLostAccount?.unsubscribe();
    this.subsResetLostAccount?.unsubscribe();
    this.subsVerify?.unsubscribe();
    this.subsDialog?.unsubscribe();
    this.subsUser?.unsubscribe();
    if (this.timedOut) {
      clearTimeout(this.timedOut);
      this.timedOut = null;
    }
  }

  ngAfterViewInit(): void {
    if (!this.timedOut) {
      this.timedOut = setTimeout(() => {
        const token = this.activatedRoute.snapshot.queryParamMap.get('token') || '';
        if (token && this.fg2 && this.stepper) {
          this.fg2.controls['token'].patchValue(token);
          this.stepper.next();
        }
      }, 0);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    if (this.gs.isBrowser) {
      this.initForm();
      this.subsUser = this.as.currentUser.subscribe({
        next: user => {
          if (user) {
            this.router.navigateByUrl(this.returnUrl);
          }
        }
      });
    }
  }

  get G_CAPTCHA_SITE_KEY(): string {
    return CONSTANTS.gCaptchaSiteKey;
  }

  initForm(): void {
    this.fg1 = this.fb.group({
      userNameOrEmail: [null, [Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      'g-recaptcha-response': [null, [Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]]
    });
    this.fg2 = this.fb.group({
      token: [null, [Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]]
    });
  }

  captcha(captchaResponse, captchaRef): void {
    this.gs.log(`[GOOGLE_CAPTCHA] ${captchaResponse}`);
    if (captchaResponse) {
      this.captchaRef = captchaRef;
      this.fg1.controls['g-recaptcha-response'].patchValue(captchaResponse);
    } else {
      if (this.fg1.value['g-recaptcha-response']) {
        this.fg1.controls['g-recaptcha-response'].patchValue(null);
      }
    }
  }

  findAccount(): void {
    this.bs.busy();
    this.submitted = true;
    this.subsFindLostAccount = this.us.findLostAccount({
      userNameOrEmail: this.fg1.value.userNameOrEmail,
      'g-recaptcha-response': this.fg1.value['g-recaptcha-response']
    }).subscribe({
      next: res => {
        this.gs.log('[USER_FIND_LOST_ACCOUNT_SUCCESS]', res);
        this.bs.idle();
        this.submitted = false;
        this.subsDialog = this.ds.openInfoDialog({
          data: {
            title: res.result.title,
            htmlMessage: res.result.message,
            confirmText: 'Tutup'
          }
        }).afterClosed().subscribe({
          next: re => {
            this.gs.log('[INFO_DIALOG_CLOSED]', re);
            this.subsDialog.unsubscribe();
          }
        });
        this.stepper.next();
        this.captchaRef.reset();
      },
      error: err => {
        this.gs.log('[USER_FIND_LOST_ACCOUNT_ERROR]', err);
        this.bs.idle();
        this.submitted = false;
        this.resetInfo = err.result?.message || err.info;
        this.captchaRef.reset();
      }
    });
  }

  resetAccount(): void {
    this.bs.busy();
    this.submitted = true;
    this.subsResetLostAccount = this.us.resetLostAccount({
      token: this.fg2.value.token,
      password: this.cs.hashPassword(this.fg2.value.password)
    }).subscribe({
      next: res => {
        this.gs.log('[USER_RESET_LOST_ACCOUNT_SUCCESS]', res);
        this.bs.idle();
        this.submitted = false;
        this.as.removeUser();
        this.bs.busy();
        this.subsVerify = this.as.verify(res.result.token).subscribe({
          next: success => {
            this.gs.log('[VERIFY_LOGIN_SUCCESS]', success);
            this.bs.idle();
            this.router.navigateByUrl('/');
          },
          error: error => {
            this.gs.log('[VERIFY_LOGIN_ERROR]', error, 'error');
            this.bs.idle();
            this.as.removeUser();
            this.router.navigateByUrl('/');
          }
        });
      },
      error: err => {
        this.gs.log('[USER_RESET_LOST_ACCOUNT_ERROR]', err, 'error');
        this.bs.idle();
        this.submitted = false;
        this.resetInfo = err.result?.message || err.info;
        this.stepper.reset();
      }
    });
  }

}
