"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_news_news_module_ts"],{

/***/ 91341:
/*!******************************************************************!*\
  !*** ./src/app/_pages/news/news-detail/news-detail.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsDetailComponent": () => (/* binding */ NewsDetailComponent)
/* harmony export */ });
/* harmony import */ var _models_warna__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/warna */ 87623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_news_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/news.service */ 49618);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _shared_components_material_chip_material_chip_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/material-chip/material-chip.component */ 24028);
/* harmony import */ var _shared_components_discussion_discussion_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/components/discussion/discussion.component */ 78838);
/* harmony import */ var _shared_pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/pipes/safe-inner-html.pipe */ 11861);













function NewsDetailComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "div", 6)(6, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "div", 8)(9, "app-material-chip", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("chipClicked", function NewsDetailComponent_div_1_Template_app_material_chip_chipClicked_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r1.openTag($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "div", 10)(11, "div", 6)(12, "div", 11)(13, "div", 5)(14, "h2", 12)(15, "b", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](17, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](18, "hr", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "div", 5)(20, "h5", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](21, " .: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](22, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](25, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](26, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](27, "safeInnerHtml");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](28, "div", 18)(29, "div", 19)(30, "h2", 20)(31, "b", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](32, "Komentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](33, "div", 5)(34, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](35, "app-discussion");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate"]("src", ctx_r0.newsData.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("chipData", ctx_r0.chipData);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r0.newsData.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate1"]("routerLink", "/user/", ctx_r0.newsData.user_.username, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", ctx_r0.newsData.user_.username, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" :: ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](25, 7, ctx_r0.newsData.created_at, "d MMMM y, hh:mm:ss a z"), " :. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](27, 10, ctx_r0.newsData.content), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeHtml"]);
} }
class NewsDetailComponent {
    constructor(activatedRoute, router, bs, gs, fs, pi, news) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.bs = bs;
        this.gs = gs;
        this.fs = fs;
        this.pi = pi;
        this.news = news;
        this.newsId = 0;
        this.newsData = null;
        this.chipData = [];
        this.subsActRoute = null;
        this.subsNews = null;
        this.subsParam = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    ngOnDestroy() {
        var _a, _b, _c;
        (_a = this.subsActRoute) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsNews) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsParam) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    }
    ngOnInit() {
        this.subsParam = this.activatedRoute.params.subscribe({
            next: p => {
                this.newsId = Number(p['newsId']);
                this.bs.busy();
                this.subsNews = this.news.getNews(this.newsId).subscribe({
                    next: res => {
                        this.gs.log('[NEWS_DETAIL_SUCCESS]', res);
                        this.newsData = res.result;
                        this.pi.updatePageMetaData(`${this.newsData.title}`, `${this.newsData.content}`, `${Array.isArray(this.newsData.tags) ? this.newsData.tags.join(', ') : this.newsData.title}`, this.newsData.image_url, this.newsData.user_.username);
                        this.bs.idle();
                        if (this.gs.isBrowser) {
                            if (Array.isArray(this.newsData.tags)) {
                                for (let i = 0; i < this.newsData.tags.length; i++) {
                                    this.chipData.push({ id_tag: i, name: this.newsData.tags[i], color: _models_warna__WEBPACK_IMPORTED_MODULE_0__.WARNA.PINK, selected: true });
                                }
                            }
                            this.fs.initializeFab('edit', null, 'Ubah Data Berita', `/news/${this.newsId}/edit`, false);
                        }
                    },
                    error: err => {
                        this.gs.log('[NEWS_DETAIL_ERROR]', err, 'error');
                        this.bs.idle();
                        this.router.navigate(['/error'], {
                            queryParams: {
                                returnUrl: '/news'
                            }
                        });
                    }
                });
            }
        });
    }
    openTag(data) {
        this.gs.log('[FANSUB_DETAIL_OPEN_TAG]', data);
    }
}
NewsDetailComponent.ɵfac = function NewsDetailComponent_Factory(t) { return new (t || NewsDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_3__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_4__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_news_service__WEBPACK_IMPORTED_MODULE_5__.NewsService)); };
NewsDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: NewsDetailComponent, selectors: [["app-news-detail"]], decls: 2, vars: 1, consts: [["class", "container", 4, "ngIf"], [1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-lg-4", "col-xl-3"], [1, "row", "sticky-top", "pt-3"], [1, "col-12"], [1, "row"], [1, "w-100", 3, "src"], [1, "col-12", "p-3"], [3, "chipData", "chipClicked"], [1, "col-lg-8", "col-xl-9"], [1, "sticky-top", "bg-bifeldy"], [1, "pt-3", "m-0"], [1, "text-bifeldy"], [1, "my-1", "border-bottom-dotted", 2, "height", "4px", "background", "url('/assets/img/stripe.png')"], [1, "pb-3", "m-0", "text-bifeldy"], [1, "text-warning", "text-decoration-none", 3, "routerLink"], [1, "col-12", "pt-3", "mt-3", 3, "innerHTML"], [1, "row", "pt-3"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "p-3"]], template: function NewsDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, NewsDetailComponent_div_1_Template, 36, 12, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.newsData);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _shared_components_material_chip_material_chip_component__WEBPACK_IMPORTED_MODULE_7__.MaterialChipComponent, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterLinkWithHref, _shared_components_discussion_discussion_component__WEBPACK_IMPORTED_MODULE_8__.DiscussionComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.DatePipe, _shared_pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_9__.SafeInnerHtmlPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuZXdzLWRldGFpbC5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 83899:
/*!**************************************************************!*\
  !*** ./src/app/_pages/news/news-edit/news-edit.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsEditComponent": () => (/* binding */ NewsEditComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/imgbb.service */ 67902);
/* harmony import */ var _shared_services_news_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/news.service */ 49618);
/* harmony import */ var _shared_services_toast_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/toast.service */ 96925);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/chips */ 81196);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var _shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/pipes/bytes.pipe */ 23626);






















function NewsEditComponent_form_4_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("Ukuran Upload Melebihi Batas ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, ctx_r2.imageLimitExceeded), " !");
} }
function NewsEditComponent_form_4_div_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r3.imageErrorText);
} }
function NewsEditComponent_form_4_div_23_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 2)(1, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NewsEditComponent_form_4_div_23_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2); return ctx_r9.submitImage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "add_photo_alternate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, " Unggah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r4.submitted);
} }
function NewsEditComponent_form_4_div_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Judul Berita Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} }
function NewsEditComponent_form_4_div_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Judul Berita Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} }
function NewsEditComponent_form_4_mat_chip_40_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-chip", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("removed", function NewsEditComponent_form_4_mat_chip_40_Template_mat_chip_removed_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r13); const t_r11 = restoredCtx.$implicit; const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2); return ctx_r12.removeTag(t_r11); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const t_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("removable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", t_r11, " ");
} }
function NewsEditComponent_form_4_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "form", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("submit", function NewsEditComponent_form_4_Template_form_submit_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r14.onSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 5)(2, "div", 6)(3, "h2", 7)(4, "b", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5, "Perbaharui Data Berita & Informasi Baru");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 2)(7, "div", 9)(8, "div", 10)(9, "div", 9)(10, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](11, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "mat-form-field", 12)(13, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](14, "Gambar");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "ngx-mat-file-input", 13, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function NewsEditComponent_form_4_Template_ngx_mat_file_input_change_15_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r15); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](16); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r16.uploadImage($event, _r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](17, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](18, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "mat-error", 16)(20, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](21, NewsEditComponent_form_4_div_21_Template, 3, 3, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](22, NewsEditComponent_form_4_div_22_Template, 2, 1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](23, NewsEditComponent_form_4_div_23_Template, 5, 1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](24, "div", 19)(25, "div", 9)(26, "mat-form-field", 20)(27, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](28, "Judul");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](29, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](30, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](31, "wysiwyg");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](32, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](33, NewsEditComponent_form_4_div_33_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](34, NewsEditComponent_form_4_div_34_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](35, "mat-form-field", 20)(36, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](37, "Tags & Kategori");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](38, "mat-chip-list", null, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](40, NewsEditComponent_form_4_mat_chip_40_Template, 4, 2, "mat-chip", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](41, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("matChipInputTokenEnd", function NewsEditComponent_form_4_Template_input_matChipInputTokenEnd_41_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r15); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r17.addTag($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](42, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](43, "loyalty");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](44, "mat-hint", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](45, "Isi Dengan Bebas, Pisahkan Dengan Koma");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](46, "angular-editor", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](47, "div", 9)(48, "div", 2)(49, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](50, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](51, "div", 29)(52, "a", 30)(53, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](54, "undo");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](55, " Batal ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](56, "div", 29)(57, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](58, " Simpan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](59, "mat-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](60, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()()()()();
} if (rf & 2) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](39);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("formGroup", ctx_r0.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("src", ctx_r0.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r0.fg.value.image)("accept", "image/gif, image/jpeg, image/jpg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.imageLimitExceeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.imageErrorText);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.image && !ctx_r0.fg.value.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("title").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("title").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r0.fg.value.tags);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("matChipInputSeparatorKeyCodes", ctx_r0.GS.separatorKeysCodes)("matChipInputFor", _r7)("matChipInputAddOnBlur", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("config", ctx_r0.GS.angularEditorConfig);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r0.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r0.submitted || ctx_r0.fg.invalid);
} }
class NewsEditComponent {
    constructor(fb, router, bs, activatedRoute, pi, imgbb, news, toast, gs, as) {
        this.fb = fb;
        this.router = router;
        this.bs = bs;
        this.activatedRoute = activatedRoute;
        this.pi = pi;
        this.imgbb = imgbb;
        this.news = news;
        this.toast = toast;
        this.gs = gs;
        this.as = as;
        this.newsId = 0;
        this.submitted = false;
        this.image = null;
        this.imageErrorText = null;
        this.imageLimitExceeded = null;
        this.image_url = '/assets/img/form/no-image.png';
        this.image_url_original = null;
        this.gambar = null;
        this.subsActRoute = null;
        this.subsNewsUpdate = null;
        this.subsNewsDetail = null;
        this.subsImgbb = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get GS() {
        return this.gs;
    }
    ngOnInit() {
        this.pi.updatePageMetaData(`Informasi - Ubah Berita`, `Halaman Pembaharuan Berita`, `Edit News`);
        if (this.gs.isBrowser) {
            this.newsId = Number(this.activatedRoute.snapshot.paramMap.get('newsId'));
            this.bs.busy();
            this.subsNewsDetail = this.news.getNews(this.newsId).subscribe({
                next: res => {
                    var _a, _b;
                    this.gs.log('[NEWS_DETAIL_SUCCESS]', res);
                    this.bs.idle();
                    if (((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.id) !== res.result.user_.id) {
                        this.toast.warning('Berita Ini Milik Orang Lain', 'Whoops!', null, true);
                        this.router.navigateByUrl(`/news/${this.newsId}`);
                    }
                    else {
                        this.initForm(res.result);
                    }
                },
                error: err => {
                    this.gs.log('[NEWS_DETAIL_ERROR]', err, 'error');
                    this.bs.idle();
                    this.router.navigate(['/error'], {
                        queryParams: {
                            returnUrl: `/news/${this.newsId}`
                        }
                    });
                }
            });
        }
    }
    ngOnDestroy() {
        var _a, _b, _c, _d;
        (_a = this.subsActRoute) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsNewsUpdate) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsNewsDetail) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsImgbb) === null || _d === void 0 ? void 0 : _d.unsubscribe();
    }
    initForm(data) {
        this.image_url = data.image_url;
        this.image_url_original = this.image_url;
        this.fg = this.fb.group({
            title: [data.title, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexEnglishKeyboardKeys)])],
            content: [data.content, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexEnglishKeyboardKeys)])],
            image: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexUrl)])],
            tags: [data.tags, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.compose([])],
        });
    }
    uploadImage(event, gambar) {
        this.gambar = gambar;
        this.image = null;
        this.imageLimitExceeded = null;
        this.imageErrorText = null;
        this.fg.controls['image'].patchValue(null);
        this.fg.controls['image'].markAsPristine();
        const file = event.target.files[0];
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
                this.gs.log('[IMAGE_SELECTED]', e);
                if (file.size <= _constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.fileSizeImageLimit) {
                    const img = this.gs.document.createElement('img');
                    img.onload = () => {
                        this.image = file;
                        this.image_url = reader.result.toString();
                    };
                    img.src = reader.result.toString();
                }
                else {
                    this.image = null;
                    this.image_url = '/assets/img/form/image-error.png';
                    this.imageLimitExceeded = _constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.fileSizeImageLimit;
                    this.gambar.clear(event);
                }
            };
        }
        catch (error) {
            this.image = null;
            this.image_url = this.image_url_original;
            this.gambar.clear(event);
        }
    }
    submitImage() {
        this.submitted = true;
        this.subsImgbb = this.imgbb.uploadImage({
            file: this.image
        }).subscribe({
            next: res => {
                this.gs.log('[IMAGE_SUCCESS]', res);
                this.fg.controls['image'].patchValue(res.result.url);
                this.fg.controls['image'].markAsDirty();
                this.submitted = false;
            },
            error: err => {
                var _a;
                this.gs.log('[IMAGE_ERROR]', err, 'error');
                this.fg.controls['image'].patchValue(null);
                this.fg.controls['image'].markAsPristine();
                this.submitted = false;
                this.imageErrorText = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
            }
        });
    }
    onSubmit() {
        this.bs.busy();
        const body = this.gs.getDirtyValues(this.fg);
        this.gs.log('[NEWS_EDIT_DIRTY]', body);
        this.submitted = true;
        if (this.fg.invalid) {
            this.submitted = false;
            this.bs.idle();
            return;
        }
        this.subsNewsUpdate = this.news.updateNews(this.newsId, {
            ...body
        }).subscribe({
            next: res => {
                this.gs.log('[NEWS_EDIT_SUCCESS]', res);
                this.submitted = false;
                this.bs.idle();
                this.router.navigateByUrl(`/news/${this.newsId}`);
            },
            error: err => {
                this.gs.log('[NEWS_EDIT_ERROR]', err, 'error');
                this.submitted = false;
                this.bs.idle();
            }
        });
    }
    addTag(event) {
        const input = event.input;
        const value = event.value;
        if ((value || '').trim()) {
            this.fg.value.tags.push(value.trim());
        }
        if (input) {
            input.value = '';
        }
        this.fg.controls['tags'].patchValue(this.fg.value.tags.filter((a, b, c) => c.findIndex(d => (d === a)) === b));
        this.fg.controls['tags'].markAsDirty();
    }
    removeTag(tag) {
        const index = this.fg.value.tags.indexOf(tag);
        if (index >= 0) {
            this.fg.value.tags.splice(index, 1);
        }
    }
}
NewsEditComponent.ɵfac = function NewsEditComponent_Factory(t) { return new (t || NewsEditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_2__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_3__.ImgbbService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_news_service__WEBPACK_IMPORTED_MODULE_4__.NewsService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_toast_service__WEBPACK_IMPORTED_MODULE_5__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_7__.AuthService)); };
NewsEditComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: NewsEditComponent, selectors: [["app-news-edit"]], decls: 5, vars: 1, consts: [[1, "container"], [1, "row", "px-3"], [1, "col-12"], [3, "formGroup", "submit", 4, "ngIf"], [3, "formGroup", "submit"], [1, "row", "mt-3", "mb-3"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "row"], [1, "col-12", "col-md-5", "col-xl-4", "p-3"], [1, "w-100", "border", 3, "src"], ["appearance", "outline", 1, "pt-3", "w-100", 3, "color"], [1, "w-100", 3, "disabled", "accept", "change"], ["gambar", ""], ["matSuffix", ""], [1, "px-3", "w-100"], [4, "ngIf"], ["class", "col-12", 4, "ngIf"], [1, "col-12", "col-md-7", "col-xl-8", "pt-3"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["matInput", "", "formControlName", "title", "placeholder", "Berita Terkini Blablabla ..."], ["tag", ""], ["color", "accent", "selected", "", 3, "removable", "removed", 4, "ngFor", "ngForOf"], ["placeholder", "Label Tag / Kategori", 3, "matChipInputSeparatorKeyCodes", "matChipInputFor", "matChipInputAddOnBlur", "matChipInputTokenEnd"], ["align", "end"], ["formControlName", "content", 1, "p-3", "w-100", 3, "config"], [1, "row", "gy-3"], [1, "col", "g-0"], [1, "col-12", "col-md-3"], ["mat-stroked-button", "", "routerLink", "../", 1, "w-100", 3, "disabled"], [1, "me-1"], ["type", "submit", "mat-flat-button", "", "color", "accent", 1, "w-100", 3, "disabled"], [1, "ms-1"], ["type", "button", "mat-raised-button", "", "color", "primary", 1, "w-100", 3, "disabled", "click"], ["color", "accent", "selected", "", 3, "removable", "removed"], ["matChipRemove", ""]], template: function NewsEditComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, NewsEditComponent_form_4_Template, 61, 19, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.fg);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_8__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatLabel, ngx_material_file_input__WEBPACK_IMPORTED_MODULE_15__.FileInputComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatError, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_18__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormControlName, _angular_material_chips__WEBPACK_IMPORTED_MODULE_19__.MatChipList, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_material_chips__WEBPACK_IMPORTED_MODULE_19__.MatChip, _angular_material_chips__WEBPACK_IMPORTED_MODULE_19__.MatChipRemove, _angular_material_chips__WEBPACK_IMPORTED_MODULE_19__.MatChipInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatHint, _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_20__.AngularEditorComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterLinkWithHref], pipes: [_shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_9__.BytesPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuZXdzLWVkaXQuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 38675:
/*!**************************************************************!*\
  !*** ./src/app/_pages/news/news-list/news-list.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsListComponent": () => (/* binding */ NewsListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_news_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/news.service */ 49618);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/components/material-tab/material-tab.component */ 18757);
/* harmony import */ var _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/banner-donasi/banner-donasi.component */ 19530);
/* harmony import */ var _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/banner-discord/banner-discord.component */ 49933);
/* harmony import */ var _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/components/stats-server/stats-server.component */ 8921);











class NewsListComponent {
    constructor(router, gs, bs, news, fs) {
        this.router = router;
        this.gs = gs;
        this.bs = bs;
        this.news = news;
        this.fs = fs;
        this.newsData = [];
        this.tabData = [
            {
                name: 'Semua Berita & Informasi',
                icon: 'file_copy',
                type: 'table',
                data: {
                    column: ['Tanggal', 'Image', 'Topik', 'Penulis'],
                    row: []
                }
            }
        ];
        this.count = 0;
        this.page = 1;
        this.row = 25;
        this.tablePageSizeOptions = [25, 50, 75, 100, 125];
        this.q = '';
        this.sort = '';
        this.order = '';
        this.subsNews = null;
        this.gs.bannerImg = '/assets/img/banner/news.png';
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subsNews) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getNews();
        }
    }
    getNews() {
        this.bs.busy();
        if (this.subsNews) {
            this.subsNews.unsubscribe();
            this.bs.idle();
        }
        this.subsNews = this.news.getAllNews(this.q, this.page, this.row, this.sort, this.order).subscribe({
            next: res => {
                this.gs.log('[NEWS_LIST_SUCCESS]', res);
                this.count = res.count;
                this.newsData = [];
                for (const r of res.results) {
                    this.newsData.push({
                        id: r.id,
                        Topik: r.title,
                        Image: r.image_url,
                        Tanggal: r.created_at,
                        Penulis: r.user_.username,
                        foto: r.user_.image_url
                    });
                }
                this.tabData[0].data.row = this.newsData;
                this.fs.initializeFab('add', null, 'Tambah Berita Baru', `/create/news`, false);
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[NEWS_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    openNews(data) {
        this.gs.log('[NEWS_LIST_CLICK_NEWS]', data);
        this.router.navigateByUrl(`/news/${data.id}`);
    }
    onPaginatorClicked(data) {
        this.gs.log('[NEWS_LIST_CLICK_PAGINATOR]', data);
        this.page = data.pageIndex + 1;
        this.row = data.pageSize;
        this.getNews();
    }
    onServerSideFilter(data) {
        this.gs.log('[NEWS_LIST_ENTER_FILTER]', data);
        this.q = data;
        this.getNews();
    }
    onServerSideOrder(data) {
        this.gs.log('[NEWS_LIST_CLICK_ORDER]', data);
        this.q = data.q;
        this.sort = data.active;
        this.order = data.direction;
        this.getNews();
    }
}
NewsListComponent.ɵfac = function NewsListComponent_Factory(t) { return new (t || NewsListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_news_service__WEBPACK_IMPORTED_MODULE_2__.NewsService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_3__.FabService)); };
NewsListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: NewsListComponent, selectors: [["app-news-list"]], decls: 12, vars: 4, consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-lg-8", "col-xl-9"], [1, "row"], [3, "tablePageSizeOptions", "tabData", "count", "serverSide", "tableRowClicked", "paginatorClicked", "serverSideFilter", "serverSideOrder"], [1, "col-lg-4", "col-xl-3"], [1, "row", "sticky-top"], [1, "col-12"]], template: function NewsListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "app-material-tab", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("tableRowClicked", function NewsListComponent_Template_app_material_tab_tableRowClicked_5_listener($event) { return ctx.openNews($event); })("paginatorClicked", function NewsListComponent_Template_app_material_tab_paginatorClicked_5_listener($event) { return ctx.onPaginatorClicked($event); })("serverSideFilter", function NewsListComponent_Template_app_material_tab_serverSideFilter_5_listener($event) { return ctx.onServerSideFilter($event); })("serverSideOrder", function NewsListComponent_Template_app_material_tab_serverSideOrder_5_listener($event) { return ctx.onServerSideOrder($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 5)(7, "div", 6)(8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](9, "app-banner-donasi")(10, "app-banner-discord")(11, "app-stats-server");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("tablePageSizeOptions", ctx.tablePageSizeOptions)("tabData", ctx.tabData)("count", ctx.count)("serverSide", true);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_4__.NotificationsComponent, _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_5__.MaterialTabComponent, _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_6__.BannerDonasiComponent, _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_7__.BannerDiscordComponent, _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_8__.StatsServerComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuZXdzLWxpc3QuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 6577:
/*!********************************************!*\
  !*** ./src/app/_pages/news/news.module.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsModule": () => (/* binding */ NewsModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ 26271);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/req-res.model */ 14249);
/* harmony import */ var _shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/guards/roles.guard */ 2777);
/* harmony import */ var _shared_guards_verified_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/guards/verified.guard */ 55094);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/pipes/custom-pipe.module */ 67355);
/* harmony import */ var _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/components/material-chip/material-chip.module */ 54946);
/* harmony import */ var _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/components/material-tab/material-tab.module */ 66436);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../_shared/components/stats-server/stats-server.module */ 10669);
/* harmony import */ var _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../_shared/components/banner-discord/banner-discord.module */ 54854);
/* harmony import */ var _shared_components_discussion_discussion_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../_shared/components/discussion/discussion.module */ 78764);
/* harmony import */ var _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../_shared/components/banner-donasi/banner-donasi.module */ 61838);
/* harmony import */ var _news_detail_news_detail_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./news-detail/news-detail.component */ 91341);
/* harmony import */ var _news_edit_news_edit_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./news-edit/news-edit.component */ 83899);
/* harmony import */ var _news_list_news_list_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./news-list/news-list.component */ 38675);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 3184);























const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _news_list_news_list_component__WEBPACK_IMPORTED_MODULE_15__.NewsListComponent
    },
    {
        path: ':newsId',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: _news_detail_news_detail_component__WEBPACK_IMPORTED_MODULE_13__.NewsDetailComponent
            },
            {
                path: 'edit',
                component: _news_edit_news_edit_component__WEBPACK_IMPORTED_MODULE_14__.NewsEditComponent,
                canActivate: [_shared_guards_verified_guard__WEBPACK_IMPORTED_MODULE_3__.VerifiedGuard, _shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
                data: {
                    title: 'Berita - Ubah Data',
                    description: 'Halaman Pembaharuan Data Berita',
                    keywords: 'Ubah Berita',
                    [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorVerifiedOnly]: true,
                    [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR]
                }
            }
        ]
    }
];
class NewsModule {
}
NewsModule.ɵfac = function NewsModule_Factory(t) { return new (t || NewsModule)(); };
NewsModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineNgModule"]({ type: NewsModule });
NewsModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_17__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterModule.forChild(routes),
            _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_12__.BannerDonasiModule,
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__.SharedMaterialModule,
            _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_7__.MaterialTabModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_19__.ReactiveFormsModule,
            ngx_material_file_input__WEBPACK_IMPORTED_MODULE_20__.MaterialFileInputModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__.NotificationsModule,
            _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_21__.AngularEditorModule,
            _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_10__.BannerDiscordModule,
            _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_9__.StatsServerModule,
            _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_6__.MaterialChipModule,
            _shared_components_discussion_discussion_module__WEBPACK_IMPORTED_MODULE_11__.DiscussionModule,
            _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_5__.CustomPipeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsetNgModuleScope"](NewsModule, { declarations: [_news_list_news_list_component__WEBPACK_IMPORTED_MODULE_15__.NewsListComponent,
        _news_detail_news_detail_component__WEBPACK_IMPORTED_MODULE_13__.NewsDetailComponent,
        _news_edit_news_edit_component__WEBPACK_IMPORTED_MODULE_14__.NewsEditComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterModule, _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_12__.BannerDonasiModule,
        _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__.SharedMaterialModule,
        _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_7__.MaterialTabModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_19__.ReactiveFormsModule,
        ngx_material_file_input__WEBPACK_IMPORTED_MODULE_20__.MaterialFileInputModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__.NotificationsModule,
        _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_21__.AngularEditorModule,
        _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_10__.BannerDiscordModule,
        _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_9__.StatsServerModule,
        _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_6__.MaterialChipModule,
        _shared_components_discussion_discussion_module__WEBPACK_IMPORTED_MODULE_11__.DiscussionModule,
        _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_5__.CustomPipeModule] }); })();


/***/ }),

/***/ 87623:
/*!*****************************!*\
  !*** ./src/models/warna.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WARNA": () => (/* binding */ WARNA)
/* harmony export */ });
var WARNA;
(function (WARNA) {
    WARNA["BIRU"] = "#7289DA";
    WARNA["UNGU"] = "#3F51B5";
    WARNA["HITAM"] = "#343A40";
    WARNA["ABU"] = "#A9A9A9";
    WARNA["MERAH"] = "#DC3545";
    WARNA["PINK"] = "#FF4081";
    WARNA["OREN"] = "#F44336";
    WARNA["KUNING"] = "#FFC107";
    WARNA["HIJAU"] = "#28A745";
})(WARNA || (WARNA = {}));


/***/ })

}]);
//# sourceMappingURL=src_app__pages_news_news_module_ts.js.map