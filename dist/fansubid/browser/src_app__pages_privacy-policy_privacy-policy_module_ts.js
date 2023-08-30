"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_privacy-policy_privacy-policy_module_ts"],{

/***/ 99371:
/*!*******************************************************************!*\
  !*** ./src/app/_pages/privacy-policy/privacy-policy.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivacyPolicyComponent": () => (/* binding */ PrivacyPolicyComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_information_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/services/information.service */ 67745);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _shared_pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/pipes/safe-inner-html.pipe */ 11861);







function PrivacyPolicyComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h4", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "safeInnerHtml");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Updated: ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](6, 2, ctx_r0.lastUpdated, "d MMMM y, hh:mm:ss a z"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 5, ctx_r0.htmlContent), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeHtml"]);
} }
class PrivacyPolicyComponent {
    constructor(bs, gs, info) {
        this.bs = bs;
        this.gs = gs;
        this.info = info;
        this.lastUpdated = new Date();
        this.htmlContent = `
    <div class="text-center p-5">
      <img src="${_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl}/assets/img/logo/privacy-policy.png" class="bifeldy-vh-25" />
    </div>
    <div class="text-start pb-5">
      <h2 class="text-primary">Privacy Policy</h2>
      <h3 class="text-success">
        Loading ...
      </h3>
    </div>
  `;
        this.subsPrivacyPolicy = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    ngOnInit() {
        this.bs.busy();
        this.subsPrivacyPolicy = this.info.getInfo('PRIVACY-POLICY').subscribe({
            next: res => {
                this.gs.log('[PRIVACY_POLICY_SUCCESS]', res);
                this.bs.idle();
                this.htmlContent = res.result.content;
                this.lastUpdated = new Date(res.result.updated_at);
            },
            error: err => {
                this.gs.log('[PRIVACY_POLICY_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subsPrivacyPolicy) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
PrivacyPolicyComponent.ɵfac = function PrivacyPolicyComponent_Factory(t) { return new (t || PrivacyPolicyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_services_information_service__WEBPACK_IMPORTED_MODULE_3__.InformationService)); };
PrivacyPolicyComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: PrivacyPolicyComponent, selectors: [["app-privacy-policy"]], decls: 1, vars: 1, consts: [["class", "container", 4, "ngIf"], [1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12", "align-items-center"], [1, "text-center", "my-3", "mx-auto"], [1, "text-start"], [1, "text-warning", 3, "innerHTML"]], template: function PrivacyPolicyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, PrivacyPolicyComponent_div_0_Template, 9, 7, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.htmlContent);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe, _shared_pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_4__.SafeInnerHtmlPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcml2YWN5LXBvbGljeS5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 18999:
/*!****************************************************************!*\
  !*** ./src/app/_pages/privacy-policy/privacy-policy.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivacyPolicyModule": () => (/* binding */ PrivacyPolicyModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/pipes/custom-pipe.module */ 67355);
/* harmony import */ var _privacy_policy_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./privacy-policy.component */ 99371);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);






const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _privacy_policy_component__WEBPACK_IMPORTED_MODULE_1__.PrivacyPolicyComponent
    }
];
class PrivacyPolicyModule {
}
PrivacyPolicyModule.ɵfac = function PrivacyPolicyModule_Factory(t) { return new (t || PrivacyPolicyModule)(); };
PrivacyPolicyModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: PrivacyPolicyModule });
PrivacyPolicyModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes),
            _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_0__.CustomPipeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](PrivacyPolicyModule, { declarations: [_privacy_policy_component__WEBPACK_IMPORTED_MODULE_1__.PrivacyPolicyComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_0__.CustomPipeModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app__pages_privacy-policy_privacy-policy_module_ts.js.map