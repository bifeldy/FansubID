(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["main"],{

/***/ 40746:
/*!******************************************************!*\
  !*** ./src/app/_shared/animations/anim-side-menu.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animateText": () => (/* binding */ animateText),
/* harmony export */   "onMainContentChange": () => (/* binding */ onMainContentChange),
/* harmony export */   "onSideNavChange": () => (/* binding */ onSideNavChange)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 31631);

const onSideNavChange = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('onSideNavChange', [
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('close', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        'min-width': '50px'
    })),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('open', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        'min-width': '200px'
    })),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('close => open', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('250ms ease-in')),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('open => close', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('250ms ease-out')),
]);
const onMainContentChange = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('onMainContentChange', [
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('close', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        'margin-left': '62px'
    })),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('open', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        'margin-left': '200px'
    })),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('close => open', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('250ms ease-in')),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('open => close', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('250ms ease-out')),
]);
const animateText = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('animateText', [
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('hide', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        display: 'none',
        opacity: 0,
    })),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('show', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        display: 'block',
        opacity: 1,
    })),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('close => open', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('350ms ease-in')),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('open => close', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('200ms ease-out')),
]);


/***/ }),

/***/ 44732:
/*!***************************************************************!*\
  !*** ./src/app/_shared/components/footer/footer.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FooterComponent": () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _services_stats_server_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/stats-server.service */ 28381);
/* harmony import */ var _services_winbox_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/winbox.service */ 88020);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/toolbar */ 19946);
/* harmony import */ var xng_breadcrumb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! xng-breadcrumb */ 59151);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 36362);








class FooterComponent {
    constructor(gs, ss, wb) {
        this.gs = gs;
        this.ss = ss;
        this.wb = wb;
        if (this.gs.isBrowser) {
            //
        }
    }
    get SS() {
        return this.ss;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            //
        }
    }
    get discordUrl() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.discord.join_url;
    }
    get author() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.author;
    }
    get siteName() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.siteName;
    }
    openGithub() {
        this.wb.winboxOpenUri(`https://github.com/${this.author}/${this.siteName}`);
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_stats_server_service__WEBPACK_IMPORTED_MODULE_2__.StatsServerService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_winbox_service__WEBPACK_IMPORTED_MODULE_3__.WinboxService)); };
FooterComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 14, vars: 6, consts: [["color", "primary", 2, "height", "32px", "padding", "0 12px"], [2, "font-size", "small"], [2, "text-decoration", "none", "color", "whitesmoke", "cursor", "pointer", 3, "click"], [2, "display", "inline-block", "transform", "rotateY(180deg)"], [2, "display", "inline-block"], [1, "spacer", "px-1"], ["target", "_blank", 2, "text-decoration", "none", "color", "whitesmoke", 3, "href"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-toolbar", 0)(1, "span", 1)(2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function FooterComponent_Template_div_click_2_listener() { return ctx.openGithub(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "\u00A9");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](7, "slice");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "span", 5)(9, "xng-breadcrumb")(10, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "span", 1)(12, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13, " With \uD83D\uDC98 Just For You~ ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("\u00A0 2013 | ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind3"](7, 2, ctx.SS.github == null ? null : ctx.SS.github.sha, 0, 7), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("href", ctx.discordUrl, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__.MatToolbar, xng_breadcrumb__WEBPACK_IMPORTED_MODULE_6__.BreadcrumbComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.SlicePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 88369:
/*!************************************************************!*\
  !*** ./src/app/_shared/components/footer/footer.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FooterModule": () => (/* binding */ FooterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var xng_breadcrumb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xng-breadcrumb */ 59151);
/* harmony import */ var _footer_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.component */ 44732);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);





class FooterModule {
}
FooterModule.ɵfac = function FooterModule_Factory(t) { return new (t || FooterModule)(); };
FooterModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: FooterModule });
FooterModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
            xng_breadcrumb__WEBPACK_IMPORTED_MODULE_4__.BreadcrumbModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](FooterModule, { declarations: [_footer_component__WEBPACK_IMPORTED_MODULE_0__.FooterComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
        xng_breadcrumb__WEBPACK_IMPORTED_MODULE_4__.BreadcrumbModule], exports: [_footer_component__WEBPACK_IMPORTED_MODULE_0__.FooterComponent] }); })();


/***/ }),

/***/ 45009:
/*!***************************************************************!*\
  !*** ./src/app/_shared/components/header/header.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeaderComponent": () => (/* binding */ HeaderComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/snack-bar */ 32528);
/* harmony import */ var _services_left_menu_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/left-menu.service */ 70007);
/* harmony import */ var _services_right_panel_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/right-panel.service */ 56514);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _services_page_info_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/page-info.service */ 18745);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _services_stats_server_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/stats-server.service */ 28381);
/* harmony import */ var _services_busy_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/busy.service */ 33000);
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/local-storage.service */ 53379);
/* harmony import */ var _services_dialog_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/dialog.service */ 55393);
/* harmony import */ var _services_berkas_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/berkas.service */ 8987);
/* harmony import */ var _services_fansub_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/fansub.service */ 76781);
/* harmony import */ var _services_news_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/news.service */ 49618);
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../services/user.service */ 8058);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/toolbar */ 19946);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/badge */ 70178);

























function HeaderComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "button", 13)(1, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2, "sports_score");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", ctx_r0.myPoints, " ");
  }
}

function HeaderComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_button_8_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return ctx_r5.toggleDelete();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}

function HeaderComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_button_9_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return ctx_r7.toggleWeather();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2, "filter_vintage");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}

function HeaderComponent_button_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_button_16_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return ctx_r9.openAdminNavigation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2, "apps");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}

function HeaderComponent_button_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_button_20_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return ctx_r11.reloadPage();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2, "replay");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
}

class HeaderComponent {
  constructor(snackBar, lms, rps, router, pi, gs, ss, bs, ls, ds, berkas, fansub, news, user) {
    this.snackBar = snackBar;
    this.lms = lms;
    this.rps = rps;
    this.router = router;
    this.pi = pi;
    this.gs = gs;
    this.ss = ss;
    this.bs = bs;
    this.ls = ls;
    this.ds = ds;
    this.berkas = berkas;
    this.fansub = fansub;
    this.news = news;
    this.user = user;
    this.myPoints = 0;
    this.subsGlobalRoom = null;
    this.subsDialog = null;
    this.subsDelete = null;
    this.deleteHandle = {};

    if (this.gs.isBrowser) {
      this.deleteHandle['berkas'] = this.berkas;
      this.deleteHandle['fansub'] = this.fansub;
      this.deleteHandle['news'] = this.news;
      this.deleteHandle['user'] = this.user;
    }
  }

  get GS() {
    return this.gs;
  }

  get ROUTER() {
    return this.router;
  }

  get PI() {
    return this.pi;
  }

  get SS() {
    return this.ss;
  }

  ngOnInit() {
    if (this.gs.isBrowser) {
      const osTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.gs.isDarkMode = osTheme || this.ls.getItem(this.gs.localStorageKeys.DarkMode) === 'true';
      this.toggleDarkTheme(true);
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        this.gs.isDarkMode = event.matches;
        this.toggleDarkTheme(true);
      });
      this.subsGlobalRoom = this.ss.globalRoom.subscribe({
        next: global => {
          var _a, _b;

          this.myPoints = ((_b = (_a = global === null || global === void 0 ? void 0 : global.member_list[this.ss.mySocket.id]) === null || _a === void 0 ? void 0 : _a.profile_) === null || _b === void 0 ? void 0 : _b.points) || 0;
        }
      });
    }
  }

  ngOnDestroy() {
    var _a, _b, _c;

    (_a = this.subsGlobalRoom) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsDialog) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsDelete) === null || _c === void 0 ? void 0 : _c.unsubscribe();
  }

  get discordUrl() {
    return _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.discord.join_url;
  }

  toggleSideNav() {
    this.lms.onSideNavToggleView();
  }

  toggleWeather() {
    this.gs.weatherToggle();
    this.snackBar.open(`Berhasil ${this.gs.weatherRunning ? 'Menyalakan' : 'Mematikan'} Efek Musiman`, 'Ok');
  }

  reloadPage() {
    this.bs.busy();
    window.location.reload();
  }

  openSearch() {
    this.rps.toggleSidePanel('SearchAllComponent');
  }

  openLiveChat() {
    this.rps.toggleSidePanel('LiveChatComponent');
  }

  openAdminNavigation() {
    this.rps.toggleSidePanel('AdminNavigationComponent');
  }

  toggleDarkTheme(firstRun = false) {
    this.gs.toggleDarkTheme(firstRun);
    this.ls.setItem(this.gs.localStorageKeys.DarkMode, JSON.stringify(this.gs.isDarkMode));
    this.pi.updateStatusBarTheme(this.gs.isDarkMode);
    this.snackBar.open(`Menggunakan Mode ${this.gs.isDarkMode ? 'Gelap' : 'Terang'}`, 'Ok');
  }

  toggleDelete() {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const currentUrl = _this.router.url.split('?')[0];

      if (currentUrl.startsWith('/berkas/') || currentUrl.startsWith('/fansub/') || currentUrl.startsWith('/news/') || currentUrl.startsWith('/user/')) {
        const trackType = currentUrl.split('/')[1];
        const idSlugUsername = currentUrl.split('/')[2];
        _this.subsDialog = (yield _this.ds.openKonfirmasiDialog('Konfirmasi Hapus', `Yakin Akan Menghapus ${trackType[0].toUpperCase()}${trackType.slice(1)} -- '${idSlugUsername}' ?`, true)).afterClosed().subscribe({
          next: re => {
            _this.gs.log('[INFO_DIALOG_CLOSED]', re);

            if (re === true) {
              _this.bs.busy();

              _this.subsDelete = _this.deleteHandle[trackType].delete(idSlugUsername).subscribe({
                next: res => {
                  _this.gs.log(`[${trackType.toUpperCase()}_CLICK_DELETE_SUCCESS]`, res);

                  _this.bs.idle();

                  _this.router.navigateByUrl(`/${trackType}`);
                },
                error: err => {
                  _this.gs.log(`[${trackType.toUpperCase()}_CLICK_DELETE_ERROR]`, err, 'error');

                  _this.bs.idle();
                }
              });
            }

            _this.subsDialog.unsubscribe();
          }
        });
      }
    })();
  }

}

HeaderComponent.ɵfac = function HeaderComponent_Factory(t) {
  return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_left_menu_service__WEBPACK_IMPORTED_MODULE_2__.LeftMenuService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_right_panel_service__WEBPACK_IMPORTED_MODULE_3__.RightPanelService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_16__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_page_info_service__WEBPACK_IMPORTED_MODULE_4__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_stats_server_service__WEBPACK_IMPORTED_MODULE_6__.StatsServerService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_busy_service__WEBPACK_IMPORTED_MODULE_7__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_local_storage_service__WEBPACK_IMPORTED_MODULE_8__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_dialog_service__WEBPACK_IMPORTED_MODULE_9__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_berkas_service__WEBPACK_IMPORTED_MODULE_10__.BerkasService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_fansub_service__WEBPACK_IMPORTED_MODULE_11__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_news_service__WEBPACK_IMPORTED_MODULE_12__.NewsService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_services_user_service__WEBPACK_IMPORTED_MODULE_13__.UserService));
};

HeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({
  type: HeaderComponent,
  selectors: [["app-header"]],
  decls: 21,
  vars: 8,
  consts: [["color", "primary", 2, "height", "56px", "padding", "0 12px"], ["type", "button", "mat-icon-button", "", "matTooltip", "Menu", 1, "shiny", 3, "click"], ["matLine", "", 1, "text-truncate", 2, "margin-left", "1rem", "margin-right", "1rem"], [1, "spacer"], ["type", "button", "mat-stroked-button", "", "matTooltip", "Points", 4, "ngIf"], ["type", "button", "class", "animate__animated animate__rubberBand animate__infinite animate__slower", "mat-icon-button", "", "matTooltip", "Ganti Warna", 3, "click", 4, "ngIf"], ["type", "button", "class", "animate__animated animate__tada animate__infinite animate__slower", "mat-icon-button", "", "matTooltip", "Weather Effect", 3, "click", 4, "ngIf"], ["type", "button", "mat-icon-button", "", "matTooltip", "Ganti Warna", 1, "animate__animated", "animate__flash", "animate__infinite", "animate__slower", 3, "click"], ["type", "button", "mat-icon-button", "", "matTooltip", "Obrolan", 3, "click"], ["matBadgePosition", "before", 3, "matBadge", "matBadgeColor"], ["type", "button", "mat-icon-button", "", 3, "click", 4, "ngIf"], ["type", "button", "mat-icon-button", "", "matTooltip", "Pencarian", 1, "animate__animated", "animate__heartBeat", "animate__infinite", "animate__slower", 3, "click"], ["type", "button", "mat-icon-button", "", "matTooltip", "Refresh", 3, "click", 4, "ngIf"], ["type", "button", "mat-stroked-button", "", "matTooltip", "Points"], [1, "me-1"], ["type", "button", "mat-icon-button", "", "matTooltip", "Ganti Warna", 1, "animate__animated", "animate__rubberBand", "animate__infinite", "animate__slower", 3, "click"], ["type", "button", "mat-icon-button", "", "matTooltip", "Weather Effect", 1, "animate__animated", "animate__tada", "animate__infinite", "animate__slower", 3, "click"], ["type", "button", "mat-icon-button", "", 3, "click"], ["type", "button", "mat-icon-button", "", "matTooltip", "Refresh", 3, "click"]],
  template: function HeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "mat-toolbar", 0)(1, "button", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_Template_button_click_1_listener() {
        return ctx.toggleSideNav();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3, "menu");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](4, "span", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](6, "span", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](7, HeaderComponent_button_7_Template, 4, 1, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](8, HeaderComponent_button_8_Template, 3, 0, "button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](9, HeaderComponent_button_9_Template, 3, 0, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](10, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_Template_button_click_10_listener() {
        return ctx.toggleDarkTheme();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](11, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](12, "nights_stay");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](13, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_Template_button_click_13_listener() {
        return ctx.openLiveChat();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](14, "mat-icon", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](15, " forum ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](16, HeaderComponent_button_16_Template, 3, 0, "button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](17, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function HeaderComponent_Template_button_click_17_listener() {
        return ctx.openSearch();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](18, "mat-icon");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](19, "search");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](20, HeaderComponent_button_20_Template, 3, 0, "button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", ctx.PI.getHeaderTitle, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.ROUTER.url.includes("/nihongo") && ctx.GS.isDesktop);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.ROUTER.url.includes("/berkas/") || ctx.ROUTER.url.includes("/fansub/") || ctx.ROUTER.url.includes("/news/") || ctx.ROUTER.url.includes("/user/"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.GS.weatherEffect);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("matBadge", ctx.SS.messageChatUnreadCount)("matBadgeColor", "warn");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.ROUTER.url.includes("/admin-mod/"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", !(ctx.SS.mySocket == null ? null : ctx.SS.mySocket.id));
    }
  },
  directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_17__.MatToolbar, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatButton, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__.MatTooltip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_20__.MatIcon, _angular_material_core__WEBPACK_IMPORTED_MODULE_21__.MatLine, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgIf, _angular_material_badge__WEBPACK_IMPORTED_MODULE_23__.MatBadge],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWFkZXIuY29tcG9uZW50LmNzcyJ9 */"]
});

/***/ }),

/***/ 48084:
/*!************************************************************!*\
  !*** ./src/app/_shared/components/header/header.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HeaderModule": () => (/* binding */ HeaderModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.component */ 45009);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);





class HeaderModule {
}
HeaderModule.ɵfac = function HeaderModule_Factory(t) { return new (t || HeaderModule)(); };
HeaderModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: HeaderModule });
HeaderModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](HeaderModule, { declarations: [_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule], exports: [_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent] }); })();


/***/ }),

/***/ 33679:
/*!*********************************************************************!*\
  !*** ./src/app/_shared/components/left-menu/left-menu.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeftMenuComponent": () => (/* binding */ LeftMenuComponent)
/* harmony export */ });
/* harmony import */ var _animations_anim_side_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../animations/anim-side-menu */ 40746);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../models/req-res.model */ 14249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _services_left_menu_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/left-menu.service */ 70007);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/auth.service */ 4137);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _services_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/dialog.service */ 55393);
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/local-storage.service */ 53379);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/divider */ 19975);
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/badge */ 70178);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/slide-toggle */ 6623);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 90587);
















function LeftMenuComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "div");
} }
function LeftMenuComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LeftMenuComponent_ng_template_3_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r10.forceCloseSideNav(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LeftMenuComponent_ng_template_3_Template_a_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r11); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r12.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, "power_settings_new");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassMap"](ctx_r2.TRUSTED ? "gradient-border" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("src", ctx_r2.AS.currentUserSubject == null ? null : ctx_r2.AS.currentUserSubject.value == null ? null : ctx_r2.AS.currentUserSubject.value.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@animateText", ctx_r2.linkText ? "show" : "hide");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r2.AS.currentUserSubject == null ? null : ctx_r2.AS.currentUserSubject.value == null ? null : ctx_r2.AS.currentUserSubject.value.kartu_tanda_penduduk_.nama, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r2.AS.currentUserSubject == null ? null : ctx_r2.AS.currentUserSubject.value == null ? null : ctx_r2.AS.currentUserSubject.value._email, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@animateText", ctx_r2.linkText ? "show" : "hide");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" Keluar ", ctx_r2.AS.logoutTimerText, " ");
} }
function LeftMenuComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LeftMenuComponent_ng_template_5_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r13.forceCloseSideNav(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "login");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, "Masuk");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LeftMenuComponent_ng_template_5_Template_a_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r14); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r15.forceCloseSideNav(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, "group_add");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9, "Daftar");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@animateText", ctx_r4.linkText ? "show" : "hide");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@animateText", ctx_r4.linkText ? "show" : "hide");
} }
function LeftMenuComponent_a_9_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LeftMenuComponent_a_9_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r17.forceCloseSideNav(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const menu_r16 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("routerLink", menu_r16.link);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("matBadge", menu_r16.badge);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](menu_r16.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@animateText", ctx_r5.linkText ? "show" : "hide");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](menu_r16.name);
} }
function LeftMenuComponent_a_12_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LeftMenuComponent_a_12_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r20.forceCloseSideNav(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const menu_r19 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("routerLink", menu_r19.link);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("matBadge", menu_r19.badge);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](menu_r19.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@animateText", ctx_r6.linkText ? "show" : "hide");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](menu_r19.name);
} }
function LeftMenuComponent_a_15_Template(rf, ctx) { if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LeftMenuComponent_a_15_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r24); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r23.forceCloseSideNav(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const menu_r22 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("routerLink", menu_r22.link);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("matBadge", menu_r22.badge);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](menu_r22.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@animateText", ctx_r7.linkText ? "show" : "hide");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](menu_r22.name);
} }
function LeftMenuComponent_a_23_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LeftMenuComponent_a_23_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r27); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r26.forceCloseSideNav(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const menu_r25 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("routerLink", menu_r25.link);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("matBadge", menu_r25.badge);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](menu_r25.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@animateText", ctx_r8.linkText ? "show" : "hide");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](menu_r25.name);
} }
function LeftMenuComponent_a_26_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LeftMenuComponent_a_26_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r30); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r29.forceCloseSideNav(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const menu_r28 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("routerLink", menu_r28.link);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("matBadge", menu_r28.badge);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](menu_r28.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@animateText", ctx_r9.linkText ? "show" : "hide");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](menu_r28.name);
} }
const _c0 = function (a0) { return { "overflow-y": a0, "overflow-x": "hidden" }; };
class LeftMenuComponent {
    constructor(router, lms, as, gs, ds, ls) {
        this.router = router;
        this.lms = lms;
        this.as = as;
        this.gs = gs;
        this.ds = ds;
        this.ls = ls;
        this.subsDialog = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    get AS() {
        return this.as;
    }
    get GS() {
        return this.gs;
    }
    get mainMenus() {
        return this.lms.mainMenus;
    }
    get contentMenus() {
        return this.lms.contentMenus;
    }
    get additionalMenus() {
        return this.lms.additionalMenus;
    }
    get miscMenus() {
        return this.lms.miscMenus;
    }
    get otherMenus() {
        return this.lms.otherMenus;
    }
    get TRUSTED() {
        var _a;
        if ((_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) {
            return (this.as.currentUserSubject.value.role === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN ||
                this.as.currentUserSubject.value.role === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR ||
                this.as.currentUserSubject.value.role === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER);
        }
        return false;
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subsDialog) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            //
        }
    }
    get sideNavExpanded() {
        return this.lms.sideNavExpanded;
    }
    get linkText() {
        return this.lms.linkText;
    }
    onMouseHoverIn() {
        if (this.gs.isDesktop) {
            this.lms.onMouseHoverIn();
        }
    }
    onMouseHoverOut() {
        if (this.gs.isDesktop) {
            this.lms.onMouseHoverOut();
        }
    }
    forceCloseSideNav() {
        this.lms.forceCloseSideNav();
    }
    logout() {
        this.as.logout();
    }
    openDocumentation() {
        this.forceCloseSideNav();
        this.router.navigateByUrl('/docs');
    }
    openWebTorrent() {
        this.forceCloseSideNav();
        if (!this.gs.isDesktop) {
            this.subsDialog = this.ds.openInfoDialog({
                data: {
                    title: `.: Web-Torrent :.`,
                    htmlMessage: 'Fitur Ini Tergolong Cukup Berat Karena Dikhususkan Untuk Pengguna Desktop, Akan Ada Kemungkinan Juga Tampilan Menjadi Berantakan, Yakin Ingin Melanjutkan ?',
                    confirmText: 'Ya, Lanjutkan',
                    cancelText: 'Tidak, Batal'
                },
                disableClose: false
            }).afterClosed().subscribe({
                next: re => {
                    this.gs.log('[INFO_DIALOG_CLOSED]', re);
                    if (re === true) {
                        this.router.navigateByUrl('/torrent');
                    }
                    this.subsDialog.unsubscribe();
                }
            });
        }
        else {
            this.router.navigateByUrl('/torrent');
        }
    }
    toggleDebugLog($event) {
        this.gs.forceEnableDebugLog = $event.checked;
        this.ls.setItem(this.gs.localStorageKeys.DebugLogs, JSON.stringify($event.checked));
    }
}
LeftMenuComponent.ɵfac = function LeftMenuComponent_Factory(t) { return new (t || LeftMenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_left_menu_service__WEBPACK_IMPORTED_MODULE_2__.LeftMenuService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_4__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_dialog_service__WEBPACK_IMPORTED_MODULE_5__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_local_storage_service__WEBPACK_IMPORTED_MODULE_6__.LocalStorageService)); };
LeftMenuComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: LeftMenuComponent, selectors: [["app-left-menu"]], decls: 35, vars: 15, consts: [[1, "sidenav_container", 3, "ngStyle", "mouseenter", "mouseleave"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["sudahLogin", ""], ["belumLogin", ""], [2, "margin-top", "8px"], ["mat-list-item", "", "routerLinkActive", "side-menu-link-active", 3, "routerLink", "click", 4, "ngFor", "ngForOf"], ["mat-list-item", "", "routerLinkActive", "side-menu-link-active", 3, "click"], [2, "padding-left", "0.2em"], [2, "padding-left", "1.75em", "padding-right", "0.2em"], [2, "right", "1em !important", "position", "absolute"], [3, "ngModel", "ngModelChange", "click", "change"], ["mat-list-item", "", "routerLink", "/user", "routerLinkActive", "side-menu-link-active", 3, "click"], [1, "jim", 3, "src"], [1, "text-truncate", 2, "padding-left", "1.2em", "padding-right", "0.2em"], ["mat-list-item", "", 3, "click"], ["mat-list-item", "", "routerLink", "/login", "routerLinkActive", "side-menu-link-active", 3, "click"], ["mat-list-item", "", "routerLink", "/register", "routerLinkActive", "side-menu-link-active", 3, "click"], ["mat-list-item", "", "routerLinkActive", "side-menu-link-active", 3, "routerLink", "click"], ["matBadgeColor", "warn", "matBadgePosition", "before", 2, "padding-left", "0.2em", 3, "matBadge"]], template: function LeftMenuComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("mouseenter", function LeftMenuComponent_Template_div_mouseenter_0_listener() { return ctx.onMouseHoverIn(); })("mouseleave", function LeftMenuComponent_Template_div_mouseleave_0_listener() { return ctx.onMouseHoverOut(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, LeftMenuComponent_div_2_Template, 1, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, LeftMenuComponent_ng_template_3_Template, 11, 9, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, LeftMenuComponent_ng_template_5_Template, 10, 2, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "mat-divider", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](9, LeftMenuComponent_a_9_Template, 5, 5, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "mat-divider", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, LeftMenuComponent_a_12_Template, 5, 5, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](13, "mat-divider", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](15, LeftMenuComponent_a_15_Template, 5, 5, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](16, "mat-divider", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "mat-nav-list")(18, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LeftMenuComponent_Template_a_click_18_listener() { return ctx.openWebTorrent(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](19, "mat-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](20, "sailing");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](22, "Web Torrent");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](23, LeftMenuComponent_a_23_Template, 5, 5, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](24, "mat-divider", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](25, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](26, LeftMenuComponent_a_26_Template, 5, 5, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](27, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function LeftMenuComponent_Template_a_click_27_listener() { return ctx.openDocumentation(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "mat-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](29, "settings_ethernet");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](30, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](31, " Dev. Mode ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](32, "span", 9)(33, "mat-slide-toggle", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function LeftMenuComponent_Template_mat_slide_toggle_ngModelChange_33_listener($event) { return ctx.GS.forceEnableDebugLog = $event; })("click", function LeftMenuComponent_Template_mat_slide_toggle_click_33_listener($event) { return $event.stopPropagation(); })("change", function LeftMenuComponent_Template_mat_slide_toggle_change_33_listener($event) { return ctx.toggleDebugLog($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](34, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](4);
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@onSideNavChange", ctx.sideNavExpanded ? "open" : "close")("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](13, _c0, ctx.sideNavExpanded ? "auto" : "hidden"));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.AS.currentUserSubject == null ? null : ctx.AS.currentUserSubject.value)("ngIfThen", _r1)("ngIfElse", _r3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.mainMenus);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.contentMenus);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.additionalMenus);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@animateText", ctx.linkText ? "show" : "hide");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.miscMenus);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.otherMenus);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("@animateText", ctx.linkText ? "show" : "hide");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.GS.forceEnableDebugLog);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgStyle, _angular_material_list__WEBPACK_IMPORTED_MODULE_10__.MatNavList, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_material_list__WEBPACK_IMPORTED_MODULE_10__.MatListItem, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLinkWithHref, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLinkActive, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__.MatDivider, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_material_badge__WEBPACK_IMPORTED_MODULE_13__.MatBadge, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_14__.MatSlideToggle, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgModel], styles: [".sidenav_container[_ngcontent-%COMP%] {\r\n  min-width: 64px !important;\r\n  max-width: 320px;\r\n  height: calc(100vh - 88px);\r\n}\r\n\r\n.jim[_ngcontent-%COMP%] {\r\n  width: 32px;\r\n  height: 32px;\r\n  object-fit: cover;\r\n  border-radius: 50%;\r\n}\r\n\r\n.side-menu-link-active[_ngcontent-%COMP%] {\r\n  background: rgba(255, 64, 129, 0.15);\r\n  color: #ff4081 !important;\r\n  font-weight: bold;\r\n}\r\n\r\n.mat-list-item-content[_ngcontent-%COMP%] {\r\n  padding: 0 !important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxlZnQtbWVudS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMEJBQTBCO0VBQzFCLGdCQUFnQjtFQUNoQiwwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxvQ0FBb0M7RUFDcEMseUJBQXlCO0VBQ3pCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2QiIsImZpbGUiOiJsZWZ0LW1lbnUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zaWRlbmF2X2NvbnRhaW5lciB7XHJcbiAgbWluLXdpZHRoOiA2NHB4ICFpbXBvcnRhbnQ7XHJcbiAgbWF4LXdpZHRoOiAzMjBweDtcclxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA4OHB4KTtcclxufVxyXG5cclxuLmppbSB7XHJcbiAgd2lkdGg6IDMycHg7XHJcbiAgaGVpZ2h0OiAzMnB4O1xyXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxufVxyXG5cclxuLnNpZGUtbWVudS1saW5rLWFjdGl2ZSB7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDY0LCAxMjksIDAuMTUpO1xyXG4gIGNvbG9yOiAjZmY0MDgxICFpbXBvcnRhbnQ7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5tYXQtbGlzdC1pdGVtLWNvbnRlbnQge1xyXG4gIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcclxufSJdfQ== */"], data: { animation: [_animations_anim_side_menu__WEBPACK_IMPORTED_MODULE_0__.onSideNavChange, _animations_anim_side_menu__WEBPACK_IMPORTED_MODULE_0__.animateText] } });


/***/ }),

/***/ 94203:
/*!******************************************************************!*\
  !*** ./src/app/_shared/components/left-menu/left-menu.module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeftMenuModule": () => (/* binding */ LeftMenuModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _left_menu_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./left-menu.component */ 33679);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);






class LeftMenuModule {
}
LeftMenuModule.ɵfac = function LeftMenuModule_Factory(t) { return new (t || LeftMenuModule)(); };
LeftMenuModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: LeftMenuModule });
LeftMenuModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](LeftMenuModule, { declarations: [_left_menu_component__WEBPACK_IMPORTED_MODULE_0__.LeftMenuComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule], exports: [_left_menu_component__WEBPACK_IMPORTED_MODULE_0__.LeftMenuComponent] }); })();


/***/ }),

/***/ 95961:
/*!*****************************************************************************************************************!*\
  !*** ./src/app/_shared/components/material-dialog/material-dialog-belajar/material-dialog-belajar.component.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialDialogBelajarComponent": () => (/* binding */ MaterialDialogBelajarComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ 95758);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/busy.service */ 33000);
/* harmony import */ var _services_imgbb_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/imgbb.service */ 67902);
/* harmony import */ var _services_nihongo_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/nihongo.service */ 52663);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../_shared/services/global.service */ 80855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../pipes/bytes.pipe */ 23626);


















function MaterialDialogBelajarComponent_form_3_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Ukuran Upload Melebihi Batas ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, ctx_r3.imageLimitExceeded), " !");
} }
function MaterialDialogBelajarComponent_form_3_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r4.imageErrorText);
} }
function MaterialDialogBelajarComponent_form_3_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Gambar Wajib Ada!");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function MaterialDialogBelajarComponent_form_3_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 7)(1, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function MaterialDialogBelajarComponent_form_3_div_18_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r14.submitImage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "mat-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "add_photo_alternate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, " Unggah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r6.submitted);
} }
function MaterialDialogBelajarComponent_form_3_div_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Kana Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function MaterialDialogBelajarComponent_form_3_div_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Kana Hanya Boleh Huruf Jepang");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function MaterialDialogBelajarComponent_form_3_div_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Romaji Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function MaterialDialogBelajarComponent_form_3_div_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Romaji Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function MaterialDialogBelajarComponent_form_3_div_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Arti Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function MaterialDialogBelajarComponent_form_3_div_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Arti Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
function MaterialDialogBelajarComponent_form_3_div_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 5)(1, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " Last Edit By :: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate1"]("routerLink", "/user/", ctx_r13.DATA.dataset == null ? null : ctx_r13.DATA.dataset.user_ == null ? null : ctx_r13.DATA.dataset.user_.username, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r13.DATA.dataset == null ? null : ctx_r13.DATA.dataset.user_ == null ? null : ctx_r13.DATA.dataset.user_.username, " ");
} }
function MaterialDialogBelajarComponent_form_3_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "form", 4)(1, "div", 5)(2, "div", 6)(3, "div", 5)(4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "mat-form-field", 9)(7, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Gambar");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "ngx-mat-file-input", 10, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("change", function MaterialDialogBelajarComponent_form_3_Template_ngx_mat_file_input_change_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r17); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](10); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r16.uploadImage($event, _r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](12, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "mat-error", 13)(14, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, MaterialDialogBelajarComponent_form_3_div_15_Template, 3, 3, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, MaterialDialogBelajarComponent_form_3_div_16_Template, 2, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](17, MaterialDialogBelajarComponent_form_3_div_17_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, MaterialDialogBelajarComponent_form_3_div_18_Template, 5, 1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "div", 16)(20, "div", 5)(21, "mat-form-field", 17)(22, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23, "Kana");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](24, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](28, MaterialDialogBelajarComponent_form_3_div_28_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](29, MaterialDialogBelajarComponent_form_3_div_29_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](30, "mat-form-field", 17)(31, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](32, "Romaji");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](33, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35, "text_fields");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](36, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](37, MaterialDialogBelajarComponent_form_3_div_37_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](38, MaterialDialogBelajarComponent_form_3_div_38_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "mat-form-field", 17)(40, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](41, "Arti Terjemahan");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](42, "input", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](43, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](44, "g_translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](45, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](46, MaterialDialogBelajarComponent_form_3_div_46_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](47, MaterialDialogBelajarComponent_form_3_div_47_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](48, MaterialDialogBelajarComponent_form_3_div_48_Template, 5, 2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("formGroup", ctx_r0.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("src", ctx_r0.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r0.fg.value.image)("accept", "image/gif, image/jpeg, image/jpg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.imageLimitExceeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.imageErrorText);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("image").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.image && !ctx_r0.fg.value.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("kana").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("kana").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("romaji").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("romaji").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("meaning").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("meaning").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.DATA.dataset == null ? null : ctx_r0.DATA.dataset.user_);
} }
function MaterialDialogBelajarComponent_div_4_button_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("mat-dialog-close", null);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r18.DATA.cancelText, " ");
} }
function MaterialDialogBelajarComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 26)(1, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function MaterialDialogBelajarComponent_div_4_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r19.saveData(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, MaterialDialogBelajarComponent_div_4_button_3_Template, 2, 2, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r1.submitted || ctx_r1.fg.invalid || !ctx_r1.fg.dirty);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r1.DATA.confirmText, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.DATA.cancelText);
} }
class MaterialDialogBelajarComponent {
    constructor(fb, bs, imgbb, nihongo, dialogRef, data, gs) {
        this.fb = fb;
        this.bs = bs;
        this.imgbb = imgbb;
        this.nihongo = nihongo;
        this.dialogRef = dialogRef;
        this.data = data;
        this.gs = gs;
        this.submitted = false;
        this.image = null;
        this.imageErrorText = null;
        this.imageLimitExceeded = null;
        this.image_url = '/assets/img/form/no-image.png';
        this.image_url_original = null;
        this.gambar = null;
        this.subsNihongo = null;
        this.subsImgbb = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    get DATA() {
        return this.data;
    }
    ngOnInit() {
        var _a;
        if (this.gs.isBrowser) {
            this.gs.log('[DIALOG_DATA_IN]', this.data);
            this.initForm((_a = this.data) === null || _a === void 0 ? void 0 : _a.dataset);
        }
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subsImgbb) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsNihongo) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    initForm(data) {
        this.fg = this.fb.group({
            kana: [data === null || data === void 0 ? void 0 : data.kana, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexJapaneseKeyboardKeys)])],
            romaji: [data === null || data === void 0 ? void 0 : data.romaji, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexEnglishKeyboardKeys)])],
            meaning: [data === null || data === void 0 ? void 0 : data.meaning, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexEnglishKeyboardKeys)])],
            category: [(data === null || data === void 0 ? void 0 : data.category) || this.data.modeTampilan, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexEnglishKeyboardKeys)])],
            image: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexUrl)])],
        });
        if (data) {
            this.image_url = data === null || data === void 0 ? void 0 : data.image_url;
        }
        else {
            this.fg.controls['image'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexEnglishKeyboardKeys)]);
        }
        this.image_url_original = this.image_url;
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
    saveData() {
        var _a;
        this.bs.busy();
        this.submitted = true;
        let body = null;
        if ((_a = this.data) === null || _a === void 0 ? void 0 : _a.dataset) {
            body = this.gs.getDirtyValues(this.fg);
            this.gs.log('[NIHONGO_ADD_OR_EDIT_DIRTY]', body);
        }
        if (this.fg.invalid) {
            this.submitted = false;
            this.bs.idle();
            return;
        }
        if (body) {
            this.subsNihongo = this.nihongo.updateNihongo(this.data.dataset.id, { ...body });
        }
        else {
            this.subsNihongo = this.nihongo.createNihongo({
                image: this.fg.value.image,
                kana: this.fg.value.kana,
                romaji: this.fg.value.romaji,
                meaning: this.fg.value.meaning,
                category: this.fg.value.category
            });
        }
        this.subsNihongo = this.subsNihongo.subscribe({
            next: res => {
                this.gs.log('[NIHONGO_ADD_OR_EDIT_SUCCESS]', res);
                this.submitted = false;
                this.bs.idle();
                this.dialogRef.close(res);
            },
            error: err => {
                this.gs.log('[NIHONGO_ADD_OR_EDIT_ERROR]', err, 'error');
                this.submitted = false;
                this.bs.idle();
            }
        });
    }
}
MaterialDialogBelajarComponent.ɵfac = function MaterialDialogBelajarComponent_Factory(t) { return new (t || MaterialDialogBelajarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_imgbb_service__WEBPACK_IMPORTED_MODULE_2__.ImgbbService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_nihongo_service__WEBPACK_IMPORTED_MODULE_3__.NihongoService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__.GlobalService)); };
MaterialDialogBelajarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: MaterialDialogBelajarComponent, selectors: [["app-material-dialog-belajar"]], decls: 5, vars: 4, consts: [["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "text-break", "text-warning"], [3, "formGroup", 4, "ngIf"], ["mat-dialog-actions", "", 4, "ngIf"], [3, "formGroup"], [1, "row"], [1, "col-12", "col-md-5", "col-xl-4", "p-3"], [1, "col-12"], [1, "w-100", "border", 3, "src"], ["appearance", "outline", 1, "pt-3", "w-100", 3, "color"], [1, "w-100", 3, "disabled", "accept", "change"], ["gambar", ""], ["matSuffix", ""], [1, "px-3", "pb-3", "w-100"], [4, "ngIf"], ["class", "col-12", 4, "ngIf"], [1, "col-12", "col-md-7", "col-xl-8", "pt-3"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["matInput", "", "formControlName", "kana", "placeholder", "\u8910\u8272"], ["matInput", "", "formControlName", "romaji", "placeholder", "Kasshoku"], ["matInput", "", "formControlName", "meaning", "placeholder", "Coklat"], ["class", "row", 4, "ngIf"], ["type", "button", "mat-raised-button", "", "color", "primary", "type", "button", 1, "w-100", 3, "disabled", "click"], [1, "me-1"], [1, "col", "text-end"], [1, "text-success", 2, "text-decoration", "none", 3, "routerLink"], ["mat-dialog-actions", ""], ["type", "button", "mat-button", "", 1, "ms-auto", "text-success", 3, "disabled", "click"], ["type", "button", "mat-button", "", 3, "mat-dialog-close", 4, "ngIf"], ["type", "button", "mat-button", "", 3, "mat-dialog-close"]], template: function MaterialDialogBelajarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, MaterialDialogBelajarComponent_form_3_Template, 49, 19, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, MaterialDialogBelajarComponent_div_4_Template, 4, 3, "div", 3);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", ctx.DATA.title, " '", ctx.DATA.dataset ? ctx.DATA.dataset.kana : ctx.DATA.modeTampilan, "'");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.fg);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.fg);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialogContent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, ngx_material_file_input__WEBPACK_IMPORTED_MODULE_11__.FileInputComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatError, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_14__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterLinkWithHref, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialogClose], pipes: [_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_5__.BytesPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXRlcmlhbC1kaWFsb2ctYmVsYWphci5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 35248:
/*!***********************************************************************************************************!*\
  !*** ./src/app/_shared/components/material-dialog/material-dialog-dmak/material-dialog-dmak.component.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialDialogDmakComponent": () => (/* binding */ MaterialDialogDmakComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 95758);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../_shared/services/global.service */ 80855);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 65590);







const _c0 = ["dmakElement"];
class MaterialDialogDmakComponent {
    constructor(data, gs) {
        this.data = data;
        this.gs = gs;
        this.dmak = null;
        this.dmakUrl = '/assets/kanji/';
        this.charToDraw = 'NO DATA';
        if (this.gs.isBrowser) {
            //
        }
    }
    get DATA() {
        return this.data;
    }
    ngOnInit() {
        this.gs.log('[DIALOG_DATA_IN]', this.data);
        if ('hiragana_katakana_kanji' in this.data && this.data.hiragana_katakana_kanji) {
            this.charToDraw = this.data.hiragana_katakana_kanji;
        }
    }
    ngAfterViewInit() {
        this.dmak = new Dmak(this.charToDraw, {
            element: 'dmakElement',
            uri: this.dmakUrl,
            stroke: {
                order: {
                    visible: true
                },
                attr: {
                    active: '#f44336',
                    stroke: '#28a745'
                }
            }
        });
    }
    play() {
        this.dmak.render();
    }
    pause() {
        this.dmak.pause();
    }
    next() {
        this.pause();
        this.dmak.renderNextStrokes(1);
    }
    back() {
        this.pause();
        this.dmak.eraseLastStrokes(1);
    }
    reset() {
        this.pause();
        this.dmak.erase();
    }
}
MaterialDialogDmakComponent.ɵfac = function MaterialDialogDmakComponent_Factory(t) { return new (t || MaterialDialogDmakComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
MaterialDialogDmakComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MaterialDialogDmakComponent, selectors: [["app-material-dialog-dmak"]], viewQuery: function MaterialDialogDmakComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.dmakElement = _t.first);
    } }, decls: 12, vars: 1, consts: [["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "text-break"], ["id", "dmakElement", 1, "text-center"], ["dmakElement", ""], ["mat-dialog-actions", ""], ["type", "button", "mat-button", "", "matTooltip", "Back", 1, "ms-auto", 3, "click"], ["type", "button", "mat-button", "", "matTooltip", "Next", 3, "click"]], template: function MaterialDialogDmakComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "div", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4)(6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MaterialDialogDmakComponent_Template_button_click_6_listener() { return ctx.back(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "chevron_left");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MaterialDialogDmakComponent_Template_button_click_9_listener() { return ctx.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "chevron_right");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Cara Penulisan '", ctx.DATA.romaji, "'");
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialogActions, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__.MatTooltip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXRlcmlhbC1kaWFsb2ctZG1hay5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 86529:
/*!*************************************************************************************************************!*\
  !*** ./src/app/_shared/components/material-dialog/material-dialog-edict/material-dialog-edict.component.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialDialogEdictComponent": () => (/* binding */ MaterialDialogEdictComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 95758);
/* harmony import */ var wanakana__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wanakana */ 418);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_nihongo_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../_shared/services/nihongo.service */ 52663);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../_shared/services/global.service */ 80855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _no_data_no_data_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../no-data/no-data.component */ 40192);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 87317);











const _c0 = ["dmakElement"];
function MaterialDialogEdictComponent_li_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const v_r6 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", v_r6, " (", ctx_r1.getRomaji(v_r6), ") ");
} }
function MaterialDialogEdictComponent_li_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const v_r7 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", v_r7, " (", ctx_r2.getRomaji(v_r7), ") ");
} }
function MaterialDialogEdictComponent_div_36_mat_list_option_2_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "mat-list-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function MaterialDialogEdictComponent_div_36_mat_list_option_2_Template_mat_list_option_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r11); const e_r9 = restoredCtx.$implicit; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r10.openVocab(e_r9); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "h4", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "h5", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const e_r9 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](e_r9.kanji);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", e_r9.reading, " (", ctx_r8.getRomaji(e_r9.reading), ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](e_r9.meaning);
} }
function MaterialDialogEdictComponent_div_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "mat-selection-list", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, MaterialDialogEdictComponent_div_36_mat_list_option_2_Template, 7, 4, "mat-list-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r3.edict);
} }
function MaterialDialogEdictComponent_app_no_data_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "app-no-data");
} }
function MaterialDialogEdictComponent_div_38_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 29)(1, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function MaterialDialogEdictComponent_div_38_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r12.loadNextPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Load More ...");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
} }
class MaterialDialogEdictComponent {
    constructor(data, nihon, 
    // private rps: RightPanelService,
    gs) {
        this.data = data;
        this.nihon = nihon;
        this.gs = gs;
        this.dmak = null;
        this.dmakUrl = '/assets/kanji/';
        this.charToDraw = 'NO DATA';
        this.edict = [];
        this.page = 1;
        this.pageFinished = false;
        this.subsEdict = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    get DATA() {
        return this.data;
    }
    getRomaji(kana) {
        return (0,wanakana__WEBPACK_IMPORTED_MODULE_0__.toRomaji)(kana);
    }
    ngOnInit() {
        this.gs.log('[DIALOG_DATA_IN]', this.data);
        if ('character' in this.data && this.data.character) {
            this.charToDraw = this.data.character;
        }
        this.loadEdict();
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subsEdict) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    ngAfterViewInit() {
        this.dmak = new Dmak(this.charToDraw, {
            element: 'dmakElement',
            uri: this.dmakUrl,
            stroke: {
                order: {
                    visible: true
                },
                attr: {
                    active: '#f44336',
                    stroke: '#28a745'
                }
            }
        });
    }
    loadEdict() {
        this.subsEdict = this.nihon.getAllEdict(this.charToDraw, this.page).subscribe({
            next: res => {
                this.gs.log('[EDICT_LIST_SUCCESS]', res);
                this.edict = [...this.edict, ...res.results];
                if (res.results.length <= 0) {
                    this.pageFinished = true;
                }
            },
            error: err => {
                this.gs.log('[EDICT_LIST_ERROR]', err, 'error');
            }
        });
    }
    loadNextPage() {
        if (!this.pageFinished) {
            this.page++;
            this.loadEdict();
        }
    }
    openVocab(data) {
        this.gs.log('[EDICT_LIST_CLICK_VOCAB]', data);
        // this.rps.openSidePanel();
    }
}
MaterialDialogEdictComponent.ɵfac = function MaterialDialogEdictComponent_Factory(t) { return new (t || MaterialDialogEdictComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_shared_services_nihongo_service__WEBPACK_IMPORTED_MODULE_1__.NihongoService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService)); };
MaterialDialogEdictComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: MaterialDialogEdictComponent, selectors: [["app-material-dialog-edict"]], viewQuery: function MaterialDialogEdictComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.dmakElement = _t.first);
    } }, decls: 42, vars: 10, consts: [["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "text-break"], [1, "row"], [1, "col-md-4", "col-xl-3"], [1, "row", "sticky-top", "p-3"], [1, "col-12"], ["id", "dmakElement", 1, "text-center"], ["dmakElement", ""], [1, "col-12", "mt-3"], [1, "text-warning"], [1, "text-truncate"], [1, "text-success"], [1, "text-truncate", "mt-3"], [1, "text-success", "m-0"], [4, "ngFor", "ngForOf"], [1, "col-md-8", "col-xl-9"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "border-bottom-dotted"], [1, "text-bifeldy"], [4, "ngIf"], ["class", "col-12 text-center p-3", 4, "ngIf"], ["mat-dialog-actions", ""], ["type", "button", "mat-button", "", 1, "ms-auto", 3, "mat-dialog-close"], [3, "multiple"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["matLine", "", 1, "px-3"], ["matLine", "", 1, "px-3", "text-success"], ["matLine", "", 1, "px-3", "text-warning"], [1, "col-12", "text-center", "p-3"], ["type", "button", "mat-button", "", 3, "click"]], template: function MaterialDialogEdictComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "div", 6, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 8)(10, "p", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 5)(13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, " JLPT Level :: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, " School Level :: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22, " Kunyomi :: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "ul", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](24, MaterialDialogEdictComponent_li_24_Template, 2, 2, "li", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26, " Onyomi :: ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "ul", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](28, MaterialDialogEdictComponent_li_28_Template, 2, 2, "li", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "div", 15)(30, "div", 2)(31, "div", 16)(32, "h2", 17)(33, "b", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](34, "Kosa Kata");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](36, MaterialDialogEdictComponent_div_36_Template, 3, 2, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](37, MaterialDialogEdictComponent_app_no_data_37_Template, 1, 0, "app-no-data", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](38, MaterialDialogEdictComponent_div_38_Template, 3, 0, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](39, "div", 21)(40, "button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](41, "Tutup");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Kamus Dictionary '", ctx.DATA.character, "'");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.DATA.translate);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("N", ctx.DATA.jlpt, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.DATA.school);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.DATA.v_kunyomi.split(","));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.DATA.v_onyomi.split(","));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.edict.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.edict.length <= 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.pageFinished);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("mat-dialog-close", true);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogContent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_material_list__WEBPACK_IMPORTED_MODULE_7__.MatSelectionList, _angular_material_list__WEBPACK_IMPORTED_MODULE_7__.MatListOption, _angular_material_core__WEBPACK_IMPORTED_MODULE_8__.MatLine, _no_data_no_data_component__WEBPACK_IMPORTED_MODULE_3__.NoDataComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogClose], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXRlcmlhbC1kaWFsb2ctZWRpY3QuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 35070:
/*!***********************************************************************************************************!*\
  !*** ./src/app/_shared/components/material-dialog/material-dialog-info/material-dialog-info.component.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialDialogInfoComponent": () => (/* binding */ MaterialDialogInfoComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 95758);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../_shared/services/global.service */ 80855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../pipes/safe-inner-html.pipe */ 11861);







function MaterialDialogInfoComponent_small_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "small", 6)(1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("* ", ctx_r0.DATA.infoText, "");
} }
function MaterialDialogInfoComponent_button_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("mat-dialog-close", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.DATA.cancelText, " ");
} }
class MaterialDialogInfoComponent {
    constructor(data, gs) {
        this.data = data;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    get DATA() {
        return this.data;
    }
    ngOnInit() {
        this.gs.log('[DIALOG_DATA_IN]', this.data);
    }
}
MaterialDialogInfoComponent.ɵfac = function MaterialDialogInfoComponent_Factory(t) { return new (t || MaterialDialogInfoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
MaterialDialogInfoComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: MaterialDialogInfoComponent, selectors: [["app-material-dialog-info"]], decls: 9, vars: 8, consts: [["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "text-break", "text-warning", 3, "innerHTML"], ["mat-dialog-actions", ""], ["class", "text-start m-2", 4, "ngIf"], ["type", "button", "mat-button", "", 1, "ms-auto", "text-success", "shiny", 3, "mat-dialog-close"], ["type", "button", "mat-button", "", 3, "mat-dialog-close", 4, "ngIf"], [1, "text-start", "m-2"], ["type", "button", "mat-button", "", 3, "mat-dialog-close"]], template: function MaterialDialogInfoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "safeInnerHtml");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, MaterialDialogInfoComponent_small_5_Template, 3, 1, "small", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, MaterialDialogInfoComponent_button_8_Template, 2, 2, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.DATA.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](3, 6, ctx.DATA.htmlMessage), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.DATA.infoText);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("mat-dialog-close", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.DATA.confirmText, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.DATA.cancelText);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogActions, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogClose], pipes: [_pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_1__.SafeInnerHtmlPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXRlcmlhbC1kaWFsb2ctaW5mby5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 84807:
/*!*************************************************************************************************************!*\
  !*** ./src/app/_shared/components/material-dialog/material-dialog-input/material-dialog-input.component.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialDialogInputComponent": () => (/* binding */ MaterialDialogInputComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 95758);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../_shared/services/global.service */ 80855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 87317);












function MaterialDialogInputComponent_form_3_mat_form_field_1_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", item_r4.value["inputLabel"], " Tidak Boleh Kosong");
} }
function MaterialDialogInputComponent_form_3_mat_form_field_1_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", item_r4.value["inputLabel"], " Hanya Boleh Huruf Standar Papan Ketik");
} }
function MaterialDialogInputComponent_form_3_mat_form_field_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-form-field", 9)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "wysiwyg");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, MaterialDialogInputComponent_form_3_mat_form_field_1_div_7_Template, 2, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, MaterialDialogInputComponent_form_3_mat_form_field_1_div_8_Template, 2, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r4.value["inputLabel"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("placeholder", item_r4.value["inputPlaceholder"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formControlName", item_r4.key)("required", item_r4.value["inputRequired"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.fg.get(item_r4.key).hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.fg.get(item_r4.key).hasError("pattern"));
} }
function MaterialDialogInputComponent_form_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "form", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, MaterialDialogInputComponent_form_3_mat_form_field_1_Template, 9, 7, "mat-form-field", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx_r0.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 2, ctx_r0.DATA.input));
} }
function MaterialDialogInputComponent_small_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "small", 13)(1, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("* ", ctx_r1.DATA.infoText, "");
} }
function MaterialDialogInputComponent_button_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("mat-dialog-close", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.DATA.cancelText, " ");
} }
class MaterialDialogInputComponent {
    constructor(data, fb, gs) {
        this.data = data;
        this.fb = fb;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    get DATA() {
        return this.data;
    }
    get BALIKAN() {
        return this.fg.value;
    }
    ngOnInit() {
        this.gs.log('[DIALOG_DATA_IN]', this.data);
        const dataFormGroup = {};
        for (const [key, value] of Object.entries(this.data.input)) {
            const defVal = [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexEnglishKeyboardKeys)];
            if (value['inputRequired']) {
                defVal.push(_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required);
            }
            dataFormGroup[key] = [value['inputValue'], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.compose(defVal)];
        }
        this.fg = this.fb.group(dataFormGroup);
    }
}
MaterialDialogInputComponent.ɵfac = function MaterialDialogInputComponent_Factory(t) { return new (t || MaterialDialogInputComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MAT_DIALOG_DATA), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
MaterialDialogInputComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: MaterialDialogInputComponent, selectors: [["app-material-dialog-input"]], decls: 9, vars: 7, consts: [["mat-dialog-title", ""], ["mat-dialog-content", "", 1, "text-break", "text-warning"], [3, "formGroup", 4, "ngIf"], ["mat-dialog-actions", ""], ["class", "text-start m-2", 4, "ngIf"], ["type", "button", "mat-button", "", 1, "ms-auto", "text-success", "shiny", 3, "mat-dialog-close", "disabled"], ["type", "button", "mat-button", "", 3, "mat-dialog-close", 4, "ngIf"], [3, "formGroup"], ["appearance", "outline", "class", "p-3 col-12", 3, "color", 4, "ngFor", "ngForOf"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["matInput", "", 3, "formControlName", "placeholder", "required"], ["matSuffix", ""], [4, "ngIf"], [1, "text-start", "m-2"], ["type", "button", "mat-button", "", 3, "mat-dialog-close"]], template: function MaterialDialogInputComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, MaterialDialogInputComponent_form_3_Template, 3, 4, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, MaterialDialogInputComponent_small_5_Template, 3, 1, "small", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, MaterialDialogInputComponent_button_8_Template, 2, 2, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.DATA.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.fg);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.DATA.infoText);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("mat-dialog-close", ctx.BALIKAN)("disabled", ctx.fg.invalid);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.DATA.confirmText, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.DATA.cancelText);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogContent, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.RequiredValidator, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatError, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogActions, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogClose], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.KeyValuePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXRlcmlhbC1kaWFsb2ctaW5wdXQuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 68821:
/*!******************************************************************************!*\
  !*** ./src/app/_shared/components/material-dialog/material-dialog.module.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialDialogModule": () => (/* binding */ MaterialDialogModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pipes/custom-pipe.module */ 67355);
/* harmony import */ var _no_data_no_data_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../no-data/no-data.module */ 12438);
/* harmony import */ var _material_dialog_info_material_dialog_info_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./material-dialog-info/material-dialog-info.component */ 35070);
/* harmony import */ var _material_dialog_dmak_material_dialog_dmak_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./material-dialog-dmak/material-dialog-dmak.component */ 35248);
/* harmony import */ var _material_dialog_edict_material_dialog_edict_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./material-dialog-edict/material-dialog-edict.component */ 86529);
/* harmony import */ var _material_dialog_belajar_material_dialog_belajar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./material-dialog-belajar/material-dialog-belajar.component */ 95961);
/* harmony import */ var _material_dialog_input_material_dialog_input_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./material-dialog-input/material-dialog-input.component */ 84807);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);













class MaterialDialogModule {
}
MaterialDialogModule.ɵfac = function MaterialDialogModule_Factory(t) { return new (t || MaterialDialogModule)(); };
MaterialDialogModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: MaterialDialogModule });
MaterialDialogModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule,
            ngx_material_file_input__WEBPACK_IMPORTED_MODULE_12__.MaterialFileInputModule,
            _no_data_no_data_module__WEBPACK_IMPORTED_MODULE_2__.NoDataModule,
            _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_1__.CustomPipeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](MaterialDialogModule, { declarations: [_material_dialog_info_material_dialog_info_component__WEBPACK_IMPORTED_MODULE_3__.MaterialDialogInfoComponent,
        _material_dialog_dmak_material_dialog_dmak_component__WEBPACK_IMPORTED_MODULE_4__.MaterialDialogDmakComponent,
        _material_dialog_edict_material_dialog_edict_component__WEBPACK_IMPORTED_MODULE_5__.MaterialDialogEdictComponent,
        _material_dialog_belajar_material_dialog_belajar_component__WEBPACK_IMPORTED_MODULE_6__.MaterialDialogBelajarComponent,
        _material_dialog_input_material_dialog_input_component__WEBPACK_IMPORTED_MODULE_7__.MaterialDialogInputComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule,
        ngx_material_file_input__WEBPACK_IMPORTED_MODULE_12__.MaterialFileInputModule,
        _no_data_no_data_module__WEBPACK_IMPORTED_MODULE_2__.NoDataModule,
        _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_1__.CustomPipeModule], exports: [_material_dialog_info_material_dialog_info_component__WEBPACK_IMPORTED_MODULE_3__.MaterialDialogInfoComponent,
        _material_dialog_dmak_material_dialog_dmak_component__WEBPACK_IMPORTED_MODULE_4__.MaterialDialogDmakComponent,
        _material_dialog_edict_material_dialog_edict_component__WEBPACK_IMPORTED_MODULE_5__.MaterialDialogEdictComponent,
        _material_dialog_belajar_material_dialog_belajar_component__WEBPACK_IMPORTED_MODULE_6__.MaterialDialogBelajarComponent,
        _material_dialog_input_material_dialog_input_component__WEBPACK_IMPORTED_MODULE_7__.MaterialDialogInputComponent] }); })();


/***/ }),

/***/ 1875:
/*!***************************************************************************!*\
  !*** ./src/app/_shared/components/material-fab/material-fab.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialFabComponent": () => (/* binding */ MaterialFabComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_fab_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/fab.service */ 96382);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 65590);






class MaterialFabComponent {
    constructor(fs, gs) {
        this.fs = fs;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            //
        }
    }
    get isHidden() {
        return this.fs.isHidden;
    }
    get tooltipText() {
        return this.fs.tooltipText;
    }
    get backgroundImage() {
        return this.fs.backgroundImage;
    }
    get backgroundIcon() {
        return this.fs.backgroundIcon;
    }
    buttonClicked() {
        this.fs.buttonClicked();
    }
}
MaterialFabComponent.ɵfac = function MaterialFabComponent_Factory(t) { return new (t || MaterialFabComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_fab_service__WEBPACK_IMPORTED_MODULE_0__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
MaterialFabComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: MaterialFabComponent, selectors: [["app-material-fab"]], decls: 3, vars: 6, consts: [["type", "button", "mat-fab", "", "color", "warn", 1, "me-3", "mb-5", "fab-button", "animate__animated", "animate__bounce", "animate__infinite", "animate__slow", 3, "matTooltip", "click"]], template: function MaterialFabComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function MaterialFabComponent_Template_button_click_0_listener() { return ctx.buttonClicked(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("display", ctx.isHidden ? "none" : "")("background-image", ctx.backgroundImage ? "url(" + ctx.backgroundImage + ")" : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("matTooltip", ctx.tooltipText);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.backgroundIcon);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__.MatTooltip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon], styles: [".fab-button[_ngcontent-%COMP%] {\r\n  z-index: 9999;\r\n  position: fixed;\r\n  bottom: 0;\r\n  right: 0;\r\n  background-size: contain;\r\n  background-position: center;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGVyaWFsLWZhYi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZixTQUFTO0VBQ1QsUUFBUTtFQUNSLHdCQUF3QjtFQUN4QiwyQkFBMkI7QUFDN0IiLCJmaWxlIjoibWF0ZXJpYWwtZmFiLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZmFiLWJ1dHRvbiB7XHJcbiAgei1pbmRleDogOTk5OTtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgYm90dG9tOiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcclxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 28198:
/*!************************************************************************!*\
  !*** ./src/app/_shared/components/material-fab/material-fab.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialFabModule": () => (/* binding */ MaterialFabModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _material_fab_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./material-fab.component */ 1875);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);




class MaterialFabModule {
}
MaterialFabModule.ɵfac = function MaterialFabModule_Factory(t) { return new (t || MaterialFabModule)(); };
MaterialFabModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: MaterialFabModule });
MaterialFabModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MaterialFabModule, { declarations: [_material_fab_component__WEBPACK_IMPORTED_MODULE_0__.MaterialFabComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule], exports: [_material_fab_component__WEBPACK_IMPORTED_MODULE_0__.MaterialFabComponent] }); })();


/***/ }),

/***/ 40192:
/*!*****************************************************************!*\
  !*** ./src/app/_shared/components/no-data/no-data.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoDataComponent": () => (/* binding */ NoDataComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 36362);



function NoDataComponent_br_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "br");
} }
class NoDataComponent {
    constructor(gs) {
        this.gs = gs;
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
}
NoDataComponent.ɵfac = function NoDataComponent_Factory(t) { return new (t || NoDataComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
NoDataComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: NoDataComponent, selectors: [["app-no-data"]], decls: 7, vars: 1, consts: [[2, "background-image", "url('/assets/img/404/no-data.png')", "background-size", "contain", "background-position", "center", "background-repeat", "no-repeat", "height", "256px", "overflow", "hidden"], [1, "row", "align-items-center", "h-100"], [1, "col-8", "mx-auto", "text-light", "text-center", "rounded", "py-3", 2, "background-color", "rgba(128, 128, 128, 0.875)"], [1, "m-0"], [4, "ngIf"]], template: function NoDataComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h3", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, " Tidak Ada Data ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, NoDataComponent_br_5_Template, 1, 0, "br", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " \u00AF\\_(\u30C4)_/\u00AF ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.GS.isDesktop);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuby1kYXRhLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 12438:
/*!**************************************************************!*\
  !*** ./src/app/_shared/components/no-data/no-data.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoDataModule": () => (/* binding */ NoDataModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _no_data_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./no-data.component */ 40192);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);



class NoDataModule {
}
NoDataModule.ɵfac = function NoDataModule_Factory(t) { return new (t || NoDataModule)(); };
NoDataModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: NoDataModule });
NoDataModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](NoDataModule, { declarations: [_no_data_component__WEBPACK_IMPORTED_MODULE_0__.NoDataComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule], exports: [_no_data_component__WEBPACK_IMPORTED_MODULE_0__.NoDataComponent] }); })();


/***/ }),

/***/ 93380:
/*!***********************************************************************************************!*\
  !*** ./src/app/_shared/components/right-panel/admin-navigation/admin-navigation.component.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminNavigationComponent": () => (/* binding */ AdminNavigationComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/global.service */ 80855);
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/admin.service */ 10466);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ 11961);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 65590);







function AdminNavigationComponent_div_6_mat_icon_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const m_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](m_r1.icon);
} }
function AdminNavigationComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 6)(1, "mat-card")(2, "mat-card-header", 7)(3, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, AdminNavigationComponent_div_6_mat_icon_4_Template, 2, 1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-card-title", 10)(6, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-card-subtitle", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const m_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("routerLink", "/admin-mod/", m_r1.url, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵstyleProp"]("background-image", "url(" + (m_r1.image_url ? m_r1.image_url : "") + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", m_r1.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](m_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](m_r1.deskripsi);
} }
class AdminNavigationComponent {
    constructor(gs, adm) {
        this.gs = gs;
        this.adm = adm;
        if (this.gs.isBrowser) {
            //
        }
    }
    get ADM() {
        return this.adm;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            //
        }
    }
}
AdminNavigationComponent.ɵfac = function AdminNavigationComponent_Factory(t) { return new (t || AdminNavigationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_admin_service__WEBPACK_IMPORTED_MODULE_1__.AdminService)); };
AdminNavigationComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AdminNavigationComponent, selectors: [["app-admin-navigation"]], decls: 7, vars: 1, consts: [[1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12", "px-3"], ["class", "col-12 p-2", 4, "ngFor", "ngForOf"], [1, "col-12", "p-2"], [2, "cursor", "pointer", 3, "routerLink"], ["mat-card-avatar", "", 2, "background-size", "cover", "border-radius", "0"], ["style", "font-size: 300%;", 4, "ngIf"], [1, "text-warning", "mb-1", 2, "cursor", "pointer"], [1, "mb-0"], [2, "font-size", "300%"]], template: function AdminNavigationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2", 2)(3, "b", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Menu Admin Lainnya");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, AdminNavigationComponent_div_6_Template, 10, 6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.ADM.menuList);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardHeader, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardAvatar, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardSubtitle], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1uYXZpZ2F0aW9uLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 71617:
/*!*********************************************************************************!*\
  !*** ./src/app/_shared/components/right-panel/live-chat/live-chat.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LiveChatComponent": () => (/* binding */ LiveChatComponent)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../constants */ 26271);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../models/req-res.model */ 14249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/auth.service */ 4137);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/global.service */ 80855);
/* harmony import */ var _services_stats_server_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/stats-server.service */ 28381);
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/local-storage.service */ 53379);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ 87317);

















const _c0 = ["liveChatScroll"];
function LiveChatComponent_div_2_mat_option_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Global Fansubber");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r5.CONSTANTS.socketRoomNameGlobalFansub);
} }
function LiveChatComponent_div_2_div_14_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 26)(1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 29)(4, "h4", 30)(5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const u_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate1"]("routerLink", "/user/", u_r8.value["username"], "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("matTooltip", u_r8.value["username"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("src", u_r8.value["image_url"], _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](u_r8.value["username"]);
} }
function LiveChatComponent_div_2_div_14_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, LiveChatComponent_div_2_div_14_div_1_div_1_Template, 7, 4, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const u_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", u_r8.value);
} }
function LiveChatComponent_div_2_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, LiveChatComponent_div_2_div_14_div_1_Template, 2, 1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, ctx_r6.roomCurrentOrGlobal.member_list));
} }
function LiveChatComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 13)(1, "div", 3)(2, "h3", 14)(3, "mat-form-field", 15)(4, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Ruang Obrolan");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "mat-select", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueChange", function LiveChatComponent_div_2_Template_mat_select_valueChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r11.liveChatResult.roomId = $event; })("valueChange", function LiveChatComponent_div_2_Template_mat_select_valueChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r12); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r13.changeRoom($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Halaman Ini");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "Global Publik");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, LiveChatComponent_div_2_mat_option_11_Template, 2, 1, "mat-option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 19)(13, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, LiveChatComponent_div_2_div_14_Template, 3, 3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r0.liveChatResult.roomId);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r0.ROUTER.url.split("?")[0]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r0.CONSTANTS.socketRoomNameGlobalPublic);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.isAdminModFansubber);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.roomCurrentOrGlobal);
} }
function LiveChatComponent_div_11_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "img", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const c_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("src", c_r14.sender.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeUrl"]);
} }
function LiveChatComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, LiveChatComponent_div_11_div_1_Template, 2, 1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 32)(3, "h5", 33)(4, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function LiveChatComponent_div_11_Template_span_click_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19); const c_r14 = restoredCtx.$implicit; const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r18.openUserProfile(c_r14.sender.username); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const c_r14 = ctx.$implicit;
    const i_r15 = ctx.index;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMapInterpolate1"]("d-flex py-1 ", i_r15 === ctx_r2.chatCurrentOrGlobal.length - ctx_r2.SS.messageChatUnreadCount ? "border-top" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", c_r14.sender.image_url);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", c_r14.sender.username, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("innerHtml", ctx_r2.innerHtml(c_r14.message), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsanitizeHtml"]);
} }
function LiveChatComponent_mat_form_field_13_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-form-field", 37)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Kirim Pesan Obrolan Disini ...");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "input", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("keyup.enter", function LiveChatComponent_mat_form_field_13_Template_input_keyup_enter_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r20.applyFilter($event); })("ngModelChange", function LiveChatComponent_mat_form_field_13_Template_input_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r21); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r22.liveChatResult.messageToSend = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "mat-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "send");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r3.liveChatResult.messageToSend)("disabled", !ctx_r3.canChat);
} }
function LiveChatComponent_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function LiveChatComponent_button_14_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r24); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r23.login(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "mat-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "vpn_key");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, " Login Untuk Bisa Mengobrol ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} }
const _c1 = function (a0) { return { "height": a0 }; };
class LiveChatComponent {
    constructor(as, gs, ss, ls, router) {
        this.as = as;
        this.gs = gs;
        this.ss = ss;
        this.ls = ls;
        this.router = router;
        this.chatOnly = false;
        this.liveChatResult = {
            messageToSend: '',
            roomId: ''
        };
        this.globalRoom = null;
        this.fansubRoom = null;
        this.currentRoom = null;
        this.messageHistory = [];
        this.subsCurrentRoom = null;
        this.subsGlobalRoom = null;
        this.subsFansubRoom = null;
        this.firstTimeOpen = true;
        this.timedOut = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    get AS() {
        return this.as;
    }
    get ROUTER() {
        return this.router;
    }
    get SS() {
        return this.ss;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.liveChatResult = this.ls.getItem(this.gs.localStorageKeys.LiveChatResults, true) || this.liveChatResult;
            this.liveChatResult.roomId = this.router.url.split('?')[0];
            this.subsCurrentRoom = this.ss.currentRoom.subscribe({
                next: current => {
                    this.currentRoom = current;
                }
            });
            this.subsGlobalRoom = this.ss.globalRoom.subscribe({
                next: global => {
                    this.globalRoom = global;
                }
            });
            this.subsFansubRoom = this.ss.fansubRoom.subscribe({
                next: fansub => {
                    this.fansubRoom = fansub;
                }
            });
        }
    }
    get CONSTANTS() {
        return _constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS;
    }
    get isAdminModFansubber() {
        var _a, _b, _c, _d, _e, _f, _g;
        if ((_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) {
            if (((_c = (_b = this.as.currentUserSubject) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN ||
                ((_e = (_d = this.as.currentUserSubject) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR ||
                ((_g = (_f = this.as.currentUserSubject) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER) {
                return true;
            }
        }
        return false;
    }
    get roomCurrentOrGlobal() {
        if (this.liveChatResult.roomId === _constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.socketRoomNameGlobalPublic) {
            return this.globalRoom;
        }
        else if (this.liveChatResult.roomId === _constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.socketRoomNameGlobalFansub) {
            return this.fansubRoom;
        }
        else {
            return this.currentRoom;
        }
    }
    get chatCurrentOrGlobal() {
        if (this.liveChatResult.roomId === _constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.socketRoomNameGlobalPublic) {
            this.messageHistory = this.ss.globalChatRoom;
        }
        else if (this.liveChatResult.roomId === _constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.socketRoomNameGlobalFansub) {
            this.messageHistory = this.ss.fansubChatRoom;
        }
        else {
            this.messageHistory = this.ss.currentChatRoom;
        }
        if (this.ss.messageChatUnreadCount > 0) {
            this.scrollMessage();
        }
        return this.messageHistory;
    }
    get canChat() {
        var _a;
        if ((_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) {
            if (this.liveChatResult.roomId !== _constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.socketRoomNameGlobalFansub) {
                return true;
            }
            return this.isAdminModFansubber;
        }
        return false;
    }
    ngAfterViewInit() {
        if (this.gs.isBrowser) {
            this.scrollMessage();
        }
    }
    ngOnDestroy() {
        var _a, _b;
        this.ls.setItem(this.gs.localStorageKeys.LiveChatResults, this.liveChatResult);
        (_a = this.subsCurrentRoom) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsGlobalRoom) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        if (this.timedOut) {
            clearTimeout(this.timedOut);
            this.timedOut = null;
        }
    }
    innerHtml(text) {
        return this.gs.linkify(this.gs.htmlToText(text));
    }
    scrollToBottom() {
        this.timedOut = setTimeout(() => {
            this.ss.messageChatUnreadCount = 0;
            this.liveChatScroll.nativeElement.scrollTop = this.liveChatScroll.nativeElement.scrollHeight;
        }, 0);
    }
    scrollMessage() {
        if (this.liveChatScroll) {
            if (this.firstTimeOpen) {
                this.firstTimeOpen = false;
                this.scrollToBottom();
            }
            else if (this.liveChatScroll.nativeElement.scrollTop + this.liveChatScroll.nativeElement.clientHeight === this.liveChatScroll.nativeElement.scrollHeight) {
                this.scrollToBottom();
            }
        }
    }
    sendMessage() {
        this.ss.socketEmit('send-chat', {
            roomId: this.roomCurrentOrGlobal.room_id,
            message: this.gs.htmlToText(this.liveChatResult.messageToSend)
        });
        this.liveChatResult.messageToSend = null;
    }
    applyFilter(event) {
        this.gs.log('[MESSAGE_VALUE_CHANGED]', event);
        this.liveChatResult.messageToSend = event.target.value.trim().toLowerCase();
        if (this.liveChatResult.messageToSend) {
            this.sendMessage();
        }
    }
    changeRoom(data) {
        this.gs.log('[MESSAGE_ROOM_CHANGED]', data);
        this.liveChatResult.roomId = data;
        this.scrollMessage();
    }
    login() {
        this.router.navigate(['/login'], {
            queryParams: {
                returnUrl: this.router.url.split('?')[0]
            }
        });
    }
    openUserProfile(username) {
        this.router.navigateByUrl(`/user/${username}`);
    }
}
LiveChatComponent.ɵfac = function LiveChatComponent_Factory(t) { return new (t || LiveChatComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_stats_server_service__WEBPACK_IMPORTED_MODULE_4__.StatsServerService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router)); };
LiveChatComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: LiveChatComponent, selectors: [["app-live-chat"]], viewQuery: function LiveChatComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_c0, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.liveChatScroll = _t.first);
    } }, inputs: { chatOnly: "chatOnly" }, decls: 15, vars: 13, consts: [[1, "row", 3, "ngStyle"], [1, "col-12", "h-100"], ["class", "row", "style", "height: 40%!important;", 4, "ngIf"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12"], [2, "overflow-y", "auto", 3, "ngStyle"], ["liveChatScroll", ""], [3, "class", 4, "ngFor", "ngForOf"], [1, "col-12", "mt-auto"], ["class", "mt-3 col-12", 3, "color", 4, "ngIf"], ["type", "button", "class", "mt-4 col-12 text-light", "mat-flat-button", "", "color", "accent", 3, "click", 4, "ngIf"], [1, "row", 2, "height", "40%!important"], [1, "border-bottom-dotted", "row"], [1, "pt-3", "col-12", 3, "color"], [3, "value", "valueChange"], [3, "value"], [3, "value", 4, "ngIf"], [1, "col-12", 2, "height", "calc(100% - 105px)"], [1, "h-100", 2, "overflow-y", "auto"], ["class", "row m-0", 4, "ngIf"], [1, "row", "m-0"], ["class", "col-6 p-0", 4, "ngFor", "ngForOf"], [1, "col-6", "p-0"], ["class", "card d-flex py-1 align-items-center p-1 text-success", 3, "routerLink", "matTooltip", 4, "ngIf"], [1, "card", "d-flex", "py-1", "align-items-center", "p-1", "text-success", 3, "routerLink", "matTooltip"], [1, "flex-shrink-0"], ["height", "24", "width", "24", 1, "ms-1", "mt-1", 2, "object-fit", "cover", 3, "src"], [1, "flex-grow-1", "mx-1", "text-truncate"], ["matLine", "", 1, "m-0", "text-truncate"], ["class", "flex-shrink-0", 4, "ngIf"], [1, "flex-grow-1", "mx-1", "my-auto"], ["matLine", "", 1, "m-0"], [1, "me-1", "text-success", 2, "cursor", "pointer", 3, "click"], [1, "text-warning", 2, "word-break", "break-word", 3, "innerHtml"], ["height", "24", "width", "24", 1, "ms-1", "mt-1", 3, "src"], [1, "mt-3", "col-12", 3, "color"], ["matInput", "", "maxlength", "200", "placeholder", "Ex. Hello \u4E16\u754C\uFF01", 3, "ngModel", "disabled", "keyup.enter", "ngModelChange"], ["matSuffix", ""], ["type", "button", "mat-flat-button", "", "color", "accent", 1, "mt-4", "col-12", "text-light", 3, "click"], [1, "me-1"]], template: function LiveChatComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, LiveChatComponent_div_2_Template, 15, 6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 0)(4, "div", 3)(5, "h2", 4)(6, "b", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Obrolan");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 6)(9, "div", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, LiveChatComponent_div_11_Template, 7, 6, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, LiveChatComponent_mat_form_field_13_Template, 6, 3, "mat-form-field", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, LiveChatComponent_button_14_Template, 4, 0, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](7, _c1, ctx.chatOnly ? "" : "calc(100vh - 120px)"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.chatOnly);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](9, _c1, ctx.chatOnly ? "100%!important" : "60%!important"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](11, _c1, ctx.chatOnly ? "320px" : "calc(50vh - 139px)"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.chatCurrentOrGlobal);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.AS.currentUserSubject == null ? null : ctx.AS.currentUserSubject.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !(ctx.AS.currentUserSubject == null ? null : ctx.AS.currentUserSubject.value));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgStyle, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatOption, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__.MatTooltip, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatLine, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgModel, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatSuffix, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButton], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.KeyValuePipe], styles: [".card[_ngcontent-%COMP%] {\r\n  position: inherit;\r\n  display: flex;\r\n  flex-direction: row;\r\n  min-width: 0;\r\n  overflow-wrap: anywhere;\r\n  background-color: rgba(0,0,0,0) !important;\r\n  background-clip: border-box;\r\n  border: none;\r\n  border-radius: .25rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]:hover {\r\n  color: #ffc107 !important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpdmUtY2hhdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLHVCQUF1QjtFQUN2QiwwQ0FBMEM7RUFDMUMsMkJBQTJCO0VBQzNCLFlBQVk7RUFDWixxQkFBcUI7RUFDckIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQiIsImZpbGUiOiJsaXZlLWNoYXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jYXJkIHtcclxuICBwb3NpdGlvbjogaW5oZXJpdDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XHJcbiAgbWluLXdpZHRoOiAwO1xyXG4gIG92ZXJmbG93LXdyYXA6IGFueXdoZXJlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMCkgIWltcG9ydGFudDtcclxuICBiYWNrZ3JvdW5kLWNsaXA6IGJvcmRlci1ib3g7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IC4yNXJlbTtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5jYXJkOmhvdmVyIHtcclxuICBjb2xvcjogI2ZmYzEwNyAhaW1wb3J0YW50O1xyXG59Il19 */"] });


/***/ }),

/***/ 13223:
/*!*************************************************************************!*\
  !*** ./src/app/_shared/components/right-panel/right-panel.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RightPanelComponent": () => (/* binding */ RightPanelComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_right_panel_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/right-panel.service */ 56514);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);




function RightPanelComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](0, 4);
} }
class RightPanelComponent {
    constructor(rps, gs) {
        this.rps = rps;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    get RPS() {
        return this.rps;
    }
    ngOnInit() {
        //
    }
}
RightPanelComponent.ɵfac = function RightPanelComponent_Factory(t) { return new (t || RightPanelComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_right_panel_service__WEBPACK_IMPORTED_MODULE_0__.RightPanelService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
RightPanelComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: RightPanelComponent, selectors: [["app-right-panel"]], decls: 4, vars: 1, consts: [[1, "sidepanel_container", "p-3"], [1, "row"], [1, "col-12"], ["ngIf", "rps.component", 4, "ngComponentOutlet"], ["ngIf", "rps.component"]], template: function RightPanelComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, RightPanelComponent_ng_container_3_Template, 1, 0, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngComponentOutlet", ctx.RPS.componentView);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgComponentOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf], styles: [".sidepanel_container[_ngcontent-%COMP%] {\r\n  max-width: 320px;\r\n}\r\n\r\n.mat-list-item-content[_ngcontent-%COMP%] {\r\n  padding: 0 !important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJpZ2h0LXBhbmVsLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkIiLCJmaWxlIjoicmlnaHQtcGFuZWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zaWRlcGFuZWxfY29udGFpbmVyIHtcclxuICBtYXgtd2lkdGg6IDMyMHB4O1xyXG59XHJcblxyXG4ubWF0LWxpc3QtaXRlbS1jb250ZW50IHtcclxuICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 85116:
/*!**********************************************************************!*\
  !*** ./src/app/_shared/components/right-panel/right-panel.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RightPanelModule": () => (/* binding */ RightPanelModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _right_panel_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./right-panel.component */ 13223);
/* harmony import */ var _search_all_search_all_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search-all/search-all.component */ 62644);
/* harmony import */ var _admin_navigation_admin_navigation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin-navigation/admin-navigation.component */ 93380);
/* harmony import */ var _live_chat_live_chat_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./live-chat/live-chat.component */ 71617);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);









class RightPanelModule {
}
RightPanelModule.ɵfac = function RightPanelModule_Factory(t) { return new (t || RightPanelModule)(); };
RightPanelModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: RightPanelModule });
RightPanelModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](RightPanelModule, { declarations: [_right_panel_component__WEBPACK_IMPORTED_MODULE_1__.RightPanelComponent,
        _search_all_search_all_component__WEBPACK_IMPORTED_MODULE_2__.SearchAllComponent,
        _admin_navigation_admin_navigation_component__WEBPACK_IMPORTED_MODULE_3__.AdminNavigationComponent,
        _live_chat_live_chat_component__WEBPACK_IMPORTED_MODULE_4__.LiveChatComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule], exports: [_right_panel_component__WEBPACK_IMPORTED_MODULE_1__.RightPanelComponent,
        _live_chat_live_chat_component__WEBPACK_IMPORTED_MODULE_4__.LiveChatComponent] }); })();


/***/ }),

/***/ 62644:
/*!***********************************************************************************!*\
  !*** ./src/app/_shared/components/right-panel/search-all/search-all.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchAllComponent": () => (/* binding */ SearchAllComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/global.service */ 80855);
/* harmony import */ var _services_news_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/news.service */ 49618);
/* harmony import */ var _services_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/dialog.service */ 55393);
/* harmony import */ var _services_nihongo_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/nihongo.service */ 52663);
/* harmony import */ var _services_anime_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/anime.service */ 80519);
/* harmony import */ var _services_dorama_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/dorama.service */ 18439);
/* harmony import */ var _services_fansub_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/fansub.service */ 76781);
/* harmony import */ var _services_berkas_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/berkas.service */ 8987);
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/user.service */ 8058);
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/local-storage.service */ 53379);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/core */ 88133);



















function SearchAllComponent_div_9_mat_list_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-list-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "h4", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "h5", 13)(5, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](10, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const b_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate1"]("routerLink", "/news/", b_r8.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate"]("src", b_r8.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](b_r8.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](b_r8.user_.username);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](10, 5, b_r8.created_at, "d-MM-y"));
} }
function SearchAllComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 5)(2, "h2", 7)(3, "b", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Berita");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 5)(6, "mat-selection-list", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, SearchAllComponent_div_9_mat_list_option_7_Template, 11, 8, "mat-list-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind3"](8, 2, ctx_r0.searchResult.beritaResults, 0, 5));
} }
function SearchAllComponent_div_10_mat_list_option_7_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-list-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function SearchAllComponent_div_10_mat_list_option_7_Template_mat_list_option_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r12); const k_r10 = restoredCtx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2); return ctx_r11.openEdict(k_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "h4", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "h5", 18)(4, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6, " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const k_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate3"](" ", k_r10.character, " | ", k_r10.v_kunyomi, "| ", k_r10.v_onyomi, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("N", k_r10.jlpt, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](k_r10.translate);
} }
function SearchAllComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 5)(2, "h2", 7)(3, "b", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Kanji");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 5)(6, "mat-selection-list", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, SearchAllComponent_div_10_mat_list_option_7_Template, 9, 5, "mat-list-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind3"](8, 2, ctx_r1.searchResult.kanjiResults, 0, 5));
} }
function SearchAllComponent_div_11_mat_list_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-list-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "h4", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "h5", 13)(5, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const a_r14 = ctx.$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate2"]("routerLink", "/anime/", a_r14.id, "-", ctx_r13.getAnimeTitle(a_r14.title), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate"]("src", a_r14.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](a_r14.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](a_r14.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate2"]("", a_r14.num_episodes, " Eps ", a_r14.media_type == null ? null : a_r14.media_type.toUpperCase(), "");
} }
function SearchAllComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 5)(2, "h2", 7)(3, "b", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Anime");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 5)(6, "mat-selection-list", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, SearchAllComponent_div_11_mat_list_option_7_Template, 10, 7, "mat-list-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind3"](8, 2, ctx_r2.searchResult.animeResults, 0, 5));
} }
function SearchAllComponent_div_12_mat_list_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-list-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "h4", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "h5", 13)(5, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const d_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate1"]("routerLink", "/dorama/", d_r16.slug, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate"]("src", d_r16.thumb, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](d_r16.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](d_r16.mdl_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](d_r16.type);
} }
function SearchAllComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 5)(2, "h2", 7)(3, "b", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Dorama");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 5)(6, "mat-selection-list", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, SearchAllComponent_div_12_mat_list_option_7_Template, 10, 5, "mat-list-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind3"](8, 2, ctx_r3.searchResult.doramaResults, 0, 5));
} }
function SearchAllComponent_div_13_mat_list_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-list-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "h4", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "h5", 13)(5, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](10, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const f_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate1"]("routerLink", "/fansub/", f_r18.slug, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate"]("src", f_r18.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](f_r18.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](f_r18.active ? "Aktif" : "Tidak Aktif");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](10, 5, f_r18.born, "d-MM-y"));
} }
function SearchAllComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 5)(2, "h2", 7)(3, "b", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Fansub");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 5)(6, "mat-selection-list", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, SearchAllComponent_div_13_mat_list_option_7_Template, 11, 8, "mat-list-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind3"](8, 2, ctx_r4.searchResult.fansubResults, 0, 5));
} }
function SearchAllComponent_div_14_mat_list_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-list-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "h4", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "h5", 13)(5, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](10, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const b_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate1"]("routerLink", "/berkas/", b_r20.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate"]("src", b_r20.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](b_r20.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](b_r20.user_.username);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](10, 5, b_r20.created_at, "d-MM-y"));
} }
function SearchAllComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 5)(2, "h2", 7)(3, "b", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Berkas");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 5)(6, "mat-selection-list", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, SearchAllComponent_div_14_mat_list_option_7_Template, 11, 8, "mat-list-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind3"](8, 2, ctx_r5.searchResult.berkasResults, 0, 5));
} }
function SearchAllComponent_div_15_mat_list_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-list-option", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "h4", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "h5", 13)(5, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, " \u00A0 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](10, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const p_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate1"]("routerLink", "/user/", p_r22.username, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate"]("src", p_r22.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](p_r22.kartu_tanda_penduduk_.nama);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](p_r22.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](10, 5, p_r22.created_at, "d-MM-y"));
} }
function SearchAllComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 5)(2, "h2", 7)(3, "b", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Pengguna");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 5)(6, "mat-selection-list", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, SearchAllComponent_div_15_mat_list_option_7_Template, 11, 8, "mat-list-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind3"](8, 2, ctx_r6.searchResult.penggunaResults, 0, 5));
} }
class SearchAllComponent {
    constructor(gs, news, ds, nihon, anime, dorama, fansub, berkas, user, ls) {
        this.gs = gs;
        this.news = news;
        this.ds = ds;
        this.nihon = nihon;
        this.anime = anime;
        this.dorama = dorama;
        this.fansub = fansub;
        this.berkas = berkas;
        this.user = user;
        this.ls = ls;
        this.searchResult = {
            q: '',
            beritaResults: [],
            kanjiResults: [],
            animeResults: [],
            doramaResults: [],
            fansubResults: [],
            berkasResults: [],
            penggunaResults: [],
        };
        this.subsBerita = null;
        this.subsKanji = null;
        this.subsAnime = null;
        this.subsDorama = null;
        this.subsFansub = null;
        this.subsBerkas = null;
        this.subsPengguna = null;
        this.subsDialog = null;
        this.timedOut1 = null;
        this.timedOut2 = null;
        this.timedOut3 = null;
        this.timedOut4 = null;
        this.timedOut5 = null;
        this.timedOut6 = null;
        this.timedOut7 = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.searchResult = this.ls.getItem(this.gs.localStorageKeys.SearchResults, true) || this.searchResult;
        }
    }
    ngOnDestroy() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.ls.setItem(this.gs.localStorageKeys.SearchResults, this.searchResult);
        (_a = this.subsBerita) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsKanji) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsAnime) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsDorama) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.subsFansub) === null || _e === void 0 ? void 0 : _e.unsubscribe();
        (_f = this.subsBerkas) === null || _f === void 0 ? void 0 : _f.unsubscribe();
        (_g = this.subsPengguna) === null || _g === void 0 ? void 0 : _g.unsubscribe();
        (_h = this.subsDialog) === null || _h === void 0 ? void 0 : _h.unsubscribe();
        if (this.timedOut1) {
            clearTimeout(this.timedOut1);
            this.timedOut1 = null;
        }
        if (this.timedOut2) {
            clearTimeout(this.timedOut2);
            this.timedOut2 = null;
        }
        if (this.timedOut3) {
            clearTimeout(this.timedOut3);
            this.timedOut3 = null;
        }
        if (this.timedOut4) {
            clearTimeout(this.timedOut4);
            this.timedOut4 = null;
        }
        if (this.timedOut5) {
            clearTimeout(this.timedOut5);
            this.timedOut5 = null;
        }
        if (this.timedOut6) {
            clearTimeout(this.timedOut6);
            this.timedOut6 = null;
        }
        if (this.timedOut7) {
            clearTimeout(this.timedOut7);
            this.timedOut7 = null;
        }
    }
    applyFilter(event) {
        this.gs.log('[SEARCH_VALUE_CHANGED]', event);
        this.searchResult.q = event.target.value.trim().toLowerCase();
        this.searchResult.beritaResults = [];
        this.searchResult.kanjiResults = [];
        this.searchResult.animeResults = [];
        this.searchResult.doramaResults = [];
        this.searchResult.fansubResults = [];
        this.searchResult.berkasResults = [];
        this.searchResult.penggunaResults = [];
        if (this.searchResult.q) {
            this.timedOut1 = setTimeout(() => { this.getNews(); }, 250);
            this.timedOut2 = setTimeout(() => { this.getKanji(); }, 500);
            this.timedOut3 = setTimeout(() => { this.getAnime(); }, 750);
            this.timedOut4 = setTimeout(() => { this.getDorama(); }, 1000);
            this.timedOut5 = setTimeout(() => { this.getFansub(); }, 1250);
            this.timedOut6 = setTimeout(() => { this.getBerkas(); }, 1500);
            this.timedOut7 = setTimeout(() => { this.getPengguna(); }, 1750);
        }
    }
    openEdict(kana) {
        this.gs.log('[HIRAKATA_OPEN_EDICT]', kana);
        this.subsDialog = this.ds.openEdictDialog({
            data: {
                character: kana.character,
                context: kana.context,
                freq: kana.freq,
                gakken: kana.gakken,
                harlpern_kkld: kana.harlpern_kkld,
                harlpern_njecd: kana.harlpern_njecd,
                jlpt: kana.jlpt,
                maniette: kana.maniette,
                nelson_c: kana.nelson_c,
                nelson_n: kana.nelson_n,
                remember: kana.remember,
                school: kana.school,
                skip: kana.skip,
                stroke: kana.stroke,
                translate: kana.translate,
                v_kunyomi: kana.v_kunyomi,
                v_onyomi: kana.v_onyomi
            },
            disableClose: false
        }).afterClosed().subscribe({
            next: re => {
                this.gs.log('[EDICT_DIALOG_CLOSED]', re);
                this.subsDialog.unsubscribe();
            }
        });
    }
    getNews() {
        if (this.subsBerita) {
            this.subsBerita.unsubscribe();
        }
        this.subsBerita = this.news.getAllNews(this.searchResult.q, 1, 5).subscribe({
            next: res => {
                this.gs.log('[NEWS_SEARCH_SUCCESS]', res);
                this.searchResult.beritaResults = res.results;
            },
            error: err => {
                this.gs.log('[NEWS_SEARCH_ERROR]', err, 'error');
            }
        });
    }
    getKanji() {
        if (this.subsKanji) {
            this.subsKanji.unsubscribe();
        }
        this.subsKanji = this.nihon.getAllKanji('', '', this.searchResult.q, 1, 5).subscribe({
            next: res => {
                this.gs.log('[KANJI_SEARCH_SUCCESS]', res);
                this.searchResult.kanjiResults = res.results;
            },
            error: err => {
                this.gs.log('[KANJI_SEARCH_ERROR]', err, 'error');
            }
        });
    }
    getAnimeTitle(title) {
        return title.replace(/[^a-zA-Z0-9]/g, '-');
    }
    getAnime() {
        if (this.subsAnime) {
            this.subsAnime.unsubscribe();
        }
        this.subsAnime = this.anime.searchAnime(this.searchResult.q).subscribe({
            next: res => {
                this.gs.log('[ANIME_SEARCH_SUCCESS]', res);
                this.searchResult.animeResults = res.results;
            },
            error: err => {
                this.gs.log('[ANIME_SEARCH_ERROR]', err, 'error');
            }
        });
    }
    getDorama() {
        if (this.subsDorama) {
            this.subsDorama.unsubscribe();
        }
        this.subsDorama = this.dorama.searchDorama(this.searchResult.q).subscribe({
            next: res => {
                this.gs.log('[DORAMA_SEARCH_SUCCESS]', res);
                this.searchResult.doramaResults = res.results;
            },
            error: err => {
                this.gs.log('[DORAMA_SEARCH_ERROR]', err, 'error');
            }
        });
    }
    getFansub() {
        if (this.subsFansub) {
            this.subsFansub.unsubscribe();
        }
        this.subsFansub = this.fansub.searchFansub(this.searchResult.q, 1, 5).subscribe({
            next: res => {
                this.gs.log('[FANSUB_SEARCH_SUCCESS]', res);
                this.searchResult.fansubResults = res.results;
            },
            error: err => {
                this.gs.log('[FANSUB_SEARCH_ERROR]', err, 'error');
            }
        });
    }
    getBerkas() {
        if (this.subsBerkas) {
            this.subsBerkas.unsubscribe();
        }
        this.subsBerkas = this.berkas.getAllBerkas(this.searchResult.q, 1, 5, '', '', true).subscribe({
            next: res => {
                this.gs.log('[BERKAS_SEARCH_SUCCESS]', res);
                this.searchResult.berkasResults = res.results;
            },
            error: err => {
                this.gs.log('[BERKAS_SEARCH_ERROR]', err, 'error');
            }
        });
    }
    getPengguna() {
        if (this.subsPengguna) {
            this.subsPengguna.unsubscribe();
        }
        this.subsPengguna = this.user.getAllUser(this.searchResult.q, 1, 5).subscribe({
            next: res => {
                this.gs.log('[PENGGUNA_SEARCH_SUCCESS]', res);
                this.searchResult.penggunaResults = res.results;
            },
            error: err => {
                this.gs.log('[PENGGUNA_SEARCH_ERROR]', err, 'error');
            }
        });
    }
}
SearchAllComponent.ɵfac = function SearchAllComponent_Factory(t) { return new (t || SearchAllComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_news_service__WEBPACK_IMPORTED_MODULE_1__.NewsService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_dialog_service__WEBPACK_IMPORTED_MODULE_2__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_nihongo_service__WEBPACK_IMPORTED_MODULE_3__.NihongoService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_anime_service__WEBPACK_IMPORTED_MODULE_4__.AnimeService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_dorama_service__WEBPACK_IMPORTED_MODULE_5__.DoramaService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_fansub_service__WEBPACK_IMPORTED_MODULE_6__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_berkas_service__WEBPACK_IMPORTED_MODULE_7__.BerkasService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_user_service__WEBPACK_IMPORTED_MODULE_8__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_local_storage_service__WEBPACK_IMPORTED_MODULE_9__.LocalStorageService)); };
SearchAllComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: SearchAllComponent, selectors: [["app-search-all"]], decls: 16, vars: 9, consts: [[1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "ms-auto", "pt-3", "col-12", 3, "color"], ["matInput", "", "maxlength", "200", "placeholder", "Ex. \u3070\u30FC\u304B\u30FC\uFF01", 3, "ngModel", "keyup.enter", "ngModelChange"], ["matSuffix", ""], [1, "col-12"], ["class", "row", 4, "ngIf"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "pt-0", 3, "multiple"], [3, "routerLink", 4, "ngFor", "ngForOf"], [3, "routerLink"], ["matListAvatar", "", 1, "ms-3", 2, "border-radius", "0", 3, "src"], ["matLine", ""], [1, "text-warning"], [1, "text-success"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["matLine", "", 1, "ms-3"]], template: function SearchAllComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "mat-form-field", 2)(3, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Cari Apapun Di Sini ...");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("keyup.enter", function SearchAllComponent_Template_input_keyup_enter_5_listener($event) { return ctx.applyFilter($event); })("ngModelChange", function SearchAllComponent_Template_input_ngModelChange_5_listener($event) { return ctx.searchResult.q = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "mat-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](9, SearchAllComponent_div_9_Template, 9, 6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](10, SearchAllComponent_div_10_Template, 9, 6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](11, SearchAllComponent_div_11_Template, 9, 6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](12, SearchAllComponent_div_12_Template, 9, 6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, SearchAllComponent_div_13_Template, 9, 6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](14, SearchAllComponent_div_14_Template, 9, 6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](15, SearchAllComponent_div_15_Template, 9, 6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", "accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx.searchResult.q);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.searchResult.beritaResults.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.searchResult.kanjiResults.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.searchResult.animeResults.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.searchResult.doramaResults.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.searchResult.fansubResults.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.searchResult.berkasResults.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.searchResult.penggunaResults.length > 0);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatSuffix, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_material_list__WEBPACK_IMPORTED_MODULE_16__.MatSelectionList, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_material_list__WEBPACK_IMPORTED_MODULE_16__.MatListOption, _angular_router__WEBPACK_IMPORTED_MODULE_17__.RouterLink, _angular_material_list__WEBPACK_IMPORTED_MODULE_16__.MatListAvatarCssMatStyler, _angular_material_core__WEBPACK_IMPORTED_MODULE_18__.MatLine], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_15__.DatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWFyY2gtYWxsLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 40765:
/*!*****************************************************!*\
  !*** ./src/app/_shared/configs/my-hammer.config.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MyHammerConfig": () => (/* binding */ MyHammerConfig)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class MyHammerConfig extends _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = {
            pinch: {
                enable: false
            },
            rotate: {
                enable: false
            }
        };
    }
}
MyHammerConfig.ɵfac = /*@__PURE__*/ function () { let ɵMyHammerConfig_BaseFactory; return function MyHammerConfig_Factory(t) { return (ɵMyHammerConfig_BaseFactory || (ɵMyHammerConfig_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetInheritedFactory"](MyHammerConfig)))(t || MyHammerConfig); }; }();
MyHammerConfig.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: MyHammerConfig, factory: MyHammerConfig.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 2777:
/*!***********************************************!*\
  !*** ./src/app/_shared/guards/roles.guard.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RolesGuard": () => (/* binding */ RolesGuard)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth.service */ 4137);
/* harmony import */ var _services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/toast.service */ 96925);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/global.service */ 80855);
/* harmony import */ var _services_busy_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/busy.service */ 33000);







class RolesGuard {
    constructor(router, as, toast, gs, bs) {
        this.router = router;
        this.as = as;
        this.toast = toast;
        this.gs = gs;
        this.bs = bs;
        if (this.gs.isBrowser) {
            //
        }
    }
    canActivate(route, state) {
        var _a;
        const requiredRoles = route.data[_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles];
        if (!requiredRoles) {
            return true;
        }
        if (this.gs.isBrowser) {
            const user = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value;
            if (user) {
                const isAllowed = requiredRoles.includes(user.role);
                if (isAllowed) {
                    return true;
                }
                this.bs.clear();
                this.toast.error(`Membutuhkan Role :: ${requiredRoles.join(' / ')}`, 'Whoops, Akses Ditolak!', null, true);
                this.router.navigateByUrl(this.gs.previousUrl || '/');
                return false;
            }
            this.bs.clear();
            this.toast.error(`Harap Login Terlebih Dahulu~`, 'Whoops, Akses Ditolak!', null, true);
        }
        this.router.navigate(['/login'], {
            queryParams: {
                returnUrl: state.url
            }
        });
        return false;
    }
}
RolesGuard.ɵfac = function RolesGuard_Factory(t) { return new (t || RolesGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_services_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_services_busy_service__WEBPACK_IMPORTED_MODULE_4__.BusyService)); };
RolesGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: RolesGuard, factory: RolesGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 55094:
/*!**************************************************!*\
  !*** ./src/app/_shared/guards/verified.guard.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VerifiedGuard": () => (/* binding */ VerifiedGuard)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth.service */ 4137);
/* harmony import */ var _services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/toast.service */ 96925);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/global.service */ 80855);
/* harmony import */ var _services_busy_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/busy.service */ 33000);







class VerifiedGuard {
    constructor(router, as, toast, gs, bs) {
        this.router = router;
        this.as = as;
        this.toast = toast;
        this.gs = gs;
        this.bs = bs;
        if (this.gs.isBrowser) {
            //
        }
    }
    canActivate(route, state) {
        var _a;
        const verifiedOnly = route.data[_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorVerifiedOnly];
        if (!verifiedOnly) {
            return true;
        }
        if (this.gs.isBrowser) {
            const user = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value;
            if (user) {
                if (user.verified) {
                    return true;
                }
                this.bs.clear();
                this.toast.error('Khusus Pengguna Terverifikasi', 'Whoops, Akses Ditolak!', null, true);
                this.router.navigateByUrl('/verify');
                return false;
            }
            this.bs.clear();
            this.toast.error(`Harap Login Terlebih Dahulu~`, 'Whoops, Akses Ditolak!', null, true);
        }
        this.router.navigate(['/login'], {
            queryParams: {
                returnUrl: state.url
            }
        });
        return false;
    }
}
VerifiedGuard.ɵfac = function VerifiedGuard_Factory(t) { return new (t || VerifiedGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_services_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_services_busy_service__WEBPACK_IMPORTED_MODULE_4__.BusyService)); };
VerifiedGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: VerifiedGuard, factory: VerifiedGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 32220:
/*!********************************************!*\
  !*** ./src/app/_shared/helpers/tooltip.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MyTooltipConfig": () => (/* binding */ MyTooltipConfig)
/* harmony export */ });
const MyTooltipConfig = {
    showDelay: 250,
    hideDelay: 0,
    touchendHideDelay: 0,
    touchGestures: 'off',
};


/***/ }),

/***/ 66072:
/*!*****************************************************************!*\
  !*** ./src/app/_shared/interceptors/http-cancel.interceptor.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpCancelInterceptor": () => (/* binding */ HttpCancelInterceptor)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 68951);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/global.service */ 80855);
/* harmony import */ var _services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/busy.service */ 33000);




class HttpCancelInterceptor {
    constructor(gs, bs) {
        this.gs = gs;
        this.bs = bs;
        if (this.gs.isBrowser) {
            //
        }
    }
    intercept(request, next) {
        return next.handle(request).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this.bs.onCancelPendingRequests));
    }
}
HttpCancelInterceptor.ɵfac = function HttpCancelInterceptor_Factory(t) { return new (t || HttpCancelInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService)); };
HttpCancelInterceptor.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: HttpCancelInterceptor, factory: HttpCancelInterceptor.ɵfac });


/***/ }),

/***/ 51313:
/*!******************************************************************!*\
  !*** ./src/app/_shared/interceptors/http-request.interceptor.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpRequestInterceptor": () => (/* binding */ HttpRequestInterceptor)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/global.service */ 80855);
/* harmony import */ var _services_stats_server_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/stats-server.service */ 28381);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/auth.service */ 4137);





class HttpRequestInterceptor {
    constructor(gs, ss, as) {
        this.gs = gs;
        this.ss = ss;
        this.as = as;
        if (this.gs.isBrowser) {
            //
        }
    }
    intercept(request, next) {
        var _a;
        const urlTarget = request.url;
        const intercept = urlTarget.startsWith(_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl) || urlTarget.startsWith(_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl);
        if (this.gs.isBrowser && intercept) {
            request = request.clone({
                withCredentials: !this.gs.isDevMode
            });
            if (this.as.token) {
                const tokenLength = this.as.token.length;
                const shortToken = this.as.token.slice(0, 5) + '.....' + this.as.token.slice(tokenLength - 5, tokenLength);
                this.gs.log('[INTERCEPT_JWT]', shortToken);
                request = request.clone({
                    headers: request.headers.append('Authorization', `Bearer ${this.as.token}`)
                });
            }
            if ((_a = this.ss.mySocket) === null || _a === void 0 ? void 0 : _a.id) {
                this.gs.log('[INTERCEPT_SOCKET]', this.ss.mySocket.id);
                request = request.clone({
                    headers: request.headers.append('x-socket-id', this.ss.mySocket.id)
                });
            }
        }
        return next.handle(request);
    }
}
HttpRequestInterceptor.ɵfac = function HttpRequestInterceptor_Factory(t) { return new (t || HttpRequestInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_stats_server_service__WEBPACK_IMPORTED_MODULE_2__.StatsServerService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService)); };
HttpRequestInterceptor.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: HttpRequestInterceptor, factory: HttpRequestInterceptor.ɵfac });


/***/ }),

/***/ 71485:
/*!*******************************************************************!*\
  !*** ./src/app/_shared/interceptors/http-response.interceptor.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpResponseInterceptor": () => (/* binding */ HttpResponseInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 28784);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 19337);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 53158);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 25474);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/global.service */ 80855);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ 4137);
/* harmony import */ var _services_toast_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/toast.service */ 96925);
/* harmony import */ var _services_busy_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/busy.service */ 33000);
/* harmony import */ var _services_stats_server_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/stats-server.service */ 28381);
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/local-storage.service */ 53379);












class HttpResponseInterceptor {
    constructor(gs, router, as, toast, bs, ss, ls, activatedRoute) {
        this.gs = gs;
        this.router = router;
        this.as = as;
        this.toast = toast;
        this.bs = bs;
        this.ss = ss;
        this.ls = ls;
        this.activatedRoute = activatedRoute;
        if (this.gs.isBrowser) {
            //
        }
    }
    intercept(request, next) {
        return next.handle(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)((res) => {
            if (res instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpResponse && this.gs.isBrowser) {
                let okMessage = 'UwUu~ Berhasil~';
                let okTitle = 'Yeay, Selesai!';
                if (res) {
                    if (res.body) {
                        if (res.body.info) {
                            okTitle = res.body.info;
                        }
                        if (res.body.result) {
                            if (res.body.result.message) {
                                okMessage = res.body.result.message;
                            }
                        }
                    }
                }
                switch (res.status) {
                    case 200:
                        this.toast.success(okMessage, okTitle);
                        break;
                    case 201:
                    case 202:
                        this.toast.info(okMessage, okTitle);
                        break;
                    default:
                        this.toast.warning(okMessage, okTitle);
                        break;
                }
                if (request.method === 'GET') {
                    this.gs.log(`[SOCKET_TRACK-SET]`, request.url);
                    let pathUrl = request.url;
                    if (pathUrl.startsWith(_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl)) {
                        pathUrl = pathUrl.slice(_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl.length);
                    }
                    if (pathUrl.startsWith(_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl)) {
                        pathUrl = pathUrl.slice(_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl.length);
                    }
                    this.ss.socketEmitVolatile('track-set', { pathUrl: pathUrl.split('?')[0] });
                }
            }
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.catchError)(e => {
            var _a;
            this.gs.log(`[INTERCEPT_ERROR-${e.status}]`, e.statusText, 'error');
            if (this.gs.isBrowser) {
                let errorMessage = 'Terjadi Kesalahan Pada Jaringan~';
                let errorTitle = 'Whoops, Server Sibuk T.T';
                if (e) {
                    if (e.error) {
                        if (e.error.info) {
                            errorTitle = e.error.info;
                        }
                        if (e.error.result) {
                            if (e.error.result.message) {
                                errorMessage = e.error.result.message;
                            }
                        }
                    }
                }
                this.toast.error(errorMessage, errorTitle, null, true);
                switch (e.status) {
                    case 401:
                        this.as.removeUser();
                        this.ls.clear();
                        this.bs.idle();
                        this.router.navigate(['/login'], {
                            queryParams: {
                                returnUrl: this.router.url.split('?')[0] || '/'
                            }
                        });
                        break;
                    case 404:
                        this.bs.idle();
                        this.router.navigate(['/error'], {
                            queryParams: {
                                returnUrl: ((_a = this.activatedRoute.snapshot.parent) === null || _a === void 0 ? void 0 : _a.url) || '/'
                            }
                        });
                        break;
                    case 418:
                        this.bs.idle();
                        this.router.navigate(['/verify'], {
                            queryParams: {
                                returnUrl: this.router.url.split('?')[0] || '/'
                            }
                        });
                        break;
                    default:
                        break;
                }
            }
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.throwError)(() => e.error);
        }));
    }
}
HttpResponseInterceptor.ɵfac = function HttpResponseInterceptor_Factory(t) { return new (t || HttpResponseInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_services_toast_service__WEBPACK_IMPORTED_MODULE_3__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_services_busy_service__WEBPACK_IMPORTED_MODULE_4__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_services_stats_server_service__WEBPACK_IMPORTED_MODULE_5__.StatsServerService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_services_local_storage_service__WEBPACK_IMPORTED_MODULE_6__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute)); };
HttpResponseInterceptor.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({ token: HttpResponseInterceptor, factory: HttpResponseInterceptor.ɵfac });


/***/ }),

/***/ 20210:
/*!***********************************************************!*\
  !*** ./src/app/_shared/modules/shared-material.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedMaterialModule": () => (/* binding */ SharedMaterialModule)
/* harmony export */ });
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/stepper */ 21780);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/autocomplete */ 43188);
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/badge */ 70178);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ 11961);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/chips */ 81196);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/datepicker */ 5818);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ 95758);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/divider */ 19975);
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/expansion */ 12928);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/grid-list */ 63346);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/menu */ 82796);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/paginator */ 26439);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/progress-bar */ 60833);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/sidenav */ 7216);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/slide-toggle */ 6623);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/stepper */ 7650);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/table */ 97217);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/tabs */ 12379);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/toolbar */ 19946);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/snack-bar */ 32528);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/sort */ 64316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);





























// import { A11yModule } from '@angular/cdk/a11y';
// import { ClipboardModule } from '@angular/cdk/clipboard';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { PortalModule } from '@angular/cdk/portal';
// import { ScrollingModule } from '@angular/cdk/scrolling';
// import { CdkTableModule } from '@angular/cdk/table';
// import { CdkTreeModule } from '@angular/cdk/tree';
// import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatTreeModule } from '@angular/material/tree';
// import { OverlayModule } from '@angular/cdk/overlay';
class SharedMaterialModule {
}
SharedMaterialModule.ɵfac = function SharedMaterialModule_Factory(t) { return new (t || SharedMaterialModule)(); };
SharedMaterialModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: SharedMaterialModule });
SharedMaterialModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ imports: [_angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStepperModule,
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_2__.MatAutocompleteModule,
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_3__.MatBadgeModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_5__.MatCardModule,
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__.MatChipsModule,
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__.MatDatepickerModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialogModule,
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__.MatDividerModule,
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__.MatExpansionModule,
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__.MatGridListModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_14__.MatListModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__.MatMenuModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_16__.MatNativeDateModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_17__.MatPaginatorModule,
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_18__.MatProgressBarModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_16__.MatRippleModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_19__.MatSelectModule,
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_20__.MatSidenavModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_21__.MatSlideToggleModule,
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_22__.MatStepperModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_23__.MatTableModule,
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_24__.MatTabsModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_25__.MatToolbarModule,
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_26__.MatTooltipModule,
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_27__.MatSnackBarModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_28__.MatSortModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SharedMaterialModule, { exports: [_angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStepperModule,
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_2__.MatAutocompleteModule,
        _angular_material_badge__WEBPACK_IMPORTED_MODULE_3__.MatBadgeModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule,
        _angular_material_card__WEBPACK_IMPORTED_MODULE_5__.MatCardModule,
        _angular_material_chips__WEBPACK_IMPORTED_MODULE_6__.MatChipsModule,
        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_7__.MatDatepickerModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialogModule,
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__.MatDividerModule,
        _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__.MatExpansionModule,
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__.MatGridListModule,
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule,
        _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule,
        _angular_material_list__WEBPACK_IMPORTED_MODULE_14__.MatListModule,
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_15__.MatMenuModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_16__.MatNativeDateModule,
        _angular_material_paginator__WEBPACK_IMPORTED_MODULE_17__.MatPaginatorModule,
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_18__.MatProgressBarModule,
        _angular_material_core__WEBPACK_IMPORTED_MODULE_16__.MatRippleModule,
        _angular_material_select__WEBPACK_IMPORTED_MODULE_19__.MatSelectModule,
        _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_20__.MatSidenavModule,
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_21__.MatSlideToggleModule,
        _angular_material_stepper__WEBPACK_IMPORTED_MODULE_22__.MatStepperModule,
        _angular_material_table__WEBPACK_IMPORTED_MODULE_23__.MatTableModule,
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_24__.MatTabsModule,
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_25__.MatToolbarModule,
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_26__.MatTooltipModule,
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_27__.MatSnackBarModule,
        _angular_material_sort__WEBPACK_IMPORTED_MODULE_28__.MatSortModule] }); })();


/***/ }),

/***/ 23626:
/*!*********************************************!*\
  !*** ./src/app/_shared/pipes/bytes.pipe.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BytesPipe": () => (/* binding */ BytesPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class BytesPipe {
    static formatResult(result, unit) {
        return `${result} ${unit}`;
    }
    static calculateResult(format, bytes) {
        const prev = format.prev ? BytesPipe.formats[format.prev] : undefined;
        return prev ? bytes / prev.max : bytes;
    }
    isNumber(value) {
        return typeof value === 'number';
    }
    isNumberFinite(value) {
        return this.isNumber(value) && isFinite(value);
    }
    isPositive(value) {
        return value >= 0;
    }
    isInteger(value) {
        return value % 1 === 0;
    }
    toDecimal(value, decimal) {
        return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
    }
    transform(input, decimal = 2, from = 'B', to) {
        if (!(this.isNumberFinite(input) && this.isNumberFinite(decimal) && this.isInteger(decimal) && this.isPositive(decimal))) {
            return input;
        }
        let bytes = input;
        let unit = from;
        while (unit !== 'B') {
            bytes *= 1024;
            unit = BytesPipe.formats[unit].prev;
        }
        if (to) {
            const format = BytesPipe.formats[to];
            const result = this.toDecimal(BytesPipe.calculateResult(format, bytes), decimal);
            return BytesPipe.formatResult(result, to);
        }
        for (const key in BytesPipe.formats) {
            if (BytesPipe.formats.hasOwnProperty(key)) {
                const format = BytesPipe.formats[key];
                if (bytes < format.max) {
                    const result = this.toDecimal(BytesPipe.calculateResult(format, bytes), decimal);
                    return BytesPipe.formatResult(result, key);
                }
            }
        }
    }
}
BytesPipe.formats = {
    B: { max: 1024 },
    kB: { max: Math.pow(1024, 2), prev: 'B' },
    KB: { max: Math.pow(1024, 2), prev: 'B' },
    MB: { max: Math.pow(1024, 3), prev: 'kB' },
    GB: { max: Math.pow(1024, 4), prev: 'MB' },
    TB: { max: Number.MAX_SAFE_INTEGER, prev: 'GB' },
};
BytesPipe.ɵfac = function BytesPipe_Factory(t) { return new (t || BytesPipe)(); };
BytesPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "bytes", type: BytesPipe, pure: true });


/***/ }),

/***/ 67355:
/*!*****************************************************!*\
  !*** ./src/app/_shared/pipes/custom-pipe.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomPipeModule": () => (/* binding */ CustomPipeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _bytes_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bytes.pipe */ 23626);
/* harmony import */ var _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./date-ago.pipe */ 86766);
/* harmony import */ var _safe_url_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./safe-url.pipe */ 91145);
/* harmony import */ var _safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./safe-inner-html.pipe */ 11861);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);






class CustomPipeModule {
}
CustomPipeModule.ɵfac = function CustomPipeModule_Factory(t) { return new (t || CustomPipeModule)(); };
CustomPipeModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: CustomPipeModule });
CustomPipeModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CustomPipeModule, { declarations: [_bytes_pipe__WEBPACK_IMPORTED_MODULE_0__.BytesPipe,
        _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__.DateAgoPipe,
        _safe_url_pipe__WEBPACK_IMPORTED_MODULE_2__.SafeUrlPipe,
        _safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_3__.SafeInnerHtmlPipe], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule], exports: [_bytes_pipe__WEBPACK_IMPORTED_MODULE_0__.BytesPipe,
        _date_ago_pipe__WEBPACK_IMPORTED_MODULE_1__.DateAgoPipe,
        _safe_url_pipe__WEBPACK_IMPORTED_MODULE_2__.SafeUrlPipe,
        _safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_3__.SafeInnerHtmlPipe] }); })();


/***/ }),

/***/ 86766:
/*!************************************************!*\
  !*** ./src/app/_shared/pipes/date-ago.pipe.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateAgoPipe": () => (/* binding */ DateAgoPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class DateAgoPipe {
    transform(value, args) {
        if (value) {
            const detik = Math.floor((+new Date() - +new Date(value)) / 1000);
            const intervals = {
                tahun: 31536000,
                bulan: 2592000,
                minggu: 604800,
                hari: 86400,
                jam: 3600,
                menit: 60,
                detik: 1
            };
            let counter;
            for (const i of Object.keys(intervals)) {
                counter = Math.floor(detik / intervals[i]);
                if (counter > 0) {
                    return counter + ' ' + i + ' lalu';
                }
            }
        }
        return value;
    }
}
DateAgoPipe.ɵfac = function DateAgoPipe_Factory(t) { return new (t || DateAgoPipe)(); };
DateAgoPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "dateAgo", type: DateAgoPipe, pure: true });


/***/ }),

/***/ 11861:
/*!*******************************************************!*\
  !*** ./src/app/_shared/pipes/safe-inner-html.pipe.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SafeInnerHtmlPipe": () => (/* binding */ SafeInnerHtmlPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 50318);


class SafeInnerHtmlPipe {
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
        //
    }
    transform(html) {
        return this.domSanitizer.bypassSecurityTrustHtml(html);
    }
}
SafeInnerHtmlPipe.ɵfac = function SafeInnerHtmlPipe_Factory(t) { return new (t || SafeInnerHtmlPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer, 16)); };
SafeInnerHtmlPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "safeInnerHtml", type: SafeInnerHtmlPipe, pure: true });


/***/ }),

/***/ 91145:
/*!************************************************!*\
  !*** ./src/app/_shared/pipes/safe-url.pipe.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SafeUrlPipe": () => (/* binding */ SafeUrlPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 50318);


class SafeUrlPipe {
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
        //
    }
    transform(url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url).toString();
    }
}
SafeUrlPipe.ɵfac = function SafeUrlPipe_Factory(t) { return new (t || SafeUrlPipe)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.DomSanitizer, 16)); };
SafeUrlPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "safeUrl", type: SafeUrlPipe, pure: true });


/***/ }),

/***/ 10466:
/*!***************************************************!*\
  !*** ./src/app/_shared/services/admin.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminService": () => (/* binding */ AdminService)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global.service */ 80855);




class AdminService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        this.menuList = [
            {
                url: 'banned-list',
                name: 'Banned List',
                image_url: null,
                icon: 'lock_open',
                deskripsi: 'Kelola Banned User'
            },
            {
                url: 'ddl-list',
                name: 'DDL Lampiran',
                image_url: null,
                icon: 'insert_drive_file',
                deskripsi: 'Kelola DDL Lampiran'
            },
            {
                url: 'dns',
                name: 'CNAME / A Record',
                image_url: null,
                icon: 'badge',
                deskripsi: `sub-domain.${_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain}`
            },
            {
                url: 'cors-list',
                name: 'CORS & API Key',
                image_url: null,
                icon: 'privacy_tip',
                deskripsi: 'Cross-Origin API'
            },
            {
                url: 'email',
                name: 'Email',
                image_url: null,
                icon: 'alternate_email',
                deskripsi: `email.address@${_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain}`
            },
            {
                url: 'fansub-member',
                name: 'Fansub Members',
                image_url: null,
                icon: 'stars',
                deskripsi: 'Keanggotaan Fansub'
            },
            {
                url: 'information',
                name: 'Informasi Dialog',
                image_url: null,
                icon: 'live_help',
                deskripsi: 'Popup Info Dialog'
            },
            {
                url: 'project-type',
                name: 'Project Type',
                image_url: null,
                icon: 'loyalty',
                deskripsi: 'Kategori Garapan'
            },
            {
                url: 'push-notification',
                name: 'Push Notification',
                image_url: null,
                icon: 'notifications_active',
                deskripsi: 'Pengumuman Dadakan'
            },
            {
                url: 'user-list',
                name: 'User List',
                image_url: null,
                icon: 'supervisor_account',
                deskripsi: 'Seluruh Member'
            }
        ];
        if (this.gs.isBrowser) {
            //
        }
    }
    getAllNotif(q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/notification?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    createNotif(notifData) {
        return this.api.postData('/notification', notifData);
    }
    deleteNotif(notifId) {
        return this.api.deleteData(`/notification/${notifId}`);
    }
    getAllBanned(q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/banned?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getBanned(bannedUsername) {
        return this.api.patchData('/banned', bannedUsername);
    }
    unBan(bannedId) {
        return this.api.deleteData(`/banned/${bannedId}`);
    }
    ban(bannedData) {
        return this.api.postData(`/banned`, bannedData);
    }
    proDemote(promoteData) {
        return this.api.postData(`/promote`, promoteData);
    }
    getAllCors(q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/api-key?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    revokeCors(corsId) {
        return this.api.deleteData(`/api-key/${corsId}`);
    }
}
AdminService.ɵfac = function AdminService_Factory(t) { return new (t || AdminService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_1__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService)); };
AdminService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: AdminService, factory: AdminService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 80519:
/*!***************************************************!*\
  !*** ./src/app/_shared/services/anime.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimeService": () => (/* binding */ AnimeService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class AnimeService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    searchAnime(q) {
        return this.api.getData(`/anime?q=${q}`);
    }
    getAnime(animeId) {
        return this.api.getData(`/anime/${animeId}`);
    }
    addNewAnime(animeData) {
        return this.api.patchData(`/anime`, animeData);
    }
    getSeasonalAnime(year, season) {
        return this.api.getData(`/anime-seasonal?year=${year}&season=${season}`);
    }
    getBerkasAnime(animeId = [], q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.patchData(`/anime-berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`, { id: animeId });
    }
    getFansubAnime(animeId = [], page = 1, row = 10) {
        return this.api.patchData(`/anime-fansub?page=${page}&row=${row}`, { id: animeId });
    }
}
AnimeService.ɵfac = function AnimeService_Factory(t) { return new (t || AnimeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
AnimeService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: AnimeService, factory: AnimeService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 10916:
/*!*************************************************!*\
  !*** ./src/app/_shared/services/api.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiService": () => (/* binding */ ApiService)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 28784);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 87580);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 8504);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);






class ApiService {
    constructor(http, gs) {
        this.http = http;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    HTTP_REQ_URL(path) {
        if (path.startsWith('/')) {
            let reqUrl = _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl;
            if (!path.startsWith('/api/')) {
                reqUrl += _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
            }
            path = reqUrl + path;
        }
        return path;
    }
    getData(path, options = {}, timedOut = 20 * 1000, retryCount = 3) {
        this.gs.log('[API_GET]', path);
        this.prepareOptions(options);
        return this.http.get(this.HTTP_REQ_URL(path), options).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.timeout)(timedOut), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.retry)(retryCount));
    }
    postData(path, model = {}, multipart = false, options = {}, timedOut = 30 * 1000) {
        this.gs.log('[API_POST]', path);
        let body = model;
        if (multipart) {
            body = this.prepareFormData(model);
        }
        this.prepareOptions(options);
        return this.http.post(this.HTTP_REQ_URL(path), body, options).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.timeout)(timedOut));
    }
    putData(path, model = {}, multipart = false, options = {}, timedOut = 30 * 1000) {
        this.gs.log('[API_PUT]', path);
        let body = model;
        if (multipart) {
            body = this.prepareFormData(model);
        }
        this.prepareOptions(options);
        return this.http.put(this.HTTP_REQ_URL(path), body, options).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.timeout)(timedOut));
    }
    patchData(path, model = {}, multipart = false, options = {}, timedOut = 30 * 1000) {
        this.gs.log('[API_PATCH]', path);
        let body = model;
        if (multipart) {
            body = this.prepareFormData(model);
        }
        this.prepareOptions(options);
        return this.http.patch(this.HTTP_REQ_URL(path), body, options).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.timeout)(timedOut));
    }
    deleteData(path, options = {}, timedOut = 20 * 1000, retryCount = 3) {
        this.gs.log('[API_DELETE]', path);
        this.prepareOptions(options);
        return this.http.delete(this.HTTP_REQ_URL(path), options).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.timeout)(timedOut), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.retry)(retryCount));
    }
    prepareOptions(options) {
        if (!(options.headers instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpHeaders)) {
            options.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpHeaders(options.headers);
        }
    }
    prepareFormData(data) {
        const formData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }
        return formData;
    }
}
ApiService.ɵfac = function ApiService_Factory(t) { return new (t || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
ApiService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 4137:
/*!**************************************************!*\
  !*** ./src/app/_shared/services/auth.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthService": () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 76317);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 19337);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.service */ 80855);
/* harmony import */ var _busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./busy.service */ 33000);
/* harmony import */ var _local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./local-storage.service */ 53379);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _crypto_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./crypto.service */ 38379);
/* harmony import */ var _toast_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./toast.service */ 96925);










class AuthService {
    constructor(router, gs, bs, ls, api, cs, toast) {
        var _a;
        this.router = router;
        this.gs = gs;
        this.bs = bs;
        this.ls = ls;
        this.api = api;
        this.cs = cs;
        this.toast = toast;
        this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(null);
        this.currentUser = (_a = this.currentUserSubject) === null || _a === void 0 ? void 0 : _a.asObservable();
        this.token = null;
        this.timeoutNotif = null;
        this.timeoutToast = null;
        this.logoutTimerText = '';
        this.intervalLogout = null;
        if (this.gs.isBrowser) {
            this.token = this.ls.getItem(this.gs.localStorageKeys.Token) || null;
            this.ls.removeItem(this.gs.localStorageKeys.Token);
        }
    }
    verify(token) {
        this.gs.log('[AUTH_VERIFY]', token);
        return this.api.patchData(`/verify`, { token }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(respVerify => {
            var _a;
            (_a = this.currentUserSubject) === null || _a === void 0 ? void 0 : _a.next(respVerify.result);
            this.token = respVerify.token;
            if (this.token) {
                const expires = new Date(this.cs.jwtView(this.token).exp * 1000);
                const minBefore = 5 * 60 * 1000;
                const notifTime = expires.getTime() - minBefore;
                this.cleanUpTimeoutInterval();
                this.timeoutNotif = setTimeout(() => {
                    this.timeoutToast = this.toast.warning(`Sesi Akun Akan Habis!`, `Silahkan Logout & Login Ulang ...`, {
                        closeButton: false,
                        timeOut: minBefore,
                        disableTimeOut: 'extendedTimeOut',
                        tapToDismiss: false,
                        progressAnimation: 'decreasing'
                    }, true);
                }, notifTime - Date.now());
                this.intervalLogout = setInterval(() => {
                    const distance = expires.getTime() - new Date().getTime();
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    this.logoutTimerText = `(${days}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')})`;
                    if (distance < 0) {
                        clearInterval(this.intervalLogout);
                        this.intervalLogout = null;
                        this.logoutTimerText = '';
                    }
                }, 1000);
            }
        }));
    }
    resendActivation(id) {
        this.gs.log('[AUTH_ACTIVATION]', id);
        return this.api.postData(`/aktivasi`, { id });
    }
    login(loginData) {
        this.gs.log('[AUTH_LOGIN]', loginData);
        return this.api.postData(`/login`, loginData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(respLogin => {
            this.token = respLogin.result.token;
        }));
    }
    register(registerData) {
        this.gs.log('[AUTH_REGISTER]', registerData);
        return this.api.postData(`/register`, registerData);
    }
    removeUser() {
        var _a;
        (_a = this.currentUserSubject) === null || _a === void 0 ? void 0 : _a.next(null);
        this.token = null;
        this.cleanUpTimeoutInterval();
    }
    logout(url = '/', extras = null) {
        this.gs.log('[AUTH_LOGOUT]', this.token);
        this.bs.busy();
        this.api.deleteData(`/logout`).subscribe({
            next: (res) => {
                this.gs.log('[LOGOUT_SUCCESS]', res);
                this.bs.idle();
                this.removeUser();
                this.ls.clear();
                this.router.navigate([url], extras);
            },
            error: err => {
                this.gs.log('[LOGOUT_ERROR]', err, 'error');
                this.cleanUpTimeoutInterval();
                this.bs.idle();
            }
        });
    }
    cleanUpTimeoutInterval() {
        if (this.timeoutNotif) {
            clearTimeout(this.timeoutNotif);
            this.timeoutNotif = null;
        }
        if (this.timeoutToast) {
            this.toast.remove(this.timeoutToast.toastId);
            this.timeoutToast = null;
        }
        if (this.intervalLogout) {
            clearInterval(this.intervalLogout);
            this.intervalLogout = null;
            this.logoutTimerText = '';
        }
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_local_storage_service__WEBPACK_IMPORTED_MODULE_2__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_3__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_crypto_service__WEBPACK_IMPORTED_MODULE_4__.CryptoService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_toast_service__WEBPACK_IMPORTED_MODULE_5__.ToastService)); };
AuthService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 8987:
/*!****************************************************!*\
  !*** ./src/app/_shared/services/berkas.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BerkasService": () => (/* binding */ BerkasService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class BerkasService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    delete(berkasId) {
        return this.api.deleteData(`/berkas/${berkasId}`);
    }
    getAllBerkas(q = '', page = 1, row = 10, sort = '', order = '', r18) {
        return this.api.getData(`/berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}${r18 ? '&r18=true' : ''}`);
    }
    getBerkas(berkasId) {
        return this.api.getData(`/berkas/${berkasId}`);
    }
    createBerkas(berkasData) {
        return this.api.postData(`/berkas`, berkasData);
    }
    updateBerkas(berkasId, berkasData) {
        return this.api.putData(`/berkas/${berkasId}`, berkasData);
    }
    checkTrusted(berkasId = []) {
        return this.api.patchData(`/berkas-trusted`, { id: berkasId });
    }
}
BerkasService.ɵfac = function BerkasService_Factory(t) { return new (t || BerkasService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
BerkasService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: BerkasService, factory: BerkasService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 33000:
/*!**************************************************!*\
  !*** ./src/app/_shared/services/busy.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BusyService": () => (/* binding */ BusyService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 80228);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ 63947);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.service */ 80855);




class BusyService {
    constructor(spinnerService, gs) {
        this.spinnerService = spinnerService;
        this.gs = gs;
        this.cancelPendingRequests$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
        this.busyRequestCount = 0;
        this.timedOut = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    get onCancelPendingRequests() {
        return this.cancelPendingRequests$.asObservable();
    }
    busy() {
        if (this.gs.isBrowser) {
            if (this.busyRequestCount <= 0) {
                this.spinnerService.show();
            }
            this.busyRequestCount++;
            this.gs.log('[BUSY_STATE_COUNTER_BUSY]', this.busyRequestCount);
            if (this.timedOut) {
                clearTimeout(this.timedOut);
            }
            this.timedOut = setTimeout(() => {
                this.clear();
                this.timedOut = null;
            }, 60 * 1000);
        }
    }
    idle() {
        if (this.gs.isBrowser) {
            this.busyRequestCount--;
            if (this.busyRequestCount <= 0) {
                this.busyRequestCount = 0;
                this.spinnerService.hide();
            }
            this.gs.log('[BUSY_STATE_COUNTER_IDLE]', this.busyRequestCount);
        }
    }
    clear() {
        if (this.gs.isBrowser) {
            while (this.busyRequestCount > 0) {
                this.idle();
                this.cancelPendingRequests$.next();
            }
        }
    }
}
BusyService.ɵfac = function BusyService_Factory(t) { return new (t || BusyService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_3__.NgxSpinnerService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
BusyService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: BusyService, factory: BusyService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 38379:
/*!****************************************************!*\
  !*** ./src/app/_shared/services/crypto.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CryptoService": () => (/* binding */ CryptoService)
/* harmony export */ });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ 13195);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto-js */ 36240);
/* harmony import */ var crypto_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global.service */ 80855);





class CryptoService {
    constructor(gs) {
        this.gs = gs;
        this.keySize = 256;
        this.ivSize = 128;
        this.iterations = 100;
        if (this.gs.isBrowser) {
            //
        }
    }
    universalBtoa(str) {
        return this.convertToBase64(str);
    }
    ;
    universalAtob(b64Encoded) {
        return this.convertFromBase64(b64Encoded);
    }
    ;
    convertToBase64(str) {
        return this.convertEncoding(str).toString('base64');
    }
    ;
    convertFromBase64(b64Encoded) {
        return this.convertEncoding(b64Encoded, 'base64').toString();
    }
    ;
    convertEncoding(obj, enc = null) {
        if (enc) {
            return buffer__WEBPACK_IMPORTED_MODULE_0__.Buffer.from(obj, enc);
        }
        return buffer__WEBPACK_IMPORTED_MODULE_0__.Buffer.from(obj);
    }
    msgEncrypt(message, keyPass = _environments_app_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiKey) {
        const salt = crypto_js__WEBPACK_IMPORTED_MODULE_1__.lib.WordArray.random(128 / 8);
        const key = (0,crypto_js__WEBPACK_IMPORTED_MODULE_1__.PBKDF2)(keyPass, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        const iv = crypto_js__WEBPACK_IMPORTED_MODULE_1__.lib.WordArray.random(128 / 8);
        const transitMessage = crypto_js__WEBPACK_IMPORTED_MODULE_1__.AES.encrypt(message, key, {
            iv,
            padding: crypto_js__WEBPACK_IMPORTED_MODULE_1__.pad.Pkcs7,
            mode: crypto_js__WEBPACK_IMPORTED_MODULE_1__.mode.CBC
        });
        const encryptedMessage = salt.toString() + iv.toString() + transitMessage.toString();
        return encryptedMessage;
    }
    msgDecrypt(encryptedMessage, keyPass = _environments_app_environment__WEBPACK_IMPORTED_MODULE_2__.environment.apiKey) {
        const salt = crypto_js__WEBPACK_IMPORTED_MODULE_1__.enc.Hex.parse(encryptedMessage.substr(0, 32));
        const iv = crypto_js__WEBPACK_IMPORTED_MODULE_1__.enc.Hex.parse(encryptedMessage.substr(32, 32));
        const transitMessage = encryptedMessage.substring(64);
        const key = (0,crypto_js__WEBPACK_IMPORTED_MODULE_1__.PBKDF2)(keyPass, salt, {
            keySize: this.keySize / 32,
            iterations: this.iterations
        });
        const decryptedMessage = crypto_js__WEBPACK_IMPORTED_MODULE_1__.AES.decrypt(transitMessage, key, {
            iv,
            padding: crypto_js__WEBPACK_IMPORTED_MODULE_1__.pad.Pkcs7,
            mode: crypto_js__WEBPACK_IMPORTED_MODULE_1__.mode.CBC
        }).toString(crypto_js__WEBPACK_IMPORTED_MODULE_1__.enc.Utf8);
        return decryptedMessage;
    }
    hashPassword(password) {
        return (0,crypto_js__WEBPACK_IMPORTED_MODULE_1__.SHA512)(password).toString();
    }
    jwtView(jwt) {
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(this.universalAtob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
}
CryptoService.ɵfac = function CryptoService_Factory(t) { return new (t || CryptoService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService)); };
CryptoService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: CryptoService, factory: CryptoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 55393:
/*!****************************************************!*\
  !*** ./src/app/_shared/services/dialog.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DialogService": () => (/* binding */ DialogService)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 78611);
/* harmony import */ var _components_material_dialog_material_dialog_info_material_dialog_info_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/material-dialog/material-dialog-info/material-dialog-info.component */ 35070);
/* harmony import */ var _components_material_dialog_material_dialog_dmak_material_dialog_dmak_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/material-dialog/material-dialog-dmak/material-dialog-dmak.component */ 35248);
/* harmony import */ var _components_material_dialog_material_dialog_edict_material_dialog_edict_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/material-dialog/material-dialog-edict/material-dialog-edict.component */ 86529);
/* harmony import */ var _components_material_dialog_material_dialog_belajar_material_dialog_belajar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/material-dialog/material-dialog-belajar/material-dialog-belajar.component */ 95961);
/* harmony import */ var _components_material_dialog_material_dialog_input_material_dialog_input_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/material-dialog/material-dialog-input/material-dialog-input.component */ 84807);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ 95758);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global.service */ 80855);
/* harmony import */ var _information_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./information.service */ 67745);











class DialogService {
  constructor(dialog, gs, info) {
    this.dialog = dialog;
    this.gs = gs;
    this.info = info;
    this.maxWidth = '80vw';

    if (this.gs.isBrowser) {
      this.maxWidth = this.gs.gridListBreakpoint === 4 ? '45vw' : this.gs.gridListBreakpoint === 3 ? '50vw' : this.gs.gridListBreakpoint === 2 ? '60vw' : '80vw';
    }
  }

  openInputDialog(dataInfo) {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }

    return this.dialog.open(_components_material_dialog_material_dialog_input_material_dialog_input_component__WEBPACK_IMPORTED_MODULE_5__.MaterialDialogInputComponent, dataInfo);
  }

  openInfoDialog(dataInfo) {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }

    if (!('maxWidth' in dataInfo)) {
      dataInfo.maxWidth = this.maxWidth;
    }

    return this.dialog.open(_components_material_dialog_material_dialog_info_material_dialog_info_component__WEBPACK_IMPORTED_MODULE_1__.MaterialDialogInfoComponent, dataInfo);
  }

  openDmakDialog(dataInfo) {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }

    return this.dialog.open(_components_material_dialog_material_dialog_dmak_material_dialog_dmak_component__WEBPACK_IMPORTED_MODULE_2__.MaterialDialogDmakComponent, dataInfo);
  }

  openEdictDialog(dataInfo) {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }

    return this.dialog.open(_components_material_dialog_material_dialog_edict_material_dialog_edict_component__WEBPACK_IMPORTED_MODULE_3__.MaterialDialogEdictComponent, dataInfo);
  }

  openBelajarDialog(dataInfo) {
    if (!('disableClose' in dataInfo)) {
      dataInfo.disableClose = true;
    }

    return this.dialog.open(_components_material_dialog_material_dialog_belajar_material_dialog_belajar_component__WEBPACK_IMPORTED_MODULE_4__.MaterialDialogBelajarComponent, dataInfo);
  }
  /** */


  leavePageDialog() {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return (yield _this.openKonfirmasiDialog('Batal & Keluar', 'Apakah Yakin Meninggalkan Halaman Ini ?')).afterClosed();
    })();
  }

  openKonfirmasiDialog(title, htmlMessage, disableClose = true) {
    var _this2 = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const defaultData = {
        data: {
          title,
          htmlMessage,
          confirmText: 'Ya',
          cancelText: 'Tidak'
        },
        disableClose,
        maxWidth: _this2.maxWidth
      };
      return _this2.openInfoDialog(defaultData);
    })();
  }

  fetchInformationRegisterMode(defaultData, registerMode = false) {
    var _this3 = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.lastValueFrom)(_this3.info.getInfo(defaultData.id));
        defaultData.data.title = res.result.title;
        defaultData.data.htmlMessage = res.result.content;
        defaultData.disableClose = res.result.close;

        if (registerMode) {
          defaultData.data.confirmText = res.result.confirm;
          defaultData.data.cancelText = res.result.cancel;
          defaultData.disableClose = true;
        }
      } catch (e) {
        _this3.gs.log('[DIALOG_SERVICE-FETCH_DIALOG_ERROR]', e.error, 'error');
      }

      return _this3.openInfoDialog(defaultData);
    })();
  }

  fetchInformation(defaultData) {
    var _this4 = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const res = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.lastValueFrom)(_this4.info.getInfo(defaultData.id));
        defaultData.data.title = res.result.title;
        defaultData.data.htmlMessage = res.result.content;
        defaultData.data.confirmText = res.result.confirm;
        defaultData.data.cancelText = res.result.cancel;
        defaultData.disableClose = res.result.close;
      } catch (e) {
        _this4.gs.log('[DIALOG_SERVICE-FETCH_DIALOG_ERROR]', e.error, 'error');
      }
    })();
  }

  openMaintenanceDialog() {
    var _this5 = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const defaultData = {
        id: 'MAINTENANCE',
        data: {
          title: `Informasi Perbaikan Web & Server`,
          htmlMessage: 'Gagal Memuat Perbaikan Web & Server',
          confirmText: 'Ok, Saya Mengerti!',
          cancelText: null
        },
        disableClose: false,
        maxWidth: _this5.maxWidth
      };
      yield _this5.fetchInformation(defaultData);
      return _this5.openInfoDialog(defaultData);
    })();
  }

  openCorsExtension() {
    var _this6 = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const defaultData = {
        id: 'CORS-EXTENSION',
        data: {
          title: 'Ekstensi CORS Unblock',
          htmlMessage: 'Gagal Memuat Metode Verifikasi',
          confirmText: 'Ya',
          cancelText: 'Tidak'
        },
        disableClose: false,
        maxWidth: _this6.maxWidth
      };
      yield _this6.fetchInformation(defaultData);
      return _this6.openInfoDialog(defaultData);
    })();
  }

}

DialogService.ɵfac = function DialogService_Factory(t) {
  return new (t || DialogService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_6__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_information_service__WEBPACK_IMPORTED_MODULE_7__.InformationService));
};

DialogService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({
  token: DialogService,
  factory: DialogService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 18439:
/*!****************************************************!*\
  !*** ./src/app/_shared/services/dorama.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DoramaService": () => (/* binding */ DoramaService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class DoramaService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    searchDorama(q, type = '') {
        return this.api.getData(`/dorama?q=${q}&type=${type}`);
    }
    getDorama(doramaId) {
        return this.api.getData(`/dorama/${doramaId}`);
    }
    addNewDorama(doramaData) {
        return this.api.patchData(`/dorama`, doramaData);
    }
    getSeasonalDorama(year, season) {
        return this.api.getData(`/dorama-seasonal?year=${year}&season=${season}`);
    }
    getBerkasDorama(doramaId = [], q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.patchData(`/dorama-berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`, { id: doramaId });
    }
    getFansubDorama(doramaId = [], page = 1, row = 10) {
        return this.api.patchData(`/dorama-fansub?page=${page}&row=${row}`, { id: doramaId });
    }
}
DoramaService.ɵfac = function DoramaService_Factory(t) { return new (t || DoramaService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
DoramaService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: DoramaService, factory: DoramaService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 96382:
/*!*************************************************!*\
  !*** ./src/app/_shared/services/fab.service.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FabService": () => (/* binding */ FabService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.service */ 80855);
/* harmony import */ var _winbox_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./winbox.service */ 88020);




class FabService {
    constructor(router, gs, wb) {
        this.router = router;
        this.gs = gs;
        this.wb = wb;
        this.isHidden = true;
        this.newTab = true;
        this.targetUrl = null;
        this.backgroundImage = null;
        this.backgroundIcon = null;
        this.tooltipText = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    toggleFab() {
        this.isHidden = !this.isHidden;
    }
    showFab() {
        this.isHidden = false;
    }
    hideFab() {
        this.isHidden = true;
    }
    removeFab() {
        this.isHidden = true;
        this.tooltipText = null;
        this.backgroundIcon = null;
        this.backgroundImage = null;
        this.targetUrl = null;
        this.newTab = null;
    }
    initializeFab(icon, image, text, url, openInNewTab) {
        this.backgroundIcon = icon;
        this.backgroundImage = image;
        this.tooltipText = text;
        this.targetUrl = url;
        this.newTab = openInNewTab;
        this.isHidden = false;
    }
    setTooltipText(text) {
        this.tooltipText = text;
    }
    setNewTab(openInNewTab) {
        this.newTab = openInNewTab;
    }
    setTargetUrl(url) {
        this.targetUrl = url;
    }
    setBackgroundImage(urlImage) {
        this.backgroundImage = urlImage;
    }
    setBackgroundIcon(iconName) {
        this.backgroundIcon = iconName;
    }
    buttonClicked() {
        if (this.newTab) {
            this.wb.winboxOpenUri(this.targetUrl);
        }
        else {
            this.router.navigateByUrl(this.targetUrl);
        }
    }
}
FabService.ɵfac = function FabService_Factory(t) { return new (t || FabService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_winbox_service__WEBPACK_IMPORTED_MODULE_1__.WinboxService)); };
FabService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: FabService, factory: FabService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 76781:
/*!****************************************************!*\
  !*** ./src/app/_shared/services/fansub.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FansubService": () => (/* binding */ FansubService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class FansubService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    delete(fansubSlug) {
        return this.api.deleteData(`/fansub/${fansubSlug}`);
    }
    searchFansub(q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/fansub?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    createFansub(fansubData) {
        return this.api.postData(`/fansub`, fansubData);
    }
    updateFansub(fansubSlug, fansubData) {
        return this.api.putData(`/fansub/${fansubSlug}`, fansubData);
    }
    getFansub(fansubSlug) {
        return this.api.getData(`/fansub/${fansubSlug}`);
    }
    getAllFansub() {
        return this.api.getData(`/fansub-all`);
    }
    cekSlug(fansubData) {
        return this.api.patchData(`/fansub-slug`, fansubData);
    }
    getBerkasFansub(fansubId = [], q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.patchData(`/fansub-berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`, { id: fansubId });
    }
    getAnimeFansub(fansubId = [], page = 1, row = 10) {
        return this.api.patchData(`/fansub-anime?page=${page}&row=${row}`, { id: fansubId });
    }
    getDoramaFansub(fansubId = [], page = 1, row = 10) {
        return this.api.patchData(`/fansub-dorama?page=${page}&row=${row}`, { id: fansubId });
    }
    getRssFeedFansubAllActiveOnly() {
        return this.api.getData('/fansub-rss-feed-active');
    }
    getRssFeedFansubAll() {
        return this.api.getData('/fansub-rss-feed-all');
    }
    getRssFeedFansub(fansubSlug) {
        return this.api.getData(`/fansub/${fansubSlug}/rss`);
    }
    getFansubMember(fansubSlug) {
        return this.api.getData(`/fansub/${fansubSlug}/member`);
    }
    getAllFansubMember(q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/fansub-member?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    requestJoinFansubMember(fansubMemberData) {
        return this.api.postData(`/fansub-member`, fansubMemberData);
    }
    approveRejectFansubMember(fansubMemberId, fansubMemberData) {
        return this.api.putData(`/fansub-member/${fansubMemberId}`, fansubMemberData);
    }
    leaveFansubMember(fansubMemberId) {
        return this.api.deleteData(`/fansub-member/${fansubMemberId}`);
    }
    getAllSubDomain(q = '', page = 1, row = 12, sort = '', order = '') {
        return this.api.getData(`/fansub-dns?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    claimSubDomain(dnsData) {
        return this.api.postData(`/fansub-dns`, dnsData);
    }
    getSubDomain(fansubSlug) {
        return this.api.getData(`/fansub-dns/${fansubSlug}`);
    }
    updateSubDomain(fansubSlug, dnsData) {
        return this.api.putData(`/fansub-dns/${fansubSlug}`, dnsData);
    }
}
FansubService.ɵfac = function FansubService_Factory(t) { return new (t || FansubService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
FansubService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: FansubService, factory: FansubService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 80855:
/*!****************************************************!*\
  !*** ./src/app/_shared/services/global.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalService": () => (/* binding */ GlobalService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/keycodes */ 75939);
/* harmony import */ var string_strip_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! string-strip-html */ 77537);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _models_seasons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../models/seasons */ 76022);







class GlobalService {
    constructor(platformId, document) {
        this.localStorageKeys = {
            AturanTatib: `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.siteName}_AturanTatib`,
            DebugLogs: `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.siteName}_DebugLogs`,
            DarkMode: `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.siteName}_DarkMode`,
            Token: `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.siteName}_Token`,
            LiveChatResults: `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.siteName}_LiveChatResults`,
            R18: `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.siteName}_R18`,
            SearchResults: `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.siteName}_SearchResults`,
            Torrents: `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.siteName}_Torrents`
        };
        this.forceEnableDebugLog = null;
        this.separatorKeysCodes = [_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.ENTER, _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_3__.COMMA];
        this.routerData = null;
        this.previousUrl = null;
        this.bgImgUrlPath = null;
        this.bannerImg = null;
        this.sizeContain = false;
        this.bgRepeat = false;
        this.leftMenuImage = null;
        this.rightMenuImage = null;
        this.isBrowser = null;
        this.document = null;
        this.gridListBreakpoint = 1;
        this.isDesktop = true;
        this.isDevMode = true;
        this.isDarkMode = false;
        this.weatherEffect = null;
        this.weatherRunning = false;
        this.angularEditorConfig = {
            editable: true,
            minHeight: '256px',
            placeholder: 'Deskripsi, Informasi, Atau Keterangan Lainnya ...',
            uploadUrl: `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl}/image`,
            uploadWithCredentials: true,
            defaultParagraphSeparator: 'div',
            toolbarHiddenButtons: [
                [],
                []
            ],
            customClasses: [
                {
                    name: 'white-space-normal-important',
                    class: 'white-space-normal-important',
                },
                {
                    name: 'text-decoration-none',
                    class: 'text-decoration-none',
                },
            ]
        };
        this.seasonalWeather = [
            { id: 1, name: _models_seasons__WEBPACK_IMPORTED_MODULE_2__.SEASONS.WINTER, cssClassName: 'snow', img: '/assets/img/season/winter.png' },
            { id: 2, name: _models_seasons__WEBPACK_IMPORTED_MODULE_2__.SEASONS.SPRING, cssClassName: 'sakura', img: '/assets/img/season/spring.png' },
            { id: 3, name: _models_seasons__WEBPACK_IMPORTED_MODULE_2__.SEASONS.SUMMER, cssClassName: null, img: '/assets/img/season/summer.png' },
            { id: 4, name: _models_seasons__WEBPACK_IMPORTED_MODULE_2__.SEASONS.FALL, cssClassName: 'fall', img: '/assets/img/season/fall.png' }
        ];
        this.isBrowser = (0,_angular_common__WEBPACK_IMPORTED_MODULE_4__.isPlatformBrowser)(platformId);
        this.document = document;
        this.isDevMode = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.isDevMode)();
        if (this.isBrowser) {
            this.onResize(null);
            this.weatherJS();
        }
    }
    log(message, data = null, type = 'log') {
        if (this.isBrowser) {
            this.forceEnableDebugLog = localStorage.getItem(this.localStorageKeys.DebugLogs) === 'true';
        }
        if (this.isDevMode || this.forceEnableDebugLog) {
            let logger = null;
            if (type === 'warn') {
                logger = console.warn;
            }
            else if (type === 'error') {
                logger = console.error;
            }
            else if (type === 'table') {
                logger = console.table;
            }
            else {
                logger = console.log;
            }
            if (data) {
                logger(message, data);
            }
            else {
                logger(message);
            }
        }
    }
    getDirtyValues(formGroup) {
        const dirtyValues = {};
        for (const control of Object.keys(formGroup.controls)) {
            const currentControl = formGroup.get(control);
            if (currentControl.dirty) {
                dirtyValues[control] = currentControl.value;
            }
        }
        return dirtyValues;
    }
    get randomColor() {
        return (Math.random() * 0xFFFFFF << 0).toString(16);
    }
    get bgImgUrl() {
        if (this.isDesktop) {
            return this.bgImgUrlPath;
        }
        return null;
    }
    onResize(event, source = 'APP_COMPONENT') {
        var _a;
        if (event) {
            this.log(`[WINDOW_RESIZE-${source}]`, event);
        }
        if (this.isBrowser) {
            const browserWindow = ((_a = event === null || event === void 0 ? void 0 : event.target) === null || _a === void 0 ? void 0 : _a.window) || window;
            this.leftMenuImage = '/assets/img/background/left-menu.png';
            this.rightMenuImage = '/assets/img/background/right-panel.png';
            if (browserWindow.innerWidth > 1200) {
                this.isDesktop = true;
                this.gridListBreakpoint = 4;
            }
            else if (browserWindow.innerWidth > 992) {
                this.isDesktop = true;
                this.gridListBreakpoint = 3;
            }
            else if (browserWindow.innerWidth > 768) {
                this.isDesktop = false;
                this.gridListBreakpoint = 2;
            }
            else {
                this.isDesktop = false;
                this.gridListBreakpoint = 1;
                this.leftMenuImage = null;
                this.rightMenuImage = '';
            }
        }
    }
    htmlToText(htmlElementString) {
        if (htmlElementString) {
            const stringText = (0,string_strip_html__WEBPACK_IMPORTED_MODULE_0__.stripHtml)(htmlElementString);
            return stringText.result;
        }
        return '';
    }
    shuffle(array) {
        let currentIndex = array.length;
        let temporaryValue = 0;
        let randomIndex = 0;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    cleanObject(objData) {
        for (const o in objData) {
            if (!objData[o]) {
                delete objData[o];
            }
        }
    }
    includesOneOf(text, arr) {
        for (const a of arr) {
            if (text === null || text === void 0 ? void 0 : text.includes(a)) {
                return true;
            }
        }
        return false;
    }
    linkify(text) {
        if (text) {
            // http://, https://, ftp://
            const urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
            // www.
            const pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            // Email addresses
            const emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;
            text = text.replace(urlPattern, '<a class="text-decoration-none" href="$&" target="_blank">$&</a>')
                .replace(pseudoUrlPattern, '$1<a class="text-decoration-none" href="http://$2" target="_blank">$2</a>')
                .replace(emailAddressPattern, '<a class="text-decoration-none" href="mailto:$&" target="_blank">$&</a>');
            return text;
        }
        return '';
    }
    toggleDarkTheme(firstRun = false) {
        if (firstRun) {
            if (this.isDarkMode) {
                this.document.body.classList.add('bifeldy-dark-theme');
            }
            else {
                this.document.body.classList.remove('bifeldy-dark-theme');
            }
        }
        else {
            if (this.isDarkMode) {
                this.isDarkMode = false;
                this.document.body.classList.remove('bifeldy-dark-theme');
            }
            else {
                this.isDarkMode = true;
                this.document.body.classList.add('bifeldy-dark-theme');
            }
        }
    }
    rssLink(links) {
        if (typeof links === 'string') {
            return links;
        }
        let idx = links.findIndex(l => l.rel === 'alternate' && l.type === 'text/html');
        if (idx < 0) {
            if (links.length > 0) {
                return links[links.length - 1].href;
            }
            return '';
        }
        return links[idx].href;
    }
    weatherJS() {
        const currentMonth = new Date().getMonth() + 1;
        const weather = this.seasonalWeather.find(sB => sB.id === Math.ceil(currentMonth / 3));
        if (weather === null || weather === void 0 ? void 0 : weather.cssClassName) {
            this.weatherEffect = new Sakura('body', { className: weather.cssClassName, lifeTime: 5000 });
            this.weatherRunning = true;
        }
    }
    weatherToggle() {
        if (this.weatherRunning) {
            this.weatherEffect.stop(true);
            this.weatherRunning = false;
        }
        else {
            this.weatherEffect.start();
            this.weatherRunning = true;
        }
    }
}
GlobalService.ɵfac = function GlobalService_Factory(t) { return new (t || GlobalService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.PLATFORM_ID), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.DOCUMENT)); };
GlobalService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: GlobalService, factory: GlobalService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 67902:
/*!***************************************************!*\
  !*** ./src/app/_shared/services/imgbb.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImgbbService": () => (/* binding */ ImgbbService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class ImgbbService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    uploadImage(image) {
        return this.api.postData(`/image`, image, true, {
            headers: {
                'ngsw-bypass': 'true'
            }
        });
    }
}
ImgbbService.ɵfac = function ImgbbService_Factory(t) { return new (t || ImgbbService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
ImgbbService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ImgbbService, factory: ImgbbService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 67745:
/*!*********************************************************!*\
  !*** ./src/app/_shared/services/information.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InformationService": () => (/* binding */ InformationService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class InformationService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    getAllInfo(q, page, row, sort, order) {
        return this.api.getData(`/information?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getInfo(infoId) {
        return this.api.getData(`/information/${infoId}`);
    }
    createUpdateInfo(infoData) {
        return this.api.postData(`/information`, infoData);
    }
    deleteInfo(infoId) {
        return this.api.deleteData(`/information/${infoId}`);
    }
}
InformationService.ɵfac = function InformationService_Factory(t) { return new (t || InformationService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
InformationService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: InformationService, factory: InformationService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 70007:
/*!*******************************************************!*\
  !*** ./src/app/_shared/services/left-menu.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeftMenuService": () => (/* binding */ LeftMenuService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.service */ 80855);


class LeftMenuService {
    constructor(gs) {
        this.gs = gs;
        this.sideNav = null;
        this.sideNavExpanded = false;
        this.linkText = false;
        this.opened = true;
        this.mainMenus = [
            {
                name: 'Beranda',
                link: '/home',
                icon: 'dashboard',
                badge: null
            },
            {
                name: 'Berita & Informasi',
                link: '/news',
                icon: 'receipt_long',
                badge: null
            }
        ];
        this.contentMenus = [
            {
                name: 'Anime Musiman',
                link: '/anime',
                icon: 'live_tv',
                badge: null
            },
            {
                name: 'Film Drama',
                link: '/dorama',
                icon: 'movie',
                badge: null
            },
            {
                name: 'Katalog Fansub',
                link: '/fansub',
                icon: 'closed_caption',
                badge: null
            },
            {
                name: 'Berbagi Garapan',
                link: '/berkas',
                icon: 'file_copy',
                badge: null
            }
        ];
        this.additionalMenus = [
            {
                name: 'E-Mail@FanSub.ID',
                link: '/mailbox',
                icon: 'mail_outline',
                badge: null
            },
            {
                name: 'Nihongo 日本語',
                link: '/nihongo',
                icon: 'translate',
                badge: null
            },
            {
                name: 'Admin & Mod Panel',
                link: '/admin-mod',
                icon: 'admin_panel_settings',
                badge: null
            }
        ];
        this.miscMenus = [
            // {
            //   name: 'DDLs',
            //   link: '/ddls',
            //   icon: 'download',
            //   badge: null
            // },
            {
                name: 'RSS Feed',
                link: '/rss-feed',
                icon: 'rss_feed',
                badge: null
            }
        ];
        this.otherMenus = [
            {
                name: 'Kebijakan Privasi',
                link: '/privacy-policy',
                icon: 'policy',
                badge: null
            }
        ];
        if (this.gs.isBrowser) {
            this.opened = (window.innerWidth >= 992) ? true : false;
        }
    }
    changeSideNavState() {
        this.linkText = this.sideNavExpanded;
    }
    forceCloseSideNav() {
        if (!this.gs.isDesktop && this.sideNav.opened) {
            this.sideNav.close();
        }
        this.onMouseHoverOut();
    }
    onSideNavToggleView() {
        if (this.sideNav.opened) {
            this.sideNav.close();
            if (!this.gs.isDesktop) {
                this.onMouseHoverOut();
            }
        }
        else {
            this.sideNav.open();
            if (!this.gs.isDesktop) {
                this.onMouseHoverIn();
            }
        }
    }
    onSideNavToggleExpanded() {
        this.sideNavExpanded = !this.sideNavExpanded;
        this.changeSideNavState();
    }
    onMouseHoverIn() {
        if (this.sideNavExpanded === false) {
            this.sideNavExpanded = true;
            this.changeSideNavState();
        }
    }
    onMouseHoverOut() {
        if (this.sideNavExpanded === true) {
            this.sideNavExpanded = false;
            this.changeSideNavState();
        }
    }
}
LeftMenuService.ɵfac = function LeftMenuService_Factory(t) { return new (t || LeftMenuService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
LeftMenuService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: LeftMenuService, factory: LeftMenuService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 53379:
/*!***********************************************************!*\
  !*** ./src/app/_shared/services/local-storage.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalStorageService": () => (/* binding */ LocalStorageService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _crypto_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crypto.service */ 38379);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class LocalStorageService {
    constructor(cs, gs) {
        this.cs = cs;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    getItem(key, isObject = false) {
        if (this.gs.isBrowser) {
            if (!isObject) {
                return localStorage.getItem(key);
            }
            else {
                try {
                    const encryptedString = localStorage.getItem(key);
                    const jsonString = this.cs.msgDecrypt(encryptedString);
                    return JSON.parse(jsonString);
                }
                catch (error) {
                    this.removeItem(key);
                    return null;
                }
            }
        }
        else {
            return null;
        }
    }
    setItem(key, value) {
        if (this.gs.isBrowser) {
            if (typeof value === 'string') {
                localStorage.setItem(key, value);
            }
            else {
                const jsonString = JSON.stringify(value);
                const encryptedString = this.cs.msgEncrypt(jsonString);
                localStorage.setItem(key, encryptedString);
            }
        }
    }
    removeItem(key) {
        if (this.gs.isBrowser) {
            localStorage.removeItem(key);
        }
    }
    clear() {
        if (this.gs.isBrowser) {
            // localStorage.clear();
            for (const lsKey of Object.keys(this.gs.localStorageKeys)) {
                if (lsKey !== 'Torrents') {
                    this.removeItem(this.gs.localStorageKeys[lsKey]);
                }
            }
        }
    }
}
LocalStorageService.ɵfac = function LocalStorageService_Factory(t) { return new (t || LocalStorageService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_crypto_service__WEBPACK_IMPORTED_MODULE_0__.CryptoService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
LocalStorageService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: LocalStorageService, factory: LocalStorageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 49618:
/*!**************************************************!*\
  !*** ./src/app/_shared/services/news.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsService": () => (/* binding */ NewsService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class NewsService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    delete(newsId) {
        return this.api.deleteData(`/news/${newsId}`);
    }
    getAllNews(q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/news?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    createNews(newsData) {
        return this.api.postData(`/news`, newsData);
    }
    updateNews(newsId, newsData) {
        return this.api.putData(`/news/${newsId}`, newsData);
    }
    getNews(newsId) {
        return this.api.getData(`/news/${newsId}`);
    }
}
NewsService.ɵfac = function NewsService_Factory(t) { return new (t || NewsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
NewsService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: NewsService, factory: NewsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 52663:
/*!*****************************************************!*\
  !*** ./src/app/_shared/services/nihongo.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NihongoService": () => (/* binding */ NihongoService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class NihongoService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    getAllNihongo(category = '', q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/nihongo?category=${category}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getAllKategori() {
        return this.api.patchData(`/nihongo`);
    }
    createNihongo(nihongoData) {
        return this.api.postData(`/nihongo`, nihongoData);
    }
    updateNihongo(nihongoId, nihongoData) {
        return this.api.putData(`/nihongo/${nihongoId}`, nihongoData);
    }
    getHirakata() {
        return this.api.getData(`/nihongo-hirakata-all`);
    }
    getAllKanji(jlpt = '', school = '', q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/nihongo-kanji?jlpt=${jlpt}&school=${school}&q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getAllEdict(q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/nihongo-edict?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
}
NihongoService.ɵfac = function NihongoService_Factory(t) { return new (t || NihongoService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
NihongoService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: NihongoService, factory: NihongoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 37140:
/*!***********************************************************!*\
  !*** ./src/app/_shared/services/notifications.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotificationsService": () => (/* binding */ NotificationsService)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class NotificationsService {
    constructor(gs) {
        this.gs = gs;
        this.notifications = [];
        this.dissmissTimeout = {};
        this.timedOut = null;
        if (this.gs.isBrowser) {
            this.notifications.push({
                notifCreator: null,
                notifData: {
                    id: `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.siteName.toUpperCase()}_UNDER_DEVELOPMENT`,
                    type: 'info',
                    title: 'Pemberitahuan!',
                    content: `
            Jika ingin request fitur baru ataupun melaporkan <i>Bug</i> dapat menulis pesan di kanal Discord
            '<a href="https://discord.gg/xGWdExk" target="_blank" class="text-decoration-none">#dev-prog</a>'.
            Terima kasih. ^_^
          `,
                    dismissible: true
                }
            });
        }
    }
    addNotif(notifCreator, notifId, notifType, notifTitle, notifContent, dismissible = true) {
        if (dismissible) {
            this.dissmissTimeout[notifId] = setTimeout(() => this.removeNotif(notifId), 10000);
        }
        this.notifications.splice(0, 0, {
            notifCreator,
            notifData: {
                id: notifId,
                type: notifType,
                title: notifTitle,
                content: notifContent,
                dismissible
            }
        });
    }
    removeNotif(id) {
        if (this.dissmissTimeout[id]) {
            clearTimeout(this.dissmissTimeout[id]);
            this.dissmissTimeout[id] = null;
            delete this.dissmissTimeout[id];
        }
        this.timedOut = setTimeout(() => {
            const verifyNotifIdx = this.notifications.findIndex(n => n.notifData.id === id);
            if (verifyNotifIdx >= 0) {
                this.notifications = this.notifications.slice(0, verifyNotifIdx).concat(this.notifications.slice(verifyNotifIdx + 1, this.notifications.length));
            }
        }, 500);
    }
}
NotificationsService.ɵfac = function NotificationsService_Factory(t) { return new (t || NotificationsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
NotificationsService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: NotificationsService, factory: NotificationsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 18745:
/*!*******************************************************!*\
  !*** ./src/app/_shared/services/page-info.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageInfoService": () => (/* binding */ PageInfoService)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);





class PageInfoService {
    constructor(t, m, gs, router) {
        this.t = t;
        this.m = m;
        this.gs = gs;
        this.router = router;
        this.siteName = _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.siteName;
        this.title = '';
        this.description = '';
        this.keywords = '';
        this.image = '';
        this.author = '';
        this.header = '';
        if (this.gs.isBrowser) {
            //
        }
    }
    get getHeaderTitle() {
        if (this.header !== this.title) {
            return this.header;
        }
        return this.title;
    }
    get getDescription() {
        return this.description;
    }
    get getKeywords() {
        return this.keywords;
    }
    updatePageMetaData(newTitle, newDescription, newKeywords, newImage = `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl}/assets/img/favicon.png`, newAuthor = '「💤 Fansub ✨ ID 🌞」') {
        this.title = newTitle;
        this.updatePageHeader();
        this.description = this.gs.htmlToText(newDescription);
        this.keywords = newKeywords;
        this.image = newImage.startsWith('/') ? _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + newImage : newImage;
        this.author = newAuthor;
        this.t.setTitle(`${this.title} | ${this.siteName}`);
        this.m.updateTag({ name: 'keywords', content: this.keywords });
        this.m.updateTag({ name: 'author', content: this.author });
        this.m.updateTag({ property: 'og:title', content: `${this.title} | ${this.siteName}` });
        this.m.updateTag({ property: 'og:image', content: this.image });
        this.m.updateTag({ name: 'twitter:title', content: `${this.title} | ${this.siteName}` });
        if (this.description) {
            this.m.updateTag({ name: 'description', content: this.description });
            this.m.updateTag({ property: 'og:description', content: this.description });
            this.m.updateTag({ name: 'twitter:description', content: this.description });
        }
        this.m.updateTag({ name: 'twitter:image', content: this.image });
        if (this.router.url.split('?')[0].includes('/berkas/') && !this.image.includes(_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl)) {
            this.m.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        }
    }
    updateStatusBarTheme(isDarkMode) {
        if (isDarkMode) {
            this.m.updateTag({ name: 'theme-color', content: '#673ab7' });
        }
        else {
            this.m.updateTag({ name: 'theme-color', content: '#3f51b5' });
        }
    }
    updatePageHeader(newHeader = null) {
        this.header = newHeader || this.title;
    }
}
PageInfoService.ɵfac = function PageInfoService_Factory(t) { return new (t || PageInfoService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.Title), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.Meta), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router)); };
PageInfoService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: PageInfoService, factory: PageInfoService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 56514:
/*!*********************************************************!*\
  !*** ./src/app/_shared/services/right-panel.service.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RightPanelService": () => (/* binding */ RightPanelService)
/* harmony export */ });
/* harmony import */ var _components_right_panel_search_all_search_all_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/right-panel/search-all/search-all.component */ 62644);
/* harmony import */ var _components_right_panel_admin_navigation_admin_navigation_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/right-panel/admin-navigation/admin-navigation.component */ 93380);
/* harmony import */ var _components_right_panel_live_chat_live_chat_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/right-panel/live-chat/live-chat.component */ 71617);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global.service */ 80855);
/* harmony import */ var _stats_server_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stats-server.service */ 28381);






class RightPanelService {
    constructor(gs, ss) {
        this.gs = gs;
        this.ss = ss;
        this.sidePanel = null;
        this.componentView = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    toggleSidePanel(view) {
        if (this.componentView) {
            this.closeSidePanel();
        }
        else {
            this.openSidePanel(view);
        }
    }
    closeSidePanel() {
        this.sidePanel.close();
    }
    onClose() {
        this.componentView = null;
    }
    openSidePanel(view) {
        if (typeof view !== 'string') {
            this.componentView = view;
        }
        else if (view === 'SearchAllComponent') {
            this.componentView = _components_right_panel_search_all_search_all_component__WEBPACK_IMPORTED_MODULE_0__.SearchAllComponent;
        }
        else if (view === 'AdminNavigationComponent') {
            this.componentView = _components_right_panel_admin_navigation_admin_navigation_component__WEBPACK_IMPORTED_MODULE_1__.AdminNavigationComponent;
        }
        else if (view === 'LiveChatComponent') {
            if (!this.ss.mySocket.id) {
                return;
            }
            this.componentView = _components_right_panel_live_chat_live_chat_component__WEBPACK_IMPORTED_MODULE_2__.LiveChatComponent;
        }
        this.sidePanel.open();
    }
}
RightPanelService.ɵfac = function RightPanelService_Factory(t) { return new (t || RightPanelService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_stats_server_service__WEBPACK_IMPORTED_MODULE_4__.StatsServerService)); };
RightPanelService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: RightPanelService, factory: RightPanelService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 79775:
/*!************************************************************!*\
  !*** ./src/app/_shared/services/service-worker.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServiceWorkerService": () => (/* binding */ ServiceWorkerService)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/service-worker */ 64933);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);
/* harmony import */ var _dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dialog.service */ 55393);





class ServiceWorkerService {
  constructor(su, sp, gs, ds) {
    this.su = su;
    this.sp = sp;
    this.gs = gs;
    this.ds = ds;
    this.isUpdateAvailable = false;
    this.swuVerUpd = null;
    this.swuUnRecv = null;
    this.dialogRef = null;
    this.subsDialog = null;

    if (this.gs.isBrowser) {
      this.initialize();
    }
  }

  get swEnabled() {
    return this.su.isEnabled && this.sp.isEnabled;
  }

  checkForUpdate() {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this.isUpdateAvailable) {
        _this.isUpdateAvailable = true;

        try {
          _this.isUpdateAvailable = yield _this.su.checkForUpdate();
        } catch (e) {
          _this.gs.log('[SERVICE_WORKER_CHECK_FOR_UPDATE_ERROR]', e, 'error');
        }
      }

      _this.gs.log('[SERVICE_WORKER_UPDATE_AVAILABLE]', _this.isUpdateAvailable);

      return _this.isUpdateAvailable;
    })();
  }

  activateUpdate() {
    var _this2 = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _a, _b, _c;

      let au = false;

      if (_this2.isUpdateAvailable) {
        try {
          au = yield _this2.su.activateUpdate();
          _this2.isUpdateAvailable = false;
          (_a = _this2.dialogRef) === null || _a === void 0 ? void 0 : _a.close(null);
          (_b = _this2.subsDialog) === null || _b === void 0 ? void 0 : _b.unsubscribe();
          _this2.dialogRef = _this2.ds.openInfoDialog({
            data: {
              title: `Pembaharuan ${au ? 'Berhasil' : 'Gagal'}`,
              htmlMessage: `Ingin Refresh Halaman (?)`,
              confirmText: 'Ya',
              cancelText: 'Tidak'
            }
          });
          _this2.subsDialog = (_c = _this2.dialogRef) === null || _c === void 0 ? void 0 : _c.afterClosed().subscribe({
            next: re => {
              _this2.gs.log('[INFO_DIALOG_CLOSED]', re);

              _this2.dialogRef = null;

              _this2.subsDialog.unsubscribe();

              if (re === true) {
                window.location.reload();
              }
            }
          });
        } catch (e) {
          _this2.gs.log('[SERVICE_WORKER_ACTIVATE_UPDATE_ERROR]', e, 'error');
        }
      }

      _this2.gs.log('[SERVICE_WORKER_UPDATE_FINISH]', au);

      return au;
    })();
  }

  initialize() {
    var _this3 = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.swuVerUpd = _this3.su.versionUpdates.subscribe({
        next: function () {
          var _ref = (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (event) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;

            _this3.gs.log(`[SERVICE_WORKER_${event.type}]`, event);

            if (event.type === 'VERSION_DETECTED') {
              (_a = _this3.dialogRef) === null || _a === void 0 ? void 0 : _a.close(null);
              (_b = _this3.subsDialog) === null || _b === void 0 ? void 0 : _b.unsubscribe();
            }

            if (event.type === 'VERSION_READY') {
              _this3.dialogRef = _this3.ds.openInfoDialog({
                data: {
                  title: 'Ada Pembaharuan Tersedia',
                  htmlMessage: `
                <div>Sekarang :: ${(_d = (_c = event.currentVersion) === null || _c === void 0 ? void 0 : _c.hash) === null || _d === void 0 ? void 0 : _d.slice(0, 8)}</div>
                <div>Tersedia :: ${(_f = (_e = event.latestVersion) === null || _e === void 0 ? void 0 : _e.hash) === null || _f === void 0 ? void 0 : _f.slice(0, 8)}</div>
              `,
                  confirmText: 'OK'
                }
              });
            }

            if (event.type === 'VERSION_INSTALLATION_FAILED') {
              _this3.dialogRef = _this3.ds.openInfoDialog({
                data: {
                  title: 'Pembaharuan Gagal',
                  htmlMessage: `
                <div>Versi :: ${(_h = (_g = event.version) === null || _g === void 0 ? void 0 : _g.hash) === null || _h === void 0 ? void 0 : _h.slice(0, 8)}</div>
                <div>Error :: ${event.error}</div>
              `,
                  confirmText: 'Ulangi',
                  cancelText: 'Lewati'
                }
              });
            }

            _this3.subsDialog = (_j = _this3.dialogRef) === null || _j === void 0 ? void 0 : _j.afterClosed().subscribe({
              next: re => {
                _this3.gs.log('[INFO_DIALOG_CLOSED]', re);

                if (re === true) {
                  _this3.activateUpdate();
                }

                _this3.dialogRef = null;

                _this3.subsDialog.unsubscribe();
              }
            });
          });

          return function next(_x) {
            return _ref.apply(this, arguments);
          };
        }()
      });
      _this3.swuUnRecv = _this3.su.unrecoverable.subscribe({
        next: event => {
          var _a, _b, _c;

          _this3.gs.log(`[SERVICE_WORKER_${event.type}]`, event.reason);

          (_a = _this3.dialogRef) === null || _a === void 0 ? void 0 : _a.close(null);
          (_b = _this3.subsDialog) === null || _b === void 0 ? void 0 : _b.unsubscribe();
          _this3.dialogRef = _this3.ds.openInfoDialog({
            data: {
              title: 'Service Worker Bermasalah',
              htmlMessage: `Kesalahan :: ${event.reason}`,
              confirmText: 'Refresh Halaman'
            }
          });
          _this3.subsDialog = (_c = _this3.dialogRef) === null || _c === void 0 ? void 0 : _c.afterClosed().subscribe({
            next: re => {
              _this3.gs.log('[INFO_DIALOG_CLOSED]', re);

              _this3.dialogRef = null;

              _this3.subsDialog.unsubscribe();

              window.location.reload();
            }
          });
        }
      });
    })();
  }

}

ServiceWorkerService.ɵfac = function ServiceWorkerService_Factory(t) {
  return new (t || ServiceWorkerService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_service_worker__WEBPACK_IMPORTED_MODULE_4__.SwUpdate), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_service_worker__WEBPACK_IMPORTED_MODULE_4__.SwPush), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_dialog_service__WEBPACK_IMPORTED_MODULE_2__.DialogService));
};

ServiceWorkerService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: ServiceWorkerService,
  factory: ServiceWorkerService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 28381:
/*!**********************************************************!*\
  !*** ./src/app/_shared/services/stats-server.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatsServerService": () => (/* binding */ StatsServerService)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io-client */ 23751);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 76317);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants */ 26271);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth.service */ 4137);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global.service */ 80855);
/* harmony import */ var _busy_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./busy.service */ 33000);
/* harmony import */ var _notifications_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./notifications.service */ 37140);
/* harmony import */ var _left_menu_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./left-menu.service */ 70007);
/* harmony import */ var _toast_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./toast.service */ 96925);
/* harmony import */ var _dialog_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dialog.service */ 55393);
/* harmony import */ var _service_worker_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./service-worker.service */ 79775);















class StatsServerService {
  constructor(as, router, gs, bs, notif, lms, toast, ds, sw) {
    this.as = as;
    this.router = router;
    this.gs = gs;
    this.bs = bs;
    this.notif = notif;
    this.lms = lms;
    this.toast = toast;
    this.ds = ds;
    this.sw = sw;
    this.mySocket = null;
    this.visitor = 0;
    this.latency = 0;
    this.statsServer = {
      mainSite: {
        cpus: 0,
        mem_ram: 0,
        disk_io: 0,
        net_tx: 0,
        net_rx: 0
      },
      billing: {
        ongoing: 0
      }
    };
    this.messageChatUnreadCount = 0;
    this.badgeNews = [];
    this.badgeBerkas = [];
    this.badgeFansub = [];
    this.github = null;
    this.currentServerSubject = new rxjs__WEBPACK_IMPORTED_MODULE_12__.BehaviorSubject(null);
    this.currentServer = this.currentServerSubject.asObservable();
    this.currentServerValue = null;
    this.currentRoomSubject = new rxjs__WEBPACK_IMPORTED_MODULE_12__.BehaviorSubject(null);
    this.currentRoom = this.currentRoomSubject.asObservable();
    this.currentChatRoom = [];
    this.globalRoomSubject = new rxjs__WEBPACK_IMPORTED_MODULE_12__.BehaviorSubject(null);
    this.globalRoom = this.globalRoomSubject.asObservable();
    this.globalChatRoom = [];
    this.fansubRoomSubject = new rxjs__WEBPACK_IMPORTED_MODULE_12__.BehaviorSubject(null);
    this.fansubRoom = this.fansubRoomSubject.asObservable();
    this.fansubChatRoom = [];
    this.serverLog = '// Tidak Ada Catatan Log~';
    this.quizRoom = {};
    this.subsServer = null;
    this.subsDialog = null;
    this.timedOut = null;

    if (this.gs.isBrowser) {
      this.mySocket = socket_io_client__WEBPACK_IMPORTED_MODULE_1___default()('//', {
        query: {
          'ngsw-bypass': true,
          token: this.as.token
        },
        transports: ['websocket', 'polling'],
        transportOptions: {
          polling: {
            extraHeaders: {
              'x-access-token': this.as.token
            }
          }
        }
      });
      this.socketListen();
      this.checkServerMaintenance();
    }
  }

  get currentRoomValue() {
    var _a;

    return ((_a = this.currentRoomSubject) === null || _a === void 0 ? void 0 : _a.value) || null;
  }

  get globalRoomValue() {
    var _a;

    return ((_a = this.globalRoomSubject) === null || _a === void 0 ? void 0 : _a.value) || null;
  }

  checkServerMaintenance() {
    var _this = this;

    this.subsServer = this.currentServer.subscribe({
      next: function () {
        var _ref = (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (server) {
          var _a;

          if (server && server.isMaintenance && ((_a = _this.currentServerValue) === null || _a === void 0 ? void 0 : _a.isMaintenance) !== server.isMaintenance) {
            _this.subsDialog = (yield _this.ds.openMaintenanceDialog()).afterClosed().subscribe({
              next: re => {
                _this.gs.log('[INFO_DIALOG_CLOSED]', re);

                _this.subsDialog.unsubscribe();
              }
            });
          }

          _this.currentServerValue = server;
        });

        return function next(_x) {
          return _ref.apply(this, arguments);
        };
      }()
    });
  }

  pingPong() {
    this.socketEmitVolatile('ping-pong', {}, response => {
      this.gs.log('[SOCKET_PING_PONG]', response);

      if ('github' in response && response.github) {
        this.github = response.github;
      }

      if ('server' in response && response.server) {
        this.currentServerSubject.next(response.server);
      }
    });
    this.socketEmitVolatile('stats-server', {}, response => {
      this.gs.log('[SOCKET_STATS_SERVER]', response);
      this.statsServer = response;
    });
  }

  socketListen() {
    var _this2 = this;

    this.mySocket.on('connect', () => {
      this.gs.log('[SOCKET_CONNECTED]', this.mySocket.id);
      this.pingPong();
      this.notif.removeNotif(`${_environments_app_environment__WEBPACK_IMPORTED_MODULE_3__.environment.siteName.toUpperCase()}_SOCKET_DISCONNECTED`);
      this.timedOut = setTimeout(() => {
        this.socketLeaveAndJoinNewRoom(null, this.router.url.split('?')[0]);
      }, 1234);
    });
    this.mySocket.on('connect_error', () => {
      this.gs.log('[SOCKET_CONNECT_ERROR]', this.mySocket.io.opts, 'error');
      this.mySocket.io.opts.transports = ['polling', 'websocket'];
    });
    this.mySocket.on('disconnect', reason => {
      this.gs.log('[SOCKET_DISCONNECTED]', reason);
      this.notif.addNotif(null, `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_3__.environment.siteName.toUpperCase()}_SOCKET_DISCONNECTED`, 'warning', 'Sambungan Terputus', 'Tidak dapat terhubung dengan <i>Server</i> melalui <i>WebSocket</i> !!', false);
      this.sw.isUpdateAvailable = false;
    });
    this.mySocket.on('ping', () => {
      this.gs.log('[SOCKET_PING]', Date.now());
    });
    this.mySocket.on('server-config', data => {
      this.currentServerSubject.next(data);
    });
    this.mySocket.on('pong', data => {
      this.latency = data;
      this.gs.log('[SOCKET_PONG]', `${Date.now()} => ${data} ms`);
      this.pingPong();
      this.sw.checkForUpdate();
    });
    this.mySocket.on('visitors', visitors => {
      this.gs.log('[SOCKET_VISITOR]', this.visitor);
      this.visitor = visitors;
    });
    this.mySocket.on('console-log', log => {
      this.gs.log('[SOCKET_CONSOLE_LOG]', log);
      this.serverLog = `${log}\r\n${this.serverLog}`;
    });
    this.mySocket.on('force-redirect', data => {
      this.gs.log('[SOCKET_REDIRECT]', data.message);
      this.toast.info(data.message, data.title, null, true);
      this.router.navigateByUrl(data.url);
    });
    this.mySocket.on('force-logout', reason => {
      this.gs.log('[SOCKET_EXIT]', reason);
      this.toast.info(reason, 'Keluar Paksa!', null, true);
      this.as.logout();
    });
    this.mySocket.on('new-notification', notifObj => {
      this.gs.log('[SOCKET_NOTIFICATION]', notifObj);
      this.notif.addNotif(notifObj.notifCreator, notifObj.notifData.id, notifObj.notifData.type, notifObj.notifData.title, notifObj.notifData.content, notifObj.notifData.dismissible);
    });
    this.mySocket.on('new-information', /*#__PURE__*/function () {
      var _ref2 = (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (notifObj) {
        _this2.gs.log('[SOCKET_INFORMATION]', notifObj);

        _this2.subsDialog = _this2.ds.openInfoDialog({
          data: {
            title: notifObj.infoData.title,
            htmlMessage: notifObj.infoData.content,
            confirmText: notifObj.infoData.confirm,
            cancelText: notifObj.infoData.cancel
          },
          disableClose: notifObj.infoData.close
        }).afterClosed().subscribe({
          next: re => {
            _this2.gs.log('[INFO_DIALOG_CLOSED]', re);

            _this2.subsDialog.unsubscribe();
          }
        });
      });

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
    this.mySocket.on('new-berkas', berkasObj => {
      this.gs.log('[SOCKET_BERKAS]', berkasObj);
      this.badgeBerkas.push(berkasObj);
      const berkas = this.lms.contentMenus.find(m => m.link === '/berkas');

      if (berkas) {
        if (this.badgeBerkas.length > 0) {
          berkas.badge = this.badgeBerkas.length;
        } else {
          berkas.badge = null;
        }
      }
    });
    this.mySocket.on('new-fansub', fansubObj => {
      this.gs.log('[SOCKET_FANSUB]', fansubObj);
      this.badgeFansub.push(fansubObj);
      const fansub = this.lms.contentMenus.find(m => m.link === '/fansub');

      if (fansub) {
        if (this.badgeFansub.length > 0) {
          fansub.badge = this.badgeFansub.length;
        } else {
          fansub.badge = null;
        }
      }
    });
    this.mySocket.on('new-news', newsObj => {
      this.gs.log('[SOCKET_NEWS]', newsObj);
      this.badgeNews.push(newsObj);
      const news = this.lms.mainMenus.find(m => m.link === '/news');

      if (news) {
        if (this.badgeNews.length > 0) {
          news.badge = this.badgeNews.length;
        } else {
          news.badge = null;
        }
      }
    });
    this.mySocket.on('receive-chat', msg => {
      this.gs.log('[SOCKET_RECEIVE-CHAT]', msg);

      if (msg.room_id === _constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.socketRoomNameGlobalPublic) {
        this.globalChatRoom.push(msg);
      } else if (msg.room_id === _constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.socketRoomNameGlobalFansub) {
        this.fansubChatRoom.push(msg);
      } else {
        if (msg.room_id !== _constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.socketRoomNameServerLogs) {
          this.currentChatRoom.push(msg);
        }
      }

      this.messageChatUnreadCount++;
    });
    this.mySocket.on('room-info', roomInfo => {
      this.gs.log('[SOCKET_ROOM-INFO]', roomInfo);
      this.gs.cleanObject(roomInfo === null || roomInfo === void 0 ? void 0 : roomInfo.member_list);

      if (roomInfo.room_id === _constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.socketRoomNameGlobalPublic) {
        this.globalRoomSubject.next(roomInfo);
      } else if (roomInfo.room_id === _constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.socketRoomNameGlobalFansub) {
        this.fansubRoomSubject.next(roomInfo);
      } else {
        if (roomInfo.room_id !== _constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.socketRoomNameServerLogs) {
          this.currentRoomSubject.next(roomInfo);
        }
      }
    });
    this.mySocket.on('multiple-connection', (multipleConnection, callback) => {
      this.gs.log('[SOCKET_MULTIPLE-CONNECTION]', multipleConnection);
      this.toast.warning('Sesi lain telah aktif!', 'Koneksi Duplikat', null, true);
      this.mySocket.io.reconnection(false);
      this.bs.clear();

      if (callback) {
        callback();
      }
    });
    this.mySocket.on('quiz-question', quizQuestion => {
      this.gs.log('[SOCKET_QUIZ]', quizQuestion);

      if (this.gs.routerData.question && this.gs.routerData.options) {
        const {
          room_id,
          ...quiz
        } = quizQuestion;
        this.quizRoom[room_id] = quiz;
        this.quizRoom[room_id].options = this.gs.shuffle(this.quizRoom[room_id].options);
      }
    });
  }

  socketEmit(eventName, eventData = {}, callback = null) {
    var _a, _b;

    if (this.as.token) {
      eventData.token = this.as.token;
    }

    if (callback) {
      (_a = this.mySocket) === null || _a === void 0 ? void 0 : _a.emit(eventName, eventData, callback);
    } else {
      (_b = this.mySocket) === null || _b === void 0 ? void 0 : _b.emit(eventName, eventData);
    }
  }

  socketEmitVolatile(eventName, eventData = {}, callback = null) {
    this.socketEmit(eventName, eventData, callback); // if (this.as.token) {
    //   eventData.token = this.as.token;
    // }
    // if (callback) {
    //   this.mySocket?.volatile.emit(eventName, eventData, callback);
    // } else {
    //   this.mySocket?.volatile.emit(eventName, eventData);
    // }
  }

  socketLeaveAndJoinNewRoom(previousUrl, currentNewUrl) {
    this.gs.log(`[SOCKET_LEAVE-JOIN-ROOM] ${previousUrl} => ${currentNewUrl}`);
    this.socketEmit('leave-join-room', {
      oldRoom: previousUrl,
      newRoom: currentNewUrl
    });
  }

}

StatsServerService.ɵfac = function StatsServerService_Factory(t) {
  return new (t || StatsServerService)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_busy_service__WEBPACK_IMPORTED_MODULE_6__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_notifications_service__WEBPACK_IMPORTED_MODULE_7__.NotificationsService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_left_menu_service__WEBPACK_IMPORTED_MODULE_8__.LeftMenuService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_toast_service__WEBPACK_IMPORTED_MODULE_9__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_dialog_service__WEBPACK_IMPORTED_MODULE_10__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_service_worker_service__WEBPACK_IMPORTED_MODULE_11__.ServiceWorkerService));
};

StatsServerService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjectable"]({
  token: StatsServerService,
  factory: StatsServerService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 96925:
/*!***************************************************!*\
  !*** ./src/app/_shared/services/toast.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToastService": () => (/* binding */ ToastService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.service */ 80855);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ 34101);
/* harmony import */ var _notifications_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notifications.service */ 37140);




class ToastService {
    constructor(gs, toast, notif) {
        this.gs = gs;
        this.toast = toast;
        this.notif = notif;
        if (this.gs.isBrowser) {
            //
        }
    }
    remove(toastId) {
        return this.toast.remove(toastId);
    }
    success(message, title, override, force = false) {
        if (force) {
            this.notif.addNotif(null, new Date().getTime(), 'success', title, message);
        }
        if (this.gs.isDesktop || force) {
            return this.toast.success(message, title, override);
        }
        return null;
    }
    warning(message, title, override, force = false) {
        if (force) {
            this.notif.addNotif(null, new Date().getTime(), 'warning', title, message);
        }
        if (this.gs.isDesktop || force) {
            return this.toast.warning(message, title, override);
        }
        return null;
    }
    info(message, title, override, force = false) {
        if (force) {
            this.notif.addNotif(null, new Date().getTime(), 'info', title, message);
        }
        if (this.gs.isDesktop || force) {
            return this.toast.info(message, title, override);
        }
        return null;
    }
    error(message, title, override, force = false) {
        if (force) {
            this.notif.addNotif(null, new Date().getTime(), 'danger', title, message);
        }
        if (this.gs.isDesktop || force) {
            return this.toast.error(message, title, override);
        }
        return null;
    }
}
ToastService.ɵfac = function ToastService_Factory(t) { return new (t || ToastService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_3__.ToastrService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_notifications_service__WEBPACK_IMPORTED_MODULE_1__.NotificationsService)); };
ToastService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ToastService, factory: ToastService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 8058:
/*!**************************************************!*\
  !*** ./src/app/_shared/services/user.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserService": () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 19337);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ 4137);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global.service */ 80855);





class UserService {
    constructor(api, as, gs) {
        this.api = api;
        this.as = as;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    delete(username) {
        return this.api.deleteData(`/user/${username}`);
    }
    checkBanned(username) {
        return this.api.getData(`/banned?username=${username}`);
    }
    getAllUser(q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/user?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getUserData(username) {
        return this.api.getData(`/user/${username}`);
    }
    updateUser(username, userData) {
        return this.api.putData(`/user/${username}`, userData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(respUpdateUser => {
            this.as.token = respUpdateUser.result.token;
        }));
    }
    getUserBerkas(username, q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/user/${username}/feed-berkas?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getUserFeedComment(username, q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/user/${username}/feed-comment?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getUserFeedLikeDislike(username, q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/user/${username}/feed-likedislike?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getUserFeedVisit(username, q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/user/${username}/feed-visit?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    sosmedLogin(data) {
        return this.api.postData('/verify-sosmed', data);
    }
    getUserGroup(username) {
        return this.api.getData(`/user/${username}/group`);
    }
    findLostAccount(data) {
        return this.api.postData('/lost-account-find', data);
    }
    resetLostAccount(data) {
        return this.api.postData('/lost-account-reset', data);
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService)); };
UserService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 74868:
/*!*****************************************************!*\
  !*** ./src/app/_shared/services/viewer.service..ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewerService": () => (/* binding */ ViewerService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global.service */ 80855);


class ViewerService {
    constructor(gs) {
        this.gs = gs;
        this.currentViewer = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    viewImage(htmlElement) {
        this.currentViewer = new Viewer(htmlElement, {
            url: 'src',
            navbar: false,
            title: true,
            toolbar: {
                zoomIn: true,
                zoomOut: true,
                oneToOne: true,
                reset: true,
                prev: false,
                play: {
                    show: false,
                    size: 'large'
                },
                next: false,
                rotateLeft: true,
                rotateRight: true,
                flipHorizontal: true,
                flipVertical: true
            },
            ready: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
                this.currentViewer.show();
            },
            show: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            shown: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            view: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            viewed: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            move: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            moved: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            rotate: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            rotated: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            scale: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            scaled: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            play: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            stop: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            hide: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            zoom: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            zoomed: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
            },
            hidden: (e) => {
                this.gs.log('[VIEWERJS]', e.type);
                this.currentViewer.destroy();
                this.currentViewer = null;
            },
        });
    }
}
ViewerService.ɵfac = function ViewerService_Factory(t) { return new (t || ViewerService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
ViewerService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ViewerService, factory: ViewerService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 88020:
/*!****************************************************!*\
  !*** ./src/app/_shared/services/winbox.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WinboxService": () => (/* binding */ WinboxService)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);
/* harmony import */ var _dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dialog.service */ 55393);
/* harmony import */ var _stats_server_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stats-server.service */ 28381);





class WinboxService {
  constructor(gs, ds, ss) {
    this.gs = gs;
    this.ds = ds;
    this.ss = ss;
    this.currentServer = null;
    this.openedWindow = {};
    this.subsDialog = null;
    this.subsServer = null;

    if (this.gs.isBrowser) {
      this.subsServer = this.ss.currentServer.subscribe({
        next: server => this.currentServer = server
      });
    }
  }

  confirmationOpenUrl(uriUrl, windowTarget) {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.subsDialog = (yield _this.ds.openKonfirmasiDialog(`Ingin Buka Di Tab ${windowTarget === '_self' ? 'Ini' : 'Baru'} ?`, uriUrl, false)).afterClosed().subscribe({
        next: re => {
          _this.gs.log('[INFO_DIALOG_CLOSED]', re);

          if (re === true) {
            window.open(uriUrl, windowTarget);
          }

          _this.subsDialog.unsubscribe();
        }
      });
    })();
  }

  winboxOpenUri(uriUrl, windowTarget = '_blank', force = false) {
    var _a;

    if (uriUrl.startsWith('http://')) {
      uriUrl = 'https://' + uriUrl.slice(7, uriUrl.length);
    }

    if (uriUrl.startsWith('/api/')) {
      this.confirmationOpenUrl(uriUrl, '_self');
    } else if (((_a = this.currentServer) === null || _a === void 0 ? void 0 : _a.winboxOpenLink) && !this.gs.includesOneOf(uriUrl, ['ftp://', 'mailto:']) || force) {
      const currentDateTime = new Date().getTime();
      this.openedWindow[currentDateTime] = new WinBox(uriUrl, {
        id: currentDateTime,
        title: uriUrl,
        url: uriUrl,
        class: 'no-full no-shadow no-max',
        background: '#7b1fa2',
        x: 'center',
        y: 'center',
        top: 56,
        right: 0,
        bottom: 32,
        left: 64,
        onclose: force => {
          this.confirmationOpenUrl(uriUrl, windowTarget);
          return false;
        }
      });
    } else {
      this.confirmationOpenUrl(uriUrl, windowTarget);
    }
  }

}

WinboxService.ɵfac = function WinboxService_Factory(t) {
  return new (t || WinboxService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_dialog_service__WEBPACK_IMPORTED_MODULE_2__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_stats_server_service__WEBPACK_IMPORTED_MODULE_3__.StatsServerService));
};

WinboxService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: WinboxService,
  factory: WinboxService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 90158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ 26271);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/req-res.model */ 14249);
/* harmony import */ var _shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_shared/guards/roles.guard */ 2777);
/* harmony import */ var _shared_guards_verified_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_shared/guards/verified.guard */ 55094);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);







const routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'admin-mod',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"), __webpack_require__.e("default-src_app__shared_components_material-table_material-table_module_ts"), __webpack_require__.e("default-node_modules_kolkov_angular-editor_fesm2015_kolkov-angular-editor_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app__pages_admin_admin_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/admin/admin.module */ 79511)).then(m => m.AdminModule),
        canActivate: [_shared_guards_verified_guard__WEBPACK_IMPORTED_MODULE_3__.VerifiedGuard, _shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Admin & Moderator Panel Management',
            description: 'Halaman Khusus Untuk Administrasi & Moderasi',
            keywords: 'Admin Moderator Fansub Database',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorVerifiedOnly]: true,
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR]
        }
    },
    {
        path: 'create',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_kolkov_angular-editor_fesm2015_kolkov-angular-editor_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app__pages_create_create_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/create/create.module */ 955)).then(m => m.CreateModule),
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Membuat Konten Baru',
            description: 'Membuat Konten Baru',
            keywords: 'Add New Content',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER]
        }
    },
    {
        path: 'login',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app__pages_login_login_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/login/login.module */ 94541)).then(m => m.LoginModule),
        data: {
            title: 'Masuk',
            description: 'Halaman Login',
            keywords: 'Login'
        }
    },
    {
        path: 'register',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ng-recaptcha_fesm2015_ng-recaptcha_mjs"), __webpack_require__.e("src_app__pages_register_register_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/register/register.module */ 84992)).then(m => m.RegisterModule),
        data: {
            title: 'Pendaftaran',
            description: 'Halaman Pembuatan Akun Baru',
            keywords: 'Register'
        }
    },
    {
        path: 'reset-password',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ng-recaptcha_fesm2015_ng-recaptcha_mjs"), __webpack_require__.e("src_app__pages_reset-password_reset-password_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/reset-password/reset-password.module */ 2420)).then(m => m.ResetPasswordModule),
        data: {
            title: 'Reset Akun',
            description: 'Halaman Atur Ulang Kata Sandi',
            keywords: 'Reset Password'
        }
    },
    {
        path: 'privacy-policy',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app__pages_privacy-policy_privacy-policy_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/privacy-policy/privacy-policy.module */ 18999)).then(m => m.PrivacyPolicyModule),
        data: {
            title: 'Privacy Policy',
            description: 'Halaman Kebijakan Privasi',
            keywords: 'privacy-policy'
        }
    },
    {
        path: 'verify',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_ng-recaptcha_fesm2015_ng-recaptcha_mjs"), __webpack_require__.e("src_app__pages_verify_verify_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/verify/verify.module */ 92548)).then(m => m.VerifyModule),
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Verifikasi',
            description: 'Halaman Verifikasi Akun',
            keywords: 'Verify',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER]
        }
    },
    {
        path: 'home',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_banner-discord_banner-discord_module_ts-src_app__shared_co-d251ba"), __webpack_require__.e("common"), __webpack_require__.e("src_app__pages_home_home_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/home/home.module */ 27379)).then(m => m.HomeModule),
        data: {
            title: 'Database Fansub Indonesia',
            description: 'Database Fansub Indonesia',
            keywords: 'Fansub DB'
        }
    },
    {
        path: 'news',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"), __webpack_require__.e("default-src_app__shared_components_material-table_material-table_module_ts"), __webpack_require__.e("default-src_app__shared_directives_custom-directive_module_ts-node_modules_angular_cdk_fesm20-ed0c89"), __webpack_require__.e("default-src_app__shared_components_material-tab_material-tab_module_ts"), __webpack_require__.e("default-node_modules_kolkov_angular-editor_fesm2015_kolkov-angular-editor_mjs"), __webpack_require__.e("default-src_app__shared_components_banner-discord_banner-discord_module_ts-src_app__shared_co-d251ba"), __webpack_require__.e("src_app__pages_news_news_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/news/news.module */ 6577)).then(m => m.NewsModule),
        data: {
            title: 'Berita & Informasi',
            description: 'Papan Pengumuman',
            keywords: 'News'
        }
    },
    {
        path: 'mailbox',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"), __webpack_require__.e("default-src_app__shared_components_material-table_material-table_module_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app__pages_mailbox_mailbox_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/mailbox/mailbox.module */ 41309)).then(m => m.MailboxModule),
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard, _shared_guards_verified_guard__WEBPACK_IMPORTED_MODULE_3__.VerifiedGuard],
        data: {
            title: 'Surat Elektronik',
            description: 'E-Mail & DM\'s',
            keywords: 'Surel Email DM',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorVerifiedOnly]: true,
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER]
        }
    },
    {
        path: 'nihongo',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"), __webpack_require__.e("default-src_app__shared_components_material-table_material-table_module_ts"), __webpack_require__.e("default-src_app__shared_directives_custom-directive_module_ts-node_modules_angular_cdk_fesm20-ed0c89"), __webpack_require__.e("default-src_app__shared_components_material-tab_material-tab_module_ts"), __webpack_require__.e("default-node_modules_kolkov_angular-editor_fesm2015_kolkov-angular-editor_mjs"), __webpack_require__.e("default-src_app__shared_components_banner-discord_banner-discord_module_ts-src_app__shared_co-d251ba"), __webpack_require__.e("common"), __webpack_require__.e("src_app__pages_nihongo_nihongo_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/nihongo/nihongo.module */ 24440)).then(m => m.NihongoModule),
        data: {
            title: 'Belajar Bahasa Jepang',
            description: 'Jejepangan Lebih Seru Dengan Bahasa Aslinya',
            keywords: 'Bahasa Jepang'
        }
    },
    {
        path: 'berkas',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"), __webpack_require__.e("default-src_app__shared_components_material-table_material-table_module_ts"), __webpack_require__.e("default-src_app__shared_directives_custom-directive_module_ts-node_modules_angular_cdk_fesm20-ed0c89"), __webpack_require__.e("default-src_app__shared_components_material-tab_material-tab_module_ts"), __webpack_require__.e("default-node_modules_kolkov_angular-editor_fesm2015_kolkov-angular-editor_mjs"), __webpack_require__.e("default-node_modules_moment_min_moment_min_js"), __webpack_require__.e("default-src_app__shared_components_report_report_module_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app__pages_berkas_berkas_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/berkas/berkas.module */ 64045)).then(m => m.BerkasModule),
        data: {
            title: 'Semua Berkas',
            description: 'Kelola Arsip Berkas',
            keywords: 'Berkas File'
        }
    },
    {
        path: 'anime',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"), __webpack_require__.e("default-src_app__shared_components_material-table_material-table_module_ts"), __webpack_require__.e("default-src_app__shared_directives_custom-directive_module_ts-node_modules_angular_cdk_fesm20-ed0c89"), __webpack_require__.e("default-src_app__shared_components_material-tab_material-tab_module_ts"), __webpack_require__.e("default-node_modules_moment_min_moment_min_js"), __webpack_require__.e("default-src_app__shared_components_card-anime-dorama_card-anime-dorama_module_ts-src_app__sha-d8677b"), __webpack_require__.e("src_app__pages_anime_anime_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/anime/anime.module */ 16037)).then(m => m.AnimeModule),
        data: {
            title: 'List Anime & Garapan Musiman',
            description: 'Daftar Isi Anime Musiman Yang Baru Saja Rilis Subtitle Indonesianya',
            keywords: 'Anime Subtitle Indonesia'
        }
    },
    {
        path: 'dorama',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"), __webpack_require__.e("default-src_app__shared_components_material-table_material-table_module_ts"), __webpack_require__.e("default-src_app__shared_directives_custom-directive_module_ts-node_modules_angular_cdk_fesm20-ed0c89"), __webpack_require__.e("default-src_app__shared_components_material-tab_material-tab_module_ts"), __webpack_require__.e("default-node_modules_moment_min_moment_min_js"), __webpack_require__.e("default-src_app__shared_components_card-anime-dorama_card-anime-dorama_module_ts-src_app__sha-d8677b"), __webpack_require__.e("src_app__pages_dorama_dorama_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/dorama/dorama.module */ 26796)).then(m => m.DoramaModule),
        data: {
            title: 'List Dorama & Garapan Musiman',
            description: 'Daftar Isi Dorama Musiman Yang Baru Saja Rilis Subtitle Indonesianya',
            keywords: 'Dorama Subtitle Indonesia'
        }
    },
    {
        path: 'fansub',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"), __webpack_require__.e("default-src_app__shared_components_material-table_material-table_module_ts"), __webpack_require__.e("default-src_app__shared_directives_custom-directive_module_ts-node_modules_angular_cdk_fesm20-ed0c89"), __webpack_require__.e("default-src_app__shared_components_material-tab_material-tab_module_ts"), __webpack_require__.e("default-node_modules_kolkov_angular-editor_fesm2015_kolkov-angular-editor_mjs"), __webpack_require__.e("default-node_modules_moment_min_moment_min_js"), __webpack_require__.e("default-src_app__shared_components_report_report_module_ts"), __webpack_require__.e("src_app__pages_fansub_fansub_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/fansub/fansub.module */ 26139)).then(m => m.FansubModule),
        data: {
            title: 'Katalog Informasi Seluruh Fansub Indonesia',
            description: 'Daftar Isi Seluruh Fansub Indonesia',
            keywords: 'Fansub Indonesia'
        }
    },
    {
        path: 'user',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"), __webpack_require__.e("default-src_app__shared_components_material-table_material-table_module_ts"), __webpack_require__.e("default-src_app__shared_directives_custom-directive_module_ts-node_modules_angular_cdk_fesm20-ed0c89"), __webpack_require__.e("default-src_app__shared_components_material-tab_material-tab_module_ts"), __webpack_require__.e("default-node_modules_kolkov_angular-editor_fesm2015_kolkov-angular-editor_mjs"), __webpack_require__.e("default-node_modules_moment_min_moment_min_js"), __webpack_require__.e("default-src_app__shared_components_report_report_module_ts"), __webpack_require__.e("src_app__pages_user_user_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/user/user.module */ 79058)).then(m => m.UserModule),
        data: {
            title: 'User Profile',
            description: 'Halaman Informasi Pengguna',
            keywords: 'User'
        }
    },
    {
        path: 'rss-feed',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"), __webpack_require__.e("default-src_app__shared_components_material-table_material-table_module_ts"), __webpack_require__.e("default-src_app__shared_directives_custom-directive_module_ts-node_modules_angular_cdk_fesm20-ed0c89"), __webpack_require__.e("default-src_app__shared_components_material-tab_material-tab_module_ts"), __webpack_require__.e("default-src_app__shared_components_banner-discord_banner-discord_module_ts-src_app__shared_co-d251ba"), __webpack_require__.e("src_app__pages_rss-feed_rss-feed_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/rss-feed/rss-feed.module */ 73728)).then(m => m.RssFeedModule),
        data: {
            title: 'Loper Koran RSS Feed',
            description: 'Halaman Rangkuman Berita Acara Fansub Indonesia',
            keywords: 'RSS Feed'
        }
    },
    {
        path: 'torrent',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"), __webpack_require__.e("default-src_app__shared_directives_custom-directive_module_ts-node_modules_angular_cdk_fesm20-ed0c89"), __webpack_require__.e("common"), __webpack_require__.e("src_app__pages_torrent_torrent_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/torrent/torrent.module */ 39692)).then(m => m.TorrentModule),
        data: {
            title: 'Web-SocketRTC Torrent',
            description: 'Halaman Peer-to-Peer Berbagi Berkas',
            keywords: 'Web Torrent'
        }
    },
    {
        path: 'docs',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app__shared_components_banner-discord_banner-discord_module_ts-src_app__shared_co-d251ba"), __webpack_require__.e("src_app__pages_docs_docs_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/docs/docs.module */ 52327)).then(m => m.DocsModule),
        data: {
            title: 'Developers Documentation',
            description: 'For Developers Only',
            keywords: 'Domain & API Keys'
        }
    },
    {
        path: 'error',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app__pages_not-found_not-found_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./_pages/not-found/not-found.module */ 63218)).then(m => m.NotFoundModule),
        data: {
            title: 'Error - 404',
            description: 'Whoops! Halaman Tidak Ditemukan',
            keywords: '404 - Not Found'
        }
    },
    {
        path: '**',
        redirectTo: 'error'
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forRoot(routes, {
                initialNavigation: 'enabledBlocking',
                scrollPositionRestoration: 'enabled',
                relativeLinkResolution: 'corrected'
            })
        ], _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] }); })();


/***/ }),

/***/ 55041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_animations_anim_side_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_shared/animations/anim-side-menu */ 40746);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/snack-bar */ 32528);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_local_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_shared/services/local-storage.service */ 53379);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_left_menu_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_shared/services/left-menu.service */ 70007);
/* harmony import */ var _shared_services_right_panel_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_shared/services/right-panel.service */ 56514);
/* harmony import */ var _shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_shared/services/stats-server.service */ 28381);
/* harmony import */ var _shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_shared/services/winbox.service */ 88020);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_service_worker_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./_shared/services/service-worker.service */ 79775);
/* harmony import */ var _shared_services_viewer_service___WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./_shared/services/viewer.service. */ 74868);
/* harmony import */ var _shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./_shared/components/header/header.component */ 45009);
/* harmony import */ var ngx_progressbar__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ngx-progressbar */ 46829);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/sidenav */ 7216);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _shared_components_left_menu_left_menu_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./_shared/components/left-menu/left-menu.component */ 33679);
/* harmony import */ var _shared_components_right_panel_right_panel_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./_shared/components/right-panel/right-panel.component */ 13223);
/* harmony import */ var _shared_components_material_fab_material_fab_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./_shared/components/material-fab/material-fab.component */ 1875);
/* harmony import */ var _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./_shared/components/footer/footer.component */ 44732);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ngx-spinner */ 63947);





























const _c0 = ["leftSideNav"];
const _c1 = ["rightSidePanel"];
const _c2 = ["siteContent"];

const _c3 = function (a0) {
  return {
    "background-image": a0
  };
};

class AppComponent {
  constructor(snackBar, renderer, router, activatedRoute, bs, pi, as, fs, ls, gs, lms, rps, ss, wb, ds, sw, viewer) {
    this.snackBar = snackBar;
    this.renderer = renderer;
    this.router = router;
    this.activatedRoute = activatedRoute;
    this.bs = bs;
    this.pi = pi;
    this.as = as;
    this.fs = fs;
    this.ls = ls;
    this.gs = gs;
    this.lms = lms;
    this.rps = rps;
    this.ss = ss;
    this.wb = wb;
    this.ds = ds;
    this.sw = sw;
    this.viewer = viewer;
    this.subsRouter = null;
    this.subsRouterChild = null;
    this.subsUrl = null;
    this.subsVerify = null;
    this.subsDialog = null;
    this.timedOut = null;

    if (this.gs.isBrowser) {//
    }
  }

  get sideNavType() {
    return this.gs.isDesktop ? 'side' : 'over';
  }

  onResize(event) {
    this.gs.onResize(event);
  }

  get ROUTER() {
    return this.router;
  }

  get GS() {
    return this.gs;
  }

  get LMS() {
    return this.lms;
  }

  get RPS() {
    return this.rps;
  }

  ngOnDestroy() {
    var _a, _b, _c, _d, _e;

    (_a = this.subsRouter) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsRouterChild) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsUrl) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    (_d = this.subsVerify) === null || _d === void 0 ? void 0 : _d.unsubscribe();
    (_e = this.subsDialog) === null || _e === void 0 ? void 0 : _e.unsubscribe();

    if (this.timedOut) {
      clearTimeout(this.timedOut);
      this.timedOut = null;
    }
  }

  ngAfterViewInit() {
    this.lms.sideNav = this.leftSideNav;
    this.rps.sidePanel = this.rightSidePanel;

    if (this.gs.isBrowser) {
      const appLoading = this.renderer.selectRootElement('#app-loading');

      if (appLoading) {
        appLoading.style.visibility = 'hidden';
        appLoading.style.opacity = 0;
      }
    }
  }

  ngOnInit() {
    var _this = this;

    this.gs.log(`[APP_BUILD_STATUS] 💘 ${_environments_app_environment__WEBPACK_IMPORTED_MODULE_2__.environment.siteName} :: ${_environments_app_environment__WEBPACK_IMPORTED_MODULE_2__.environment.production ? 'Production' : 'Development'} With Logging Enabled 📌`);
    this.gs.log(`[SERVICE_WORKER_STATUS] 💘 isEnabled :: ${this.sw.swEnabled} 📌`);
    this.pi.updatePageMetaData(`「💤 ${_environments_app_environment__WEBPACK_IMPORTED_MODULE_2__.environment.siteName}」`, `「✨ ${_environments_app_environment__WEBPACK_IMPORTED_MODULE_2__.environment.siteDescription}」`, `「💤 ${_environments_app_environment__WEBPACK_IMPORTED_MODULE_2__.environment.siteName} ✨🌞」`, `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_2__.environment.baseUrl}/assets/img/favicon.png`);
    this.subsRouter = this.router.events.subscribe({
      next: e1 => {
        if (e1 instanceof _angular_router__WEBPACK_IMPORTED_MODULE_21__.RouteConfigLoadStart) {
          if (this.gs.isBrowser) {
            this.bs.busy();
          }
        } else if (e1 instanceof _angular_router__WEBPACK_IMPORTED_MODULE_21__.RouteConfigLoadEnd) {
          if (this.gs.isBrowser) {
            this.bs.idle();
          }
        } else if (e1 instanceof _angular_router__WEBPACK_IMPORTED_MODULE_21__.NavigationStart) {
          if (this.gs.isBrowser) {
            if (e1.url) {
              const str = e1.url.split('/')[1];

              if (str) {
                const stringBadge = `badge${str[0].toUpperCase()}${str.slice(1)}`;

                if (this.ss[stringBadge]) {
                  this.ss[stringBadge] = [];
                  const mainMenu = this.lms.mainMenus.find(m => m.link === e1.url);
                  const contentMenu = this.lms.contentMenus.find(m => m.link === e1.url);
                  const miscMenu = this.lms.miscMenus.find(m => m.link === e1.url);

                  if (mainMenu) {
                    mainMenu.badge = null;
                  }

                  if (contentMenu) {
                    contentMenu.badge = null;
                  }

                  if (miscMenu) {
                    miscMenu.badge = null;
                  }
                }
              }

              this.gs.previousUrl = this.router.url.split('?')[0];
            }
          }
        } else if (e1 instanceof _angular_router__WEBPACK_IMPORTED_MODULE_21__.NavigationEnd) {
          let activatedRouteChild = this.activatedRoute.firstChild;

          for (const aRC of activatedRouteChild.children) {
            activatedRouteChild = aRC;
          }

          this.subsRouterChild = activatedRouteChild.data.subscribe({
            next: e2 => {
              this.updateBackgroundImage();
              this.gs.routerData = e2;
              this.pi.updatePageMetaData(e2['title'], e2['description'], e2['keywords'], this.gs.bgImgUrl || `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_2__.environment.baseUrl}/assets/img/favicon.png`);
              this.fs.removeFab();

              if (this.gs.isBrowser) {
                if (this.siteContent) {
                  this.siteContent.elementRef.nativeElement.scrollTop = 0;
                }

                const nextUrl = e1.url.split('?')[0];

                if (this.gs.previousUrl !== nextUrl) {
                  this.ss.currentChatRoom = [];
                }

                this.ss.socketLeaveAndJoinNewRoom(this.gs.previousUrl, nextUrl);
              }
            }
          });
        }
      }
    });

    if (this.gs.isBrowser) {
      this.checkStorage();
      this.windowRightClick = this.onWindowRightClick;
      this.windowLeftClick = this.onWindowLeftClick;
      this.windowDoubleClick = this.onWindowDoubleClick;
      this.windowBeforeUnloaded = this.onWindowBeforeUnloaded;
      this.timedOut = setTimeout( /*#__PURE__*/(0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const aturanTatib = _this.ls.getItem(_this.gs.localStorageKeys.AturanTatib) === 'true';

        if (!aturanTatib) {
          const defaultData = {
            id: 'ATURAN-TATA-TERTIB',
            data: {
              title: 'Aturan Dan Tata Tertib Komunitas',
              htmlMessage: 'Gagal Memuat Aturan Dan Tata Tertib Komunitas',
              confirmText: 'Ok, Saya Mengerti!',
              cancelText: null
            },
            disableClose: false,
            maxWidth: _this.ds.maxWidth
          };
          _this.subsDialog = (yield _this.ds.fetchInformationRegisterMode(defaultData)).afterClosed().subscribe({
            next: re => {
              _this.gs.log('[ATURAN_TATA_TERTIB_DIALOG_CLOSED]', re);

              if (typeof re === 'boolean') {
                _this.ls.setItem(_this.gs.localStorageKeys.AturanTatib, JSON.stringify(re));
              }

              _this.subsDialog.unsubscribe();
            }
          });
        }

        _this.injectServerTimeClock();

        if (_this.gs.weatherEffect) {
          _this.snackBar.open('Gunakan Menu Di Kanan Atas (Gambar Bunga) Untuk Mematikan Animasi Efek Musiman!', 'Ok');
        }
      }), 1234);
    }
  }

  updateBackgroundImage() {
    const urlPath = this.router.url.split('?')[0].substring(1).split('/')[0];
    this.gs.bgImgUrlPath = urlPath ? `/assets/img/router/${urlPath}.png` : '';
  }

  checkStorage() {
    this.bs.busy();
    this.subsVerify = this.as.verify(this.as.token).subscribe({
      next: success => {
        this.gs.log('[VERIFY_SUCCESS]', success);
        this.ss.socketLeaveAndJoinNewRoom(this.gs.previousUrl, this.router.url.split('?')[0]);
        this.bs.idle();
      },
      error: error => {
        this.gs.log('[VERIFY_ERROR]', error, 'error');
        this.bs.idle();
        this.as.removeUser();
      }
    });
  }

  resetLoading() {
    this.bs.clear();
  }

  onWindowRightClick(ev) {
    this.gs.log('[MOUSE_RIGHT_CLICK]', ev); // TODO :: Add Share Button & Disable Right Click
    // ev.preventDefault();
  }

  onWindowLeftClick(ev) {
    this.gs.log('[MOUSE_LEFT_CLICK]', ev);
    const e = ev || window.event;
    let el = e.target || e.srcElement;

    if (el) {
      let maxLoop = 5;
      const linkTag = ['A', 'a'];

      while (![...linkTag].includes(el.tagName) && maxLoop > 0) {
        el = el.parentElement || el.parentNode;
        maxLoop--;

        if (!el) {
          return true;
        }
      }

      if (linkTag.includes(el.tagName)) {
        const externalUri = el.getAttribute('href');

        if (externalUri) {
          if (this.gs.isDesktop && this.gs.includesOneOf(externalUri, ['http', 'ftp', 'mailto']) && !externalUri.includes(_environments_app_environment__WEBPACK_IMPORTED_MODULE_2__.environment.baseUrl)) {
            e.preventDefault();
            e.stopPropagation();
            this.winboxOpenUri(externalUri);
            return false;
          }
        }
      }
    }

    return true;
  }

  onWindowDoubleClick(ev) {
    this.gs.log('[MOUSE_DOUBLE_CLICK]', ev);
    const e = ev || window.event;
    const el = e.target || e.srcElement;

    if (el.tagName === 'IMG' || el.tagName === 'img') {
      if (this.gs.isDesktop) {
        this.viewer.viewImage(el);
      }
    }
  }

  onWindowBeforeUnloaded(ev) {
    if (this.as.token) {
      this.gs.log('[BROWSER_EXIT_CLOSE_SAVE_JWT]', this.as.token);
      this.ls.setItem(this.gs.localStorageKeys.Token, this.as.token);
    }
  }

  winboxOpenUri(uri) {
    this.wb.winboxOpenUri(uri);
  }

  injectServerTimeClock() {
    if (this.gs.isDesktop) {
      const backdrop = this.gs.document.getElementsByClassName('mat-drawer-backdrop');

      if (backdrop.length > 0) {
        const drawerBackdrop = backdrop[0];
        drawerBackdrop.innerHTML = `
          <div class="row align-items-center h-100">
            <div class="col-9 mx-auto text-light text-center">
              <h1>~ Kalender (｡>﹏<｡) Server ~</h1>
              <h1 id="serverDate"></h1>
              <h1 id="serverTime"></h1>
            </div>
          </div>
        `;
        const script = this.gs.document.createElement('script');
        script.type = 'text/javascript';
        script.textContent = `
          function runCalendar() {
            const calendar = new Date();
            const serverTime = document.getElementById('serverTime');
            serverTime.innerHTML = calendar.toLocaleTimeString('ja-JP', {
              timeZone: 'Asia/Tokyo',
              timeZoneName: 'longGeneric'
            });
            const serverDate = document.getElementById('serverDate');
            serverDate.innerHTML = calendar.toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'Asia/Tokyo'
            });
            setTimeout(runCalendar, 1000);
          }
          runCalendar();
        `;
        this.gs.document.head.appendChild(script);
      }
    }
  }

}

AppComponent.ɵfac = function AppComponent_Factory(t) {
  return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_23__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_22__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_21__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_21__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_4__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_5__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_6__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_local_storage_service__WEBPACK_IMPORTED_MODULE_7__.LocalStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_8__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_left_menu_service__WEBPACK_IMPORTED_MODULE_9__.LeftMenuService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_right_panel_service__WEBPACK_IMPORTED_MODULE_10__.RightPanelService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_11__.StatsServerService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_12__.WinboxService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_13__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_service_worker_service__WEBPACK_IMPORTED_MODULE_14__.ServiceWorkerService), _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdirectiveInject"](_shared_services_viewer_service___WEBPACK_IMPORTED_MODULE_15__.ViewerService));
};

AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵdefineComponent"]({
  type: AppComponent,
  selectors: [["app-root"]],
  viewQuery: function AppComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵviewQuery"](_c0, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵviewQuery"](_c1, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵviewQuery"](_c2, 7);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵloadQuery"]()) && (ctx.leftSideNav = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵloadQuery"]()) && (ctx.rightSidePanel = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵloadQuery"]()) && (ctx.siteContent = _t.first);
    }
  },
  hostBindings: function AppComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵlistener"]("contextmenu", function AppComponent_contextmenu_HostBindingHandler($event) {
        return ctx.windowRightClick($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵresolveWindow"])("click", function AppComponent_click_HostBindingHandler($event) {
        return ctx.windowLeftClick($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵresolveWindow"])("dblclick", function AppComponent_dblclick_HostBindingHandler($event) {
        return ctx.windowDoubleClick($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵresolveWindow"])("beforeunload", function AppComponent_beforeunload_HostBindingHandler($event) {
        return ctx.windowBeforeUnloaded($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵresolveWindow"])("resize", function AppComponent_resize_HostBindingHandler($event) {
        return ctx.onResize($event);
      }, false, _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵresolveWindow"]);
    }
  },
  decls: 24,
  vars: 27,
  consts: [[3, "color", "fixed", "meteor", "thick"], [1, "sidenav-container", 3, "hasBackdrop"], ["disableClose", "", 2, "background-position", "bottom center", "background-size", "128px", "background-repeat", "no-repeat", 3, "mode", "opened", "ngStyle"], ["leftSideNav", ""], ["position", "end", 1, "bg-bifeldy", 2, "background-position", "bottom center", "background-size", "128px", "background-repeat", "no-repeat", 3, "mode", "opened", "ngStyle", "closedStart"], ["rightSidePanel", ""], ["siteContent", ""], [1, "main_content"], [3, "bdColor", "type", "size", "color"], [1, "text-light", "text-center"], [1, "text-info", "text-decoration-none", 3, "click"], [2, "cursor", "pointer"]],
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelement"](0, "app-header")(1, "ng-progress", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelementStart"](2, "mat-sidenav-container", 1)(3, "mat-sidenav", 2, 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelement"](5, "app-left-menu");
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelementStart"](6, "mat-sidenav", 4, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵlistener"]("closedStart", function AppComponent_Template_mat_sidenav_closedStart_6_listener() {
        return ctx.RPS.onClose();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelement"](8, "app-right-panel");
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelementStart"](9, "mat-sidenav-content", null, 6)(11, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelement"](12, "router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelement"](13, "app-material-fab");
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelement"](14, "app-footer");
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelementStart"](15, "ngx-spinner", 8)(16, "p", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵtext"](17, " Sedang Memuat Data ^_^ ");
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelement"](18, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵtext"](19, " Mohon Menunggu ... ");
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelement"](20, "br");
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelementStart"](21, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵlistener"]("click", function AppComponent_Template_span_click_21_listener() {
        return ctx.resetLoading();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelementStart"](22, "b", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵtext"](23, "Batalkan");
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵelementEnd"]()()()();
    }

    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵreference"](7);

      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵproperty"]("color", "#ff4081")("fixed", false)("meteor", false)("thick", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵproperty"]("hasBackdrop", ctx.LMS.sideNavExpanded || _r1["isOpen"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵproperty"]("mode", ctx.sideNavType)("opened", ctx.LMS.opened)("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵpureFunction1"](23, _c3, "url(" + ctx.GS.leftMenuImage + ")"));
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵproperty"]("mode", "over")("opened", false)("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵpureFunction1"](25, _c3, "url(" + ctx.GS.rightMenuImage + ")"));
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵstyleProp"]("background-repeat", "no-repeat")("background-size", "128px" + (ctx.ROUTER.url === "/login" || ctx.ROUTER.url.includes("/login?") || ctx.ROUTER.url === "/register" || ctx.ROUTER.url.includes("/register?") || ctx.ROUTER.url === "/home" || ctx.ROUTER.url.includes("/home?") || ctx.ROUTER.url === "/verify" || ctx.ROUTER.url.includes("/verify?") || ctx.ROUTER.url === "/privacy-policy" || ctx.ROUTER.url.includes("/privacy-policy?") || ctx.ROUTER.url === "/reset-password" || ctx.ROUTER.url.includes("/reset-password?") ? ", cover" : ""))("background-position", "bottom right" + (ctx.ROUTER.url === "/login" || ctx.ROUTER.url.includes("/login?") || ctx.ROUTER.url === "/register" || ctx.ROUTER.url.includes("/register?") || ctx.ROUTER.url === "/home" || ctx.ROUTER.url.includes("/home?") || ctx.ROUTER.url === "/verify" || ctx.ROUTER.url.includes("/verify?") || ctx.ROUTER.url === "/privacy-policy" || ctx.ROUTER.url.includes("/privacy-policy?") || ctx.ROUTER.url === "/reset-password" || ctx.ROUTER.url.includes("/reset-password?") ? ", center" : ""))("background-image", "url(" + ctx.GS.bgImgUrl + ")" + (ctx.ROUTER.url === "/login" || ctx.ROUTER.url.includes("/login?") || ctx.ROUTER.url === "/register" || ctx.ROUTER.url.includes("/register?") || ctx.ROUTER.url === "/home" || ctx.ROUTER.url.includes("/home?") || ctx.ROUTER.url === "/verify" || ctx.ROUTER.url.includes("/verify?") || ctx.ROUTER.url === "/privacy-policy" || ctx.ROUTER.url.includes("/privacy-policy?") || ctx.ROUTER.url === "/reset-password" || ctx.ROUTER.url.includes("/reset-password?") ? ", url('/assets/img/background/paint.svg')" : ""));
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_22__["ɵɵproperty"]("bdColor", "#0000007f")("type", "square-jelly-box")("size", "medium")("color", "#e84360");
    }
  },
  directives: [_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_16__.HeaderComponent, ngx_progressbar__WEBPACK_IMPORTED_MODULE_24__.NgProgressComponent, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_25__.MatSidenavContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_25__.MatSidenav, _angular_common__WEBPACK_IMPORTED_MODULE_26__.NgStyle, _shared_components_left_menu_left_menu_component__WEBPACK_IMPORTED_MODULE_17__.LeftMenuComponent, _shared_components_right_panel_right_panel_component__WEBPACK_IMPORTED_MODULE_18__.RightPanelComponent, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_25__.MatSidenavContent, _angular_router__WEBPACK_IMPORTED_MODULE_21__.RouterOutlet, _shared_components_material_fab_material_fab_component__WEBPACK_IMPORTED_MODULE_19__.MaterialFabComponent, _shared_components_footer_footer_component__WEBPACK_IMPORTED_MODULE_20__.FooterComponent, ngx_spinner__WEBPACK_IMPORTED_MODULE_27__.NgxSpinnerComponent],
  styles: [".main_content[_ngcontent-%COMP%] {\n  width: 100%;\n  height: calc(100vh - 88px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSwwQkFBQTtBQUNGIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluX2NvbnRlbnQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDg4cHgpO1xyXG59XHJcbiJdfQ== */"],
  data: {
    animation: [_shared_animations_anim_side_menu__WEBPACK_IMPORTED_MODULE_1__.onMainContentChange]
  }
});

/***/ }),

/***/ 36747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _nguniversal_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nguniversal/common */ 29);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/platform-browser/animations */ 73598);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common/http */ 28784);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/snack-bar */ 32528);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/service-worker */ 64933);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-spinner */ 63947);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ngx-toastr */ 34101);
/* harmony import */ var ngx_progressbar__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ngx-progressbar */ 46829);
/* harmony import */ var ngx_progressbar_http__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ngx-progressbar/http */ 13292);
/* harmony import */ var ngx_uploadx__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ngx-uploadx */ 8197);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ 26271);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ 90158);
/* harmony import */ var _shared_configs_my_hammer_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_shared/configs/my-hammer.config */ 40765);
/* harmony import */ var _shared_helpers_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_shared/helpers/tooltip */ 32220);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_interceptors_http_cancel_interceptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_shared/interceptors/http-cancel.interceptor */ 66072);
/* harmony import */ var _shared_interceptors_http_request_interceptor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./_shared/interceptors/http-request.interceptor */ 51313);
/* harmony import */ var _shared_interceptors_http_response_interceptor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_shared/interceptors/http-response.interceptor */ 71485);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ 55041);
/* harmony import */ var _shared_components_header_header_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./_shared/components/header/header.module */ 48084);
/* harmony import */ var _shared_components_left_menu_left_menu_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_shared/components/left-menu/left-menu.module */ 94203);
/* harmony import */ var _shared_components_right_panel_right_panel_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_shared/components/right-panel/right-panel.module */ 85116);
/* harmony import */ var _shared_components_material_fab_material_fab_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./_shared/components/material-fab/material-fab.module */ 28198);
/* harmony import */ var _shared_components_footer_footer_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./_shared/components/footer/footer.module */ 88369);
/* harmony import */ var _shared_components_material_dialog_material_dialog_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./_shared/components/material-dialog/material-dialog.module */ 68821);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 3184);




































class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjector"]({ providers: [
        { provide: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__.HAMMER_GESTURE_CONFIG, useClass: _shared_configs_my_hammer_config__WEBPACK_IMPORTED_MODULE_3__.MyHammerConfig },
        { provide: _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__.MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: _shared_helpers_tooltip__WEBPACK_IMPORTED_MODULE_4__.MyTooltipConfig },
        { provide: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },
        { provide: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_21__.MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 10000 } },
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_22__.HTTP_INTERCEPTORS, useClass: _shared_interceptors_http_request_interceptor__WEBPACK_IMPORTED_MODULE_7__.HttpRequestInterceptor, multi: true },
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_22__.HTTP_INTERCEPTORS, useClass: _shared_interceptors_http_response_interceptor__WEBPACK_IMPORTED_MODULE_8__.HttpResponseInterceptor, multi: true },
        { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_22__.HTTP_INTERCEPTORS, useClass: _shared_interceptors_http_cancel_interceptor__WEBPACK_IMPORTED_MODULE_6__.HttpCancelInterceptor, multi: true },
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__.BrowserModule.withServerTransition({ appId: 'serverApp' }),
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__.AppRoutingModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_23__.BrowserAnimationsModule,
            _nguniversal_common__WEBPACK_IMPORTED_MODULE_0__.TransferHttpCacheModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_24__.ReactiveFormsModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_22__.HttpClientModule,
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_5__.SharedMaterialModule,
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__.HammerModule,
            ngx_spinner__WEBPACK_IMPORTED_MODULE_25__.NgxSpinnerModule,
            ngx_toastr__WEBPACK_IMPORTED_MODULE_26__.ToastrModule.forRoot({
                timeOut: 3000,
                positionClass: 'toast-top-right',
                closeButton: true,
                progressBar: true,
                progressAnimation: 'increasing'
            }),
            ngx_progressbar__WEBPACK_IMPORTED_MODULE_27__.NgProgressModule,
            ngx_progressbar_http__WEBPACK_IMPORTED_MODULE_28__.NgProgressHttpModule,
            _shared_components_header_header_module__WEBPACK_IMPORTED_MODULE_10__.HeaderModule,
            _shared_components_left_menu_left_menu_module__WEBPACK_IMPORTED_MODULE_11__.LeftMenuModule,
            _shared_components_right_panel_right_panel_module__WEBPACK_IMPORTED_MODULE_12__.RightPanelModule,
            _shared_components_material_fab_material_fab_module__WEBPACK_IMPORTED_MODULE_13__.MaterialFabModule,
            _shared_components_footer_footer_module__WEBPACK_IMPORTED_MODULE_14__.FooterModule,
            _shared_components_material_dialog_material_dialog_module__WEBPACK_IMPORTED_MODULE_15__.MaterialDialogModule,
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_29__.ServiceWorkerModule.register('/ngsw-worker.js', {
                enabled: _environments_app_environment__WEBPACK_IMPORTED_MODULE_16__.environment.production,
                registrationStrategy: 'registerWhenStable:30000'
            }),
            ngx_uploadx__WEBPACK_IMPORTED_MODULE_30__.UploadxModule.withConfig({
                autoUpload: false,
                concurrency: 1,
                endpoint: `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_16__.environment.apiUrl}/attachment`,
                headers: {
                    'ngsw-bypass': 'true'
                },
                retryConfig: {
                    maxAttempts: 3
                },
                maxChunkSize: _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeAttachmentChunkCloudflareLimit
            })
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_9__.AppComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_2__.AppRoutingModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_23__.BrowserAnimationsModule,
        _nguniversal_common__WEBPACK_IMPORTED_MODULE_0__.TransferHttpCacheModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_24__.ReactiveFormsModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_22__.HttpClientModule,
        _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_5__.SharedMaterialModule,
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__.HammerModule,
        ngx_spinner__WEBPACK_IMPORTED_MODULE_25__.NgxSpinnerModule, ngx_toastr__WEBPACK_IMPORTED_MODULE_26__.ToastrModule, ngx_progressbar__WEBPACK_IMPORTED_MODULE_27__.NgProgressModule,
        ngx_progressbar_http__WEBPACK_IMPORTED_MODULE_28__.NgProgressHttpModule,
        _shared_components_header_header_module__WEBPACK_IMPORTED_MODULE_10__.HeaderModule,
        _shared_components_left_menu_left_menu_module__WEBPACK_IMPORTED_MODULE_11__.LeftMenuModule,
        _shared_components_right_panel_right_panel_module__WEBPACK_IMPORTED_MODULE_12__.RightPanelModule,
        _shared_components_material_fab_material_fab_module__WEBPACK_IMPORTED_MODULE_13__.MaterialFabModule,
        _shared_components_footer_footer_module__WEBPACK_IMPORTED_MODULE_14__.FooterModule,
        _shared_components_material_dialog_material_dialog_module__WEBPACK_IMPORTED_MODULE_15__.MaterialDialogModule, _angular_service_worker__WEBPACK_IMPORTED_MODULE_29__.ServiceWorkerModule, ngx_uploadx__WEBPACK_IMPORTED_MODULE_30__.UploadxModule] }); })();


/***/ }),

/***/ 26271:
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONSTANTS": () => (/* binding */ CONSTANTS)
/* harmony export */ });
const CONSTANTS = {
    apiTagAnime: 'Anime',
    apiTagApiKey: 'API Key',
    apiTagAttachment: 'Attachment',
    apiTagBanned: 'Banned',
    apiTagBerkas: 'Berkas',
    apiTagDorama: 'Dorama',
    apiTagDdlFile: 'DDL File',
    apiTagFansub: 'Fansub',
    apiTagMail: 'Surat Elektronik',
    apiTagNews: 'News',
    apiTagNihongo: 'Nihongo',
    apiTagQuiz: 'Quiz',
    apiTagSession: 'Session',
    apiTagUser: 'User',
    attachmentSpeedLimiterBps: 256 * 1000,
    blacklistedWords: [
        '*', 'www', 'fansub', 'fansub.id', 'fansubid', 'fansub-id', 'crawl', 'crawler',
        'localhost', 'mail', 'email', 'e-mail', 'tracker', 'fansub', 'fansubber',
        'ferdion', 'bifeldy', 'dev', 'api', 'docs', 'cs', 'help', 'support', 'proxy',
        'admin', 'administrator', 'info', 'information', 'noreply', 'mod', 'moderator'
    ],
    cronFansubRssFeed: 'CRON_FANSUB_RSS_FEED',
    cronTrackerStatistics: 'CRON_TRACKER_STATISTICS',
    cronSitemap: 'CRON_SITEMAP',
    cronStatsServer: 'CRON_STATS_SERVER',
    cronVpsBilling: 'CRON_VPS_BILLING',
    decoratorFilterApiKeyAccess: 'filter-api-key-access',
    decoratorRoles: 'roles',
    decoratorVerifiedOnly: 'verified-only',
    extSubs: ['ass', 'srt'],
    extFonts: ['ttf', 'otf', 'woff', 'woff2'],
    fileTypeAttachmentAllowed: [
        'video/x-msvideo',
        'video/x-matroska',
        'video/mp4',
        'application/zip',
        'application/zip-compressed',
        'application/x-zip',
        'application/x-zip-compressed',
    ],
    fileSizeAttachmentChunkCloudflareLimit: 64 * 1000 * 1000,
    fileSizeAttachmentChunkDiscordLimit: 8 * 1000 * 1000,
    fileTypeAttachmentStreamable: [
        'mkv',
        'mp4'
    ],
    fileSizeAttachmentTotalLimit: 2 * 1000 * 1000 * 1000,
    fileSizeImageLimit: 512 * 1000,
    freeTimeStart: '02:00:00',
    freeTimeEnd: '02:30:00',
    gCaptchaSiteKey: '6Ld4Bt4UAAAAAKJQ_jfqtWdsq9BuARLHag2DBvqK',
    jwtAlgorithm: 'HS512',
    jwtExpiredIn: 24 * 60 * 60,
    quizOptionsCountHirakata: 5,
    quizOptionsCountCategory: 6,
    quizOptionsCountKanji: 6,
    regexIpAddress: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    regexAllKeyboardKeys: /^[\P{Cc}\P{Cn}\P{Cs}]*$/,
    regexEmail: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    regexEmailMulti: /^[^a-z0-9_]*([a-z0-9_+\-.%]+@[a-z0-9_\-.]+\.[a-z]+[^a-z0-9_]*,{1}[^a-z0-9_]*)*([a-z0-9_+\-.%]+@[a-z0-9_\-.]+\.[a-z]+)[^a-z0-9_]*$/,
    regexEnglishKeyboardKeys: /^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  \n]*$/,
    regexJapaneseKeyboardKeys: /[一-龠ぁ-ゔァ-ヴーａ-ｚＡ-Ｚ０-９々〆〤、。]+/u,
    regexUrl: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    retryDdlUploadMaxCount: 5,
    socketRoomNameGlobalPublic: 'GLOBAL_PUBLIK',
    socketRoomNameGlobalFansub: 'GLOBAL_FANSUB',
    socketRoomNameServerLogs: 'SERVER_LOGS',
    timeoutCancelRegisterKey: 'TIMEOUT_CANCEL_REGISTER',
    timeoutCancelRegisterTime: 5 * 60 * 1000,
    timeoutDeleteTempAttachmentKey: 'TIMEOUT_DELETE_TEMP_ATTACHMENT',
    timeoutDeleteTempAttachmentTime: 10 * 60 * 1000,
    timeoutMailWebhookTime: 1 * 60 * 1000,
    timeoutReconnectSocketKey: 'TIMEOUT_RECONNECT_SOCKET',
    timeoutReconnectSocketTime: 5 * 1000,
    timeJwtEncryption: 3 * 60,
    timeLoginRememberMe: 7 * 24 * 60 * 60,
    timeResetAccount: 5 * 60,
    timeMaxDaysNotification: 7 * 24 * 60 * 60 * 1000,
    verificationDomain: [
        'ghs.google.com'
    ]
};


/***/ }),

/***/ 15934:
/*!*********************************************!*\
  !*** ./src/environments/app/environment.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    siteName: 'FansubID',
    siteDescription: 'Di Kamar Saja!',
    author: 'Bifeldy',
    domain: 'localhost',
    baseUrl: 'http://localhost:4200',
    apiUrl: '/api',
    apiKey: '00000000-0000-0000-0000-000000000000',
    discord: {
        client_id: '789831990433153034',
        join_url: 'https://discord.gg/xGWdExk',
        guild_id: '342220398022098944'
    },
    saweria: 'https://saweria.co/Bifeldy',
    trakteer: 'https://teer.id/bifeldy',
    github: 'https://github.com/sponsors/bifeldy',
    torrent: {
        trackerAnnounce: [
            'wss://tracker.fansub.id',
            'wss://tracker.btorrent.xyz',
            'wss://tracker.openwebtorrent.com'
        ],
        iceServers: [
            {
                urls: [
                    'stun:tracker.fansub.id:11111',
                    'stun:openrelay.metered.ca:80',
                    'stun:stun.l.google.com:19302'
                ]
            }
        ]
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';
// Included with Angular CLI.


/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ 50318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 36747);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/app/environment */ 15934);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hammerjs */ 15977);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_2__);





if (_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.enableProdMode)();
}
function bootstrap() {
    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));
}
;
if (document.readyState === 'complete') {
    bootstrap();
}
else {
    document.addEventListener('DOMContentLoaded', bootstrap);
}


/***/ }),

/***/ 14249:
/*!*************************************!*\
  !*** ./src/models/req-res.model.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgamaModel": () => (/* binding */ AgamaModel),
/* harmony export */   "GolonganDarahModel": () => (/* binding */ GolonganDarahModel),
/* harmony export */   "JenisKelaminModel": () => (/* binding */ JenisKelaminModel),
/* harmony export */   "LikeAndDislikeModel": () => (/* binding */ LikeAndDislikeModel),
/* harmony export */   "RoleModel": () => (/* binding */ RoleModel),
/* harmony export */   "SosMedModel": () => (/* binding */ SosMedModel),
/* harmony export */   "WargaNegaraModel": () => (/* binding */ WargaNegaraModel)
/* harmony export */ });
;
var RoleModel;
(function (RoleModel) {
    RoleModel["ADMIN"] = "ADMIN";
    RoleModel["MODERATOR"] = "MODERATOR";
    RoleModel["FANSUBBER"] = "FANSUBBER";
    RoleModel["USER"] = "USER";
})(RoleModel || (RoleModel = {}));
var JenisKelaminModel;
(function (JenisKelaminModel) {
    JenisKelaminModel["LAKI"] = "L";
    JenisKelaminModel["PEREMPUAN"] = "P";
})(JenisKelaminModel || (JenisKelaminModel = {}));
var GolonganDarahModel;
(function (GolonganDarahModel) {
    GolonganDarahModel["A"] = "A";
    GolonganDarahModel["B"] = "B";
    GolonganDarahModel["AB"] = "AB";
    GolonganDarahModel["O"] = "O";
})(GolonganDarahModel || (GolonganDarahModel = {}));
var AgamaModel;
(function (AgamaModel) {
    AgamaModel["BUDDHA"] = "Buddha";
    AgamaModel["HINDU"] = "Hindu";
    AgamaModel["ISLAM"] = "Islam";
    AgamaModel["KATHOLIK"] = "Katholik";
    AgamaModel["KONG_HU_CU"] = "Kong Hu Cu";
    AgamaModel["KRISTEN_PROTESTAN"] = "Kristen Protestan";
})(AgamaModel || (AgamaModel = {}));
var WargaNegaraModel;
(function (WargaNegaraModel) {
    WargaNegaraModel["WNA"] = "WNA";
    WargaNegaraModel["WNI"] = "WNI";
})(WargaNegaraModel || (WargaNegaraModel = {}));
var LikeAndDislikeModel;
(function (LikeAndDislikeModel) {
    LikeAndDislikeModel["LIKE"] = "LIKE";
    LikeAndDislikeModel["DISLIKE"] = "DISLIKE";
})(LikeAndDislikeModel || (LikeAndDislikeModel = {}));
var SosMedModel;
(function (SosMedModel) {
    SosMedModel["DISCORD"] = "DISCORD";
    SosMedModel["DISQUS"] = "DISQUS";
    SosMedModel["FACEBOOK"] = "FACEBOOK";
    SosMedModel["GOOGLE"] = "GOOGLE";
})(SosMedModel || (SosMedModel = {}));


/***/ }),

/***/ 76022:
/*!*******************************!*\
  !*** ./src/models/seasons.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SEASONS": () => (/* binding */ SEASONS)
/* harmony export */ });
var SEASONS;
(function (SEASONS) {
    SEASONS["WINTER"] = "winter";
    SEASONS["SPRING"] = "spring";
    SEASONS["SUMMER"] = "summer";
    SEASONS["FALL"] = "fall";
})(SEASONS || (SEASONS = {}));


/***/ }),

/***/ 42480:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 77020:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map