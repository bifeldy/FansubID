import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/app/environment';

import { CONSTANTS } from '../../../constants';

import { GlobalService } from '../../_shared/services/global.service';
import { AuthService } from '../../_shared/services/auth.service';
import { BusyService } from '../../_shared/services/busy.service';
import { CryptoService } from '../../_shared/services/crypto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  fg: UntypedFormGroup;
  submitted = false;

  returnUrl = '/';
  loginImg = '/assets/img/login-register.png';
  loginInfo = 'Silahkan login terlebih dahulu~';

  subsUser = null;
  subsLogin = null;
  subsVerify = null;

  constructor(
    private fb: UntypedFormBuilder,
    private gs: GlobalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bs: BusyService,
    private as: AuthService,
    private cs: CryptoService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    this.subsLogin?.unsubscribe();
    this.subsVerify?.unsubscribe();
    this.subsUser?.unsubscribe();
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || this.gs.previousUrl || '/';
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({
        next: user => {
          if (user) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.initForm();
          }
        }
      });
    }
  }

  get ENV(): any {
    return environment;
  }

  get loginFormVal(): any {
    return this.fg.controls;
  }

  get maxRememberMeDays(): number {
    return CONSTANTS.timeLoginRememberMe / 24 / 60 / 60;
  }

  initForm(): void {
    this.fg = this.fb.group({
      userNameOrEmail: [null, [Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      password: [null, [Validators.required, Validators.pattern(CONSTANTS.regexEnglishKeyboardKeys)]],
      rememberMe: [false, []]
    });
  }

  onClickedSubmit(): void {
    this.bs.busy();
    this.submitted = true;
    this.loginInfo = 'Harap Menunggu ...';
    this.gs.log('[LOGIN_FORM_REQUEST]', this.fg.value);
    if (this.fg.invalid) {
      this.loginInfo = 'Periksa Dan Isi Kembali Data!';
      this.submitted = false;
      this.bs.idle();
      return;
    }
    if (this.fg.valid) {
      this.submitted = true;
      this.subsLogin = this.as.login({
        userNameOrEmail: this.fg.value.userNameOrEmail,
        password: this.cs.hashPassword(this.fg.value.password),
        rememberMe: this.fg.value.rememberMe
      }).subscribe({
        next: (res: any) => {
          this.bs.idle();
          this.loginInfo = res.info;
          this.bs.busy();
          this.subsVerify = this.as.verify(res.result.token).subscribe({
            next: success => {
              this.loginInfo = success.info;
              this.gs.log('[VERIFY_LOGIN_SUCCESS]', success);
              this.bs.idle();
              this.router.navigateByUrl(this.returnUrl);
            },
            error: error => {
              this.gs.log('[VERIFY_LOGIN_ERROR]', error, 'error');
              this.bs.idle();
              this.as.removeUser();
            }
          });
        },
        error: err => {
          this.gs.log('[LOGIN_FORM_ERROR]', err, 'error');
          this.loginInfo = err.result?.message || err.info;
          this.submitted = false;
          this.bs.idle();
        }
      });
    }
  }

}
