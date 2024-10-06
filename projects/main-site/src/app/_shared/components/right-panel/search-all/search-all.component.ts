import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GlobalService } from '../../../services/global.service';
import { NewsService } from '../../../services/news.service';
import { DialogService } from '../../../services/dialog.service';
import { NihongoService } from '../../../services/nihongo.service';
import { AnimeService } from '../../../services/anime.service';
import { DoramaService } from '../../../services/dorama.service';
import { FansubService } from '../../../services/fansub.service';
import { BerkasService } from '../../../services/berkas.service';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { WinboxService } from '../../../services/winbox.service';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit, OnDestroy {

  searchResult = {
    q: '',
    beritaResults: [],
    kanjiResults: [],
    animeResults: [],
    doramaResults: [],
    fansubResults: [],
    rssResults: [],
    berkasResults: [],
    penggunaResults: []
  };

  subsQueryParam = null;
  subsBerita = null;
  subsKanji = null;
  subsAnime = null;
  subsDorama = null;
  subsFansub = null;
  subsRss = null;
  subsBerkas = null;
  subsPengguna = null;
  subsDialog = null;

  timedOut1 = null;
  timedOut2 = null;
  timedOut3 = null;
  timedOut4 = null;
  timedOut5 = null;
  timedOut6 = null;
  timedOut7 = null;
  timedOut8 = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gs: GlobalService,
    private news: NewsService,
    private ds: DialogService,
    private nihon: NihongoService,
    private anime: AnimeService,
    private dorama: DoramaService,
    private fansub: FansubService,
    private berkas: BerkasService,
    private user: UserService,
    private ls: LocalStorageService,
    private wb: WinboxService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  get ROUTER(): Router {
    return this.router;
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      const lsObj = this.ls.getItem(this.gs.localStorageKeys.SearchResults, true);
      if (lsObj) {
        for (const [key, value] of Object.entries(lsObj)) {
          this.searchResult[key] = value;
        }
      }
      this.watchUrlRoute();
    }
  }

  ngOnDestroy(): void {
    this.ls.setItem(this.gs.localStorageKeys.SearchResults, this.searchResult);
    this.subsQueryParam?.unsubscribe();
    this.subsBerita?.unsubscribe();
    this.subsKanji?.unsubscribe();
    this.subsAnime?.unsubscribe();
    this.subsDorama?.unsubscribe();
    this.subsFansub?.unsubscribe();
    this.subsRss?.unsubscribe();
    this.subsBerkas?.unsubscribe();
    this.subsPengguna?.unsubscribe();
    this.subsDialog?.unsubscribe();
    if (this.timedOut1) {
      clearTimeout(this.timedOut1);
      this.timedOut1 = null;
    }
    if (this.timedOut2) {
      clearTimeout(this.timedOut2);
      this.timedOut2 = null;
    }
    if (this.timedOut3) {
      clearTimeout(this.timedOut3);
      this.timedOut3 = null;
    }
    if (this.timedOut4) {
      clearTimeout(this.timedOut4);
      this.timedOut4 = null;
    }
    if (this.timedOut5) {
      clearTimeout(this.timedOut5);
      this.timedOut5 = null;
    }
    if (this.timedOut6) {
      clearTimeout(this.timedOut6);
      this.timedOut6 = null;
    }
    if (this.timedOut7) {
      clearTimeout(this.timedOut7);
      this.timedOut7 = null;
    }
    if (this.timedOut8) {
      clearTimeout(this.timedOut8);
      this.timedOut8 = null;
    }
  }

  watchUrlRoute(): void {
    this.subsQueryParam = this.activatedRoute.queryParams.subscribe({
      next: qp => {
        const searchQuery = qp['q'];
        if (searchQuery) {
          this.searchResult.q = searchQuery;
          this.search();
        }
      }
    });
  }

  search () {
    this.searchResult.beritaResults = [];
    this.searchResult.kanjiResults = [];
    this.searchResult.animeResults = [];
    this.searchResult.doramaResults = [];
    this.searchResult.fansubResults = [];
    this.searchResult.rssResults = [];
    this.searchResult.berkasResults = [];
    this.searchResult.penggunaResults = [];
    this.timedOut1 = setTimeout(() => { this.getNews(); }, 1000);
    this.timedOut2 = setTimeout(() => { this.getKanji(); }, 1000);
    this.timedOut3 = setTimeout(() => { this.getAnime(); }, 1000);
    this.timedOut4 = setTimeout(() => { this.getDorama(); }, 1000);
    this.timedOut5 = setTimeout(() => { this.getFansub(); }, 1000);
    this.timedOut6 = setTimeout(() => { this.getBerkas(); }, 1000);
    this.timedOut7 = setTimeout(() => { this.getPengguna(); }, 1000);
    this.timedOut7 = setTimeout(() => { this.getRss(); }, 1000);
  }

  applyFilter(event = null): void {
    this.gs.log('[SEARCH_VALUE_CHANGED]', event);
    const searchQuery = (event.target as HTMLInputElement).value?.trim().toLowerCase();
    const urlPath = this.router.url.split('?')[0];
    if (urlPath.includes('/search')) {
      this.router.navigate(['/search'], {
        queryParams: {
          ...this.activatedRoute.snapshot.queryParams,
          q: searchQuery
        }
      });
    } else {
      if (searchQuery) {
        this.searchResult.q = searchQuery;
        this.search();
      }
    }
  }

  openEdict(kana): void {
    this.gs.log('[HIRAKATA_OPEN_EDICT]', kana);
    this.subsDialog = this.ds.openEdictDialog({
      data: {
        character: kana.character,
        context: kana.context,
        freq: kana.freq,
        gakken: kana.gakken,
        harlpern_kkld: kana.harlpern_kkld,
        harlpern_njecd: kana.harlpern_njecd,
        jlpt: kana.jlpt,
        maniette: kana.maniette,
        nelson_c: kana.nelson_c,
        nelson_n: kana.nelson_n,
        remember: kana.remember,
        school: kana.school,
        skip: kana.skip,
        stroke: kana.stroke,
        translate: kana.translate,
        v_kunyomi: kana.v_kunyomi,
        v_onyomi: kana.v_onyomi
      },
      disableClose: false
    }).afterClosed().subscribe({
      next: re => {
        this.gs.log('[EDICT_DIALOG_CLOSED]', re);
        this.subsDialog.unsubscribe();
      }
    });
  }

  getNews(): void {
    if (this.subsBerita) {
      this.subsBerita.unsubscribe();
    }
    this.subsBerita = this.news.getAllNews(this.searchResult.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[NEWS_SEARCH_SUCCESS]', res);
        this.searchResult.beritaResults = res.results;
      },
      error: err => {
        this.gs.log('[NEWS_SEARCH_ERROR]', err, 'error');
      }
    });
  }

  getKanji(): void {
    if (this.subsKanji) {
      this.subsKanji.unsubscribe();
    }
    this.subsKanji = this.nihon.getAllKanji('', '', this.searchResult.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[KANJI_SEARCH_SUCCESS]', res);
        this.searchResult.kanjiResults = res.results;
      },
      error: err => {
        this.gs.log('[KANJI_SEARCH_ERROR]', err, 'error');
      }
    });
  }

  getAnimeTitle(title: string): string {
    return title.replace(/[^a-zA-Z0-9]/g, '-');
  }

  getAnime(): void {
    if (this.subsAnime) {
      this.subsAnime.unsubscribe();
    }
    this.subsAnime = this.anime.searchAnime(this.searchResult.q).subscribe({
      next: res => {
        this.gs.log('[ANIME_SEARCH_SUCCESS]', res);
        this.searchResult.animeResults = res.results;
      },
      error: err => {
        this.gs.log('[ANIME_SEARCH_ERROR]', err, 'error');
      }
    });
  }

  getDorama(): void {
    if (this.subsDorama) {
      this.subsDorama.unsubscribe();
    }
    this.subsDorama = this.dorama.searchDorama(this.searchResult.q).subscribe({
      next: res => {
        this.gs.log('[DORAMA_SEARCH_SUCCESS]', res);
        this.searchResult.doramaResults = res.results;
      },
      error: err => {
        this.gs.log('[DORAMA_SEARCH_ERROR]', err, 'error');
      }
    });
  }

  getFansub(): void {
    if (this.subsFansub) {
      this.subsFansub.unsubscribe();
    }
    this.subsFansub = this.fansub.searchFansub(this.searchResult.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[FANSUB_SEARCH_SUCCESS]', res);
        this.searchResult.fansubResults = res.results;
      },
      error: err => {
        this.gs.log('[FANSUB_SEARCH_ERROR]', err, 'error');
      }
    });
  }

  getBerkas(): void {
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
    }
    this.subsBerkas = this.berkas.getAllBerkas(this.searchResult.q, 1, 5, '', '', true).subscribe({
      next: res => {
        this.gs.log('[BERKAS_SEARCH_SUCCESS]', res);
        this.searchResult.berkasResults = res.results;
      },
      error: err => {
        this.gs.log('[BERKAS_SEARCH_ERROR]', err, 'error');
      }
    });
  }

  getPengguna(): void {
    if (this.subsPengguna) {
      this.subsPengguna.unsubscribe();
    }
    this.subsPengguna = this.user.getAllUser(this.searchResult.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[PENGGUNA_SEARCH_SUCCESS]', res);
        this.searchResult.penggunaResults = res.results;
      },
      error: err => {
        this.gs.log('[PENGGUNA_SEARCH_ERROR]', err, 'error');
      }
    });
  }

  getRss(): void {
    if (this.subsRss) {
      this.subsRss.unsubscribe();
    }
    this.subsRss = this.fansub.getRssFeedFansubAll(null, this.searchResult.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[RSS_SEARCH_SUCCESS]', res);
        this.searchResult.rssResults = res.results;
      },
      error: err => {
        this.gs.log('[RSS_SEARCH_ERROR]', err, 'error');
      }
    });
  }

  openRssFeed(data): void {
    this.gs.log('[RSS_FEED_LIST_OPEN_URL]', data);
    const domain: string = data.fansub_.urls['web'];
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

}
