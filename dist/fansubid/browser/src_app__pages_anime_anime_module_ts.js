"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_anime_anime_module_ts"],{

/***/ 41886:
/*!*********************************************************************!*\
  !*** ./src/app/_pages/anime/anime-detail/anime-detail.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimeDetailComponent": () => (/* binding */ AnimeDetailComponent)
/* harmony export */ });
/* harmony import */ var _models_warna__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/warna */ 87623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_anime_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/anime.service */ 80519);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/winbox.service */ 88020);
/* harmony import */ var _shared_services_berkas_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/berkas.service */ 8987);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _shared_components_material_chip_material_chip_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/components/material-chip/material-chip.component */ 24028);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_material_expansion_panel_material_expansion_panel_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/components/material-expansion-panel/material-expansion-panel.component */ 97567);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../_shared/components/material-tab/material-tab.component */ 18757);


















function AnimeDetailComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "h1", 6)(6, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](8, "div", 7)(9, "app-material-chip", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("chipClicked", function AnimeDetailComponent_div_0_Template_app_material_chip_chipClicked_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r1.openGenre($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](10, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](11, "app-notifications", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](12, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](13, "app-material-expansion-panel", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "div", 12)(15, "div", 13)(16, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](17, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](18, "div", 16)(19, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AnimeDetailComponent_div_0_Template_button_click_19_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r3.openSeasonalAnime(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](20, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](21, "dynamic_feed");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](23, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](24, "star_half");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](26, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](27, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](28, "date_range");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](30, "div", 16)(31, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function AnimeDetailComponent_div_0_Template_button_click_31_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r2); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r4.openRank(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](32, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](33, "timeline");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](35, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](36, "local_fire_department");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](38, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](39, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](40, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](42, "div", 9)(43, "div", 20)(44, "app-material-tab", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("gridClicked", function AnimeDetailComponent_div_0_Template_app_material_tab_gridClicked_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r2); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r5.openFansub($event); })("tableRowClicked", function AnimeDetailComponent_div_0_Template_app_material_tab_tableRowClicked_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r2); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r6.openFile($event); })("paginatorClicked", function AnimeDetailComponent_div_0_Template_app_material_tab_paginatorClicked_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r2); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r7.onPaginatorClicked($event); })("serverSideFilter", function AnimeDetailComponent_div_0_Template_app_material_tab_serverSideFilter_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r2); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r8.onServerSideFilter($event); })("serverSideOrder", function AnimeDetailComponent_div_0_Template_app_material_tab_serverSideOrder_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r2); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r9.onServerSideOrder($event); })("gridLoadNextPage", function AnimeDetailComponent_div_0_Template_app_material_tab_gridLoadNextPage_44_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r2); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r10.onFansubLoadNextPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](45, "div", 22)(46, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"]((ctx_r0.animeData.alternative_titles == null ? null : ctx_r0.animeData.alternative_titles.ja) || ctx_r0.animeData.alternative_titles.en || ctx_r0.animeData.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("chipData", ctx_r0.chipData);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("panelData", ctx_r0.panelData);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("src", ctx_r0.animeData.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate2"]("matTooltip", "Lihat Semua Anime Pada Musim '", ctx_r0.SEASON, " ", ctx_r0.YEAR, "'");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ctx_r0.animeData.num_episodes || "?", " Eps \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ctx_r0.animeData.mean || "?", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", ctx_r0.animeData.start_date || "?", " \u30FC ", ctx_r0.animeData.end_date || "?", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ctx_r0.animeData.rank || "?", " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ctx_r0.animeData.popularity || "?", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", (ctx_r0.animeData.status == null ? null : ctx_r0.animeData.status.split("_").join(" ").toUpperCase()) || "?", " - ", ctx_r0.animeData.media_type == null ? null : ctx_r0.animeData.media_type.toUpperCase(), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("tabData", ctx_r0.tabData)("count", ctx_r0.count)("serverSide", true)("gridPageFinished", ctx_r0.fansubPageFinished);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵstyleProp"]("background-image", "url(" + ctx_r0.animeData.image_url + ")");
} }
class AnimeDetailComponent {
    constructor(router, activatedRoute, gs, bs, pi, anime, fs, wb, berkas) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.gs = gs;
        this.bs = bs;
        this.pi = pi;
        this.anime = anime;
        this.fs = fs;
        this.wb = wb;
        this.berkas = berkas;
        this.malDomain = 'https://myanimelist.net';
        this.animeId = '';
        this.animeData = null;
        this.count = 0;
        this.page = 1;
        this.row = 10;
        this.q = '';
        this.sort = '';
        this.order = '';
        this.fansubAnime = [];
        this.berkasAnime = [];
        this.allBerkasAnimeId = [];
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
        this.subsAnime = null;
        this.subsBerkas = null;
        this.subsFansub = null;
        this.subsParam = null;
        this.subsTrusted = null;
        this.gs.bannerImg = null;
        this.gs.bgRepeat = true;
        this.gs.sizeContain = true;
    }
    get SEASON() {
        return this.findSeasonNameByMonthNumber(new Date(this.animeData.start_date).getMonth() + 1);
    }
    get YEAR() {
        return new Date(this.animeData.start_date).getFullYear();
    }
    ngOnDestroy() {
        var _a, _b, _c, _d, _e;
        (_a = this.subsAnime) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsBerkas) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsFansub) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsParam) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.subsTrusted) === null || _e === void 0 ? void 0 : _e.unsubscribe();
    }
    ngOnInit() {
        this.subsParam = this.activatedRoute.params.subscribe({
            next: p => {
                const paramAnimeId = p['animeId'];
                this.animeId = paramAnimeId.split('-')[0];
                this.bs.busy();
                this.subsAnime = this.anime.getAnime(paramAnimeId).subscribe({
                    next: res => {
                        var _a, _b;
                        this.gs.log('[ANIME_DETAIL_SUCCESS]', res);
                        this.animeData = res.result;
                        this.pi.updatePageMetaData(`${this.animeData.title}`, `${this.animeData.synopsis}`, `${(_b = (_a = this.animeData.alternative_titles) === null || _a === void 0 ? void 0 : _a.synonyms) === null || _b === void 0 ? void 0 : _b.join(', ')}`, this.animeData.image_url);
                        this.bs.idle();
                        if (this.gs.isBrowser) {
                            const genres = this.animeData.genres;
                            for (const g of genres) {
                                this.chipData.push({
                                    id: g.id,
                                    name: g.name,
                                    selected: true,
                                    color: _models_warna__WEBPACK_IMPORTED_MODULE_0__.WARNA.PINK
                                });
                            }
                            this.panelData = [];
                            this.panelData.push({
                                title: 'Ringkasan Cerita',
                                icon: 'history_edu',
                                text: this.animeData.synopsis,
                                tooltip: `Alih Bahasa Oleh 'Google Translate' 😘`
                            });
                            this.fs.initializeFab(null, '/assets/img/logo/mal.png', 'Buka Di MyAnimeList', `${this.malDomain}/anime/${this.animeId}`, true);
                            this.getFansubAnime();
                            this.getBerkasAnime();
                        }
                    },
                    error: err => {
                        this.gs.log('[ANIME_DETAIL_ERROR]', err, 'error');
                        this.bs.idle();
                        this.router.navigate(['/error'], {
                            queryParams: {
                                returnUrl: '/anime'
                            }
                        });
                    }
                });
            }
        });
    }
    openRank() {
        this.wb.winboxOpenUri(`${this.malDomain}/topanime.php?limit=${this.animeData.rank - 1}`);
    }
    findSeasonNameByMonthNumber(monthNumber) {
        return this.gs.seasonalWeather.find(sB => sB.id === Math.ceil(monthNumber / 3)).name;
    }
    openSeasonalAnime() {
        this.router.navigate(['/anime'], {
            queryParams: {
                season: this.SEASON,
                year: this.YEAR
            }
        });
    }
    onServerSideFilter(data) {
        this.gs.log('[BERKAS_ANIME_ENTER_FILTER]', data);
        this.q = data;
        this.getBerkasAnime();
    }
    onServerSideOrder(data) {
        this.gs.log('[BERKAS_ANIME_CLICK_ORDER]', data);
        this.q = data.q;
        this.sort = data.active;
        this.order = data.direction;
        this.getBerkasAnime();
    }
    getBerkasAnime() {
        this.bs.busy();
        if (this.subsBerkas) {
            this.subsBerkas.unsubscribe();
            this.bs.idle();
        }
        this.subsBerkas = this.anime.getBerkasAnime([this.animeId], this.q, this.page, this.row, this.sort, this.order).subscribe({
            next: res => {
                this.gs.log('[ANIME_BERKAS_LIST_SUCCESS]', res);
                this.count = res.count;
                this.berkasAnime = [];
                for (const r of res.results[this.animeId]) {
                    this.allBerkasAnimeId.push(r.id);
                    this.berkasAnime.push({
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
                this.tabData[1].data.row = this.berkasAnime;
                if (this.allBerkasAnimeId.length > 0) {
                    this.checkTrusted();
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[ANIME_BERKAS_LIST_ERROR]', err, 'error');
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
        this.subsTrusted = this.berkas.checkTrusted(this.allBerkasAnimeId).subscribe({
            next: res => {
                this.gs.log('[ANIME_BERKAS_TRUSTED_SUCCESS]', res);
                for (const b of this.berkasAnime) {
                    b.trusted = res.results[b.id];
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[ANIME_BERKAS_TRUSTED_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getFansubAnime() {
        this.bs.busy();
        this.subsFansub = this.anime.getFansubAnime([this.animeId], this.fansubPage).subscribe({
            next: res => {
                this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
                for (const r of res.results[this.animeId]) {
                    this.fansubAnime.push({
                        id: r.id,
                        image: r.image_url,
                        title: r.name,
                        slug: r.slug,
                        description: `${r.slug} :: ${r.active ? 'Aktif' : 'Non-Aktif'}`
                    });
                }
                this.tabData[0].data = this.fansubAnime;
                if (res.results[this.animeId].length <= 0) {
                    this.fansubPageFinished = true;
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[FANSUB_ANIME_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    openGenre(data) {
        this.gs.log('[ANIME_DETAIL_CLICK_GENRE]', data);
        this.wb.winboxOpenUri(`${this.malDomain}/anime/genre/${data.id}`);
    }
    openFansub(data) {
        this.gs.log('[ANIME_DETAIL_CLICK_FANSUB]', data);
        this.router.navigateByUrl(`/fansub/${data.slug}`);
    }
    onPaginatorClicked(data) {
        this.gs.log('[ANIME_DETAIL_CLICK_PAGINATOR]', data);
        this.page = data.pageIndex + 1;
        this.row = data.pageSize;
        this.getBerkasAnime();
    }
    openFile(data) {
        this.gs.log('[ANIME_DETAIL_CLICK_BERKAS]', data);
        this.router.navigateByUrl(`/berkas/${data.id}`);
    }
    onFansubLoadNextPage() {
        if (!this.fansubPageFinished) {
            this.fansubPage++;
            this.getFansubAnime();
        }
    }
}
AnimeDetailComponent.ɵfac = function AnimeDetailComponent_Factory(t) { return new (t || AnimeDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_3__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_anime_service__WEBPACK_IMPORTED_MODULE_4__.AnimeService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_5__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_6__.WinboxService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_berkas_service__WEBPACK_IMPORTED_MODULE_7__.BerkasService)); };
AnimeDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({ type: AnimeDetailComponent, selectors: [["app-anime-detail"]], decls: 1, vars: 1, consts: [["class", "container", 4, "ngIf"], [1, "container"], [1, "anime-info", "align-items-center"], [1, "row", "py-3", "px-2", "d-flex"], [1, "col-md-8", "col-xl-9", "pt-3", "order-2", "order-md-1"], [1, "row", "py-3", "px-0", "mt-auto"], [1, "m-0"], [1, "row", "py-3"], [3, "chipData", "chipClicked"], [1, "row"], [1, "px-0"], [3, "panelData"], [1, "col-md-4", "col-xl-3", "px-3", "order-1", "order-md-2"], [1, "row", "sticky-top", "pt-3"], [1, "col-12", "pt-4"], [1, "anime-image", 3, "src"], [1, "col-12", "text-center", "pt-3"], ["type", "button", "mat-stroked-button", "", "color", "accent", 1, "w-100", 3, "matTooltip", "click"], [1, "me-1"], ["type", "button", "mat-stroked-button", "", "color", "warn", "matTooltip", "Buka Ranking Di MyAnimeList", 1, "w-100", 3, "click"], [1, "col-12"], [3, "tabData", "count", "serverSide", "gridPageFinished", "gridClicked", "tableRowClicked", "paginatorClicked", "serverSideFilter", "serverSideOrder", "gridLoadNextPage"], [1, "anime-banner", "anime-banner-1", "align-items-center"], [1, "anime-banner", "anime-banner-2", "align-items-center"]], template: function AnimeDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, AnimeDetailComponent_div_0_Template, 47, 20, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.animeData);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _shared_components_material_chip_material_chip_component__WEBPACK_IMPORTED_MODULE_8__.MaterialChipComponent, _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_9__.NotificationsComponent, _shared_components_material_expansion_panel_material_expansion_panel_component__WEBPACK_IMPORTED_MODULE_10__.MaterialExpansionPanelComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButton, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__.MatTooltip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__.MatIcon, _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_11__.MaterialTabComponent], styles: [".anime-banner[_ngcontent-%COMP%] {\r\n  height: 128px;\r\n  width: 100%;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  filter: blur(10px) brightness(100%);\r\n  opacity: 0.5;\r\n}\r\n\r\n.anime-banner-1[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.anime-banner-2[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 128px;\r\n  left: 0;\r\n}\r\n\r\n.anime-info[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  height: 256px;\r\n  z-index: 1;\r\n}\r\n\r\n.anime-image[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuaW1lLWRldGFpbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxzQkFBc0I7RUFDdEIsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1QixtQ0FBbUM7RUFDbkMsWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixPQUFPO0FBQ1Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLE9BQU87QUFDVDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsVUFBVTtBQUNaOztBQUVBO0VBQ0UsV0FBVztBQUNiIiwiZmlsZSI6ImFuaW1lLWRldGFpbC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFuaW1lLWJhbm5lciB7XHJcbiAgaGVpZ2h0OiAxMjhweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGZpbHRlcjogYmx1cigxMHB4KSBicmlnaHRuZXNzKDEwMCUpO1xyXG4gIG9wYWNpdHk6IDAuNTtcclxufVxyXG5cclxuLmFuaW1lLWJhbm5lci0xIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbn1cclxuXHJcbi5hbmltZS1iYW5uZXItMiB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMTI4cHg7XHJcbiAgbGVmdDogMDtcclxufVxyXG5cclxuLmFuaW1lLWluZm8ge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBoZWlnaHQ6IDI1NnB4O1xyXG4gIHotaW5kZXg6IDE7XHJcbn1cclxuXHJcbi5hbmltZS1pbWFnZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 71206:
/*!*****************************************************************!*\
  !*** ./src/app/_pages/anime/anime-list/anime-list.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimeListComponent": () => (/* binding */ AnimeListComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material-moment-adapter */ 8441);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _shared_helpers_moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_shared/helpers/moment */ 41139);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_anime_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/anime.service */ 80519);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/datepicker */ 5818);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _shared_components_card_anime_dorama_card_anime_dorama_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/card-anime-dorama/card-anime-dorama.component */ 876);
/* harmony import */ var _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/material-tab/material-tab.component */ 18757);




















class AnimeListComponent {
    constructor(activatedRoute, router, bs, gs, fs, anime) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.bs = bs;
        this.gs = gs;
        this.fs = fs;
        this.anime = anime;
        this.currentMonth = null;
        this.currentYear = null;
        this.selectedSeasonName = null;
        this.seasonalAnimeCard = [];
        this.seasonalAnime = [];
        this.tabData = [
            {
                name: 'Info Garapan',
                icon: 'closed_caption',
                type: 'table',
                data: {
                    column: ['Jenis', 'Poster', 'Judul Anime', 'Nama Fansub'],
                    row: []
                }
            }
        ];
        this.subsQueryParam = null;
        this.subsSeasonalAnime = null;
        this.subsFansubAnime = null;
        this.gs.bannerImg = '/assets/img/season/winter.png';
        this.gs.bgRepeat = true;
        this.gs.sizeContain = true;
    }
    ngOnDestroy() {
        var _a, _b, _c;
        (_a = this.subsQueryParam) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsSeasonalAnime) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsFansubAnime) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    }
    ngOnInit() {
        this.fg = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroup({
            currentDate: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl({ value: (0,_shared_helpers_moment__WEBPACK_IMPORTED_MODULE_0__.moment)(), disabled: true }, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required),
        });
        this.currentMonth = new Date(this.fg.value.currentDate.format()).getMonth() + 1;
        this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
        this.minDate = new Date('1917-01-01');
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
                this.fg.controls['currentDate'].patchValue((0,_shared_helpers_moment__WEBPACK_IMPORTED_MODULE_0__.moment)(new Date(`${this.currentYear}-${this.currentMonth}-01`)));
                this.currentYear = new Date(this.fg.value.currentDate.format()).getFullYear();
                this.selectedSeasonName = qp['season'] ? (this.gs.seasonalWeather.map(s => s.name)
                    .indexOf(qp['season']) >= 0 ? qp['season'] : this.findSeasonNameByMonthNumber(this.currentMonth)) : this.findSeasonNameByMonthNumber(this.currentMonth);
                this.gs.bannerImg = this.gs.seasonalWeather.find(sB => sB.name === this.selectedSeasonName).img;
                this.bs.idle();
                this.getSeasonalAnime(qp['year'] && qp['season']);
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
        this.changeSeasonalAnime();
    }
    getSeasonalAnime(showFab = false) {
        this.bs.busy();
        this.subsSeasonalAnime = this.anime.getSeasonalAnime(this.currentYear, this.selectedSeasonName).subscribe({
            next: res => {
                this.gs.log('[ANIME_SEASONAL_SUCCESS]', res);
                this.seasonalAnime = res.results.sort((a, b) => (b.mean || 0) - (a.mean || 0));
                if (showFab) {
                    this.fs.initializeFab('settings_backup_restore', null, 'Kembali Ke Musim Sekarang', '/anime', false);
                }
                this.bs.idle();
                this.getFansubAnime();
            },
            error: err => {
                this.gs.log('[ANIME_SEASONAL_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getFansubAnime() {
        this.bs.busy();
        this.tabData[0].data.row = [];
        const seasonalAnimeListId = [];
        for (const sA of this.seasonalAnime) {
            seasonalAnimeListId.push(sA.id);
        }
        this.subsFansubAnime = this.anime.getFansubAnime(seasonalAnimeListId).subscribe({
            next: res => {
                var _a;
                this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
                let seasonalAnimeWithFansub = [];
                for (const sA of this.seasonalAnime) {
                    sA.namaFansubs = res.results[sA.id];
                    for (const f of sA.namaFansubs) {
                        f.selected = true;
                        f.type = 'chip';
                    }
                    seasonalAnimeWithFansub.push({
                        id: sA.id,
                        Jenis: `${(_a = sA.media_type) === null || _a === void 0 ? void 0 : _a.toUpperCase()} • ${sA.mean || 0}`,
                        Poster: sA.image_url,
                        'Judul Anime': sA.title,
                        'Nama Fansub': sA.namaFansubs,
                    });
                }
                seasonalAnimeWithFansub = seasonalAnimeWithFansub.sort((a, b) => b['Nama Fansub'].length - a['Nama Fansub'].length);
                this.tabData[0].data.row = seasonalAnimeWithFansub;
                this.seasonalAnimeCard = this.seasonalAnime;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[FANSUB_ANIME_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    changeSeasonalAnime() {
        this.router.navigate(['/anime'], {
            queryParams: {
                season: this.selectedSeasonName,
                year: this.currentYear
            }
        });
    }
    openAnimePage(data) {
        this.gs.log('[ANIME_SEASONAL_CLICK_ANIME]', data);
        let judulAnime = null;
        try {
            judulAnime = data.title.replace(/[^a-zA-Z0-9]/g, '-');
        }
        catch (e) {
            judulAnime = data['Judul Anime'].replace(/[^a-zA-Z0-9]/g, '-');
        }
        this.router.navigateByUrl(`/anime/${data.id}-${judulAnime}`);
    }
    openFansub(data) {
        this.gs.log('[ANIME_SEASONAL_CLICK_FANSUB]', data);
        this.router.navigateByUrl(`/fansub/${data.slug}`);
    }
}
AnimeListComponent.ɵfac = function AnimeListComponent_Factory(t) { return new (t || AnimeListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_3__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_anime_service__WEBPACK_IMPORTED_MODULE_4__.AnimeService)); };
AnimeListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: AnimeListComponent, selectors: [["app-anime-list"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵProvidersFeature"]([
            { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.DateAdapter, useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_12__.MomentDateAdapter, deps: [_angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MAT_DATE_LOCALE, _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_12__.MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
            { provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MAT_DATE_FORMATS, useValue: _shared_helpers_moment__WEBPACK_IMPORTED_MODULE_0__.MY_FORMATS },
        ])], decls: 32, vars: 9, consts: [[1, "container"], [1, "row", "pb-3"], [1, "col-12"], [1, "row"], [1, "col-12", "pb-3", "sticky-top", "bg-bifeldy", 3, "formGroup"], [1, "m-0", "border-bottom", "border-primary", "row"], [1, "pt-3", "col-6", "col-md-4", "col-lg-2", 3, "color"], [3, "value", "valueChange"], ["value", "winter"], ["value", "spring"], ["value", "summer"], ["value", "fall"], [1, "pt-3", "col-6", "col-md-4", "col-lg-2"], ["matInput", "", "formControlName", "currentDate", 3, "matDatepicker", "min", "max"], ["matSuffix", "", 1, "shiny", 3, "for"], ["matDatepickerToggleIcon", "", 1, "animate__animated", "animate__swing", "animate__infinite", "animate__slower"], ["startView", "multi-year", "disabled", "false", 3, "yearSelected"], ["picker", ""], [3, "animeDoramaData", "cardClicked"], [1, "row", "pt-3"], [3, "tabData", "chipClicked", "tableRowClicked"]], template: function AnimeListComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "h3", 5)(7, "mat-form-field", 6)(8, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](9, "Tema Musim");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "mat-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function AnimeListComponent_Template_mat_select_valueChange_10_listener($event) { return ctx.selectedSeasonName = $event; })("valueChange", function AnimeListComponent_Template_mat_select_valueChange_10_listener() { return ctx.changeSeasonalAnime(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("yearSelected", function AnimeListComponent_Template_mat_datepicker_yearSelected_26_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r1); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](27); return ctx.chosenYearHandler($event, _r0); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](28, "div", 2)(29, "app-card-anime-dorama", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("cardClicked", function AnimeListComponent_Template_app_card_anime_dorama_cardClicked_29_listener($event) { return ctx.openAnimePage($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "div", 19)(31, "app-material-tab", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("chipClicked", function AnimeListComponent_Template_app_material_tab_chipClicked_31_listener($event) { return ctx.openFansub($event); })("tableRowClicked", function AnimeListComponent_Template_app_material_tab_tableRowClicked_31_listener($event) { return ctx.openAnimePage($event); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("animeDoramaData", ctx.seasonalAnimeCard);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("tabData", ctx.tabData);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_5__.NotificationsComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatOption, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__.MatDatepickerInput, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__.MatDatepickerToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatSuffix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__.MatIcon, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__.MatDatepickerToggleIcon, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_16__.MatDatepicker, _shared_components_card_anime_dorama_card_anime_dorama_component__WEBPACK_IMPORTED_MODULE_6__.CardAnimeDoramaComponent, _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_7__.MaterialTabComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhbmltZS1saXN0LmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 16037:
/*!**********************************************!*\
  !*** ./src/app/_pages/anime/anime.module.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimeModule": () => (/* binding */ AnimeModule)
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
/* harmony import */ var _anime_list_anime_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./anime-list/anime-list.component */ 71206);
/* harmony import */ var _anime_detail_anime_detail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./anime-detail/anime-detail.component */ 41886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);













const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _anime_list_anime_list_component__WEBPACK_IMPORTED_MODULE_6__.AnimeListComponent
    },
    {
        path: ':animeId',
        component: _anime_detail_anime_detail_component__WEBPACK_IMPORTED_MODULE_7__.AnimeDetailComponent
    }
];
class AnimeModule {
}
AnimeModule.ɵfac = function AnimeModule_Factory(t) { return new (t || AnimeModule)(); };
AnimeModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: AnimeModule });
AnimeModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
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
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](AnimeModule, { declarations: [_anime_list_anime_list_component__WEBPACK_IMPORTED_MODULE_6__.AnimeListComponent,
        _anime_detail_anime_detail_component__WEBPACK_IMPORTED_MODULE_7__.AnimeDetailComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule,
        _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
        _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_1__.MaterialTabModule,
        _shared_components_material_expansion_panel_material_expansion_panel_module__WEBPACK_IMPORTED_MODULE_3__.MaterialExpansionPanelModule,
        _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_2__.MaterialChipModule,
        _shared_components_card_anime_dorama_card_anime_dorama_module__WEBPACK_IMPORTED_MODULE_4__.CardAnimeDoramaModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_5__.NotificationsModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app__pages_anime_anime_module_ts.js.map