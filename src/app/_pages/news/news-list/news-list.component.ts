import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../_shared/services/global.service';
import { NewsService } from '../../../_shared/services/news.service';
import { FabService } from '../../../_shared/services/fab.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {

  newsData = [];

  tabData: any = [
    {
      name: 'Semua Berita & Informasi',
      icon: 'file_copy',
      type: 'table',
      data: {
        column: ['Tanggal', 'Image', 'Topik', 'Penulis'],
        row: []
      }
    }
  ];

  count = 0;
  page = 1;
  row = 10;
  q = '';

  subsNews = null;

  constructor(
    private router: Router,
    private gs: GlobalService,
    private bs: BusyService,
    private news: NewsService,
    private fs: FabService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    if (this.subsNews) {
      this.subsNews.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.bs.busy();
    this.subsNews = this.news.getAllNews(this.q, this.page, this.row).subscribe(
      res => {
        this.gs.log('[NEWS_LIST_SUCCESS]', res);
        this.count = res.count;
        this.newsData = [];
        for (const r of res.results) {
          this.newsData.push({
            id: r.id,
            Topik: r.title,
            Image: r.image_url,
            Tanggal: r.created_at,
            Penulis: r.user_.username,
            foto: r.user_.image_url
          });
        }
        this.tabData[0].data.row = this.newsData;
        this.fs.initializeFab('add', null, 'Tambah Berita Baru', `/news/create`, false);
        this.bs.idle();
      },
      err => {
        this.gs.log('[NEWS_LIST_ERROR]', err);
        this.bs.idle();
      }
    );
  }

  openNews(data): void {
    this.gs.log('[NEWS_LIST_CLICK_NEWS]', data);
    this.router.navigateByUrl(`/news/${data.id}`);
  }

  onPaginatorClicked(data): void {
    this.gs.log('[NEWS_LIST_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getNews();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[NEWS_LIST_ENTER_FILTER]', data);
    this.q = data;
    this.getNews();
  }

}
