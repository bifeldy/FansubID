"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_not-found_not-found_module_ts"],{

/***/ 23996:
/*!*********************************************************!*\
  !*** ./src/app/_pages/not-found/not-found.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotFoundComponent": () => (/* binding */ NotFoundComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_server_response_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/services/server-response.service */ 75101);




class NotFoundComponent {
    constructor(router, activatedRoute, gs, ssr) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.gs = gs;
        this.ssr = ssr;
        this.returnUrl = '/';
        this.timedOut = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
        this.ssr.setNotFound();
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
            if (this.returnUrl) {
                this.timedOut = setTimeout(() => {
                    this.router.navigateByUrl(this.returnUrl);
                }, 5000);
            }
        }
    }
    ngOnDestroy() {
        if (this.timedOut) {
            clearTimeout(this.timedOut);
            this.timedOut = null;
        }
    }
}
NotFoundComponent.ɵfac = function NotFoundComponent_Factory(t) { return new (t || NotFoundComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_shared_services_server_response_service__WEBPACK_IMPORTED_MODULE_1__.ServerResponseService)); };
NotFoundComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: NotFoundComponent, selectors: [["app-not-found"]], decls: 10, vars: 0, consts: [[1, "h-100", "row", "align-items-center", "m-0"], [1, "container", "not-found-banner", "p-0"], [1, "p-3", "m-3"]], template: function NotFoundComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Whoops, Terjadi Kesalahan!");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Atau Mungkin Juga ..");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Halaman Yang Kamu Cari Tidak Tersedia (?)");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "\u00AF\\_(\u30C4)_/\u00AF");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    } }, styles: ["@import url('https://fonts.googleapis.com/css2?family=Knewave');\r\n\r\nh1[_ngcontent-%COMP%] {\r\n  color: red;\r\n  font-family: 'Knewave', cursive;\r\n  text-shadow: 5px 5px whitesmoke;\r\n  font-size: xx-large;\r\n}\r\n\r\n.not-found-banner[_ngcontent-%COMP%] {\r\n  height: 100%;\r\n  background-size: cover;\r\n  background-position: 75% 50%;\r\n  background-image: url('/assets/img/404/not-found.png');\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdC1mb3VuZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtEQUErRDs7QUFFL0Q7RUFDRSxVQUFVO0VBQ1YsK0JBQStCO0VBQy9CLCtCQUErQjtFQUMvQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLDRCQUE0QjtFQUM1QixzREFBc0Q7QUFDeEQiLCJmaWxlIjoibm90LWZvdW5kLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1LbmV3YXZlJyk7XHJcblxyXG5oMSB7XHJcbiAgY29sb3I6IHJlZDtcclxuICBmb250LWZhbWlseTogJ0tuZXdhdmUnLCBjdXJzaXZlO1xyXG4gIHRleHQtc2hhZG93OiA1cHggNXB4IHdoaXRlc21va2U7XHJcbiAgZm9udC1zaXplOiB4eC1sYXJnZTtcclxufVxyXG5cclxuLm5vdC1mb3VuZC1iYW5uZXIge1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDc1JSA1MCU7XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltZy80MDQvbm90LWZvdW5kLnBuZycpO1xyXG59Il19 */"] });


/***/ }),

/***/ 63218:
/*!******************************************************!*\
  !*** ./src/app/_pages/not-found/not-found.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotFoundModule": () => (/* binding */ NotFoundModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _not_found_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./not-found.component */ 23996);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);





const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _not_found_component__WEBPACK_IMPORTED_MODULE_0__.NotFoundComponent
    }
];
class NotFoundModule {
}
NotFoundModule.ɵfac = function NotFoundModule_Factory(t) { return new (t || NotFoundModule)(); };
NotFoundModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: NotFoundModule });
NotFoundModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](NotFoundModule, { declarations: [_not_found_component__WEBPACK_IMPORTED_MODULE_0__.NotFoundComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 75101:
/*!*************************************************************!*\
  !*** ./src/app/_shared/services/server-response.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerResponseService": () => (/* binding */ ServerResponseService)
/* harmony export */ });
/* harmony import */ var _nguniversal_express_engine_tokens__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nguniversal/express-engine/tokens */ 24256);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);


class ServerResponseService {
    constructor(res) {
        this.response = res;
    }
    setStatus(code, message) {
        if (this.response) {
            this.response.statusCode = code;
            if (message) {
                this.response.statusMessage = message;
            }
        }
        return this;
    }
    setNotFound(message = 'Not Found') {
        return this.setStatus(404, message);
    }
}
ServerResponseService.ɵfac = function ServerResponseService_Factory(t) { return new (t || ServerResponseService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_nguniversal_express_engine_tokens__WEBPACK_IMPORTED_MODULE_0__.RESPONSE, 8)); };
ServerResponseService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ServerResponseService, factory: ServerResponseService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 24256:
/*!**********************************************************************!*\
  !*** ./node_modules/@nguniversal/express-engine/fesm2015/tokens.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "REQUEST": () => (/* binding */ REQUEST),
/* harmony export */   "RESPONSE": () => (/* binding */ RESPONSE)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);


/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const REQUEST = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('REQUEST');
const RESPONSE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('RESPONSE');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */




/***/ })

}]);
//# sourceMappingURL=src_app__pages_not-found_not-found_module_ts.js.map