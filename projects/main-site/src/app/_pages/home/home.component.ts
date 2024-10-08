import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../environments/app/environment';

import { Menu } from '../../../models/menu';

import { GlobalService } from '../../_shared/services/global.service';
import { LeftMenuService } from '../../_shared/services/left-menu.service';
import { NewsService } from '../../_shared/services/news.service';
import { BusyService } from '../../_shared/services/busy.service';
import { KomentarService } from '../../_shared/services/komentar.service';
import { FansubService } from '../../_shared/services/fansub.service';
import { WinboxService } from '../../_shared/services/winbox.service';
import { FabService } from '../../_shared/services/fab.service';
import { AuthService } from '../../_shared/services/auth.service';
import { BerkasService } from '../../_shared/services/berkas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  newsData = [];
  komentarData = [];
  allBerkasId = [];
  berkasData = [];
  rssFeedData = [];

  subsNews = null;
  subsKomenGet = null;
  subsBerkas = null;
  subsTrusted = null;
  subsRssFeed = null;
  subsUser = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gs: GlobalService,
    private as: AuthService,
    private lms: LeftMenuService,
    private news: NewsService,
    private komen: KomentarService,
    private fansub: FansubService,
    private berkas: BerkasService,
    private bs: BusyService,
    private wb: WinboxService,
    private fs: FabService
  ) {
    this.gs.bannerImg = null;
    this.gs.sizeContain = false;
    this.gs.bgRepeat = false;
  }

  get ENV(): any {
    return environment;
  }

  get GS(): GlobalService {
    return this.gs;
  }

  get contentMenus(): Menu[] {
    return this.lms.contentMenus;
  }

  ngOnDestroy(): void {
    this.subsNews?.unsubscribe();
    this.subsKomenGet?.unsubscribe();
    this.subsBerkas?.unsubscribe();
    this.subsTrusted?.unsubscribe();
    this.subsRssFeed?.unsubscribe();
    this.subsUser?.unsubscribe();
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.getBerkas();
      this.getRssFeed();
      this.subsUser = this.as.currentUser.subscribe({
        next: user => {
          if (user) {
            this.getNews();
            this.getComment();
          }
        }
      });
      this.fs.initializeFab(null, '/assets/img/discord/pink.png', 'Discord Server', environment.discord.join_url, true);
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
        for (const k of this.komentarData) {
          k.comment = this.gs.htmlToText(k.comment);
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[HOME_KOMENTAR_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getBerkas(): void {
    this.bs.busy();
    this.subsBerkas = this.berkas.getAllBerkas('', 1, 12, '', '', false).subscribe({
      next: res => {
        this.gs.log('[HOME_BERKAS_LIST_SUCCESS]', res);
        this.berkasData = [];
        for (const r of res.results) {
          this.allBerkasId.push(r.id);
          this.berkasData.push(r);
        }
        if (this.allBerkasId.length > 0) {
          this.checkTrusted();
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[HOME_BERKAS_LIST_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  checkTrusted():void {
    this.bs.busy();
    this.subsTrusted = this.berkas.checkTrusted(this.allBerkasId).subscribe({
      next: res => {
        this.gs.log('[HOME_BERKAS_TRUSTED_SUCCESS]', res);
        for (const b of this.berkasData) {
          b.trusted = res.results[b.id];
        }
        this.bs.idle();
      },
      error: err => {
        this.gs.log('[HOME_BERKAS_TRUSTED_ERROR]', err, 'error');
        this.bs.idle();
      }
    });
  }

  getRssFeed(): void {
    this.bs.busy();
    this.subsRssFeed = this.fansub.getRssFeedFansubAll(true).subscribe({
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

  openRssFeed(fansub_: any, link: string): void {
    const domain: string = fansub_.urls['web'];
    if (domain) {
      const url = new URL(domain);
      let uri = `${url.protocol}//${url.host}`;
      if (!link.startsWith('/')) {
        uri += '/';
      }
      uri += link;
      this.wb.winboxOpenUri(uri);
    }
  }

  openComment(k): void {
    this.router.navigate([k.path], {
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        comment: k.id
      }
    });
  }

}
