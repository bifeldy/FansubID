"use strict";(self.webpackChunkfansubid=self.webpackChunkfansubid||[]).push([[146],{8146:(S,u,o)=>{o.r(u),o.d(u,{LoginModule:()=>w});var l=o(6895),a=o(1390),s=o(4006),f=o(210),c=o(5934),g=o(6271),e=o(4650),h=o(257),p=o(3e3),b=o(4137),v=o(8379),d=o(4859),Z=o(7392);function y(r,i){1&r&&(e.TgZ(0,"strong"),e._uU(1," Username / Email Tidak Boleh Kosong! "),e._UZ(2,"br"),e.qZA())}function U(r,i){1&r&&(e.TgZ(0,"strong"),e._uU(1," Username / Email Hanya Boleh Huruf Standar Papan Ketik "),e._UZ(2,"br"),e.qZA())}function x(r,i){1&r&&(e.TgZ(0,"strong"),e._uU(1," Password Tidak Boleh Kosong! "),e._UZ(2,"br"),e.qZA())}function I(r,i){1&r&&(e.TgZ(0,"strong"),e._uU(1," Password Hanya Boleh Huruf Standar Papan Ketik "),e._UZ(2,"br"),e.qZA())}function T(r,i){if(1&r){const t=e.EpF();e.TgZ(0,"form",10),e.NdJ("ngSubmit",function(){e.CHM(t);const m=e.oxw(2);return e.KtG(m.onClickedSubmit())}),e.TgZ(1,"div",11),e._UZ(2,"img",12),e.TgZ(3,"h1",13),e._uU(4,'Hai, Jumpa Lagi! >_<"'),e.qZA(),e.TgZ(5,"p",14),e._uU(6),e.qZA()(),e.TgZ(7,"div",15)(8,"label",16),e._uU(9,"Surel / Nama Pengguna"),e.qZA(),e.TgZ(10,"div",17),e._UZ(11,"input",18),e.TgZ(12,"span",19),e.YNc(13,y,3,0,"strong",20),e.YNc(14,U,3,0,"strong",20),e.qZA()()(),e.TgZ(15,"div",15)(16,"label",21),e._uU(17,"Kata Sandi"),e.qZA(),e.TgZ(18,"div",17),e._UZ(19,"input",22),e.TgZ(20,"span",19),e.YNc(21,x,3,0,"strong",20),e.YNc(22,I,3,0,"strong",20),e.qZA()()(),e.TgZ(23,"div",15)(24,"div",23)(25,"div",24),e._UZ(26,"input",25),e.TgZ(27,"label",26),e._uU(28),e.qZA()()()(),e.TgZ(29,"div",27)(30,"div",28)(31,"div",29)(32,"div",30)(33,"button",31),e._uU(34," Masuk "),e._UZ(35,"mat-icon",32),e.qZA()(),e.TgZ(36,"div",30)(37,"a",33),e._uU(38," Lupa Akun ~ "),e.qZA()()()()()()}if(2&r){const t=e.oxw(2);e.Q6J("formGroup",t.fg),e.xp6(2),e.MGl("src","",t.ENV.baseUrl,"/assets/img/logo/login.png",e.LSH),e.xp6(4),e.Oqu(t.loginInfo),e.xp6(5),e.Gre("text-bifeldy form-control ",!t.fg.get("userNameOrEmail").valid&&t.fg.get("userNameOrEmail").touched?"is-invalid":"",""),e.xp6(2),e.Q6J("ngIf",t.fg.get("userNameOrEmail").hasError("required")),e.xp6(1),e.Q6J("ngIf",t.fg.get("userNameOrEmail").hasError("pattern")),e.xp6(5),e.Gre("text-bifeldy form-control ",!t.fg.get("password").valid&&t.fg.get("password").touched?"is-invalid":"",""),e.xp6(2),e.Q6J("ngIf",t.fg.get("password").hasError("required")),e.xp6(1),e.Q6J("ngIf",t.fg.get("password").hasError("pattern")),e.xp6(6),e.hij(" Biarkan Saya Tetap Login Hingga ",t.maxRememberMeDays," Hari "),e.xp6(5),e.Q6J("disabled",t.submitted||t.fg.invalid),e.xp6(4),e.Q6J("disabled",t.submitted)}}const L=function(r){return{"background-position":"center","background-size":"cover","background-image":r}};function E(r,i){if(1&r&&(e.TgZ(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4),e._UZ(4,"div",5),e.TgZ(5,"div",6)(6,"div",7)(7,"div",8),e.YNc(8,T,39,16,"form",9),e.qZA()()()()()()()),2&r){const t=e.oxw();e.xp6(4),e.Q6J("ngStyle",e.VKq(2,L,"url("+t.loginImg+")")),e.xp6(4),e.Q6J("ngIf",t.fg)}}const N=[{path:"",pathMatch:"full",component:(()=>{class r{constructor(t,n,m,C,k,M,O){this.fb=t,this.gs=n,this.activatedRoute=m,this.router=C,this.bs=k,this.as=M,this.cs=O,this.submitted=!1,this.returnUrl="/",this.loginImg="/assets/img/login-register.png",this.loginInfo="Silahkan login terlebih dahulu~",this.subsUser=null,this.subsLogin=null,this.subsVerify=null,this.gs.bannerImg=null,this.gs.sizeContain=!1,this.gs.bgRepeat=!1}ngOnDestroy(){this.subsLogin?.unsubscribe(),this.subsVerify?.unsubscribe(),this.subsUser?.unsubscribe()}ngOnInit(){this.returnUrl=this.activatedRoute.snapshot.queryParamMap.get("returnUrl")||this.gs.previousUrl||"/",this.gs.isBrowser&&(this.subsUser=this.as.currentUser.subscribe({next:t=>{t?this.router.navigateByUrl(this.returnUrl):this.initForm()}}))}get ENV(){return c.N}get loginFormVal(){return this.fg.controls}get maxRememberMeDays(){return g.t.timeLoginRememberMe/24/60/60}initForm(){this.fg=this.fb.group({userNameOrEmail:[null,[s.kI.required,s.kI.pattern(g.t.regexEnglishKeyboardKeys)]],password:[null,[s.kI.required,s.kI.pattern(g.t.regexEnglishKeyboardKeys)]],rememberMe:[!1,[]]})}onClickedSubmit(){if(this.bs.busy(),this.submitted=!0,this.loginInfo="Harap Menunggu ...",this.gs.log("[LOGIN_FORM_REQUEST]",this.fg.value),this.fg.invalid)return this.loginInfo="Periksa Dan Isi Kembali Data!",this.submitted=!1,void this.bs.idle();this.fg.valid&&(this.submitted=!0,this.subsLogin=this.as.login({userNameOrEmail:this.fg.value.userNameOrEmail,password:this.cs.hashPassword(this.fg.value.password),rememberMe:this.fg.value.rememberMe}).subscribe({next:t=>{this.bs.idle(),this.loginInfo=t.info,this.bs.busy(),this.subsVerify=this.as.verify(t.result.token).subscribe({next:n=>{this.loginInfo=n.info,this.gs.log("[VERIFY_LOGIN_SUCCESS]",n),this.bs.idle(),this.router.navigateByUrl(this.returnUrl)},error:n=>{this.gs.log("[VERIFY_LOGIN_ERROR]",n,"error"),this.bs.idle(),this.as.removeUser()}})},error:t=>{this.gs.log("[LOGIN_FORM_ERROR]",t,"error"),this.loginInfo=t.result?.message||t.info,this.submitted=!1,this.bs.idle()}}))}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(s.QS),e.Y36(h.U),e.Y36(a.gz),e.Y36(a.F0),e.Y36(p.z),e.Y36(b.e),e.Y36(v.$))},r.\u0275cmp=e.Xpm({type:r,selectors:[["app-login"]],decls:1,vars:1,consts:[["class","container-fluid align-items-center w-100 h-100","style","background-size: cover; background-repeat: repeat; background-position: center; transform: rotateY(180deg);",4,"ngIf"],[1,"container-fluid","align-items-center","w-100","h-100",2,"background-size","cover","background-repeat","repeat","background-position","center","transform","rotateY(180deg)"],[1,"row","align-items-center","h-100","m-0",2,"transform","rotateY(180deg)"],[1,"col-12","col-md-10","m-auto","py-3"],[1,"row","rgb-border","rounded","bg-bifeldy"],[1,"col-lg-5","col-md-3","ms-auto","p-0",3,"ngStyle"],[1,"col-lg-7","col-md-9","me-auto","p-0"],[1,"card","bg-transparent","border-0"],[1,"card-body"],["class","m-2",3,"formGroup","ngSubmit",4,"ngIf"],[1,"m-2",3,"formGroup","ngSubmit"],[1,"text-center","mb-4"],[1,"mb-4",2,"max-width","128px",3,"src"],[1,"h3","mb-3","font-weight-normal"],[1,"text-warning"],[1,"form-group","row","py-2"],["for","userNameOrEmail",1,"col-md-4","col-form-label","text-md-end"],[1,"col-md-8"],["type","text","id","userNameOrEmail","placeholder","Username / E-Mail","required","","formControlName","userNameOrEmail","autocomplete","email, username"],["role","alert",1,"invalid-feedback"],[4,"ngIf"],["for","password",1,"col-md-4","col-form-label","text-md-end"],["type","password","id","password","placeholder","Password","required","","formControlName","password","autocomplete","current-password, new-password"],[1,"col","offset-md-4"],[1,"form-check"],["id","rememberMe","type","checkbox","formControlName","rememberMe",1,"form-check-input"],["for","rememberMe",1,"form-check-label",2,"padding-top","0.125rem !important"],[1,"form-group","row","mb-0","py-2"],[1,"col-md-8","offset-md-4"],[1,"row","gy-3"],[1,"col-lg-6","col-12"],["type","submit","mat-flat-button","","color","primary",1,"w-100",3,"disabled"],["fontIcon","vpn_key",1,"ms-1"],["mat-stroked-button","","color","accent","routerLink","/reset-password",1,"w-100",3,"disabled"]],template:function(t,n){1&t&&e.YNc(0,E,9,4,"div",0),2&t&&e.Q6J("ngIf",n.fg)},dependencies:[l.O5,l.PC,a.yS,d.lW,d.zs,Z.Hw,s._Y,s.Fj,s.Wl,s.JJ,s.JL,s.Q7,s.sg,s.u]}),r})()}];let w=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[l.ez,a.Bz.forChild(N),f.m,s.u5,s.UX]}),r})()}}]);