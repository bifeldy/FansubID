import { Component, OnDestroy, OnInit } from '@angular/core';

import { GlobalService } from '../../_shared/services/global.service';
import { NewsService } from '../../_shared/services/news.service';
import { BusyService } from '../../_shared/services/busy.service';
import { KomentarService } from '../../_shared/services/komentar.service';
import { FansubService } from '../../_shared/services/fansub.service';

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
    private gs: GlobalService,
    private news: NewsService,
    private komen: KomentarService,
    private fansub: FansubService,
    private bs: BusyService
  ) {
    this.gs.bannerImg = '/assets/img/home-banner.png';
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
        this.gs.log('[HOME_NEWS_LIST_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  getComment(): void {
    this.subsKomenGet = this.komen.getAllComment().subscribe({
      next: res => {
        this.gs.log('[HOME_KOMENTAR_LIST_SUCCESS]', res);
        this.komentarData = res.results;
      },
      error: err => {
        this.gs.log('[HOME_KOMENTAR_LIST_ERROR]', err);
      }
    });
  }

  getRssFeedAll(): void {
    this.subsRssFeed = this.fansub.getRssFeedFansubAll().subscribe({
      next: res => {
        this.gs.log('[HOME_RSS_FEED_LIST_SUCCESS]', res);
        this.rssFeedData = res.results;
      },
      error: err => {
        this.gs.log('[HOME_RSS_FEED_LIST_ERROR]', err);
      }
    });
  }

}
