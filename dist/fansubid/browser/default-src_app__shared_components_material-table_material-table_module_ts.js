"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["default-src_app__shared_components_material-table_material-table_module_ts"],{

/***/ 30578:
/*!*******************************************************************************!*\
  !*** ./src/app/_shared/components/material-table/material-table.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialTableComponent": () => (/* binding */ MaterialTableComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/paginator */ 26439);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/sort */ 64316);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/table */ 97217);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _material_chip_material_chip_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../material-chip/material-chip.component */ 24028);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pipes/date-ago.pipe */ 86766);





















function MaterialTableComponent_ng_container_11_th_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 15)(1, "h3", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", tdc_r5.toUpperCase() !== "NAMA BERKAS" && tdc_r5.toUpperCase() !== "NAMA LAMPIRAN" && tdc_r5.toUpperCase() !== "TANGGAL" && tdc_r5.toUpperCase() !== "NAMA FANSUB" && tdc_r5.toUpperCase() !== "JUDUL DORAMA" && tdc_r5.toUpperCase() !== "TOPIK" && tdc_r5.toUpperCase() !== "JUDUL ANIME" && tdc_r5.toUpperCase() !== "ANIME" && tdc_r5.toUpperCase() !== "DORAMA" && tdc_r5.toUpperCase() !== "EXT" && tdc_r5.toUpperCase() !== "JENIS" && tdc_r5.toUpperCase() !== "DEADLINE" && tdc_r5.toUpperCase() !== "JUDUL" && tdc_r5.toUpperCase() !== "KONTEN" && tdc_r5.toUpperCase() !== "SIZE" && tdc_r5.toUpperCase() !== "ID" && tdc_r5.toUpperCase() !== "ALASAN" && tdc_r5.toUpperCase() !== "NAMA API" && tdc_r5.toUpperCase() !== "IP DOMAIN" && tdc_r5.toUpperCase() !== "MIME" && tdc_r5.toUpperCase() !== "API KEY" && tdc_r5.toUpperCase() !== "USERNAME" && tdc_r5.toUpperCase() !== "EMAIL" && tdc_r5.toUpperCase() !== "ROLE" && tdc_r5.toUpperCase() !== "KETERANGAN");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("color", "#ff4081");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](tdc_r5.toUpperCase());
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_img_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 27);
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", row_r9.foto, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_img_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 27);
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", row_r9.foto_korban, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_img_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 27);
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", row_r9.foto_pelaku, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_img_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 27);
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", row_r9.foto_fansub, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_img_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 27);
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", row_r9.foto_anggota, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_img_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 28);
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", row_r9[tdc_r5], _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_img_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 29);
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", row_r9[tdc_r5], _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_img_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 30);
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", row_r9[tdc_r5], _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_span_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "dateAgo");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](1, 2, row_r9[tdc_r5], "d MMMM y, hh:mm:ss a z"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 5, row_r9[tdc_r5]));
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_span_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 1, row_r9[tdc_r5], "d/M/yy, HH:mm:ss"));
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_span_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", row_r9[tdc_r5] || 0, " Anime");
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_span_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", row_r9[tdc_r5] || 0, " Dorama");
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_span_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", row_r9[tdc_r5], "x Dilihat");
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_span_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("overflow-wrap", tdc_r5.toUpperCase() === "NAMA BERKAS" || tdc_r5.toUpperCase() === "JUDUL ANIME" || tdc_r5.toUpperCase() === "JUDUL DORAMA" || tdc_r5.toUpperCase() === "NAMA FANSUB" || tdc_r5.toUpperCase() === "TOPIK" || tdc_r5.toUpperCase() === "JUDUL SURAT KABAR" || tdc_r5.toUpperCase() === "JUDUL" || tdc_r5.toUpperCase() === "ALASAN" || tdc_r5.toUpperCase() === "NAMA LAMPIRAN" || tdc_r5.toUpperCase() === "NAMA API" || tdc_r5.toUpperCase() === "IP DOMAIN" || tdc_r5.toUpperCase() === "PENERIMA" || tdc_r5.toUpperCase() === "KETERANGAN" || tdc_r5.toUpperCase() === "DESKRIPSI" || tdc_r5.toUpperCase() === "KONTEN" || tdc_r5.toUpperCase() === "NAMA LENGKAP" || tdc_r5.toUpperCase() === "EMAIL" ? "anywhere" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matTooltip", tdc_r5.toUpperCase() === "NAMA BERKAS" || tdc_r5.toUpperCase() === "PENGIRIM" || tdc_r5.toUpperCase() === "PENERIMA" || tdc_r5.toUpperCase() === "NAMA LENGKAP" || tdc_r5.toUpperCase() === "TOPIK" || tdc_r5.toUpperCase() === "JUDUL SURAT KABAR" || tdc_r5.toUpperCase() === "JUDUL" || tdc_r5.toUpperCase() === "ALASAN" || tdc_r5.toUpperCase() === "NAMA LAMPIRAN" || tdc_r5.toUpperCase() === "NAMA API" || tdc_r5.toUpperCase() === "IP DOMAIN" || tdc_r5.toUpperCase() === "EMAIL" || tdc_r5.toUpperCase() === "KETERANGAN" || tdc_r5.toUpperCase() === "DESKRIPSI" || tdc_r5.toUpperCase() === "KONTEN" || tdc_r5.toUpperCase() === "PEMILIK" || tdc_r5.toUpperCase() === "PENULIS" ? row_r9[tdc_r5] : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", row_r9[tdc_r5], " ");
} }
function MaterialTableComponent_ng_container_11_td_2_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, MaterialTableComponent_ng_container_11_td_2_div_1_img_2_Template, 1, 1, "img", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, MaterialTableComponent_ng_container_11_td_2_div_1_img_3_Template, 1, 1, "img", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, MaterialTableComponent_ng_container_11_td_2_div_1_img_4_Template, 1, 1, "img", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, MaterialTableComponent_ng_container_11_td_2_div_1_img_5_Template, 1, 1, "img", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, MaterialTableComponent_ng_container_11_td_2_div_1_img_6_Template, 1, 1, "img", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, MaterialTableComponent_ng_container_11_td_2_div_1_img_7_Template, 1, 1, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, MaterialTableComponent_ng_container_11_td_2_div_1_img_8_Template, 1, 1, "img", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, MaterialTableComponent_ng_container_11_td_2_div_1_img_9_Template, 1, 1, "img", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, MaterialTableComponent_ng_container_11_td_2_div_1_span_10_Template, 4, 7, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, MaterialTableComponent_ng_container_11_td_2_div_1_span_11_Template, 3, 4, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, MaterialTableComponent_ng_container_11_td_2_div_1_span_12_Template, 2, 1, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, MaterialTableComponent_ng_container_11_td_2_div_1_span_13_Template, 2, 1, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, MaterialTableComponent_ng_container_11_td_2_div_1_span_14_Template, 2, 1, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, MaterialTableComponent_ng_container_11_td_2_div_1_span_15_Template, 2, 4, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2).$implicit;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](tdc_r5.toUpperCase() === "ANGGOTA" || tdc_r5.toUpperCase() === "PELAKU" || tdc_r5.toUpperCase() === "KORBAN" || tdc_r5.toUpperCase() === "FANSUB" || tdc_r5.toUpperCase() === "TANGGAL" || tdc_r5.toUpperCase() === "PEMILIK" || tdc_r5.toUpperCase() === "PENULIS" ? "fixed-single" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMapInterpolate1"]("m-0 ", ctx_r10.GS.isDesktop && (tdc_r5.toUpperCase() === "NAMA BERKAS" || tdc_r5.toUpperCase() === "PENGIRIM" || tdc_r5.toUpperCase() === "PENERIMA" || tdc_r5.toUpperCase() === "NAMA LENGKAP" || tdc_r5.toUpperCase() === "TOPIK" || tdc_r5.toUpperCase() === "JUDUL SURAT KABAR" || tdc_r5.toUpperCase() === "JUDUL" || tdc_r5.toUpperCase() === "ALASAN" || tdc_r5.toUpperCase() === "NAMA LAMPIRAN" || tdc_r5.toUpperCase() === "NAMA API" || tdc_r5.toUpperCase() === "IP DOMAIN" || tdc_r5.toUpperCase() === "EMAIL" || tdc_r5.toUpperCase() === "KETERANGAN" || tdc_r5.toUpperCase() === "DESKRIPSI" || tdc_r5.toUpperCase() === "KONTEN" || tdc_r5.toUpperCase() === "PEMILIK" || tdc_r5.toUpperCase() === "PENULIS") ? "text-truncate" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("color", tdc_r5.toUpperCase() === "PEMILIK" || tdc_r5.toUpperCase() === "PENULIS" || tdc_r5.toUpperCase() === "STATUS" || tdc_r5.toUpperCase() === "KORBAN" || tdc_r5.toUpperCase() === "FANSUB" ? ctx_r10.GS.isDarkMode ? "#ffc107" : "#0d6efd" : tdc_r5.toUpperCase() === "TANGGAL" || tdc_r5.toUpperCase() === "PELAKU" || tdc_r5.toUpperCase() === "JUDUL" || tdc_r5.toUpperCase() === "ANGGOTA" ? "#28a745" : tdc_r5.toUpperCase() === "JENIS" || tdc_r5.toUpperCase() === "PROYEK" ? "#7289da" : ctx_r10.GS.isDarkMode ? "#acacac" : "#000000");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "PEMILIK" || tdc_r5.toUpperCase() === "PENULIS");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "KORBAN");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "PELAKU");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "FANSUB");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "ANGGOTA");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "LOGO");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "IMAGE");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "POSTER");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "TANGGAL");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "DEADLINE");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "ANIME");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "DORAMA");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() === "KUNJUNGAN");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", tdc_r5.toUpperCase() !== "POSTER" && tdc_r5.toUpperCase() !== "LOGO" && tdc_r5.toUpperCase() !== "IMAGE" && tdc_r5.toUpperCase() !== "TANGGAL" && tdc_r5.toUpperCase() !== "DEADLINE" && tdc_r5.toUpperCase() !== "ANIME" && tdc_r5.toUpperCase() !== "DORAMA" && tdc_r5.toUpperCase() !== "KUNJUNGAN");
} }
function MaterialTableComponent_ng_container_11_td_2_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 32)(1, "app-material-chip", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("chipClicked", function MaterialTableComponent_ng_container_11_td_2_div_2_Template_app_material_chip_chipClicked_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r52); const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3); return ctx_r51.onChipClicked($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("chipData", row_r9[tdc_r5]);
} }
function MaterialTableComponent_ng_container_11_td_2_div_3_button_1_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const rt_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](rt_r56.icon);
} }
function MaterialTableComponent_ng_container_11_td_2_div_3_button_1_img_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 37);
} if (rf & 2) {
    const rt_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("src", rt_r56.image, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function MaterialTableComponent_ng_container_11_td_2_div_3_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r62 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function MaterialTableComponent_ng_container_11_td_2_div_3_button_1_Template_button_click_0_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r62); const rt_r56 = restoredCtx.$implicit; const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](4); $event.stopPropagation(); return ctx_r61.onButtonClicked(rt_r56); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, MaterialTableComponent_ng_container_11_td_2_div_3_button_1_mat_icon_1_Template, 2, 1, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, MaterialTableComponent_ng_container_11_td_2_div_3_button_1_img_2_Template, 1, 1, "img", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const rt_r56 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("matTooltip", rt_r56.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", rt_r56.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", rt_r56.image);
} }
function MaterialTableComponent_ng_container_11_td_2_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, MaterialTableComponent_ng_container_11_td_2_div_3_button_1_Template, 3, 3, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", row_r9[tdc_r5]);
} }
function MaterialTableComponent_ng_container_11_td_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, MaterialTableComponent_ng_container_11_td_2_div_1_Template, 16, 22, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, MaterialTableComponent_ng_container_11_td_2_div_2_Template, 2, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, MaterialTableComponent_ng_container_11_td_2_div_3_Template, 2, 1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r9 = ctx.$implicit;
    const tdc_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("background-color", row_r9.pending || row_r9.private || row_r9.banned ? ctx_r7.GS.isDarkMode ? "rgba(47, 79, 79, 0.25)" : "rgba(47, 79, 79, 0.0625)" : "")("max-width", ctx_r7.GS.isDesktop && (tdc_r5.toUpperCase() === "NAMA BERKAS" || tdc_r5.toUpperCase() === "PENGIRIM" || tdc_r5.toUpperCase() === "PENERIMA" || tdc_r5.toUpperCase() === "NAMA LENGKAP" || tdc_r5.toUpperCase() === "TOPIK" || tdc_r5.toUpperCase() === "JUDUL SURAT KABAR" || tdc_r5.toUpperCase() === "JUDUL" || tdc_r5.toUpperCase() === "ALASAN" || tdc_r5.toUpperCase() === "NAMA LAMPIRAN" || tdc_r5.toUpperCase() === "NAMA API" || tdc_r5.toUpperCase() === "IP DOMAIN" || tdc_r5.toUpperCase() === "EMAIL" || tdc_r5.toUpperCase() === "KETERANGAN" || tdc_r5.toUpperCase() === "DESKRIPSI" || tdc_r5.toUpperCase() === "KONTEN") ? "30vw" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r7.checkIsArray(row_r9[tdc_r5]) === false);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r7.checkIsArray(row_r9[tdc_r5]) === true && row_r9[tdc_r5].length > 0 && row_r9[tdc_r5][0].type === "chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r7.checkIsArray(row_r9[tdc_r5]) === true && row_r9[tdc_r5].length > 0 && row_r9[tdc_r5][0].type === "button");
} }
function MaterialTableComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, MaterialTableComponent_ng_container_11_th_1_Template, 3, 4, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, MaterialTableComponent_ng_container_11_td_2_Template, 4, 7, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const tdc_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("matColumnDef", tdc_r5);
} }
function MaterialTableComponent_tr_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "tr", 38);
} }
function MaterialTableComponent_tr_13_Template(rf, ctx) { if (rf & 1) {
    const _r68 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function MaterialTableComponent_tr_13_Template_tr_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r68); const row_r66 = restoredCtx.$implicit; const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r67.onRowClicked(row_r66); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r66 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassMap"](row_r66.trusted ? "gradient-border" + (ctx_r3.GS.isDesktop ? "" : " rgb-border") : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matRippleDisabled", ctx_r3.GS.isDesktop);
} }
function MaterialTableComponent_tr_14_br_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "br");
} }
function MaterialTableComponent_tr_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr", 40)(1, "td", 41)(2, "div", 42)(3, "div", 43)(4, "h3", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, " Tidak Ada Data ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, MaterialTableComponent_tr_14_br_6_Template, 1, 0, "br", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, " \u00AF\\_(\u30C4)_/\u00AF ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "h3", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matRippleDisabled", ctx_r4.GS.isDesktop);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵattribute"]("colspan", ctx_r4.tableDataColumn.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r4.GS.isDesktop);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_r0.value ? "\"" + _r0.value + "\"" : "");
} }
class MaterialTableComponent {
    constructor(activatedRoute, router, gs) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.gs = gs;
        this.count = 0;
        this.serverSide = false;
        this.serverSideFilter = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this.serverSideOrder = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this.tableDataRow = [];
        this.tableDataColumn = [];
        this.tablePageSizeOptions = [10, 25, 50, 75, 100];
        this.chipClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this.buttonClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this.rowClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this.paginatorClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this.urlPath = null;
        this.searchQuery = '';
        this.subsQueryParam = null;
        this.timedOut = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    get GS() {
        return this.gs;
    }
    checkIsArray(data) {
        return Array.isArray(data);
    }
    ngOnInit() {
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatTableDataSource(this.tableDataRow);
        if (this.gs.isBrowser) {
            this.urlPath = this.router.url.split('?')[0];
            if (!this.serverSide) {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        }
    }
    ngOnChanges() {
        if (this.dataSource) {
            this.dataSource.data = this.tableDataRow;
            if (!this.serverSide) {
                this.paginator._changePageSize(this.tablePageSizeOptions[0]);
                this.paginator.firstPage();
            }
        }
    }
    ngOnDestroy() {
        var _a, _b, _c;
        (_b = (_a = this.sort) === null || _a === void 0 ? void 0 : _a.sortChange) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsQueryParam) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        if (this.timedOut) {
            clearTimeout(this.timedOut);
            this.timedOut = null;
        }
    }
    ngAfterViewInit() {
        this.sort.sortChange.subscribe({
            next: (data) => {
                this.paginator.pageIndex = 0;
                this.onServerSideOrder(data);
            }
        });
        this.timedOut = setTimeout(() => {
            this.searchQuery = this.activatedRoute.snapshot.queryParamMap.get('q') || '';
            this.search();
            this.subsQueryParam = this.activatedRoute.queryParams.subscribe({
                next: qp => {
                    this.searchQuery = qp['q'] || '';
                    this.search();
                }
            });
        }, 0);
    }
    search() {
        if (!this.serverSide) {
            this.dataSource.filter = this.searchQuery;
            if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
            }
        }
        else {
            this.onServerSideFilter(this.searchQuery);
        }
    }
    applyFilter(event) {
        this.searchQuery = event.target.value.trim().toLowerCase();
        this.router.navigate([this.urlPath], {
            queryParams: {
                ...this.activatedRoute.snapshot.queryParams,
                q: this.searchQuery
            }
        });
    }
    onServerSideOrder(data) {
        if (!data.direction) {
            data.active = '';
        }
        else {
            if (data.active.toUpperCase() === 'NAMA BERKAS' || data.active.toUpperCase() === 'NAMA LAMPIRAN' || data.active.toUpperCase() === 'NAMA API') {
                data.active = 'name';
            }
            else if (data.active.toUpperCase() === 'TANGGAL') {
                data.active = 'created_at';
            }
            else if (data.active.toUpperCase() === 'TOPIK' || data.active.toUpperCase() === 'JUDUL') {
                data.active = 'title';
            }
            else if (data.active.toUpperCase() === 'KONTEN') {
                data.active = 'content';
            }
            else if (data.active.toUpperCase() === 'DEADLINE') {
                data.active = 'deadline';
            }
            else if (data.active.toUpperCase() === 'ID') {
                data.active = 'id';
            }
            else if (data.active.toUpperCase() === 'ALASAN') {
                data.active = 'reason';
            }
            else if (data.active.toUpperCase() === 'IP DOMAIN') {
                data.active = 'ip_domain';
            }
            else if (data.active.toUpperCase() === 'API KEY') {
                data.active = 'api_key';
            }
            else if (data.active.toUpperCase() === 'USERNAME') {
                data.active = 'username';
            }
            else if (data.active.toUpperCase() === 'EMAIL') {
                data.active = 'email';
            }
            else if (data.active.toUpperCase() === 'ROLE') {
                data.active = 'role';
            }
            else if (data.active.toUpperCase() === 'KETERANGAN') {
                data.active = 'keterangan';
            }
            else if (data.active.toUpperCase() === 'EXT') {
                data.active = 'ext';
            }
            else if (data.active.toUpperCase() === 'SIZE') {
                data.active = 'size';
            }
            else if (data.active.toUpperCase() === 'MIME') {
                data.active = 'mime';
            }
            else {
                data.active = '';
                data.direction = '';
            }
        }
        this.serverSideOrder.emit({
            q: this.searchQuery,
            ...data
        });
    }
    onServerSideFilter(data) {
        this.serverSideFilter.emit(data);
        this.paginator.firstPage();
    }
    onPaginatorClicked(data) {
        this.paginatorClicked.emit(data);
    }
    onRowClicked(data) {
        this.rowClicked.emit(data);
    }
    onChipClicked(data) {
        this.chipClicked.emit(data);
    }
    onButtonClicked(data) {
        this.buttonClicked.emit(data);
    }
}
MaterialTableComponent.ɵfac = function MaterialTableComponent_Factory(t) { return new (t || MaterialTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
MaterialTableComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: MaterialTableComponent, selectors: [["app-material-table"]], viewQuery: function MaterialTableComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__.MatPaginator, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_7__.MatSort, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
    } }, inputs: { count: "count", serverSide: "serverSide", tableDataRow: "tableDataRow", tableDataColumn: "tableDataColumn", tablePageSizeOptions: "tablePageSizeOptions" }, outputs: { serverSideFilter: "serverSideFilter", serverSideOrder: "serverSideOrder", chipClicked: "chipClicked", buttonClicked: "buttonClicked", rowClicked: "rowClicked", paginatorClicked: "paginatorClicked" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵNgOnChangesFeature"]], decls: 16, vars: 10, consts: [["hintLabel", "Anime / Fansub / Uploader / etc.", 1, "px-3", "mb-3", 3, "color"], ["matInput", "", "maxlength", "200", "placeholder", "Ex. [Fansub] Judul - 00 [BD 4K x265 FLAC][CRC32]", 3, "ngModel", "keyup.enter", "ngModelChange"], ["input", ""], ["matSuffix", ""], ["align", "end"], [1, "p-1", 2, "overflow-x", "auto"], ["mat-table", "", "matSort", "", 1, "bg-transparent", 3, "dataSource"], [3, "matColumnDef", 4, "ngFor", "ngForOf"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "matRipple", "", 3, "matRippleDisabled", "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", "matRipple", "", 3, "matRippleDisabled", 4, "matNoDataRow"], ["showFirstLastButtons", "", 1, "bg-transparent", 3, "color", "pageSizeOptions", "length", "page"], [3, "matColumnDef"], ["mat-header-cell", "", "class", "px-3", "mat-sort-header", "", 3, "disabled", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "px-3", "style", "cursor: pointer;", 3, "background-color", "max-width", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "px-3", 3, "disabled"], [1, "m-0"], ["mat-cell", "", 1, "px-3", 2, "cursor", "pointer"], [3, "class", 4, "ngIf"], ["class", "p-1", 4, "ngIf"], [4, "ngIf"], ["matListAvatar", "", "style", "width: 32px; height: 32px; object-fit: cover; border-radius: 0;", "class", "me-1", 3, "src", 4, "ngIf"], ["matListAvatar", "", "style", "width: 64px; height: 64px; object-fit: cover; border-radius: 0;", 3, "src", 4, "ngIf"], ["matListAvatar", "", "style", "width: 64px; height: 48px; object-fit: cover; border-radius: 0;", 3, "src", 4, "ngIf"], ["matListAvatar", "", "style", "width: 64px; height: 100%; object-fit: cover; border-radius: 0;", 3, "src", 4, "ngIf"], [3, "matTooltip", 4, "ngIf"], [3, "overflow-wrap", "matTooltip", 4, "ngIf"], ["matListAvatar", "", 1, "me-1", 2, "width", "32px", "height", "32px", "object-fit", "cover", "border-radius", "0", 3, "src"], ["matListAvatar", "", 2, "width", "64px", "height", "64px", "object-fit", "cover", "border-radius", "0", 3, "src"], ["matListAvatar", "", 2, "width", "64px", "height", "48px", "object-fit", "cover", "border-radius", "0", 3, "src"], ["matListAvatar", "", 2, "width", "64px", "height", "100%", "object-fit", "cover", "border-radius", "0", 3, "src"], [3, "matTooltip"], [1, "p-1"], [3, "chipData", "chipClicked"], ["type", "button", "mat-icon-button", "", "color", "primary", 3, "matTooltip", "click", 4, "ngFor", "ngForOf"], ["type", "button", "mat-icon-button", "", "color", "primary", 3, "matTooltip", "click"], ["width", "24px", 3, "src", 4, "ngIf"], ["width", "24px", 3, "src"], ["mat-header-row", ""], ["mat-row", "", "matRipple", "", 3, "matRippleDisabled", "click"], ["matRipple", "", 1, "mat-row", 3, "matRippleDisabled"], [1, "mat-cell", "text-center", "align-items-center", 2, "background-image", "url('/assets/img/404/no-data.png')", "background-size", "contain", "background-position", "center", "background-repeat", "no-repeat", "height", "256px"], [1, "row", "align-items-center", "h-100"], [1, "col-8", "mx-auto", "text-light", "text-center", "rounded", "py-3", 2, "background-color", "rgba(128, 128, 128, 0.875)"]], template: function MaterialTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-form-field", 0)(1, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Filter Dan Pencarian");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "input", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("keyup.enter", function MaterialTableComponent_Template_input_keyup_enter_3_listener($event) { return ctx.applyFilter($event); })("ngModelChange", function MaterialTableComponent_Template_input_ngModelChange_3_listener($event) { return ctx.searchQuery = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "search");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "mat-hint", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "div", 5)(10, "table", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, MaterialTableComponent_ng_container_11_Template, 3, 1, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](12, MaterialTableComponent_tr_12_Template, 1, 0, "tr", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, MaterialTableComponent_tr_13_Template, 1, 4, "tr", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, MaterialTableComponent_tr_14_Template, 10, 4, "tr", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "mat-paginator", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("page", function MaterialTableComponent_Template_mat_paginator_page_15_listener($event) { return ctx.onPaginatorClicked($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", "accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.searchQuery);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", (_r0.value == null ? null : _r0.value.length) || 0, " / 200 Huruf");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("dataSource", ctx.dataSource);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.tableDataColumn);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matHeaderRowDef", ctx.tableDataColumn);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matRowDefColumns", ctx.tableDataColumn);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("color", "accent")("pageSizeOptions", ctx.tablePageSizeOptions)("length", ctx.count);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatHint, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatTable, _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__.MatSort, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatHeaderCell, _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__.MatSortHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatCell, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_material_list__WEBPACK_IMPORTED_MODULE_13__.MatListAvatarCssMatStyler, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_14__.MatTooltip, _material_chip_material_chip_component__WEBPACK_IMPORTED_MODULE_1__.MaterialChipComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_15__.MatButton, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatRow, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__.MatRipple, _angular_material_table__WEBPACK_IMPORTED_MODULE_4__.MatNoDataRow, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__.MatPaginator], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.DatePipe, _pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_2__.DateAgoPipe], styles: ["table[_ngcontent-%COMP%] {\n  width: 100%;\n}\ntd.mat-column-star[_ngcontent-%COMP%] {\n  width: 20px;\n  padding-right: 8px !important;\n}\n.mat-table[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n}\n.mat-table[_ngcontent-%COMP%]   .mat-row[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%] {\n  border: 0;\n}\n.mat-row[_ngcontent-%COMP%]:hover {\n  background-color: rgba(255, 255, 255, 0.875);\n}\n.mat-row[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #7289da;\n  text-decoration: none;\n}\n.mat-row[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.mat-form-field[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 100%;\n}\n.mat-icon[_ngcontent-%COMP%] {\n  color: #7289da;\n}\n@media only screen and (min-width: 993px) {\n  .fixed-single[_ngcontent-%COMP%] {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    max-width: 128px;\n  }\n}\n@media only screen and (max-width: 992px) {\n  .mat-elevation-z8[_ngcontent-%COMP%] {\n    background: transparent;\n    box-shadow: none;\n  }\n\n  .mat-header-row[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  tbody[_ngcontent-%COMP%] {\n    display: block;\n    width: 100%;\n  }\n\n  .mat-table[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .mat-table[_ngcontent-%COMP%]   *[_ngcontent-%COMP%] {\n    box-sizing: border-box;\n  }\n  .mat-table[_ngcontent-%COMP%]   .mat-row[_ngcontent-%COMP%] {\n    display: block;\n    overflow: hidden;\n    height: auto;\n    position: relative;\n    clear: both;\n    background-color: rgba(255, 255, 255, 0.875);\n    border-radius: 3px;\n  }\n  .mat-table[_ngcontent-%COMP%]   .mat-row[_ngcontent-%COMP%]    + .mat-row[_ngcontent-%COMP%] {\n    margin-top: 24px;\n  }\n  .mat-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%] {\n    display: block;\n    width: 100%;\n    padding: 8px 16px;\n    margin: 0;\n    border: 0 none;\n  }\n  .mat-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]:first-child   a[_ngcontent-%COMP%], .mat-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]:last-child   a[_ngcontent-%COMP%] {\n    font-size: 20px;\n    color: inherit;\n  }\n  .mat-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]:first-child:before, .mat-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]:last-child:before {\n    display: none;\n  }\n  .mat-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]:first-child {\n    padding: 16px 48px 8px 16px;\n  }\n  .mat-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]:last-child {\n    padding: 8px 48px 16px 16px;\n  }\n  .mat-table[_ngcontent-%COMP%]   .mat-cell.m-card-sub-title[_ngcontent-%COMP%] {\n    margin-top: -8px;\n    padding: 0 48px 0 16px;\n    color: rgba(0, 0, 0, 0.5);\n  }\n  .mat-table[_ngcontent-%COMP%]   .has_label_on_mobile[_ngcontent-%COMP%]:before {\n    content: attr(data-label);\n    display: inline;\n    font-weight: normal;\n  }\n  .mat-table[_ngcontent-%COMP%]   .mat-column-star[_ngcontent-%COMP%] {\n    width: auto;\n    padding: 8px 0 0 !important;\n    margin: 0;\n    position: absolute;\n    top: 0;\n    right: 0;\n  }\n  .mat-table[_ngcontent-%COMP%]   .mat-column-star[_ngcontent-%COMP%]:before {\n    display: none;\n  }\n\n  .mat-paginator[_ngcontent-%COMP%] {\n    margin-top: 24px;\n  }\n}\n.mat-ripple[_ngcontent-%COMP%]:not(:empty) {\n  transform: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hdGVyaWFsLXRhYmxlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhFQUFBO0FBRUE7RUFDRSxXQUFBO0FBQUY7QUFHQTtFQUNFLFdBQUE7RUFDQSw2QkFBQTtBQUFGO0FBR0E7RUFDRSw0Q0FBQTtBQUFGO0FBRUk7RUFDRSxTQUFBO0FBQU47QUFNRTtFQUNFLDRDQUFBO0FBSEo7QUFLRTtFQUNFLGNBQUE7RUFDQSxxQkFBQTtBQUhKO0FBSUk7RUFDRSwwQkFBQTtBQUZOO0FBT0E7RUFDRSxlQUFBO0VBQ0EsV0FBQTtBQUpGO0FBT0E7RUFDRSxjQUFBO0FBSkY7QUFPQTtFQUNFO0lBQ0UsZ0JBQUE7SUFDQSx1QkFBQTtJQUNBLG1CQUFBO0lBQ0EsZ0JBQUE7RUFKRjtBQUNGO0FBT0E7RUFDRTtJQUNFLHVCQUFBO0lBQ0EsZ0JBQUE7RUFMRjs7RUFPQTtJQUNFLGFBQUE7RUFKRjs7RUFNQTtJQUNFLGNBQUE7SUFDQSxXQUFBO0VBSEY7O0VBS0E7SUFDRSx1QkFBQTtFQUZGO0VBR0U7SUFDRSxzQkFBQTtFQURKO0VBR0U7SUFDRSxjQUFBO0lBQ0EsZ0JBQUE7SUFDQSxZQUFBO0lBQ0Esa0JBQUE7SUFDQSxXQUFBO0lBQ0EsNENBQUE7SUFDQSxrQkFBQTtFQURKO0VBRUk7SUFDRSxnQkFBQTtFQUFOO0VBR0U7SUFDRSxjQUFBO0lBQ0EsV0FBQTtJQUNBLGlCQUFBO0lBQ0EsU0FBQTtJQUNBLGNBQUE7RUFESjtFQUdNO0lBQ0UsZUFBQTtJQUNBLGNBQUE7RUFEUjtFQUdNO0lBQ0UsYUFBQTtFQURSO0VBSUk7SUFDRSwyQkFBQTtFQUZOO0VBSUk7SUFDRSwyQkFBQTtFQUZOO0VBSUk7SUFDRSxnQkFBQTtJQUNBLHNCQUFBO0lBQ0EseUJBQUE7RUFGTjtFQU1JO0lBQ0UseUJBQUE7SUFDQSxlQUFBO0lBQ0EsbUJBQUE7RUFKTjtFQU9FO0lBQ0UsV0FBQTtJQUNBLDJCQUFBO0lBQ0EsU0FBQTtJQUNBLGtCQUFBO0lBQ0EsTUFBQTtJQUNBLFFBQUE7RUFMSjtFQU1JO0lBQ0UsYUFBQTtFQUpOOztFQVFBO0lBQ0UsZ0JBQUE7RUFMRjtBQUNGO0FBUUE7RUFDRSxlQUFBO0FBTkYiLCJmaWxlIjoibWF0ZXJpYWwtdGFibGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBZb3UgY2FuIGFkZCBnbG9iYWwgc3R5bGVzIHRvIHRoaXMgZmlsZSwgYW5kIGFsc28gaW1wb3J0IG90aGVyIHN0eWxlIGZpbGVzICovXHJcblxyXG50YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRkLm1hdC1jb2x1bW4tc3RhciB7XHJcbiAgd2lkdGg6IDIwcHg7XHJcbiAgcGFkZGluZy1yaWdodDogOHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5tYXQtdGFibGUge1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xyXG4gIC5tYXQtcm93IHtcclxuICAgIC5tYXQtY2VsbCB7XHJcbiAgICAgIGJvcmRlcjogMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5tYXQtcm93IHtcclxuICAmOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NzUpO1xyXG4gIH1cclxuICBhIHtcclxuICAgIGNvbG9yOiAjNzI4OWRhO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLm1hdC1mb3JtLWZpZWxkIHtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5tYXQtaWNvbiB7XHJcbiAgY29sb3I6ICM3Mjg5ZGE7XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogOTkzcHgpIHtcclxuICAuZml4ZWQtc2luZ2xlIHtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICBtYXgtd2lkdGg6IDEyOHB4O1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkge1xyXG4gIC5tYXQtZWxldmF0aW9uLXo4IHtcclxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICB9XHJcbiAgLm1hdC1oZWFkZXItcm93IHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG4gIHRib2R5IHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gIC5tYXQtdGFibGUge1xyXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgICAqIHtcclxuICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIH1cclxuICAgIC5tYXQtcm93IHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgIGhlaWdodDogYXV0bztcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBjbGVhcjogYm90aDtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg3NSk7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcclxuICAgICAgKyAubWF0LXJvdyB7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMjRweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLm1hdC1jZWxsIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBwYWRkaW5nOiA4cHggMTZweDtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBib3JkZXI6IDAgbm9uZTtcclxuICAgICAgJjpmaXJzdC1jaGlsZCwgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgICBhIHtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgICAgIGNvbG9yOiBpbmhlcml0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAmOmJlZm9yZSB7XHJcbiAgICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAmOmZpcnN0LWNoaWxkIHtcclxuICAgICAgICBwYWRkaW5nOiAxNnB4IDQ4cHggOHB4IDE2cHg7XHJcbiAgICAgIH1cclxuICAgICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgICBwYWRkaW5nOiA4cHggNDhweCAxNnB4IDE2cHg7XHJcbiAgICAgIH1cclxuICAgICAgJi5tLWNhcmQtc3ViLXRpdGxlIHtcclxuICAgICAgICBtYXJnaW4tdG9wOiAtOHB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDAgNDhweCAwIDE2cHg7XHJcbiAgICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgLjUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAuaGFzX2xhYmVsX29uX21vYmlsZSB7XHJcbiAgICAgICY6YmVmb3JlIHtcclxuICAgICAgICBjb250ZW50OiBhdHRyKGRhdGEtbGFiZWwpO1xyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZTtcclxuICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAubWF0LWNvbHVtbi1zdGFyIHtcclxuICAgICAgd2lkdGg6IGF1dG87XHJcbiAgICAgIHBhZGRpbmc6IDhweCAwIDAgIWltcG9ydGFudDtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHRvcDogMDtcclxuICAgICAgcmlnaHQ6IDA7XHJcbiAgICAgICY6YmVmb3JlIHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5tYXQtcGFnaW5hdG9yIHtcclxuICAgIG1hcmdpbi10b3A6IDI0cHg7XHJcbiAgfVxyXG59XHJcblxyXG4ubWF0LXJpcHBsZTpub3QoOmVtcHR5KSB7XHJcbiAgdHJhbnNmb3JtOiBub25lO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 617:
/*!****************************************************************************!*\
  !*** ./src/app/_shared/components/material-table/material-table.module.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialTableModule": () => (/* binding */ MaterialTableModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _material_table_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./material-table.component */ 30578);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../material-chip/material-chip.module */ 54946);
/* harmony import */ var _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pipes/custom-pipe.module */ 67355);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);







class MaterialTableModule {
}
MaterialTableModule.ɵfac = function MaterialTableModule_Factory(t) { return new (t || MaterialTableModule)(); };
MaterialTableModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: MaterialTableModule });
MaterialTableModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
            _material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_2__.MaterialChipModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_3__.CustomPipeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](MaterialTableModule, { declarations: [_material_table_component__WEBPACK_IMPORTED_MODULE_0__.MaterialTableComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
        _material_chip_material_chip_module__WEBPACK_IMPORTED_MODULE_2__.MaterialChipModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_3__.CustomPipeModule], exports: [_material_table_component__WEBPACK_IMPORTED_MODULE_0__.MaterialTableComponent] }); })();


/***/ })

}]);
//# sourceMappingURL=default-src_app__shared_components_material-table_material-table_module_ts.js.map