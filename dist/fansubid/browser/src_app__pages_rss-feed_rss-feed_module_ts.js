"use strict";
(self["webpackChunkfansubid"] = self["webpackChunkfansubid"] || []).push([["src_app__pages_rss-feed_rss-feed_module_ts"],{

/***/ 4981:
/*!************************************************************!*\
  !*** ./src/app/_pages/rss-feed/rss-feed-list.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RssFeedListComponent": () => (/* binding */ RssFeedListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_shared/services/global.service */ 80855);
/* harmony import */ var _shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/services/busy.service */ 33000);
/* harmony import */ var _shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/services/fansub.service */ 76781);
/* harmony import */ var _shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/services/winbox.service */ 88020);
/* harmony import */ var _shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.component */ 8616);
/* harmony import */ var _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/components/material-tab/material-tab.component */ 18757);
/* harmony import */ var _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/components/banner-donasi/banner-donasi.component */ 19530);
/* harmony import */ var _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/components/banner-discord/banner-discord.component */ 49933);
/* harmony import */ var _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_shared/components/stats-server/stats-server.component */ 8921);










class RssFeedListComponent {
    constructor(gs, bs, fansub, wb) {
        this.gs = gs;
        this.bs = bs;
        this.fansub = fansub;
        this.wb = wb;
        this.rssFeedData = [];
        this.tabData = [
            {
                name: 'Loper Koran',
                icon: 'rss_feed',
                type: 'table',
                data: {
                    column: ['Tanggal', 'Fansub', 'Judul Surat Kabar'],
                    row: []
                }
            }
        ];
        this.count = 0;
        this.page = 1;
        this.row = 10;
        this.q = '';
        this.sort = '';
        this.order = '';
        this.subsRssFeed = null;
        this.gs.bannerImg = null;
        this.gs.sizeContain = false;
        this.gs.bgRepeat = false;
    }
    ngOnInit() {
        if (this.gs.isBrowser) {
            this.getRssFeed();
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subsRssFeed) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    getRssFeed() {
        this.bs.busy();
        if (this.subsRssFeed) {
            this.subsRssFeed.unsubscribe();
            this.bs.idle();
        }
        this.subsRssFeed = this.fansub.getRssFeedFansubAll().subscribe({
            next: res => {
                var _a, _b, _c, _d;
                this.gs.log('[RSS_FEED_LIST_SUCCESS]', res);
                this.count = res.count;
                this.rssFeedData = [];
                for (const r of res.results) {
                    this.rssFeedData.push({
                        foto_fansub: r.image_url,
                        link: (_a = r.item) === null || _a === void 0 ? void 0 : _a.link,
                        Fansub: r.slug,
                        Tanggal: ((_b = r.item) === null || _b === void 0 ? void 0 : _b.created) || ((_c = r.item) === null || _c === void 0 ? void 0 : _c.published),
                        'Judul Surat Kabar': (_d = r.item) === null || _d === void 0 ? void 0 : _d.title
                    });
                }
                this.tabData[0].data.row = this.rssFeedData;
                this.bs.idle();
            },
            error: err => {
                this.gs.log('[RSS_FEED_LIST_ERROR]', err, 'error');
                this.bs.idle();
            }
        });
    }
    openRssFeed(data) {
        this.gs.log('[RSS_FEED_LIST_OPEN_URL]', data);
        this.wb.winboxOpenUri(this.gs.rssLink(data.link));
    }
}
RssFeedListComponent.ɵfac = function RssFeedListComponent_Factory(t) { return new (t || RssFeedListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_global_service__WEBPACK_IMPORTED_MODULE_0__.GlobalService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_busy_service__WEBPACK_IMPORTED_MODULE_1__.BusyService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_fansub_service__WEBPACK_IMPORTED_MODULE_2__.FansubService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_winbox_service__WEBPACK_IMPORTED_MODULE_3__.WinboxService)); };
RssFeedListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: RssFeedListComponent, selectors: [["app-rss-feed-list"]], decls: 33, vars: 1, consts: [[1, "container-fluid", "p-0"], [1, "wrapper"], [1, "bg-bubbles", "align-items-center", "p-0"], [1, "wrapper-1"], [1, "row", "align-items-center", "h-100"], [1, "col-12", "mx-auto"], [1, "container", "text-dark"], [1, "mb-1", 2, "line-height", "normal"], [1, "mb-0"], [1, "container"], [1, "row", "pb-3", "px-0"], [1, "col-lg-8", "col-xl-9"], [1, "row"], [3, "tabData", "tableRowClicked"], [1, "col-lg-4", "col-xl-3"], [1, "row", "sticky-top"], [1, "col-12"]], template: function RssFeedListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "span", 3)(4, "li")(5, "li")(6, "li")(7, "li")(8, "li")(9, "li")(10, "li")(11, "li")(12, "li")(13, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "div", 4)(15, "div", 5)(16, "div", 6)(17, "h2", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18, " RSS & Feed Fansub ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](19, "p", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20, " Informasi Terkini Dari Fansub ... ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](21, "app-notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "div", 9)(23, "div", 10)(24, "div", 11)(25, "div", 12)(26, "app-material-tab", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("tableRowClicked", function RssFeedListComponent_Template_app_material_tab_tableRowClicked_26_listener($event) { return ctx.openRssFeed($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "div", 14)(28, "div", 15)(29, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](30, "app-banner-donasi")(31, "app-banner-discord")(32, "app-stats-server");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("tabData", ctx.tabData);
    } }, directives: [_shared_components_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_4__.NotificationsComponent, _shared_components_material_tab_material_tab_component__WEBPACK_IMPORTED_MODULE_5__.MaterialTabComponent, _shared_components_banner_donasi_banner_donasi_component__WEBPACK_IMPORTED_MODULE_6__.BannerDonasiComponent, _shared_components_banner_discord_banner_discord_component__WEBPACK_IMPORTED_MODULE_7__.BannerDiscordComponent, _shared_components_stats_server_stats_server_component__WEBPACK_IMPORTED_MODULE_8__.StatsServerComponent], styles: [".wrapper[_ngcontent-%COMP%] {\r\n  \r\n  \r\n  \r\n  position: sticky;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 128px;\r\n  overflow: hidden;\r\n  background-image: url('/assets/img/banner/rss-feed.jpg');\r\n}\r\n\r\n.wrapper[_ngcontent-%COMP%]::before, .wrapper[_ngcontent-%COMP%]::after {\r\n  content: '';\r\n  width: 128px;\r\n  height: 128px;\r\n  background-repeat: no-repeat;\r\n  background-size: contain;\r\n  position: absolute;\r\n  z-index: -1;\r\n}\r\n\r\n.wrapper[_ngcontent-%COMP%]::before {\r\n  background-image: url('/assets/img/banner/rss-feed-before.svg');\r\n  left: 0;\r\n}\r\n\r\n.wrapper[_ngcontent-%COMP%]::after {\r\n  background-image: url('/assets/img/banner/rss-feed-after.svg');\r\n  right: 0;\r\n}\r\n\r\n.wrapper-1[_ngcontent-%COMP%] {\r\n  width: 256px;\r\n  height: 100%;\r\n  background-image: url('/assets/img/banner/rss-feed-1.svg');\r\n  position: absolute;\r\n  background-repeat: no-repeat;\r\n  background-size: contain;\r\n  right: 64px;\r\n  top: -8px;\r\n  z-index: -1;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  list-style: none;\r\n  display: block;\r\n  width: 40px;\r\n  height: 40px;\r\n  background-color: rgba(255, 255, 255, 0.15);\r\n  bottom: -160px;\r\n  animation: square 25s infinite;\r\n  transition-timing-function: linear;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(1) {\r\n  left: 10%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(2) {\r\n  left: 20%;\r\n  width: 80px;\r\n  height: 80px;\r\n  animation-delay: 2s;\r\n  animation-duration: 17s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(3) {\r\n  left: 25%;\r\n  animation-delay: 4s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(4) {\r\n  left: 40%;\r\n  width: 60px;\r\n  height: 60px;\r\n  animation-duration: 22s;\r\n  background-color: rgba(255, 255, 255, 0.25);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(5) {\r\n  left: 70%;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(6) {\r\n  left: 80%;\r\n  width: 120px;\r\n  height: 120px;\r\n  animation-delay: 3s;\r\n  background-color: rgba(255, 255, 255, 0.2);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(7) {\r\n  left: 32%;\r\n  width: 160px;\r\n  height: 160px;\r\n  animation-delay: 7s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(8) {\r\n  left: 55%;\r\n  width: 20px;\r\n  height: 20px;\r\n  animation-delay: 15s;\r\n  animation-duration: 40s;\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(9) {\r\n  left: 25%;\r\n  width: 10px;\r\n  height: 10px;\r\n  animation-delay: 2s;\r\n  animation-duration: 40s;\r\n  background-color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.bg-bubbles[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:nth-child(10) {\r\n  left: 90%;\r\n  width: 160px;\r\n  height: 160px;\r\n  animation-delay: 11s;\r\n}\r\n\r\n@keyframes square {\r\n  0% {\r\n    transform: translateY(0);\r\n  }\r\n  100% {\r\n    transform: translateY(-512px) rotate(512deg);\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJzcy1mZWVkLWxpc3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUF5QjtFQUN6QixzRUFBc0U7RUFDdEUsc0VBQXNFO0VBQ3RFLGdCQUFnQjtFQUNoQixPQUFPO0VBQ1AsV0FBVztFQUNYLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsd0RBQXdEO0FBQzFEOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixhQUFhO0VBQ2IsNEJBQTRCO0VBQzVCLHdCQUF3QjtFQUN4QixrQkFBa0I7RUFDbEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsK0RBQStEO0VBQy9ELE9BQU87QUFDVDs7QUFFQTtFQUNFLDhEQUE4RDtFQUM5RCxRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLDBEQUEwRDtFQUMxRCxrQkFBa0I7RUFDbEIsNEJBQTRCO0VBQzVCLHdCQUF3QjtFQUN4QixXQUFXO0VBQ1gsU0FBUztFQUNULFdBQVc7QUFDYjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxXQUFXO0VBQ1gsWUFBWTtFQUNaLDJDQUEyQztFQUMzQyxjQUFjO0VBQ2QsOEJBQThCO0VBQzlCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFNBQVM7RUFDVCxXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztFQUNULFdBQVc7RUFDWCxZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFNBQVM7RUFDVCxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsV0FBVztFQUNYLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsU0FBUztFQUNULFdBQVc7RUFDWCxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsWUFBWTtFQUNaLGFBQWE7RUFDYixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRTtJQUNFLHdCQUF3QjtFQUMxQjtFQUNBO0lBQ0UsNENBQTRDO0VBQzlDO0FBQ0YiLCJmaWxlIjoicnNzLWZlZWQtbGlzdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndyYXBwZXIge1xyXG4gIC8qIGJhY2tncm91bmQ6ICMxZmEyNjA7ICovXHJcbiAgLyogYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgIzNmNTFiNSAwJSwgIzBkNmVmZCAxMDAlKTsgKi9cclxuICAvKiBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjNjczYWI3IDAlLCAjZWUwZGZkIDEwMCUpOyAqL1xyXG4gIHBvc2l0aW9uOiBzdGlja3k7XHJcbiAgbGVmdDogMDtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEyOHB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltZy9iYW5uZXIvcnNzLWZlZWQuanBnJyk7XHJcbn1cclxuXHJcbi53cmFwcGVyOjpiZWZvcmUsIC53cmFwcGVyOjphZnRlciB7XHJcbiAgY29udGVudDogJyc7XHJcbiAgd2lkdGg6IDEyOHB4O1xyXG4gIGhlaWdodDogMTI4cHg7XHJcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHotaW5kZXg6IC0xO1xyXG59XHJcblxyXG4ud3JhcHBlcjo6YmVmb3JlIHtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1nL2Jhbm5lci9yc3MtZmVlZC1iZWZvcmUuc3ZnJyk7XHJcbiAgbGVmdDogMDtcclxufVxyXG5cclxuLndyYXBwZXI6OmFmdGVyIHtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1nL2Jhbm5lci9yc3MtZmVlZC1hZnRlci5zdmcnKTtcclxuICByaWdodDogMDtcclxufVxyXG5cclxuLndyYXBwZXItMSB7XHJcbiAgd2lkdGg6IDI1NnB4O1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJy9hc3NldHMvaW1nL2Jhbm5lci9yc3MtZmVlZC0xLnN2ZycpO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcclxuICByaWdodDogNjRweDtcclxuICB0b3A6IC04cHg7XHJcbiAgei1pbmRleDogLTE7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgdG9wOiAwO1xyXG4gIGxlZnQ6IDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XHJcbiAgYm90dG9tOiAtMTYwcHg7XHJcbiAgYW5pbWF0aW9uOiBzcXVhcmUgMjVzIGluZmluaXRlO1xyXG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXI7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCgxKSB7XHJcbiAgbGVmdDogMTAlO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoMikge1xyXG4gIGxlZnQ6IDIwJTtcclxuICB3aWR0aDogODBweDtcclxuICBoZWlnaHQ6IDgwcHg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAycztcclxuICBhbmltYXRpb24tZHVyYXRpb246IDE3cztcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDMpIHtcclxuICBsZWZ0OiAyNSU7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiA0cztcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDQpIHtcclxuICBsZWZ0OiA0MCU7XHJcbiAgd2lkdGg6IDYwcHg7XHJcbiAgaGVpZ2h0OiA2MHB4O1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMjJzO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSk7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCg1KSB7XHJcbiAgbGVmdDogNzAlO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoNikge1xyXG4gIGxlZnQ6IDgwJTtcclxuICB3aWR0aDogMTIwcHg7XHJcbiAgaGVpZ2h0OiAxMjBweDtcclxuICBhbmltYXRpb24tZGVsYXk6IDNzO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDcpIHtcclxuICBsZWZ0OiAzMiU7XHJcbiAgd2lkdGg6IDE2MHB4O1xyXG4gIGhlaWdodDogMTYwcHg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiA3cztcclxufVxyXG5cclxuLmJnLWJ1YmJsZXMgbGk6bnRoLWNoaWxkKDgpIHtcclxuICBsZWZ0OiA1NSU7XHJcbiAgd2lkdGg6IDIwcHg7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIGFuaW1hdGlvbi1kZWxheTogMTVzO1xyXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNDBzO1xyXG59XHJcblxyXG4uYmctYnViYmxlcyBsaTpudGgtY2hpbGQoOSkge1xyXG4gIGxlZnQ6IDI1JTtcclxuICB3aWR0aDogMTBweDtcclxuICBoZWlnaHQ6IDEwcHg7XHJcbiAgYW5pbWF0aW9uLWRlbGF5OiAycztcclxuICBhbmltYXRpb24tZHVyYXRpb246IDQwcztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyk7XHJcbn1cclxuXHJcbi5iZy1idWJibGVzIGxpOm50aC1jaGlsZCgxMCkge1xyXG4gIGxlZnQ6IDkwJTtcclxuICB3aWR0aDogMTYwcHg7XHJcbiAgaGVpZ2h0OiAxNjBweDtcclxuICBhbmltYXRpb24tZGVsYXk6IDExcztcclxufVxyXG5cclxuQGtleWZyYW1lcyBzcXVhcmUge1xyXG4gIDAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcclxuICB9XHJcbiAgMTAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUxMnB4KSByb3RhdGUoNTEyZGVnKTtcclxuICB9XHJcbn0iXX0= */"] });


/***/ }),

/***/ 73728:
/*!****************************************************!*\
  !*** ./src/app/_pages/rss-feed/rss-feed.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RssFeedModule": () => (/* binding */ RssFeedModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _rss_feed_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rss-feed-list.component */ 4981);
/* harmony import */ var _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_shared/modules/shared-material.module */ 20210);
/* harmony import */ var _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_shared/components/banner-discord/banner-discord.module */ 54854);
/* harmony import */ var _shared_components_discussion_discussion_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_shared/components/discussion/discussion.module */ 78764);
/* harmony import */ var _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_shared/components/material-tab/material-tab.module */ 66436);
/* harmony import */ var _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_shared/components/notifications/notifications.module */ 88613);
/* harmony import */ var _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_shared/components/stats-server/stats-server.module */ 10669);
/* harmony import */ var _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../_shared/components/banner-donasi/banner-donasi.module */ 61838);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 3184);












const routes = [
    {
        path: '',
        pathMatch: 'full',
        component: _rss_feed_list_component__WEBPACK_IMPORTED_MODULE_0__.RssFeedListComponent
    }
];
class RssFeedModule {
}
RssFeedModule.ɵfac = function RssFeedModule_Factory(t) { return new (t || RssFeedModule)(); };
RssFeedModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: RssFeedModule });
RssFeedModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule.forChild(routes),
            _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
            _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_4__.MaterialTabModule,
            _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_5__.NotificationsModule,
            _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_7__.BannerDonasiModule,
            _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_2__.BannerDiscordModule,
            _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_6__.StatsServerModule,
            _shared_components_discussion_discussion_module__WEBPACK_IMPORTED_MODULE_3__.DiscussionModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](RssFeedModule, { declarations: [_rss_feed_list_component__WEBPACK_IMPORTED_MODULE_0__.RssFeedListComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterModule, _shared_modules_shared_material_module__WEBPACK_IMPORTED_MODULE_1__.SharedMaterialModule,
        _shared_components_material_tab_material_tab_module__WEBPACK_IMPORTED_MODULE_4__.MaterialTabModule,
        _shared_components_notifications_notifications_module__WEBPACK_IMPORTED_MODULE_5__.NotificationsModule,
        _shared_components_banner_donasi_banner_donasi_module__WEBPACK_IMPORTED_MODULE_7__.BannerDonasiModule,
        _shared_components_banner_discord_banner_discord_module__WEBPACK_IMPORTED_MODULE_2__.BannerDiscordModule,
        _shared_components_stats_server_stats_server_module__WEBPACK_IMPORTED_MODULE_6__.StatsServerModule,
        _shared_components_discussion_discussion_module__WEBPACK_IMPORTED_MODULE_3__.DiscussionModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app__pages_rss-feed_rss-feed_module_ts.js.map