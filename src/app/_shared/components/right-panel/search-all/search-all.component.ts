import { Component, OnDestroy, OnInit } from '@angular/core';


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

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit, OnDestroy {

  localStorageName = 'searchResults';

  searchResults = {
    q: '',
    beritaResults: [],
    kanjiResults: [],
    animeResults: [],
    doramaResults: [],
    fansubResults: [],
    berkasResults: [],
    penggunaResults: [],
  };

  subsBerita = null;
  subsKanji = null;
  subsAnime = null;
  subsDorama = null;
  subsFansub = null;
  subsBerkas = null;
  subsPengguna = null;

  constructor(
    private gs: GlobalService,
    private news: NewsService,
    private ds: DialogService,
    private nihon: NihongoService,
    private anime: AnimeService,
    private dorama: DoramaService,
    private fansub: FansubService,
    private berkas: BerkasService,
    private user: UserService,
    private ls: LocalStorageService
  ) {
    if (this.gs.isBrowser) {
      //
    }
  }

  ngOnInit(): void {
    if (this.gs.isBrowser) {
      this.searchResults = this.ls.getItem(this.localStorageName, true) || this.searchResults;
    }
  }

  ngOnDestroy(): void {
    if (this.subsBerita) {
      this.subsBerita.unsubscribe();
    }
    if (this.subsKanji) {
      this.subsKanji.unsubscribe();
    }
    if (this.subsAnime) {
      this.subsAnime.unsubscribe();
    }
    if (this.subsDorama) {
      this.subsDorama.unsubscribe();
    }
    if (this.subsFansub) {
      this.subsFansub.unsubscribe();
    }
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
    }
    if (this.subsPengguna) {
      this.subsPengguna.unsubscribe();
    }
    this.ls.setItem(this.localStorageName, this.searchResults);
  }

  applyFilter(event): void {
    this.gs.log('[SEARCH_VALUE_CHANGED]', event);
    this.searchResults.q = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchResults.beritaResults = [];
    this.searchResults.kanjiResults = [];
    this.searchResults.animeResults = [];
    this.searchResults.doramaResults = [];
    this.searchResults.fansubResults = [];
    this.searchResults.berkasResults = [];
    this.searchResults.penggunaResults = [];
    if (this.searchResults.q) {
      setTimeout(() => { this.getNews(); }, 250);
      setTimeout(() => { this.getKanji(); }, 500);
      setTimeout(() => { this.getAnime(); }, 750);
      setTimeout(() => { this.getDorama(); }, 1000);
      setTimeout(() => { this.getFansub(); }, 1250);
      setTimeout(() => { this.getBerkas(); }, 1500);
      setTimeout(() => { this.getPengguna(); }, 1750);
    }
  }

  openEdict(kana): void {
    this.gs.log('[HIRAKATA_OPEN_EDICT]', kana);
    this.ds.openEdictDialog({
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
    });
  }

  getNews(): void {
    if (this.subsBerita) {
      this.subsBerita.unsubscribe();
    }
    this.subsBerita = this.news.getAllNews(this.searchResults.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[NEWS_SEARCH_SUCCESS]', res);
        this.searchResults.beritaResults = res.results;
      },
      error: err => {
        this.gs.log('[NEWS_SEARCH_ERROR]', err);
        this.searchResults.beritaResults = [];
      }
    });
  }

  getKanji(): void {
    if (this.subsKanji) {
      this.subsKanji.unsubscribe();
    }
    this.subsKanji = this.nihon.getAllKanji('', '', this.searchResults.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[KANJI_SEARCH_SUCCESS]', res);
        this.searchResults.kanjiResults = res.results;
      },
      error: err => {
        this.gs.log('[KANJI_SEARCH_ERROR]', err);
        this.searchResults.kanjiResults = [];
      }
    });
  }

  getAnime(): void {
    if (this.subsAnime) {
      this.subsAnime.unsubscribe();
    }
    this.subsAnime = this.anime.searchAnime(this.searchResults.q).subscribe({
      next: res => {
        this.gs.log('[ANIME_SEARCH_SUCCESS]', res);
        this.searchResults.animeResults = res.results;
      },
      error: err => {
        this.gs.log('[ANIME_SEARCH_ERROR]', err);
        this.searchResults.animeResults = [];
      }
    });
  }

  getDorama(): void {
    if (this.subsDorama) {
      this.subsDorama.unsubscribe();
    }
    this.subsDorama = this.dorama.searchDorama(this.searchResults.q).subscribe({
      next: res => {
        this.gs.log('[DORAMA_SEARCH_SUCCESS]', res);
        this.searchResults.doramaResults = res.results;
      },
      error: err => {
        this.gs.log('[DORAMA_SEARCH_ERROR]', err);
        this.searchResults.doramaResults = [];
      }
    });
  }

  getFansub(): void {
    if (this.subsFansub) {
      this.subsFansub.unsubscribe();
    }
    this.subsFansub = this.fansub.searchFansub(this.searchResults.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[FANSUB_SEARCH_SUCCESS]', res);
        this.searchResults.fansubResults = res.results;
      },
      error: err => {
        this.gs.log('[FANSUB_SEARCH_ERROR]', err);
        this.searchResults.fansubResults = [];
      }
    });
  }

  getBerkas(): void {
    if (this.subsBerkas) {
      this.subsBerkas.unsubscribe();
    }
    this.subsBerkas = this.berkas.getAllBerkas(this.searchResults.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[BERKAS_SEARCH_SUCCESS]', res);
        this.searchResults.berkasResults = res.results;
      },
      error: err => {
        this.gs.log('[BERKAS_SEARCH_ERROR]', err);
        this.searchResults.berkasResults = [];
      }
    });
  }

  getPengguna(): void {
    if (this.subsPengguna) {
      this.subsPengguna.unsubscribe();
    }
    this.subsPengguna = this.user.getAllUser(this.searchResults.q, 1, 5).subscribe({
      next: res => {
        this.gs.log('[PENGGUNA_SEARCH_SUCCESS]', res);
        this.searchResults.penggunaResults = res.results;
      },
      error: err => {
        this.gs.log('[PENGGUNA_SEARCH_ERROR]', err);
        this.searchResults.penggunaResults = [];
      }
    });
  }

}
