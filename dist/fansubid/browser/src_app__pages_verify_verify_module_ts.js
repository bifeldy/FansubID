"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_verify_verify_module_ts"],{

/***/ 14359:
/*!***************************************************!*\
  !*** ./src/app/_pages/verify/verify.component.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VerifyComponent": () => (/* binding */ VerifyComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/req-res.model */ 14249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/services/user.service */ 8058);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/services/auth.service */ 4137);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 65590);












const _c0 = function (a2) { return { "background-position": "center", "background-size": "cover", "background-image": a2 }; };
class VerifyComponent {
    constructor(router, us, bs, ds, gs, activatedRoute, as) {
        this.router = router;
        this.us = us;
        this.bs = bs;
        this.ds = ds;
        this.gs = gs;
        this.activatedRoute = activatedRoute;
        this.as = as;
        this.returnUrl = '/';
        this.verifyImg = '/assets/img/verify.png';
        this.subsSosmed = null;
        this.subsDialog = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get ENV() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subsSosmed) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsDialog) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    ngOnInit() {
        var _a, _b;
        this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
        if (this.returnUrl.includes('/login')) {
            this.returnUrl = '/';
        }
        if (this.gs.isBrowser) {
            const app = this.activatedRoute.snapshot.queryParamMap.get('app' || 0);
            const code = this.activatedRoute.snapshot.queryParamMap.get('code') || '';
            if ((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.verified) {
                this.router.navigateByUrl(this.returnUrl);
            }
            if (app && code) {
                const sosmed = _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.SosMedModel[app.toUpperCase()];
                this.sosmedVerify(sosmed, code);
            }
        }
    }
    sosmedVerify(sosmedApp, oAuthCode) {
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
    sosmedVerifyResult(res) {
        var _a;
        this.subsDialog = this.ds.openInfoDialog({
            data: {
                title: ((_a = res.result) === null || _a === void 0 ? void 0 : _a.title) || 'Whoops, Terjadi Kesalahan!',
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
VerifyComponent.ɵfac = function VerifyComponent_Factory(t) { return new (t || VerifyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_6__.AuthService)); };
VerifyComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: VerifyComponent, selectors: [["app-verify"]], decls: 74, vars: 7, consts: [[1, "container-fluid", "align-items-center", "w-100", "h-100"], [1, "row", "align-items-center", "h-100", "m-0"], [1, "col-12", "col-md-10", "m-auto", "py-3"], [1, "row", "rgb-border", "rounded", "bg-bifeldy"], [1, "col-lg-5", "col-md-3", "ms-auto", "p-0", 3, "ngStyle"], [1, "col-lg-7", "col-md-9", "me-auto", "p-0"], [1, "card", "bg-transparent", "border-0"], [1, "card-body", "p-0"], [1, "text-center", "p-3"], [1, "mb-4", 2, "max-width", "128px", 3, "src"], [1, "h3", "mb-3", "font-weight-normal"], [1, "text-success"], ["target", "_blank", 1, "text-decoration-none", "text-warning", 3, "href"], ["mat-raised-button", "", "color", "primary", "target", "_self", 1, "m-1", 3, "href"], [1, "me-1"]], template: function VerifyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "h1", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11, "Yuhu~, Ayo Verifikasi! >_<\"");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "p", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](13, "Verifikasi akunmu dan dapatkan fitur menarik lainnya~");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "div", 8)(15, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](16, " === ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](18, "Connect With");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](19, " Discord (?) === ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](20, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](21, " Cukup dengan menghubungkan akun kamu. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](22, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](23, " Lalu kirimkan kode yang muncul disini ke ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "a", 12)(25, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](26, "Channel");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](27, " Khusus BOT ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](28, ". ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](29, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](30, " Status akunmu akan berubah menjadi terverifikasi. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](31, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](32, " Akun terverifikasi selama akses ke Discord tersambung. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](33, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](34, " Dimohon untuk tidak ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](35, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](36, "Revoke");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](37, " akses. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](38, "br")(39, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](40, " === ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](41, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](42, "Connect With");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](43, " Google (?) === ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](44, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](45, " Cukup dengan menghubungkan akun kamu. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](46, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](47, " Lalu buka tautan yang dikirimkan ke surelmu. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](48, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](49, " Status akunmu akan berubah menjadi terverifikasi. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](50, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](51, " Akun terverifikasi selama akses ke Google tersambung. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](52, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](53, " Dimohon untuk tidak ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](54, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](55, "Revoke");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](56, " akses. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](57, "br")(58, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](59, " .: Alasan pake ginian, biar gak ada BOT :. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](60, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](61, " ~ Sewaktu-waktu dapat hilang, harus verifikasi ulang ~ ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](62, "br")(63, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](64, " Terima kasih. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](65, "div", 8)(66, "a", 13)(67, "mat-icon", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](68, "link");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](69, " Discord ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](70, "a", 13)(71, "mat-icon", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](72, "link");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](73, " Google ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](5, _c0, "url(" + ctx.verifyImg + ")"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("src", "", ctx.ENV.baseUrl, "/assets/img/logo/verify.png", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("href", ctx.ENV.discord.join_url, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](42);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("href", "", ctx.ENV.baseUrl, "/api/discord-verifikasi", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("href", "", ctx.ENV.baseUrl, "/api/google-verifikasi", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"]);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgStyle, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatAnchor, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ2ZXJpZnkuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 92548:
/*!************************************************!*\
  !*** ./src/app/_pages/verify/verify.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VerifyModule": () => (/* binding */ VerifyModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-recaptcha */ 53109);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _verify_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./verify.component */ 14359);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);








const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _verify_component__WEBPACK_IMPORTED_MODULE_1__.VerifyComponent
    }
];
class VerifyModule {
}
VerifyModule.ɵfac = function VerifyModule_Factory(t) { return new (t || VerifyModule)(); };
VerifyModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: VerifyModule });
VerifyModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes),
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
            ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaModule,
            ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaFormsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](VerifyModule, { declarations: [_verify_component__WEBPACK_IMPORTED_MODULE_1__.VerifyComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
        _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
        ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaModule,
        ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaFormsModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app__pages_verify_verify_module_ts.js.map