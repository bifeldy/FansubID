"use strict";(self.webpackChunkfansubid=self.webpackChunkfansubid||[]).push([[847],{9461:(w,y,s)=>{s.d(y,{S:()=>X});var t=s(5e3),d=s(8696),E=s(5934),T=s(9287),v=s(8406),A=s(7261),c=s(7559),g=s(4137),r=s(9808),_=s(201),m=s(7238),C=s(7423),M=s(2181),R=s(5245),P=s(7322),U=s(7531),D=s(3075),S=s(192),I=s(6766);function L(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"div",4)(1,"mat-form-field",5)(2,"mat-label"),t._uU(3,"Buat Komentar Baru"),t.qZA(),t.TgZ(4,"input",6),t.NdJ("ngModelChange",function(o){return t.CHM(e),t.oxw().commentToSend=o}),t.qZA(),t.TgZ(5,"mat-icon",7),t._uU(6,"quickreply"),t.qZA()(),t.TgZ(7,"div",8)(8,"button",9),t.NdJ("click",function(){return t.CHM(e),t.oxw().sendComment(null)}),t._uU(9," Kirim "),t.TgZ(10,"mat-icon",10),t._uU(11,"send"),t.qZA()()()()}if(2&a){const e=t.oxw();t.xp6(1),t.Q6J("color","accent"),t.xp6(3),t.Q6J("ngModel",e.commentToSend)}}function k(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"mat-form-field",31)(1,"mat-label"),t._uU(2,"Balas / Tanggapi"),t.qZA(),t.TgZ(3,"input",32),t.NdJ("ngModelChange",function(o){return t.CHM(e),t.oxw().$implicit.reply_to_send=o}),t.qZA(),t.TgZ(4,"mat-icon",7),t._uU(5,"quickreply"),t.qZA()()}if(2&a){const e=t.oxw().$implicit;t.Q6J("color","accent"),t.xp6(3),t.Q6J("ngModel",e.reply_to_send)}}function H(a,h){1&a&&(t.TgZ(0,"mat-icon",23),t._uU(1,"expand_more"),t.qZA())}function K(a,h){1&a&&(t.TgZ(0,"mat-icon",23),t._uU(1,"expand_less"),t.qZA())}function F(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"button",33),t.NdJ("click",function(){t.CHM(e);const o=t.oxw().$implicit;return t.oxw().showHideComment(o)}),t.YNc(1,H,2,0,"mat-icon",34),t.YNc(2,K,2,0,"mat-icon",34),t._uU(3),t.qZA()}if(2&a){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",!e.show_reply),t.xp6(1),t.Q6J("ngIf",e.show_reply),t.xp6(1),t.AsE(" ",e.show_reply?"Sembunyikan":"Tampilkan"," ",e.reply_count," balasan ")}}function J(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"button",9),t.NdJ("click",function(){t.CHM(e);const o=t.oxw().$implicit;return t.oxw().sendComment(o)}),t._uU(1," Kirim "),t.TgZ(2,"mat-icon",10),t._uU(3,"send"),t.qZA()()}}function B(a,h){if(1&a&&t._UZ(0,"app-comment",35),2&a){const e=t.oxw().$implicit,i=t.oxw();t.Q6J("parent",e)("komentar",e.reply)("recursionCount",i.recursionCount+1)}}function Y(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"div",11)(1,"div",12),t._UZ(2,"img",13),t.qZA(),t.TgZ(3,"div")(4,"div",14),t.NdJ("click",function(){const u=t.CHM(e).$implicit;return t.oxw().showHideCommentBox(u)}),t.TgZ(5,"p",15)(6,"b",16),t.NdJ("click",function(o){const x=t.CHM(e).$implicit,O=t.oxw();return o.stopPropagation(),O.openUserProfile(x)}),t._uU(7),t.qZA(),t.TgZ(8,"small",17),t.ALo(9,"date"),t._uU(10),t.ALo(11,"dateAgo"),t.qZA()(),t._UZ(12,"p",18),t.qZA(),t.TgZ(13,"div",19)(14,"button",20)(15,"mat-icon"),t._uU(16,"more_vert"),t.qZA()(),t.TgZ(17,"mat-menu",null,21)(19,"button",22),t.NdJ("click",function(){const u=t.CHM(e).$implicit;return t.oxw().deleteComment(u)}),t.TgZ(20,"mat-icon",23),t._uU(21,"delete"),t.qZA(),t._uU(22," Hapus "),t.qZA(),t.TgZ(23,"button",22),t.NdJ("click",function(){const u=t.CHM(e).$implicit;return t.oxw().copyCommentLink(u)}),t.TgZ(24,"mat-icon",23),t._uU(25,"link"),t.qZA(),t._uU(26," Salin URL "),t.qZA()()(),t.YNc(27,k,6,2,"mat-form-field",24),t.TgZ(28,"div",25)(29,"div",4)(30,"div",26),t.YNc(31,F,4,4,"button",27),t.qZA(),t.TgZ(32,"div",28),t.YNc(33,J,4,0,"button",29),t.qZA()()(),t.YNc(34,B,1,3,"app-comment",30),t.qZA()()}if(2&a){const e=h.$implicit,i=t.MAs(18),o=t.oxw();t.xp6(2),t.s9C("src",e.user_.image_url,t.LSH),t.xp6(1),t.Gre("flex-grow-1 ms-3 row ",0===o.recursionCount?"me-2":"",""),t.xp6(4),t.hij(" ",e.user_.username," "),t.xp6(1),t.s9C("matTooltip",t.xi3(9,13,e.created_at,"d MMMM y, hh:mm:ss a z")),t.xp6(2),t.hij(" ",t.lcZ(11,16,e.created_at)," "),t.xp6(2),t.Q6J("innerHTML",e.comment,t.oJD),t.xp6(2),t.Q6J("matMenuTriggerFor",i),t.xp6(13),t.Q6J("ngIf",e.reply_mode&&(null==o.AS.currentUserSubject?null:o.AS.currentUserSubject.value)&&0===o.recursionCount),t.xp6(4),t.Q6J("ngIf",e.reply_count>0),t.xp6(2),t.Q6J("ngIf",e.reply_mode&&(null==o.AS.currentUserSubject?null:o.AS.currentUserSubject.value)&&0===o.recursionCount),t.xp6(1),t.Q6J("ngIf",e.show_reply)}}function $(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"div",36)(1,"button",9),t.NdJ("click",function(){return t.CHM(e),t.oxw().loadNextPage()}),t.TgZ(2,"mat-icon",23),t._uU(3,"subdirectory_arrow_right"),t.qZA(),t._uU(4," Load More ... "),t.qZA()()}}function Q(a,h){1&a&&(t.TgZ(0,"div",4),t._UZ(1,"app-no-data",37),t.qZA())}let N=(()=>{class a{constructor(e,i,o,u,x,O){this.clipboard=e,this.router=i,this.snackBar=o,this.komen=u,this.gs=x,this.as=O,this.urlPath=null,this.count=0,this.page=1,this.row=10,this.pageFinished=!1,this.recursionCount=0,this.rootCommentBox=!1,this.commentToSend=null,this.parent=null,this.komentar=[],this.subsKomenSend=null,this.subsKomenGetKomen=null,this.subsKomenGetReply=null,this.subsDelete=null,this.subsRouter=null}get AS(){return this.as}ngOnInit(){this.gs.isBrowser&&(0===this.recursionCount&&this.reloadComponent(),this.subsRouter=this.router.events.subscribe({next:e=>{e instanceof v.m2&&this.reloadComponent()}}))}ngOnDestroy(){var e,i,o,u,x;null===(e=this.subsKomenSend)||void 0===e||e.unsubscribe(),null===(i=this.subsKomenGetKomen)||void 0===i||i.unsubscribe(),null===(o=this.subsKomenGetReply)||void 0===o||o.unsubscribe(),null===(u=this.subsDelete)||void 0===u||u.unsubscribe(),null===(x=this.subsRouter)||void 0===x||x.unsubscribe(),this.urlPath=null}reloadComponent(){this.urlPath=this.router.url.split("?")[0],this.getComment(!0)}sendComment(e){this.gs.log("[KOMENTAR_PARENT_CREATE_REPLY]",e),this.subsKomenSend=this.komen.sendComment(e?{path:this.urlPath,comment:e.reply_to_send,parent:e.id}:{path:this.urlPath,comment:this.commentToSend}).subscribe({next:o=>{this.gs.log("[KOMENTAR_CREATE_REPLY_SUCCESS]",o),e?(e.reply_to_send=null,e.reply_mode=!1,this.getReply(e,!0)):(this.commentToSend=null,this.getComment(!0))},error:o=>{this.gs.log("[KOMENTAR_CREATE_REPLY_ERROR]",o,"error")}})}getComment(e=!1){this.parent||(e&&(this.page=1,this.pageFinished=!1),this.subsKomenGetKomen=this.komen.getComment(this.urlPath,"",this.page,this.row).subscribe({next:i=>{this.gs.log("[KOMENTAR_LIST_SUCCESS]",i),this.count=i.count,this.komentar=e?i.results:[...this.komentar,...i.results],i.results.length<=0&&(this.pageFinished=!0)},error:i=>{this.gs.log("[KOMENTAR_LIST_ERROR]",i,"error")}}))}getReply(e,i=!1){this.gs.log("[KOMENTAR_PARENT_LOAD_REPLY]",e),i&&(e.reply_page=1,e.reply_page_finised=!1),this.subsKomenGetReply=this.komen.getReply(e.id,"",e.reply_page,this.row).subscribe({next:o=>{this.gs.log("[REPLY_LIST_SUCCESS]",o),e.reply=i?o.results:[...e.reply,...o.results],e.reply_count=o.count,o.results.length<=0&&(e.reply_page_finised=!0)},error:o=>{this.gs.log("[REPLY_LIST_ERROR]",o,"error"),e.reply=[]}})}showHideComment(e){e.show_reply=null==e.show_reply||!e.show_reply,e.show_reply&&this.getReply(e,!0)}showHideCommentBox(e){e.reply_mode=null==e.reply_mode||!e.reply_mode}loadNextPage(){this.parent?this.loadNextPageReply(this.parent):this.loadNextPageComment()}loadNextPageComment(){this.pageFinished||(this.page++,this.getComment())}loadNextPageReply(e){e.reply_page_finised||(e.reply_page||(e.reply_page=1),e.reply_page++,this.getReply(e))}openUserProfile(e){this.router.navigateByUrl(`/user/${e.user_.username}`)}copyCommentLink(e){const i=(e.path.startsWith("/")?E.N.baseUrl:"")+e.path;this.clipboard.copy(`${i}?comment=${e.id}`)&&this.snackBar.open("URL Komentar :: Telah Di Salin Pada Clipboard","Ok")}deleteComment(e){this.gs.log("[KOMENTAR_DELETE_COMMENT]",e),this.subsDelete=this.komen.deleteComment(e.id).subscribe({next:i=>{this.gs.log("[KOMENTAR_DELETE_SUCCESS]",i),this.parent?this.getReply(this.parent,!0):this.getComment(!0)},error:i=>{this.gs.log("[KOMENTAR_DELETE_ERROR]",i,"error"),this.parent?this.getReply(this.parent,!0):this.getComment(!0)}})}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(T.TU),t.Y36(v.F0),t.Y36(A.ux),t.Y36(c.k),t.Y36(d.U),t.Y36(g.e))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-comment"]],inputs:{row:"row",recursionCount:"recursionCount",rootCommentBox:"rootCommentBox",parent:"parent",komentar:"komentar"},decls:5,vars:4,consts:[["class","row",4,"ngIf"],["appDomChange","",1,"row"],["class","d-flex my-1",4,"ngFor","ngForOf"],["class","col-12",4,"ngIf"],[1,"row"],["appearance","outline",1,"col-12",3,"color"],["matInput","","placeholder","Buat Baru ...",3,"ngModel","ngModelChange"],["matSuffix",""],[1,"col-12","text-end","pe-0","mb-3"],["mat-button","","color","accent",3,"click"],[1,"ms-1"],[1,"d-flex","my-1"],[1,"flex-shrink-0"],["width","40","height","40",2,"object-fit","cover","object-position","center",3,"src"],[1,"col-8","p-0",3,"click"],[1,"m-0"],[1,"text-warning",2,"cursor","pointer",3,"click"],[1,"ms-3","text-bifeldy",3,"matTooltip"],[1,"mb-1",2,"line-height","normal",3,"innerHTML"],[1,"col","p-0","text-end"],["mat-icon-button","","color","accent","matTooltip","Opsi",3,"matMenuTriggerFor"],["komentarMenu","matMenu"],["mat-menu-item","",3,"click"],[1,"me-1"],["appearance","outline","class","mt-2 col-12",3,"color",4,"ngIf"],[1,"col-12","p-0"],[1,"col-6"],["mat-button","","class","ps-1 pe-2","color","accent",3,"click",4,"ngIf"],[1,"col-6","text-end"],["mat-button","","color","accent",3,"click",4,"ngIf"],[3,"parent","komentar","recursionCount",4,"ngIf"],["appearance","outline",1,"mt-2","col-12",3,"color"],["matInput","","placeholder","Balas ...",3,"ngModel","ngModelChange"],["mat-button","","color","accent",1,"ps-1","pe-2",3,"click"],["class","me-1",4,"ngIf"],[3,"parent","komentar","recursionCount"],[1,"col-12"],[1,"col-12","p-3"]],template:function(e,i){1&e&&(t.YNc(0,L,12,2,"div",0),t.TgZ(1,"div",1),t.YNc(2,Y,35,18,"div",2),t.YNc(3,$,5,0,"div",3),t.qZA(),t.YNc(4,Q,2,0,"div",0)),2&e&&(t.Q6J("ngIf",i.rootCommentBox&&(null==i.AS.currentUserSubject?null:i.AS.currentUserSubject.value)),t.xp6(2),t.Q6J("ngForOf",i.komentar),t.xp6(1),t.Q6J("ngIf",i.count>=10&&!i.pageFinished||(null==i.parent?null:i.parent.reply_count)>=10&&!(null!=i.parent&&i.parent.reply_page_finised)),t.xp6(1),t.Q6J("ngIf",i.komentar&&i.komentar.length<=0))},directives:[r.O5,P.KE,P.hX,U.Nt,D.Fj,D.JJ,D.On,R.Hw,P.R9,C.lW,_.S,r.sg,m.gM,M.p6,M.VK,M.OP,a,S.d],pipes:[r.uU,I.R],styles:[""]}),a})();function q(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"div",21)(1,"div",27)(2,"div",5),t._UZ(3,"img",6),t.qZA(),t.TgZ(4,"div",7)(5,"div",28)(6,"p",9)(7,"b",10),t.NdJ("click",function(o){t.CHM(e);const u=t.oxw(3);return o.stopPropagation(),u.openUserProfile(u.komentarHighlight)}),t._uU(8),t.qZA(),t.TgZ(9,"small",11),t.ALo(10,"date"),t._uU(11),t.ALo(12,"dateAgo"),t.qZA()(),t._UZ(13,"p",12),t.qZA(),t.TgZ(14,"div",13)(15,"button",14)(16,"mat-icon"),t._uU(17,"more_vert"),t.qZA()(),t.TgZ(18,"mat-menu",null,15)(20,"button",16),t.NdJ("click",function(){t.CHM(e);const o=t.oxw().$implicit;return t.oxw(2).deleteComment(o)}),t.TgZ(21,"mat-icon",17),t._uU(22,"delete"),t.qZA(),t._uU(23," Hapus "),t.qZA(),t.TgZ(24,"button",16),t.NdJ("click",function(){t.CHM(e);const o=t.oxw().$implicit;return t.oxw(2).copyCommentLink(o)}),t.TgZ(25,"mat-icon",17),t._uU(26,"link"),t.qZA(),t._uU(27," Salin URL "),t.qZA()()()()()()}if(2&a){const e=t.MAs(19),i=t.oxw(3);t.xp6(3),t.s9C("src",i.komentarHighlight.user_.image_url,t.LSH),t.xp6(5),t.hij(" ",i.komentarHighlight.user_.username," "),t.xp6(1),t.s9C("matTooltip",t.xi3(10,6,i.komentarHighlight.created_at,"d MMMM y, hh:mm:ss a z")),t.xp6(2),t.hij(" ",t.lcZ(12,9,i.komentarHighlight.created_at)," "),t.xp6(2),t.Q6J("innerHTML",i.komentarHighlight.comment,t.oJD),t.xp6(2),t.Q6J("matMenuTriggerFor",e)}}function W(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"mat-form-field",29)(1,"mat-label"),t._uU(2,"Balas / Tanggapi"),t.qZA(),t.TgZ(3,"input",30),t.NdJ("ngModelChange",function(o){return t.CHM(e),t.oxw().$implicit.reply_to_send=o}),t.qZA(),t.TgZ(4,"mat-icon",31),t._uU(5,"quickreply"),t.qZA()()}if(2&a){const e=t.oxw().$implicit;t.Q6J("color","accent"),t.xp6(3),t.Q6J("ngModel",e.reply_to_send)}}function G(a,h){1&a&&(t.TgZ(0,"mat-icon",17),t._uU(1,"expand_more"),t.qZA())}function l(a,h){1&a&&(t.TgZ(0,"mat-icon",17),t._uU(1,"expand_less"),t.qZA())}function f(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"button",32),t.NdJ("click",function(){t.CHM(e);const o=t.oxw().$implicit;return t.oxw(2).showHideComment(o)}),t.YNc(1,G,2,0,"mat-icon",33),t.YNc(2,l,2,0,"mat-icon",33),t._uU(3),t.qZA()}if(2&a){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",!e.show_reply),t.xp6(1),t.Q6J("ngIf",e.show_reply),t.xp6(1),t.AsE(" ",e.show_reply?"Sembunyikan":"Tampilkan"," ",e.reply_count," balasan ")}}function n(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"button",34),t.NdJ("click",function(){t.CHM(e);const o=t.oxw().$implicit;return t.oxw(2).sendComment(o)}),t._uU(1," Kirim "),t.TgZ(2,"mat-icon",35),t._uU(3,"send"),t.qZA()()}}function p(a,h){if(1&a&&t._UZ(0,"app-comment",36),2&a){const e=t.oxw().$implicit,i=t.oxw(2);t.Q6J("parent",e)("komentar",e.reply)("recursionCount",i.recursionCount+1)("row",5)}}function b(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"div",4)(1,"div",5),t._UZ(2,"img",6),t.qZA(),t.TgZ(3,"div",7)(4,"div",8),t.NdJ("click",function(){const u=t.CHM(e).$implicit;return t.oxw(2).showHideCommentBox(u)}),t.TgZ(5,"p",9)(6,"b",10),t.NdJ("click",function(o){const x=t.CHM(e).$implicit,O=t.oxw(2);return o.stopPropagation(),O.openUserProfile(x)}),t._uU(7),t.qZA(),t.TgZ(8,"small",11),t.ALo(9,"date"),t._uU(10),t.ALo(11,"dateAgo"),t.qZA()(),t._UZ(12,"p",12),t.qZA(),t.TgZ(13,"div",13)(14,"button",14)(15,"mat-icon"),t._uU(16,"more_vert"),t.qZA()(),t.TgZ(17,"mat-menu",null,15)(19,"button",16),t.NdJ("click",function(){const u=t.CHM(e).$implicit;return t.oxw(2).deleteComment(u)}),t.TgZ(20,"mat-icon",17),t._uU(21,"delete"),t.qZA(),t._uU(22," Hapus "),t.qZA(),t.TgZ(23,"button",16),t.NdJ("click",function(){const u=t.CHM(e).$implicit;return t.oxw(2).copyCommentLink(u)}),t.TgZ(24,"mat-icon",17),t._uU(25,"link"),t.qZA(),t._uU(26," Salin URL "),t.qZA()()(),t.TgZ(27,"div",18),t.YNc(28,q,28,11,"div",19),t.qZA(),t.YNc(29,W,6,2,"mat-form-field",20),t.TgZ(30,"div",18)(31,"div",21)(32,"div",22),t.YNc(33,f,4,4,"button",23),t.qZA(),t.TgZ(34,"div",24),t.YNc(35,n,4,0,"button",25),t.qZA()()(),t.YNc(36,p,1,4,"app-comment",26),t.qZA()()}if(2&a){const e=h.$implicit,i=t.MAs(18),o=t.oxw(2);t.xp6(2),t.s9C("src",e.user_.image_url,t.LSH),t.xp6(5),t.hij(" ",e.user_.username," "),t.xp6(1),t.s9C("matTooltip",t.xi3(9,11,e.created_at,"d MMMM y, hh:mm:ss a z")),t.xp6(2),t.hij(" ",t.lcZ(11,14,e.created_at)," "),t.xp6(2),t.Q6J("innerHTML",e.comment,t.oJD),t.xp6(2),t.Q6J("matMenuTriggerFor",i),t.xp6(14),t.Q6J("ngIf",o.komentarHighlight),t.xp6(1),t.Q6J("ngIf",e.reply_mode&&(null==o.AS.currentUserSubject?null:o.AS.currentUserSubject.value)&&0===o.recursionCount),t.xp6(4),t.Q6J("ngIf",e.reply_count>0),t.xp6(2),t.Q6J("ngIf",e.reply_mode&&(null==o.AS.currentUserSubject?null:o.AS.currentUserSubject.value)&&0===o.recursionCount),t.xp6(1),t.Q6J("ngIf",e.show_reply)}}function Z(a,h){if(1&a){const e=t.EpF();t.TgZ(0,"div",37)(1,"button",34),t.NdJ("click",function(){return t.CHM(e),t.oxw(2).loadNextPage()}),t.TgZ(2,"mat-icon",17),t._uU(3,"subdirectory_arrow_right"),t.qZA(),t._uU(4," Load More ... "),t.qZA()()}}function j(a,h){if(1&a&&(t.TgZ(0,"div",1),t.YNc(1,b,37,16,"div",2),t.YNc(2,Z,5,0,"div",3),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.komentar),t.xp6(1),t.Q6J("ngIf",e.count>=10&&!e.pageFinished||(null==e.parent?null:e.parent.reply_count)>=10&&!(null!=e.parent&&e.parent.reply_page_finised))}}let z=(()=>{class a{constructor(e,i,o,u,x,O,V){this.clipboard=e,this.activatedRoute=i,this.router=o,this.snackBar=u,this.komen=x,this.gs=O,this.as=V,this.highlightId=0,this.komentarHighlight=null,this.urlPath=null,this.count=0,this.page=1,this.pageFinished=!1,this.recursionCount=0,this.commentToSend=null,this.parent=null,this.komentar=[],this.subsHighlight=null,this.subsKomenSend=null,this.subsKomenGetKomen=null,this.subsKomenGetReply=null,this.subsDelete=null,this.subsQueryParam=null}get AS(){return this.as}ngOnInit(){this.gs.isBrowser&&this.watchUrlRoute()}ngOnDestroy(){var e,i,o,u,x,O;null===(e=this.subsKomenSend)||void 0===e||e.unsubscribe(),null===(i=this.subsKomenGetKomen)||void 0===i||i.unsubscribe(),null===(o=this.subsKomenGetReply)||void 0===o||o.unsubscribe(),null===(u=this.subsHighlight)||void 0===u||u.unsubscribe(),null===(x=this.subsDelete)||void 0===x||x.unsubscribe(),null===(O=this.subsQueryParam)||void 0===O||O.unsubscribe(),this.urlPath=null}watchUrlRoute(){this.subsQueryParam=this.activatedRoute.queryParams.subscribe({next:e=>{this.komentarHighlight=null,this.komentar=[],this.urlPath=this.router.url.split("?")[0],this.highlightId=Number(e.comment||""),this.highlightId>0&&this.getHighlight()}})}getHighlight(e=this.highlightId){this.subsHighlight=this.komen.getHighlight({id:e,path:this.urlPath}).subscribe({next:i=>{this.gs.log("[KOMENTAR_HIGHLIGHT_SUCCESS]",i),i.result.parent_komentar_?(this.komentarHighlight=i.result,this.getHighlight(i.result.parent_komentar_.id)):this.komentar=[i.result]},error:i=>{this.gs.log("[KOMENTAR_HIGHLIGHT_ERROR]",i,"error")}})}sendComment(e){this.gs.log("[KOMENTAR_PARENT_CREATE_REPLY]",e),this.subsKomenSend=this.komen.sendComment(e?{path:this.urlPath,comment:e.reply_to_send,parent:e.id}:{path:this.urlPath,comment:this.commentToSend}).subscribe({next:o=>{this.gs.log("[KOMENTAR_CREATE_REPLY_SUCCESS]",o),e?(e.reply_to_send=null,e.reply_mode=!1,this.getReply(e,!0)):(this.commentToSend=null,this.getComment(!0))},error:o=>{this.gs.log("[KOMENTAR_CREATE_REPLY_ERROR]",o,"error")}})}getComment(e=!1){this.parent||(e&&(this.page=1,this.pageFinished=!1),this.subsKomenGetKomen=this.komen.getComment(this.urlPath,"",this.page,5).subscribe({next:i=>{this.gs.log("[KOMENTAR_LIST_SUCCESS]",i),this.count=i.count,this.komentar=e?i.results:[...this.komentar,...i.results],i.results.length<=0&&(this.pageFinished=!0)},error:i=>{this.gs.log("[KOMENTAR_LIST_ERROR]",i,"error")}}))}getReply(e,i=!1){this.gs.log("[KOMENTAR_PARENT_LOAD_REPLY]",e),i&&(e.reply_page=1,e.reply_page_finised=!1),this.subsKomenGetReply=this.komen.getReply(e.id,"",e.reply_page,5).subscribe({next:o=>{this.gs.log("[REPLY_LIST_SUCCESS]",o),e.reply=i?o.results:[...e.reply,...o.results],e.reply_count=o.count,o.results.length<=0&&(e.reply_page_finised=!0)},error:o=>{this.gs.log("[REPLY_LIST_ERROR]",o,"error"),e.reply=[]}})}showHideComment(e){e.show_reply=null==e.show_reply||!e.show_reply,e.show_reply&&this.getReply(e,!0)}showHideCommentBox(e){e.reply_mode=null==e.reply_mode||!e.reply_mode}loadNextPage(){this.parent?this.loadNextPageReply(this.parent):this.loadNextPageComment()}loadNextPageComment(){this.pageFinished||(this.page++,this.getComment())}loadNextPageReply(e){e.reply_page_finised||(e.reply_page||(e.reply_page=1),e.reply_page++,this.getReply(e))}openUserProfile(e){this.router.navigateByUrl(`/user/${e.user_.username}`)}copyCommentLink(e){const i=(e.path.startsWith("/")?E.N.baseUrl:"")+e.path;this.clipboard.copy(`${i}?comment=${e.id}`)&&this.snackBar.open("URL Komentar :: Telah Di Salin Pada Clipboard","Ok")}deleteComment(e){this.gs.log("[KOMENTAR_DELETE_HIGHLIGHT]",e),this.subsDelete=this.komen.deleteComment(e.id).subscribe({next:i=>{this.gs.log("[KOMENTAR_DELETE_SUCCESS]",i),this.getHighlight()},error:i=>{this.gs.log("[KOMENTAR_DELETE_ERROR]",i,"error"),this.getHighlight()}})}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(T.TU),t.Y36(v.gz),t.Y36(v.F0),t.Y36(A.ux),t.Y36(c.k),t.Y36(d.U),t.Y36(g.e))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-highlight"]],inputs:{recursionCount:"recursionCount",parent:"parent",komentar:"komentar"},decls:1,vars:1,consts:[["class","row pt-3 pb-2 mb-4 gradient-border rgb-border","appDomChange","",4,"ngIf"],["appDomChange","",1,"row","pt-3","pb-2","mb-4","gradient-border","rgb-border"],["class","d-flex my-1",4,"ngFor","ngForOf"],["class","col-12",4,"ngIf"],[1,"d-flex","my-1"],[1,"flex-shrink-0"],["width","40","height","40",2,"object-fit","cover","object-position","center",3,"src"],[1,"flex-grow-1","ms-3","me-2","row"],[1,"col-8","p-0",3,"click"],[1,"m-0"],[1,"text-warning",2,"cursor","pointer",3,"click"],[1,"ms-3","text-bifeldy",3,"matTooltip"],[1,"mb-1",2,"line-height","normal",3,"innerHTML"],[1,"col","p-0","text-end"],["mat-icon-button","","color","accent","matTooltip","Opsi",3,"matMenuTriggerFor"],["komentarMenu","matMenu"],["mat-menu-item","",3,"click"],[1,"me-1"],[1,"col-12","p-0"],["class","row",4,"ngIf"],["appearance","outline","class","mt-2 col-12",3,"color",4,"ngIf"],[1,"row"],[1,"col-6"],["mat-button","","class","ps-1 pe-2","color","accent",3,"click",4,"ngIf"],[1,"col-6","text-end"],["mat-button","","color","accent",3,"click",4,"ngIf"],[3,"parent","komentar","recursionCount","row",4,"ngIf"],[1,"ms-2","ps-3","d-flex","my-1"],[1,"col-8","p-0"],["appearance","outline",1,"mt-2","col-12",3,"color"],["matInput","","placeholder","Balas ...",3,"ngModel","ngModelChange"],["matSuffix",""],["mat-button","","color","accent",1,"ps-1","pe-2",3,"click"],["class","me-1",4,"ngIf"],["mat-button","","color","accent",3,"click"],[1,"ms-1"],[3,"parent","komentar","recursionCount","row"],[1,"col-12"]],template:function(e,i){1&e&&t.YNc(0,j,3,2,"div",0),2&e&&t.Q6J("ngIf",i.komentar.length>0)},directives:[r.O5,_.S,r.sg,m.gM,C.lW,M.p6,R.Hw,M.VK,M.OP,P.KE,P.hX,U.Nt,D.Fj,D.JJ,D.On,P.R9,N],pipes:[r.uU,I.R],styles:[""]}),a})(),X=(()=>{class a{constructor(e){this.gs=e}ngOnInit(){}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(d.U))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-discussion"]],decls:2,vars:1,consts:[[3,"rootCommentBox"]],template:function(e,i){1&e&&t._UZ(0,"app-highlight")(1,"app-comment",0),2&e&&(t.xp6(1),t.Q6J("rootCommentBox",!0))},directives:[z,N],styles:[""]}),a})()},8764:(w,y,s)=>{s.d(y,{R:()=>g});var t=s(9808),d=s(3075),E=s(7355),T=s(210),v=s(2438),A=s(7956),c=s(5e3);let g=(()=>{class r{}return r.\u0275fac=function(m){return new(m||r)},r.\u0275mod=c.oAB({type:r}),r.\u0275inj=c.cJS({imports:[[t.ez,d.u5,d.UX,T.m,E.T,A.C,v.d]]}),r})()},8757:(w,y,s)=>{s.d(y,{H:()=>G});var t=s(5e3),d=s(3251),E=s(8406),T=s(8696),v=s(9808),A=s(5245),c=s(4623),g=s(3954),r=s(508),_=s(7423),m=s(578),C=s(9461),M=s(192),R=s(1861);function P(l,f){if(1&l&&(t.TgZ(0,"mat-icon",7),t._uU(1),t.qZA(),t.TgZ(2,"h3",8),t._uU(3),t.qZA()),2&l){const n=t.oxw(2).$implicit;t.xp6(1),t.Oqu(n.icon),t.xp6(2),t.Oqu(n.name)}}function U(l,f){if(1&l&&(t.TgZ(0,"div"),t.YNc(1,P,4,2,"ng-template",2),t._UZ(2,"div",6),t.ALo(3,"safeInnerHtml"),t.qZA()),2&l){const n=t.oxw().$implicit;t.xp6(2),t.Q6J("innerHTML",t.lcZ(3,1,n.data),t.oJD)}}function D(l,f){if(1&l&&(t.TgZ(0,"mat-icon",7),t._uU(1),t.qZA(),t.TgZ(2,"h3",8),t._uU(3),t.qZA()),2&l){const n=t.oxw(2).$implicit;t.xp6(1),t.Oqu(n.icon),t.xp6(2),t.Oqu(n.name)}}function S(l,f){if(1&l){const n=t.EpF();t.TgZ(0,"mat-grid-tile")(1,"mat-list-option",14),t.NdJ("click",function(){const Z=t.CHM(n).$implicit;return t.oxw(4).onGridClicked(Z)}),t._UZ(2,"img",15),t.TgZ(3,"h4",16),t._uU(4),t.qZA(),t.TgZ(5,"p",16),t._uU(6),t.qZA()()()}if(2&l){const n=f.$implicit;t.xp6(2),t.s9C("src",n.image,t.LSH),t.xp6(2),t.Oqu(n.title),t.xp6(2),t.Oqu(n.description)}}function I(l,f){if(1&l){const n=t.EpF();t.TgZ(0,"div",17)(1,"button",18),t.NdJ("click",function(){return t.CHM(n),t.oxw(4).onGridLoadNextPage()}),t._uU(2,"Load More ..."),t.qZA()()}}function L(l,f){if(1&l&&(t.TgZ(0,"div",10)(1,"mat-selection-list",11)(2,"mat-grid-list",12),t.YNc(3,S,7,3,"mat-grid-tile",1),t.qZA()(),t.YNc(4,I,3,0,"div",13),t.qZA()),2&l){const n=t.oxw(2).$implicit,p=t.oxw();t.xp6(1),t.Q6J("multiple",!1),t.xp6(1),t.Q6J("cols",p.GS.gridListBreakpoint),t.xp6(1),t.Q6J("ngForOf",n.data),t.xp6(1),t.Q6J("ngIf",!p.gridPageFinished)}}function k(l,f){if(1&l&&(t.TgZ(0,"div"),t.YNc(1,D,4,2,"ng-template",2),t.YNc(2,L,5,4,"div",9),t.qZA()),2&l){const n=t.oxw().$implicit;t.oxw();const p=t.MAs(6);t.xp6(2),t.Q6J("ngIf",n.data.length>0)("ngIfElse",p)}}function H(l,f){if(1&l&&(t.TgZ(0,"mat-icon",7),t._uU(1),t.qZA(),t.TgZ(2,"h3",8),t._uU(3),t.qZA()),2&l){const n=t.oxw(2).$implicit;t.xp6(1),t.Oqu(n.icon),t.xp6(2),t.Oqu(n.name)}}function K(l,f){if(1&l){const n=t.EpF();t.TgZ(0,"mat-list-option",14),t.NdJ("click",function(){const Z=t.CHM(n).$implicit;return t.oxw(4).onListClicked(Z)}),t._UZ(1,"img",15),t.TgZ(2,"h4",16),t._uU(3),t.qZA(),t.TgZ(4,"p",16),t._uU(5),t.qZA()()}if(2&l){const n=f.$implicit;t.xp6(1),t.s9C("src",n.image,t.LSH),t.xp6(2),t.Oqu(n.title),t.xp6(2),t.Oqu(n.description)}}function F(l,f){if(1&l){const n=t.EpF();t.TgZ(0,"div",17)(1,"button",18),t.NdJ("click",function(){return t.CHM(n),t.oxw(4).onListLoadNextPage()}),t._uU(2,"Load More ..."),t.qZA()()}}function J(l,f){if(1&l&&(t.TgZ(0,"div",10)(1,"mat-selection-list",19),t.YNc(2,K,6,3,"mat-list-option",20),t.qZA(),t.YNc(3,F,3,0,"div",13),t.qZA()),2&l){const n=t.oxw(2).$implicit,p=t.oxw();t.xp6(1),t.Q6J("multiple",!1),t.xp6(1),t.Q6J("ngForOf",n.data),t.xp6(1),t.Q6J("ngIf",!p.listPageFinished)}}function B(l,f){if(1&l&&(t.TgZ(0,"div"),t.YNc(1,H,4,2,"ng-template",2),t.YNc(2,J,4,3,"div",9),t.qZA()),2&l){const n=t.oxw().$implicit;t.oxw();const p=t.MAs(6);t.xp6(2),t.Q6J("ngIf",n.data.length>0)("ngIfElse",p)}}function Y(l,f){if(1&l&&(t.TgZ(0,"mat-icon",7),t._uU(1),t.qZA(),t.TgZ(2,"h3",8),t._uU(3),t.qZA()),2&l){const n=t.oxw(2).$implicit;t.xp6(1),t.Oqu(n.icon),t.xp6(2),t.Oqu(n.name)}}function $(l,f){if(1&l){const n=t.EpF();t.TgZ(0,"div"),t.YNc(1,Y,4,2,"ng-template",2),t.TgZ(2,"div",10)(3,"app-material-table",21),t.NdJ("serverSideFilter",function(b){return t.CHM(n),t.oxw(2).onServerSideFilter(b)})("buttonClicked",function(b){return t.CHM(n),t.oxw(2).onButtonClicked(b)})("chipClicked",function(b){return t.CHM(n),t.oxw(2).onChipClicked(b)})("rowClicked",function(b){return t.CHM(n),t.oxw(2).onTableRowClicked(b)})("paginatorClicked",function(b){return t.CHM(n),t.oxw(2).onPaginatorClicked(b)})("serverSideOrder",function(b){return t.CHM(n),t.oxw(2).onServerSideOrder(b)}),t.qZA()()()}if(2&l){const n=t.oxw().$implicit,p=t.oxw();t.xp6(3),t.Q6J("tableDataColumn",n.data.column)("tableDataRow",n.data.row)("count",p.count)("serverSide",p.serverSide)}}function Q(l,f){if(1&l&&(t.TgZ(0,"mat-tab"),t.YNc(1,U,4,3,"div",5),t.YNc(2,k,3,2,"div",5),t.YNc(3,B,3,2,"div",5),t.YNc(4,$,4,4,"div",5),t.qZA()),2&l){const n=f.$implicit;t.xp6(1),t.Q6J("ngIf","html"===n.type),t.xp6(1),t.Q6J("ngIf","grid"===n.type),t.xp6(1),t.Q6J("ngIf","list"===n.type),t.xp6(1),t.Q6J("ngIf","table"===n.type)}}function N(l,f){1&l&&(t.TgZ(0,"mat-icon",7),t._uU(1,"comment"),t.qZA(),t.TgZ(2,"h3",8),t._uU(3,"Komentar"),t.qZA())}function q(l,f){1&l&&(t.TgZ(0,"div",10),t._UZ(1,"app-discussion"),t.qZA())}function W(l,f){1&l&&t._UZ(0,"app-no-data",10)}let G=(()=>{class l{constructor(n,p){this.activatedRoute=n,this.gs=p,this.count=0,this.serverSide=!1,this.serverSideFilter=new t.vpe,this.serverSideOrder=new t.vpe,this.SWIPE_ACTION={LEFT:"swipeleft",RIGHT:"swiperight"},this.selectedIndexTab=0,this.totalTabsCount=2,this.tabData=[],this.gridPageFinished=!1,this.listPageFinished=!1,this.chipClicked=new t.vpe,this.buttonClicked=new t.vpe,this.gridClicked=new t.vpe,this.listClicked=new t.vpe,this.gridLoadNextPage=new t.vpe,this.listLoadNextPage=new t.vpe,this.tableRowClicked=new t.vpe,this.paginatorClicked=new t.vpe,this.subsQueryParam=null}get GS(){return this.gs}ngOnInit(){this.gs.isBrowser&&this.watchUrlRoute()}ngAfterViewInit(){this.totalTabsCount=this.tabData.length}ngOnDestroy(){var n;null===(n=this.subsQueryParam)||void 0===n||n.unsubscribe()}get backgroundColor(){return this.gs.isDarkMode?"gelap":"terang"}watchUrlRoute(){this.subsQueryParam=this.activatedRoute.queryParams.subscribe({next:n=>{Number(n.comment||"")>0&&this.openCommentTab()}})}openCommentTab(){this.tabData.length>0&&(this.selectedIndexTab=this.tabData.length)}swipe(n){n===this.SWIPE_ACTION.RIGHT&&this.selectedIndexTab>0?this.selectedIndexTab--:n===this.SWIPE_ACTION.LEFT&&this.selectedIndexTab<this.totalTabsCount&&this.selectedIndexTab++}onGridClicked(n){this.gridClicked.emit(n)}onListClicked(n){this.listClicked.emit(n)}onGridLoadNextPage(){this.gridLoadNextPage.emit()}onListLoadNextPage(){this.listLoadNextPage.emit()}onTableRowClicked(n){this.tableRowClicked.emit(n)}onChipClicked(n){this.chipClicked.emit(n)}onButtonClicked(n){this.buttonClicked.emit(n)}onPaginatorClicked(n){this.paginatorClicked.emit(n)}onServerSideFilter(n){this.serverSideFilter.emit(n)}onServerSideOrder(n){this.serverSideOrder.emit(n)}}return l.\u0275fac=function(n){return new(n||l)(t.Y36(E.gz),t.Y36(T.U))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-material-tab"]],viewQuery:function(n,p){if(1&n&&t.Gf(d.SP,5),2&n){let b;t.iGM(b=t.CRH())&&(p.tabGroup=b.first)}},inputs:{count:"count",serverSide:"serverSide",tabData:"tabData",gridPageFinished:"gridPageFinished",listPageFinished:"listPageFinished"},outputs:{serverSideFilter:"serverSideFilter",serverSideOrder:"serverSideOrder",chipClicked:"chipClicked",buttonClicked:"buttonClicked",gridClicked:"gridClicked",listClicked:"listClicked",gridLoadNextPage:"gridLoadNextPage",listLoadNextPage:"listLoadNextPage",tableRowClicked:"tableRowClicked",paginatorClicked:"paginatorClicked"},decls:7,vars:4,consts:[["dynamicHeight","","mat-stroked-button","",1,"px-0",3,"color","backgroundColor","selectedIndex","swipeleft","swiperight"],[4,"ngFor","ngForOf"],["mat-tab-label",""],["matTabContent",""],["noData",""],[4,"ngIf"],[1,"p-3",3,"innerHTML"],[1,"me-3"],[1,"m-0"],["class","p-3",4,"ngIf","ngIfElse"],[1,"p-3"],[1,"p-0",3,"multiple"],["rowHeight","72px",3,"cols"],["class","col-12 text-center p-3",4,"ngIf"],[3,"click"],["matListAvatar","",1,"ms-3",2,"border-radius","0",3,"src"],["matLine",""],[1,"col-12","text-center","p-3"],["mat-button","",3,"click"],[3,"multiple"],[3,"click",4,"ngFor","ngForOf"],[3,"tableDataColumn","tableDataRow","count","serverSide","serverSideFilter","buttonClicked","chipClicked","rowClicked","paginatorClicked","serverSideOrder"]],template:function(n,p){1&n&&(t.TgZ(0,"mat-tab-group",0),t.NdJ("swipeleft",function(Z){return p.swipe(Z.type)})("swiperight",function(Z){return p.swipe(Z.type)}),t.YNc(1,Q,5,4,"mat-tab",1),t.TgZ(2,"mat-tab"),t.YNc(3,N,4,0,"ng-template",2),t.YNc(4,q,2,0,"ng-template",3),t.qZA()(),t.YNc(5,W,1,0,"ng-template",null,4,t.W1O)),2&n&&(t.Q6J("color","accent")("backgroundColor",p.backgroundColor)("selectedIndex",p.selectedIndexTab),t.xp6(1),t.Q6J("ngForOf",p.tabData))},directives:[d.SP,v.sg,d.uX,v.O5,d.uD,A.Hw,c.Ub,g.Il,g.DX,c.vS,c.eA,r.X2,_.lW,m.I,d.Vc,C.S,M.d],pipes:[R.H],styles:[""]}),l})()},6436:(w,y,s)=>{s.d(y,{L:()=>g});var t=s(9808),d=s(210),E=s(617),T=s(8764),v=s(2438),A=s(7355),c=s(5e3);let g=(()=>{class r{}return r.\u0275fac=function(m){return new(m||r)},r.\u0275mod=c.oAB({type:r}),r.\u0275inj=c.cJS({imports:[[t.ez,d.m,E.H,T.R,v.d,A.T]]}),r})()},7956:(w,y,s)=>{s.d(y,{C:()=>E});var t=s(9808),d=s(5e3);let E=(()=>{class T{}return T.\u0275fac=function(A){return new(A||T)},T.\u0275mod=d.oAB({type:T}),T.\u0275inj=d.cJS({imports:[[t.ez]]}),T})()},201:(w,y,s)=>{s.d(y,{S:()=>A});var t=s(5861),d=s(5e3),E=s(8696),T=s(3e3);let v=(()=>{class c{constructor(r,_){this.gs=r,this.bs=_,this.enabled=!0,this.kuroshiro=null,this.observer=null,this.ignoreNodes=[],this.gs.isBrowser&&(this.kuroshiro=new Kuroshiro,this.kuroshiro.init(new KuromojiAnalyzer({dictPath:"/assets/furigana/"})))}convert(r){return this.gs.log("[KUROSHIRO_CONVERT]",r),this.kuroshiro.convert(r,{mode:"furigana",to:"hiragana"})}replace(r,_){var m;const C=this.gs.document.createRange().createContextualFragment(_),M=[];return C.childNodes.forEach(R=>M.push(R)),null===(m=r.parentNode)||void 0===m||m.replaceChild(C,r),M}convertAndReplace(r){var _=this;return(0,t.Z)(function*(){if(!_.enabled||_.bs.busyRequestCount>0||!r.nodeValue.trim()||"RUBY"===r.parentNode.nodeName||!r.nodeValue.match(/[\u3400-\u9FBF]/))return;const m=yield _.convert(r.nodeValue);_.ignoreNodes.push(..._.replace(r,m))})()}watch(r){if("childList"===r.type)for(const _ of r.addedNodes)if(this.gs.log("[KUROSHIRO_NODE_WATCHER]",_),this.ignoreNodes.includes(_))this.ignoreNodes.splice(this.ignoreNodes.indexOf(_),1);else if(_ instanceof Text)this.convertAndReplace(_);else{const m=[],C=this.gs.document.createTreeWalker(_,NodeFilter.SHOW_TEXT,null);for(;C.nextNode();)m.push(C.currentNode);this.gs.log("[KUROSHIRO_NODE_WATCHER_LIST]",m);for(const M of m)this.convertAndReplace(M)}else"characterData"===r.type&&this.convertAndReplace(r.target)}}return c.\u0275fac=function(r){return new(r||c)(d.LFG(E.U),d.LFG(T.z))},c.\u0275prov=d.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})(),A=(()=>{class c{constructor(r,_,m,C){var M=this;if(this.elementRef=r,this.gs=_,this.bs=m,this.furi=C,this.changes=null,this.domChange=new d.vpe,this.gs.isBrowser){const R=this.elementRef.nativeElement;this.gs.log("[DOM_NATIVE]",R),this.changes=new MutationObserver(function(){var P=(0,t.Z)(function*(U){M.bs.busyRequestCount>0||(M.gs.log("[DOM_CHANGE]",U),M.domChange.emit(U),M.processDom(U))});return function(U){return P.apply(this,arguments)}}()),this.changes.observe(R,{subtree:!0,childList:!0})}}ngOnDestroy(){var r;null===(r=this.changes)||void 0===r||r.disconnect()}processDom(r){for(const _ of r)this.furi.watch(_)}}return c.\u0275fac=function(r){return new(r||c)(d.Y36(d.SBq),d.Y36(E.U),d.Y36(T.z),d.Y36(v))},c.\u0275dir=d.lG2({type:c,selectors:[["","appDomChange",""]],outputs:{domChange:"domChange"}}),c})()},7559:(w,y,s)=>{s.d(y,{k:()=>T});var t=s(5e3),d=s(9731),E=s(8696);let T=(()=>{class v{constructor(c,g){this.api=c,this.gs=g}getAllComment(c="",g=1,r=10,_="",m=""){return this.api.getData(`/comment?q=${c}&page=${g}&row=${r}&sort=${_}&order=${m}`)}getComment(c="",g="",r=1,_=10,m="",C=""){return this.api.getData(`/comment?path=${c}&q=${g}&page=${r}&row=${_}&sort=${m}&order=${C}`)}getReply(c,g="",r=1,_=10,m="",C=""){return this.api.getData(`/comment/${c}?q=${g}&page=${r}&row=${_}&sort=${m}&order=${C}`)}sendComment(c){return this.api.postData("/comment",c)}getHighlight(c){return this.api.patchData("/comment",c)}deleteComment(c){return this.api.deleteData(`/comment/${c}`)}}return v.\u0275fac=function(c){return new(c||v)(t.LFG(d.s),t.LFG(E.U))},v.\u0275prov=t.Yz7({token:v,factory:v.\u0275fac,providedIn:"root"}),v})()},9287:(w,y,s)=>{s.d(y,{TU:()=>T});var t=s(9808),d=s(5e3);class E{constructor(r,_){this._document=_;const m=this._textarea=this._document.createElement("textarea"),C=m.style;C.position="fixed",C.top=C.opacity="0",C.left="-999em",m.setAttribute("aria-hidden","true"),m.value=r,this._document.body.appendChild(m)}copy(){const r=this._textarea;let _=!1;try{if(r){const m=this._document.activeElement;r.select(),r.setSelectionRange(0,r.value.length),_=this._document.execCommand("copy"),m&&m.focus()}}catch(m){}return _}destroy(){const r=this._textarea;r&&(r.remove(),this._textarea=void 0)}}let T=(()=>{class g{constructor(_){this._document=_}copy(_){const m=this.beginCopy(_),C=m.copy();return m.destroy(),C}beginCopy(_){return new E(_,this._document)}}return g.\u0275fac=function(_){return new(_||g)(d.LFG(t.K0))},g.\u0275prov=d.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),g})()}}]);