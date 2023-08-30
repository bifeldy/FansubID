"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_dorama_dorama_module_ts"],{

/***/ 94983:
/*!************************************************************************!*\
  !*** ./src/app/_pages/dorama/dorama-detail/dorama-detail.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DoramaDetailComponent": () => (/* binding */ DoramaDetailComponent)
/* harmony export */ });
/* harmony import */ var _models_warna__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/warna */ 87623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_dorama_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/dorama.service */ 18439);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_berkas_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/berkas.service */ 8987);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _shared_components_material_chip_material_chip_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/material-chip/material-chip.component */ 24028);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_material_expansion_panel_material_expansion_panel_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/components/material-expansion-panel/material-expansion-panel.component */ 97567);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/components/material-tab/material-tab.component */ 18757);

















function DoramaDetailComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "h1", 6)(6, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "div", 7)(9, "app-material-chip", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("chipClicked", function DoramaDetailComponent_div_0_Template_app_material_chip_chipClicked_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r1.openGenre($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "app-notifications", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](13, "app-material-expansion-panel", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "div", 12)(15, "div", 13)(16, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](17, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](18, "div", 16)(19, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function DoramaDetailComponent_div_0_Template_button_click_19_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r3.openSeasonalDorama(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](20, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](21, "dynamic_feed");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](23, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](24, "star_half");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](26, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](27, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](28, "date_range");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](30, "div", 16)(31, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function DoramaDetailComponent_div_0_Template_button_click_31_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r2); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r4.openRank(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](32, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](33, "timeline");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](35, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](36, "local_fire_department");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](38, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](39, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](40, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](42, "div", 9)(43, "div", 20)(44, "app-material-tab", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("gridClicked", function DoramaDetailComponent_div_0_Template_app_material_tab_gridClicked_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r2); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r5.openFansub($event); })("tableRowClicked", function DoramaDetailComponent_div_0_Template_app_material_tab_tableRowClicked_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r2); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r6.openFile($event); })("paginatorClicked", function DoramaDetailComponent_div_0_Template_app_material_tab_paginatorClicked_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r2); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r7.onPaginatorClicked($event); })("serverSideFilter", function DoramaDetailComponent_div_0_Template_app_material_tab_serverSideFilter_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r2); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r8.onServerSideFilter($event); })("serverSideOrder", function DoramaDetailComponent_div_0_Template_app_material_tab_serverSideOrder_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r2); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r9.onServerSideOrder($event); })("gridLoadNextPage", function DoramaDetailComponent_div_0_Template_app_material_tab_gridLoadNextPage_44_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r2); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r10.onFansubLoadNextPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](45, "div", 22)(46, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"]((ctx_r0.doramaData.others == null ? null : ctx_r0.doramaData.others.native_title) || ctx_r0.doramaData.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("chipData", ctx_r0.chipData);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("panelData", ctx_r0.panelData);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", ctx_r0.doramaData.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate2"]("matTooltip", "Lihat Semua Dorama Pada Musim '", ctx_r0.seasonDorama, " ", (ctx_r0.yearDorama == null ? null : ctx_r0.yearDorama.getFullYear()) || "", "'");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ((ctx_r0.doramaData.details == null ? null : ctx_r0.doramaData.details.type) === "Movie" ? "1" : ctx_r0.doramaData.details == null ? null : ctx_r0.doramaData.details.episodes) || "?", " Eps \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r0.doramaData.rating || "?", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", (ctx_r0.doramaData.details == null ? null : ctx_r0.doramaData.details.release_date) || (ctx_r0.doramaData.details == null ? null : ctx_r0.doramaData.details.aired) || "?", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", (ctx_r0.doramaData.details == null ? null : ctx_r0.doramaData.details.ranked) || "?", " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", (ctx_r0.doramaData.details == null ? null : ctx_r0.doramaData.details.popularity) || "?", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", (ctx_r0.doramaData.details == null ? null : ctx_r0.doramaData.details.type) || "?", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("tabData", ctx_r0.tabData)("count", ctx_r0.count)("serverSide", true)("gridPageFinished", ctx_r0.fansubPageFinished);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("background-image", "url(" + ctx_r0.doramaData.image_url + ")");
} }
class DoramaDetailComponent {
    constructor(router, activatedRoute, gs, bs, pi, dorama, fs, berkas) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.gs = gs;
        this.bs = bs;
        this.pi = pi;
        this.dorama = dorama;
        this.fs = fs;
        this.berkas = berkas;
        this.doramaId = '';
        this.doramaData = null;
        this.count = 0;
        this.page = 1;
        this.row = 10;
        this.q = '';
        this.sort = '';
        this.order = '';
        this.fansubDorama = [];
        this.berkasDorama = [];
        this.allBerkasDoramaId = [];
        this.fansubPageFinished = false;
        this.fansubPage = 1;
        this.chipData = [];
        this.panelData = [];
        this.tabData = [
            {
                name: 'Daftar Fansub',
                icon: 'closed_caption',
                type: 'grid',
                data: []
            },
            {
                name: 'Berkas Terkait',
                icon: 'file_copy',
                type: 'table',
                data: {
                    column: ['Proyek', /* 'Image', */ 'Nama Berkas', 'Tanggal', 'Pemilik'],
                    row: []
                }
            }
        ];
        this.subsDorama = null;
        this.subsBerkas = null;
        this.subsFansub = null;
        this.subsParam = null;
        this.subsTrusted = null;
        this.gs.bannerImg = null;
        this.gs.bgRepeat = true;
        this.gs.sizeContain = true;
    }
    ngOnDestroy() {
        var _a, _b, _c, _d, _e;
        (_a = this.subsDorama) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsBerkas) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsFansub) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsParam) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.subsTrusted) === null || _e === void 0 ? void 0 : _e.unsubscribe();
    }
    ngOnInit() {
        this.subsParam = this.activatedRoute.params.subscribe({
            next: p => {
                const paramDoramaId = p['doramaId'];
                this.doramaId = paramDoramaId.split('-')[0];
                this.bs.busy();
                this.subsDorama = this.dorama.getDorama(paramDoramaId).subscribe({
                    next: res => {
                        var _a, _b, _c, _d;
                        this.gs.log('[DORAMA_DETAIL_SUCCESS]', res);
                        this.doramaData = res.result;
                        this.doramaData.image_url = this.doramaData.poster;
                        this.pi.updatePageMetaData(`${this.doramaData.title}`, `${this.doramaData.synopsis}`, `${((_b = (_a = this.doramaData) === null || _a === void 0 ? void 0 : _a.others) === null || _b === void 0 ? void 0 : _b.tags) ? (_d = (_c = this.doramaData) === null || _c === void 0 ? void 0 : _c.others) === null || _d === void 0 ? void 0 : _d.tags.join(', ') : this.doramaData.title}`, this.doramaData.image_url);
                        this.bs.idle();
                        if (this.gs.isBrowser) {
                            if ('others' in this.doramaData) {
                                const genres = this.doramaData.others.genres;
                                for (const g of genres) {
                                    this.chipData.push({
                                        name: g,
                                        selected: true,
                                        color: _models_warna__WEBPACK_IMPORTED_MODULE_0__.WARNA.PINK
                                    });
                                }
                            }
                            this.panelData = [];
                            this.panelData.push({
                                title: 'Ringkasan Cerita',
                                icon: 'history_edu',
                                text: this.doramaData.synopsis,
                                tooltip: `Alih Bahasa Oleh 'Google Translate' 😘`
                            });
                            this.fs.initializeFab(null, '/assets/img/logo/mdl.png', 'Buka Di MyDramaList', `https://mydramalist.com/${this.router.url.split('?')[0].split('/')[this.router.url.split('?')[0].split('/').length - 1]}`, true);
                            this.getFansubDorama();
                            this.getBerkasDorama();
                        }
                    },
                    error: err => {
                        this.gs.log('[DORAMA_DETAIL_ERROR]', err, 'error');
                        this.bs.idle();
                        this.router.navigate(['/error'], {
                            queryParams: {
                                returnUrl: '/dorama'
                            }
                        });
                    }
                });
            }
        });
    }
    openRank() {
        // window.open(`https://myanimelist.net/topanime.php?limit=${this.animeData.rank - 1}`, '_blank');
    }
    get yearDorama() {
        var _a, _b, _c, _d, _e, _f;
        if ('release_date' in ((_a = this.doramaData) === null || _a === void 0 ? void 0 : _a.details)) {
            return new Date((_c = (_b = this.doramaData) === null || _b === void 0 ? void 0 : _b.details) === null || _c === void 0 ? void 0 : _c.release_date) || null;
        }
        return new Date((_f = (_e = (_d = this.doramaData) === null || _d === void 0 ? void 0 : _d.details) === null || _e === void 0 ? void 0 : _e.aired) === null || _f === void 0 ? void 0 : _f.split(' - ')[0]) || null;
    }
    get seasonDorama() {
        var _a;
        return ((_a = this.gs.seasonalWeather.find(sB => { var _a; return sB.id === Math.ceil((((_a = this.yearDorama) === null || _a === void 0 ? void 0 : _a.getMonth()) + 1) / 3); })) === null || _a === void 0 ? void 0 : _a.name) || null;
    }
    openSeasonalDorama() {
        var _a;
        this.router.navigate(['/dorama'], {
            queryParams: {
                season: this.seasonDorama,
                year: (_a = this.yearDorama) === null || _a === void 0 ? void 0 : _a.getFullYear()
            }
        });
    }
    onServerSideFilter(data) {
        this.gs.log('[BERKAS_DORAMA_ENTER_FILTER]', data);
        this.q = data;
        this.getBerkasDorama();
    }
    onServerSideOrder(data) {
        this.gs.log('[BERKAS_DORAMA_CLICK_ORDER]', data);
        this.q = data.q;
        this.sort = data.active;
        this.order = data.direction;
        this.getBerkasDorama();
    }
    getBerkasDorama() {
        this.bs.busy();
        if (this.subsBerkas) {
            this.subsBerkas.unsubscribe();
            this.bs.idle();
        }
        this.subsBerkas = this.dorama.getBerkasDorama([this.doramaId], this.q, this.page, this.row, this.sort, this.order).subscribe({
            next: res => {
                this.gs.log('[DORAMA_BERKAS_LIST_SUCCESS]', res);
                this.count = res.count;
                this.berkasDorama = [];
                for (const r of res.results[this.doramaId]) {
                    this.allBerkasDoramaId.push(r.id);
                    this.berkasDorama.push({
                        id: r.id,
                        private: r.private,
                        foto: r.user_.image_url,
                        Pemilik: r.user_.username,
                        Proyek: r.project_type_.name,
                        // Image: r.image_url,
                        Tanggal: r.created_at,
                        'Nama Berkas': r.name
                    });
                }
                this.tabData[1].data.row = this.berkasDorama;
                if (this.allBerkasDoramaId.length > 0) {
                    this.checkTrusted();
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[DORAMA_BERKAS_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    checkTrusted() {
        this.bs.busy();
        if (this.subsTrusted) {
            this.subsTrusted.unsubscribe();
            this.bs.idle();
        }
        this.subsTrusted = this.berkas.checkTrusted(this.allBerkasDoramaId).subscribe({
            next: res => {
                this.gs.log('[DORAMA_BERKAS_TRUSTED_SUCCESS]', res);
                for (const b of this.berkasDorama) {
                    b.trusted = res.results[b.id];
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[DORAMA_BERKAS_TRUSTED_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getFansubDorama() {
        this.bs.busy();
        this.subsFansub = this.dorama.getFansubDorama([this.doramaId], this.fansubPage).subscribe({
            next: res => {
                this.gs.log('[FANSUB_DORAMA_SUCCESS]', res);
                for (const r of res.results[this.doramaId]) {
                    this.fansubDorama.push({
                        id: r.id,
                        image: r.image_url,
                        title: r.name,
                        slug: r.slug,
                        description: `${r.slug} :: ${r.active ? 'Aktif' : 'Non-Aktif'}`
                    });
                }
                this.tabData[0].data = this.fansubDorama;
                if (res.results[this.doramaId].length <= 0) {
                    this.fansubPageFinished = true;
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[FANSUB_DORAMA_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    openGenre(data) {
        this.gs.log('[DORAMA_DETAIL_CLICK_GENRE]', data);
        // window.open(data.url, '_blank');
    }
    openFansub(data) {
        this.gs.log('[DORAMA_DETAIL_CLICK_FANSUB]', data);
        this.router.navigateByUrl(`/fansub/${data.slug}`);
    }
    onPaginatorClicked(data) {
        this.gs.log('[DORAMA_DETAIL_CLICK_PAGINATOR]', data);
        this.page = data.pageIndex + 1;
        this.row = data.pageSize;
        this.getBerkasDorama();
    }
    openFile(data) {
        this.gs.log('[DORAMA_DETAIL_CLICK_BERKAS]', data);
        this.router.navigateByUrl(`/berkas/${data.id}`);
    }
    onFansubLoadNextPage() {
        if (!this.fansubPageFinished) {
            this.fansubPage++;
            this.getFansubDorama();
        }
    }
}
DoramaDetailComponent.ɵfac = function DoramaDetailComponent_Factory(t) { return new (t || DoramaDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_3__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_dorama_service__WEBPACK_IMPORTED_MODULE_4__.DoramaService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_5__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_berkas_service__WEBPACK_IMPORTED_MODULE_6__.BerkasService)); };
DoramaDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: DoramaDetailComponent, selectors: [["app-dorama-detail"]], decls: 1, vars: 1, consts: [["class", "container", 4, "ngIf"], [1, "container"], [1, "dorama-info", "align-items-center"], [1, "row", "py-3", "px-2", "d-flex"], [1, "col-md-8", "col-xl-9", "pt-3", "order-2", "order-md-1"], [1, "row", "py-3", "px-0", "mt-auto"], [1, "m-0"], [1, "row", "py-3"], [3, "chipData", "chipClicked"], [1, "row"], [1, "px-0"], [3, "panelData"], [1, "col-md-4", "col-xl-3", "px-3", "order-1", "order-md-2"], [1, "row", "sticky-top", "pt-3"], [1, "col-12", "pt-4"], [1, "dorama-image", 3, "src"], [1, "col-12", "text-center", "pt-3"], ["type", "button", "mat-stroked-button", "", "color", "accent", 1, "w-100", 3, "matTooltip", "click"], [1, "me-1"], ["type", "button", "mat-stroked-button", "", "color", "warn", "matTooltip", "Buka Ranking Di MyDramaList", 1, "w-100", 3, "click"], [1, "col-12"], [3, "tabData", "count", "serverSide", "gridPageFinished", "gridClicked", "tableRowClicked", "paginatorClicked", "serverSideFilter", "serverSideOrder", "gridLoadNextPage"], [1, "dorama-banner", "dorama-banner-1", "align-items-center"], [1, "dorama-banner", "dorama-banner-2", "align-items-center"]], template: function DoramaDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, DoramaDetailComponent_div_0_Template, 47, 18, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.doramaData);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _shared_components_material_chip_material_chip_component__WEBPACK_IMPORTED_MODULE_7__.MaterialChipComponent, _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_8__.NotificationsComponent, _shared_components_material_expansion_panel_material_expansion_panel_component__WEBPACK_IMPORTED_MODULE_9__.MaterialExpansionPanelComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__.MatTooltip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIcon, _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_10__.MaterialTabComponent], styles: [".dorama-banner[_ngcontent-%COMP%] {\r\n  height: 128px;\r\n  width: 100%;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  filter: blur(10px) brightness(100%);\r\n  opacity: 0.5;\r\n}\r\n\r\n.dorama-banner-1[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.dorama-banner-2[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 128px;\r\n  left: 0;\r\n}\r\n\r\n.dorama-info[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  height: 256px;\r\n  z-index: 1;\r\n}\r\n\r\n.dorama-image[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvcmFtYS1kZXRhaWwuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsc0JBQXNCO0VBQ3RCLDJCQUEyQjtFQUMzQiw0QkFBNEI7RUFDNUIsbUNBQW1DO0VBQ25DLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztBQUNUOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixPQUFPO0FBQ1Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFdBQVc7QUFDYiIsImZpbGUiOiJkb3JhbWEtZGV0YWlsLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZG9yYW1hLWJhbm5lciB7XHJcbiAgaGVpZ2h0OiAxMjhweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGZpbHRlcjogYmx1cigxMHB4KSBicmlnaHRuZXNzKDEwMCUpO1xyXG4gIG9wYWNpdHk6IDAuNTtcclxufVxyXG5cclxuLmRvcmFtYS1iYW5uZXItMSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG59XHJcblxyXG4uZG9yYW1hLWJhbm5lci0yIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAxMjhweDtcclxuICBsZWZ0OiAwO1xyXG59XHJcblxyXG4uZG9yYW1hLWluZm8ge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBoZWlnaHQ6IDI1NnB4O1xyXG4gIHotaW5kZXg6IDE7XHJcbn1cclxuXHJcbi5kb3JhbWEtaW1hZ2Uge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59Il19 */"] });


/***/ }),

/***/ 7285:
/*!********************************************************************!*\
  !*** ./src/app/_pages/dorama/dorama-list/dorama-list.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DoramaListComponent": () => (/* binding */ DoramaListComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material-moment-adapter */ 8441);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _models_seasons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/seasons */ 76022);
/* harmony import */ var _shared_helpers_moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/helpers/moment */ 41139);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_dorama_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/dorama.service */ 18439);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/datepicker */ 5818);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _shared_components_card_anime_dorama_card_anime_dorama_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/card-anime-dorama/card-anime-dorama.component */ 876);
/* harmony import */ var _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/components/material-tab/material-tab.component */ 18757);






















function DoramaListComponent_mat_option_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const c_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("value", c_r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](c_r2);
} }
class DoramaListComponent {
    constructor(activatedRoute, router, bs, gs, fs, dorama) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.bs = bs;
        this.gs = gs;
        this.fs = fs;
        this.dorama = dorama;
        this.currentMonth = null;
        this.currentYear = null;
        this.selectedCountryName = '';
        this.selectedSeasonName = null;
        this.doramaCountry = [];
        this.seasonalDorama = [];
        this.seasonalDoramaCard = [];
        this.seasonalDoramaWithFansub = [];
        this.tabData = [
            {
                name: 'Info Garapan',
                icon: 'closed_caption',
                type: 'table',
                data: {
                    column: ['Jenis', 'Poster', 'Judul Dorama', 'Nama Fansub'],
                    row: []
                }
            }
        ];
        this.subsQueryParam = null;
        this.subsSeasonalDorama = null;
        this.subsFansubDorama = null;
        this.gs.bannerImg = '/assets/img/season/winter.png';
        this.gs.bgRepeat = true;
        this.gs.sizeContain = true;
    }
    ngOnDestroy() {
        var _a, _b, _c;
        (_a = this.subsQueryParam) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsSeasonalDorama) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsFansubDorama) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    }
    ngOnInit() {
        this.fg = new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormGroup({
            currentDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormControl({ value: (0,_shared_helpers_moment__WEBPACK_IMPORTED_MODULE_1__.moment)(), disabled: true }, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.Validators.required),
        });
        this.currentMonth = new Date(this.fg.value.currentDate.format()).getMonth() + 1;
        this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
        this.minDate = new Date('2011-01-01');
        this.maxDate = new Date(this.currentYear + 1, 11, 31);
        if (this.gs.isBrowser) {
            this.watchUrlRoute();
        }
    }
    watchUrlRoute() {
        this.subsQueryParam = this.activatedRoute.queryParams.subscribe({
            next: qp => {
                this.bs.busy();
                this.currentYear = qp['year'] ? (Number.isNaN(parseInt(qp['year'], 10)) ? this.currentYear : parseInt(qp['year'], 10)) : new Date().getFullYear();
                this.fg.controls['currentDate'].patchValue((0,_shared_helpers_moment__WEBPACK_IMPORTED_MODULE_1__.moment)(new Date(`${this.currentYear}-${this.currentMonth}-01`)));
                this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
                this.selectedSeasonName = qp['season'] ? ([
                    _models_seasons__WEBPACK_IMPORTED_MODULE_0__.SEASONS.WINTER,
                    _models_seasons__WEBPACK_IMPORTED_MODULE_0__.SEASONS.SPRING,
                    _models_seasons__WEBPACK_IMPORTED_MODULE_0__.SEASONS.SUMMER,
                    _models_seasons__WEBPACK_IMPORTED_MODULE_0__.SEASONS.FALL
                ].indexOf(qp['season']) >= 0 ? qp['season'] : this.findSeasonNameByMonthNumber(this.currentMonth)) : this.findSeasonNameByMonthNumber(this.currentMonth);
                this.gs.bannerImg = this.gs.seasonalWeather.find(sB => sB.name === this.selectedSeasonName).img;
                this.bs.idle();
                this.getSeasonalDorama(qp['year'] && qp['season']);
            }
        });
    }
    findSeasonNameByMonthNumber(monthNumber) {
        return this.gs.seasonalWeather.find(sB => sB.id === Math.ceil(monthNumber / 3)).name;
    }
    chosenYearHandler(normalizedYear, datepicker) {
        const ctrlValue = this.fg.value.currentDate;
        ctrlValue.year(normalizedYear.year());
        this.fg.controls['currentDate'].setValue(ctrlValue);
        this.currentMonth = new Date(this.fg.value.currentDate.format()).getMonth() + 1;
        this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
        datepicker.close();
        this.changeSeasonalDorama();
    }
    getSeasonalDorama(showFab = false) {
        this.bs.busy();
        this.subsSeasonalDorama = this.dorama.getSeasonalDorama(this.currentYear, this.selectedSeasonName).subscribe({
            next: res => {
                this.gs.log('[DORAMA_SEASONAL_SUCCESS]', res);
                this.seasonalDorama = res.results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                this.doramaCountry = [];
                for (const sD of this.seasonalDorama) {
                    sD.mdl_id = sD.id;
                    sD.image_url = sD.cover;
                    this.doramaCountry.push(sD.country);
                }
                this.doramaCountry = [...new Set(this.doramaCountry)].sort();
                if (showFab) {
                    this.fs.initializeFab('settings_backup_restore', null, 'Kembali Ke Musim Sekarang', '/dorama', false);
                }
                this.bs.idle();
                this.getFansubDorama();
            },
            error: err => {
                this.gs.log('[DORAMA_SEASONAL_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getFansubDorama() {
        this.bs.busy();
        this.tabData[0].data.row = [];
        const seasonalDoramaListId = [];
        for (const sD of this.seasonalDorama) {
            seasonalDoramaListId.push(sD.mdl_id);
        }
        this.subsFansubDorama = this.dorama.getFansubDorama(seasonalDoramaListId).subscribe({
            next: res => {
                this.gs.log('[FANSUB_DORAMA_SUCCESS]', res);
                this.seasonalDoramaWithFansub = [];
                for (const sD of this.seasonalDorama) {
                    sD.namaFansubs = res.results[sD.mdl_id];
                    for (const f of sD.namaFansubs) {
                        f.selected = true;
                        f.type = 'chip';
                    }
                    this.seasonalDoramaWithFansub.push({
                        url: sD.url,
                        country: sD.country,
                        Jenis: `${sD.type} • ${sD.rating || 0}`,
                        Poster: sD.image_url,
                        'Judul Dorama': sD.title,
                        'Nama Fansub': sD.namaFansubs,
                    });
                }
                this.seasonalDoramaWithFansub = this.seasonalDoramaWithFansub.sort((a, b) => b['Nama Fansub'].length - a['Nama Fansub'].length);
                this.bs.idle();
                this.changeCountryDorama();
            },
            error: err => {
                this.gs.log('[FANSUB_DORAMA_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    changeSeasonalDorama() {
        this.router.navigate(['/dorama'], {
            queryParams: {
                season: this.selectedSeasonName,
                year: this.currentYear
            }
        });
    }
    changeCountryDorama() {
        this.tabData[0].data.row = this.seasonalDoramaWithFansub.filter(x => x.country.includes(this.selectedCountryName));
        this.seasonalDoramaCard = this.seasonalDorama.filter(x => x.country.includes(this.selectedCountryName));
    }
    openDoramaPage(data) {
        this.gs.log('[DORAMA_SEASONAL_CLICK_DORAMA]', data);
        this.router.navigateByUrl(`/dorama/${data.url.replace(/[^a-zA-Z0-9\-]/g, '')}`);
    }
    openFansub(data) {
        this.gs.log('[DORAMA_SEASONAL_CLICK_FANSUB]', data);
        this.router.navigateByUrl(`/fansub/${data.slug}`);
    }
}
DoramaListComponent.ɵfac = function DoramaListComponent_Factory(t) { return new (t || DoramaListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_4__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_dorama_service__WEBPACK_IMPORTED_MODULE_5__.DoramaService)); };
DoramaListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: DoramaListComponent, selectors: [["app-dorama-list"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵProvidersFeature"]([
            { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.DateAdapter, useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__.MomentDateAdapter, deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MAT_DATE_LOCALE, _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_13__.MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
            { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MAT_DATE_FORMATS, useValue: _shared_helpers_moment__WEBPACK_IMPORTED_MODULE_1__.MY_FORMATS },
        ])], decls: 39, vars: 12, consts: [[1, "container"], [1, "row", "pb-3"], [1, "col-12"], [1, "row"], [1, "col-12", "pb-3", "sticky-top", "bg-bifeldy", 3, "formGroup"], [1, "m-0", "border-bottom", "border-primary", "row"], [1, "pt-3", "col-4", "col-lg-2", 3, "color"], [3, "value", "valueChange"], ["value", "winter"], ["value", "spring"], ["value", "summer"], ["value", "fall"], [1, "pt-3", "col-4", "col-lg-2"], ["matInput", "", "formControlName", "currentDate", 3, "matDatepicker", "min", "max"], ["matSuffix", "", 1, "shiny", 3, "for"], ["matDatepickerToggleIcon", "", 1, "animate__animated", "animate__swing", "animate__infinite", "animate__slower"], ["startView", "multi-year", "disabled", "false", 3, "yearSelected"], ["picker", ""], [1, "ms-auto", "pt-3", "col-4", "col-lg-2", 3, "color"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [3, "animeDoramaData", "cardClicked"], [1, "row", "pt-3"], [3, "tabData", "chipClicked", "tableRowClicked"], [3, "value"]], template: function DoramaListComponent_Template(rf, ctx) { if (rf & 1) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "h3", 5)(7, "mat-form-field", 6)(8, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](9, "Tema Musim");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "mat-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function DoramaListComponent_Template_mat_select_valueChange_10_listener($event) { return ctx.selectedSeasonName = $event; })("valueChange", function DoramaListComponent_Template_mat_select_valueChange_10_listener() { return ctx.changeSeasonalDorama(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "mat-option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](12, "Winter");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "mat-option", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](14, "Spring");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "mat-option", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16, "Summer");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "mat-option", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18, "Fall");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "mat-form-field", 12)(20, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](21, "Tahun");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](22, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "mat-datepicker-toggle", 14)(24, "mat-icon", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](25, "today");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](26, "mat-datepicker", 16, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("yearSelected", function DoramaListComponent_Template_mat_datepicker_yearSelected_26_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r3); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](27); return ctx.chosenYearHandler($event, _r0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](28, "mat-form-field", 18)(29, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](30, "Negara");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](31, "mat-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function DoramaListComponent_Template_mat_select_valueChange_31_listener($event) { return ctx.selectedCountryName = $event; })("valueChange", function DoramaListComponent_Template_mat_select_valueChange_31_listener() { return ctx.changeCountryDorama(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](32, "mat-option", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](33, "Semua");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](34, DoramaListComponent_mat_option_34_Template, 2, 2, "mat-option", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](35, "div", 2)(36, "app-card-anime-dorama", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("cardClicked", function DoramaListComponent_Template_app_card_anime_dorama_cardClicked_36_listener($event) { return ctx.openDoramaPage($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](37, "div", 22)(38, "app-material-tab", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("chipClicked", function DoramaListComponent_Template_app_material_tab_chipClicked_38_listener($event) { return ctx.openFansub($event); })("tableRowClicked", function DoramaListComponent_Template_app_material_tab_tableRowClicked_38_listener($event) { return ctx.openDoramaPage($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("formGroup", ctx.fg);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("color", "accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx.selectedSeasonName);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("matDatepicker", _r0)("min", ctx.minDate)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("for", _r0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("color", "accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx.selectedCountryName);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx.doramaCountry);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("animeDoramaData", ctx.seasonalDoramaCard);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("tabData", ctx.tabData);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__.NotificationsComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_15__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MatOption, _angular_material_input__WEBPACK_IMPORTED_MODULE_16__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerInput, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormControlName, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatSuffix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__.MatIcon, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerToggleIcon, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepicker, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgForOf, _shared_components_card_anime_dorama_card_anime_dorama_component__WEBPACK_IMPORTED_MODULE_7__.CardAnimeDoramaComponent, _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_8__.MaterialTabComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkb3JhbWEtbGlzdC5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 26796:
/*!************************************************!*\
  !*** ./src/app/_pages/dorama/dorama.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DoramaModule": () => (/* binding */ DoramaModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/components/material-tab/material-tab.module */ 66436);
/* harmony import */ var _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/components/material-chip/material-chip.module */ 54946);
/* harmony import */ var _shared_components_material_expansion_panel_material_expansion_panel_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/components/material-expansion-panel/material-expansion-panel.module */ 6020);
/* harmony import */ var _shared_components_card_anime_dorama_card_anime_dorama_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/components/card-anime-dorama/card-anime-dorama.module */ 42323);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _dorama_list_dorama_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dorama-list/dorama-list.component */ 7285);
/* harmony import */ var _dorama_detail_dorama_detail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dorama-detail/dorama-detail.component */ 94983);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);













const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _dorama_list_dorama_list_component__WEBPACK_IMPORTED_MODULE_6__.DoramaListComponent
    },
    {
        path: ':doramaId',
        component: _dorama_detail_dorama_detail_component__WEBPACK_IMPORTED_MODULE_7__.DoramaDetailComponent
    }
];
class DoramaModule {
}
DoramaModule.ɵfac = function DoramaModule_Factory(t) { return new (t || DoramaModule)(); };
DoramaModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: DoramaModule });
DoramaModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule.forChild(routes),
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule,
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
            _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_1__.MaterialTabModule,
            _shared_components_material_expansion_panel_material_expansion_panel_module__WEBPACK_IMPORTED_MODULE_3__.MaterialExpansionPanelModule,
            _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_2__.MaterialChipModule,
            _shared_components_card_anime_dorama_card_anime_dorama_module__WEBPACK_IMPORTED_MODULE_4__.CardAnimeDoramaModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_5__.NotificationsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](DoramaModule, { declarations: [_dorama_list_dorama_list_component__WEBPACK_IMPORTED_MODULE_6__.DoramaListComponent,
        _dorama_detail_dorama_detail_component__WEBPACK_IMPORTED_MODULE_7__.DoramaDetailComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule,
        _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
        _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_1__.MaterialTabModule,
        _shared_components_material_expansion_panel_material_expansion_panel_module__WEBPACK_IMPORTED_MODULE_3__.MaterialExpansionPanelModule,
        _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_2__.MaterialChipModule,
        _shared_components_card_anime_dorama_card_anime_dorama_module__WEBPACK_IMPORTED_MODULE_4__.CardAnimeDoramaModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_5__.NotificationsModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app__pages_dorama_dorama_module_ts.js.map