"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_mailbox_mailbox_module_ts"],{

/***/ 33657:
/*!***************************************************************************!*\
  !*** ./src/app/_pages/mailbox/mailbox-detail/mailbox-detail.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxDetailComponent": () => (/* binding */ MailboxDetailComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_mail_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/mail.service */ 27358);
/* harmony import */ var _shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/winbox.service */ 88020);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/pipes/bytes.pipe */ 23626);














function MailboxDetailComponent_div_0_div_40_mat_list_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-list-option")(1, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "account_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const mt_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](mt_r6);
} }
function MailboxDetailComponent_div_0_div_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 15)(1, "div", 16)(2, "h2", 17)(3, "b", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Penerima Utama");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 19)(6, "mat-selection-list", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, MailboxDetailComponent_div_0_div_40_mat_list_option_7_Template, 5, 1, "mat-list-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r1.filterAddress(ctx_r1.mailData.to));
} }
function MailboxDetailComponent_div_0_div_41_mat_list_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-list-option")(1, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "account_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const mc_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](mc_r8);
} }
function MailboxDetailComponent_div_0_div_41_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 15)(1, "div", 16)(2, "h2", 17)(3, "b", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Penerima CC");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 19)(6, "mat-selection-list", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, MailboxDetailComponent_div_0_div_41_mat_list_option_7_Template, 5, 1, "mat-list-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r2.filterAddress(ctx_r2.mailData.cc));
} }
function MailboxDetailComponent_div_0_div_42_mat_list_option_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-list-option")(1, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "account_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const mb_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](mb_r10);
} }
function MailboxDetailComponent_div_0_div_42_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 15)(1, "div", 16)(2, "h2", 17)(3, "b", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Penerima BCC");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 19)(6, "mat-selection-list", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, MailboxDetailComponent_div_0_div_42_mat_list_option_7_Template, 5, 1, "mat-list-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r3.filterAddress(ctx_r3.mailData.bcc));
} }
function MailboxDetailComponent_div_0_div_43_mat_list_option_7_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "mat-list-option", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MailboxDetailComponent_div_0_div_43_mat_list_option_7_Template_mat_list_option_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r14); const ma_r12 = restoredCtx.$implicit; const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3); return ctx_r13.downloadAttachment(ma_r12.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "attach_file");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](7, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ma_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ma_r12.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](7, 2, ma_r12.size));
} }
function MailboxDetailComponent_div_0_div_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 15)(1, "div", 16)(2, "h2", 17)(3, "b", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Lampiran");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 19)(6, "mat-selection-list", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, MailboxDetailComponent_div_0_div_43_mat_list_option_7_Template, 8, 4, "mat-list-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r4.mailData.attachment_);
} }
function MailboxDetailComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "ul", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "li")(5, "li")(6, "li")(7, "li")(8, "li")(9, "li")(10, "li")(11, "li")(12, "li")(13, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 5)(15, "div", 6)(16, "div", 7)(17, "h2", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](21, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](22, "app-notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "div", 10)(24, "div", 11)(25, "div", 12)(26, "div", 13)(27, "div", 14)(28, "div", 15)(29, "div", 16)(30, "h2", 17)(31, "b", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](32, "Pengirim");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "div", 19)(34, "mat-selection-list", 20)(35, "mat-list-option")(36, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](37, "account_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](38, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](40, MailboxDetailComponent_div_0_div_40_Template, 8, 2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](41, MailboxDetailComponent_div_0_div_41_Template, 8, 2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](42, MailboxDetailComponent_div_0_div_42_Template, 8, 2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](43, MailboxDetailComponent_div_0_div_43_Template, 8, 2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](44, "div", 23)(45, "div", 13)(46, "div", 14)(47, "div", 15)(48, "div", 16)(49, "h2", 17)(50, "b", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](51, "Isi Konten Pesan");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](52, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](53, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵstyleProp"]("background", "url(/assets/img/banner/mailbox-detail.png), " + "linear-gradient(to bottom, " + (ctx_r0.GS.isDarkMode ? "#673ab7" : "#3f51b5") + " 0%, #ee0dfd 100%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r0.mailData.subject, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](21, 11, ctx_r0.mailData.date, "d MMMM y, hh:mm:ss a z"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r0.mailData.from);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.mailData.to);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.mailData.cc);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.mailData.bcc);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.mailData.attachment_.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("innerHTML", ctx_r0.mailData.html || ctx_r0.mailData.text, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeHtml"]);
} }
class MailboxDetailComponent {
    constructor(activatedRoute, router, bs, fs, gs, ms, wb) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.bs = bs;
        this.fs = fs;
        this.gs = gs;
        this.ms = ms;
        this.wb = wb;
        this.mailId = '';
        this.mailData = null;
        this.subsParam = null;
        this.subsMail = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get GS() {
        return this.gs;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getMail();
        }
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subsParam) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsMail) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    filterAddress(raw) {
        return !raw ? [] : raw.split(',').map(rw => rw.trim());
    }
    getMail() {
        this.subsParam = this.activatedRoute.params.subscribe({
            next: p => {
                this.mailId = p['mailId'];
                this.bs.busy();
                if (this.subsMail) {
                    this.subsMail.unsubscribe();
                    this.bs.idle();
                }
                this.subsMail = this.ms.getMail(this.mailId).subscribe({
                    next: res => {
                        this.gs.log('[MAIL_DETAIL_SUCCESS]', res);
                        this.mailData = res.result;
                        this.fs.initializeFab('outgoing_mail', null, 'Balas Email', `/create/mailbox`, false);
                        this.bs.idle();
                    },
                    error: err => {
                        this.gs.log('[MAIL_DETAIL_ERROR]', err, 'error');
                        this.bs.idle();
                        this.router.navigate(['/error'], {
                            queryParams: {
                                returnUrl: '/mailbox'
                            }
                        });
                    }
                });
            }
        });
    }
    downloadAttachment(id) {
        this.wb.winboxOpenUri(`${_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/attachment/${id}?ngsw-bypass=true`);
    }
}
MailboxDetailComponent.ɵfac = function MailboxDetailComponent_Factory(t) { return new (t || MailboxDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_2__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_mail_service__WEBPACK_IMPORTED_MODULE_4__.MailService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_5__.WinboxService)); };
MailboxDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: MailboxDetailComponent, selectors: [["app-mailbox-detail"]], decls: 1, vars: 1, consts: [["class", "p-0 m-0", 4, "ngIf"], [1, "p-0", "m-0"], [1, "container-fluid", "p-0"], [1, "wrapper"], [1, "bg-bubbles", "align-items-center", "p-0"], [1, "row", "align-items-center", "h-100"], [1, "col-12", "mx-auto"], [1, "container", "text-light"], [1, "mb-1", 2, "line-height", "normal"], [1, "mb-0"], [1, "container"], [1, "row"], [1, "col-md-5", "col-xl-4", "p-3"], [1, "row", "sticky-top"], [1, "col"], [1, "row", "py-3"], [1, "col-12", "pt-3", "sticky-top", "bg-bifeldy"], [1, "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12"], [3, "multiple"], ["mat-list-icon", "", 1, "ms-3"], ["class", "row py-3", 4, "ngIf"], [1, "col-md-7", "col-xl-8", "p-3", "sticky-top"], [1, "py-2", "px-3", 2, "white-space", "pre-line !important", 3, "innerHTML"], [4, "ngFor", "ngForOf"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["mat-line", ""]], template: function MailboxDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, MailboxDetailComponent_div_0_Template, 54, 14, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.mailData);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__.NotificationsComponent, _angular_material_list__WEBPACK_IMPORTED_MODULE_11__.MatSelectionList, _angular_material_list__WEBPACK_IMPORTED_MODULE_11__.MatListOption, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _angular_material_list__WEBPACK_IMPORTED_MODULE_11__.MatListIconCssMatStyler, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_13__.MatLine], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe, _shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_7__.BytesPipe], styles: [".wrapper[_ngcontent-%COMP%] {\r\n  \r\n  \r\n  \r\n  position: sticky;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 128px;\r\n  overflow: hidden;\r\n  background-size: 128px, auto !important;\r\n  background-repeat: no-repeat, repeat !important;\r\n  background-position-x: 100%, 0% !important;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  list-style: none;\r\n  display: block;\r\n  width: 40px;\r\n  height: 40px;\r\n  background-color: rgba(255, 255, 255, 0.15);\r\n  bottom: -160px;\r\n  animation: square 25s infinite;\r\n  transition-timing-function: linear;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(1) {\r\n  left: 10%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(2) {\r\n  left: 20%;\r\n  width: 80px;\r\n  height: 80px;\r\n  animation-delay: 2s;\r\n  animation-duration: 17s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(3) {\r\n  left: 25%;\r\n  animation-delay: 4s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(4) {\r\n  left: 40%;\r\n  width: 60px;\r\n  height: 60px;\r\n  animation-duration: 22s;\r\n  background-color: rgba(255, 255, 255, 0.25);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(5) {\r\n  left: 70%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(6) {\r\n  left: 80%;\r\n  width: 120px;\r\n  height: 120px;\r\n  animation-delay: 3s;\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(7) {\r\n  left: 32%;\r\n  width: 160px;\r\n  height: 160px;\r\n  animation-delay: 7s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(8) {\r\n  left: 55%;\r\n  width: 20px;\r\n  height: 20px;\r\n  animation-delay: 15s;\r\n  animation-duration: 40s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(9) {\r\n  left: 25%;\r\n  width: 10px;\r\n  height: 10px;\r\n  animation-delay: 2s;\r\n  animation-duration: 40s;\r\n  background-color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(10) {\r\n  left: 90%;\r\n  width: 160px;\r\n  height: 160px;\r\n  animation-delay: 11s;\r\n}\r\n\r\n@keyframes square {\r\n  0% {\r\n    transform: translateY(0);\r\n  }\r\n  100% {\r\n    transform: translateY(-512px) rotate(512deg);\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haWxib3gtZGV0YWlsLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx5QkFBeUI7RUFDekIsc0VBQXNFO0VBQ3RFLHNFQUFzRTtFQUN0RSxnQkFBZ0I7RUFDaEIsT0FBTztFQUNQLFdBQVc7RUFDWCxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLHVDQUF1QztFQUN2QywrQ0FBK0M7RUFDL0MsMENBQTBDO0FBQzVDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLFdBQVc7RUFDWCxZQUFZO0VBQ1osMkNBQTJDO0VBQzNDLGNBQWM7RUFDZCw4QkFBOEI7RUFDOUIsa0NBQWtDO0FBQ3BDOztBQUVBO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsU0FBUztFQUNULFdBQVc7RUFDWCxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsV0FBVztFQUNYLFlBQVk7RUFDWix1QkFBdUI7RUFDdkIsMkNBQTJDO0FBQzdDOztBQUVBO0VBQ0UsU0FBUztBQUNYOztBQUVBO0VBQ0UsU0FBUztFQUNULFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDBDQUEwQztBQUM1Qzs7QUFFQTtFQUNFLFNBQVM7RUFDVCxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxXQUFXO0VBQ1gsWUFBWTtFQUNaLG9CQUFvQjtFQUNwQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsV0FBVztFQUNYLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLDBDQUEwQztBQUM1Qzs7QUFFQTtFQUNFLFNBQVM7RUFDVCxZQUFZO0VBQ1osYUFBYTtFQUNiLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFO0lBQ0Usd0JBQXdCO0VBQzFCO0VBQ0E7SUFDRSw0Q0FBNEM7RUFDOUM7QUFDRiIsImZpbGUiOiJtYWlsYm94LWRldGFpbC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndyYXBwZXIge1xyXG4gIC8qIGJhY2tncm91bmQ6ICMxZmEyNjA7ICovXHJcbiAgLyogYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgIzNmNTFiNSAwJSwgIzBkNmVmZCAxMDAlKTsgKi9cclxuICAvKiBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjNjczYWI3IDAlLCAjZWUwZGZkIDEwMCUpOyAqL1xyXG4gIHBvc2l0aW9uOiBzdGlja3k7XHJcbiAgbGVmdDogMDtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEyOHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgYmFja2dyb3VuZC1zaXplOiAxMjhweCwgYXV0byAhaW1wb3J0YW50O1xyXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQsIHJlcGVhdCAhaW1wb3J0YW50O1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb24teDogMTAwJSwgMCUgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbGlzdC1zdHlsZTogbm9uZTtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogNDBweDtcclxuICBoZWlnaHQ6IDQwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KTtcclxuICBib3R0b206IC0xNjBweDtcclxuICBhbmltYXRpb246IHNxdWFyZSAyNXMgaW5maW5pdGU7XHJcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGxpbmVhcjtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDEpIHtcclxuICBsZWZ0OiAxMCU7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCgyKSB7XHJcbiAgbGVmdDogMjAlO1xyXG4gIHdpZHRoOiA4MHB4O1xyXG4gIGhlaWdodDogODBweDtcclxuICBhbmltYXRpb24tZGVsYXk6IDJzO1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMTdzO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoMykge1xyXG4gIGxlZnQ6IDI1JTtcclxuICBhbmltYXRpb24tZGVsYXk6IDRzO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoNCkge1xyXG4gIGxlZnQ6IDQwJTtcclxuICB3aWR0aDogNjBweDtcclxuICBoZWlnaHQ6IDYwcHg7XHJcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAyMnM7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDUpIHtcclxuICBsZWZ0OiA3MCU7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCg2KSB7XHJcbiAgbGVmdDogODAlO1xyXG4gIHdpZHRoOiAxMjBweDtcclxuICBoZWlnaHQ6IDEyMHB4O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogM3M7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoNykge1xyXG4gIGxlZnQ6IDMyJTtcclxuICB3aWR0aDogMTYwcHg7XHJcbiAgaGVpZ2h0OiAxNjBweDtcclxuICBhbmltYXRpb24tZGVsYXk6IDdzO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoOCkge1xyXG4gIGxlZnQ6IDU1JTtcclxuICB3aWR0aDogMjBweDtcclxuICBoZWlnaHQ6IDIwcHg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAxNXM7XHJcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCg5KSB7XHJcbiAgbGVmdDogMjUlO1xyXG4gIHdpZHRoOiAxMHB4O1xyXG4gIGhlaWdodDogMTBweDtcclxuICBhbmltYXRpb24tZGVsYXk6IDJzO1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDEwKSB7XHJcbiAgbGVmdDogOTAlO1xyXG4gIHdpZHRoOiAxNjBweDtcclxuICBoZWlnaHQ6IDE2MHB4O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogMTFzO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIHNxdWFyZSB7XHJcbiAgMCUge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG4gIH1cclxuICAxMDAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTEycHgpIHJvdGF0ZSg1MTJkZWcpO1xyXG4gIH1cclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ 50045:
/*!***********************************************************************!*\
  !*** ./src/app/_pages/mailbox/mailbox-list/mailbox-list.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxListComponent": () => (/* binding */ MailboxListComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_fab_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/fab.service */ 96382);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_mail_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/mail.service */ 27358);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/material-table/material-table.component */ 30578);















class MailboxListComponent {
    constructor(router, as, bs, fs, gs, ms) {
        this.router = router;
        this.as = as;
        this.bs = bs;
        this.fs = fs;
        this.gs = gs;
        this.ms = ms;
        this.mailData = {
            inbox: {
                column: ['Tanggal', 'Pengirim', 'Topik', 'Lampiran'],
                row: [],
                count: 0
            },
            outbox: {
                column: ['Tanggal', 'Penerima', 'Topik', 'Lampiran'],
                row: [],
                count: 0
            }
        };
        this.selectedMailBox = 'inbox';
        this.page = 1;
        this.row = 10;
        this.q = '';
        this.sort = '';
        this.order = '';
        this.subsMailbox = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get GS() {
        return this.gs;
    }
    get AS() {
        return this.as;
    }
    get ENV() {
        return _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getMailbox();
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subsMailbox) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    filterAddress(raw) {
        let addr = '';
        if (raw) {
            for (const rw of raw.split(',')) {
                if (addr) {
                    addr += ', ';
                }
                if (rw.includes('<') && rw.includes('>')) {
                    addr += rw.split('<')[1].split('>')[0].trim();
                }
                else {
                    addr += rw.trim();
                }
            }
        }
        return addr;
    }
    getMailbox() {
        this.bs.busy();
        if (this.subsMailbox) {
            this.subsMailbox.unsubscribe();
            this.bs.idle();
        }
        this.subsMailbox = this.ms.getMailbox(this.selectedMailBox, this.q, this.page, this.row, this.sort, this.order).subscribe({
            next: res => {
                this.gs.log('[MAILBOX_LIST_SUCCESS]', res);
                this.mailData[this.selectedMailBox].count = res.count;
                this.mailData[this.selectedMailBox].row = [];
                for (const r of res.results) {
                    this.mailData[this.selectedMailBox].row.push({
                        id: r.id,
                        Tanggal: r.date,
                        Pengirim: this.filterAddress(r.from),
                        Penerima: this.filterAddress(r.to),
                        Topik: r.subject,
                        Lampiran: `${r.attachment_count} Berkas`
                    });
                }
                this.fs.initializeFab('outgoing_mail', null, 'Buat Email Baru', `/create/mailbox`, false);
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[MAILBOX_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    changeMailbox() {
        this.getMailbox();
    }
    onRowClicked(data) {
        this.gs.log('[MAILBOX_LIST_CLICK_EMAIL]', data);
        this.router.navigateByUrl(`/mailbox/${data.id}`);
    }
    onPaginatorClicked(data) {
        this.gs.log('[MAILBOX_LIST_CLICK_PAGINATOR]', data);
        this.page = data.pageIndex + 1;
        this.row = data.pageSize;
        this.getMailbox();
    }
    onServerSideFilter(data) {
        this.gs.log('[MAILBOX_LIST_ENTER_FILTER]', data);
        this.q = data;
        this.getMailbox();
    }
    onServerSideOrder(data) {
        this.gs.log('[MAILBOX_LIST_CLICK_ORDER]', data);
        this.q = data.q;
        this.sort = data.active;
        if (this.sort === 'created_at') {
            this.sort = 'date';
        }
        else if (this.sort === 'title') {
            this.sort = 'subject';
        }
        this.order = data.direction;
        this.getMailbox();
    }
}
MailboxListComponent.ɵfac = function MailboxListComponent_Factory(t) { return new (t || MailboxListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_fab_service__WEBPACK_IMPORTED_MODULE_3__.FabService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_mail_service__WEBPACK_IMPORTED_MODULE_5__.MailService)); };
MailboxListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: MailboxListComponent, selectors: [["app-mailbox-list"]], decls: 42, vars: 12, consts: [[1, "container-fluid", "p-0"], [1, "wrapper"], [1, "bg-bubbles", "align-items-center", "p-0"], [1, "row", "align-items-center", "h-100"], [1, "col-12", "mx-auto"], [1, "container", "text-light"], [1, "mb-1", 2, "line-height", "normal"], [1, "mb-0"], [1, "container"], [1, "row", "sticky-top", "bg-bifeldy"], [1, "col-12"], [1, "row"], [1, "col-12", "pb-3"], [1, "m-0", "border-bottom", "border-primary", "row"], [1, "pt-3", "col-6", "col-md-4", "col-lg-2", 3, "color"], [3, "value", "valueChange"], ["value", "inbox"], ["value", "outbox"], [1, "ms-auto", "p-3", "col-6", "col-md-4", "col-lg-2"], ["type", "button", "mat-flat-button", "", "color", "accent", 1, "w-100", "h-100", 3, "click"], [1, "me-1"], [1, "row", "p-3"], [3, "tableDataColumn", "tableDataRow", "count", "serverSide", "serverSideFilter", "rowClicked", "paginatorClicked", "serverSideOrder"]], template: function MailboxListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "li")(4, "li")(5, "li")(6, "li")(7, "li")(8, "li")(9, "li")(10, "li")(11, "li")(12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 3)(14, "div", 4)(15, "div", 5)(16, "h2", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](20, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](21, "div", 8)(22, "div", 9)(23, "div", 10)(24, "div", 11)(25, "div", 12)(26, "h3", 13)(27, "mat-form-field", 14)(28, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](29, "Kotak Pesan");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](30, "mat-select", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function MailboxListComponent_Template_mat_select_valueChange_30_listener($event) { return ctx.selectedMailBox = $event; })("valueChange", function MailboxListComponent_Template_mat_select_valueChange_30_listener() { return ctx.changeMailbox(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](31, "mat-option", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](32, "Masuk");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "mat-option", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](34, "Keluar");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](35, "div", 18)(36, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MailboxListComponent_Template_button_click_36_listener() { return ctx.changeMailbox(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](37, "mat-icon", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](38, "loop");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](39, " Refresh ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](40, "div", 21)(41, "app-material-table", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("serverSideFilter", function MailboxListComponent_Template_app_material_table_serverSideFilter_41_listener($event) { return ctx.onServerSideFilter($event); })("rowClicked", function MailboxListComponent_Template_app_material_table_rowClicked_41_listener($event) { return ctx.onRowClicked($event); })("paginatorClicked", function MailboxListComponent_Template_app_material_table_paginatorClicked_41_listener($event) { return ctx.onPaginatorClicked($event); })("serverSideOrder", function MailboxListComponent_Template_app_material_table_serverSideOrder_41_listener($event) { return ctx.onServerSideOrder($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵstyleProp"]("background", "url(/assets/img/banner/mailbox.png), " + "linear-gradient(to bottom, " + (ctx.GS.isDarkMode ? "#673ab7" : "#3f51b5") + " 0%, #ee0dfd 100%)");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", ctx.AS.currentUserSubject == null ? null : ctx.AS.currentUserSubject.value == null ? null : ctx.AS.currentUserSubject.value.username, " @ ", ctx.ENV.domain, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", ctx.mailData["inbox"].count, " Inbox ~ ", ctx.mailData["outbox"].count, " Outbox ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx.selectedMailBox);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("tableDataColumn", ctx.mailData[ctx.selectedMailBox].column)("tableDataRow", ctx.mailData[ctx.selectedMailBox].row)("count", ctx.mailData[ctx.selectedMailBox].count)("serverSide", true);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__.NotificationsComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_11__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_12__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIcon, _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_7__.MaterialTableComponent], styles: [".wrapper[_ngcontent-%COMP%] {\r\n  \r\n  \r\n  \r\n  position: sticky;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 128px;\r\n  overflow: hidden;\r\n  background-size: 200px, auto !important;\r\n  background-repeat: no-repeat, repeat !important;\r\n  background-position-x: 100%, 0% !important;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  list-style: none;\r\n  display: block;\r\n  width: 40px;\r\n  height: 40px;\r\n  background-color: rgba(255, 255, 255, 0.15);\r\n  bottom: -160px;\r\n  animation: square 25s infinite;\r\n  transition-timing-function: linear;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(1) {\r\n  left: 10%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(2) {\r\n  left: 20%;\r\n  width: 80px;\r\n  height: 80px;\r\n  animation-delay: 2s;\r\n  animation-duration: 17s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(3) {\r\n  left: 25%;\r\n  animation-delay: 4s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(4) {\r\n  left: 40%;\r\n  width: 60px;\r\n  height: 60px;\r\n  animation-duration: 22s;\r\n  background-color: rgba(255, 255, 255, 0.25);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(5) {\r\n  left: 70%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(6) {\r\n  left: 80%;\r\n  width: 120px;\r\n  height: 120px;\r\n  animation-delay: 3s;\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(7) {\r\n  left: 32%;\r\n  width: 160px;\r\n  height: 160px;\r\n  animation-delay: 7s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(8) {\r\n  left: 55%;\r\n  width: 20px;\r\n  height: 20px;\r\n  animation-delay: 15s;\r\n  animation-duration: 40s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(9) {\r\n  left: 25%;\r\n  width: 10px;\r\n  height: 10px;\r\n  animation-delay: 2s;\r\n  animation-duration: 40s;\r\n  background-color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(10) {\r\n  left: 90%;\r\n  width: 160px;\r\n  height: 160px;\r\n  animation-delay: 11s;\r\n}\r\n\r\n@keyframes square {\r\n  0% {\r\n    transform: translateY(0);\r\n  }\r\n  100% {\r\n    transform: translateY(-512px) rotate(512deg);\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haWxib3gtbGlzdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UseUJBQXlCO0VBQ3pCLHNFQUFzRTtFQUN0RSxzRUFBc0U7RUFDdEUsZ0JBQWdCO0VBQ2hCLE9BQU87RUFDUCxXQUFXO0VBQ1gsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQix1Q0FBdUM7RUFDdkMsK0NBQStDO0VBQy9DLDBDQUEwQztBQUM1Qzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxXQUFXO0VBQ1gsWUFBWTtFQUNaLDJDQUEyQztFQUMzQyxjQUFjO0VBQ2QsOEJBQThCO0VBQzlCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFNBQVM7RUFDVCxXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztFQUNULFdBQVc7RUFDWCxZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFNBQVM7RUFDVCxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsV0FBVztFQUNYLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsU0FBUztFQUNULFdBQVc7RUFDWCxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsWUFBWTtFQUNaLGFBQWE7RUFDYixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRTtJQUNFLHdCQUF3QjtFQUMxQjtFQUNBO0lBQ0UsNENBQTRDO0VBQzlDO0FBQ0YiLCJmaWxlIjoibWFpbGJveC1saXN0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud3JhcHBlciB7XHJcbiAgLyogYmFja2dyb3VuZDogIzFmYTI2MDsgKi9cclxuICAvKiBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjM2Y1MWI1IDAlLCAjMGQ2ZWZkIDEwMCUpOyAqL1xyXG4gIC8qIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICM2NzNhYjcgMCUsICNlZTBkZmQgMTAwJSk7ICovXHJcbiAgcG9zaXRpb246IHN0aWNreTtcclxuICBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTI4cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBiYWNrZ3JvdW5kLXNpemU6IDIwMHB4LCBhdXRvICFpbXBvcnRhbnQ7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdCwgcmVwZWF0ICFpbXBvcnRhbnQ7XHJcbiAgYmFja2dyb3VuZC1wb3NpdGlvbi14OiAxMDAlLCAwJSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uYmctYnViYmxlcyB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGkge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsaXN0LXN0eWxlOiBub25lO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHdpZHRoOiA0MHB4O1xyXG4gIGhlaWdodDogNDBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpO1xyXG4gIGJvdHRvbTogLTE2MHB4O1xyXG4gIGFuaW1hdGlvbjogc3F1YXJlIDI1cyBpbmZpbml0ZTtcclxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoMSkge1xyXG4gIGxlZnQ6IDEwJTtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDIpIHtcclxuICBsZWZ0OiAyMCU7XHJcbiAgd2lkdGg6IDgwcHg7XHJcbiAgaGVpZ2h0OiA4MHB4O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogMnM7XHJcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxN3M7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCgzKSB7XHJcbiAgbGVmdDogMjUlO1xyXG4gIGFuaW1hdGlvbi1kZWxheTogNHM7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCg0KSB7XHJcbiAgbGVmdDogNDAlO1xyXG4gIHdpZHRoOiA2MHB4O1xyXG4gIGhlaWdodDogNjBweDtcclxuICBhbmltYXRpb24tZHVyYXRpb246IDIycztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoNSkge1xyXG4gIGxlZnQ6IDcwJTtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDYpIHtcclxuICBsZWZ0OiA4MCU7XHJcbiAgd2lkdGg6IDEyMHB4O1xyXG4gIGhlaWdodDogMTIwcHg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAzcztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCg3KSB7XHJcbiAgbGVmdDogMzIlO1xyXG4gIHdpZHRoOiAxNjBweDtcclxuICBoZWlnaHQ6IDE2MHB4O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogN3M7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCg4KSB7XHJcbiAgbGVmdDogNTUlO1xyXG4gIHdpZHRoOiAyMHB4O1xyXG4gIGhlaWdodDogMjBweDtcclxuICBhbmltYXRpb24tZGVsYXk6IDE1cztcclxuICBhbmltYXRpb24tZHVyYXRpb246IDQwcztcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDkpIHtcclxuICBsZWZ0OiAyNSU7XHJcbiAgd2lkdGg6IDEwcHg7XHJcbiAgaGVpZ2h0OiAxMHB4O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogMnM7XHJcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoMTApIHtcclxuICBsZWZ0OiA5MCU7XHJcbiAgd2lkdGg6IDE2MHB4O1xyXG4gIGhlaWdodDogMTYwcHg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAxMXM7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc3F1YXJlIHtcclxuICAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XHJcbiAgfVxyXG4gIDEwMCUge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MTJweCkgcm90YXRlKDUxMmRlZyk7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 41309:
/*!**************************************************!*\
  !*** ./src/app/_pages/mailbox/mailbox.module.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxModule": () => (/* binding */ MailboxModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/pipes/custom-pipe.module */ 67355);
/* harmony import */ var _mailbox_detail_mailbox_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mailbox-detail/mailbox-detail.component */ 33657);
/* harmony import */ var _mailbox_list_mailbox_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mailbox-list/mailbox-list.component */ 50045);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _shared_components_material_table_material_table_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/components/material-table/material-table.module */ 617);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);











const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _mailbox_list_mailbox_list_component__WEBPACK_IMPORTED_MODULE_3__.MailboxListComponent
    },
    {
        path: ':mailId',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: _mailbox_detail_mailbox_detail_component__WEBPACK_IMPORTED_MODULE_2__.MailboxDetailComponent
            }
        ]
    }
];
class MailboxModule {
}
MailboxModule.ɵfac = function MailboxModule_Factory(t) { return new (t || MailboxModule)(); };
MailboxModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: MailboxModule });
MailboxModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forChild(routes),
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule,
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_4__.NotificationsModule,
            _shared_components_material_table_material_table_module__WEBPACK_IMPORTED_MODULE_5__.MaterialTableModule,
            _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_1__.CustomPipeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](MailboxModule, { declarations: [_mailbox_list_mailbox_list_component__WEBPACK_IMPORTED_MODULE_3__.MailboxListComponent,
        _mailbox_detail_mailbox_detail_component__WEBPACK_IMPORTED_MODULE_2__.MailboxDetailComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule,
        _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_4__.NotificationsModule,
        _shared_components_material_table_material_table_module__WEBPACK_IMPORTED_MODULE_5__.MaterialTableModule,
        _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_1__.CustomPipeModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app__pages_mailbox_mailbox_module_ts.js.map