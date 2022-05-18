import { Component, OnDestroy, OnInit } from '@angular/core';

import { GlobalService } from '../../../_shared/services/global.service';
import { FansubService } from '../../../_shared/services/fansub.service';
import { BusyService } from '../../../_shared/services/busy.service';
import { WinboxService } from '../../../_shared/services/winbox.service';

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
        column: ['Tanggal', 'Fansub', 'Judul Surat Kabar'],
        row: []
      }
    }
  ];

  count = 0;
  page = 1;
  row = 10;

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
    this.subsRssFeed = this.fansub.getRssFeedFansubAll().subscribe({
      next: res => {
        this.gs.log('[RSS_FEED_LIST_SUCCESS]', res);
        this.count = res.count;
        this.rssFeedData = [];
        for (const r of res.results) {
          this.rssFeedData.push({
            link: r.item?.link,
            Fansub: r.slug,
            Tanggal: r.item?.created || r.item?.published,
            'Judul Surat Kabar': r.item?.title
          });
        }
        this.tabData[0].data.row = this.rssFeedData;
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[RSS_FEED_LIST_ERROR]', err);
        this.bs.idle();
      }
    });
  }

  openRssFeed(data): void {
    this.gs.log('[RSS_FEED_LIST_OPEN_URL]', data);
    this.wb.winboxOpenUri(this.gs.rssLink(data.link));
  }

}
