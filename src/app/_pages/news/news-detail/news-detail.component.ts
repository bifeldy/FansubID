import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WARNA } from '../../../../models/warna';

import { GlobalService } from '../../../_shared/services/global.service';
import { FabService } from '../../../_shared/services/fab.service';
import { NewsService } from '../../../_shared/services/news.service';
import { PageInfoService } from '../../../_shared/services/page-info.service';
import { BusyService } from '../../../_shared/services/busy.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit, OnDestroy {

  newsId = 0;
  newsData = null;

  chipData = [];

  subsActRoute = null;
  subsNews = null;
  subsParam = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bs: BusyService,
    private gs: GlobalService,
    private fs: FabService,
    private pi: PageInfoService,
    private news: NewsService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  ngOnDestroy(): void {
    this.subsActRoute?.unsubscribe();
    this.subsNews?.unsubscribe();
    this.subsParam?.unsubscribe();
  }

  ngOnInit(): void {
    this.subsParam = this.activatedRoute.params.subscribe({
      next: p => {
        this.newsId = Number(p['newsId']);
        this.bs.busy();
        this.subsNews = this.news.getNews(this.newsId).subscribe({
          next: res => {
            this.gs.log('[NEWS_DETAIL_SUCCESS]', res);
            this.newsData = res.result;
            this.pi.updatePageMetaData(
              `${this.newsData.title}`,
              `${this.newsData.content}`,
              `${Array.isArray(this.newsData.tags) ? this.newsData.tags.join(', ') : this.newsData.title}`,
              this.newsData.image_url,
              this.newsData.user_.username
            );
            this.bs.idle();
            if (this.gs.isBrowser) {
              if (Array.isArray(this.newsData.tags)) {
                for (let i = 0; i < this.newsData.tags.length; i++) {
                  this.chipData.push({ id_tag: i, name: this.newsData.tags[i], color: WARNA.PINK, selected: true });
                }
              }
              this.fs.initializeFab('edit', null, 'Ubah Data Berita', `/news/${this.newsId}/edit`, false);
            }
          },
          error: err => {
            this.gs.log('[NEWS_DETAIL_ERROR]', err, 'error');
            this.bs.idle();
            this.router.navigate(['/error'], {
              queryParams: {
                returnUrl: '/news'
              }
            });
          }
        });
      }
    });
  }

  openTag(data): void {
    this.gs.log('[FANSUB_DETAIL_OPEN_TAG]', data);
  }

}
