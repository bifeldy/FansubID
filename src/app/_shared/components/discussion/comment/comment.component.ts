import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../../../../environments/app/environment';

import { KomentarModel } from '../../../../../models/req-res.model';

import { GlobalService } from '../../../services/global.service';
import { KomentarService } from '../../../services/komentar.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnDestroy {

  urlPath = null;

  count = 0;
  page = 1;
  @Input() row = 10;
  pageFinished = false;

  @Input() recursionCount = 0;

  @Input() rootCommentBox = false;
  commentToSend = null;

  @Input() parent = null;

  @Input() komentar: KomentarModel[] = [];

  subsKomenSend = null;
  subsKomenGetKomen = null;
  subsKomenGetReply = null;
  subsDelete = null;
  subsRouter = null;

  constructor(
    private clipboard: Clipboard,
    private router: Router,
    private snackBar: MatSnackBar,
    private komen: KomentarService,
    private gs: GlobalService,
    private as: AuthService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get AS(): AuthService {
    return this.as;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      if (this.recursionCount === 0) {
        this.reloadComponent();
      }
      this.subsRouter = this.router.events.subscribe({
        next: evt => {
          if (evt instanceof NavigationEnd) {
            this.reloadComponent();
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subsKomenSend?.unsubscribe();
    this.subsKomenGetKomen?.unsubscribe();
    this.subsKomenGetReply?.unsubscribe();
    this.subsDelete?.unsubscribe();
    this.subsRouter?.unsubscribe();
    this.urlPath = null;
  }

  reloadComponent(): void {
    this.urlPath = this.router.url.split('?')[0];
    this.getComment(true);
  }

  sendComment(k: KomentarModel): void {
    this.gs.log('[KOMENTAR_PARENT_CREATE_REPLY]', k);
    const commentData = (k) ? {
      path: this.urlPath,
      comment: k.reply_to_send,
      parent: k.id
    } : {
      path: this.urlPath,
      comment: this.commentToSend
    };
    this.subsKomenSend = this.komen.sendComment(commentData).subscribe({
      next: res => {
        this.gs.log('[KOMENTAR_CREATE_REPLY_SUCCESS]', res);
        if (k) {
          k.reply_to_send = null;
          k.reply_mode = false;
          this.getReply(k, true);
        } else {
          this.commentToSend = null;
          this.getComment(true);
        }
      },
      error: err => {
        this.gs.log('[KOMENTAR_CREATE_REPLY_ERROR]', err, 'error');
      }
    });
  }

  getComment(fresh = false): void {
    if (!this.parent) {
      if (fresh) {
        this.page = 1;
        this.pageFinished = false;
      }
      this.subsKomenGetKomen = this.komen.getComment(this.urlPath, '', this.page, this.row).subscribe({
        next: res => {
          this.gs.log('[KOMENTAR_LIST_SUCCESS]', res);
          this.count = res.count;
          if (fresh) {
            this.komentar = res.results;
          } else {
            this.komentar = [...this.komentar, ...res.results];
          }
          if (res.results.length <= 0) {
            this.pageFinished = true;
          }
        },
        error: err => {
          this.gs.log('[KOMENTAR_LIST_ERROR]', err, 'error');
        }
      });
    }
  }

  getReply(k: KomentarModel, fresh = false): void {
    this.gs.log('[KOMENTAR_PARENT_LOAD_REPLY]', k);
    if (fresh) {
      k.reply_page = 1;
      k.reply_page_finised = false;
    }
    this.subsKomenGetReply = this.komen.getReply(k.id, '', k.reply_page, this.row).subscribe({
      next: res => {
        this.gs.log('[REPLY_LIST_SUCCESS]', res);
        if (fresh) {
          k.reply = res.results;
        } else {
          k.reply = [...k.reply, ...res.results];
        }
        k.reply_count = res.count;
        if (res.results.length <= 0) {
          k.reply_page_finised = true;
        }
      },
      error: err => {
        this.gs.log('[REPLY_LIST_ERROR]', err, 'error');
        k.reply = [];
      }
    });
  }

  showHideComment(k: KomentarModel): void {
    if (k.show_reply === undefined || k.show_reply === null) {
      k.show_reply = true;
    } else {
      k.show_reply = !k.show_reply;
    }
    if (k.show_reply) {
      this.getReply(k, true);
    }
  }

  showHideCommentBox(k: KomentarModel): void {
    if (k.reply_mode === undefined || k.reply_mode === null) {
      k.reply_mode = true;
    } else {
      k.reply_mode = !k.reply_mode;
    }
  }

  loadNextPage(): void {
    if (!this.parent) {
      this.loadNextPageComment();
    } else {
      this.loadNextPageReply(this.parent);
    }
  }

  loadNextPageComment(): void {
    if (!this.pageFinished) {
      this.page++;
      this.getComment();
    }
  }

  loadNextPageReply(k: KomentarModel): void {
    if (!k.reply_page_finised) {
      if (!k.reply_page) {
        k.reply_page = 1;
      }
      k.reply_page++;
      this.getReply(k);
    }
  }

  openUserProfile(k: KomentarModel): void {
    this.router.navigateByUrl(`/user/${k.user_.username}`);
  }

  copyCommentLink(k: KomentarModel): void {
    const url = (k.path.startsWith('/') ? environment.baseUrl : '') + k.path;
    if (this.clipboard.copy(`${url}?comment=${k.id}`)) {
      this.snackBar.open(`URL Komentar :: Telah Di Salin Pada Clipboard`, 'Ok');
    }
  }

  deleteComment(k: KomentarModel): void {
    this.gs.log('[KOMENTAR_DELETE_COMMENT]', k);
    this.subsDelete = this.komen.deleteComment(k.id).subscribe({
      next: res => {
        this.gs.log('[KOMENTAR_DELETE_SUCCESS]', res);
        if (this.parent) {
          this.getReply(this.parent, true);
        } else {
          this.getComment(true);
        }
      },
      error: err => {
        this.gs.log('[KOMENTAR_DELETE_ERROR]', err, 'error');
        if (this.parent) {
          this.getReply(this.parent, true);
        } else {
          this.getComment(true);
        }
      }
    });
  }

  reportComment(k: KomentarModel): void {
    this.gs.log('[KOMENTAR_REPORT_COMMENT]', k);
    const url = (k.path.startsWith('/') ? environment.baseUrl : '') + k.path;
    this.router.navigate(['/create/ticket'], {
      queryParams: {
        url: `${url}?comment=${k.id}`
      }
    });
  }

}
