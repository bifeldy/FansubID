(self.webpackChunkfansubid=self.webpackChunkfansubid||[]).push([[592],{3331:(y,m,n)=>{"use strict";n.d(m,{B:()=>d});var e=n(5934),l=n(5e3),v=n(8696);let d=(()=>{class i{constructor(t){this.gs=t}get GS(){return this.gs}ngOnInit(){}get discordUrl(){return e.N.discord.join_url}get discordGuildId(){return e.N.discord.guild_id}}return i.\u0275fac=function(t){return new(t||i)(l.Y36(v.U))},i.\u0275cmp=l.Xpm({type:i,selectors:[["app-banner-discord"]],decls:9,vars:3,consts:[[1,"row"],[1,"col-12","sticky-top","bg-bifeldy"],[1,"pt-3","border-bottom-dotted"],[1,"text-bifeldy"],[1,"col-12"],[1,"gradient-border","rgb-border","mx-2","mb-2"],["target","_blank",3,"href"],[1,"w-100",3,"src"]],template:function(t,_){1&t&&(l.TgZ(0,"div",0)(1,"div",1)(2,"h2",2)(3,"b",3),l._uU(4,"Yuk Gabung Obrolan!"),l.qZA()()(),l.TgZ(5,"div",4)(6,"p",5)(7,"a",6),l._UZ(8,"img",7),l.qZA()()()()),2&t&&(l.xp6(7),l.s9C("href",_.discordUrl,l.LSH),l.xp6(1),l.hYB("src","https://discord.com/api/guilds/",_.discordGuildId,"/widget.png?style=banner",_.GS.gridListBreakpoint,"",l.LSH))},styles:[""]}),i})()},4854:(y,m,n)=>{"use strict";n.d(m,{R:()=>v});var e=n(9808),l=n(5e3);let v=(()=>{class d{}return d.\u0275fac=function(h){return new(h||d)},d.\u0275mod=l.oAB({type:d}),d.\u0275inj=l.cJS({imports:[[e.ez]]}),d})()},913:(y,m,n)=>{"use strict";n.d(m,{g:()=>i});var e=n(9808),l=n(8406),v=n(210),d=n(5e3);let i=(()=>{class h{}return h.\u0275fac=function(_){return new(_||h)},h.\u0275mod=d.oAB({type:h}),h.\u0275inj=d.cJS({imports:[[e.ez,l.Bz,v.m]]}),h})()},8921:(y,m,n)=>{"use strict";n.d(m,{X:()=>b});var e=n(5e3),l=n(8696),v=n(8381),d=n(9808),i=n(3626);function h(o,g){if(1&o&&(e.TgZ(0,"p",6),e._uU(1," Portal :: "),e.TgZ(2,"span",8),e._uU(3),e.qZA()()),2&o){const u=e.oxw();e.xp6(3),e.hij(" ",null==u.SS.github?null:u.SS.github.sha," ")}}function t(o,g){if(1&o&&(e.TgZ(0,"p",6),e._uU(1," Date :: "),e.TgZ(2,"span",8),e._uU(3),e.ALo(4,"date"),e.qZA()()),2&o){const u=e.oxw();e.xp6(3),e.hij(" ",e.xi3(4,1,null==u.SS.github||null==u.SS.github.commit||null==u.SS.github.commit.author?null:u.SS.github.commit.author.date,"d MMM y, hh:mm:ss a z")," ")}}function _(o,g){if(1&o&&(e.TgZ(0,"p",6),e._uU(1," Message :: "),e.TgZ(2,"span",7),e._uU(3),e.qZA()()),2&o){const u=e.oxw();e.xp6(3),e.hij(" ",null==u.SS.github||null==u.SS.github.commit?null:u.SS.github.commit.message," ")}}function M(o,g){if(1&o&&(e.TgZ(0,"p",6),e._uU(1," Socket :: "),e.TgZ(2,"span",8),e._uU(3),e.qZA()()),2&o){const u=e.oxw();e.xp6(3),e.hij(" ",null!=u.SS.mySocket&&u.SS.mySocket.id?u.SS.mySocket.id:"Sambungan Terputus"," ")}}function a(o,g){if(1&o&&(e.TgZ(0,"p",6),e._uU(1," Latency :: "),e.TgZ(2,"span"),e._uU(3),e.qZA()()),2&o){const u=e.oxw();e.xp6(2),e.Gre("text-",u.SS.latency>75?"warning":"success",""),e.xp6(1),e.hij(" ",u.SS.latency," ms ")}}function c(o,g){if(1&o&&(e.TgZ(0,"p",6),e._uU(1," Nodes :: "),e.TgZ(2,"span",8),e._uU(3),e.qZA()()),2&o){const u=e.oxw();e.xp6(3),e.hij(" ",u.SS.visitor," Koneksi ")}}let b=(()=>{class o{constructor(u,p){this.gs=u,this.ss=p,this.currentServer=null,this.subsServer=null}get SS(){return this.ss}ngOnInit(){this.gs.isBrowser&&(this.subsServer=this.ss.currentServer.subscribe({next:u=>this.currentServer=u}))}ngOnDestroy(){var u;null===(u=this.subsServer)||void 0===u||u.unsubscribe()}}return o.\u0275fac=function(u){return new(u||o)(e.Y36(l.U),e.Y36(v.R))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-stats-server"]],decls:37,vars:27,consts:[[1,"row"],[1,"col-12","sticky-top","bg-bifeldy"],[1,"pt-3","border-bottom-dotted"],[1,"text-bifeldy"],[1,"col-12"],["class","px-2 text-truncate",4,"ngIf"],[1,"px-2","text-truncate"],[1,"text-warning"],[1,"text-success"]],template:function(u,p){1&u&&(e.TgZ(0,"div",0)(1,"div",1)(2,"h2",2)(3,"b",3),e._uU(4,"Statistik Server"),e.qZA()()(),e.TgZ(5,"div",4),e.YNc(6,h,4,1,"p",5),e.YNc(7,t,5,4,"p",5),e.YNc(8,_,4,1,"p",5),e.TgZ(9,"p",6),e._uU(10," Server :: "),e.TgZ(11,"span",7),e._uU(12),e.qZA()(),e.YNc(13,M,4,1,"p",5),e.YNc(14,a,4,4,"p",5),e.YNc(15,c,4,1,"p",5),e.TgZ(16,"p",6),e._uU(17," CPUs Load :: "),e.TgZ(18,"span",7),e._uU(19),e.ALo(20,"number"),e.qZA()(),e.TgZ(21,"p",6),e._uU(22," RAM Usage :: "),e.TgZ(23,"span",7),e._uU(24),e.ALo(25,"bytes"),e.qZA()(),e.TgZ(26,"p",6),e._uU(27," Disk IO (/s) :: "),e.TgZ(28,"span",7),e._uU(29),e.ALo(30,"bytes"),e.qZA()(),e.TgZ(31,"p",6),e._uU(32," Net UD (/s) :: "),e.TgZ(33,"span",7),e._uU(34),e.ALo(35,"bytes"),e.ALo(36,"bytes"),e.qZA()()()()),2&u&&(e.xp6(6),e.Q6J("ngIf",null==p.SS.github?null:p.SS.github.sha),e.xp6(1),e.Q6J("ngIf",null==p.SS.github||null==p.SS.github.commit||null==p.SS.github.commit.author?null:p.SS.github.commit.author.date),e.xp6(1),e.Q6J("ngIf",null==p.SS.github||null==p.SS.github.commit?null:p.SS.github.commit.message),e.xp6(4),e.hij(" ",null!=p.currentServer&&p.currentServer.isMaintenance?"Dalam Perbaikan":"Berjalan Normal"," "),e.xp6(1),e.Q6J("ngIf",p.SS.mySocket),e.xp6(1),e.Q6J("ngIf",p.SS.latency),e.xp6(1),e.Q6J("ngIf",p.SS.visitor),e.xp6(4),e.hij(" ",e.xi3(20,12,p.SS.statsServer.mainSite.cpus,"1.2-2")," % "),e.xp6(5),e.hij(" ",e.xi3(25,15,p.SS.statsServer.mainSite.mem_ram,2)," "),e.xp6(5),e.hij(" ",e.xi3(30,18,p.SS.statsServer.mainSite.disk_io,2)," "),e.xp6(5),e.AsE(" ",e.xi3(35,21,p.SS.statsServer.mainSite.net_tx,2)," / ",e.xi3(36,24,p.SS.statsServer.mainSite.net_rx,2)," "))},directives:[d.O5],pipes:[d.uU,d.JJ,i.$],styles:[""]}),o})()},669:(y,m,n)=>{"use strict";n.d(m,{A:()=>d});var e=n(9808),l=n(7355),v=n(5e3);let d=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=v.oAB({type:i}),i.\u0275inj=v.cJS({imports:[[e.ez,l.T]]}),i})()},197:(y,m,n)=>{"use strict";n.d(m,{v:()=>d});var e=n(5e3),l=n(9731),v=n(8696);let d=(()=>{class i{constructor(t,_){this.api=t,this.gs=_}getAttachmentNotUploaded(t="",_=1,M=10,a="",c=""){return this.api.getData(`/attachment?q=${t}&page=${_}&row=${M}&sort=${a}&order=${c}&ngsw-bypass=true`)}reUpload(t){return this.api.patchData("/attachment",t)}downloadLampiran(t){return this.api.getData(`/attachment/${t}`,{responseType:"blob",observe:"events",reportProgress:!0,headers:{"ngsw-bypass":"true"}})}getListDdl(t){return this.api.getData(`/attachment/${t}?ngsw-bypass=true`)}downloadDdlProxy(t){return this.api.getData(`/ddl-part/${t}`,{responseType:"blob",observe:"events",reportProgress:!0,headers:{"ngsw-bypass":"true"}})}downloadDdlDirect(t){return this.api.getData(t,{responseType:"blob",observe:"events",reportProgress:!0,headers:{"ngsw-bypass":"true"}})}}return i.\u0275fac=function(t){return new(t||i)(e.LFG(l.s),e.LFG(v.U))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()},7358:(y,m,n)=>{"use strict";n.d(m,{Y:()=>d});var e=n(5e3),l=n(9731),v=n(8696);let d=(()=>{class i{constructor(t,_){this.api=t,this.gs=_}getMailbox(t="inbox",_="",M=1,a=10,c="",b=""){return this.api.getData(`/mail-${t}?q=${_}&page=${M}&row=${a}&sort=${c}&order=${b}`)}getAllMail(t="",_=1,M=10,a="",c=""){return this.api.getData(`/mail?q=${t}&page=${_}&row=${M}&sort=${a}&order=${c}`)}getMail(t){return this.api.getData(`/mail/${t}`)}sendMail(t){return this.api.postData("/mail",t)}}return i.\u0275fac=function(t){return new(t||i)(e.LFG(l.s),e.LFG(v.U))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()},5679:(y,m,n)=>{"use strict";n.d(m,{Y:()=>d});var e=n(5e3),l=n(9731),v=n(8696);let d=(()=>{class i{constructor(t,_){this.api=t,this.gs=_}getProject(){return this.api.getData("/project-type")}createProject(t){return this.api.postData("/project-type",t)}deleteProject(t){return this.api.deleteData(`/project-type/${t}`)}}return i.\u0275fac=function(t){return new(t||i)(e.LFG(l.s),e.LFG(v.U))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()},4327:function(y,m){var l;void 0!==(l=function(){"use strict";function d(a,c,b){var o=new XMLHttpRequest;o.open("GET",a),o.responseType="blob",o.onload=function(){M(o.response,c,b)},o.onerror=function(){console.error("could not download file")},o.send()}function i(a){var c=new XMLHttpRequest;c.open("HEAD",a,!1);try{c.send()}catch(b){}return 200<=c.status&&299>=c.status}function h(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(b){var c=document.createEvent("MouseEvents");c.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(c)}}var t="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,_=t.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),M=t.saveAs||("object"!=typeof window||window!==t?function(){}:"download"in HTMLAnchorElement.prototype&&!_?function(a,c,b){var o=t.URL||t.webkitURL,g=document.createElement("a");g.download=c=c||a.name||"download",g.rel="noopener","string"==typeof a?(g.href=a,g.origin===location.origin?h(g):i(g.href)?d(a,c,b):h(g,g.target="_blank")):(g.href=o.createObjectURL(a),setTimeout(function(){o.revokeObjectURL(g.href)},4e4),setTimeout(function(){h(g)},0))}:"msSaveOrOpenBlob"in navigator?function(a,c,b){if(c=c||a.name||"download","string"!=typeof a)navigator.msSaveOrOpenBlob(function v(a,c){return void 0===c?c={autoBom:!1}:"object"!=typeof c&&(console.warn("Deprecated: Expected third argument to be a object"),c={autoBom:!c}),c.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\ufeff",a],{type:a.type}):a}(a,b),c);else if(i(a))d(a,c,b);else{var o=document.createElement("a");o.href=a,o.target="_blank",setTimeout(function(){h(o)})}}:function(a,c,b,o){if((o=o||open("","_blank"))&&(o.document.title=o.document.body.innerText="downloading..."),"string"==typeof a)return d(a,c,b);var g="application/octet-stream"===a.type,u=/constructor/i.test(t.HTMLElement)||t.safari,p=/CriOS\/[\d]+/.test(navigator.userAgent);if((p||g&&u||_)&&"undefined"!=typeof FileReader){var A=new FileReader;A.onloadend=function(){var R=A.result;R=p?R:R.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=R:location=R,o=null},A.readAsDataURL(a)}else{var O=t.URL||t.webkitURL,C=O.createObjectURL(a);o?o.location=C:location.href=C,o=null,setTimeout(function(){O.revokeObjectURL(C)},4e4)}});t.saveAs=M.saveAs=M,y.exports=M}.apply(m,[]))&&(y.exports=l)},3290:(y,m,n)=>{"use strict";n.d(m,{Vd:()=>R,a:()=>A,lQ:()=>P,wT:()=>u});var e=n(5e3),l=n(9808),v=n(9646),d=n(1135),i=n(3075);const h=new e.OlP("recaptcha-language"),t=new e.OlP("recaptcha-base-url"),_=new e.OlP("recaptcha-nonce-tag"),M=new e.OlP("recaptcha-settings"),a=new e.OlP("recaptcha-v3-site-key"),b_loadScript=function c(s,S,r,E,D){window.ng2recaptchaloaded=()=>{S(grecaptcha)};const f=document.createElement("script");f.innerHTML="",f.src=`${E||"https://www.google.com/recaptcha/api.js"}?render=${s}&onload=ng2recaptchaloaded${r}`,D&&(f.nonce=D),f.async=!0,f.defer=!0,document.head.appendChild(f)};let o=(()=>{class s{constructor(r,E,D,f,T){this.platformId=r,this.language=E,this.baseUrl=D,this.nonce=f,this.v3SiteKey=T,this.init(),this.ready=(0,l.NF)(this.platformId)?s.ready.asObservable():(0,v.of)()}init(){if(!s.ready&&(0,l.NF)(this.platformId)){const r=new d.X(null);s.ready=r,b_loadScript(this.v3SiteKey||"explicit",f=>r.next(f),this.language?"&hl="+this.language:"",this.baseUrl,this.nonce)}}}return s.ready=null,s.\u0275fac=function(r){return new(r||s)(e.LFG(e.Lbi),e.LFG(h,8),e.LFG(t,8),e.LFG(_,8),e.LFG(a,8))},s.\u0275prov=e.Yz7({token:s,factory:s.\u0275fac}),s})(),g=0,u=(()=>{class s{constructor(r,E,D,f){this.elementRef=r,this.loader=E,this.zone=D,this.id="ngrecaptcha-"+g++,this.errorMode="default",this.resolved=new e.vpe,this.error=new e.vpe,f&&(this.siteKey=f.siteKey,this.theme=f.theme,this.type=f.type,this.size=f.size,this.badge=f.badge)}ngAfterViewInit(){this.subscription=this.loader.ready.subscribe(r=>{null!=r&&r.render instanceof Function&&(this.grecaptcha=r,this.renderRecaptcha())})}ngOnDestroy(){this.grecaptchaReset(),this.subscription&&this.subscription.unsubscribe()}execute(){"invisible"===this.size&&(null!=this.widget?this.grecaptcha.execute(this.widget):this.executeRequested=!0)}reset(){null!=this.widget&&(this.grecaptcha.getResponse(this.widget)&&this.resolved.emit(null),this.grecaptchaReset())}get __unsafe_widgetValue(){return null!=this.widget?this.grecaptcha.getResponse(this.widget):null}expired(){this.resolved.emit(null)}errored(r){this.error.emit(r)}captchaResponseCallback(r){this.resolved.emit(r)}grecaptchaReset(){null!=this.widget&&this.zone.runOutsideAngular(()=>this.grecaptcha.reset(this.widget))}renderRecaptcha(){const r={badge:this.badge,callback:E=>{this.zone.run(()=>this.captchaResponseCallback(E))},"expired-callback":()=>{this.zone.run(()=>this.expired())},sitekey:this.siteKey,size:this.size,tabindex:this.tabIndex,theme:this.theme,type:this.type};"handled"===this.errorMode&&(r["error-callback"]=(...E)=>{this.zone.run(()=>this.errored(E))}),this.widget=this.grecaptcha.render(this.elementRef.nativeElement,r),!0===this.executeRequested&&(this.executeRequested=!1,this.execute())}}return s.\u0275fac=function(r){return new(r||s)(e.Y36(e.SBq),e.Y36(o),e.Y36(e.R0b),e.Y36(M,8))},s.\u0275cmp=e.Xpm({type:s,selectors:[["re-captcha"]],hostVars:1,hostBindings:function(r,E){2&r&&e.uIk("id",E.id)},inputs:{id:"id",siteKey:"siteKey",theme:"theme",type:"type",size:"size",tabIndex:"tabIndex",badge:"badge",errorMode:"errorMode"},outputs:{resolved:"resolved",error:"error"},exportAs:["reCaptcha"],decls:0,vars:0,template:function(r,E){},encapsulation:2}),s})(),p=(()=>{class s{}return s.\u0275fac=function(r){return new(r||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({}),s})(),A=(()=>{class s{}return s.\u0275fac=function(r){return new(r||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({providers:[o],imports:[[p]]}),s})(),R=(()=>{class s{constructor(r){this.host=r,this.requiresControllerReset=!1}writeValue(r){r?this.host.__unsafe_widgetValue!==r&&!1===Boolean(this.host.__unsafe_widgetValue)&&(this.requiresControllerReset=!0):this.host.reset()}registerOnChange(r){this.onChange=r,this.requiresControllerReset&&(this.requiresControllerReset=!1,this.onChange(null))}registerOnTouched(r){this.onTouched=r}onResolve(r){this.onChange&&this.onChange(r),this.onTouched&&this.onTouched()}}return s.\u0275fac=function(r){return new(r||s)(e.Y36(u))},s.\u0275dir=e.lG2({type:s,selectors:[["re-captcha","formControlName",""],["re-captcha","formControl",""],["re-captcha","ngModel",""]],hostBindings:function(r,E){1&r&&e.NdJ("resolved",function(f){return E.onResolve(f)})},features:[e._Bn([{multi:!0,provide:i.JU,useExisting:(0,e.Gpc)(()=>s)}])]}),s})(),P=(()=>{class s{}return s.\u0275fac=function(r){return new(r||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[[i.u5,p]]}),s})()}}]);