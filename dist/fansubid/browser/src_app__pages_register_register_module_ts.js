"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_register_register_module_ts"],{

/***/ 30300:
/*!*******************************************************!*\
  !*** ./src/app/_pages/register/register.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterComponent": () => (/* binding */ RegisterComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../environments/app/environment */ 15934);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/services/global.service */ 80855);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_crypto_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/services/crypto.service */ 38379);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-recaptcha */ 53109);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/icon */ 65590);

















function RegisterComponent_div_0_form_7_strong_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Username Tidak Boleh Kosong ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function RegisterComponent_div_0_form_7_strong_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Username Minimal 8 Huruf ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function RegisterComponent_div_0_form_7_strong_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Username Hanya Boleh Huruf Kecil Dan Angka ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function RegisterComponent_div_0_form_7_strong_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r5.usernameUsed);
  }
}

function RegisterComponent_div_0_form_7_strong_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Nama Tidak Boleh Kosong ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function RegisterComponent_div_0_form_7_strong_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Nama Tidak Valid ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function RegisterComponent_div_0_form_7_strong_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Email Tidak Boleh Kosong ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function RegisterComponent_div_0_form_7_strong_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Email Tidak Valid ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function RegisterComponent_div_0_form_7_strong_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r10.emailUsed, " ");
  }
}

function RegisterComponent_div_0_form_7_strong_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Password Tidak Boleh Kosong ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function RegisterComponent_div_0_form_7_strong_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Password Minimal 8 Huruf ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function RegisterComponent_div_0_form_7_strong_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Password Hanya Boleh Huruf Standar Papan Ketik ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function RegisterComponent_div_0_form_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "form", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngSubmit", function RegisterComponent_div_0_form_7_Template_form_ngSubmit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return ctx_r15.onClickedSubmit();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "h1", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Hai, Selamat Datang! >_<\"");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "div", 15)(8, "label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Nama Pengguna");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](11, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](13, RegisterComponent_div_0_form_7_strong_13_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](14, RegisterComponent_div_0_form_7_strong_14_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, RegisterComponent_div_0_form_7_strong_15_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "small", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, RegisterComponent_div_0_form_7_strong_17_Template, 2, 1, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "div", 15)(19, "label", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20, "Nama Lengkap");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](21, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](22, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](24, RegisterComponent_div_0_form_7_strong_24_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](25, RegisterComponent_div_0_form_7_strong_25_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "div", 15)(27, "label", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](28, "Alamat Surel");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](29, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](30, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](31, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](32, RegisterComponent_div_0_form_7_strong_32_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](33, RegisterComponent_div_0_form_7_strong_33_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](34, "small", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](35, RegisterComponent_div_0_form_7_strong_35_Template, 3, 1, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](36, "div", 15)(37, "label", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](38, "Kata Sandi");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](39, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](40, "input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](41, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](42, RegisterComponent_div_0_form_7_strong_42_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](43, RegisterComponent_div_0_form_7_strong_43_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](44, RegisterComponent_div_0_form_7_strong_44_Template, 3, 0, "strong", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](45, "div", 15)(46, "div", 28)(47, "div", 29)(48, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function RegisterComponent_div_0_form_7_Template_input_change_48_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return ctx_r17.openAturanTatib();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](49, "label", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](50, " Saya Telah Membaca & Setuju Dengan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](51, "u", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](52, " Aturan & Tata Tertib ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](53, " Yang Ada ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](54, "div", 15)(55, "div", 28)(56, "div", 29)(57, "input", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("change", function RegisterComponent_div_0_form_7_Template_input_change_57_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return ctx_r18.openPrivacyPolicy();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](58, "label", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](59, " Saya Telah Membaca & Setuju Dengan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](60, "u", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](61, " Kebijakan Privasi ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](62, " Yang Ada ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](63, "div", 15)(64, "div", 28)(65, "re-captcha", 35, 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("resolved", function RegisterComponent_div_0_form_7_Template_re_captcha_resolved_65_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);

      const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](66);

      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return ctx_r19.captcha($event, _r14);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](67, "div", 37)(68, "div", 38)(69, "div", 39)(70, "div", 40)(71, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](72, " Daftar ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](73, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](74, "emoji_people");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](75, "div", 40)(76, "a", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](77, " Masuk ~ ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()();
  }

  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx_r1.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate1"]("src", "", ctx_r1.ENV.baseUrl, "/assets/img/logo/register.png", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.registerInfo);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassMapInterpolate1"]("text-bifeldy form-control ", !ctx_r1.fg.get("username").valid && ctx_r1.fg.get("username").touched ? "is-invalid" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("username").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("username").hasError("minlength"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("username").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.usernameUsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassMapInterpolate1"]("text-bifeldy form-control ", !ctx_r1.fg.get("name").valid && ctx_r1.fg.get("name").touched ? "is-invalid" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("name").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("name").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassMapInterpolate1"]("text-bifeldy form-control ", !ctx_r1.fg.get("email").valid && ctx_r1.fg.get("email").touched ? "is-invalid" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("email").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("email").hasError("email") || ctx_r1.fg.get("email").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.emailUsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassMapInterpolate1"]("text-bifeldy form-control ", !ctx_r1.fg.get("password").valid && ctx_r1.fg.get("password").touched ? "is-invalid" : "", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("password").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("password").hasError("minlength"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("password").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("siteKey", ctx_r1.G_CAPTCHA_SITE_KEY);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.submitted || ctx_r1.fg.invalid || ctx_r1.fg.get("agree_tatib").value === false || ctx_r1.fg.get("agree_pp").value === false);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.submitted);
  }
}

const _c0 = function (a2) {
  return {
    "background-position": "center",
    "background-size": "cover",
    "background-image": a2
  };
};

function RegisterComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "div", 6)(6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, RegisterComponent_div_0_form_7_Template, 78, 30, "form", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](2, _c0, "url(" + ctx_r0.registerImg + ")"));
  }
}

class RegisterComponent {
  constructor(fb, gs, router, bs, activatedRoute, as, ds, cs) {
    this.fb = fb;
    this.gs = gs;
    this.router = router;
    this.bs = bs;
    this.activatedRoute = activatedRoute;
    this.as = as;
    this.ds = ds;
    this.cs = cs;
    this.usernameUsed = null;
    this.emailUsed = null;
    this.captchaRef = null;
    this.submitted = false;
    this.returnUrl = '/';
    this.registerImg = '/assets/img/login-register.png';
    this.registerInfo = 'Ayo bergabung dan masuk dalam komunitas~';
    this.subsUser = null;
    this.subsRegister = null;
    this.subsVerify = null;
    this.subsDialog = null;
    this.subsResendActivation = null;
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy() {
    var _a, _b, _c, _d, _e;

    (_a = this.subsRegister) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsVerify) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsUser) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    (_d = this.subsDialog) === null || _d === void 0 ? void 0 : _d.unsubscribe();
    (_e = this.subsResendActivation) === null || _e === void 0 ? void 0 : _e.unsubscribe();
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';

    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({
        next: user => {
          if (user) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.initForm();
          }
        }
      });
    }
  }

  get G_CAPTCHA_SITE_KEY() {
    return _constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.gCaptchaSiteKey;
  }

  get ENV() {
    return _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment;
  }

  get registerFormVal() {
    return this.fg.controls;
  }

  initForm() {
    this.fg = this.fb.group({
      username: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern('^[a-z0-9]+$')]],
      name: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern('^[a-zA-Z. ]+$')]],
      email: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.email, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.regexEmail)]],
      password: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.minLength(8), _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.regexEnglishKeyboardKeys)]],
      agree_tatib: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required]],
      agree_pp: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required]],
      'g-recaptcha-response': [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.regexEnglishKeyboardKeys)]]
    });
  }

  onClickedSubmit() {
    this.bs.busy();
    this.submitted = true;
    this.registerInfo = 'Harap Menunggu ...';
    this.usernameUsed = null;
    this.emailUsed = null;
    this.gs.log('[REGISTER_FORM_REQUEST]', this.fg.value);

    if (this.fg.invalid) {
      this.registerInfo = 'Periksa Dan Isi Kembali Data!';
      this.submitted = false;
      this.bs.idle();
      return;
    }

    if (this.fg.valid) {
      this.submitted = true;
      this.subsRegister = this.as.register({
        username: this.fg.value.username,
        name: this.fg.value.name,
        email: this.fg.value.email,
        password: this.cs.hashPassword(this.fg.value.password),
        agree_tatib: this.fg.value.agree_tatib,
        agree_pp: this.fg.value.agree_pp,
        'g-recaptcha-response': this.fg.value['g-recaptcha-response']
      }).subscribe({
        next: res => {
          this.gs.log('[REGISTER_FORM_SUCCESS]', res);
          this.bs.idle();
          this.submitted = false;
          this.captchaRef.reset();
          this.registerInfo = res.info;
          this.activationDialog(res);
        },
        error: err => {
          var _a;

          this.gs.log('[REGISTER_FORM_ERROR]', err, 'error');
          this.bs.idle();
          this.submitted = false;
          this.captchaRef.reset();
          this.registerInfo = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
          this.usernameUsed = err.result.username;
          this.emailUsed = err.result.email;
        }
      });
    }
  }

  activationDialog(res) {
    this.subsDialog = this.ds.openInfoDialog({
      data: {
        title: res.result.title,
        htmlMessage: res.result.message,
        confirmText: 'Kirim Ulang Email',
        infoText: res.result.id
      }
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INFO_DIALOG_CLOSED]', re);

        if (re === true) {
          this.bs.busy();
          this.subsResendActivation = this.as.resendActivation(res.result.id).subscribe({
            next: success => {
              this.gs.log('[RESEND_ACTIVATION_SUCCESS]', success);
              this.bs.idle();
              this.activationDialog(success);
            },
            error: error => {
              this.gs.log('[RESEND_ACTIVATION_ERROR]', error, 'error');
              this.bs.idle();
            }
          });
        }

        this.subsDialog.unsubscribe();
      }
    });
  }

  captcha(captchaResponse, captchaRef) {
    this.gs.log(`[GOOGLE_CAPTCHA] ${captchaResponse}`);

    if (captchaResponse) {
      this.captchaRef = captchaRef;
      this.fg.controls['g-recaptcha-response'].patchValue(captchaResponse);
    } else {
      if (this.fg.value['g-recaptcha-response']) {
        this.fg.controls['g-recaptcha-response'].patchValue(null);
      }
    }
  }

  openAturanTatib() {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.fg.value.agree_tatib) {
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
        _this.subsDialog = (yield _this.ds.fetchInformationRegisterMode(defaultData, true)).afterClosed().subscribe({
          next: re => {
            _this.gs.log('[ATURAN_TATA_TERTIB_DIALOG_CLOSED]', re);

            _this.fg.controls['agree_tatib'].patchValue(re);

            _this.subsDialog.unsubscribe();
          }
        });
      }
    })();
  }

  openPrivacyPolicy() {
    var _this2 = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.fg.value.agree_pp) {
        const defaultData = {
          id: 'PRIVACY-POLICY',
          data: {
            title: 'Kebijakan Privasi',
            htmlMessage: 'Gagal Memuat Aturan Dan Tata Tertib Komunitas',
            confirmText: 'Ok, Saya Mengerti!',
            cancelText: null
          },
          disableClose: false,
          maxWidth: _this2.ds.maxWidth
        };
        _this2.subsDialog = (yield _this2.ds.fetchInformationRegisterMode(defaultData, true)).afterClosed().subscribe({
          next: re => {
            _this2.gs.log('[PRIVACY_POLICY_DIALOG_CLOSED]', re);

            _this2.fg.controls['agree_pp'].patchValue(re);

            _this2.subsDialog.unsubscribe();
          }
        });
      }
    })();
  }

}

RegisterComponent.ɵfac = function RegisterComponent_Factory(t) {
  return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_4__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_5__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_6__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_crypto_service__WEBPACK_IMPORTED_MODULE_7__.CryptoService));
};

RegisterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: RegisterComponent,
  selectors: [["app-register"]],
  decls: 1,
  vars: 1,
  consts: [["class", "container-fluid align-items-center w-100 h-100", "style", "background-size: cover; background-repeat: repeat; background-position: center; transform: rotateY(180deg);", 4, "ngIf"], [1, "container-fluid", "align-items-center", "w-100", "h-100", 2, "background-size", "cover", "background-repeat", "repeat", "background-position", "center", "transform", "rotateY(180deg)"], [1, "row", "align-items-center", "h-100", "m-0", 2, "transform", "rotateY(180deg)"], [1, "col-12", "col-md-10", "m-auto", "py-3"], [1, "row", "rgb-border", "rounded", "bg-bifeldy"], [1, "col-lg-7", "col-md-9", "me-auto", "p-0"], [1, "card", "bg-transparent", "border-0"], [1, "card-body"], ["class", "m-2", 3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "col-lg-5", "col-md-3", "ms-auto", "p-0", 2, "transform", "rotateY(180deg)", 3, "ngStyle"], [1, "m-2", 3, "formGroup", "ngSubmit"], [1, "text-center", "mb-4"], [1, "mb-4", 2, "max-width", "128px", 3, "src"], [1, "h3", "mb-3", "font-weight-normal"], [1, "text-warning"], [1, "form-group", "row", "py-2"], ["for", "username", 1, "col-md-4", "col-form-label", "text-md-end"], [1, "col-md-8"], ["type", "text", "id", "username", "placeholder", "Username Minimal 8 Huruf", "required", "", "formControlName", "username", "autocomplete", "username"], ["role", "alert", 1, "invalid-feedback"], [4, "ngIf"], [2, "font-size", "80%", "color", "#dc3545"], ["for", "name", 1, "col-md-4", "col-form-label", "text-md-end"], ["type", "text", "id", "name", "placeholder", "Nama Lengkap", "required", "", "formControlName", "name", "autocomplete", "name"], ["for", "email", 1, "col-md-4", "col-form-label", "text-md-end"], ["type", "email", "id", "email", "placeholder", "Alamat E-Mail", "required", "", "formControlName", "email", "autocomplete", "email"], ["for", "password", 1, "col-md-4", "col-form-label", "text-md-end"], ["type", "password", "id", "password", "placeholder", "Password Minimal 8 Huruf", "required", "", "formControlName", "password", "autocomplete", "current-password, new-password"], [1, "col", "offset-md-4"], [1, "form-check"], ["id", "agree_tatib", "type", "checkbox", "formControlName", "agree_tatib", 1, "form-check-input", 3, "change"], ["for", "agree_tatib", 1, "form-check-label", 2, "padding-top", "0.125rem !important"], [1, "text-warning", 2, "cursor", "pointer"], ["id", "agree_pp", "type", "checkbox", "formControlName", "agree_pp", 1, "form-check-input", 3, "change"], ["for", "agree_pp", 1, "form-check-label", 2, "padding-top", "0.125rem !important"], ["formControlName", "g-recaptcha-response", 3, "siteKey", "resolved"], ["captchaRef", ""], [1, "form-group", "row", "mb-0", "py-2"], [1, "col-md-8", "offset-md-4"], [1, "row", "gy-3"], [1, "col-lg-6", "col-12"], ["type", "submit", "mat-flat-button", "", "color", "primary", 1, "w-100", 3, "disabled"], [1, "ms-1"], ["mat-stroked-button", "", "color", "accent", "routerLink", "/login", 1, "w-100", 3, "disabled"]],
  template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, RegisterComponent_div_0_Template, 9, 4, "div", 0);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.fg);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.CheckboxControlValueAccessor, ng_recaptcha__WEBPACK_IMPORTED_MODULE_12__.RecaptchaComponent, ng_recaptcha__WEBPACK_IMPORTED_MODULE_12__.RecaptchaValueAccessorDirective, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__.MatIcon, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgStyle],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWdpc3Rlci5jb21wb25lbnQuY3NzIn0= */"]
});

/***/ }),

/***/ 84992:
/*!****************************************************!*\
  !*** ./src/app/_pages/register/register.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterModule": () => (/* binding */ RegisterModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-recaptcha */ 53109);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.component */ 30300);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);








const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _register_component__WEBPACK_IMPORTED_MODULE_1__.RegisterComponent
    }
];
class RegisterModule {
}
RegisterModule.ɵfac = function RegisterModule_Factory(t) { return new (t || RegisterModule)(); };
RegisterModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: RegisterModule });
RegisterModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes),
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
            ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaModule,
            ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaFormsModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](RegisterModule, { declarations: [_register_component__WEBPACK_IMPORTED_MODULE_1__.RegisterComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
        ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaModule,
        ng_recaptcha__WEBPACK_IMPORTED_MODULE_6__.RecaptchaFormsModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app__pages_register_register_module_ts.js.map