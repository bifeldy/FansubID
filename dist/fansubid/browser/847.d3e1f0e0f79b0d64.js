"use strict";(self.webpackChunkfansubid=self.webpackChunkfansubid||[]).push([[847],{9461:(P,y,r)=>{r.d(y,{S:()=>z});var t=r(5e3),d=r(8696),b=r(5934),v=r(9287),x=r(8406),E=r(7261),c=r(7559),g=r(4137),o=r(9808),_=r(201),m=r(7238),C=r(7423),A=r(5245),O=r(7322),D=r(7531),R=r(3075),I=r(192),U=r(6766);function S(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"div",4)(1,"mat-form-field",5)(2,"mat-label"),t._uU(3,"Buat Komentar Baru"),t.qZA(),t.TgZ(4,"input",6),t.NdJ("ngModelChange",function(a){return t.CHM(e),t.oxw().commentToSend=a}),t.qZA(),t.TgZ(5,"mat-icon",7),t._uU(6,"quickreply"),t.qZA()(),t.TgZ(7,"div",8)(8,"button",9),t.NdJ("click",function(){return t.CHM(e),t.oxw().sendComment(null)}),t._uU(9," Kirim "),t.TgZ(10,"mat-icon",10),t._uU(11,"send"),t.qZA()()()()}if(2&s){const e=t.oxw();t.xp6(1),t.Q6J("color","accent"),t.xp6(3),t.Q6J("ngModel",e.commentToSend)}}function k(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"mat-form-field",29)(1,"mat-label"),t._uU(2,"Balas / Tanggapi"),t.qZA(),t.TgZ(3,"input",30),t.NdJ("ngModelChange",function(a){return t.CHM(e),t.oxw().$implicit.reply_to_send=a}),t.qZA(),t.TgZ(4,"mat-icon",7),t._uU(5,"quickreply"),t.qZA()()}if(2&s){const e=t.oxw().$implicit;t.Q6J("color","accent"),t.xp6(3),t.Q6J("ngModel",e.reply_to_send)}}function L(s,h){1&s&&(t.TgZ(0,"mat-icon",33),t._uU(1,"expand_more"),t.qZA())}function H(s,h){1&s&&(t.TgZ(0,"mat-icon",33),t._uU(1,"expand_less"),t.qZA())}function K(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"button",31),t.NdJ("click",function(){t.CHM(e);const a=t.oxw().$implicit;return t.oxw().showHideComment(a)}),t.YNc(1,L,2,0,"mat-icon",32),t.YNc(2,H,2,0,"mat-icon",32),t._uU(3),t.qZA()}if(2&s){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",!e.show_reply),t.xp6(1),t.Q6J("ngIf",e.show_reply),t.xp6(1),t.AsE(" ",e.show_reply?"Sembunyikan":"Tampilkan"," ",e.reply_count," balasan ")}}function F(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"button",9),t.NdJ("click",function(){t.CHM(e);const a=t.oxw().$implicit;return t.oxw().sendComment(a)}),t._uU(1," Kirim "),t.TgZ(2,"mat-icon",10),t._uU(3,"send"),t.qZA()()}}function B(s,h){if(1&s&&t._UZ(0,"app-comment",34),2&s){const e=t.oxw().$implicit,i=t.oxw();t.Q6J("parent",e)("komentar",e.reply)("recursionCount",i.recursionCount+1)}}function J(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"div",11)(1,"div",12),t._UZ(2,"img",13),t.qZA(),t.TgZ(3,"div")(4,"div",14),t.NdJ("click",function(){const p=t.CHM(e).$implicit;return t.oxw().showHideCommentBox(p)}),t.TgZ(5,"p",15)(6,"b",16),t.NdJ("click",function(a){const M=t.CHM(e).$implicit,w=t.oxw();return a.stopPropagation(),w.openUserProfile(M)}),t._uU(7),t.qZA(),t.TgZ(8,"small",17),t.ALo(9,"date"),t._uU(10),t.ALo(11,"dateAgo"),t.qZA()(),t.TgZ(12,"p",18),t._uU(13),t.qZA()(),t.TgZ(14,"div",19)(15,"button",20),t.NdJ("click",function(){const p=t.CHM(e).$implicit;return t.oxw().deleteComment(p)}),t.TgZ(16,"mat-icon"),t._uU(17,"delete"),t.qZA()(),t.TgZ(18,"button",21),t.NdJ("click",function(){const p=t.CHM(e).$implicit;return t.oxw().copyCommentLink(p)}),t.TgZ(19,"mat-icon"),t._uU(20,"link"),t.qZA()()(),t.YNc(21,k,6,2,"mat-form-field",22),t.TgZ(22,"div",23)(23,"div",4)(24,"div",24),t.YNc(25,K,4,4,"button",25),t.qZA(),t.TgZ(26,"div",26),t.YNc(27,F,4,0,"button",27),t.qZA()()(),t.YNc(28,B,1,3,"app-comment",28),t.qZA()()}if(2&s){const e=h.$implicit,i=t.oxw();t.xp6(2),t.s9C("src",e.user_.image_url,t.LSH),t.xp6(1),t.Gre("flex-grow-1 ms-3 row ",0===i.recursionCount?"me-2":"",""),t.xp6(4),t.hij(" ",e.user_.username," "),t.xp6(1),t.s9C("matTooltip",t.xi3(9,12,e.created_at,"d MMMM y, hh:mm:ss a z")),t.xp6(2),t.hij(" ",t.lcZ(11,15,e.created_at)," "),t.xp6(3),t.Oqu(e.comment),t.xp6(8),t.Q6J("ngIf",e.reply_mode&&(null==i.AS.currentUserSubject?null:i.AS.currentUserSubject.value)&&0===i.recursionCount),t.xp6(4),t.Q6J("ngIf",e.reply_count>0),t.xp6(2),t.Q6J("ngIf",e.reply_mode&&(null==i.AS.currentUserSubject?null:i.AS.currentUserSubject.value)&&0===i.recursionCount),t.xp6(1),t.Q6J("ngIf",e.show_reply)}}function Y(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"div",35)(1,"button",9),t.NdJ("click",function(){return t.CHM(e),t.oxw().loadNextPage()}),t.TgZ(2,"mat-icon",33),t._uU(3,"subdirectory_arrow_right"),t.qZA(),t._uU(4," Load More ... "),t.qZA()()}}function $(s,h){1&s&&(t.TgZ(0,"div",4),t._UZ(1,"app-no-data",36),t.qZA())}let N=(()=>{class s{constructor(e,i,a,p,M,w){this.clipboard=e,this.router=i,this.snackBar=a,this.komen=p,this.gs=M,this.as=w,this.urlPath=null,this.count=0,this.page=1,this.row=10,this.pageFinished=!1,this.recursionCount=0,this.rootCommentBox=!1,this.commentToSend=null,this.parent=null,this.komentar=[],this.subsKomenSend=null,this.subsKomenGetKomen=null,this.subsKomenGetReply=null,this.subsDelete=null}get AS(){return this.as}ngOnInit(){this.gs.isBrowser&&(this.urlPath=this.router.url.split("?")[0],this.getComment(!0))}ngOnDestroy(){var e,i,a,p;null===(e=this.subsKomenSend)||void 0===e||e.unsubscribe(),null===(i=this.subsKomenGetKomen)||void 0===i||i.unsubscribe(),null===(a=this.subsKomenGetReply)||void 0===a||a.unsubscribe(),null===(p=this.subsDelete)||void 0===p||p.unsubscribe(),this.urlPath=null}sendComment(e){this.gs.log("[KOMENTAR_PARENT_CREATE_REPLY]",e),this.subsKomenSend=this.komen.sendComment(e?{path:this.urlPath,comment:e.reply_to_send,parent:e.id}:{path:this.urlPath,comment:this.commentToSend}).subscribe({next:a=>{this.gs.log("[KOMENTAR_CREATE_REPLY_SUCCESS]",a),e?(e.reply_to_send=null,e.reply_mode=!1,this.getReply(e,!0)):(this.commentToSend=null,this.getComment(!0))},error:a=>{this.gs.log("[KOMENTAR_CREATE_REPLY_ERROR]",a,"error")}})}getComment(e=!1){this.parent||(e&&(this.page=1,this.pageFinished=!1),this.subsKomenGetKomen=this.komen.getComment(this.urlPath,"",this.page,this.row).subscribe({next:i=>{this.gs.log("[KOMENTAR_LIST_SUCCESS]",i),this.count=i.count,this.komentar=e?i.results:[...this.komentar,...i.results],i.results.length<=0&&(this.pageFinished=!0)},error:i=>{this.gs.log("[KOMENTAR_LIST_ERROR]",i,"error")}}))}getReply(e,i=!1){this.gs.log("[KOMENTAR_PARENT_LOAD_REPLY]",e),i&&(e.reply_page=1,e.reply_page_finised=!1),this.subsKomenGetReply=this.komen.getReply(e.id,"",e.reply_page,this.row).subscribe({next:a=>{this.gs.log("[REPLY_LIST_SUCCESS]",a),e.reply=i?a.results:[...e.reply,...a.results],e.reply_count=a.count,a.results.length<=0&&(e.reply_page_finised=!0)},error:a=>{this.gs.log("[REPLY_LIST_ERROR]",a,"error"),e.reply=[]}})}showHideComment(e){e.show_reply=null==e.show_reply||!e.show_reply,e.show_reply&&this.getReply(e,!0)}showHideCommentBox(e){e.reply_mode=null==e.reply_mode||!e.reply_mode}loadNextPage(){this.parent?this.loadNextPageReply(this.parent):this.loadNextPageComment()}loadNextPageComment(){this.pageFinished||(this.page++,this.getComment())}loadNextPageReply(e){e.reply_page_finised||(e.reply_page||(e.reply_page=1),e.reply_page++,this.getReply(e))}openUserProfile(e){this.router.navigateByUrl(`/user/${e.user_.username}`)}copyCommentLink(e){this.clipboard.copy(`${b.N.baseUrl}/${this.urlPath}?comment=${e.id}`)&&this.snackBar.open("URL Komentar :: Telah Di Salin Pada Clipboard","Ok")}deleteComment(e){this.gs.log("[KOMENTAR_DELETE_COMMENT]",e),this.subsDelete=this.komen.deleteComment(e.id).subscribe({next:i=>{this.gs.log("[KOMENTAR_DELETE_SUCCESS]",i),this.parent?this.getReply(this.parent,!0):this.getComment(!0)},error:i=>{this.gs.log("[KOMENTAR_DELETE_ERROR]",i,"error"),this.parent?this.getReply(this.parent,!0):this.getComment(!0)}})}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(v.TU),t.Y36(x.F0),t.Y36(E.ux),t.Y36(c.k),t.Y36(d.U),t.Y36(g.e))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-comment"]],inputs:{row:"row",recursionCount:"recursionCount",rootCommentBox:"rootCommentBox",parent:"parent",komentar:"komentar"},decls:5,vars:4,consts:[["class","row",4,"ngIf"],["appDomChange","",1,"row"],["class","d-flex my-1",4,"ngFor","ngForOf"],["class","col-12",4,"ngIf"],[1,"row"],["appearance","outline",1,"col-12",3,"color"],["matInput","","placeholder","Buat Baru ...",3,"ngModel","ngModelChange"],["matSuffix",""],[1,"col-12","text-end","pe-0","mb-3"],["mat-button","","color","accent",3,"click"],[1,"ms-1"],[1,"d-flex","my-1"],[1,"flex-shrink-0"],["width","40","height","40",2,"object-fit","cover","object-position","center",3,"src"],[1,"col-8","p-0",3,"click"],[1,"m-0"],[1,"text-warning",2,"cursor","pointer",3,"click"],[1,"ms-3","text-bifeldy",3,"matTooltip"],[1,"mb-1",2,"line-height","normal"],[1,"col","p-0","text-end"],["mat-icon-button","","color","accent","matTooltip","Hapus",3,"click"],["mat-icon-button","","color","accent","matTooltip","Salin Tautan",3,"click"],["appearance","outline","class","mt-2 col-12",3,"color",4,"ngIf"],[1,"col-12","p-0"],[1,"col-6"],["mat-button","","class","ps-1 pe-2","color","accent",3,"click",4,"ngIf"],[1,"col-6","text-end"],["mat-button","","color","accent",3,"click",4,"ngIf"],[3,"parent","komentar","recursionCount",4,"ngIf"],["appearance","outline",1,"mt-2","col-12",3,"color"],["matInput","","placeholder","Balas ...",3,"ngModel","ngModelChange"],["mat-button","","color","accent",1,"ps-1","pe-2",3,"click"],["class","me-1",4,"ngIf"],[1,"me-1"],[3,"parent","komentar","recursionCount"],[1,"col-12"],[1,"col-12","p-3"]],template:function(e,i){1&e&&(t.YNc(0,S,12,2,"div",0),t.TgZ(1,"div",1),t.YNc(2,J,29,17,"div",2),t.YNc(3,Y,5,0,"div",3),t.qZA(),t.YNc(4,$,2,0,"div",0)),2&e&&(t.Q6J("ngIf",i.rootCommentBox&&(null==i.AS.currentUserSubject?null:i.AS.currentUserSubject.value)),t.xp6(2),t.Q6J("ngForOf",i.komentar),t.xp6(1),t.Q6J("ngIf",i.count>=10&&!i.pageFinished||(null==i.parent?null:i.parent.reply_count)>=10&&!(null!=i.parent&&i.parent.reply_page_finised)),t.xp6(1),t.Q6J("ngIf",i.komentar&&i.komentar.length<=0))},directives:[o.O5,O.KE,O.hX,D.Nt,R.Fj,R.JJ,R.On,A.Hw,O.R9,C.lW,_.S,o.sg,m.gM,s,I.d],pipes:[o.uU,U.R],styles:[""]}),s})();function Q(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"div",19)(1,"div",25)(2,"div",5),t._UZ(3,"img",6),t.qZA(),t.TgZ(4,"div",7)(5,"div",26)(6,"p",9)(7,"b",10),t.NdJ("click",function(a){t.CHM(e);const p=t.oxw(3);return a.stopPropagation(),p.openUserProfile(p.komentarHighlight)}),t._uU(8),t.qZA(),t.TgZ(9,"small",11),t.ALo(10,"date"),t._uU(11),t.ALo(12,"dateAgo"),t.qZA()(),t.TgZ(13,"p",12),t._uU(14),t.qZA()(),t.TgZ(15,"div",13)(16,"button",14),t.NdJ("click",function(){t.CHM(e);const a=t.oxw().$implicit;return t.oxw(2).deleteComment(a)}),t.TgZ(17,"mat-icon"),t._uU(18,"delete"),t.qZA()(),t.TgZ(19,"button",15),t.NdJ("click",function(){t.CHM(e);const a=t.oxw().$implicit;return t.oxw(2).copyCommentLink(a)}),t.TgZ(20,"mat-icon"),t._uU(21,"link"),t.qZA()()()()()()}if(2&s){const e=t.oxw(3);t.xp6(3),t.s9C("src",e.komentarHighlight.user_.image_url,t.LSH),t.xp6(5),t.hij(" ",e.komentarHighlight.user_.username," "),t.xp6(1),t.s9C("matTooltip",t.xi3(10,5,e.komentarHighlight.created_at,"d MMMM y, hh:mm:ss a z")),t.xp6(2),t.hij(" ",t.lcZ(12,8,e.komentarHighlight.created_at)," "),t.xp6(3),t.Oqu(e.komentarHighlight.comment)}}function q(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"mat-form-field",27)(1,"mat-label"),t._uU(2,"Balas / Tanggapi"),t.qZA(),t.TgZ(3,"input",28),t.NdJ("ngModelChange",function(a){return t.CHM(e),t.oxw().$implicit.reply_to_send=a}),t.qZA(),t.TgZ(4,"mat-icon",29),t._uU(5,"quickreply"),t.qZA()()}if(2&s){const e=t.oxw().$implicit;t.Q6J("color","accent"),t.xp6(3),t.Q6J("ngModel",e.reply_to_send)}}function W(s,h){1&s&&(t.TgZ(0,"mat-icon",32),t._uU(1,"expand_more"),t.qZA())}function l(s,h){1&s&&(t.TgZ(0,"mat-icon",32),t._uU(1,"expand_less"),t.qZA())}function f(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"button",30),t.NdJ("click",function(){t.CHM(e);const a=t.oxw().$implicit;return t.oxw(2).showHideComment(a)}),t.YNc(1,W,2,0,"mat-icon",31),t.YNc(2,l,2,0,"mat-icon",31),t._uU(3),t.qZA()}if(2&s){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",!e.show_reply),t.xp6(1),t.Q6J("ngIf",e.show_reply),t.xp6(1),t.AsE(" ",e.show_reply?"Sembunyikan":"Tampilkan"," ",e.reply_count," balasan ")}}function n(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"button",33),t.NdJ("click",function(){t.CHM(e);const a=t.oxw().$implicit;return t.oxw(2).sendComment(a)}),t._uU(1," Kirim "),t.TgZ(2,"mat-icon",34),t._uU(3,"send"),t.qZA()()}}function u(s,h){if(1&s&&t._UZ(0,"app-comment",35),2&s){const e=t.oxw().$implicit,i=t.oxw(2);t.Q6J("parent",e)("komentar",e.reply)("recursionCount",i.recursionCount+1)("row",5)}}function T(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"div",4)(1,"div",5),t._UZ(2,"img",6),t.qZA(),t.TgZ(3,"div",7)(4,"div",8),t.NdJ("click",function(){const p=t.CHM(e).$implicit;return t.oxw(2).showHideCommentBox(p)}),t.TgZ(5,"p",9)(6,"b",10),t.NdJ("click",function(a){const M=t.CHM(e).$implicit,w=t.oxw(2);return a.stopPropagation(),w.openUserProfile(M)}),t._uU(7),t.qZA(),t.TgZ(8,"small",11),t.ALo(9,"date"),t._uU(10),t.ALo(11,"dateAgo"),t.qZA()(),t.TgZ(12,"p",12),t._uU(13),t.qZA()(),t.TgZ(14,"div",13)(15,"button",14),t.NdJ("click",function(){const p=t.CHM(e).$implicit;return t.oxw(2).deleteComment(p)}),t.TgZ(16,"mat-icon"),t._uU(17,"delete"),t.qZA()(),t.TgZ(18,"button",15),t.NdJ("click",function(){const p=t.CHM(e).$implicit;return t.oxw(2).copyCommentLink(p)}),t.TgZ(19,"mat-icon"),t._uU(20,"link"),t.qZA()()(),t.TgZ(21,"div",16),t.YNc(22,Q,22,10,"div",17),t.qZA(),t.YNc(23,q,6,2,"mat-form-field",18),t.TgZ(24,"div",16)(25,"div",19)(26,"div",20),t.YNc(27,f,4,4,"button",21),t.qZA(),t.TgZ(28,"div",22),t.YNc(29,n,4,0,"button",23),t.qZA()()(),t.YNc(30,u,1,4,"app-comment",24),t.qZA()()}if(2&s){const e=h.$implicit,i=t.oxw(2);t.xp6(2),t.s9C("src",e.user_.image_url,t.LSH),t.xp6(5),t.hij(" ",e.user_.username," "),t.xp6(1),t.s9C("matTooltip",t.xi3(9,10,e.created_at,"d MMMM y, hh:mm:ss a z")),t.xp6(2),t.hij(" ",t.lcZ(11,13,e.created_at)," "),t.xp6(3),t.Oqu(e.comment),t.xp6(9),t.Q6J("ngIf",i.komentarHighlight),t.xp6(1),t.Q6J("ngIf",e.reply_mode&&(null==i.AS.currentUserSubject?null:i.AS.currentUserSubject.value)&&0===i.recursionCount),t.xp6(4),t.Q6J("ngIf",e.reply_count>0),t.xp6(2),t.Q6J("ngIf",e.reply_mode&&(null==i.AS.currentUserSubject?null:i.AS.currentUserSubject.value)&&0===i.recursionCount),t.xp6(1),t.Q6J("ngIf",e.show_reply)}}function Z(s,h){if(1&s){const e=t.EpF();t.TgZ(0,"div",36)(1,"button",33),t.NdJ("click",function(){return t.CHM(e),t.oxw(2).loadNextPage()}),t.TgZ(2,"mat-icon",32),t._uU(3,"subdirectory_arrow_right"),t.qZA(),t._uU(4," Load More ... "),t.qZA()()}}function G(s,h){if(1&s&&(t.TgZ(0,"div",1),t.YNc(1,T,31,15,"div",2),t.YNc(2,Z,5,0,"div",3),t.qZA()),2&s){const e=t.oxw();t.xp6(1),t.Q6J("ngForOf",e.komentar),t.xp6(1),t.Q6J("ngIf",e.count>=10&&!e.pageFinished||(null==e.parent?null:e.parent.reply_count)>=10&&!(null!=e.parent&&e.parent.reply_page_finised))}}let j=(()=>{class s{constructor(e,i,a,p,M,w,X){this.clipboard=e,this.activatedRoute=i,this.router=a,this.snackBar=p,this.komen=M,this.gs=w,this.as=X,this.highlightId=0,this.komentarHighlight=null,this.urlPath=null,this.count=0,this.page=1,this.pageFinished=!1,this.recursionCount=0,this.commentToSend=null,this.parent=null,this.komentar=[],this.subsHighlight=null,this.subsKomenSend=null,this.subsKomenGetKomen=null,this.subsKomenGetReply=null,this.subsDelete=null}get AS(){return this.as}ngOnInit(){this.gs.isBrowser&&(this.urlPath=this.router.url.split("?")[0],this.highlightId=Number(this.activatedRoute.snapshot.queryParamMap.get("comment")||""),this.highlightId>0&&this.getHighlight())}ngOnDestroy(){var e,i,a,p,M;null===(e=this.subsKomenSend)||void 0===e||e.unsubscribe(),null===(i=this.subsKomenGetKomen)||void 0===i||i.unsubscribe(),null===(a=this.subsKomenGetReply)||void 0===a||a.unsubscribe(),null===(p=this.subsHighlight)||void 0===p||p.unsubscribe(),null===(M=this.subsDelete)||void 0===M||M.unsubscribe(),this.urlPath=null}getHighlight(e=this.highlightId){this.subsHighlight=this.komen.getHighlight({id:e,path:this.urlPath}).subscribe({next:i=>{this.gs.log("[KOMENTAR_HIGHLIGHT_SUCCESS]",i),i.result.parent_komentar_?(this.komentarHighlight=i.result,this.getHighlight(i.result.parent_komentar_.id)):this.komentar=[i.result]},error:i=>{this.gs.log("[KOMENTAR_HIGHLIGHT_ERROR]",i,"error")}})}sendComment(e){this.gs.log("[KOMENTAR_PARENT_CREATE_REPLY]",e),this.subsKomenSend=this.komen.sendComment(e?{path:this.urlPath,comment:e.reply_to_send,parent:e.id}:{path:this.urlPath,comment:this.commentToSend}).subscribe({next:a=>{this.gs.log("[KOMENTAR_CREATE_REPLY_SUCCESS]",a),e?(e.reply_to_send=null,e.reply_mode=!1,this.getReply(e,!0)):(this.commentToSend=null,this.getComment(!0))},error:a=>{this.gs.log("[KOMENTAR_CREATE_REPLY_ERROR]",a,"error")}})}getComment(e=!1){this.parent||(e&&(this.page=1,this.pageFinished=!1),this.subsKomenGetKomen=this.komen.getComment(this.urlPath,"",this.page,5).subscribe({next:i=>{this.gs.log("[KOMENTAR_LIST_SUCCESS]",i),this.count=i.count,this.komentar=e?i.results:[...this.komentar,...i.results],i.results.length<=0&&(this.pageFinished=!0)},error:i=>{this.gs.log("[KOMENTAR_LIST_ERROR]",i,"error")}}))}getReply(e,i=!1){this.gs.log("[KOMENTAR_PARENT_LOAD_REPLY]",e),i&&(e.reply_page=1,e.reply_page_finised=!1),this.subsKomenGetReply=this.komen.getReply(e.id,"",e.reply_page,5).subscribe({next:a=>{this.gs.log("[REPLY_LIST_SUCCESS]",a),e.reply=i?a.results:[...e.reply,...a.results],e.reply_count=a.count,a.results.length<=0&&(e.reply_page_finised=!0)},error:a=>{this.gs.log("[REPLY_LIST_ERROR]",a,"error"),e.reply=[]}})}showHideComment(e){e.show_reply=null==e.show_reply||!e.show_reply,e.show_reply&&this.getReply(e,!0)}showHideCommentBox(e){e.reply_mode=null==e.reply_mode||!e.reply_mode}loadNextPage(){this.parent?this.loadNextPageReply(this.parent):this.loadNextPageComment()}loadNextPageComment(){this.pageFinished||(this.page++,this.getComment())}loadNextPageReply(e){e.reply_page_finised||(e.reply_page||(e.reply_page=1),e.reply_page++,this.getReply(e))}openUserProfile(e){this.router.navigateByUrl(`/user/${e.user_.username}`)}copyCommentLink(e){this.clipboard.copy(`${b.N.baseUrl}/${this.urlPath}?comment=${e.id}`)&&this.snackBar.open("URL Komentar :: Telah Di Salin Pada Clipboard","Ok")}deleteComment(e){this.gs.log("[KOMENTAR_DELETE_HIGHLIGHT]",e),this.subsDelete=this.komen.deleteComment(e.id).subscribe({next:i=>{this.gs.log("[KOMENTAR_DELETE_SUCCESS]",i),this.getHighlight()},error:i=>{this.gs.log("[KOMENTAR_DELETE_ERROR]",i,"error"),this.getHighlight()}})}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(v.TU),t.Y36(x.gz),t.Y36(x.F0),t.Y36(E.ux),t.Y36(c.k),t.Y36(d.U),t.Y36(g.e))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-highlight"]],inputs:{recursionCount:"recursionCount",parent:"parent",komentar:"komentar"},decls:1,vars:1,consts:[["class","row pt-3 pb-2 mb-4 gradient-border rgb-border","appDomChange","",4,"ngIf"],["appDomChange","",1,"row","pt-3","pb-2","mb-4","gradient-border","rgb-border"],["class","d-flex my-1",4,"ngFor","ngForOf"],["class","col-12",4,"ngIf"],[1,"d-flex","my-1"],[1,"flex-shrink-0"],["width","40","height","40",2,"object-fit","cover","object-position","center",3,"src"],[1,"flex-grow-1","ms-3","me-2","row"],[1,"col-8","p-0",3,"click"],[1,"m-0"],[1,"text-warning",2,"cursor","pointer",3,"click"],[1,"ms-3","text-bifeldy",3,"matTooltip"],[1,"mb-1",2,"line-height","normal"],[1,"col","p-0","text-end"],["mat-icon-button","","color","accent","matTooltip","Hapus",3,"click"],["mat-icon-button","","color","accent","matTooltip","Salin Tautan",3,"click"],[1,"col-12","p-0"],["class","row",4,"ngIf"],["appearance","outline","class","mt-2 col-12",3,"color",4,"ngIf"],[1,"row"],[1,"col-6"],["mat-button","","class","ps-1 pe-2","color","accent",3,"click",4,"ngIf"],[1,"col-6","text-end"],["mat-button","","color","accent",3,"click",4,"ngIf"],[3,"parent","komentar","recursionCount","row",4,"ngIf"],[1,"ms-2","ps-3","d-flex","my-1"],[1,"col-8","p-0"],["appearance","outline",1,"mt-2","col-12",3,"color"],["matInput","","placeholder","Balas ...",3,"ngModel","ngModelChange"],["matSuffix",""],["mat-button","","color","accent",1,"ps-1","pe-2",3,"click"],["class","me-1",4,"ngIf"],[1,"me-1"],["mat-button","","color","accent",3,"click"],[1,"ms-1"],[3,"parent","komentar","recursionCount","row"],[1,"col-12"]],template:function(e,i){1&e&&t.YNc(0,G,3,2,"div",0),2&e&&t.Q6J("ngIf",i.komentar.length>0)},directives:[o.O5,_.S,o.sg,m.gM,C.lW,A.Hw,O.KE,O.hX,D.Nt,R.Fj,R.JJ,R.On,O.R9,N],pipes:[o.uU,U.R],styles:[""]}),s})(),z=(()=>{class s{constructor(e){this.gs=e}ngOnInit(){}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(d.U))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-discussion"]],decls:2,vars:1,consts:[[3,"rootCommentBox"]],template:function(e,i){1&e&&t._UZ(0,"app-highlight")(1,"app-comment",0),2&e&&(t.xp6(1),t.Q6J("rootCommentBox",!0))},directives:[j,N],styles:[""]}),s})()},8764:(P,y,r)=>{r.d(y,{R:()=>g});var t=r(9808),d=r(3075),b=r(7355),v=r(210),x=r(2438),E=r(7956),c=r(5e3);let g=(()=>{class o{}return o.\u0275fac=function(m){return new(m||o)},o.\u0275mod=c.oAB({type:o}),o.\u0275inj=c.cJS({imports:[[t.ez,d.u5,d.UX,v.m,b.T,E.C,x.d]]}),o})()},8757:(P,y,r)=>{r.d(y,{H:()=>W});var t=r(5e3),d=r(3251),b=r(8696),v=r(9808),x=r(5245),E=r(4623),c=r(3954),g=r(508),o=r(7423),_=r(578),m=r(9461),C=r(192),A=r(1861);function O(l,f){if(1&l&&(t.TgZ(0,"mat-icon",7),t._uU(1),t.qZA(),t.TgZ(2,"h3",8),t._uU(3),t.qZA()),2&l){const n=t.oxw(2).$implicit;t.xp6(1),t.Oqu(n.icon),t.xp6(2),t.Oqu(n.name)}}function D(l,f){if(1&l&&(t.TgZ(0,"div"),t.YNc(1,O,4,2,"ng-template",2),t._UZ(2,"div",6),t.ALo(3,"safeInnerHtml"),t.qZA()),2&l){const n=t.oxw().$implicit;t.xp6(2),t.Q6J("innerHTML",t.lcZ(3,1,n.data),t.oJD)}}function R(l,f){if(1&l&&(t.TgZ(0,"mat-icon",7),t._uU(1),t.qZA(),t.TgZ(2,"h3",8),t._uU(3),t.qZA()),2&l){const n=t.oxw(2).$implicit;t.xp6(1),t.Oqu(n.icon),t.xp6(2),t.Oqu(n.name)}}function I(l,f){if(1&l){const n=t.EpF();t.TgZ(0,"mat-grid-tile")(1,"mat-list-option",14),t.NdJ("click",function(){const Z=t.CHM(n).$implicit;return t.oxw(4).onGridClicked(Z)}),t._UZ(2,"img",15),t.TgZ(3,"h4",16),t._uU(4),t.qZA(),t.TgZ(5,"p",16),t._uU(6),t.qZA()()()}if(2&l){const n=f.$implicit;t.xp6(2),t.s9C("src",n.image,t.LSH),t.xp6(2),t.Oqu(n.title),t.xp6(2),t.Oqu(n.description)}}function U(l,f){if(1&l){const n=t.EpF();t.TgZ(0,"div",17)(1,"button",18),t.NdJ("click",function(){return t.CHM(n),t.oxw(4).onGridLoadNextPage()}),t._uU(2,"Load More ..."),t.qZA()()}}function S(l,f){if(1&l&&(t.TgZ(0,"div",10)(1,"mat-selection-list",11)(2,"mat-grid-list",12),t.YNc(3,I,7,3,"mat-grid-tile",1),t.qZA()(),t.YNc(4,U,3,0,"div",13),t.qZA()),2&l){const n=t.oxw(2).$implicit,u=t.oxw();t.xp6(1),t.Q6J("multiple",!1),t.xp6(1),t.Q6J("cols",u.GS.gridListBreakpoint),t.xp6(1),t.Q6J("ngForOf",n.data),t.xp6(1),t.Q6J("ngIf",!u.gridPageFinished)}}function k(l,f){if(1&l&&(t.TgZ(0,"div"),t.YNc(1,R,4,2,"ng-template",2),t.YNc(2,S,5,4,"div",9),t.qZA()),2&l){const n=t.oxw().$implicit;t.oxw();const u=t.MAs(6);t.xp6(2),t.Q6J("ngIf",n.data.length>0)("ngIfElse",u)}}function L(l,f){if(1&l&&(t.TgZ(0,"mat-icon",7),t._uU(1),t.qZA(),t.TgZ(2,"h3",8),t._uU(3),t.qZA()),2&l){const n=t.oxw(2).$implicit;t.xp6(1),t.Oqu(n.icon),t.xp6(2),t.Oqu(n.name)}}function H(l,f){if(1&l){const n=t.EpF();t.TgZ(0,"mat-list-option",14),t.NdJ("click",function(){const Z=t.CHM(n).$implicit;return t.oxw(4).onListClicked(Z)}),t._UZ(1,"img",15),t.TgZ(2,"h4",16),t._uU(3),t.qZA(),t.TgZ(4,"p",16),t._uU(5),t.qZA()()}if(2&l){const n=f.$implicit;t.xp6(1),t.s9C("src",n.image,t.LSH),t.xp6(2),t.Oqu(n.title),t.xp6(2),t.Oqu(n.description)}}function K(l,f){if(1&l){const n=t.EpF();t.TgZ(0,"div",17)(1,"button",18),t.NdJ("click",function(){return t.CHM(n),t.oxw(4).onListLoadNextPage()}),t._uU(2,"Load More ..."),t.qZA()()}}function F(l,f){if(1&l&&(t.TgZ(0,"div",10)(1,"mat-selection-list",19),t.YNc(2,H,6,3,"mat-list-option",20),t.qZA(),t.YNc(3,K,3,0,"div",13),t.qZA()),2&l){const n=t.oxw(2).$implicit,u=t.oxw();t.xp6(1),t.Q6J("multiple",!1),t.xp6(1),t.Q6J("ngForOf",n.data),t.xp6(1),t.Q6J("ngIf",!u.listPageFinished)}}function B(l,f){if(1&l&&(t.TgZ(0,"div"),t.YNc(1,L,4,2,"ng-template",2),t.YNc(2,F,4,3,"div",9),t.qZA()),2&l){const n=t.oxw().$implicit;t.oxw();const u=t.MAs(6);t.xp6(2),t.Q6J("ngIf",n.data.length>0)("ngIfElse",u)}}function J(l,f){if(1&l&&(t.TgZ(0,"mat-icon",7),t._uU(1),t.qZA(),t.TgZ(2,"h3",8),t._uU(3),t.qZA()),2&l){const n=t.oxw(2).$implicit;t.xp6(1),t.Oqu(n.icon),t.xp6(2),t.Oqu(n.name)}}function Y(l,f){if(1&l){const n=t.EpF();t.TgZ(0,"div"),t.YNc(1,J,4,2,"ng-template",2),t.TgZ(2,"div",10)(3,"app-material-table",21),t.NdJ("serverSideFilter",function(T){return t.CHM(n),t.oxw(2).onServerSideFilter(T)})("buttonClicked",function(T){return t.CHM(n),t.oxw(2).onButtonClicked(T)})("chipClicked",function(T){return t.CHM(n),t.oxw(2).onChipClicked(T)})("rowClicked",function(T){return t.CHM(n),t.oxw(2).onTableRowClicked(T)})("paginatorClicked",function(T){return t.CHM(n),t.oxw(2).onPaginatorClicked(T)})("serverSideOrder",function(T){return t.CHM(n),t.oxw(2).onServerSideOrder(T)}),t.qZA()()()}if(2&l){const n=t.oxw().$implicit,u=t.oxw();t.xp6(3),t.Q6J("tableDataColumn",n.data.column)("tableDataRow",n.data.row)("count",u.count)("serverSide",u.serverSide)}}function $(l,f){if(1&l&&(t.TgZ(0,"mat-tab"),t.YNc(1,D,4,3,"div",5),t.YNc(2,k,3,2,"div",5),t.YNc(3,B,3,2,"div",5),t.YNc(4,Y,4,4,"div",5),t.qZA()),2&l){const n=f.$implicit;t.xp6(1),t.Q6J("ngIf","html"===n.type),t.xp6(1),t.Q6J("ngIf","grid"===n.type),t.xp6(1),t.Q6J("ngIf","list"===n.type),t.xp6(1),t.Q6J("ngIf","table"===n.type)}}function N(l,f){1&l&&(t.TgZ(0,"mat-icon",7),t._uU(1,"comment"),t.qZA(),t.TgZ(2,"h3",8),t._uU(3,"Komentar"),t.qZA())}function Q(l,f){1&l&&(t.TgZ(0,"div",10),t._UZ(1,"app-discussion"),t.qZA())}function q(l,f){1&l&&t._UZ(0,"app-no-data",10)}let W=(()=>{class l{constructor(n){this.gs=n,this.count=0,this.serverSide=!1,this.serverSideFilter=new t.vpe,this.serverSideOrder=new t.vpe,this.SWIPE_ACTION={LEFT:"swipeleft",RIGHT:"swiperight"},this.selectedIndexTab=0,this.totalTabsCount=2,this.tabData=[],this.gridPageFinished=!1,this.listPageFinished=!1,this.chipClicked=new t.vpe,this.buttonClicked=new t.vpe,this.gridClicked=new t.vpe,this.listClicked=new t.vpe,this.gridLoadNextPage=new t.vpe,this.listLoadNextPage=new t.vpe,this.tableRowClicked=new t.vpe,this.paginatorClicked=new t.vpe}get GS(){return this.gs}ngOnInit(){}ngAfterViewInit(){this.totalTabsCount=this.tabData.length}get backgroundColor(){return this.gs.isDarkMode?"gelap":"terang"}swipe(n){n===this.SWIPE_ACTION.RIGHT&&this.selectedIndexTab>0?this.selectedIndexTab--:n===this.SWIPE_ACTION.LEFT&&this.selectedIndexTab<this.totalTabsCount&&this.selectedIndexTab++}onGridClicked(n){this.gridClicked.emit(n)}onListClicked(n){this.listClicked.emit(n)}onGridLoadNextPage(){this.gridLoadNextPage.emit()}onListLoadNextPage(){this.listLoadNextPage.emit()}onTableRowClicked(n){this.tableRowClicked.emit(n)}onChipClicked(n){this.chipClicked.emit(n)}onButtonClicked(n){this.buttonClicked.emit(n)}onPaginatorClicked(n){this.paginatorClicked.emit(n)}onServerSideFilter(n){this.serverSideFilter.emit(n)}onServerSideOrder(n){this.serverSideOrder.emit(n)}}return l.\u0275fac=function(n){return new(n||l)(t.Y36(b.U))},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-material-tab"]],viewQuery:function(n,u){if(1&n&&t.Gf(d.SP,5),2&n){let T;t.iGM(T=t.CRH())&&(u.tabGroup=T.first)}},inputs:{count:"count",serverSide:"serverSide",tabData:"tabData",gridPageFinished:"gridPageFinished",listPageFinished:"listPageFinished"},outputs:{serverSideFilter:"serverSideFilter",serverSideOrder:"serverSideOrder",chipClicked:"chipClicked",buttonClicked:"buttonClicked",gridClicked:"gridClicked",listClicked:"listClicked",gridLoadNextPage:"gridLoadNextPage",listLoadNextPage:"listLoadNextPage",tableRowClicked:"tableRowClicked",paginatorClicked:"paginatorClicked"},decls:7,vars:4,consts:[["dynamicHeight","","mat-stroked-button","",1,"px-0",3,"color","backgroundColor","selectedIndex","swipeleft","swiperight"],[4,"ngFor","ngForOf"],["mat-tab-label",""],["matTabContent",""],["noData",""],[4,"ngIf"],[1,"p-3",3,"innerHTML"],[1,"me-3"],[1,"m-0"],["class","p-3",4,"ngIf","ngIfElse"],[1,"p-3"],[1,"p-0",3,"multiple"],["rowHeight","72px",3,"cols"],["class","col-12 text-center p-3",4,"ngIf"],[3,"click"],["matListAvatar","",1,"ms-3",2,"border-radius","0",3,"src"],["matLine",""],[1,"col-12","text-center","p-3"],["mat-button","",3,"click"],[3,"multiple"],[3,"click",4,"ngFor","ngForOf"],[3,"tableDataColumn","tableDataRow","count","serverSide","serverSideFilter","buttonClicked","chipClicked","rowClicked","paginatorClicked","serverSideOrder"]],template:function(n,u){1&n&&(t.TgZ(0,"mat-tab-group",0),t.NdJ("swipeleft",function(Z){return u.swipe(Z.type)})("swiperight",function(Z){return u.swipe(Z.type)}),t.YNc(1,$,5,4,"mat-tab",1),t.TgZ(2,"mat-tab"),t.YNc(3,N,4,0,"ng-template",2),t.YNc(4,Q,2,0,"ng-template",3),t.qZA()(),t.YNc(5,q,1,0,"ng-template",null,4,t.W1O)),2&n&&(t.Q6J("color","accent")("backgroundColor",u.backgroundColor)("selectedIndex",u.selectedIndexTab),t.xp6(1),t.Q6J("ngForOf",u.tabData))},directives:[d.SP,v.sg,d.uX,v.O5,d.uD,x.Hw,E.Ub,c.Il,c.DX,E.vS,E.eA,g.X2,o.lW,_.I,d.Vc,m.S,C.d],pipes:[A.H],styles:[""]}),l})()},6436:(P,y,r)=>{r.d(y,{L:()=>g});var t=r(9808),d=r(210),b=r(617),v=r(8764),x=r(2438),E=r(7355),c=r(5e3);let g=(()=>{class o{}return o.\u0275fac=function(m){return new(m||o)},o.\u0275mod=c.oAB({type:o}),o.\u0275inj=c.cJS({imports:[[t.ez,d.m,b.H,v.R,x.d,E.T]]}),o})()},7956:(P,y,r)=>{r.d(y,{C:()=>b});var t=r(9808),d=r(5e3);let b=(()=>{class v{}return v.\u0275fac=function(E){return new(E||v)},v.\u0275mod=d.oAB({type:v}),v.\u0275inj=d.cJS({imports:[[t.ez]]}),v})()},201:(P,y,r)=>{r.d(y,{S:()=>E});var t=r(5861),d=r(5e3),b=r(8696),v=r(3e3);let x=(()=>{class c{constructor(o,_){this.gs=o,this.bs=_,this.enabled=!0,this.kuroshiro=null,this.observer=null,this.ignoreNodes=[],this.gs.isBrowser&&(this.kuroshiro=new Kuroshiro,this.kuroshiro.init(new KuromojiAnalyzer({dictPath:"/assets/furigana/"})))}convert(o){return this.gs.log("[KUROSHIRO_CONVERT]",o),this.kuroshiro.convert(o,{mode:"furigana",to:"hiragana"})}replace(o,_){var m;const C=this.gs.document.createRange().createContextualFragment(_),A=[];return C.childNodes.forEach(O=>A.push(O)),null===(m=o.parentNode)||void 0===m||m.replaceChild(C,o),A}convertAndReplace(o){var _=this;return(0,t.Z)(function*(){if(!_.enabled||_.bs.busyRequestCount>0||!o.nodeValue.trim()||"RUBY"===o.parentNode.nodeName||!o.nodeValue.match(/[\u3400-\u9FBF]/))return;const m=yield _.convert(o.nodeValue);_.ignoreNodes.push(..._.replace(o,m))})()}watch(o){if("childList"===o.type)for(const _ of o.addedNodes)if(this.gs.log("[KUROSHIRO_NODE_WATCHER]",_),this.ignoreNodes.includes(_))this.ignoreNodes.splice(this.ignoreNodes.indexOf(_),1);else if(_ instanceof Text)this.convertAndReplace(_);else{const m=[],C=this.gs.document.createTreeWalker(_,NodeFilter.SHOW_TEXT,null);for(;C.nextNode();)m.push(C.currentNode);this.gs.log("[KUROSHIRO_NODE_WATCHER_LIST]",m);for(const A of m)this.convertAndReplace(A)}else"characterData"===o.type&&this.convertAndReplace(o.target)}}return c.\u0275fac=function(o){return new(o||c)(d.LFG(b.U),d.LFG(v.z))},c.\u0275prov=d.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})(),E=(()=>{class c{constructor(o,_,m,C){var A=this;if(this.elementRef=o,this.gs=_,this.bs=m,this.furi=C,this.changes=null,this.domChange=new d.vpe,this.gs.isBrowser){const O=this.elementRef.nativeElement;this.gs.log("[DOM_NATIVE]",O),this.changes=new MutationObserver(function(){var D=(0,t.Z)(function*(R){A.bs.busyRequestCount>0||(A.gs.log("[DOM_CHANGE]",R),A.domChange.emit(R),A.processDom(R))});return function(R){return D.apply(this,arguments)}}()),this.changes.observe(O,{subtree:!0,childList:!0})}}ngOnDestroy(){var o;null===(o=this.changes)||void 0===o||o.disconnect()}processDom(o){for(const _ of o)this.furi.watch(_)}}return c.\u0275fac=function(o){return new(o||c)(d.Y36(d.SBq),d.Y36(b.U),d.Y36(v.z),d.Y36(x))},c.\u0275dir=d.lG2({type:c,selectors:[["","appDomChange",""]],outputs:{domChange:"domChange"}}),c})()},7559:(P,y,r)=>{r.d(y,{k:()=>v});var t=r(5e3),d=r(9731),b=r(8696);let v=(()=>{class x{constructor(c,g){this.api=c,this.gs=g}getAllComment(c="",g=1,o=10,_="",m=""){return this.api.getData(`/comment?q=${c}&page=${g}&row=${o}&sort=${_}&order=${m}`)}getComment(c="",g="",o=1,_=10,m="",C=""){return this.api.getData(`/comment?path=${c}&q=${g}&page=${o}&row=${_}&sort=${m}&order=${C}`)}getReply(c,g="",o=1,_=10,m="",C=""){return this.api.getData(`/comment/${c}?q=${g}&page=${o}&row=${_}&sort=${m}&order=${C}`)}sendComment(c){return this.api.postData("/comment",c)}getHighlight(c){return this.api.patchData("/comment",c)}deleteComment(c){return this.api.deleteData(`/comment/${c}`)}}return x.\u0275fac=function(c){return new(c||x)(t.LFG(d.s),t.LFG(b.U))},x.\u0275prov=t.Yz7({token:x,factory:x.\u0275fac,providedIn:"root"}),x})()},9287:(P,y,r)=>{r.d(y,{TU:()=>v});var t=r(9808),d=r(5e3);class b{constructor(o,_){this._document=_;const m=this._textarea=this._document.createElement("textarea"),C=m.style;C.position="fixed",C.top=C.opacity="0",C.left="-999em",m.setAttribute("aria-hidden","true"),m.value=o,this._document.body.appendChild(m)}copy(){const o=this._textarea;let _=!1;try{if(o){const m=this._document.activeElement;o.select(),o.setSelectionRange(0,o.value.length),_=this._document.execCommand("copy"),m&&m.focus()}}catch(m){}return _}destroy(){const o=this._textarea;o&&(o.remove(),this._textarea=void 0)}}let v=(()=>{class g{constructor(_){this._document=_}copy(_){const m=this.beginCopy(_),C=m.copy();return m.destroy(),C}beginCopy(_){return new b(_,this._document)}}return g.\u0275fac=function(_){return new(_||g)(d.LFG(t.K0))},g.\u0275prov=d.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),g})()}}]);