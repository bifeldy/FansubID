"use strict";(self.webpackChunkfansubid=self.webpackChunkfansubid||[]).push([[772],{5772:(g,a,n)=>{n.r(a),n.d(a,{PrivacyPolicyModule:()=>P});var e=n(6895),l=n(1390),r=n(7355),y=n(5934),t=n(4650),d=n(3e3),v=n(257),h=n(7745),m=n(1861);function p(i,o){if(1&i&&(t.TgZ(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"h4",5),t._uU(5),t.ALo(6,"date"),t.qZA(),t._UZ(7,"div",6),t.ALo(8,"safeInnerHtml"),t.qZA()()()()),2&i){const s=t.oxw();t.xp6(5),t.hij("Updated: ",t.xi3(6,2,s.lastUpdated,"d MMMM y, hh:mm:ss a z"),""),t.xp6(2),t.Q6J("innerHTML",t.lcZ(8,5,s.htmlContent),t.oJD)}}const u=[{path:"",pathMatch:"full",component:(()=>{class i{constructor(s,c,f){this.bs=s,this.gs=c,this.info=f,this.lastUpdated=new Date,this.htmlContent=`\n    <div class="text-center p-5">\n      <img src="${y.N.baseUrl}/assets/img/logo/privacy-policy.png" class="bifeldy-vh-25" />\n    </div>\n    <div class="text-start pb-5">\n      <h2 class="text-primary">Privacy Policy</h2>\n      <h3 class="text-success">\n        Loading ...\n      </h3>\n    </div>\n  `,this.subsPrivacyPolicy=null,this.gs.bannerImg=null,this.gs.sizeContain=!1,this.gs.bgRepeat=!1}ngOnInit(){this.bs.busy(),this.subsPrivacyPolicy=this.info.getInfo("PRIVACY-POLICY").subscribe({next:s=>{this.gs.log("[PRIVACY_POLICY_SUCCESS]",s),this.bs.idle(),this.htmlContent=s.result.content,this.lastUpdated=new Date(s.result.updated_at)},error:s=>{this.gs.log("[PRIVACY_POLICY_ERROR]",s,"error"),this.bs.idle()}})}ngOnDestroy(){this.subsPrivacyPolicy?.unsubscribe()}}return i.\u0275fac=function(s){return new(s||i)(t.Y36(d.z),t.Y36(v.U),t.Y36(h.O))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-privacy-policy"]],decls:1,vars:1,consts:[["class","container",4,"ngIf"],[1,"container"],[1,"row","pb-3","px-0"],[1,"col-12","align-items-center"],[1,"text-center","my-3","mx-auto"],[1,"text-start"],[1,"text-warning",3,"innerHTML"]],template:function(s,c){1&s&&t.YNc(0,p,9,7,"div",0),2&s&&t.Q6J("ngIf",c.htmlContent)},dependencies:[e.O5,e.uU,m.H]}),i})()}];let P=(()=>{class i{}return i.\u0275fac=function(s){return new(s||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[e.ez,l.Bz.forChild(u),r.T]}),i})()}}]);