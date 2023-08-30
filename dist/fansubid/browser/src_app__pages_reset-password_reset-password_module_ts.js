"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_reset-password_reset-password_module_ts"],{

/***/ 75695:
/*!*******************************************************************!*\
  !*** ./src/app/_pages/reset-password/reset-password.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResetPasswordComponent": () => (/* binding */ ResetPasswordComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 50635);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/layout */ 39910);
/* harmony import */ var _shared_services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/services/user.service */ 8058);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_crypto_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/services/crypto.service */ 38379);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/stepper */ 7650);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng-recaptcha */ 53109);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/icon */ 65590);



















const _c0 = ["stepper"];

function ResetPasswordComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0, "Cari & Cek Akun");
  }
}

function ResetPasswordComponent_form_18_strong_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Username / Email Tidak Boleh Kosong! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function ResetPasswordComponent_form_18_strong_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Username / Email Hanya Boleh Huruf Standar Papan Ketik ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function ResetPasswordComponent_form_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "form", 16)(1, "div", 17)(2, "label", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Surel / Nama Pengguna");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, ResetPasswordComponent_form_18_strong_7_Template, 3, 0, "strong", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, ResetPasswordComponent_form_18_strong_8_Template, 3, 0, "strong", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 23)(10, "div", 24)(11, "re-captcha", 25, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("resolved", function ResetPasswordComponent_form_18_Template_re_captcha_resolved_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9);

      const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](12);

      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return ctx_r8.captcha($event, _r7);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 23)(14, "div", 27)(15, "div", 28)(16, "div", 29)(17, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ResetPasswordComponent_form_18_Template_button_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return ctx_r10.findAccount();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18, " Cari Akun ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20, "search");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()();
  }

  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx_r2.fg1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassMapInterpolate1"]("text-bifeldy form-control ", !ctx_r2.fg1.get("userNameOrEmail").valid && ctx_r2.fg1.get("userNameOrEmail").touched ? "is-invalid" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.fg1.get("userNameOrEmail").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.fg1.get("userNameOrEmail").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("siteKey", ctx_r2.G_CAPTCHA_SITE_KEY);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r2.submitted || ctx_r2.fg1.invalid);
  }
}

function ResetPasswordComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](0, "Ubah Kata Sandi");
  }
}

function ResetPasswordComponent_form_21_strong_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Token Tidak Boleh Kosong ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function ResetPasswordComponent_form_21_strong_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Token Hanya Boleh Huruf Standar Papan Ketik ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function ResetPasswordComponent_form_21_strong_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Password Tidak Boleh Kosong ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function ResetPasswordComponent_form_21_strong_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Password Minimal 8 Huruf ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function ResetPasswordComponent_form_21_strong_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Password Hanya Boleh Huruf Standar Papan Ketik ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function ResetPasswordComponent_form_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "form", 16)(1, "div", 17)(2, "label", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Token");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 19)(5, "textarea", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "                        ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, ResetPasswordComponent_form_21_strong_8_Template, 3, 0, "strong", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, ResetPasswordComponent_form_21_strong_9_Template, 3, 0, "strong", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "div", 17)(11, "label", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "Password Baru");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](14, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](16, ResetPasswordComponent_form_21_strong_16_Template, 3, 0, "strong", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, ResetPasswordComponent_form_21_strong_17_Template, 3, 0, "strong", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](18, ResetPasswordComponent_form_21_strong_18_Template, 3, 0, "strong", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "div", 23)(20, "div", 27)(21, "div", 28)(22, "div", 29)(23, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function ResetPasswordComponent_form_21_Template_button_click_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return ctx_r16.resetAccount();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](24, " Atur Ulang Akun ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](26, "check_circle_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()();
  }

  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx_r4.fg2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassMapInterpolate1"]("text-bifeldy form-control ", !ctx_r4.fg2.get("token").valid && ctx_r4.fg2.get("token").touched ? "is-invalid" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r4.fg2.get("token").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r4.fg2.get("token").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassMapInterpolate1"]("text-bifeldy form-control ", !ctx_r4.fg2.get("password").valid && ctx_r4.fg2.get("password").touched ? "is-invalid" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r4.fg2.get("password").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r4.fg2.get("password").hasError("minlength"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r4.fg2.get("password").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r4.submitted || ctx_r4.fg2.invalid);
  }
}

class ResetPasswordComponent {
  constructor(activatedRoute, breakpointObserver, fb, router, us, bs, ds, gs, as, cs) {
    this.activatedRoute = activatedRoute;
    this.breakpointObserver = breakpointObserver;
    this.fb = fb;
    this.router = router;
    this.us = us;
    this.bs = bs;
    this.ds = ds;
    this.gs = gs;
    this.as = as;
    this.cs = cs;
    this.captchaRef = null;
    this.submitted = false;
    this.returnUrl = '/';
    this.resetInfo = '';
    this.subsFindLostAccount = null;
    this.subsResetLostAccount = null;
    this.subsVerify = null;
    this.subsDialog = null;
    this.subsUser = null;
    this.timedOut = null;
    this.stepperOrientation = this.breakpointObserver.observe('(min-width: 767px)').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.map)(({
      matches
    }) => matches ? 'horizontal' : 'vertical'));
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get ENV() {
    return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
  }

  ngOnDestroy() {
    var _a, _b, _c, _d, _e;

    (_a = this.subsFindLostAccount) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsResetLostAccount) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsVerify) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    (_d = this.subsDialog) === null || _d === void 0 ? void 0 : _d.unsubscribe();
    (_e = this.subsUser) === null || _e === void 0 ? void 0 : _e.unsubscribe();

    if (this.timedOut) {
      clearTimeout(this.timedOut);
      this.timedOut = null;
    }
  }

  ngAfterViewInit() {
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

  ngOnInit() {
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

  get G_CAPTCHA_SITE_KEY() {
    return _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.gCaptchaSiteKey;
  }

  initForm() {
    this.fg1 = this.fb.group({
      userNameOrEmail: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)]],
      'g-recaptcha-response': [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)]]
    });
    this.fg2 = this.fb.group({
      token: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)]],
      password: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)]]
    });
  }

  captcha(captchaResponse, captchaRef) {
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

  findAccount() {
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
        var _a;

        this.gs.log('[USER_FIND_LOST_ACCOUNT_ERROR]', err);
        this.bs.idle();
        this.submitted = false;
        this.resetInfo = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
        this.captchaRef.reset();
      }
    });
  }

  resetAccount() {
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
        var _a;

        this.gs.log('[USER_RESET_LOST_ACCOUNT_ERROR]', err, 'error');
        this.bs.idle();
        this.submitted = false;
        this.resetInfo = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
        this.stepper.reset();
      }
    });
  }

}

ResetPasswordComponent.ɵfac = function ResetPasswordComponent_Factory(t) {
  return new (t || ResetPasswordComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_12__.BreakpointObserver), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_6__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_crypto_service__WEBPACK_IMPORTED_MODULE_7__.CryptoService));
};

ResetPasswordComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: ResetPasswordComponent,
  selectors: [["app-reset-password"]],
  viewQuery: function ResetPasswordComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 7);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.stepper = _t.first);
    }
  },
  decls: 22,
  vars: 11,
  consts: [[1, "container-fluid", "align-items-center", "col-12", "col-sm-10", "col-md-9", "col-lg-7", "col-xl-6", "h-100"], [1, "row", "align-items-center", "h-100", "m-0"], [1, "col-12", "col-md-10", "m-auto", "py-3"], [1, "row", "rgb-border", "rounded", "bg-bifeldy"], [1, "col-12", "me-auto", "p-0"], [1, "card", "bg-transparent", "border-0"], [1, "card-body", "p-0"], [1, "text-center", "p-3"], [1, "mb-4", 2, "max-width", "192px", 3, "src"], [1, "h3", "mb-3", "font-weight-normal"], [1, "text-warning"], [2, "background-color", "transparent", 3, "orientation"], ["stepper", ""], [3, "stepControl", "editable"], ["matStepLabel", ""], ["class", "m-2", 3, "formGroup", 4, "ngIf"], [1, "m-2", 3, "formGroup"], [1, "form-group", "row", "py-2"], ["for", "userNameOrEmail", 1, "col-md-4", "col-form-label", "text-md-end"], [1, "col-md-8"], ["type", "text", "id", "userNameOrEmail", "placeholder", "Username / E-Mail", "required", "", "formControlName", "userNameOrEmail", "autocomplete", "email, username"], ["role", "alert", 1, "invalid-feedback"], [4, "ngIf"], [1, "form-group", "row", "mb-0", "py-2"], [1, "col", "offset-md-4"], ["formControlName", "g-recaptcha-response", 3, "siteKey", "resolved"], ["captchaRef", ""], [1, "col-md-8", "offset-md-4"], [1, "row"], [1, "col-12"], ["type", "button", "mat-flat-button", "", "color", "primary", 1, "w-100", 3, "disabled", "click"], [1, "ms-1"], ["for", "token", 1, "col-md-4", "col-form-label", "text-md-end"], ["rows", "3", "type", "text", "id", "token", "placeholder", "Token", "required", "", "formControlName", "token", "autocomplete", "token"], ["for", "password", 1, "col-md-4", "col-form-label", "text-md-end"], ["type", "password", "id", "password", "placeholder", "Password Minimal 8 Huruf", "required", "", "formControlName", "password", "autocomplete", "password"]],
  template: function ResetPasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "img", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "h1", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "Hikz, Akun Kamu Kenapa (?)");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "p", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "mat-vertical-stepper", 11, 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](15, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "mat-step", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, ResetPasswordComponent_ng_template_17_Template, 1, 0, "ng-template", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](18, ResetPasswordComponent_form_18_Template, 21, 8, "form", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "mat-step", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](20, ResetPasswordComponent_ng_template_20_Template, 1, 0, "ng-template", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](21, ResetPasswordComponent_form_21_Template, 27, 13, "form", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate1"]("src", "", ctx.ENV.baseUrl, "/assets/img/logo/reset-password.png", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx.resetInfo);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("orientation", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](15, 9, ctx.stepperOrientation));
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("stepControl", ctx.fg1)("editable", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.fg1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("stepControl", ctx.fg2)("editable", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.fg2);
    }
  },
  directives: [_angular_material_stepper__WEBPACK_IMPORTED_MODULE_13__.MatStepper, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_13__.MatStep, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_13__.MatStepLabel, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormControlName, ng_recaptcha__WEBPACK_IMPORTED_MODULE_15__.RecaptchaComponent, ng_recaptcha__WEBPACK_IMPORTED_MODULE_15__.RecaptchaValueAccessorDirective, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__.MatIcon],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.AsyncPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZXNldC1wYXNzd29yZC5jb21wb25lbnQuY3NzIn0= */"]
});

/***/ }),

/***/ 2420:
/*!****************************************************************!*\
  !*** ./src/app/_pages/reset-password/reset-password.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResetPasswordModule": () => (/* binding */ ResetPasswordModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-recaptcha */ 53109);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _reset_password_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reset-password.component */ 75695);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);








const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _reset_password_component__WEBPACK_IMPORTED_MODULE_1__.ResetPasswordComponent
    }
];
class ResetPasswordModule {
}
ResetPasswordModule.ɵfac = function ResetPasswordModule_Factory(t) { return new (t || ResetPasswordModule)(); };
ResetPasswordModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ResetPasswordModule });
ResetPasswordModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes),
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
            ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaModule,
            ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaFormsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ResetPasswordModule, { declarations: [_reset_password_component__WEBPACK_IMPORTED_MODULE_1__.ResetPasswordComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
        _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
        ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaModule,
        ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaFormsModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app__pages_reset-password_reset-password_module_ts.js.map