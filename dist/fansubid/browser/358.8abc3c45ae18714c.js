"use strict";(self.webpackChunkfansubid=self.webpackChunkfansubid||[]).push([[358],{1358:(f,i,o)=>{o.r(i),o.d(i,{NotFoundModule:()=>p});var a=o(6895),u=o(1390),t=o(4650),c=o(257);new t.OlP("REQUEST");const l=new t.OlP("RESPONSE");let d=(()=>{class e{constructor(n){this.response=n}setStatus(n,r){return this.response&&(this.response.statusCode=n,r&&(this.response.statusMessage=r)),this}setNotFound(n="Not Found"){return this.setStatus(404,n)}}return e.\u0275fac=function(n){return new(n||e)(t.LFG(l,8))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();const h=[{path:"",pathMatch:"full",component:(()=>{class e{constructor(n,r,m,g){this.router=n,this.activatedRoute=r,this.gs=m,this.ssr=g,this.returnUrl="/",this.timedOut=null,this.gs.bannerImg=null,this.gs.sizeContain=!1,this.gs.bgRepeat=!1,this.ssr.setNotFound()}ngOnInit(){this.gs.isBrowser&&(this.returnUrl=this.activatedRoute.snapshot.queryParamMap.get("returnUrl")||"/",this.returnUrl&&(this.timedOut=setTimeout(()=>{this.router.navigateByUrl(this.returnUrl)},5e3)))}ngOnDestroy(){this.timedOut&&(clearTimeout(this.timedOut),this.timedOut=null)}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(u.F0),t.Y36(u.gz),t.Y36(c.U),t.Y36(d))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-not-found"]],decls:10,vars:0,consts:[[1,"h-100","row","align-items-center","m-0"],[1,"container","not-found-banner","p-0"],[1,"p-3","m-3"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),t._uU(3,"Whoops, Terjadi Kesalahan!"),t.qZA(),t.TgZ(4,"h1",2),t._uU(5,"Atau Mungkin Juga .."),t.qZA(),t.TgZ(6,"h1",2),t._uU(7,"Halaman Yang Kamu Cari Tidak Tersedia (?)"),t.qZA(),t.TgZ(8,"h1",2),t._uU(9,"\xaf\\_(\u30c4)_/\xaf"),t.qZA()()())},styles:['@import"https://fonts.googleapis.com/css2?family=Knewave";h1[_ngcontent-%COMP%]{color:red;font-family:Knewave,cursive;text-shadow:5px 5px whitesmoke;font-size:xx-large}.not-found-banner[_ngcontent-%COMP%]{height:100%;background-size:cover;background-position:75% 50%;background-image:url(/assets/img/404/not-found.png)}']}),e})()}];let p=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[a.ez,u.Bz.forChild(h)]}),e})()}}]);