"use strict";(self.webpackChunkfansubid=self.webpackChunkfansubid||[]).push([[32],{32:(j,A,n)=>{n.r(A),n.d(A,{AnimeModule:()=>z});var v=n(9808),h=n(8406),m=n(3075),F=n(210),M=n(6436),E=n(4946),I=n(6020),T=n(2323),Z=n(8613),_=n(3170),c=n(508),g=n(1139),e=n(5e3),f=n(3e3),D=n(8696),C=n(6382),S=n(519),N=n(8616),b=n(7322),U=n(4107),k=n(7531),d=n(6856),x=n(5245),R=n(876),y=n(8757);let P=(()=>{class o{constructor(t,a,i,s,r,l){this.activatedRoute=t,this.router=a,this.bs=i,this.gs=s,this.fs=r,this.anime=l,this.currentMonth=null,this.currentYear=null,this.selectedSeasonName=null,this.seasonalAnimeCard=[],this.seasonalAnime=[],this.tabData=[{name:"Info Garapan",icon:"closed_caption",type:"table",data:{column:["Jenis","Poster","Judul Anime","Nama Fansub"],row:[]}}],this.subsParam=null,this.subsSeasonalAnime=null,this.subsFansubAnime=null,this.gs.bannerImg="/assets/img/season/winter.png",this.gs.bgRepeat=!0,this.gs.sizeContain=!0}ngOnDestroy(){var t,a,i;null===(t=this.subsParam)||void 0===t||t.unsubscribe(),null===(a=this.subsSeasonalAnime)||void 0===a||a.unsubscribe(),null===(i=this.subsFansubAnime)||void 0===i||i.unsubscribe()}ngOnInit(){this.fg=new m.cw({currentDate:new m.NI({value:(0,g._7)(),disabled:!0},m.kI.required)}),this.currentMonth=new Date(this.fg.value.currentDate.format()).getMonth()+1,this.currentYear=new Date(this.fg.value.currentDate.format()).getFullYear(),this.minDate=new Date("1917-01-01"),this.maxDate=new Date(this.currentYear+1,11,31),this.gs.isBrowser&&this.watchUrlRoute()}watchUrlRoute(){this.subsParam=this.activatedRoute.queryParams.subscribe({next:t=>{this.bs.busy(),this.currentYear=t.year?Number.isNaN(parseInt(t.year,10))?this.currentYear:parseInt(t.year,10):(new Date).getFullYear(),this.fg.controls.currentDate.patchValue((0,g._7)(new Date(`${this.currentYear}-${this.currentMonth}-01`))),this.currentYear=new Date(this.fg.value.currentDate.format()).getFullYear(),this.selectedSeasonName=t.season&&this.gs.seasonalWeather.map(a=>a.name).indexOf(t.season)>=0?t.season:this.findSeasonNameByMonthNumber(this.currentMonth),this.gs.bannerImg=this.gs.seasonalWeather.find(a=>a.name===this.selectedSeasonName).img,this.bs.idle(),this.getSeasonalAnime(t.year&&t.season)}})}findSeasonNameByMonthNumber(t){return this.gs.seasonalWeather.find(a=>a.id===Math.ceil(t/3)).name}chosenYearHandler(t,a){const i=this.fg.value.currentDate;i.year(t.year()),this.fg.controls.currentDate.setValue(i),this.currentMonth=new Date(this.fg.value.currentDate.format()).getMonth()+1,this.currentYear=new Date(this.fg.value.currentDate.format()).getFullYear(),a.close(),this.changeSeasonalAnime()}getSeasonalAnime(t=!1){this.bs.busy(),this.subsSeasonalAnime=this.anime.getSeasonalAnime(this.currentYear,this.selectedSeasonName).subscribe({next:a=>{this.gs.log("[ANIME_SEASONAL_SUCCESS]",a),this.seasonalAnime=a.results.sort((i,s)=>(s.mean||0)-(i.mean||0)),t&&this.fs.initializeFab("settings_backup_restore",null,"Kembali Ke Musim Sekarang","/anime",!1),this.bs.idle(),this.getFansubAnime()},error:a=>{this.gs.log("[ANIME_SEASONAL_ERROR]",a,"error"),this.bs.idle()}})}getFansubAnime(){this.bs.busy(),this.tabData[0].data.row=[];const t=[];for(const a of this.seasonalAnime)t.push(a.id);this.subsFansubAnime=this.anime.getFansubAnime(t).subscribe({next:a=>{var i;this.gs.log("[FANSUB_ANIME_SUCCESS]",a);let s=[];for(const r of this.seasonalAnime){r.namaFansubs=a.results[r.id];for(const l of r.namaFansubs)l.selected=!0,l.type="chip";s.push({id:r.id,Jenis:`${null===(i=r.media_type)||void 0===i?void 0:i.toUpperCase()} \u2022 ${r.mean||0}`,Poster:r.image_url,"Judul Anime":r.title,"Nama Fansub":r.namaFansubs})}s=s.sort((r,l)=>l["Nama Fansub"].length-r["Nama Fansub"].length),this.tabData[0].data.row=s,this.seasonalAnimeCard=this.seasonalAnime,this.bs.idle()},error:a=>{this.gs.log("[FANSUB_ANIME_ERROR]",a,"error"),this.bs.idle()}})}changeSeasonalAnime(){this.router.navigate(["/anime"],{queryParams:{season:this.selectedSeasonName,year:this.currentYear}})}openAnimePage(t){this.gs.log("[ANIME_SEASONAL_CLICK_ANIME]",t);let a=null;try{a=t.title.replace(/[^a-zA-Z0-9]/g,"-")}catch(i){a=t["Judul Anime"].replace(/[^a-zA-Z0-9]/g,"-")}this.router.navigateByUrl(`/anime/${t.id}-${a}`)}openFansub(t){this.gs.log("[ANIME_SEASONAL_CLICK_FANSUB]",t),this.router.navigateByUrl(`/fansub/${t.slug}`)}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(h.gz),e.Y36(h.F0),e.Y36(f.z),e.Y36(D.U),e.Y36(C.r),e.Y36(S.o))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-anime-list"]],features:[e._Bn([{provide:c._A,useClass:_.t7,deps:[c.Ad,_.o8]},{provide:c.sG,useValue:g.Gs}])],decls:32,vars:9,consts:[[1,"container"],[1,"row","pb-3"],[1,"col-12"],[1,"row"],[1,"col-12","pb-3","sticky-top","bg-bifeldy",3,"formGroup"],[1,"m-0","border-bottom","border-primary","row"],[1,"pt-3","col-6","col-md-4","col-lg-2",3,"color"],[3,"value","valueChange"],["value","winter"],["value","spring"],["value","summer"],["value","fall"],[1,"pt-3","col-6","col-md-4","col-lg-2"],["matInput","","formControlName","currentDate",3,"matDatepicker","min","max"],["matSuffix","",1,"shiny",3,"for"],["matDatepickerToggleIcon","",1,"animate__animated","animate__swing","animate__infinite","animate__slower"],["startView","multi-year","disabled","false",3,"yearSelected"],["picker",""],[3,"animeDoramaData","cardClicked"],[1,"row","pt-3"],[3,"tabData","chipClicked","tableRowClicked"]],template:function(t,a){if(1&t){const i=e.EpF();e._UZ(0,"app-notifications"),e.TgZ(1,"div",0)(2,"div",1)(3,"div",2)(4,"div",3)(5,"div",4)(6,"h3",5)(7,"mat-form-field",6)(8,"mat-label"),e._uU(9,"Tema Musim"),e.qZA(),e.TgZ(10,"mat-select",7),e.NdJ("valueChange",function(r){return a.selectedSeasonName=r})("valueChange",function(){return a.changeSeasonalAnime()}),e.TgZ(11,"mat-option",8),e._uU(12,"Winter"),e.qZA(),e.TgZ(13,"mat-option",9),e._uU(14,"Spring"),e.qZA(),e.TgZ(15,"mat-option",10),e._uU(16,"Summer"),e.qZA(),e.TgZ(17,"mat-option",11),e._uU(18,"Fall"),e.qZA()()(),e.TgZ(19,"mat-form-field",12)(20,"mat-label"),e._uU(21,"Tahun"),e.qZA(),e._UZ(22,"input",13),e.TgZ(23,"mat-datepicker-toggle",14)(24,"mat-icon",15),e._uU(25,"today"),e.qZA()(),e.TgZ(26,"mat-datepicker",16,17),e.NdJ("yearSelected",function(r){e.CHM(i);const l=e.MAs(27);return a.chosenYearHandler(r,l)}),e.qZA()()()(),e.TgZ(28,"div",2)(29,"app-card-anime-dorama",18),e.NdJ("cardClicked",function(r){return a.openAnimePage(r)}),e.qZA()()()()(),e.TgZ(30,"div",19)(31,"app-material-tab",20),e.NdJ("chipClicked",function(r){return a.openFansub(r)})("tableRowClicked",function(r){return a.openAnimePage(r)}),e.qZA()()()}if(2&t){const i=e.MAs(27);e.xp6(5),e.Q6J("formGroup",a.fg),e.xp6(2),e.Q6J("color","accent"),e.xp6(3),e.Q6J("value",a.selectedSeasonName),e.xp6(12),e.Q6J("matDatepicker",i)("min",a.minDate)("max",a.maxDate),e.xp6(1),e.Q6J("for",i),e.xp6(6),e.Q6J("animeDoramaData",a.seasonalAnimeCard),e.xp6(2),e.Q6J("tabData",a.tabData)}},directives:[N.t,m.JL,m.sg,b.KE,b.hX,U.gD,c.ey,k.Nt,m.Fj,d.hl,m.JJ,m.u,d.nW,b.R9,x.Hw,d.Q0,d.Mq,R.L,y.H],styles:[""]}),o})();var w=n(7623),B=n(8745),L=n(8020),Y=n(4028),O=n(7567),J=n(7423),$=n(7238);function H(o,u){if(1&o){const t=e.EpF();e.TgZ(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"div",5)(5,"h1",6)(6,"b"),e._uU(7),e.qZA()()(),e.TgZ(8,"div",7)(9,"app-material-chip",8),e.NdJ("chipClicked",function(i){return e.CHM(t),e.oxw().openGenre(i)}),e.qZA()(),e.TgZ(10,"div",9),e._UZ(11,"app-notifications",10),e.qZA(),e.TgZ(12,"div",7),e._UZ(13,"app-material-expansion-panel",11),e.qZA(),e.TgZ(14,"div",7)(15,"div",12)(16,"app-material-tab",13),e.NdJ("gridClicked",function(i){return e.CHM(t),e.oxw().openFansub(i)})("tableRowClicked",function(i){return e.CHM(t),e.oxw().openFile(i)})("paginatorClicked",function(i){return e.CHM(t),e.oxw().onPaginatorClicked(i)})("serverSideFilter",function(i){return e.CHM(t),e.oxw().onServerSideFilter(i)})("serverSideOrder",function(i){return e.CHM(t),e.oxw().onServerSideOrder(i)})("gridLoadNextPage",function(){return e.CHM(t),e.oxw().onFansubLoadNextPage()}),e.qZA()()()(),e.TgZ(17,"div",14)(18,"div",15)(19,"div",12),e._UZ(20,"img",16),e.qZA(),e.TgZ(21,"div",17)(22,"button",18),e.NdJ("click",function(){return e.CHM(t),e.oxw().openSeasonalAnime()}),e.TgZ(23,"mat-icon",19),e._uU(24,"dynamic_feed"),e.qZA(),e._uU(25),e.TgZ(26,"mat-icon",19),e._uU(27,"star_half"),e.qZA(),e._uU(28),e._UZ(29,"br"),e.TgZ(30,"mat-icon",19),e._uU(31,"date_range"),e.qZA(),e._uU(32),e.qZA()(),e.TgZ(33,"div",17)(34,"button",20),e.NdJ("click",function(){return e.CHM(t),e.oxw().openRank()}),e.TgZ(35,"mat-icon",19),e._uU(36,"timeline"),e.qZA(),e._uU(37),e.TgZ(38,"mat-icon",19),e._uU(39,"local_fire_department"),e.qZA(),e._uU(40),e._UZ(41,"br"),e.TgZ(42,"mat-icon",19),e._uU(43,"label"),e.qZA(),e._uU(44),e.qZA()()()()()(),e._UZ(45,"div",21)(46,"div",22),e.qZA()}if(2&o){const t=e.oxw();e.xp6(7),e.Oqu((null==t.animeData.alternative_titles?null:t.animeData.alternative_titles.ja)||t.animeData.alternative_titles.en||t.animeData.title),e.xp6(2),e.Q6J("chipData",t.chipData),e.xp6(4),e.Q6J("panelData",t.panelData),e.xp6(3),e.Q6J("tabData",t.tabData)("count",t.count)("serverSide",!0)("gridPageFinished",t.fansubPageFinished),e.xp6(4),e.Q6J("src",t.animeData.image_url,e.LSH),e.xp6(2),e.hYB("matTooltip","Lihat Semua Anime Pada Musim '",t.SEASON," ",t.YEAR,"'"),e.xp6(3),e.hij(" ",t.animeData.num_episodes||"?"," Eps \xa0 "),e.xp6(3),e.hij(" ",t.animeData.mean||"?"," "),e.xp6(4),e.AsE(" ",t.animeData.start_date||"?"," \u30fc ",t.animeData.end_date||"?"," "),e.xp6(5),e.hij(" ",t.animeData.rank||"?"," \xa0 "),e.xp6(3),e.hij(" ",t.animeData.popularity||"?"," "),e.xp6(4),e.AsE(" ",(null==t.animeData.status?null:t.animeData.status.split("_").join(" ").toUpperCase())||"?"," - ",null==t.animeData.media_type?null:t.animeData.media_type.toUpperCase()," "),e.xp6(1),e.Udp("background-image","url("+t.animeData.image_url+")")}}const K=[{path:"",pathMatch:"full",component:P},{path:":animeId",component:(()=>{class o{constructor(t,a,i,s,r,l,p,Q){this.router=t,this.activatedRoute=a,this.gs=i,this.bs=s,this.pi=r,this.anime=l,this.fs=p,this.wb=Q,this.malDomain="https://myanimelist.net",this.animeId="",this.animeData=null,this.count=0,this.page=1,this.row=10,this.q="",this.sort="",this.order="",this.fansubAnime=[],this.berkasAnime=[],this.fansubPageFinished=!1,this.fansubPage=1,this.chipData=[],this.panelData=[],this.tabData=[{name:"Daftar Fansub",icon:"closed_caption",type:"grid",data:[]},{name:"Berkas Terkait",icon:"file_copy",type:"table",data:{column:["Proyek","Nama Berkas","Tanggal","Pemilik"],row:[]}}],this.subsAnime=null,this.subsBerkas=null,this.subsFansub=null,this.subsParam=null,this.gs.bannerImg=null,this.gs.bgRepeat=!0,this.gs.sizeContain=!0}get SEASON(){return this.findSeasonNameByMonthNumber(new Date(this.animeData.start_date).getMonth()+1)}get YEAR(){return new Date(this.animeData.start_date).getFullYear()}ngOnDestroy(){var t,a,i,s;null===(t=this.subsAnime)||void 0===t||t.unsubscribe(),null===(a=this.subsBerkas)||void 0===a||a.unsubscribe(),null===(i=this.subsFansub)||void 0===i||i.unsubscribe(),null===(s=this.subsParam)||void 0===s||s.unsubscribe()}ngOnInit(){this.subsParam=this.activatedRoute.params.subscribe({next:t=>{const a=t.animeId;this.animeId=a.split("-")[0],this.bs.busy(),this.subsAnime=this.anime.getAnime(a).subscribe({next:i=>{var s,r;if(this.gs.log("[ANIME_DETAIL_SUCCESS]",i),this.animeData=i.result,this.pi.updatePageMetaData(`${this.animeData.title}`,`${this.animeData.synopsis}`,`${null===(r=null===(s=this.animeData.alternative_titles)||void 0===s?void 0:s.synonyms)||void 0===r?void 0:r.join(", ")}`,this.animeData.image_url),this.bs.idle(),this.gs.isBrowser){const l=this.animeData.genres;for(const p of l)this.chipData.push({id:p.id,name:p.name,selected:!0,color:w.Q.PINK});this.panelData=[],this.panelData.push({title:"Ringkasan Cerita",icon:"history_edu",text:this.animeData.synopsis,tooltip:"Alih Bahasa Oleh 'Google Translate' \u{1f618}"}),this.fs.initializeFab(null,"/assets/img/logo/mal.png","Buka Di MyAnimeList",`${this.malDomain}/anime/${this.animeId}`,!0),this.getFansubAnime(),this.getBerkasAnime()}},error:i=>{this.gs.log("[ANIME_DETAIL_ERROR]",i,"error"),this.bs.idle(),this.router.navigate(["/error"],{queryParams:{returnUrl:"/anime"}})}})}})}openRank(){this.wb.winboxOpenUri(`${this.malDomain}/topanime.php?limit=${this.animeData.rank-1}`)}findSeasonNameByMonthNumber(t){return this.gs.seasonalWeather.find(a=>a.id===Math.ceil(t/3)).name}openSeasonalAnime(){this.router.navigate(["/anime"],{queryParams:{season:this.SEASON,year:this.YEAR}})}onServerSideFilter(t){this.gs.log("[BERKAS_ANIME_ENTER_FILTER]",t),this.q=t,this.getBerkasAnime()}onServerSideOrder(t){this.gs.log("[BERKAS_ANIME_CLICK_ORDER]",t),this.q=t.q,this.sort=t.active,this.order=t.direction,this.getBerkasAnime()}getBerkasAnime(){this.bs.busy(),this.subsBerkas=this.anime.getBerkasAnime([this.animeId],this.q,this.page,this.row,this.sort,this.order).subscribe({next:t=>{this.gs.log("[BERKAS_ANIME_SUCCESS]",t),this.count=t.count,this.berkasAnime=[];for(const a of t.results[this.animeId])this.berkasAnime.push({id:a.id,private:a.private,foto:a.user_.image_url,Pemilik:a.user_.username,Proyek:a.project_type_.name,Tanggal:a.created_at,"Nama Berkas":a.name});this.tabData[1].data.row=this.berkasAnime,this.bs.idle()},error:t=>{this.gs.log("[BERKAS_ANIME_ERROR]",t,"error"),this.bs.idle()}})}getFansubAnime(){this.bs.busy(),this.subsFansub=this.anime.getFansubAnime([this.animeId],this.fansubPage).subscribe({next:t=>{this.gs.log("[FANSUB_ANIME_SUCCESS]",t);for(const a of t.results[this.animeId])this.fansubAnime.push({id:a.id,image:a.image_url,title:a.name,slug:a.slug,description:`${a.slug} :: ${a.active?"Aktif":"Non-Aktif"}`});this.tabData[0].data=this.fansubAnime,t.results[this.animeId].length<=0&&(this.fansubPageFinished=!0),this.bs.idle()},error:t=>{this.gs.log("[FANSUB_ANIME_ERROR]",t,"error"),this.bs.idle()}})}openGenre(t){this.gs.log("[ANIME_DETAIL_CLICK_GENRE]",t),this.wb.winboxOpenUri(`${this.malDomain}/anime/genre/${t.id}`)}openFansub(t){this.gs.log("[ANIME_DETAIL_CLICK_FANSUB]",t),this.router.navigateByUrl(`/fansub/${t.slug}`)}onPaginatorClicked(t){this.gs.log("[ANIME_DETAIL_CLICK_PAGINATOR]",t),this.page=t.pageIndex+1,this.row=t.pageSize,this.getBerkasAnime()}openFile(t){this.gs.log("[ANIME_DETAIL_CLICK_BERKAS]",t),this.router.navigateByUrl(`/berkas/${t.id}`)}onFansubLoadNextPage(){this.fansubPageFinished||(this.fansubPage++,this.getFansubAnime())}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(h.F0),e.Y36(h.gz),e.Y36(D.U),e.Y36(f.z),e.Y36(B.Z),e.Y36(S.o),e.Y36(C.r),e.Y36(L.N))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-anime-detail"]],decls:1,vars:1,consts:[["class","container",4,"ngIf"],[1,"container"],[1,"anime-info","align-items-center"],[1,"media","row","py-3","px-2","d-flex"],[1,"col-md-8","col-xl-9","pt-3","order-2","order-md-1"],[1,"row","py-3","px-0","mt-auto"],[1,"m-0"],[1,"row","py-3"],[3,"chipData","chipClicked"],[1,"row"],[1,"px-0"],[3,"panelData"],[1,"col-12"],[3,"tabData","count","serverSide","gridPageFinished","gridClicked","tableRowClicked","paginatorClicked","serverSideFilter","serverSideOrder","gridLoadNextPage"],[1,"col-md-4","col-xl-3","px-3","order-1","order-md-2"],[1,"row","sticky-top","pt-3"],[1,"w-100",3,"src"],[1,"col-12","text-center","pt-3"],["mat-stroked-button","","color","accent",1,"w-100",3,"matTooltip","click"],[1,"me-1"],["mat-stroked-button","","color","warn","matTooltip","Buka Ranking Di MyAnimeList",1,"w-100",3,"click"],[1,"anime-banner","anime-banner-1","align-items-center"],[1,"anime-banner","anime-banner-2","align-items-center"]],template:function(t,a){1&t&&e.YNc(0,H,47,20,"div",0),2&t&&e.Q6J("ngIf",a.animeData)},directives:[v.O5,Y.G,N.t,O.Q,y.H,J.lW,$.gM,x.Hw],styles:[".anime-banner[_ngcontent-%COMP%]{height:128px;width:100%;background-size:cover;background-position:center;background-repeat:no-repeat;filter:blur(10px) brightness(100%);opacity:.5}.anime-banner-1[_ngcontent-%COMP%]{position:absolute;top:0;left:0}.anime-banner-2[_ngcontent-%COMP%]{position:absolute;top:128px;left:0}.anime-info[_ngcontent-%COMP%]{position:relative;height:256px;z-index:1}"]}),o})()}];let z=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[v.ez,h.Bz.forChild(K),m.u5,m.UX,F.m,M.L,I.$,E.P,T._,Z.F]]}),o})()}}]);