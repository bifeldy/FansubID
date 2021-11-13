import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../services/global.service';
import { KomentarService } from '../../services/komentar.service';
import { AuthService } from '../../services/auth.service';

import { Komentar } from '../../models/Komentar';

import User from '../../models/User';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit, OnDestroy {

  currentUser: User = null;

  urlPath = null;

  count = 0;
  page = 1;
  pageFinished = false;

  @Input() rootCommentBox = false;
  commentToSend = null;

  @Input() parent = null;

  @Input() komentar: Komentar[] = [];

  subsUser = null;
  subsKomenSend = null;
  subsKomenGetKomen = null;
  subsKomenGetReply = null;

  constructor(
    private router: Router,
    private komen: KomentarService,
    public gs: GlobalService,
    public as: AuthService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({ next: user => this.currentUser = user });
      this.urlPath = this.router.url;
      this.getComment(true);
    }
  }

  ngOnDestroy(): void {
    this.subsUser?.unsubscribe();
    this.subsKomenSend?.unsubscribe();
    this.subsKomenGetKomen?.unsubscribe();
    this.subsKomenGetReply?.unsubscribe();
    this.urlPath = null;
  }

  sendComment(k: Komentar): void {
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
        this.gs.log('[KOMENTAR_CREATE_REPLY_ERROR]', err);
      }
    });
  }

  getComment(fresh = false): void {
    if (!this.parent) {
      if (fresh) {
        this.page = 1;
        this.pageFinished = false;
      }
      this.subsKomenGetKomen = this.komen.getComment(this.urlPath, '', this.page).subscribe({
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
          this.gs.log('[KOMENTAR_LIST_ERROR]', err);
        }
      });
    }
  }

  getReply(k: Komentar, fresh = false): void {
    this.gs.log('[KOMENTAR_PARENT_LOAD_REPLY]', k);
    if (fresh) {
      k.reply_page = 1;
      k.reply_page_finised = false;
    }
    this.subsKomenGetReply = this.komen.getReply(k.id, '', k.reply_page).subscribe({
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
        this.gs.log('[REPLY_LIST_ERROR]', err);
        k.reply = [];
      }
    });
  }

  showHideComment(k: Komentar): void {
    if (k.show_reply === undefined || k.show_reply === null) {
      k.show_reply = true;
    } else {
      k.show_reply = !k.show_reply;
    }
    if (k.show_reply) {
      this.getReply(k, true);
    }
  }

  showHideCommentBox(k: Komentar): void {
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

  loadNextPageReply(k: Komentar): void {
    if (!k.reply_page_finised) {
      if (!k.reply_page) {
        k.reply_page = 1;
      }
      k.reply_page++;
      this.getReply(k);
    }
  }

  openUserProfile(k: Komentar): void {
    this.router.navigateByUrl(`/user/${k.user_.username}`);
  }

}
