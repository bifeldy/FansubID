(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_torrent_torrent_module_ts"],{

/***/ 41088:
/*!*****************************************************!*\
  !*** ./src/app/_pages/torrent/torrent.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TorrentComponent": () => (/* binding */ TorrentComponent)
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/animations */ 31631);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/sort */ 64316);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/table */ 97217);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! file-saver */ 65226);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/snack-bar */ 32528);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/cdk/clipboard */ 91604);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_torrent_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/services/torrent.service */ 11189);
/* harmony import */ var _shared_services_toast_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/services/toast.service */ 96925);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/services/stats-server.service */ 28381);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_directives_drag_drop_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_shared/directives/drag-drop.directive */ 85152);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/progress-bar */ 60833);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../_shared/pipes/bytes.pipe */ 23626);




























function TorrentComponent_mat_progress_bar_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "mat-progress-bar", 26);
} }
function TorrentComponent_ng_container_22_th_1_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "\uD83D\uDD16 NAME");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("color", "#ff4081");
} }
function TorrentComponent_ng_container_22_th_1_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "\uD83D\uDCBE SIZE");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("color", "#ff4081");
} }
function TorrentComponent_ng_container_22_th_1_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "\uD83D\uDCBF DOWNLOADED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("color", "#ff4081");
} }
function TorrentComponent_ng_container_22_th_1_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "\uD83D\uDCC0 UPLOADED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("color", "#ff4081");
} }
function TorrentComponent_ng_container_22_th_1_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "\uD83D\uDD04 PROGRESS");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("color", "#ff4081");
} }
function TorrentComponent_ng_container_22_th_1_span_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "\uD83D\uDD3D SPEED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("color", "#ff4081");
} }
function TorrentComponent_ng_container_22_th_1_span_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "\uD83D\uDD3C SPEED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("color", "#ff4081");
} }
function TorrentComponent_ng_container_22_th_1_span_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "\uD83D\uDD51 ~ETA.");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("color", "#ff4081");
} }
function TorrentComponent_ng_container_22_th_1_span_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "\uD83E\uDDF2 PEERS");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("color", "#ff4081");
} }
function TorrentComponent_ng_container_22_th_1_span_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "\uD83C\uDF10 RATIO");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("color", "#ff4081");
} }
function TorrentComponent_ng_container_22_th_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "th", 30)(1, "h3", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, TorrentComponent_ng_container_22_th_1_span_2_Template, 2, 2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, TorrentComponent_ng_container_22_th_1_span_3_Template, 2, 2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](4, TorrentComponent_ng_container_22_th_1_span_4_Template, 2, 2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](5, TorrentComponent_ng_container_22_th_1_span_5_Template, 2, 2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](6, TorrentComponent_ng_container_22_th_1_span_6_Template, 2, 2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, TorrentComponent_ng_container_22_th_1_span_7_Template, 2, 2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, TorrentComponent_ng_container_22_th_1_span_8_Template, 2, 2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](9, TorrentComponent_ng_container_22_th_1_span_9_Template, 2, 2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, TorrentComponent_ng_container_22_th_1_span_10_Template, 2, 2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, TorrentComponent_ng_container_22_th_1_span_11_Template, 2, 2, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const tdc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "NAME");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "LENGTH");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "DOWNLOADED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "UPLOADED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "PROGRESS");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "DOWNLOADSPEED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "UPLOADSPEED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "TIMEREMAINING");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "NUMPEERS");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "RATIO");
} }
function TorrentComponent_ng_container_22_td_2_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const tdc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r23[tdc_r9]);
} }
function TorrentComponent_ng_container_22_td_2_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const tdc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, row_r23[tdc_r9]));
} }
function TorrentComponent_ng_container_22_td_2_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const tdc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, row_r23[tdc_r9]));
} }
function TorrentComponent_ng_container_22_td_2_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const tdc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, row_r23[tdc_r9]));
} }
function TorrentComponent_ng_container_22_td_2_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 1, row_r23["downloaded"] / row_r23["length"] * 100, "1.2-2"), " %");
} }
function TorrentComponent_ng_container_22_td_2_span_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const tdc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, row_r23[tdc_r9]), "/s");
} }
function TorrentComponent_ng_container_22_td_2_span_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const tdc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, row_r23[tdc_r9]), "/s");
} }
function TorrentComponent_ng_container_22_td_2_span_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const tdc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r23[tdc_r9] <= 0 ? "COMPLETED" : _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 1, row_r23[tdc_r9] / 1000, "1.0-0") + " s");
} }
function TorrentComponent_ng_container_22_td_2_span_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const tdc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](row_r23[tdc_r9]);
} }
function TorrentComponent_ng_container_22_td_2_span_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const tdc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 1, row_r23[tdc_r9], "1.4-4"));
} }
function TorrentComponent_ng_container_22_td_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "td", 33)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, TorrentComponent_ng_container_22_td_2_span_2_Template, 2, 1, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, TorrentComponent_ng_container_22_td_2_span_3_Template, 3, 3, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](4, TorrentComponent_ng_container_22_td_2_span_4_Template, 3, 3, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](5, TorrentComponent_ng_container_22_td_2_span_5_Template, 3, 3, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](6, TorrentComponent_ng_container_22_td_2_span_6_Template, 3, 4, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, TorrentComponent_ng_container_22_td_2_span_7_Template, 3, 3, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, TorrentComponent_ng_container_22_td_2_span_8_Template, 3, 3, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](9, TorrentComponent_ng_container_22_td_2_span_9_Template, 3, 4, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, TorrentComponent_ng_container_22_td_2_span_10_Template, 2, 1, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, TorrentComponent_ng_container_22_td_2_span_11_Template, 3, 4, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const tdc_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMapInterpolate1"]("m-0 ", tdc_r9.toUpperCase() === "NAME" ? "text-start" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "NAME");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "LENGTH");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "DOWNLOADED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "UPLOADED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "PROGRESS");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "DOWNLOADSPEED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "UPLOADSPEED");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "TIMEREMAINING");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "NUMPEERS");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", tdc_r9.toUpperCase() === "RATIO");
} }
function TorrentComponent_ng_container_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, TorrentComponent_ng_container_22_th_1_Template, 12, 10, "th", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, TorrentComponent_ng_container_22_td_2_Template, 12, 13, "td", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const tdc_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate"]("matColumnDef", tdc_r9);
} }
function TorrentComponent_td_24_p_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "p", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, " Info Hash :: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const row_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", row_r54.infoHash, " ");
} }
function TorrentComponent_td_24_p_7_Template(rf, ctx) { if (rf & 1) {
    const _r64 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "p", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, " Magnet URI :: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function TorrentComponent_td_24_p_7_Template_span_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r64); const row_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit; const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r62.copyMagnetHashToClipboard(row_r54.magnetURI); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const row_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", row_r54.magnetURI, " ");
} }
function TorrentComponent_td_24_li_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const a_r66 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", a_r66, " ");
} }
function TorrentComponent_td_24_button_21_Template(rf, ctx) { if (rf & 1) {
    const _r69 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function TorrentComponent_td_24_button_21_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r69); const row_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit; const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r67.resumeTorrent(row_r54); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "mat-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2, "play_arrow");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, " Resume ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function TorrentComponent_td_24_button_22_Template(rf, ctx) { if (rf & 1) {
    const _r72 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function TorrentComponent_td_24_button_22_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r72); const row_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit; const ctx_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r70.pauseTorrent(row_r54); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "mat-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2, "pause");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, " Pause ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} }
function TorrentComponent_td_24_mat_list_option_27_Template(rf, ctx) { if (rf & 1) {
    const _r75 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-list-option", 54)(1, "mat-icon", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2, "file_present");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function TorrentComponent_td_24_mat_list_option_27_Template_div_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r75); const f_r73 = restoredCtx.$implicit; const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2); return ctx_r74.saveFile(f_r73); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6, " -- ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](9, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](10, " :: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](13, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](14, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const f_r73 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMapInterpolate1"]("text-", f_r73.downloaded / f_r73.length >= 1 ? "primary" : "bifeldy", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", f_r73.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](9, 7, f_r73.downloaded / f_r73.length * 100, "1.2-2"), " % ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](13, 10, f_r73.downloaded), " / ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](14, 12, f_r73.length), " ");
} }
function TorrentComponent_td_24_Template(rf, ctx) { if (rf & 1) {
    const _r77 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "td", 35)(1, "div", 36)(2, "div", 37)(3, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](6, TorrentComponent_td_24_p_6_Template, 4, 1, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, TorrentComponent_td_24_p_7_Template, 4, 1, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](9, " Announce Trackers :: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "ul", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, TorrentComponent_td_24_li_11_Template, 2, 1, "li", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 44)(13, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function TorrentComponent_td_24_Template_button_click_13_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r77); const row_r54 = restoredCtx.$implicit; const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r76.refreshGraph(row_r54); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "mat-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](15, "refresh");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](16, " Refresh Graph ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function TorrentComponent_td_24_Template_button_click_17_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r77); const row_r54 = restoredCtx.$implicit; const ctx_r78 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r78.removeTorrent(row_r54); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](18, "mat-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](19, "delete_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](20, " Remove ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](21, TorrentComponent_td_24_button_21_Template, 4, 0, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](22, TorrentComponent_td_24_button_22_Template, 4, 0, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](23, "div", 48)(24, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](25, "Rincian Isi Berkas \u2728");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](26, "mat-selection-list", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](27, TorrentComponent_td_24_mat_list_option_27_Template, 15, 14, "mat-list-option", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()()();
} if (rf & 2) {
    const row_r54 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("colspan", ctx_r3.tableDataColumn.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("@detailExpand", row_r54 === ctx_r3.TORRENT.expandedRow ? "expanded" : "collapsed");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMapInterpolate1"]("p2p-graph graphP2p-", row_r54.infoHash, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", row_r54.infoHash);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", row_r54.magnetURI);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", row_r54.announce);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", row_r54.paused);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !row_r54.paused);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", row_r54.files);
} }
function TorrentComponent_tr_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "tr", 58);
} }
function TorrentComponent_tr_26_Template(rf, ctx) { if (rf & 1) {
    const _r81 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "tr", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function TorrentComponent_tr_26_Template_tr_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r81); const row_r79 = restoredCtx.$implicit; const ctx_r80 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r80.toggleExpanded(row_r79); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r79 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("expanded-row", ctx_r5.TORRENT.expandedRow === row_r79);
} }
function TorrentComponent_tr_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "tr", 60);
} }
function TorrentComponent_tr_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "tr", 61)(1, "td", 62)(2, "div", 63)(3, "div", 64)(4, "h3", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5, " Tidak Ada Data \u00AF\\_(\u30C4)_/\u00AF ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("colspan", ctx_r7.tableDataColumn.length);
} }
const _c0 = function () { return ["expandedDetail"]; };
class TorrentComponent {
    constructor(snackBar, clipboard, gs, torrent, toast, ds, ss, bs) {
        this.snackBar = snackBar;
        this.clipboard = clipboard;
        this.gs = gs;
        this.torrent = torrent;
        this.toast = toast;
        this.ds = ds;
        this.ss = ss;
        this.bs = bs;
        this.isProcessing = false;
        this.magnetHash = null;
        this.torrentsGraph = {
        // 'magnet:!@#123...zxc': new Graph('magnet:!@#123...zxc')
        };
        this.tableDataColumn = [
            'name',
            'length',
            'downloaded',
            'uploaded',
            'progress',
            'downloadSpeed',
            'uploadSpeed',
            'timeRemaining',
            'numPeers',
            'ratio',
        ];
        this.files = [];
        this.subsDialog = null;
        this.subsUser = null;
        this.subsTableDataRow = null;
        this.timedOut = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get ENV() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment;
    }
    get TORRENT() {
        return this.torrent;
    }
    ngOnInit() {
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatTableDataSource();
        if (this.gs.isBrowser) {
            this.dataSource.sort = this.sort;
            this.subsTableDataRow = this.torrent.tableDataRow.subscribe({
                next: tableDataRow => {
                    this.dataSource.data = tableDataRow;
                    this.refreshAllGraph();
                }
            });
            this.reviveTorrent();
        }
    }
    ngOnDestroy() {
        var _a, _b, _c, _d, _e;
        (_b = (_a = this.sort) === null || _a === void 0 ? void 0 : _a.sortChange) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsDialog) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsUser) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.subsTableDataRow) === null || _e === void 0 ? void 0 : _e.unsubscribe();
        if (this.timedOut) {
            clearTimeout(this.timedOut);
            this.timedOut = null;
        }
    }
    copyMagnetHashToClipboard(magnetHash) {
        if (this.clipboard.copy(magnetHash)) {
            this.snackBar.open('Magnet Link Hash :: Telah Di Salin Pada Clipboard', 'Ok');
        }
    }
    toggleExpanded(row) {
        this.gs.log('[TORRENT_CLICKED]', row);
        this.torrent.expandedRow = this.torrent.expandedRow === row ? null : row;
        this.refreshGraph(row);
    }
    saveFile(file) {
        if (file.downloaded / file.length >= 1) {
            this.bs.busy();
            file.getBlobURL((err, blobUrl) => {
                if (!err) {
                    this.gs.log('[TORRENT_FILE_BLOBURL]', blobUrl);
                    (0,file_saver__WEBPACK_IMPORTED_MODULE_0__.saveAs)(blobUrl, file.name);
                    this.bs.idle();
                }
            });
        }
        else {
            this.toast.info('Berkas Sedang Dalam Proses Unduhan!', 'Yah, File Belum Siap!', null, true);
        }
    }
    reviveTorrent() {
        this.torrent.resurrectFiles((error, result) => {
            this.refreshAllGraph();
        });
    }
    resumeTorrent(torrent) {
        this.torrent.resumeTorrent(torrent.infoHash, error => {
            this.refreshAllGraph();
        });
    }
    pauseTorrent(torrent) {
        this.torrent.pauseTorrent(torrent.infoHash, error => {
            if (!error) {
                this.gs.log('[TORRENT_FILE_PAUSE_SUCCESS]', torrent.infoHash);
            }
            this.refreshAllGraph();
        });
    }
    removeTorrent(torrent) {
        this.torrent.removeTorrent(torrent.infoHash, error => {
            if (!error) {
                this.gs.log('[TORRENT_FILE_REMOVE_SUCCESS]', torrent.infoHash);
            }
            this.torrentsGraph[torrent.infoHash].destroy();
            delete this.torrentsGraph[torrent.infoHash];
            this.refreshAllGraph();
        });
    }
    downloadFiles(event) {
        this.isProcessing = true;
        this.torrent.downloadFiles(this.magnetHash, (error, result) => {
            this.magnetHash = null;
            this.isProcessing = false;
            this.refreshAllGraph();
        });
    }
    uploadFiles(torrentName) {
        this.gs.log('[TORRENT_SEED_USER_INFORMATION]', torrentName);
        this.isProcessing = true;
        this.torrent.uploadFiles(torrentName, this.files, (error, result) => {
            this.isProcessing = false;
            this.refreshAllGraph();
        });
    }
    prepareFilesList(berkas) {
        this.files = [];
        for (const b of berkas) {
            this.files.push(b);
        }
        const userInput = {
            torrent_name: {
                inputLabel: 'Nama Torrent',
                inputPlaceholder: `Torrent # ${this.ss.mySocket.id} @ ${new Date().toUTCString()}`,
                inputValue: null,
                inputRequired: true
            }
        };
        if (this.files.length === 1) {
            userInput.torrent_name.inputPlaceholder = this.files[0].name;
            this.uploadFiles(userInput.torrent_name.inputPlaceholder);
        }
        else if (this.files.length > 1) {
            this.subsDialog = this.ds.openInputDialog({
                data: {
                    title: `Silahkan Masukkan Nama Untuk Torrent Kamu!`,
                    input: userInput,
                    confirmText: 'Ya, Mulai SEED',
                    cancelText: 'Tidak, Batal'
                }
            }).afterClosed().subscribe({
                next: re => {
                    this.gs.log('[INPUT_DIALOG_CLOSED]', re);
                    if (re) {
                        this.uploadFiles(re.torrent_name);
                    }
                    this.subsDialog.unsubscribe();
                }
            });
        }
    }
    onFileDropped($event) {
        this.prepareFilesList($event);
    }
    fileBrowseHandler($event) {
        this.prepareFilesList($event.target.files);
    }
    initGraph(torrent) {
        if (!this.torrentsGraph[torrent.infoHash] && this.dataSource.data.length > 0) {
            this.gs.log('[TORRENT_WIRE_INIT_GRAPH]', torrent);
            this.torrentsGraph[torrent.infoHash] = new P2PGraph(`.graphP2p-${torrent.infoHash}`);
            this.torrentsGraph[torrent.infoHash].add({
                id: this.torrent.webClient.peerId,
                me: true,
                name: 'Kamu!'
            });
        }
    }
    addAllGraph(torrent) {
        this.gs.log('[TORRENT_WIRE_RELOAD_GRAPH]', torrent);
        for (const w of torrent.wires) {
            let wireName = w.peerId || 'Anonim!';
            if (w.remoteAddress && w.remotePort) {
                wireName = `${w.remoteAddress}:${w.remotePort}`;
            }
            this.torrentsGraph[torrent.infoHash].add({ id: w.peerId, name: wireName });
            this.torrentsGraph[torrent.infoHash].connect(this.torrent.webClient.peerId, w.peerId);
        }
    }
    deleteAllGraph(torrent) {
        this.gs.log('[TORRENT_WIRE_DELETE_GRAPH]', torrent);
        const torrentWireList = this.torrentsGraph[torrent.infoHash].list().filter(w => w.id !== this.torrent.webClient.peerId);
        for (const w of torrentWireList) {
            this.torrentsGraph[torrent.infoHash].disconnect(this.torrent.webClient.peerId, w.id);
            this.torrentsGraph[torrent.infoHash].remove(w.id);
        }
    }
    refreshGraph(torrent) {
        this.gs.log('[TORRENT_WIRE_REFRESH_GRAPH]', torrent);
        if (this.torrentsGraph[torrent.infoHash]) {
            this.deleteAllGraph(torrent);
            this.addAllGraph(torrent);
        }
        else {
            this.initGraph(torrent);
        }
    }
    refreshAllGraph() {
        for (const d of this.dataSource.data) {
            this.timedOut = setTimeout(() => {
                this.refreshGraph(d);
            }, 1234);
        }
    }
}
TorrentComponent.ɵfac = function TorrentComponent_Factory(t) { return new (t || TorrentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_13__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_14__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_torrent_service__WEBPACK_IMPORTED_MODULE_3__.TorrentService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_toast_service__WEBPACK_IMPORTED_MODULE_4__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_5__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_6__.StatsServerService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_7__.BusyService)); };
TorrentComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: TorrentComponent, selectors: [["app-torrent"]], viewQuery: function TorrentComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_15__.MatSort, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
    } }, decls: 37, vars: 13, consts: [["appDragDrop", "", 1, "h-100", 3, "fileDropped"], [1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], ["hintLabel", "Isi Lalu Tekan 'Enter' Untuk Mencari Torrent ...", 1, "col-12", "col-md-6", "col-lg-4", "px-3", "mb-3", 3, "color"], ["matInput", "", "placeholder", "Ex. magnet:123qwe...!@#", 3, "ngModel", "disabled", "keyup.enter", "ngModelChange"], ["input", ""], ["matSuffix", ""], ["color", "warn", "mode", "indeterminate", 4, "ngIf"], [1, "row", "mx-2"], [1, "col-12", 2, "overflow-x", "auto"], ["mat-table", "", "matSort", "", "multiTemplateDataRows", "", 1, "bg-transparent", 3, "dataSource"], [3, "matColumnDef", 4, "ngFor", "ngForOf"], ["matColumnDef", "expandedDetail"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "element-row", 3, "expanded-row", "click", 4, "matRowDef", "matRowDefColumns"], ["mat-row", "", "class", "detail-row", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], ["type", "file", "id", "fileDropRef", "multiple", "", 2, "visibility", "hidden", 3, "disabled", "change"], ["fileDropRef", ""], ["type", "button", "mat-fab", "", "color", "warn", "matTooltip", "Seed Berkas", 1, "me-3", "mb-5", "fab-button", "animate__animated", "animate__bounce", "animate__infinite", "animate__slow", 2, "position", "fixed", "bottom", "0", "right", "0", 3, "disabled", "click"], ["color", "warn", "mode", "indeterminate"], [3, "matColumnDef"], ["mat-header-cell", "", "class", "px-3 text-center", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "px-3 text-center", "style", "cursor: pointer;", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "px-3", "text-center"], [1, "m-0"], [3, "color", 4, "ngIf"], ["mat-cell", "", 1, "px-3", "text-center", 2, "cursor", "pointer"], [4, "ngIf"], ["mat-cell", ""], [1, "element-detail"], [1, "py-3", "row"], [1, "col-3"], [1, "col-9"], ["class", "px-2 text-truncate", 4, "ngIf"], [1, "px-2", "text-truncate"], [1, "text-success", "m-0"], [4, "ngFor", "ngForOf"], [1, "p-2"], ["type", "button", "mat-stroked-button", "", 1, "m-1", "text-warning", 3, "click"], [1, "me-1"], ["type", "button", "mat-stroked-button", "", "class", "m-1 text-warning", 3, "click", 4, "ngIf"], [1, "px-2"], ["mat-subheader", "", 1, "p-0"], [3, "multiple"], ["class", "h-100", 4, "ngFor", "ngForOf"], [1, "text-success"], ["matTooltip", "Klik Untuk Menyalin!", 1, "text-primary", "text-decoration-none", 3, "click"], [1, "h-100"], ["mat-list-icon", "", 1, "ps-3"], [2, "cursor", "pointer", 3, "click"], [1, "text-warning"], ["mat-header-row", ""], ["mat-row", "", 1, "element-row", 3, "click"], ["mat-row", "", 1, "detail-row"], [1, "mat-row"], [1, "mat-cell", "text-center", "align-items-center", "p-0", 2, "background-image", "url('/assets/img/404/no-data.png')", "background-size", "contain", "background-position", "center", "background-repeat", "no-repeat", "height", "256px"], [1, "row", "align-items-center", "h-100"], [1, "col-8", "mx-auto", "text-light", "text-center", "rounded", "py-3", 2, "background-color", "rgba(128, 128, 128, 0.875)"]], template: function TorrentComponent_Template(rf, ctx) { if (rf & 1) {
        const _r83 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("fileDropped", function TorrentComponent_Template_div_fileDropped_0_listener($event) { return ctx.onFileDropped($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "h2", 6)(8, "b", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](9, "Web-SocketRTC Torrent");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "div", 3)(11, "mat-form-field", 8)(12, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](13, "Unduh Dari Info Hash / Magnet URI");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "input", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("keyup.enter", function TorrentComponent_Template_input_keyup_enter_14_listener($event) { return ctx.downloadFiles($event); })("ngModelChange", function TorrentComponent_Template_input_ngModelChange_14_listener($event) { return ctx.magnetHash = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](16, "mat-icon", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](17, "cloud_download");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](18, TorrentComponent_mat_progress_bar_18_Template, 1, 0, "mat-progress-bar", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](19, "div", 13)(20, "div", 14)(21, "table", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](22, TorrentComponent_ng_container_22_Template, 3, 1, "ng-container", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](23, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](24, TorrentComponent_td_24_Template, 28, 12, "td", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](25, TorrentComponent_tr_25_Template, 1, 0, "tr", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](26, TorrentComponent_tr_26_Template, 1, 2, "tr", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](27, TorrentComponent_tr_27_Template, 1, 0, "tr", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](28, TorrentComponent_tr_28_Template, 6, 1, "tr", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](29, "div", 3)(30, "marquee");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](32, "input", 23, 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function TorrentComponent_Template_input_change_32_listener($event) { return ctx.fileBrowseHandler($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](34, "button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function TorrentComponent_Template_button_click_34_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r83); const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](33); return _r8.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](35, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](36, "cloud_upload");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx.magnetHash)("disabled", ctx.isProcessing);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.isProcessing);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx.tableDataColumn);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("matHeaderRowDef", ctx.tableDataColumn);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("matRowDefColumns", ctx.tableDataColumn);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("matRowDefColumns", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](12, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("Terhubung Dengan Tracker :: ", ctx.ENV.torrent.trackerAnnounce.join(" :: "), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx.isProcessing);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx.isProcessing);
    } }, directives: [_shared_directives_drag_drop_directive__WEBPACK_IMPORTED_MODULE_8__.DragDropDirective, _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_9__.NotificationsComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgModel, _angular_material_icon__WEBPACK_IMPORTED_MODULE_19__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatSuffix, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__.MatProgressBar, _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatTable, _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__.MatSort, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgForOf, _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatHeaderCell, _angular_material_sort__WEBPACK_IMPORTED_MODULE_15__.MatSortHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatCell, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_22__.MatTooltip, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatButton, _angular_material_list__WEBPACK_IMPORTED_MODULE_24__.MatListSubheaderCssMatStyler, _angular_material_list__WEBPACK_IMPORTED_MODULE_24__.MatSelectionList, _angular_material_list__WEBPACK_IMPORTED_MODULE_24__.MatListOption, _angular_material_list__WEBPACK_IMPORTED_MODULE_24__.MatListIconCssMatStyler, _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_12__.MatNoDataRow], pipes: [_shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_10__.BytesPipe, _angular_common__WEBPACK_IMPORTED_MODULE_20__.DecimalPipe], styles: [".p2p-graph[_ngcontent-%COMP%] {\r\n  background-color: rgba(141, 141, 141, 0.5) !important;\r\n}\r\n\r\ntr.detail-row[_ngcontent-%COMP%] {\r\n  height: 0;\r\n}\r\n\r\ntr.element-row[_ngcontent-%COMP%]:not(.expanded-row):hover {\r\n  background-color: rgba(255, 255, 255, 0.875);\r\n}\r\n\r\n.element-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\r\n  border-bottom-width: 0;\r\n}\r\n\r\n.element-detail[_ngcontent-%COMP%] {\r\n  overflow: hidden;\r\n  display: flex;\r\n}\r\n\r\n.fileover[_ngcontent-%COMP%] {\r\n  animation: shake 1s;\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n@keyframes shake {\r\n  0% {\r\n    transform: translate(1px, 1px) rotate(0deg);\r\n  }\r\n  10% {\r\n    transform: translate(-1px, -2px) rotate(-1deg);\r\n  }\r\n  20% {\r\n    transform: translate(-3px, 0px) rotate(1deg);\r\n  }\r\n  30% {\r\n    transform: translate(3px, 2px) rotate(0deg);\r\n  }\r\n  40% {\r\n    transform: translate(1px, -1px) rotate(1deg);\r\n  }\r\n  50% {\r\n    transform: translate(-1px, 2px) rotate(-1deg);\r\n  }\r\n  60% {\r\n    transform: translate(-3px, 1px) rotate(0deg);\r\n  }\r\n  70% {\r\n    transform: translate(3px, 1px) rotate(-1deg);\r\n  }\r\n  80% {\r\n    transform: translate(-1px, -1px) rotate(1deg);\r\n  }\r\n  90% {\r\n    transform: translate(1px, 2px) rotate(0deg);\r\n  }\r\n  100% {\r\n    transform: translate(1px, -2px) rotate(-1deg);\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcnJlbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFEQUFxRDtBQUN2RDs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLDRDQUE0QztBQUM5Qzs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0U7SUFDRSwyQ0FBMkM7RUFDN0M7RUFDQTtJQUNFLDhDQUE4QztFQUNoRDtFQUNBO0lBQ0UsNENBQTRDO0VBQzlDO0VBQ0E7SUFDRSwyQ0FBMkM7RUFDN0M7RUFDQTtJQUNFLDRDQUE0QztFQUM5QztFQUNBO0lBQ0UsNkNBQTZDO0VBQy9DO0VBQ0E7SUFDRSw0Q0FBNEM7RUFDOUM7RUFDQTtJQUNFLDRDQUE0QztFQUM5QztFQUNBO0lBQ0UsNkNBQTZDO0VBQy9DO0VBQ0E7SUFDRSwyQ0FBMkM7RUFDN0M7RUFDQTtJQUNFLDZDQUE2QztFQUMvQztBQUNGIiwiZmlsZSI6InRvcnJlbnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wMnAtZ3JhcGgge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTQxLCAxNDEsIDE0MSwgMC41KSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG50ci5kZXRhaWwtcm93IHtcclxuICBoZWlnaHQ6IDA7XHJcbn1cclxuXHJcbnRyLmVsZW1lbnQtcm93Om5vdCguZXhwYW5kZWQtcm93KTpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg3NSk7XHJcbn1cclxuXHJcbi5lbGVtZW50LXJvdyB0ZCB7XHJcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMDtcclxufVxyXG5cclxuLmVsZW1lbnQtZGV0YWlsIHtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbn1cclxuXHJcbi5maWxlb3ZlciB7XHJcbiAgYW5pbWF0aW9uOiBzaGFrZSAxcztcclxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcclxufVxyXG5cclxuQGtleWZyYW1lcyBzaGFrZSB7XHJcbiAgMCUge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMXB4LCAxcHgpIHJvdGF0ZSgwZGVnKTtcclxuICB9XHJcbiAgMTAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xcHgsIC0ycHgpIHJvdGF0ZSgtMWRlZyk7XHJcbiAgfVxyXG4gIDIwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtM3B4LCAwcHgpIHJvdGF0ZSgxZGVnKTtcclxuICB9XHJcbiAgMzAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDNweCwgMnB4KSByb3RhdGUoMGRlZyk7XHJcbiAgfVxyXG4gIDQwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxcHgsIC0xcHgpIHJvdGF0ZSgxZGVnKTtcclxuICB9XHJcbiAgNTAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xcHgsIDJweCkgcm90YXRlKC0xZGVnKTtcclxuICB9XHJcbiAgNjAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0zcHgsIDFweCkgcm90YXRlKDBkZWcpO1xyXG4gIH1cclxuICA3MCUge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoM3B4LCAxcHgpIHJvdGF0ZSgtMWRlZyk7XHJcbiAgfVxyXG4gIDgwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMXB4LCAtMXB4KSByb3RhdGUoMWRlZyk7XHJcbiAgfVxyXG4gIDkwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxcHgsIDJweCkgcm90YXRlKDBkZWcpO1xyXG4gIH1cclxuICAxMDAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDFweCwgLTJweCkgcm90YXRlKC0xZGVnKTtcclxuICB9XHJcbn0iXX0= */"], data: { animation: [
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_25__.trigger)('detailExpand', [
                (0,_angular_animations__WEBPACK_IMPORTED_MODULE_25__.state)('collapsed', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_25__.style)({ height: '0px', minHeight: '0' })),
                (0,_angular_animations__WEBPACK_IMPORTED_MODULE_25__.state)('expanded', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_25__.style)({ height: '*' })),
                (0,_angular_animations__WEBPACK_IMPORTED_MODULE_25__.transition)('expanded <=> collapsed', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_25__.animate)('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ])
        ] } });


/***/ }),

/***/ 39692:
/*!**************************************************!*\
  !*** ./src/app/_pages/torrent/torrent.module.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TorrentModule": () => (/* binding */ TorrentModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _torrent_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./torrent.component */ 41088);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/pipes/custom-pipe.module */ 67355);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/components/material-chip/material-chip.module */ 54946);
/* harmony import */ var _shared_directives_custom_directive_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/directives/custom-directive.module */ 17956);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);











const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _torrent_component__WEBPACK_IMPORTED_MODULE_0__.TorrentComponent
    }
];
class TorrentModule {
}
TorrentModule.ɵfac = function TorrentModule_Factory(t) { return new (t || TorrentModule)(); };
TorrentModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: TorrentModule });
TorrentModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forChild(routes),
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _shared_directives_custom_directive_module__WEBPACK_IMPORTED_MODULE_5__.CustomDirectivesModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_3__.NotificationsModule,
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
            _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_4__.MaterialChipModule,
            _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_2__.CustomPipeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](TorrentModule, { declarations: [_torrent_component__WEBPACK_IMPORTED_MODULE_0__.TorrentComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
        _shared_directives_custom_directive_module__WEBPACK_IMPORTED_MODULE_5__.CustomDirectivesModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_3__.NotificationsModule,
        _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
        _shared_components_material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_4__.MaterialChipModule,
        _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_2__.CustomPipeModule] }); })();


/***/ }),

/***/ 11189:
/*!*****************************************************!*\
  !*** ./src/app/_shared/services/torrent.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TorrentService": () => (/* binding */ TorrentService)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var idb_chunk_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! idb-chunk-store */ 48442);
/* harmony import */ var idb_chunk_store__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(idb_chunk_store__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 76317);
/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! idb */ 41511);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! buffer */ 13195);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global.service */ 80855);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _toast_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./toast.service */ 96925);
/* harmony import */ var _local_storage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./local-storage.service */ 53379);











class TorrentService {
  constructor(gs, api, toast, ls) {
    this.gs = gs;
    this.api = api;
    this.toast = toast;
    this.ls = ls;
    this.trackerAnnounce = _environments_app_environment__WEBPACK_IMPORTED_MODULE_4__.environment.torrent.trackerAnnounce;
    this.clientOptions = {
      maxConns: 64,
      tracker: {
        announce: this.trackerAnnounce,
        rtcConfig: {
          iceServers: _environments_app_environment__WEBPACK_IMPORTED_MODULE_4__.environment.torrent.iceServers
        }
      }
    };
    this.torrentsQueue = {// 'magnet:!@#123...zxc': {
      //   completed?: boolean;
      //   indexedDb?: string;
      //   infoHash?: string;
      //   name?: string;
      //   files?: any[];
      // }
    };
    this.torrentOptions = {
      announce: this.trackerAnnounce,
      maxWebConns: 16,
      store: (idb_chunk_store__WEBPACK_IMPORTED_MODULE_1___default())
    };
    this.webClient = null;
    this.expandedRow = null;
    this.tableDataRowSubject = new rxjs__WEBPACK_IMPORTED_MODULE_9__.BehaviorSubject([]);
    this.tableDataRow = this.tableDataRowSubject.asObservable();
    this.error = null;
    this.refCallback = null;
    this.flagResurrected = false;

    if (this.gs.isBrowser) {
      this.torrentsQueue = this.ls.getItem(this.gs.localStorageKeys.Torrents, true) || this.torrentsQueue;

      if (WebTorrent.WEBRTC_SUPPORT) {
        this.webClient = new WebTorrent(this.clientOptions);
        this.gs.log('[TORRENT_CLIENT_WEB_MODE_INITIALIZED]', this.webClient);
        this.handleWebClient();
      } else {
        this.toast.error('WebRTC Not Supported!', 'Whoops!', null, true);
      }
    }
  }

  get tableDataRowValue() {
    var _a;

    return ((_a = this.tableDataRowSubject) === null || _a === void 0 ? void 0 : _a.value) || [];
  }

  checkHealthOnTracker(torrentInfo) {
    return this.api.postData(`/torrent`, torrentInfo);
  }

  handleWebClient() {
    this.webClient.on('torrent', torrent => {
      this.gs.log('[TORRENT_CLIENT_ADD_TORRENT_FILE]', torrent);
      this.toast.info(torrent.infoHash, 'Woaw, Antrian Baru!', null, true);
      this.tableDataRowValue.push(torrent);
      this.tableDataRowSubject.next(this.tableDataRowValue);

      if (this.refCallback) {
        this.refCallback(null, torrent);
      }
    });
    this.webClient.on('error', err => {
      this.gs.log('[TORRENT_CLIENT_ERROR]', err, 'error');
      this.toast.error(err.toString(), 'Whoops!', null, true);
      this.error = err;

      if (this.refCallback) {
        this.refCallback(this.error, null);
      }
    });
  }

  handleWebTorrent(torrent, callback) {
    torrent.on('done', () => {
      this.gs.log('[TORRENT_FILE_DONE]', torrent);
      this.toast.success(`Ada Torrent Yang Sudah Selesai Di Download`, 'Yeay, Selesai!', null, true);
      this.torrentsQueue[torrent.infoHash].completed = true;
      this.ls.setItem(this.gs.localStorageKeys.Torrents, this.torrentsQueue);

      if (callback) {
        callback(null, null);
      }
    });
    torrent.on('warning', warn => {
      this.gs.log('[TORRENT_FILE_WARNING]', warn);
      this.toast.info(warn.toString(), 'Yuhuu!', null, true);

      if (callback) {
        callback(warn, null);
      }
    });
    torrent.on('error', err => {
      this.gs.log('[TORRENT_FILE_ERROR]', err, 'error');
      this.toast.error(err.toString(), 'Whoops!', null, true);

      if (callback) {
        callback(err, null);
      }
    });
  }

  handleWebWire(wire, callback) {
    this.gs.log('[TORRENT_WIRE_CONNECT]', wire);
    let wireName = wire.peerId || 'Unknown!';

    if (wire['remoteAddress'] && wire['remotePort']) {
      wireName = `${wire['remoteAddress']}:${wire['remotePort']}`;
    }

    wire.on('close', () => {
      this.gs.log('[TORRENT_WIRE_DISCONNECT]', wireName);

      if (callback) {
        callback(null, wire);
      }
    });

    if (callback) {
      callback(null, wire);
    }
  }

  resurrectFiles(callback) {
    var _this = this;

    if (!this.flagResurrected) {
      this.flagResurrected = true;

      for (const key in this.torrentsQueue) {
        this.gs.log('[TORRENT_CLIENT_QUEUE_RESURRECT]', this.torrentsQueue[key]);

        if (!this.torrentsQueue[key].completed) {
          this.downloadFiles(this.torrentsQueue[key].infoHash, callback, { ...this.torrentOptions,
            name: this.torrentsQueue[key].name
          });
        } else {
          (0,idb__WEBPACK_IMPORTED_MODULE_2__.openDB)(this.torrentsQueue[key].indexedDb, 1).then( /*#__PURE__*/function () {
            var _ref = (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (db) {
              const trx = db.transaction('chunks', 'readonly');
              const store = trx.objectStore('chunks');
              const uint8Array = yield store.getAll();
              const buffer = buffer__WEBPACK_IMPORTED_MODULE_3__.Buffer.concat(uint8Array);
              const files = [];

              for (const file of _this.torrentsQueue[key].files) {
                const tf = file;
                files.push(new File([buffer.slice(tf.offset, tf.offset + tf.length)], tf.name));
              }

              _this.uploadFiles(_this.torrentsQueue[key].name, files, callback);
            });

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }()).catch(err => this.gs.log('[INDEXDB-OPEN_FAILED]', err, 'error'));
        }
      }
    }

    callback(null, null);
  }

  processTorrent(torrent, completed, callback) {
    torrent.on('wire', wire => this.handleWebWire(wire, callback));
    this.torrentsQueue[torrent.infoHash] = {
      completed: completed,
      indexedDb: torrent.name + ' - ' + torrent.infoHash.slice(0, 8),
      infoHash: torrent.infoHash,
      name: torrent.name,
      files: []
    };

    for (const file of torrent.files) {
      const tf = file;
      this.torrentsQueue[torrent.infoHash].files.push({
        name: tf.name,
        offset: tf.offset,
        length: tf.length
      });
    }

    this.ls.setItem(this.gs.localStorageKeys.Torrents, this.torrentsQueue);
    this.handleWebTorrent(torrent, callback);
  }

  downloadFiles(magnetHash, callback, opts = this.torrentOptions) {
    this.gs.log('[TORRENT_CLIENT_QUEUE_DOWNLOAD]', magnetHash);
    this.refCallback = callback;
    this.checkHealthOnTracker({
      magnetHash,
      trackTimeout: 1234
    }).subscribe({
      next: res => {
        this.gs.log('[TORRENT_CLIENT_HEALTH_SUCCESS]', res.result);

        if (res.result.seeds <= 0) {
          this.toast.info('Tidak Ada Seeder!', 'Whoops!', null, true);

          if (callback) {
            callback(null, res.result);
          }
        } else {
          this.webClient.add(magnetHash, opts, torrent => {
            this.gs.log('[TORRENT_FILE_DOWNLOAD_READY]', torrent);
            this.toast.info('Memulai Download ...', 'Download!', null, true);
            this.processTorrent(torrent, false, callback);
          });
        }
      },
      error: err => {
        this.gs.log('[TORRENT_CLIENT_HEALTH_ERROR]', err, 'error');

        if (callback) {
          callback(err, null);
        }
      }
    });
  }

  uploadFiles(torrentName, files, callback) {
    this.gs.log('[TORRENT_CLIENT_QUEUE_UPLOAD]', files);
    this.gs.log('[TORRENT_CLIENT_QUEUE_UPLOAD]', torrentName);
    this.refCallback = callback;
    this.webClient.seed(files, { ...this.torrentOptions,
      name: torrentName
    }, torrent => {
      this.gs.log('[TORRENT_FILE_SEED_READY]', torrent);
      this.toast.info('Memulai Seeding ...', 'Seeding', null, true);
      this.processTorrent(torrent, true, callback);
    });
  }

  removeTorrent(torrentId, callback, saveLocalStorage = true) {
    this.tableDataRowSubject.next(this.tableDataRowValue.filter(el => el.infoHash !== torrentId));
    this.webClient.remove(torrentId, {
      destroyStore: true
    }, err => {
      if (err) {
        this.gs.log('[TORRENT_FILE_REMOVE_ERROR]', err, 'error');
      }

      delete this.torrentsQueue[torrentId];

      if (saveLocalStorage) {
        this.ls.setItem(this.gs.localStorageKeys.Torrents, this.torrentsQueue);
      }

      if (callback) {
        callback(err);
      }
    });
  }

  pauseTorrent(torrentId, callback) {
    const torrent = this.webClient.get(torrentId);

    if (torrent) {
      torrent.pause();

      if (callback) {
        callback(torrent);
      }
    }
  }

  resumeTorrent(torrentId, callback) {
    const torrent = this.webClient.get(torrentId);

    if (torrent) {
      torrent.resume();

      if (callback) {
        callback(torrent);
      }
    }
  }

  removeAll() {
    for (const t of this.webClient.torrents) {
      this.removeTorrent(t.infoHash, error => {
        if (!error) {
          this.gs.log('[TORRENT_FILE_REMOVE_SUCCESS]', t.infoHash);
        }
      }, false);
    }
  }

}

TorrentService.ɵfac = function TorrentService_Factory(t) {
  return new (t || TorrentService)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_6__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_toast_service__WEBPACK_IMPORTED_MODULE_7__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_local_storage_service__WEBPACK_IMPORTED_MODULE_8__.LocalStorageService));
};

TorrentService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
  token: TorrentService,
  factory: TorrentService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 83358:
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ 48442:
/*!***********************************************!*\
  !*** ./node_modules/idb-chunk-store/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _asyncToGenerator = (__webpack_require__(/*! ./node_modules/@babel/runtime/helpers/asyncToGenerator.js */ 63752)["default"]);

const idb = __webpack_require__(/*! idb */ 41511);

const EventEmitter = (__webpack_require__(/*! events */ 83358).EventEmitter);

const queueMicrotask = __webpack_require__(/*! queue-microtask */ 12097);

class Storage extends EventEmitter {
  constructor(chunkLength, opts) {
    if (!opts) opts = {};
    super();
    this.chunkLength = Number(chunkLength);
    if (!this.chunkLength) throw new Error('First argument must be a chunk length');
    this.closed = false;
    this.destroyed = false;
    this.length = Number(opts.length) || Infinity;
    this.name = opts.name || 'idb-chunk-store';

    if (this.length !== Infinity) {
      this.lastChunkLength = this.length % this.chunkLength || this.chunkLength;
      this.lastChunkIndex = Math.ceil(this.length / this.chunkLength) - 1;
    }

    this.dbPromise = idb.openDB(this.name, undefined, {
      upgrade: db => {
        db.createObjectStore('chunks');
      },
      blocking: () => {
        // Fires if the database is deleted from outside this Storage object
        this.close();
      },
      terminated: () => {
        this.closed = true;
        this.emit('error', new Error('Database unexpectedly closed'));
      }
    });
  }

  put(index, buf, cb = () => {}) {
    var _this = this;

    if (this.closed) return queueMicrotask(() => cb(new Error('Storage is closed')));
    const isLastChunk = index === this.lastChunkIndex;

    if (isLastChunk && buf.length !== this.lastChunkLength) {
      return queueMicrotask(() => cb(new Error('Last chunk length must be ' + this.lastChunkLength)));
    }

    if (!isLastChunk && buf.length !== this.chunkLength) {
      return queueMicrotask(() => cb(new Error('Chunk length must be ' + this.chunkLength)));
    } // Zero-copy coerce Buffer to Uint8Array


    buf = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength); // If the backing buffer is larger, copy out only the relevant slice
    // so extra data doesn't get saved to indexeddb

    if (buf.byteOffset !== 0 || buf.byteLength !== buf.buffer.byteLength) {
      buf = buf.slice();
    }

    ;

    _asyncToGenerator(function* () {
      try {
        const db = yield _this.dbPromise;
        yield db.put('chunks', buf, index);
      } catch (err) {
        cb(err);
        return;
      }

      cb(null);
    })();
  }

  get(index, opts, cb = () => {}) {
    var _this2 = this;

    if (typeof opts === 'function') return this.get(index, {}, opts);
    if (!opts) opts = {};
    if (this.closed) return queueMicrotask(() => cb(new Error('Storage is closed')));

    _asyncToGenerator(function* () {
      let rawResult;

      try {
        const db = yield _this2.dbPromise;
        rawResult = yield db.get('chunks', index);
      } catch (err) {
        cb(err);
        return;
      } // rawResult should be undefined if the chunk is not found,
      // but some old browsers occasionally return null


      if (rawResult == null) {
        const err = new Error('Chunk not found');
        err.notFound = true;
        cb(err);
        return;
      }

      let buf = Buffer.from(rawResult.buffer, rawResult.byteOffset, rawResult.byteLength);
      const offset = opts.offset || 0;
      const len = opts.length || buf.length - offset;

      if (offset !== 0 || len !== buf.length) {
        buf = buf.slice(offset, len + offset);
      }

      cb(null, buf);
    })();
  }

  close(cb = () => {}) {
    var _this3 = this;

    if (this.closed) return queueMicrotask(() => cb(new Error('Storage is closed')));
    this.closed = true;

    _asyncToGenerator(function* () {
      try {
        const db = yield _this3.dbPromise;
        db.close();
      } catch (err) {
        cb(err);
        return;
      }

      cb(null);
    })();
  }

  destroy(cb = () => {}) {
    var _this4 = this;

    if (this.closed) return queueMicrotask(() => cb(new Error('Storage is closed')));
    if (this.destroyed) return queueMicrotask(() => cb(new Error('Storage is destroyed')));
    this.destroyed = true;
    this.close( /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(function* (err) {
        if (err) {
          cb(err);
          return;
        }

        try {
          yield idb.deleteDB(_this4.name);
        } catch (err) {
          cb(err);
          return;
        }

        cb(null);
      });

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }());
  }

}

module.exports = Storage;

/***/ }),

/***/ 41511:
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteDB": () => (/* binding */ deleteDB),
/* harmony export */   "openDB": () => (/* binding */ openDB),
/* harmony export */   "unwrap": () => (/* reexport safe */ _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_1__.u),
/* harmony export */   "wrap": () => (/* reexport safe */ _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_1__.w)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrap-idb-value.js */ 1303);



/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */

function openDB(name, version, {
  blocked,
  upgrade,
  blocking,
  terminated
} = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = (0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_1__.w)(request);

  if (upgrade) {
    request.addEventListener('upgradeneeded', event => {
      upgrade((0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_1__.w)(request.result), event.oldVersion, event.newVersion, (0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_1__.w)(request.transaction));
    });
  }

  if (blocked) request.addEventListener('blocked', () => blocked());
  openPromise.then(db => {
    if (terminated) db.addEventListener('close', () => terminated());
    if (blocking) db.addEventListener('versionchange', () => blocking());
  }).catch(() => {});
  return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */


function deleteDB(name, {
  blocked
} = {}) {
  const request = indexedDB.deleteDatabase(name);
  if (blocked) request.addEventListener('blocked', () => blocked());
  return (0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_1__.w)(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();

function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
    return;
  }

  if (cachedMethods.get(prop)) return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, '');
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);

  if ( // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
  !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }

  const method = /*#__PURE__*/function () {
    var _ref = (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (storeName, ...args) {
      // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
      const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
      let target = tx.store;
      if (useIndex) target = target.index(args.shift()); // Must reject if op rejects.
      // If it's a write operation, must reject if tx.done rejects.
      // Must reject with op rejection first.
      // Must resolve with op value.
      // Must handle both promises (no unhandled rejections)

      return (yield Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
    });

    return function method(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  cachedMethods.set(prop, method);
  return method;
}

(0,_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_1__.r)(oldTraps => ({ ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));


/***/ }),

/***/ 1303:
/*!******************************************************!*\
  !*** ./node_modules/idb/build/esm/wrap-idb-value.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ reverseTransformCache),
/* harmony export */   "i": () => (/* binding */ instanceOfAny),
/* harmony export */   "r": () => (/* binding */ replaceTraps),
/* harmony export */   "u": () => (/* binding */ unwrap),
/* harmony export */   "w": () => (/* binding */ wrap)
/* harmony export */ });
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise
        .then((value) => {
        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
        // (see wrapFunction).
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
        // Catching to avoid "Uncaught Promise exceptions"
    })
        .catch(() => { });
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Polyfill for objectStoreNames because of Edge.
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction &&
        !('objectStoreNames' in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
            return wrap(tx);
        };
    }
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);




/***/ }),

/***/ 12097:
/*!***********************************************!*\
  !*** ./node_modules/queue-microtask/index.js ***!
  \***********************************************/
/***/ ((module) => {

/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise

module.exports = typeof queueMicrotask === 'function'
  ? queueMicrotask.bind(typeof window !== 'undefined' ? window : global)
  // reuse resolved promise, and allocate it lazily
  : cb => (promise || (promise = Promise.resolve()))
    .then(cb)
    .catch(err => setTimeout(() => { throw err }, 0))


/***/ }),

/***/ 63752:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/***/ ((module) => {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

}]);
//# sourceMappingURL=src_app__pages_torrent_torrent_module_ts.js.map