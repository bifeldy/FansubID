"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6"],{

/***/ 24028:
/*!*****************************************************************************!*\
  !*** ./src/app/_shared/components/material-chip/material-chip.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialChipComponent": () => (/* binding */ MaterialChipComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/chips */ 81196);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);





const _c0 = function (a0) { return { "background-color": a0 }; };
function MaterialChipComponent_mat_chip_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-chip", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MaterialChipComponent_mat_chip_1_Template_mat_chip_click_0_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3); const chip_r1 = restoredCtx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); $event.stopPropagation(); return ctx_r2.onChipClicked(chip_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const chip_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c0, chip_r1.color))("selected", chip_r1.selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", chip_r1.name, " ");
} }
class MaterialChipComponent {
    constructor(gs) {
        this.gs = gs;
        this.chipData = [
        // {
        //   name: 'Chip Name',
        //   url: '/',
        //   selected: true,
        //   color: Warna.PINK,
        // }
        ];
        this.chipClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        if (this.gs.isBrowser) {
            //
        }
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            //
        }
    }
    onChipClicked(data) {
        this.chipClicked.emit(data);
    }
}
MaterialChipComponent.ɵfac = function MaterialChipComponent_Factory(t) { return new (t || MaterialChipComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
MaterialChipComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MaterialChipComponent, selectors: [["app-material-chip"]], inputs: { chipData: "chipData" }, outputs: { chipClicked: "chipClicked" }, decls: 2, vars: 1, consts: [[3, "ngStyle", "selected", "click", 4, "ngFor", "ngForOf"], [3, "ngStyle", "selected", "click"]], template: function MaterialChipComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-chip-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MaterialChipComponent_mat_chip_1_Template, 2, 5, "mat-chip", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.chipData);
    } }, directives: [_angular_material_chips__WEBPACK_IMPORTED_MODULE_2__.MatChipList, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_material_chips__WEBPACK_IMPORTED_MODULE_2__.MatChip, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgStyle], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXRlcmlhbC1jaGlwLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 54946:
/*!**************************************************************************!*\
  !*** ./src/app/_shared/components/material-chip/material-chip.module.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialChipModule": () => (/* binding */ MaterialChipModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _material_chip_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./material-chip.component */ 24028);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);




class MaterialChipModule {
}
MaterialChipModule.ɵfac = function MaterialChipModule_Factory(t) { return new (t || MaterialChipModule)(); };
MaterialChipModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: MaterialChipModule });
MaterialChipModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MaterialChipModule, { declarations: [_material_chip_component__WEBPACK_IMPORTED_MODULE_1__.MaterialChipComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule], exports: [_material_chip_component__WEBPACK_IMPORTED_MODULE_1__.MaterialChipComponent] }); })();


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


/***/ })

}]);
//# sourceMappingURL=default-src_app__shared_components_material-chip_material-chip_module_ts-src_app__shared_comp-5f6cb6.js.map