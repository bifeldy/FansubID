import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

import { GlobalService } from '../../_shared/services/global.service';
import { NewsService } from '../../_shared/services/news.service';
import { BusyService } from '../../_shared/services/busy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  newsData = [];

  subsNews = null;

  constructor(
    public gs: GlobalService,
    private news: NewsService,
    private bs: BusyService
  ) {
    this.gs.bannerImg = '/assets/img/home-banner.png';
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    this.subsNews?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getNews();
    }
  }

  getNews(): void {
    this.bs.busy();
    this.subsNews = this.news.getAllNews('', 1, 4).subscribe({
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

}
