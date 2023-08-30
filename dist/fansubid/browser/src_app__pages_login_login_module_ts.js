"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_login_login_module_ts"],{

/***/ 97955:
/*!*************************************************!*\
  !*** ./src/app/_pages/login/login.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginComponent": () => (/* binding */ LoginComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/services/global.service */ 80855);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_crypto_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/services/crypto.service */ 38379);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 65590);













function LoginComponent_div_0_form_8_strong_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Username / Email Tidak Boleh Kosong! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function LoginComponent_div_0_form_8_strong_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Username / Email Hanya Boleh Huruf Standar Papan Ketik ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function LoginComponent_div_0_form_8_strong_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Password Tidak Boleh Kosong! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function LoginComponent_div_0_form_8_strong_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Password Hanya Boleh Huruf Standar Papan Ketik ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function LoginComponent_div_0_form_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "form", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngSubmit", function LoginComponent_div_0_form_8_Template_form_ngSubmit_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r6.onClickedSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "h1", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Hai, Jumpa Lagi! >_<\"");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 15)(8, "label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Surel / Nama Pengguna");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](11, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, LoginComponent_div_0_form_8_strong_13_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, LoginComponent_div_0_form_8_strong_14_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "div", 15)(16, "label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17, "Kata Sandi");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](19, "input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](21, LoginComponent_div_0_form_8_strong_21_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](22, LoginComponent_div_0_form_8_strong_22_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "div", 15)(24, "div", 23)(25, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](26, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "label", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "div", 27)(30, "div", 28)(31, "div", 29)(32, "div", 30)(33, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](34, " Masuk ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](35, "mat-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](36, "vpn_key");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "div", 30)(38, "a", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](39, " Lupa Akun ~ ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx_r1.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate1"]("src", "", ctx_r1.ENV.baseUrl, "/assets/img/logo/login.png", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r1.loginInfo);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMapInterpolate1"]("text-bifeldy form-control ", !ctx_r1.fg.get("userNameOrEmail").valid && ctx_r1.fg.get("userNameOrEmail").touched ? "is-invalid" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("userNameOrEmail").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("userNameOrEmail").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMapInterpolate1"]("text-bifeldy form-control ", !ctx_r1.fg.get("password").valid && ctx_r1.fg.get("password").touched ? "is-invalid" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("password").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("password").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" Biarkan Saya Tetap Login Hingga ", ctx_r1.maxRememberMeDays, " Hari ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.submitted || ctx_r1.fg.invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.submitted);
} }
const _c0 = function (a2) { return { "background-position": "center", "background-size": "cover", "background-image": a2 }; };
function LoginComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 6)(6, "div", 7)(7, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, LoginComponent_div_0_form_8_Template, 40, 16, "form", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](2, _c0, "url(" + ctx_r0.loginImg + ")"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.fg);
} }
class LoginComponent {
    constructor(fb, gs, activatedRoute, router, bs, as, cs) {
        this.fb = fb;
        this.gs = gs;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.bs = bs;
        this.as = as;
        this.cs = cs;
        this.submitted = false;
        this.returnUrl = '/';
        this.loginImg = '/assets/img/login-register.png';
        this.loginInfo = 'Silahkan login terlebih dahulu~';
        this.subsUser = null;
        this.subsLogin = null;
        this.subsVerify = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    ngOnDestroy() {
        var _a, _b, _c;
        (_a = this.subsLogin) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsVerify) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsUser) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    }
    ngOnInit() {
        this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || this.gs.previousUrl || '/';
        if (this.gs.isBrowser) {
            this.subsUser = this.as.currentUser.subscribe({
                next: user => {
                    if (user) {
                        this.router.navigateByUrl(this.returnUrl);
                    }
                    else {
                        this.initForm();
                    }
                }
            });
        }
    }
    get ENV() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    get loginFormVal() {
        return this.fg.controls;
    }
    get maxRememberMeDays() {
        return _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.timeLoginRememberMe / 24 / 60 / 60;
    }
    initForm() {
        this.fg = this.fb.group({
            userNameOrEmail: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)]],
            password: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)]],
            rememberMe: [false, []]
        });
    }
    onClickedSubmit() {
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
                next: (res) => {
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
                    var _a;
                    this.gs.log('[LOGIN_FORM_ERROR]', err, 'error');
                    this.loginInfo = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
                    this.submitted = false;
                    this.bs.idle();
                }
            });
        }
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_crypto_service__WEBPACK_IMPORTED_MODULE_5__.CryptoService)); };
LoginComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 1, vars: 1, consts: [["class", "container-fluid align-items-center w-100 h-100", "style", "background-size: cover; background-repeat: repeat; background-position: center; transform: rotateY(180deg);", 4, "ngIf"], [1, "container-fluid", "align-items-center", "w-100", "h-100", 2, "background-size", "cover", "background-repeat", "repeat", "background-position", "center", "transform", "rotateY(180deg)"], [1, "row", "align-items-center", "h-100", "m-0", 2, "transform", "rotateY(180deg)"], [1, "col-12", "col-md-10", "m-auto", "py-3"], [1, "row", "rgb-border", "rounded", "bg-bifeldy"], [1, "col-lg-5", "col-md-3", "ms-auto", "p-0", 3, "ngStyle"], [1, "col-lg-7", "col-md-9", "me-auto", "p-0"], [1, "card", "bg-transparent", "border-0"], [1, "card-body"], ["class", "m-2", 3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "m-2", 3, "formGroup", "ngSubmit"], [1, "text-center", "mb-4"], [1, "mb-4", 2, "max-width", "128px", 3, "src"], [1, "h3", "mb-3", "font-weight-normal"], [1, "text-warning"], [1, "form-group", "row", "py-2"], ["for", "userNameOrEmail", 1, "col-md-4", "col-form-label", "text-md-end"], [1, "col-md-8"], ["type", "text", "id", "userNameOrEmail", "placeholder", "Username / E-Mail", "required", "", "formControlName", "userNameOrEmail", "autocomplete", "email, username"], ["role", "alert", 1, "invalid-feedback"], [4, "ngIf"], ["for", "password", 1, "col-md-4", "col-form-label", "text-md-end"], ["type", "password", "id", "password", "placeholder", "Password", "required", "", "formControlName", "password", "autocomplete", "current-password, new-password"], [1, "col", "offset-md-4"], [1, "form-check"], ["id", "rememberMe", "type", "checkbox", "formControlName", "rememberMe", 1, "form-check-input"], ["for", "rememberMe", 1, "form-check-label", 2, "padding-top", "0.125rem !important"], [1, "form-group", "row", "mb-0", "py-2"], [1, "col-md-8", "offset-md-4"], [1, "row", "gy-3"], [1, "col-lg-6", "col-12"], ["type", "submit", "mat-flat-button", "", "color", "primary", 1, "w-100", 3, "disabled"], [1, "ms-1"], ["mat-stroked-button", "", "color", "accent", "routerLink", "/reset-password", 1, "w-100", 3, "disabled"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, LoginComponent_div_0_Template, 9, 4, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.fg);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgStyle, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.CheckboxControlValueAccessor, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLinkWithHref], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 94541:
/*!**********************************************!*\
  !*** ./src/app/_pages/login/login.module.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginModule": () => (/* binding */ LoginModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.component */ 97955);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);







const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _login_component__WEBPACK_IMPORTED_MODULE_1__.LoginComponent
    }
];
class LoginModule {
}
LoginModule.ɵfac = function LoginModule_Factory(t) { return new (t || LoginModule)(); };
LoginModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: LoginModule });
LoginModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes),
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](LoginModule, { declarations: [_login_component__WEBPACK_IMPORTED_MODULE_1__.LoginComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app__pages_login_login_module_ts.js.map