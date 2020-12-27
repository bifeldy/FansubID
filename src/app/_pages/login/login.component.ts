import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import CryptoJS from 'crypto-js';

import { environment } from '../../../environments/client/environment';

import { GlobalService } from '../../_shared/services/global.service';
import { AuthService } from '../../_shared/services/auth.service';
import { BusyService } from '../../_shared/services/busy.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  fg: FormGroup;
  submitted = false;

  returnUrl = '/';
  loginImg = '/assets/img/loginregister.png';
  bgLoginImg = '/assets/img/bg-loginregister.svg';
  loginInfo = 'Silahkan login terlebih dahulu~';

  subsLogin = null;
  subsVerify = null;

  constructor(
    private fb: FormBuilder,
    public gs: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private bs: BusyService,
    public as: AuthService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnDestroy(): void {
    if (this.subsLogin) {
      this.subsLogin.unsubscribe();
    }
    if (this.subsVerify) {
      this.subsVerify.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    if (this.gs.isBrowser) {
      if (this.as.currentUserValue) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.initForm();
      }
    }
  }

  get loginFormVal(): any {
    return this.fg.controls;
  }

  initForm(): void {
    this.fg = this.fb.group({
      userNameOrEmail: [null, [Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)]],
      password: [null, [Validators.required, Validators.pattern(this.gs.allKeyboardKeysRegex)]],
      rememberMe: [false, []]
    });
  }

  onClickedSubmit(): void {
    this.bs.busy();
    this.submitted = true;
    this.loginInfo = 'Harap Menunggu ...';
    this.gs.log('[LOGIN_FORM_REQUEST]', this.fg.value);
    if (this.fg.invalid) {
      this.loginInfo = 'Periksa Dan Isi Kembali Data Anda!';
      this.submitted = false;
      this.bs.idle();
      return;
    }
    if (this.fg.valid) {
      this.submitted = true;
      this.subsLogin = this.as.login({
        userNameOrEmail: this.fg.value.userNameOrEmail,
        password: CryptoJS.SHA512(this.fg.value.password).toString(),
        rememberMe: this.fg.value.rememberMe
      }).subscribe(
        (res: any) => {
          this.bs.idle();
          this.loginInfo = res.info;
          this.bs.busy();
          this.subsVerify = this.as.verify(localStorage.getItem(environment.tokenName)).subscribe(
            success => {
              this.loginInfo = success.info;
              this.gs.log('[VERIFY_LOGIN_SUCCESS]', success);
              this.bs.idle();
              this.router.navigateByUrl(this.returnUrl);
            },
            error => {
              this.gs.log('[VERIFY_LOGIN_ERROR]', error);
              this.bs.idle();
              this.as.removeUser();
            }
          );
        },
        err => {
          this.gs.log('[LOGIN_FORM_ERROR]', err);
          this.loginInfo = err.error.result.message || err.error.info;
          this.submitted = false;
          this.bs.idle();
        }
      );
    }
  }

}
