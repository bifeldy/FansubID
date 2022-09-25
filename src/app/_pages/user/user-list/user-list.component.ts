import { Component, OnDestroy, OnInit } from '@angular/core';

import { environment } from '../../../../environments/app/environment';

import { UserModel } from '../../../../models/req-res.model';

import { GlobalService } from '../../../_shared/services/global.service';
import { AuthService } from '../../../_shared/services/auth.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { UserService } from '../../../_shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  currentUser: UserModel = null;

  feedKomentarData = [];
  feedLikeDislikeData = [];
  feedVisitData = [];

  subsUser = null;
  subsFeedKomentar = null;
  subsFeedLikeDislike = null;
  subsFeedVisit = null;

  constructor(
    private as: AuthService,
    private gs: GlobalService,
    private fs: FabService,
    private bs: BusyService,
    private us: UserService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get ENV(): any {
    return environment;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.subsUser = this.as.currentUser.subscribe({ next: user => this.currentUser = user });
      this.getUserFeedComment();
      this.getUserFeedLikeDislike();
      this.getUserFeedVisit();
      this.fs.initializeFab(
        'arrow_forward',
        null,
        'Menuju Halaman Profile',
        `/user/${this.currentUser.username}`,
        false
      );
    }
  }

  ngOnDestroy(): void {
    this.subsUser?.unsubscribe();
    this.subsFeedKomentar?.unsubscribe();
    this.subsFeedLikeDislike?.unsubscribe();
    this.subsFeedVisit?.unsubscribe();
  }

  getUserFeedComment(): void {
    this.bs.busy();
    this.subsFeedKomentar = this.us.getUserFeedComment(this.currentUser.username, '', 1, 5).subscribe({
      next: res => {
        this.gs.log('[USER_FEED_COMMENT_SUCCESS]', res);
        this.feedKomentarData = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_FEED_COMMENT_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getUserFeedLikeDislike(): void {
    this.bs.busy();
    this.subsFeedLikeDislike = this.us.getUserFeedLikeDislike(this.currentUser.username, '', 1, 5).subscribe({
      next: res => {
        this.gs.log('[USER_FEED_LIKEDISLIKE_SUCCESS]', res);
        this.feedLikeDislikeData = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_FEED_LIKEDISLIKE_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getUserFeedVisit(): void {
    this.bs.busy();
    this.subsFeedVisit = this.us.getUserFeedVisit(this.currentUser.username, '', 1, 5).subscribe({
      next: res => {
        this.gs.log('[USER_FEED_VISIT_SUCCESS]', res);
        this.feedVisitData = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[USER_FEED_VISIT_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

}
