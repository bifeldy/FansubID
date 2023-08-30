"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_fansub_fansub_module_ts"],{

/***/ 27990:
/*!************************************************************************!*\
  !*** ./src/app/_pages/fansub/fansub-detail/fansub-detail.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FansubDetailComponent": () => (/* binding */ FansubDetailComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../models/req-res.model */ 14249);
/* harmony import */ var _models_warna__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../models/warna */ 87623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/services/fansub.service */ 76781);
/* harmony import */ var _shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/services/stats-server.service */ 28381);
/* harmony import */ var _shared_services_toast_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../_shared/services/toast.service */ 96925);
/* harmony import */ var _shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../_shared/services/winbox.service */ 88020);
/* harmony import */ var _shared_services_berkas_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../_shared/services/berkas.service */ 8987);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _shared_components_no_data_no_data_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../_shared/components/no-data/no-data.component */ 40192);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _shared_components_material_chip_material_chip_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../_shared/components/material-chip/material-chip.component */ 24028);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_material_expansion_panel_material_expansion_panel_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../_shared/components/material-expansion-panel/material-expansion-panel.component */ 97567);
/* harmony import */ var _shared_components_report_report_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../_shared/components/report/report.component */ 16647);
/* harmony import */ var _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../_shared/components/material-tab/material-tab.component */ 18757);
/* harmony import */ var _shared_pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../_shared/pipes/date-ago.pipe */ 86766);




























function FansubDetailComponent_div_0_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 8)(1, "a", 35)(2, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](3, "facebook");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](4, " Facebook Fanpage ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("href", ctx_r1.getUrlByName("facebook"), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsanitizeUrl"]);
} }
function FansubDetailComponent_div_0_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 8)(1, "a", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](2, "img", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](3, " Ruang Obrolan Discord ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("href", ctx_r2.getUrlByName("discord"), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsanitizeUrl"]);
} }
function FansubDetailComponent_div_0_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 8)(1, "a", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](2, "img", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](3, " Cuitan Twitter ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("href", ctx_r3.getUrlByName("twitter"), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsanitizeUrl"]);
} }
function FansubDetailComponent_div_0_a_29_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "a", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function FansubDetailComponent_div_0_a_29_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2); return ctx_r12.joinLeaveMember(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r4.joinedAsMember ? "Keluar" : "Gabung", " ");
} }
function FansubDetailComponent_div_0_app_no_data_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](0, "app-no-data");
} }
function FansubDetailComponent_div_0_mat_selection_list_35_mat_list_option_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "mat-list-option", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](1, "img", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](2, "a", 45)(3, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](5, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const m_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpropertyInterpolate1"]("routerLink", "/user/", m_r15.user_.username, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpropertyInterpolate"]("src", m_r15.user_.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", m_r15.keterangan, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](m_r15.user_.username);
} }
function FansubDetailComponent_div_0_mat_selection_list_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "mat-selection-list", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](1, FansubDetailComponent_div_0_mat_selection_list_35_mat_list_option_1_Template, 7, 4, "mat-list-option", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngForOf", ctx_r6.approvedMembers);
} }
function FansubDetailComponent_div_0_mat_selection_list_36_mat_list_option_1_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "mat-list-option", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](1, "img", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](2, "a", 45)(3, "span", 50)(4, "small", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function FansubDetailComponent_div_0_mat_selection_list_36_mat_list_option_1_Template_small_click_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r19); const m_r17 = restoredCtx.$implicit; const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](3); return ctx_r18.approveMember(m_r17); });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](5, " Terima ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](6, " | ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](7, "small", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function FansubDetailComponent_div_0_mat_selection_list_36_mat_list_option_1_Template_small_click_7_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r19); const m_r17 = restoredCtx.$implicit; const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](3); return ctx_r20.rejectMember(m_r17); });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](8, " Tolak ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](9, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const m_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpropertyInterpolate"]("src", m_r17.user_.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpropertyInterpolate1"]("routerLink", "/user/", m_r17.user_.username, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", m_r17.user_.username, " ");
} }
function FansubDetailComponent_div_0_mat_selection_list_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "mat-selection-list", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](1, FansubDetailComponent_div_0_mat_selection_list_36_mat_list_option_1_Template, 11, 3, "mat-list-option", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngForOf", ctx_r7.pendingMembers);
} }
function FansubDetailComponent_div_0_div_42_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 8)(1, "button", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function FansubDetailComponent_div_0_div_42_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r22); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2); return ctx_r21.getSubDomain(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](2, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](3, "dns");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate2"](" 'https://", ctx_r8.fansubData.slug, ".", ctx_r8.ENV.domain, "' ");
} }
function FansubDetailComponent_div_0_div_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](1, "app-material-expansion-panel", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("panelData", ctx_r9.panelData);
} }
function FansubDetailComponent_div_0_div_53_mat_list_option_9_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "mat-list-option", 49)(1, "mat-icon", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](2, "rss_feed");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](3, "a", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function FansubDetailComponent_div_0_div_53_mat_list_option_9_Template_a_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r26); const r_r24 = restoredCtx.$implicit; const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](3); return ctx_r25.openRssFeed(r_r24.link); });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](4, "span", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](6, "dateAgo");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](7, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const r_r24 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind1"](6, 2, r_r24.created || r_r24.published));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("innerHtml", r_r24.title, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsanitizeHtml"]);
} }
function FansubDetailComponent_div_0_div_53_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 15)(1, "div", 56)(2, "h2", 57)(3, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function FansubDetailComponent_div_0_div_53_Template_span_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r28); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2); return ctx_r27.getRssFeed(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](4, " Refresh ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](5, "b", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](6, "RSS Feed Fansub");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](7, "div", 14)(8, "mat-selection-list", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](9, FansubDetailComponent_div_0_div_53_mat_list_option_9_Template, 8, 4, "mat-list-option", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](10, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind3"](10, 2, ctx_r10.rssFeedData.items, 0, 5));
} }
function FansubDetailComponent_div_0_div_54_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 15)(1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](2, "app-report");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
} }
function FansubDetailComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](6, "img", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](7, "div", 8)(8, "button", 9)(9, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](10, "calendar_today");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipe"](12, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](13, "button", 11)(14, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](15, "history");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](17, FansubDetailComponent_div_0_div_17_Template, 5, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](18, FansubDetailComponent_div_0_div_18_Template, 4, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](19, FansubDetailComponent_div_0_div_19_Template, 4, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](20, "div", 8)(21, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function FansubDetailComponent_div_0_Template_button_click_21_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](); return ctx_r29.editFansubData(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](22, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](23, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](24, " Perbaharui Informasi ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](25, "div", 14)(26, "div", 15)(27, "div", 16)(28, "h2", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](29, FansubDetailComponent_div_0_a_29_Template, 2, 1, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](30, "b", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](32, "div", 20)(33, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](34, FansubDetailComponent_div_0_app_no_data_34_Template, 1, 0, "app-no-data", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](35, FansubDetailComponent_div_0_mat_selection_list_35_Template, 2, 2, "mat-selection-list", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](36, FansubDetailComponent_div_0_mat_selection_list_36_Template, 2, 2, "mat-selection-list", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](37, "div", 8)(38, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("click", function FansubDetailComponent_div_0_Template_button_click_38_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30); const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](); return ctx_r31.togglePendingMembers(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](39, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](40, "manage_accounts");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](42, FansubDetailComponent_div_0_div_42_Template, 5, 2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](43, "div", 25)(44, "div", 26)(45, "h1", 27)(46, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtext"](47);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](48, "div", 15)(49, "app-material-chip", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("chipClicked", function FansubDetailComponent_div_0_Template_app_material_chip_chipClicked_49_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](); return ctx_r32.openTag($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](50, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](51, "app-notifications", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](52, FansubDetailComponent_div_0_div_52_Template, 2, 1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](53, FansubDetailComponent_div_0_div_53_Template, 11, 6, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](54, FansubDetailComponent_div_0_div_54_Template, 3, 0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementStart"](55, "div", 29)(56, "div", 14)(57, "app-material-tab", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵlistener"]("listClicked", function FansubDetailComponent_div_0_Template_app_material_tab_listClicked_57_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30); const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](); return ctx_r33.openAnime($event); })("gridClicked", function FansubDetailComponent_div_0_Template_app_material_tab_gridClicked_57_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30); const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](); return ctx_r34.openDorama($event); })("tableRowClicked", function FansubDetailComponent_div_0_Template_app_material_tab_tableRowClicked_57_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30); const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](); return ctx_r35.openFile($event); })("paginatorClicked", function FansubDetailComponent_div_0_Template_app_material_tab_paginatorClicked_57_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30); const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](); return ctx_r36.onPaginatorClicked($event); })("serverSideFilter", function FansubDetailComponent_div_0_Template_app_material_tab_serverSideFilter_57_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30); const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](); return ctx_r37.onServerSideFilter($event); })("serverSideOrder", function FansubDetailComponent_div_0_Template_app_material_tab_serverSideOrder_57_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30); const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](); return ctx_r38.onServerSideOrder($event); })("gridLoadNextPage", function FansubDetailComponent_div_0_Template_app_material_tab_gridLoadNextPage_57_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30); const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](); return ctx_r39.onDoramaLoadNextPage(); })("listLoadNextPage", function FansubDetailComponent_div_0_Template_app_material_tab_listLoadNextPage_57_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵrestoreView"](_r30); const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"](); return ctx_r40.onAnimeLoadNextPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelement"](58, "div", 33)(59, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("src", ctx_r0.fansubData.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpipeBind2"](12, 26, ctx_r0.fansubData.born, "d MMMM y"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r0.fansubData.active ? "Aktif" : "Tidak Aktif", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r0.getUrlByName("facebook"));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r0.getUrlByName("discord"));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r0.getUrlByName("twitter"));
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵpropertyInterpolate"]("matTooltip", ctx_r0.fansubData.user_ ? "Terakhir Di Ubah Oleh :: " + ctx_r0.fansubData.user_.username : "Perbaharui Data Fansub");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", !ctx_r0.showPendingMember);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" ", ctx_r0.showPendingMember ? "Permintaan Gabung" : "Anggota", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", !ctx_r0.showPendingMember && ctx_r0.approvedMembers.length <= 0 || ctx_r0.showPendingMember && ctx_r0.pendingMembers.length <= 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", !ctx_r0.showPendingMember && ctx_r0.approvedMembers.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r0.showPendingMember && ctx_r0.pendingMembers.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate1"](" Lihat ", ctx_r0.showPendingMember ? "Anggota" : "Permintaan Gabung", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", !ctx_r0.fansubData.dns_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtextInterpolate"](ctx_r0.fansubData.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("chipData", ctx_r0.chipData);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r0.panelData.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", (ctx_r0.rssFeedData == null ? null : ctx_r0.rssFeedData.items.length) > 0 && ctx_r0.fansubSlug !== "null");
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx_r0.SS.mySocket == null ? null : ctx_r0.SS.mySocket.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("tabData", ctx_r0.tabData)("count", ctx_r0.count)("serverSide", true)("gridPageFinished", ctx_r0.doramaPageFinished)("listPageFinished", ctx_r0.animePageFinished);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵstyleProp"]("background-image", "url(" + ctx_r0.fansubData.cover_url + ")");
} }
class FansubDetailComponent {
    constructor(activatedRoute, router, bs, as, ds, gs, fs, pi, fansub, ss, toast, wb, berkas) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.bs = bs;
        this.as = as;
        this.ds = ds;
        this.gs = gs;
        this.fs = fs;
        this.pi = pi;
        this.fansub = fansub;
        this.ss = ss;
        this.toast = toast;
        this.wb = wb;
        this.berkas = berkas;
        this.fansubSlug = '';
        this.fansubData = null;
        this.rssFeedData = null;
        this.approvedMembers = [];
        this.pendingMembers = [];
        this.joinedAsMember = null;
        this.showPendingMember = false;
        this.count = 0;
        this.page = 1;
        this.row = 10;
        this.q = '';
        this.sort = '';
        this.order = '';
        this.animeFansub = [];
        this.doramaFansub = [];
        this.berkasFansub = [];
        this.allBerkasFansubId = [];
        this.animePageFinished = false;
        this.doramaPageFinished = false;
        this.animePage = 1;
        this.doramaPage = 1;
        this.chipData = [];
        this.panelData = [];
        this.tabData = [
            {
                name: 'Anime',
                icon: 'live_tv',
                type: 'list',
                data: []
            },
            {
                name: 'Dorama',
                icon: 'movie',
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
        this.subsActRoute = null;
        this.subsFansub = null;
        this.subsBerkas = null;
        this.subsAnime = null;
        this.subsDorama = null;
        this.subsParam = null;
        this.subsRssFeed = null;
        this.subsFansubMemberGet = null;
        this.subsFansubMemberJoin = null;
        this.subsFansubMemberApproveReject = null;
        this.subsFansubMemberLeave = null;
        this.subsDialog = null;
        this.subsClaimSubDomain = null;
        this.subsTrusted = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get SS() {
        return this.ss;
    }
    get ENV() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    ngOnDestroy() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        (_a = this.subsActRoute) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsFansub) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsBerkas) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsAnime) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.subsDorama) === null || _e === void 0 ? void 0 : _e.unsubscribe();
        (_f = this.subsParam) === null || _f === void 0 ? void 0 : _f.unsubscribe();
        (_g = this.subsRssFeed) === null || _g === void 0 ? void 0 : _g.unsubscribe();
        (_h = this.subsFansubMemberGet) === null || _h === void 0 ? void 0 : _h.unsubscribe();
        (_j = this.subsFansubMemberJoin) === null || _j === void 0 ? void 0 : _j.unsubscribe();
        (_k = this.subsFansubMemberApproveReject) === null || _k === void 0 ? void 0 : _k.unsubscribe();
        (_l = this.subsFansubMemberLeave) === null || _l === void 0 ? void 0 : _l.unsubscribe();
        (_m = this.subsDialog) === null || _m === void 0 ? void 0 : _m.unsubscribe();
        (_o = this.subsClaimSubDomain) === null || _o === void 0 ? void 0 : _o.unsubscribe();
        (_p = this.subsTrusted) === null || _p === void 0 ? void 0 : _p.unsubscribe();
    }
    ngOnInit() {
        this.subsParam = this.activatedRoute.params.subscribe({
            next: p => {
                this.fansubSlug = p['fansubSlug'];
                this.getFansubDetail();
            }
        });
    }
    getFansubDetail() {
        this.bs.busy();
        this.subsFansub = this.fansub.getFansub(this.fansubSlug).subscribe({
            next: res => {
                this.gs.log('[FANSUB_DETAIL_SUCCESS]', res);
                this.fansubData = res.result;
                this.pi.updatePageMetaData(`${this.fansubData.name}`, `${this.fansubData.description}`, `${Array.isArray(this.fansubData.tags) ? this.fansubData.tags.join(', ') : this.fansubData.name}`, this.fansubData.image_url, this.fansubData.user_.username);
                this.bs.idle();
                if (this.gs.isBrowser) {
                    if (Array.isArray(this.fansubData.tags)) {
                        for (let i = 0; i < this.fansubData.tags.length; i++) {
                            this.chipData.push({ id_tag: i, name: this.fansubData.tags[i], color: _models_warna__WEBPACK_IMPORTED_MODULE_2__.WARNA.BIRU, selected: true });
                        }
                    }
                    this.panelData = [];
                    this.panelData.push({ title: 'Informasi', icon: 'notification_important', text: this.fansubData.description });
                    const webUrl = this.getUrlByName('web');
                    if (webUrl) {
                        this.fs.initializeFab('web', null, 'Buka Halaman Website Fansub', this.getUrlByName('web'), true);
                    }
                    this.getAnimeFansub();
                    this.getDoramaFansub();
                    this.getBerkasFansub();
                    this.getRssFeed();
                    this.getFansubMember();
                }
            },
            error: err => {
                this.gs.log('[FANSUB_DETAIL_ERROR]', err, 'error');
                this.bs.idle();
                this.router.navigate(['/error'], {
                    queryParams: {
                        returnUrl: '/fansub'
                    }
                });
            }
        });
    }
    getUrlByName(name) {
        const fansubDataUrl = this.fansubData.urls.find(u => u.name === name);
        if (fansubDataUrl) {
            return fansubDataUrl.url;
        }
        else {
            return null;
        }
    }
    getRssFeed() {
        this.bs.busy();
        this.subsRssFeed = this.fansub.getRssFeedFansub(this.fansubSlug).subscribe({
            next: res => {
                this.gs.log('[RSS_FEED_LIST_SUCCESS]', res);
                this.rssFeedData = res.result;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[RSS_FEED_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    openRssFeed(link) {
        this.wb.winboxOpenUri(this.gs.rssLink(link));
    }
    getBerkasFansub() {
        this.bs.busy();
        if (this.subsBerkas) {
            this.subsBerkas.unsubscribe();
            this.bs.idle();
        }
        this.subsBerkas = this.fansub.getBerkasFansub([this.fansubData.id], this.q, this.page, this.row, this.sort, this.order).subscribe({
            next: res => {
                this.gs.log('[BERKAS_ANIME_SUCCESS]', res);
                this.count = res.count;
                this.berkasFansub = [];
                for (const r of res.results[this.fansubData.id]) {
                    this.allBerkasFansubId.push(r.id);
                    this.berkasFansub.push({
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
                this.tabData[2].data.row = this.berkasFansub;
                if (this.allBerkasFansubId.length > 0) {
                    this.checkTrusted();
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[BERKAS_FANSUB_ERROR]', err, 'error');
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
        this.subsTrusted = this.berkas.checkTrusted(this.allBerkasFansubId).subscribe({
            next: res => {
                this.gs.log('[ANIME_BERKAS_TRUSTED_SUCCESS]', res);
                for (const b of this.berkasFansub) {
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
    getAnimeFansub() {
        this.bs.busy();
        this.subsAnime = this.fansub.getAnimeFansub([this.fansubData.id], this.animePage).subscribe({
            next: res => {
                this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
                for (const r of res.results[this.fansubData.id]) {
                    this.animeFansub.push({
                        id: r.id,
                        image: r.image_url,
                        title: r.name
                    });
                }
                this.tabData[0].data = this.animeFansub;
                if (res.results[this.fansubData.id].length <= 0) {
                    this.animePageFinished = true;
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[FANSUB_ANIME_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getDoramaFansub() {
        this.bs.busy();
        this.subsDorama = this.fansub.getDoramaFansub([this.fansubData.id], this.doramaPage).subscribe({
            next: res => {
                this.gs.log('[FANSUB_DORAMA_SUCCESS]', res);
                for (const r of res.results[this.fansubData.id]) {
                    this.doramaFansub.push({
                        id: r.id,
                        image: r.image_url,
                        title: r.name,
                        slug: r.slug
                    });
                }
                this.tabData[1].data = this.doramaFansub;
                if (res.results[this.fansubData.id].length <= 0) {
                    this.doramaPageFinished = true;
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[FANSUB_DORAMA_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    editFansubData() {
        this.router.navigateByUrl(`/fansub/${this.fansubSlug}/edit`);
    }
    onServerSideFilter(data) {
        this.gs.log('[BERKAS_FANSUB_ENTER_FILTER]', data);
        this.q = data;
        this.getBerkasFansub();
    }
    onServerSideOrder(data) {
        this.gs.log('[BERKAS_FANSUB_CLICK_ORDER]', data);
        this.q = data.q;
        this.sort = data.active;
        this.order = data.direction;
        this.getBerkasFansub();
    }
    onPaginatorClicked(data) {
        this.gs.log('[FANSUB_DETAIL_CLICK_PAGINATOR]', data);
        this.page = data.pageIndex + 1;
        this.row = data.pageSize;
        this.getBerkasFansub();
    }
    openFile(data) {
        this.gs.log('[FANSUB_DETAIL_OPEN_FILE]', data);
        this.router.navigateByUrl(`/berkas/${data.id}`);
    }
    openAnime(data) {
        this.gs.log('[FANSUB_DETAIL_OPEN_ANIME]', data);
        const judulAnime = data.title.replace(/[^a-zA-Z0-9]/g, '-');
        this.router.navigateByUrl(`/anime/${data.id}-${judulAnime}`);
    }
    openDorama(data) {
        this.gs.log('[FANSUB_DETAIL_OPEN_DORAMA]', data);
        this.router.navigateByUrl(`/dorama/${data.slug}`);
    }
    openTag(data) {
        this.gs.log('[FANSUB_DETAIL_OPEN_TAG]', data);
    }
    onAnimeLoadNextPage() {
        if (!this.animePageFinished) {
            this.animePage++;
            this.getAnimeFansub();
        }
    }
    onDoramaLoadNextPage() {
        if (!this.doramaPageFinished) {
            this.doramaPage++;
            this.getDoramaFansub();
        }
    }
    togglePendingMembers() {
        this.showPendingMember = !this.showPendingMember;
        this.getFansubMember();
    }
    getFansubMember() {
        this.bs.busy();
        this.subsFansubMemberGet = this.fansub.getFansubMember(this.fansubSlug).subscribe({
            next: res => {
                var _a;
                this.gs.log('[FANSUB_DETAIL_MEMBER_LIST_SUCCESS]', res);
                this.approvedMembers = [];
                this.pendingMembers = [];
                for (const m of res.results) {
                    if (m.approved) {
                        this.approvedMembers.push(m);
                    }
                    else {
                        this.pendingMembers.push(m);
                    }
                }
                if ((_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) {
                    const index = this.approvedMembers.findIndex(m => { var _a, _b; return m.user_.id === ((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.id); });
                    this.joinedAsMember = index >= 0 ? this.approvedMembers[index] : null;
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[FANSUB_DETAIL_MEMBER_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    joinLeaveMember() {
        this.bs.busy();
        if (this.joinedAsMember) {
            this.subsFansubMemberLeave = this.fansub.leaveFansubMember(this.joinedAsMember.id).subscribe({
                next: res => {
                    this.gs.log('[FANSUB_DETAIL_MEMBER_LEAVE_SUCCESS]', res);
                    this.getFansubMember();
                    this.bs.idle();
                },
                error: err => {
                    this.gs.log('[FANSUB_DETAIL_MEMBER_LEAVE_ERROR]', err, 'error');
                    this.getFansubMember();
                    this.bs.idle();
                }
            });
        }
        else {
            this.subsFansubMemberJoin = this.fansub.requestJoinFansubMember({
                slug: this.fansubSlug
            }).subscribe({
                next: res => {
                    this.gs.log('[FANSUB_DETAIL_MEMBER_JOIN_SUCCESS]', res);
                    this.bs.idle();
                    this.subsDialog = this.ds.openInfoDialog({
                        data: {
                            title: `Permintaan Gabung Berhasil`,
                            htmlMessage: 'Silahkan Menghubungi Anggota Yang Sudah Tergabung / Admin / Moderator Fansub Untuk Menerima Permintaan Gabung.',
                            confirmText: 'Tutup'
                        }
                    }).afterClosed().subscribe({
                        next: r => {
                            this.gs.log('[INFO_DIALOG_CLOSED]', r);
                            this.getFansubMember();
                            this.subsDialog.unsubscribe();
                        }
                    });
                },
                error: err => {
                    this.gs.log('[FANSUB_DETAIL_MEMBER_JOIN_ERROR]', err, 'error');
                    this.getFansubMember();
                    this.bs.idle();
                }
            });
        }
    }
    approveOrRejectFansubMember(data, ac) {
        this.subsDialog = this.ds.openInputDialog({
            data: {
                title: `Keterangan ${ac ? 'Approve' : 'Reject'} '${data.user_.username}' :: '${data.fansub_.slug}'`,
                input: {
                    keterangan: {
                        inputLabel: 'Keterangan',
                        inputPlaceholder: `Pemilik, Translator, Timer, QA / QC, TypeSetter, dll.`,
                        inputValue: null,
                        inputRequired: true
                    }
                },
                confirmText: 'OK',
                cancelText: 'Batal',
                infoText: 'Max. 10 Huruf'
            }
        }).afterClosed().subscribe({
            next: re => {
                var _a;
                this.gs.log('[INPUT_DIALOG_CLOSED]', re);
                if (re) {
                    this.bs.busy();
                    this.subsFansubMemberApproveReject = this.fansub.approveRejectFansubMember(data.id, {
                        approved: ac,
                        keterangan: (_a = re.keterangan) === null || _a === void 0 ? void 0 : _a.substring(0, 10)
                    }).subscribe({
                        next: res => {
                            this.gs.log('[FANSUB_DETAIL_MEMBER_APPROVE_REJECT_SUCCESS]', res);
                            this.getFansubMember();
                            this.bs.idle();
                        },
                        error: err => {
                            this.gs.log('[FANSUB_DETAIL_MEMBER_APPROVE_REJECT_ERROR]', err, 'error');
                            this.getFansubMember();
                            this.bs.idle();
                        }
                    });
                }
                else if (re === false) {
                    this.getFansubMember();
                }
                this.subsDialog.unsubscribe();
            }
        });
    }
    approveMember(member) {
        this.approveOrRejectFansubMember(member, true);
    }
    rejectMember(member) {
        this.approveOrRejectFansubMember(member, false);
    }
    getSubDomain() {
        var _a, _b, _c, _d, _e;
        if ((_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) {
            if (this.joinedAsMember || ((_c = (_b = this.as.currentUserSubject) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN || ((_e = (_d = this.as.currentUserSubject) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR) {
                this.subsDialog = this.ds.openInputDialog({
                    data: {
                        title: `Buat CNAME / A Record IP v4 v6 :: '${this.fansubSlug}'`,
                        input: {
                            server_target: {
                                inputLabel: 'Server Target',
                                inputPlaceholder: `ghs.google.com`,
                                inputValue: null,
                                inputRequired: true
                            },
                            verification_name: {
                                inputLabel: 'Tambahan Khusus Blogger :: Name',
                                inputPlaceholder: `blablabla-name`,
                                inputValue: null,
                                inputRequired: false
                            },
                            verification_target: {
                                inputLabel: 'Tambahan Khusus Blogger :: Target',
                                inputPlaceholder: `blablabla-target.dv.googlehosted.com`,
                                inputValue: null,
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
                            this.subsClaimSubDomain = this.fansub.claimSubDomain({
                                slug: this.fansubSlug,
                                server_target: re.server_target,
                                verification_name: re.verification_name,
                                verification_target: re.verification_target
                            }).subscribe({
                                next: res => {
                                    this.gs.log('[FANSUB_CLAIM_SUBDOMAIN_SUCCESS]', res);
                                    this.bs.idle();
                                    this.subsDialog = this.ds.openInfoDialog({
                                        data: {
                                            title: `Klaim Berhasil`,
                                            htmlMessage: `
                        Domain '${this.fansubSlug}.${this.ENV.domain}' Selesai Didaftarkan.
                        Silahkan Tunggu Hingga Propagasi Dns Selesai.
                        Untuk Mengubah, Silahkan Menuju <a href="${_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl}/user" target="_self" class="text-decoration-none">Halaman User</a>
                        Apabila Ada Pertanyaan Dapat Langsung Menghubungi Admin / Moderator.
                        Terima Kasih.
                      `,
                                            confirmText: 'Tutup'
                                        }
                                    }).afterClosed().subscribe({
                                        next: r => {
                                            this.gs.log('[INFO_DIALOG_CLOSED]', r);
                                            this.getFansubDetail();
                                            this.subsDialog.unsubscribe();
                                        }
                                    });
                                },
                                error: err => {
                                    this.gs.log('[FANSUB_CLAIM_SUBDOMAIN_ERROR]', err, 'error');
                                    this.bs.idle();
                                    this.getFansubDetail();
                                }
                            });
                        }
                        this.subsDialog.unsubscribe();
                    }
                });
            }
            else {
                this.toast.warning('Harus Menjadi Anggota Untuk Klaim Sub-Domain!', 'Whoops!', null, true);
            }
        }
        else {
            this.router.navigate(['/login'], {
                queryParams: {
                    returnUrl: this.router.url.split('?')[0]
                }
            });
        }
    }
}
FansubDetailComponent.ɵfac = function FansubDetailComponent_Factory(t) { return new (t || FansubDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_22__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_22__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_5__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_7__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_8__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_9__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_10__.StatsServerService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_shared_services_toast_service__WEBPACK_IMPORTED_MODULE_11__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_12__.WinboxService), _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdirectiveInject"](_shared_services_berkas_service__WEBPACK_IMPORTED_MODULE_13__.BerkasService)); };
FansubDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵdefineComponent"]({ type: FansubDetailComponent, selectors: [["app-fansub-detail"]], decls: 1, vars: 1, consts: [["class", "container", 4, "ngIf"], [1, "container"], [1, "fansub-info", "align-items-center"], [1, "row", "py-3", "px-2"], [1, "col-md-4", "col-xl-3", "px-3"], [1, "row", "sticky-top", "pt-3"], [1, "col-12", "pt-4"], [1, "fansub-image", 3, "src"], [1, "col-12", "text-center", "pt-3"], ["type", "button", "mat-button", "", "color", "warn", "matTooltip", "Berdiri Sejak", 1, "w-100"], [1, "me-1"], ["type", "button", "mat-button", "", "color", "accent", "matTooltip", "Status Fansub", 1, "w-100"], ["class", "col-12 text-center pt-3", 4, "ngIf"], ["type", "button", "mat-button", "", 1, "w-100", "text-success", 2, "color", "rgb(255, 64, 129) !important", 3, "matTooltip", "click"], [1, "col-12"], [1, "row", "py-3"], [1, "col-12", "pt-3", "sticky-top", "bg-bifeldy"], [1, "border-bottom-dotted"], ["class", "float-end text-decoration-none text-warning", "style", "font-size: small; cursor: pointer;", 3, "click", 4, "ngIf"], ["matTooltip", "Lihat Permintaan Gabung Keanggotaan", 1, "text-bifeldy", 2, "cursor", "pointer"], [1, "col-12", 2, "max-height", "288px"], [1, "h-100", 2, "overflow-y", "auto"], [4, "ngIf"], [3, "multiple", 4, "ngIf"], ["type", "button", "mat-button", "", "color", "accent", 1, "w-100", 3, "click"], [1, "col-md-8", "col-xl-9", "pt-3"], [1, "row", "py-3", "px-0", "mt-auto"], [1, "m-0"], [3, "chipData", "chipClicked"], [1, "row"], [1, "px-0"], ["class", "row py-3", 4, "ngIf"], [3, "tabData", "count", "serverSide", "gridPageFinished", "listPageFinished", "listClicked", "gridClicked", "tableRowClicked", "paginatorClicked", "serverSideFilter", "serverSideOrder", "gridLoadNextPage", "listLoadNextPage"], [1, "fansub-banner", "fansub-banner-1", "align-items-center"], [1, "fansub-banner", "fansub-banner-2", "align-items-center"], ["mat-stroked-button", "", "matTooltip", "Kunjungi Halaman Fanpage", 1, "w-100", 2, "color", "rgb(114, 137, 218)", 3, "href"], ["mat-stroked-button", "", "matTooltip", "Kunjungi Ruang Obrolan", 1, "w-100", 2, "color", "rgb(114, 137, 218)", 3, "href"], ["src", "/assets/img/discord/blue.png", "width", "24px"], ["mat-stroked-button", "", "matTooltip", "Lihat Cuitan", 1, "w-100", 2, "color", "rgb(114, 137, 218)", 3, "href"], ["src", "/assets/img/twitter/blue.png", "width", "24px"], [1, "float-end", "text-decoration-none", "text-warning", 2, "font-size", "small", "cursor", "pointer", 3, "click"], [3, "multiple"], ["class", "h-100", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "h-100", 3, "routerLink"], ["matListAvatar", "", 1, "ms-3", 2, "border-radius", "0", 3, "src"], [1, "text-truncate", "text-decoration-none"], [1, "bg-bifeldy", "px-2", "me-1", "text-warning", 2, "position", "absolute", "right", "0"], [1, "text-success"], ["class", "h-100", 4, "ngFor", "ngForOf"], [1, "h-100"], [1, "bg-bifeldy", "px-2", "me-1", 2, "position", "absolute", "right", "0"], [1, "text-success", 2, "cursor", "pointer", 3, "click"], [1, "text-danger", 2, "cursor", "pointer", 3, "click"], [1, "text-warning", 3, "routerLink"], ["type", "button", "mat-button", "", "color", "accent", "matTooltip", "Ambil / Klaim / Dapatkan Sub-Domain Ini", 1, "w-100", "shiny", 3, "click"], [3, "panelData"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "float-end", "text-warning", 2, "font-size", "small", "cursor", "pointer", 3, "click"], [1, "text-bifeldy"], ["mat-list-icon", "", 1, "ps-3"], [1, "text-truncate", "text-decoration-none", 3, "click"], [1, "bg-bifeldy", "px-2", "me-1", "text-danger", 2, "position", "absolute", "right", "0"], [1, "text-warning", 3, "innerHtml"]], template: function FansubDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵtemplate"](0, FansubDetailComponent_div_0_Template, 60, 29, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_21__["ɵɵproperty"]("ngIf", ctx.fansubData);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_23__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_24__.MatButton, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_25__.MatTooltip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_26__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_24__.MatAnchor, _shared_components_no_data_no_data_component__WEBPACK_IMPORTED_MODULE_14__.NoDataComponent, _angular_material_list__WEBPACK_IMPORTED_MODULE_27__.MatSelectionList, _angular_common__WEBPACK_IMPORTED_MODULE_23__.NgForOf, _angular_material_list__WEBPACK_IMPORTED_MODULE_27__.MatListOption, _angular_router__WEBPACK_IMPORTED_MODULE_22__.RouterLink, _angular_material_list__WEBPACK_IMPORTED_MODULE_27__.MatListAvatarCssMatStyler, _shared_components_material_chip_material_chip_component__WEBPACK_IMPORTED_MODULE_15__.MaterialChipComponent, _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_16__.NotificationsComponent, _shared_components_material_expansion_panel_material_expansion_panel_component__WEBPACK_IMPORTED_MODULE_17__.MaterialExpansionPanelComponent, _angular_material_list__WEBPACK_IMPORTED_MODULE_27__.MatListIconCssMatStyler, _shared_components_report_report_component__WEBPACK_IMPORTED_MODULE_18__.ReportComponent, _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_19__.MaterialTabComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_23__.DatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_23__.SlicePipe, _shared_pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_20__.DateAgoPipe], styles: [".fansub-banner[_ngcontent-%COMP%] {\r\n  height: 128px;\r\n  width: 100%;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  filter: blur(5px) brightness(100%);\r\n  opacity: 0.5;\r\n}\r\n\r\n.fansub-banner-1[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.fansub-banner-2[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 128px;\r\n  left: 0;\r\n}\r\n\r\n.fansub-info[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  height: 256px;\r\n  z-index: 1;\r\n}\r\n\r\n.fansub-image[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhbnN1Yi1kZXRhaWwuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsc0JBQXNCO0VBQ3RCLDJCQUEyQjtFQUMzQiw0QkFBNEI7RUFDNUIsa0NBQWtDO0VBQ2xDLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztBQUNUOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixPQUFPO0FBQ1Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFVBQVU7QUFDWjs7QUFFQTtFQUNFLFdBQVc7QUFDYiIsImZpbGUiOiJmYW5zdWItZGV0YWlsLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZmFuc3ViLWJhbm5lciB7XHJcbiAgaGVpZ2h0OiAxMjhweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGZpbHRlcjogYmx1cig1cHgpIGJyaWdodG5lc3MoMTAwJSk7XHJcbiAgb3BhY2l0eTogMC41O1xyXG59XHJcblxyXG4uZmFuc3ViLWJhbm5lci0xIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbn1cclxuXHJcbi5mYW5zdWItYmFubmVyLTIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDEyOHB4O1xyXG4gIGxlZnQ6IDA7XHJcbn1cclxuXHJcbi5mYW5zdWItaW5mbyB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGhlaWdodDogMjU2cHg7XHJcbiAgei1pbmRleDogMTtcclxufVxyXG5cclxuLmZhbnN1Yi1pbWFnZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 62235:
/*!********************************************************************!*\
  !*** ./src/app/_pages/fansub/fansub-edit/fansub-edit.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FansubEditComponent": () => (/* binding */ FansubEditComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 71989);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 98977);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 19337);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 32673);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 8504);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../constants */ 26271);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../models/req-res.model */ 14249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/imgbb.service */ 67902);
/* harmony import */ var _shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/fansub.service */ 76781);
/* harmony import */ var _shared_services_toast_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/toast.service */ 96925);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/datepicker */ 5818);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/chips */ 81196);
/* harmony import */ var _shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/pipes/bytes.pipe */ 23626);




























function FansubEditComponent_div_0_form_7_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("Ukuran Upload Melebihi Batas ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, ctx_r3.imageLimitExceeded), " !");
} }
function FansubEditComponent_div_0_form_7_div_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r4.imageErrorText);
} }
function FansubEditComponent_div_0_form_7_div_23_Template(rf, ctx) { if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 6)(1, "button", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function FansubEditComponent_div_0_form_7_div_23_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r29); const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3); return ctx_r28.submitImage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "mat-icon", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "add_photo_alternate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, " Unggah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r5.submitted);
} }
function FansubEditComponent_div_0_form_7_div_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("Ukuran Upload Melebihi Batas ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, ctx_r7.coverLimitExceeded), " !");
} }
function FansubEditComponent_div_0_form_7_div_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r8.coverErrorText);
} }
function FansubEditComponent_div_0_form_7_div_37_Template(rf, ctx) { if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 62)(1, "button", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function FansubEditComponent_div_0_form_7_div_37_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r31); const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3); return ctx_r30.submitCover(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "mat-icon", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "add_photo_alternate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4, " Unggah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r9.submitted);
} }
function FansubEditComponent_div_0_form_7_div_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Nama Fansub Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Nama Fansub Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_small_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "small", 63)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r12.slugInfo);
} }
function FansubEditComponent_div_0_form_7_div_55_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Singkatan Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_56_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Singkatan Hanya Boleh Huruf Dan \u4E00");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_67_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Tanggal Harus Diisi Secara Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_68_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Tanggal Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_80_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Mohon Pilih Salah Satu");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_81_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Status Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_mat_chip_90_Template(rf, ctx) { if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-chip", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("removed", function FansubEditComponent_div_0_form_7_mat_chip_90_Template_mat_chip_removed_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r34); const t_r32 = restoredCtx.$implicit; const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3); return ctx_r33.removeTag(t_r32); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "mat-icon", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const t_r32 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("removable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", t_r32, " ");
} }
function FansubEditComponent_div_0_form_7_div_106_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Website Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_107_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Website Link Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_115_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Facebook Link Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_123_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Discord Link Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_131_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Twitter Link Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_132_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Discord Link Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function FansubEditComponent_div_0_form_7_div_132_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 13)(1, "mat-form-field", 43)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "URI / URL RSS v2.0 Feed");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "input", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6, "rss_feed");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, FansubEditComponent_div_0_form_7_div_132_div_8_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r27.fg.get("rss_feed").hasError("pattern"));
} }
function FansubEditComponent_div_0_form_7_Template(rf, ctx) { if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "form", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submit", function FansubEditComponent_div_0_form_7_Template_form_submit_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r37); const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2); return ctx_r36.onSubmit(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 9)(2, "div", 10)(3, "h2", 11)(4, "b", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5, "Perbaharui Data Fansub");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div", 6)(7, "div", 13)(8, "div", 14)(9, "div", 15)(10, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "img", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "mat-form-field", 17)(13, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](14, "Foto");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](15, "ngx-mat-file-input", 18, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function FansubEditComponent_div_0_form_7_Template_ngx_mat_file_input_change_15_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r37); const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](16); const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2); return ctx_r38.uploadImage($event, _r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](18, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](19, "mat-error", 21)(20, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](21, FansubEditComponent_div_0_form_7_div_21_Template, 3, 3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](22, FansubEditComponent_div_0_form_7_div_22_Template, 2, 1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](23, FansubEditComponent_div_0_form_7_div_23_Template, 5, 1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](24, "div", 24)(25, "div", 13)(26, "mat-form-field", 25)(27, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](28, "Cover");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](29, "ngx-mat-file-input", 18, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function FansubEditComponent_div_0_form_7_Template_ngx_mat_file_input_change_29_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r37); const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](30); const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2); return ctx_r39.uploadCover($event, _r6); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](31, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](32, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](33, "mat-error", 21)(34, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](35, FansubEditComponent_div_0_form_7_div_35_Template, 3, 3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](36, FansubEditComponent_div_0_form_7_div_36_Template, 2, 1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](37, FansubEditComponent_div_0_form_7_div_37_Template, 5, 1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](38, "mat-form-field", 28)(39, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](40, "Nama Fansub");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](41, "input", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](42, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](43, "wysiwyg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](44, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](45, FansubEditComponent_div_0_form_7_div_45_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](46, FansubEditComponent_div_0_form_7_div_46_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](47, "mat-form-field", 30)(48, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](49, "Singkatan");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](50, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](51, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](52, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](53, FansubEditComponent_div_0_form_7_small_53_Template, 3, 1, "small", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](54, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](55, FansubEditComponent_div_0_form_7_div_55_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](56, FansubEditComponent_div_0_form_7_div_56_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](57, "angular-editor", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](58, "mat-form-field", 34)(59, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](60, "Mulai Ada Sejak");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](61, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("focus", function FansubEditComponent_div_0_form_7_Template_input_focus_61_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r37); const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](65); return _r15.open(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](62, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](63, "mat-datepicker-toggle", 36)(64, "mat-datepicker", 37, 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](66, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](67, FansubEditComponent_div_0_form_7_div_67_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](68, FansubEditComponent_div_0_form_7_div_68_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](69, "mat-form-field", 34)(70, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](71, "Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](72, "mat-select", 39)(73, "mat-option", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](74, "Tidak Aktif");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](75, "mat-option", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](76, "Aktif");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](77, "mat-hint", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](78, "Status Kehidupan Fansub Saat Ini");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](79, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](80, FansubEditComponent_div_0_form_7_div_80_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](81, FansubEditComponent_div_0_form_7_div_81_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](82, "div", 13)(83, "div", 6)(84, "div", 13)(85, "mat-form-field", 43)(86, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](87, "Tags & Kategori");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](88, "mat-chip-list", null, 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](90, FansubEditComponent_div_0_form_7_mat_chip_90_Template, 4, 2, "mat-chip", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](91, "input", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("matChipInputTokenEnd", function FansubEditComponent_div_0_form_7_Template_input_matChipInputTokenEnd_91_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r37); const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2); return ctx_r41.addTag($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](92, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](93, "loyalty");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](94, "mat-hint", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](95, "Isi Dengan Bebas, Pisahkan Dengan Koma");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](96, "div", 13)(97, "div", 6)(98, "div", 13)(99, "mat-form-field", 47)(100, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](101, "Tautan Website");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](102, "input", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](103, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](104, "web");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](105, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](106, FansubEditComponent_div_0_form_7_div_106_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](107, FansubEditComponent_div_0_form_7_div_107_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](108, "mat-form-field", 47)(109, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](110, "Facebook Fanpage");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](111, "input", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](112, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](113, "facebook");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](114, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](115, FansubEditComponent_div_0_form_7_div_115_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](116, "mat-form-field", 47)(117, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](118, "Tautan Discord");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](119, "input", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](120, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](121, "img", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](122, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](123, FansubEditComponent_div_0_form_7_div_123_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](124, "mat-form-field", 47)(125, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](126, "Cuitan Twitter");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](127, "input", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](128, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](129, "img", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](130, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](131, FansubEditComponent_div_0_form_7_div_131_Template, 2, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](132, FansubEditComponent_div_0_form_7_div_132_Template, 9, 2, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](133, "div", 13)(134, "div", 6)(135, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](136, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](137, "div", 56)(138, "a", 57)(139, "mat-icon", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](140, "undo");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](141, " Batal ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](142, "div", 56)(143, "button", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](144, " Simpan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](145, "mat-icon", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](146, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()()()()()();
} if (rf & 2) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](65);
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](89);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("formGroup", ctx_r1.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", ctx_r1.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r1.fg.value.image)("accept", "image/gif, image/jpeg, image/jpg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.imageLimitExceeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.imageErrorText);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.image && !ctx_r1.fg.value.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r1.fg.value.cover)("accept", "image/gif, image/jpeg, image/jpg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.coverLimitExceeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.coverErrorText);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.cover && !ctx_r1.fg.value.cover);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("name").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("name").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.slugInfo);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("slug").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("slug").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("config", ctx_r1.GS.angularEditorConfig);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](62, 50, ctx_r1.currentDate, "d MMMM y"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("matDatepicker", _r15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("for", _r15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("born").hasError("required") || ctx_r1.fg.get("born").hasError("matDatepickerParse"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("born").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("active").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("active").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r1.fg.value.tags);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("matChipInputSeparatorKeyCodes", ctx_r1.GS.separatorKeysCodes)("matChipInputFor", _r20)("matChipInputAddOnBlur", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("web").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("web").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("facebook").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate1"]("src", "/assets/img/discord/", ctx_r1.GS.isDarkMode ? "white" : "black", ".png", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("discord").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate1"]("src", "/assets/img/twitter/", ctx_r1.GS.isDarkMode ? "white" : "black", ".png", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("twitter").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r1.rssFeedAllowed);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r1.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r1.submitted || ctx_r1.fg.invalid || !ctx_r1.fg.dirty);
} }
function FansubEditComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "app-notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 5)(6, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, FansubEditComponent_div_0_form_7_Template, 147, 53, "form", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("background-image", "url(" + ctx_r0.cover_url + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg);
} }
class FansubEditComponent {
    constructor(fb, router, bs, activatedRoute, pi, imgbb, fansub, toast, as, gs) {
        this.fb = fb;
        this.router = router;
        this.bs = bs;
        this.activatedRoute = activatedRoute;
        this.pi = pi;
        this.imgbb = imgbb;
        this.fansub = fansub;
        this.toast = toast;
        this.as = as;
        this.gs = gs;
        this.fansubSlug = '';
        this.submitted = false;
        this.image = null;
        this.imageErrorText = null;
        this.imageLimitExceeded = null;
        this.image_url = '/assets/img/form/no-image.png';
        this.image_url_original = null;
        this.cover = null;
        this.coverErrorText = null;
        this.coverLimitExceeded = null;
        this.cover_url = '/assets/img/form/no-image.png';
        this.cover_url_original = null;
        this.urls = [];
        this.currentDate = new Date();
        this.gambar = null;
        this.gambar_ = null;
        this.subsActRoute = null;
        this.subsFansubUpdate = null;
        this.subsFansubDetail = null;
        this.subsImgbb = null;
        this.subsCekFansubSlug = null;
        this.subsFansubMemberGet = null;
        this.slugInfo = '';
        this.editable = true;
        this.approvedMembers = [];
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get GS() {
        return this.gs;
    }
    get rssFeedAllowed() {
        var _a, _b, _c, _d, _e, _f;
        return (((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN ||
            ((_d = (_c = this.as.currentUserSubject) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR ||
            ((_f = (_e = this.as.currentUserSubject) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER);
    }
    ngOnDestroy() {
        var _a, _b, _c, _d, _e;
        (_a = this.subsActRoute) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsFansubUpdate) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsFansubDetail) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsImgbb) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.subsFansubMemberGet) === null || _e === void 0 ? void 0 : _e.unsubscribe();
    }
    ngOnInit() {
        this.pi.updatePageMetaData(`Fansub - Ubah Data`, `Halaman Pembaharuan Data Fansub`, `Ubah Fansub`);
        if (this.gs.isBrowser) {
            this.fansubSlug = this.activatedRoute.snapshot.paramMap.get('fansubSlug');
            this.bs.busy();
            this.subsFansubDetail = this.fansub.getFansub(this.fansubSlug).subscribe({
                next: res => {
                    this.gs.log('[FANSUB_DETAIL_SUCCESS]', res);
                    this.bs.idle();
                    this.editable = res.result.editable;
                    if (!this.editable) {
                        this.toast.warning('Data Fansub Ini Tidak Dapat Diubah', 'Whoops!', null, true);
                        this.router.navigateByUrl(`/fansub/${this.fansubSlug}`);
                    }
                    else {
                        this.bs.busy();
                        this.subsFansubMemberGet = this.fansub.getFansubMember(this.fansubSlug).subscribe({
                            next: r => {
                                var _a, _b, _c, _d, _e, _f;
                                this.gs.log('[FANSUB_EDIT_MEMBER_LIST_SUCCESS]', r);
                                this.bs.idle();
                                this.approvedMembers = [];
                                for (const m of r.results) {
                                    if (m.approved) {
                                        this.approvedMembers.push(m);
                                    }
                                }
                                const index = this.approvedMembers.findIndex(m => { var _a, _b; return m.user_.id === ((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.id); });
                                if (index >= 0 || ((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN || ((_d = (_c = this.as.currentUserSubject) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR || ((_f = (_e = this.as.currentUserSubject) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.id) === res.result.user_.id) {
                                    this.initForm(res.result);
                                }
                                else {
                                    this.toast.warning('Harus Menjadi Anggota Untuk Mengubah Data!', 'Whoops!', null, true);
                                    this.router.navigateByUrl(`/fansub/${this.fansubSlug}`);
                                }
                            },
                            error: err => {
                                this.gs.log('[FANSUB_EDIT_MEMBER_LIST_ERROR]', err, 'error');
                                this.bs.idle();
                                this.router.navigate(['/error'], {
                                    queryParams: {
                                        returnUrl: `/fansub/${this.fansubSlug}`
                                    }
                                });
                            }
                        });
                    }
                },
                error: err => {
                    this.gs.log('[FANSUB_DETAIL_ERROR]', err, 'error');
                    this.bs.idle();
                    this.router.navigate(['/error'], {
                        queryParams: {
                            returnUrl: `/fansub/${this.fansubSlug}`
                        }
                    });
                }
            });
        }
    }
    initForm(data) {
        this.image_url = data.image_url;
        this.image_url_original = this.image_url;
        this.cover_url = data.cover_url;
        this.cover_url_original = this.cover_url;
        const urls = data.urls;
        const WEB = urls.find(u => u.name === 'web');
        const FACEBOOK = urls.find(u => u.name === 'facebook');
        const DISCORD = urls.find(u => u.name === 'discord');
        const TWITTER = urls.find(u => u.name === 'twitter');
        const ACTIVE = data.active === true ? '1' : '0';
        this.fg = this.fb.group({
            name: [data.name, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexEnglishKeyboardKeys)])],
            description: [data.description, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexEnglishKeyboardKeys)])],
            born: [data.born, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexEnglishKeyboardKeys)])],
            active: [ACTIVE, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexEnglishKeyboardKeys)])],
            slug: [{ value: data.slug, disabled: data.dns_id }, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(/^[0-9a-zA-Z-]*$/)])],
            tags: [data.tags, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([])],
            image: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexUrl)])],
            cover: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexUrl)])],
            web: [((WEB === null || WEB === void 0 ? void 0 : WEB.url) || null), _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexUrl)])],
            facebook: [((FACEBOOK === null || FACEBOOK === void 0 ? void 0 : FACEBOOK.url) || null), _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexUrl)])],
            discord: [((DISCORD === null || DISCORD === void 0 ? void 0 : DISCORD.url) || null), _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexUrl)])],
            twitter: [((TWITTER === null || TWITTER === void 0 ? void 0 : TWITTER.url) || null), _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexUrl)])],
            rss_feed: [data.rss_feed, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.regexUrl)])]
        });
        this.subsCekFansubSlug = this.fg.get('slug').valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.debounceTime)(500), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.tap)(() => this.slugInfo = 'Mengecek ...'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.switchMap)(slugQuery => this.fansub.cekSlug({ slug: slugQuery })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.retry)(-1)).subscribe({
            next: res => {
                this.gs.log('[FANSUB_CEK_SLUG_RESULT]', res);
                this.slugInfo = res.result.message;
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
    uploadCover(event, gambar_) {
        this.gambar_ = gambar_;
        this.cover = null;
        this.coverLimitExceeded = null;
        this.coverErrorText = null;
        this.fg.controls['cover'].patchValue(null);
        this.fg.controls['cover'].markAsPristine();
        const file = event.target.files[0];
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
                this.gs.log('[COVER_SELECTED]', e);
                if (file.size <= _constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.fileSizeImageLimit) {
                    const img = this.gs.document.createElement('img');
                    img.onload = () => {
                        this.cover = file;
                        this.cover_url = reader.result.toString();
                    };
                    img.src = reader.result.toString();
                }
                else {
                    this.cover = null;
                    this.cover_url = '/assets/img/form/image-error.png';
                    this.coverLimitExceeded = _constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.fileSizeImageLimit;
                    this.gambar_.clear(event);
                }
            };
        }
        catch (error) {
            this.cover = null;
            this.cover_url = this.cover_url_original;
            this.gambar_.clear(event);
        }
    }
    submitCover() {
        this.submitted = true;
        this.subsImgbb = this.imgbb.uploadImage({
            file: this.cover
        }).subscribe({
            next: res => {
                this.gs.log('[COVER_SUCCESS]', res);
                this.fg.controls['cover'].patchValue(res.result.url);
                this.fg.controls['cover'].markAsDirty();
                this.submitted = false;
            },
            error: err => {
                var _a;
                this.gs.log('[COVER_ERROR]', err, 'error');
                this.fg.controls['cover'].patchValue(null);
                this.fg.controls['cover'].markAsPristine();
                this.submitted = false;
                this.coverErrorText = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
            }
        });
    }
    onSubmit() {
        this.bs.busy();
        const urls = [];
        if (this.fg.value.web) {
            urls.push({ name: 'web', url: this.fg.value.web });
        }
        if (this.fg.value.facebook) {
            urls.push({ name: 'facebook', url: this.fg.value.facebook });
        }
        if (this.fg.value.discord) {
            urls.push({ name: 'discord', url: this.fg.value.discord });
        }
        if (this.fg.value.twitter) {
            urls.push({ name: 'twitter', url: this.fg.value.twitter });
        }
        const body = this.gs.getDirtyValues(this.fg);
        if ('web' in body) {
            delete body.web;
        }
        if ('facebook' in body) {
            delete body.facebook;
        }
        if ('discord' in body) {
            delete body.discord;
        }
        if ('twitter' in body) {
            delete body.twitter;
        }
        body.urls = urls;
        this.gs.log('[FANSUB_EDIT_DIRTY]', body);
        this.submitted = true;
        if (this.fg.invalid || urls.length === 0) {
            if (urls.length === 0) {
                this.toast.warning('Harap Isi Salah Satu URL', 'Form Tidak lengkap (Web/FB/DC)', null, true);
            }
            this.submitted = false;
            this.bs.idle();
            return;
        }
        this.subsFansubUpdate = this.fansub.updateFansub(this.fansubSlug, {
            ...body
        }).subscribe({
            next: res => {
                this.gs.log('[FANSUB_EDIT_SUCCESS]', res);
                this.submitted = false;
                this.bs.idle();
                this.router.navigateByUrl(`/fansub/${res.result.slug}`);
            },
            error: err => {
                this.gs.log('[FANSUB_EDIT_ERROR]', err, 'error');
                this.submitted = false;
                this.bs.idle();
            }
        });
    }
}
FansubEditComponent.ɵfac = function FansubEditComponent_Factory(t) { return new (t || FansubEditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_18__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_18__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_3__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_4__.ImgbbService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_5__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_toast_service__WEBPACK_IMPORTED_MODULE_6__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_7__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_8__.GlobalService)); };
FansubEditComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: FansubEditComponent, selectors: [["app-fansub-edit"]], decls: 1, vars: 1, consts: [["class", "container", 4, "ngIf"], [1, "container"], [1, "fansub-banner", "fansub-banner-1", "align-items-center"], [1, "fansub-banner", "fansub-banner-2", "align-items-center"], [2, "padding-top", "160px"], [1, "row", "px-3"], [1, "col-12"], [3, "formGroup", "submit", 4, "ngIf"], [3, "formGroup", "submit"], [1, "row", "mt-3", "mb-3"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "row"], [1, "col-12", "col-md-5", "col-xl-4", "p-3"], [1, "row", "mb-3"], [1, "w-100", "border", 3, "src"], ["appearance", "outline", 1, "pt-3", "w-100", 3, "color"], [1, "w-100", 3, "disabled", "accept", "change"], ["gambar", ""], ["matSuffix", ""], [1, "px-3", "w-100"], [4, "ngIf"], ["class", "col-12", 4, "ngIf"], [1, "col-12", "col-md-7", "col-xl-8", "pt-3"], ["appearance", "outline", 1, "px-3", "pt-3", "w-100", 3, "color"], ["gambar_", ""], ["class", "col-12 p-3", 4, "ngIf"], ["appearance", "outline", 1, "p-3", "col-12", "col-md-7", 3, "color"], ["matInput", "", "formControlName", "name", "placeholder", "Fansub Jalanan"], ["appearance", "outline", "matTooltip", "Digunakan Juga Untuk Sub-Domain", 1, "p-3", "col-12", "col-md-5", 3, "color"], ["matInput", "", "formControlName", "slug", "placeholder", "Jalsub"], ["class", "text-info", 4, "ngIf"], ["formControlName", "description", 1, "p-3", "w-100", 3, "config"], ["appearance", "outline", 1, "p-3", "col-12", "col-md-6", 3, "color"], ["matInput", "", "formControlName", "born", 3, "matDatepicker", "placeholder", "focus"], ["matSuffix", "", 3, "for"], ["disabled", "false"], ["kalender", ""], ["formControlName", "active", "placeholder", "Aktif / Non-Aktif"], ["value", "0"], ["value", "1"], ["align", "end"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["tag", ""], ["color", "accent", "selected", "", 3, "removable", "removed", 4, "ngFor", "ngForOf"], ["placeholder", "Label Tag / Kategori", 3, "matChipInputSeparatorKeyCodes", "matChipInputFor", "matChipInputAddOnBlur", "matChipInputTokenEnd"], ["appearance", "outline", 1, "p-3", "col-12", "col-md-3", 3, "color"], ["matInput", "", "formControlName", "web", "placeholder", "http://www.domain.id"], ["matInput", "", "formControlName", "facebook", "placeholder", "http://www.facebook.com"], ["matInput", "", "formControlName", "discord", "placeholder", "http://www.discord.gg"], ["width", "24px", 2, "vertical-align", "baseline", 3, "src"], ["matInput", "", "formControlName", "twitter", "placeholder", "http://www.twitter.com"], ["class", "row", 4, "ngIf"], [1, "row", "gy-3"], [1, "col", "g-0"], [1, "col-12", "col-md-3"], ["mat-stroked-button", "", "routerLink", "../", 1, "w-100", 3, "disabled"], [1, "me-1"], ["type", "submit", "mat-flat-button", "", "color", "accent", 1, "w-100", 3, "disabled"], [1, "ms-1"], ["type", "button", "mat-raised-button", "", "color", "primary", 1, "w-100", 3, "disabled", "click"], [1, "col-12", "p-3"], [1, "text-info"], ["color", "accent", "selected", "", 3, "removable", "removed"], ["matChipRemove", ""], ["matInput", "", "formControlName", "rss_feed", "placeholder", "http://my-site.blogspot.com/feeds/posts/default?alt=rss"]], template: function FansubEditComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, FansubEditComponent_div_0_Template, 8, 3, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.fg);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_9__.NotificationsComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatLabel, ngx_material_file_input__WEBPACK_IMPORTED_MODULE_21__.FileInputComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_22__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatError, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_24__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControlName, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_25__.MatTooltip, _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_26__.AngularEditorComponent, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_27__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_27__.MatDatepickerToggle, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_27__.MatDatepicker, _angular_material_select__WEBPACK_IMPORTED_MODULE_28__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_29__.MatOption, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_20__.MatHint, _angular_material_chips__WEBPACK_IMPORTED_MODULE_30__.MatChipList, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgForOf, _angular_material_chips__WEBPACK_IMPORTED_MODULE_30__.MatChip, _angular_material_chips__WEBPACK_IMPORTED_MODULE_30__.MatChipRemove, _angular_material_chips__WEBPACK_IMPORTED_MODULE_30__.MatChipInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_18__.RouterLinkWithHref], pipes: [_shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_10__.BytesPipe, _angular_common__WEBPACK_IMPORTED_MODULE_19__.DatePipe], styles: [".fansub-banner[_ngcontent-%COMP%] {\r\n  height: 128px;\r\n  width: 100%;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  filter: blur(5px) brightness(100%);\r\n  opacity: 0.5;\r\n}\r\n\r\n.fansub-banner-1[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.fansub-banner-2[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 128px;\r\n  left: 0;\r\n}\r\n\r\n.fansub-info[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  height: 256px;\r\n  z-index: 1;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhbnN1Yi1lZGl0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2IsV0FBVztFQUNYLHNCQUFzQjtFQUN0QiwyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLGtDQUFrQztFQUNsQyxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87QUFDVDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsT0FBTztBQUNUOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixVQUFVO0FBQ1oiLCJmaWxlIjoiZmFuc3ViLWVkaXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mYW5zdWItYmFubmVyIHtcclxuICBoZWlnaHQ6IDEyOHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgZmlsdGVyOiBibHVyKDVweCkgYnJpZ2h0bmVzcygxMDAlKTtcclxuICBvcGFjaXR5OiAwLjU7XHJcbn1cclxuXHJcbi5mYW5zdWItYmFubmVyLTEge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxufVxyXG5cclxuLmZhbnN1Yi1iYW5uZXItMiB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMTI4cHg7XHJcbiAgbGVmdDogMDtcclxufVxyXG5cclxuLmZhbnN1Yi1pbmZvIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgaGVpZ2h0OiAyNTZweDtcclxuICB6LWluZGV4OiAxO1xyXG59Il19 */"] });


/***/ }),

/***/ 6290:
/*!********************************************************************!*\
  !*** ./src/app/_pages/fansub/fansub-list/fansub-list.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FansubListComponent": () => (/* binding */ FansubListComponent)
/* harmony export */ });
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-charts */ 2277);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/fansub.service */ 76781);
/* harmony import */ var _shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/winbox.service */ 88020);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/material-tab/material-tab.component */ 18757);












function FansubListComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "canvas", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("data", ctx_r0.barChartAnimeData)("labels", ctx_r0.barChartAnimeLabels)("chartType", ctx_r0.barChartType)("options", ctx_r0.barChartAnimeOptions)("plugins", ctx_r0.chartPlugins)("legend", false);
} }
function FansubListComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "canvas", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("data", ctx_r1.barChartDoramaData)("labels", ctx_r1.barChartDoramaLabels)("chartType", ctx_r1.barChartType)("options", ctx_r1.barChartDoramaOptions)("plugins", ctx_r1.chartPlugins)("legend", false);
} }
function FansubListComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "canvas", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("data", ctx_r2.pieChartStatusData)("labels", ctx_r2.pieChartStatusLabels)("chartType", ctx_r2.pieChartType)("options", ctx_r2.pieChartStatusOptions)("plugins", ctx_r2.chartPlugins)("legend", true);
} }
function FansubListComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "canvas", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("data", ctx_r3.doughnutChartGarapanData)("labels", ctx_r3.doughnutChartGarapanLabels)("chartType", ctx_r3.doughnutChartType)("options", ctx_r3.doughnutChartGarapanOptions)("plugins", ctx_r3.chartPlugins)("legend", true);
} }
class FansubListComponent {
    constructor(activatedRoute, router, gs, bs, fs, fansub, wb) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.gs = gs;
        this.bs = bs;
        this.fs = fs;
        this.fansub = fansub;
        this.wb = wb;
        this.allFansubId = [];
        this.fansubData = [];
        this.tabData = [
            {
                name: 'Katalog Fansub',
                icon: 'closed_caption',
                type: 'table',
                data: {
                    column: ['Status', 'Logo', 'Nama Fansub', 'Anime', 'Dorama', 'Tautan Komunitas'],
                    row: []
                }
            }
        ];
        this.pieChartStatusOptions = {
            title: {
                display: true,
                text: 'Kondisi Fansub Terkini'
            },
            responsive: true,
            legend: {
                position: 'right'
            },
        };
        this.doughnutChartGarapanOptions = {
            title: {
                display: true,
                text: 'Total Garapan Fansub'
            },
            responsive: true,
            legend: {
                position: 'right'
            },
        };
        this.barChartAnimeOptions = {
            title: {
                display: true,
                text: 'Garapan Anime Terbanyak'
            },
            responsive: true,
            legend: {
                position: 'right'
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            color: 'rgba(92,92,92,1)'
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            color: 'rgba(92,92,92,1)'
                        }
                    }
                ]
            }
        };
        this.barChartDoramaOptions = {
            title: {
                display: true,
                text: 'Garapan Dorama Terbanyak'
            },
            responsive: true,
            legend: {
                position: 'right'
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            color: 'rgba(92,92,92,1)'
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            color: 'rgba(92,92,92,1)'
                        }
                    }
                ]
            }
        };
        this.chartPlugins = [];
        this.pieChartStatusData = [];
        this.pieChartStatusLabels = [];
        this.doughnutChartGarapanData = [];
        this.doughnutChartGarapanLabels = [];
        this.barChartAnimeData = [];
        this.barChartAnimeLabels = [];
        this.barChartDoramaData = [];
        this.barChartDoramaLabels = [];
        this.pieChartType = 'pie';
        this.doughnutChartType = 'doughnut';
        this.barChartType = 'horizontalBar';
        this.fansubActive = 0;
        this.fansubInActive = 0;
        this.subsFansub = null;
        this.subsAnime = null;
        this.subsDorama = null;
        this.subsQueryParam = null;
        this.gs.bannerImg = '/assets/img/banner/fansub.png';
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
        if (this.gs.isBrowser) {
            (0,ng2_charts__WEBPACK_IMPORTED_MODULE_8__.monkeyPatchChartJsTooltip)();
            (0,ng2_charts__WEBPACK_IMPORTED_MODULE_8__.monkeyPatchChartJsLegend)();
        }
    }
    ngOnDestroy() {
        var _a, _b, _c;
        (_a = this.subsFansub) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsAnime) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsQueryParam) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.watchUrlRoute();
        }
    }
    watchUrlRoute() {
        this.subsQueryParam = this.activatedRoute.queryParams.subscribe({
            next: qp => {
                this.bs.busy();
                this.allFansubId = [];
                this.fansubData = [];
                this.fansubActive = 0;
                this.fansubInActive = 0;
                this.doughnutChartGarapanLabels = [];
                this.doughnutChartGarapanData = [];
                this.barChartAnimeLabels = [];
                this.barChartAnimeData = [];
                this.barChartDoramaLabels = [];
                this.barChartDoramaData = [];
                this.bs.idle();
                this.getFansubData();
            }
        });
    }
    getFansubData() {
        this.bs.busy();
        this.subsFansub = this.fansub.getAllFansub().subscribe({
            next: res => {
                this.gs.log('[FANSUB_LIST_SUCCESS]', res);
                for (const r of res.results) {
                    this.allFansubId.push(r.id);
                    const tautanLink = [];
                    if (Array.isArray(r.urls)) {
                        for (const i of r.urls) {
                            tautanLink.push({
                                type: 'button',
                                icon: (i.name === 'discord' || i.name === 'twitter' ? undefined : i.name),
                                image: (i.name === 'discord' ? '/assets/img/discord/blue.png' : (i.name === 'twitter' ? '/assets/img/twitter/blue.png' : undefined)),
                                url: i.url,
                                name: i.name
                            });
                        }
                    }
                    this.fansubData.push({
                        id: r.id,
                        slug: r.slug,
                        Logo: r.image_url,
                        Status: r.active ? 'AKTIF' : 'TIDAK AKTIF',
                        'Nama Fansub': r.name,
                        'Tautan Komunitas': tautanLink
                    });
                    if (r.active) {
                        this.fansubActive++;
                    }
                    else if (!r.active) {
                        this.fansubInActive++;
                    }
                }
                this.pieChartStatusLabels = ['Aktif', 'Tidak Aktif'];
                this.pieChartStatusData = [this.fansubActive, this.fansubInActive];
                this.tabData[0].data.row = this.fansubData;
                this.getAnimeFansub();
                this.getDoramaFansub();
                this.fs.initializeFab('add', null, 'Tambahkan Fansub Baru', '/create/fansub', false);
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[FANSUB_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getAnimeFansub() {
        this.bs.busy();
        this.subsAnime = this.fansub.getAnimeFansub(this.allFansubId).subscribe({
            next: res => {
                this.gs.log('[FANSUB_ANIME_SUCCESS]', res);
                for (const f of this.fansubData) {
                    f.Anime = res.results[f.id];
                }
                this.doughnutChartGarapanLabels.push('Anime');
                this.doughnutChartGarapanData.push(res.count);
                const fansubRank = [...this.fansubData].sort((a, b) => b.Anime - a.Anime).slice(0, 10);
                for (const f of fansubRank) {
                    this.barChartAnimeLabels.push(f['Nama Fansub']);
                    this.barChartAnimeData.push(f.Anime);
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[FANSUB_ANIME_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getDoramaFansub() {
        this.bs.busy();
        this.subsDorama = this.fansub.getDoramaFansub(this.allFansubId).subscribe({
            next: res => {
                this.gs.log('[FANSUB_DORAMA_SUCCESS]', res);
                for (const f of this.fansubData) {
                    f.Dorama = res.results[f.id];
                }
                this.doughnutChartGarapanLabels.push('Dorama');
                this.doughnutChartGarapanData.push(res.count);
                const fansubRank = [...this.fansubData].sort((a, b) => b.Dorama - a.Dorama).slice(0, 10);
                for (const f of fansubRank) {
                    this.barChartDoramaLabels.push(f['Nama Fansub']);
                    this.barChartDoramaData.push(f.Dorama);
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[FANSUB_DORAMA_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    openFansub(data) {
        this.gs.log('[FANSUB_LIST_OPEN_FANSUB]', data);
        this.router.navigateByUrl(`/fansub/${data.slug}`);
    }
    openUrl(data) {
        this.gs.log('[FANSUB_LIST_OPEN_URL]', data);
        this.wb.winboxOpenUri(data.url);
    }
}
FansubListComponent.ɵfac = function FansubListComponent_Factory(t) { return new (t || FansubListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_2__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_3__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_4__.WinboxService)); };
FansubListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: FansubListComponent, selectors: [["app-fansub-list"]], decls: 9, vars: 5, consts: [[1, "container"], [1, "row", "p-3"], ["class", "col-12 col-md-6 py-1 bg-bifeldy", 4, "ngIf"], [1, "row", "pt-3"], [3, "tabData", "tableRowClicked", "buttonClicked"], [1, "col-12", "col-md-6", "py-1", "bg-bifeldy"], ["baseChart", "", 3, "data", "labels", "chartType", "options", "plugins", "legend"]], template: function FansubListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 0)(2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, FansubListComponent_div_3_Template, 2, 6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, FansubListComponent_div_4_Template, 2, 6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, FansubListComponent_div_5_Template, 2, 6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, FansubListComponent_div_6_Template, 2, 6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 3)(8, "app-material-tab", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("tableRowClicked", function FansubListComponent_Template_app_material_tab_tableRowClicked_8_listener($event) { return ctx.openFansub($event); })("buttonClicked", function FansubListComponent_Template_app_material_tab_buttonClicked_8_listener($event) { return ctx.openUrl($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.barChartAnimeData.length > 0 && ctx.barChartAnimeLabels.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.barChartDoramaData.length > 0 && ctx.barChartDoramaLabels.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.pieChartStatusData.length === 2 && ctx.pieChartStatusLabels.length === 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.doughnutChartGarapanData.length === 2 && ctx.doughnutChartGarapanLabels.length === 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("tabData", ctx.tabData);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_5__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, ng2_charts__WEBPACK_IMPORTED_MODULE_8__.BaseChartDirective, _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_6__.MaterialTabComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmYW5zdWItbGlzdC5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 26139:
/*!************************************************!*\
  !*** ./src/app/_pages/fansub/fansub.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FansubModule": () => (/* binding */ FansubModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng2-charts */ 2277);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ 26271);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/req-res.model */ 14249);
/* harmony import */ var _shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/guards/roles.guard */ 2777);
/* harmony import */ var _shared_guards_verified_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/guards/verified.guard */ 55094);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/pipes/custom-pipe.module */ 67355);
/* harmony import */ var _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/components/material-tab/material-tab.module */ 66436);
/* harmony import */ var _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/components/material-chip/material-chip.module */ 54946);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _shared_components_material_expansion_panel_material_expansion_panel_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../_shared/components/material-expansion-panel/material-expansion-panel.module */ 6020);
/* harmony import */ var _shared_components_report_report_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../_shared/components/report/report.module */ 54167);
/* harmony import */ var _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../_shared/components/no-data/no-data.module */ 12438);
/* harmony import */ var _fansub_list_fansub_list_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./fansub-list/fansub-list.component */ 6290);
/* harmony import */ var _fansub_detail_fansub_detail_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./fansub-detail/fansub-detail.component */ 27990);
/* harmony import */ var _fansub_edit_fansub_edit_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./fansub-edit/fansub-edit.component */ 62235);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 3184);























const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _fansub_list_fansub_list_component__WEBPACK_IMPORTED_MODULE_12__.FansubListComponent
    },
    {
        path: ':fansubSlug',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: _fansub_detail_fansub_detail_component__WEBPACK_IMPORTED_MODULE_13__.FansubDetailComponent
            },
            {
                path: 'edit',
                component: _fansub_edit_fansub_edit_component__WEBPACK_IMPORTED_MODULE_14__.FansubEditComponent,
                canActivate: [_shared_guards_verified_guard__WEBPACK_IMPORTED_MODULE_3__.VerifiedGuard, _shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
                data: {
                    title: 'Fansub - Ubah Data',
                    description: 'Halaman Pembaharuan Data Fansub',
                    keywords: 'Ubah Fansub',
                    [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorVerifiedOnly]: true,
                    [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER]
                }
            }
        ]
    }
];
class FansubModule {
}
FansubModule.ɵfac = function FansubModule_Factory(t) { return new (t || FansubModule)(); };
FansubModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineNgModule"]({ type: FansubModule });
FansubModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_16__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_17__.RouterModule.forChild(routes),
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__.SharedMaterialModule,
            _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_6__.MaterialTabModule,
            _shared_components_material_expansion_panel_material_expansion_panel_module__WEBPACK_IMPORTED_MODULE_9__.MaterialExpansionPanelModule,
            _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_7__.MaterialChipModule,
            ng2_charts__WEBPACK_IMPORTED_MODULE_18__.ChartsModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__.NotificationsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_19__.ReactiveFormsModule,
            ngx_material_file_input__WEBPACK_IMPORTED_MODULE_20__.MaterialFileInputModule,
            _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_21__.AngularEditorModule,
            _shared_components_report_report_module__WEBPACK_IMPORTED_MODULE_10__.ReportModule,
            _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_5__.CustomPipeModule,
            _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_11__.NoDataModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetNgModuleScope"](FansubModule, { declarations: [_fansub_list_fansub_list_component__WEBPACK_IMPORTED_MODULE_12__.FansubListComponent,
        _fansub_detail_fansub_detail_component__WEBPACK_IMPORTED_MODULE_13__.FansubDetailComponent,
        _fansub_edit_fansub_edit_component__WEBPACK_IMPORTED_MODULE_14__.FansubEditComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_16__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_17__.RouterModule, _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__.SharedMaterialModule,
        _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_6__.MaterialTabModule,
        _shared_components_material_expansion_panel_material_expansion_panel_module__WEBPACK_IMPORTED_MODULE_9__.MaterialExpansionPanelModule,
        _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_7__.MaterialChipModule,
        ng2_charts__WEBPACK_IMPORTED_MODULE_18__.ChartsModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__.NotificationsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_19__.ReactiveFormsModule,
        ngx_material_file_input__WEBPACK_IMPORTED_MODULE_20__.MaterialFileInputModule,
        _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_21__.AngularEditorModule,
        _shared_components_report_report_module__WEBPACK_IMPORTED_MODULE_10__.ReportModule,
        _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_5__.CustomPipeModule,
        _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_11__.NoDataModule] }); })();


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
//# sourceMappingURL=src_app__pages_fansub_fansub_module_ts.js.map