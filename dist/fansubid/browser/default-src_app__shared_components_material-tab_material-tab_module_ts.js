"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["default-src_app__shared_components_material-tab_material-tab_module_ts"],{

/***/ 34537:
/*!****************************************************************************!*\
  !*** ./src/app/_shared/components/discussion/comment/comment.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommentComponent": () => (/* binding */ CommentComponent)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/clipboard */ 91604);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/snack-bar */ 32528);
/* harmony import */ var _services_komentar_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/komentar.service */ 47559);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/global.service */ 80855);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/auth.service */ 4137);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _directives_dom_change_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../directives/dom-change.directive */ 49321);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/menu */ 82796);
/* harmony import */ var _no_data_no_data_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../no-data/no-data.component */ 40192);
/* harmony import */ var _pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../pipes/date-ago.pipe */ 86766);




















function CommentComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 4)(1, "mat-form-field", 5)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "Buat Komentar Baru");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CommentComponent_div_0_Template_input_ngModelChange_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r4.commentToSend = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, "quickreply");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 8)(8, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CommentComponent_div_0_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r6.sendComment(null); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9, " Kirim ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11, "send");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r0.commentToSend);
} }
function CommentComponent_div_2_mat_form_field_27_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-form-field", 31)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "Balas / Tanggapi");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CommentComponent_div_2_mat_form_field_27_Template_input_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r15); const k_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit; return k_r7.reply_to_send = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, "quickreply");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const k_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", k_r7.reply_to_send);
} }
function CommentComponent_div_2_button_31_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "expand_more");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function CommentComponent_div_2_button_31_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "expand_less");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function CommentComponent_div_2_button_31_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CommentComponent_div_2_button_31_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r21); const k_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit; const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r19.showHideComment(k_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CommentComponent_div_2_button_31_mat_icon_1_Template, 2, 0, "mat-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, CommentComponent_div_2_button_31_mat_icon_2_Template, 2, 0, "mat-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const k_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !k_r7.show_reply);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", k_r7.show_reply);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", k_r7.show_reply ? "Sembunyikan" : "Tampilkan", " ", k_r7.reply_count, " balasan ");
} }
function CommentComponent_div_2_button_33_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CommentComponent_div_2_button_33_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r25); const k_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit; const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r23.sendComment(k_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, " Kirim ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "send");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} }
function CommentComponent_div_2_app_comment_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-comment", 35);
} if (rf & 2) {
    const k_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("parent", k_r7)("komentar", k_r7.reply)("recursionCount", ctx_r12.recursionCount + 1);
} }
function CommentComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 11)(1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div")(4, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CommentComponent_div_2_Template_div_click_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r28); const k_r7 = restoredCtx.$implicit; const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r27.showHideCommentBox(k_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "p", 15)(6, "b", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CommentComponent_div_2_Template_b_click_6_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r28); const k_r7 = restoredCtx.$implicit; const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); $event.stopPropagation(); return ctx_r29.openUserProfile(k_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "small", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](9, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](11, "dateAgo");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](12, "p", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "div", 19)(14, "button", 20)(15, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](16, "more_vert");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "mat-menu", null, 21)(19, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CommentComponent_div_2_Template_button_click_19_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r28); const k_r7 = restoredCtx.$implicit; const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r30.deleteComment(k_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](20, "mat-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](21, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](22, " Hapus ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CommentComponent_div_2_Template_button_click_23_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r28); const k_r7 = restoredCtx.$implicit; const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r31.copyCommentLink(k_r7); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "mat-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](25, "link");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](26, " Salin URL ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](27, CommentComponent_div_2_mat_form_field_27_Template, 6, 2, "mat-form-field", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "div", 25)(29, "div", 4)(30, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](31, CommentComponent_div_2_button_31_Template, 4, 4, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](32, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](33, CommentComponent_div_2_button_33_Template, 4, 0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](34, CommentComponent_div_2_app_comment_34_Template, 1, 3, "app-comment", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const k_r7 = ctx.$implicit;
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](18);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("src", k_r7.user_.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassMapInterpolate1"]("flex-grow-1 ms-3 row ", ctx_r1.recursionCount === 0 ? "me-2" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", k_r7.user_.username, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](9, 13, k_r7.created_at, "d MMMM y, hh:mm:ss a z"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](11, 16, k_r7.created_at), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("innerHTML", k_r7.comment, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("matMenuTriggerFor", _r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", k_r7.reply_mode && (ctx_r1.AS.currentUserSubject == null ? null : ctx_r1.AS.currentUserSubject.value) && ctx_r1.recursionCount === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", k_r7.reply_count > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", k_r7.reply_mode && (ctx_r1.AS.currentUserSubject == null ? null : ctx_r1.AS.currentUserSubject.value) && ctx_r1.recursionCount === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", k_r7.show_reply);
} }
function CommentComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 36)(1, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CommentComponent_div_3_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r33); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r32.loadNextPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "mat-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "subdirectory_arrow_right");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, " Load More ... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} }
function CommentComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "app-no-data", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
class CommentComponent {
    constructor(clipboard, router, snackBar, komen, gs, as) {
        this.clipboard = clipboard;
        this.router = router;
        this.snackBar = snackBar;
        this.komen = komen;
        this.gs = gs;
        this.as = as;
        this.urlPath = null;
        this.count = 0;
        this.page = 1;
        this.row = 10;
        this.pageFinished = false;
        this.recursionCount = 0;
        this.rootCommentBox = false;
        this.commentToSend = null;
        this.parent = null;
        this.komentar = [];
        this.subsKomenSend = null;
        this.subsKomenGetKomen = null;
        this.subsKomenGetReply = null;
        this.subsDelete = null;
        this.subsRouter = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    get AS() {
        return this.as;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            if (this.recursionCount === 0) {
                this.reloadComponent();
            }
            this.subsRouter = this.router.events.subscribe({
                next: evt => {
                    if (evt instanceof _angular_router__WEBPACK_IMPORTED_MODULE_8__.NavigationEnd) {
                        this.reloadComponent();
                    }
                }
            });
        }
    }
    ngOnDestroy() {
        var _a, _b, _c, _d, _e;
        (_a = this.subsKomenSend) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsKomenGetKomen) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsKomenGetReply) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsDelete) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.subsRouter) === null || _e === void 0 ? void 0 : _e.unsubscribe();
        this.urlPath = null;
    }
    reloadComponent() {
        this.urlPath = this.router.url.split('?')[0];
        this.getComment(true);
    }
    sendComment(k) {
        this.gs.log('[KOMENTAR_PARENT_CREATE_REPLY]', k);
        const commentData = (k) ? {
            path: this.urlPath,
            comment: k.reply_to_send,
            parent: k.id
        } : {
            path: this.urlPath,
            comment: this.commentToSend
        };
        this.subsKomenSend = this.komen.sendComment(commentData).subscribe({
            next: res => {
                this.gs.log('[KOMENTAR_CREATE_REPLY_SUCCESS]', res);
                if (k) {
                    k.reply_to_send = null;
                    k.reply_mode = false;
                    this.getReply(k, true);
                }
                else {
                    this.commentToSend = null;
                    this.getComment(true);
                }
            },
            error: err => {
                this.gs.log('[KOMENTAR_CREATE_REPLY_ERROR]', err, 'error');
            }
        });
    }
    getComment(fresh = false) {
        if (!this.parent) {
            if (fresh) {
                this.page = 1;
                this.pageFinished = false;
            }
            this.subsKomenGetKomen = this.komen.getComment(this.urlPath, '', this.page, this.row).subscribe({
                next: res => {
                    this.gs.log('[KOMENTAR_LIST_SUCCESS]', res);
                    this.count = res.count;
                    if (fresh) {
                        this.komentar = res.results;
                    }
                    else {
                        this.komentar = [...this.komentar, ...res.results];
                    }
                    if (res.results.length <= 0) {
                        this.pageFinished = true;
                    }
                },
                error: err => {
                    this.gs.log('[KOMENTAR_LIST_ERROR]', err, 'error');
                }
            });
        }
    }
    getReply(k, fresh = false) {
        this.gs.log('[KOMENTAR_PARENT_LOAD_REPLY]', k);
        if (fresh) {
            k.reply_page = 1;
            k.reply_page_finised = false;
        }
        this.subsKomenGetReply = this.komen.getReply(k.id, '', k.reply_page, this.row).subscribe({
            next: res => {
                this.gs.log('[REPLY_LIST_SUCCESS]', res);
                if (fresh) {
                    k.reply = res.results;
                }
                else {
                    k.reply = [...k.reply, ...res.results];
                }
                k.reply_count = res.count;
                if (res.results.length <= 0) {
                    k.reply_page_finised = true;
                }
            },
            error: err => {
                this.gs.log('[REPLY_LIST_ERROR]', err, 'error');
                k.reply = [];
            }
        });
    }
    showHideComment(k) {
        if (k.show_reply === undefined || k.show_reply === null) {
            k.show_reply = true;
        }
        else {
            k.show_reply = !k.show_reply;
        }
        if (k.show_reply) {
            this.getReply(k, true);
        }
    }
    showHideCommentBox(k) {
        if (k.reply_mode === undefined || k.reply_mode === null) {
            k.reply_mode = true;
        }
        else {
            k.reply_mode = !k.reply_mode;
        }
    }
    loadNextPage() {
        if (!this.parent) {
            this.loadNextPageComment();
        }
        else {
            this.loadNextPageReply(this.parent);
        }
    }
    loadNextPageComment() {
        if (!this.pageFinished) {
            this.page++;
            this.getComment();
        }
    }
    loadNextPageReply(k) {
        if (!k.reply_page_finised) {
            if (!k.reply_page) {
                k.reply_page = 1;
            }
            k.reply_page++;
            this.getReply(k);
        }
    }
    openUserProfile(k) {
        this.router.navigateByUrl(`/user/${k.user_.username}`);
    }
    copyCommentLink(k) {
        const url = (k.path.startsWith('/') ? _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl : '') + k.path;
        if (this.clipboard.copy(`${url}?comment=${k.id}`)) {
            this.snackBar.open(`URL Komentar :: Telah Di Salin Pada Clipboard`, 'Ok');
        }
    }
    deleteComment(k) {
        this.gs.log('[KOMENTAR_DELETE_COMMENT]', k);
        this.subsDelete = this.komen.deleteComment(k.id).subscribe({
            next: res => {
                this.gs.log('[KOMENTAR_DELETE_SUCCESS]', res);
                if (this.parent) {
                    this.getReply(this.parent, true);
                }
                else {
                    this.getComment(true);
                }
            },
            error: err => {
                this.gs.log('[KOMENTAR_DELETE_ERROR]', err, 'error');
                if (this.parent) {
                    this.getReply(this.parent, true);
                }
                else {
                    this.getComment(true);
                }
            }
        });
    }
}
CommentComponent.ɵfac = function CommentComponent_Factory(t) { return new (t || CommentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_9__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_komentar_service__WEBPACK_IMPORTED_MODULE_1__.KomentarService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService)); };
CommentComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: CommentComponent, selectors: [["app-comment"]], inputs: { row: "row", recursionCount: "recursionCount", rootCommentBox: "rootCommentBox", parent: "parent", komentar: "komentar" }, decls: 5, vars: 4, consts: [["class", "row", 4, "ngIf"], ["appDomChange", "", 1, "row"], ["class", "d-flex my-1", 4, "ngFor", "ngForOf"], ["class", "col-12", 4, "ngIf"], [1, "row"], ["appearance", "outline", 1, "col-12", 3, "color"], ["matInput", "", "placeholder", "Buat Baru ...", 3, "ngModel", "ngModelChange"], ["matSuffix", ""], [1, "col-12", "text-end", "pe-0", "mb-3"], ["type", "button", "mat-button", "", "color", "accent", 3, "click"], [1, "ms-1"], [1, "d-flex", "my-1"], [1, "flex-shrink-0"], ["width", "40", "height", "40", 2, "object-fit", "cover", "object-position", "center", 3, "src"], [1, "col-8", "p-0", 3, "click"], [1, "m-0"], [1, "text-warning", 2, "cursor", "pointer", 3, "click"], [1, "ms-3", "text-bifeldy", 3, "matTooltip"], [1, "mb-1", 2, "line-height", "normal", 3, "innerHTML"], [1, "col", "p-0", "text-end"], ["type", "button", "mat-icon-button", "", "color", "accent", "matTooltip", "Opsi", 3, "matMenuTriggerFor"], ["komentarMenu", "matMenu"], ["type", "button", "mat-menu-item", "", 3, "click"], [1, "me-1"], ["appearance", "outline", "class", "mt-2 col-12", 3, "color", 4, "ngIf"], [1, "col-12", "p-0"], [1, "col-6"], ["type", "button", "mat-button", "", "class", "ps-1 pe-2", "color", "accent", 3, "click", 4, "ngIf"], [1, "col-6", "text-end"], ["type", "button", "mat-button", "", "color", "accent", 3, "click", 4, "ngIf"], [3, "parent", "komentar", "recursionCount", 4, "ngIf"], ["appearance", "outline", 1, "mt-2", "col-12", 3, "color"], ["matInput", "", "placeholder", "Balas ...", 3, "ngModel", "ngModelChange"], ["type", "button", "mat-button", "", "color", "accent", 1, "ps-1", "pe-2", 3, "click"], ["class", "me-1", 4, "ngIf"], [3, "parent", "komentar", "recursionCount"], [1, "col-12"], [1, "col-12", "p-3"]], template: function CommentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, CommentComponent_div_0_Template, 12, 2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, CommentComponent_div_2_Template, 35, 18, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](3, CommentComponent_div_3_Template, 5, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, CommentComponent_div_4_Template, 2, 0, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.rootCommentBox && (ctx.AS.currentUserSubject == null ? null : ctx.AS.currentUserSubject.value));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.komentar);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.count >= 10 && !ctx.pageFinished || (ctx.parent == null ? null : ctx.parent.reply_count) >= 10 && !(ctx.parent == null ? null : ctx.parent.reply_page_finised));
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.komentar && ctx.komentar.length <= 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgModel, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatSuffix, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButton, _directives_dom_change_directive__WEBPACK_IMPORTED_MODULE_4__.DomChangeDirective, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__.MatTooltip, _angular_material_menu__WEBPACK_IMPORTED_MODULE_18__.MatMenuTrigger, _angular_material_menu__WEBPACK_IMPORTED_MODULE_18__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_18__.MatMenuItem, CommentComponent, _no_data_no_data_component__WEBPACK_IMPORTED_MODULE_5__.NoDataComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.DatePipe, _pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_6__.DateAgoPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21tZW50LmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 78838:
/*!***********************************************************************!*\
  !*** ./src/app/_shared/components/discussion/discussion.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DiscussionComponent": () => (/* binding */ DiscussionComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _highlight_highlight_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./highlight/highlight.component */ 71803);
/* harmony import */ var _comment_comment_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comment/comment.component */ 34537);




class DiscussionComponent {
    constructor(gs) {
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    ngOnInit() {
        //
    }
}
DiscussionComponent.ɵfac = function DiscussionComponent_Factory(t) { return new (t || DiscussionComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
DiscussionComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: DiscussionComponent, selectors: [["app-discussion"]], decls: 2, vars: 1, consts: [[3, "rootCommentBox"]], template: function DiscussionComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-highlight")(1, "app-comment", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rootCommentBox", true);
    } }, directives: [_highlight_highlight_component__WEBPACK_IMPORTED_MODULE_1__.HighlightComponent, _comment_comment_component__WEBPACK_IMPORTED_MODULE_2__.CommentComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkaXNjdXNzaW9uLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 78764:
/*!********************************************************************!*\
  !*** ./src/app/_shared/components/discussion/discussion.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DiscussionModule": () => (/* binding */ DiscussionModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _comment_comment_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comment/comment.component */ 34537);
/* harmony import */ var _discussion_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./discussion.component */ 78838);
/* harmony import */ var _highlight_highlight_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./highlight/highlight.component */ 71803);
/* harmony import */ var _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pipes/custom-pipe.module */ 67355);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _no_data_no_data_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../no-data/no-data.module */ 12438);
/* harmony import */ var _directives_custom_directive_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../directives/custom-directive.module */ 17956);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);










class DiscussionModule {
}
DiscussionModule.ɵfac = function DiscussionModule_Factory(t) { return new (t || DiscussionModule)(); };
DiscussionModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: DiscussionModule });
DiscussionModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__.SharedMaterialModule,
            _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_3__.CustomPipeModule,
            _directives_custom_directive_module__WEBPACK_IMPORTED_MODULE_6__.CustomDirectivesModule,
            _no_data_no_data_module__WEBPACK_IMPORTED_MODULE_5__.NoDataModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](DiscussionModule, { declarations: [_comment_comment_component__WEBPACK_IMPORTED_MODULE_0__.CommentComponent,
        _discussion_component__WEBPACK_IMPORTED_MODULE_1__.DiscussionComponent,
        _highlight_highlight_component__WEBPACK_IMPORTED_MODULE_2__.HighlightComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_4__.SharedMaterialModule,
        _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_3__.CustomPipeModule,
        _directives_custom_directive_module__WEBPACK_IMPORTED_MODULE_6__.CustomDirectivesModule,
        _no_data_no_data_module__WEBPACK_IMPORTED_MODULE_5__.NoDataModule], exports: [_discussion_component__WEBPACK_IMPORTED_MODULE_1__.DiscussionComponent] }); })();


/***/ }),

/***/ 71803:
/*!********************************************************************************!*\
  !*** ./src/app/_shared/components/discussion/highlight/highlight.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HighlightComponent": () => (/* binding */ HighlightComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/clipboard */ 91604);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/snack-bar */ 32528);
/* harmony import */ var _services_komentar_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/komentar.service */ 47559);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/global.service */ 80855);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/auth.service */ 4137);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _directives_dom_change_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../directives/dom-change.directive */ 49321);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/menu */ 82796);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _comment_comment_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../comment/comment.component */ 34537);
/* harmony import */ var _pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../pipes/date-ago.pipe */ 86766);



















function HighlightComponent_div_0_div_1_div_28_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 21)(1, "div", 27)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 7)(5, "div", 28)(6, "p", 9)(7, "b", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HighlightComponent_div_0_div_1_div_28_Template_b_click_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3); $event.stopPropagation(); return ctx_r11.openUserProfile(ctx_r11.komentarHighlight); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "small", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](10, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](12, "dateAgo");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](13, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "div", 13)(15, "button", 14)(16, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](17, "more_vert");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "mat-menu", null, 15)(20, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HighlightComponent_div_0_div_1_div_28_Template_button_click_20_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r12); const k_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit; const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r13.deleteComment(k_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](22, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](23, " Hapus ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HighlightComponent_div_0_div_1_div_28_Template_button_click_24_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r12); const k_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit; const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r15.copyCommentLink(k_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](25, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](26, "link");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](27, " Salin URL ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()()();
} if (rf & 2) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](19);
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("src", ctx_r5.komentarHighlight.user_.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r5.komentarHighlight.user_.username, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](10, 6, ctx_r5.komentarHighlight.created_at, "d MMMM y, hh:mm:ss a z"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](12, 9, ctx_r5.komentarHighlight.created_at), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("innerHTML", ctx_r5.komentarHighlight.comment, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("matMenuTriggerFor", _r10);
} }
function HighlightComponent_div_0_div_1_mat_form_field_29_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-form-field", 29)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "Balas / Tanggapi");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function HighlightComponent_div_0_div_1_mat_form_field_29_Template_input_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r19); const k_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit; return k_r3.reply_to_send = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, "quickreply");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const k_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", k_r3.reply_to_send);
} }
function HighlightComponent_div_0_div_1_button_33_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "expand_more");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function HighlightComponent_div_0_div_1_button_33_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "expand_less");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} }
function HighlightComponent_div_0_div_1_button_33_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HighlightComponent_div_0_div_1_button_33_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r25); const k_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit; const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r23.showHideComment(k_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, HighlightComponent_div_0_div_1_button_33_mat_icon_1_Template, 2, 0, "mat-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, HighlightComponent_div_0_div_1_button_33_mat_icon_2_Template, 2, 0, "mat-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const k_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !k_r3.show_reply);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", k_r3.show_reply);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", k_r3.show_reply ? "Sembunyikan" : "Tampilkan", " ", k_r3.reply_count, " balasan ");
} }
function HighlightComponent_div_0_div_1_button_35_Template(rf, ctx) { if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HighlightComponent_div_0_div_1_button_35_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r29); const k_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit; const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r27.sendComment(k_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, " Kirim ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "mat-icon", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "send");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} }
function HighlightComponent_div_0_div_1_app_comment_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-comment", 36);
} if (rf & 2) {
    const k_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("parent", k_r3)("komentar", k_r3.reply)("recursionCount", ctx_r9.recursionCount + 1)("row", 5);
} }
function HighlightComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 4)(1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 7)(4, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HighlightComponent_div_0_div_1_Template_div_click_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r32); const k_r3 = restoredCtx.$implicit; const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r31.showHideCommentBox(k_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "p", 9)(6, "b", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HighlightComponent_div_0_div_1_Template_b_click_6_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r32); const k_r3 = restoredCtx.$implicit; const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); $event.stopPropagation(); return ctx_r33.openUserProfile(k_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "small", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](9, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](11, "dateAgo");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](12, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "div", 13)(14, "button", 14)(15, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](16, "more_vert");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "mat-menu", null, 15)(19, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HighlightComponent_div_0_div_1_Template_button_click_19_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r32); const k_r3 = restoredCtx.$implicit; const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r34.deleteComment(k_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](20, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](21, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](22, " Hapus ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HighlightComponent_div_0_div_1_Template_button_click_23_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r32); const k_r3 = restoredCtx.$implicit; const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r35.copyCommentLink(k_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](25, "link");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](26, " Salin URL ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](27, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](28, HighlightComponent_div_0_div_1_div_28_Template, 28, 11, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](29, HighlightComponent_div_0_div_1_mat_form_field_29_Template, 6, 2, "mat-form-field", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](30, "div", 18)(31, "div", 21)(32, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](33, HighlightComponent_div_0_div_1_button_33_Template, 4, 4, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](34, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](35, HighlightComponent_div_0_div_1_button_35_Template, 4, 0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](36, HighlightComponent_div_0_div_1_app_comment_36_Template, 1, 4, "app-comment", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const k_r3 = ctx.$implicit;
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](18);
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("src", k_r3.user_.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", k_r3.user_.username, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate"]("matTooltip", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](9, 11, k_r3.created_at, "d MMMM y, hh:mm:ss a z"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](11, 14, k_r3.created_at), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("innerHTML", k_r3.comment, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("matMenuTriggerFor", _r4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.komentarHighlight);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", k_r3.reply_mode && (ctx_r1.AS.currentUserSubject == null ? null : ctx_r1.AS.currentUserSubject.value) && ctx_r1.recursionCount === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", k_r3.reply_count > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", k_r3.reply_mode && (ctx_r1.AS.currentUserSubject == null ? null : ctx_r1.AS.currentUserSubject.value) && ctx_r1.recursionCount === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", k_r3.show_reply);
} }
function HighlightComponent_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 37)(1, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function HighlightComponent_div_0_div_2_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r37); const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r36.loadNextPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "subdirectory_arrow_right");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, " Load More ... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
} }
function HighlightComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, HighlightComponent_div_0_div_1_Template, 37, 16, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, HighlightComponent_div_0_div_2_Template, 5, 0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r0.komentar);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.count >= 10 && !ctx_r0.pageFinished || (ctx_r0.parent == null ? null : ctx_r0.parent.reply_count) >= 10 && !(ctx_r0.parent == null ? null : ctx_r0.parent.reply_page_finised));
} }
class HighlightComponent {
    constructor(clipboard, activatedRoute, router, snackBar, komen, gs, as) {
        this.clipboard = clipboard;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.snackBar = snackBar;
        this.komen = komen;
        this.gs = gs;
        this.as = as;
        this.highlightId = 0;
        this.komentarHighlight = null;
        this.urlPath = null;
        this.count = 0;
        this.page = 1;
        this.pageFinished = false;
        this.recursionCount = 0;
        this.commentToSend = null;
        this.parent = null;
        this.komentar = [];
        this.subsHighlight = null;
        this.subsKomenSend = null;
        this.subsKomenGetKomen = null;
        this.subsKomenGetReply = null;
        this.subsDelete = null;
        this.subsQueryParam = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    get AS() {
        return this.as;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.watchUrlRoute();
        }
    }
    ngOnDestroy() {
        var _a, _b, _c, _d, _e, _f;
        (_a = this.subsKomenSend) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsKomenGetKomen) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsKomenGetReply) === null || _c === void 0 ? void 0 : _c.unsubscribe();
        (_d = this.subsHighlight) === null || _d === void 0 ? void 0 : _d.unsubscribe();
        (_e = this.subsDelete) === null || _e === void 0 ? void 0 : _e.unsubscribe();
        (_f = this.subsQueryParam) === null || _f === void 0 ? void 0 : _f.unsubscribe();
        this.urlPath = null;
    }
    watchUrlRoute() {
        this.subsQueryParam = this.activatedRoute.queryParams.subscribe({
            next: qp => {
                this.komentarHighlight = null;
                this.komentar = [];
                this.urlPath = this.router.url.split('?')[0];
                this.highlightId = Number(qp['comment'] || '');
                if (this.highlightId > 0) {
                    this.getHighlight();
                }
            }
        });
    }
    getHighlight(id = this.highlightId) {
        this.subsHighlight = this.komen.getHighlight({
            id,
            path: this.urlPath
        }).subscribe({
            next: res => {
                this.gs.log('[KOMENTAR_HIGHLIGHT_SUCCESS]', res);
                if (res.result.parent_komentar_) {
                    this.komentarHighlight = res.result;
                    this.getHighlight(res.result.parent_komentar_.id);
                }
                else {
                    this.komentar = [res.result];
                }
            },
            error: err => {
                this.gs.log('[KOMENTAR_HIGHLIGHT_ERROR]', err, 'error');
            }
        });
    }
    sendComment(k) {
        this.gs.log('[KOMENTAR_PARENT_CREATE_REPLY]', k);
        const commentData = (k) ? {
            path: this.urlPath,
            comment: k.reply_to_send,
            parent: k.id
        } : {
            path: this.urlPath,
            comment: this.commentToSend
        };
        this.subsKomenSend = this.komen.sendComment(commentData).subscribe({
            next: res => {
                this.gs.log('[KOMENTAR_CREATE_REPLY_SUCCESS]', res);
                if (k) {
                    k.reply_to_send = null;
                    k.reply_mode = false;
                    this.getReply(k, true);
                }
                else {
                    this.commentToSend = null;
                    this.getComment(true);
                }
            },
            error: err => {
                this.gs.log('[KOMENTAR_CREATE_REPLY_ERROR]', err, 'error');
            }
        });
    }
    getComment(fresh = false) {
        if (!this.parent) {
            if (fresh) {
                this.page = 1;
                this.pageFinished = false;
            }
            this.subsKomenGetKomen = this.komen.getComment(this.urlPath, '', this.page, 5).subscribe({
                next: res => {
                    this.gs.log('[KOMENTAR_LIST_SUCCESS]', res);
                    this.count = res.count;
                    if (fresh) {
                        this.komentar = res.results;
                    }
                    else {
                        this.komentar = [...this.komentar, ...res.results];
                    }
                    if (res.results.length <= 0) {
                        this.pageFinished = true;
                    }
                },
                error: err => {
                    this.gs.log('[KOMENTAR_LIST_ERROR]', err, 'error');
                }
            });
        }
    }
    getReply(k, fresh = false) {
        this.gs.log('[KOMENTAR_PARENT_LOAD_REPLY]', k);
        if (fresh) {
            k.reply_page = 1;
            k.reply_page_finised = false;
        }
        this.subsKomenGetReply = this.komen.getReply(k.id, '', k.reply_page, 5).subscribe({
            next: res => {
                this.gs.log('[REPLY_LIST_SUCCESS]', res);
                if (fresh) {
                    k.reply = res.results;
                }
                else {
                    k.reply = [...k.reply, ...res.results];
                }
                k.reply_count = res.count;
                if (res.results.length <= 0) {
                    k.reply_page_finised = true;
                }
            },
            error: err => {
                this.gs.log('[REPLY_LIST_ERROR]', err, 'error');
                k.reply = [];
            }
        });
    }
    showHideComment(k) {
        if (k.show_reply === undefined || k.show_reply === null) {
            k.show_reply = true;
        }
        else {
            k.show_reply = !k.show_reply;
        }
        if (k.show_reply) {
            this.getReply(k, true);
        }
    }
    showHideCommentBox(k) {
        if (k.reply_mode === undefined || k.reply_mode === null) {
            k.reply_mode = true;
        }
        else {
            k.reply_mode = !k.reply_mode;
        }
    }
    loadNextPage() {
        if (!this.parent) {
            this.loadNextPageComment();
        }
        else {
            this.loadNextPageReply(this.parent);
        }
    }
    loadNextPageComment() {
        if (!this.pageFinished) {
            this.page++;
            this.getComment();
        }
    }
    loadNextPageReply(k) {
        if (!k.reply_page_finised) {
            if (!k.reply_page) {
                k.reply_page = 1;
            }
            k.reply_page++;
            this.getReply(k);
        }
    }
    openUserProfile(k) {
        this.router.navigateByUrl(`/user/${k.user_.username}`);
    }
    copyCommentLink(k) {
        const url = (k.path.startsWith('/') ? _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl : '') + k.path;
        if (this.clipboard.copy(`${url}?comment=${k.id}`)) {
            this.snackBar.open(`URL Komentar :: Telah Di Salin Pada Clipboard`, 'Ok');
        }
    }
    deleteComment(k) {
        this.gs.log('[KOMENTAR_DELETE_HIGHLIGHT]', k);
        this.subsDelete = this.komen.deleteComment(k.id).subscribe({
            next: res => {
                this.gs.log('[KOMENTAR_DELETE_SUCCESS]', res);
                this.getHighlight();
            },
            error: err => {
                this.gs.log('[KOMENTAR_DELETE_ERROR]', err, 'error');
                this.getHighlight();
            }
        });
    }
}
HighlightComponent.ɵfac = function HighlightComponent_Factory(t) { return new (t || HighlightComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_cdk_clipboard__WEBPACK_IMPORTED_MODULE_8__.Clipboard), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__.MatSnackBar), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_komentar_service__WEBPACK_IMPORTED_MODULE_1__.KomentarService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService)); };
HighlightComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: HighlightComponent, selectors: [["app-highlight"]], inputs: { recursionCount: "recursionCount", parent: "parent", komentar: "komentar" }, decls: 1, vars: 1, consts: [["class", "row pt-3 pb-2 mb-4 gradient-border rgb-border", "appDomChange", "", 4, "ngIf"], ["appDomChange", "", 1, "row", "pt-3", "pb-2", "mb-4", "gradient-border", "rgb-border"], ["class", "d-flex my-1", 4, "ngFor", "ngForOf"], ["class", "col-12", 4, "ngIf"], [1, "d-flex", "my-1"], [1, "flex-shrink-0"], ["width", "40", "height", "40", 2, "object-fit", "cover", "object-position", "center", 3, "src"], [1, "flex-grow-1", "ms-3", "me-2", "row"], [1, "col-8", "p-0", 3, "click"], [1, "m-0"], [1, "text-warning", 2, "cursor", "pointer", 3, "click"], [1, "ms-3", "text-bifeldy", 3, "matTooltip"], [1, "mb-1", 2, "line-height", "normal", 3, "innerHTML"], [1, "col", "p-0", "text-end"], ["type", "button", "mat-icon-button", "", "color", "accent", "matTooltip", "Opsi", 3, "matMenuTriggerFor"], ["komentarMenu", "matMenu"], ["type", "button", "mat-menu-item", "", 3, "click"], [1, "me-1"], [1, "col-12", "p-0"], ["class", "row", 4, "ngIf"], ["appearance", "outline", "class", "mt-2 col-12", 3, "color", 4, "ngIf"], [1, "row"], [1, "col-6"], ["type", "button", "mat-button", "", "class", "ps-1 pe-2", "color", "accent", 3, "click", 4, "ngIf"], [1, "col-6", "text-end"], ["type", "button", "mat-button", "", "color", "accent", 3, "click", 4, "ngIf"], [3, "parent", "komentar", "recursionCount", "row", 4, "ngIf"], [1, "ms-2", "ps-3", "d-flex", "my-1"], [1, "col-8", "p-0"], ["appearance", "outline", 1, "mt-2", "col-12", 3, "color"], ["matInput", "", "placeholder", "Balas ...", 3, "ngModel", "ngModelChange"], ["matSuffix", ""], ["type", "button", "mat-button", "", "color", "accent", 1, "ps-1", "pe-2", 3, "click"], ["class", "me-1", 4, "ngIf"], ["type", "button", "mat-button", "", "color", "accent", 3, "click"], [1, "ms-1"], [3, "parent", "komentar", "recursionCount", "row"], [1, "col-12"]], template: function HighlightComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, HighlightComponent_div_0_Template, 3, 2, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.komentar.length > 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _directives_dom_change_directive__WEBPACK_IMPORTED_MODULE_4__.DomChangeDirective, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_12__.MatTooltip, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__.MatMenuTrigger, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__.MatMenuItem, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgModel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatSuffix, _comment_comment_component__WEBPACK_IMPORTED_MODULE_5__.CommentComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.DatePipe, _pipes_date_ago_pipe__WEBPACK_IMPORTED_MODULE_6__.DateAgoPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoaWdobGlnaHQuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 18757:
/*!***************************************************************************!*\
  !*** ./src/app/_shared/components/material-tab/material-tab.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialTabComponent": () => (/* binding */ MaterialTabComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/tabs */ 12379);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/grid-list */ 63346);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _material_table_material_table_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../material-table/material-table.component */ 30578);
/* harmony import */ var _discussion_discussion_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../discussion/discussion.component */ 78838);
/* harmony import */ var _no_data_no_data_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../no-data/no-data.component */ 40192);
/* harmony import */ var _pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pipes/safe-inner-html.pipe */ 11861);
















function MaterialTabComponent_mat_tab_1_div_1_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tab_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](tab_r5.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](tab_r5.name);
} }
function MaterialTabComponent_mat_tab_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, MaterialTabComponent_mat_tab_1_div_1_ng_template_1_Template, 4, 2, "ng-template", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "safeInnerHtml");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tab_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 1, tab_r5.data), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeHtml"]);
} }
function MaterialTabComponent_mat_tab_1_div_2_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tab_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](tab_r5.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](tab_r5.name);
} }
function MaterialTabComponent_mat_tab_1_div_2_div_2_mat_grid_tile_3_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-grid-tile")(1, "mat-list-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function MaterialTabComponent_mat_tab_1_div_2_div_2_mat_grid_tile_3_Template_mat_list_option_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r20); const d_r18 = restoredCtx.$implicit; const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4); return ctx_r19.onGridClicked(d_r18); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "h4", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const d_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("src", d_r18.image, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](d_r18.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](d_r18.description);
} }
function MaterialTabComponent_mat_tab_1_div_2_div_2_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 17)(1, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function MaterialTabComponent_mat_tab_1_div_2_div_2_div_4_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r22); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4); return ctx_r21.onGridLoadNextPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Load More ...");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
} }
function MaterialTabComponent_mat_tab_1_div_2_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 10)(1, "mat-selection-list", 11)(2, "mat-grid-list", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, MaterialTabComponent_mat_tab_1_div_2_div_2_mat_grid_tile_3_Template, 7, 3, "mat-grid-tile", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, MaterialTabComponent_mat_tab_1_div_2_div_2_div_4_Template, 3, 0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tab_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("cols", ctx_r14.GS.gridListBreakpoint);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", tab_r5.data);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r14.gridPageFinished);
} }
function MaterialTabComponent_mat_tab_1_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, MaterialTabComponent_mat_tab_1_div_2_ng_template_1_Template, 4, 2, "ng-template", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, MaterialTabComponent_mat_tab_1_div_2_div_2_Template, 5, 4, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tab_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", tab_r5.data.length > 0)("ngIfElse", _r3);
} }
function MaterialTabComponent_mat_tab_1_div_3_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tab_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](tab_r5.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](tab_r5.name);
} }
function MaterialTabComponent_mat_tab_1_div_3_div_2_mat_list_option_2_Template(rf, ctx) { if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-list-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function MaterialTabComponent_mat_tab_1_div_3_div_2_mat_list_option_2_Template_mat_list_option_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r32); const d_r30 = restoredCtx.$implicit; const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4); return ctx_r31.onListClicked(d_r30); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h4", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const d_r30 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("src", d_r30.image, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](d_r30.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](d_r30.description);
} }
function MaterialTabComponent_mat_tab_1_div_3_div_2_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 17)(1, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function MaterialTabComponent_mat_tab_1_div_3_div_2_div_3_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r34); const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](4); return ctx_r33.onListLoadNextPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "Load More ...");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
} }
function MaterialTabComponent_mat_tab_1_div_3_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 10)(1, "mat-selection-list", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, MaterialTabComponent_mat_tab_1_div_3_div_2_mat_list_option_2_Template, 6, 3, "mat-list-option", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, MaterialTabComponent_mat_tab_1_div_3_div_2_div_3_Template, 3, 0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tab_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", tab_r5.data);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r26.listPageFinished);
} }
function MaterialTabComponent_mat_tab_1_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, MaterialTabComponent_mat_tab_1_div_3_ng_template_1_Template, 4, 2, "ng-template", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, MaterialTabComponent_mat_tab_1_div_3_div_2_Template, 4, 3, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tab_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", tab_r5.data.length > 0)("ngIfElse", _r3);
} }
function MaterialTabComponent_mat_tab_1_div_4_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tab_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](tab_r5.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](tab_r5.name);
} }
function MaterialTabComponent_mat_tab_1_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, MaterialTabComponent_mat_tab_1_div_4_ng_template_1_Template, 4, 2, "ng-template", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 10)(3, "app-material-table", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("serverSideFilter", function MaterialTabComponent_mat_tab_1_div_4_Template_app_material_table_serverSideFilter_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r40); const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r39.onServerSideFilter($event); })("buttonClicked", function MaterialTabComponent_mat_tab_1_div_4_Template_app_material_table_buttonClicked_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r40); const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r41.onButtonClicked($event); })("chipClicked", function MaterialTabComponent_mat_tab_1_div_4_Template_app_material_table_chipClicked_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r40); const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r42.onChipClicked($event); })("rowClicked", function MaterialTabComponent_mat_tab_1_div_4_Template_app_material_table_rowClicked_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r40); const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r43.onTableRowClicked($event); })("paginatorClicked", function MaterialTabComponent_mat_tab_1_div_4_Template_app_material_table_paginatorClicked_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r40); const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r44.onPaginatorClicked($event); })("serverSideOrder", function MaterialTabComponent_mat_tab_1_div_4_Template_app_material_table_serverSideOrder_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r40); const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r45.onServerSideOrder($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const tab_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("tableDataColumn", tab_r5.data.column)("tableDataRow", tab_r5.data.row)("count", ctx_r9.count)("serverSide", ctx_r9.serverSide)("tablePageSizeOptions", ctx_r9.tablePageSizeOptions);
} }
function MaterialTabComponent_mat_tab_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-tab");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, MaterialTabComponent_mat_tab_1_div_1_Template, 4, 3, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, MaterialTabComponent_mat_tab_1_div_2_Template, 3, 2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, MaterialTabComponent_mat_tab_1_div_3_Template, 3, 2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, MaterialTabComponent_mat_tab_1_div_4_Template, 4, 5, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const tab_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", tab_r5.type === "html");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", tab_r5.type === "grid");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", tab_r5.type === "list");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", tab_r5.type === "table");
} }
function MaterialTabComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "comment");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Komentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function MaterialTabComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "app-discussion");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function MaterialTabComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "app-no-data", 10);
} }
class MaterialTabComponent {
    constructor(activatedRoute, gs) {
        this.activatedRoute = activatedRoute;
        this.gs = gs;
        this.count = 0;
        this.serverSide = false;
        this.serverSideFilter = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.serverSideOrder = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
        this.selectedIndexTab = 0;
        this.totalTabsCount = 2;
        this.tabData = [
        // {
        //   name: 'Anime Fansub',
        //   icon: 'closed_caption',
        //   type: 'grid', // list & grid
        //   data: [
        //     { title: 'Data Title 01', description: 'Data Description 01' },
        //     { title: 'Data Title 02', description: 'Data Description 02' }
        //   ]
        // },
        // {
        //   name: 'Berkas',
        //   icon: 'file_copy',
        //   type: 'table',
        //   data: {
        //     column: ['Tanggal Upload', 'Nama File', 'Pemilik'],
        //     row: [
        //       {
        //         NamaFile: '[FanSub] Berkas Dengan Judul Anime - 01 [BD][1080p].mkv',
        //         Pemilik: 'Bifeldy',
        //         Tanggal: '12:34:56 AM JST+9'
        //       }
        //     ]
        //   }
        // },
        // {
        //   name: 'Garapan',
        //   icon: 'closed_caption',
        //   type: 'table',
        //   data: {
        //     column: ['Jenis', 'Judul Anime', 'Nama Fansub'],
        //     row: [
        //       {
        //         Jenis: 'TV',
        //         'Judul Anime': 'Judul Anime SPECIAL Yang Biasanya Sangat Panjang',
        //         'Nama Fansub': [
        //           { id: 1, name: 'Bifeldy', router: '/', selected: true, color: Warna.BIRU },
        //           { id: 2, name: 'Fansub Lain', router: '/', selected: true, color: Warna.UNGU },
        //         ]
        //       }
        //     ]
        //   }
        // }
        ];
        this.gridPageFinished = false;
        this.listPageFinished = false;
        this.tablePageSizeOptions = [10, 25, 50, 75, 100];
        this.chipClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.buttonClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.gridClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.listClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.gridLoadNextPage = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.listLoadNextPage = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.tableRowClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.paginatorClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.subsQueryParam = null;
        if (this.gs.isBrowser) {
            //
        }
    }
    get GS() {
        return this.gs;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.watchUrlRoute();
        }
    }
    ngAfterViewInit() {
        this.totalTabsCount = this.tabData.length;
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subsQueryParam) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    get backgroundColor() {
        return (this.gs.isDarkMode ? 'gelap' : 'terang');
    }
    watchUrlRoute() {
        this.subsQueryParam = this.activatedRoute.queryParams.subscribe({
            next: qp => {
                const highlightId = Number(qp['comment'] || '');
                if (highlightId > 0) {
                    this.openCommentTab();
                }
            }
        });
    }
    openCommentTab() {
        if (this.tabData.length > 0) {
            this.selectedIndexTab = this.tabData.length;
        }
    }
    swipe(eType) {
        if (eType === this.SWIPE_ACTION.RIGHT && this.selectedIndexTab > 0) {
            this.selectedIndexTab--;
        }
        else if (eType === this.SWIPE_ACTION.LEFT && this.selectedIndexTab < this.totalTabsCount) {
            this.selectedIndexTab++;
        }
    }
    onGridClicked(data) {
        this.gridClicked.emit(data);
    }
    onListClicked(data) {
        this.listClicked.emit(data);
    }
    onGridLoadNextPage() {
        this.gridLoadNextPage.emit();
    }
    onListLoadNextPage() {
        this.listLoadNextPage.emit();
    }
    onTableRowClicked(data) {
        this.tableRowClicked.emit(data);
    }
    onChipClicked(data) {
        this.chipClicked.emit(data);
    }
    onButtonClicked(data) {
        this.buttonClicked.emit(data);
    }
    onPaginatorClicked(data) {
        this.paginatorClicked.emit(data);
    }
    onServerSideFilter(data) {
        this.serverSideFilter.emit(data);
    }
    onServerSideOrder(data) {
        this.serverSideOrder.emit(data);
    }
}
MaterialTabComponent.ɵfac = function MaterialTabComponent_Factory(t) { return new (t || MaterialTabComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
MaterialTabComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: MaterialTabComponent, selectors: [["app-material-tab"]], viewQuery: function MaterialTabComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__.MatTabGroup, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.tabGroup = _t.first);
    } }, inputs: { count: "count", serverSide: "serverSide", tabData: "tabData", gridPageFinished: "gridPageFinished", listPageFinished: "listPageFinished", tablePageSizeOptions: "tablePageSizeOptions" }, outputs: { serverSideFilter: "serverSideFilter", serverSideOrder: "serverSideOrder", chipClicked: "chipClicked", buttonClicked: "buttonClicked", gridClicked: "gridClicked", listClicked: "listClicked", gridLoadNextPage: "gridLoadNextPage", listLoadNextPage: "listLoadNextPage", tableRowClicked: "tableRowClicked", paginatorClicked: "paginatorClicked" }, decls: 7, vars: 4, consts: [["dynamicHeight", "", "mat-stroked-button", "", 1, "px-0", 3, "color", "backgroundColor", "selectedIndex", "swipeleft", "swiperight"], [4, "ngFor", "ngForOf"], ["mat-tab-label", ""], ["matTabContent", ""], ["noData", ""], [4, "ngIf"], [1, "p-3", 3, "innerHTML"], [1, "me-3"], [1, "m-0"], ["class", "p-3", 4, "ngIf", "ngIfElse"], [1, "p-3"], [1, "p-0", 3, "multiple"], ["rowHeight", "72px", 3, "cols"], ["class", "col-12 text-center p-3", 4, "ngIf"], [3, "click"], ["matListAvatar", "", 1, "ms-3", 2, "border-radius", "0", 3, "src"], ["matLine", ""], [1, "col-12", "text-center", "p-3"], ["type", "button", "mat-button", "", 3, "click"], [3, "multiple"], [3, "click", 4, "ngFor", "ngForOf"], [3, "tableDataColumn", "tableDataRow", "count", "serverSide", "tablePageSizeOptions", "serverSideFilter", "buttonClicked", "chipClicked", "rowClicked", "paginatorClicked", "serverSideOrder"]], template: function MaterialTabComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-tab-group", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("swipeleft", function MaterialTabComponent_Template_mat_tab_group_swipeleft_0_listener($event) { return ctx.swipe($event.type); })("swiperight", function MaterialTabComponent_Template_mat_tab_group_swiperight_0_listener($event) { return ctx.swipe($event.type); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, MaterialTabComponent_mat_tab_1_Template, 5, 4, "mat-tab", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "mat-tab");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, MaterialTabComponent_ng_template_3_Template, 4, 0, "ng-template", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, MaterialTabComponent_ng_template_4_Template, 2, 0, "ng-template", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, MaterialTabComponent_ng_template_5_Template, 1, 0, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("color", "accent")("backgroundColor", ctx.backgroundColor)("selectedIndex", ctx.selectedIndexTab);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.tabData);
    } }, directives: [_angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__.MatTabGroup, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__.MatTab, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__.MatTabLabel, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_list__WEBPACK_IMPORTED_MODULE_10__.MatSelectionList, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__.MatGridList, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_11__.MatGridTile, _angular_material_list__WEBPACK_IMPORTED_MODULE_10__.MatListOption, _angular_material_list__WEBPACK_IMPORTED_MODULE_10__.MatListAvatarCssMatStyler, _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MatLine, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _material_table_material_table_component__WEBPACK_IMPORTED_MODULE_1__.MaterialTableComponent, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_7__.MatTabContent, _discussion_discussion_component__WEBPACK_IMPORTED_MODULE_2__.DiscussionComponent, _no_data_no_data_component__WEBPACK_IMPORTED_MODULE_3__.NoDataComponent], pipes: [_pipes_safe_inner_html_pipe__WEBPACK_IMPORTED_MODULE_4__.SafeInnerHtmlPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYXRlcmlhbC10YWIuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 66436:
/*!************************************************************************!*\
  !*** ./src/app/_shared/components/material-tab/material-tab.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialTabModule": () => (/* binding */ MaterialTabModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _material_table_material_table_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../material-table/material-table.module */ 617);
/* harmony import */ var _discussion_discussion_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../discussion/discussion.module */ 78764);
/* harmony import */ var _no_data_no_data_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../no-data/no-data.module */ 12438);
/* harmony import */ var _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../pipes/custom-pipe.module */ 67355);
/* harmony import */ var _material_tab_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./material-tab.component */ 18757);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);








class MaterialTabModule {
}
MaterialTabModule.ɵfac = function MaterialTabModule_Factory(t) { return new (t || MaterialTabModule)(); };
MaterialTabModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: MaterialTabModule });
MaterialTabModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
            _material_table_material_table_module__WEBPACK_IMPORTED_MODULE_1__.MaterialTableModule,
            _discussion_discussion_module__WEBPACK_IMPORTED_MODULE_2__.DiscussionModule,
            _no_data_no_data_module__WEBPACK_IMPORTED_MODULE_3__.NoDataModule,
            _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_4__.CustomPipeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](MaterialTabModule, { declarations: [_material_tab_component__WEBPACK_IMPORTED_MODULE_5__.MaterialTabComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
        _material_table_material_table_module__WEBPACK_IMPORTED_MODULE_1__.MaterialTableModule,
        _discussion_discussion_module__WEBPACK_IMPORTED_MODULE_2__.DiscussionModule,
        _no_data_no_data_module__WEBPACK_IMPORTED_MODULE_3__.NoDataModule,
        _pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_4__.CustomPipeModule], exports: [_material_tab_component__WEBPACK_IMPORTED_MODULE_5__.MaterialTabComponent] }); })();


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
//# sourceMappingURL=default-src_app__shared_components_material-tab_material-tab_module_ts.js.map