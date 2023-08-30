"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_nihongo_nihongo_module_ts"],{

/***/ 99864:
/*!*****************************************************************************!*\
  !*** ./src/app/_pages/nihongo/nihongo-belajar/nihongo-belajar.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NihongoBelajarComponent": () => (/* binding */ NihongoBelajarComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/paginator */ 26439);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/req-res.model */ 14249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_toast_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/toast.service */ 96925);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_nihongo_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/nihongo.service */ 52663);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/components/material-table/material-table.component */ 30578);
/* harmony import */ var _shared_directives_dom_change_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/directives/dom-change.directive */ 49321);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/card */ 11961);
/* harmony import */ var _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/components/banner-donasi/banner-donasi.component */ 19530);
/* harmony import */ var _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../_shared/components/banner-discord/banner-discord.component */ 49933);
/* harmony import */ var _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../_shared/components/stats-server/stats-server.component */ 8921);
/* harmony import */ var _shared_components_no_data_no_data_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../_shared/components/no-data/no-data.component */ 40192);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);




























function NihongoBelajarComponent_mat_option_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "mat-option", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const k_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("value", k_r10.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](k_r10.name);
} }
function NihongoBelajarComponent_mat_form_field_12_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "mat-form-field", 21)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2, "Cari ...");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](3, "input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("keyup.enter", function NihongoBelajarComponent_mat_form_field_12_Template_input_keyup_enter_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](); return ctx_r11.applyFilter($event); })("ngModelChange", function NihongoBelajarComponent_mat_form_field_12_Template_input_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r12); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](); return ctx_r13.q = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](4, "mat-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](5, "search");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngModel", ctx_r1.q);
} }
function NihongoBelajarComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](0, "div");
} }
function NihongoBelajarComponent_ng_template_14_div_9_div_1_img_1_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "img", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function NihongoBelajarComponent_ng_template_14_div_9_div_1_img_1_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r25); const char_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]().$implicit; const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3); return ctx_r23.openDmak(char_r21); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const char_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]().$implicit;
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate2"]("src", "/assets/", ctx_r22.modeTampilan, "/", char_r21.romaji, ".png", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsanitizeUrl"]);
} }
function NihongoBelajarComponent_ng_template_14_div_9_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, NihongoBelajarComponent_ng_template_14_div_9_div_1_img_1_Template, 1, 2, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const char_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", char_r21.hiragana && char_r21.katakana);
} }
function NihongoBelajarComponent_ng_template_14_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, NihongoBelajarComponent_ng_template_14_div_9_div_1_Template, 2, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const huruf_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", huruf_r19.value);
} }
function NihongoBelajarComponent_ng_template_14_div_17_div_1_img_1_Template(rf, ctx) { if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "img", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function NihongoBelajarComponent_ng_template_14_div_17_div_1_img_1_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r33); const char_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]().$implicit; const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3); return ctx_r31.openDmak(char_r29); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const char_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]().$implicit;
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate2"]("src", "/assets/", ctx_r30.modeTampilan, "/", char_r29.romaji, ".png", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsanitizeUrl"]);
} }
function NihongoBelajarComponent_ng_template_14_div_17_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, NihongoBelajarComponent_ng_template_14_div_17_div_1_img_1_Template, 1, 2, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const char_r29 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", char_r29.hiragana && char_r29.katakana);
} }
function NihongoBelajarComponent_ng_template_14_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, NihongoBelajarComponent_ng_template_14_div_17_div_1_Template, 2, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const huruf_r27 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", huruf_r27.value);
} }
function NihongoBelajarComponent_ng_template_14_div_26_div_1_img_1_Template(rf, ctx) { if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "img", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function NihongoBelajarComponent_ng_template_14_div_26_div_1_img_1_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r41); const char_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]().$implicit; const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3); return ctx_r39.openDmak(char_r37); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const char_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]().$implicit;
    const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate2"]("src", "/assets/", ctx_r38.modeTampilan, "/", char_r37.romaji, ".png", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsanitizeUrl"]);
} }
function NihongoBelajarComponent_ng_template_14_div_26_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, NihongoBelajarComponent_ng_template_14_div_26_div_1_img_1_Template, 1, 2, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const char_r37 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", char_r37.hiragana && char_r37.katakana);
} }
function NihongoBelajarComponent_ng_template_14_div_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, NihongoBelajarComponent_ng_template_14_div_26_div_1_Template, 2, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const huruf_r35 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", huruf_r35.value);
} }
function NihongoBelajarComponent_ng_template_14_div_34_div_1_img_1_Template(rf, ctx) { if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "img", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function NihongoBelajarComponent_ng_template_14_div_34_div_1_img_1_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r49); const char_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]().$implicit; const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3); return ctx_r47.openDmak(char_r45); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const char_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]().$implicit;
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate2"]("src", "/assets/", ctx_r46.modeTampilan, "/", char_r45.romaji, ".png", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsanitizeUrl"]);
} }
function NihongoBelajarComponent_ng_template_14_div_34_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, NihongoBelajarComponent_ng_template_14_div_34_div_1_img_1_Template, 1, 2, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const char_r45 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", char_r45.hiragana && char_r45.katakana);
} }
function NihongoBelajarComponent_ng_template_14_div_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, NihongoBelajarComponent_ng_template_14_div_34_div_1_Template, 2, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const huruf_r43 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", huruf_r43.value);
} }
function NihongoBelajarComponent_ng_template_14_div_42_div_1_img_1_Template(rf, ctx) { if (rf & 1) {
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "img", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function NihongoBelajarComponent_ng_template_14_div_42_div_1_img_1_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r57); const char_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]().$implicit; const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3); return ctx_r55.openDmak(char_r53); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const char_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]().$implicit;
    const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate2"]("src", "/assets/", ctx_r54.modeTampilan, "/", char_r53.romaji, ".png", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsanitizeUrl"]);
} }
function NihongoBelajarComponent_ng_template_14_div_42_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, NihongoBelajarComponent_ng_template_14_div_42_div_1_img_1_Template, 1, 2, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const char_r53 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", char_r53.hiragana && char_r53.katakana);
} }
function NihongoBelajarComponent_ng_template_14_div_42_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, NihongoBelajarComponent_ng_template_14_div_42_div_1_Template, 2, 1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const huruf_r51 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", huruf_r51.value);
} }
function NihongoBelajarComponent_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 17)(1, "div", 3)(2, "div", 24)(3, "div", 3)(4, "div", 17)(5, "h2", 25)(6, "b", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](7, "Standar");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](8, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](9, NihongoBelajarComponent_ng_template_14_div_9_Template, 2, 1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](10, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](11, "div", 3)(12, "div", 17)(13, "h2", 25)(14, "b", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](15, "Lainnya");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](16, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](17, NihongoBelajarComponent_ng_template_14_div_17_Template, 2, 1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](18, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](19, "div", 24)(20, "div", 3)(21, "div", 17)(22, "h2", 25)(23, "b", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](24, "Dakuon");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](25, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](26, NihongoBelajarComponent_ng_template_14_div_26_Template, 2, 1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](27, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](28, "div", 3)(29, "div", 17)(30, "h2", 25)(31, "b", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](32, "Handakuon");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](33, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](34, NihongoBelajarComponent_ng_template_14_div_34_Template, 2, 1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](35, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](36, "div", 3)(37, "div", 17)(38, "h2", 25)(39, "b", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](40, "Yuon");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](41, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](42, NihongoBelajarComponent_ng_template_14_div_42_Template, 2, 1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](43, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](10, 5, ctx_r4.daftarHuruf.standard));
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](18, 7, ctx_r4.daftarHuruf.other));
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](27, 9, ctx_r4.daftarHuruf.dakuon));
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](35, 11, ctx_r4.daftarHuruf.handakuon));
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](43, 13, ctx_r4.daftarHuruf.yuon));
} }
function NihongoBelajarComponent_ng_template_16_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](0, "div");
} }
function NihongoBelajarComponent_ng_template_16_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "app-material-table", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("tableDataColumn", ctx_r61.daftarAngka.column)("tableDataRow", ctx_r61.daftarAngka.row);
} }
function NihongoBelajarComponent_ng_template_16_ng_template_3_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r68 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 40)(1, "mat-card", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function NihongoBelajarComponent_ng_template_16_ng_template_3_div_0_div_2_Template_mat_card_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r68); const d_r66 = restoredCtx.$implicit; const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](4); return ctx_r67.editDataset(d_r66); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "mat-card-header", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](3, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](4, "mat-card-title", 44)(5, "h3", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](7, "mat-card-subtitle", 46)(8, "p", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](10, "p", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const d_r66 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵstyleProp"]("background-image", "url(" + d_r66.image_url + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](d_r66.kana);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](d_r66.romaji);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](d_r66.meaning);
} }
function NihongoBelajarComponent_ng_template_16_ng_template_3_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 17)(1, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](2, NihongoBelajarComponent_ng_template_16_ng_template_3_div_0_div_2_Template, 12, 5, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", ctx_r64.daftarNihongo);
} }
function NihongoBelajarComponent_ng_template_16_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](0, NihongoBelajarComponent_ng_template_16_ng_template_3_div_0_Template, 3, 1, "div", 37);
} if (rf & 2) {
    const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](2);
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx_r63.daftarNihongo.length > 0)("ngIfElse", _r7);
} }
function NihongoBelajarComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](0, NihongoBelajarComponent_ng_template_16_div_0_Template, 1, 0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](1, NihongoBelajarComponent_ng_template_16_ng_template_1_Template, 2, 2, "ng-template", null, 33, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](3, NihongoBelajarComponent_ng_template_16_ng_template_3_Template, 1, 2, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
} if (rf & 2) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](2);
    const _r62 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](4);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx_r6.modeTampilan === "angka")("ngIfThen", _r60)("ngIfElse", _r62);
} }
function NihongoBelajarComponent_ng_template_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](0, "app-no-data", 49);
} }
function NihongoBelajarComponent_button_28_Template(rf, ctx) { if (rf & 1) {
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function NihongoBelajarComponent_button_28_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r70); const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](); return ctx_r69.addDataset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
} }
class NihongoBelajarComponent {
    constructor(router, toast, as, gs, bs, ds, nihon) {
        this.router = router;
        this.toast = toast;
        this.as = as;
        this.gs = gs;
        this.bs = bs;
        this.ds = ds;
        this.nihon = nihon;
        this.pageSizeOptions = [50, 75, 100, 125, 150];
        this.kategori = [
            { id: 'hiragana', name: 'Hiragana' },
            { id: 'katakana', name: 'Katakana' },
            { id: 'angka', name: 'Angka' }
        ];
        this.modeTampilan = 'hiragana';
        this.daftarHuruf = null;
        this.daftarNihongo = [];
        this.daftarAngka = {
            column: ['Angka', 'Kana', 'Romaji'],
            row: []
        };
        this.count = 0;
        this.page = 1;
        this.row = 50;
        this.q = '';
        this.subsDialog = null;
        this.subsHirakata = null;
        this.subsAllNihongo = null;
        this.subsAllKategori = null;
        this.dummyDataset = [
            { category: 'number', meaning: 0, kana: '零／ゼロ', romaji: 'Rei/Zero' },
            { category: 'number', meaning: 1, kana: '一', romaji: 'Ichi' },
            { category: 'number', meaning: 2, kana: '二', romaji: 'Ni' },
            { category: 'number', meaning: 3, kana: '三', romaji: 'San' },
            { category: 'number', meaning: 4, kana: '四', romaji: 'Yon/Shi' },
            { category: 'number', meaning: 5, kana: '五', romaji: 'Go' },
            { category: 'number', meaning: 6, kana: '六', romaji: 'Roku' },
            { category: 'number', meaning: 7, kana: '七', romaji: 'Nana' },
            { category: 'number', meaning: 8, kana: '八', romaji: 'Hachi' },
            { category: 'number', meaning: 9, kana: '九', romaji: 'Kyuu/Ku' },
            { category: 'number', meaning: 10, kana: '十', romaji: 'Jyuu' },
            { category: 'number', meaning: 11, kana: '十一', romaji: 'Jyuu Ichi' },
            { category: 'number', meaning: 12, kana: '十二', romaji: 'Jyuu Ni' },
            { category: 'number', meaning: 20, kana: '二十', romaji: 'Ni Jyuu' },
            { category: 'number', meaning: 21, kana: '二十一', romaji: 'Ni Jyuu Ichi' },
            { category: 'number', meaning: 30, kana: '三十', romaji: 'San Jyuu' },
            { category: 'number', meaning: 100, kana: '百', romaji: 'Hyaku' },
            { category: 'number', meaning: 101, kana: '百一', romaji: 'Hyaku Ichi' },
            { category: 'number', meaning: 123, kana: '百二十三', romaji: 'Hyaku Ni Jyuu San' },
            { category: 'number', meaning: 300, kana: '三百', romaji: 'San Byaku' },
            { category: 'number', meaning: 600, kana: '六百', romaji: 'Roppyaku' },
            { category: 'number', meaning: 800, kana: '八百', romaji: 'Happyaku' },
            { category: 'number', meaning: 1000, kana: '千', romaji: 'Sen' },
            { category: 'number', meaning: 3000, kana: '三千', romaji: 'San Zen' },
            { category: 'number', meaning: 8000, kana: '八千', romaji: 'Hassen' },
            { category: 'number', meaning: 10000, kana: '一万', romaji: 'Ichi-Man' },
            { category: 'number', meaning: 100000, kana: '十万', romaji: 'Jyuu-Man' },
            { category: 'number', meaning: 1000000, kana: '百万', romaji: 'Hyaku-Man' }
        ];
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getHirakata();
            this.getAngka();
            this.getKategori();
            if (!this.gs.isDarkMode) {
                this.gs.toggleDarkTheme();
            }
        }
    }
    ngOnDestroy() {
        var _a, _b, _c, _d;
        (_a = this.subsDialog) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsHirakata) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsAllNihongo) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsAllKategori) === null || _d === void 0 ? void 0 : _d.unsubscribe();
    }
    changeModeTampilan(data) {
        this.gs.log('[BELAJAR_CHANGE_KANA]', data);
        this.modeTampilan = data;
        this.count = 0;
        this.page = 1;
        this.row = 50;
        this.q = '';
        this.resetPaginator();
    }
    applyFilter(event) {
        this.gs.log('[BELAJAR_SEARCH_VALUE_CHANGED]', event);
        this.q = event.target.value.trim().toLowerCase();
        this.resetPaginator();
    }
    paginatorChanged(data) {
        this.gs.log('[BELAJAR_PAGINATOR_VALUE_CHANGED]', data);
        this.page = data.pageIndex + 1;
        this.row = data.pageSize;
        if (!this.gs.includesOneOf(this.modeTampilan, ['hiragana', 'katakana', 'angka'])) {
            this.daftarNihongo = [];
            this.getData();
        }
    }
    resetPaginator() {
        var _a, _b;
        (_a = this.paginator) === null || _a === void 0 ? void 0 : _a._changePageSize(this.pageSizeOptions[0]);
        (_b = this.paginator) === null || _b === void 0 ? void 0 : _b.firstPage();
    }
    openDmak(kana) {
        this.gs.log('[BELAJAR_OPEN_DMAK]', kana);
        this.subsDialog = this.ds.openDmakDialog({
            data: {
                romaji: kana.romaji,
                hiragana_katakana_kanji: (this.modeTampilan === 'hiragana' ? kana.hiragana : kana.katakana)
            },
            disableClose: false
        }).afterClosed().subscribe({
            next: re => {
                this.gs.log('[BELAJAR_DMAK_DIALOG_CLOSED]', re);
                this.subsDialog.unsubscribe();
            }
        });
    }
    getHirakata() {
        this.bs.busy();
        this.subsHirakata = this.nihon.getHirakata().subscribe({
            next: res => {
                this.gs.log('[BELAJAR_HIRAKATA_SUCCESS]', res);
                const huruf = {};
                for (const r of res.results) {
                    if (!huruf[r.category]) {
                        huruf[r.category] = {};
                    }
                    if (!huruf[r.category][r.segment]) {
                        huruf[r.category][r.segment] = [];
                    }
                    huruf[r.category][r.segment].push({
                        romaji: r.romaji,
                        hiragana: r.hiragana,
                        katakana: r.katakana,
                    });
                }
                this.daftarHuruf = huruf;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[BELAJAR_HIRAKATA_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getAngka() {
        const dataAngka = [];
        for (const d of this.dummyDataset) {
            dataAngka.push({
                Angka: d.meaning,
                Kana: d.kana,
                Romaji: d.romaji
            });
        }
        this.daftarAngka.row = dataAngka;
    }
    getKategori() {
        this.bs.busy();
        this.subsAllKategori = this.nihon.getAllKategori().subscribe({
            next: res => {
                this.gs.log('[BELAJAR_KANA_KATEGORI_SUCCESS]', res);
                this.kategori = [...this.kategori, ...res.results];
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[BELAJAR_KANA_KATEGORI_ERROR]', err, 'error');
                this.bs.idle();
            },
        });
    }
    getData() {
        this.bs.busy();
        this.subsAllNihongo = this.nihon.getAllNihongo(this.modeTampilan, this.q, this.page, this.row).subscribe({
            next: res => {
                this.gs.log('[BELAJAR_KANA_LIST_SUCCESS]', res);
                this.count = res.count;
                this.daftarNihongo = res.results;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[BELAJAR_KANA_LIST_ERROR]', err, 'error');
                this.bs.idle();
            },
        });
    }
    editDataset(dataset) {
        var _a, _b, _c, _d, _e, _f;
        this.gs.log('[BELAJAR_DATASET_ADD_OR_EDIT_CLICK]', dataset);
        if ((!dataset && ((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.verified)) ||
            (dataset && (((_d = (_c = this.as.currentUserSubject) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_0__.RoleModel.ADMIN ||
                ((_f = (_e = this.as.currentUserSubject) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_0__.RoleModel.MODERATOR))) {
            this.subsDialog = this.ds.openBelajarDialog({
                data: {
                    title: (dataset ? `Edit Data` : `Tambah Dataset`),
                    modeTampilan: this.modeTampilan,
                    dataset,
                    confirmText: 'Simpan',
                    cancelText: 'Tutup'
                }
            }).afterClosed().subscribe({
                next: re => {
                    this.gs.log('[BELAJAR_DATASET_DIALOG_CLOSED]', re);
                    this.getData();
                    this.subsDialog.unsubscribe();
                }
            });
        }
    }
    addDataset() {
        var _a, _b, _c;
        if ((_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) {
            if ((_c = (_b = this.as.currentUserSubject) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.verified) {
                this.editDataset(null);
            }
            else {
                this.toast.warning('Khusus Pengguna Terverifikasi', 'Whoops!', null, true);
                this.router.navigate(['/verify'], {
                    queryParams: {
                        returnUrl: this.router.url.split('?')[0]
                    }
                });
            }
        }
        else {
            this.router.navigate(['/login'], {
                queryParams: {
                    returnUrl: '/nihongo/belajar'
                }
            });
        }
    }
}
NihongoBelajarComponent.ɵfac = function NihongoBelajarComponent_Factory(t) { return new (t || NihongoBelajarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_shared_services_toast_service__WEBPACK_IMPORTED_MODULE_1__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_4__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_5__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_shared_services_nihongo_service__WEBPACK_IMPORTED_MODULE_6__.NihongoService)); };
NihongoBelajarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({ type: NihongoBelajarComponent, selectors: [["app-belajar"]], viewQuery: function NihongoBelajarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__.MatPaginator, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
    } }, decls: 29, vars: 13, consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-lg-8", "col-xl-9"], [1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy", "pb-3"], [1, "m-0", "border-bottom", "border-primary", "row"], [1, "pt-3", "col-6", "col-lg-4", 3, "color"], [3, "value", "valueChange"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "ms-auto pt-3 col-6 col-lg-4", 3, "color", 4, "ngIf"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["hirakata", ""], ["kataBendaLainnya", ""], [1, "position-sticky", "bottom-0"], ["showFirstLastButtons", "", 1, "bg-bifeldy", 3, "color", "length", "pageSizeOptions", "page"], [1, "col-lg-4", "col-xl-3"], [1, "row", "sticky-top"], [1, "col-12"], ["noData", ""], ["type", "button", "mat-fab", "", "color", "warn", "class", "me-3 mb-5 fab-button animate__animated animate__bounce animate__infinite animate__slow", "matTooltip", "Tambah Dataset", "style", "position: fixed; bottom: 0; right: 0; z-index: 999999;", 3, "click", 4, "ngIf"], [3, "value"], [1, "ms-auto", "pt-3", "col-6", "col-lg-4", 3, "color"], ["matInput", "", "maxlength", "200", "placeholder", "Ex. \u81EA\u8EE2\u8ECA\u3001\u30DE\u30DE\u30C1\u30E3\u30EA", 3, "ngModel", "keyup.enter", "ngModelChange"], ["matSuffix", ""], [1, "col-12", "col-md-6"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], ["class", "row text-center px-3", 4, "ngFor", "ngForOf"], [1, "row", "text-center", "px-3"], ["class", "col p-1", 4, "ngFor", "ngForOf"], [1, "col", "p-1"], ["class", "rounded img-thumbnail", "style", "cursor: pointer;", 3, "src", "click", 4, "ngIf"], [1, "rounded", "img-thumbnail", 2, "cursor", "pointer", 3, "src", "click"], ["angka", ""], ["selainAngka", ""], [1, "p-3"], [3, "tableDataColumn", "tableDataRow"], ["class", "col-12", 4, "ngIf", "ngIfElse"], ["appDomChange", "", 1, "row", "px-3"], ["class", "col-12 col-md-6 col-lg-4 col-xl-3 p-2", 4, "ngFor", "ngForOf"], [1, "col-12", "col-md-6", "col-lg-4", "col-xl-3", "p-2"], [1, "card", 3, "click"], [1, "me-0", 2, "cursor", "pointer"], ["mat-card-avatar", "", 2, "background-size", "contain", "border-radius", "0", "background-position", "center", "background-repeat", "no-repeat"], [1, "text-warning", "mb-1", 2, "cursor", "pointer"], ["matLine", "", 1, "mb-0"], [1, "mb-0"], ["matLine", "", 1, "m-0", "text-success"], ["matLine", "", 1, "m-0"], [1, "col-12", "p-3"], ["type", "button", "mat-fab", "", "color", "warn", "matTooltip", "Tambah Dataset", 1, "me-3", "mb-5", "fab-button", "animate__animated", "animate__bounce", "animate__infinite", "animate__slow", 2, "position", "fixed", "bottom", "0", "right", "0", "z-index", "999999", 3, "click"]], template: function NihongoBelajarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "h3", 5)(7, "mat-form-field", 6)(8, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](9, "Pilih Kategori");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](10, "mat-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function NihongoBelajarComponent_Template_mat_select_valueChange_10_listener($event) { return ctx.modeTampilan = $event; })("valueChange", function NihongoBelajarComponent_Template_mat_select_valueChange_10_listener($event) { return ctx.changeModeTampilan($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](11, NihongoBelajarComponent_mat_option_11_Template, 2, 2, "mat-option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](12, NihongoBelajarComponent_mat_form_field_12_Template, 6, 2, "mat-form-field", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](13, NihongoBelajarComponent_div_13_Template, 1, 0, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](14, NihongoBelajarComponent_ng_template_14_Template, 44, 15, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](16, NihongoBelajarComponent_ng_template_16_Template, 5, 3, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](18, "div", 13)(19, "mat-paginator", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("page", function NihongoBelajarComponent_Template_mat_paginator_page_19_listener($event) { return ctx.paginatorChanged($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](20, "div", 15)(21, "div", 16)(22, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](23, "app-banner-donasi")(24, "app-banner-discord")(25, "app-stats-server");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](26, NihongoBelajarComponent_ng_template_26_Template, 1, 0, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](28, NihongoBelajarComponent_button_28_Template, 3, 0, "button", 19);
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](15);
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("color", "accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx.modeTampilan);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", ctx.kategori);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.modeTampilan !== "hiragana" && ctx.modeTampilan !== "katakana" && ctx.modeTampilan !== "angka");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (ctx.modeTampilan === "hiragana" || ctx.modeTampilan === "katakana") && ctx.daftarHuruf)("ngIfThen", _r3)("ngIfElse", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵstyleProp"]("display", ctx.modeTampilan !== "hiragana" && ctx.modeTampilan !== "katakana" && ctx.modeTampilan !== "angka" ? "block" : "none");
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("color", "accent")("length", ctx.count)("pageSizeOptions", ctx.pageSizeOptions);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.modeTampilan !== "hiragana" && ctx.modeTampilan !== "katakana" && ctx.modeTampilan !== "angka");
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_7__.NotificationsComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_18__.MatSelect, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_20__.MatOption, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, _angular_material_input__WEBPACK_IMPORTED_MODULE_21__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_22__.NgModel, _angular_material_icon__WEBPACK_IMPORTED_MODULE_23__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatSuffix, _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_8__.MaterialTableComponent, _shared_directives_dom_change_directive__WEBPACK_IMPORTED_MODULE_9__.DomChangeDirective, _angular_material_card__WEBPACK_IMPORTED_MODULE_24__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_24__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_24__.MatCardAvatar, _angular_material_card__WEBPACK_IMPORTED_MODULE_24__.MatCardTitle, _angular_material_core__WEBPACK_IMPORTED_MODULE_20__.MatLine, _angular_material_card__WEBPACK_IMPORTED_MODULE_24__.MatCardSubtitle, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_16__.MatPaginator, _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_10__.BannerDonasiComponent, _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_11__.BannerDiscordComponent, _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_12__.StatsServerComponent, _shared_components_no_data_no_data_component__WEBPACK_IMPORTED_MODULE_13__.NoDataComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_25__.MatButton, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_26__.MatTooltip], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_19__.KeyValuePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuaWhvbmdvLWJlbGFqYXIuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 57959:
/*!*************************************************************************************!*\
  !*** ./src/app/_pages/nihongo/nihongo-jlpt-school/nihongo-jlpt-school.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NihongoJlptSchoolComponent": () => (/* binding */ NihongoJlptSchoolComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/paginator */ 26439);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_nihongo_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/nihongo.service */ 52663);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _shared_components_no_data_no_data_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/components/no-data/no-data.component */ 40192);
/* harmony import */ var _shared_directives_dom_change_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/directives/dom-change.directive */ 49321);

















function NihongoJlptSchoolComponent_mat_option_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("value", i_r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("N", i_r4, "");
} }
function NihongoJlptSchoolComponent_mat_option_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-option", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("value", i_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("Kelas ", i_r5, "");
} }
function NihongoJlptSchoolComponent_app_no_data_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-no-data", 18);
} }
function NihongoJlptSchoolComponent_div_28_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 21)(1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function NihongoJlptSchoolComponent_div_28_div_2_Template_div_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r9); const k_r7 = restoredCtx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r8.openEdict(k_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 23)(3, "h5", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 25)(8, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const k_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](k_r7.character);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](k_r7.translate);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("N", k_r7.jlpt, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("S", k_r7.school, "");
} }
function NihongoJlptSchoolComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 11)(1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, NihongoJlptSchoolComponent_div_28_div_2_Template, 14, 4, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r3.kanjiData);
} }
const _c0 = function () { return [5, 4, 3, 2, 1]; };
const _c1 = function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9]; };
class NihongoJlptSchoolComponent {
    constructor(gs, bs, nihon, ds) {
        this.gs = gs;
        this.bs = bs;
        this.nihon = nihon;
        this.ds = ds;
        this.pageSizeOptions = [50, 75, 100, 125, 150];
        this.jlpt = '';
        this.school = '';
        this.count = 0;
        this.page = 1;
        this.row = 50;
        this.q = '';
        this.sort = '';
        this.order = '';
        this.kanjiData = [];
        this.subsKanji = null;
        this.subsDialog = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getKanji();
            if (!this.gs.isDarkMode) {
                this.gs.toggleDarkTheme();
            }
        }
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subsKanji) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsDialog) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    changeJlpt(data) {
        this.gs.log('[JLPT_CHANGED]', data);
        this.jlpt = data;
        this.resetPaginator();
    }
    changeSchool(data) {
        this.gs.log('[SCHOOL_CHANGED]', data);
        this.school = data;
        this.resetPaginator();
    }
    applyFilter(event) {
        this.gs.log('[SEARCH_VALUE_CHANGED]', event);
        this.q = event.target.value.trim().toLowerCase();
        this.resetPaginator();
    }
    paginatorChanged(data) {
        this.gs.log('[PAGINATOR_VALUE_CHANGED]', data);
        this.page = data.pageIndex + 1;
        this.row = data.pageSize;
        this.getKanji();
    }
    resetPaginator() {
        this.paginator._changePageSize(this.pageSizeOptions[0]);
        this.paginator.firstPage();
    }
    getKanji() {
        this.bs.busy();
        if (this.subsKanji) {
            this.subsKanji.unsubscribe();
            this.bs.idle();
        }
        this.subsKanji = this.nihon.getAllKanji(this.jlpt, this.school, this.q, this.page, this.row, 'context', 'asc').subscribe({
            next: res => {
                this.gs.log('[KANJI_LIST_SUCCESS]', res);
                this.count = res.count;
                this.kanjiData = res.results;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[KANJI_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
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
}
NihongoJlptSchoolComponent.ɵfac = function NihongoJlptSchoolComponent_Factory(t) { return new (t || NihongoJlptSchoolComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_nihongo_service__WEBPACK_IMPORTED_MODULE_2__.NihongoService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_3__.DialogService)); };
NihongoJlptSchoolComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: NihongoJlptSchoolComponent, selectors: [["app-kanji"]], viewQuery: function NihongoJlptSchoolComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__.MatPaginator, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
    } }, decls: 31, vars: 15, consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12", "sticky-top", "bg-bifeldy", "pb-3"], [1, "m-0", "border-bottom", "border-primary", "row"], [1, "pt-3", "col-4", "col-lg-2", 3, "color"], [3, "value", "valueChange"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "ms-auto", "pt-3", "col-4", "col-lg-4", 3, "color"], ["matInput", "", "maxlength", "200", "placeholder", "Ex. \u79C1", 3, "ngModel", "keyup.enter", "ngModelChange"], ["matSuffix", ""], [1, "col-12"], [1, "row"], ["class", "col-12 p-3", 4, "ngIf"], ["class", "col-12", 4, "ngIf"], [1, "container", "position-sticky", "bottom-0"], ["showFirstLastButtons", "", 1, "bg-bifeldy", 3, "color", "length", "pageSizeOptions", "page"], [3, "value"], [1, "col-12", "p-3"], ["appDomChange", "", 1, "row", "px-3"], ["class", "col-6 col-md-3 col-lg-2 p-2", 4, "ngFor", "ngForOf"], [1, "col-6", "col-md-3", "col-lg-2", "p-2"], [1, "card", "text-center", "p-3", 2, "cursor", "pointer", 3, "click"], [1, "card-body", "p-0"], [1, "card-title", "py-3", 2, "font-size", "300%"], [1, "position-absolute", "top-0", "end-0", 2, "margin-right", "3px", "font-size", "x-small"], [1, "text-warning"], [1, "text-info"]], template: function NihongoJlptSchoolComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "h3", 3)(5, "mat-form-field", 4)(6, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, "JLPT");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "mat-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function NihongoJlptSchoolComponent_Template_mat_select_valueChange_8_listener($event) { return ctx.jlpt = $event; })("valueChange", function NihongoJlptSchoolComponent_Template_mat_select_valueChange_8_listener($event) { return ctx.changeJlpt($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10, "Semua");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, NihongoJlptSchoolComponent_mat_option_11_Template, 2, 2, "mat-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "mat-form-field", 4)(13, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14, "Sekolah");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "mat-select", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("valueChange", function NihongoJlptSchoolComponent_Template_mat_select_valueChange_15_listener($event) { return ctx.school = $event; })("valueChange", function NihongoJlptSchoolComponent_Template_mat_select_valueChange_15_listener($event) { return ctx.changeSchool($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "mat-option", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](17, "Semua");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](18, NihongoJlptSchoolComponent_mat_option_18_Template, 2, 2, "mat-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](19, "mat-form-field", 8)(20, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](21, "Cari ...");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](22, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("keyup.enter", function NihongoJlptSchoolComponent_Template_input_keyup_enter_22_listener($event) { return ctx.applyFilter($event); })("ngModelChange", function NihongoJlptSchoolComponent_Template_input_ngModelChange_22_listener($event) { return ctx.q = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "mat-icon", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](24, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](25, "div", 11)(26, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](27, NihongoJlptSchoolComponent_app_no_data_27_Template, 1, 0, "app-no-data", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](28, NihongoJlptSchoolComponent_div_28_Template, 3, 1, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](29, "div", 15)(30, "mat-paginator", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("page", function NihongoJlptSchoolComponent_Template_mat_paginator_page_30_listener($event) { return ctx.paginatorChanged($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("color", "accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx.jlpt);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](13, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("color", "accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", ctx.school);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](14, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("color", "accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.q);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.kanjiData.length <= 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.kanjiData.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("color", "accent")("length", ctx.count)("pageSizeOptions", ctx.pageSizeOptions);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_4__.NotificationsComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatOption, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgModel, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatSuffix, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _shared_components_no_data_no_data_component__WEBPACK_IMPORTED_MODULE_5__.NoDataComponent, _shared_directives_dom_change_directive__WEBPACK_IMPORTED_MODULE_6__.DomChangeDirective, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_8__.MatPaginator], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuaWhvbmdvLWpscHQtc2Nob29sLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 10486:
/*!***********************************************************************!*\
  !*** ./src/app/_pages/nihongo/nihongo-list/nihongo-list.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NihongoListComponent": () => (/* binding */ NihongoListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_nihongo_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/nihongo.service */ 52663);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_banner_nihongo_banner_nihongo_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/components/banner-nihongo/banner-nihongo.component */ 15694);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/card */ 11961);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/components/material-tab/material-tab.component */ 18757);
/* harmony import */ var _shared_components_leaderboard_leaderboard_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/leaderboard/leaderboard.component */ 89741);
/* harmony import */ var _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/banner-donasi/banner-donasi.component */ 19530);
/* harmony import */ var _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/components/banner-discord/banner-discord.component */ 49933);
/* harmony import */ var _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/components/stats-server/stats-server.component */ 8921);















function NihongoListComponent_div_18_mat_icon_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const t_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](t_r3.icon);
} }
function NihongoListComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 15)(1, "mat-card", 16)(2, "mat-card-header", 17)(3, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, NihongoListComponent_div_18_mat_icon_4_Template, 2, 1, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "mat-card-title", 20)(6, "h3", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "mat-card-subtitle", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const t_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate1"]("routerLink", "/nihongo/", t_r3.url, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("background-image", "url(" + (t_r3.image_url || "") + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", t_r3.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](t_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](t_r3.letter);
} }
function NihongoListComponent_div_19_div_7_mat_icon_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const t_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](t_r7.icon);
} }
function NihongoListComponent_div_19_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 15)(1, "mat-card")(2, "mat-card-header", 17)(3, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, NihongoListComponent_div_19_div_7_mat_icon_4_Template, 2, 1, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "mat-card-title", 20)(6, "h3", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "mat-card-subtitle", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const t_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate1"]("routerLink", "/nihongo/", t_r7.url, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("background-image", "url(" + (t_r7.image_url || "") + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", t_r7.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](t_r7.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](t_r7.letter);
} }
function NihongoListComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "h2", 5)(3, "b", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Latihan Menengah");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 7)(6, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, NihongoListComponent_div_19_div_7_Template, 10, 6, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r1.testMenengah);
} }
function NihongoListComponent_div_27_mat_icon_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const t_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](t_r10.icon);
} }
function NihongoListComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 15)(1, "mat-card")(2, "mat-card-header", 17)(3, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, NihongoListComponent_div_27_mat_icon_4_Template, 2, 1, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "mat-card-title", 20)(6, "h3", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "mat-card-subtitle", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const t_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassMap"](t_r10.name.startsWith("JLPT") ? "rgb-border" : t_r10.name === "All Kanji" ? "gradient-border rgb-border" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpropertyInterpolate1"]("routerLink", "/nihongo/", t_r10.url, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("background-image", "url(" + (t_r10.image_url || "") + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", t_r10.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](t_r10.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](t_r10.letter);
} }
class NihongoListComponent {
    constructor(router, 
    // private fs: FabService,
    gs, bs, nihon) {
        this.router = router;
        this.gs = gs;
        this.bs = bs;
        this.nihon = nihon;
        this.testDasar = [
            {
                url: 'hiragana',
                name: 'Hiragana',
                image_url: '/assets/img/nihongo/hiragana.png',
                icon: null,
                letter: '~46 Unik'
            },
            {
                url: 'katakana',
                name: 'Katakana',
                image_url: '/assets/img/nihongo/katakana.png',
                icon: null,
                letter: '~46 Unik'
            },
            {
                url: 'angka',
                name: 'Angka',
                image_url: null,
                icon: 'plus_one',
                letter: '~∞ Unik'
            }
        ];
        this.testMenengah = [];
        this.testLanjutan = [
            {
                url: 'kelas-1',
                name: 'Kelas 1',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~80 Unik'
            },
            {
                url: 'kelas-2',
                name: 'Kelas 2',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~160 Unik'
            },
            {
                url: 'kelas-3',
                name: 'Kelas 3',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~200 Unik'
            },
            {
                url: 'kelas-4',
                name: 'Kelas 4',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~200 Unik'
            },
            {
                url: 'kelas-5',
                name: 'Kelas 5',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~185 Unik'
            },
            {
                url: 'kelas-6',
                name: 'Kelas 6',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~181 Unik'
            },
            {
                url: 'kelas-lanjutan-1',
                name: 'Lanjutan 1',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~1139 Unik'
            },
            {
                url: 'kelas-lanjutan-2',
                name: 'Lanjutan 2',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~349 Unik'
            },
            {
                url: 'jlpt-n5',
                name: 'JLPT N5',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~79 Unik'
            },
            {
                url: 'jlpt-n4',
                name: 'JLPT N4',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~166 Unik'
            },
            {
                url: 'jlpt-n3',
                name: 'JLPT N3',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~367 Unik'
            },
            {
                url: 'jlpt-n2',
                name: 'JLPT N2',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~367 Unik'
            },
            {
                url: 'jlpt-n1',
                name: 'JLPT N1',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~1231 Unik'
            },
            {
                url: 'semua-kanji',
                name: 'All Kanji',
                image_url: '/assets/img/nihongo/kanji.png',
                icon: null,
                letter: '~2494 Unik'
            }
        ];
        this.tabData = [
            // {
            //   name: 'Modul Pendukung',
            //   icon: 'file_copy',
            //   type: 'table',
            //   data: {
            //     column: ['Tanggal', 'Nama Modul', 'Pemilik'],
            //     row: []
            //   }
            // },
            {
                name: 'JLPT Roadmap',
                icon: 'pin_drop',
                type: 'html',
                data: `
        <div class="row">
          <img class="col-12 col-md-6" src="/assets/img/nihongo/roadmap-1.jpg" />
          <img class="col-12 col-md-6" src="/assets/img/nihongo/roadmap-2.jpg" />
        </div>
        <p class="mat-caption">Sumber gambar dan informasi: <a target="_blank" class="text-decoration-none" href="https://kawakawalearningstudio.com/all/roadmap-for-the-jlpt" target="_blank">KawaKawa</a></p>
        <p>“JLPT” adalah singkatan dari Japanese-Language Proficiency Test (Tes Kemampuan Bahasa Jepang). JLPT adalah salah satu ujian kecakapan bahasa Jepang internasional yang paling terkenal. Ini memiliki lima level, dengan level lima (secara resmi disebut N5) menjadi yang termudah dan level satu (N1) menjadi yang paling sulit.</p>
        <p>JLPT dulu memiliki empat level tetapi sekarang dibagi menjadi lima (N5, N4, N3, N2, dan N1). Level mana yang ingin diambil dibebaskan untuk memilih. Contoh pertanyaan dapat diakses pada halaman <a target="_blank" class="text-decoration-none" href="https://www.jlpt.jp/e/samples/sample09.html" target="_blank">New Japanese-Language Proficiency Test Sample Questions</a>.</p>
        <ul>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N5</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">100</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">800</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N4</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">300</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">1.500</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N3</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">650</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">3.700</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N2</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">1.000</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">6.000</a> kosakata.</li>
          <li>Untuk lulus <a target="_blank" class="text-success text-decoration-none">N1</a>, perlu mengetahui sekitar <a target="_blank" class="text-success text-decoration-none">2.000</a> kanji dan sekitar <a target="_blank" class="text-success text-decoration-none">10.000</a> kosakata.</li>
        </ul>
        <p>Untuk informasi skoring & penilaian dapat dilihat pada <a target="_blank" class="text-decoration-none" href="https://www.jlpt.jp/e/guideline/results.html" target="_blank">Scoring Sections, Pass or Fail, Score Report</a>.</p>
        <p class="text-danger mat-body-strong mat-body-2 font-weight-bold">N5 dan N4 adalah level termudah untuk diselesaikan dalam tes tetapi jika ingin menyelesaikan level yang lebih tinggi seperti N3, N2 dan N1 maka harus menghadiri pusat pembinaan di mana mereka menyediakan bahan pelajaran yang baik dan memiliki pelatih berpengalaman akan membantu belajar bahasa jepang dengan mudah.</p>
        <p>Informasi lebih lanjut, silahkan kunjungi <a target="_blank" class="text-decoration-none" href="https://www.jlpt.jp/e/index.html" target="_blank">https://www.jlpt.jp/e/index.html</a>.</p>
      `
            }
        ];
        this.count = 0;
        this.page = 1;
        this.row = 10;
        this.q = '';
        this.sort = '';
        this.order = '';
        this.subsAllKategori = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getKategori();
            // this.fs.initializeFab('add', null, 'Tambah Modul Baru', `/create/nihongo`, false);
            // this.getBook();
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subsAllKategori) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    getKategori() {
        this.bs.busy();
        this.subsAllKategori = this.nihon.getAllKategori().subscribe({
            next: res => {
                this.gs.log('[BELAJAR_KANA_KATEGORI_SUCCESS]', res);
                const x = [];
                for (const r of res.results) {
                    x.push({
                        url: `latihan-${r.id}`,
                        name: r.name,
                        image_url: null,
                        icon: 'switch_access_shortcut',
                        letter: `~${r.jumlah} Unik`
                    });
                }
                this.testMenengah = x;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[BELAJAR_KANA_KATEGORI_ERROR]', err, 'error');
                this.bs.idle();
            },
        });
    }
    getBook() {
        //
    }
    openModule(data) {
        this.gs.log('[NIHONGO_CLICK_MODUL]', data);
        this.router.navigateByUrl(`/nihongo/${data.id}`);
    }
    onPaginatorClicked(data) {
        this.gs.log('[NIHONGO_CLICK_PAGINATOR]', data);
        this.page = data.pageIndex + 1;
        this.row = data.pageSize;
        this.getBook();
    }
    onServerSideFilter(data) {
        this.gs.log('[NIHONGO_ENTER_FILTER]', data);
        this.q = data;
        this.getBook();
    }
    onServerSideOrder(data) {
        this.gs.log('[NIHONGO_CLICK_ORDER]', data);
        this.q = data.q;
        this.sort = data.active;
        this.order = data.direction;
        this.getBook();
    }
}
NihongoListComponent.ɵfac = function NihongoListComponent_Factory(t) { return new (t || NihongoListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_nihongo_service__WEBPACK_IMPORTED_MODULE_2__.NihongoService)); };
NihongoListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: NihongoListComponent, selectors: [["app-nihongo-list"]], decls: 38, vars: 6, consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-lg-8", "col-xl-9"], [1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12"], [1, "row", "px-3"], ["class", "col-12 col-sm-6 col-md-4 col-lg-6 col-xl-3 p-2", 4, "ngFor", "ngForOf"], ["class", "row", 4, "ngIf"], [1, "row", "mt-3"], [3, "tabData", "count", "serverSide", "tableRowClicked", "paginatorClicked", "serverSideFilter", "serverSideOrder"], [1, "col-lg-4", "col-xl-3"], [1, "row", "sticky-top"], [1, "col-12", "col-sm-6", "col-md-4", "col-lg-6", "col-xl-3", "p-2"], [1, "gradient-border"], [1, "me-0", 2, "cursor", "pointer", 3, "routerLink"], ["mat-card-avatar", "", 2, "background-size", "cover", "background-color", "whitesmoke", "border-radius", "0"], ["style", "font-size: 300%; color: black", 4, "ngIf"], [1, "text-warning", "mb-1", 2, "cursor", "pointer"], [1, "mb-0"], [2, "font-size", "300%", "color", "black"]], template: function NihongoListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "h2", 5)(7, "b", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](8, "Belajar Bahasa Jepang");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](10, "app-banner-nihongo");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "div", 3)(12, "div", 4)(13, "h2", 5)(14, "b", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](15, "Latihan Dasar");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "div", 7)(17, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](18, NihongoListComponent_div_18_Template, 10, 6, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](19, NihongoListComponent_div_19_Template, 8, 1, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](20, "div", 3)(21, "div", 4)(22, "h2", 5)(23, "b", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](24, "Latihan Lanjutan");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "div", 7)(26, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](27, NihongoListComponent_div_27_Template, 10, 9, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](28, "div", 11)(29, "div", 7)(30, "app-material-tab", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("tableRowClicked", function NihongoListComponent_Template_app_material_tab_tableRowClicked_30_listener($event) { return ctx.openModule($event); })("paginatorClicked", function NihongoListComponent_Template_app_material_tab_paginatorClicked_30_listener($event) { return ctx.onPaginatorClicked($event); })("serverSideFilter", function NihongoListComponent_Template_app_material_tab_serverSideFilter_30_listener($event) { return ctx.onServerSideFilter($event); })("serverSideOrder", function NihongoListComponent_Template_app_material_tab_serverSideOrder_30_listener($event) { return ctx.onServerSideOrder($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "div", 13)(32, "div", 14)(33, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](34, "app-leaderboard")(35, "app-banner-donasi")(36, "app-banner-discord")(37, "app-stats-server");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx.testDasar);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.testMenengah.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx.testLanjutan);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("tabData", ctx.tabData)("count", ctx.count)("serverSide", true);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_3__.NotificationsComponent, _shared_components_banner_nihongo_banner_nihongo_component__WEBPACK_IMPORTED_MODULE_4__.BannerNihongoComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCardHeader, _angular_router__WEBPACK_IMPORTED_MODULE_11__.RouterLink, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCardAvatar, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_13__.MatCardSubtitle, _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_5__.MaterialTabComponent, _shared_components_leaderboard_leaderboard_component__WEBPACK_IMPORTED_MODULE_6__.LeaderboardComponent, _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_7__.BannerDonasiComponent, _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_8__.BannerDiscordComponent, _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_9__.StatsServerComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuaWhvbmdvLWxpc3QuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 17854:
/*!*********************************************************************!*\
  !*** ./src/app/_pages/nihongo/nihongo-tes/nihongo-tes.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NihongoTesComponent": () => (/* binding */ NihongoTesComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_toast_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_shared/services/toast.service */ 96925);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/stats-server.service */ 28381);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _shared_components_quiz_quiz_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/components/quiz/quiz.component */ 91240);








function NihongoTesComponent_app_quiz_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-quiz", 2);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("question", ctx_r0.GS.routerData.question)("options", ctx_r0.GS.routerData.options);
} }
class NihongoTesComponent {
    constructor(router, toast, gs, ss) {
        this.router = router;
        this.toast = toast;
        this.gs = gs;
        this.ss = ss;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get GS() {
        return this.gs;
    }
    ngOnInit() {
        var _a;
        if (this.gs.isBrowser) {
            if (!((_a = this.ss.mySocket) === null || _a === void 0 ? void 0 : _a.id)) {
                this.toast.warning('Tidak Dapat Terhubung Melalui Web Socket', 'Gagal Menyambung Ke Jaringan!', null, true);
                this.router.navigateByUrl('/nihongo');
            }
            if (!this.gs.isDarkMode) {
                this.gs.toggleDarkTheme();
            }
        }
    }
}
NihongoTesComponent.ɵfac = function NihongoTesComponent_Factory(t) { return new (t || NihongoTesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_services_toast_service__WEBPACK_IMPORTED_MODULE_0__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_2__.StatsServerService)); };
NihongoTesComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: NihongoTesComponent, selectors: [["app-tes"]], decls: 3, vars: 1, consts: [[1, "container"], [3, "question", "options", 4, "ngIf"], [3, "question", "options"]], template: function NihongoTesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, NihongoTesComponent_app_quiz_2_Template, 1, 2, "app-quiz", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.GS.routerData.question && ctx.GS.routerData.options);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_3__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _shared_components_quiz_quiz_component__WEBPACK_IMPORTED_MODULE_4__.QuizComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuaWhvbmdvLXRlcy5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 24440:
/*!**************************************************!*\
  !*** ./src/app/_pages/nihongo/nihongo.module.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NihongoModule": () => (/* binding */ NihongoModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ 26271);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/req-res.model */ 14249);
/* harmony import */ var _shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/guards/roles.guard */ 2777);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _nihongo_list_nihongo_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nihongo-list/nihongo-list.component */ 10486);
/* harmony import */ var _nihongo_belajar_nihongo_belajar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nihongo-belajar/nihongo-belajar.component */ 99864);
/* harmony import */ var _nihongo_jlpt_school_nihongo_jlpt_school_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nihongo-jlpt-school/nihongo-jlpt-school.component */ 57959);
/* harmony import */ var _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./nihongo-tes/nihongo-tes.component */ 17854);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../_shared/components/banner-discord/banner-discord.module */ 54854);
/* harmony import */ var _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../_shared/components/stats-server/stats-server.module */ 10669);
/* harmony import */ var _shared_components_banner_nihongo_banner_nihongo_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../_shared/components/banner-nihongo/banner-nihongo.module */ 50913);
/* harmony import */ var _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../_shared/components/material-tab/material-tab.module */ 66436);
/* harmony import */ var _shared_components_right_panel_right_panel_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../_shared/components/right-panel/right-panel.module */ 85116);
/* harmony import */ var _shared_components_quiz_quiz_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../_shared/components/quiz/quiz.module */ 39369);
/* harmony import */ var _shared_components_material_table_material_table_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../_shared/components/material-table/material-table.module */ 617);
/* harmony import */ var _shared_components_leaderboard_leaderboard_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../_shared/components/leaderboard/leaderboard.module */ 74920);
/* harmony import */ var _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../_shared/components/no-data/no-data.module */ 12438);
/* harmony import */ var _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../_shared/components/banner-donasi/banner-donasi.module */ 61838);
/* harmony import */ var _shared_directives_custom_directive_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../_shared/directives/custom-directive.module */ 17956);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 3184);



























const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _nihongo_list_nihongo_list_component__WEBPACK_IMPORTED_MODULE_4__.NihongoListComponent
    },
    {
        path: 'belajar',
        component: _nihongo_belajar_nihongo_belajar_component__WEBPACK_IMPORTED_MODULE_5__.NihongoBelajarComponent,
        data: {
            title: 'Huruf, Angka, Warna, Buah & Sayur, Dan Lingkungan Sekitar',
            description: 'Mengenal Sambil Belajar Berbagai Macam',
            keywords: 'Sesuatu Yang Sering Kita Temukan',
            question: null,
            options: null
        }
    },
    {
        path: 'kanji',
        component: _nihongo_jlpt_school_nihongo_jlpt_school_component__WEBPACK_IMPORTED_MODULE_6__.NihongoJlptSchoolComponent,
        data: {
            title: 'Huruf Kanji',
            description: 'Mengenal Huruf Kanji Sesuai Rank JLPT & Sekolah',
            keywords: 'Kanji',
            question: null,
            options: null
        }
    },
    {
        path: 'hiragana',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf Hiragana',
            description: 'Uji Kemampuan Huruf Hiragana',
            keywords: 'Hiragana',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'hiragana',
            options: 'romaji'
        }
    },
    {
        path: 'katakana',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf Katakana',
            description: 'Uji Kemampuan Huruf Katakana',
            keywords: 'Katakana',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'katakana',
            options: 'romaji'
        }
    },
    // {
    //   path: 'angka',
    //   component: NihongoTesComponent,
    //   canActivate: [RolesGuard],
    //   data: {
    //     title: 'Tes Angka',
    //     description: 'Uji Kemampuan Angka',
    //     keywords: 'Angka',
    //     [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
    //     question: 'kanji',
    //     options: 'number'
    //   }
    // },
    {
        path: 'jlpt-n5',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf N5',
            description: 'Uji Kemampuan Huruf N5',
            keywords: 'N5',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'jlpt-n4',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf N4',
            description: 'Uji Kemampuan Huruf N4',
            keywords: 'N4',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'jlpt-n3',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf N3',
            description: 'Uji Kemampuan Huruf N3',
            keywords: 'N3',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'jlpt-n2',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf N2',
            description: 'Uji Kemampuan Huruf N2',
            keywords: 'N2',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'jlpt-n1',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf N1',
            description: 'Uji Kemampuan Huruf N1',
            keywords: 'N1',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'kelas-1',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf Kelas 1',
            description: 'Uji Kemampuan Huruf Kelas 1',
            keywords: 'Kelas 1',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'kelas-2',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf Kelas 2',
            description: 'Uji Kemampuan Huruf Kelas 2',
            keywords: 'Kelas 2',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'kelas-3',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf Kelas 3',
            description: 'Uji Kemampuan Huruf Kelas 3',
            keywords: 'Kelas 3',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'kelas-4',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf Kelas 4',
            description: 'Uji Kemampuan Huruf Kelas 4',
            keywords: 'Kelas 4',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'kelas-5',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf Kelas 5',
            description: 'Uji Kemampuan Huruf Kelas 5',
            keywords: 'Kelas 5',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'kelas-6',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf Kelas 6',
            description: 'Uji Kemampuan Huruf Kelas 6',
            keywords: 'Kelas 6',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'kelas-lanjutan-1',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf Lanjutan 1',
            description: 'Uji Kemampuan Huruf Lanjutan 1',
            keywords: 'Lanjutan 1',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'kelas-lanjutan-2',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf Lanjutan 2',
            description: 'Uji Kemampuan Huruf Lanjutan 2',
            keywords: 'Lanjutan 2',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: 'semua-kanji',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Huruf Semua Kanji',
            description: 'Uji Kemampuan Huruf Semua Kanji',
            keywords: 'Semua Kanji',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'character',
            options: 'translate'
        }
    },
    {
        path: ':category',
        component: _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent,
        canActivate: [_shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        data: {
            title: 'Tes Kategori Lainnya',
            description: 'Uji Kemampuan Kategori Lainnya',
            keywords: 'Kategori Lainnya',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.FANSUBBER, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.USER],
            question: 'image_url',
            options: 'kana'
        }
    },
    // {
    //   path: ':category',
    //   component: NihongoPracticeComponent,
    //   data: {
    //     title: 'Latihan Nama-Nama Warna, Buah & Sayur, Dan Lingkungan Sekitar',
    //     description: 'Tebak Gambar Nama-Nama Warna, Buah & Sayur, Dan Lingkungan Sekitar',
    //     keywords: 'Objek Di Sekitar Kita',
    //     [CONSTANTS.decoratorRoles]: [RoleModel.ADMIN, RoleModel.MODERATOR, RoleModel.FANSUBBER, RoleModel.USER],
    //     question: null,
    //     options: null
    //   }
    // }
];
class NihongoModule {
}
NihongoModule.ɵfac = function NihongoModule_Factory(t) { return new (t || NihongoModule)(); };
NihongoModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineNgModule"]({ type: NihongoModule });
NihongoModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_21__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_22__.RouterModule.forChild(routes),
            _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__.NotificationsModule,
            _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_18__.BannerDonasiModule,
            _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_9__.BannerDiscordModule,
            _shared_components_banner_nihongo_banner_nihongo_module__WEBPACK_IMPORTED_MODULE_11__.BannerNihongoModule,
            _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_12__.MaterialTabModule,
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_3__.SharedMaterialModule,
            ngx_material_file_input__WEBPACK_IMPORTED_MODULE_24__.MaterialFileInputModule,
            _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_25__.AngularEditorModule,
            _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_10__.StatsServerModule,
            _shared_components_right_panel_right_panel_module__WEBPACK_IMPORTED_MODULE_13__.RightPanelModule,
            _shared_components_quiz_quiz_module__WEBPACK_IMPORTED_MODULE_14__.QuizModule,
            _shared_components_material_table_material_table_module__WEBPACK_IMPORTED_MODULE_15__.MaterialTableModule,
            _shared_directives_custom_directive_module__WEBPACK_IMPORTED_MODULE_19__.CustomDirectivesModule,
            _shared_components_leaderboard_leaderboard_module__WEBPACK_IMPORTED_MODULE_16__.LeaderboardModule,
            _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_17__.NoDataModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_20__["ɵɵsetNgModuleScope"](NihongoModule, { declarations: [_nihongo_list_nihongo_list_component__WEBPACK_IMPORTED_MODULE_4__.NihongoListComponent,
        _nihongo_belajar_nihongo_belajar_component__WEBPACK_IMPORTED_MODULE_5__.NihongoBelajarComponent,
        _nihongo_jlpt_school_nihongo_jlpt_school_component__WEBPACK_IMPORTED_MODULE_6__.NihongoJlptSchoolComponent,
        _nihongo_tes_nihongo_tes_component__WEBPACK_IMPORTED_MODULE_7__.NihongoTesComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_21__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_22__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_23__.ReactiveFormsModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_8__.NotificationsModule,
        _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_18__.BannerDonasiModule,
        _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_9__.BannerDiscordModule,
        _shared_components_banner_nihongo_banner_nihongo_module__WEBPACK_IMPORTED_MODULE_11__.BannerNihongoModule,
        _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_12__.MaterialTabModule,
        _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_3__.SharedMaterialModule,
        ngx_material_file_input__WEBPACK_IMPORTED_MODULE_24__.MaterialFileInputModule,
        _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_25__.AngularEditorModule,
        _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_10__.StatsServerModule,
        _shared_components_right_panel_right_panel_module__WEBPACK_IMPORTED_MODULE_13__.RightPanelModule,
        _shared_components_quiz_quiz_module__WEBPACK_IMPORTED_MODULE_14__.QuizModule,
        _shared_components_material_table_material_table_module__WEBPACK_IMPORTED_MODULE_15__.MaterialTableModule,
        _shared_directives_custom_directive_module__WEBPACK_IMPORTED_MODULE_19__.CustomDirectivesModule,
        _shared_components_leaderboard_leaderboard_module__WEBPACK_IMPORTED_MODULE_16__.LeaderboardModule,
        _shared_components_no_data_no_data_module__WEBPACK_IMPORTED_MODULE_17__.NoDataModule] }); })();


/***/ }),

/***/ 89741:
/*!*************************************************************************!*\
  !*** ./src/app/_shared/components/leaderboard/leaderboard.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeaderboardComponent": () => (/* binding */ LeaderboardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _services_quiz_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/quiz.service */ 61270);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 65590);








function LeaderboardComponent_mat_list_option_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "a", 12)(3, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const l_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("routerLink", "/user/", l_r1.username, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("src", l_r1.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", l_r1.points, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](l_r1.rank);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](l_r1.username);
} }
class LeaderboardComponent {
    constructor(gs, qs) {
        this.gs = gs;
        this.qs = qs;
        this.leaderboardData = [];
        this.leaderBoardTotalPages = 1;
        this.leaderboardPage = 1;
        this.subsLeaderboard = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getLeaderboard();
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subsLeaderboard) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    getLeaderboard() {
        this.subsLeaderboard = this.qs.getQuizLeaderboard('', this.leaderboardPage).subscribe({
            next: res => {
                this.gs.log('[LEADERBOARD_LIST_SUCCESS]', res);
                this.leaderBoardTotalPages = res.pages;
                this.leaderboardData = res.results;
            },
            error: err => {
                this.gs.log('[LEADERBOARD_LIST_ERROR]', err, 'error');
            }
        });
    }
    prevBoard() {
        this.leaderboardPage--;
        if (this.leaderboardPage <= 0) {
            this.leaderboardPage = 1;
        }
        this.getLeaderboard();
    }
    nextBoard() {
        this.leaderboardPage++;
        this.getLeaderboard();
    }
}
LeaderboardComponent.ɵfac = function LeaderboardComponent_Factory(t) { return new (t || LeaderboardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_quiz_service__WEBPACK_IMPORTED_MODULE_1__.QuizService)); };
LeaderboardComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: LeaderboardComponent, selectors: [["app-leaderboard"]], decls: 19, vars: 8, consts: [[1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "float-end", "text-warning", 2, "font-size", "small", "cursor", "pointer", 3, "click"], [1, "text-bifeldy"], [1, "col-12"], [3, "multiple"], ["class", "h-100", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "col-12", "text-end"], ["type", "button", "mat-button", "", "color", "accent", 3, "disabled", "click"], [1, "h-100", 3, "routerLink"], ["matListAvatar", "", 1, "ms-3", 2, "border-radius", "0", 3, "src"], [1, "text-truncate", "text-decoration-none"], [1, "bg-bifeldy", "px-2", "me-1", "text-warning", 2, "position", "absolute", "right", "0"], [1, "me-3", "text-danger"], [1, "text-success"]], template: function LeaderboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2", 2)(3, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LeaderboardComponent_Template_span_click_3_listener() { return ctx.getLeaderboard(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, " Refresh ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "b", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Rank Points");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 5)(8, "mat-selection-list", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, LeaderboardComponent_mat_list_option_9_Template, 9, 5, "mat-list-option", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](10, "slice");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 0)(12, "div", 8)(13, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LeaderboardComponent_Template_button_click_13_listener() { return ctx.prevBoard(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "navigate_before");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LeaderboardComponent_Template_button_click_16_listener() { return ctx.nextBoard(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, "navigate_next");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("multiple", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind3"](10, 4, ctx.leaderboardData, 0, 10));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.leaderboardPage <= 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.leaderboardPage >= ctx.leaderBoardTotalPages);
    } }, directives: [_angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatSelectionList, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListOption, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_material_list__WEBPACK_IMPORTED_MODULE_3__.MatListAvatarCssMatStyler, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.SlicePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsZWFkZXJib2FyZC5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 74920:
/*!**********************************************************************!*\
  !*** ./src/app/_shared/components/leaderboard/leaderboard.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeaderboardModule": () => (/* binding */ LeaderboardModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _leaderboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./leaderboard.component */ 89741);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);





class LeaderboardModule {
}
LeaderboardModule.ɵfac = function LeaderboardModule_Factory(t) { return new (t || LeaderboardModule)(); };
LeaderboardModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: LeaderboardModule });
LeaderboardModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](LeaderboardModule, { declarations: [_leaderboard_component__WEBPACK_IMPORTED_MODULE_1__.LeaderboardComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule], exports: [_leaderboard_component__WEBPACK_IMPORTED_MODULE_1__.LeaderboardComponent] }); })();


/***/ }),

/***/ 91240:
/*!***********************************************************!*\
  !*** ./src/app/_shared/components/quiz/quiz.component.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QuizComponent": () => (/* binding */ QuizComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_right_panel_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/right-panel.service */ 56514);
/* harmony import */ var _shared_services_quiz_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/quiz.service */ 61270);
/* harmony import */ var _services_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/dialog.service */ 55393);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/badge */ 70178);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _right_panel_live_chat_live_chat_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../right-panel/live-chat/live-chat.component */ 71617);











function QuizComponent_div_0_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 23)(1, "div", 6)(2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function QuizComponent_div_0_div_3_Template_div_click_2_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r12); const p_r9 = restoredCtx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r11.openProfile(p_r9.value.username); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const p_r9 = ctx.$implicit;
    const idx_r10 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMapInterpolate1"]("\n                background-image: url('", p_r9.value.image_url, "');\n                width: 64px;\n                height: 64px;\n                background-size: cover;\n                background-position: center;\n            ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("matBadge", p_r9 == null ? null : p_r9.value == null ? null : p_r9.value.profile_.points)("matBadgeColor", idx_r10 === 0 ? "warn" : idx_r10 === 1 ? "primary" : "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMapInterpolate1"]("pt-1 ", idx_r10 === 0 ? "gradient-text" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](p_r9.value.username);
} }
function QuizComponent_div_0_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "div");
} }
function QuizComponent_div_0_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "div", 25);
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMapInterpolate1"]("\n                  background-size: contain;\n                  background-position: center center;\n                  background-repeat: no-repeat;\n                  background-image: url('", ctx_r4.getQuiz.question[ctx_r4.question], "');\n                ");
} }
function QuizComponent_div_0_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function QuizComponent_div_0_ng_template_22_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r13.openEdict(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r6.swapOptions ? ctx_r6.getQuiz.question[ctx_r6.question] : ctx_r6.getQuiz.question[ctx_r6.options], " ");
} }
function QuizComponent_div_0_div_27_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div")(1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function QuizComponent_div_0_div_27_Template_div_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r17); const o_r15 = restoredCtx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r16.selectAnswer(o_r15); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const o_r15 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMapInterpolate1"]("", ctx_r7.ROUTER.url.includes("/kelas-") || ctx_r7.ROUTER.url.includes("/jlpt-") || ctx_r7.ROUTER.url.includes("/semua-kanji") || ctx_r7.ROUTER.url.includes("/latihan-") ? "col-md-6 col-12" : "col-md-4 col-6", " p-2");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassMapInterpolate1"]("card-body ", ctx_r7.ROUTER.url.includes("/kelas-") || ctx_r7.ROUTER.url.includes("/jlpt-") || ctx_r7.ROUTER.url.includes("/semua-kanji") ? "p-0" : "px-0", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleProp"]("font-size", ctx_r7.ROUTER.url.includes("/kelas-") || ctx_r7.ROUTER.url.includes("/jlpt-") || ctx_r7.ROUTER.url.includes("/semua-kanji") ? "100%" : "250%");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r7.swapOptions ? o_r15[ctx_r7.options] : o_r15[ctx_r7.question], " ");
} }
function QuizComponent_div_0_div_28_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 28)(1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function QuizComponent_div_0_div_28_Template_div_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2); return ctx_r18.swapCharacter(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "\uD83C\uDF8C");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
} }
function QuizComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, QuizComponent_div_0_div_3_Template, 6, 9, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 5)(6, "div", 6)(7, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function QuizComponent_div_0_Template_div_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r20.openLiveChat(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "Semua Peserta");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 10)(12, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "hr", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "div", 10)(15, "div", 12)(16, "div", 10)(17, "div", 13)(18, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, QuizComponent_div_0_div_19_Template, 1, 0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](20, QuizComponent_div_0_ng_template_20_Template, 1, 3, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](22, QuizComponent_div_0_ng_template_22_Template, 2, 1, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "div", 10)(25, "div", 13)(26, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](27, QuizComponent_div_0_div_27_Template, 4, 9, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](28, QuizComponent_div_0_div_28_Template, 4, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](30, "app-live-chat", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](21);
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](23);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](4, 10, ctx_r0.participants, ctx_r0.scoreOrder));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵstyleMapInterpolate1"]("\n                background-image: url('", ctx_r0.ENV.baseUrl, "/assets/img/favicon.png');\n                width: 64px;\n                height: 64px;\n                background-size: cover;\n                background-position: center;\n            ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.question === "image_url")("ngIfThen", _r3)("ngIfElse", _r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r0.getQuiz.options);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r0.ROUTER.url.includes("/kelas-") && !ctx_r0.ROUTER.url.includes("/jlpt-") && !ctx_r0.ROUTER.url.includes("/semua-kanji") && !ctx_r0.ROUTER.url.includes("/latihan-"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("chatOnly", true);
} }
class QuizComponent {
    constructor(router, gs, rps, quiz, ds) {
        this.router = router;
        this.gs = gs;
        this.rps = rps;
        this.quiz = quiz;
        this.ds = ds;
        this.question = 'hiragana';
        this.options = 'romaji';
        this.swapOptions = true;
        this.participants = null;
        this.subsParticipant = null;
        this.subsDialog = null;
        this.scoreOrder = (a, b) => {
            return a.value.profile_.points > b.value.profile_.points ? -1 : (b.value.profile_.points > a.value.profile_.points ? 1 : 0);
        };
        if (this.gs.isBrowser) {
            //
        }
    }
    get ENV() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    get ROUTER() {
        return this.router;
    }
    get getQuiz() {
        return this.quiz.getCurrentQuizQuestion(this.router.url.split('?')[0]);
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subsParticipant) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsDialog) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.subsParticipant = this.quiz.getCurrentQuizRoom().subscribe({
                next: currentRoom => {
                    this.participants = currentRoom === null || currentRoom === void 0 ? void 0 : currentRoom.member_list;
                }
            });
        }
    }
    selectAnswer(data) {
        this.quiz.answerQuestion({
            roomId: this.router.url.split('?')[0],
            randomInteger: this.getQuiz.randomInteger,
            answer: data
        });
    }
    swapCharacter() {
        this.swapOptions = !this.swapOptions;
    }
    openLiveChat() {
        this.rps.toggleSidePanel('LiveChatComponent');
    }
    openProfile(username) {
        this.router.navigateByUrl(`/user/${username}`);
    }
    openEdict() {
        this.gs.log('[QUIZ_OPEN_EDICT]', this.getQuiz);
        if (this.getQuiz.question.character) {
            this.subsDialog = this.ds.openEdictDialog({
                data: this.getQuiz.question,
                disableClose: false
            }).afterClosed().subscribe({
                next: re => {
                    this.gs.log('[EDICT_DIALOG_CLOSED]', re);
                    this.subsDialog.unsubscribe();
                }
            });
        }
    }
}
QuizComponent.ɵfac = function QuizComponent_Factory(t) { return new (t || QuizComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_right_panel_service__WEBPACK_IMPORTED_MODULE_2__.RightPanelService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_shared_services_quiz_service__WEBPACK_IMPORTED_MODULE_3__.QuizService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__.DialogService)); };
QuizComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: QuizComponent, selectors: [["app-quiz"]], inputs: { question: "question", options: "options" }, decls: 1, vars: 1, consts: [["class", "row px-0", 4, "ngIf"], [1, "row", "px-0"], [1, "col-12"], [1, "row", "w-100", "ps-3", 2, "display", "inline-flex", "flex-wrap", "nowrap", "overflow-x", "hidden"], ["class", "p-2", "style", "width: auto;", 4, "ngFor", "ngForOf"], [1, "ms-auto", "p-2", "bg-bifeldy", 2, "width", "auto", "position", "sticky", "right", "0"], [1, "card", "text-center", "border-0", 2, "width", "64px", "background", "transparent !important"], [1, "card-body", "p-0", 2, "cursor", "pointer", 3, "click"], [1, "rounded-3"], [1, "pt-1"], [1, "row"], [1, "my-1", "border-bottom-dotted", 2, "height", "4px", "background", "url('/assets/img/stripe.png')"], [1, "col-lg-8", "col-xl-9", "p-3", "text-center"], [1, "col-12", "p-4"], [1, "mx-auto", "card", "p-3"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["menengah", ""], ["bukanMenengah", ""], [1, "row", "text-center"], [3, "class", 4, "ngFor", "ngForOf"], ["class", "col-6 col-md-4 p-2", 4, "ngIf"], [1, "col-lg-4", "col-xl-3", "d-none", "d-lg-block", "d-xl-block"], [3, "chatOnly"], [1, "p-2", 2, "width", "auto"], ["matBadgePosition", "below", 1, "rounded-3", 3, "matBadge", "matBadgeColor"], [1, "card-body", "p-3", "py-5"], [1, "card-body", "p-3", "py-5", 2, "cursor", "pointer", "font-size", "500%", 3, "click"], [1, "card", "p-3", "m-1", 2, "cursor", "pointer", 3, "click"], [1, "col-6", "col-md-4", "p-2"], ["matTooltip", "Tukar Huruf", 1, "card", "p-3", "m-1", 2, "cursor", "pointer", 3, "click"], [1, "card-body", "px-0", 2, "font-size", "250%"]], template: function QuizComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, QuizComponent_div_0_Template, 31, 13, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.getQuiz);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_material_badge__WEBPACK_IMPORTED_MODULE_9__.MatBadge, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__.MatTooltip, _right_panel_live_chat_live_chat_component__WEBPACK_IMPORTED_MODULE_5__.LiveChatComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.KeyValuePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJxdWl6LmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 39369:
/*!********************************************************!*\
  !*** ./src/app/_shared/components/quiz/quiz.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QuizModule": () => (/* binding */ QuizModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _quiz_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quiz.component */ 91240);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _right_panel_right_panel_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../right-panel/right-panel.module */ 85116);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);






class QuizModule {
}
QuizModule.ɵfac = function QuizModule_Factory(t) { return new (t || QuizModule)(); };
QuizModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: QuizModule });
QuizModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
            _right_panel_right_panel_module__WEBPACK_IMPORTED_MODULE_2__.RightPanelModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](QuizModule, { declarations: [_quiz_component__WEBPACK_IMPORTED_MODULE_0__.QuizComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
        _right_panel_right_panel_module__WEBPACK_IMPORTED_MODULE_2__.RightPanelModule], exports: [_quiz_component__WEBPACK_IMPORTED_MODULE_0__.QuizComponent] }); })();


/***/ }),

/***/ 61270:
/*!**************************************************!*\
  !*** ./src/app/_shared/services/quiz.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QuizService": () => (/* binding */ QuizService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);
/* harmony import */ var _stats_server_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stats-server.service */ 28381);




class QuizService {
    constructor(api, gs, ss) {
        this.api = api;
        this.gs = gs;
        this.ss = ss;
        if (this.gs.isBrowser) {
            //
        }
    }
    getCurrentQuizRoom() {
        return this.ss.currentRoom;
    }
    getCurrentQuizQuestion(roomId) {
        return this.ss.quizRoom[roomId];
    }
    answerQuestion(data) {
        this.ss.socketEmit('quiz-answer', data);
    }
    getQuizLeaderboard(q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/quiz-leaderboard?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
}
QuizService.ɵfac = function QuizService_Factory(t) { return new (t || QuizService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_stats_server_service__WEBPACK_IMPORTED_MODULE_2__.StatsServerService)); };
QuizService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: QuizService, factory: QuizService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=src_app__pages_nihongo_nihongo_module_ts.js.map