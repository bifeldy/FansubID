"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_user_user_module_ts"],{

/***/ 12598:
/*!******************************************************************!*\
  !*** ./src/app/_pages/user/user-detail/user-detail.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserDetailComponent": () => (/* binding */ UserDetailComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../models/req-res.model */ 14249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/user.service */ 8058);
/* harmony import */ var _shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/stats-server.service */ 28381);
/* harmony import */ var _shared_services_berkas_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/services/berkas.service */ 8987);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _shared_components_material_expansion_panel_material_expansion_panel_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/components/material-expansion-panel/material-expansion-panel.component */ 97567);
/* harmony import */ var _shared_components_report_report_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/components/report/report.component */ 16647);
/* harmony import */ var _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../_shared/components/material-tab/material-tab.component */ 18757);




















function UserDetailComponent_div_0_mat_icon_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "handyman");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("matTooltip", ctx_r1.userData.role);
} }
function UserDetailComponent_div_0_mat_icon_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "security");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("matTooltip", ctx_r2.userData.role);
} }
function UserDetailComponent_div_0_mat_icon_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "rate_review");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("matTooltip", ctx_r3.userData.role);
} }
function UserDetailComponent_div_0_mat_icon_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "verified");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} }
function UserDetailComponent_div_0_mat_icon_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "lock");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate1"]("matTooltip", "Banned :: ", ctx_r5.userBanned.reason, "");
} }
function UserDetailComponent_div_0_mat_icon_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "military_tech");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate1"]("matTooltip", "", ctx_r6.accountAge, " Years of Service");
} }
function UserDetailComponent_div_0_mat_icon_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-icon", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "volunteer_activism");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} }
function UserDetailComponent_div_0_mat_icon_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1, "sensor_occupied");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} }
function UserDetailComponent_div_0_div_16_mat_list_option_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-list-option", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "img", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "a", 41)(3, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const f_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate1"]("routerLink", "/fansub/", f_r15.fansub_.slug, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("src", f_r15.fansub_.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", f_r15.keterangan, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](f_r15.fansub_.slug);
} }
function UserDetailComponent_div_0_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 6)(1, "div", 31)(2, "div", 32)(3, "h2", 33)(4, "b", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5, "Group Fansub");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "div", 35)(7, "div", 36)(8, "mat-selection-list", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, UserDetailComponent_div_0_div_16_mat_list_option_9_Template, 7, 4, "mat-list-option", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx_r9.groupFansub);
} }
function UserDetailComponent_div_0_button_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "button", 44)(1, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "accessibility_new");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ctx_r10.userData.id, " ");
} }
function UserDetailComponent_div_0_button_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "button", 45)(1, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "access_time");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](4, 1, ctx_r11.userData.created_at, "d/M/yyyy, hh:mm:ss a z"), " ");
} }
function UserDetailComponent_div_0_div_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "app-material-expansion-panel", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("panelData", ctx_r12.panelData);
} }
function UserDetailComponent_div_0_div_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 31)(1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](2, "app-report");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
} }
function UserDetailComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, UserDetailComponent_div_0_mat_icon_8_Template, 2, 1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, UserDetailComponent_div_0_mat_icon_9_Template, 2, 1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](10, UserDetailComponent_div_0_mat_icon_10_Template, 2, 1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](11, UserDetailComponent_div_0_mat_icon_11_Template, 2, 0, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](12, UserDetailComponent_div_0_mat_icon_12_Template, 2, 1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](13, UserDetailComponent_div_0_mat_icon_13_Template, 2, 1, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](14, UserDetailComponent_div_0_mat_icon_14_Template, 2, 0, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](15, UserDetailComponent_div_0_mat_icon_15_Template, 2, 0, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](16, UserDetailComponent_div_0_div_16_Template, 10, 2, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](17, "div", 14)(18, "div", 15)(19, "h1", 16)(20, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](22, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](23, UserDetailComponent_div_0_button_23_Template, 4, 1, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](24, UserDetailComponent_div_0_button_24_Template, 5, 4, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](25, "button", 20)(26, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](27, "email");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](29, UserDetailComponent_div_0_div_29_Template, 2, 1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](30, UserDetailComponent_div_0_div_30_Template, 3, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](31, "div", 23)(32, "div", 6)(33, "app-material-tab", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("tableRowClicked", function UserDetailComponent_div_0_Template_app_material_tab_tableRowClicked_33_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r16.openBerkas($event); })("paginatorClicked", function UserDetailComponent_div_0_Template_app_material_tab_paginatorClicked_33_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r17); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r18.onPaginatorClicked($event); })("serverSideFilter", function UserDetailComponent_div_0_Template_app_material_tab_serverSideFilter_33_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r17); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r19.onServerSideFilter($event); })("serverSideOrder", function UserDetailComponent_div_0_Template_app_material_tab_serverSideOrder_33_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r17); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r20.onServerSideOrder($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](34, "div", 25)(35, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("src", ctx_r0.userData.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.userData.role === ctx_r0.ADMIN);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.userData.role === ctx_r0.MODERATOR);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.userData.role === ctx_r0.FANSUBBER);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.userData.verified);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.userBanned);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.accountAge > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.count > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.userData.private);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.groupFansub.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r0.userData.kartu_tanda_penduduk_.nama);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.userData.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.userData.created_at);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", ctx_r0.userData.username, "@", ctx_r0.ENV.domain, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.panelData.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.SS.mySocket == null ? null : ctx_r0.SS.mySocket.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("tabData", ctx_r0.tabData)("count", ctx_r0.count)("serverSide", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵstyleProp"]("background-image", "url(" + ctx_r0.userData.profile_.cover_url + ")");
} }
class UserDetailComponent {
    constructor(router, activatedRoute, gs, bs, fs, pi, us, ss, berkas) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.gs = gs;
        this.bs = bs;
        this.fs = fs;
        this.pi = pi;
        this.us = us;
        this.ss = ss;
        this.berkas = berkas;
        this.username = '';
        this.userData = null;
        this.userBanned = null;
        this.groupFansub = [];
        this.berkasUser = [];
        this.allBerkasUserId = [];
        this.panelData = [];
        this.tabData = [
            {
                name: 'Berkas',
                icon: 'file_copy',
                type: 'table',
                data: {
                    column: ['Proyek', /* 'Image', */ 'Nama Berkas', 'Tanggal', 'Kunjungan', 'Pemilik'],
                    row: []
                }
            }
        ];
        this.count = 0;
        this.page = 1;
        this.row = 10;
        this.q = '';
        this.sort = '';
        this.order = '';
        this.subsUser = null;
        this.subsBerkas = null;
        this.subsBanned = null;
        this.subsParam = null;
        this.subsGroupGet = null;
        this.subsTrusted = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get SS() {
        return this.ss;
    }
    ngOnDestroy() {
        var _a, _b, _c, _d, _e, _f;
        (_a = this.subsUser) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsBerkas) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsBanned) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsParam) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.subsGroupGet) === null || _e === void 0 ? void 0 : _e.unsubscribe();
        (_f = this.subsTrusted) === null || _f === void 0 ? void 0 : _f.unsubscribe();
    }
    get ADMIN() {
        return _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN;
    }
    get MODERATOR() {
        return _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR;
    }
    get FANSUBBER() {
        return _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER;
    }
    get accountAge() {
        return Math.abs(new Date(new Date().getTime() - new Date(this.userData.created_at).getTime()).getUTCFullYear() - 1970);
    }
    get ENV() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    ngOnInit() {
        this.subsParam = this.activatedRoute.params.subscribe({
            next: p => {
                this.username = p['username'];
                this.bs.busy();
                this.subsUser = this.us.getUserData(this.username).subscribe({
                    next: res => {
                        this.gs.log('[USER_DETAIL_SUCCESS]', res);
                        this.userData = res.result;
                        this.pi.updatePageMetaData(`${this.userData.kartu_tanda_penduduk_.nama}`, `${this.userData.profile_.description}`, `${this.userData.username}`, this.userData.image_url, this.userData.username);
                        this.bs.idle();
                        if (this.gs.isBrowser) {
                            this.panelData = [];
                            this.panelData.push({ title: 'Tentang Saya', icon: 'info', text: this.userData.profile_.description });
                            this.fs.initializeFab('edit', null, 'Ubah Profil', `/user/${this.username}/edit`, false);
                            this.checkBanned();
                            this.getUserGroup();
                            this.getUserBerkas();
                        }
                    },
                    error: err => {
                        this.gs.log('[USER_DETAIL_ERROR]', err, 'error');
                        this.bs.idle();
                        this.router.navigate(['/error'], {
                            queryParams: {
                                returnUrl: '/'
                            }
                        });
                    }
                });
            }
        });
    }
    checkBanned() {
        this.bs.busy();
        this.subsBanned = this.us.checkBanned(this.userData.username).subscribe({
            next: res => {
                this.gs.log('[USER_CHECK_BANNED_SUCCESS]', res);
                if (Object.keys(res.results[this.userData.username]).length > 0) {
                    this.userBanned = res.results[this.userData.username];
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[USER_CHECK_BANNED_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getUserBerkas() {
        this.bs.busy();
        if (this.subsBerkas) {
            this.subsBerkas.unsubscribe();
            this.bs.idle();
        }
        this.subsBerkas = this.us.getUserBerkas(this.username, this.q, this.page, this.row, this.sort, this.order).subscribe({
            next: res => {
                this.gs.log('[USER_BERKAS_LIST_SUCCESS]', res);
                this.count = res.count;
                this.berkasUser = [];
                for (const r of res.results) {
                    this.allBerkasUserId.push(r.id);
                    this.berkasUser.push({
                        id: r.id,
                        private: r.private,
                        foto: r.user_.image_url,
                        Proyek: r.project_type_.name,
                        // Image: r.image_url,
                        Tanggal: r.created_at,
                        Kunjungan: r.view_count,
                        Pemilik: r.user_.username,
                        'Nama Berkas': r.name
                    });
                }
                this.tabData[0].data.row = this.berkasUser;
                if (this.allBerkasUserId.length > 0) {
                    this.checkTrusted();
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[USER_BERKAS_LIST_ERROR]', err, 'error');
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
        this.subsTrusted = this.berkas.checkTrusted(this.allBerkasUserId).subscribe({
            next: res => {
                this.gs.log('[USER_BERKAS_TRUSTED_SUCCESS]', res);
                for (const b of this.berkasUser) {
                    b.trusted = res.results[b.id];
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[USER_BERKAS_TRUSTED_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    openBerkas(data) {
        this.gs.log('[USER_BERKAS_LIST_CLICK_BERKAS]', data);
        this.router.navigateByUrl(`/berkas/${data.id}`);
    }
    onPaginatorClicked(data) {
        this.gs.log('[USER_BERKAS_LIST_CLICK_PAGINATOR]', data);
        this.page = data.pageIndex + 1;
        this.row = data.pageSize;
        this.getUserBerkas();
    }
    onServerSideFilter(data) {
        this.gs.log('[USER_BERKAS_LIST_ENTER_FILTER]', data);
        this.q = data;
        this.getUserBerkas();
    }
    onServerSideOrder(data) {
        this.gs.log('[USER_BERKAS_CLICK_ORDER]', data);
        this.q = data.q;
        this.sort = data.active;
        this.order = data.direction;
        this.getUserBerkas();
    }
    getUserGroup() {
        this.bs.busy();
        this.subsGroupGet = this.us.getUserGroup(this.username).subscribe({
            next: res => {
                this.gs.log('[USER_DETAIL_GROUP_LIST_SUCCESS]', res);
                this.groupFansub = res.results;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[USER_DETAIL_GROUP_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
}
UserDetailComponent.ɵfac = function UserDetailComponent_Factory(t) { return new (t || UserDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_4__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_5__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_user_service__WEBPACK_IMPORTED_MODULE_6__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_7__.StatsServerService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_berkas_service__WEBPACK_IMPORTED_MODULE_8__.BerkasService)); };
UserDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({ type: UserDetailComponent, selectors: [["app-user-detail"]], decls: 1, vars: 1, consts: [["class", "container", 4, "ngIf"], [1, "container"], [1, "profile-info", "align-items-center", 2, "top", "64px", "position", "relative"], [1, "row", "py-3", "px-2"], [1, "col-md-4", "col-xl-3", "px-3"], [1, "row", "sticky-top", "pt-3"], [1, "col-12"], [1, "profile-image", 3, "src"], [1, "col-12", "my-3"], ["class", "mx-1", "style", "cursor: pointer;", 3, "matTooltip", 4, "ngIf"], ["class", "mx-1", "matTooltip", "Terverifikasi", "style", "cursor: pointer;", 4, "ngIf"], ["class", "mx-1", "matTooltip", "Sharing is Caring", "style", "cursor: pointer;", 4, "ngIf"], ["class", "mx-1", "matTooltip", "Akun Private", "style", "cursor: pointer;", 4, "ngIf"], ["class", "col-12", 4, "ngIf"], [1, "col-md-8", "col-xl-9", "pt-3"], [1, "row", "py-3", "px-0", "profile-height-large"], [1, "m-0", "mt-auto"], [1, "row", "p-3"], ["type", "button", "mat-stroked-button", "", "matLine", "", "class", "col-12 col-md-4 text-truncate", "matTooltip", "Nomor ID Pengguna", "color", "accent", "style", "overflow: hidden;", 4, "ngIf"], ["type", "button", "mat-stroked-button", "", "matLine", "", "class", "col-12 col-md-8 text-truncate", "matTooltip", "Tanggal Bergabung", "color", "accent", "style", "overflow: hidden;", 4, "ngIf"], ["type", "button", "mat-stroked-button", "", "matLine", "", "matTooltip", "Alamat Surel", "color", "accent", 1, "col", "text-truncate", 2, "overflow", "hidden"], [1, "me-1"], ["class", "row py-3", 4, "ngIf"], [1, "row"], [3, "tabData", "count", "serverSide", "tableRowClicked", "paginatorClicked", "serverSideFilter", "serverSideOrder"], [1, "profile-banner", "profile-banner-1", "align-items-center"], [1, "profile-banner", "profile-banner-2", "align-items-center"], [1, "mx-1", 2, "cursor", "pointer", 3, "matTooltip"], ["matTooltip", "Terverifikasi", 1, "mx-1", 2, "cursor", "pointer"], ["matTooltip", "Sharing is Caring", 1, "mx-1", 2, "cursor", "pointer"], ["matTooltip", "Akun Private", 1, "mx-1", 2, "cursor", "pointer"], [1, "row", "py-3"], [1, "col-12", "pt-3", "sticky-top", "bg-bifeldy"], [1, "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12", 2, "max-height", "288px"], [1, "h-100", 2, "overflow-y", "auto"], [3, "multiple"], ["class", "h-100", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "h-100", 3, "routerLink"], ["matListAvatar", "", 1, "ms-3", 2, "border-radius", "0", 3, "src"], [1, "text-truncate", "text-decoration-none"], [1, "bg-bifeldy", "px-2", "me-1", "text-warning", 2, "position", "absolute", "right", "0"], [1, "text-success"], ["type", "button", "mat-stroked-button", "", "matLine", "", "matTooltip", "Nomor ID Pengguna", "color", "accent", 1, "col-12", "col-md-4", "text-truncate", 2, "overflow", "hidden"], ["type", "button", "mat-stroked-button", "", "matLine", "", "matTooltip", "Tanggal Bergabung", "color", "accent", 1, "col-12", "col-md-8", "text-truncate", 2, "overflow", "hidden"], [3, "panelData"]], template: function UserDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, UserDetailComponent_div_0_Template, 36, 22, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.userData);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_16__.MatTooltip, _angular_material_list__WEBPACK_IMPORTED_MODULE_17__.MatSelectionList, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _angular_material_list__WEBPACK_IMPORTED_MODULE_17__.MatListOption, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterLink, _angular_material_list__WEBPACK_IMPORTED_MODULE_17__.MatListAvatarCssMatStyler, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatButton, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__.MatLine, _shared_components_material_expansion_panel_material_expansion_panel_component__WEBPACK_IMPORTED_MODULE_9__.MaterialExpansionPanelComponent, _shared_components_report_report_component__WEBPACK_IMPORTED_MODULE_10__.ReportComponent, _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_11__.MaterialTabComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.DatePipe], styles: [".profile-banner[_ngcontent-%COMP%] {\r\n  height: 192px;\r\n  width: 100%;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  opacity: 0.75;\r\n}\r\n\r\n.profile-banner-1[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.profile-banner-2[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 192px;\r\n  left: 0;\r\n}\r\n\r\n.profile-info[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  height: 256px;\r\n  z-index: 1;\r\n}\r\n\r\n.profile-image[_ngcontent-%COMP%] {\r\n  width: 50%;\r\n}\r\n\r\n@media only screen and (min-width: 769px) {\r\n  .profile-height-large[_ngcontent-%COMP%] {\r\n    height: 100px;\r\n  }\r\n  .profile-image[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 768px) {\r\n  .profile-image[_ngcontent-%COMP%] {\r\n    padding-top: 3rem;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItZGV0YWlsLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLHNCQUFzQjtFQUN0QiwyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztBQUNUOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixPQUFPO0FBQ1Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtFQUNmO0VBQ0E7SUFDRSxXQUFXO0VBQ2I7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsaUJBQWlCO0VBQ25CO0FBQ0YiLCJmaWxlIjoidXNlci1kZXRhaWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wcm9maWxlLWJhbm5lciB7XHJcbiAgaGVpZ2h0OiAxOTJweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIG9wYWNpdHk6IDAuNzU7XHJcbn1cclxuXHJcbi5wcm9maWxlLWJhbm5lci0xIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbn1cclxuXHJcbi5wcm9maWxlLWJhbm5lci0yIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAxOTJweDtcclxuICBsZWZ0OiAwO1xyXG59XHJcblxyXG4ucHJvZmlsZS1pbmZvIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgaGVpZ2h0OiAyNTZweDtcclxuICB6LWluZGV4OiAxO1xyXG59XHJcblxyXG4ucHJvZmlsZS1pbWFnZSB7XHJcbiAgd2lkdGg6IDUwJTtcclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjlweCkge1xyXG4gIC5wcm9maWxlLWhlaWdodC1sYXJnZSB7XHJcbiAgICBoZWlnaHQ6IDEwMHB4O1xyXG4gIH1cclxuICAucHJvZmlsZS1pbWFnZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAucHJvZmlsZS1pbWFnZSB7XHJcbiAgICBwYWRkaW5nLXRvcDogM3JlbTtcclxuICB9XHJcbn0iXX0= */"] });


/***/ }),

/***/ 72661:
/*!**************************************************************!*\
  !*** ./src/app/_pages/user/user-edit/user-edit.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserEditComponent": () => (/* binding */ UserEditComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/toast.service */ 96925);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/user.service */ 8058);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/imgbb.service */ 67902);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_crypto_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/services/crypto.service */ 38379);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/slide-toggle */ 6623);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var _shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/pipes/bytes.pipe */ 23626);
























function UserEditComponent_form_0_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("Ukuran Upload Melebihi Batas ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, ctx_r2.imagePhotoLimitExceeded), " !");
} }
function UserEditComponent_form_0_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r3.imagePhotoErrorText);
} }
function UserEditComponent_form_0_div_19_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 44)(1, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function UserEditComponent_form_0_div_19_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2); return ctx_r16.submitPhotoImage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "mat-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "add_photo_alternate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, " Unggah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r4.submitted);
} }
function UserEditComponent_form_0_div_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Nama Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function UserEditComponent_form_0_div_41_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Nama Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function UserEditComponent_form_0_div_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("Ukuran Upload Melebihi Batas ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, ctx_r8.imageCoverLimitExceeded), " !");
} }
function UserEditComponent_form_0_div_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r9.imageCoverErrorText);
} }
function UserEditComponent_form_0_div_53_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 16)(1, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function UserEditComponent_form_0_div_53_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2); return ctx_r18.submitCoverImage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "mat-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "add_photo_alternate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, " Unggah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r10.submitted);
} }
function UserEditComponent_form_0_div_63_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Password Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function UserEditComponent_form_0_div_64_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Password Minimal 8 Huruf");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function UserEditComponent_form_0_div_65_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Password Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function UserEditComponent_form_0_div_74_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Password Minimal 8 Huruf");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function UserEditComponent_form_0_div_75_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Password Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function UserEditComponent_form_0_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "form", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submit", function UserEditComponent_form_0_Template_form_submit_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r20.onSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "div", 6)(6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](7, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "mat-form-field", 9)(9, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](10, "Profile Image");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "ngx-mat-file-input", 10, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function UserEditComponent_form_0_Template_ngx_mat_file_input_change_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r21); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](12); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r22.uploadPhotoImage($event, _r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](14, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](15, "mat-error", 13)(16, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](17, UserEditComponent_form_0_div_17_Template, 3, 3, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](18, UserEditComponent_form_0_div_18_Template, 2, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](19, UserEditComponent_form_0_div_19_Template, 5, 1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](20, "div", 16)(21, "mat-slide-toggle", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](22, " Jadikan Private, Sembunyikan Aktivitas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](23, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](24, " * Jika ingin mengubah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](25, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](26, "username");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](27, " silahkan menghubungi Admin menggunakan surel ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](28, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function UserEditComponent_form_0_Template_span_click_28_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r21); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r23.changeUname(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](30, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](31, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](32, "div", 22)(33, "mat-form-field", 23)(34, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](35, "Nama Lengkap");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](36, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](37, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](38, "wysiwyg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](39, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](40, UserEditComponent_form_0_div_40_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](41, UserEditComponent_form_0_div_41_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](42, "mat-form-field", 25)(43, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](44, "Cover Image");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](45, "ngx-mat-file-input", 26, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function UserEditComponent_form_0_Template_ngx_mat_file_input_change_45_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r21); const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](46); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r24.uploadCoverImage($event, _r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](47, "mat-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](48, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](49, "mat-error", 13)(50, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](51, UserEditComponent_form_0_div_51_Template, 3, 3, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](52, UserEditComponent_form_0_div_52_Template, 2, 1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](53, UserEditComponent_form_0_div_53_Template, 5, 1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](54, "angular-editor", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](55, "mat-form-field", 30)(56, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](57, "Konfirmasi Kata Sandi");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](58, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](59, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function UserEditComponent_form_0_Template_button_click_59_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r21); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r25.togglePassword(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](60, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](61);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](62, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](63, UserEditComponent_form_0_div_63_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](64, UserEditComponent_form_0_div_64_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](65, UserEditComponent_form_0_div_65_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](66, "mat-form-field", 30)(67, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](68, "Ubah Kata Sandi");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](69, "input", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](70, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function UserEditComponent_form_0_Template_button_click_70_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r21); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r26.togglePassword(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](71, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](72);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](73, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](74, UserEditComponent_form_0_div_74_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](75, UserEditComponent_form_0_div_75_Template, 2, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](76, "div", 34)(77, "div", 7)(78, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](79, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](80, "div", 37)(81, "a", 38)(82, "mat-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](83, "undo");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](84, " Batal ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](85, "div", 37)(86, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](87, " Simpan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](88, "mat-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](89, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](90, "div", 42)(91, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("formGroup", ctx_r0.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("src", ctx_r0.image_photo, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("accept", "image/gif, image/jpeg, image/jpg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.imagePhotoLimitExceeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.imagePhotoErrorText);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.imagePhoto && !ctx_r0.fg.value.image_photo);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"]("", ctx_r0.userData.username, "@", ctx_r0.ENV.domain, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("nama").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("nama").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("accept", "image/gif, image/jpeg, image/jpg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.imageCoverLimitExceeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.imageCoverErrorText);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.imageCover && !ctx_r0.fg.value.image_cover);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("config", ctx_r0.GS.angularEditorConfig);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("type", ctx_r0.passwordHide ? "password" : "text");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r0.passwordHide ? "visibility_off" : "visibility");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("old_password").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("old_password").hasError("minlength"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("old_password").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("type", ctx_r0.passwordHide ? "password" : "text");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r0.passwordHide ? "visibility_off" : "visibility");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("new_password").hasError("minlength"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("new_password").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r0.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r0.submitted || ctx_r0.fg.invalid || !ctx_r0.fg.dirty);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("background-image", "url(" + ctx_r0.image_cover + ")");
} }
class UserEditComponent {
    constructor(router, activatedRoute, toast, bs, us, pi, fb, imgbb, gs, as, cs) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.toast = toast;
        this.bs = bs;
        this.us = us;
        this.pi = pi;
        this.fb = fb;
        this.imgbb = imgbb;
        this.gs = gs;
        this.as = as;
        this.cs = cs;
        this.submitted = false;
        this.username = null;
        this.userData = null;
        this.imagePhoto = null;
        this.imagePhotoErrorText = null;
        this.imagePhotoLimitExceeded = null;
        this.image_photo = null;
        this.image_photo_original = null;
        this.imageCover = null;
        this.imageCoverErrorText = null;
        this.imageCoverLimitExceeded = null;
        this.image_cover = null;
        this.image_cover_original = null;
        this.passwordHide = true;
        this.photoImage = null;
        this.coverImage = null;
        this.subsUserDetail = null;
        this.subsImgbb1 = null;
        this.subsImgbb2 = null;
        this.subsUserUpdate = null;
        this.subsVerify = null;
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
    togglePassword() {
        this.passwordHide = !this.passwordHide;
    }
    ngOnDestroy() {
        var _a, _b, _c, _d, _e;
        (_a = this.subsUserDetail) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsImgbb1) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsImgbb2) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsUserUpdate) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.subsVerify) === null || _e === void 0 ? void 0 : _e.unsubscribe();
    }
    ngOnInit() {
        this.pi.updatePageMetaData(`User - Ubah Profile`, `Halaman Pembaharuan Profile`, `Ubah Profile`);
        if (this.gs.isBrowser) {
            this.username = this.activatedRoute.snapshot.paramMap.get('username');
            this.bs.busy();
            this.subsUserDetail = this.us.getUserData(this.username).subscribe({
                next: res => {
                    var _a, _b;
                    this.gs.log('[USER_DETAIL_SUCCESS]', res);
                    this.bs.idle();
                    if (((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.id) !== res.result.id) {
                        this.toast.warning('Profile Ini Milik Orang Lain', 'Whoops!', null, true);
                        this.router.navigateByUrl(`/user/${this.username}`);
                    }
                    else {
                        this.initForm(res.result);
                    }
                },
                error: err => {
                    this.gs.log('[USER_DETAIL_ERROR]', err, 'error');
                    this.bs.idle();
                    this.router.navigate(['/error'], {
                        queryParams: {
                            returnUrl: `/user/${this.username}`
                        }
                    });
                }
            });
        }
    }
    initForm(data) {
        this.fg = this.fb.group({
            nama: [data.kartu_tanda_penduduk_.nama, [_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern('^[a-zA-Z. ]+$')]],
            description: [data.profile_.description, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
            old_password: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
            new_password: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
            image_photo: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])],
            image_cover: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])],
            private: [data.private, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required])]
        });
        this.image_photo = data.image_url;
        this.image_photo_original = this.image_photo;
        this.image_cover = data.profile_.cover_url;
        this.image_cover_original = this.image_cover;
        this.userData = data;
    }
    uploadPhotoImage(event, photoImage) {
        this.photoImage = photoImage;
        this.imagePhoto = null;
        this.imagePhotoLimitExceeded = null;
        this.imagePhotoErrorText = null;
        this.fg.controls['image_photo'].patchValue(null);
        this.fg.controls['image_photo'].markAsPristine();
        const file = event.target.files[0];
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
                this.gs.log('[IMAGE_PHOTO_SELECTED]', e);
                if (file.size <= _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit) {
                    const img = this.gs.document.createElement('img');
                    img.onload = () => {
                        this.imagePhoto = file;
                        this.image_photo = reader.result.toString();
                    };
                    img.src = reader.result.toString();
                }
                else {
                    this.imagePhoto = null;
                    this.image_photo = '/assets/img/form/image-error.png';
                    this.imagePhotoLimitExceeded = _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit;
                    this.photoImage.clear(event);
                }
            };
        }
        catch (error) {
            this.imagePhoto = null;
            this.image_photo = this.image_photo_original;
            this.photoImage.clear(event);
        }
    }
    submitPhotoImage() {
        this.submitted = true;
        this.subsImgbb1 = this.imgbb.uploadImage({
            file: this.imagePhoto
        }).subscribe({
            next: res => {
                this.gs.log('[IMAGE_PHOTO_SUCCESS]', res);
                this.fg.controls['image_photo'].patchValue(res.result.url);
                this.fg.controls['image_photo'].markAsDirty();
                this.submitted = false;
            },
            error: err => {
                var _a;
                this.gs.log('[IMAGE_PHOTO_ERROR]', err, 'error');
                this.fg.controls['image_photo'].patchValue(null);
                this.fg.controls['image_photo'].markAsPristine();
                this.submitted = false;
                this.imagePhotoErrorText = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
            }
        });
    }
    uploadCoverImage(event, coverImage) {
        this.coverImage = coverImage;
        this.imageCover = null;
        this.imageCoverLimitExceeded = null;
        this.imageCoverErrorText = null;
        this.fg.controls['image_cover'].patchValue(null);
        this.fg.controls['image_cover'].markAsPristine();
        const file = event.target.files[0];
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
                this.gs.log('[IMAGE_COVER_SELECTED]', e);
                if (file.size <= _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit) {
                    const img = this.gs.document.createElement('img');
                    img.onload = () => {
                        this.imageCover = file;
                        this.image_cover = reader.result.toString();
                    };
                    img.src = reader.result.toString();
                }
                else {
                    this.imageCover = null;
                    this.image_cover = '/assets/img/form/image-error.png';
                    this.imageCoverLimitExceeded = _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit;
                    this.coverImage.clear(event);
                }
            };
        }
        catch (error) {
            this.imageCover = null;
            this.image_cover = this.image_cover_original;
            this.coverImage.clear(event);
        }
    }
    submitCoverImage() {
        this.submitted = true;
        this.subsImgbb2 = this.imgbb.uploadImage({
            file: this.imageCover
        }).subscribe({
            next: res => {
                this.gs.log('[IMAGE_COVER_SUCCESS]', res);
                this.fg.controls['image_cover'].patchValue(res.result.url);
                this.fg.controls['image_cover'].markAsDirty();
                this.submitted = false;
            },
            error: err => {
                var _a;
                this.gs.log('[IMAGE_COVER_ERROR]', err, 'error');
                this.fg.controls['image_cover'].patchValue(null);
                this.fg.controls['image_cover'].markAsPristine();
                this.submitted = false;
                this.imageCoverErrorText = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
            }
        });
    }
    onSubmit() {
        this.bs.busy();
        const body = this.gs.getDirtyValues(this.fg);
        body.old_password = this.cs.hashPassword(this.fg.value.old_password);
        if ('new_password' in body && body.new_password) {
            body.new_password = this.cs.hashPassword(this.fg.value.new_password);
        }
        this.gs.log('[USER_EDIT_DIRTY]', body);
        this.submitted = true;
        if (this.fg.invalid) {
            this.submitted = false;
            this.bs.idle();
            return;
        }
        this.subsUserUpdate = this.us.updateUser(this.username, {
            ...body
        }).subscribe({
            next: res => {
                this.gs.log('[USER_EDIT_SUCCESS]', res);
                this.submitted = false;
                this.bs.idle();
                this.as.removeUser();
                this.bs.busy();
                this.subsVerify = this.as.verify(this.as.token).subscribe({
                    next: success => {
                        this.gs.log('[VERIFY_LOGIN_SUCCESS]', success);
                        this.bs.idle();
                        this.router.navigateByUrl(`/user/${this.username}`);
                    },
                    error: error => {
                        this.gs.log('[VERIFY_LOGIN_ERROR]', error, 'error');
                        this.bs.idle();
                        this.as.removeUser();
                        this.router.navigateByUrl(`/user/${this.username}`);
                    }
                });
            },
            error: err => {
                this.gs.log('[USER_EDIT_ERROR]', err, 'error');
                this.submitted = false;
                this.bs.idle();
            }
        });
    }
    changeUname() {
        var _a, _b;
        const adminList = ['bifeldy'];
        this.router.navigate(['/create/mailbox'], {
            queryParams: {
                subject: '[ReqUName] Pengajuan Ganti Username',
                to: adminList.map(e => `${e}@${_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.domain}`).join(','),
                cc: (_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b._email
            }
        });
    }
}
UserEditComponent.ɵfac = function UserEditComponent_Factory(t) { return new (t || UserEditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_5__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_6__.ImgbbService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_7__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_8__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_crypto_service__WEBPACK_IMPORTED_MODULE_9__.CryptoService)); };
UserEditComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: UserEditComponent, selectors: [["app-user-edit"]], decls: 1, vars: 1, consts: [[3, "formGroup", "submit", 4, "ngIf"], [3, "formGroup", "submit"], [1, "container"], [1, "profile-info", "align-items-center", 2, "top", "64px", "position", "relative"], [1, "row", "py-3", "px-2"], [1, "col-md-4", "col-xl-3", "px-3"], [1, "row", "sticky-top", "pt-3"], [1, "col-12"], [1, "w-100", 3, "src"], ["appearance", "outline", 1, "pt-3", "w-100", 3, "color"], [1, "w-100", 3, "accept", "change"], ["photoImage", ""], ["matSuffix", ""], [1, "px-3", "w-100"], [4, "ngIf"], ["class", "col-12 mb-4", 4, "ngIf"], [1, "col-12", "p-3"], ["formControlName", "private", "matTooltip", "Hanya Tampilkan Informasi Profil"], [1, "col-12", "p-3", "text-warning"], [1, "text-success", 2, "cursor", "pointer", 3, "click"], [1, "col-md-8", "col-xl-9", "pt-3"], [1, "row", "py-3", "px-0", "profile-height-large"], [1, "row", "py-3"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["matInput", "", "formControlName", "nama", "placeholder", "Nama Lengkap"], ["appearance", "outline", 1, "px-3", "pt-3", "w-100", 3, "color"], ["placeholder", "Basic Input", 1, "w-100", 3, "accept", "change"], ["coverImage", ""], ["class", "col-12 p-3", 4, "ngIf"], ["formControlName", "description", 1, "p-3", "w-100", 3, "config"], ["appearance", "outline", 1, "p-3", "w-100", 3, "color"], ["matInput", "", "formControlName", "old_password", "required", "", "placeholder", "Password Sekarang", "autocomplete", "current-password", 3, "type"], ["type", "button", "mat-icon-button", "", "matSuffix", "", 3, "click"], ["matInput", "", "formControlName", "new_password", "placeholder", "Isi Jika Ingin Ubah Password Baru", "autocomplete", "new-password", 3, "type"], [1, "row"], [1, "row", "gy-3"], [1, "col", "g-0"], [1, "col-12", "col-md-3"], ["mat-stroked-button", "", "routerLink", "../", 1, "w-100", 3, "disabled"], [1, "me-1"], ["type", "submit", "mat-flat-button", "", "color", "accent", 1, "w-100", 3, "disabled"], [1, "ms-1"], [1, "profile-banner", "profile-banner-1", "align-items-center"], [1, "profile-banner", "profile-banner-2", "align-items-center"], [1, "col-12", "mb-4"], ["type", "button", "mat-raised-button", "", "color", "primary", 1, "w-100", 3, "disabled", "click"]], template: function UserEditComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, UserEditComponent_form_0_Template, 92, 33, "form", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.fg);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatLabel, ngx_material_file_input__WEBPACK_IMPORTED_MODULE_16__.FileInputComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatError, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatButton, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_19__.MatSlideToggle, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControlName, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__.MatTooltip, _angular_material_input__WEBPACK_IMPORTED_MODULE_21__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_22__.AngularEditorComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.RequiredValidator, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterLinkWithHref], pipes: [_shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_10__.BytesPipe], styles: [".profile-banner[_ngcontent-%COMP%] {\r\n  height: 192px;\r\n  width: 100%;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  opacity: 0.75;\r\n}\r\n\r\n.profile-banner-1[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.profile-banner-2[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 192px;\r\n  left: 0;\r\n}\r\n\r\n.profile-info[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  height: 256px;\r\n  z-index: 1;\r\n}\r\n\r\n@media only screen and (min-width: 769px) {\r\n  .profile-height-large[_ngcontent-%COMP%] {\r\n    height: 100px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 768px) {\r\n  .profile-image[_ngcontent-%COMP%] {\r\n    padding-top: 3rem;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItZWRpdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLFdBQVc7RUFDWCxzQkFBc0I7RUFDdEIsMkJBQTJCO0VBQzNCLDRCQUE0QjtFQUM1QixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87QUFDVDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsT0FBTztBQUNUOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixVQUFVO0FBQ1o7O0FBRUE7RUFDRTtJQUNFLGFBQWE7RUFDZjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxpQkFBaUI7RUFDbkI7QUFDRiIsImZpbGUiOiJ1c2VyLWVkaXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wcm9maWxlLWJhbm5lciB7XHJcbiAgaGVpZ2h0OiAxOTJweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIG9wYWNpdHk6IDAuNzU7XHJcbn1cclxuXHJcbi5wcm9maWxlLWJhbm5lci0xIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbn1cclxuXHJcbi5wcm9maWxlLWJhbm5lci0yIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAxOTJweDtcclxuICBsZWZ0OiAwO1xyXG59XHJcblxyXG4ucHJvZmlsZS1pbmZvIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgaGVpZ2h0OiAyNTZweDtcclxuICB6LWluZGV4OiAxO1xyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDc2OXB4KSB7XHJcbiAgLnByb2ZpbGUtaGVpZ2h0LWxhcmdlIHtcclxuICAgIGhlaWdodDogMTAwcHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLnByb2ZpbGUtaW1hZ2Uge1xyXG4gICAgcGFkZGluZy10b3A6IDNyZW07XHJcbiAgfVxyXG59Il19 */"] });


/***/ }),

/***/ 81012:
/*!**************************************************************!*\
  !*** ./src/app/_pages/user/user-list/user-list.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserListComponent": () => (/* binding */ UserListComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/clipboard */ 91604);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/snack-bar */ 32528);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/user.service */ 8058);
/* harmony import */ var _shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/fansub.service */ 76781);
/* harmony import */ var _shared_services_api_key_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/services/api-key.service */ 80698);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _shared_components_no_data_no_data_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/components/no-data/no-data.component */ 40192);
/* harmony import */ var _shared_pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../_shared/pipes/date-ago.pipe */ 86766);





















function UserListComponent_div_11_mat_list_option_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-list-option", 25)(1, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "add_comment");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function UserListComponent_div_11_mat_list_option_2_Template_a_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r10); const fk_r8 = restoredCtx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2); return ctx_r9.openComment(fk_r8); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "dateAgo");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const fk_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 2, fk_r8.created_at));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](fk_r8.comment);
} }
function UserListComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 11)(1, "mat-selection-list", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, UserListComponent_div_11_mat_list_option_2_Template, 9, 4, "mat-list-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind3"](3, 2, ctx_r0.feedKomentarData, 0, 5));
} }
function UserListComponent_div_19_mat_list_option_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-list-option", 25)(1, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "volunteer_activism");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "a", 30)(4, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "dateAgo");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](11, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const fldl_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("routerLink", fldl_r12.berkas_ ? "/berkas/" + (fldl_r12.berkas_ == null ? null : fldl_r12.berkas_.id) : fldl_r12.fansub_ ? "/fansub/" + (fldl_r12.fansub_ == null ? null : fldl_r12.fansub_.slug) : fldl_r12.user_ ? "/user/" + (fldl_r12.user_ == null ? null : fldl_r12.user_.username) : fldl_r12.news_ ? "/news/" + (fldl_r12.news_ == null ? null : fldl_r12.news_.id) : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 5, fldl_r12.created_at));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](fldl_r12.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](fldl_r12.berkas_ ? "Berkas" : fldl_r12.fansub_ ? "Fansub" : fldl_r12.user_ ? "User" : fldl_r12.news_ ? "News" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"]((fldl_r12.berkas_ == null ? null : fldl_r12.berkas_.name) || (fldl_r12.fansub_ == null ? null : fldl_r12.fansub_.name) || (fldl_r12.user_ == null ? null : fldl_r12.user_.kartu_tanda_penduduk_ == null ? null : fldl_r12.user_.kartu_tanda_penduduk_.nama) || (fldl_r12.news_ == null ? null : fldl_r12.news_.title));
} }
function UserListComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 11)(1, "mat-selection-list", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, UserListComponent_div_19_mat_list_option_2_Template, 13, 7, "mat-list-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind3"](3, 2, ctx_r1.feedLikeDislikeData, 0, 5));
} }
function UserListComponent_div_27_mat_list_option_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-list-option", 25)(1, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, "directions_run");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "a", 30)(4, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "dateAgo");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const fv_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("routerLink", fv_r14.berkas_ ? "/berkas/" + (fv_r14.berkas_ == null ? null : fv_r14.berkas_.id) : fv_r14.fansub_ ? "/fansub/" + (fv_r14.fansub_ == null ? null : fv_r14.fansub_.slug) : fv_r14.user_ ? "/user/" + (fv_r14.user_ == null ? null : fv_r14.user_.username) : fv_r14.news_ ? "/news/" + (fv_r14.news_ == null ? null : fv_r14.news_.id) : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 4, fv_r14.created_at));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](fv_r14.berkas_ ? "Berkas" : fv_r14.fansub_ ? "Fansub" : fv_r14.user_ ? "User" : fv_r14.news_ ? "News" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"]((fv_r14.berkas_ == null ? null : fv_r14.berkas_.name) || (fv_r14.fansub_ == null ? null : fv_r14.fansub_.name) || (fv_r14.user_ == null ? null : fv_r14.user_.kartu_tanda_penduduk_ == null ? null : fv_r14.user_.kartu_tanda_penduduk_.nama) || (fv_r14.news_ == null ? null : fv_r14.news_.title));
} }
function UserListComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 11)(1, "mat-selection-list", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, UserListComponent_div_27_mat_list_option_2_Template, 11, 6, "mat-list-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind3"](3, 2, ctx_r2.feedVisitData, 0, 5));
} }
function UserListComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function UserListComponent_div_53_Template_div_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r17); const ak_r15 = restoredCtx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); ctx_r16.copyApiKey(ak_r15); return ctx_r16.editApiKey(ak_r15); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "p", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2, " Nama :: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "p", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6, " Origin :: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "p", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](10, " Key :: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](11, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](13, "a", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function UserListComponent_div_53_Template_a_click_13_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r17); const ak_r15 = restoredCtx.$implicit; const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); $event.stopPropagation(); return ctx_r18.revokeApiKey(ak_r15); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](15, "delete_sweep");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](16, " Hapus Akses ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ak_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ak_r15.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ak_r15.ip_domain, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ak_r15.api_key, " ");
} }
function UserListComponent_div_61_mat_list_option_3_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "mat-list-option", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function UserListComponent_div_61_mat_list_option_3_Template_mat_list_option_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r22); const f_r20 = restoredCtx.$implicit; const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2); return ctx_r21.editSubDomain(f_r20.fansub_); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "img", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "a", 43)(3, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](5, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const f_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("src", f_r20.fansub_.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](5, 3, f_r20.updated_at, "d-MM-y"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](f_r20.fansub_.slug);
} }
function UserListComponent_div_61_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 38)(1, "div", 39)(2, "mat-selection-list", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](3, UserListComponent_div_61_mat_list_option_3_Template, 8, 6, "mat-list-option", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx_r4.groupFansub);
} }
function UserListComponent_ng_template_62_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "app-no-data", 45);
} }
class UserListComponent {
    constructor(clipboard, router, snackBar, as, ds, gs, fs, bs, us, fansub, aks) {
        this.clipboard = clipboard;
        this.router = router;
        this.snackBar = snackBar;
        this.as = as;
        this.ds = ds;
        this.gs = gs;
        this.fs = fs;
        this.bs = bs;
        this.us = us;
        this.fansub = fansub;
        this.aks = aks;
        this.feedKomentarData = [];
        this.feedLikeDislikeData = [];
        this.feedVisitData = [];
        this.subsFeedKomentar = null;
        this.subsFeedLikeDislike = null;
        this.subsFeedVisit = null;
        this.subsGetApiKey = null;
        this.subsDialog = null;
        this.subsCreateApiKey = null;
        this.subsEditApiKey = null;
        this.subsRevokeApiKey = null;
        this.subsGroupGet = null;
        this.subsUpdateSubDomain = null;
        this.subsGetSubDomain = null;
        this.apiKey = [];
        this.groupFansub = [];
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get AS() {
        return this.as;
    }
    get ENV() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    ngOnInit() {
        var _a, _b;
        if (this.gs.isBrowser) {
            this.getUserFeedComment();
            this.getUserFeedLikeDislike();
            this.getUserFeedVisit();
            this.getUserApiKey();
            this.getUserGroup();
            this.fs.initializeFab('arrow_forward', null, 'Menuju Halaman Profile', `/user/${(_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.username}`, false);
        }
    }
    ngOnDestroy() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        (_a = this.subsFeedKomentar) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsFeedLikeDislike) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsFeedVisit) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsGetApiKey) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.subsDialog) === null || _e === void 0 ? void 0 : _e.unsubscribe();
        (_f = this.subsCreateApiKey) === null || _f === void 0 ? void 0 : _f.unsubscribe();
        (_g = this.subsEditApiKey) === null || _g === void 0 ? void 0 : _g.unsubscribe();
        (_h = this.subsRevokeApiKey) === null || _h === void 0 ? void 0 : _h.unsubscribe();
        (_j = this.subsGroupGet) === null || _j === void 0 ? void 0 : _j.unsubscribe();
        (_k = this.subsUpdateSubDomain) === null || _k === void 0 ? void 0 : _k.unsubscribe();
        (_l = this.subsGetSubDomain) === null || _l === void 0 ? void 0 : _l.unsubscribe();
    }
    getUserFeedComment() {
        var _a, _b;
        this.bs.busy();
        this.subsFeedKomentar = this.us.getUserFeedComment((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.username, '', 1, 5).subscribe({
            next: res => {
                this.gs.log('[USER_FEED_COMMENT_SUCCESS]', res);
                this.feedKomentarData = res.results;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[USER_FEED_COMMENT_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getUserFeedLikeDislike() {
        var _a, _b;
        this.bs.busy();
        this.subsFeedLikeDislike = this.us.getUserFeedLikeDislike((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.username, '', 1, 5).subscribe({
            next: res => {
                this.gs.log('[USER_FEED_LIKEDISLIKE_SUCCESS]', res);
                this.feedLikeDislikeData = res.results;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[USER_FEED_LIKEDISLIKE_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getUserFeedVisit() {
        var _a, _b;
        this.bs.busy();
        this.subsFeedVisit = this.us.getUserFeedVisit((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.username, '', 1, 5).subscribe({
            next: res => {
                this.gs.log('[USER_FEED_VISIT_SUCCESS]', res);
                this.feedVisitData = res.results;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[USER_FEED_VISIT_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getUserApiKey() {
        var _a, _b;
        this.bs.busy();
        this.subsGetApiKey = this.aks.getUserApiKey((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.username).subscribe({
            next: res => {
                var _a, _b;
                this.gs.log('[USER_FEED_VISIT_SUCCESS]', res);
                this.apiKey = res.results[(_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.username];
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[USER_FEED_VISIT_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    copyApiKey(ak) {
        if (this.clipboard.copy(ak.api_key)) {
            this.snackBar.open(`API Key :: Telah Di Salin Pada Clipboard`, 'Ok');
        }
    }
    generateNewApiKey() {
        var _a, _b;
        this.subsDialog = this.ds.openInputDialog({
            data: {
                title: `Tambah API Key Baru`,
                input: {
                    name: {
                        inputLabel: 'Nama / Deskripsi',
                        inputPlaceholder: `${(_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.username}_${new Date().getTime()}`,
                        inputValue: null,
                        inputRequired: true
                    },
                    ip_domain: {
                        inputLabel: 'Origin Tanpa http://',
                        inputPlaceholder: 'example.com; 1.1.1.1; *',
                        inputValue: null,
                        inputRequired: true
                    }
                },
                confirmText: 'OK',
                cancelText: 'Batal',
                infoText: 'Gunakan * Saja Untuk Perbolehkan Semua Dan Titik Koma ; Untuk Lebih Dari Satu'
            }
        }).afterClosed().subscribe({
            next: re => {
                this.gs.log('[INPUT_DIALOG_CLOSED]', re);
                if (re) {
                    this.bs.busy();
                    this.subsCreateApiKey = this.aks.createApiKey({
                        name: re.name,
                        ip_domain: re.ip_domain
                    }).subscribe({
                        next: res => {
                            this.gs.log('[USER_CREATE_APIKEY_SUCCESS]', res);
                            this.bs.idle();
                            this.getUserApiKey();
                        },
                        error: err => {
                            this.gs.log('[USER_CREATE_APIKEY_ERROR]', err, 'error');
                            this.bs.idle();
                            this.getUserApiKey();
                        }
                    });
                }
                this.subsDialog.unsubscribe();
            }
        });
    }
    editApiKey(ak) {
        this.subsDialog = this.ds.openInputDialog({
            data: {
                title: `Ubah API Key`,
                input: {
                    name: {
                        inputLabel: 'Nama / Deskripsi',
                        inputPlaceholder: ak.name,
                        inputValue: ak.name,
                        inputRequired: true
                    },
                    ip_domain: {
                        inputLabel: 'Origin Tanpa http://',
                        inputPlaceholder: ak.ip_domain,
                        inputValue: ak.ip_domain,
                        inputRequired: true
                    }
                },
                confirmText: 'OK',
                cancelText: 'Batal',
                infoText: 'Gunakan * Saja Untuk Perbolehkan Semua Dan Titik Koma ; Untuk Lebih Dari Satu'
            }
        }).afterClosed().subscribe({
            next: re => {
                this.gs.log('[INPUT_DIALOG_CLOSED]', re);
                if (re) {
                    this.bs.busy();
                    this.subsEditApiKey = this.aks.editApiKey(ak.id, {
                        name: re.name,
                        ip_domain: re.ip_domain
                    }).subscribe({
                        next: res => {
                            this.gs.log('[USER_EDIT_APIKEY_SUCCESS]', res);
                            this.bs.idle();
                            this.getUserApiKey();
                        },
                        error: err => {
                            this.gs.log('[USER_EDIT_APIKEY_ERROR]', err, 'error');
                            this.bs.idle();
                            this.getUserApiKey();
                        }
                    });
                }
                this.subsDialog.unsubscribe();
            }
        });
    }
    revokeApiKey(ak) {
        this.bs.busy();
        this.subsRevokeApiKey = this.aks.revokeApiKey(ak.id).subscribe({
            next: res => {
                this.gs.log('[USER_REVOKE_APIKEY_SUCCESS]', res);
                this.bs.idle();
                this.getUserApiKey();
            },
            error: err => {
                this.gs.log('[USER_REVOKE_APIKEY_ERROR]', err, 'error');
                this.bs.idle();
                this.getUserApiKey();
            }
        });
    }
    getUserGroup() {
        var _a, _b;
        this.bs.busy();
        this.subsGroupGet = this.us.getUserGroup((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.username).subscribe({
            next: res => {
                this.gs.log('[USER_GROUP_LIST_SUCCESS]', res);
                this.groupFansub = res.results;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[USER_GROUP_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    editSubDomain(f) {
        this.bs.busy();
        this.subsGetSubDomain = this.fansub.getSubDomain(f.slug).subscribe({
            next: res => {
                var _a, _b;
                this.gs.log('[USER_FANSUB_SUBDOMAIN_SUCCESS]', res);
                this.bs.idle();
                const subDomain = res.result;
                this.subsDialog = this.ds.openInputDialog({
                    data: {
                        title: `Ubah CNAME / A Record IP v4 v6 :: '${f.slug}'`,
                        input: {
                            server_target: {
                                inputLabel: 'Server Target',
                                inputPlaceholder: `ghs.google.com`,
                                inputValue: subDomain.dns_id.content,
                                inputRequired: true
                            },
                            verification_name: {
                                inputLabel: 'Tambahan Khusus Blogger :: Name',
                                inputPlaceholder: `blablabla-name`,
                                inputValue: (_a = subDomain.dns_id_alt) === null || _a === void 0 ? void 0 : _a.name,
                                inputRequired: false
                            },
                            verification_target: {
                                inputLabel: 'Tambahan Khusus Blogger :: Target',
                                inputPlaceholder: `blablabla-target.dv.googlehosted.com`,
                                inputValue: (_b = subDomain.dns_id_alt) === null || _b === void 0 ? void 0 : _b.content,
                                inputRequired: false
                            }
                        },
                        confirmText: 'OK',
                        cancelText: 'Batal',
                        infoText: 'Abaikan 2 Input Terakhir Jika Bukan Blogger'
                    }
                }).afterClosed().subscribe({
                    next: re => {
                        this.gs.log('[INPUT_DIALOG_CLOSED]', re);
                        if (re) {
                            this.bs.busy();
                            this.subsUpdateSubDomain = this.fansub.updateSubDomain(f.slug, {
                                server_target: re.server_target,
                                verification_name: re.verification_name,
                                verification_target: re.verification_target
                            }).subscribe({
                                next: r => {
                                    this.gs.log('[FANSUB_UPDATE_SUBDOMAIN_SUCCESS]', r);
                                    this.bs.idle();
                                    this.getUserGroup();
                                },
                                error: e => {
                                    this.gs.log('[FANSUB_UPDATE_SUBDOMAIN_ERROR]', e, 'error');
                                    this.bs.idle();
                                    this.getUserGroup();
                                }
                            });
                        }
                        this.subsDialog.unsubscribe();
                    }
                });
            },
            error: err => {
                this.gs.log('[USER_FANSUB_SUBDOMAIN_ERROR]', err, 'error');
                this.bs.idle();
                this.subsDialog = this.ds.openInfoDialog({
                    data: {
                        title: `Sepertinya Sub-Domain '${f.slug}' Belum Di Klaim`,
                        htmlMessage: 'Silahkan ambil sub-domain pada halaman fansub, ingin ke sana sekarang?',
                        confirmText: 'Ya',
                        cancelText: 'Tidak'
                    },
                    disableClose: false
                }).afterClosed().subscribe({
                    next: re => {
                        this.gs.log('[INFO_DIALOG_CLOSED]', re);
                        if (re === true) {
                            this.router.navigateByUrl(`/fansub/${f.slug}`);
                        }
                        else {
                            this.getUserGroup();
                        }
                        this.subsDialog.unsubscribe();
                    }
                });
            }
        });
    }
    openComment(k) {
        this.router.navigate([k.path], {
            queryParams: {
                comment: k.id
            }
        });
    }
}
UserListComponent.ɵfac = function UserListComponent_Factory(t) { return new (t || UserListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_13__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_15__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_2__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_4__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_5__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_user_service__WEBPACK_IMPORTED_MODULE_6__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_7__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_api_key_service__WEBPACK_IMPORTED_MODULE_8__.ApiKeyService)); };
UserListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({ type: UserListComponent, selectors: [["app-user-list"]], decls: 64, vars: 12, consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-lg-8", "col-xl-9"], [1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "float-end", "text-warning", 2, "font-size", "small", "cursor", "pointer", 3, "click"], [1, "text-bifeldy"], ["class", "col-12", 4, "ngIf", "ngIfElse"], [1, "col-lg-4", "col-xl-3"], [1, "row", "sticky-top"], [1, "col-12"], ["matTooltip", "Khusus Pengguna Terverifikasi", 1, "text-bifeldy"], [1, "col-12", "mb-2"], ["mat-button", "", "color", "accent", "matTooltip", "Buka Kotak Pesan", "routerLink", "/mailbox", 1, "w-100"], [1, "me-1"], [1, "text-bifeldy", 3, "matTooltip"], ["mat-button", "", "color", "accent", 1, "w-100", 3, "click"], ["class", "my-2 gradient-border", 3, "click", 4, "ngFor", "ngForOf"], [1, "row", "mt-4"], [1, "border-bottom-dotted"], ["class", "col-12 mb-2", "style", "max-height: 288px;", 4, "ngIf", "ngIfElse"], ["noData", ""], [3, "multiple"], ["class", "h-100", 4, "ngFor", "ngForOf"], [1, "h-100"], ["mat-list-icon", "", 1, "ps-3"], [1, "text-truncate", "text-decoration-none", 3, "click"], [1, "bg-bifeldy", "px-2", "me-1", "text-danger", 2, "position", "absolute", "right", "0"], [1, "text-warning"], [1, "text-truncate", "text-decoration-none", 3, "routerLink"], [1, "me-3", "text-success"], [1, "me-3", "text-info"], [1, "my-2", "gradient-border", 3, "click"], [1, "ps-2", "pe-2", "pt-2", "text-truncate", "my-0"], [1, "text-success"], [1, "ps-2", "pe-2", "pt-0", "text-truncate", "my-0"], [1, "ps-2", "pe-2", "pb-2", "text-truncate", "my-0"], [1, "col-12", "mb-2", 2, "max-height", "288px"], [1, "h-100", 2, "overflow-y", "auto"], ["class", "h-100", 3, "click", 4, "ngFor", "ngForOf"], [1, "h-100", 3, "click"], ["matListAvatar", "", 1, "ms-3", 2, "border-radius", "0", 3, "src"], [1, "text-truncate", "text-decoration-none"], [1, "bg-bifeldy", "px-2", "me-1", "text-warning", 2, "position", "absolute", "right", "0"], [1, "col-12", "p-3"]], template: function UserListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "h2", 5)(7, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function UserListComponent_Template_span_click_7_listener() { return ctx.getUserFeedComment(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8, " Refresh ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "b", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](10, "Riwayat Komentar");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](11, UserListComponent_div_11_Template, 4, 6, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](12, "div", 3)(13, "div", 4)(14, "h2", 5)(15, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function UserListComponent_Template_span_click_15_listener() { return ctx.getUserFeedLikeDislike(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](16, " Refresh ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](17, "b", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](18, "Riwayat Like & Dislike");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](19, UserListComponent_div_19_Template, 4, 6, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](20, "div", 3)(21, "div", 4)(22, "h2", 5)(23, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function UserListComponent_Template_span_click_23_listener() { return ctx.getUserFeedVisit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](24, " Refresh ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](25, "b", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](26, "Riwayat Kunjungan");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](27, UserListComponent_div_27_Template, 4, 6, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](28, "div", 9)(29, "div", 10)(30, "div", 11)(31, "div", 3)(32, "div", 4)(33, "h2", 5)(34, "b", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](35, "Alamat Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](36, "div", 13)(37, "a", 14)(38, "mat-icon", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](39, "email");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](40);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](41, "div", 3)(42, "div", 4)(43, "h2", 5)(44, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function UserListComponent_Template_span_click_44_listener() { return ctx.getUserApiKey(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](45, " Refresh ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](46, "b", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](47, "API Key");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](48, "div", 13)(49, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function UserListComponent_Template_a_click_49_listener() { return ctx.generateNewApiKey(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](50, "mat-icon", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](51, "webhook");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](52, " Buat API Key Baru ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](53, UserListComponent_div_53_Template, 17, 3, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](54, "div", 19)(55, "div", 4)(56, "h2", 20)(57, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function UserListComponent_Template_span_click_57_listener() { return ctx.getUserGroup(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](58, " Refresh ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](59, "b", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](60, "DNS Fansub");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](61, UserListComponent_div_61_Template, 4, 2, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](62, UserListComponent_ng_template_62_Template, 1, 0, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](63);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.feedKomentarData.length > 0)("ngIfElse", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.feedLikeDislikeData.length > 0)("ngIfElse", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.feedVisitData.length > 0)("ngIfElse", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" '", ctx.AS.currentUserSubject == null ? null : ctx.AS.currentUserSubject.value == null ? null : ctx.AS.currentUserSubject.value.username, "@", ctx.ENV.domain, "' ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate1"]("matTooltip", "Aktivitas Terakhir :: ", ctx.AS.currentUserSubject == null ? null : ctx.AS.currentUserSubject.value == null ? null : ctx.AS.currentUserSubject.value._session_origin, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx.apiKey);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.groupFansub.length > 0)("ngIfElse", _r5);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_9__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _angular_material_list__WEBPACK_IMPORTED_MODULE_17__.MatSelectionList, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgForOf, _angular_material_list__WEBPACK_IMPORTED_MODULE_17__.MatListOption, _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__.MatIcon, _angular_material_list__WEBPACK_IMPORTED_MODULE_17__.MatListIconCssMatStyler, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterLinkWithHref, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__.MatTooltip, _angular_material_button__WEBPACK_IMPORTED_MODULE_20__.MatAnchor, _angular_material_list__WEBPACK_IMPORTED_MODULE_17__.MatListAvatarCssMatStyler, _shared_components_no_data_no_data_component__WEBPACK_IMPORTED_MODULE_10__.NoDataComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.SlicePipe, _shared_pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_11__.DateAgoPipe, _angular_common__WEBPACK_IMPORTED_MODULE_16__.DatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLWxpc3QuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 79058:
/*!********************************************!*\
  !*** ./src/app/_pages/user/user.module.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserModule": () => (/* binding */ UserModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ 26271);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/req-res.model */ 14249);
/* harmony import */ var _shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/guards/roles.guard */ 2777);
/* harmony import */ var _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/pipes/custom-pipe.module */ 67355);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_components_material_expansion_panel_material_expansion_panel_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/components/material-expansion-panel/material-expansion-panel.module */ 6020);
/* harmony import */ var _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/components/material-tab/material-tab.module */ 66436);
/* harmony import */ var _shared_components_report_report_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/components/report/report.module */ 54167);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../_shared/components/no-data/no-data.module */ 12438);
/* harmony import */ var _user_detail_user_detail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./user-detail/user-detail.component */ 12598);
/* harmony import */ var _user_list_user_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./user-list/user-list.component */ 81012);
/* harmony import */ var _user_edit_user_edit_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./user-edit/user-edit.component */ 72661);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 3184);




















const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _user_list_user_list_component__WEBPACK_IMPORTED_MODULE_11__.UserListComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'User - Dashboard Overview',
            description: 'Halaman Informasi Pengguna',
            keywords: 'User',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER]
        }
    },
    {
        path: ':username',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: _user_detail_user_detail_component__WEBPACK_IMPORTED_MODULE_10__.UserDetailComponent
            },
            {
                path: 'edit',
                component: _user_edit_user_edit_component__WEBPACK_IMPORTED_MODULE_12__.UserEditComponent,
                canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
                data: {
                    title: 'User - Ubah Profil',
                    description: 'Halaman Pembaharuan Profil Pengguna',
                    keywords: 'Ubah Profil',
                    [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER]
                }
            }
        ]
    }
];
class UserModule {
}
UserModule.ɵfac = function UserModule_Factory(t) { return new (t || UserModule)(); };
UserModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({ type: UserModule });
UserModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule.forChild(routes),
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__.SharedMaterialModule,
            _shared_components_material_expansion_panel_material_expansion_panel_module__WEBPACK_IMPORTED_MODULE_5__.MaterialExpansionPanelModule,
            _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_6__.MaterialTabModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_16__.ReactiveFormsModule,
            ngx_material_file_input__WEBPACK_IMPORTED_MODULE_17__.MaterialFileInputModule,
            _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_18__.AngularEditorModule,
            _shared_components_report_report_module__WEBPACK_IMPORTED_MODULE_7__.ReportModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__.NotificationsModule,
            _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_3__.CustomPipeModule,
            _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_9__.NoDataModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](UserModule, { declarations: [_user_detail_user_detail_component__WEBPACK_IMPORTED_MODULE_10__.UserDetailComponent,
        _user_list_user_list_component__WEBPACK_IMPORTED_MODULE_11__.UserListComponent,
        _user_edit_user_edit_component__WEBPACK_IMPORTED_MODULE_12__.UserEditComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule, _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__.SharedMaterialModule,
        _shared_components_material_expansion_panel_material_expansion_panel_module__WEBPACK_IMPORTED_MODULE_5__.MaterialExpansionPanelModule,
        _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_6__.MaterialTabModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_16__.ReactiveFormsModule,
        ngx_material_file_input__WEBPACK_IMPORTED_MODULE_17__.MaterialFileInputModule,
        _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_18__.AngularEditorModule,
        _shared_components_report_report_module__WEBPACK_IMPORTED_MODULE_7__.ReportModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__.NotificationsModule,
        _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_3__.CustomPipeModule,
        _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_9__.NoDataModule] }); })();


/***/ }),

/***/ 97567:
/*!***************************************************************************************************!*\
  !*** ./src/app/_shared/components/material-expansion-panel/material-expansion-panel.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialExpansionPanelComponent": () => (/* binding */ MaterialExpansionPanelComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/expansion */ 12928);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 65590);







function MaterialExpansionPanelComponent_mat_accordion_0_mat_expansion_panel_1_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "h3", 8);
} if (rf & 2) {
    const d_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", d_r2.text, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
} }
function MaterialExpansionPanelComponent_mat_accordion_0_mat_expansion_panel_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-expansion-panel", 3)(1, "mat-expansion-panel-header")(2, "mat-panel-title", 4)(3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-panel-description")(6, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, MaterialExpansionPanelComponent_mat_accordion_0_mat_expansion_panel_1_ng_template_8_Template, 1, 1, "ng-template", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const d_r2 = ctx.$implicit;
    const isFirst_r3 = ctx.first;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("expanded", ctx_r1.GS.isDesktop && isFirst_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("matTooltip", d_r2.tooltip);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matTooltipPosition", "above");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", d_r2.title, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](d_r2.icon);
} }
function MaterialExpansionPanelComponent_mat_accordion_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-accordion", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MaterialExpansionPanelComponent_mat_accordion_0_mat_expansion_panel_1_Template, 9, 5, "mat-expansion-panel", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.panelData);
} }
class MaterialExpansionPanelComponent {
    constructor(gs) {
        this.gs = gs;
        this.panelData = [
            {
                title: 'Title',
                icon: 'warning',
                text: 'Lorem ipsum ...',
                tooltip: 'Info'
            }
        ];
        if (this.gs.isBrowser) {
            //
        }
    }
    onResize(event) {
        this.gs.onResize(event, 'MATERIAL_EXPANSION_PANEL');
        if (this.gs.isDesktop) {
            this.accordion.openAll();
        }
        else {
            this.accordion.closeAll();
        }
    }
    ;
    get GS() {
        return this.gs;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            //
        }
    }
}
MaterialExpansionPanelComponent.ɵfac = function MaterialExpansionPanelComponent_Factory(t) { return new (t || MaterialExpansionPanelComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
MaterialExpansionPanelComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MaterialExpansionPanelComponent, selectors: [["app-material-expansion-panel"]], viewQuery: function MaterialExpansionPanelComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__.MatAccordion, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.accordion = _t.first);
    } }, hostBindings: function MaterialExpansionPanelComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("resize", function MaterialExpansionPanelComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
    } }, inputs: { panelData: "panelData" }, decls: 1, vars: 1, consts: [["class", "example-headers-align", "multi", "", 4, "ngIf"], ["multi", "", 1, "example-headers-align"], [3, "expanded", 4, "ngFor", "ngForOf"], [3, "expanded"], [1, "font-weight-bold"], [3, "matTooltip", "matTooltipPosition"], [1, "ms-auto"], ["matExpansionPanelContent", ""], [1, "m-0", "text-justify", 2, "white-space", "pre-line !important", 3, "innerHTML"]], template: function MaterialExpansionPanelComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, MaterialExpansionPanelComponent_mat_accordion_0_Template, 2, 1, "mat-accordion", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.panelData.length > 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__.MatAccordion, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__.MatExpansionPanel, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__.MatExpansionPanelHeader, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__.MatExpansionPanelTitle, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__.MatTooltip, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__.MatExpansionPanelDescription, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_2__.MatExpansionPanelContent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXRlcmlhbC1leHBhbnNpb24tcGFuZWwuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 6020:
/*!************************************************************************************************!*\
  !*** ./src/app/_shared/components/material-expansion-panel/material-expansion-panel.module.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialExpansionPanelModule": () => (/* binding */ MaterialExpansionPanelModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _material_expansion_panel_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./material-expansion-panel.component */ 97567);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);




class MaterialExpansionPanelModule {
}
MaterialExpansionPanelModule.ɵfac = function MaterialExpansionPanelModule_Factory(t) { return new (t || MaterialExpansionPanelModule)(); };
MaterialExpansionPanelModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: MaterialExpansionPanelModule });
MaterialExpansionPanelModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MaterialExpansionPanelModule, { declarations: [_material_expansion_panel_component__WEBPACK_IMPORTED_MODULE_1__.MaterialExpansionPanelComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule], exports: [_material_expansion_panel_component__WEBPACK_IMPORTED_MODULE_1__.MaterialExpansionPanelComponent] }); })();


/***/ }),

/***/ 80698:
/*!*****************************************************!*\
  !*** ./src/app/_shared/services/api-key.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiKeyService": () => (/* binding */ ApiKeyService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class ApiKeyService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    getUserApiKey(username) {
        return this.api.getData(`/api-key?username=${username}`);
    }
    createApiKey(apiKeyData) {
        return this.api.postData(`/api-key`, apiKeyData);
    }
    editApiKey(apiKeyId, apiKeyData) {
        return this.api.putData(`/api-key/${apiKeyId}`, apiKeyData);
    }
    revokeApiKey(apiKeyId) {
        return this.api.deleteData(`/api-key/${apiKeyId}`);
    }
}
ApiKeyService.ɵfac = function ApiKeyService_Factory(t) { return new (t || ApiKeyService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
ApiKeyService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ApiKeyService, factory: ApiKeyService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=src_app__pages_user_user_module_ts.js.map