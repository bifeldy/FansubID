"use strict";(self.webpackChunkmain_site=self.webpackChunkmain_site||[]).push([[797],{1908:(a,i,e)=>{i.YC=void 0;var u=e(419);Object.defineProperty(i,"YC",{enumerable:!0,get:function(){return u.RESPONSE}})},7797:(a,i,e)=>{e.r(i),e.d(i,{NotFoundModule:()=>g});var r=e(6895),u=e(1390),t=e(4650),h=e(9816),l=e(1908);let d=(()=>{class s{constructor(o,n){this.gs=n,this.response=o}setStatus(o,n){return this.gs.isBrowser||this.response&&(this.response.status(o),this.response.statusCode=o,n&&(this.response.statusMessage=n)),this}setNotFound(o="Not Found"){return this.setStatus(404,o)}static#t=this.\u0275fac=function(n){return new(n||s)(t.LFG(l.YC,8),t.LFG(h.U))};static#s=this.\u0275prov=t.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();const m=[{path:"",pathMatch:"full",component:(()=>{class s{constructor(o,n,c,f){this.router=o,this.activatedRoute=n,this.gs=c,this.ssr=f,this.returnUrl="/",this.timedOut=null,this.gs.bannerImg=null,this.gs.sizeContain=!1,this.gs.bgRepeat=!1,this.ssr.setNotFound()}ngOnInit(){this.gs.isBrowser&&(this.returnUrl=this.activatedRoute.snapshot.queryParamMap.get("returnUrl")||"/",this.returnUrl&&(this.timedOut=setTimeout(()=>{this.router.navigateByUrl(this.returnUrl)},5e3)))}ngOnDestroy(){this.timedOut&&(clearTimeout(this.timedOut),this.timedOut=null)}static#t=this.\u0275fac=function(n){return new(n||s)(t.Y36(u.F0),t.Y36(u.gz),t.Y36(h.U),t.Y36(d))};static#s=this.\u0275cmp=t.Xpm({type:s,selectors:[["app-not-found"]],decls:10,vars:0,consts:[[1,"h-100","row","align-items-center","m-0"],[1,"container","not-found-banner","p-0"],[1,"p-3","m-3"]],template:function(n,c){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),t._uU(3,"Whoops, Terjadi Kesalahan!"),t.qZA(),t.TgZ(4,"h1",2),t._uU(5,"Atau Mungkin Juga .."),t.qZA(),t.TgZ(6,"h1",2),t._uU(7,"Halaman Yang Kamu Cari Tidak Tersedia (?)"),t.qZA(),t.TgZ(8,"h1",2),t._uU(9,"\xaf\\_(\u30c4)_/\xaf"),t.qZA()()())},styles:['@import"https://fonts.googleapis.com/css2?family=Knewave";h1[_ngcontent-%COMP%]{color:red;font-family:Knewave,cursive;text-shadow:5px 5px whitesmoke;font-size:xx-large}.not-found-banner[_ngcontent-%COMP%]{height:100%;background-size:cover;background-position:75% 50%;background-image:url(/assets/img/404/not-found.png)}']})}return s})()}];let g=(()=>{class s{static#t=this.\u0275fac=function(n){return new(n||s)};static#s=this.\u0275mod=t.oAB({type:s});static#n=this.\u0275inj=t.cJS({imports:[r.ez,u.Bz.forChild(m)]})}return s})()},419:(a,i,e)=>{e.r(i),e.d(i,{REQUEST:()=>u,RESPONSE:()=>t});var r=e(4650);const u=new r.OlP("REQUEST"),t=new r.OlP("RESPONSE")}}]);