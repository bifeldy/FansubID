import { Component, OnDestroy, OnInit } from '@angular/core';

import { GlobalService } from '../../_shared/services/global.service';
import { FansubService } from '../../_shared/services/fansub.service';
import { BusyService } from '../../_shared/services/busy.service';
import { WinboxService } from '../../_shared/services/winbox.service';

@Component({
  selector: 'app-rss-feed-list',
  templateUrl: './rss-feed-list.component.html',
  styleUrls: ['./rss-feed-list.component.css']
})
export class RssFeedListComponent implements OnInit, OnDestroy {

  rssFeedData = [];

  tabData: any = [
    {
      name: 'Loper Koran',
      icon: 'rss_feed',
      type: 'table',
      data: {
        column: ['Tanggal', 'Fansub', 'Topik'],
        row: []
      }
    }
  ];

  count = 0;
  page = 1;
  row = 10;

  tablePageSizeOptions = [50, 75, 100, 125, 150];

  q = '';
  sort = '';
  order = '';

  subsRssFeed = null;

  constructor(
    private gs: GlobalService,
    private bs: BusyService,
    private fansub: FansubService,
    private wb: WinboxService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      if (!this.gs.isDesktop) {
        this.tablePageSizeOptions = [10, 25, 50, 75, 100];
      }
      this.row = this.tablePageSizeOptions[0];
      this.getRssFeed();
    }
  }

  ngOnDestroy(): void {
    this.subsRssFeed?.unsubscribe();
  }

  getRssFeed(): void {
    this.bs.busy();
    if (this.subsRssFeed) {
      this.subsRssFeed.unsubscribe();
      this.bs.idle();
    }
    this.subsRssFeed = this.fansub.getRssFeedFansubAll(null, this.q, this.page, this.row, this.sort, this.order).subscribe({
      next: res => {
        this.gs.log('[RSS_FEED_LIST_SUCCESS]', res);
        this.count = res.count;
        this.rssFeedData = [];
        for (const r of res.results) {
          this.rssFeedData.push({
            foto_fansub: r.fansub_.image_url,
            url: r.fansub_.urls['web'],
            link: r.link,
            Fansub: r.fansub_.slug,
            Tanggal: r.created_at,
            Topik: r.title
          });
        }
        this.tabData[0].data.row = this.rssFeedData;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[RSS_FEED_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  openRssFeed(data): void {
    this.gs.log('[RSS_FEED_LIST_OPEN_URL]', data);
    const domain: string = data.url;
    if (domain) {
      const url = new URL(domain);
      let uri = `${url.protocol}//${url.host}`;
      if (!data.link.startsWith('/')) {
        uri += '/';
      }
      uri += data.link;
      this.wb.winboxOpenUri(uri);
    }
  }

  onPaginatorClicked(data): void {
    this.gs.log('[RSS_FEED_CLICK_PAGINATOR]', data);
    this.page = data.pageIndex + 1;
    this.row = data.pageSize;
    this.getRssFeed();
  }

  onServerSideFilter(data: any): void {
    this.gs.log('[RSS_FEED_ENTER_FILTER]', data);
    this.q = data;
    this.getRssFeed();
  }

  onServerSideOrder(data: any): void {
    this.gs.log('[RSS_FEED_CLICK_ORDER]', data);
    this.q = data.q;
    this.sort = data.active;
    this.order = data.direction;
    this.getRssFeed();
  }

}
