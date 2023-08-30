"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_home_home_module_ts"],{

/***/ 63041:
/*!***********************************************!*\
  !*** ./src/app/_pages/home/home.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeComponent": () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_left_menu_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/services/left-menu.service */ 70007);
/* harmony import */ var _shared_services_news_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/services/news.service */ 49618);
/* harmony import */ var _shared_services_komentar_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/services/komentar.service */ 47559);
/* harmony import */ var _shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/services/fansub.service */ 76781);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/services/winbox.service */ 88020);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_shared/services/fab.service */ 96382);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_no_data_no_data_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../_shared/components/no-data/no-data.component */ 40192);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/card */ 11961);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../_shared/components/banner-donasi/banner-donasi.component */ 19530);
/* harmony import */ var _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../_shared/components/banner-discord/banner-discord.component */ 49933);
/* harmony import */ var _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../_shared/components/stats-server/stats-server.component */ 8921);
/* harmony import */ var _shared_pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../_shared/pipes/date-ago.pipe */ 86766);
























function HomeComponent_a_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "a", 30)(1, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
} if (rf & 2) {
    const menu_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("routerLink", menu_r5.link);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](menu_r5.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", menu_r5.name, " ");
} }
function HomeComponent_app_no_data_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](0, "app-no-data", 32);
} }
function HomeComponent_div_46_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 35)(1, "mat-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "img", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "mat-card-content", 37)(4, "h3", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](6, "mat-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](7, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "mat-card-title", 40)(9, "h3", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](11, "mat-card-subtitle", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](13, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const n_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate1"]("routerLink", "/news/", n_r7.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("src", n_r7.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate1"]("routerLink", "/news/", n_r7.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", n_r7.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵstyleProp"]("background-image", "url(" + n_r7.user_.image_url + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate1"]("routerLink", "/user/", n_r7.user_.username, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](n_r7.user_.username);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind2"](13, 9, n_r7.created_at, "d MMMM y, HH:mm:ss z"));
} }
function HomeComponent_div_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 24)(1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, HomeComponent_div_46_div_2_Template, 14, 12, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](3, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind3"](3, 1, ctx_r2.newsData, 0, ctx_r2.GS.gridListBreakpoint === 3 ? 2 : ctx_r2.GS.gridListBreakpoint));
} }
function HomeComponent_div_47_mat_list_option_9_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-list-option", 46)(1, "mat-icon", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2, "rss_feed");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "a", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function HomeComponent_div_47_mat_list_option_9_Template_a_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r11); const r_r9 = restoredCtx.$implicit; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2); return ctx_r10.openRssFeed(r_r9.item == null ? null : r_r9.item.link); });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](5, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](7, "dateAgo");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](10, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const r_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind2"](5, 4, (r_r9.item == null ? null : r_r9.item.created) || (r_r9.item == null ? null : r_r9.item.published), "d MMMM y, hh:mm:ss a z"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](7, 7, (r_r9.item == null ? null : r_r9.item.created) || (r_r9.item == null ? null : r_r9.item.published)), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](r_r9.slug);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("innerHtml", r_r9.item == null ? null : r_r9.item.title, _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsanitizeHtml"]);
} }
function HomeComponent_div_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 1)(1, "div", 20)(2, "h2", 21)(3, "a", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](4, " Lainnya ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "b", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](6, " RSS Feed Fansub Aktif ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "div", 24)(8, "mat-selection-list", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](9, HomeComponent_div_47_mat_list_option_9_Template, 11, 9, "mat-list-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](10, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind3"](10, 2, ctx_r3.rssFeedData, 0, 10));
} }
function HomeComponent_div_48_mat_list_option_9_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "mat-list-option", 46)(1, "mat-icon", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2, "add_comment");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](3, "a", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function HomeComponent_div_48_mat_list_option_9_Template_a_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r15); const k_r13 = restoredCtx.$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2); return ctx_r14.openComment(k_r13); });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](5, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](7, "dateAgo");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](10, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const k_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind2"](5, 4, k_r13.created_at, "d MMMM y, hh:mm:ss a z"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](7, 7, k_r13.created_at), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](k_r13.user_.username);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](k_r13.comment);
} }
function HomeComponent_div_48_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 1)(1, "div", 20)(2, "h2", 21)(3, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function HomeComponent_div_48_Template_span_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](); return ctx_r16.getComment(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](4, " Refresh ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "b", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](6, "Komentar Terbaru");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "div", 24)(8, "mat-selection-list", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](9, HomeComponent_div_48_mat_list_option_9_Template, 12, 9, "mat-list-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](10, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind3"](10, 2, ctx_r4.komentarData, 0, 5));
} }
class HomeComponent {
    constructor(router, gs, lms, news, komen, fansub, bs, wb, fs) {
        this.router = router;
        this.gs = gs;
        this.lms = lms;
        this.news = news;
        this.komen = komen;
        this.fansub = fansub;
        this.bs = bs;
        this.wb = wb;
        this.fs = fs;
        this.newsData = [];
        this.komentarData = [];
        this.rssFeedData = [];
        this.subsNews = null;
        this.subsKomenGet = null;
        this.subsRssFeed = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get ENV() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    get GS() {
        return this.gs;
    }
    get contentMenus() {
        return this.lms.contentMenus;
    }
    ngOnDestroy() {
        var _a, _b, _c;
        (_a = this.subsNews) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsKomenGet) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsRssFeed) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getNews();
            this.getComment();
            this.getRssFeedAll();
            this.fs.initializeFab(null, '/assets/img/discord/pink.png', 'Discord Server', _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.discord.join_url, true);
        }
    }
    getNews() {
        this.bs.busy();
        this.subsNews = this.news.getAllNews('', 1, 3).subscribe({
            next: res => {
                this.gs.log('[HOME_NEWS_LIST_SUCCESS]', res);
                this.newsData = res.results;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[HOME_NEWS_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getComment() {
        this.bs.busy();
        this.subsKomenGet = this.komen.getAllComment().subscribe({
            next: res => {
                this.gs.log('[HOME_KOMENTAR_LIST_SUCCESS]', res);
                this.komentarData = res.results;
                for (const k of this.komentarData) {
                    k.comment = this.gs.htmlToText(k.comment);
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[HOME_KOMENTAR_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getRssFeedAll() {
        this.bs.busy();
        this.subsRssFeed = this.fansub.getRssFeedFansubAllActiveOnly().subscribe({
            next: res => {
                this.gs.log('[HOME_RSS_FEED_LIST_SUCCESS]', res);
                this.rssFeedData = res.results;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[HOME_RSS_FEED_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    openRssFeed(link) {
        this.wb.winboxOpenUri(this.gs.rssLink(link));
    }
    openComment(k) {
        this.router.navigate([k.path], {
            queryParams: {
                comment: k.id
            }
        });
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_16__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_shared_services_left_menu_service__WEBPACK_IMPORTED_MODULE_2__.LeftMenuService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_shared_services_news_service__WEBPACK_IMPORTED_MODULE_3__.NewsService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_shared_services_komentar_service__WEBPACK_IMPORTED_MODULE_4__.KomentarService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_5__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_6__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_7__.WinboxService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_8__.FabService)); };
HomeComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 55, vars: 7, consts: [[1, "container"], [1, "row"], [1, "col-12", "align-items-center"], [1, "text-center", "my-3", "mx-auto"], [1, "p-5", 3, "src"], [1, "h3", "font-weight-normal", "gradient-text"], [1, "text-warning", "pt-3"], [1, "col-12", "col-lg-8", "mx-auto"], ["matTooltip", "Khusus Berkas Yang Upload DDL", 1, "text-success"], [1, "row", "pb-3"], ["class", "m-1", "mat-stroked-button", "", "color", "warn", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "row", "mb-3"], [1, "mouse_scroll"], [1, "mouse"], [1, "wheel"], [1, "m_scroll_arrows", "unu"], [1, "m_scroll_arrows", "doi"], [1, "m_scroll_arrows", "trei"], [1, "row", "pb-3", "px-0"], [1, "col-lg-8", "col-xl-9"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], ["routerLink", "/news", 1, "float-end", "text-decoration-none", "text-warning", 2, "font-size", "small"], [1, "text-bifeldy"], [1, "col-12"], ["class", "col-12 p-3", 4, "ngIf"], ["class", "col-12", 4, "ngIf"], ["class", "row", 4, "ngIf"], [1, "col-lg-4", "col-xl-3"], [1, "row", "sticky-top"], ["mat-stroked-button", "", "color", "warn", 1, "m-1", 3, "routerLink"], [1, "me-1"], [1, "col-12", "p-3"], [1, "row", "px-3"], ["class", "col-12 col-md-6 col-xl-4 p-2", 4, "ngFor", "ngForOf"], [1, "col-12", "col-md-6", "col-xl-4", "p-2"], ["mat-card-image", "", 2, "height", "128px", "object-fit", "cover", "cursor", "pointer", 3, "src", "routerLink"], [2, "cursor", "pointer", 3, "routerLink"], ["matLine", "", 2, "text-overflow", "ellipsis", "overflow", "hidden", "white-space", "nowrap"], ["mat-card-avatar", "", 2, "background-size", "cover", "border-radius", "0"], [1, "text-warning", "mb-1", 2, "cursor", "pointer", 3, "routerLink"], [1, "mb-0"], ["routerLink", "/rss-feed", 1, "float-end", "text-decoration-none", "text-warning", 2, "font-size", "small"], ["matTooltip", "Diperbaharui Beberapa Menit Sekali", 1, "text-bifeldy"], [3, "multiple"], ["class", "h-100", 4, "ngFor", "ngForOf"], [1, "h-100"], ["mat-list-icon", "", 1, "ps-3"], [1, "text-truncate", "text-decoration-none", 3, "click"], [1, "bg-bifeldy", "px-2", "me-1", "text-danger", 2, "position", "absolute", "right", "0", 3, "matTooltip"], [1, "me-3", "text-success"], [1, "text-warning", 3, "innerHtml"], [1, "float-end", "text-warning", 2, "font-size", "small", "cursor", "pointer", 3, "click"], [1, "text-warning"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "h1", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "h2", 6)(8, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](9, " Tempat berbagi (+ ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](10, "i");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](11, "backup");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](12, ") dan melacak sekaligus mengabadikan berkas proyek garapan animasi maupun film drama dari, oleh, untuk siapa saja. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](13, "h3", 8)(14, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](15, " * Tempat arsip abadi :: Anti ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](16, "i")(17, "u");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](18, "link");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](19, " mati ~ ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](20, "div", 9)(21, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](22, HomeComponent_a_22_Template, 4, 3, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](23, "div", 11)(24, "div", 2)(25, "div", 12)(26, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](27, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](28, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](29, "span", 15)(30, "span", 16)(31, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](32, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](33, "div", 0)(34, "div", 18)(35, "div", 19)(36, "div", 1)(37, "div", 20)(38, "h2", 21)(39, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](40, " Selengkapnya ");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](41, "b", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](42, "Papan Pengumuman");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](43, "div", 24)(44, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](45, HomeComponent_app_no_data_45_Template, 1, 0, "app-no-data", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](46, HomeComponent_div_46_Template, 4, 5, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](47, HomeComponent_div_47_Template, 11, 6, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](48, HomeComponent_div_48_Template, 11, 6, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](49, "div", 28)(50, "div", 29)(51, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](52, "app-banner-donasi")(53, "app-banner-discord")(54, "app-stats-server");
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpropertyInterpolate1"]("src", "", ctx.ENV.baseUrl, "/assets/img/favicon.png", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](ctx.ENV.siteName);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngForOf", ctx.contentMenus);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.newsData.length <= 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.newsData.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.rssFeedData.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.komentarData.length > 0);
    } }, directives: [_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__.MatTooltip, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgForOf, _angular_material_button__WEBPACK_IMPORTED_MODULE_19__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterLinkWithHref, _angular_material_icon__WEBPACK_IMPORTED_MODULE_20__.MatIcon, _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_9__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgIf, _shared_components_no_data_no_data_component__WEBPACK_IMPORTED_MODULE_10__.NoDataComponent, _angular_material_card__WEBPACK_IMPORTED_MODULE_21__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_21__.MatCardImage, _angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterLink, _angular_material_card__WEBPACK_IMPORTED_MODULE_21__.MatCardContent, _angular_material_core__WEBPACK_IMPORTED_MODULE_22__.MatLine, _angular_material_card__WEBPACK_IMPORTED_MODULE_21__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_21__.MatCardAvatar, _angular_material_card__WEBPACK_IMPORTED_MODULE_21__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_21__.MatCardSubtitle, _angular_material_list__WEBPACK_IMPORTED_MODULE_23__.MatSelectionList, _angular_material_list__WEBPACK_IMPORTED_MODULE_23__.MatListOption, _angular_material_list__WEBPACK_IMPORTED_MODULE_23__.MatListIconCssMatStyler, _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_11__.BannerDonasiComponent, _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_12__.BannerDiscordComponent, _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_13__.StatsServerComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_18__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_18__.DatePipe, _shared_pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_14__.DateAgoPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 27379:
/*!********************************************!*\
  !*** ./src/app/_pages/home/home.module.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomeModule": () => (/* binding */ HomeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/pipes/custom-pipe.module */ 67355);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/components/stats-server/stats-server.module */ 10669);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/components/banner-discord/banner-discord.module */ 54854);
/* harmony import */ var _shared_components_banner_nihongo_banner_nihongo_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/components/banner-nihongo/banner-nihongo.module */ 50913);
/* harmony import */ var _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/components/banner-donasi/banner-donasi.module */ 61838);
/* harmony import */ var _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/components/no-data/no-data.module */ 12438);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./home.component */ 63041);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);













const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _home_component__WEBPACK_IMPORTED_MODULE_8__.HomeComponent
    }
];
class HomeModule {
}
HomeModule.ɵfac = function HomeModule_Factory(t) { return new (t || HomeModule)(); };
HomeModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: HomeModule });
HomeModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule.forChild(routes),
            _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_6__.BannerDonasiModule,
            _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_4__.BannerDiscordModule,
            _shared_components_banner_nihongo_banner_nihongo_module__WEBPACK_IMPORTED_MODULE_5__.BannerNihongoModule,
            _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_2__.StatsServerModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_1__.NotificationsModule,
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_3__.SharedMaterialModule,
            _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_0__.CustomPipeModule,
            _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_7__.NoDataModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](HomeModule, { declarations: [_home_component__WEBPACK_IMPORTED_MODULE_8__.HomeComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterModule, _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_6__.BannerDonasiModule,
        _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_4__.BannerDiscordModule,
        _shared_components_banner_nihongo_banner_nihongo_module__WEBPACK_IMPORTED_MODULE_5__.BannerNihongoModule,
        _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_2__.StatsServerModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_1__.NotificationsModule,
        _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_3__.SharedMaterialModule,
        _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_0__.CustomPipeModule,
        _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_7__.NoDataModule] }); })();


/***/ }),

/***/ 8616:
/*!*****************************************************************************!*\
  !*** ./src/app/_shared/components/notifications/notifications.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 47559:
/*!******************************************************!*\
  !*** ./src/app/_shared/services/komentar.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KomentarService": () => (/* binding */ KomentarService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class KomentarService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    getAllComment(q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/comment?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getComment(path = '', q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/comment?path=${path}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getReply(parentId, q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/comment/${parentId}?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    sendComment(commentData) {
        return this.api.postData(`/comment`, commentData);
    }
    getHighlight(commentData) {
        return this.api.patchData(`/comment`, commentData);
    }
    deleteComment(commentId) {
        return this.api.deleteData(`/comment/${commentId}`);
    }
}
KomentarService.ɵfac = function KomentarService_Factory(t) { return new (t || KomentarService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
KomentarService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: KomentarService, factory: KomentarService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=src_app__pages_home_home_module_ts.js.map