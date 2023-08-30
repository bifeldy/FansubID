"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_admin_admin_module_ts"],{

/***/ 38678:
/*!*******************************************************************************!*\
  !*** ./src/app/_pages/admin/admin-list-banned/admin-list-banned.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminListBannedComponent": () => (/* binding */ AdminListBannedComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../models/req-res.model */ 14249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/admin.service */ 10466);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/components/material-table/material-table.component */ 30578);












class AdminListBannedComponent {
  constructor(router, adm, bs, ds, gs, as) {
    this.router = router;
    this.adm = adm;
    this.bs = bs;
    this.ds = ds;
    this.gs = gs;
    this.as = as;
    this.subsBannedGet = null;
    this.subsBannedDelete = null;
    this.subsDialog = null;
    this.count = 0;
    this.page = 1;
    this.row = 10;
    this.q = '';
    this.sort = '';
    this.order = '';
    this.bannedData = {
      column: ['Id', 'Korban', 'Alasan', 'Pelaku', 'Aksi'],
      row: []
    };
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit() {
    if (this.gs.isBrowser) {
      this.getBan();
    }
  }

  ngOnDestroy() {
    var _a, _b, _c;

    (_a = this.subsBannedGet) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsBannedDelete) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsDialog) === null || _c === void 0 ? void 0 : _c.unsubscribe();
  }

  getBan() {
    this.bs.busy();

    if (this.subsBannedGet) {
      this.subsBannedGet.unsubscribe();
      this.bs.idle();
    }

    this.subsBannedGet = this.adm.getAllBanned(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        var _a, _b, _c, _d;

        this.gs.log('[BANNED_LIST_SUCCESS]', res);
        this.count = res.count;
        const bannedDataRow = [];
        let excludedRole = [];

        if (((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.ADMIN) {
          excludedRole = [_models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.ADMIN];
        } else {
          excludedRole = [_models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.MODERATOR];
        }

        for (const r of res.results) {
          bannedDataRow.push({
            Id: r.id,
            foto_korban: r.user_.image_url,
            foto_pelaku: ((_c = r.banned_by_) === null || _c === void 0 ? void 0 : _c.image_url) || `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseUrl}/assets/img/favicon.png`,
            Korban: r.user_.username,
            Pelaku: ((_d = r.banned_by_) === null || _d === void 0 ? void 0 : _d.username) || 'AUTO_BANNED',
            Alasan: r.reason,
            Aksi: [...(this.gs.includesOneOf(r.user_.role, excludedRole) ? [] : [{
              type: 'button',
              icon: 'lock_open',
              name: 'UnBAN',
              row: r
            }])]
          });
        }

        this.bannedData.row = bannedDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[BANNED_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  action(data) {
    this.gs.log('[BANNED_LIST_CLICK_AKSI]', data);

    if (data.name === 'UnBAN') {
      this.unBan(data.row);
    } // TODO :: Other Action

  }

  unBan(data) {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.gs.log('[BANNED_LIST_CLICK_UNBAN]', data);

      _this.subsDialog = (yield _this.ds.openKonfirmasiDialog(`UnBAN Akun -- '${data.user_.username}'`, 'Apakah Yakin Dan Akun Telah Direview Sebelum UnBAN ?')).afterClosed().subscribe({
        next: re => {
          _this.gs.log('[INFO_DIALOG_CLOSED]', re);

          if (re === true) {
            _this.bs.busy();

            _this.subsBannedDelete = _this.adm.unBan(data.id).subscribe({
              next: res => {
                _this.gs.log('[BANNED_LIST_CLICK_UNBAN_SUCCESS]', res);

                _this.bs.idle();

                _this.getBan();
              },
              error: err => {
                _this.gs.log('[BANNED_LIST_CLICK_UNBAN_ERROR]', err, 'error');

                _this.bs.idle();

                _this.getBan();
              }
            });
          } else if (re === false) {
            _this.getBan();
          }

          _this.subsDialog.unsubscribe();
        }
      });
    })();
  }

  onPaginatorClicked(data) {
    this.gs.log('[BANNED_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getBan();
  }

  onServerSideFilter(data) {
    this.gs.log('[BANNED_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getBan();
  }

  onServerSideOrder(data) {
    this.gs.log('[BANNED_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getBan();
  }

  openBan(data) {
    this.gs.log('[BANNED_LIST_CLICK_BANNED]', data);
    this.router.navigateByUrl(`/user/${data.Korban}`);
  }

}

AdminListBannedComponent.ɵfac = function AdminListBannedComponent_Factory(t) {
  return new (t || AdminListBannedComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_admin_service__WEBPACK_IMPORTED_MODULE_3__.AdminService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_4__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_5__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_7__.AuthService));
};

AdminListBannedComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: AdminListBannedComponent,
  selectors: [["app-admin-list-banned"]],
  decls: 11,
  vars: 4,
  consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12", "p-3"], [3, "tableDataColumn", "tableDataRow", "count", "serverSide", "serverSideFilter", "buttonClicked", "paginatorClicked", "serverSideOrder", "rowClicked"]],
  template: function AdminListBannedComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "h2", 5)(7, "b", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](8, "User Yang Terkena BAN");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "div", 7)(10, "app-material-table", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("serverSideFilter", function AdminListBannedComponent_Template_app_material_table_serverSideFilter_10_listener($event) {
        return ctx.onServerSideFilter($event);
      })("buttonClicked", function AdminListBannedComponent_Template_app_material_table_buttonClicked_10_listener($event) {
        return ctx.action($event);
      })("paginatorClicked", function AdminListBannedComponent_Template_app_material_table_paginatorClicked_10_listener($event) {
        return ctx.onPaginatorClicked($event);
      })("serverSideOrder", function AdminListBannedComponent_Template_app_material_table_serverSideOrder_10_listener($event) {
        return ctx.onServerSideOrder($event);
      })("rowClicked", function AdminListBannedComponent_Template_app_material_table_rowClicked_10_listener($event) {
        return ctx.openBan($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("tableDataColumn", ctx.bannedData.column)("tableDataRow", ctx.bannedData.row)("count", ctx.count)("serverSide", true);
    }
  },
  directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_8__.NotificationsComponent, _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_9__.MaterialTableComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1saXN0LWJhbm5lZC5jb21wb25lbnQuY3NzIn0= */"]
});

/***/ }),

/***/ 5907:
/*!***************************************************************************!*\
  !*** ./src/app/_pages/admin/admin-list-cors/admin-list-cors.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminListCorsComponent": () => (/* binding */ AdminListCorsComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/admin.service */ 10466);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/material-table/material-table.component */ 30578);









class AdminListCorsComponent {
  constructor(bs, ds, gs, adm) {
    this.bs = bs;
    this.ds = ds;
    this.gs = gs;
    this.adm = adm;
    this.subsCorsGet = null;
    this.subsCorsDelete = null;
    this.subsDialog = null;
    this.count = 0;
    this.page = 1;
    this.row = 10;
    this.q = '';
    this.sort = '';
    this.order = '';
    this.corsData = {
      column: ['Id', 'Nama Api', 'IP Domain', 'Api Key', 'Pemilik', 'Aksi'],
      row: []
    };
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit() {
    if (this.gs.isBrowser) {
      this.getCors();
    }
  }

  ngOnDestroy() {
    var _a, _b, _c;

    (_a = this.subsCorsGet) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsCorsDelete) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsDialog) === null || _c === void 0 ? void 0 : _c.unsubscribe();
  }

  getCors() {
    this.bs.busy();

    if (this.subsCorsGet) {
      this.subsCorsGet.unsubscribe();
      this.bs.idle();
    }

    this.subsCorsGet = this.adm.getAllCors(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        var _a, _b;

        this.gs.log('[CORS_LIST_SUCCESS]', res);
        this.count = res.count;
        const corsDataRow = [];

        for (const r of res.results) {
          corsDataRow.push({
            Id: r.id,
            'Nama Api': r.name,
            'IP Domain': r.ip_domain,
            'Api Key': r.api_key,
            foto: ((_a = r.user_) === null || _a === void 0 ? void 0 : _a.image_url) || `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseUrl}/assets/img/favicon.png`,
            Pemilik: ((_b = r.user_) === null || _b === void 0 ? void 0 : _b.username) || 'SYSTEM',
            Aksi: [{
              type: 'button',
              icon: 'layers_clear',
              name: 'Revoke',
              row: r
            }]
          });
        }

        this.corsData.row = corsDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[CORS_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  action(data) {
    this.gs.log('[CORS_LIST_CLICK_AKSI]', data);

    if (data.name === 'Revoke') {
      this.revokeCors(data.row);
    } // TODO :: Other Action

  }

  revokeCors(data) {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.gs.log('[CORS_LIST_CLICK_REVOKE]', data);

      _this.subsDialog = (yield _this.ds.openKonfirmasiDialog(`Revoke Kunci -- '${data.id}' :: '${data.ip_domain}'`, 'Apakah Yakin Untuk Menonaktifkan Kunci Ini ?')).afterClosed().subscribe({
        next: re => {
          _this.gs.log('[INFO_DIALOG_CLOSED]', re);

          if (re === true) {
            _this.bs.busy();

            _this.subsCorsDelete = _this.adm.revokeCors(data.id).subscribe({
              next: res => {
                _this.gs.log('[CORS_LIST_CLICK_REVOKE_SUCCESS]', res);

                _this.bs.idle();

                _this.getCors();
              },
              error: err => {
                _this.gs.log('[CORS_LIST_CLICK_REVOKE_ERROR]', err, 'error');

                _this.bs.idle();

                _this.getCors();
              }
            });
          } else if (re === false) {
            _this.getCors();
          }

          _this.subsDialog.unsubscribe();
        }
      });
    })();
  }

  onPaginatorClicked(data) {
    this.gs.log('[CORS_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getCors();
  }

  onServerSideFilter(data) {
    this.gs.log('[CORS_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getCors();
  }

  onServerSideOrder(data) {
    this.gs.log('[CORS_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getCors();
  }

  openCors(data) {
    this.gs.log('[CORS_LIST_CLICK_CORS]', data);
  }

}

AdminListCorsComponent.ɵfac = function AdminListCorsComponent_Factory(t) {
  return new (t || AdminListCorsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_3__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_admin_service__WEBPACK_IMPORTED_MODULE_5__.AdminService));
};

AdminListCorsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: AdminListCorsComponent,
  selectors: [["app-admin-list-cors"]],
  decls: 11,
  vars: 4,
  consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12", "p-3"], [3, "tableDataColumn", "tableDataRow", "count", "serverSide", "serverSideFilter", "buttonClicked", "paginatorClicked", "serverSideOrder", "rowClicked"]],
  template: function AdminListCorsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "h2", 5)(7, "b", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "Kelola API Key");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "div", 7)(10, "app-material-table", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("serverSideFilter", function AdminListCorsComponent_Template_app_material_table_serverSideFilter_10_listener($event) {
        return ctx.onServerSideFilter($event);
      })("buttonClicked", function AdminListCorsComponent_Template_app_material_table_buttonClicked_10_listener($event) {
        return ctx.action($event);
      })("paginatorClicked", function AdminListCorsComponent_Template_app_material_table_paginatorClicked_10_listener($event) {
        return ctx.onPaginatorClicked($event);
      })("serverSideOrder", function AdminListCorsComponent_Template_app_material_table_serverSideOrder_10_listener($event) {
        return ctx.onServerSideOrder($event);
      })("rowClicked", function AdminListCorsComponent_Template_app_material_table_rowClicked_10_listener($event) {
        return ctx.openCors($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("tableDataColumn", ctx.corsData.column)("tableDataRow", ctx.corsData.row)("count", ctx.count)("serverSide", true);
    }
  },
  directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__.NotificationsComponent, _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_7__.MaterialTableComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1saXN0LWNvcnMuY29tcG9uZW50LmNzcyJ9 */"]
});

/***/ }),

/***/ 74929:
/*!*************************************************************************!*\
  !*** ./src/app/_pages/admin/admin-list-ddl/admin-list-ddl.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminListDdlComponent": () => (/* binding */ AdminListDdlComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_ddl_lampiran_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/ddl-lampiran.service */ 40197);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/slide-toggle */ 6623);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/material-table/material-table.component */ 30578);











class AdminListDdlComponent {
  constructor(dls, bs, ds, gs) {
    this.dls = dls;
    this.bs = bs;
    this.ds = ds;
    this.gs = gs;
    this.subsAttachmentGet = null;
    this.subsAttachmentReUpload = null;
    this.subsDialog = null;
    this.count = 0;
    this.page = 1;
    this.row = 10;
    this.q = '';
    this.sort = '';
    this.order = '';
    this.attachmentData = {
      column: ['Nama Lampiran', 'Ext', 'Size', 'Mime', 'Tanggal', 'Pemilik', 'Aksi'],
      row: []
    };
    this.failed = true;
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit() {
    if (this.gs.isBrowser) {
      this.getAttachment();
    }
  }

  ngOnDestroy() {
    var _a, _b, _c;

    (_a = this.subsAttachmentGet) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsAttachmentReUpload) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsDialog) === null || _c === void 0 ? void 0 : _c.unsubscribe();
  }

  getAttachment() {
    this.bs.busy();

    if (this.subsAttachmentGet) {
      this.subsAttachmentGet.unsubscribe();
      this.bs.idle();
    }

    this.subsAttachmentGet = this.dls.getAttachmentNotUploaded(this.q, this.page, this.row, this.sort, this.order, this.failed).subscribe({
      next: res => {
        var _a, _b, _c, _d, _e, _f;

        this.gs.log('[LAMPIRAN_PENDING_LIST_SUCCESS]', res);
        this.count = res.count;
        const attachmentDataRow = [];

        for (const r of res.results) {
          attachmentDataRow.push({
            foto: ((_a = r.user_) === null || _a === void 0 ? void 0 : _a.image_url) || ((_c = (_b = r.parent_attachment_) === null || _b === void 0 ? void 0 : _b.user_) === null || _c === void 0 ? void 0 : _c.image_url) || `${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.baseUrl}/assets/img/favicon.png`,
            pending: r.pending,
            'Nama Lampiran': r.name,
            Ext: r.ext,
            Size: r.size,
            Mime: r.mime,
            Tanggal: r.created_at,
            Pemilik: ((_d = r.user_) === null || _d === void 0 ? void 0 : _d.username) || ((_f = (_e = r.parent_attachment_) === null || _e === void 0 ? void 0 : _e.user_) === null || _f === void 0 ? void 0 : _f.username) || 'SYSTEM',
            Aksi: r.pending || r.discord || r.google_drive ? [] : [{
              type: 'button',
              icon: 'cloud_upload',
              name: 'ReUpload',
              row: r
            }]
          });
        }

        this.attachmentData.row = attachmentDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[LAMPIRAN_PENDING_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  action(data) {
    this.gs.log('[LAMPIRAN_LIST_CLICK_AKSI]', data);

    if (data.name === 'ReUpload') {
      this.reUpload(data.row);
    } // TODO :: Other Action

  }

  reUpload(data) {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.gs.log('[LAMPIRAN_PENDING_LIST_CLICK_REUPLOAD]', data);

      _this.subsDialog = (yield _this.ds.openKonfirmasiDialog('Upload Ulang ?', `
        Id: ${data.id} <br />
        Filename: ${data.name}.${data.ext} <br />
        Size: ${data.size} Bytes <br />
        Mime: ${data.mime} <br />
        Pemilik: ${data.user_.username}
      `)).afterClosed().subscribe({
        next: re => {
          _this.gs.log('[INFO_DIALOG_CLOSED]', re);

          if (re === true) {
            _this.bs.busy();

            _this.subsAttachmentReUpload = _this.dls.reUpload({
              id: data.id
            }).subscribe({
              next: res => {
                _this.gs.log('[LAMPIRAN_PENDING_LIST_CLICK_REUPLOAD_SUCCESS]', res);

                _this.bs.idle();

                _this.getAttachment();
              },
              error: err => {
                _this.gs.log('[LAMPIRAN_PENDING_LIST_CLICK_REUPLOAD_ERROR]', err, 'error');

                _this.bs.idle();

                _this.getAttachment();
              }
            });
          } else if (re === false) {
            _this.getAttachment();
          }

          _this.subsDialog.unsubscribe();
        }
      });
    })();
  }

  onPaginatorClicked(data) {
    this.gs.log('[LAMPIRAN_PENDING_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getAttachment();
  }

  onServerSideFilter(data) {
    this.gs.log('[LAMPIRAN_PENDING_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getAttachment();
  }

  onServerSideOrder(data) {
    this.gs.log('[LAMPIRAN_PENDING_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getAttachment();
  }

}

AdminListDdlComponent.ɵfac = function AdminListDdlComponent_Factory(t) {
  return new (t || AdminListDdlComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_ddl_lampiran_service__WEBPACK_IMPORTED_MODULE_2__.DdlLampiranService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_5__.GlobalService));
};

AdminListDdlComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: AdminListDdlComponent,
  selectors: [["app-admin-list-ddl"]],
  decls: 15,
  vars: 5,
  consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row", "my-4"], [1, "col-12", "text-end", "text-success"], ["labelPosition", "before", 3, "ngModel", "ngModelChange", "change"], [1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12", "p-3"], [3, "tableDataColumn", "tableDataRow", "count", "serverSide", "serverSideFilter", "buttonClicked", "paginatorClicked", "serverSideOrder"]],
  template: function AdminListDdlComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "mat-slide-toggle", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function AdminListDdlComponent_Template_mat_slide_toggle_ngModelChange_6_listener($event) {
        return ctx.failed = $event;
      })("change", function AdminListDdlComponent_Template_mat_slide_toggle_change_6_listener() {
        return ctx.getAttachment();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, " Tampilkan Yang Tidak Selesai Saja ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 6)(9, "div", 7)(10, "h2", 8)(11, "b", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "Kelola Berkas DDL");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 10)(14, "app-material-table", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("serverSideFilter", function AdminListDdlComponent_Template_app_material_table_serverSideFilter_14_listener($event) {
        return ctx.onServerSideFilter($event);
      })("buttonClicked", function AdminListDdlComponent_Template_app_material_table_buttonClicked_14_listener($event) {
        return ctx.action($event);
      })("paginatorClicked", function AdminListDdlComponent_Template_app_material_table_paginatorClicked_14_listener($event) {
        return ctx.onPaginatorClicked($event);
      })("serverSideOrder", function AdminListDdlComponent_Template_app_material_table_serverSideOrder_14_listener($event) {
        return ctx.onServerSideOrder($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.failed);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("tableDataColumn", ctx.attachmentData.column)("tableDataRow", ctx.attachmentData.row)("count", ctx.count)("serverSide", true);
    }
  },
  directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__.NotificationsComponent, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_9__.MatSlideToggle, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_7__.MaterialTableComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1saXN0LWRkbC5jb21wb25lbnQuY3NzIn0= */"]
});

/***/ }),

/***/ 96142:
/*!*****************************************************************************!*\
  !*** ./src/app/_pages/admin/admin-list-email/admin-list-email.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminListEmailComponent": () => (/* binding */ AdminListEmailComponent)
/* harmony export */ });
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_mail_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/mail.service */ 27358);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/material-table/material-table.component */ 30578);








class AdminListEmailComponent {
    constructor(bs, gs, ms, ds) {
        this.bs = bs;
        this.gs = gs;
        this.ms = ms;
        this.ds = ds;
        this.subsAllMail = null;
        this.subsDialog = null;
        this.subsMail = null;
        this.count = 0;
        this.page = 1;
        this.row = 10;
        this.q = '';
        this.sort = '';
        this.order = '';
        this.mailData = {
            column: ['Tanggal', 'Pengirim', 'Penerima', 'Topik', 'Lampiran'],
            row: []
        };
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getAllMail();
        }
    }
    ngOnDestroy() {
        var _a, _b, _c;
        (_a = this.subsAllMail) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsDialog) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.subsMail) === null || _c === void 0 ? void 0 : _c.unsubscribe();
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
    filterLampiran(attachment) {
        let lampiran = '';
        if (attachment) {
            for (const a of attachment) {
                if (lampiran) {
                    lampiran += ', ';
                }
                lampiran += `
          <a href="${_environments_app_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/attachment/${a.id}?ngsw-bypass=true" target="_blank">
            ${a.name}.${a.ext} (${a.size} Bytes)
          </a>
        `;
            }
        }
        return lampiran;
    }
    getAllMail() {
        this.bs.busy();
        if (this.subsMail) {
            this.subsMail.unsubscribe();
            this.bs.idle();
        }
        this.subsAllMail = this.ms.getAllMail(this.q, this.page, this.row, this.sort, this.order).subscribe({
            next: res => {
                this.gs.log('[MAIL_LIST_SUCCESS]', res);
                this.count = res.count;
                this.mailData.row = [];
                for (const r of res.results) {
                    this.mailData.row.push({
                        id: r.id,
                        Tanggal: r.date,
                        Pengirim: this.filterAddress(r.from),
                        Penerima: this.filterAddress(r.to),
                        Topik: r.subject,
                        Lampiran: `${r.attachment_count} Berkas`
                    });
                }
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[MAIL_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    getMail(mailId) {
        this.subsMail = this.ms.getMail(mailId).subscribe({
            next: res => {
                this.gs.log('[MAIL_DETAIL_SUCCESS]', res);
                this.bs.idle();
                this.subsDialog = this.ds.openInfoDialog({
                    data: {
                        title: res.result.subject,
                        htmlMessage: `
              From: ${this.filterAddress(res.result.from)}
              <br />
              To: ${this.filterAddress(res.result.to)}
              <br />
              Cc: ${this.filterAddress(res.result.cc)}
              <br />
              Bcc: ${this.filterAddress(res.result.bcc)}
              <br /> <br />
              Date: ${new Date(res.result.date)}
              <br />
              Lampiran: ${this.filterLampiran(res.result.attachment_)}
              <hr class="my-3">
              ${res.result.html || res.result.text}
            `,
                        confirmText: 'Tutup',
                        infoText: res.result.id
                    },
                    disableClose: false
                }).afterClosed().subscribe({
                    next: r => {
                        this.gs.log('[INFO_DIALOG_CLOSED]', r);
                        this.getAllMail();
                        this.subsDialog.unsubscribe();
                    }
                });
            },
            error: err => {
                this.gs.log('[MAIL_DETAIL_ERROR]', err, 'error');
                this.bs.idle();
                this.getAllMail();
            }
        });
    }
    onRowClicked(data) {
        this.gs.log('[MAIL_LIST_CLICK_EMAIL]', data);
        this.getMail(data.id);
    }
    onPaginatorClicked(data) {
        this.gs.log('[MAIL_LIST_CLICK_PAGINATOR]', data);
        this.page = data.pageIndex + 1;
        this.row = data.pageSize;
        this.getAllMail();
    }
    onServerSideFilter(data) {
        this.gs.log('[MAIL_LIST_ENTER_FILTER]', data);
        this.q = data;
        this.getAllMail();
    }
    onServerSideOrder(data) {
        this.gs.log('[MAIL_LIST_CLICK_ORDER]', data);
        this.q = data.q;
        this.sort = data.active;
        if (this.sort === 'created_at') {
            this.sort = 'date';
        }
        else if (this.sort === 'title') {
            this.sort = 'subject';
        }
        this.order = data.direction;
        this.getAllMail();
    }
}
AdminListEmailComponent.ɵfac = function AdminListEmailComponent_Factory(t) { return new (t || AdminListEmailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_2__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_mail_service__WEBPACK_IMPORTED_MODULE_3__.MailService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__.DialogService)); };
AdminListEmailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: AdminListEmailComponent, selectors: [["app-admin-list-email"]], decls: 11, vars: 4, consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12", "p-3"], [3, "tableDataColumn", "tableDataRow", "count", "serverSide", "serverSideFilter", "rowClicked", "paginatorClicked", "serverSideOrder"]], template: function AdminListEmailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "h2", 5)(7, "b", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, "Semua Email Pengguna");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 7)(10, "app-material-table", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("serverSideFilter", function AdminListEmailComponent_Template_app_material_table_serverSideFilter_10_listener($event) { return ctx.onServerSideFilter($event); })("rowClicked", function AdminListEmailComponent_Template_app_material_table_rowClicked_10_listener($event) { return ctx.onRowClicked($event); })("paginatorClicked", function AdminListEmailComponent_Template_app_material_table_paginatorClicked_10_listener($event) { return ctx.onPaginatorClicked($event); })("serverSideOrder", function AdminListEmailComponent_Template_app_material_table_serverSideOrder_10_listener($event) { return ctx.onServerSideOrder($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("tableDataColumn", ctx.mailData.column)("tableDataRow", ctx.mailData.row)("count", ctx.count)("serverSide", true);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_5__.NotificationsComponent, _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_6__.MaterialTableComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1saXN0LWVtYWlsLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ 2717:
/*!*********************************************************************************************!*\
  !*** ./src/app/_pages/admin/admin-list-fansub-member/admin-list-fansub-member.component.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminListFansubMemberComponent": () => (/* binding */ AdminListFansubMemberComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/fansub.service */ 76781);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/material-table/material-table.component */ 30578);








class AdminListFansubMemberComponent {
  constructor(bs, ds, fansub, gs) {
    this.bs = bs;
    this.ds = ds;
    this.fansub = fansub;
    this.gs = gs;
    this.count = 0;
    this.page = 1;
    this.row = 10;
    this.q = '';
    this.sort = '';
    this.order = '';
    this.memberData = {
      column: ['Id', 'Fansub', 'Anggota', 'Keterangan', 'Aksi'],
      row: []
    };
    this.subsMemberGet = null;
    this.subsMemberPut = null;
    this.subsMemberDelete = null;
    this.subsDialog = null;
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit() {
    if (this.gs.isBrowser) {
      this.getFansubMember();
    }
  }

  ngOnDestroy() {
    var _a, _b, _c, _d;

    (_a = this.subsMemberGet) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsMemberPut) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsMemberDelete) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    (_d = this.subsDialog) === null || _d === void 0 ? void 0 : _d.unsubscribe();
  }

  getFansubMember() {
    this.bs.busy();

    if (this.subsMemberGet) {
      this.subsMemberGet.unsubscribe();
      this.bs.idle();
    }

    this.subsMemberGet = this.fansub.getAllFansubMember(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[FANSUB_MEMBER_LIST_SUCCESS]', res);
        const memberDataRow = [];
        this.count = res.count;

        for (const r of res.results) {
          memberDataRow.push({
            foto_fansub: r.fansub_.image_url,
            foto_anggota: r.user_.image_url,
            Id: r.id,
            Fansub: r.fansub_.slug,
            Anggota: r.user_.username,
            Keterangan: r.keterangan,
            Aksi: r.approved ? [{
              type: 'button',
              icon: 'no_meeting_room',
              name: 'KICK',
              row: r
            }] : [{
              type: 'button',
              icon: 'done',
              name: 'ACCEPT',
              row: r
            }, {
              type: 'button',
              icon: 'close',
              name: 'REJECT',
              row: r
            }]
          });
        }

        this.memberData.row = memberDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[FANSUB_MEMBER_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  onPaginatorClicked(data) {
    this.gs.log('[FANSUB_MEMBER_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getFansubMember();
  }

  onServerSideFilter(data) {
    this.gs.log('[FANSUB_MEMBER_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getFansubMember();
  }

  onServerSideOrder(data) {
    this.gs.log('[FANSUB_MEMBER_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getFansubMember();
  }

  action(data) {
    this.gs.log('[FANSUB_MEMBER_LIST_CLICK_AKSI]', data);

    if (data.name === 'KICK') {
      this.kickMember(data.row);
    } else if (data.name === 'ACCEPT') {
      this.approveOrRejectFansubMember(data.row, true);
    } else if (data.name === 'REJECT') {
      this.approveOrRejectFansubMember(data.row, false);
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
          this.subsMemberPut = this.fansub.approveRejectFansubMember(data.id, {
            approved: ac,
            keterangan: (_a = re.keterangan) === null || _a === void 0 ? void 0 : _a.substring(0, 10)
          }).subscribe({
            next: res => {
              this.gs.log('[FANSUB_MEMBER_APPROVE_REJECT_SUCCESS]', res);
              this.getFansubMember();
              this.bs.idle();
            },
            error: err => {
              this.gs.log('[FANSUB_MEMBER_APPROVE_REJECT_ERROR]', err, 'error');
              this.getFansubMember();
              this.bs.idle();
            }
          });
        } else if (re === false) {
          this.getFansubMember();
        }

        this.subsDialog.unsubscribe();
      }
    });
  }

  kickMember(data) {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.subsDialog = (yield _this.ds.openKonfirmasiDialog(`Kick Member -- '${data.user_.username}' :: '${data.fansub_.slug}'`, 'Apakah Yakin Dan Akun Telah Direview Sebelum Dikeluarkan ?')).afterClosed().subscribe({
        next: re => {
          _this.gs.log('[INFO_DIALOG_CLOSED]', re);

          if (re === true) {
            _this.bs.busy();

            _this.subsMemberDelete = _this.fansub.leaveFansubMember(data.id).subscribe({
              next: res => {
                _this.gs.log('[FANSUB_MEMBER_KICK_SUCCESS]', res);

                _this.getFansubMember();

                _this.bs.idle();
              },
              error: err => {
                _this.gs.log('[FANSUB_MEMBER_KICK_ERROR]', err, 'error');

                _this.getFansubMember();

                _this.bs.idle();
              }
            });
          } else if (re === false) {
            _this.getFansubMember();
          }

          _this.subsDialog.unsubscribe();
        }
      });
    })();
  }

}

AdminListFansubMemberComponent.ɵfac = function AdminListFansubMemberComponent_Factory(t) {
  return new (t || AdminListFansubMemberComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_2__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_3__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__.GlobalService));
};

AdminListFansubMemberComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: AdminListFansubMemberComponent,
  selectors: [["app-admin-list-fansub-member"]],
  decls: 11,
  vars: 4,
  consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12", "p-3"], [3, "tableDataColumn", "tableDataRow", "count", "serverSide", "serverSideFilter", "buttonClicked", "paginatorClicked", "serverSideOrder"]],
  template: function AdminListFansubMemberComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "app-notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "h2", 5)(7, "b", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, "Atur Keanggotaan Fansub");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 7)(10, "app-material-table", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("serverSideFilter", function AdminListFansubMemberComponent_Template_app_material_table_serverSideFilter_10_listener($event) {
        return ctx.onServerSideFilter($event);
      })("buttonClicked", function AdminListFansubMemberComponent_Template_app_material_table_buttonClicked_10_listener($event) {
        return ctx.action($event);
      })("paginatorClicked", function AdminListFansubMemberComponent_Template_app_material_table_paginatorClicked_10_listener($event) {
        return ctx.onPaginatorClicked($event);
      })("serverSideOrder", function AdminListFansubMemberComponent_Template_app_material_table_serverSideOrder_10_listener($event) {
        return ctx.onServerSideOrder($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("tableDataColumn", ctx.memberData.column)("tableDataRow", ctx.memberData.row)("count", ctx.count)("serverSide", true);
    }
  },
  directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_5__.NotificationsComponent, _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_6__.MaterialTableComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1saXN0LWZhbnN1Yi1tZW1iZXIuY29tcG9uZW50LmNzcyJ9 */"]
});

/***/ }),

/***/ 41831:
/*!*******************************************************************************************************!*\
  !*** ./src/app/_pages/admin/admin-list-information-dialog/admin-list-information-dialog.component.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminListInformationDialogComponent": () => (/* binding */ AdminListInformationDialogComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_information_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/information.service */ 67745);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/material-table/material-table.component */ 30578);




















function AdminListInformationDialogComponent_form_5_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Kode Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Kode Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Judul Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Judul Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_div_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Tombol OK Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_div_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Tombol OK Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_div_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Judul Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_div_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Judul Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_div_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Mohon Pilih Salah Satu");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_div_60_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Status Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_div_72_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Mohon Pilih Salah Satu");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_div_73_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Status Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListInformationDialogComponent_form_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "form", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("submit", function AdminListInformationDialogComponent_form_5_Template_form_submit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return ctx_r13.onSubmit();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 11)(2, "h2", 6)(3, "b", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Tambah / Ubah Informasi Dialog Pop-Up!");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 2)(6, "div", 3)(7, "mat-form-field", 12)(8, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Kode ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "mat-hint", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "ID Untuk Request API");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](16, AdminListInformationDialogComponent_form_5_div_16_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, AdminListInformationDialogComponent_form_5_div_17_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "mat-form-field", 17)(19, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20, "Judul Dialog");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](21, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](23, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](25, AdminListInformationDialogComponent_form_5_div_25_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](26, AdminListInformationDialogComponent_form_5_div_26_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "div", 3)(28, "div", 19)(29, "div", 3)(30, "mat-form-field", 20)(31, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](32, "Tombol OK");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](33, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](34, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](35, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](36, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](37, AdminListInformationDialogComponent_form_5_div_37_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](38, AdminListInformationDialogComponent_form_5_div_38_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](39, "mat-form-field", 20)(40, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](41, "Tombol Cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](42, "input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](43, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](44, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](45, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](46, AdminListInformationDialogComponent_form_5_div_46_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](47, AdminListInformationDialogComponent_form_5_div_47_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](48, "mat-form-field", 20)(49, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](50, "Cegah Klik Tutup Dimana Saja");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](51, "mat-select", 23)(52, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](53, "Tidak");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](54, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](55, "Ya");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](56, "mat-hint", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](57, "Antisipasi Kesalahan Klik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](58, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](59, AdminListInformationDialogComponent_form_5_div_59_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](60, AdminListInformationDialogComponent_form_5_div_60_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](61, "mat-form-field", 20)(62, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](63, "Langsung Disiarkan Saja");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](64, "mat-select", 26)(65, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](66, "Tidak");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](67, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](68, "Ya");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](69, "mat-hint", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](70, "Live Popup Message Tidak Disimpan");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](71, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](72, AdminListInformationDialogComponent_form_5_div_72_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](73, AdminListInformationDialogComponent_form_5_div_73_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](74, "div", 27)(75, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](76, "angular-editor", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](77, "div", 29)(78, "div", 2)(79, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](80, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](81, "div", 32)(82, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](83, " Simpan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](84, "mat-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](85, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()()();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx_r0.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("id").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("id").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("title").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("title").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("confirm").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("confirm").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("cancel").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("cancel").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("close").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("close").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("broadcast").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("broadcast").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("config", ctx_r0.GS.angularEditorConfig);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r0.submitted || ctx_r0.fg.invalid);
  }
}

class AdminListInformationDialogComponent {
  constructor(fb, bs, ds, gs, info) {
    this.fb = fb;
    this.bs = bs;
    this.ds = ds;
    this.gs = gs;
    this.info = info;
    this.submitted = false;
    this.count = 0;
    this.page = 1;
    this.row = 10;
    this.q = '';
    this.sort = '';
    this.order = '';
    this.infoData = {
      column: ['Id', 'Judul', 'Pemilik', 'Aksi'],
      row: []
    };
    this.subsInfoGet = null;
    this.subsInfoCreateOrUpdate = null;
    this.subsInfoDelete = null;
    this.subsDialog = null;
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit() {
    if (this.gs.isBrowser) {
      this.initForm();
      this.getInfo();
    }
  }

  ngOnDestroy() {
    var _a, _b, _c, _d;

    (_a = this.subsInfoGet) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsInfoCreateOrUpdate) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsInfoDelete) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    (_d = this.subsDialog) === null || _d === void 0 ? void 0 : _d.unsubscribe();
  }

  get GS() {
    return this.gs;
  }

  initForm() {
    this.fg = this.fb.group({
      id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      title: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      content: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      confirm: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      cancel: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      close: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      broadcast: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])]
    });
  }

  getInfo() {
    this.bs.busy();

    if (this.subsInfoGet) {
      this.subsInfoGet.unsubscribe();
      this.bs.idle();
    }

    this.subsInfoGet = this.info.getAllInfo(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[INFORMATION_LIST_SUCCESS]', res);
        this.count = res.count;
        const infoDataRow = [];

        for (const r of res.results) {
          infoDataRow.push({
            content: r.content,
            confirm: r.confirm,
            cancel: r.cancel,
            close: r.close,
            foto: r.user_.image_url,
            Id: r.id,
            Judul: r.title,
            Pemilik: r.user_.username,
            Aksi: [{
              type: 'button',
              icon: 'close',
              name: 'Hapus',
              row: r
            }]
          });
        }

        this.infoData.row = infoDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[INFORMATION_LIST_ERROR]', err, 'error');
        this.bs.idle();
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

    this.subsInfoCreateOrUpdate = this.info.createUpdateInfo({
      id: this.fg.value.id,
      title: this.fg.value.title,
      content: this.fg.value.content,
      confirm: this.fg.value.confirm,
      cancel: this.fg.value.cancel,
      close: this.fg.value.close === '1',
      broadcast: this.fg.value.broadcast === '1'
    }).subscribe({
      next: res => {
        this.gs.log('[INFORMATION_CREATE_UPDATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();

        for (const c in this.fg.controls) {
          if (this.fg.controls[c]) {
            this.fg.controls[c].patchValue(null);
            this.fg.controls[c].updateValueAndValidity();
            this.fg.controls[c].setErrors(null);
            this.fg.controls[c].markAsUntouched();
            this.fg.controls[c].markAsPristine();
          }
        }

        this.getInfo();
      },
      error: err => {
        this.gs.log('[INFORMATION_CREATE_UPDATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
        this.getInfo();
      }
    });
  }

  action(data) {
    this.gs.log('[INFORMMATION_LIST_CLICK_AKSI]', data);

    if (data.name === 'Hapus') {
      this.deleteInfo(data.row);
    } // TODO :: Other Action

  }

  deleteInfo(data) {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.gs.log('[INFORMATION_LIST_CLICK_DELETE]', data);

      _this.subsDialog = (yield _this.ds.openKonfirmasiDialog(`Hapus Info -- '${data.id}' :: '${data.title}'`, 'Yakin Akan Menghapus Informasi Ini ?')).afterClosed().subscribe({
        next: re => {
          _this.gs.log('[INFO_DIALOG_CLOSED]', re);

          if (re === true) {
            _this.bs.busy();

            _this.subsInfoDelete = _this.info.deleteInfo(data.id).subscribe({
              next: res => {
                _this.gs.log('[INFORMATION_LIST_CLICK_DELETE_SUCCESS]', res);

                _this.bs.idle();

                _this.getInfo();
              },
              error: err => {
                _this.gs.log('[INFORMATION_LIST_CLICK_DELETE_ERROR]', err, 'error');

                _this.bs.idle();

                _this.getInfo();
              }
            });
          } else if (re === false) {
            _this.getInfo();
          }

          _this.subsDialog.unsubscribe();
        }
      });
    })();
  }

  onPaginatorClicked(data) {
    this.gs.log('[INFORMATION_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getInfo();
  }

  onServerSideFilter(data) {
    this.gs.log('[INFORMATION_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getInfo();
  }

  onServerSideOrder(data) {
    this.gs.log('[INFORMATION_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getInfo();
  }

  editInfo(data) {
    this.gs.log('[INFORMATION_LIST_CLICK_INFORMATION]', data);
    this.fg.controls['id'].patchValue(data.Id);
    this.fg.controls['title'].patchValue(data.Judul);
    this.fg.controls['content'].patchValue(data.content);
    this.fg.controls['confirm'].patchValue(data.confirm);
    this.fg.controls['cancel'].patchValue(data.cancel);
    this.fg.controls['close'].patchValue(`${+(data === null || data === void 0 ? void 0 : data.close)}`);
    this.fg.controls['broadcast'].patchValue(`${+(data === null || data === void 0 ? void 0 : data.broadcast)}`);
  }

}

AdminListInformationDialogComponent.ɵfac = function AdminListInformationDialogComponent_Factory(t) {
  return new (t || AdminListInformationDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_3__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_information_service__WEBPACK_IMPORTED_MODULE_5__.InformationService));
};

AdminListInformationDialogComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: AdminListInformationDialogComponent,
  selectors: [["app-admin-list-information-dialog"]],
  decls: 13,
  vars: 5,
  consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row"], [3, "formGroup", "submit", 4, "ngIf"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12", "p-3"], [3, "tableDataColumn", "tableDataRow", "count", "serverSide", "serverSideFilter", "buttonClicked", "paginatorClicked", "serverSideOrder", "rowClicked"], [3, "formGroup", "submit"], [1, "col-12", "sticky-top", "bg-bifeldy", "pb-1"], ["appearance", "outline", 1, "p-3", "col-12", "col-md-4", 3, "color"], ["matInput", "", "formControlName", "id", "placeholder", "ID_DIALOG", "required", ""], ["matSuffix", ""], ["align", "end"], [4, "ngIf"], ["appearance", "outline", 1, "p-3", "col-12", "col-md-8", 3, "color"], ["matInput", "", "formControlName", "title", "placeholder", "Judul Dialog", "required", ""], [1, "col-12", "col-md-5", "col-xl-4", "p-3"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["matInput", "", "formControlName", "confirm", "placeholder", "OK!", "required", ""], ["matInput", "", "formControlName", "cancel", "placeholder", "Batal!"], ["formControlName", "close", "placeholder", "Ya / Tidak", "required", ""], ["value", "0"], ["value", "1"], ["formControlName", "broadcast", "placeholder", "Ya / Tidak", "required", ""], [1, "col-12", "col-md-7", "col-xl-8", "pt-3"], ["formControlName", "content", "required", "", 1, "p-3", "w-100", 3, "config"], [1, "row", "mt-3"], [1, "row", "gy-3"], [1, "col", "g-0"], [1, "col-12", "col-md-3"], ["type", "submit", "mat-flat-button", "", "color", "accent", 1, "w-100", 3, "disabled"], [1, "ms-1"]],
  template: function AdminListInformationDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, AdminListInformationDialogComponent_form_5_Template, 86, 21, "form", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 3)(7, "div", 5)(8, "h2", 6)(9, "b", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "Informasi Dialog Pop-Up Tersimpan");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "div", 8)(12, "app-material-table", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("serverSideFilter", function AdminListInformationDialogComponent_Template_app_material_table_serverSideFilter_12_listener($event) {
        return ctx.onServerSideFilter($event);
      })("buttonClicked", function AdminListInformationDialogComponent_Template_app_material_table_buttonClicked_12_listener($event) {
        return ctx.action($event);
      })("paginatorClicked", function AdminListInformationDialogComponent_Template_app_material_table_paginatorClicked_12_listener($event) {
        return ctx.onPaginatorClicked($event);
      })("serverSideOrder", function AdminListInformationDialogComponent_Template_app_material_table_serverSideOrder_12_listener($event) {
        return ctx.onServerSideOrder($event);
      })("rowClicked", function AdminListInformationDialogComponent_Template_app_material_table_rowClicked_12_listener($event) {
        return ctx.editInfo($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.fg);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("tableDataColumn", ctx.infoData.column)("tableDataRow", ctx.infoData.row)("count", ctx.count)("serverSide", true);
    }
  },
  directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.RequiredValidator, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatError, _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__.MatOption, _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_16__.AngularEditorComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_17__.MatButton, _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_7__.MaterialTableComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1saXN0LWluZm9ybWF0aW9uLWRpYWxvZy5jb21wb25lbnQuY3NzIn0= */"]
});

/***/ }),

/***/ 17416:
/*!*******************************************************************************************!*\
  !*** ./src/app/_pages/admin/admin-list-project-type/admin-list-project-type.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminListProjectTypeComponent": () => (/* binding */ AdminListProjectTypeComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/imgbb.service */ 67902);
/* harmony import */ var _shared_services_project_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/project.service */ 65679);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/components/material-table/material-table.component */ 30578);
/* harmony import */ var _shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/pipes/bytes.pipe */ 23626);




















function AdminListProjectTypeComponent_form_5_div_20_Template(rf, ctx) {
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

function AdminListProjectTypeComponent_form_5_div_21_Template(rf, ctx) {
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

function AdminListProjectTypeComponent_form_5_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 2)(1, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function AdminListProjectTypeComponent_form_5_div_22_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return ctx_r9.submitImage();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "mat-icon", 33);
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

function AdminListProjectTypeComponent_form_5_div_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Nama Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}

function AdminListProjectTypeComponent_form_5_div_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Nama Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}

function AdminListProjectTypeComponent_form_5_div_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Deskripsi Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}

function AdminListProjectTypeComponent_form_5_div_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Deskripsi Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}

function AdminListProjectTypeComponent_form_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "form", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("submit", function AdminListProjectTypeComponent_form_5_Template_form_submit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r11.onSubmit();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 11)(2, "h2", 6)(3, "b", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "Buat Tipe Jenis Proyek Baru");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 2)(6, "div", 3)(7, "div", 12)(8, "div", 3)(9, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](10, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "mat-form-field", 14)(12, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](13, "Gambar");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](14, "ngx-mat-file-input", 15, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function AdminListProjectTypeComponent_form_5_Template_ngx_mat_file_input_change_14_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r12);

      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](15);

      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r13.uploadImage($event, _r1);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](17, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "mat-error", 18)(19, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](20, AdminListProjectTypeComponent_form_5_div_20_Template, 3, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](21, AdminListProjectTypeComponent_form_5_div_21_Template, 2, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](22, AdminListProjectTypeComponent_form_5_div_22_Template, 5, 1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "div", 21)(24, "div", 3)(25, "mat-form-field", 22)(26, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](27, "Nama");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](28, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](29, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](30, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "mat-hint", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](32, "Untuk Jenis Berkas");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](33, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](34, AdminListProjectTypeComponent_form_5_div_34_Template, 2, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](35, AdminListProjectTypeComponent_form_5_div_35_Template, 2, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](36, "mat-form-field", 22)(37, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](38, "Deskripsi");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](39, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](40, "mat-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](41, "wysiwyg");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](42, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](43, AdminListProjectTypeComponent_form_5_div_43_Template, 2, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](44, AdminListProjectTypeComponent_form_5_div_44_Template, 2, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](45, "div", 8)(46, "div", 26)(47, "div", 2)(48, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](49, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](50, "div", 29)(51, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](52, " Simpan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](53, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](54, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()()()()()();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("formGroup", ctx_r0.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](10);
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
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("name").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("name").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("description").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("description").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r0.submitted || ctx_r0.fg.invalid);
  }
}

class AdminListProjectTypeComponent {
  constructor(fb, bs, gs, ds, imgbb, project) {
    this.fb = fb;
    this.bs = bs;
    this.gs = gs;
    this.ds = ds;
    this.imgbb = imgbb;
    this.project = project;
    this.submitted = false;
    this.subsProjectGet = null;
    this.subsProjectCreate = null;
    this.subsProjectDelete = null;
    this.subsImgbb = null;
    this.subsDialog = null;
    this.gambar = null;
    this.image = null;
    this.imageErrorText = null;
    this.imageLimitExceeded = null;
    this.image_url = '/assets/img/form/no-image.png';
    this.projectData = {
      column: ['Nama', 'Image', 'Deskripsi', 'Berkas', 'Aksi'],
      row: []
    };
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit() {
    if (this.gs.isBrowser) {
      this.initForm();
      this.getProject();
    }
  }

  ngOnDestroy() {
    var _a, _b, _c, _d, _e;

    (_a = this.subsProjectCreate) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsProjectGet) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsProjectDelete) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    (_d = this.subsImgbb) === null || _d === void 0 ? void 0 : _d.unsubscribe();
    (_e = this.subsDialog) === null || _e === void 0 ? void 0 : _e.unsubscribe();
  }

  initForm() {
    this.fg = this.fb.group({
      name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      description: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      image: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexUrl)])]
    });
  }

  getProject() {
    this.bs.busy();

    if (this.subsProjectGet) {
      this.subsProjectGet.unsubscribe();
      this.bs.idle();
    }

    this.subsProjectGet = this.project.getProject().subscribe({
      next: res => {
        this.gs.log('[PROJECT_LIST_SUCCESS]', res);
        const projectDataRow = [];

        for (const r of res.results) {
          projectDataRow.push({
            Nama: r.name,
            Image: r.image_url,
            Deskripsi: r.description,
            Berkas: r.total_berkas,
            Aksi: r.total_berkas > 0 ? [] : [{
              type: 'button',
              icon: 'delete_forever',
              name: 'Hapus',
              row: r
            }]
          });
        }

        this.projectData.row = projectDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[PROJECT_LIST_ERROR]', err, 'error');
        this.bs.idle();
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

    this.subsProjectCreate = this.project.createProject({
      name: this.fg.value.name,
      description: this.fg.value.description,
      image: this.fg.value.image
    }).subscribe({
      next: res => {
        this.gs.log('[PROJECT_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();

        for (const c in this.fg.controls) {
          if (this.fg.controls[c]) {
            this.fg.controls[c].patchValue(null);
            this.fg.controls[c].updateValueAndValidity();
            this.fg.controls[c].setErrors(null);
            this.fg.controls[c].markAsUntouched();
            this.fg.controls[c].markAsPristine();
          }
        }

        this.getProject();
      },
      error: err => {
        this.gs.log('[PROJECT_CREATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
        this.getProject();
      }
    });
  }

  action(data) {
    this.gs.log('[PROJECT_LIST_CLICK_AKSI]', data);

    if (data.name === 'Hapus') {
      this.deleteProject(data.row);
    } // TODO :: Other Action

  }

  deleteProject(data) {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.gs.log('[PROJECT_LIST_CLICK_DELETE]', data);

      _this.subsDialog = (yield _this.ds.openKonfirmasiDialog(`Hapus Proyek -- '${data.id}' :: '${data.nama}'`, 'Menghapus Dapat Membuat Error / Menghapus Berkas Yang Menunjuk Ke Tipe Ini !')).afterClosed().subscribe({
        next: re => {
          _this.gs.log('[INFO_DIALOG_CLOSED]', re);

          if (re === true) {
            _this.bs.busy();

            _this.subsProjectDelete = _this.project.deleteProject(data.id).subscribe({
              next: res => {
                _this.gs.log('[PROJECT_LIST_CLICK_DELETE_SUCCESS]', res);

                _this.bs.idle();

                _this.getProject();
              },
              error: err => {
                _this.gs.log('[PROJECT_LIST_CLICK_DELETE_ERROR]', err, 'error');

                _this.bs.idle();

                _this.getProject();
              }
            });
          } else if (re === false) {
            _this.getProject();
          }

          _this.subsDialog.unsubscribe();
        }
      });
    })();
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
        this.imageErrorText = ((_a = err.result) === null || _a === void 0 ? void 0 : _a.message) || err.info;
        this.submitted = false;
      }
    });
  }

  openProject(data) {
    this.gs.log('[PROJECT_LIST_CLICK_PROJECT]', data);
  }

}

AdminListProjectTypeComponent.ɵfac = function AdminListProjectTypeComponent_Factory(t) {
  return new (t || AdminListProjectTypeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_3__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_imgbb_service__WEBPACK_IMPORTED_MODULE_5__.ImgbbService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_project_service__WEBPACK_IMPORTED_MODULE_6__.ProjectService));
};

AdminListProjectTypeComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: AdminListProjectTypeComponent,
  selectors: [["app-admin-list-project-type"]],
  decls: 13,
  vars: 3,
  consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row"], [3, "formGroup", "submit", 4, "ngIf"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12", "p-3"], [3, "tableDataColumn", "tableDataRow", "rowClicked", "buttonClicked"], [3, "formGroup", "submit"], [1, "col-12", "sticky-top", "bg-bifeldy", "pb-1"], [1, "col-12", "col-md-5", "col-xl-4", "p-3"], [1, "w-100", "border", 3, "src"], ["appearance", "outline", 1, "pt-3", "w-100", 3, "color"], [1, "w-100", 3, "disabled", "accept", "change"], ["gambar", ""], ["matSuffix", ""], [1, "px-3", "w-100"], [4, "ngIf"], ["class", "col-12", 4, "ngIf"], [1, "col-12", "col-md-7", "col-xl-8", "p-3"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["matInput", "", "formControlName", "name", "placeholder", "**_BD", "required", ""], ["align", "end"], ["matInput", "", "formControlName", "description", "placeholder", "Edisi Terbatas", "required", ""], [1, "row", "mt-3"], [1, "row", "gy-3"], [1, "col", "g-0"], [1, "col-12", "col-md-3"], ["type", "submit", "mat-flat-button", "", "color", "accent", 1, "w-100", 3, "disabled"], [1, "ms-1"], ["type", "button", "mat-raised-button", "", "color", "primary", 1, "w-100", 3, "disabled", "click"], [1, "me-1"]],
  template: function AdminListProjectTypeComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, AdminListProjectTypeComponent_form_5_Template, 55, 15, "form", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 3)(7, "div", 5)(8, "h2", 6)(9, "b", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](10, "Hapus Jenis Proyek Yang Ada");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "div", 8)(12, "app-material-table", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("rowClicked", function AdminListProjectTypeComponent_Template_app_material_table_rowClicked_12_listener($event) {
        return ctx.openProject($event);
      })("buttonClicked", function AdminListProjectTypeComponent_Template_app_material_table_buttonClicked_12_listener($event) {
        return ctx.action($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.fg);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("tableDataColumn", ctx.projectData.column)("tableDataRow", ctx.projectData.row);
    }
  },
  directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_7__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatLabel, ngx_material_file_input__WEBPACK_IMPORTED_MODULE_14__.FileInputComponent, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatError, _angular_material_button__WEBPACK_IMPORTED_MODULE_16__.MatButton, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.RequiredValidator, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__.MatHint, _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_8__.MaterialTableComponent],
  pipes: [_shared_pipes_bytes_pipe__WEBPACK_IMPORTED_MODULE_9__.BytesPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1saXN0LXByb2plY3QtdHlwZS5jb21wb25lbnQuY3NzIn0= */"]
});

/***/ }),

/***/ 5778:
/*!*****************************************************************************************************!*\
  !*** ./src/app/_pages/admin/admin-list-push-notification/admin-list-push-notification.component.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminListPushNotificationComponent": () => (/* binding */ AdminListPushNotificationComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../constants */ 26271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_admin_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/admin.service */ 10466);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_components_datetime_picker__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular-material-components/datetime-picker */ 27929);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/datepicker */ 5818);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/components/material-table/material-table.component */ 30578);




















const _c0 = ["kalender"];

function AdminListPushNotificationComponent_form_5_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Judul Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListPushNotificationComponent_form_5_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Judul Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListPushNotificationComponent_form_5_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Isi Tidak Boleh Kosong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListPushNotificationComponent_form_5_div_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Isi Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListPushNotificationComponent_form_5_div_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Mohon Pilih Salah Satu");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListPushNotificationComponent_form_5_div_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Tipe Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListPushNotificationComponent_form_5_div_61_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Mohon Pilih Salah Satu");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListPushNotificationComponent_form_5_div_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Dismissible Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListPushNotificationComponent_form_5_div_74_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Tanggal Tidak Valid");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListPushNotificationComponent_form_5_div_75_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("Paling Lama ", ctx_r11.maxNotificationDays, " Hari Mendatang");
  }
}

function AdminListPushNotificationComponent_form_5_div_76_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Paling Cepat Detik Ini Sekarang");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListPushNotificationComponent_form_5_div_77_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Tanggal Hanya Boleh Huruf Standar Papan Ketik");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}

function AdminListPushNotificationComponent_form_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "form", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("submit", function AdminListPushNotificationComponent_form_5_Template_form_submit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return ctx_r14.onSubmit();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 11)(2, "h2", 6)(3, "b", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "Buat Push Notifikasi");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 2)(6, "div", 3)(7, "mat-form-field", 12)(8, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, "Judul");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "short_text");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "mat-hint", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "Teks Tebal Di Kiri");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](16, AdminListPushNotificationComponent_form_5_div_16_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, AdminListPushNotificationComponent_form_5_div_17_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "mat-form-field", 17)(19, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20, "Konten / Isi");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](21, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](23, "wysiwyg");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](25, AdminListPushNotificationComponent_form_5_div_25_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](26, AdminListPushNotificationComponent_form_5_div_26_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "mat-form-field", 12)(28, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](29, "Jenis Warna");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](30, "mat-select", 19)(31, "mat-option", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](32, "Merah");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "mat-option", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](34, "Kuning");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](35, "mat-option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](36, "Hijau");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](37, "mat-option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](38, "Putih");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](39, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](40, "Hitam");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](41, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](42, "Abu Abu");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](43, "mat-option", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](44, "Biru Tua");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](45, "mat-option", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](46, "Biru Muda");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](47, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](48, AdminListPushNotificationComponent_form_5_div_48_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](49, AdminListPushNotificationComponent_form_5_div_49_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](50, "mat-form-field", 12)(51, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](52, "Dapat Ditutup");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](53, "mat-select", 28)(54, "mat-option", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](55, "Ya");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](56, "mat-option", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](57, "Tidak");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](58, "mat-hint", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](59, "Tombol X Di Kanan");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](60, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](61, AdminListPushNotificationComponent_form_5_div_61_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](62, AdminListPushNotificationComponent_form_5_div_62_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](63, "mat-form-field", 12)(64, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](65, "Deadline");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](66, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("focus", function AdminListPushNotificationComponent_form_5_Template_input_focus_66_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r15);

      const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](70);

      return _r9.open();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](67, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](68, "mat-datepicker-toggle", 32)(69, "ngx-mat-datetime-picker", 33, 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](71, "mat-hint", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](72, "Muncul Setiap Halaman Di Refresh");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](73, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](74, AdminListPushNotificationComponent_form_5_div_74_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](75, AdminListPushNotificationComponent_form_5_div_75_Template, 2, 1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](76, AdminListPushNotificationComponent_form_5_div_76_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](77, AdminListPushNotificationComponent_form_5_div_77_Template, 2, 0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](78, "div", 35)(79, "div", 2)(80, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](81, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](82, "div", 38)(83, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](84, " Simpan ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](85, "mat-icon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](86, "save");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()()()();
  }

  if (rf & 2) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](70);

    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx_r0.fg);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("title").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("title").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("content").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("content").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("type").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("type").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("dismissible").hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("dismissible").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("color", "accent");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](67, 27, ctx_r0.currentDateTime, "d MMMM y, HH:mm:ss"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngxMatDatetimePicker", _r9)("min", ctx_r0.currentDateTime)("max", ctx_r0.maxDateTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("for", ctx_r0.dateTimePicker);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("showSpinners", true)("showSeconds", true)("enableMeridian", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("deadline").hasError("matDatetimePickerParse"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("deadline").hasError("matDatetimePickerMax"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("deadline").hasError("matDatetimePickerMin"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.fg.get("deadline").hasError("pattern"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r0.submitted || ctx_r0.fg.invalid);
  }
}

class AdminListPushNotificationComponent {
  constructor(fb, bs, ds, gs, adm) {
    this.fb = fb;
    this.bs = bs;
    this.ds = ds;
    this.gs = gs;
    this.adm = adm;
    this.submitted = false;
    this.subsNotifGet = null;
    this.subsNotifCreate = null;
    this.subsNotifDelete = null;
    this.subsDialog = null;
    this.count = 0;
    this.page = 1;
    this.row = 10;
    this.q = '';
    this.sort = '';
    this.order = '';
    this.notifData = {
      column: ['Deadline', 'Judul', 'Konten', 'Pemilik', 'Aksi'],
      row: []
    };
    this.currentDateTime = new Date();
    this.maxDateTime = new Date(Date.now() + _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.timeMaxDaysNotification);
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit() {
    if (this.gs.isBrowser) {
      this.initForm();
      this.getNotif();
    }
  }

  get maxNotificationDays() {
    return _constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.timeMaxDaysNotification / 24 / 60 / 60 / 1000;
  }

  ngOnDestroy() {
    var _a, _b, _c, _d;

    (_a = this.subsNotifCreate) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsNotifGet) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsNotifDelete) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    (_d = this.subsDialog) === null || _d === void 0 ? void 0 : _d.unsubscribe();
  }

  initForm() {
    this.fg = this.fb.group({
      title: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      content: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      type: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      dismissible: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])],
      deadline: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern(_constants__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.regexEnglishKeyboardKeys)])]
    });
  }

  get dateTimePicker() {
    return this.kalender;
  }

  getNotif() {
    this.bs.busy();

    if (this.subsNotifGet) {
      this.subsNotifGet.unsubscribe();
      this.bs.idle();
    }

    this.subsNotifGet = this.adm.getAllNotif(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[NOTIFICATION_LIST_SUCCESS]', res);
        this.count = res.count;
        const notifDataRow = [];

        for (const r of res.results) {
          notifDataRow.push({
            foto: r.user_.image_url,
            Deadline: r.deadline,
            Judul: r.title,
            Konten: r.content,
            Pemilik: r.user_.username,
            Aksi: [{
              type: 'button',
              icon: 'close',
              name: 'Hapus',
              row: r
            }]
          });
        }

        this.notifData.row = notifDataRow;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[NOTIFICATION_LIST_ERROR]', err, 'error');
        this.bs.idle();
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

    this.subsNotifCreate = this.adm.createNotif({
      type: this.fg.value.type,
      title: this.fg.value.title,
      content: this.fg.value.content,
      dismissible: this.fg.value.dismissible === '1',
      deadline: this.fg.value.deadline
    }).subscribe({
      next: res => {
        this.gs.log('[NOTIFICATION_CREATE_SUCCESS]', res);
        this.submitted = false;
        this.bs.idle();

        for (const c in this.fg.controls) {
          if (this.fg.controls[c]) {
            this.fg.controls[c].patchValue(null);
            this.fg.controls[c].updateValueAndValidity();
            this.fg.controls[c].setErrors(null);
            this.fg.controls[c].markAsUntouched();
            this.fg.controls[c].markAsPristine();
          }
        }

        this.getNotif();
      },
      error: err => {
        this.gs.log('[NOTIFICATION_CREATE_ERROR]', err, 'error');
        this.submitted = false;
        this.bs.idle();
        this.getNotif();
      }
    });
  }

  action(data) {
    this.gs.log('[NOTIFICATION_LIST_CLICK_AKSI]', data);

    if (data.name === 'Hapus') {
      this.deleteNotif(data.row);
    } // TODO :: Other Action

  }

  deleteNotif(data) {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.gs.log('[NOTIFICATION_LIST_CLICK_DELETE]', data);

      _this.subsDialog = (yield _this.ds.openKonfirmasiDialog(`Hapus Notif -- '${data.id}' :: '${data.title}'`, 'Yakin Akan Menghapus Notifikasi Ini ?')).afterClosed().subscribe({
        next: re => {
          _this.gs.log('[INFO_DIALOG_CLOSED]', re);

          if (re === true) {
            _this.bs.busy();

            _this.subsNotifDelete = _this.adm.deleteNotif(data.id).subscribe({
              next: res => {
                _this.gs.log('[NOTIFICATION_LIST_CLICK_DELETE_SUCCESS]', res);

                _this.bs.idle();

                _this.getNotif();
              },
              error: err => {
                _this.gs.log('[NOTIFICATION_LIST_CLICK_DELETE_ERROR]', err, 'error');

                _this.bs.idle();

                _this.getNotif();
              }
            });
          } else if (re === false) {
            _this.getNotif();
          }

          _this.subsDialog.unsubscribe();
        }
      });
    })();
  }

  onPaginatorClicked(data) {
    this.gs.log('[NOTIFICATION_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getNotif();
  }

  onServerSideFilter(data) {
    this.gs.log('[NOTIFICATION_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getNotif();
  }

  onServerSideOrder(data) {
    this.gs.log('[NOTIFICATION_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getNotif();
  }

  openNotif(data) {
    this.gs.log('[NOTIFICATION_LIST_CLICK_NOTIFICATION]', data);
  }

}

AdminListPushNotificationComponent.ɵfac = function AdminListPushNotificationComponent_Factory(t) {
  return new (t || AdminListPushNotificationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_2__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_3__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_4__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_shared_services_admin_service__WEBPACK_IMPORTED_MODULE_5__.AdminService));
};

AdminListPushNotificationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: AdminListPushNotificationComponent,
  selectors: [["app-admin-list-push-notification"]],
  viewQuery: function AdminListPushNotificationComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_c0, 7);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.kalender = _t.first);
    }
  },
  decls: 13,
  vars: 5,
  consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row"], [3, "formGroup", "submit", 4, "ngIf"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12", "p-3"], [3, "tableDataColumn", "tableDataRow", "count", "serverSide", "serverSideFilter", "buttonClicked", "paginatorClicked", "serverSideOrder", "rowClicked"], [3, "formGroup", "submit"], [1, "col-12", "sticky-top", "bg-bifeldy", "pb-1"], ["appearance", "outline", 1, "p-3", "col-12", "col-md-4", 3, "color"], ["matInput", "", "formControlName", "title", "placeholder", "Perhatian!", "required", ""], ["matSuffix", ""], ["align", "end"], [4, "ngIf"], ["appearance", "outline", 1, "p-3", "col-12", "col-md-8", 3, "color"], ["matInput", "", "formControlName", "content", "placeholder", "Akan Diadakan Maintenance Pada ...", "required", ""], ["formControlName", "type", "placeholder", "Class Warna Bootstrap", "required", ""], ["value", "danger"], ["value", "warning"], ["value", "success"], ["value", "light"], ["value", "dark"], ["value", "secondary"], ["value", "primary"], ["value", "info"], ["formControlName", "dismissible", "placeholder", "Ya / Tidak", "required", ""], ["value", "1"], ["value", "0"], ["matInput", "", "formControlName", "deadline", 3, "ngxMatDatetimePicker", "placeholder", "min", "max", "focus"], ["matSuffix", "", 3, "for"], [3, "showSpinners", "showSeconds", "enableMeridian"], ["kalender", ""], [1, "row", "mt-3"], [1, "row", "gy-3"], [1, "col", "g-0"], [1, "col-12", "col-md-3"], ["type", "submit", "mat-flat-button", "", "color", "accent", 1, "w-100", 3, "disabled"], [1, "ms-1"]],
  template: function AdminListPushNotificationComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "app-notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, AdminListPushNotificationComponent_form_5_Template, 87, 30, "form", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 3)(7, "div", 5)(8, "h2", 6)(9, "b", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "Deadline Notifikasi");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "div", 8)(12, "app-material-table", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("serverSideFilter", function AdminListPushNotificationComponent_Template_app_material_table_serverSideFilter_12_listener($event) {
        return ctx.onServerSideFilter($event);
      })("buttonClicked", function AdminListPushNotificationComponent_Template_app_material_table_buttonClicked_12_listener($event) {
        return ctx.action($event);
      })("paginatorClicked", function AdminListPushNotificationComponent_Template_app_material_table_paginatorClicked_12_listener($event) {
        return ctx.onPaginatorClicked($event);
      })("serverSideOrder", function AdminListPushNotificationComponent_Template_app_material_table_serverSideOrder_12_listener($event) {
        return ctx.onServerSideOrder($event);
      })("rowClicked", function AdminListPushNotificationComponent_Template_app_material_table_rowClicked_12_listener($event) {
        return ctx.openNotif($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.fg);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("tableDataColumn", ctx.notifData.column)("tableDataRow", ctx.notifData.row)("count", ctx.count)("serverSide", true);
    }
  },
  directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.RequiredValidator, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatSuffix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatError, _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__.MatOption, _angular_material_components_datetime_picker__WEBPACK_IMPORTED_MODULE_16__.NgxMatDatetimeInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_17__.MatDatepickerToggle, _angular_material_components_datetime_picker__WEBPACK_IMPORTED_MODULE_16__.NgxMatDatetimePicker, _angular_material_button__WEBPACK_IMPORTED_MODULE_18__.MatButton, _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_7__.MaterialTableComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1saXN0LXB1c2gtbm90aWZpY2F0aW9uLmNvbXBvbmVudC5jc3MifQ== */"]
});

/***/ }),

/***/ 86526:
/*!***************************************************************************!*\
  !*** ./src/app/_pages/admin/admin-list-user/admin-list-user.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminListUserComponent": () => (/* binding */ AdminListUserComponent)
/* harmony export */ });
/* harmony import */ var D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 71670);
/* harmony import */ var _environments_app_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../environments/app/environment */ 15934);
/* harmony import */ var _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../models/req-res.model */ 14249);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/dialog.service */ 55393);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_shared/services/stats-server.service */ 28381);
/* harmony import */ var _shared_services_admin_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_shared/services/admin.service */ 10466);
/* harmony import */ var _shared_services_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_shared/services/user.service */ 8058);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../_shared/components/material-table/material-table.component */ 30578);














class AdminListUserComponent {
  constructor(router, bs, ds, as, gs, ss, adm, user) {
    this.router = router;
    this.bs = bs;
    this.ds = ds;
    this.as = as;
    this.gs = gs;
    this.ss = ss;
    this.adm = adm;
    this.user = user;
    this.subsUserGet = null;
    this.subsUserDelete = null;
    this.subsPromote = null;
    this.subsDialog = null;
    this.subsBannedGet = null;
    this.count = 0;
    this.page = 1;
    this.row = 10;
    this.q = '';
    this.sort = '';
    this.order = '';
    this.userData = {
      column: ['Id', 'Role', 'Image', 'Username', 'Nama Lengkap', 'Email', 'Aksi'],
      row: []
    };
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit() {
    if (this.gs.isBrowser) {
      this.getUser();
    }
  }

  ngOnDestroy() {
    var _a, _b, _c, _d, _e;

    (_a = this.subsUserGet) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    (_b = this.subsUserDelete) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    (_c = this.subsPromote) === null || _c === void 0 ? void 0 : _c.unsubscribe();
    (_d = this.subsDialog) === null || _d === void 0 ? void 0 : _d.unsubscribe();
    (_e = this.subsBannedGet) === null || _e === void 0 ? void 0 : _e.unsubscribe();
  }

  getUser() {
    this.bs.busy();

    if (this.subsUserGet) {
      this.subsUserGet.unsubscribe();
      this.bs.idle();
    }

    this.subsUserGet = this.user.getAllUser(this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[USER_LIST_SUCCESS]', res);
        this.count = res.count;
        this.bs.busy();
        this.subsBannedGet = this.adm.getBanned({
          username: res.results.map(r => r.username)
        }).subscribe({
          next: result => {
            var _a, _b, _c, _d;

            this.gs.log('[BANNED_LIST_SUCCESS]', res);
            const userDataRow = [];
            let excludedRole = [];

            if (((_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.role) === _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.ADMIN) {
              excludedRole = [_models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.ADMIN];
            } else {
              excludedRole = [_models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.ADMIN, _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.MODERATOR];
            }

            for (const r of res.results) {
              userDataRow.push({
                Id: r.id,
                Role: r.role,
                Image: r.image_url,
                Username: r.username,
                Email: r._email,
                'Nama Lengkap': r.kartu_tanda_penduduk_.nama,
                banned: Object.keys(result.results[r.username]).length > 0,
                Aksi: [{
                  type: 'button',
                  icon: 'mail_outline',
                  name: 'MAIL',
                  row: r
                }, ...(Object.keys(result.results[r.username]).length > 0 || r.username === ((_d = (_c = this.as.currentUserSubject) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.username) || this.gs.includesOneOf(r.role, excludedRole) ? [] : [{
                  type: 'button',
                  icon: 'lock',
                  name: 'BAN',
                  row: r
                }, {
                  type: 'button',
                  icon: 'handyman',
                  name: _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.ADMIN,
                  row: r
                }, {
                  type: 'button',
                  icon: 'security',
                  name: _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.MODERATOR,
                  row: r
                }, {
                  type: 'button',
                  icon: 'rate_review',
                  name: _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.FANSUBBER,
                  row: r
                }, {
                  type: 'button',
                  icon: 'person',
                  name: _models_req_res_model__WEBPACK_IMPORTED_MODULE_2__.RoleModel.USER,
                  row: r
                }])]
              });
            }

            this.userData.row = userDataRow;
            this.bs.idle();
          },
          error: err => {
            this.gs.log('[BANNED_LIST_ERROR]', err, 'error');
            this.bs.idle();
          }
        });
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  action(data) {
    this.gs.log('[USER_LIST_CLICK_AKSI]', data);

    if (data.name === 'BAN') {
      this.ban(data.row);
    } else if (data.name === 'MAIL') {
      this.router.navigate(['/create/mailbox'], {
        queryParams: {
          to: `${data.row.username}@${_environments_app_environment__WEBPACK_IMPORTED_MODULE_1__.environment.domain}`,
          cc: data.row._email
        }
      });
    } else {
      this.proDemote(data.row, data.name);
    }
  }

  ban(data) {
    var _a, _b;

    this.gs.log('[USER_LIST_CLICK_BAN]', data);
    this.subsDialog = this.ds.openInputDialog({
      data: {
        title: `BAN Akun -- '${data.username}'`,
        input: {
          reason: {
            inputLabel: 'Alasan',
            inputPlaceholder: `Manually Banned By ${(_b = (_a = this.as.currentUserSubject) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.role}`,
            inputValue: null,
            inputRequired: true
          }
        },
        confirmText: 'Ya, BAN Akun',
        cancelText: 'Tidak, Batal'
      },
      disableClose: false
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[INPUT_DIALOG_CLOSED]', re);

        if (re) {
          this.bs.busy();
          this.subsUserDelete = this.adm.ban({
            id: data.id,
            email: data.email,
            username: data.username,
            reason: re.reason
          }).subscribe({
            next: res => {
              this.gs.log('[USER_LIST_CLICK_BAN_SUCCESS]', res);
              this.bs.idle();
              this.getUser();
              this.ss.socketEmitVolatile('force-logout', {
                username: data.username,
                reason: re.reason
              });
            },
            error: err => {
              this.gs.log('[USER_LIST_CLICK_BAN_ERROR]', err, 'error');
              this.bs.idle();
              this.getUser();
            }
          });
        } else {
          this.getUser();
        }

        this.subsDialog.unsubscribe();
      }
    });
  }

  proDemote(data, role) {
    var _this = this;

    return (0,D_hikki_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.gs.log('[USER_LIST_CLICK_PROMOTE]', data);

      _this.subsDialog = (yield _this.ds.openKonfirmasiDialog(`Pro/Demosikan Akun -- '${data.username}'`, `Apakah Yakin Ingin Menjadikannya Sebagai ${role} ?`)).afterClosed().subscribe({
        next: re => {
          _this.gs.log('[INFO_DIALOG_CLOSED]', re);

          if (re === true) {
            _this.bs.busy();

            _this.subsPromote = _this.adm.proDemote({
              id: data.id,
              role
            }).subscribe({
              next: res => {
                _this.gs.log('[USER_LIST_CLICK_PROMOTE_SUCCESS]', res);

                _this.bs.idle();

                _this.getUser();
              },
              error: err => {
                _this.gs.log('[USER_LIST_CLICK_PROMOTE_ERROR]', err, 'error');

                _this.bs.idle();

                _this.getUser();
              }
            });
          } else if (re === false) {
            _this.getUser();
          }

          _this.subsDialog.unsubscribe();
        }
      });
    })();
  }

  onPaginatorClicked(data) {
    this.gs.log('[USER_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getUser();
  }

  onServerSideFilter(data) {
    this.gs.log('[USER_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getUser();
  }

  onServerSideOrder(data) {
    this.gs.log('[USER_LIST_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getUser();
  }

  openUser(data) {
    this.gs.log('[USER_LIST_CLICK_USER]', data);
    this.router.navigateByUrl(`/user/${data.Username}`);
  }

}

AdminListUserComponent.ɵfac = function AdminListUserComponent_Factory(t) {
  return new (t || AdminListUserComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_3__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_dialog_service__WEBPACK_IMPORTED_MODULE_4__.DialogService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_5__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_6__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_7__.StatsServerService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_admin_service__WEBPACK_IMPORTED_MODULE_8__.AdminService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_shared_services_user_service__WEBPACK_IMPORTED_MODULE_9__.UserService));
};

AdminListUserComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: AdminListUserComponent,
  selectors: [["app-admin-list-user"]],
  decls: 11,
  vars: 4,
  consts: [[1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], [1, "col-12", "p-3"], [3, "tableDataColumn", "tableDataRow", "count", "serverSide", "serverSideFilter", "buttonClicked", "paginatorClicked", "serverSideOrder", "rowClicked"]],
  template: function AdminListUserComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "app-notifications");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "h2", 5)(7, "b", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8, "Kelola Seluruh Member");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "div", 7)(10, "app-material-table", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("serverSideFilter", function AdminListUserComponent_Template_app_material_table_serverSideFilter_10_listener($event) {
        return ctx.onServerSideFilter($event);
      })("buttonClicked", function AdminListUserComponent_Template_app_material_table_buttonClicked_10_listener($event) {
        return ctx.action($event);
      })("paginatorClicked", function AdminListUserComponent_Template_app_material_table_paginatorClicked_10_listener($event) {
        return ctx.onPaginatorClicked($event);
      })("serverSideOrder", function AdminListUserComponent_Template_app_material_table_serverSideOrder_10_listener($event) {
        return ctx.onServerSideOrder($event);
      })("rowClicked", function AdminListUserComponent_Template_app_material_table_rowClicked_10_listener($event) {
        return ctx.openUser($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("tableDataColumn", ctx.userData.column)("tableDataRow", ctx.userData.row)("count", ctx.count)("serverSide", true);
    }
  },
  directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_10__.NotificationsComponent, _shared_components_material_table_material_table_component__WEBPACK_IMPORTED_MODULE_11__.MaterialTableComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZG1pbi1saXN0LXVzZXIuY29tcG9uZW50LmNzcyJ9 */"]
});

/***/ }),

/***/ 33734:
/*!*****************************************************************!*\
  !*** ./src/app/_pages/admin/admin-menu/admin-menu.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminMenuComponent": () => (/* binding */ AdminMenuComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../_shared/services/auth.service */ 4137);
/* harmony import */ var _shared_services_admin_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_shared/services/admin.service */ 10466);
/* harmony import */ var _shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_shared/services/stats-server.service */ 28381);
/* harmony import */ var _shared_services_task_cron_job_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_shared/services/task-cron-job.service */ 91924);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ 11961);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/slide-toggle */ 6623);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/list */ 26131);
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/grid-list */ 63346);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/input */ 43365);



















function AdminMenuComponent_div_25_mat_icon_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const m_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](m_r3.icon);
} }
function AdminMenuComponent_div_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 20)(1, "mat-card", 21)(2, "mat-card-header", 22)(3, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, AdminMenuComponent_div_25_mat_icon_4_Template, 2, 1, "mat-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "mat-card-title", 25)(6, "h3", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "mat-card-subtitle", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
} if (rf & 2) {
    const m_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpropertyInterpolate1"]("routerLink", "/admin-mod/", m_r3.url, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", m_r3.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](m_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](m_r3.deskripsi);
} }
function AdminMenuComponent_div_26_mat_slide_toggle_7_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-slide-toggle", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function AdminMenuComponent_div_26_mat_slide_toggle_7_Template_mat_slide_toggle_ngModelChange_0_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r9); const s_r7 = restoredCtx.$implicit; const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ((ctx_r8.SS.currentServerSubject == null ? null : ctx_r8.SS.currentServerSubject.value)[s_r7.key] = $event); })("change", function AdminMenuComponent_div_26_mat_slide_toggle_7_Template_mat_slide_toggle_change_0_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r9); const s_r7 = restoredCtx.$implicit; const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r10.toggleSetting(s_r7.key, $event.checked); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const s_r7 = ctx.$implicit;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", !(ctx_r6.SS.mySocket == null ? null : ctx_r6.SS.mySocket.id))("ngModel", ctx_r6.SS.currentServerSubject == null ? null : ctx_r6.SS.currentServerSubject.value[s_r7.key]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", s_r7.key, " - ", s_r7.value, " ");
} }
function AdminMenuComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 14)(1, "div", 15)(2, "h2", 16)(3, "b", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, "Web & Server Configuration");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 10)(6, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, AdminMenuComponent_div_26_mat_slide_toggle_7_Template, 2, 4, "mat-slide-toggle", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](8, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](8, 1, ctx_r1.SS.currentServerSubject == null ? null : ctx_r1.SS.currentServerSubject.value));
} }
function AdminMenuComponent_div_27_mat_grid_tile_11_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "mat-grid-tile")(1, "mat-list-option", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function AdminMenuComponent_div_27_mat_grid_tile_11_Template_mat_list_option_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r14); const t_r12 = restoredCtx.$implicit; const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r13.toggleCronJob(t_r12); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "mat-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "update");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "h4", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "p", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](11, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const t_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassMapInterpolate1"]("text-", t_r12.running ? "warning" : "danger", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](t_r12.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" last: ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](8, 6, t_r12.last_date, "d MMMM y, HH:mm:ss z"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" next: ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](11, 9, t_r12.next_date, "d MMMM y, HH:mm:ss z"), " ");
} }
function AdminMenuComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 14)(1, "div", 15)(2, "h2", 16)(3, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function AdminMenuComponent_div_27_Template_span_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r15.getAllTaskCronJobs(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4, " Refresh ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "b", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6, "Cron & Task Scheduler");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 10)(8, "div", 11)(9, "mat-selection-list", 30)(10, "mat-grid-list", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, AdminMenuComponent_div_27_mat_grid_tile_11_Template, 12, 12, "mat-grid-tile", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("multiple", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("cols", ctx_r2.GS.gridListBreakpoint);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r2.cronJobs);
} }
class AdminMenuComponent {
    constructor(bs, gs, as, adm, ss, tcj) {
        this.bs = bs;
        this.gs = gs;
        this.as = as;
        this.adm = adm;
        this.ss = ss;
        this.tcj = tcj;
        this.cronJobs = [];
        this.subsCronJobsGet = null;
        this.subsCronJobsPut = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    get AS() {
        return this.as;
    }
    get GS() {
        return this.gs;
    }
    get ADM() {
        return this.adm;
    }
    get SS() {
        return this.ss;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getAllTaskCronJobs();
        }
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.subsCronJobsGet) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.subsCronJobsPut) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    toggleSetting(key, checked) {
        this.ss.socketEmit('server-set', { [key]: checked });
    }
    getAllTaskCronJobs() {
        this.bs.busy();
        this.subsCronJobsGet = this.tcj.getAllTaskCronJobs().subscribe({
            next: res => {
                this.gs.log('[TASK_CRON_JOB_LIST_SUCCESS]', res);
                this.cronJobs = res.results;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[TASK_CRON_JOB_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    toggleCronJob(t) {
        this.bs.busy();
        this.subsCronJobsPut = this.tcj.toggleOnOffTaskCronJob(t.id).subscribe({
            next: res => {
                this.gs.log('[TASK_CRON_JOB_TOGGLE_SUCCESS]', res);
                this.bs.idle();
                this.getAllTaskCronJobs();
            },
            error: err => {
                this.gs.log('[TASK_CRON_JOB_TOGGLE_ERROR]', err, 'error');
                this.bs.idle();
                this.getAllTaskCronJobs();
            }
        });
    }
}
AdminMenuComponent.ɵfac = function AdminMenuComponent_Factory(t) { return new (t || AdminMenuComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_0__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_admin_service__WEBPACK_IMPORTED_MODULE_3__.AdminService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_stats_server_service__WEBPACK_IMPORTED_MODULE_4__.StatsServerService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_shared_services_task_cron_job_service__WEBPACK_IMPORTED_MODULE_5__.TaskCronJobService)); };
AdminMenuComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: AdminMenuComponent, selectors: [["app-admin-menu"]], decls: 37, vars: 9, consts: [[1, "container-fluid", "p-0"], [1, "wrapper"], [1, "bg-bubbles", "align-items-center", "p-0"], [1, "row", "align-items-center", "h-100"], [1, "col-12", "mx-auto"], [1, "container", "text-light"], [1, "mb-1", 2, "line-height", "normal"], [1, "mb-0"], [1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-12"], [1, "row", "px-3"], ["class", "col-12 col-md-6 col-xl-3 p-2", 4, "ngFor", "ngForOf"], ["class", "row", 4, "ngIf"], [1, "row"], [1, "col-12", "sticky-top", "bg-bifeldy"], [1, "pt-3", "border-bottom-dotted"], [1, "text-bifeldy"], ["appearance", "outline", 1, "p-3", "col-12", 3, "color"], ["matInput", "", "rows", "10", 3, "ngModel", "ngModelChange"], [1, "col-12", "col-md-6", "col-xl-3", "p-2"], [1, "gradient-border", "rgb-border"], [2, "cursor", "pointer", 3, "routerLink"], ["mat-card-avatar", ""], ["style", "font-size: 300%;", 4, "ngIf"], [1, "text-warning", "mb-1", 2, "cursor", "pointer"], [2, "font-size", "300%"], ["class", "my-2 col-12 col-md-6 col-xl-3", 3, "disabled", "ngModel", "ngModelChange", "change", 4, "ngFor", "ngForOf"], [1, "my-2", "col-12", "col-md-6", "col-xl-3", 3, "disabled", "ngModel", "ngModelChange", "change"], [1, "float-end", "text-warning", 2, "font-size", "small", "cursor", "pointer", 3, "click"], [1, "p-0", 3, "multiple"], ["rowHeight", "72px", 3, "cols"], [4, "ngFor", "ngForOf"], [3, "click"], ["mat-list-icon", "", 1, "ps-3"], ["matLine", ""]], template: function AdminMenuComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "li")(4, "li")(5, "li")(6, "li")(7, "li")(8, "li")(9, "li")(10, "li")(11, "li")(12, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "div", 3)(14, "div", 4)(15, "div", 5)(16, "h2", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](19, "Admin & Mod Panel List, Halaman Khusus Orang Dalam ...");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](20, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "div", 8)(22, "div", 9)(23, "div", 10)(24, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](25, AdminMenuComponent_div_25_Template, 10, 4, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](26, AdminMenuComponent_div_26_Template, 9, 3, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](27, AdminMenuComponent_div_27_Template, 12, 3, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "div", 14)(29, "div", 15)(30, "h2", 16)(31, "b", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](32, "Request & Response Logs");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](33, "mat-form-field", 18)(34, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](35, "Request & Response Logs");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "textarea", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function AdminMenuComponent_Template_textarea_ngModelChange_36_listener($event) { return ctx.SS.serverLog = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵstyleProp"]("background", "linear-gradient(to bottom, " + (ctx.GS.isDarkMode ? "#673ab7" : "#3f51b5") + " 0%, #ee0dfd 100%)");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", ctx.AS.currentUserSubject == null ? null : ctx.AS.currentUserSubject.value == null ? null : ctx.AS.currentUserSubject.value.kartu_tanda_penduduk_.nama, " :: ", ctx.AS.currentUserSubject == null ? null : ctx.AS.currentUserSubject.value == null ? null : ctx.AS.currentUserSubject.value.role, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.ADM.menuList);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.SS.currentServerSubject == null ? null : ctx.SS.currentServerSubject.value);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.cronJobs.length > 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("color", "accent");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx.SS.serverLog);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_6__.NotificationsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardHeader, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLink, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardAvatar, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardSubtitle, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_12__.MatSlideToggle, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _angular_material_list__WEBPACK_IMPORTED_MODULE_14__.MatSelectionList, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__.MatGridList, _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_15__.MatGridTile, _angular_material_list__WEBPACK_IMPORTED_MODULE_14__.MatListOption, _angular_material_list__WEBPACK_IMPORTED_MODULE_14__.MatListIconCssMatStyler, _angular_material_core__WEBPACK_IMPORTED_MODULE_16__.MatLine, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_17__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_18__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.KeyValuePipe, _angular_common__WEBPACK_IMPORTED_MODULE_8__.DatePipe], styles: [".wrapper[_ngcontent-%COMP%] {\r\n  \r\n  \r\n  \r\n  position: sticky;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 128px;\r\n  overflow: hidden;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  list-style: none;\r\n  display: block;\r\n  width: 40px;\r\n  height: 40px;\r\n  background-color: rgba(255, 255, 255, 0.15);\r\n  bottom: -160px;\r\n  animation: square 25s infinite;\r\n  transition-timing-function: linear;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(1) {\r\n  left: 10%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(2) {\r\n  left: 20%;\r\n  width: 80px;\r\n  height: 80px;\r\n  animation-delay: 2s;\r\n  animation-duration: 17s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(3) {\r\n  left: 25%;\r\n  animation-delay: 4s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(4) {\r\n  left: 40%;\r\n  width: 60px;\r\n  height: 60px;\r\n  animation-duration: 22s;\r\n  background-color: rgba(255, 255, 255, 0.25);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(5) {\r\n  left: 70%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(6) {\r\n  left: 80%;\r\n  width: 120px;\r\n  height: 120px;\r\n  animation-delay: 3s;\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(7) {\r\n  left: 32%;\r\n  width: 160px;\r\n  height: 160px;\r\n  animation-delay: 7s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(8) {\r\n  left: 55%;\r\n  width: 20px;\r\n  height: 20px;\r\n  animation-delay: 15s;\r\n  animation-duration: 40s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(9) {\r\n  left: 25%;\r\n  width: 10px;\r\n  height: 10px;\r\n  animation-delay: 2s;\r\n  animation-duration: 40s;\r\n  background-color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(10) {\r\n  left: 90%;\r\n  width: 160px;\r\n  height: 160px;\r\n  animation-delay: 11s;\r\n}\r\n\r\n@keyframes square {\r\n  0% {\r\n    transform: translateY(0);\r\n  }\r\n  100% {\r\n    transform: translateY(-512px) rotate(512deg);\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluLW1lbnUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUF5QjtFQUN6QixzRUFBc0U7RUFDdEUsc0VBQXNFO0VBQ3RFLGdCQUFnQjtFQUNoQixPQUFPO0VBQ1AsV0FBVztFQUNYLGFBQWE7RUFDYixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87RUFDUCxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsV0FBVztFQUNYLFlBQVk7RUFDWiwyQ0FBMkM7RUFDM0MsY0FBYztFQUNkLDhCQUE4QjtFQUM5QixrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsV0FBVztFQUNYLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsU0FBUztFQUNULG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxXQUFXO0VBQ1gsWUFBWTtFQUNaLHVCQUF1QjtFQUN2QiwyQ0FBMkM7QUFDN0M7O0FBRUE7RUFDRSxTQUFTO0FBQ1g7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsMENBQTBDO0FBQzVDOztBQUVBO0VBQ0UsU0FBUztFQUNULFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztFQUNULFdBQVc7RUFDWCxZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsMENBQTBDO0FBQzVDOztBQUVBO0VBQ0UsU0FBUztFQUNULFlBQVk7RUFDWixhQUFhO0VBQ2Isb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0U7SUFDRSx3QkFBd0I7RUFDMUI7RUFDQTtJQUNFLDRDQUE0QztFQUM5QztBQUNGIiwiZmlsZSI6ImFkbWluLW1lbnUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi53cmFwcGVyIHtcclxuICAvKiBiYWNrZ3JvdW5kOiAjMWZhMjYwOyAqL1xyXG4gIC8qIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICMzZjUxYjUgMCUsICMwZDZlZmQgMTAwJSk7ICovXHJcbiAgLyogYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgIzY3M2FiNyAwJSwgI2VlMGRmZCAxMDAlKTsgKi9cclxuICBwb3NpdGlvbjogc3RpY2t5O1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMjhweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICBsZWZ0OiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGkge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsaXN0LXN0eWxlOiBub25lO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIHdpZHRoOiA0MHB4O1xyXG4gIGhlaWdodDogNDBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpO1xyXG4gIGJvdHRvbTogLTE2MHB4O1xyXG4gIGFuaW1hdGlvbjogc3F1YXJlIDI1cyBpbmZpbml0ZTtcclxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoMSkge1xyXG4gIGxlZnQ6IDEwJTtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDIpIHtcclxuICBsZWZ0OiAyMCU7XHJcbiAgd2lkdGg6IDgwcHg7XHJcbiAgaGVpZ2h0OiA4MHB4O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogMnM7XHJcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAxN3M7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCgzKSB7XHJcbiAgbGVmdDogMjUlO1xyXG4gIGFuaW1hdGlvbi1kZWxheTogNHM7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCg0KSB7XHJcbiAgbGVmdDogNDAlO1xyXG4gIHdpZHRoOiA2MHB4O1xyXG4gIGhlaWdodDogNjBweDtcclxuICBhbmltYXRpb24tZHVyYXRpb246IDIycztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoNSkge1xyXG4gIGxlZnQ6IDcwJTtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDYpIHtcclxuICBsZWZ0OiA4MCU7XHJcbiAgd2lkdGg6IDEyMHB4O1xyXG4gIGhlaWdodDogMTIwcHg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAzcztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCg3KSB7XHJcbiAgbGVmdDogMzIlO1xyXG4gIHdpZHRoOiAxNjBweDtcclxuICBoZWlnaHQ6IDE2MHB4O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogN3M7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCg4KSB7XHJcbiAgbGVmdDogNTUlO1xyXG4gIHdpZHRoOiAyMHB4O1xyXG4gIGhlaWdodDogMjBweDtcclxuICBhbmltYXRpb24tZGVsYXk6IDE1cztcclxuICBhbmltYXRpb24tZHVyYXRpb246IDQwcztcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDkpIHtcclxuICBsZWZ0OiAyNSU7XHJcbiAgd2lkdGg6IDEwcHg7XHJcbiAgaGVpZ2h0OiAxMHB4O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogMnM7XHJcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA0MHM7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoMTApIHtcclxuICBsZWZ0OiA5MCU7XHJcbiAgd2lkdGg6IDE2MHB4O1xyXG4gIGhlaWdodDogMTYwcHg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAxMXM7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc3F1YXJlIHtcclxuICAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XHJcbiAgfVxyXG4gIDEwMCUge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MTJweCkgcm90YXRlKDUxMmRlZyk7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 79511:
/*!**********************************************!*\
  !*** ./src/app/_pages/admin/admin.module.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdminModule": () => (/* binding */ AdminModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_components_datetime_picker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular-material-components/datetime-picker */ 27929);
/* harmony import */ var _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @kolkov/angular-editor */ 88888);
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-material-file-input */ 37410);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/pipes/custom-pipe.module */ 67355);
/* harmony import */ var _shared_components_material_table_material_table_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/components/material-table/material-table.module */ 617);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _admin_menu_admin_menu_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin-menu/admin-menu.component */ 33734);
/* harmony import */ var _admin_list_ddl_admin_list_ddl_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./admin-list-ddl/admin-list-ddl.component */ 74929);
/* harmony import */ var _admin_list_user_admin_list_user_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin-list-user/admin-list-user.component */ 86526);
/* harmony import */ var _admin_list_project_type_admin_list_project_type_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./admin-list-project-type/admin-list-project-type.component */ 17416);
/* harmony import */ var _admin_list_push_notification_admin_list_push_notification_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./admin-list-push-notification/admin-list-push-notification.component */ 5778);
/* harmony import */ var _admin_list_fansub_member_admin_list_fansub_member_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./admin-list-fansub-member/admin-list-fansub-member.component */ 2717);
/* harmony import */ var _admin_list_banned_admin_list_banned_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./admin-list-banned/admin-list-banned.component */ 38678);
/* harmony import */ var _admin_list_cors_admin_list_cors_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./admin-list-cors/admin-list-cors.component */ 5907);
/* harmony import */ var _admin_list_information_dialog_admin_list_information_dialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./admin-list-information-dialog/admin-list-information-dialog.component */ 41831);
/* harmony import */ var _admin_list_email_admin_list_email_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./admin-list-email/admin-list-email.component */ 96142);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 3184);






















const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _admin_menu_admin_menu_component__WEBPACK_IMPORTED_MODULE_4__.AdminMenuComponent
    },
    {
        path: 'banned-list',
        component: _admin_list_banned_admin_list_banned_component__WEBPACK_IMPORTED_MODULE_10__.AdminListBannedComponent,
        data: {
            title: 'Admin - List All Banned User',
            description: 'Kelola Banned User',
            keywords: 'Kelola Banned User'
        }
    },
    {
        path: 'cors-list',
        component: _admin_list_cors_admin_list_cors_component__WEBPACK_IMPORTED_MODULE_11__.AdminListCorsComponent,
        data: {
            title: 'CORS - List All Api Key',
            description: 'Kelola Api Key',
            keywords: 'Kelola Api Key'
        }
    },
    {
        path: 'ddl-list',
        component: _admin_list_ddl_admin_list_ddl_component__WEBPACK_IMPORTED_MODULE_5__.AdminListDdlComponent,
        data: {
            title: 'Admin - List All Berkas DDL',
            description: 'Kelola Berkas DDL',
            keywords: 'Kelola Berkas DDL'
        }
    },
    {
        path: 'user-list',
        component: _admin_list_user_admin_list_user_component__WEBPACK_IMPORTED_MODULE_6__.AdminListUserComponent,
        data: {
            title: 'Admin - List All Users',
            description: 'Atur Seluruh Member',
            keywords: 'BAN & UN-BAN User'
        }
    },
    {
        path: 'project-type',
        component: _admin_list_project_type_admin_list_project_type_component__WEBPACK_IMPORTED_MODULE_7__.AdminListProjectTypeComponent,
        data: {
            title: 'Admin - List All Project Type',
            description: 'Atur Kategori Garapan',
            keywords: 'Jenis Proyek Berkas'
        }
    },
    {
        path: 'fansub-member',
        component: _admin_list_fansub_member_admin_list_fansub_member_component__WEBPACK_IMPORTED_MODULE_9__.AdminListFansubMemberComponent,
        data: {
            title: 'Admin - List All Fansub Member',
            description: 'Atur Keanggotaan Fansub',
            keywords: 'Keanggotaan Fansub'
        }
    },
    {
        path: 'push-notification',
        component: _admin_list_push_notification_admin_list_push_notification_component__WEBPACK_IMPORTED_MODULE_8__.AdminListPushNotificationComponent,
        data: {
            title: 'Admin - Push Notification',
            description: 'Buat Pengumuman Dadakan',
            keywords: 'Push Notification'
        }
    },
    {
        path: 'information',
        component: _admin_list_information_dialog_admin_list_information_dialog_component__WEBPACK_IMPORTED_MODULE_12__.AdminListInformationDialogComponent,
        data: {
            title: 'Admin - List All Information',
            description: 'Atur Informasi Dialog',
            keywords: 'Informations'
        }
    },
    {
        path: 'email',
        component: _admin_list_email_admin_list_email_component__WEBPACK_IMPORTED_MODULE_13__.AdminListEmailComponent,
        data: {
            title: 'Admin - List All Email',
            description: 'Email Inbox & Outbox',
            keywords: 'Surat Elektronik'
        }
    }
];
class AdminModule {
}
AdminModule.ɵfac = function AdminModule_Factory(t) { return new (t || AdminModule)(); };
AdminModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({ type: AdminModule });
AdminModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_15__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterModule.forChild(routes),
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
            _shared_components_material_table_material_table_module__WEBPACK_IMPORTED_MODULE_2__.MaterialTableModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_3__.NotificationsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_17__.ReactiveFormsModule,
            _angular_material_components_datetime_picker__WEBPACK_IMPORTED_MODULE_18__.NgxMatNativeDateModule,
            _angular_material_components_datetime_picker__WEBPACK_IMPORTED_MODULE_18__.NgxMatDatetimePickerModule,
            _angular_material_components_datetime_picker__WEBPACK_IMPORTED_MODULE_18__.NgxMatTimepickerModule,
            ngx_material_file_input__WEBPACK_IMPORTED_MODULE_19__.MaterialFileInputModule,
            _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_20__.AngularEditorModule,
            _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_1__.CustomPipeModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](AdminModule, { declarations: [_admin_menu_admin_menu_component__WEBPACK_IMPORTED_MODULE_4__.AdminMenuComponent,
        _admin_list_ddl_admin_list_ddl_component__WEBPACK_IMPORTED_MODULE_5__.AdminListDdlComponent,
        _admin_list_user_admin_list_user_component__WEBPACK_IMPORTED_MODULE_6__.AdminListUserComponent,
        _admin_list_project_type_admin_list_project_type_component__WEBPACK_IMPORTED_MODULE_7__.AdminListProjectTypeComponent,
        _admin_list_push_notification_admin_list_push_notification_component__WEBPACK_IMPORTED_MODULE_8__.AdminListPushNotificationComponent,
        _admin_list_fansub_member_admin_list_fansub_member_component__WEBPACK_IMPORTED_MODULE_9__.AdminListFansubMemberComponent,
        _admin_list_banned_admin_list_banned_component__WEBPACK_IMPORTED_MODULE_10__.AdminListBannedComponent,
        _admin_list_cors_admin_list_cors_component__WEBPACK_IMPORTED_MODULE_11__.AdminListCorsComponent,
        _admin_list_information_dialog_admin_list_information_dialog_component__WEBPACK_IMPORTED_MODULE_12__.AdminListInformationDialogComponent,
        _admin_list_email_admin_list_email_component__WEBPACK_IMPORTED_MODULE_13__.AdminListEmailComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_16__.RouterModule, _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_0__.SharedMaterialModule,
        _shared_components_material_table_material_table_module__WEBPACK_IMPORTED_MODULE_2__.MaterialTableModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_3__.NotificationsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormsModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_17__.ReactiveFormsModule,
        _angular_material_components_datetime_picker__WEBPACK_IMPORTED_MODULE_18__.NgxMatNativeDateModule,
        _angular_material_components_datetime_picker__WEBPACK_IMPORTED_MODULE_18__.NgxMatDatetimePickerModule,
        _angular_material_components_datetime_picker__WEBPACK_IMPORTED_MODULE_18__.NgxMatTimepickerModule,
        ngx_material_file_input__WEBPACK_IMPORTED_MODULE_19__.MaterialFileInputModule,
        _kolkov_angular_editor__WEBPACK_IMPORTED_MODULE_20__.AngularEditorModule,
        _shared_pipes_custom_pipe_module__WEBPACK_IMPORTED_MODULE_1__.CustomPipeModule] }); })();


/***/ }),

/***/ 91924:
/*!***********************************************************!*\
  !*** ./src/app/_shared/services/task-cron-job.service.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskCronJobService": () => (/* binding */ TaskCronJobService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class TaskCronJobService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    getAllTaskCronJobs() {
        return this.api.getData(`/task-cron-job`);
    }
    toggleOnOffTaskCronJob(tcrId) {
        return this.api.putData(`/task-cron-job/${tcrId}`);
    }
}
TaskCronJobService.ɵfac = function TaskCronJobService_Factory(t) { return new (t || TaskCronJobService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
TaskCronJobService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: TaskCronJobService, factory: TaskCronJobService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 27929:
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@angular-material-components/datetime-picker/fesm2015/angular-material-components-datetime-picker.mjs ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultNgxMatCalendarRangeStrategy": () => (/* binding */ DefaultNgxMatCalendarRangeStrategy),
/* harmony export */   "MAT_DATEPICKER_VALIDATORS": () => (/* binding */ MAT_DATEPICKER_VALIDATORS),
/* harmony export */   "MAT_DATEPICKER_VALUE_ACCESSOR": () => (/* binding */ MAT_DATEPICKER_VALUE_ACCESSOR),
/* harmony export */   "MatDatetimePickerInputEvent": () => (/* binding */ MatDatetimePickerInputEvent),
/* harmony export */   "NGX_MAT_DATE_FORMATS": () => (/* binding */ NGX_MAT_DATE_FORMATS),
/* harmony export */   "NGX_MAT_DATE_RANGE_SELECTION_STRATEGY": () => (/* binding */ NGX_MAT_DATE_RANGE_SELECTION_STRATEGY),
/* harmony export */   "NGX_MAT_NATIVE_DATE_FORMATS": () => (/* binding */ NGX_MAT_NATIVE_DATE_FORMATS),
/* harmony export */   "NgxMatCalendar": () => (/* binding */ NgxMatCalendar),
/* harmony export */   "NgxMatCalendarBody": () => (/* binding */ NgxMatCalendarBody),
/* harmony export */   "NgxMatCalendarCell": () => (/* binding */ NgxMatCalendarCell),
/* harmony export */   "NgxMatCalendarHeader": () => (/* binding */ NgxMatCalendarHeader),
/* harmony export */   "NgxMatDateAdapter": () => (/* binding */ NgxMatDateAdapter),
/* harmony export */   "NgxMatDatetimeContent": () => (/* binding */ NgxMatDatetimeContent),
/* harmony export */   "NgxMatDatetimeInput": () => (/* binding */ NgxMatDatetimeInput),
/* harmony export */   "NgxMatDatetimePicker": () => (/* binding */ NgxMatDatetimePicker),
/* harmony export */   "NgxMatDatetimePickerModule": () => (/* binding */ NgxMatDatetimePickerModule),
/* harmony export */   "NgxMatMonthView": () => (/* binding */ NgxMatMonthView),
/* harmony export */   "NgxMatMultiYearView": () => (/* binding */ NgxMatMultiYearView),
/* harmony export */   "NgxMatNativeDateAdapter": () => (/* binding */ NgxMatNativeDateAdapter),
/* harmony export */   "NgxMatNativeDateModule": () => (/* binding */ NgxMatNativeDateModule),
/* harmony export */   "NgxMatTimepickerComponent": () => (/* binding */ NgxMatTimepickerComponent),
/* harmony export */   "NgxMatTimepickerModule": () => (/* binding */ NgxMatTimepickerModule),
/* harmony export */   "NgxMatYearView": () => (/* binding */ NgxMatYearView),
/* harmony export */   "NgxNativeDateModule": () => (/* binding */ NgxNativeDateModule),
/* harmony export */   "getActiveOffset": () => (/* binding */ getActiveOffset),
/* harmony export */   "isSameMultiYearView": () => (/* binding */ isSameMultiYearView),
/* harmony export */   "yearsPerPage": () => (/* binding */ yearsPerPage),
/* harmony export */   "yearsPerRow": () => (/* binding */ yearsPerRow)
/* harmony export */ });
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/portal */ 24476);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 26078);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 80228);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs */ 36646);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/keycodes */ 75939);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 59295);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 44874);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 68951);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 71989);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs/operators */ 60116);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/datepicker */ 5818);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/bidi */ 51588);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 87317);
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/cdk/coercion */ 76484);
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/cdk/overlay */ 54244);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 65590);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/dialog */ 95758);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/cdk/platform */ 14390);





























/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const _c0 = ["ngx-mat-calendar-body", ""];

function NgxMatCalendarBody_tr_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 2)(1, "td", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("padding-top", ctx_r0._cellPadding)("padding-bottom", ctx_r0._cellPadding);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("colspan", ctx_r0.numCols);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.label, " ");
  }
}

function NgxMatCalendarBody_tr_1_td_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("padding-top", ctx_r4._cellPadding)("padding-bottom", ctx_r4._cellPadding);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("colspan", ctx_r4._firstRowOffset);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r4._firstRowOffset >= ctx_r4.labelMinRequiredCells ? ctx_r4.label : "", " ");
  }
}

function NgxMatCalendarBody_tr_1_td_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatCalendarBody_tr_1_td_2_Template_td_click_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const item_r6 = restoredCtx.$implicit;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return ctx_r8._cellClicked(item_r6, $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const colIndex_r7 = ctx.index;
    const rowIndex_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().index;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx_r5._cellWidth)("padding-top", ctx_r5._cellPadding)("padding-bottom", ctx_r5._cellPadding);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-calendar-body-disabled", !item_r6.enabled)("mat-calendar-body-active", ctx_r5._isActiveCell(rowIndex_r3, colIndex_r7))("mat-calendar-body-range-start", ctx_r5._isRangeStart(item_r6.compareValue))("mat-calendar-body-range-end", ctx_r5._isRangeEnd(item_r6.compareValue))("mat-calendar-body-in-range", ctx_r5._isInRange(item_r6.compareValue))("mat-calendar-body-comparison-bridge-start", ctx_r5._isComparisonBridgeStart(item_r6.compareValue, rowIndex_r3, colIndex_r7))("mat-calendar-body-comparison-bridge-end", ctx_r5._isComparisonBridgeEnd(item_r6.compareValue, rowIndex_r3, colIndex_r7))("mat-calendar-body-comparison-start", ctx_r5._isComparisonStart(item_r6.compareValue))("mat-calendar-body-comparison-end", ctx_r5._isComparisonEnd(item_r6.compareValue))("mat-calendar-body-in-comparison-range", ctx_r5._isInComparisonRange(item_r6.compareValue))("mat-calendar-body-preview-start", ctx_r5._isPreviewStart(item_r6.compareValue))("mat-calendar-body-preview-end", ctx_r5._isPreviewEnd(item_r6.compareValue))("mat-calendar-body-in-preview", ctx_r5._isInPreview(item_r6.compareValue));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", item_r6.cssClasses)("tabindex", ctx_r5._isActiveCell(rowIndex_r3, colIndex_r7) ? 0 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("data-mat-row", rowIndex_r3)("data-mat-col", colIndex_r7)("aria-label", item_r6.ariaLabel)("aria-disabled", !item_r6.enabled || null)("aria-selected", ctx_r5._isSelected(item_r6));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-calendar-body-selected", ctx_r5._isSelected(item_r6))("mat-calendar-body-today", ctx_r5.todayValue === item_r6.compareValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r6.displayValue, " ");
  }
}

function NgxMatCalendarBody_tr_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NgxMatCalendarBody_tr_1_td_1_Template, 2, 6, "td", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NgxMatCalendarBody_tr_1_td_2_Template, 4, 44, "td", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const row_r2 = ctx.$implicit;
    const rowIndex_r3 = ctx.index;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", rowIndex_r3 === 0 && ctx_r1._firstRowOffset);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", row_r2);
  }
}

function NgxMatMonthView_th_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const day_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", day_r1.long);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](day_r1.narrow);
  }
}

const _c1 = ["*"];

function NgxMatCalendar_ng_template_0_Template(rf, ctx) {}

function NgxMatCalendar_ngx_mat_month_view_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ngx-mat-month-view", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("activeDateChange", function NgxMatCalendar_ngx_mat_month_view_2_Template_ngx_mat_month_view_activeDateChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r4.activeDate = $event;
    })("selectedChange", function NgxMatCalendar_ngx_mat_month_view_2_Template_ngx_mat_month_view_selectedChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r6._dateSelected($event);
    })("_userSelection", function NgxMatCalendar_ngx_mat_month_view_2_Template_ngx_mat_month_view__userSelection_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r7._userSelected();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("activeDate", ctx_r1.activeDate)("selected", ctx_r1.selected)("dateFilter", ctx_r1.dateFilter)("maxDate", ctx_r1.maxDate)("minDate", ctx_r1.minDate)("dateClass", ctx_r1.dateClass);
  }
}

function NgxMatCalendar_ngx_mat_year_view_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ngx-mat-year-view", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("activeDateChange", function NgxMatCalendar_ngx_mat_year_view_3_Template_ngx_mat_year_view_activeDateChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r8.activeDate = $event;
    })("monthSelected", function NgxMatCalendar_ngx_mat_year_view_3_Template_ngx_mat_year_view_monthSelected_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r10._monthSelectedInYearView($event);
    })("selectedChange", function NgxMatCalendar_ngx_mat_year_view_3_Template_ngx_mat_year_view_selectedChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r11._goToDateInView($event, "month");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("activeDate", ctx_r2.activeDate)("selected", ctx_r2.selected)("dateFilter", ctx_r2.dateFilter)("maxDate", ctx_r2.maxDate)("minDate", ctx_r2.minDate);
  }
}

function NgxMatCalendar_ngx_mat_multi_year_view_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ngx-mat-multi-year-view", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("activeDateChange", function NgxMatCalendar_ngx_mat_multi_year_view_4_Template_ngx_mat_multi_year_view_activeDateChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r12.activeDate = $event;
    })("yearSelected", function NgxMatCalendar_ngx_mat_multi_year_view_4_Template_ngx_mat_multi_year_view_yearSelected_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r14._yearSelectedInMultiYearView($event);
    })("selectedChange", function NgxMatCalendar_ngx_mat_multi_year_view_4_Template_ngx_mat_multi_year_view_selectedChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r15._goToDateInView($event, "year");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("activeDate", ctx_r3.activeDate)("selected", ctx_r3.selected)("dateFilter", ctx_r3.dateFilter)("maxDate", ctx_r3.maxDate)("minDate", ctx_r3.minDate);
  }
}

function NgxMatTimepickerComponent_tr_3_td_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td")(1, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatTimepickerComponent_tr_3_td_11_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return ctx_r9.change("second", true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "expand_less");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }

  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r6.disabled || ctx_r6.disableMinute);
  }
}

function NgxMatTimepickerComponent_tr_3_td_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "td", 6);
  }
}

function NgxMatTimepickerComponent_tr_3_td_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "td");
  }
}

function NgxMatTimepickerComponent_tr_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr")(1, "td")(2, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatTimepickerComponent_tr_3_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r11.change("hour", true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "expand_less");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "td")(7, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatTimepickerComponent_tr_3_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r12);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r13.change("minute", true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "expand_less");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, NgxMatTimepickerComponent_tr_3_td_11_Template, 4, 1, "td", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, NgxMatTimepickerComponent_tr_3_td_12_Template, 1, 0, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, NgxMatTimepickerComponent_tr_3_td_13_Template, 1, 0, "td", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r0.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r0.disabled || ctx_r0.disableMinute);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.showSeconds);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.enableMeridian);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.enableMeridian);
  }
}

function NgxMatTimepickerComponent_td_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, ":");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}

function NgxMatTimepickerComponent_td_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td")(1, "mat-form-field", 4)(2, "input", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function NgxMatTimepickerComponent_td_14_Template_input_input_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r14.formatInput($event.target);
    })("keydown.ArrowUp", function NgxMatTimepickerComponent_td_14_Template_input_keydown_ArrowUp_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      ctx_r16.change("second", true);
      return $event.preventDefault();
    })("keydown.ArrowDown", function NgxMatTimepickerComponent_td_14_Template_input_keydown_ArrowDown_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      ctx_r17.change("second", false);
      return $event.preventDefault();
    })("blur", function NgxMatTimepickerComponent_td_14_Template_input_blur_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r18.change("second");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
}

function NgxMatTimepickerComponent_td_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "td", 6);
  }
}

function NgxMatTimepickerComponent_td_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 12)(1, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatTimepickerComponent_td_16_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r19.toggleMeridian();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", ctx_r4.color)("disabled", ctx_r4.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r4.meridian, " ");
  }
}

function NgxMatTimepickerComponent_tr_17_td_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "td");
  }
}

function NgxMatTimepickerComponent_tr_17_td_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td")(1, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatTimepickerComponent_tr_17_td_11_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return ctx_r25.change("second", false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "expand_more");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }

  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r22.disabled || ctx_r22.disableMinute);
  }
}

function NgxMatTimepickerComponent_tr_17_td_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "td", 6);
  }
}

function NgxMatTimepickerComponent_tr_17_td_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "td");
  }
}

function NgxMatTimepickerComponent_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr")(1, "td")(2, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatTimepickerComponent_tr_17_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r27.change("hour", false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "expand_more");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "td")(7, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatTimepickerComponent_tr_17_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r28);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r29.change("minute", false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "expand_more");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, NgxMatTimepickerComponent_tr_17_td_10_Template, 1, 0, "td", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, NgxMatTimepickerComponent_tr_17_td_11_Template, 4, 1, "td", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, NgxMatTimepickerComponent_tr_17_td_12_Template, 1, 0, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, NgxMatTimepickerComponent_tr_17_td_13_Template, 1, 0, "td", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r5.disabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r5.disabled || ctx_r5.disableMinute);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5.showSeconds);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5.showSeconds);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5.enableMeridian);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r5.enableMeridian);
  }
}

function NgxMatDatetimeContent_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6)(1, "ngx-mat-timepicker", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function NgxMatDatetimeContent_ng_container_1_div_1_Template_ngx_mat_timepicker_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return ctx_r4.datepicker._selected = $event;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("disable-seconds", !ctx_r1.datepicker._showSeconds);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showSpinners", ctx_r1.datepicker._showSpinners)("showSeconds", ctx_r1.datepicker._showSeconds)("disabled", ctx_r1.datepicker._disabled)("stepHour", ctx_r1.datepicker._stepHour)("stepMinute", ctx_r1.datepicker._stepMinute)("stepSecond", ctx_r1.datepicker._stepSecond)("ngModel", ctx_r1.datepicker._selected)("color", ctx_r1.datepicker._color)("enableMeridian", ctx_r1.datepicker._enableMeridian)("disableMinute", ctx_r1.datepicker._disableMinute);
  }
}

function NgxMatDatetimeContent_ng_container_1_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "done");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}

function NgxMatDatetimeContent_ng_container_1_ng_template_5_Template(rf, ctx) {}

function NgxMatDatetimeContent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NgxMatDatetimeContent_ng_container_1_div_1_Template, 2, 12, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 3)(3, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatDatetimeContent_ng_container_1_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return ctx_r6.datepicker.ok();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, NgxMatDatetimeContent_ng_container_1_mat_icon_4_Template, 2, 0, "mat-icon", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, NgxMatDatetimeContent_ng_container_1_ng_template_5_Template, 0, 0, "ng-template", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.datepicker._hideTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", ctx_r0.datepicker._color)("disabled", !ctx_r0.valid);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.datepicker._customIcon);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cdkPortalOutlet", ctx_r0._templateCustomIconPortal);
  }
}

const NGX_MAT_DATE_FORMATS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('ngx-mat-date-formats');
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * @docs-private
 */

class NgxMatCalendarCell {
  constructor(value, displayValue, ariaLabel, enabled, cssClasses = {}, compareValue = value, rawValue) {
    this.value = value;
    this.displayValue = displayValue;
    this.ariaLabel = ariaLabel;
    this.enabled = enabled;
    this.cssClasses = cssClasses;
    this.compareValue = compareValue;
    this.rawValue = rawValue;
  }

}
/**
 * An internal component used to display calendar data in a table.
 * @docs-private
 */


class NgxMatCalendarBody {
  constructor(_elementRef, _ngZone) {
    this._elementRef = _elementRef;
    this._ngZone = _ngZone;
    /** The number of columns in the table. */

    this.numCols = 7;
    /** The cell number of the active cell in the table. */

    this.activeCell = 0;
    /** Whether a range is being selected. */

    this.isRange = false;
    /**
     * The aspect ratio (width / height) to use for the cells in the table. This aspect ratio will be
     * maintained even as the table resizes.
     */

    this.cellAspectRatio = 1;
    /** Start of the preview range. */

    this.previewStart = null;
    /** End of the preview range. */

    this.previewEnd = null;
    /** Emits when a new value is selected. */

    this.selectedValueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits when the preview has changed as a result of a user action. */

    this.previewChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Event handler for when the user enters an element
     * inside the calendar body (e.g. by hovering in or focus).
     */

    this._enterHandler = event => {
      if (this._skipNextFocus && event.type === 'focus') {
        this._skipNextFocus = false;
        return;
      } // We only need to hit the zone when we're selecting a range.


      if (event.target && this.isRange) {
        const cell = this._getCellFromElement(event.target);

        if (cell) {
          this._ngZone.run(() => this.previewChange.emit({
            value: cell.enabled ? cell : null,
            event
          }));
        }
      }
    };
    /**
     * Event handler for when the user's pointer leaves an element
     * inside the calendar body (e.g. by hovering out or blurring).
     */


    this._leaveHandler = event => {
      // We only need to hit the zone when we're selecting a range.
      if (this.previewEnd !== null && this.isRange) {
        // Only reset the preview end value when leaving cells. This looks better, because
        // we have a gap between the cells and the rows and we don't want to remove the
        // range just for it to show up again when the user moves a few pixels to the side.
        if (event.target && isTableCell(event.target)) {
          this._ngZone.run(() => this.previewChange.emit({
            value: null,
            event
          }));
        }
      }
    };

    _ngZone.runOutsideAngular(() => {
      const element = _elementRef.nativeElement;
      element.addEventListener('mouseenter', this._enterHandler, true);
      element.addEventListener('focus', this._enterHandler, true);
      element.addEventListener('mouseleave', this._leaveHandler, true);
      element.addEventListener('blur', this._leaveHandler, true);
    });
  }
  /** Called when a cell is clicked. */


  _cellClicked(cell, event) {
    if (cell.enabled) {
      this.selectedValueChange.emit({
        value: cell.value,
        event
      });
    }
  }
  /** Returns whether a cell should be marked as selected. */


  _isSelected(cell) {
    return this.startValue === cell.compareValue || this.endValue === cell.compareValue;
  }

  ngOnChanges(changes) {
    const columnChanges = changes['numCols'];
    const {
      rows,
      numCols
    } = this;

    if (changes['rows'] || columnChanges) {
      this._firstRowOffset = rows && rows.length && rows[0].length ? numCols - rows[0].length : 0;
    }

    if (changes['cellAspectRatio'] || columnChanges || !this._cellPadding) {
      this._cellPadding = `${50 * this.cellAspectRatio / numCols}%`;
    }

    if (columnChanges || !this._cellWidth) {
      this._cellWidth = `${100 / numCols}%`;
    }
  }

  ngOnDestroy() {
    const element = this._elementRef.nativeElement;
    element.removeEventListener('mouseenter', this._enterHandler, true);
    element.removeEventListener('focus', this._enterHandler, true);
    element.removeEventListener('mouseleave', this._leaveHandler, true);
    element.removeEventListener('blur', this._leaveHandler, true);
  }
  /** Returns whether a cell is active. */


  _isActiveCell(rowIndex, colIndex) {
    let cellNumber = rowIndex * this.numCols + colIndex; // Account for the fact that the first row may not have as many cells.

    if (rowIndex) {
      cellNumber -= this._firstRowOffset;
    }

    return cellNumber == this.activeCell;
  }
  /** Focuses the active cell after the microtask queue is empty. */


  _focusActiveCell(movePreview = true) {
    this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.asObservable().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.take)(1)).subscribe(() => {
        const activeCell = this._elementRef.nativeElement.querySelector('.ngx-mat-calendar-body-active');

        if (activeCell) {
          if (!movePreview) {
            this._skipNextFocus = true;
          }

          activeCell.focus();
        }
      });
    });
  }
  /** Gets whether a value is the start of the main range. */


  _isRangeStart(value) {
    return isStart(value, this.startValue, this.endValue);
  }
  /** Gets whether a value is the end of the main range. */


  _isRangeEnd(value) {
    return isEnd(value, this.startValue, this.endValue);
  }
  /** Gets whether a value is within the currently-selected range. */


  _isInRange(value) {
    return isInRange(value, this.startValue, this.endValue, this.isRange);
  }
  /** Gets whether a value is the start of the comparison range. */


  _isComparisonStart(value) {
    return isStart(value, this.comparisonStart, this.comparisonEnd);
  }
  /** Whether the cell is a start bridge cell between the main and comparison ranges. */


  _isComparisonBridgeStart(value, rowIndex, colIndex) {
    if (!this._isComparisonStart(value) || this._isRangeStart(value) || !this._isInRange(value)) {
      return false;
    }

    let previousCell = this.rows[rowIndex][colIndex - 1];

    if (!previousCell) {
      const previousRow = this.rows[rowIndex - 1];
      previousCell = previousRow && previousRow[previousRow.length - 1];
    }

    return previousCell && !this._isRangeEnd(previousCell.compareValue);
  }
  /** Whether the cell is an end bridge cell between the main and comparison ranges. */


  _isComparisonBridgeEnd(value, rowIndex, colIndex) {
    if (!this._isComparisonEnd(value) || this._isRangeEnd(value) || !this._isInRange(value)) {
      return false;
    }

    let nextCell = this.rows[rowIndex][colIndex + 1];

    if (!nextCell) {
      const nextRow = this.rows[rowIndex + 1];
      nextCell = nextRow && nextRow[0];
    }

    return nextCell && !this._isRangeStart(nextCell.compareValue);
  }
  /** Gets whether a value is the end of the comparison range. */


  _isComparisonEnd(value) {
    return isEnd(value, this.comparisonStart, this.comparisonEnd);
  }
  /** Gets whether a value is within the current comparison range. */


  _isInComparisonRange(value) {
    return isInRange(value, this.comparisonStart, this.comparisonEnd, this.isRange);
  }
  /** Gets whether a value is the start of the preview range. */


  _isPreviewStart(value) {
    return isStart(value, this.previewStart, this.previewEnd);
  }
  /** Gets whether a value is the end of the preview range. */


  _isPreviewEnd(value) {
    return isEnd(value, this.previewStart, this.previewEnd);
  }
  /** Gets whether a value is inside the preview range. */


  _isInPreview(value) {
    return isInRange(value, this.previewStart, this.previewEnd, this.isRange);
  }
  /** Finds the NgxMatCalendarCell that corresponds to a DOM node. */


  _getCellFromElement(element) {
    let cell;

    if (isTableCell(element)) {
      cell = element;
    } else if (isTableCell(element.parentNode)) {
      cell = element.parentNode;
    }

    if (cell) {
      const row = cell.getAttribute('data-ngx-mat-row');
      const col = cell.getAttribute('data-ngx-mat-col');

      if (row && col) {
        return this.rows[parseInt(row)][parseInt(col)];
      }
    }

    return null;
  }

}
/** @nocollapse */

/** @nocollapse */


NgxMatCalendarBody.ɵfac = function NgxMatCalendarBody_Factory(t) {
  return new (t || NgxMatCalendarBody)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
};
/** @nocollapse */

/** @nocollapse */


NgxMatCalendarBody.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NgxMatCalendarBody,
  selectors: [["", "ngx-mat-calendar-body", ""]],
  hostAttrs: ["role", "grid", "aria-readonly", "true", 1, "ngx-mat-calendar-body"],
  inputs: {
    label: "label",
    rows: "rows",
    todayValue: "todayValue",
    startValue: "startValue",
    endValue: "endValue",
    labelMinRequiredCells: "labelMinRequiredCells",
    numCols: "numCols",
    activeCell: "activeCell",
    isRange: "isRange",
    cellAspectRatio: "cellAspectRatio",
    comparisonStart: "comparisonStart",
    comparisonEnd: "comparisonEnd",
    previewStart: "previewStart",
    previewEnd: "previewEnd"
  },
  outputs: {
    selectedValueChange: "selectedValueChange",
    previewChange: "previewChange"
  },
  exportAs: ["NgxMatCalendarBody"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  attrs: _c0,
  decls: 2,
  vars: 2,
  consts: [["aria-hidden", "true", 4, "ngIf"], ["role", "row", 4, "ngFor", "ngForOf"], ["aria-hidden", "true"], [1, "mat-calendar-body-label"], ["role", "row"], ["aria-hidden", "true", "class", "mat-calendar-body-label", 3, "paddingTop", "paddingBottom", 4, "ngIf"], ["role", "gridcell", "class", "mat-calendar-body-cell", 3, "ngClass", "tabindex", "mat-calendar-body-disabled", "mat-calendar-body-active", "mat-calendar-body-range-start", "mat-calendar-body-range-end", "mat-calendar-body-in-range", "mat-calendar-body-comparison-bridge-start", "mat-calendar-body-comparison-bridge-end", "mat-calendar-body-comparison-start", "mat-calendar-body-comparison-end", "mat-calendar-body-in-comparison-range", "mat-calendar-body-preview-start", "mat-calendar-body-preview-end", "mat-calendar-body-in-preview", "width", "paddingTop", "paddingBottom", "click", 4, "ngFor", "ngForOf"], ["aria-hidden", "true", 1, "mat-calendar-body-label"], ["role", "gridcell", 1, "mat-calendar-body-cell", 3, "ngClass", "tabindex", "click"], [1, "mat-calendar-body-cell-content", "mat-focus-indicator"], [1, "mat-calendar-body-cell-preview"]],
  template: function NgxMatCalendarBody_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, NgxMatCalendarBody_tr_0_Template, 3, 6, "tr", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NgxMatCalendarBody_tr_1_Template, 3, 2, "tr", 1);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx._firstRowOffset < ctx.labelMinRequiredCells);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.rows);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass],
  styles: [".mat-calendar-body{min-width:224px}.mat-calendar-body-label{height:0;line-height:0;text-align:left;padding-left:4.7142857143%;padding-right:4.7142857143%}.mat-calendar-body-cell{position:relative;height:0;line-height:0;text-align:center;outline:none;cursor:pointer}.mat-calendar-body-cell:before,.mat-calendar-body-cell:after,.mat-calendar-body-cell-preview{content:\"\";position:absolute;top:5%;left:0;z-index:0;box-sizing:border-box;height:90%;width:100%}.mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range):before,.mat-calendar-body-range-start:after,.mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start):before,.mat-calendar-body-comparison-start:after,.mat-calendar-body-preview-start .mat-calendar-body-cell-preview{left:5%;width:95%;border-top-left-radius:999px;border-bottom-left-radius:999px}[dir=rtl] .mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range):before,[dir=rtl] .mat-calendar-body-range-start:after,[dir=rtl] .mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start):before,[dir=rtl] .mat-calendar-body-comparison-start:after,[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview{left:0;border-radius:0 999px 999px 0}.mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range):before,.mat-calendar-body-range-end:after,.mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end):before,.mat-calendar-body-comparison-end:after,.mat-calendar-body-preview-end .mat-calendar-body-cell-preview{width:95%;border-top-right-radius:999px;border-bottom-right-radius:999px}[dir=rtl] .mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range):before,[dir=rtl] .mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end):before,[dir=rtl] .mat-calendar-body-comparison-end:after,[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview{left:5%;border-radius:999px 0 0 999px}[dir=rtl] .mat-calendar-body-comparison-bridge-start.mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-bridge-end.mat-calendar-body-range-start:after{width:95%;border-top-right-radius:999px;border-bottom-right-radius:999px}.mat-calendar-body-comparison-start.mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-start.mat-calendar-body-range-end:after,.mat-calendar-body-comparison-end.mat-calendar-body-range-start:after,[dir=rtl] .mat-calendar-body-comparison-end.mat-calendar-body-range-start:after{width:90%}.mat-calendar-body-in-preview .mat-calendar-body-cell-preview{border-top:dashed 1px;border-bottom:dashed 1px}.mat-calendar-body-preview-start .mat-calendar-body-cell-preview{border-left:dashed 1px}[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview{border-left:0;border-right:dashed 1px}.mat-calendar-body-preview-end .mat-calendar-body-cell-preview{border-right:dashed 1px}[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview{border-right:0;border-left:dashed 1px}.mat-calendar-body-disabled{cursor:default}.mat-calendar-body-cell-content{top:5%;left:5%;z-index:1;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:1px;border-style:solid;border-radius:999px}.mat-calendar-body-cell-content.mat-focus-indicator{position:absolute}.cdk-high-contrast-active .mat-calendar-body-cell-content{border:none}.cdk-high-contrast-active .mat-datepicker-popup:not(:empty),.cdk-high-contrast-active .mat-calendar-body-selected{outline:solid 1px}.cdk-high-contrast-active .mat-calendar-body-today{outline:dotted 1px}.cdk-high-contrast-active .cdk-keyboard-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.cdk-high-contrast-active .cdk-program-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){outline:dotted 2px}[dir=rtl] .mat-calendar-body-label{text-align:right}@media (hover: none){.mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){background-color:transparent}}\n"],
  encapsulation: 2,
  changeDetection: 0
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatCalendarBody, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: '[ngx-mat-calendar-body]',
      host: {
        'class': 'ngx-mat-calendar-body',
        'role': 'grid',
        'aria-readonly': 'true'
      },
      exportAs: 'NgxMatCalendarBody',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<!--\r\n  If there's not enough space in the first row, create a separate label row. We mark this row as\r\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\r\n-->\r\n<tr *ngIf=\"_firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\">\r\n  <td class=\"mat-calendar-body-label\"\r\n      [attr.colspan]=\"numCols\"\r\n      [style.paddingTop]=\"_cellPadding\"\r\n      [style.paddingBottom]=\"_cellPadding\">\r\n    {{label}}\r\n  </td>\r\n</tr>\r\n\r\n<!-- Create the first row separately so we can include a special spacer cell. -->\r\n<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\r\n  <!--\r\n    We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\r\n    The aspect ratio of the table cells is maintained by setting the top and bottom padding as a\r\n    percentage of the width (a variant of the trick described here:\r\n    https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).\r\n  -->\r\n  <td *ngIf=\"rowIndex === 0 && _firstRowOffset\"\r\n      aria-hidden=\"true\"\r\n      class=\"mat-calendar-body-label\"\r\n      [attr.colspan]=\"_firstRowOffset\"\r\n      [style.paddingTop]=\"_cellPadding\"\r\n      [style.paddingBottom]=\"_cellPadding\">\r\n    {{_firstRowOffset >= labelMinRequiredCells ? label : ''}}\r\n  </td>\r\n  <td *ngFor=\"let item of row; let colIndex = index\"\r\n      role=\"gridcell\"\r\n      class=\"mat-calendar-body-cell\"\r\n      [ngClass]=\"item.cssClasses\"\r\n      [tabindex]=\"_isActiveCell(rowIndex, colIndex) ? 0 : -1\"\r\n      [attr.data-mat-row]=\"rowIndex\"\r\n      [attr.data-mat-col]=\"colIndex\"\r\n      [class.mat-calendar-body-disabled]=\"!item.enabled\"\r\n      [class.mat-calendar-body-active]=\"_isActiveCell(rowIndex, colIndex)\"\r\n      [class.mat-calendar-body-range-start]=\"_isRangeStart(item.compareValue)\"\r\n      [class.mat-calendar-body-range-end]=\"_isRangeEnd(item.compareValue)\"\r\n      [class.mat-calendar-body-in-range]=\"_isInRange(item.compareValue)\"\r\n      [class.mat-calendar-body-comparison-bridge-start]=\"_isComparisonBridgeStart(item.compareValue, rowIndex, colIndex)\"\r\n      [class.mat-calendar-body-comparison-bridge-end]=\"_isComparisonBridgeEnd(item.compareValue, rowIndex, colIndex)\"\r\n      [class.mat-calendar-body-comparison-start]=\"_isComparisonStart(item.compareValue)\"\r\n      [class.mat-calendar-body-comparison-end]=\"_isComparisonEnd(item.compareValue)\"\r\n      [class.mat-calendar-body-in-comparison-range]=\"_isInComparisonRange(item.compareValue)\"\r\n      [class.mat-calendar-body-preview-start]=\"_isPreviewStart(item.compareValue)\"\r\n      [class.mat-calendar-body-preview-end]=\"_isPreviewEnd(item.compareValue)\"\r\n      [class.mat-calendar-body-in-preview]=\"_isInPreview(item.compareValue)\"\r\n      [attr.aria-label]=\"item.ariaLabel\"\r\n      [attr.aria-disabled]=\"!item.enabled || null\"\r\n      [attr.aria-selected]=\"_isSelected(item)\"\r\n      (click)=\"_cellClicked(item, $event)\"\r\n      [style.width]=\"_cellWidth\"\r\n      [style.paddingTop]=\"_cellPadding\"\r\n      [style.paddingBottom]=\"_cellPadding\">\r\n      <div class=\"mat-calendar-body-cell-content mat-focus-indicator\"\r\n        [class.mat-calendar-body-selected]=\"_isSelected(item)\"\r\n        [class.mat-calendar-body-today]=\"todayValue === item.compareValue\">\r\n        {{item.displayValue}}\r\n      </div>\r\n      <div class=\"mat-calendar-body-cell-preview\"></div>\r\n  </td>\r\n</tr>\r\n",
      styles: [".mat-calendar-body{min-width:224px}.mat-calendar-body-label{height:0;line-height:0;text-align:left;padding-left:4.7142857143%;padding-right:4.7142857143%}.mat-calendar-body-cell{position:relative;height:0;line-height:0;text-align:center;outline:none;cursor:pointer}.mat-calendar-body-cell:before,.mat-calendar-body-cell:after,.mat-calendar-body-cell-preview{content:\"\";position:absolute;top:5%;left:0;z-index:0;box-sizing:border-box;height:90%;width:100%}.mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range):before,.mat-calendar-body-range-start:after,.mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start):before,.mat-calendar-body-comparison-start:after,.mat-calendar-body-preview-start .mat-calendar-body-cell-preview{left:5%;width:95%;border-top-left-radius:999px;border-bottom-left-radius:999px}[dir=rtl] .mat-calendar-body-range-start:not(.mat-calendar-body-in-comparison-range):before,[dir=rtl] .mat-calendar-body-range-start:after,[dir=rtl] .mat-calendar-body-comparison-start:not(.mat-calendar-body-comparison-bridge-start):before,[dir=rtl] .mat-calendar-body-comparison-start:after,[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview{left:0;border-radius:0 999px 999px 0}.mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range):before,.mat-calendar-body-range-end:after,.mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end):before,.mat-calendar-body-comparison-end:after,.mat-calendar-body-preview-end .mat-calendar-body-cell-preview{width:95%;border-top-right-radius:999px;border-bottom-right-radius:999px}[dir=rtl] .mat-calendar-body-range-end:not(.mat-calendar-body-in-comparison-range):before,[dir=rtl] .mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-end:not(.mat-calendar-body-comparison-bridge-end):before,[dir=rtl] .mat-calendar-body-comparison-end:after,[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview{left:5%;border-radius:999px 0 0 999px}[dir=rtl] .mat-calendar-body-comparison-bridge-start.mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-bridge-end.mat-calendar-body-range-start:after{width:95%;border-top-right-radius:999px;border-bottom-right-radius:999px}.mat-calendar-body-comparison-start.mat-calendar-body-range-end:after,[dir=rtl] .mat-calendar-body-comparison-start.mat-calendar-body-range-end:after,.mat-calendar-body-comparison-end.mat-calendar-body-range-start:after,[dir=rtl] .mat-calendar-body-comparison-end.mat-calendar-body-range-start:after{width:90%}.mat-calendar-body-in-preview .mat-calendar-body-cell-preview{border-top:dashed 1px;border-bottom:dashed 1px}.mat-calendar-body-preview-start .mat-calendar-body-cell-preview{border-left:dashed 1px}[dir=rtl] .mat-calendar-body-preview-start .mat-calendar-body-cell-preview{border-left:0;border-right:dashed 1px}.mat-calendar-body-preview-end .mat-calendar-body-cell-preview{border-right:dashed 1px}[dir=rtl] .mat-calendar-body-preview-end .mat-calendar-body-cell-preview{border-right:0;border-left:dashed 1px}.mat-calendar-body-disabled{cursor:default}.mat-calendar-body-cell-content{top:5%;left:5%;z-index:1;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;line-height:1;border-width:1px;border-style:solid;border-radius:999px}.mat-calendar-body-cell-content.mat-focus-indicator{position:absolute}.cdk-high-contrast-active .mat-calendar-body-cell-content{border:none}.cdk-high-contrast-active .mat-datepicker-popup:not(:empty),.cdk-high-contrast-active .mat-calendar-body-selected{outline:solid 1px}.cdk-high-contrast-active .mat-calendar-body-today{outline:dotted 1px}.cdk-high-contrast-active .cdk-keyboard-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected),.cdk-high-contrast-active .cdk-program-focused .mat-calendar-body-active>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){outline:dotted 2px}[dir=rtl] .mat-calendar-body-label{text-align:right}@media (hover: none){.mat-calendar-body-cell:not(.mat-calendar-body-disabled):hover>.mat-calendar-body-cell-content:not(.mat-calendar-body-selected){background-color:transparent}}\n"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }];
  }, {
    label: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    rows: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    todayValue: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    startValue: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    endValue: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    labelMinRequiredCells: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    numCols: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    activeCell: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    isRange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    cellAspectRatio: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    comparisonStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    comparisonEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    previewStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    previewEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selectedValueChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    previewChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }]
  });
})();
/** Checks whether a node is a table cell element. */


function isTableCell(node) {
  return node.nodeName === 'TD';
}
/** Checks whether a value is the start of a range. */


function isStart(value, start, end) {
  return end !== null && start !== end && value < end && value === start;
}
/** Checks whether a value is the end of a range. */


function isEnd(value, start, end) {
  return start !== null && start !== end && value >= start && value === end;
}
/** Checks whether a value is inside of a range. */


function isInRange(value, start, end, rangeEnabled) {
  return rangeEnabled && start !== null && end !== null && start !== end && value >= start && value <= end;
}

class NgxMatDateAdapter extends _angular_material_core__WEBPACK_IMPORTED_MODULE_3__.DateAdapter {
  /**
   * Check if two date have same time
   * @param a Date 1
   * @param b Date 2
   */
  isSameTime(a, b) {
    if (a == null || b == null) return true;
    return this.getHour(a) === this.getHour(b) && this.getMinute(a) === this.getMinute(b) && this.getSecond(a) === this.getSecond(b);
  }
  /**
   * Copy time from a date to a another date
   * @param toDate
   * @param fromDate
   */


  copyTime(toDate, fromDate) {
    this.setHour(toDate, this.getHour(fromDate));
    this.setMinute(toDate, this.getMinute(fromDate));
    this.setSecond(toDate, this.getSecond(fromDate));
  }
  /**
  * Compares two dates.
  * @param first The first date to compare.
  * @param second The second date to compare.
  * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
  *     a number greater than 0 if the first date is later.
  */


  compareDateWithTime(first, second, showSeconds) {
    let res = super.compareDate(first, second) || this.getHour(first) - this.getHour(second) || this.getMinute(first) - this.getMinute(second);

    if (showSeconds) {
      res = res || this.getSecond(first) - this.getSecond(second);
    }

    return res;
  }
  /**
   * Set time by using default values
   * @param defaultTime List default values [hour, minute, second]
   */


  setTimeByDefaultValues(date, defaultTime) {
    if (!Array.isArray(defaultTime)) {
      throw Error('@Input DefaultTime should be an array');
    }

    this.setHour(date, defaultTime[0] || 0);
    this.setMinute(date, defaultTime[1] || 0);
    this.setSecond(date, defaultTime[2] || 0);
  }

}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Injection token used to customize the date range selection behavior. */


const NGX_MAT_DATE_RANGE_SELECTION_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('NGX_MAT_DATE_RANGE_SELECTION_STRATEGY');
/** Provides the default date range selection behavior. */

class DefaultNgxMatCalendarRangeStrategy {
  constructor(_dateAdapter) {
    this._dateAdapter = _dateAdapter;
  }

  selectionFinished(date, currentRange) {
    let {
      start,
      end
    } = currentRange;

    if (start == null) {
      start = date;
    } else if (end == null && date && this._dateAdapter.compareDate(date, start) >= 0) {
      end = date;
    } else {
      start = date;
      end = null;
    }

    return new _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.DateRange(start, end);
  }

  createPreview(activeDate, currentRange) {
    let start = null;
    let end = null;

    if (currentRange.start && !currentRange.end && activeDate) {
      start = currentRange.start;
      end = activeDate;
    }

    return new _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.DateRange(start, end);
  }

}
/** @nocollapse */

/** @nocollapse */


DefaultNgxMatCalendarRangeStrategy.ɵfac = function DefaultNgxMatCalendarRangeStrategy_Factory(t) {
  return new (t || DefaultNgxMatCalendarRangeStrategy)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](NgxMatDateAdapter));
};
/** @nocollapse */

/** @nocollapse */


DefaultNgxMatCalendarRangeStrategy.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: DefaultNgxMatCalendarRangeStrategy,
  factory: DefaultNgxMatCalendarRangeStrategy.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DefaultNgxMatCalendarRangeStrategy, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable
  }], function () {
    return [{
      type: NgxMatDateAdapter
    }];
  }, null);
})();

const LIMIT_TIMES = {
  minHour: 0,
  maxHour: 24,
  minMinute: 0,
  maxMinute: 60,
  minSecond: 0,
  maxSecond: 60,
  meridian: 12
};
const MERIDIANS = {
  AM: 'AM',
  PM: 'PM'
};
const DEFAULT_STEP = 1;
const NUMERIC_REGEX = /[^0-9]/g;
const PATTERN_INPUT_HOUR = /^(2[0-3]|[0-1][0-9]|[0-9])$/;
const PATTERN_INPUT_MINUTE = /^([0-5][0-9]|[0-9])$/;
const PATTERN_INPUT_SECOND = /^([0-5][0-9]|[0-9])$/;

function formatTwoDigitTimeValue(val) {
  const txt = val.toString();
  return txt.length > 1 ? txt : `0${txt}`;
}

function createMissingDateImplError(provider) {
  return Error(`NgxMatDatepicker: No provider found for ${provider}. You must import one of the following ` + `modules at your application root: NgxMatNativeDateModule, NgxMatMomentModule, or provide a ` + `custom implementation.`);
}
/** Formats a range of years. */


function formatYearRange(start, end) {
  return `${start} \u2013 ${end}`;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * @docs-private
 */

class NgxMatMonthView {
  constructor(_changeDetectorRef, _dateFormats, _dateAdapter, _dir, _rangeStrategy) {
    this._changeDetectorRef = _changeDetectorRef;
    this._dateFormats = _dateFormats;
    this._dateAdapter = _dateAdapter;
    this._dir = _dir;
    this._rangeStrategy = _rangeStrategy;
    this._rerenderSubscription = rxjs__WEBPACK_IMPORTED_MODULE_5__.Subscription.EMPTY;
    /** Emits when a new date is selected. */

    this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits when any date is selected. */

    this._userSelection = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits when any date is activated. */

    this.activeDateChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();

    if (!this._dateAdapter) {
      throw createMissingDateImplError('NgxMatDateAdapter');
    }

    if (!this._dateFormats) {
      throw createMissingDateImplError('NGX_MAT_DATE_FORMATS');
    }

    this._activeDate = this._dateAdapter.today();
  }
  /**
   * The date to display in this month view (everything other than the month and year is ignored).
   */


  get activeDate() {
    return this._activeDate;
  }

  set activeDate(value) {
    const oldActiveDate = this._activeDate;

    const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();

    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);

    if (!this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
      this._init();
    }
  }
  /** The currently selected date. */


  get selected() {
    return this._selected;
  }

  set selected(value) {
    if (value instanceof _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.DateRange) {
      this._selected = value;
    } else {
      this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }

    this._setRanges(this._selected);
  }
  /** The minimum selectable date. */


  get minDate() {
    return this._minDate;
  }

  set minDate(value) {
    this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  /** The maximum selectable date. */


  get maxDate() {
    return this._maxDate;
  }

  set maxDate(value) {
    this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  ngAfterContentInit() {
    this._rerenderSubscription = this._dateAdapter.localeChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.startWith)(null)).subscribe(() => this._init());
  }

  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
  }
  /** Handles when a new date is selected. */


  _dateSelected(event) {
    const date = event.value;

    const selectedYear = this._dateAdapter.getYear(this.activeDate);

    const selectedMonth = this._dateAdapter.getMonth(this.activeDate);

    const selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, date);

    let rangeStartDate;
    let rangeEndDate;

    if (this._selected instanceof _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.DateRange) {
      rangeStartDate = this._getDateInCurrentMonth(this._selected.start);
      rangeEndDate = this._getDateInCurrentMonth(this._selected.end);
    } else {
      rangeStartDate = rangeEndDate = this._getDateInCurrentMonth(this._selected);
    }

    if (rangeStartDate !== date || rangeEndDate !== date) {
      this.selectedChange.emit(selectedDate);
    }

    this._userSelection.emit({
      value: selectedDate,
      event: event.event
    });
  }
  /** Handles keydown events on the calendar body when calendar is in month view. */


  _handleCalendarBodyKeydown(event) {
    // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
    // disabled ones from being selected. This may not be ideal, we should look into whether
    // navigation should skip over disabled dates, and if so, how to implement that efficiently.
    const oldActiveDate = this._activeDate;

    const isRtl = this._isRtl();

    switch (event.keyCode) {
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.LEFT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? 1 : -1);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.RIGHT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? -1 : 1);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.UP_ARROW:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, -7);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.DOWN_ARROW:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 7);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.HOME:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 1 - this._dateAdapter.getDate(this._activeDate));
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.END:
        this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, this._dateAdapter.getNumDaysInMonth(this._activeDate) - this._dateAdapter.getDate(this._activeDate));
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.PAGE_UP:
        this.activeDate = event.altKey ? this._dateAdapter.addCalendarYears(this._activeDate, -1) : this._dateAdapter.addCalendarMonths(this._activeDate, -1);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.PAGE_DOWN:
        this.activeDate = event.altKey ? this._dateAdapter.addCalendarYears(this._activeDate, 1) : this._dateAdapter.addCalendarMonths(this._activeDate, 1);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.ENTER:
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.SPACE:
        if (!this.dateFilter || this.dateFilter(this._activeDate)) {
          this._dateSelected({
            value: this._dateAdapter.getDate(this._activeDate),
            event
          }); // Prevent unexpected default actions such as form submission.


          event.preventDefault();
        }

        return;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.ESCAPE:
        // Abort the current range selection if the user presses escape mid-selection.
        if (this._previewEnd != null) {
          this._previewStart = this._previewEnd = null;
          this.selectedChange.emit(null);

          this._userSelection.emit({
            value: null,
            event
          });

          event.preventDefault();
          event.stopPropagation(); // Prevents the overlay from closing.
        }

        return;

      default:
        // Don't prevent default or focus active cell on keys that we don't explicitly handle.
        return;
    }

    if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
      this.activeDateChange.emit(this.activeDate);
    }

    this._focusActiveCell(); // Prevent unexpected default actions such as form submission.


    event.preventDefault();
  }
  /** Initializes this month view. */


  _init() {
    this._setRanges(this.selected);

    this._todayDate = this._getCellCompareValue(this._dateAdapter.today());
    this._monthLabel = this._dateAdapter.getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase();

    let firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);

    this._firstWeekOffset = (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) - this._dateAdapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;

    this._initWeekdays();

    this._createWeekCells();

    this._changeDetectorRef.markForCheck();
  }
  /** Focuses the active cell after the microtask queue is empty. */


  _focusActiveCell(movePreview) {
    this._matCalendarBody._focusActiveCell(movePreview);
  }
  /** Called when the user has activated a new cell and the preview needs to be updated. */


  _previewChanged({
    event,
    value: cell
  }) {
    if (this._rangeStrategy) {
      // We can assume that this will be a range, because preview
      // events aren't fired for single date selections.
      const value = cell ? cell.rawValue : null;

      const previewRange = this._rangeStrategy.createPreview(value, this.selected, event);

      this._previewStart = this._getCellCompareValue(previewRange.start);
      this._previewEnd = this._getCellCompareValue(previewRange.end); // Note that here we need to use `detectChanges`, rather than `markForCheck`, because
      // the way `_focusActiveCell` is set up at the moment makes it fire at the wrong time
      // when navigating one month back using the keyboard which will cause this handler
      // to throw a "changed after checked" error when updating the preview state.

      this._changeDetectorRef.detectChanges();
    }
  }
  /** Initializes the weekdays. */


  _initWeekdays() {
    const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();

    const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');

    const longWeekdays = this._dateAdapter.getDayOfWeekNames('long'); // Rotate the labels for days of the week based on the configured first day of the week.


    let weekdays = longWeekdays.map((long, i) => {
      return {
        long,
        narrow: narrowWeekdays[i]
      };
    });
    this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
  }
  /** Creates MatCalendarCells for the dates in this month. */


  _createWeekCells() {
    const daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);

    const dateNames = this._dateAdapter.getDateNames();

    this._weeks = [[]];

    for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
      if (cell == DAYS_PER_WEEK) {
        this._weeks.push([]);

        cell = 0;
      }

      const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), i + 1);

      const enabled = this._shouldEnableDate(date);

      const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);

      const cellClasses = this.dateClass ? this.dateClass(date) : undefined;

      this._weeks[this._weeks.length - 1].push(new NgxMatCalendarCell(i + 1, dateNames[i], ariaLabel, enabled, cellClasses, this._getCellCompareValue(date), date));
    }
  }
  /** Date filter for the month */


  _shouldEnableDate(date) {
    return !!date && (!this.minDate || this._dateAdapter.compareDate(date, this.minDate) >= 0) && (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate) <= 0) && (!this.dateFilter || this.dateFilter(date));
  }
  /**
   * Gets the date in this month that the given Date falls on.
   * Returns null if the given Date is in another month.
   */


  _getDateInCurrentMonth(date) {
    return date && this._hasSameMonthAndYear(date, this.activeDate) ? this._dateAdapter.getDate(date) : null;
  }
  /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */


  _hasSameMonthAndYear(d1, d2) {
    return !!(d1 && d2 && this._dateAdapter.getMonth(d1) == this._dateAdapter.getMonth(d2) && this._dateAdapter.getYear(d1) == this._dateAdapter.getYear(d2));
  }
  /** Gets the value that will be used to one cell to another. */


  _getCellCompareValue(date) {
    if (date) {
      // We use the time since the Unix epoch to compare dates in this view, rather than the
      // cell values, because we need to support ranges that span across multiple months/years.
      const year = this._dateAdapter.getYear(date);

      const month = this._dateAdapter.getMonth(date);

      const day = this._dateAdapter.getDate(date);

      return new Date(year, month, day).getTime();
    }

    return null;
  }
  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */


  _getValidDateOrNull(obj) {
    return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
  }
  /** Determines whether the user has the RTL layout direction. */


  _isRtl() {
    return this._dir && this._dir.value === 'rtl';
  }
  /** Sets the current range based on a model value. */


  _setRanges(selectedValue) {
    if (selectedValue instanceof _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.DateRange) {
      this._rangeStart = this._getCellCompareValue(selectedValue.start);
      this._rangeEnd = this._getCellCompareValue(selectedValue.end);
      this._isRange = true;
    } else {
      this._rangeStart = this._rangeEnd = this._getCellCompareValue(selectedValue);
      this._isRange = false;
    }

    this._comparisonRangeStart = this._getCellCompareValue(this.comparisonStart);
    this._comparisonRangeEnd = this._getCellCompareValue(this.comparisonEnd);
  }

}
/** @nocollapse */

/** @nocollapse */


NgxMatMonthView.ɵfac = function NgxMatMonthView_Factory(t) {
  return new (t || NgxMatMonthView)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NGX_MAT_DATE_FORMATS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgxMatDateAdapter, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NGX_MAT_DATE_RANGE_SELECTION_STRATEGY, 8));
};
/** @nocollapse */

/** @nocollapse */


NgxMatMonthView.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NgxMatMonthView,
  selectors: [["ngx-mat-month-view"]],
  viewQuery: function NgxMatMonthView_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](NgxMatCalendarBody, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._matCalendarBody = _t.first);
    }
  },
  inputs: {
    activeDate: "activeDate",
    selected: "selected",
    minDate: "minDate",
    maxDate: "maxDate",
    dateFilter: "dateFilter",
    dateClass: "dateClass",
    comparisonStart: "comparisonStart",
    comparisonEnd: "comparisonEnd"
  },
  outputs: {
    selectedChange: "selectedChange",
    _userSelection: "_userSelection",
    activeDateChange: "activeDateChange"
  },
  exportAs: ["ngxMatMonthView"],
  decls: 7,
  vars: 13,
  consts: [["role", "presentation", 1, "mat-calendar-table"], [1, "mat-calendar-table-header"], ["scope", "col", 4, "ngFor", "ngForOf"], ["colspan", "7", "aria-hidden", "true", 1, "mat-calendar-table-header-divider"], ["ngx-mat-calendar-body", "", 3, "label", "rows", "todayValue", "startValue", "endValue", "comparisonStart", "comparisonEnd", "previewStart", "previewEnd", "isRange", "labelMinRequiredCells", "activeCell", "selectedValueChange", "previewChange", "keydown"], ["scope", "col"]],
  template: function NgxMatMonthView_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table", 0)(1, "thead", 1)(2, "tr");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, NgxMatMonthView_th_3_Template, 2, 2, "th", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "tr");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "th", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "tbody", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedValueChange", function NgxMatMonthView_Template_tbody_selectedValueChange_6_listener($event) {
        return ctx._dateSelected($event);
      })("previewChange", function NgxMatMonthView_Template_tbody_previewChange_6_listener($event) {
        return ctx._previewChanged($event);
      })("keydown", function NgxMatMonthView_Template_tbody_keydown_6_listener($event) {
        return ctx._handleCalendarBodyKeydown($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx._weekdays);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", ctx._monthLabel)("rows", ctx._weeks)("todayValue", ctx._todayDate)("startValue", ctx._rangeStart)("endValue", ctx._rangeEnd)("comparisonStart", ctx._comparisonRangeStart)("comparisonEnd", ctx._comparisonRangeEnd)("previewStart", ctx._previewStart)("previewEnd", ctx._previewEnd)("isRange", ctx._isRange)("labelMinRequiredCells", 3)("activeCell", ctx._dateAdapter.getDate(ctx.activeDate) - 1);
    }
  },
  directives: [NgxMatCalendarBody, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf],
  encapsulation: 2,
  changeDetection: 0
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatMonthView, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-mat-month-view',
      exportAs: 'ngxMatMonthView',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<table class=\"mat-calendar-table\" role=\"presentation\">\r\n  <thead class=\"mat-calendar-table-header\">\r\n    <tr>\r\n      <th scope=\"col\" *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th>\r\n    </tr>\r\n    <tr><th class=\"mat-calendar-table-header-divider\" colspan=\"7\" aria-hidden=\"true\"></th></tr>\r\n  </thead>\r\n  <tbody ngx-mat-calendar-body\r\n         [label]=\"_monthLabel\"\r\n         [rows]=\"_weeks\"\r\n         [todayValue]=\"_todayDate!\"\r\n         [startValue]=\"_rangeStart!\"\r\n         [endValue]=\"_rangeEnd!\"\r\n         [comparisonStart]=\"_comparisonRangeStart\"\r\n         [comparisonEnd]=\"_comparisonRangeEnd\"\r\n         [previewStart]=\"_previewStart\"\r\n         [previewEnd]=\"_previewEnd\"\r\n         [isRange]=\"_isRange\"\r\n         [labelMinRequiredCells]=\"3\"\r\n         [activeCell]=\"_dateAdapter.getDate(activeDate) - 1\"\r\n         (selectedValueChange)=\"_dateSelected($event)\"\r\n         (previewChange)=\"_previewChanged($event)\"\r\n         (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n"
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NGX_MAT_DATE_FORMATS]
      }]
    }, {
      type: NgxMatDateAdapter,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NGX_MAT_DATE_RANGE_SELECTION_STRATEGY]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }];
  }, {
    activeDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    minDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    maxDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    dateFilter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    dateClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    comparisonStart: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    comparisonEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selectedChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    _userSelection: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    activeDateChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    _matCalendarBody: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [NgxMatCalendarBody]
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const yearsPerPage = 24;
const yearsPerRow = 4;
/**
 * An internal component used to display a year selector in the datepicker.
 * @docs-private
 */

class NgxMatMultiYearView {
  constructor(_changeDetectorRef, _dateAdapter, _dir) {
    this._changeDetectorRef = _changeDetectorRef;
    this._dateAdapter = _dateAdapter;
    this._dir = _dir;
    this._rerenderSubscription = rxjs__WEBPACK_IMPORTED_MODULE_5__.Subscription.EMPTY;
    /** Emits when a new year is selected. */

    this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits the selected year. This doesn't imply a change on the selected date */

    this.yearSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits when any date is activated. */

    this.activeDateChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();

    if (!this._dateAdapter) {
      throw createMissingDateImplError('NgxMatDateAdapter');
    }

    this._activeDate = this._dateAdapter.today();
  }
  /** The date to display in this multi-year view (everything other than the year is ignored). */


  get activeDate() {
    return this._activeDate;
  }

  set activeDate(value) {
    let oldActiveDate = this._activeDate;

    const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();

    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);

    if (!isSameMultiYearView(this._dateAdapter, oldActiveDate, this._activeDate, this.minDate, this.maxDate)) {
      this._init();
    }
  }
  /** The currently selected date. */


  get selected() {
    return this._selected;
  }

  set selected(value) {
    if (value instanceof _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.DateRange) {
      this._selected = value;
    } else {
      this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }

    this._setSelectedYear(value);
  }
  /** The minimum selectable date. */


  get minDate() {
    return this._minDate;
  }

  set minDate(value) {
    this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  /** The maximum selectable date. */


  get maxDate() {
    return this._maxDate;
  }

  set maxDate(value) {
    this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  ngAfterContentInit() {
    this._rerenderSubscription = this._dateAdapter.localeChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.startWith)(null)).subscribe(() => this._init());
  }

  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
  }
  /** Initializes this multi-year view. */


  _init() {
    this._todayYear = this._dateAdapter.getYear(this._dateAdapter.today()); // We want a range years such that we maximize the number of
    // enabled dates visible at once. This prevents issues where the minimum year
    // is the last item of a page OR the maximum year is the first item of a page.
    // The offset from the active year to the "slot" for the starting year is the
    // *actual* first rendered year in the multi-year view.

    const activeYear = this._dateAdapter.getYear(this._activeDate);

    const minYearOfPage = activeYear - getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate);
    this._years = [];

    for (let i = 0, row = []; i < yearsPerPage; i++) {
      row.push(minYearOfPage + i);

      if (row.length == yearsPerRow) {
        this._years.push(row.map(year => this._createCellForYear(year)));

        row = [];
      }
    }

    this._changeDetectorRef.markForCheck();
  }
  /** Handles when a new year is selected. */


  _yearSelected(event) {
    const year = event.value;
    this.yearSelected.emit(this._dateAdapter.createDate(year, 0, 1));

    let month = this._dateAdapter.getMonth(this.activeDate);

    let daysInMonth = this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(year, month, 1));

    this.selectedChange.emit(this._dateAdapter.createDate(year, month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
  }
  /** Handles keydown events on the calendar body when calendar is in multi-year view. */


  _handleCalendarBodyKeydown(event) {
    const oldActiveDate = this._activeDate;

    const isRtl = this._isRtl();

    switch (event.keyCode) {
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.LEFT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? 1 : -1);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.RIGHT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, isRtl ? -1 : 1);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.UP_ARROW:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -yearsPerRow);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.DOWN_ARROW:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, yearsPerRow);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.HOME:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate));
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.END:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, yearsPerPage - getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate) - 1);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.PAGE_UP:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -yearsPerPage * 10 : -yearsPerPage);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.PAGE_DOWN:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? yearsPerPage * 10 : yearsPerPage);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.ENTER:
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.SPACE:
        this._yearSelected({
          value: this._dateAdapter.getYear(this._activeDate),
          event
        });

        break;

      default:
        // Don't prevent default or focus active cell on keys that we don't explicitly handle.
        return;
    }

    if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
      this.activeDateChange.emit(this.activeDate);
    }

    this._focusActiveCell(); // Prevent unexpected default actions such as form submission.


    event.preventDefault();
  }

  _getActiveCell() {
    return getActiveOffset(this._dateAdapter, this.activeDate, this.minDate, this.maxDate);
  }
  /** Focuses the active cell after the microtask queue is empty. */


  _focusActiveCell() {
    this._matCalendarBody._focusActiveCell();
  }
  /** Creates an MatCalendarCell for the given year. */


  _createCellForYear(year) {
    let yearName = this._dateAdapter.getYearName(this._dateAdapter.createDate(year, 0, 1));

    return new NgxMatCalendarCell(year, yearName, yearName, this._shouldEnableYear(year));
  }
  /** Whether the given year is enabled. */


  _shouldEnableYear(year) {
    // disable if the year is greater than maxDate lower than minDate
    if (year === undefined || year === null || this.maxDate && year > this._dateAdapter.getYear(this.maxDate) || this.minDate && year < this._dateAdapter.getYear(this.minDate)) {
      return false;
    } // enable if it reaches here and there's no filter defined


    if (!this.dateFilter) {
      return true;
    }

    const firstOfYear = this._dateAdapter.createDate(year, 0, 1); // If any date in the year is enabled count the year as enabled.


    for (let date = firstOfYear; this._dateAdapter.getYear(date) == year; date = this._dateAdapter.addCalendarDays(date, 1)) {
      if (this.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }
  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */


  _getValidDateOrNull(obj) {
    return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
  }
  /** Determines whether the user has the RTL layout direction. */


  _isRtl() {
    return this._dir && this._dir.value === 'rtl';
  }
  /** Sets the currently-highlighted year based on a model value. */


  _setSelectedYear(value) {
    this._selectedYear = null;

    if (value instanceof _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.DateRange) {
      const displayValue = value.start || value.end;

      if (displayValue) {
        this._selectedYear = this._dateAdapter.getYear(displayValue);
      }
    } else if (value) {
      this._selectedYear = this._dateAdapter.getYear(value);
    }
  }

}
/** @nocollapse */

/** @nocollapse */


NgxMatMultiYearView.ɵfac = function NgxMatMultiYearView_Factory(t) {
  return new (t || NgxMatMultiYearView)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgxMatDateAdapter, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8));
};
/** @nocollapse */

/** @nocollapse */


NgxMatMultiYearView.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NgxMatMultiYearView,
  selectors: [["ngx-mat-multi-year-view"]],
  viewQuery: function NgxMatMultiYearView_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](NgxMatCalendarBody, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._matCalendarBody = _t.first);
    }
  },
  inputs: {
    activeDate: "activeDate",
    selected: "selected",
    minDate: "minDate",
    maxDate: "maxDate",
    dateFilter: "dateFilter"
  },
  outputs: {
    selectedChange: "selectedChange",
    yearSelected: "yearSelected",
    activeDateChange: "activeDateChange"
  },
  exportAs: ["ngxMatMultiYearView"],
  decls: 5,
  vars: 7,
  consts: [["role", "presentation", 1, "mat-calendar-table"], [1, "mat-calendar-table-header"], ["colspan", "4", 1, "mat-calendar-table-header-divider"], ["ngx-mat-calendar-body", "", 3, "rows", "todayValue", "startValue", "endValue", "numCols", "cellAspectRatio", "activeCell", "selectedValueChange", "keydown"]],
  template: function NgxMatMultiYearView_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table", 0)(1, "thead", 1)(2, "tr");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "th", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "tbody", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedValueChange", function NgxMatMultiYearView_Template_tbody_selectedValueChange_4_listener($event) {
        return ctx._yearSelected($event);
      })("keydown", function NgxMatMultiYearView_Template_tbody_keydown_4_listener($event) {
        return ctx._handleCalendarBodyKeydown($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rows", ctx._years)("todayValue", ctx._todayYear)("startValue", ctx._selectedYear)("endValue", ctx._selectedYear)("numCols", 4)("cellAspectRatio", 4 / 7)("activeCell", ctx._getActiveCell());
    }
  },
  directives: [NgxMatCalendarBody],
  encapsulation: 2,
  changeDetection: 0
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatMultiYearView, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-mat-multi-year-view',
      exportAs: 'ngxMatMultiYearView',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<table class=\"mat-calendar-table\" role=\"presentation\">\r\n  <thead class=\"mat-calendar-table-header\">\r\n    <tr><th class=\"mat-calendar-table-header-divider\" colspan=\"4\"></th></tr>\r\n  </thead>\r\n  <tbody ngx-mat-calendar-body\r\n         [rows]=\"_years\"\r\n         [todayValue]=\"_todayYear\"\r\n         [startValue]=\"_selectedYear!\"\r\n         [endValue]=\"_selectedYear!\"\r\n         [numCols]=\"4\"\r\n         [cellAspectRatio]=\"4 / 7\"\r\n         [activeCell]=\"_getActiveCell()\"\r\n         (selectedValueChange)=\"_yearSelected($event)\"\r\n         (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n\r\n"
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: NgxMatDateAdapter,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }];
  }, {
    activeDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    minDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    maxDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    dateFilter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selectedChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    yearSelected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    activeDateChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    _matCalendarBody: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [NgxMatCalendarBody]
    }]
  });
})();

function isSameMultiYearView(dateAdapter, date1, date2, minDate, maxDate) {
  const year1 = dateAdapter.getYear(date1);
  const year2 = dateAdapter.getYear(date2);
  const startingYear = getStartingYear(dateAdapter, minDate, maxDate);
  return Math.floor((year1 - startingYear) / yearsPerPage) === Math.floor((year2 - startingYear) / yearsPerPage);
}
/**
 * When the multi-year view is first opened, the active year will be in view.
 * So we compute how many years are between the active year and the *slot* where our
 * "startingYear" will render when paged into view.
 */


function getActiveOffset(dateAdapter, activeDate, minDate, maxDate) {
  const activeYear = dateAdapter.getYear(activeDate);
  return euclideanModulo(activeYear - getStartingYear(dateAdapter, minDate, maxDate), yearsPerPage);
}
/**
 * We pick a "starting" year such that either the maximum year would be at the end
 * or the minimum year would be at the beginning of a page.
 */


function getStartingYear(dateAdapter, minDate, maxDate) {
  let startingYear = 0;

  if (maxDate) {
    const maxYear = dateAdapter.getYear(maxDate);
    startingYear = maxYear - yearsPerPage + 1;
  } else if (minDate) {
    startingYear = dateAdapter.getYear(minDate);
  }

  return startingYear;
}
/** Gets remainder that is non-negative, even if first number is negative */


function euclideanModulo(a, b) {
  return (a % b + b) % b;
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * An internal component used to display a single year in the datepicker.
 * @docs-private
 */


class NgxMatYearView {
  constructor(_changeDetectorRef, _dateFormats, _dateAdapter, _dir) {
    this._changeDetectorRef = _changeDetectorRef;
    this._dateFormats = _dateFormats;
    this._dateAdapter = _dateAdapter;
    this._dir = _dir;
    this._rerenderSubscription = rxjs__WEBPACK_IMPORTED_MODULE_5__.Subscription.EMPTY;
    /** Emits when a new month is selected. */

    this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits the selected month. This doesn't imply a change on the selected date */

    this.monthSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits when any date is activated. */

    this.activeDateChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();

    if (!this._dateAdapter) {
      throw createMissingDateImplError('NgxMatDateAdapter');
    }

    if (!this._dateFormats) {
      throw createMissingDateImplError('NGX_MAT_DATE_FORMATS');
    }

    this._activeDate = this._dateAdapter.today();
  }
  /** The date to display in this year view (everything other than the year is ignored). */


  get activeDate() {
    return this._activeDate;
  }

  set activeDate(value) {
    let oldActiveDate = this._activeDate;

    const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();

    this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);

    if (this._dateAdapter.getYear(oldActiveDate) !== this._dateAdapter.getYear(this._activeDate)) {
      this._init();
    }
  }
  /** The currently selected date. */


  get selected() {
    return this._selected;
  }

  set selected(value) {
    if (value instanceof _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.DateRange) {
      this._selected = value;
    } else {
      this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }

    this._setSelectedMonth(value);
  }
  /** The minimum selectable date. */


  get minDate() {
    return this._minDate;
  }

  set minDate(value) {
    this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  /** The maximum selectable date. */


  get maxDate() {
    return this._maxDate;
  }

  set maxDate(value) {
    this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }

  ngAfterContentInit() {
    this._rerenderSubscription = this._dateAdapter.localeChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.startWith)(null)).subscribe(() => this._init());
  }

  ngOnDestroy() {
    this._rerenderSubscription.unsubscribe();
  }
  /** Handles when a new month is selected. */


  _monthSelected(event) {
    const month = event.value;

    const normalizedDate = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1);

    this.monthSelected.emit(normalizedDate);

    const daysInMonth = this._dateAdapter.getNumDaysInMonth(normalizedDate);

    this.selectedChange.emit(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, Math.min(this._dateAdapter.getDate(this.activeDate), daysInMonth)));
  }
  /** Handles keydown events on the calendar body when calendar is in year view. */


  _handleCalendarBodyKeydown(event) {
    // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
    // disabled ones from being selected. This may not be ideal, we should look into whether
    // navigation should skip over disabled dates, and if so, how to implement that efficiently.
    const oldActiveDate = this._activeDate;

    const isRtl = this._isRtl();

    switch (event.keyCode) {
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.LEFT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? 1 : -1);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.RIGHT_ARROW:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? -1 : 1);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.UP_ARROW:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -4);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.DOWN_ARROW:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 4);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.HOME:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -this._dateAdapter.getMonth(this._activeDate));
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.END:
        this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 11 - this._dateAdapter.getMonth(this._activeDate));
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.PAGE_UP:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.PAGE_DOWN:
        this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
        break;

      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.ENTER:
      case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.SPACE:
        this._monthSelected({
          value: this._dateAdapter.getMonth(this._activeDate),
          event
        });

        break;

      default:
        // Don't prevent default or focus active cell on keys that we don't explicitly handle.
        return;
    }

    if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
      this.activeDateChange.emit(this.activeDate);
    }

    this._focusActiveCell(); // Prevent unexpected default actions such as form submission.


    event.preventDefault();
  }
  /** Initializes this year view. */


  _init() {
    this._setSelectedMonth(this.selected);

    this._todayMonth = this._getMonthInCurrentYear(this._dateAdapter.today());
    this._yearLabel = this._dateAdapter.getYearName(this.activeDate);

    let monthNames = this._dateAdapter.getMonthNames('short'); // First row of months only contains 5 elements so we can fit the year label on the same row.


    this._months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map(row => row.map(month => this._createCellForMonth(month, monthNames[month])));

    this._changeDetectorRef.markForCheck();
  }
  /** Focuses the active cell after the microtask queue is empty. */


  _focusActiveCell() {
    this._matCalendarBody._focusActiveCell();
  }
  /**
   * Gets the month in this year that the given Date falls on.
   * Returns null if the given Date is in another year.
   */


  _getMonthInCurrentYear(date) {
    return date && this._dateAdapter.getYear(date) == this._dateAdapter.getYear(this.activeDate) ? this._dateAdapter.getMonth(date) : null;
  }
  /** Creates an MatCalendarCell for the given month. */


  _createCellForMonth(month, monthName) {
    let ariaLabel = this._dateAdapter.format(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1), this._dateFormats.display.monthYearA11yLabel);

    return new NgxMatCalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._shouldEnableMonth(month));
  }
  /** Whether the given month is enabled. */


  _shouldEnableMonth(month) {
    const activeYear = this._dateAdapter.getYear(this.activeDate);

    if (month === undefined || month === null || this._isYearAndMonthAfterMaxDate(activeYear, month) || this._isYearAndMonthBeforeMinDate(activeYear, month)) {
      return false;
    }

    if (!this.dateFilter) {
      return true;
    }

    const firstOfMonth = this._dateAdapter.createDate(activeYear, month, 1); // If any date in the month is enabled count the month as enabled.


    for (let date = firstOfMonth; this._dateAdapter.getMonth(date) == month; date = this._dateAdapter.addCalendarDays(date, 1)) {
      if (this.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }
  /**
   * Tests whether the combination month/year is after this.maxDate, considering
   * just the month and year of this.maxDate
   */


  _isYearAndMonthAfterMaxDate(year, month) {
    if (this.maxDate) {
      const maxYear = this._dateAdapter.getYear(this.maxDate);

      const maxMonth = this._dateAdapter.getMonth(this.maxDate);

      return year > maxYear || year === maxYear && month > maxMonth;
    }

    return false;
  }
  /**
   * Tests whether the combination month/year is before this.minDate, considering
   * just the month and year of this.minDate
   */


  _isYearAndMonthBeforeMinDate(year, month) {
    if (this.minDate) {
      const minYear = this._dateAdapter.getYear(this.minDate);

      const minMonth = this._dateAdapter.getMonth(this.minDate);

      return year < minYear || year === minYear && month < minMonth;
    }

    return false;
  }
  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */


  _getValidDateOrNull(obj) {
    return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
  }
  /** Determines whether the user has the RTL layout direction. */


  _isRtl() {
    return this._dir && this._dir.value === 'rtl';
  }
  /** Sets the currently-selected month based on a model value. */


  _setSelectedMonth(value) {
    if (value instanceof _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.DateRange) {
      this._selectedMonth = this._getMonthInCurrentYear(value.start) || this._getMonthInCurrentYear(value.end);
    } else {
      this._selectedMonth = this._getMonthInCurrentYear(value);
    }
  }

}
/** @nocollapse */

/** @nocollapse */


NgxMatYearView.ɵfac = function NgxMatYearView_Factory(t) {
  return new (t || NgxMatYearView)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NGX_MAT_DATE_FORMATS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgxMatDateAdapter, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8));
};
/** @nocollapse */

/** @nocollapse */


NgxMatYearView.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NgxMatYearView,
  selectors: [["ngx-mat-year-view"]],
  viewQuery: function NgxMatYearView_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](NgxMatCalendarBody, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._matCalendarBody = _t.first);
    }
  },
  inputs: {
    activeDate: "activeDate",
    selected: "selected",
    minDate: "minDate",
    maxDate: "maxDate",
    dateFilter: "dateFilter"
  },
  outputs: {
    selectedChange: "selectedChange",
    monthSelected: "monthSelected",
    activeDateChange: "activeDateChange"
  },
  exportAs: ["ngxMatYearView"],
  decls: 5,
  vars: 9,
  consts: [["role", "presentation", 1, "mat-calendar-table"], [1, "mat-calendar-table-header"], ["colspan", "4", 1, "mat-calendar-table-header-divider"], ["ngx-mat-calendar-body", "", 3, "label", "rows", "todayValue", "startValue", "endValue", "labelMinRequiredCells", "numCols", "cellAspectRatio", "activeCell", "selectedValueChange", "keydown"]],
  template: function NgxMatYearView_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table", 0)(1, "thead", 1)(2, "tr");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "th", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "tbody", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedValueChange", function NgxMatYearView_Template_tbody_selectedValueChange_4_listener($event) {
        return ctx._monthSelected($event);
      })("keydown", function NgxMatYearView_Template_tbody_keydown_4_listener($event) {
        return ctx._handleCalendarBodyKeydown($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("label", ctx._yearLabel)("rows", ctx._months)("todayValue", ctx._todayMonth)("startValue", ctx._selectedMonth)("endValue", ctx._selectedMonth)("labelMinRequiredCells", 2)("numCols", 4)("cellAspectRatio", 4 / 7)("activeCell", ctx._dateAdapter.getMonth(ctx.activeDate));
    }
  },
  directives: [NgxMatCalendarBody],
  encapsulation: 2,
  changeDetection: 0
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatYearView, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-mat-year-view',
      exportAs: 'ngxMatYearView',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<table class=\"mat-calendar-table\" role=\"presentation\">\r\n  <thead class=\"mat-calendar-table-header\">\r\n    <tr><th class=\"mat-calendar-table-header-divider\" colspan=\"4\"></th></tr>\r\n  </thead>\r\n  <tbody ngx-mat-calendar-body\r\n         [label]=\"_yearLabel\"\r\n         [rows]=\"_months\"\r\n         [todayValue]=\"_todayMonth!\"\r\n         [startValue]=\"_selectedMonth!\"\r\n         [endValue]=\"_selectedMonth!\"\r\n         [labelMinRequiredCells]=\"2\"\r\n         [numCols]=\"4\"\r\n         [cellAspectRatio]=\"4 / 7\"\r\n         [activeCell]=\"_dateAdapter.getMonth(activeDate)\"\r\n         (selectedValueChange)=\"_monthSelected($event)\"\r\n         (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n"
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NGX_MAT_DATE_FORMATS]
      }]
    }, {
      type: NgxMatDateAdapter,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }];
  }, {
    activeDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    minDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    maxDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    dateFilter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selectedChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    monthSelected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    activeDateChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    _matCalendarBody: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [NgxMatCalendarBody]
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** Default header for NgxMatCalendar */


class NgxMatCalendarHeader {
  constructor(_intl, calendar, _dateAdapter, _dateFormats, changeDetectorRef) {
    this._intl = _intl;
    this.calendar = calendar;
    this._dateAdapter = _dateAdapter;
    this._dateFormats = _dateFormats;
    this.calendar.stateChanges.subscribe(() => changeDetectorRef.markForCheck());
  }
  /** The label for the current calendar view. */


  get periodButtonText() {
    if (this.calendar.currentView == 'month') {
      return this._dateAdapter.format(this.calendar.activeDate, this._dateFormats.display.monthYearLabel).toLocaleUpperCase();
    }

    if (this.calendar.currentView == 'year') {
      return this._dateAdapter.getYearName(this.calendar.activeDate);
    } // The offset from the active year to the "slot" for the starting year is the
    // *actual* first rendered year in the multi-year view, and the last year is
    // just yearsPerPage - 1 away.


    const activeYear = this._dateAdapter.getYear(this.calendar.activeDate);

    const minYearOfPage = activeYear - getActiveOffset(this._dateAdapter, this.calendar.activeDate, this.calendar.minDate, this.calendar.maxDate);
    const maxYearOfPage = minYearOfPage + yearsPerPage - 1;

    const minYearName = this._dateAdapter.getYearName(this._dateAdapter.createDate(minYearOfPage, 0, 1));

    const maxYearName = this._dateAdapter.getYearName(this._dateAdapter.createDate(maxYearOfPage, 0, 1));

    return formatYearRange(minYearName, maxYearName);
  }

  get periodButtonLabel() {
    return this.calendar.currentView == 'month' ? this._intl.switchToMultiYearViewLabel : this._intl.switchToMonthViewLabel;
  }
  /** The label for the previous button. */


  get prevButtonLabel() {
    return {
      'month': this._intl.prevMonthLabel,
      'year': this._intl.prevYearLabel,
      'multi-year': this._intl.prevMultiYearLabel
    }[this.calendar.currentView];
  }
  /** The label for the next button. */


  get nextButtonLabel() {
    return {
      'month': this._intl.nextMonthLabel,
      'year': this._intl.nextYearLabel,
      'multi-year': this._intl.nextMultiYearLabel
    }[this.calendar.currentView];
  }
  /** Handles user clicks on the period label. */


  currentPeriodClicked() {
    this.calendar.currentView = this.calendar.currentView == 'month' ? 'multi-year' : 'month';
  }
  /** Handles user clicks on the previous button. */


  previousClicked() {
    this.calendar.activeDate = this.calendar.currentView == 'month' ? this._dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) : this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView == 'year' ? -1 : -yearsPerPage);
  }
  /** Handles user clicks on the next button. */


  nextClicked() {
    this.calendar.activeDate = this.calendar.currentView == 'month' ? this._dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) : this._dateAdapter.addCalendarYears(this.calendar.activeDate, this.calendar.currentView == 'year' ? 1 : yearsPerPage);
  }
  /** Whether the previous period button is enabled. */


  previousEnabled() {
    if (!this.calendar.minDate) {
      return true;
    }

    return !this.calendar.minDate || !this._isSameView(this.calendar.activeDate, this.calendar.minDate);
  }
  /** Whether the next period button is enabled. */


  nextEnabled() {
    return !this.calendar.maxDate || !this._isSameView(this.calendar.activeDate, this.calendar.maxDate);
  }
  /** Whether the two dates represent the same view in the current view mode (month or year). */


  _isSameView(date1, date2) {
    if (this.calendar.currentView == 'month') {
      return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) && this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2);
    }

    if (this.calendar.currentView == 'year') {
      return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2);
    } // Otherwise we are in 'multi-year' view.


    return isSameMultiYearView(this._dateAdapter, date1, date2, this.calendar.minDate, this.calendar.maxDate);
  }

}
/** @nocollapse */

/** @nocollapse */


NgxMatCalendarHeader.ɵfac = function NgxMatCalendarHeader_Factory(t) {
  return new (t || NgxMatCalendarHeader)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.MatDatepickerIntl), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"]((0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgxMatCalendar)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgxMatDateAdapter, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NGX_MAT_DATE_FORMATS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
/** @nocollapse */

/** @nocollapse */


NgxMatCalendarHeader.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NgxMatCalendarHeader,
  selectors: [["ngx-mat-calendar-header"]],
  exportAs: ["ngxMatCalendarHeader"],
  ngContentSelectors: _c1,
  decls: 9,
  vars: 8,
  consts: [[1, "mat-calendar-header"], [1, "mat-calendar-controls"], ["mat-button", "", "type", "button", "cdkAriaLive", "polite", 1, "mat-calendar-period-button", 3, "click"], [1, "mat-calendar-arrow"], [1, "mat-calendar-spacer"], ["mat-icon-button", "", "type", "button", 1, "mat-calendar-previous-button", 3, "disabled", "click"], ["mat-icon-button", "", "type", "button", 1, "mat-calendar-next-button", 3, "disabled", "click"]],
  template: function NgxMatCalendarHeader_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatCalendarHeader_Template_button_click_2_listener() {
        return ctx.currentPeriodClicked();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatCalendarHeader_Template_button_click_7_listener() {
        return ctx.previousClicked();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NgxMatCalendarHeader_Template_button_click_8_listener() {
        return ctx.nextClicked();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx.periodButtonLabel);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.periodButtonText, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-calendar-invert", ctx.calendar.currentView != "month");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.previousEnabled());
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx.prevButtonLabel);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.nextEnabled());
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx.nextButtonLabel);
    }
  },
  directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton],
  encapsulation: 2,
  changeDetection: 0
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatCalendarHeader, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-mat-calendar-header',
      exportAs: 'ngxMatCalendarHeader',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "<div class=\"mat-calendar-header\">\r\n  <div class=\"mat-calendar-controls\">\r\n    <button mat-button type=\"button\" class=\"mat-calendar-period-button\"\r\n            (click)=\"currentPeriodClicked()\" [attr.aria-label]=\"periodButtonLabel\"\r\n            cdkAriaLive=\"polite\">\r\n      {{periodButtonText}}\r\n      <div class=\"mat-calendar-arrow\"\r\n           [class.mat-calendar-invert]=\"calendar.currentView != 'month'\"></div>\r\n    </button>\r\n\r\n    <div class=\"mat-calendar-spacer\"></div>\r\n\r\n    <ng-content></ng-content>\r\n\r\n    <button mat-icon-button type=\"button\" class=\"mat-calendar-previous-button\"\r\n            [disabled]=\"!previousEnabled()\" (click)=\"previousClicked()\"\r\n            [attr.aria-label]=\"prevButtonLabel\">\r\n    </button>\r\n\r\n    <button mat-icon-button type=\"button\" class=\"mat-calendar-next-button\"\r\n            [disabled]=\"!nextEnabled()\" (click)=\"nextClicked()\"\r\n            [attr.aria-label]=\"nextButtonLabel\">\r\n    </button>\r\n  </div>\r\n</div>\r\n"
    }]
  }], function () {
    return [{
      type: _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.MatDatepickerIntl
    }, {
      type: NgxMatCalendar,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgxMatCalendar)]
      }]
    }, {
      type: NgxMatDateAdapter,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NGX_MAT_DATE_FORMATS]
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }];
  }, null);
})();
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */


class NgxMatCalendar {
  constructor(_intl, _dateAdapter, _dateFormats, _changeDetectorRef) {
    this._dateAdapter = _dateAdapter;
    this._dateFormats = _dateFormats;
    this._changeDetectorRef = _changeDetectorRef;
    /**
     * Used for scheduling that focus should be moved to the active cell on the next tick.
     * We need to schedule it, rather than do it immediately, because we have to wait
     * for Angular to re-evaluate the view children.
     */

    this._moveFocusOnNextTick = false;
    /** Whether the calendar should be started in month or year view. */

    this.startView = 'month';
    /** Emits when the currently selected date changes. */

    this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Emits the year chosen in multiyear view.
     * This doesn't imply a change on the selected date.
     */

    this.yearSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Emits the month chosen in year view.
     * This doesn't imply a change on the selected date.
     */

    this.monthSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits when any date is selected. */

    this._userSelection = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Emits whenever there is a state change that the header may need to respond to.
     */

    this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();

    if (!this._dateAdapter) {
      throw createMissingDateImplError('NgxDateAdapter');
    }

    if (!this._dateFormats) {
      throw createMissingDateImplError('NGX_MAT_DATE_FORMATS');
    }

    this._intlChanges = _intl.changes.subscribe(() => {
      _changeDetectorRef.markForCheck();

      this.stateChanges.next();
    });
  }
  /** A date representing the period (month or year) to start the calendar in. */


  get startAt() {
    return this._startAt;
  }

  set startAt(value) {
    this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  /** The currently selected date. */


  get selected() {
    return this._selected;
  }

  set selected(value) {
    this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  /** The minimum selectable date. */


  get minDate() {
    return this._minDate;
  }

  set minDate(value) {
    this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  /** The maximum selectable date. */


  get maxDate() {
    return this._maxDate;
  }

  set maxDate(value) {
    this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  /**
   * The current active date. This determines which time period is shown and which date is
   * highlighted when using keyboard navigation.
   */


  get activeDate() {
    return this._clampedActiveDate;
  }

  set activeDate(value) {
    this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
    this.stateChanges.next();

    this._changeDetectorRef.markForCheck();
  }
  /** Whether the calendar is in month view. */


  get currentView() {
    return this._currentView;
  }

  set currentView(value) {
    this._currentView = value;
    this._moveFocusOnNextTick = true;

    this._changeDetectorRef.markForCheck();
  }

  ngAfterContentInit() {
    this._calendarHeaderPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_11__.ComponentPortal(this.headerComponent || NgxMatCalendarHeader);
    this.activeDate = this.startAt || this._dateAdapter.today(); // Assign to the private property since we don't want to move focus on init.

    this._currentView = this.startView;
  }

  ngAfterViewChecked() {
    if (this._moveFocusOnNextTick) {
      this._moveFocusOnNextTick = false;
      this.focusActiveCell();
    }
  }

  ngOnDestroy() {
    this._intlChanges.unsubscribe();

    this.stateChanges.complete();
  }

  ngOnChanges(changes) {
    const change = changes['minDate'] || changes['maxDate'] || changes['dateFilter'];

    if (change && !change.firstChange) {
      const view = this._getCurrentViewComponent();

      if (view) {
        // We need to `detectChanges` manually here, because the `minDate`, `maxDate` etc. are
        // passed down to the view via data bindings which won't be up-to-date when we call `_init`.
        this._changeDetectorRef.detectChanges();

        view._init();
      }
    }

    this.stateChanges.next();
  }

  focusActiveCell() {
    this._getCurrentViewComponent()._focusActiveCell();
  }
  /** Updates today's date after an update of the active date */


  updateTodaysDate() {
    let view = this.currentView == 'month' ? this.monthView : this.currentView == 'year' ? this.yearView : this.multiYearView;
    view.ngAfterContentInit();
  }
  /** Handles date selection in the month view. */


  _dateSelected(date) {
    if (date && !this._dateAdapter.sameDate(date, this.selected)) {
      this.selectedChange.emit(date);
    }
  }
  /** Handles year selection in the multiyear view. */


  _yearSelectedInMultiYearView(normalizedYear) {
    this.yearSelected.emit(normalizedYear);
  }
  /** Handles month selection in the year view. */


  _monthSelectedInYearView(normalizedMonth) {
    this.monthSelected.emit(normalizedMonth);
  }

  _userSelected() {
    this._userSelection.emit();
  }
  /** Handles year/month selection in the multi-year/year views. */


  _goToDateInView(date, view) {
    this.activeDate = date;
    this.currentView = view;
  }
  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */


  _getValidDateOrNull(obj) {
    return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
  }
  /** Returns the component instance that corresponds to the current calendar view. */


  _getCurrentViewComponent() {
    return this.monthView || this.yearView || this.multiYearView;
  }

}
/** @nocollapse */

/** @nocollapse */


NgxMatCalendar.ɵfac = function NgxMatCalendar_Factory(t) {
  return new (t || NgxMatCalendar)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.MatDatepickerIntl), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgxMatDateAdapter, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NGX_MAT_DATE_FORMATS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
};
/** @nocollapse */

/** @nocollapse */


NgxMatCalendar.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NgxMatCalendar,
  selectors: [["ngx-mat-calendar"]],
  viewQuery: function NgxMatCalendar_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](NgxMatMonthView, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](NgxMatYearView, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](NgxMatMultiYearView, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.monthView = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.yearView = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.multiYearView = _t.first);
    }
  },
  hostAttrs: [1, "mat-calendar"],
  inputs: {
    headerComponent: "headerComponent",
    startAt: "startAt",
    startView: "startView",
    selected: "selected",
    minDate: "minDate",
    maxDate: "maxDate",
    dateFilter: "dateFilter",
    dateClass: "dateClass"
  },
  outputs: {
    selectedChange: "selectedChange",
    yearSelected: "yearSelected",
    monthSelected: "monthSelected",
    _userSelection: "_userSelection"
  },
  exportAs: ["ngxMatCalendar"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  decls: 5,
  vars: 5,
  consts: [[3, "cdkPortalOutlet"], ["cdkMonitorSubtreeFocus", "", "tabindex", "-1", 1, "mat-calendar-content", 3, "ngSwitch"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass", "activeDateChange", "selectedChange", "_userSelection", 4, "ngSwitchCase"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "activeDateChange", "monthSelected", "selectedChange", 4, "ngSwitchCase"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "activeDateChange", "yearSelected", "selectedChange", 4, "ngSwitchCase"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "dateClass", "activeDateChange", "selectedChange", "_userSelection"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "activeDateChange", "monthSelected", "selectedChange"], [3, "activeDate", "selected", "dateFilter", "maxDate", "minDate", "activeDateChange", "yearSelected", "selectedChange"]],
  template: function NgxMatCalendar_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, NgxMatCalendar_ng_template_0_Template, 0, 0, "ng-template", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, NgxMatCalendar_ngx_mat_month_view_2_Template, 1, 6, "ngx-mat-month-view", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, NgxMatCalendar_ngx_mat_year_view_3_Template, 1, 5, "ngx-mat-year-view", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, NgxMatCalendar_ngx_mat_multi_year_view_4_Template, 1, 5, "ngx-mat-multi-year-view", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cdkPortalOutlet", ctx._calendarHeaderPortal);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.currentView);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "month");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "year");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", "multi-year");
    }
  },
  directives: [NgxMatMonthView, NgxMatYearView, NgxMatMultiYearView, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_11__.CdkPortalOutlet, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgSwitch, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgSwitchCase],
  styles: [".mat-calendar{display:block}.mat-calendar-header{padding:8px 8px 0}.mat-calendar-content{padding:0 8px 8px;outline:none}.mat-calendar-controls{display:flex;margin:5% calc(4.71429% - 16px)}.mat-calendar-spacer{flex:1 1 auto}.mat-calendar-period-button{min-width:0}.mat-calendar-arrow{display:inline-block;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top-width:5px;border-top-style:solid;margin:0 0 0 5px;vertical-align:middle}.mat-calendar-arrow.mat-calendar-invert{transform:rotate(180deg)}[dir=rtl] .mat-calendar-arrow{margin:0 5px 0 0}.mat-calendar-previous-button,.mat-calendar-next-button{position:relative}.mat-calendar-previous-button:after,.mat-calendar-next-button:after{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";margin:15.5px;border:0 solid currentColor;border-top-width:2px}[dir=rtl] .mat-calendar-previous-button,[dir=rtl] .mat-calendar-next-button{transform:rotate(180deg)}.mat-calendar-previous-button:after{border-left-width:2px;transform:translate(2px) rotate(-45deg)}.mat-calendar-next-button:after{border-right-width:2px;transform:translate(-2px) rotate(45deg)}.mat-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.mat-calendar-table-header th{text-align:center;padding:0 0 8px}.mat-calendar-table-header-divider{position:relative;height:1px}.mat-calendar-table-header-divider:after{content:\"\";position:absolute;top:0;left:-8px;right:-8px;height:1px}\n"],
  encapsulation: 2,
  changeDetection: 0
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatCalendar, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-mat-calendar',
      host: {
        'class': 'mat-calendar'
      },
      exportAs: 'ngxMatCalendar',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      template: "\r\n<ng-template [cdkPortalOutlet]=\"_calendarHeaderPortal\"></ng-template>\r\n\r\n<div class=\"mat-calendar-content\" [ngSwitch]=\"currentView\" cdkMonitorSubtreeFocus tabindex=\"-1\">\r\n  <ngx-mat-month-view\r\n      *ngSwitchCase=\"'month'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"dateFilter\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      [dateClass]=\"dateClass\"\r\n      (selectedChange)=\"_dateSelected($event)\"\r\n      (_userSelection)=\"_userSelected()\">\r\n  </ngx-mat-month-view>\r\n\r\n  <ngx-mat-year-view\r\n      *ngSwitchCase=\"'year'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"dateFilter\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      (monthSelected)=\"_monthSelectedInYearView($event)\"\r\n      (selectedChange)=\"_goToDateInView($event, 'month')\">\r\n  </ngx-mat-year-view>\r\n\r\n  <ngx-mat-multi-year-view\r\n      *ngSwitchCase=\"'multi-year'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"dateFilter\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      (yearSelected)=\"_yearSelectedInMultiYearView($event)\"\r\n      (selectedChange)=\"_goToDateInView($event, 'year')\">\r\n  </ngx-mat-multi-year-view>\r\n</div>\r\n",
      styles: [".mat-calendar{display:block}.mat-calendar-header{padding:8px 8px 0}.mat-calendar-content{padding:0 8px 8px;outline:none}.mat-calendar-controls{display:flex;margin:5% calc(4.71429% - 16px)}.mat-calendar-spacer{flex:1 1 auto}.mat-calendar-period-button{min-width:0}.mat-calendar-arrow{display:inline-block;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top-width:5px;border-top-style:solid;margin:0 0 0 5px;vertical-align:middle}.mat-calendar-arrow.mat-calendar-invert{transform:rotate(180deg)}[dir=rtl] .mat-calendar-arrow{margin:0 5px 0 0}.mat-calendar-previous-button,.mat-calendar-next-button{position:relative}.mat-calendar-previous-button:after,.mat-calendar-next-button:after{top:0;left:0;right:0;bottom:0;position:absolute;content:\"\";margin:15.5px;border:0 solid currentColor;border-top-width:2px}[dir=rtl] .mat-calendar-previous-button,[dir=rtl] .mat-calendar-next-button{transform:rotate(180deg)}.mat-calendar-previous-button:after{border-left-width:2px;transform:translate(2px) rotate(-45deg)}.mat-calendar-next-button:after{border-right-width:2px;transform:translate(-2px) rotate(45deg)}.mat-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.mat-calendar-table-header th{text-align:center;padding:0 0 8px}.mat-calendar-table-header-divider{position:relative;height:1px}.mat-calendar-table-header-divider:after{content:\"\";position:absolute;top:0;left:-8px;right:-8px;height:1px}\n"]
    }]
  }], function () {
    return [{
      type: _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.MatDatepickerIntl
    }, {
      type: NgxMatDateAdapter,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NGX_MAT_DATE_FORMATS]
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }];
  }, {
    headerComponent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    startAt: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    startView: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    minDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    maxDate: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    dateFilter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    dateClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selectedChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    yearSelected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    monthSelected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    _userSelection: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    monthView: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [NgxMatMonthView]
    }],
    yearView: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [NgxMatYearView]
    }],
    multiYearView: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [NgxMatMultiYearView]
    }]
  });
})();

class NgxMatTimepickerComponent {
  constructor(_dateAdapter, cd, formBuilder) {
    this._dateAdapter = _dateAdapter;
    this.cd = cd;
    this.formBuilder = formBuilder;
    this.disabled = false;
    this.showSpinners = true;
    this.stepHour = DEFAULT_STEP;
    this.stepMinute = DEFAULT_STEP;
    this.stepSecond = DEFAULT_STEP;
    this.showSeconds = false;
    this.disableMinute = false;
    this.enableMeridian = false;
    this.color = 'primary';
    this.meridian = MERIDIANS.AM;

    this._onChange = () => {};

    this._onTouched = () => {};

    this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
    this.pattern = PATTERN_INPUT_HOUR;

    if (!this._dateAdapter) {
      throw createMissingDateImplError('NgxMatDateAdapter');
    }

    this.form = this.formBuilder.group({
      hour: [{
        value: null,
        disabled: this.disabled
      }, [_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(PATTERN_INPUT_HOUR)]],
      minute: [{
        value: null,
        disabled: this.disabled
      }, [_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(PATTERN_INPUT_MINUTE)]],
      second: [{
        value: null,
        disabled: this.disabled
      }, [_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.pattern(PATTERN_INPUT_SECOND)]]
    });
  }
  /** Hour */


  get hour() {
    let val = Number(this.form.controls['hour'].value);
    return isNaN(val) ? 0 : val;
  }

  get minute() {
    let val = Number(this.form.controls['minute'].value);
    return isNaN(val) ? 0 : val;
  }

  get second() {
    let val = Number(this.form.controls['second'].value);
    return isNaN(val) ? 0 : val;
  }

  /** Whether or not the form is valid */
  get valid() {
    return this.form.valid;
  }

  ngOnInit() {
    this.form.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this._destroyed), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.debounceTime)(400)).subscribe(val => {
      this._updateModel();
    });
  }

  ngOnChanges(changes) {
    if (changes.disabled || changes.disableMinute) {
      this._setDisableStates();
    }
  }

  ngOnDestroy() {
    this._destroyed.next();

    this._destroyed.complete();
  }
  /**
   * Writes a new value to the element.
   * @param obj
   */


  writeValue(val) {
    if (val != null) {
      this._model = val;
    } else {
      this._model = this._dateAdapter.today();

      if (this.defaultTime != null) {
        this._dateAdapter.setTimeByDefaultValues(this._model, this.defaultTime);
      }
    }

    this._updateHourMinuteSecond();
  }
  /** Registers a callback function that is called when the control's value changes in the UI. */


  registerOnChange(fn) {
    this._onChange = fn;
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */


  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /** Enables or disables the appropriate DOM element */


  setDisabledState(isDisabled) {
    this._disabled = isDisabled;
    this.cd.markForCheck();
  }
  /**
   * Format input
   * @param input
   */


  formatInput(input) {
    input.value = input.value.replace(NUMERIC_REGEX, '');
  }
  /** Toggle meridian */


  toggleMeridian() {
    this.meridian = this.meridian === MERIDIANS.AM ? MERIDIANS.PM : MERIDIANS.AM;
    this.change('hour');
  }
  /** Change property of time */


  change(prop, up) {
    const next = this._getNextValueByProp(prop, up);

    this.form.controls[prop].setValue(formatTwoDigitTimeValue(next), {
      onlySelf: false,
      emitEvent: false
    });

    this._updateModel();
  }
  /** Update controls of form by model */


  _updateHourMinuteSecond() {
    let _hour = this._dateAdapter.getHour(this._model);

    const _minute = this._dateAdapter.getMinute(this._model);

    const _second = this._dateAdapter.getSecond(this._model);

    if (this.enableMeridian) {
      if (_hour >= LIMIT_TIMES.meridian) {
        _hour = _hour - LIMIT_TIMES.meridian;
        this.meridian = MERIDIANS.PM;
      } else {
        this.meridian = MERIDIANS.AM;
      }

      if (_hour === 0) {
        _hour = LIMIT_TIMES.meridian;
      }
    }

    this.form.controls['hour'].setValue(formatTwoDigitTimeValue(_hour));
    this.form.controls['minute'].setValue(formatTwoDigitTimeValue(_minute));
    this.form.controls['second'].setValue(formatTwoDigitTimeValue(_second));
  }
  /** Update model */


  _updateModel() {
    let _hour = this.hour;

    if (this.enableMeridian) {
      if (this.meridian === MERIDIANS.AM && _hour === LIMIT_TIMES.meridian) {
        _hour = 0;
      } else if (this.meridian === MERIDIANS.PM && _hour !== LIMIT_TIMES.meridian) {
        _hour = _hour + LIMIT_TIMES.meridian;
      }
    }

    this._dateAdapter.setHour(this._model, _hour);

    this._dateAdapter.setMinute(this._model, this.minute);

    this._dateAdapter.setSecond(this._model, this.second);

    this._onChange(this._model);
  }
  /**
   * Get next value by property
   * @param prop
   * @param up
   */


  _getNextValueByProp(prop, up) {
    const keyProp = prop[0].toUpperCase() + prop.slice(1);
    const min = LIMIT_TIMES[`min${keyProp}`];
    let max = LIMIT_TIMES[`max${keyProp}`];

    if (prop === 'hour' && this.enableMeridian) {
      max = LIMIT_TIMES.meridian;
    }

    let next;

    if (up == null) {
      next = this[prop] % max;

      if (prop === 'hour' && this.enableMeridian) {
        if (next === 0) next = max;
      }
    } else {
      next = up ? this[prop] + this[`step${keyProp}`] : this[prop] - this[`step${keyProp}`];

      if (prop === 'hour' && this.enableMeridian) {
        next = next % (max + 1);
        if (next === 0) next = up ? 1 : max;
      } else {
        next = next % max;
      }

      if (up) {
        next = next > max ? next - max + min : next;
      } else {
        next = next < min ? next - min + max : next;
      }
    }

    return next;
  }
  /**
   * Set disable states
   */


  _setDisableStates() {
    if (this.disabled) {
      this.form.disable();
    } else {
      this.form.enable();

      if (this.disableMinute) {
        this.form.get('minute').disable();

        if (this.showSeconds) {
          this.form.get('second').disable();
        }
      }
    }
  }

}
/** @nocollapse */

/** @nocollapse */


NgxMatTimepickerComponent.ɵfac = function NgxMatTimepickerComponent_Factory(t) {
  return new (t || NgxMatTimepickerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgxMatDateAdapter, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder));
};
/** @nocollapse */

/** @nocollapse */


NgxMatTimepickerComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NgxMatTimepickerComponent,
  selectors: [["ngx-mat-timepicker"]],
  hostAttrs: [1, "ngx-mat-timepicker"],
  inputs: {
    disabled: "disabled",
    showSpinners: "showSpinners",
    stepHour: "stepHour",
    stepMinute: "stepMinute",
    stepSecond: "stepSecond",
    showSeconds: "showSeconds",
    disableMinute: "disableMinute",
    enableMeridian: "enableMeridian",
    defaultTime: "defaultTime",
    color: "color"
  },
  exportAs: ["ngxMatTimepicker"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NG_VALUE_ACCESSOR,
    useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgxMatTimepickerComponent),
    multi: true
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  decls: 18,
  vars: 7,
  consts: [[3, "formGroup"], [1, "ngx-mat-timepicker-table"], [1, "ngx-mat-timepicker-tbody"], [4, "ngIf"], ["appearance", "legacy"], ["type", "text", "matInput", "", "maxlength", "2", "formControlName", "hour", 3, "input", "keydown.ArrowUp", "keydown.ArrowDown", "blur"], [1, "ngx-mat-timepicker-spacer"], ["type", "text", "matInput", "", "maxlength", "2", "formControlName", "minute", 3, "input", "keydown.ArrowUp", "keydown.ArrowDown", "blur"], ["class", "ngx-mat-timepicker-spacer", 4, "ngIf"], ["class", "ngx-mat-timepicker-meridian", 4, "ngIf"], ["type", "button", "mat-icon-button", "", "aria-label", "expand_less icon", 3, "disabled", "click"], ["type", "text", "matInput", "", "maxlength", "2", "formControlName", "second", 3, "input", "keydown.ArrowUp", "keydown.ArrowDown", "blur"], [1, "ngx-mat-timepicker-meridian"], ["mat-button", "", "mat-stroked-button", "", 3, "color", "disabled", "click"], ["type", "button", "mat-icon-button", "", "aria-label", "expand_more icon", 3, "disabled", "click"]],
  template: function NgxMatTimepickerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 0)(1, "table", 1)(2, "tbody", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, NgxMatTimepickerComponent_tr_3_Template, 14, 5, "tr", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "tr")(5, "td")(6, "mat-form-field", 4)(7, "input", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function NgxMatTimepickerComponent_Template_input_input_7_listener($event) {
        return ctx.formatInput($event.target);
      })("keydown.ArrowUp", function NgxMatTimepickerComponent_Template_input_keydown_ArrowUp_7_listener($event) {
        ctx.change("hour", true);
        return $event.preventDefault();
      })("keydown.ArrowDown", function NgxMatTimepickerComponent_Template_input_keydown_ArrowDown_7_listener($event) {
        ctx.change("hour", false);
        return $event.preventDefault();
      })("blur", function NgxMatTimepickerComponent_Template_input_blur_7_listener() {
        return ctx.change("hour");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "td", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, ":");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "td")(11, "mat-form-field", 4)(12, "input", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function NgxMatTimepickerComponent_Template_input_input_12_listener($event) {
        return ctx.formatInput($event.target);
      })("keydown.ArrowUp", function NgxMatTimepickerComponent_Template_input_keydown_ArrowUp_12_listener($event) {
        ctx.change("minute", true);
        return $event.preventDefault();
      })("keydown.ArrowDown", function NgxMatTimepickerComponent_Template_input_keydown_ArrowDown_12_listener($event) {
        ctx.change("minute", false);
        return $event.preventDefault();
      })("blur", function NgxMatTimepickerComponent_Template_input_blur_12_listener() {
        return ctx.change("minute");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, NgxMatTimepickerComponent_td_13_Template, 2, 0, "td", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, NgxMatTimepickerComponent_td_14_Template, 3, 0, "td", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, NgxMatTimepickerComponent_td_15_Template, 1, 0, "td", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, NgxMatTimepickerComponent_td_16_Template, 3, 3, "td", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, NgxMatTimepickerComponent_tr_17_Template, 14, 6, "tr", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showSpinners);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showSeconds);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showSeconds);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.enableMeridian);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.enableMeridian);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showSpinners);
    }
  },
  directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatFormField, _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormGroupDirective, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControlName],
  styles: [".ngx-mat-timepicker{font-size:13px}.ngx-mat-timepicker form{min-width:90px}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td{text-align:center}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td.ngx-mat-timepicker-spacer{font-weight:bold}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td.ngx-mat-timepicker-meridian .mat-button{min-width:64px;line-height:36px;min-width:0;border-radius:50%;width:36px;height:36px;padding:0;flex-shrink:0}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-icon-button{height:24px;width:24px;line-height:24px}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-icon-button .mat-icon{font-size:24px}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-form-field{width:20px;max-width:20px;text-align:center}\n"],
  encapsulation: 2
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatTimepickerComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-mat-timepicker',
      host: {
        'class': 'ngx-mat-timepicker'
      },
      providers: [{
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NG_VALUE_ACCESSOR,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgxMatTimepickerComponent),
        multi: true
      }],
      exportAs: 'ngxMatTimepicker',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      template: "<form [formGroup]=\"form\">\r\n  <table class=\"ngx-mat-timepicker-table\">\r\n    <tbody class=\"ngx-mat-timepicker-tbody\">\r\n      <tr *ngIf=\"showSpinners\">\r\n        <td>\r\n          <button type=\"button\" mat-icon-button aria-label=\"expand_less icon\" (click)=\"change('hour', true)\"\r\n            [disabled]=\"disabled\">\r\n            <mat-icon>expand_less</mat-icon>\r\n          </button>\r\n        </td>\r\n        <td></td>\r\n        <td>\r\n          <button type=\"button\" mat-icon-button aria-label=\"expand_less icon\" (click)=\"change('minute', true)\"\r\n            [disabled]=\"disabled || disableMinute\">\r\n            <mat-icon>expand_less</mat-icon>\r\n          </button> </td>\r\n        <td></td>\r\n        <td *ngIf=\"showSeconds\">\r\n          <button type=\"button\" mat-icon-button aria-label=\"expand_less icon\" (click)=\"change('second', true)\"\r\n            [disabled]=\"disabled || disableMinute\">\r\n            <mat-icon>expand_less</mat-icon>\r\n          </button>\r\n        </td>\r\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-spacer\"></td>\r\n        <td *ngIf=\"enableMeridian\"></td>\r\n      </tr>\r\n\r\n      <tr>\r\n        <td>\r\n          <mat-form-field appearance=\"legacy\">\r\n            <input type=\"text\" matInput (input)=\"formatInput($any($event).target)\" maxlength=\"2\" formControlName=\"hour\"\r\n              (keydown.ArrowUp)=\"change('hour', true); $event.preventDefault()\"\r\n              (keydown.ArrowDown)=\"change('hour', false); $event.preventDefault()\" (blur)=\"change('hour')\">\r\n          </mat-form-field>\r\n        </td>\r\n        <td class=\"ngx-mat-timepicker-spacer\">&#58;</td>\r\n        <td>\r\n          <mat-form-field appearance=\"legacy\">\r\n            <input type=\"text\" matInput (input)=\"formatInput($any($event).target)\" maxlength=\"2\"\r\n              formControlName=\"minute\" (keydown.ArrowUp)=\"change('minute', true); $event.preventDefault()\"\r\n              (keydown.ArrowDown)=\"change('minute', false); $event.preventDefault()\" (blur)=\"change('minute')\">\r\n          </mat-form-field>\r\n        </td>\r\n        <td *ngIf=\"showSeconds\" class=\"ngx-mat-timepicker-spacer\">&#58;</td>\r\n        <td *ngIf=\"showSeconds\">\r\n          <mat-form-field appearance=\"legacy\">\r\n            <input type=\"text\" matInput (input)=\"formatInput($any($event).target)\" maxlength=\"2\"\r\n              formControlName=\"second\" (keydown.ArrowUp)=\"change('second', true); $event.preventDefault()\"\r\n              (keydown.ArrowDown)=\"change('second', false); $event.preventDefault()\" (blur)=\"change('second')\">\r\n          </mat-form-field>\r\n        </td>\r\n\r\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-spacer\"></td>\r\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-meridian\">\r\n          <button mat-button (click)=\"toggleMeridian()\" mat-stroked-button [color]=\"color\" [disabled]=\"disabled\">\r\n            {{meridian}}\r\n          </button>\r\n        </td>\r\n      </tr>\r\n\r\n      <tr *ngIf=\"showSpinners\">\r\n        <td>\r\n          <button type=\"button\" mat-icon-button aria-label=\"expand_more icon\" (click)=\"change('hour', false)\"\r\n            [disabled]=\"disabled\">\r\n            <mat-icon>expand_more</mat-icon>\r\n          </button> </td>\r\n        <td></td>\r\n        <td>\r\n          <button type=\"button\" mat-icon-button aria-label=\"expand_more icon\" (click)=\"change('minute', false)\"\r\n            [disabled]=\"disabled || disableMinute\">\r\n            <mat-icon>expand_more</mat-icon>\r\n          </button> </td>\r\n        <td *ngIf=\"showSeconds\"></td>\r\n        <td *ngIf=\"showSeconds\">\r\n          <button type=\"button\" mat-icon-button aria-label=\"expand_more icon\" (click)=\"change('second', false)\"\r\n            [disabled]=\"disabled || disableMinute\">\r\n            <mat-icon>expand_more</mat-icon>\r\n          </button>\r\n        </td>\r\n        <td *ngIf=\"enableMeridian\" class=\"ngx-mat-timepicker-spacer\"></td>\r\n        <td *ngIf=\"enableMeridian\"></td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n</form>",
      styles: [".ngx-mat-timepicker{font-size:13px}.ngx-mat-timepicker form{min-width:90px}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td{text-align:center}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td.ngx-mat-timepicker-spacer{font-weight:bold}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td.ngx-mat-timepicker-meridian .mat-button{min-width:64px;line-height:36px;min-width:0;border-radius:50%;width:36px;height:36px;padding:0;flex-shrink:0}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-icon-button{height:24px;width:24px;line-height:24px}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-icon-button .mat-icon{font-size:24px}.ngx-mat-timepicker form .ngx-mat-timepicker-table .ngx-mat-timepicker-tbody tr td .mat-form-field{width:20px;max-width:20px;text-align:center}\n"]
    }]
  }], function () {
    return [{
      type: NgxMatDateAdapter,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder
    }];
  }, {
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    showSpinners: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    stepHour: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    stepMinute: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    stepSecond: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    showSeconds: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disableMinute: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    enableMeridian: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    defaultTime: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/** Used to generate a unique ID for each datepicker instance. */


let datepickerUid = 0; // Boilerplate for applying mixins to MatDatepickerContent.

/** @docs-private */

const _MatDatetimepickerContentBase = (0,_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.mixinColor)(class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }

});
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * NgxMatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */


class NgxMatDatetimeContent extends _MatDatetimepickerContentBase {
  constructor(elementRef, cd, _viewContainerRef) {
    super(elementRef);
    this.cd = cd;
    this._viewContainerRef = _viewContainerRef;
  }
  /** Whether or not the selected date is valid (min,max...) */


  get valid() {
    if (this.datepicker.hideTime) return this.datepicker.valid;
    return this._timePicker && this._timePicker.valid && this.datepicker.valid;
  }

  get isViewMonth() {
    if (!this._calendar || this._calendar.currentView == null) return true;
    return this._calendar.currentView == 'month';
  }

  ngAfterViewInit() {
    this._calendar.focusActiveCell();

    if (this.datepicker._customIcon) {
      this._templateCustomIconPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_11__.TemplatePortal(this.datepicker._customIcon, this._viewContainerRef);
      this.cd.detectChanges();
    }
  }

}
/** @nocollapse */

/** @nocollapse */


NgxMatDatetimeContent.ɵfac = function NgxMatDatetimeContent_Factory(t) {
  return new (t || NgxMatDatetimeContent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef));
};
/** @nocollapse */

/** @nocollapse */


NgxMatDatetimeContent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NgxMatDatetimeContent,
  selectors: [["ngx-mat-datetime-content"]],
  viewQuery: function NgxMatDatetimeContent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](NgxMatCalendar, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](NgxMatTimepickerComponent, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._calendar = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._timePicker = _t.first);
    }
  },
  hostAttrs: [1, "mat-datepicker-content"],
  hostVars: 3,
  hostBindings: function NgxMatDatetimeContent_HostBindings(rf, ctx) {
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsyntheticHostProperty"]("@transformPanel", "enter");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-datepicker-content-touch", ctx.datepicker.touchUi);
    }
  },
  inputs: {
    color: "color"
  },
  exportAs: ["ngxMatDatetimeContent"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]],
  decls: 2,
  vars: 12,
  consts: [["cdkTrapFocus", "", 3, "id", "ngClass", "startAt", "startView", "minDate", "maxDate", "dateFilter", "headerComponent", "selected", "dateClass", "selectedChange", "yearSelected", "monthSelected"], [4, "ngIf"], ["class", "time-container", 3, "disable-seconds", 4, "ngIf"], [1, "actions"], ["mat-button", "", "mat-stroked-button", "", "cdkFocusInitial", "", 3, "color", "disabled", "click"], [3, "cdkPortalOutlet"], [1, "time-container"], [3, "showSpinners", "showSeconds", "disabled", "stepHour", "stepMinute", "stepSecond", "ngModel", "color", "enableMeridian", "disableMinute", "ngModelChange"]],
  template: function NgxMatDatetimeContent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ngx-mat-calendar", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedChange", function NgxMatDatetimeContent_Template_ngx_mat_calendar_selectedChange_0_listener($event) {
        return ctx.datepicker.select($event);
      })("yearSelected", function NgxMatDatetimeContent_Template_ngx_mat_calendar_yearSelected_0_listener($event) {
        return ctx.datepicker._selectYear($event);
      })("monthSelected", function NgxMatDatetimeContent_Template_ngx_mat_calendar_monthSelected_0_listener($event) {
        return ctx.datepicker._selectMonth($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NgxMatDatetimeContent_ng_container_1_Template, 6, 5, "ng-container", 1);
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx.datepicker.id)("ngClass", ctx.datepicker.panelClass)("startAt", ctx.datepicker.startAt)("startView", ctx.datepicker.startView)("minDate", ctx.datepicker._minDate)("maxDate", ctx.datepicker._maxDate)("dateFilter", ctx.datepicker._dateFilter)("headerComponent", ctx.datepicker.calendarHeaderComponent)("selected", ctx.datepicker._selected)("dateClass", ctx.datepicker.dateClass)("@fadeInCalendar", "enter");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isViewMonth);
    }
  },
  directives: [NgxMatCalendar, NgxMatTimepickerComponent, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgModel, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_11__.CdkPortalOutlet],
  styles: [".mat-datepicker-content{display:block;border-radius:4px;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f}.mat-datepicker-content .mat-calendar{width:296px}.mat-datepicker-content .time-container{display:flex;position:relative;padding-top:5px;justify-content:center}.mat-datepicker-content .time-container.disable-seconds .ngx-mat-timepicker .table{margin-left:9px}.mat-datepicker-content .time-container:before{content:\"\";position:absolute;top:0;left:0;right:0;height:1px;background-color:#0000001f}.mat-datepicker-content .actions{display:flex;padding:5px 15px 10px;justify-content:flex-end}\n"],
  encapsulation: 2,
  data: {
    animation: [_angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.matDatepickerAnimations.transformPanel, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.matDatepickerAnimations.fadeInCalendar]
  },
  changeDetection: 0
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatDatetimeContent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-mat-datetime-content',
      host: {
        'class': 'mat-datepicker-content',
        '[@transformPanel]': '"enter"',
        '[class.mat-datepicker-content-touch]': 'datepicker.touchUi'
      },
      animations: [_angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.matDatepickerAnimations.transformPanel, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.matDatepickerAnimations.fadeInCalendar],
      exportAs: 'ngxMatDatetimeContent',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      inputs: ['color'],
      template: "<ngx-mat-calendar cdkTrapFocus [id]=\"datepicker.id\" [ngClass]=\"datepicker.panelClass\" [startAt]=\"datepicker.startAt\"\r\n    [startView]=\"datepicker.startView\" [minDate]=\"datepicker._minDate\" [maxDate]=\"datepicker._maxDate\"\r\n    [dateFilter]=\"datepicker._dateFilter\" [headerComponent]=\"datepicker.calendarHeaderComponent\"\r\n    [selected]=\"datepicker._selected\" [dateClass]=\"datepicker.dateClass\" [@fadeInCalendar]=\"'enter'\"\r\n    (selectedChange)=\"datepicker.select($event)\" (yearSelected)=\"datepicker._selectYear($event)\"\r\n    (monthSelected)=\"datepicker._selectMonth($event)\">\r\n</ngx-mat-calendar>\r\n<ng-container *ngIf=\"isViewMonth\">\r\n    <div *ngIf=\"!datepicker._hideTime\" class=\"time-container\" [class.disable-seconds]=\"!datepicker._showSeconds\">\r\n        <ngx-mat-timepicker [showSpinners]=\"datepicker._showSpinners\" [showSeconds]=\"datepicker._showSeconds\"\r\n            [disabled]=\"datepicker._disabled\" [stepHour]=\"datepicker._stepHour\" [stepMinute]=\"datepicker._stepMinute\"\r\n            [stepSecond]=\"datepicker._stepSecond\" [(ngModel)]=\"datepicker._selected\" [color]=\"datepicker._color\"\r\n            [enableMeridian]=\"datepicker._enableMeridian\" [disableMinute]=\"datepicker._disableMinute\">\r\n        </ngx-mat-timepicker>\r\n    </div>\r\n    <div class=\"actions\">\r\n        <button mat-button (click)=\"datepicker.ok()\" mat-stroked-button [color]=\"datepicker._color\" cdkFocusInitial\r\n            [disabled]=\"!valid\">\r\n            <mat-icon *ngIf=\"!datepicker._customIcon\">done</mat-icon>\r\n            <ng-template [cdkPortalOutlet]=\"_templateCustomIconPortal\"></ng-template>\r\n        </button>\r\n    </div>\r\n</ng-container>",
      styles: [".mat-datepicker-content{display:block;border-radius:4px;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f}.mat-datepicker-content .mat-calendar{width:296px}.mat-datepicker-content .time-container{display:flex;position:relative;padding-top:5px;justify-content:center}.mat-datepicker-content .time-container.disable-seconds .ngx-mat-timepicker .table{margin-left:9px}.mat-datepicker-content .time-container:before{content:\"\";position:absolute;top:0;left:0;right:0;height:1px;background-color:#0000001f}.mat-datepicker-content .actions{display:flex;padding:5px 15px 10px;justify-content:flex-end}\n"]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef
    }];
  }, {
    _calendar: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [NgxMatCalendar]
    }],
    _timePicker: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [NgxMatTimepickerComponent]
    }]
  });
})(); // TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.

/** Component responsible for managing the datepicker popup/dialog. */


class NgxMatDatetimePicker {
  constructor(_dialog, _overlay, _ngZone, _viewContainerRef, scrollStrategy, _dateAdapter, _dir, _document) {
    this._dialog = _dialog;
    this._overlay = _overlay;
    this._ngZone = _ngZone;
    this._viewContainerRef = _viewContainerRef;
    this._dateAdapter = _dateAdapter;
    this._dir = _dir;
    this._document = _document;
    /** The view that the calendar should start in. */

    this.startView = 'month';
    this._defaultColor = 'primary';
    this._touchUi = false;
    this._hideTime = false;
    /**
     * Emits selected year in multiyear view.
     * This doesn't imply a change on the selected date.
     */

    this.yearSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Emits selected month in year view.
     * This doesn't imply a change on the selected date.
     */

    this.monthSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits when the datepicker has been opened. */

    this.openedStream = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits when the datepicker has been closed. */

    this.closedStream = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._opened = false;
    this._showSpinners = true;
    this._showSeconds = false;
    this._stepHour = DEFAULT_STEP;
    this._stepMinute = DEFAULT_STEP;
    this._stepSecond = DEFAULT_STEP;
    this._enableMeridian = false;
    this._hasBackdrop = true;
    /** The id for the datepicker calendar. */

    this.id = `mat-datepicker-${datepickerUid++}`;
    this._validSelected = null;
    /** The element that was focused before the datepicker was opened. */

    this._focusedElementBeforeOpen = null;
    /** Subscription to value changes in the associated input element. */

    this._inputSubscription = rxjs__WEBPACK_IMPORTED_MODULE_5__.Subscription.EMPTY;
    /** Emits when the datepicker is disabled. */

    this.stateChanges = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
    /** Emits new selected date when selected date changes. */

    this._selectedChanged = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
    /** The form control validator for the min date. */

    this._minValidator = () => {
      return !this._minDate || !this._selected || this._dateAdapter.compareDateWithTime(this._minDate, this._selected, this.showSeconds) <= 0 ? null : {
        'matDatetimePickerMin': {
          'min': this._minDate,
          'actual': this._selected
        }
      };
    };
    /** The form control validator for the max date. */


    this._maxValidator = () => {
      return !this._maxDate || !this._selected || this._dateAdapter.compareDateWithTime(this._maxDate, this._selected, this.showSeconds) >= 0 ? null : {
        'matDatetimePickerMax': {
          'max': this._maxDate,
          'actual': this._selected
        }
      };
    };

    if (!this._dateAdapter) {
      throw createMissingDateImplError('NgxMatDateAdapter');
    }

    this._scrollStrategy = scrollStrategy;
  }
  /** The date to open the calendar to initially. */


  get startAt() {
    // If an explicit startAt is set we start there, otherwise we start at whatever the currently
    // selected value is.
    return this._startAt || (this.datepickerInput ? this.datepickerInput.value : null);
  }

  set startAt(value) {
    this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  /** Default Color palette to use on the datepicker's calendar. */


  get defaultColor() {
    return this._defaultColor;
  }

  set defaultColor(value) {
    this._defaultColor = value;
  }
  /** Color palette to use on the datepicker's calendar. */


  get color() {
    return this._color || (this.datepickerInput ? this.datepickerInput._getThemePalette() : 'primary');
  }

  set color(value) {
    this._color = value;
  }
  /**
   * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
   * than a popup and elements have more padding to allow for bigger touch targets.
   */


  get touchUi() {
    return this._touchUi;
  }

  set touchUi(value) {
    this._touchUi = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_18__.coerceBooleanProperty)(value);
  }

  get hideTime() {
    return this._hideTime;
  }

  set hideTime(value) {
    this._hideTime = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_18__.coerceBooleanProperty)(value);
  }
  /** Whether the datepicker pop-up should be disabled. */


  get disabled() {
    return this._disabled === undefined && this.datepickerInput ? this.datepickerInput.disabled : !!this._disabled;
  }

  set disabled(value) {
    const newValue = (0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_18__.coerceBooleanProperty)(value);

    if (newValue !== this._disabled) {
      this._disabled = newValue;
      this.stateChanges.next(newValue);
    }
  }
  /** Whether the calendar is open. */


  get opened() {
    return this._opened;
  }

  set opened(value) {
    value ? this.open() : this.close();
  }
  /** Whether the timepicker'spinners is shown. */


  get showSpinners() {
    return this._showSpinners;
  }

  set showSpinners(value) {
    this._showSpinners = value;
  }
  /** Whether the second part is disabled. */


  get showSeconds() {
    return this._showSeconds;
  }

  set showSeconds(value) {
    this._showSeconds = value;
  }
  /** Step hour */


  get stepHour() {
    return this._stepHour;
  }

  set stepHour(value) {
    this._stepHour = value;
  }
  /** Step minute */


  get stepMinute() {
    return this._stepMinute;
  }

  set stepMinute(value) {
    this._stepMinute = value;
  }
  /** Step second */


  get stepSecond() {
    return this._stepSecond;
  }

  set stepSecond(value) {
    this._stepSecond = value;
  }
  /** Enable meridian */


  get enableMeridian() {
    return this._enableMeridian;
  }

  set enableMeridian(value) {
    this._enableMeridian = value;
  }
  /** disable minute */


  get disableMinute() {
    return this._disableMinute;
  }

  set disableMinute(value) {
    this._disableMinute = value;
  }
  /** Step second */


  get defaultTime() {
    return this._defaultTime;
  }

  set defaultTime(value) {
    this._defaultTime = value;
  }
  /** The currently selected date. */


  get _selected() {
    return this._validSelected;
  }

  set _selected(value) {
    this._validSelected = value;
  }
  /** The minimum selectable date. */


  get _minDate() {
    return this.datepickerInput && this.datepickerInput.min;
  }
  /** The maximum selectable date. */


  get _maxDate() {
    return this.datepickerInput && this.datepickerInput.max;
  }

  get valid() {
    const minValidators = this._minValidator();

    const maxValidators = this._maxValidator();

    return minValidators == null && maxValidators == null;
  }

  get _dateFilter() {
    return this.datepickerInput && this.datepickerInput._dateFilter;
  }

  ngOnDestroy() {
    this.close();

    if (this._popupRef) {
      this._popupRef.dispose();

      this._popupComponentRef = null;
    }

    this._inputSubscription.unsubscribe();

    this.stateChanges.complete();
  }
  /** Selects the given date */


  select(date) {
    this._dateAdapter.copyTime(date, this._selected);

    this._selected = date;
  }
  /** Emits the selected year in multiyear view */


  _selectYear(normalizedYear) {
    this.yearSelected.emit(normalizedYear);
  }
  /** Emits selected month in year view */


  _selectMonth(normalizedMonth) {
    this.monthSelected.emit(normalizedMonth);
  }
  /** OK button handler and close*/


  ok() {
    const cloned = this._dateAdapter.clone(this._selected);

    this._selectedChanged.next(cloned);

    this.close();
  }
  /** Cancel and close */


  cancel() {
    this._selected = this._rawValue;
    this.close();
  }
  /**
   * Register an input with this datepicker.
   * @param input The datepicker input to register with this datepicker.
   */


  _registerInput(input) {
    if (this.datepickerInput) {
      throw Error('A NgxMatDatepicker can only be associated with a single input.');
    }

    this.datepickerInput = input;
    this._inputSubscription = this.datepickerInput._valueChange.subscribe(value => this._selected = value);
  }
  /** Open the calendar. */


  open() {
    this._rawValue = this._selected != null ? this._dateAdapter.clone(this._selected) : null;

    if (this._selected == null) {
      this._selected = this._dateAdapter.today();

      if (this.defaultTime != null) {
        this._dateAdapter.setTimeByDefaultValues(this._selected, this.defaultTime);
      }
    }

    if (this._opened || this.disabled) {
      return;
    }

    if (!this.datepickerInput) {
      throw Error('Attempted to open an NgxMatDatepicker with no associated input.');
    }

    if (this._document) {
      this._focusedElementBeforeOpen = this._document.activeElement;
    }

    this.touchUi ? this._openAsDialog() : this._openAsPopup();
    this._opened = true;
    this.openedStream.emit();
  }
  /** Close the calendar. */


  close() {
    if (!this._opened) {
      return;
    }

    if (this._popupRef && this._popupRef.hasAttached()) {
      this._popupRef.detach();
    }

    if (this._dialogRef) {
      this._dialogRef.close();

      this._dialogRef = null;
    }

    if (this._calendarPortal && this._calendarPortal.isAttached) {
      this._calendarPortal.detach();
    }

    const completeClose = () => {
      // The `_opened` could've been reset already if
      // we got two events in quick succession.
      if (this._opened) {
        this._opened = false;
        this.closedStream.emit();
        this._focusedElementBeforeOpen = null;
      }
    };

    if (this._focusedElementBeforeOpen && typeof this._focusedElementBeforeOpen.focus === 'function') {
      // Because IE moves focus asynchronously, we can't count on it being restored before we've
      // marked the datepicker as closed. If the event fires out of sequence and the element that
      // we're refocusing opens the datepicker on focus, the user could be stuck with not being
      // able to close the calendar at all. We work around it by making the logic, that marks
      // the datepicker as closed, async as well.
      this._focusedElementBeforeOpen.focus();

      setTimeout(completeClose);
    } else {
      completeClose();
    }
  }
  /** Open the calendar as a dialog. */


  _openAsDialog() {
    // Usually this would be handled by `open` which ensures that we can only have one overlay
    // open at a time, however since we reset the variables in async handlers some overlays
    // may slip through if the user opens and closes multiple times in quick succession (e.g.
    // by holding down the enter key).
    if (this._dialogRef) {
      this._dialogRef.close();
    }

    this._dialogRef = this._dialog.open(NgxMatDatetimeContent, {
      direction: this._dir ? this._dir.value : 'ltr',
      viewContainerRef: this._viewContainerRef,
      panelClass: 'mat-datepicker-dialog',
      hasBackdrop: this._hasBackdrop
    });

    this._dialogRef.afterClosed().subscribe(() => this.close());

    this._dialogRef.componentInstance.datepicker = this;

    this._setColor();
  }
  /** Open the calendar as a popup. */


  _openAsPopup() {
    if (!this._calendarPortal) {
      this._calendarPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_11__.ComponentPortal(NgxMatDatetimeContent, this._viewContainerRef);
    }

    if (!this._popupRef) {
      this._createPopup();
    }

    if (!this._popupRef.hasAttached()) {
      this._popupComponentRef = this._popupRef.attach(this._calendarPortal);
      this._popupComponentRef.instance.datepicker = this;

      this._setColor(); // Update the position once the calendar has rendered.


      this._ngZone.onStable.asObservable().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.take)(1)).subscribe(() => {
        this._popupRef.updatePosition();
      });
    }
  }
  /** Create the popup. */


  _createPopup() {
    const overlayConfig = new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_19__.OverlayConfig({
      positionStrategy: this._createPopupPositionStrategy(),
      hasBackdrop: this._hasBackdrop,
      backdropClass: 'mat-overlay-transparent-backdrop',
      direction: this._dir,
      scrollStrategy: this._scrollStrategy(),
      panelClass: 'mat-datepicker-popup'
    });
    this._popupRef = this._overlay.create(overlayConfig);

    this._popupRef.overlayElement.setAttribute('role', 'dialog');

    (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.merge)(this._popupRef.backdropClick(), this._popupRef.detachments(), this._popupRef.keydownEvents().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.filter)(event => {
      // Closing on alt + up is only valid when there's an input associated with the datepicker.
      return event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.ESCAPE || this.datepickerInput && event.altKey && event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.UP_ARROW;
    }))).subscribe(event => {
      if (event) {
        event.preventDefault();
      }

      this._hasBackdrop && event ? this.cancel() : this.close();
    });
  }
  /** Create the popup PositionStrategy. */


  _createPopupPositionStrategy() {
    return this._overlay.position().flexibleConnectedTo(this.datepickerInput.getConnectedOverlayOrigin()).withTransformOriginOn('.mat-datepicker-content').withFlexibleDimensions(false).withViewportMargin(8).withLockedPosition().withPositions([{
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    }, {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    }, {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    }, {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    }]);
  }
  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */


  _getValidDateOrNull(obj) {
    return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
  }
  /** Passes the current theme color along to the calendar overlay. */


  _setColor() {
    const color = this.color;

    if (this._popupComponentRef) {
      this._popupComponentRef.instance.color = color;
    }

    if (this._dialogRef) {
      this._dialogRef.componentInstance.color = color;
    }
  }

}
/** @nocollapse */

/** @nocollapse */


NgxMatDatetimePicker.ɵfac = function NgxMatDatetimePicker_Factory(t) {
  return new (t || NgxMatDatetimePicker)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__.MatDialog), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_19__.Overlay), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.MAT_DATEPICKER_SCROLL_STRATEGY), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgxMatDateAdapter, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_2__.DOCUMENT, 8));
};
/** @nocollapse */

/** @nocollapse */


NgxMatDatetimePicker.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NgxMatDatetimePicker,
  selectors: [["ngx-mat-datetime-picker"]],
  contentQueries: function NgxMatDatetimePicker_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._customIcon = _t.first);
    }
  },
  inputs: {
    calendarHeaderComponent: "calendarHeaderComponent",
    startAt: "startAt",
    startView: "startView",
    defaultColor: "defaultColor",
    color: "color",
    touchUi: "touchUi",
    hideTime: "hideTime",
    disabled: "disabled",
    panelClass: "panelClass",
    dateClass: "dateClass",
    opened: "opened",
    showSpinners: "showSpinners",
    showSeconds: "showSeconds",
    stepHour: "stepHour",
    stepMinute: "stepMinute",
    stepSecond: "stepSecond",
    enableMeridian: "enableMeridian",
    disableMinute: "disableMinute",
    defaultTime: "defaultTime"
  },
  outputs: {
    yearSelected: "yearSelected",
    monthSelected: "monthSelected",
    openedStream: "opened",
    closedStream: "closed"
  },
  exportAs: ["ngxMatDatetimePicker"],
  decls: 0,
  vars: 0,
  template: function NgxMatDatetimePicker_Template(rf, ctx) {},
  encapsulation: 2,
  changeDetection: 0
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatDatetimePicker, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-mat-datetime-picker',
      template: '',
      exportAs: 'ngxMatDatetimePicker',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None
    }]
  }], function () {
    return [{
      type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__.MatDialog
    }, {
      type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_19__.Overlay
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.MAT_DATEPICKER_SCROLL_STRATEGY]
      }]
    }, {
      type: NgxMatDateAdapter,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.DOCUMENT]
      }]
    }];
  }, {
    calendarHeaderComponent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    _customIcon: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef]
    }],
    startAt: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    startView: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    defaultColor: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    touchUi: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    hideTime: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    yearSelected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    monthSelected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    panelClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    dateClass: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    openedStream: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output,
      args: ['opened']
    }],
    closedStream: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output,
      args: ['closed']
    }],
    opened: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    showSpinners: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    showSeconds: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    stepHour: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    stepMinute: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    stepSecond: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    enableMeridian: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disableMinute: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    defaultTime: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/** @docs-private */


const MAT_DATEPICKER_VALUE_ACCESSOR = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NG_VALUE_ACCESSOR,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgxMatDatetimeInput),
  multi: true
};
/** @docs-private */

const MAT_DATEPICKER_VALIDATORS = {
  provide: _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NG_VALIDATORS,
  useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => NgxMatDatetimeInput),
  multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatetimePickerInputEvent instead.
 */

class MatDatetimePickerInputEvent {
  constructor(
  /** Reference to the datepicker input component that emitted the event. */
  target,
  /** Reference to the native input element associated with the datepicker input. */
  targetElement) {
    this.target = target;
    this.targetElement = targetElement;
    this.value = this.target.value;
  }

}
/** Directive used to connect an input to a matDatetimePicker. */


class NgxMatDatetimeInput {
  constructor(_elementRef, _dateAdapter, _dateFormats, _formField) {
    this._elementRef = _elementRef;
    this._dateAdapter = _dateAdapter;
    this._dateFormats = _dateFormats;
    this._formField = _formField;
    /** Emits when a `change` event is fired on this `<input>`. */

    this.dateChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits when an `input` event is fired on this `<input>`. */

    this.dateInput = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits when the value changes (either due to user input or programmatic change). */

    this._valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Emits when the disabled state has changed */

    this.stateChanges = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();

    this._onTouched = () => {};

    this._cvaOnChange = () => {};

    this._validatorOnChange = () => {};

    this._datepickerSubscription = rxjs__WEBPACK_IMPORTED_MODULE_5__.Subscription.EMPTY;
    this._localeSubscription = rxjs__WEBPACK_IMPORTED_MODULE_5__.Subscription.EMPTY;
    /** The form control validator for whether the input parses. */

    this._parseValidator = () => {
      return this._lastValueValid ? null : {
        'matDatetimePickerParse': {
          'text': this._elementRef.nativeElement.value
        }
      };
    };
    /** The form control validator for the min date. */


    this._minValidator = control => {
      const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));

      return !this.min || !controlValue || this._dateAdapter.compareDateWithTime(this.min, controlValue, this._datepicker.showSeconds) <= 0 ? null : {
        'matDatetimePickerMin': {
          'min': this.min,
          'actual': controlValue
        }
      };
    };
    /** The form control validator for the max date. */


    this._maxValidator = control => {
      const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));

      return !this.max || !controlValue || this._dateAdapter.compareDateWithTime(this.max, controlValue, this._datepicker.showSeconds) >= 0 ? null : {
        'matDatetimePickerMax': {
          'max': this.max,
          'actual': controlValue
        }
      };
    };
    /** The form control validator for the date filter. */


    this._filterValidator = control => {
      const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));

      return !this._dateFilter || !controlValue || this._dateFilter(controlValue) ? null : {
        'matDatetimePickerFilter': true
      };
    };
    /** The combined form control validator for this input. */


    this._validator = _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([this._parseValidator, this._minValidator, this._maxValidator, this._filterValidator]);
    /** Whether the last value set on the input was valid. */

    this._lastValueValid = false;

    if (!this._dateAdapter) {
      throw createMissingDateImplError('NgxMatDateAdapter');
    }

    if (!this._dateFormats) {
      throw createMissingDateImplError('NGX_MAT_DATE_FORMATS');
    } // Update the displayed date when the locale changes.


    this._localeSubscription = _dateAdapter.localeChanges.subscribe(() => {
      this.value = this.value;
    });
  }
  /** The datepicker that this input is associated with. */


  set ngxMatDatetimePicker(value) {
    if (!value) {
      return;
    }

    this._datepicker = value;

    this._datepicker._registerInput(this);

    this._datepickerSubscription.unsubscribe();

    this._datepickerSubscription = this._datepicker._selectedChanged.subscribe(selected => {
      this.value = selected;

      this._cvaOnChange(selected);

      this._onTouched();

      this.dateInput.emit(new MatDatetimePickerInputEvent(this, this._elementRef.nativeElement));
      this.dateChange.emit(new MatDatetimePickerInputEvent(this, this._elementRef.nativeElement));
    });
  }
  /** Function that can be used to filter out dates within the datepicker. */


  set ngxMatDatetimePickerFilter(value) {
    this._dateFilter = value;

    this._validatorOnChange();
  }
  /** The value of the input. */


  get value() {
    return this._value;
  }

  set value(value) {
    value = this._dateAdapter.deserialize(value);
    this._lastValueValid = !value || this._dateAdapter.isValid(value);
    value = this._getValidDateOrNull(value);
    const oldDate = this.value;
    this._value = value;

    this._formatValue(value);

    if (!this._dateAdapter.sameDate(oldDate, value)) {
      this._valueChange.emit(value);
    }
  }
  /** The minimum valid date. */


  get min() {
    return this._min;
  }

  set min(value) {
    this._min = this._getValidDateOrNull(this._dateAdapter.deserialize(value));

    this._validatorOnChange();
  }
  /** The maximum valid date. */


  get max() {
    return this._max;
  }

  set max(value) {
    this._max = this._getValidDateOrNull(this._dateAdapter.deserialize(value));

    this._validatorOnChange();
  }
  /** Whether the datepicker-input is disabled. */


  get disabled() {
    return !!this._disabled;
  }

  set disabled(value) {
    const newValue = value != null && `${value}` !== 'false';
    const element = this._elementRef.nativeElement;

    if (this._disabled !== newValue) {
      this._disabled = newValue;
      this.stateChanges.emit(undefined);
    } // We need to null check the `blur` method, because it's undefined during SSR.


    if (newValue && element.blur) {
      // Normally, native input elements automatically blur if they turn disabled. This behavior
      // is problematic, because it would mean that it triggers another change detection cycle,
      // which then causes a changed after checked error if the input element was focused before.
      element.blur();
    }
  }

  ngOnDestroy() {
    this._datepickerSubscription.unsubscribe();

    this._localeSubscription.unsubscribe();

    this._valueChange.complete();

    this.stateChanges.complete();
  }
  /** @docs-private */


  registerOnValidatorChange(fn) {
    this._validatorOnChange = fn;
  }
  /** @docs-private */


  validate(c) {
    return this._validator ? this._validator(c) : null;
  }
  /**
   * @deprecated
   * @breaking-change 8.0.0 Use `getConnectedOverlayOrigin` instead
   */


  getPopupConnectionElementRef() {
    return this.getConnectedOverlayOrigin();
  }
  /**
   * Gets the element that the datepicker popup should be connected to.
   * @return The element to connect the popup to.
   */


  getConnectedOverlayOrigin() {
    return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
  } // Implemented as part of ControlValueAccessor.


  writeValue(value) {
    this.value = value;
  } // Implemented as part of ControlValueAccessor.


  registerOnChange(fn) {
    this._cvaOnChange = fn;
  } // Implemented as part of ControlValueAccessor.


  registerOnTouched(fn) {
    this._onTouched = fn;
  } // Implemented as part of ControlValueAccessor.


  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }

  _onKeydown(event) {
    const isAltDownArrow = event.altKey && event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_7__.DOWN_ARROW;

    if (this._datepicker && isAltDownArrow && !this._elementRef.nativeElement.readOnly) {
      this._datepicker.open();

      event.preventDefault();
    }
  }

  _onInput(value) {
    const lastValueWasValid = this._lastValueValid;

    let date = this._dateAdapter.parse(value, this._dateFormats.parse.dateInput);

    this._lastValueValid = !date || this._dateAdapter.isValid(date);
    date = this._getValidDateOrNull(date);

    const isSameTime = this._dateAdapter.isSameTime(date, this._value);

    if (date != null && (!isSameTime || !this._dateAdapter.sameDate(date, this._value)) || date == null && this._value != null) {
      this._value = date;

      this._cvaOnChange(date);

      this._valueChange.emit(date);

      this.dateInput.emit(new MatDatetimePickerInputEvent(this, this._elementRef.nativeElement));
    } else if (lastValueWasValid !== this._lastValueValid) {
      this._validatorOnChange();
    }
  }

  _onChange() {
    this.dateChange.emit(new MatDatetimePickerInputEvent(this, this._elementRef.nativeElement));
  }
  /** Returns the palette used by the input's form field, if any. */


  _getThemePalette() {
    return this._formField ? this._formField.color : undefined;
  }
  /** Handles blur events on the input. */


  _onBlur() {
    // Reformat the input only if we have a valid value.
    if (this.value) {
      this._formatValue(this.value);
    }

    this._onTouched();
  }
  /** Handles focus events on the input. */


  _onFocus() {
    // Close datetime picker if opened
    if (this._datepicker && this._datepicker.opened) {
      this._datepicker.cancel();
    }
  }
  /** Formats a value and sets it on the input element. */


  _formatValue(value) {
    this._elementRef.nativeElement.value = value ? this._dateAdapter.format(value, this._dateFormats.display.dateInput) : '';
  }
  /**
   * @param obj The object to check.
   * @returns The given object if it is both a date instance and valid, otherwise null.
   */


  _getValidDateOrNull(obj) {
    return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
  }

}
/** @nocollapse */

/** @nocollapse */


NgxMatDatetimeInput.ɵfac = function NgxMatDatetimeInput_Factory(t) {
  return new (t || NgxMatDatetimeInput)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NgxMatDateAdapter, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](NGX_MAT_DATE_FORMATS, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatFormField, 8));
};
/** @nocollapse */

/** @nocollapse */


NgxMatDatetimeInput.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: NgxMatDatetimeInput,
  selectors: [["input", "ngxMatDatetimePicker", ""]],
  hostVars: 5,
  hostBindings: function NgxMatDatetimeInput_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function NgxMatDatetimeInput_input_HostBindingHandler($event) {
        return ctx._onInput($event.target.value);
      })("change", function NgxMatDatetimeInput_change_HostBindingHandler() {
        return ctx._onChange();
      })("blur", function NgxMatDatetimeInput_blur_HostBindingHandler() {
        return ctx._onBlur();
      })("focus", function NgxMatDatetimeInput_focus_HostBindingHandler() {
        return ctx._onFocus();
      })("keydown", function NgxMatDatetimeInput_keydown_HostBindingHandler($event) {
        return ctx._onKeydown($event);
      });
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("disabled", ctx.disabled);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-haspopup", ctx._datepicker ? "dialog" : null)("aria-owns", (ctx._datepicker == null ? null : ctx._datepicker.opened) && ctx._datepicker.id || null)("min", ctx.min ? ctx._dateAdapter.toIso8601(ctx.min) : null)("max", ctx.max ? ctx._dateAdapter.toIso8601(ctx.max) : null);
    }
  },
  inputs: {
    ngxMatDatetimePicker: "ngxMatDatetimePicker",
    ngxMatDatetimePickerFilter: "ngxMatDatetimePickerFilter",
    value: "value",
    min: "min",
    max: "max",
    disabled: "disabled"
  },
  outputs: {
    dateChange: "dateChange",
    dateInput: "dateInput"
  },
  exportAs: ["ngxMatDatetimePickerInput"],
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([MAT_DATEPICKER_VALUE_ACCESSOR, MAT_DATEPICKER_VALIDATORS, {
    provide: _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MAT_INPUT_VALUE_ACCESSOR,
    useExisting: NgxMatDatetimeInput
  }])]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatDatetimeInput, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'input[ngxMatDatetimePicker]',
      providers: [MAT_DATEPICKER_VALUE_ACCESSOR, MAT_DATEPICKER_VALIDATORS, {
        provide: _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MAT_INPUT_VALUE_ACCESSOR,
        useExisting: NgxMatDatetimeInput
      }],
      host: {
        '[attr.aria-haspopup]': '_datepicker ? "dialog" : null',
        '[attr.aria-owns]': '(_datepicker?.opened && _datepicker.id) || null',
        '[attr.min]': 'min ? _dateAdapter.toIso8601(min) : null',
        '[attr.max]': 'max ? _dateAdapter.toIso8601(max) : null',
        '[disabled]': 'disabled',
        '(input)': '_onInput($event.target.value)',
        '(change)': '_onChange()',
        '(blur)': '_onBlur()',
        '(focus)': '_onFocus()',
        '(keydown)': '_onKeydown($event)'
      },
      exportAs: 'ngxMatDatetimePickerInput'
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
    }, {
      type: NgxMatDateAdapter,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [NGX_MAT_DATE_FORMATS]
      }]
    }, {
      type: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatFormField,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }]
    }];
  }, {
    ngxMatDatetimePicker: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    ngxMatDatetimePickerFilter: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    min: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    max: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disabled: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    dateChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    dateInput: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }]
  });
})();

class NgxMatTimepickerModule {}
/** @nocollapse */

/** @nocollapse */


NgxMatTimepickerModule.ɵfac = function NgxMatTimepickerModule_Factory(t) {
  return new (t || NgxMatTimepickerModule)();
};
/** @nocollapse */

/** @nocollapse */


NgxMatTimepickerModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: NgxMatTimepickerModule
});
/** @nocollapse */

/** @nocollapse */

NgxMatTimepickerModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInputModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButtonModule]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatTimepickerModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInputModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButtonModule],
      exports: [NgxMatTimepickerComponent],
      declarations: [NgxMatTimepickerComponent]
    }]
  }], null, null);
})();

class NgxMatDatetimePickerModule {}
/** @nocollapse */

/** @nocollapse */


NgxMatDatetimePickerModule.ɵfac = function NgxMatDatetimePickerModule_Factory(t) {
  return new (t || NgxMatDatetimePickerModule)();
};
/** @nocollapse */

/** @nocollapse */


NgxMatDatetimePickerModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: NgxMatDatetimePickerModule
});
/** @nocollapse */

/** @nocollapse */

NgxMatDatetimePickerModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [_angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER, {
    provide: NGX_MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: DefaultNgxMatCalendarRangeStrategy
  }],
  imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.MatDatepickerModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__.MatDialogModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_11__.PortalModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButtonModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInputModule, NgxMatTimepickerModule]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatDatetimePickerModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.MatDatepickerModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_22__.MatDialogModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_11__.PortalModule, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormsModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIconModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButtonModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInputModule, NgxMatTimepickerModule],
      exports: [NgxMatDatetimePicker, NgxMatDatetimeInput, NgxMatCalendar, NgxMatMonthView, NgxMatCalendarBody, NgxMatYearView, NgxMatMultiYearView, NgxMatCalendarHeader],
      declarations: [NgxMatDatetimePicker, NgxMatDatetimeContent, NgxMatDatetimeInput, NgxMatCalendar, NgxMatMonthView, NgxMatCalendarBody, NgxMatYearView, NgxMatMultiYearView, NgxMatCalendarHeader],
      entryComponents: [NgxMatDatetimeContent, NgxMatCalendarHeader],
      providers: [_angular_material_datepicker__WEBPACK_IMPORTED_MODULE_4__.MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER, {
        provide: NGX_MAT_DATE_RANGE_SELECTION_STRATEGY,
        useClass: DefaultNgxMatCalendarRangeStrategy
      }]
    }]
  }], null, null);
})(); // TODO(mmalerba): Remove when we no longer support safari 9.

/** Whether the browser supports the Intl API. */


let SUPPORTS_INTL_API; // We need a try/catch around the reference to `Intl`, because accessing it in some cases can
// cause IE to throw. These cases are tied to particular versions of Windows and can happen if
// the consumer is providing a polyfilled `Map`. See:
// https://github.com/Microsoft/ChakraCore/issues/3189
// https://github.com/angular/components/issues/15687

try {
  SUPPORTS_INTL_API = typeof Intl != 'undefined';
} catch (_a) {
  SUPPORTS_INTL_API = false;
}
/** The default month names to use if Intl API is not available. */


const DEFAULT_MONTH_NAMES = {
  'long': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
/** The default date names to use if Intl API is not available. */

const DEFAULT_DATE_NAMES = range(31, i => String(i + 1));
/** The default day of the week names to use if Intl API is not available. */

const DEFAULT_DAY_OF_WEEK_NAMES = {
  'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 */

const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/** Creates an array and fills it with values. */

function range(length, valueFunction) {
  const valuesArray = Array(length);

  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }

  return valuesArray;
}
/** Adapts the native JS Date for use with cdk-based components that work with dates. */


class NgxMatNativeDateAdapter extends NgxMatDateAdapter {
  constructor(matDateLocale, platform) {
    super();
    /**
     * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
     * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
     * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
     * will produce `'8/13/1800'`.
     *
     * TODO(mmalerba): drop this variable. It's not being used in the code right now. We're now
     * getting the string representation of a Date object from its utc representation. We're keeping
     * it here for sometime, just for precaution, in case we decide to revert some of these changes
     * though.
     */

    this.useUtcForDisplay = true;
    super.setLocale(matDateLocale); // IE does its own time zone correction, so we disable this on IE.

    this.useUtcForDisplay = !platform.TRIDENT;
    this._clampDate = platform.TRIDENT || platform.EDGE;
  }

  getYear(date) {
    return date.getFullYear();
  }

  getMonth(date) {
    return date.getMonth();
  }

  getDate(date) {
    return date.getDate();
  }

  getDayOfWeek(date) {
    return date.getDay();
  }

  getMonthNames(style) {
    if (SUPPORTS_INTL_API) {
      const dtf = new Intl.DateTimeFormat(this.locale, {
        month: style,
        timeZone: 'utc'
      });
      return range(12, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1))));
    }

    return DEFAULT_MONTH_NAMES[style];
  }

  getDateNames() {
    if (SUPPORTS_INTL_API) {
      const dtf = new Intl.DateTimeFormat(this.locale, {
        day: 'numeric',
        timeZone: 'utc'
      });
      return range(31, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
    }

    return DEFAULT_DATE_NAMES;
  }

  getDayOfWeekNames(style) {
    if (SUPPORTS_INTL_API) {
      const dtf = new Intl.DateTimeFormat(this.locale, {
        weekday: style,
        timeZone: 'utc'
      });
      return range(7, i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1))));
    }

    return DEFAULT_DAY_OF_WEEK_NAMES[style];
  }

  getYearName(date) {
    if (SUPPORTS_INTL_API) {
      const dtf = new Intl.DateTimeFormat(this.locale, {
        year: 'numeric',
        timeZone: 'utc'
      });
      return this._stripDirectionalityCharacters(this._format(dtf, date));
    }

    return String(this.getYear(date));
  }

  getFirstDayOfWeek() {
    // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
    return 0;
  }

  getNumDaysInMonth(date) {
    return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
  }

  clone(date) {
    return new Date(date.getTime());
  }

  createDate(year, month, date) {
    // Check for invalid month and date (except upper bound on date which we have to check after
    // creating the Date).
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    let result = this._createDateWithOverflow(year, month, date); // Check that the date wasn't above the upper bound for the month, causing the month to overflow


    if (result.getMonth() != month) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  today() {
    return new Date();
  }

  parse(value) {
    // We have no way using the native JS Date to set the parse format or locale, so we ignore these
    // parameters.
    if (typeof value == 'number') {
      return new Date(value);
    }

    return value ? new Date(Date.parse(value)) : null;
  }

  format(date, displayFormat) {
    if (!this.isValid(date)) {
      throw Error('NativeDateAdapter: Cannot format invalid date.');
    }

    if (SUPPORTS_INTL_API) {
      // On IE and Edge the i18n API will throw a hard error that can crash the entire app
      // if we attempt to format a date whose year is less than 1 or greater than 9999.
      if (this._clampDate && (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
        date = this.clone(date);
        date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
      }

      displayFormat = Object.assign(Object.assign({}, displayFormat), {
        timeZone: 'utc'
      });
      const dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
      return this._stripDirectionalityCharacters(this._format(dtf, date));
    }

    return this._stripDirectionalityCharacters(date.toDateString());
  }

  addCalendarYears(date, years) {
    return this.addCalendarMonths(date, years * 12);
  }

  addCalendarMonths(date, months) {
    let newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date)); // It's possible to wind up in the wrong month if the original month has more days than the new
    // month. In this case we want to go to the last day of the desired month.
    // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
    // guarantee this.


    if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
      newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
    }

    return newDate;
  }

  addCalendarDays(date, days) {
    return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
  }

  toIso8601(date) {
    return [date.getUTCFullYear(), this._2digit(date.getUTCMonth() + 1), this._2digit(date.getUTCDate())].join('-');
  }
  /**
   * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
   * invalid date for all other values.
   */


  deserialize(value) {
    if (typeof value === 'string') {
      if (!value) {
        return null;
      } // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
      // string is the right format first.


      if (ISO_8601_REGEX.test(value)) {
        let date = new Date(value);

        if (this.isValid(date)) {
          return date;
        }
      }
    }

    return super.deserialize(value);
  }

  isDateInstance(obj) {
    return obj instanceof Date;
  }

  isValid(date) {
    return !isNaN(date.getTime());
  }

  invalid() {
    return new Date(NaN);
  }

  getHour(date) {
    return date.getHours();
  }

  getMinute(date) {
    return date.getMinutes();
  }

  getSecond(date) {
    return date.getSeconds();
  }

  setHour(date, value) {
    date.setHours(value);
  }

  setMinute(date, value) {
    date.setMinutes(value);
  }

  setSecond(date, value) {
    date.setSeconds(value);
  }
  /** Creates a date but allows the month and date to overflow. */


  _createDateWithOverflow(year, month, date) {
    const result = new Date(year, month, date); // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.

    if (year >= 0 && year < 100) {
      result.setFullYear(this.getYear(result) - 1900);
    }

    return result;
  }
  /**
   * Pads a number to make it two digits.
   * @param n The number to pad.
   * @returns The padded number.
   */


  _2digit(n) {
    return ('00' + n).slice(-2);
  }
  /**
   * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
   * other browsers do not. We remove them to make output consistent and because they interfere with
   * date parsing.
   * @param str The string to strip direction characters from.
   * @returns The stripped string.
   */


  _stripDirectionalityCharacters(str) {
    return str.replace(/[\u200e\u200f]/g, '');
  }
  /**
   * When converting Date object to string, javascript built-in functions may return wrong
   * results because it applies its internal DST rules. The DST rules around the world change
   * very frequently, and the current valid rule is not always valid in previous years though.
   * We work around this problem building a new Date object which has its internal UTC
   * representation with the local date and time.
   * @param dtf Intl.DateTimeFormat object, containg the desired string format. It must have
   *    timeZone set to 'utc' to work fine.
   * @param date Date from which we want to get the string representation according to dtf
   * @returns A Date object with its UTC representation based on the passed in date info
   */


  _format(dtf, date) {
    // Passing the year to the constructor causes year numbers <100 to be converted to 19xx.
    // To work around this we use `setUTCFullYear` and `setUTCHours` instead.
    const d = new Date();
    d.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    d.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    return dtf.format(d);
  }

}
/** @nocollapse */

/** @nocollapse */


NgxMatNativeDateAdapter.ɵfac = function NgxMatNativeDateAdapter_Factory(t) {
  return new (t || NgxMatNativeDateAdapter)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_DATE_LOCALE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_23__.Platform));
};
/** @nocollapse */

/** @nocollapse */


NgxMatNativeDateAdapter.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: NgxMatNativeDateAdapter,
  factory: NgxMatNativeDateAdapter.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatNativeDateAdapter, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable
  }], function () {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
        args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.MAT_DATE_LOCALE]
      }]
    }, {
      type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_23__.Platform
    }];
  }, null);
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


const DEFAULT_DATE_INPUT = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
};
const NGX_MAT_NATIVE_DATE_FORMATS = {
  parse: {
    dateInput: DEFAULT_DATE_INPUT
  },
  display: {
    dateInput: DEFAULT_DATE_INPUT,
    monthYearLabel: {
      year: 'numeric',
      month: 'short'
    },
    dateA11yLabel: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    monthYearA11yLabel: {
      year: 'numeric',
      month: 'long'
    }
  }
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

class NgxNativeDateModule {}
/** @nocollapse */

/** @nocollapse */


NgxNativeDateModule.ɵfac = function NgxNativeDateModule_Factory(t) {
  return new (t || NgxNativeDateModule)();
};
/** @nocollapse */

/** @nocollapse */


NgxNativeDateModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: NgxNativeDateModule
});
/** @nocollapse */

/** @nocollapse */

NgxNativeDateModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [{
    provide: NgxMatDateAdapter,
    useClass: NgxMatNativeDateAdapter
  }],
  imports: [[_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_23__.PlatformModule]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxNativeDateModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_23__.PlatformModule],
      providers: [{
        provide: NgxMatDateAdapter,
        useClass: NgxMatNativeDateAdapter
      }]
    }]
  }], null, null);
})();

class NgxMatNativeDateModule {}
/** @nocollapse */

/** @nocollapse */


NgxMatNativeDateModule.ɵfac = function NgxMatNativeDateModule_Factory(t) {
  return new (t || NgxMatNativeDateModule)();
};
/** @nocollapse */

/** @nocollapse */


NgxMatNativeDateModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: NgxMatNativeDateModule
});
/** @nocollapse */

/** @nocollapse */

NgxMatNativeDateModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [{
    provide: NGX_MAT_DATE_FORMATS,
    useValue: NGX_MAT_NATIVE_DATE_FORMATS
  }],
  imports: [[NgxNativeDateModule]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxMatNativeDateModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [NgxNativeDateModule],
      providers: [{
        provide: NGX_MAT_DATE_FORMATS,
        useValue: NGX_MAT_NATIVE_DATE_FORMATS
      }]
    }]
  }], null, null);
})();
/*
 * Public API Surface of ngx-mat-datetime-picker
 */

/**
 * Generated bundle index. Do not edit.
 */




/***/ })

}]);
//# sourceMappingURL=src_app__pages_admin_admin_module_ts.js.map