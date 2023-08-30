(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["common"],{

/***/ 15694:
/*!*******************************************************************************!*\
  !*** ./src/app/_shared/components/banner-nihongo/banner-nihongo.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BannerNihongoComponent": () => (/* binding */ BannerNihongoComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/global.service */ 80855);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ 11961);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);





function BannerNihongoComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4)(1, "mat-card", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-card-content", 7)(4, "h3")(5, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const n_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("routerLink", "/nihongo/", n_r1.url, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", n_r1.image_url, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("routerLink", "/nihongo/", n_r1.url, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](n_r1.title);
} }
class BannerNihongoComponent {
    constructor(gs) {
        this.gs = gs;
        this.nihongoMenu = [
            {
                url: 'belajar',
                title: 'Pengenalan Aksara',
                image_url: '/assets/img/nihongo/hirakata.png'
            },
            {
                url: 'kanji',
                title: 'Pengayaan Kanji (* JP-EN)',
                image_url: '/assets/img/nihongo/jlpt.png'
            }
        ];
        if (this.gs.isBrowser) {
            //
        }
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            //
        }
    }
}
BannerNihongoComponent.ɵfac = function BannerNihongoComponent_Factory(t) { return new (t || BannerNihongoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService)); };
BannerNihongoComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: BannerNihongoComponent, selectors: [["app-banner-nihongo"]], decls: 4, vars: 1, consts: [[1, "row"], [1, "col-12"], [1, "row", "px-3"], ["class", "col-12 col-md-6 p-2", 4, "ngFor", "ngForOf"], [1, "col-12", "col-md-6", "p-2"], [1, "gradient-border", "rgb-border"], ["mat-card-image", "", 2, "height", "128px", "object-fit", "cover", "cursor", "pointer", 3, "src", "routerLink"], [2, "cursor", "pointer", 3, "routerLink"]], template: function BannerNihongoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, BannerNihongoComponent_div_3_Template, 7, 4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.nihongoMenu);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardImage, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardContent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJiYW5uZXItbmlob25nby5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 50913:
/*!****************************************************************************!*\
  !*** ./src/app/_shared/components/banner-nihongo/banner-nihongo.module.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BannerNihongoModule": () => (/* binding */ BannerNihongoModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _banner_nihongo_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./banner-nihongo.component */ 15694);
/* harmony import */ var _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared-material.module */ 20210);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);





class BannerNihongoModule {
}
BannerNihongoModule.ɵfac = function BannerNihongoModule_Factory(t) { return new (t || BannerNihongoModule)(); };
BannerNihongoModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: BannerNihongoModule });
BannerNihongoModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule,
            _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](BannerNihongoModule, { declarations: [_banner_nihongo_component__WEBPACK_IMPORTED_MODULE_0__.BannerNihongoComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule,
        _modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule], exports: [_banner_nihongo_component__WEBPACK_IMPORTED_MODULE_0__.BannerNihongoComponent] }); })();


/***/ }),

/***/ 40197:
/*!**********************************************************!*\
  !*** ./src/app/_shared/services/ddl-lampiran.service.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DdlLampiranService": () => (/* binding */ DdlLampiranService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class DdlLampiranService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    getAttachmentNotUploaded(q = '', page = 1, row = 10, sort = '', order = '', failedOnly) {
        return this.api.getData(`/attachment?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}${failedOnly ? '&failed=true' : ''}`);
    }
    reUpload(attachmentData) {
        return this.api.patchData(`/attachment`, attachmentData);
    }
    downloadLampiran(attachmentId) {
        return this.api.getData(`/attachment/${attachmentId}`, {
            responseType: 'blob',
            observe: 'events',
            reportProgress: true,
            headers: {
                'ngsw-bypass': 'true'
            }
        });
    }
    getListDdl(attachmentId) {
        return this.api.getData(`/attachment/${attachmentId}`);
    }
    downloadDdlProxy(ddlId) {
        return this.api.getData(`/ddl-part/${ddlId}`, {
            responseType: 'blob',
            observe: 'events',
            reportProgress: true,
            headers: {
                'ngsw-bypass': 'true'
            }
        });
    }
    downloadDdlDirect(url) {
        return this.api.getData(url, {
            responseType: 'blob',
            observe: 'events',
            reportProgress: true,
            headers: {
                'ngsw-bypass': 'true'
            }
        });
    }
}
DdlLampiranService.ɵfac = function DdlLampiranService_Factory(t) { return new (t || DdlLampiranService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
DdlLampiranService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: DdlLampiranService, factory: DdlLampiranService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 27358:
/*!**************************************************!*\
  !*** ./src/app/_shared/services/mail.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MailService": () => (/* binding */ MailService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class MailService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    getMailbox(type = 'inbox', q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/mail-${type}?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getAllMail(q = '', page = 1, row = 10, sort = '', order = '') {
        return this.api.getData(`/mail?q=${q}&page=${page}&row=${row}&sort=${sort}&order=${order}`);
    }
    getMail(mailId) {
        return this.api.getData(`/mail/${mailId}`);
    }
    sendMail(mailData) {
        return this.api.postData('/mail', mailData);
    }
}
MailService.ɵfac = function MailService_Factory(t) { return new (t || MailService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
MailService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: MailService, factory: MailService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 65679:
/*!*****************************************************!*\
  !*** ./src/app/_shared/services/project.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectService": () => (/* binding */ ProjectService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 10916);
/* harmony import */ var _global_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.service */ 80855);



class ProjectService {
    constructor(api, gs) {
        this.api = api;
        this.gs = gs;
        if (this.gs.isBrowser) {
            //
        }
    }
    getProject() {
        return this.api.getData(`/project-type`);
    }
    createProject(notifData) {
        return this.api.postData('/project-type', notifData);
    }
    deleteProject(notifId) {
        return this.api.deleteData(`/project-type/${notifId}`);
    }
}
ProjectService.ɵfac = function ProjectService_Factory(t) { return new (t || ProjectService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_global_service__WEBPACK_IMPORTED_MODULE_1__.GlobalService)); };
ProjectService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ProjectService, factory: ProjectService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 65226:
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c)},d.onerror=function(){console.error("could not download file")},d.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null},k.readAsDataURL(b)}else{var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m)},4E4)}});f.saveAs=g.saveAs=g, true&&(module.exports=g)});



/***/ })

}]);
//# sourceMappingURL=common.js.map