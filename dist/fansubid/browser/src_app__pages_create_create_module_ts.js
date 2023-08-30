"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_create_create_module_ts"],{

/***/ 62331:
/*!************************************************************************!*\
  !*** ./src/app/_pages/create/berkas-create/berkas-create.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BerkasCreateComponent": () => (/* binding */ BerkasCreateComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 54363);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs/operators */ 71989);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs/operators */ 98977);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! rxjs/operators */ 19337);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! rxjs/operators */ 32673);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! rxjs/operators */ 32313);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! rxjs/operators */ 8504);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../constants */ 26271);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../models/req-res.model */ 14249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_anime_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/anime.service */ 80519);
/* harmony import */ var _shared_services_dorama_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/dorama.service */ 18439);
/* harmony import */ var _shared_services_project_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/project.service */ 65679);
/* harmony import */ var _shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/services/fansub.service */ 76781);
/* harmony import */ var _shared_services_berkas_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/services/berkas.service */ 8987);
/* harmony import */ var _shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/services/imgbb.service */ 67902);
/* harmony import */ var _shared_services_toast_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../_shared/services/toast.service */ 96925);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var ngx_uploadx__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ngx-uploadx */ 8197);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/slide-toggle */ 6623);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/autocomplete */ 43188);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/progress-bar */ 60833);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/divider */ 19975);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var _shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../_shared/pipes/bytes.pipe */ 23626);







































function BerkasCreateComponent_form_4_div_12_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"]("Ukuran Upload Melebihi Batas ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](2, 1, ctx_r21.imageLimitExceeded), " !");
  }
}

function BerkasCreateComponent_form_4_div_12_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](ctx_r22.imageErrorText);
  }
}

function BerkasCreateComponent_form_4_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "img", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "mat-form-field", 46)(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4, "Gambar Untuk Embed SEO");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](5, "ngx-mat-file-input", 47, 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("change", function BerkasCreateComponent_form_4_div_12_Template_ngx_mat_file_input_change_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r24);

      const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](6);

      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return ctx_r23.uploadImage($event, _r20);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](7, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](8, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](9, "mat-error", 49)(10, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](11, BerkasCreateComponent_form_4_div_12_div_11_Template, 3, 3, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](12, BerkasCreateComponent_form_4_div_12_div_12_Template, 2, 1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
  }

  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("src", ctx_r1.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx_r1.fg.value.image)("accept", "image/gif, image/jpeg, image/jpg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r1.imageLimitExceeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r1.imageErrorText);
  }
}

function BerkasCreateComponent_form_4_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 24)(1, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_div_13_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return ctx_r25.submitImage();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "mat-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3, "add_photo_alternate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4, " Unggah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx_r2.submitted);
  }
}

function BerkasCreateComponent_form_4_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 15)(1, "mat-slide-toggle", 50)(2, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3, "Private");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4, " Akses Hanya Dengan URL ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
}

function BerkasCreateComponent_form_4_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 15)(1, "mat-slide-toggle", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](2, " Permanent Storage ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
}

function BerkasCreateComponent_form_4_mat_option_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-option", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const p_r27 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", p_r27.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](p_r27.name);
  }
}

function BerkasCreateComponent_form_4_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "Jenis Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "Jenis Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_mat_form_field_27_mat_option_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-option", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "mat-progress-bar", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_mat_form_field_27_ng_container_9_mat_option_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-option", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_mat_form_field_27_ng_container_9_mat_option_1_Template_mat_option_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r37);
      const a_r35 = restoredCtx.$implicit;
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](4);
      return ctx_r36.filterAnimeSelected(a_r35);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "img", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const a_r35 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", a_r35.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpropertyInterpolate"]("src", a_r35.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate3"]("", a_r35.id, " :: ", a_r35.media_type == null ? null : a_r35.media_type.toUpperCase(), " :: ", a_r35.title, "");
  }
}

function BerkasCreateComponent_form_4_mat_form_field_27_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](1, BerkasCreateComponent_form_4_mat_form_field_27_ng_container_9_mat_option_1_Template, 4, 5, "mat-option", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngForOf", ctx_r30.filteredAnime);
  }
}

function BerkasCreateComponent_form_4_mat_form_field_27_small_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "small", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](ctx_r31.fg.get("anime_name").value);
  }
}

function BerkasCreateComponent_form_4_mat_form_field_27_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "ID Anime Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_mat_form_field_27_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "ID Anime Hanya Boleh Angka");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_mat_form_field_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-form-field", 53)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](2, "Anime Terkait");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "input", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("keyup", function BerkasCreateComponent_form_4_mat_form_field_27_Template_input_keyup_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r39);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return ctx_r38.resetSelectedAnime();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](4, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](5, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "mat-autocomplete", null, 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](8, BerkasCreateComponent_form_4_mat_form_field_27_mat_option_8_Template, 2, 0, "mat-option", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](9, BerkasCreateComponent_form_4_mat_form_field_27_ng_container_9_Template, 2, 1, "ng-container", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](10, BerkasCreateComponent_form_4_mat_form_field_27_small_10_Template, 2, 1, "small", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](11, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](12, BerkasCreateComponent_form_4_mat_form_field_27_div_12_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](13, BerkasCreateComponent_form_4_mat_form_field_27_div_13_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](7);

    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("matAutocomplete", _r28);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r8.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", !ctx_r8.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r8.fg.get("anime_name").value);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r8.fg.get("anime_id").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r8.fg.get("anime_id").hasError("pattern"));
  }
}

function BerkasCreateComponent_form_4_mat_form_field_28_mat_option_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-option", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "mat-progress-bar", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_mat_form_field_28_ng_container_9_mat_option_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-option", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_mat_form_field_28_ng_container_9_mat_option_1_Template_mat_option_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r49);
      const d_r47 = restoredCtx.$implicit;
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](4);
      return ctx_r48.filterDoramaSelected(d_r47);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "img", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const d_r47 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", d_r47.mdl_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpropertyInterpolate"]("src", d_r47.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate2"]("", d_r47.mdl_id, " :: ", d_r47.title, "");
  }
}

function BerkasCreateComponent_form_4_mat_form_field_28_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](1, BerkasCreateComponent_form_4_mat_form_field_28_ng_container_9_mat_option_1_Template, 4, 4, "mat-option", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngForOf", ctx_r42.filteredDorama);
  }
}

function BerkasCreateComponent_form_4_mat_form_field_28_small_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "small", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](ctx_r43.fg.get("dorama_name").value);
  }
}

function BerkasCreateComponent_form_4_mat_form_field_28_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "ID Dorama Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_mat_form_field_28_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "ID Dorama Hanya Boleh Angka");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_mat_form_field_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r51 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-form-field", 53)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](2, "Dorama Terkait");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "input", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("keyup", function BerkasCreateComponent_form_4_mat_form_field_28_Template_input_keyup_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r51);
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return ctx_r50.resetSelectedDorama();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](4, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](5, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "mat-autocomplete", null, 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](8, BerkasCreateComponent_form_4_mat_form_field_28_mat_option_8_Template, 2, 0, "mat-option", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](9, BerkasCreateComponent_form_4_mat_form_field_28_ng_container_9_Template, 2, 1, "ng-container", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](10, BerkasCreateComponent_form_4_mat_form_field_28_small_10_Template, 2, 1, "small", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](11, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](12, BerkasCreateComponent_form_4_mat_form_field_28_div_12_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](13, BerkasCreateComponent_form_4_mat_form_field_28_div_13_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](7);

    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("matAutocomplete", _r40);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r9.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", !ctx_r9.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r9.fg.get("dorama_name").value);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r9.fg.get("dorama_id").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r9.fg.get("dorama_id").hasError("pattern"));
  }
}

function BerkasCreateComponent_form_4_div_32_mat_icon_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_div_32_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_div_32_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r63);
      const i_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]().index;
      const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return ctx_r61.removeFansub(i_r53);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
}

function BerkasCreateComponent_form_4_div_32_mat_option_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-option", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "mat-progress-bar", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_div_32_ng_container_11_mat_option_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r67 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-option", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_div_32_ng_container_11_mat_option_1_Template_mat_option_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r67);
      const f_r65 = restoredCtx.$implicit;
      const i_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2).index;
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return ctx_r66.filterFansubSelected(f_r65, i_r53);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "img", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const f_r65 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", f_r65.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpropertyInterpolate"]("src", f_r65.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate2"]("", f_r65.slug, " :: ", f_r65.name, "");
  }
}

function BerkasCreateComponent_form_4_div_32_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](1, BerkasCreateComponent_form_4_div_32_ng_container_11_mat_option_1_Template, 4, 4, "mat-option", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngForOf", ctx_r58.filteredFansub);
  }
}

function BerkasCreateComponent_form_4_div_32_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "ID Fansub Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_div_32_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "ID Fansub Hanya Boleh Angka");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div")(1, "div", 66)(2, "mat-form-field", 67)(3, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4, "Fansub Terkait");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](5, "input", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("keyup", function BerkasCreateComponent_form_4_div_32_Template_input_keyup_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r70);
      const i_r53 = restoredCtx.index;
      const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return ctx_r69.resetSelectedFansub(i_r53);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](6, BerkasCreateComponent_form_4_div_32_mat_icon_6_Template, 2, 0, "mat-icon", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](7, BerkasCreateComponent_form_4_div_32_button_7_Template, 3, 0, "button", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](8, "mat-autocomplete", null, 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](10, BerkasCreateComponent_form_4_div_32_mat_option_10_Template, 2, 0, "mat-option", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](11, BerkasCreateComponent_form_4_div_32_ng_container_11_Template, 2, 1, "ng-container", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](12, "small", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](14, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](15, BerkasCreateComponent_form_4_div_32_div_15_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](16, BerkasCreateComponent_form_4_div_32_div_16_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()();
  }

  if (rf & 2) {
    const fs_r52 = ctx.$implicit;
    const i_r53 = ctx.index;

    const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](9);

    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("formGroupName", i_r53);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("matAutocomplete", _r56);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", fs_r52.get("fansub_id").value || i_r53 === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", !fs_r52.get("fansub_id").value && i_r53 > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r10.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", !ctx_r10.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](fs_r52.get("fansub_name").value);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", fs_r52.get("fansub_id").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", fs_r52.get("fansub_id").hasError("pattern"));
  }
}

function BerkasCreateComponent_form_4_div_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "Nama Berkas Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_div_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "Nama Berkas Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_angular_editor_52_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](0, "angular-editor", 74);
  }

  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("config", ctx_r13.GS.angularEditorConfig);
  }
}

function BerkasCreateComponent_form_4_div_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](0, "div");
  }
}

function BerkasCreateComponent_form_4_ng_template_57_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"]("Ukuran Upload Melebihi Batas ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](2, 1, ctx_r72.attachmentLimitExceeded), " !");
  }
}

function BerkasCreateComponent_form_4_ng_template_57_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](ctx_r73.attachmentErrorText);
  }
}

function BerkasCreateComponent_form_4_ng_template_57_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r77 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 37)(1, "div", 25)(2, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](4, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](5, "br")(6, "mat-progress-bar", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](7, "div", 84)(8, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_ng_template_57_div_24_Template_button_click_8_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r77);
      const item_r75 = restoredCtx.$implicit;
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
      return ctx_r76.submitAttachment(item_r75);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](9, "mat-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](10, "attachment");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](11, " Unggah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
  }

  if (rf & 2) {
    const item_r75 = ctx.$implicit;
    const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate3"](" ", item_r75.status, " :: ", item_r75.progress, "% @ ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](4, 6, item_r75.speed), "/s ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("mode", "determinate")("value", item_r75.progress);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx_r74.submitted || item_r75.status === "complete" || item_r75.status === "uploading");
  }
}

function BerkasCreateComponent_form_4_ng_template_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r79 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 10)(1, "div", 75)(2, "small", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3, " * ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](4, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](5, "Resume-able Upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](6, " (Tidak wajib, jika sudah ada URL eksternal, misal alamat webmu gdrive mediafire mega dan lain sebagainya). Mohon ditunggu dan jangan di tinggal, berkas lampiran akan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](7, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](8, "expired");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](10, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](11, "upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](12, ". Setelah berhasil membuat berkas, lampiran tidak akan bisa di modifikasi. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](13, "mat-form-field", 77)(14, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](15, "Upload Lampiran Berkas -- DDL");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](16, "ngx-mat-file-input", 78, 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("change", function BerkasCreateComponent_form_4_ng_template_57_Template_ngx_mat_file_input_change_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r79);

      const _r71 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](17);

      const ctx_r78 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return ctx_r78.uploadAttachment($event, _r71);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](18, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](19, "attach_file");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](20, "mat-error", 80)(21, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](22, BerkasCreateComponent_form_4_ng_template_57_div_22_Template, 3, 3, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](23, BerkasCreateComponent_form_4_ng_template_57_div_23_Template, 2, 1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](24, BerkasCreateComponent_form_4_ng_template_57_div_24_Template, 12, 8, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](25, "async");
  }

  if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" apabila tidak disimpan dalam ", ctx_r16.CONSTANTS.timeoutDeleteTempAttachmentTime / 60 / 1000, " menit setelah berhasil ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx_r16.attachmentSelected !== null)("accept", ctx_r16.fileTypeAttachmentAllowed);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r16.attachmentLimitExceeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r16.attachmentErrorText);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](25, 7, ctx_r16.uploads$));
  }
}

function BerkasCreateComponent_form_4_ng_template_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r81 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "button", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_ng_template_59_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r81);
      const ctx_r80 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return ctx_r80.verify();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "mat-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](2, "enhanced_encryption");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](3, " Verifikasi Akun Untuk Upload DDL! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_ng_container_65_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 75)(1, "small", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](2, "* Gunakan tombol (X) untuk menghapus URL Eksternal jika ingin hanya menggunakan lampiran ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4, "upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](5, " DDL saja");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
}

function BerkasCreateComponent_form_4_ng_container_65_mat_icon_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "web");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_ng_container_65_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r95 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_ng_container_65_button_8_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r95);
      const i_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]().index;
      const ctx_r93 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return ctx_r93.removeDownloadLink(i_r83);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
}

function BerkasCreateComponent_form_4_ng_container_65_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "Web Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_ng_container_65_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "Web Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_ng_container_65_mat_icon_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "link");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_ng_container_65_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r98 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_ng_container_65_button_17_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r98);
      const i_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]().index;
      const ctx_r96 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return ctx_r96.removeDownloadLink(i_r83);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
}

function BerkasCreateComponent_form_4_ng_container_65_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "Tautan Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_ng_container_65_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](1, "Tautan Link Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
  }
}

function BerkasCreateComponent_form_4_ng_container_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](2, BerkasCreateComponent_form_4_ng_container_65_div_2_Template, 6, 0, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "mat-form-field", 88)(4, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](5, "Nama Website");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](6, "input", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](7, BerkasCreateComponent_form_4_ng_container_65_mat_icon_7_Template, 2, 0, "mat-icon", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](8, BerkasCreateComponent_form_4_ng_container_65_button_8_Template, 3, 0, "button", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](9, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](10, BerkasCreateComponent_form_4_ng_container_65_div_10_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](11, BerkasCreateComponent_form_4_ng_container_65_div_11_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](12, "mat-form-field", 90)(13, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](14, "Tautan Link");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](15, "input", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](16, BerkasCreateComponent_form_4_ng_container_65_mat_icon_16_Template, 2, 0, "mat-icon", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](17, BerkasCreateComponent_form_4_ng_container_65_button_17_Template, 3, 0, "button", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](18, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](19, BerkasCreateComponent_form_4_ng_container_65_div_19_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](20, BerkasCreateComponent_form_4_ng_container_65_div_20_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const dl_r82 = ctx.$implicit;
    const i_r83 = ctx.index;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("formGroupName", i_r83);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", (ctx_r19.AS.currentUserSubject == null ? null : ctx_r19.AS.currentUserSubject.value == null ? null : ctx_r19.AS.currentUserSubject.value.verified) && i_r83 === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", dl_r82.get("name").value || i_r83 === 0 && !(ctx_r19.AS.currentUserSubject == null ? null : ctx_r19.AS.currentUserSubject.value == null ? null : ctx_r19.AS.currentUserSubject.value.verified));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", !dl_r82.get("name").value && (i_r83 > 0 || (ctx_r19.AS.currentUserSubject == null ? null : ctx_r19.AS.currentUserSubject.value == null ? null : ctx_r19.AS.currentUserSubject.value.verified)));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", dl_r82.get("name").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", dl_r82.get("name").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", dl_r82.get("url").value || i_r83 === 0 && !(ctx_r19.AS.currentUserSubject == null ? null : ctx_r19.AS.currentUserSubject.value == null ? null : ctx_r19.AS.currentUserSubject.value.verified));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", !dl_r82.get("url").value && (i_r83 > 0 || (ctx_r19.AS.currentUserSubject == null ? null : ctx_r19.AS.currentUserSubject.value == null ? null : ctx_r19.AS.currentUserSubject.value.verified)));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", dl_r82.get("url").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", dl_r82.get("url").hasError("pattern"));
  }
}

function BerkasCreateComponent_form_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r100 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "form", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("submit", function BerkasCreateComponent_form_4_Template_form_submit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r100);
      const ctx_r99 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return ctx_r99.onSubmit();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "div", 5)(2, "div", 6)(3, "h2", 7)(4, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_Template_span_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r100);
      const ctx_r101 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return ctx_r101.toggleDetailMode();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "b", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](7, "Tambah Berkas Baru");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](8, "div", 2)(9, "div", 10)(10, "div", 11)(11, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](12, BerkasCreateComponent_form_4_div_12_Template, 13, 6, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](13, BerkasCreateComponent_form_4_div_13_Template, 5, 1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](14, BerkasCreateComponent_form_4_div_14_Template, 5, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](15, "div", 15)(16, "mat-slide-toggle", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](17, " R-18+ Konten Eksplisit ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](18, BerkasCreateComponent_form_4_div_18_Template, 3, 0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](19, "mat-form-field", 17)(20, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](21, "Jenis Proyek");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](22, "mat-select", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](23, BerkasCreateComponent_form_4_mat_option_23_Template, 2, 2, "mat-option", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](24, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](25, BerkasCreateComponent_form_4_div_25_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](26, BerkasCreateComponent_form_4_div_26_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](27, BerkasCreateComponent_form_4_mat_form_field_27_Template, 14, 7, "mat-form-field", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](28, BerkasCreateComponent_form_4_mat_form_field_28_Template, 14, 7, "mat-form-field", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](29, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](30, "mat-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](31, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](32, BerkasCreateComponent_form_4_div_32_Template, 17, 10, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](33, "div", 24)(34, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](35, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](36, "div", 25)(37, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_Template_button_click_37_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r100);
      const ctx_r102 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return ctx_r102.addFansub();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](38, "mat-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](39, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](40, " Tambah Fansub ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](41, "div", 28)(42, "div", 10)(43, "mat-form-field", 29)(44, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](45, "Nama Berkas");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](46, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](47, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](48, "wysiwyg");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](49, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](50, BerkasCreateComponent_form_4_div_50_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](51, BerkasCreateComponent_form_4_div_51_Template, 2, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](52, BerkasCreateComponent_form_4_angular_editor_52_Template, 1, 1, "angular-editor", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](53, "div", 10)(54, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](55, "mat-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](56, BerkasCreateComponent_form_4_div_56_Template, 1, 0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](57, BerkasCreateComponent_form_4_ng_template_57_Template, 26, 9, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](59, BerkasCreateComponent_form_4_ng_template_59_Template, 4, 0, "ng-template", null, 35, _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](61, "div", 10)(62, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](63, "mat-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerStart"](64, 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](65, BerkasCreateComponent_form_4_ng_container_65_Template, 21, 12, "ng-container", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](66, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](67, "div", 25)(68, "div", 25)(69, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](70, "div", 25)(71, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function BerkasCreateComponent_form_4_Template_button_click_71_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r100);
      const ctx_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return ctx_r103.addDownloadLink();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](72, "mat-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](73, "add");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](74, " Tambah URL Eksternal ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](75, "div", 10)(76, "div", 38)(77, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](78, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](79, "div", 41)(80, "a", 42)(81, "mat-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](82, "undo");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](83, " Batal ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](84, "div", 41)(85, "button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](86, " Simpan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](87, "mat-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](88, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()()()()()();
  }

  if (rf & 2) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](58);

    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵreference"](60);

    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("formGroup", ctx_r0.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", ctx_r0.detailMode ? "Sederhana" : "Lengkap", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.detailMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.image && !ctx_r0.fg.value.image && ctx_r0.detailMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.AS.currentUserSubject == null ? null : ctx_r0.AS.currentUserSubject.value == null ? null : ctx_r0.AS.currentUserSubject.value.verified);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.permanentStorage && ctx_r0.isAttachmentUploaded);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngForOf", ctx_r0.projectList);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("projectType_id").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("projectType_id").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.berkasType.toLowerCase().includes("anime"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.berkasType.toLowerCase().includes("dorama"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngForOf", ctx_r0.getFansubControl.controls);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx_r0.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("name").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("name").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.detailMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r0.AS.currentUserSubject == null ? null : ctx_r0.AS.currentUserSubject.value == null ? null : ctx_r0.AS.currentUserSubject.value.verified)("ngIfThen", _r15)("ngIfElse", _r17);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngForOf", ctx_r0.getDownloadUrlControl.controls);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx_r0.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx_r0.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx_r0.submitted || ctx_r0.fg.invalid || (ctx_r0.attachmentSelected == null ? null : ctx_r0.attachmentSelected.status) === "uploading");
  }
}

class BerkasCreateComponent {
  constructor(router, fb, bs, pi, anime, dorama, project, fansub, berkas, imgbb, toast, gs, as, uploadService, ds) {
    this.router = router;
    this.fb = fb;
    this.bs = bs;
    this.pi = pi;
    this.anime = anime;
    this.dorama = dorama;
    this.project = project;
    this.fansub = fansub;
    this.berkas = berkas;
    this.imgbb = imgbb;
    this.toast = toast;
    this.gs = gs;
    this.as = as;
    this.uploadService = uploadService;
    this.ds = ds;
    this.detailMode = false;
    this.submitted = false;
    this.projectList = [];
    this.image = null;
    this.imageErrorText = null;
    this.imageLimitExceeded = null;
    this.image_url = '/assets/img/form/no-image.png';
    this.filteredAnime = [];
    this.filteredDorama = [];
    this.filteredFansub = [];
    this.isLoading = false;
    this.animeCheckOrAddResponse = null;
    this.doramaCheckOrAddResponse = null;
    this.attachmentSelected = null;
    this.attachmentErrorText = null;
    this.attachmentLimitExceeded = null;
    this.uploadToast = null;
    this.timerTimeout = null;
    this.gambar = null;
    this.ddl = null;
    this.subsProject = null;
    this.subsFansub = null;
    this.subsAnimeDetail = null;
    this.subsDoramaDetail = null;
    this.subsProjectDetail = null;
    this.subsFansubDetail = [];
    this.subsAnimeNew = null;
    this.subsDoramaNew = null;
    this.subsImgbb = null;
    this.subsBerkasCreate = null;
    this.subsUpload = null;
    this.berkasType = '';
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get CONSTANTS() {
    return _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS;
  }

  get AS() {
    return this.as;
  }

  get GS() {
    return this.gs;
  }

  get fileTypeAttachmentAllowed() {
    return _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileTypeAttachmentAllowed.join(', ');
  }

  get permanentStorage() {
    var _a, _b;

    const role = (_b = (_a = this.AS.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.role;
    return role === _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.ADMIN || role === _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.MODERATOR;
  }

  get isAttachmentUploaded() {
    return this.fg.controls['attachment_id'].value !== null;
  }

  ngOnInit() {
    this.pi.updatePageMetaData(`Berkas - Buat Baru`, `Halaman Membuat Berkas Baru`, `Create Berkas`);

    if (this.gs.isBrowser) {
      this.loadProjectList();
      this.initForm();
      this.uploads$ = this.uploadService.connect();
      this.subsUpload = this.uploadService.events.subscribe({
        next: state => {
          this.gs.log('[UPLOAD_EVENTS]', state);

          if (state.status === 'uploading' || state.status === 'complete') {
            this.attachmentSelected = state;
          }

          if (state.status === 'complete') {
            this.gs.log('[UPLOAD_COMPLETED]', state.response);
            this.fg.controls['attachment_id'].patchValue(state.response.result.id);
            this.uploadToast = this.toast.warning(`Segera Kirim Data Berkas!`, `Lampiran Akan Dihapus ...`, {
              closeButton: false,
              timeOut: _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.timeoutDeleteTempAttachmentTime,
              disableTimeOut: 'extendedTimeOut',
              tapToDismiss: false,
              progressAnimation: 'decreasing'
            }, true);
            this.timerTimeout = setTimeout(() => {
              this.gs.log('[UPLOAD_TIMEOUT]', _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.timeoutDeleteTempAttachmentTime);
              this.failOrCancelUpload({
                info: 'Expired, Silahkan Upload Ulang!'
              });
            }, _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.timeoutDeleteTempAttachmentTime);
          } else if (state.status === 'error') {
            this.gs.log('[UPLOAD_ERROR]', state.response, 'error');
            this.failOrCancelUpload(state.response);
          }
        },
        error: err => {
          this.gs.log('[UPLOAD_ERROR]', err, 'error');
          this.failOrCancelUpload(err);
        }
      });
    }
  }

  ngOnDestroy() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

    if (this.uploadToast) {
      this.toast.remove(this.uploadToast.toastId);
    }

    if (this.timerTimeout) {
      clearTimeout(this.timerTimeout);
      this.timerTimeout = null;
    }

    (_a = this.subsProject) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsFansub) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsAnimeDetail) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    (_d = this.subsDoramaDetail) === null || _d === void 0 ? void 0 : _d.unsubscribe();
    (_e = this.subsProjectDetail) === null || _e === void 0 ? void 0 : _e.unsubscribe();

    for (const sFD of this.subsFansubDetail) {
      sFD === null || sFD === void 0 ? void 0 : sFD.unsubscribe();
    }

    (_f = this.subsAnimeNew) === null || _f === void 0 ? void 0 : _f.unsubscribe();
    (_g = this.subsDoramaNew) === null || _g === void 0 ? void 0 : _g.unsubscribe();
    (_h = this.subsImgbb) === null || _h === void 0 ? void 0 : _h.unsubscribe();
    (_j = this.subsBerkasCreate) === null || _j === void 0 ? void 0 : _j.unsubscribe();
    this.uploadService.disconnect();
    (_k = this.subsUpload) === null || _k === void 0 ? void 0 : _k.unsubscribe();
  }

  canDeactivate() {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const closeDialog = yield _this.ds.leavePageDialog();
      return yield (0,rxjs__WEBPACK_IMPORTED_MODULE_18__.firstValueFrom)(closeDialog);
    })();
  }

  toggleDetailMode() {
    this.detailMode = !this.detailMode;
  }

  loadProjectList() {
    this.bs.busy();
    this.subsProject = this.project.getProject().subscribe({
      next: res => {
        this.gs.log('[PROJECT_LOAD_SUCCESS]', res);
        this.projectList = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[PROJECT_LOAD_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  hasRequiredField(abstractControl, controlName) {
    return abstractControl.get(controlName).hasValidator(_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required);
  }

  initForm() {
    this.fg = this.fb.group({
      name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      description: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      projectType_id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      anime_id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([])],
      anime_name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([])],
      dorama_id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([])],
      dorama_name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([])],
      fansub_list: this.fb.array([this.createFansub()]),
      image: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])],
      attachment_id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      download_url: this.fb.array([this.createDownloadLink()]),
      private: [false, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required])],
      r18: [false, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required])],
      permanent_storage: [false, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required])]
    });
    this.subsAnimeDetail = this.fg.get('anime_id').valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.debounceTime)(500), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_22__.tap)(() => this.isLoading = true), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.switchMap)(searchQuery => this.anime.searchAnime(searchQuery).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.finalize)(() => this.isLoading = false))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_25__.retry)(-1)).subscribe({
      next: res => {
        this.gs.log('[BERKAS_CREATE_SEARCH_ANIME_RESULT_SUCCESS]', res);
        this.filteredAnime = res.results;
      },
      error: err => {
        this.gs.log('[BERKAS_CREATE_SEARCH_ANIME_RESULT_ERROR]', err, 'error');
      }
    });
    this.subsDoramaDetail = this.fg.get('dorama_id').valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.debounceTime)(500), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_22__.tap)(() => this.isLoading = true), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.switchMap)(searchQuery => this.dorama.searchDorama(searchQuery).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.finalize)(() => this.isLoading = false))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_25__.retry)(-1)).subscribe({
      next: res => {
        this.gs.log('[BERKAS_CREATE_SEARCH_DORAMA_RESULT_SUCCESS]', res);

        for (const r of res.results) {
          r.mdl_id = r.mdl_id.split('-')[1];
          r.image_url = r.thumb;
        }

        this.filteredDorama = res.results;
      },
      error: err => {
        this.gs.log('[BERKAS_CREATE_SEARCH_DORAMA_RESULT_ERROR]', err, 'error');
      }
    });
    this.subsProjectDetail = this.fg.get('projectType_id').valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.debounceTime)(500), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_25__.retry)(-1)).subscribe({
      next: projectId => {
        this.gs.log('[BERKAS_CREATE_PROJECT_CHANGED]', projectId);
        const selectedProject = this.projectList.find(p => p.id === projectId);
        this.fg.controls['anime_id'].patchValue(null);
        this.fg.controls['anime_name'].patchValue(null);
        this.fg.controls['dorama_id'].patchValue(null);
        this.fg.controls['dorama_name'].patchValue(null);
        this.fg.controls['anime_id'].setErrors(null);
        this.fg.controls['anime_name'].setErrors(null);
        this.fg.controls['dorama_id'].setErrors(null);
        this.fg.controls['dorama_name'].setErrors(null);
        this.fg.controls['anime_id'].clearValidators();
        this.fg.controls['anime_name'].clearValidators();
        this.fg.controls['dorama_id'].clearValidators();
        this.fg.controls['dorama_name'].clearValidators();
        this.fg.controls['anime_id'].markAsPristine();
        this.fg.controls['anime_name'].markAsPristine();
        this.fg.controls['dorama_id'].markAsPristine();
        this.fg.controls['dorama_name'].markAsPristine();
        this.fg.controls['anime_id'].markAsUntouched();
        this.fg.controls['anime_name'].markAsUntouched();
        this.fg.controls['dorama_id'].markAsUntouched();
        this.fg.controls['dorama_name'].markAsUntouched();

        if (selectedProject.name.toLowerCase().includes('anime')) {
          this.berkasType = selectedProject.name;
          this.fg.controls['anime_id'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.pattern(/^\d+$/)]);
          this.fg.controls['anime_name'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required]);
        } else if (selectedProject.name.toLowerCase().includes('dorama')) {
          this.berkasType = selectedProject.name;
          this.fg.controls['dorama_id'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.pattern(/^\d+$/)]);
          this.fg.controls['dorama_name'].setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required]);
        } else {
          this.berkasType = '';
        }

        this.fg.controls['anime_id'].updateValueAndValidity();
        this.fg.controls['anime_name'].updateValueAndValidity();
        this.fg.controls['dorama_id'].updateValueAndValidity();
        this.fg.controls['dorama_name'].updateValueAndValidity();
      }
    });
  }

  get getDownloadUrlControl() {
    return this.fg.get('download_url');
  }

  createDownloadLink() {
    return this.fb.group({
      name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      url: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])]
    });
  }

  removeDownloadLink(i) {
    this.getDownloadUrlControl.removeAt(i);
  }

  addDownloadLink() {
    this.getDownloadUrlControl.push(this.createDownloadLink());
  }

  get getFansubControl() {
    return this.fg.get('fansub_list');
  }

  createFansub() {
    const fbGroup = this.fb.group({
      fansub_id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.pattern(/^\d+$/)])],
      fansub_name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required])]
    });
    this.subsFansubDetail.push(fbGroup.get('fansub_id').valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.debounceTime)(500), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_22__.tap)(() => this.isLoading = true), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.switchMap)(searchQuery => this.fansub.searchFansub(searchQuery).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_24__.finalize)(() => this.isLoading = false))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_25__.retry)(-1)).subscribe({
      next: res => {
        this.gs.log('[BERKAS_CREATE_SEARCH_FANSUB_RESULT]', res);
        this.filteredFansub = res.results;
      }
    }));
    return fbGroup;
  }

  removeFansub(i) {
    var _a;

    this.getFansubControl.removeAt(i);
    (_a = this.subsFansubDetail[i]) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    this.subsFansubDetail.splice(i, 1);
  }

  addFansub() {
    this.getFansubControl.push(this.createFansub());
  }

  resetSelectedAnime() {
    this.fg.controls['anime_name'].patchValue(null);
  }

  resetSelectedDorama() {
    this.fg.controls['dorama_name'].patchValue(null);
  }

  resetSelectedFansub(i) {
    this.getFansubControl.controls[i].get('fansub_name').patchValue(null);
  }

  filterAnimeSelected(data) {
    var _a;

    this.gs.log('[ANIME_FILTER_CLICK]', data);
    this.submitted = true;
    this.subsAnimeNew = this.anime.addNewAnime({
      id: data.id,
      name: data.title,
      image_url: data.image_url,
      type: (_a = data.media_type) === null || _a === void 0 ? void 0 : _a.toUpperCase()
    }).subscribe({
      next: res => {
        this.gs.log('[ANIME_CHECK_ADD_SUCCESS]', res);
        this.animeCheckOrAddResponse = res.result;
        this.submitted = false;
        this.fg.controls['anime_id'].patchValue(res.result.id);
        this.fg.controls['anime_name'].patchValue(res.result.name);
      },
      error: err => {
        this.gs.log('[ANIME_CHECK_ADD_ERROR]', err, 'error');
        this.submitted = false;
        this.resetSelectedAnime();
        this.fg.controls['anime_id'].patchValue(null);
        this.fg.controls['anime_name'].patchValue(null);
      }
    });
  }

  filterDoramaSelected(data) {
    this.gs.log('[DORAMA_FILTER_CLICK]', data);
    this.submitted = true;
    this.subsDoramaNew = this.dorama.addNewDorama({
      id: parseInt(data.mdl_id, 10),
      slug: data.slug,
      name: data.title,
      image_url: data.image_url,
      type: data.type
    }).subscribe({
      next: res => {
        this.gs.log('[DORAMA_CHECK_ADD_SUCCESS]', res);
        this.doramaCheckOrAddResponse = res.result;
        this.submitted = false;
        this.fg.controls['dorama_id'].patchValue(res.result.id);
        this.fg.controls['dorama_name'].patchValue(res.result.name);
      },
      error: err => {
        this.gs.log('[DORAMA_CHECK_ADD_ERROR]', err, 'error');
        this.submitted = false;
        this.resetSelectedDorama();
        this.fg.controls['dorama_id'].patchValue(null);
        this.fg.controls['dorama_name'].patchValue(null);
      }
    });
  }

  filterFansubSelected(data, i) {
    this.gs.log('[FANSUB_FILTER_CLICK]', data);
    this.getFansubControl.controls[i].get('fansub_id').patchValue(data.id);
    this.getFansubControl.controls[i].get('fansub_name').patchValue(data.name);
  }

  uploadImage(event, gambar) {
    this.gambar = gambar;
    this.image = null;
    this.imageLimitExceeded = null;
    this.imageErrorText = null;
    this.fg.controls['image'].patchValue(null);
    const file = event.target.files[0];

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = e => {
        this.gs.log('[IMAGE_SELECTED]', e);

        if (file.size <= _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit) {
          const img = this.gs.document.createElement('img');

          img.onload = () => {
            this.image = file;
            this.image_url = reader.result.toString();
          };

          img.src = reader.result.toString();
        } else {
          this.image = null;
          this.image_url = '/assets/img/form/image-error.png';
          this.imageLimitExceeded = _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit;
          this.gambar.clear(event);
        }
      };
    } catch (error) {
      this.image = null;
      this.image_url = '/assets/img/form/no-image.png';
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
        this.submitted = false;
      },
      error: err => {
        var _a;

        this.gs.log('[IMAGE_ERROR]', err, 'error');
        this.fg.controls['image'].patchValue(null);
        this.submitted = false;
        this.imageErrorText = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
      }
    });
  }

  onSubmit() {
    var _a;

    this.bs.busy();
    this.submitted = true;

    if (this.fg.invalid || ((_a = this.attachmentSelected) === null || _a === void 0 ? void 0 : _a.status) === 'uploading') {
      this.submitted = false;
      this.bs.idle();
      return;
    }

    if (this.fg.value.attachment_id === null && this.fg.value.download_url.lenth === 0) {
      this.submitted = false;
      this.uploadToast = this.toast.warning(`Lampiran DDL / URL Eksternal!`, `Harap Mengisi Setidaknya Salah Satu ...`);
      this.bs.idle();
      return;
    }

    const fansubId = [];

    for (const fs of this.fg.value.fansub_list) {
      fansubId.push(fs.fansub_id);
    }

    this.subsBerkasCreate = this.berkas.createBerkas({
      image: this.fg.value.image,
      name: this.fg.value.name,
      description: this.fg.value.description,
      private: this.fg.value.private,
      r18: this.fg.value.r18,
      permanent_storage: this.fg.value.permanent_storage,
      projectType_id: this.fg.value.projectType_id,
      anime_id: this.fg.value.anime_id,
      dorama_id: this.fg.value.dorama_id,
      fansub_id: fansubId,
      download_url: this.fg.value.download_url,
      attachment_id: this.fg.value.attachment_id
    }).subscribe({
      next: res => {
        this.gs.log('[BERKAS_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/berkas', {
          state: {
            bypassCanDeactivate: true
          }
        });
      },
      error: err => {
        this.gs.log('[BERKAS_CREATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

  uploadAttachment(event, ddl) {
    this.ddl = ddl;
    const file = event.target.files[0];
    this.attachmentLimitExceeded = null;
    this.attachmentErrorText = null;
    this.gs.log('[ATTACHMENT_SELECTED]', file);
    this.fg.controls['attachment_id'].patchValue(null);
    this.uploadService.disconnect();

    try {
      if (file.size <= _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeAttachmentTotalLimit) {
        this.uploadService.handleFiles(file);
      } else {
        this.attachmentLimitExceeded = _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeAttachmentTotalLimit;
        this.ddl.clear(event);
      }
    } catch (error) {
      this.ddl.clear(event);
    }
  }

  submitAttachment(item) {
    const uploader = this.uploadService.state().find(x => x.uploadId === item.uploadId);

    if (uploader) {
      this.attachmentSelected = uploader;
      item.status = 'queue';
    }
  }

  failOrCancelUpload(err = null) {
    var _a, _b;

    this.attachmentSelected = null;
    this.attachmentErrorText = ((_a = err === null || err === void 0 ? void 0 : err.result) === null || _a === void 0 ? void 0 : _a.message) || (err === null || err === void 0 ? void 0 : err.info) || ((_b = err === null || err === void 0 ? void 0 : err.error) === null || _b === void 0 ? void 0 : _b.message) || 'Terjadi Kesalahan, Harap Reload Halaman!';
    this.uploadService.disconnect();
    this.fg.controls['attachment_id'].patchValue(null);

    if (this.uploadToast) {
      this.toast.remove(this.uploadToast.toastId);
    }

    this.ddl.clear();
  }

  verify() {
    this.router.navigate(['/verify'], {
      queryParams: {
        returnUrl: this.router.url.split('?')[0]
      },
      state: {
        bypassCanDeactivate: true
      }
    });
  }

}

BerkasCreateComponent.ɵfac = function BerkasCreateComponent_Factory(t) {
  return new (t || BerkasCreateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_26__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_4__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_anime_service__WEBPACK_IMPORTED_MODULE_5__.AnimeService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_dorama_service__WEBPACK_IMPORTED_MODULE_6__.DoramaService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_project_service__WEBPACK_IMPORTED_MODULE_7__.ProjectService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_8__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_berkas_service__WEBPACK_IMPORTED_MODULE_9__.BerkasService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_10__.ImgbbService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_toast_service__WEBPACK_IMPORTED_MODULE_11__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_12__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_13__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](ngx_uploadx__WEBPACK_IMPORTED_MODULE_27__.UploadxService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_14__.DialogService));
};

BerkasCreateComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineComponent"]({
  type: BerkasCreateComponent,
  selectors: [["app-berkas-create"]],
  decls: 5,
  vars: 1,
  consts: [[1, "container"], [1, "row", "px-3"], [1, "col-12"], [3, "formGroup", "submit", 4, "ngIf"], [3, "formGroup", "submit"], [1, "row", "mt-3", "mb-3"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "float-end", "text-decoration-none", "text-warning", 2, "font-size", "small", "cursor", "pointer", 3, "click"], [1, "text-bifeldy"], [1, "row"], [1, "col-12", "col-md-5", "col-xl-4", "p-3"], ["class", "col-12", 4, "ngIf"], ["class", "col-12 mb-4", 4, "ngIf"], ["class", "col-12 p-3", 4, "ngIf"], [1, "col-12", "p-3"], ["formControlName", "r18", "matTooltip", "Konten Eksplisit"], ["appearance", "outline", 1, "px-3", "pt-3", "col-12", 3, "color"], ["formControlName", "projectType_id", "placeholder", "Anime / Drama", "required", ""], [3, "value", 4, "ngFor", "ngForOf"], [4, "ngIf"], ["appearance", "outline", "class", "p-3 w-100", 3, "color", 4, "ngIf"], ["formArrayName", "fansub_list", "matTooltip", "Silahkan Buat Terlebih Dahulu Jika Tidak Ada"], [4, "ngFor", "ngForOf"], [1, "col-12", "mb-4"], [1, "col"], ["type", "button", "mat-raised-button", "", "color", "primary", 1, "w-100", 3, "disabled", "click"], [1, "me-1"], [1, "col-12", "col-md-7", "col-xl-8", "pt-3"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["matInput", "", "formControlName", "name", "placeholder", "[Fansub] Judul Anime - 00 [BD 4K x265 FLAC][CRC32].mkv", "required", ""], ["matSuffix", ""], ["class", "p-3 w-100", "formControlName", "description", 3, "config", 4, "ngIf"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["ddlVerified", ""], ["ddlNotVerified", ""], ["formArrayName", "download_url"], [1, "row", "mb-4"], [1, "col-12", "py-3"], [1, "row", "gy-3"], [1, "col", "g-0"], [1, "col-12", "col-md-3"], ["mat-stroked-button", "", "routerLink", "/berkas", 1, "w-100", 3, "disabled"], ["type", "submit", "mat-flat-button", "", "color", "accent", 1, "w-100", 3, "disabled"], [1, "ms-1"], [1, "w-100", "border", 3, "src"], ["appearance", "outline", 1, "pt-3", "w-100", 3, "color"], [1, "w-100", 3, "disabled", "accept", "change"], ["gambar", ""], [1, "px-3", "w-100"], ["formControlName", "private", "matTooltip", "Hanya Dapat Di Akses Melalui URL"], ["formControlName", "permanent_storage", "matTooltip", "Berkas terjamin tidak akan hilang / expired"], [3, "value"], ["appearance", "outline", 1, "p-3", "w-100", 3, "color"], ["matInput", "", "formControlName", "anime_id", "placeholder", "Full Metal Alchemist", 3, "matAutocomplete", "keyup"], ["autoCompleteAnime", "matAutocomplete"], ["class", "is-loading", 4, "ngIf"], ["class", "text-warning", 4, "ngIf"], [1, "is-loading"], ["mode", "indeterminate"], ["class", "px-1", 3, "value", "click", 4, "ngFor", "ngForOf"], [1, "px-1", 3, "value", "click"], [1, "me-1", 2, "height", "40px", "width", "30px", "object-fit", "cover", 3, "src"], [1, "text-warning"], ["matInput", "", "formControlName", "dorama_id", "placeholder", "Flying Colors", 3, "matAutocomplete", "keyup"], ["autoCompleteDorama", "matAutocomplete"], [1, "row", 3, "formGroupName"], ["appearance", "outline", 1, "px-3", "pt-3", "w-100", 3, "color"], ["matInput", "", "formControlName", "fansub_id", "placeholder", "NamaFansub", "required", "", 3, "matAutocomplete", "keyup"], ["matSuffix", "", 4, "ngIf"], ["type", "button", "mat-button", "", "matSuffix", "", "mat-icon-button", "", 3, "click", 4, "ngIf"], ["autoCompleteFansub", "matAutocomplete"], ["type", "button", "mat-button", "", "matSuffix", "", "mat-icon-button", "", 3, "click"], [1, "me-1", 2, "height", "40px", "width", "40px", "object-fit", "cover", 3, "src"], ["formControlName", "description", 1, "p-3", "w-100", 3, "config"], [1, "col-12", "px-3"], [1, "text-success"], ["appearance", "outline", 1, "px-3", "pt-3", "col", 3, "color"], ["uploadx", "", 1, "w-100", 3, "disabled", "accept", "change"], ["ddl", ""], [1, "px-4", "w-100"], ["class", "row mb-4", 4, "ngFor", "ngForOf"], [1, "px-3"], [3, "mode", "value"], [1, "col-6", "col-lg-4"], ["type", "button", "mat-stroked-button", "", "color", "accent", 1, "w-100", 3, "click"], ["matTooltip", "Silahkan Isi Alamat Website Kamu Jika Ingin Mendapatkan Traffic Pengunjung", 1, "row", 3, "formGroupName"], ["class", "col-12 px-3", 4, "ngIf"], ["appearance", "outline", 1, "px-3", "pt-3", "col-12", "col-md-5", 3, "color"], ["matInput", "", "formControlName", "name", "placeholder", "Google Drive", "required", ""], ["appearance", "outline", 1, "px-3", "pt-3", "col-12", "col-md-7", 3, "color"], ["matInput", "", "formControlName", "url", "placeholder", "https://webshit.saya.com/01/02/halaman-post-download.html", "required", ""]],
  template: function BerkasCreateComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](0, "app-notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](4, BerkasCreateComponent_form_4_Template, 89, 25, "form", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx.fg);
    }
  },
  directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_15__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_28__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_19__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_29__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_29__.MatLabel, ngx_material_file_input__WEBPACK_IMPORTED_MODULE_30__.FileInputComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_31__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_29__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_29__.MatError, _angular_material_button__WEBPACK_IMPORTED_MODULE_32__.MatButton, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_33__.MatSlideToggle, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormControlName, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_34__.MatTooltip, _angular_material_select__WEBPACK_IMPORTED_MODULE_35__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.RequiredValidator, _angular_common__WEBPACK_IMPORTED_MODULE_28__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_36__.MatOption, _angular_material_input__WEBPACK_IMPORTED_MODULE_37__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.DefaultValueAccessor, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_38__.MatAutocompleteTrigger, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_38__.MatAutocomplete, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_39__.MatProgressBar, _angular_material_divider__WEBPACK_IMPORTED_MODULE_40__.MatDivider, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormArrayName, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormGroupName, _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_41__.AngularEditorComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_32__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_26__.RouterLinkWithHref],
  pipes: [_shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_16__.BytesPipe, _angular_common__WEBPACK_IMPORTED_MODULE_28__.AsyncPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJiZXJrYXMtY3JlYXRlLmNvbXBvbmVudC5jc3MifQ== */"]
});

/***/ }),

/***/ 955:
/*!************************************************!*\
  !*** ./src/app/_pages/create/create.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateModule": () => (/* binding */ CreateModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../constants */ 26271);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/req-res.model */ 14249);
/* harmony import */ var _shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/guards/roles.guard */ 2777);
/* harmony import */ var _shared_guards_verified_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/guards/verified.guard */ 55094);
/* harmony import */ var _shared_guards_leave_page_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/guards/leave-page.guard */ 47772);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/pipes/custom-pipe.module */ 67355);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _create_berkas_create_berkas_create_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../create/berkas-create/berkas-create.component */ 62331);
/* harmony import */ var _create_fansub_create_fansub_create_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../create/fansub-create/fansub-create.component */ 79961);
/* harmony import */ var _create_mailbox_create_mailbox_create_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../create/mailbox-create/mailbox-create.component */ 90808);
/* harmony import */ var _create_news_create_news_create_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../create/news-create/news-create.component */ 38656);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 3184);



















const routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: 'berkas',
        component: _create_berkas_create_berkas_create_component__WEBPACK_IMPORTED_MODULE_8__.BerkasCreateComponent,
        canDeactivate: [_shared_guards_leave_page_guard__WEBPACK_IMPORTED_MODULE_4__.LeavePageGuard],
        data: {
            title: 'Berkas - Buat Baru',
            description: 'Halaman Unggah Berkas Baru',
            keywords: 'Tambah Berkas Baru'
        }
    },
    {
        path: 'fansub',
        component: _create_fansub_create_fansub_create_component__WEBPACK_IMPORTED_MODULE_9__.FansubCreateComponent,
        canActivate: [_shared_guards_verified_guard__WEBPACK_IMPORTED_MODULE_3__.VerifiedGuard],
        canDeactivate: [_shared_guards_leave_page_guard__WEBPACK_IMPORTED_MODULE_4__.LeavePageGuard],
        data: {
            title: 'Fansub - Buat Baru',
            description: 'Halaman Menambahkan Fansub Baru',
            keywords: 'Create Fansub',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorVerifiedOnly]: true
        }
    },
    {
        path: 'mailbox',
        component: _create_mailbox_create_mailbox_create_component__WEBPACK_IMPORTED_MODULE_10__.MailboxCreateComponent,
        canActivate: [_shared_guards_verified_guard__WEBPACK_IMPORTED_MODULE_3__.VerifiedGuard],
        canDeactivate: [_shared_guards_leave_page_guard__WEBPACK_IMPORTED_MODULE_4__.LeavePageGuard],
        data: {
            title: 'Surel - Buat Baru',
            description: 'Halaman Kirim Surel Baru',
            keywords: 'Buat Surel Baru',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorVerifiedOnly]: true
        }
    },
    {
        path: 'news',
        component: _create_news_create_news_create_component__WEBPACK_IMPORTED_MODULE_11__.NewsCreateComponent,
        canActivate: [_shared_guards_verified_guard__WEBPACK_IMPORTED_MODULE_3__.VerifiedGuard, _shared_guards_roles_guard__WEBPACK_IMPORTED_MODULE_2__.RolesGuard],
        canDeactivate: [_shared_guards_leave_page_guard__WEBPACK_IMPORTED_MODULE_4__.LeavePageGuard],
        data: {
            title: 'Berita - Buat Baru',
            description: 'Halaman Unggah Berita Baru',
            keywords: 'Tambah Berita Baru',
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorVerifiedOnly]: true,
            [_constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.decoratorRoles]: [_models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_1__.RoleModel.MODERATOR]
        }
    }
];
class CreateModule {
}
CreateModule.ɵfac = function CreateModule_Factory(t) { return new (t || CreateModule)(); };
CreateModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({ type: CreateModule });
CreateModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_13__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule.forChild(routes),
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_5__.SharedMaterialModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_15__.ReactiveFormsModule,
            ngx_material_file_input__WEBPACK_IMPORTED_MODULE_16__.MaterialFileInputModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_7__.NotificationsModule,
            _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_17__.AngularEditorModule,
            _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_6__.CustomPipeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](CreateModule, { declarations: [_create_berkas_create_berkas_create_component__WEBPACK_IMPORTED_MODULE_8__.BerkasCreateComponent,
        _create_fansub_create_fansub_create_component__WEBPACK_IMPORTED_MODULE_9__.FansubCreateComponent,
        _create_mailbox_create_mailbox_create_component__WEBPACK_IMPORTED_MODULE_10__.MailboxCreateComponent,
        _create_news_create_news_create_component__WEBPACK_IMPORTED_MODULE_11__.NewsCreateComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule, _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_5__.SharedMaterialModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_15__.ReactiveFormsModule,
        ngx_material_file_input__WEBPACK_IMPORTED_MODULE_16__.MaterialFileInputModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_7__.NotificationsModule,
        _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_17__.AngularEditorModule,
        _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_6__.CustomPipeModule] }); })();


/***/ }),

/***/ 79961:
/*!************************************************************************!*\
  !*** ./src/app/_pages/create/fansub-create/fansub-create.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FansubCreateComponent": () => (/* binding */ FansubCreateComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 54363);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 71989);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 98977);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 19337);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs/operators */ 32673);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs/operators */ 8504);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../constants */ 26271);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../models/req-res.model */ 14249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/imgbb.service */ 67902);
/* harmony import */ var _shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/fansub.service */ 76781);
/* harmony import */ var _shared_services_toast_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/services/toast.service */ 96925);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/datepicker */ 5818);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/chips */ 81196);
/* harmony import */ var _shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../_shared/pipes/bytes.pipe */ 23626);
































function FansubCreateComponent_div_0_form_7_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("Ukuran Upload Melebihi Batas ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, ctx_r3.imageLimitExceeded), " !");
  }
}

function FansubCreateComponent_div_0_form_7_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r4.imageErrorText);
  }
}

function FansubCreateComponent_div_0_form_7_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 6)(1, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function FansubCreateComponent_div_0_form_7_div_23_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return ctx_r28.submitImage();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "mat-icon", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3, "add_photo_alternate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4, " Unggah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r5.submitted);
  }
}

function FansubCreateComponent_div_0_form_7_div_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("Ukuran Upload Melebihi Batas ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 1, ctx_r7.coverLimitExceeded), " !");
  }
}

function FansubCreateComponent_div_0_form_7_div_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r8.coverErrorText);
  }
}

function FansubCreateComponent_div_0_form_7_div_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 61)(1, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function FansubCreateComponent_div_0_form_7_div_37_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r31);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return ctx_r30.submitCover();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "mat-icon", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3, "add_photo_alternate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4, " Unggah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r9.submitted);
  }
}

function FansubCreateComponent_div_0_form_7_div_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Nama Fansub Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Nama Fansub Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_small_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "small", 62)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](ctx_r12.slugInfo);
  }
}

function FansubCreateComponent_div_0_form_7_div_55_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Singkatan Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Singkatan Hanya Boleh Huruf Dan \u4E00");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_67_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Tanggal Harus Diisi Secara Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_68_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Tanggal Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_80_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Mohon Pilih Salah Satu");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_81_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Status Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_mat_chip_90_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "mat-chip", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("removed", function FansubCreateComponent_div_0_form_7_mat_chip_90_Template_mat_chip_removed_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r34);
      const t_r32 = restoredCtx.$implicit;
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
      return ctx_r33.removeTag(t_r32);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "mat-icon", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const t_r32 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("removable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", t_r32, " ");
  }
}

function FansubCreateComponent_div_0_form_7_div_106_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Website Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_107_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Website Link Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_115_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Facebook Link Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_123_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Discord Link Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_131_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "Twitter Link Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_132_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, "RSS Link Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}

function FansubCreateComponent_div_0_form_7_div_132_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 13)(1, "mat-form-field", 42)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3, "URI / URL RSS v2.0 Feed");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "input", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6, "rss_feed");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](8, FansubCreateComponent_div_0_form_7_div_132_div_8_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }

  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r27.fg.get("rss_feed").hasError("pattern"));
  }
}

function FansubCreateComponent_div_0_form_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "form", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("submit", function FansubCreateComponent_div_0_form_7_Template_form_submit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r37);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return ctx_r36.onSubmit();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "div", 9)(2, "div", 10)(3, "h2", 11)(4, "b", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](5, "Tambah Data Fansub Baru");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "div", 6)(7, "div", 13)(8, "div", 14)(9, "div", 13)(10, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](11, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](12, "mat-form-field", 16)(13, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](14, "Foto");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](15, "ngx-mat-file-input", 17, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function FansubCreateComponent_div_0_form_7_Template_ngx_mat_file_input_change_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r37);

      const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](16);

      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return ctx_r38.uploadImage($event, _r2);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](17, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](18, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](19, "mat-error", 20)(20, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](21, FansubCreateComponent_div_0_form_7_div_21_Template, 3, 3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](22, FansubCreateComponent_div_0_form_7_div_22_Template, 2, 1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](23, FansubCreateComponent_div_0_form_7_div_23_Template, 5, 1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](24, "div", 23)(25, "div", 13)(26, "mat-form-field", 24)(27, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](28, "Cover");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](29, "ngx-mat-file-input", 17, 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("change", function FansubCreateComponent_div_0_form_7_Template_ngx_mat_file_input_change_29_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r37);

      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](30);

      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return ctx_r39.uploadCover($event, _r6);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](31, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](32, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](33, "mat-error", 20)(34, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](35, FansubCreateComponent_div_0_form_7_div_35_Template, 3, 3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](36, FansubCreateComponent_div_0_form_7_div_36_Template, 2, 1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](37, FansubCreateComponent_div_0_form_7_div_37_Template, 5, 1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](38, "mat-form-field", 27)(39, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](40, "Nama Fansub");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](41, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](42, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](43, "wysiwyg");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](44, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](45, FansubCreateComponent_div_0_form_7_div_45_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](46, FansubCreateComponent_div_0_form_7_div_46_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](47, "mat-form-field", 29)(48, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](49, "Singkatan");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](50, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](51, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](52, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](53, FansubCreateComponent_div_0_form_7_small_53_Template, 3, 1, "small", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](54, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](55, FansubCreateComponent_div_0_form_7_div_55_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](56, FansubCreateComponent_div_0_form_7_div_56_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](57, "angular-editor", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](58, "mat-form-field", 33)(59, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](60, "Mulai Ada Sejak");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](61, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("focus", function FansubCreateComponent_div_0_form_7_Template_input_focus_61_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r37);

      const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](65);

      return _r15.open();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](62, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](63, "mat-datepicker-toggle", 35)(64, "mat-datepicker", 36, 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](66, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](67, FansubCreateComponent_div_0_form_7_div_67_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](68, FansubCreateComponent_div_0_form_7_div_68_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](69, "mat-form-field", 33)(70, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](71, "Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](72, "mat-select", 38)(73, "mat-option", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](74, "Tidak Aktif");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](75, "mat-option", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](76, "Aktif");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](77, "mat-hint", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](78, "Status Kehidupan Fansub Saat Ini");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](79, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](80, FansubCreateComponent_div_0_form_7_div_80_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](81, FansubCreateComponent_div_0_form_7_div_81_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](82, "div", 13)(83, "div", 6)(84, "div", 13)(85, "mat-form-field", 42)(86, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](87, "Tags & Kategori");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](88, "mat-chip-list", null, 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](90, FansubCreateComponent_div_0_form_7_mat_chip_90_Template, 4, 2, "mat-chip", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](91, "input", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("matChipInputTokenEnd", function FansubCreateComponent_div_0_form_7_Template_input_matChipInputTokenEnd_91_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r37);
      const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return ctx_r41.addTag($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](92, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](93, "loyalty");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](94, "mat-hint", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](95, "Isi Dengan Bebas, Pisahkan Dengan Koma");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](96, "div", 13)(97, "div", 6)(98, "div", 13)(99, "mat-form-field", 46)(100, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](101, "Tautan Website");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](102, "input", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](103, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](104, "web");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](105, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](106, FansubCreateComponent_div_0_form_7_div_106_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](107, FansubCreateComponent_div_0_form_7_div_107_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](108, "mat-form-field", 46)(109, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](110, "Facebook Fanpage");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](111, "input", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](112, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](113, "facebook");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](114, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](115, FansubCreateComponent_div_0_form_7_div_115_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](116, "mat-form-field", 46)(117, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](118, "Tautan Discord");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](119, "input", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](120, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](121, "img", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](122, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](123, FansubCreateComponent_div_0_form_7_div_123_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](124, "mat-form-field", 46)(125, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](126, "Cuitan Twitter");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](127, "input", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](128, "mat-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](129, "img", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](130, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](131, FansubCreateComponent_div_0_form_7_div_131_Template, 2, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](132, FansubCreateComponent_div_0_form_7_div_132_Template, 9, 2, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](133, "div", 13)(134, "div", 6)(135, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](136, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](137, "div", 55)(138, "a", 56)(139, "mat-icon", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](140, "undo");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](141, " Batal ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](142, "div", 55)(143, "button", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](144, " Simpan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](145, "mat-icon", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](146, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()()()()()()()();
  }

  if (rf & 2) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](65);

    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵreference"](89);

    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("formGroup", ctx_r1.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("src", ctx_r1.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r1.fg.value.image)("accept", "image/gif, image/jpeg, image/jpg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.imageLimitExceeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.imageErrorText);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.image && !ctx_r1.fg.value.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r1.fg.value.cover)("accept", "image/gif, image/jpeg, image/jpg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.coverLimitExceeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.coverErrorText);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.cover && !ctx_r1.fg.value.cover);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("name").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("name").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.slugInfo);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("slug").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("slug").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("config", ctx_r1.GS.angularEditorConfig);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind2"](62, 50, ctx_r1.currentDate, "d MMMM y"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("matDatepicker", _r15);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("for", _r15);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("born").hasError("required") || ctx_r1.fg.get("born").hasError("matDatepickerParse"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("born").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("active").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("active").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", ctx_r1.fg.value.tags);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("matChipInputSeparatorKeyCodes", ctx_r1.GS.separatorKeysCodes)("matChipInputFor", _r20)("matChipInputAddOnBlur", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("web").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("web").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("facebook").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpropertyInterpolate1"]("src", "/assets/img/discord/", ctx_r1.GS.isDarkMode ? "white" : "black", ".png", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("discord").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpropertyInterpolate1"]("src", "/assets/img/twitter/", ctx_r1.GS.isDarkMode ? "white" : "black", ".png", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.fg.get("twitter").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.rssFeedAllowed);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r1.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r1.submitted || ctx_r1.fg.invalid);
  }
}

function FansubCreateComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "app-notifications");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div", 5)(6, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](7, FansubCreateComponent_div_0_form_7_Template, 147, 53, "form", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵstyleProp"]("background-image", "url(" + ctx_r0.cover_url + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r0.fg);
  }
}

class FansubCreateComponent {
  constructor(fb, router, as, bs, pi, imgbb, fansub, toast, gs, ds) {
    this.fb = fb;
    this.router = router;
    this.as = as;
    this.bs = bs;
    this.pi = pi;
    this.imgbb = imgbb;
    this.fansub = fansub;
    this.toast = toast;
    this.gs = gs;
    this.ds = ds;
    this.submitted = false;
    this.image = null;
    this.imageLimitExceeded = null;
    this.imageErrorText = null;
    this.image_url = '/assets/img/form/no-image.png';
    this.cover = null;
    this.coverLimitExceeded = null;
    this.coverErrorText = null;
    this.cover_url = '/assets/img/form/no-image.png';
    this.urls = [];
    this.currentDate = new Date();
    this.gambar = null;
    this.gambar_ = null;
    this.subsImgbb = null;
    this.subsFansub = null;
    this.subsCekFansubSlug = null;
    this.slugInfo = '';
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get GS() {
    return this.gs;
  }

  get rssFeedAllowed() {
    var _a, _b, _c, _d, _e, _f;

    return ((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.ADMIN || ((_d = (_c = this.as.currentUserSubject) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.MODERATOR || ((_f = (_e = this.as.currentUserSubject) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.FANSUBBER;
  }

  ngOnDestroy() {
    var _a, _b;

    (_a = this.subsImgbb) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsFansub) === null || _b === void 0 ? void 0 : _b.unsubscribe();
  }

  ngOnInit() {
    this.pi.updatePageMetaData(`Fansub - Buat Baru`, `Halaman Menambahkan Fansub Baru`, `Create Fansub`);

    if (this.gs.isBrowser) {
      this.initForm();
    }
  }

  canDeactivate() {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const closeDialog = yield _this.ds.leavePageDialog();
      return yield (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.firstValueFrom)(closeDialog);
    })();
  }

  initForm() {
    this.fg = this.fb.group({
      name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      description: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      born: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      active: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      slug: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(/^[0-9a-zA-Z-]*$/)])],
      tags: [[], _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([])],
      image: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])],
      cover: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])],
      web: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])],
      facebook: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])],
      discord: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])],
      twitter: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])],
      rss_feed: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])]
    });
    this.subsCekFansubSlug = this.fg.get('slug').valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.debounceTime)(500), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.tap)(() => this.slugInfo = 'Mengecek ...'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.switchMap)(slugQuery => this.fansub.cekSlug({
      slug: slugQuery
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.retry)(-1)).subscribe({
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

    this.fg.controls['tags'].patchValue(this.fg.value.tags.filter((a, b, c) => c.findIndex(d => d === a) === b));
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
    const file = event.target.files[0];

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = e => {
        this.gs.log('[IMAGE_SELECTED]', e);

        if (file.size <= _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit) {
          const img = this.gs.document.createElement('img');

          img.onload = () => {
            this.image = file;
            this.image_url = reader.result.toString();
          };

          img.src = reader.result.toString();
        } else {
          this.image = null;
          this.image_url = '/assets/img/form/image-error.png';
          this.imageLimitExceeded = _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit;
          this.gambar.clear(event);
        }
      };
    } catch (error) {
      this.image = null;
      this.image_url = '/assets/img/form/no-image.png';
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
        this.submitted = false;
      },
      error: err => {
        var _a;

        this.gs.log('[IMAGE_ERROR]', err, 'error');
        this.fg.controls['image'].patchValue(null);
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
    const file = event.target.files[0];

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = e => {
        this.gs.log('[COVER_SELECTED]', e);

        if (file.size <= _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit) {
          const img = this.gs.document.createElement('img');

          img.onload = () => {
            this.cover = file;
            this.cover_url = reader.result.toString();
          };

          img.src = reader.result.toString();
        } else {
          this.cover = null;
          this.cover_url = '/assets/img/form/image-error.png';
          this.coverLimitExceeded = _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit;
          this.gambar_.clear(event);
        }
      };
    } catch (error) {
      this.cover = null;
      this.cover_url = '/assets/img/form/no-image.png';
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
        this.submitted = false;
      },
      error: err => {
        var _a;

        this.gs.log('[COVER_ERROR]', err, 'error');
        this.fg.controls['cover'].patchValue(null);
        this.submitted = false;
        this.coverErrorText = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
      }
    });
  }

  onSubmit() {
    this.bs.busy();
    const urls = [];

    if (this.fg.value.web) {
      urls.push({
        name: 'web',
        url: this.fg.value.web
      });
    }

    if (this.fg.value.facebook) {
      urls.push({
        name: 'facebook',
        url: this.fg.value.facebook
      });
    }

    if (this.fg.value.discord) {
      urls.push({
        name: 'discord',
        url: this.fg.value.discord
      });
    }

    if (this.fg.value.twitter) {
      urls.push({
        name: 'twitter',
        url: this.fg.value.twitter
      });
    }

    this.submitted = true;

    if (this.fg.invalid || urls.length === 0) {
      if (urls.length === 0) {
        this.toast.warning('Harap Isi Salah Satu URL', 'Form Tidak lengkap (Web/FB/DC)', null, true);
      }

      this.submitted = false;
      this.bs.idle();
      return;
    }

    this.subsFansub = this.fansub.createFansub({
      image: this.fg.value.image,
      cover: this.fg.value.cover,
      name: this.fg.value.name,
      description: this.fg.value.description,
      born: this.fg.value.born.getTime(),
      active: this.fg.value.active,
      tags: this.fg.value.tags,
      slug: this.fg.value.slug,
      urls,
      rss_feed: this.fg.value.rss_feed
    }).subscribe({
      next: res => {
        this.gs.log('[FANSUB_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/fansub', {
          state: {
            bypassCanDeactivate: true
          }
        });
      },
      error: err => {
        this.gs.log('[FANSUB_CREATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

}

FansubCreateComponent.ɵfac = function FansubCreateComponent_Factory(t) {
  return new (t || FansubCreateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_21__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_4__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_5__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_6__.ImgbbService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_7__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_toast_service__WEBPACK_IMPORTED_MODULE_8__.ToastService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_9__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_10__.DialogService));
};

FansubCreateComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
  type: FansubCreateComponent,
  selectors: [["app-fansub-create"]],
  decls: 1,
  vars: 1,
  consts: [["class", "container", 4, "ngIf"], [1, "container"], [1, "fansub-banner", "fansub-banner-1", "align-items-center"], [1, "fansub-banner", "fansub-banner-2", "align-items-center"], [2, "padding-top", "160px"], [1, "row", "px-3"], [1, "col-12"], [3, "formGroup", "submit", 4, "ngIf"], [3, "formGroup", "submit"], [1, "row", "mt-3", "mb-3"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "row"], [1, "col-12", "col-md-5", "col-xl-4", "p-3"], [1, "w-100", "border", 3, "src"], ["appearance", "outline", 1, "pt-3", "w-100", 3, "color"], [1, "w-100", 3, "disabled", "accept", "change"], ["gambar", ""], ["matSuffix", ""], [1, "px-3", "w-100"], [4, "ngIf"], ["class", "col-12", 4, "ngIf"], [1, "col-12", "col-md-7", "col-xl-8", "pt-3"], ["appearance", "outline", 1, "px-3", "pt-3", "w-100", 3, "color"], ["gambar_", ""], ["class", "col-12 p-3", 4, "ngIf"], ["appearance", "outline", 1, "p-3", "col-12", "col-md-7", 3, "color"], ["matInput", "", "formControlName", "name", "placeholder", "Fansub Jalanan", "required", ""], ["appearance", "outline", "matTooltip", "Digunakan Juga Untuk Sub-Domain", 1, "p-3", "col-12", "col-md-5", 3, "color"], ["matInput", "", "formControlName", "slug", "placeholder", "Jalsub", "required", ""], ["class", "text-info", 4, "ngIf"], ["formControlName", "description", "required", "", 1, "p-3", "w-100", 3, "config"], ["appearance", "outline", 1, "p-3", "col-12", "col-md-6", 3, "color"], ["matInput", "", "formControlName", "born", "required", "", 3, "matDatepicker", "placeholder", "focus"], ["matSuffix", "", 3, "for"], ["disabled", "false"], ["kalender", ""], ["formControlName", "active", "placeholder", "Aktif / Non-Aktif", "required", ""], ["value", "0"], ["value", "1"], ["align", "end"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["tag", ""], ["color", "accent", "selected", "", 3, "removable", "removed", 4, "ngFor", "ngForOf"], ["placeholder", "Label Tag / Kategori", 3, "matChipInputSeparatorKeyCodes", "matChipInputFor", "matChipInputAddOnBlur", "matChipInputTokenEnd"], ["appearance", "outline", 1, "p-3", "col-12", "col-md-3", 3, "color"], ["matInput", "", "formControlName", "web", "placeholder", "http://www.domain.id"], ["matInput", "", "formControlName", "facebook", "placeholder", "http://www.facebook.com"], ["matInput", "", "formControlName", "discord", "placeholder", "http://www.discord.gg"], ["width", "24px", 2, "vertical-align", "baseline", 3, "src"], ["matInput", "", "formControlName", "twitter", "placeholder", "http://www.twitter.com"], ["class", "row", 4, "ngIf"], [1, "row", "gy-3"], [1, "col", "g-0"], [1, "col-12", "col-md-3"], ["mat-stroked-button", "", "routerLink", "/fansub", 1, "w-100", 3, "disabled"], [1, "me-1"], ["type", "submit", "mat-flat-button", "", "color", "accent", 1, "w-100", 3, "disabled"], [1, "ms-1"], ["type", "button", "mat-raised-button", "", "color", "primary", 1, "w-100", 3, "disabled", "click"], [1, "col-12", "p-3"], [1, "text-info"], ["color", "accent", "selected", "", 3, "removable", "removed"], ["matChipRemove", ""], ["matInput", "", "formControlName", "rss_feed", "placeholder", "http://my-site.blogspot.com/feeds/posts/default?alt=rss"]],
  template: function FansubCreateComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](0, FansubCreateComponent_div_0_Template, 8, 3, "div", 0);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.fg);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_22__.NgIf, _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_11__.NotificationsComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__.MatLabel, ngx_material_file_input__WEBPACK_IMPORTED_MODULE_24__.FileInputComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_25__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__.MatError, _angular_material_button__WEBPACK_IMPORTED_MODULE_26__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_27__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.RequiredValidator, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_28__.MatTooltip, _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_29__.AngularEditorComponent, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_30__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_30__.MatDatepickerToggle, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_30__.MatDatepicker, _angular_material_select__WEBPACK_IMPORTED_MODULE_31__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_32__.MatOption, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_23__.MatHint, _angular_material_chips__WEBPACK_IMPORTED_MODULE_33__.MatChipList, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgForOf, _angular_material_chips__WEBPACK_IMPORTED_MODULE_33__.MatChip, _angular_material_chips__WEBPACK_IMPORTED_MODULE_33__.MatChipRemove, _angular_material_chips__WEBPACK_IMPORTED_MODULE_33__.MatChipInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_26__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_21__.RouterLinkWithHref],
  pipes: [_shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_12__.BytesPipe, _angular_common__WEBPACK_IMPORTED_MODULE_22__.DatePipe],
  styles: [".fansub-banner[_ngcontent-%COMP%] {\r\n  height: 128px;\r\n  width: 100%;\r\n  background-size: cover;\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  filter: blur(5px) brightness(100%);\r\n  opacity: 0.5;\r\n}\r\n\r\n.fansub-banner-1[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n}\r\n\r\n.fansub-banner-2[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 128px;\r\n  left: 0;\r\n}\r\n\r\n.fansub-info[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  height: 256px;\r\n  z-index: 1;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZhbnN1Yi1jcmVhdGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixXQUFXO0VBQ1gsc0JBQXNCO0VBQ3RCLDJCQUEyQjtFQUMzQiw0QkFBNEI7RUFDNUIsa0NBQWtDO0VBQ2xDLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztBQUNUOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixPQUFPO0FBQ1Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFVBQVU7QUFDWiIsImZpbGUiOiJmYW5zdWItY3JlYXRlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZmFuc3ViLWJhbm5lciB7XHJcbiAgaGVpZ2h0OiAxMjhweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGZpbHRlcjogYmx1cig1cHgpIGJyaWdodG5lc3MoMTAwJSk7XHJcbiAgb3BhY2l0eTogMC41O1xyXG59XHJcblxyXG4uZmFuc3ViLWJhbm5lci0xIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbn1cclxuXHJcbi5mYW5zdWItYmFubmVyLTIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDEyOHB4O1xyXG4gIGxlZnQ6IDA7XHJcbn1cclxuXHJcbi5mYW5zdWItaW5mbyB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGhlaWdodDogMjU2cHg7XHJcbiAgei1pbmRleDogMTtcclxufSJdfQ== */"]
});

/***/ }),

/***/ 90808:
/*!**************************************************************************!*\
  !*** ./src/app/_pages/create/mailbox-create/mailbox-create.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailboxCreateComponent": () => (/* binding */ MailboxCreateComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 54363);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../constants */ 26271);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../models/req-res.model */ 14249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_mail_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/services/mail.service */ 27358);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/chips */ 81196);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/slide-toggle */ 6623);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/tooltip */ 40089);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/button */ 87317);


























function MailboxCreateComponent_form_4_mat_chip_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-chip", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("removed", function MailboxCreateComponent_form_4_mat_chip_15_Template_mat_chip_removed_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r16);
      const t_r14 = restoredCtx.$implicit;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return ctx_r15.removeTo(t_r14);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "mat-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const t_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("removable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", t_r14, " ");
  }
}

function MailboxCreateComponent_form_4_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Alamat Surel Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}

function MailboxCreateComponent_form_4_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Alamat Surel Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}

function MailboxCreateComponent_form_4_mat_chip_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-chip", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("removed", function MailboxCreateComponent_form_4_mat_chip_28_Template_mat_chip_removed_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r19);
      const c_r17 = restoredCtx.$implicit;
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return ctx_r18.removeCc(c_r17);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "mat-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const c_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("removable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", c_r17, " ");
  }
}

function MailboxCreateComponent_form_4_div_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Alamat Surel Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}

function MailboxCreateComponent_form_4_mat_chip_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "mat-chip", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("removed", function MailboxCreateComponent_form_4_mat_chip_40_Template_mat_chip_removed_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r22);
      const b_r20 = restoredCtx.$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return ctx_r21.removeBcc(b_r20);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "mat-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const b_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("removable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", b_r20, " ");
  }
}

function MailboxCreateComponent_form_4_div_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Alamat Surel Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}

function MailboxCreateComponent_form_4_div_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 35)(1, "mat-slide-toggle", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function MailboxCreateComponent_form_4_div_47_Template_mat_slide_toggle_change_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r24);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return ctx_r23.noReplyMode($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpropertyInterpolate1"]("matTooltip", "Kirim sebagai noreply@", ctx_r11.ENV.domain, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" Kirim sebagai noreply@", ctx_r11.ENV.domain, " ");
  }
}

function MailboxCreateComponent_form_4_div_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Judul Pesan Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}

function MailboxCreateComponent_form_4_div_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "Judul Pesan Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}

function MailboxCreateComponent_form_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "form", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("submit", function MailboxCreateComponent_form_4_Template_form_submit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return ctx_r25.onSubmit();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 5)(2, "div", 6)(3, "h2", 7)(4, "b", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5, "Buat Email Baru & Kirim");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div", 2)(7, "div", 9)(8, "div", 10)(9, "div", 9)(10, "mat-form-field", 11)(11, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12, "Penerima");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "mat-chip-list", null, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, MailboxCreateComponent_form_4_mat_chip_15_Template, 4, 2, "mat-chip", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](16, "input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("matChipInputTokenEnd", function MailboxCreateComponent_form_4_Template_input_matChipInputTokenEnd_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r26);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return ctx_r27.addTo($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](18, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](19, "mat-hint", 16)(20, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](21, MailboxCreateComponent_form_4_div_21_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](22, MailboxCreateComponent_form_4_div_22_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](23, "mat-form-field", 11)(24, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](25, "Carbon Copy");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](26, "mat-chip-list", null, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](28, MailboxCreateComponent_form_4_mat_chip_28_Template, 4, 2, "mat-chip", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](29, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("matChipInputTokenEnd", function MailboxCreateComponent_form_4_Template_input_matChipInputTokenEnd_29_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r26);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return ctx_r28.addCc($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](30, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](31, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](32, "mat-hint", 16)(33, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](34, MailboxCreateComponent_form_4_div_34_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](35, "mat-form-field", 11)(36, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](37, "Blind Carbon Copy");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](38, "mat-chip-list", null, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](40, MailboxCreateComponent_form_4_mat_chip_40_Template, 4, 2, "mat-chip", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](41, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("matChipInputTokenEnd", function MailboxCreateComponent_form_4_Template_input_matChipInputTokenEnd_41_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r26);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return ctx_r29.addBcc($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](42, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](43, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](44, "mat-hint", 16)(45, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](46, MailboxCreateComponent_form_4_div_46_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](47, MailboxCreateComponent_form_4_div_47_Template, 3, 2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](48, "div", 22)(49, "div", 9)(50, "mat-form-field", 23)(51, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](52, "Judul");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](53, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](54, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](55, "wysiwyg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](56, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](57, MailboxCreateComponent_form_4_div_57_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](58, MailboxCreateComponent_form_4_div_58_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](59, "angular-editor", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](60, "div", 9)(61, "div", 2)(62, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](63, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](64, "div", 28)(65, "a", 29)(66, "mat-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](67, "undo");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](68, " Batal ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](69, "div", 28)(70, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](71, " Simpan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](72, "mat-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](73, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()()()()()();
  }

  if (rf & 2) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](14);

    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](27);

    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](39);

    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("formGroup", ctx_r0.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r0.fg.value.to);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("matChipInputSeparatorKeyCodes", ctx_r0.GS.separatorKeysCodes)("matChipInputFor", _r1)("matChipInputAddOnBlur", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("to").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("to").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r0.fg.value.cc);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("matChipInputSeparatorKeyCodes", ctx_r0.GS.separatorKeysCodes)("matChipInputFor", _r5)("matChipInputAddOnBlur", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("cc").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r0.fg.value.bcc);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("matChipInputSeparatorKeyCodes", ctx_r0.GS.separatorKeysCodes)("matChipInputFor", _r8)("matChipInputAddOnBlur", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("bcc").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.canSendAsNoReply);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("subject").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("subject").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("config", ctx_r0.GS.angularEditorConfig);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r0.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("disabled", ctx_r0.submitted || ctx_r0.fg.invalid);
  }
}

class MailboxCreateComponent {
  constructor(activatedRoute, fb, router, bs, pi, gs, as, ms, ds) {
    this.activatedRoute = activatedRoute;
    this.fb = fb;
    this.router = router;
    this.bs = bs;
    this.pi = pi;
    this.gs = gs;
    this.as = as;
    this.ms = ms;
    this.ds = ds;
    this.submitted = false;
    this.subsMail = null;
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get ENV() {
    return _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment;
  }

  get GS() {
    return this.gs;
  }

  get canSendAsNoReply() {
    var _a, _b;

    const role = (_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.role;
    return role === _models_req_res_model__WEBPACK_IMPORTED_MODULE_3__.RoleModel.ADMIN || role === _models_req_res_model__WEBPACK_IMPORTED_MODULE_3__.RoleModel.MODERATOR;
  }

  ngOnInit() {
    this.pi.updatePageMetaData(`Mailbox - Buat Baru`, `Halaman Membuat Surel Baru`, `Create Email`);

    if (this.gs.isBrowser) {
      this.initForm();
    }
  }

  ngOnDestroy() {
    var _a;

    (_a = this.subsMail) === null || _a === void 0 ? void 0 : _a.unsubscribe();
  }

  canDeactivate() {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const closeDialog = yield _this.ds.leavePageDialog();
      return yield (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.firstValueFrom)(closeDialog);
    })();
  }

  initForm() {
    var _a, _b, _c;

    const to = ((_a = this.activatedRoute.snapshot.queryParamMap.get('to')) === null || _a === void 0 ? void 0 : _a.split(',').map(e => e.trim())) || [];
    const cc = ((_b = this.activatedRoute.snapshot.queryParamMap.get('cc')) === null || _b === void 0 ? void 0 : _b.split(',').map(e => e.trim())) || [];
    const bcc = ((_c = this.activatedRoute.snapshot.queryParamMap.get('bcc')) === null || _c === void 0 ? void 0 : _c.split(',').map(e => e.trim())) || [];
    const subject = this.activatedRoute.snapshot.queryParamMap.get('subject') || '';
    this.fg = this.fb.group({
      to: [to, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.regexEmailMulti)])],
      cc: [cc, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.regexEmailMulti)])],
      bcc: [bcc, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.regexEmailMulti)])],
      subject: [subject, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.regexEnglishKeyboardKeys)])],
      message: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.regexEnglishKeyboardKeys)])],
      no_reply: [false, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required])]
    });
  }

  onSubmit() {
    this.bs.busy();
    this.submitted = true;

    if (this.fg.invalid) {
      this.submitted = false;
      this.bs.idle();
      return;
    }

    this.subsMail = this.ms.sendMail(this.fg.value).subscribe({
      next: res => {
        this.gs.log('[MAIL_SEND_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/mailbox', {
          state: {
            bypassCanDeactivate: true
          }
        });
      },
      error: err => {
        this.gs.log('[MAIL_SEND_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
      }
    });
  }

  addTo(event) {
    const input = event.chipInput.inputElement;
    const value = event.value;

    if ((value || '').trim()) {
      this.fg.value.to.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.fg.controls['to'].patchValue(this.fg.value.to.filter((a, b, c) => c.findIndex(d => d === a) === b));
  }

  removeTo(to) {
    const index = this.fg.value.to.indexOf(to);

    if (index >= 0) {
      this.fg.value.to.splice(index, 1);
    }
  }

  addCc(event) {
    const input = event.chipInput.inputElement;
    const value = event.value;

    if ((value || '').trim()) {
      this.fg.value.cc.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.fg.controls['cc'].patchValue(this.fg.value.cc.filter((a, b, c) => c.findIndex(d => d === a) === b));
  }

  removeCc(cc) {
    const index = this.fg.value.cc.indexOf(cc);

    if (index >= 0) {
      this.fg.value.cc.splice(index, 1);
    }
  }

  addBcc(event) {
    const input = event.chipInput.inputElement;
    const value = event.value;

    if ((value || '').trim()) {
      this.fg.value.bcc.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.fg.controls['bcc'].patchValue(this.fg.value.bcc.filter((a, b, c) => c.findIndex(d => d === a) === b));
  }

  removeBcc(bcc) {
    const index = this.fg.value.bcc.indexOf(bcc);

    if (index >= 0) {
      this.fg.value.bcc.splice(index, 1);
    }
  }

  noReplyMode($event) {
    if ($event.checked) {
      this.fg.controls['subject'].patchValue(`${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.siteName} | Informasi`);
      this.fg.controls['subject'].disable();
    } else {
      this.fg.controls['subject'].enable();
    }
  }

}

MailboxCreateComponent.ɵfac = function MailboxCreateComponent_Factory(t) {
  return new (t || MailboxCreateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_4__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_5__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_7__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_mail_service__WEBPACK_IMPORTED_MODULE_8__.MailService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_9__.DialogService));
};

MailboxCreateComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
  type: MailboxCreateComponent,
  selectors: [["app-mailbox-create"]],
  decls: 5,
  vars: 1,
  consts: [[1, "container"], [1, "row", "px-3"], [1, "col-12"], [3, "formGroup", "submit", 4, "ngIf"], [3, "formGroup", "submit"], [1, "row", "mt-3", "mb-3"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "row"], [1, "col-12", "col-md-5", "col-xl-4", "p-3"], ["hintLabel", "Gunakan , Jika Lebih Dari 1", "appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["to", ""], ["color", "accent", "selected", "", 3, "removable", "removed", 4, "ngFor", "ngForOf"], ["placeholder", "user@domain.tld", "required", "", 3, "matChipInputSeparatorKeyCodes", "matChipInputFor", "matChipInputAddOnBlur", "matChipInputTokenEnd"], ["matSuffix", ""], ["align", "end"], [4, "ngIf"], ["cc", ""], ["placeholder", "user@domain.tld", 3, "matChipInputSeparatorKeyCodes", "matChipInputFor", "matChipInputAddOnBlur", "matChipInputTokenEnd"], ["bcc", ""], ["class", "col-12 p-3", 4, "ngIf"], [1, "col-12", "col-md-7", "col-xl-8", "pt-3"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["matInput", "", "formControlName", "subject", "placeholder", "Judul Pesan Blablabla ...", "required", ""], ["formControlName", "message", "required", "", 1, "p-3", "w-100", 3, "config"], [1, "row", "gy-3"], [1, "col", "g-0"], [1, "col-12", "col-md-3"], ["mat-stroked-button", "", "routerLink", "/mailbox", 1, "w-100", 3, "disabled"], [1, "me-1"], ["type", "submit", "mat-flat-button", "", "color", "accent", 1, "w-100", 3, "disabled"], [1, "ms-1"], ["color", "accent", "selected", "", 3, "removable", "removed"], ["matChipRemove", ""], [1, "col-12", "p-3"], ["formControlName", "no_reply", 3, "matTooltip", "change"]],
  template: function MailboxCreateComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "app-notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](4, MailboxCreateComponent_form_4_Template, 74, 27, "form", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.fg);
    }
  },
  directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_10__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatLabel, _angular_material_chips__WEBPACK_IMPORTED_MODULE_17__.MatChipList, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_material_chips__WEBPACK_IMPORTED_MODULE_17__.MatChip, _angular_material_icon__WEBPACK_IMPORTED_MODULE_18__.MatIcon, _angular_material_chips__WEBPACK_IMPORTED_MODULE_17__.MatChipRemove, _angular_material_chips__WEBPACK_IMPORTED_MODULE_17__.MatChipInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatError, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_19__.MatSlideToggle, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControlName, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_20__.MatTooltip, _angular_material_input__WEBPACK_IMPORTED_MODULE_21__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.RequiredValidator, _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_22__.AngularEditorComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterLinkWithHref, _angular_material_button__WEBPACK_IMPORTED_MODULE_23__.MatButton],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYWlsYm94LWNyZWF0ZS5jb21wb25lbnQuY3NzIn0= */"]
});

/***/ }),

/***/ 38656:
/*!********************************************************************!*\
  !*** ./src/app/_pages/create/news-create/news-create.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsCreateComponent": () => (/* binding */ NewsCreateComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 54363);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/page-info.service */ 18745);
/* harmony import */ var _shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/imgbb.service */ 67902);
/* harmony import */ var _shared_services_news_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/news.service */ 49618);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/chips */ 81196);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var _shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/pipes/bytes.pipe */ 23626);
























function NewsCreateComponent_form_4_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "bytes");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("Ukuran Upload Melebihi Batas ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, ctx_r2.imageLimitExceeded), " !");
  }
}

function NewsCreateComponent_form_4_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r3.imageErrorText);
  }
}

function NewsCreateComponent_form_4_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 2)(1, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NewsCreateComponent_form_4_div_23_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return ctx_r9.submitImage();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "add_photo_alternate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, " Unggah ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r4.submitted);
  }
}

function NewsCreateComponent_form_4_div_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Judul Berita Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}

function NewsCreateComponent_form_4_div_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Judul Berita Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}

function NewsCreateComponent_form_4_mat_chip_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mat-chip", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("removed", function NewsCreateComponent_form_4_mat_chip_40_Template_mat_chip_removed_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r13);
      const t_r11 = restoredCtx.$implicit;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return ctx_r12.removeTag(t_r11);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "mat-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const t_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("removable", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", t_r11, " ");
  }
}

function NewsCreateComponent_form_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "form", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("submit", function NewsCreateComponent_form_4_Template_form_submit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r14.onSubmit();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 5)(2, "div", 6)(3, "h2", 7)(4, "b", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5, "Tambah Data Berita & Informasi Baru");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 2)(7, "div", 9)(8, "div", 10)(9, "div", 9)(10, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](11, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "mat-form-field", 12)(13, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](14, "Gambar");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "ngx-mat-file-input", 13, 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function NewsCreateComponent_form_4_Template_ngx_mat_file_input_change_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r15);

      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](16);

      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r16.uploadImage($event, _r1);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](17, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](18, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "mat-error", 16)(20, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](21, NewsCreateComponent_form_4_div_21_Template, 3, 3, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](22, NewsCreateComponent_form_4_div_22_Template, 2, 1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](23, NewsCreateComponent_form_4_div_23_Template, 5, 1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](24, "div", 19)(25, "div", 9)(26, "mat-form-field", 20)(27, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](28, "Judul");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](29, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](30, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](31, "wysiwyg");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](32, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](33, NewsCreateComponent_form_4_div_33_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](34, NewsCreateComponent_form_4_div_34_Template, 2, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](35, "mat-form-field", 20)(36, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](37, "Tags & Kategori");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](38, "mat-chip-list", null, 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](40, NewsCreateComponent_form_4_mat_chip_40_Template, 4, 2, "mat-chip", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](41, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("matChipInputTokenEnd", function NewsCreateComponent_form_4_Template_input_matChipInputTokenEnd_41_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r15);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r17.addTag($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](42, "mat-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](43, "loyalty");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](44, "mat-hint", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](45, "Isi Dengan Bebas, Pisahkan Dengan Koma");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](46, "angular-editor", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](47, "div", 9)(48, "div", 2)(49, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](50, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](51, "div", 29)(52, "a", 30)(53, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](54, "undo");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](55, " Batal ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](56, "div", 29)(57, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](58, " Simpan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](59, "mat-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](60, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()()()()();
  }

  if (rf & 2) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](39);

    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("formGroup", ctx_r0.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("src", ctx_r0.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r0.fg.value.image)("accept", "image/gif, image/jpeg, image/jpg, image/png");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.imageLimitExceeded);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.imageErrorText);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.image && !ctx_r0.fg.value.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("title").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("title").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r0.fg.value.tags);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("matChipInputSeparatorKeyCodes", ctx_r0.GS.separatorKeysCodes)("matChipInputFor", _r7)("matChipInputAddOnBlur", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("config", ctx_r0.GS.angularEditorConfig);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r0.submitted);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r0.submitted || ctx_r0.fg.invalid);
  }
}

class NewsCreateComponent {
  constructor(fb, router, bs, pi, imgbb, news, gs, ds) {
    this.fb = fb;
    this.router = router;
    this.bs = bs;
    this.pi = pi;
    this.imgbb = imgbb;
    this.news = news;
    this.gs = gs;
    this.ds = ds;
    this.submitted = false;
    this.image = null;
    this.imageErrorText = null;
    this.imageLimitExceeded = null;
    this.image_url = '/assets/img/form/no-image.png';
    this.gambar = null;
    this.subsNews = null;
    this.subsImgbb = null;
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get GS() {
    return this.gs;
  }

  ngOnInit() {
    this.pi.updatePageMetaData(`Informasi - Buat Baru`, `Halaman Menambahkan Berita Baru`, `Create News`);

    if (this.gs.isBrowser) {
      this.initForm();
    }
  }

  ngOnDestroy() {
    var _a, _b;

    (_a = this.subsImgbb) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsNews) === null || _b === void 0 ? void 0 : _b.unsubscribe();
  }

  canDeactivate() {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const closeDialog = yield _this.ds.leavePageDialog();
      return yield (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.firstValueFrom)(closeDialog);
    })();
  }

  initForm() {
    this.fg = this.fb.group({
      title: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      content: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      image: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])],
      tags: [[], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([])]
    });
  }

  uploadImage(event, gambar) {
    this.gambar = gambar;
    this.image = null;
    this.imageLimitExceeded = null;
    this.imageErrorText = null;
    this.fg.controls['image'].patchValue(null);
    const file = event.target.files[0];

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = e => {
        this.gs.log('[IMAGE_SELECTED]', e);

        if (file.size <= _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit) {
          const img = this.gs.document.createElement('img');

          img.onload = () => {
            this.image = file;
            this.image_url = reader.result.toString();
          };

          img.src = reader.result.toString();
        } else {
          this.image = null;
          this.image_url = '/assets/img/form/image-error.png';
          this.imageLimitExceeded = _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.fileSizeImageLimit;
          this.gambar.clear(event);
        }
      };
    } catch (error) {
      this.image = null;
      this.image_url = '/assets/img/form/no-image.png';
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
        this.submitted = false;
      },
      error: err => {
        var _a;

        this.gs.log('[IMAGE_ERROR]', err, 'error');
        this.fg.controls['image'].patchValue(null);
        this.submitted = false;
        this.imageErrorText = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
      }
    });
  }

  onSubmit() {
    this.bs.busy();
    this.submitted = true;

    if (this.fg.invalid) {
      this.submitted = false;
      this.bs.idle();
      return;
    }

    this.subsNews = this.news.createNews({
      image: this.fg.value.image,
      title: this.fg.value.title,
      content: this.fg.value.content,
      tags: this.fg.value.tags
    }).subscribe({
      next: res => {
        this.gs.log('[NEWS_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();
        this.router.navigateByUrl('/news', {
          state: {
            bypassCanDeactivate: true
          }
        });
      },
      error: err => {
        this.gs.log('[NEWS_CREATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
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

    this.fg.controls['tags'].patchValue(this.fg.value.tags.filter((a, b, c) => c.findIndex(d => d === a) === b));
  }

  removeTag(tag) {
    const index = this.fg.value.tags.indexOf(tag);

    if (index >= 0) {
      this.fg.value.tags.splice(index, 1);
    }
  }

}

NewsCreateComponent.ɵfac = function NewsCreateComponent_Factory(t) {
  return new (t || NewsCreateComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_page_info_service__WEBPACK_IMPORTED_MODULE_3__.PageInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_4__.ImgbbService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_news_service__WEBPACK_IMPORTED_MODULE_5__.NewsService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_7__.DialogService));
};

NewsCreateComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: NewsCreateComponent,
  selectors: [["app-news-create"]],
  decls: 5,
  vars: 1,
  consts: [[1, "container"], [1, "row", "px-3"], [1, "col-12"], [3, "formGroup", "submit", 4, "ngIf"], [3, "formGroup", "submit"], [1, "row", "mt-3", "mb-3"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "row"], [1, "col-12", "col-md-5", "col-xl-4", "p-3"], [1, "w-100", "border", 3, "src"], ["appearance", "outline", 1, "pt-3", "w-100", 3, "color"], [1, "w-100", 3, "disabled", "accept", "change"], ["gambar", ""], ["matSuffix", ""], [1, "px-3", "w-100"], [4, "ngIf"], ["class", "col-12", 4, "ngIf"], [1, "col-12", "col-md-7", "col-xl-8", "pt-3"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["matInput", "", "formControlName", "title", "placeholder", "Berita Terkini Blablabla ...", "required", ""], ["tag", ""], ["color", "accent", "selected", "", 3, "removable", "removed", 4, "ngFor", "ngForOf"], ["placeholder", "Label Tag / Kategori", 3, "matChipInputSeparatorKeyCodes", "matChipInputFor", "matChipInputAddOnBlur", "matChipInputTokenEnd"], ["align", "end"], ["formControlName", "content", "required", "", 1, "p-3", "w-100", 3, "config"], [1, "row", "gy-3"], [1, "col", "g-0"], [1, "col-12", "col-md-3"], ["mat-stroked-button", "", "routerLink", "/news", 1, "w-100", 3, "disabled"], [1, "me-1"], ["type", "submit", "mat-flat-button", "", "color", "accent", 1, "w-100", 3, "disabled"], [1, "ms-1"], ["type", "button", "mat-raised-button", "", "color", "primary", 1, "w-100", 3, "disabled", "click"], ["color", "accent", "selected", "", 3, "removable", "removed"], ["matChipRemove", ""]],
  template: function NewsCreateComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, NewsCreateComponent_form_4_Template, 61, 19, "form", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.fg);
    }
  },
  directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_8__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatLabel, ngx_material_file_input__WEBPACK_IMPORTED_MODULE_16__.FileInputComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_17__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatError, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_19__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.RequiredValidator, _angular_material_chips__WEBPACK_IMPORTED_MODULE_20__.MatChipList, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _angular_material_chips__WEBPACK_IMPORTED_MODULE_20__.MatChip, _angular_material_chips__WEBPACK_IMPORTED_MODULE_20__.MatChipRemove, _angular_material_chips__WEBPACK_IMPORTED_MODULE_20__.MatChipInput, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_15__.MatHint, _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_21__.AngularEditorComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatAnchor, _angular_router__WEBPACK_IMPORTED_MODULE_13__.RouterLinkWithHref],
  pipes: [_shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_9__.BytesPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuZXdzLWNyZWF0ZS5jb21wb25lbnQuY3NzIn0= */"]
});

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


/***/ }),

/***/ 47772:
/*!****************************************************!*\
  !*** ./src/app/_shared/guards/leave-page.guard.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeavePageGuard": () => (/* binding */ LeavePageGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/global.service */ 80855);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 52816);



class LeavePageGuard {
    constructor(gs, router) {
        this.gs = gs;
        this.router = router;
        if (this.gs.isBrowser) {
            //
        }
    }
    canDeactivate(component) {
        var _a, _b, _c;
        if ((_c = (_b = (_a = this.router.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.extras) === null || _b === void 0 ? void 0 : _b.state) === null || _c === void 0 ? void 0 : _c['bypassCanDeactivate']) {
            return true;
        }
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}
LeavePageGuard.ɵfac = function LeavePageGuard_Factory(t) { return new (t || LeavePageGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
LeavePageGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: LeavePageGuard, factory: LeavePageGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 54363:
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/firstValueFrom.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "firstValueFrom": () => (/* binding */ firstValueFrom)
/* harmony export */ });
/* harmony import */ var _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/EmptyError */ 14423);
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Subscriber */ 19904);


function firstValueFrom(source, config) {
    const hasConfig = typeof config === 'object';
    return new Promise((resolve, reject) => {
        const subscriber = new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.SafeSubscriber({
            next: (value) => {
                resolve(value);
                subscriber.unsubscribe();
            },
            error: reject,
            complete: () => {
                if (hasConfig) {
                    resolve(config.defaultValue);
                }
                else {
                    reject(new _util_EmptyError__WEBPACK_IMPORTED_MODULE_1__.EmptyError());
                }
            },
        });
        source.subscribe(subscriber);
    });
}


/***/ })

}]);
//# sourceMappingURL=src_app__pages_create_create_module_ts.js.map