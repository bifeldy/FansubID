import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../_shared/services/global.service';
import { NewsService } from '../../_shared/services/news.service';
import { BusyService } from '../../_shared/services/busy.service';
import { KomentarService } from '../../_shared/services/komentar.service';
import { FansubService } from '../../_shared/services/fansub.service';
import { WinboxService } from '../../_shared/services/winbox.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  newsData = [];
  komentarData = [];
  rssFeedData = [];

  subsNews = null;
  subsKomenGet = null;
  subsRssFeed = null;

  constructor(
    private router: Router,
    private gs: GlobalService,
    private news: NewsService,
    private komen: KomentarService,
    private fansub: FansubService,
    private bs: BusyService,
    private wb: WinboxService
  ) {
    this.gs.bannerImg = '/assets/img/banner/home.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get GS(): GlobalService {
    return this.gs;
  }

  ngOnDestroy(): void {
    this.subsNews?.unsubscribe();
    this.subsKomenGet?.unsubscribe();
    this.subsRssFeed?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getNews();
      this.getComment();
      this.getRssFeedAll();
    }
  }

  getNews(): void {
    this.bs.busy();
    this.subsNews = this.news.getAllNews('', 1, 3).subscribe({
      next: res => {
        this.gs.log('[HOME_NEWS_LIST_SUCCESS]', res);
        this.newsData = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[HOME_NEWS_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getComment(): void {
    this.bs.busy();
    this.subsKomenGet = this.komen.getAllComment().subscribe({
      next: res => {
        this.gs.log('[HOME_KOMENTAR_LIST_SUCCESS]', res);
        this.komentarData = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[HOME_KOMENTAR_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getRssFeedAll(): void {
    this.bs.busy();
    this.subsRssFeed = this.fansub.getRssFeedFansubAllActiveOnly().subscribe({
      next: res => {
        this.gs.log('[HOME_RSS_FEED_LIST_SUCCESS]', res);
        this.rssFeedData = res.results;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[HOME_RSS_FEED_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  openRssFeed(link: string): void {
    this.wb.winboxOpenUri(this.gs.rssLink(link));
  }

  openComment(k): void {
    this.router.navigate([k.path], {
      queryParams: {
        comment: k.id
      }
    });
  }

}
