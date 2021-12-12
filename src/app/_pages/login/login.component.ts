import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

  fg: FormGroup;
  submitted = false;

  returnUrl = '/';
  loginImg = '/assets/img/loginregister.png';
  loginInfo = 'Silahkan login terlebih dahulu~';

  subsUser = null;
  subsLogin = null;
  subsVerify = null;

  constructor(
    private fb: FormBuilder,
    public gs: GlobalService,
    private route: ActivatedRoute,
    private router: Router,
    private bs: BusyService,
    public as: AuthService,
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
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
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
        password: this.cs.hashPassword(this.fg.value.password),
        rememberMe: this.fg.value.rememberMe
      }).subscribe({
        next: (res: any) => {
          this.bs.idle();
          this.loginInfo = res.info;
          this.bs.busy();
          this.subsVerify = this.as.verify(res.result.jwtToken).subscribe({
            next: success => {
              this.loginInfo = success.info;
              this.gs.log('[VERIFY_LOGIN_SUCCESS]', success);
              this.bs.idle();
              this.router.navigateByUrl(this.returnUrl);
            },
            error: error => {
              this.gs.log('[VERIFY_LOGIN_ERROR]', error);
              this.bs.idle();
              this.as.removeUser();
            }
          });
        },
        error: err => {
          this.gs.log('[LOGIN_FORM_ERROR]', err);
          this.loginInfo = err.error.result.message || err.error.info;
          this.submitted = false;
          this.bs.idle();
        }
      });
    }
  }

}
