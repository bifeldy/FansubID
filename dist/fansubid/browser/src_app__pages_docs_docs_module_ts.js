(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_docs_docs_module_ts"],{

/***/ 1213:
/*!***********************************************!*\
  !*** ./src/app/_pages/docs/docs.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocsComponent": () => (/* binding */ DocsComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/services/fansub.service */ 76781);
/* harmony import */ var _shared_services_information_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/services/information.service */ 67745);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var ngx_typed_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-typed-js */ 86771);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/card */ 11961);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/components/banner-donasi/banner-donasi.component */ 19530);
/* harmony import */ var _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/components/banner-discord/banner-discord.component */ 49933);
/* harmony import */ var _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/components/stats-server/stats-server.component */ 8921);
/* harmony import */ var _shared_pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_shared/pipes/safe-inner-html.pipe */ 11861);















function DocsComponent_div_43_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 33)(1, "mat-card", 34)(2, "mat-card-header", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "mat-card-title", 37)(5, "h3", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "mat-card-subtitle", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const c_r3 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate1"]("routerLink", "/fansub/", c_r3.fansub_ == null ? null : c_r3.fansub_.slug, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleProp"]("background-image", "url(" + ((c_r3.fansub_ == null ? null : c_r3.fansub_.image_url) || ctx_r2.ENV.baseUrl + "/assets/img/favicon.png") + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](c_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate2"]("", c_r3.type, " :: ", (c_r3.fansub_ == null ? null : c_r3.fansub_.active) ? "" : "Tidak", " Aktif");
} }
function DocsComponent_div_43_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 13)(1, "div", 26)(2, "h2", 27)(3, "b", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "Sub-Domain *.Fansub.ID Aktif");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "div", 12)(6, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, DocsComponent_div_43_div_7_Template, 9, 6, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "div", 13)(9, "div", 31)(10, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DocsComponent_div_43_Template_button_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r4.loadNextPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](11, " Load More ... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r0.dnsData);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", ctx_r0.pageFinished);
} }
function DocsComponent_div_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 13)(1, "div", 26)(2, "h2", 27)(3, "b", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "Tutorial Klaim *.Fansub.ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "safeInnerHtml");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](7, 1, ctx_r1.tutorialData), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeHtml"]);
} }
const _c0 = function () { return ["shiro", "aka", "midori", "kuro", "ao", "kiiro", "orenji", "pinku"]; };
class DocsComponent {
    constructor(gs, fansub, info) {
        this.gs = gs;
        this.fansub = fansub;
        this.info = info;
        this.dnsData = [];
        this.tutorialData = null;
        this.page = 1;
        this.pageFinished = false;
        this.subsDns = null;
        this.subsTutorial = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get ENV() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getDns();
            this.getTutorial();
        }
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subsDns) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsTutorial) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    getDns() {
        this.subsDns = this.fansub.getAllSubDomain('', this.page).subscribe({
            next: res => {
                this.gs.log('[DNSS_LIST_SUCCESS]', res);
                const records = [];
                for (const rec of res.results) {
                    if (rec.fansub_) {
                        records.push(rec);
                    }
                }
                this.dnsData = [...this.dnsData, ...records];
                if (res.results.length <= 0) {
                    this.pageFinished = true;
                }
            },
            error: err => {
                this.gs.log('[DNSS_LIST_ERROR]', err, 'error');
            }
        });
    }
    getTutorial() {
        this.subsTutorial = this.info.getInfo('TUTORIAL-SUB-DOMAIN').subscribe({
            next: res => {
                this.gs.log('[TUTORIAL_INFORMATION_SUCCESS]', res);
                this.tutorialData = res.result.content;
            },
            error: err => {
                this.gs.log('[TUTORIAL_INFORMATION_ERROR]', err, 'error');
            }
        });
    }
    loadNextPage() {
        if (!this.pageFinished) {
            this.page++;
            this.getDns();
        }
    }
}
DocsComponent.ɵfac = function DocsComponent_Factory(t) { return new (t || DocsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_2__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_information_service__WEBPACK_IMPORTED_MODULE_3__.InformationService)); };
DocsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: DocsComponent, selectors: [["app-docs"]], decls: 51, vars: 10, consts: [[1, "p-0", "m-0", 2, "background-image", "url('/assets/img/background/docs.png')", "background-size", "contain"], [1, "container-fluid", "p-0"], [1, "wrapper"], [1, "bg-bubbles", "align-items-center", "p-0"], [1, "wrapper-1"], [1, "row", "align-items-center", "h-100"], [1, "col-12", "mx-auto"], [1, "container", "text-dark"], [1, "mb-1", 2, "line-height", "normal"], [1, "mb-0"], [1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row"], [1, "col-12", "align-items-center", "mt-5", "mx-auto"], [1, "text-warning"], [1, "col-12", "align-items-center", "mx-auto"], [3, "strings", "shuffle", "loop", "smartBackspace", "backDelay"], [1, "text-light", "text-truncate"], [1, "arrow-right", "p-3"], [1, "typing"], [1, "col-12", "align-items-center", "mb-5", "mx-auto"], [1, "col-lg-8", "col-xl-9"], ["class", "row", 4, "ngIf"], [1, "col-lg-4", "col-xl-3"], [1, "row", "sticky-top"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "row", "px-3"], ["class", "col-12 col-md-6 col-xl-4 p-2", 4, "ngFor", "ngForOf"], [1, "col-12", "text-end", "py-3"], ["type", "button", "mat-button", "", "color", "accent", 1, "shiny", 3, "disabled", "click"], [1, "col-12", "col-md-6", "col-xl-4", "p-2"], [1, "gradient-border", "rgb-border"], [2, "cursor", "pointer", 3, "routerLink"], ["mat-card-avatar", "", 2, "background-size", "cover", "border-radius", "0"], [1, "text-warning", "mb-1", 2, "cursor", "pointer"], [1, "row", "px-3", "pb-3", 3, "innerHTML"]], template: function DocsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "ul", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "span", 4)(5, "li")(6, "li")(7, "li")(8, "li")(9, "li")(10, "li")(11, "li")(12, "li")(13, "li")(14, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "div", 5)(16, "div", 6)(17, "div", 7)(18, "h2", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](19, " Developers Documentation ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "p", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](21, " Hadiah Spesial & Khusus Untuk Kamu ... ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](22, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "div", 10)(24, "div", 11)(25, "div", 12)(26, "div", 13)(27, "div", 14)(28, "h1", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](29, "Dapatkan alamat URL khusus untuk website Fansub Kamu !!");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "div", 16)(31, "ngx-typed-js", 17)(32, "h1", 18)(33, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](34, " https:// ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](35, "span", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](36);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](37, "div", 21)(38, "h1", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](39);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](40, "div", 10)(41, "div", 11)(42, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](43, DocsComponent_div_43_Template, 12, 2, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](44, DocsComponent_div_44_Template, 8, 3, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](45, "div", 24)(46, "div", 25)(47, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](48, "app-banner-donasi")(49, "app-banner-discord")(50, "app-stats-server");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("strings", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction0"](9, _c0))("shuffle", true)("loop", true)("smartBackspace", true)("backDelay", 1000);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" .", ctx.ENV.domain, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("dan email (\uFF61>\uFE4F<\uFF61) @ ", ctx.ENV.domain, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.dnsData.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.tutorialData);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_4__.NotificationsComponent, ngx_typed_js__WEBPACK_IMPORTED_MODULE_10__.NgxTypedJsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardHeader, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterLink, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardAvatar, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_12__.MatCardSubtitle, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_5__.BannerDonasiComponent, _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_6__.BannerDiscordComponent, _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_7__.StatsServerComponent], pipes: [_shared_pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_8__.SafeInnerHtmlPipe], styles: [".wrapper[_ngcontent-%COMP%] {\r\n  \r\n  \r\n  \r\n  position: sticky;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 128px;\r\n  overflow: hidden;\r\n  background-image: url('/assets/img/banner/docs.png');\r\n  background-position: center 41%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  list-style: none;\r\n  display: block;\r\n  width: 40px;\r\n  height: 40px;\r\n  background-color: rgba(255, 255, 255, 0.15);\r\n  bottom: -160px;\r\n  animation: square 25s infinite;\r\n  transition-timing-function: linear;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(1) {\r\n  left: 10%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(2) {\r\n  left: 20%;\r\n  width: 80px;\r\n  height: 80px;\r\n  animation-delay: 2s;\r\n  animation-duration: 17s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(3) {\r\n  left: 25%;\r\n  animation-delay: 4s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(4) {\r\n  left: 40%;\r\n  width: 60px;\r\n  height: 60px;\r\n  animation-duration: 22s;\r\n  background-color: rgba(255, 255, 255, 0.25);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(5) {\r\n  left: 70%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(6) {\r\n  left: 80%;\r\n  width: 120px;\r\n  height: 120px;\r\n  animation-delay: 3s;\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(7) {\r\n  left: 32%;\r\n  width: 160px;\r\n  height: 160px;\r\n  animation-delay: 7s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(8) {\r\n  left: 55%;\r\n  width: 20px;\r\n  height: 20px;\r\n  animation-delay: 15s;\r\n  animation-duration: 40s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(9) {\r\n  left: 25%;\r\n  width: 10px;\r\n  height: 10px;\r\n  animation-delay: 2s;\r\n  animation-duration: 40s;\r\n  background-color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(10) {\r\n  left: 90%;\r\n  width: 160px;\r\n  height: 160px;\r\n  animation-delay: 11s;\r\n}\r\n\r\n@keyframes square {\r\n  0% {\r\n    transform: translateY(0);\r\n  }\r\n  100% {\r\n    transform: translateY(-512px) rotate(512deg);\r\n  }\r\n}\r\n\r\n.arrow-right[_ngcontent-%COMP%] {\r\n  width: 20%;\r\n  line-height: 50px;\r\n  position: relative;\r\n  background: red;\r\n  text-align: center;\r\n  margin: 50px auto;\r\n}\r\n\r\n.arrow-right[_ngcontent-%COMP%]:after, .arrow-right[_ngcontent-%COMP%]:before {\r\n  content: \"\";\r\n  position: absolute;\r\n  width: 20px;\r\n  height: 50%;\r\n  left: 100%;\r\n}\r\n\r\n.arrow-right[_ngcontent-%COMP%]:after {\r\n  bottom: 0;\r\n  background: linear-gradient(to right bottom, red 50%, transparent 50%);\r\n}\r\n\r\n.arrow-right[_ngcontent-%COMP%]:before {\r\n  top: 0;\r\n  background: linear-gradient(to right top, red 50%, transparent 50%);\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvY3MuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUF5QjtFQUN6QixzRUFBc0U7RUFDdEUsc0VBQXNFO0VBQ3RFLGdCQUFnQjtFQUNoQixPQUFPO0VBQ1AsV0FBVztFQUNYLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsb0RBQW9EO0VBQ3BELCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxXQUFXO0VBQ1gsWUFBWTtFQUNaLDJDQUEyQztFQUMzQyxjQUFjO0VBQ2QsOEJBQThCO0VBQzlCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFNBQVM7RUFDVCxXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztFQUNULFdBQVc7RUFDWCxZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFNBQVM7RUFDVCxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsV0FBVztFQUNYLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsU0FBUztFQUNULFdBQVc7RUFDWCxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsWUFBWTtFQUNaLGFBQWE7RUFDYixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRTtJQUNFLHdCQUF3QjtFQUMxQjtFQUNBO0lBQ0UsNENBQTRDO0VBQzlDO0FBQ0Y7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFdBQVc7RUFDWCxVQUFVO0FBQ1o7O0FBRUE7RUFDRSxTQUFTO0VBQ1Qsc0VBQXNFO0FBQ3hFOztBQUNBO0VBQ0UsTUFBTTtFQUNOLG1FQUFtRTtBQUNyRSIsImZpbGUiOiJkb2NzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud3JhcHBlciB7XHJcbiAgLyogYmFja2dyb3VuZDogIzFmYTI2MDsgKi9cclxuICAvKiBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjM2Y1MWI1IDAlLCAjMGQ2ZWZkIDEwMCUpOyAqL1xyXG4gIC8qIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICM2NzNhYjcgMCUsICNlZTBkZmQgMTAwJSk7ICovXHJcbiAgcG9zaXRpb246IHN0aWNreTtcclxuICBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTI4cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1nL2Jhbm5lci9kb2NzLnBuZycpO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciA0MSU7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XHJcbiAgYm90dG9tOiAtMTYwcHg7XHJcbiAgYW5pbWF0aW9uOiBzcXVhcmUgMjVzIGluZmluaXRlO1xyXG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCgxKSB7XHJcbiAgbGVmdDogMTAlO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoMikge1xyXG4gIGxlZnQ6IDIwJTtcclxuICB3aWR0aDogODBweDtcclxuICBoZWlnaHQ6IDgwcHg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAycztcclxuICBhbmltYXRpb24tZHVyYXRpb246IDE3cztcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDMpIHtcclxuICBsZWZ0OiAyNSU7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiA0cztcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDQpIHtcclxuICBsZWZ0OiA0MCU7XHJcbiAgd2lkdGg6IDYwcHg7XHJcbiAgaGVpZ2h0OiA2MHB4O1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMjJzO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSk7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCg1KSB7XHJcbiAgbGVmdDogNzAlO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoNikge1xyXG4gIGxlZnQ6IDgwJTtcclxuICB3aWR0aDogMTIwcHg7XHJcbiAgaGVpZ2h0OiAxMjBweDtcclxuICBhbmltYXRpb24tZGVsYXk6IDNzO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDcpIHtcclxuICBsZWZ0OiAzMiU7XHJcbiAgd2lkdGg6IDE2MHB4O1xyXG4gIGhlaWdodDogMTYwcHg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiA3cztcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDgpIHtcclxuICBsZWZ0OiA1NSU7XHJcbiAgd2lkdGg6IDIwcHg7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogMTVzO1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoOSkge1xyXG4gIGxlZnQ6IDI1JTtcclxuICB3aWR0aDogMTBweDtcclxuICBoZWlnaHQ6IDEwcHg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAycztcclxuICBhbmltYXRpb24tZHVyYXRpb246IDQwcztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyk7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCgxMCkge1xyXG4gIGxlZnQ6IDkwJTtcclxuICB3aWR0aDogMTYwcHg7XHJcbiAgaGVpZ2h0OiAxNjBweDtcclxuICBhbmltYXRpb24tZGVsYXk6IDExcztcclxufVxyXG5cclxuQGtleWZyYW1lcyBzcXVhcmUge1xyXG4gIDAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcclxuICB9XHJcbiAgMTAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUxMnB4KSByb3RhdGUoNTEyZGVnKTtcclxuICB9XHJcbn1cclxuXHJcbi5hcnJvdy1yaWdodCB7XHJcbiAgd2lkdGg6IDIwJTtcclxuICBsaW5lLWhlaWdodDogNTBweDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgYmFja2dyb3VuZDogcmVkO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW46IDUwcHggYXV0bztcclxufVxyXG5cclxuLmFycm93LXJpZ2h0OmFmdGVyLCAuYXJyb3ctcmlnaHQ6YmVmb3JlIHtcclxuICBjb250ZW50OiBcIlwiO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB3aWR0aDogMjBweDtcclxuICBoZWlnaHQ6IDUwJTtcclxuICBsZWZ0OiAxMDAlO1xyXG59XHJcblxyXG4uYXJyb3ctcmlnaHQ6YWZ0ZXIge1xyXG4gIGJvdHRvbTogMDtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQgYm90dG9tLCByZWQgNTAlLCB0cmFuc3BhcmVudCA1MCUpO1xyXG59XHJcbi5hcnJvdy1yaWdodDpiZWZvcmUge1xyXG4gIHRvcDogMDtcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQgdG9wLCByZWQgNTAlLCB0cmFuc3BhcmVudCA1MCUpO1xyXG59Il19 */"] });


/***/ }),

/***/ 52327:
/*!********************************************!*\
  !*** ./src/app/_pages/docs/docs.module.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocsModule": () => (/* binding */ DocsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var ngx_typed_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-typed-js */ 86771);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/components/banner-discord/banner-discord.module */ 54854);
/* harmony import */ var _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/components/stats-server/stats-server.module */ 10669);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/components/banner-donasi/banner-donasi.module */ 61838);
/* harmony import */ var _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/pipes/custom-pipe.module */ 67355);
/* harmony import */ var _docs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./docs.component */ 1213);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);












const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _docs_component__WEBPACK_IMPORTED_MODULE_6__.DocsComponent
    }
];
class DocsModule {
}
DocsModule.ɵfac = function DocsModule_Factory(t) { return new (t || DocsModule)(); };
DocsModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: DocsModule });
DocsModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule.forChild(routes),
            _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_4__.BannerDonasiModule,
            _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_1__.BannerDiscordModule,
            _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_2__.StatsServerModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_0__.NotificationsModule,
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_3__.SharedMaterialModule,
            ngx_typed_js__WEBPACK_IMPORTED_MODULE_10__.NgxTypedJsModule,
            _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_5__.CustomPipeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](DocsModule, { declarations: [_docs_component__WEBPACK_IMPORTED_MODULE_6__.DocsComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule, _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_4__.BannerDonasiModule,
        _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_1__.BannerDiscordModule,
        _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_2__.StatsServerModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_0__.NotificationsModule,
        _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_3__.SharedMaterialModule,
        ngx_typed_js__WEBPACK_IMPORTED_MODULE_10__.NgxTypedJsModule,
        _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_5__.CustomPipeModule] }); })();


/***/ }),

/***/ 8616:
/*!*****************************************************************************!*\
  !*** ./src/app/_shared/components/notifications/notifications.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationsComponent": () => (/* binding */ NotificationsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _services_notifications_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/notifications.service */ 37140);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pipes/safe-inner-html.pipe */ 11861);






function NotificationsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 4);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("background-size", ctx_r0.GS.sizeContain ? "contain" : "cover")("background-image", "url(" + ctx_r0.GS.bannerImg + ")")("background-repeat", ctx_r0.GS.bgRepeat ? "repeat-x" : "no-repeat")("height", ctx_r0.ROUTER.url === "/news" || ctx_r0.ROUTER.url.includes("/news?") || ctx_r0.ROUTER.url === "/berkas" || ctx_r0.ROUTER.url.includes("/berkas?") || ctx_r0.ROUTER.url === "/fansub" || ctx_r0.ROUTER.url.includes("/fansub?") ? "192px" : "128px")("background-position-y", ctx_r0.ROUTER.url === "/berkas" || ctx_r0.ROUTER.url.includes("/berkas?") ? "22.5%" : "");
} }
function NotificationsComponent_div_3_strong_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "strong", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " -- ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "i")(3, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const n_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate1"]("routerLink", "/user/", n_r2.notifCreator, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", n_r2.notifCreator, " ");
} }
function NotificationsComponent_div_3_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function NotificationsComponent_div_3_button_7_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9); const n_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r7.removeNotif(n_r2.notifData.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function NotificationsComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 5)(1, "div")(2, "strong", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "safeInnerHtml");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, NotificationsComponent_div_3_strong_6_Template, 5, 2, "strong", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, NotificationsComponent_div_3_button_7_Template, 1, 0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const n_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMapInterpolate1"]("alert alert-", n_r2.notifData.type, " alert-dismissible fade show");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](n_r2.notifData.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 7, n_r2.notifData.content), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", n_r2.notifCreator);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", n_r2.notifData.dismissible);
} }
class NotificationsComponent {
    constructor(router, gs, notif) {
        this.router = router;
        this.gs = gs;
        this.notif = notif;
        if (this.gs.isBrowser) {
            //
        }
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            //
        }
    }
    get GS() {
        return this.gs;
    }
    get ROUTER() {
        return this.router;
    }
    get NOTIF() {
        return this.notif;
    }
    removeNotif(id) {
        this.notif.removeNotif(id);
    }
}
NotificationsComponent.ɵfac = function NotificationsComponent_Factory(t) { return new (t || NotificationsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_notifications_service__WEBPACK_IMPORTED_MODULE_1__.NotificationsService)); };
NotificationsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: NotificationsComponent, selectors: [["app-notifications"]], decls: 4, vars: 2, consts: [["class", "container-fluid notif-banner align-items-center", 3, "background-size", "background-image", "background-repeat", "height", "background-position-y", 4, "ngIf"], [1, "container"], [1, "row", "pt-3"], ["class", "col-12", 4, "ngFor", "ngForOf"], [1, "container-fluid", "notif-banner", "align-items-center"], [1, "col-12"], [1, "me-1"], [3, "innerHTML"], ["class", "ms-1", 4, "ngIf"], ["type", "button", "class", "btn-close", "data-dismiss", "alert", 3, "click", 4, "ngIf"], [1, "ms-1"], [1, "text-decoration-none", 3, "routerLink"], ["type", "button", "data-dismiss", "alert", 1, "btn-close", 3, "click"]], template: function NotificationsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, NotificationsComponent_div_0_Template, 1, 10, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 1)(2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, NotificationsComponent_div_3_Template, 8, 9, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.GS.bannerImg && (ctx.ROUTER.url === "/news" || ctx.ROUTER.url.includes("/news?") || ctx.ROUTER.url === "/berkas" || ctx.ROUTER.url.includes("/berkas?") || ctx.ROUTER.url === "/fansub" || ctx.ROUTER.url.includes("/fansub?") || ctx.ROUTER.url === "/anime" || ctx.ROUTER.url.includes("/anime?") || ctx.ROUTER.url === "/dorama" || ctx.ROUTER.url.includes("/dorama?")));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.NOTIF.notifications);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHref], pipes: [_pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_2__.SafeInnerHtmlPipe], styles: [".notif-banner[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  background-size: cover;\r\n  background-position: 75% 50%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbnMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7RUFDWCxzQkFBc0I7RUFDdEIsNEJBQTRCO0FBQzlCIiwiZmlsZSI6Im5vdGlmaWNhdGlvbnMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ub3RpZi1iYW5uZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogNzUlIDUwJTtcclxufSJdfQ== */"] });


/***/ }),

/***/ 88613:
/*!**************************************************************************!*\
  !*** ./src/app/_shared/components/notifications/notifications.module.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationsModule": () => (/* binding */ NotificationsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pipes/custom-pipe.module */ 67355);
/* harmony import */ var _notifications_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notifications.component */ 8616);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);





class NotificationsModule {
}
NotificationsModule.ɵfac = function NotificationsModule_Factory(t) { return new (t || NotificationsModule)(); };
NotificationsModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: NotificationsModule });
NotificationsModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule,
            _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_0__.CustomPipeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](NotificationsModule, { declarations: [_notifications_component__WEBPACK_IMPORTED_MODULE_1__.NotificationsComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule,
        _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_0__.CustomPipeModule], exports: [_notifications_component__WEBPACK_IMPORTED_MODULE_1__.NotificationsComponent] }); })();


/***/ }),

/***/ 76265:
/*!********************************************!*\
  !*** ./node_modules/typed.js/lib/typed.js ***!
  \********************************************/
/***/ (function(module) {

/*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.12
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __nested_webpack_require_737__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_737__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nested_webpack_require_737__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_737__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_737__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_737__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __nested_webpack_require_2018__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _initializerJs = __nested_webpack_require_2018__(1);
	
	var _htmlParserJs = __nested_webpack_require_2018__(3);
	
	/**
	 * Welcome to Typed.js!
	 * @param {string} elementId HTML element ID _OR_ HTML element
	 * @param {object} options options object
	 * @returns {object} a new Typed object
	 */
	
	var Typed = (function () {
	  function Typed(elementId, options) {
	    _classCallCheck(this, Typed);
	
	    // Initialize it up
	    _initializerJs.initializer.load(this, options, elementId);
	    // All systems go!
	    this.begin();
	  }
	
	  /**
	   * Toggle start() and stop() of the Typed instance
	   * @public
	   */
	
	  _createClass(Typed, [{
	    key: 'toggle',
	    value: function toggle() {
	      this.pause.status ? this.start() : this.stop();
	    }
	
	    /**
	     * Stop typing / backspacing and enable cursor blinking
	     * @public
	     */
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this.typingComplete) return;
	      if (this.pause.status) return;
	      this.toggleBlinking(true);
	      this.pause.status = true;
	      this.options.onStop(this.arrayPos, this);
	    }
	
	    /**
	     * Start typing / backspacing after being stopped
	     * @public
	     */
	  }, {
	    key: 'start',
	    value: function start() {
	      if (this.typingComplete) return;
	      if (!this.pause.status) return;
	      this.pause.status = false;
	      if (this.pause.typewrite) {
	        this.typewrite(this.pause.curString, this.pause.curStrPos);
	      } else {
	        this.backspace(this.pause.curString, this.pause.curStrPos);
	      }
	      this.options.onStart(this.arrayPos, this);
	    }
	
	    /**
	     * Destroy this instance of Typed
	     * @public
	     */
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.reset(false);
	      this.options.onDestroy(this);
	    }
	
	    /**
	     * Reset Typed and optionally restarts
	     * @param {boolean} restart
	     * @public
	     */
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var restart = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      clearInterval(this.timeout);
	      this.replaceText('');
	      if (this.cursor && this.cursor.parentNode) {
	        this.cursor.parentNode.removeChild(this.cursor);
	        this.cursor = null;
	      }
	      this.strPos = 0;
	      this.arrayPos = 0;
	      this.curLoop = 0;
	      if (restart) {
	        this.insertCursor();
	        this.options.onReset(this);
	        this.begin();
	      }
	    }
	
	    /**
	     * Begins the typing animation
	     * @private
	     */
	  }, {
	    key: 'begin',
	    value: function begin() {
	      var _this = this;
	
	      this.options.onBegin(this);
	      this.typingComplete = false;
	      this.shuffleStringsIfNeeded(this);
	      this.insertCursor();
	      if (this.bindInputFocusEvents) this.bindFocusEvents();
	      this.timeout = setTimeout(function () {
	        // Check if there is some text in the element, if yes start by backspacing the default message
	        if (!_this.currentElContent || _this.currentElContent.length === 0) {
	          _this.typewrite(_this.strings[_this.sequence[_this.arrayPos]], _this.strPos);
	        } else {
	          // Start typing
	          _this.backspace(_this.currentElContent, _this.currentElContent.length);
	        }
	      }, this.startDelay);
	    }
	
	    /**
	     * Called for each character typed
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'typewrite',
	    value: function typewrite(curString, curStrPos) {
	      var _this2 = this;
	
	      if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
	        this.el.classList.remove(this.fadeOutClass);
	        if (this.cursor) this.cursor.classList.remove(this.fadeOutClass);
	      }
	
	      var humanize = this.humanizer(this.typeSpeed);
	      var numChars = 1;
	
	      if (this.pause.status === true) {
	        this.setPauseStatus(curString, curStrPos, true);
	        return;
	      }
	
	      // contain typing function in a timeout humanize'd delay
	      this.timeout = setTimeout(function () {
	        // skip over any HTML chars
	        curStrPos = _htmlParserJs.htmlParser.typeHtmlChars(curString, curStrPos, _this2);
	
	        var pauseTime = 0;
	        var substr = curString.substr(curStrPos);
	        // check for an escape character before a pause value
	        // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
	        // single ^ are removed from string
	        if (substr.charAt(0) === '^') {
	          if (/^\^\d+/.test(substr)) {
	            var skip = 1; // skip at least 1
	            substr = /\d+/.exec(substr)[0];
	            skip += substr.length;
	            pauseTime = parseInt(substr);
	            _this2.temporaryPause = true;
	            _this2.options.onTypingPaused(_this2.arrayPos, _this2);
	            // strip out the escape character and pause value so they're not printed
	            curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
	            _this2.toggleBlinking(true);
	          }
	        }
	
	        // check for skip characters formatted as
	        // "this is a `string to print NOW` ..."
	        if (substr.charAt(0) === '`') {
	          while (curString.substr(curStrPos + numChars).charAt(0) !== '`') {
	            numChars++;
	            if (curStrPos + numChars > curString.length) break;
	          }
	          // strip out the escape characters and append all the string in between
	          var stringBeforeSkip = curString.substring(0, curStrPos);
	          var stringSkipped = curString.substring(stringBeforeSkip.length + 1, curStrPos + numChars);
	          var stringAfterSkip = curString.substring(curStrPos + numChars + 1);
	          curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
	          numChars--;
	        }
	
	        // timeout for any pause after a character
	        _this2.timeout = setTimeout(function () {
	          // Accounts for blinking while paused
	          _this2.toggleBlinking(false);
	
	          // We're done with this sentence!
	          if (curStrPos >= curString.length) {
	            _this2.doneTyping(curString, curStrPos);
	          } else {
	            _this2.keepTyping(curString, curStrPos, numChars);
	          }
	          // end of character pause
	          if (_this2.temporaryPause) {
	            _this2.temporaryPause = false;
	            _this2.options.onTypingResumed(_this2.arrayPos, _this2);
	          }
	        }, pauseTime);
	
	        // humanized value for typing
	      }, humanize);
	    }
	
	    /**
	     * Continue to the next string & begin typing
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'keepTyping',
	    value: function keepTyping(curString, curStrPos, numChars) {
	      // call before functions if applicable
	      if (curStrPos === 0) {
	        this.toggleBlinking(false);
	        this.options.preStringTyped(this.arrayPos, this);
	      }
	      // start typing each new char into existing string
	      // curString: arg, this.el.html: original text inside element
	      curStrPos += numChars;
	      var nextString = curString.substr(0, curStrPos);
	      this.replaceText(nextString);
	      // loop the function
	      this.typewrite(curString, curStrPos);
	    }
	
	    /**
	     * We're done typing the current string
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'doneTyping',
	    value: function doneTyping(curString, curStrPos) {
	      var _this3 = this;
	
	      // fires callback function
	      this.options.onStringTyped(this.arrayPos, this);
	      this.toggleBlinking(true);
	      // is this the final string
	      if (this.arrayPos === this.strings.length - 1) {
	        // callback that occurs on the last typed string
	        this.complete();
	        // quit if we wont loop back
	        if (this.loop === false || this.curLoop === this.loopCount) {
	          return;
	        }
	      }
	      this.timeout = setTimeout(function () {
	        _this3.backspace(curString, curStrPos);
	      }, this.backDelay);
	    }
	
	    /**
	     * Backspaces 1 character at a time
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'backspace',
	    value: function backspace(curString, curStrPos) {
	      var _this4 = this;
	
	      if (this.pause.status === true) {
	        this.setPauseStatus(curString, curStrPos, false);
	        return;
	      }
	      if (this.fadeOut) return this.initFadeOut();
	
	      this.toggleBlinking(false);
	      var humanize = this.humanizer(this.backSpeed);
	
	      this.timeout = setTimeout(function () {
	        curStrPos = _htmlParserJs.htmlParser.backSpaceHtmlChars(curString, curStrPos, _this4);
	        // replace text with base text + typed characters
	        var curStringAtPosition = curString.substr(0, curStrPos);
	        _this4.replaceText(curStringAtPosition);
	
	        // if smartBack is enabled
	        if (_this4.smartBackspace) {
	          // the remaining part of the current string is equal of the same part of the new string
	          var nextString = _this4.strings[_this4.arrayPos + 1];
	          if (nextString && curStringAtPosition === nextString.substr(0, curStrPos)) {
	            _this4.stopNum = curStrPos;
	          } else {
	            _this4.stopNum = 0;
	          }
	        }
	
	        // if the number (id of character in current string) is
	        // less than the stop number, keep going
	        if (curStrPos > _this4.stopNum) {
	          // subtract characters one by one
	          curStrPos--;
	          // loop the function
	          _this4.backspace(curString, curStrPos);
	        } else if (curStrPos <= _this4.stopNum) {
	          // if the stop number has been reached, increase
	          // array position to next string
	          _this4.arrayPos++;
	          // When looping, begin at the beginning after backspace complete
	          if (_this4.arrayPos === _this4.strings.length) {
	            _this4.arrayPos = 0;
	            _this4.options.onLastStringBackspaced();
	            _this4.shuffleStringsIfNeeded();
	            _this4.begin();
	          } else {
	            _this4.typewrite(_this4.strings[_this4.sequence[_this4.arrayPos]], curStrPos);
	          }
	        }
	        // humanized value for typing
	      }, humanize);
	    }
	
	    /**
	     * Full animation is complete
	     * @private
	     */
	  }, {
	    key: 'complete',
	    value: function complete() {
	      this.options.onComplete(this);
	      if (this.loop) {
	        this.curLoop++;
	      } else {
	        this.typingComplete = true;
	      }
	    }
	
	    /**
	     * Has the typing been stopped
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @param {boolean} isTyping
	     * @private
	     */
	  }, {
	    key: 'setPauseStatus',
	    value: function setPauseStatus(curString, curStrPos, isTyping) {
	      this.pause.typewrite = isTyping;
	      this.pause.curString = curString;
	      this.pause.curStrPos = curStrPos;
	    }
	
	    /**
	     * Toggle the blinking cursor
	     * @param {boolean} isBlinking
	     * @private
	     */
	  }, {
	    key: 'toggleBlinking',
	    value: function toggleBlinking(isBlinking) {
	      if (!this.cursor) return;
	      // if in paused state, don't toggle blinking a 2nd time
	      if (this.pause.status) return;
	      if (this.cursorBlinking === isBlinking) return;
	      this.cursorBlinking = isBlinking;
	      if (isBlinking) {
	        this.cursor.classList.add('typed-cursor--blink');
	      } else {
	        this.cursor.classList.remove('typed-cursor--blink');
	      }
	    }
	
	    /**
	     * Speed in MS to type
	     * @param {number} speed
	     * @private
	     */
	  }, {
	    key: 'humanizer',
	    value: function humanizer(speed) {
	      return Math.round(Math.random() * speed / 2) + speed;
	    }
	
	    /**
	     * Shuffle the sequence of the strings array
	     * @private
	     */
	  }, {
	    key: 'shuffleStringsIfNeeded',
	    value: function shuffleStringsIfNeeded() {
	      if (!this.shuffle) return;
	      this.sequence = this.sequence.sort(function () {
	        return Math.random() - 0.5;
	      });
	    }
	
	    /**
	     * Adds a CSS class to fade out current string
	     * @private
	     */
	  }, {
	    key: 'initFadeOut',
	    value: function initFadeOut() {
	      var _this5 = this;
	
	      this.el.className += ' ' + this.fadeOutClass;
	      if (this.cursor) this.cursor.className += ' ' + this.fadeOutClass;
	      return setTimeout(function () {
	        _this5.arrayPos++;
	        _this5.replaceText('');
	
	        // Resets current string if end of loop reached
	        if (_this5.strings.length > _this5.arrayPos) {
	          _this5.typewrite(_this5.strings[_this5.sequence[_this5.arrayPos]], 0);
	        } else {
	          _this5.typewrite(_this5.strings[0], 0);
	          _this5.arrayPos = 0;
	        }
	      }, this.fadeOutDelay);
	    }
	
	    /**
	     * Replaces current text in the HTML element
	     * depending on element type
	     * @param {string} str
	     * @private
	     */
	  }, {
	    key: 'replaceText',
	    value: function replaceText(str) {
	      if (this.attr) {
	        this.el.setAttribute(this.attr, str);
	      } else {
	        if (this.isInput) {
	          this.el.value = str;
	        } else if (this.contentType === 'html') {
	          this.el.innerHTML = str;
	        } else {
	          this.el.textContent = str;
	        }
	      }
	    }
	
	    /**
	     * If using input elements, bind focus in order to
	     * start and stop the animation
	     * @private
	     */
	  }, {
	    key: 'bindFocusEvents',
	    value: function bindFocusEvents() {
	      var _this6 = this;
	
	      if (!this.isInput) return;
	      this.el.addEventListener('focus', function (e) {
	        _this6.stop();
	      });
	      this.el.addEventListener('blur', function (e) {
	        if (_this6.el.value && _this6.el.value.length !== 0) {
	          return;
	        }
	        _this6.start();
	      });
	    }
	
	    /**
	     * On init, insert the cursor element
	     * @private
	     */
	  }, {
	    key: 'insertCursor',
	    value: function insertCursor() {
	      if (!this.showCursor) return;
	      if (this.cursor) return;
	      this.cursor = document.createElement('span');
	      this.cursor.className = 'typed-cursor';
	      this.cursor.setAttribute('aria-hidden', true);
	      this.cursor.innerHTML = this.cursorChar;
	      this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
	    }
	  }]);
	
	  return Typed;
	})();
	
	exports['default'] = Typed;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __nested_webpack_require_18228__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _defaultsJs = __nested_webpack_require_18228__(2);
	
	var _defaultsJs2 = _interopRequireDefault(_defaultsJs);
	
	/**
	 * Initialize the Typed object
	 */
	
	var Initializer = (function () {
	  function Initializer() {
	    _classCallCheck(this, Initializer);
	  }
	
	  _createClass(Initializer, [{
	    key: 'load',
	
	    /**
	     * Load up defaults & options on the Typed instance
	     * @param {Typed} self instance of Typed
	     * @param {object} options options object
	     * @param {string} elementId HTML element ID _OR_ instance of HTML element
	     * @private
	     */
	
	    value: function load(self, options, elementId) {
	      // chosen element to manipulate text
	      if (typeof elementId === 'string') {
	        self.el = document.querySelector(elementId);
	      } else {
	        self.el = elementId;
	      }
	
	      self.options = _extends({}, _defaultsJs2['default'], options);
	
	      // attribute to type into
	      self.isInput = self.el.tagName.toLowerCase() === 'input';
	      self.attr = self.options.attr;
	      self.bindInputFocusEvents = self.options.bindInputFocusEvents;
	
	      // show cursor
	      self.showCursor = self.isInput ? false : self.options.showCursor;
	
	      // custom cursor
	      self.cursorChar = self.options.cursorChar;
	
	      // Is the cursor blinking
	      self.cursorBlinking = true;
	
	      // text content of element
	      self.elContent = self.attr ? self.el.getAttribute(self.attr) : self.el.textContent;
	
	      // html or plain text
	      self.contentType = self.options.contentType;
	
	      // typing speed
	      self.typeSpeed = self.options.typeSpeed;
	
	      // add a delay before typing starts
	      self.startDelay = self.options.startDelay;
	
	      // backspacing speed
	      self.backSpeed = self.options.backSpeed;
	
	      // only backspace what doesn't match the previous string
	      self.smartBackspace = self.options.smartBackspace;
	
	      // amount of time to wait before backspacing
	      self.backDelay = self.options.backDelay;
	
	      // Fade out instead of backspace
	      self.fadeOut = self.options.fadeOut;
	      self.fadeOutClass = self.options.fadeOutClass;
	      self.fadeOutDelay = self.options.fadeOutDelay;
	
	      // variable to check whether typing is currently paused
	      self.isPaused = false;
	
	      // input strings of text
	      self.strings = self.options.strings.map(function (s) {
	        return s.trim();
	      });
	
	      // div containing strings
	      if (typeof self.options.stringsElement === 'string') {
	        self.stringsElement = document.querySelector(self.options.stringsElement);
	      } else {
	        self.stringsElement = self.options.stringsElement;
	      }
	
	      if (self.stringsElement) {
	        self.strings = [];
	        self.stringsElement.style.display = 'none';
	        var strings = Array.prototype.slice.apply(self.stringsElement.children);
	        var stringsLength = strings.length;
	
	        if (stringsLength) {
	          for (var i = 0; i < stringsLength; i += 1) {
	            var stringEl = strings[i];
	            self.strings.push(stringEl.innerHTML.trim());
	          }
	        }
	      }
	
	      // character number position of current string
	      self.strPos = 0;
	
	      // current array position
	      self.arrayPos = 0;
	
	      // index of string to stop backspacing on
	      self.stopNum = 0;
	
	      // Looping logic
	      self.loop = self.options.loop;
	      self.loopCount = self.options.loopCount;
	      self.curLoop = 0;
	
	      // shuffle the strings
	      self.shuffle = self.options.shuffle;
	      // the order of strings
	      self.sequence = [];
	
	      self.pause = {
	        status: false,
	        typewrite: true,
	        curString: '',
	        curStrPos: 0
	      };
	
	      // When the typing is complete (when not looped)
	      self.typingComplete = false;
	
	      // Set the order in which the strings are typed
	      for (var i in self.strings) {
	        self.sequence[i] = i;
	      }
	
	      // If there is some text in the element
	      self.currentElContent = this.getCurrentElContent(self);
	
	      self.autoInsertCss = self.options.autoInsertCss;
	
	      this.appendAnimationCss(self);
	    }
	  }, {
	    key: 'getCurrentElContent',
	    value: function getCurrentElContent(self) {
	      var elContent = '';
	      if (self.attr) {
	        elContent = self.el.getAttribute(self.attr);
	      } else if (self.isInput) {
	        elContent = self.el.value;
	      } else if (self.contentType === 'html') {
	        elContent = self.el.innerHTML;
	      } else {
	        elContent = self.el.textContent;
	      }
	      return elContent;
	    }
	  }, {
	    key: 'appendAnimationCss',
	    value: function appendAnimationCss(self) {
	      var cssDataName = 'data-typed-js-css';
	      if (!self.autoInsertCss) {
	        return;
	      }
	      if (!self.showCursor && !self.fadeOut) {
	        return;
	      }
	      if (document.querySelector('[' + cssDataName + ']')) {
	        return;
	      }
	
	      var css = document.createElement('style');
	      css.type = 'text/css';
	      css.setAttribute(cssDataName, true);
	
	      var innerCss = '';
	      if (self.showCursor) {
	        innerCss += '\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ';
	      }
	      if (self.fadeOut) {
	        innerCss += '\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ';
	      }
	      if (css.length === 0) {
	        return;
	      }
	      css.innerHTML = innerCss;
	      document.body.appendChild(css);
	    }
	  }]);
	
	  return Initializer;
	})();
	
	exports['default'] = Initializer;
	var initializer = new Initializer();
	exports.initializer = initializer;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/**
	 * Defaults & options
	 * @returns {object} Typed defaults & options
	 * @public
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var defaults = {
	  /**
	   * @property {array} strings strings to be typed
	   * @property {string} stringsElement ID of element containing string children
	   */
	  strings: ['These are the default values...', 'You know what you should do?', 'Use your own!', 'Have a great day!'],
	  stringsElement: null,
	
	  /**
	   * @property {number} typeSpeed type speed in milliseconds
	   */
	  typeSpeed: 0,
	
	  /**
	   * @property {number} startDelay time before typing starts in milliseconds
	   */
	  startDelay: 0,
	
	  /**
	   * @property {number} backSpeed backspacing speed in milliseconds
	   */
	  backSpeed: 0,
	
	  /**
	   * @property {boolean} smartBackspace only backspace what doesn't match the previous string
	   */
	  smartBackspace: true,
	
	  /**
	   * @property {boolean} shuffle shuffle the strings
	   */
	  shuffle: false,
	
	  /**
	   * @property {number} backDelay time before backspacing in milliseconds
	   */
	  backDelay: 700,
	
	  /**
	   * @property {boolean} fadeOut Fade out instead of backspace
	   * @property {string} fadeOutClass css class for fade animation
	   * @property {boolean} fadeOutDelay Fade out delay in milliseconds
	   */
	  fadeOut: false,
	  fadeOutClass: 'typed-fade-out',
	  fadeOutDelay: 500,
	
	  /**
	   * @property {boolean} loop loop strings
	   * @property {number} loopCount amount of loops
	   */
	  loop: false,
	  loopCount: Infinity,
	
	  /**
	   * @property {boolean} showCursor show cursor
	   * @property {string} cursorChar character for cursor
	   * @property {boolean} autoInsertCss insert CSS for cursor and fadeOut into HTML <head>
	   */
	  showCursor: true,
	  cursorChar: '|',
	  autoInsertCss: true,
	
	  /**
	   * @property {string} attr attribute for typing
	   * Ex: input placeholder, value, or just HTML text
	   */
	  attr: null,
	
	  /**
	   * @property {boolean} bindInputFocusEvents bind to focus and blur if el is text input
	   */
	  bindInputFocusEvents: false,
	
	  /**
	   * @property {string} contentType 'html' or 'null' for plaintext
	   */
	  contentType: 'html',
	
	  /**
	   * Before it begins typing
	   * @param {Typed} self
	   */
	  onBegin: function onBegin(self) {},
	
	  /**
	   * All typing is complete
	   * @param {Typed} self
	   */
	  onComplete: function onComplete(self) {},
	
	  /**
	   * Before each string is typed
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  preStringTyped: function preStringTyped(arrayPos, self) {},
	
	  /**
	   * After each string is typed
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStringTyped: function onStringTyped(arrayPos, self) {},
	
	  /**
	   * During looping, after last string is typed
	   * @param {Typed} self
	   */
	  onLastStringBackspaced: function onLastStringBackspaced(self) {},
	
	  /**
	   * Typing has been stopped
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onTypingPaused: function onTypingPaused(arrayPos, self) {},
	
	  /**
	   * Typing has been started after being stopped
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onTypingResumed: function onTypingResumed(arrayPos, self) {},
	
	  /**
	   * After reset
	   * @param {Typed} self
	   */
	  onReset: function onReset(self) {},
	
	  /**
	   * After stop
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStop: function onStop(arrayPos, self) {},
	
	  /**
	   * After start
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStart: function onStart(arrayPos, self) {},
	
	  /**
	   * After destroy
	   * @param {Typed} self
	   */
	  onDestroy: function onDestroy(self) {}
	};
	
	exports['default'] = defaults;
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/**
	 * TODO: These methods can probably be combined somehow
	 * Parse HTML tags & HTML Characters
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var HTMLParser = (function () {
	  function HTMLParser() {
	    _classCallCheck(this, HTMLParser);
	  }
	
	  _createClass(HTMLParser, [{
	    key: 'typeHtmlChars',
	
	    /**
	     * Type HTML tags & HTML Characters
	     * @param {string} curString Current string
	     * @param {number} curStrPos Position in current string
	     * @param {Typed} self instance of Typed
	     * @returns {number} a new string position
	     * @private
	     */
	
	    value: function typeHtmlChars(curString, curStrPos, self) {
	      if (self.contentType !== 'html') return curStrPos;
	      var curChar = curString.substr(curStrPos).charAt(0);
	      if (curChar === '<' || curChar === '&') {
	        var endTag = '';
	        if (curChar === '<') {
	          endTag = '>';
	        } else {
	          endTag = ';';
	        }
	        while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
	          curStrPos++;
	          if (curStrPos + 1 > curString.length) {
	            break;
	          }
	        }
	        curStrPos++;
	      }
	      return curStrPos;
	    }
	
	    /**
	     * Backspace HTML tags and HTML Characters
	     * @param {string} curString Current string
	     * @param {number} curStrPos Position in current string
	     * @param {Typed} self instance of Typed
	     * @returns {number} a new string position
	     * @private
	     */
	  }, {
	    key: 'backSpaceHtmlChars',
	    value: function backSpaceHtmlChars(curString, curStrPos, self) {
	      if (self.contentType !== 'html') return curStrPos;
	      var curChar = curString.substr(curStrPos).charAt(0);
	      if (curChar === '>' || curChar === ';') {
	        var endTag = '';
	        if (curChar === '>') {
	          endTag = '<';
	        } else {
	          endTag = '&';
	        }
	        while (curString.substr(curStrPos - 1).charAt(0) !== endTag) {
	          curStrPos--;
	          if (curStrPos < 0) {
	            break;
	          }
	        }
	        curStrPos--;
	      }
	      return curStrPos;
	    }
	  }]);
	
	  return HTMLParser;
	})();
	
	exports['default'] = HTMLParser;
	var htmlParser = new HTMLParser();
	exports.htmlParser = htmlParser;

/***/ })
/******/ ])
});
;

/***/ }),

/***/ 86771:
/*!*************************************************************!*\
  !*** ./node_modules/ngx-typed-js/fesm2015/ngx-typed-js.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NgxTypedJsComponent": () => (/* binding */ NgxTypedJsComponent),
/* harmony export */   "NgxTypedJsModule": () => (/* binding */ NgxTypedJsModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typed.js */ 76265);



const _c0 = ["wrapper"];
const _c1 = ["*"];

class NgxTypedJsComponent {
  constructor() {
    this.typeSpeed = 30;
    this.completed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.preStringTyped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.stringTyped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.lastStringBackspaced = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.typingPaused = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.typingResumed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.reset = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.stopped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.started = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.destroyed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }

  ngAfterViewInit() {
    this.typed = new typed_js__WEBPACK_IMPORTED_MODULE_0__(this.content.nativeElement.querySelector('.typing'), this.options);

    if (this.showCursor !== false) {
      this.updateCursorStyle();
    }
  }

  toggle() {
    this.typed.toggle();
  }

  stop() {
    this.typed.stop();
  }

  start() {
    this.typed.start();
  }

  destroy() {
    this.typed.destroy();
  }

  doReset(restart) {
    this.typed.reset(restart);
  }

  get options() {
    var _a;

    const emit = emitter => () => emitter.emit();

    const emitIndex = emitter => index => emitter.emit(index);

    const opts = {
      strings: (_a = this.strings) !== null && _a !== void 0 ? _a : [''],
      stringsElement: this.stringsElement,
      typeSpeed: this.typeSpeed,
      startDelay: this.startDelay,
      backSpeed: this.backSpeed,
      smartBackspace: this.smartBackspace,
      shuffle: this.shuffle,
      backDelay: this.backDelay,
      fadeOut: this.fadeOut,
      fadeOutClass: this.fadeOutClass,
      fadeOutDelay: this.fadeOutDelay,
      loop: this.loop,
      loopCount: this.loopCount,
      showCursor: this.showCursor,
      autoInsertCss: this.autoInsertCss,
      attr: this.attr,
      bindInputFocusEvents: this.bindInputFocusEvents,
      contentType: this.contentType,
      onComplete: emit(this.completed),
      preStringTyped: emitIndex(this.preStringTyped),
      onStringTyped: emitIndex(this.stringTyped),
      onLastStringBackspaced: emit(this.lastStringBackspaced),
      onTypingPaused: emitIndex(this.typingPaused),
      onTypingResumed: emitIndex(this.typingResumed),
      onReset: emit(this.reset),
      onStop: emitIndex(this.stopped),
      onStart: emitIndex(this.started),
      onDestroy: emit(this.destroyed)
    };
    Object.keys(opts).forEach(key => {
      if (opts[key] === undefined) {
        delete opts[key];
      }
    });
    return opts;
  }

  updateCursorStyle() {
    const textElementStyle = getComputedStyle(this.content.nativeElement.querySelector('.typing'));
    const cursorElementStyle = this.content.nativeElement.querySelector('.typed-cursor').style;
    cursorElementStyle.fontSize = textElementStyle.fontSize;
    cursorElementStyle.color = this.cursorColor || textElementStyle.color;
  }

  ngOnChanges(changes) {
    if (this.typed) {
      this.typed.destroy();
      this.ngAfterViewInit();
    }
  }

}

NgxTypedJsComponent.ɵfac = function NgxTypedJsComponent_Factory(t) {
  return new (t || NgxTypedJsComponent)();
};

NgxTypedJsComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: NgxTypedJsComponent,
  selectors: [["ngx-typed-js"]],
  viewQuery: function NgxTypedJsComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 7);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
    }
  },
  inputs: {
    cursorColor: "cursorColor",
    strings: "strings",
    stringsElement: "stringsElement",
    typeSpeed: "typeSpeed",
    startDelay: "startDelay",
    backSpeed: "backSpeed",
    smartBackspace: "smartBackspace",
    shuffle: "shuffle",
    backDelay: "backDelay",
    fadeOut: "fadeOut",
    fadeOutClass: "fadeOutClass",
    fadeOutDelay: "fadeOutDelay",
    loop: "loop",
    loopCount: "loopCount",
    showCursor: "showCursor",
    cursorChar: "cursorChar",
    autoInsertCss: "autoInsertCss",
    attr: "attr",
    bindInputFocusEvents: "bindInputFocusEvents",
    contentType: "contentType"
  },
  outputs: {
    completed: "completed",
    preStringTyped: "preStringTyped",
    stringTyped: "stringTyped",
    lastStringBackspaced: "lastStringBackspaced",
    typingPaused: "typingPaused",
    typingResumed: "typingResumed",
    reset: "reset",
    stopped: "stopped",
    started: "started",
    destroyed: "destroyed"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
  ngContentSelectors: _c1,
  decls: 3,
  vars: 0,
  consts: [["wrapper", ""]],
  template: function NgxTypedJsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", null, 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
  },
  styles: ["[_nghost-%COMP%] > .typing[_ngcontent-%COMP%]{display:inline}"]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NgxTypedJsComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Component,
    args: [{
      selector: 'ngx-typed-js',
      template: "<div #wrapper>\n  <ng-content></ng-content>\n</div>\n",
      styles: [":host>.typing{display:inline}\n"]
    }]
  }], null, {
    cursorColor: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    strings: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    stringsElement: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    typeSpeed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    startDelay: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    backSpeed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    smartBackspace: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    shuffle: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    backDelay: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    fadeOut: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    fadeOutClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    fadeOutDelay: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    loop: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    loopCount: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    showCursor: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    cursorChar: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    autoInsertCss: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    attr: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    bindInputFocusEvents: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    contentType: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Input
    }],
    completed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    preStringTyped: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    stringTyped: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    lastStringBackspaced: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    typingPaused: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    typingResumed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    reset: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    stopped: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    started: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    destroyed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Output
    }],
    content: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewChild,
      args: ['wrapper', {
        static: true
      }]
    }]
  });
})();

class NgxTypedJsModule {}

NgxTypedJsModule.ɵfac = function NgxTypedJsModule_Factory(t) {
  return new (t || NgxTypedJsModule)();
};

NgxTypedJsModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
  type: NgxTypedJsModule
});
NgxTypedJsModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
  imports: [[]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NgxTypedJsModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule,
    args: [{
      declarations: [NgxTypedJsComponent],
      imports: [],
      exports: [NgxTypedJsComponent]
    }]
  }], null, null);
})();
/*
 * Public API Surface of ngx-typed-js
 */

/**
 * Generated bundle index. Do not edit.
 */




/***/ })

}]);
//# sourceMappingURL=src_app__pages_docs_docs_module_ts.js.map